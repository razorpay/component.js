import './polyfills';
import {
  createNode,
  deepFreeze,
  isArray,
  isDefined,
  isElement,
  isFunction,
  isObject,
  isString,
  isText
} from './utils';

class Component {

  constructor (props, container) {
 
    const context={};

    Object.defineProperty(this, "context", {

      get() { return context },
      set: (obj) => {

        if (!isObject(obj)) {

          return;
        }

        Object.keys(obj).forEach((key) => {

          const value = context[key];

          return value
                   ? Object.assign(context[key], value)
                   : context[key] = obj[key];
        });

        Object.assign(this, context);
      } 
    });
    
    props = props || {};
 
    Object.defineProperty(this, "props", {value: deepFreeze(props)});

    this.__renderSubscribers = [];
    
    if (props.__sync) {
      // Prevent asynchronous render.
      if (!this.render) {
        console.error('Synchronous rendering requires a render function.');  
      }
      
      return this;
    }
    
    if (this.render) {
      // let other things in constructor get executed
      window.setTimeout(() => {
     
        let $el = null;
        
        const html = this.render(props);
        
        if (html instanceof Node) {
          $el = html;
        } else if (html instanceof VNode) {
          $el = Component.parseVNode(html);
        } else {
          $el = createNode(html);
        }
        
        Object.defineProperty(this, "$el", {value: $el});
        Object.defineProperty(this, "rendered", {value: true});
        this.__renderSubscribers.forEach((fn) => fn());
        delete this.__renderSubscribers;
        return this.ready && this.ready();
      });
    }
  }
  
  onEl($el) {
    
    Object.defineProperty(this, "$el", {value: $el});
    Object.defineProperty(this, "rendered", {value: true});
    this.__renderSubscribers.forEach(fn => fn());
    delete this.__renderSubscribers;
    
    Object.defineProperty(this, "mounted", {value: true});
    this.componentDidMount && this.componentDidMount();
    
    return this.ready && this.ready();
  }

  onRender (fn) {
  
    if (this.rendered) {
    
      fn();
    } else {

      this.__renderSubscribers.push(fn);
    }

    return this;
  }

  addEventListener(...args) {
  
    if(this.$el) {
    
      this.$el.addEventListener(...args);
    }

    return this;
  }

  removeEventListener(...args) {
  
    if (this.$el) {
    
      this.$el.removeEventListener(...args);
    }

    return this;
  }

  appendChild(child, $el) {

    if (isArray(child) && child.length > 0) {

      child.forEach((child) => this.appendChild(child, $el));
      return this;
    }

    if (!Component.isComponent(child)) {
    
      return this;
    }

    return this.onRender(() => {

      const {context, $el:$parentEl} = this;

      if (!isDefined($el)) {

        $el = $parentEl;
      } else {

        $el = isElement($el)
                ? $el
                : isString($el)
                    ? this.$($el)
                    : null;

        if (!$el) {
    
          return;
        }
      }

      if (context) {

        child.context = context;
      }

      return Component.mount(child, $el);
    });
  }

  destroy () {
  
    if (this.componentWillUnMount) {
    
      this.componentWillUnMount();
    }

    const $container = this.$el && this.$el.parentElement;

    return $container && 
           $container.removeChild(this.$el);
  }

  $(selector) {
  
    return this.$el && this.$el.querySelector(selector) || null; 
  }

  $$(selector) {
  
    return this.$el && this.$el.querySelectorAll(selector) || null;
  }

  static isComponent (input) {

    return input instanceof Component;
  }

  static mount (component, target) {

    if (!isElement(target) ||
        !Component.isComponent(component) ||
        component.mounted) {
    
      return;
    }

    return component.onRender(() => {

      target.appendChild(component.$el);
      Object.defineProperty(component, "mounted", {value: true});
      return component.componentDidMount && component.componentDidMount();
    });
  }
  
  static render(_Component, props, container, parentComponent) {
    
    props.__sync = true;
    const component = new _Component(props, container);
    const vNode = component.render();
    const DOMNode = Component.parseVNode(vNode, component);

    if (parentComponent && parentComponent.context) {
      component.context = parentComponent.context;
    }

    if (isObject(props) && props.hasOwnProperty('ref')) {
      parentComponent[props.ref] = component;
    }

    if (container) {
      container.appendChild(DOMNode);
    }

    component.onEl(DOMNode);

    return component;
  }
  
  static parseVNode(vNode, parentComponent) {
    
    if (!(vNode instanceof VNode)) {
      console.error(vNode, 'is not an instance of vNode.');
    }
    
    const { nodeType, props, children } = vNode;
    
    const childNodes = [];
    
    if (isArray(children)) {
      children.forEach(function processChild(child) {
        if (child instanceof VNode) {
          childNodes.push(Component.parseVNode(child, parentComponent)); 
        } else if (isText(child)) {
          childNodes.push(document.createTextNode(child));
        } else if (isArray(child)) {
          child.forEach(processChild);
        } else {
          console.error(child, 'has an unknown child type.');
        }
      });
    }
    
    if (isString(nodeType)) {
      const DOMNode = document.createElement(nodeType);
      
      if (isObject(props)) {
        if (props.className) {
          DOMNode.className = props.className;
          delete props.className;
        }
        Object.keys(props).forEach(k => DOMNode.setAttribute(k, props[k]));
      }
      
      if (childNodes) {
        childNodes.forEach(child => DOMNode.appendChild(child));
      }
      
      return DOMNode;
      
    } else if (isFunction(nodeType) && nodeType.constructor === Component.constructor) {
      return Component.render(nodeType, props, null, parentComponent).$el;
    } else {
      console.error(nodeType, 'is an unknown type.');
    }
  }
  
  static createElement (nodeType, props, children) {
    return new VNode(nodeType, props, children);
  }
}

class VNode {
  constructor(nodeType, props, children) {
    this.nodeType = nodeType;
    this.props = props;
    this.children = children;
  }
}

export default Component;
