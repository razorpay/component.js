const babelPluginSyntaxJSX = require('babel-plugin-syntax-jsx');
const propertyNameNeedQuotes = name => /[\-\s]/.test(name);
const isComponent = identifier => /^([A-Z]{1})\w/.test(identifier.name);
const capFunctionArguments = (fn, n, guard) => {
  n = guard ? undefined : n;
  n = (fn && n == null) ? fn.length : n;
  return (function () { return fn.apply(this, Array.prototype.slice.call(arguments, 0, n)); });
};
const identity = v => v;

const childrenProperty = 'children';
const defaultConstructorFunction = 'Component.createElement';

module.exports = function ({ types: t }) {
  
  const transformOnType = transforms => node => {
    const transformer = transforms[node.type];
    if (transformer) {
      return transformer(node);
    }
    throw new Error(`${node.type} could not be transformed`);
  };

  const initConfig = (path, state) => {
    const {
      constructorFunction = defaultConstructorFunction
    } = state.opts;

    let jsxObjectTransformer;

    const jsxObjectTransformerCreator = node => (elementName, attributes, children) => {
      if (isComponent(elementName)) {
        if (children.hasOwnProperty('elements') && children.elements.length) {
          attributes.properties.push(t.objectProperty(t.identifier(childrenProperty), children));
        }
        const args = attributes.properties && attributes.properties.length ? 
          [t.identifier(elementName.name), attributes]: [t.identifier(elementName.name)];
        return t.callExpression(node, args);
      }
      return t.callExpression(node, [t.stringLiteral(elementName.name), attributes, children]);
    };

    if (constructorFunction) {
      // If the constructor function will be an in scope function.
      const expression = constructorFunction.split('.').map(
        capFunctionArguments(t.identifier, 1)).reduce(capFunctionArguments(t.memberExpression, 2));
      jsxObjectTransformer = jsxObjectTransformerCreator(expression);
    } else {
      // Otherwise, we won‘t be mapping.
      jsxObjectTransformer = identity;
    }

    return {
      jsxObjectTransformer
    };
  };

  const visitJSXElement = (path, state) => {
    if (!state.get('jsxConfig')) {
      state.set('jsxConfig', initConfig(path, state));
    }

    const {
      jsxObjectTransformer
    } = state.get('jsxConfig');

    const JSXIdentifier = node => t.stringLiteral(node.name);

    const JSXNamespacedName = node => t.stringLiteral(`${node.namespace.name}:${node.name.name}`);

    const JSXMemberExpression = transformOnType({
      JSXIdentifier: node => t.identifier(node.name),
      JSXMemberExpression: node => (
        t.memberExpression(
          JSXMemberExpression(node.object),
          JSXMemberExpression(node.property)
        )
      )
    });

    const JSXElementName = transformOnType({
      JSXIdentifier: node => t.identifier(node.name),
      JSXNamespacedName,
      JSXMemberExpression
    });

    const JSXExpressionContainer = node => node.expression;

    const JSXAttributeName = transformOnType(
      { JSXIdentifier, JSXNamespacedName, JSXMemberExpression });

    const JSXAttributeValue = transformOnType({
      StringLiteral: node => node,
      JSXExpressionContainer
    });

    const JSXAttributes = nodes => {
      let object = [];
      const objects = [];

      nodes.forEach(node => {
        switch (node.type) {
          case 'JSXAttribute': {
            if (!object) {
              object = [];
            }

            const attributeName = JSXAttributeName(node.name);
            
            const objectKey = propertyNameNeedQuotes(attributeName.value)
              ? attributeName
              : t.identifier(attributeName.value);

            const value = node.value !== null ? node.value : t.stringLiteral('true');
            object.push(t.objectProperty(objectKey, JSXAttributeValue(value)));
            break;
          }
          case 'JSXSpreadAttribute': {
            if (object) {
              objects.push(t.objectExpression(object));
              object = null;
            }

            objects.push(node.argument);
            break;
          }
          default:
            throw new Error(`${node.type} cannot be used as a JSX attribute`);
        }
      });

      if (object && object.length > 0) {
        objects.push(t.objectExpression(object));
      }

      if (objects.length === 0) {
        return t.objectExpression([]);
      } else if (objects.length === 1) {
        return objects[0];
      }

      return (
        t.callExpression(
          state.addHelper('extends'),
          objects
        )
      );
    };

    const JSXText = node => {
      if (state.opts.noTrim) return t.stringLiteral(node.value);
      const value = node.value.replace(/\n\s*/g, '');
      return value === '' ? null : t.stringLiteral(value);
    };

    const JSXElement = node => jsxObjectTransformer(
      JSXElementName(node.openingElement.name),
      JSXAttributes(node.openingElement.attributes),
      node.closingElement ? JSXChildren(node.children) : t.nullLiteral()
    );

    const JSXChild = transformOnType({ JSXText, JSXElement, JSXExpressionContainer });

    const JSXChildren = nodes => t.arrayExpression(
      nodes.map(JSXChild).filter(Boolean)
        // Normalize all of our string children into one big string. This can be
        // an optimization as we minimize the number of nodes created.
        // This step just turns `['1', '2']` into `['12']`.
        .reduce((children, child) => {
          const lastChild = children.length > 0 ? children[children.length - 1] : null;

          // If this is a string literal, and the last child is a string literal, merge them.
          if (child.type === 'StringLiteral' && lastChild && lastChild.type === 'StringLiteral') {
            return [...children.slice(0, -1), t.stringLiteral(lastChild.value + child.value)];
          }

          // Otherwise just append the child to our array normally.
          return [...children, child];
        }, [])
    );

    // Actually replace JSX with an object.
    path.replaceWith(JSXElement(path.node));
  };

  return {
    inherits: babelPluginSyntaxJSX,
    visitor: {
      JSXElement: visitJSXElement
    }
  };
};