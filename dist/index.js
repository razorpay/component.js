'use strict';

if (typeof Object.assign != 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var isType = function isType(type) {
  return function (input) {
    return (typeof input === "undefined" ? "undefined" : _typeof(input)) === type;
  };
};
var isString = isType("string");
var isNumber = isType("number");
var isFunction = isType("function");
var isText = function isText(input) {
  return isString(input) || isNumber(input);
};
var isElement = function isElement(input) {
  return input instanceof Element;
};
var isArray = Array.isArray;
var isObject = function isObject(input) {
  return input && isType("object");
};
var isDefined = function isDefined(input) {
  return input !== void 0;
};

var node = document.createElement("div");

function createNode(htmlString) {
  node.innerHTML = htmlString.trim();
  return node.firstChild;
}

function deepFreeze(object) {

  var propNames = Object.getOwnPropertyNames(object);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = propNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var name = _step.value;


      var value = object[name];

      try {

        object[name] = value;
      } catch (e) {/* the prop is not writable */}

      value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" ? deepFreeze(value) : value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return Object.freeze(object);
}

var Component = function () {
  function Component(props, container) {
    var _this = this;

    classCallCheck(this, Component);


    var context = {};

    Object.defineProperty(this, "context", {
      get: function get$$1() {
        return context;
      },

      set: function set$$1(obj) {

        if (!isObject(obj)) {

          return;
        }

        Object.keys(obj).forEach(function (key) {

          var value = context[key];

          return value ? Object.assign(context[key], value) : context[key] = obj[key];
        });

        Object.assign(_this, context);
      }
    });

    props = props || {};

    Object.defineProperty(this, "props", { value: deepFreeze(props) });

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
      window.setTimeout(function () {

        var $el = null;

        var html = _this.render(props);

        if (html instanceof Node) {
          $el = html;
        } else if (html instanceof VNode) {
          $el = Component.parseVNode(html);
        } else {
          $el = createNode(html);
        }

        Object.defineProperty(_this, "$el", { value: $el });
        Object.defineProperty(_this, "rendered", { value: true });
        _this.__renderSubscribers.forEach(function (fn) {
          return fn();
        });
        delete _this.__renderSubscribers;
        return _this.ready && _this.ready();
      });
    }
  }

  createClass(Component, [{
    key: 'onEl',
    value: function onEl($el) {
      Object.defineProperty(this, "$el", { value: $el });
      Object.defineProperty(this, "rendered", { value: true });
      this.__renderSubscribers.forEach(function (fn) {
        return fn();
      });
      delete this.__renderSubscribers;

      Object.defineProperty(this, "mounted", { value: true });
      this.componentDidMount && this.componentDidMount();

      return this.ready && this.ready();
    }
  }, {
    key: 'onRender',
    value: function onRender(fn) {

      if (this.rendered) {

        fn();
      } else {

        this.__renderSubscribers.push(fn);
      }

      return this;
    }
  }, {
    key: 'addEventListener',
    value: function addEventListener() {

      if (this.$el) {
        var _$el;

        (_$el = this.$el).addEventListener.apply(_$el, arguments);
      }

      return this;
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener() {

      if (this.$el) {
        var _$el2;

        (_$el2 = this.$el).removeEventListener.apply(_$el2, arguments);
      }

      return this;
    }
  }, {
    key: 'appendChild',
    value: function appendChild(child, $el) {
      var _this2 = this;

      if (isArray(child) && child.length > 0) {

        child.forEach(function (child) {
          return _this2.appendChild(child, $el);
        });
        return this;
      }

      if (!Component.isComponent(child)) {

        return this;
      }

      return this.onRender(function () {
        var context = _this2.context,
            $parentEl = _this2.$el;


        if (!isDefined($el)) {

          $el = $parentEl;
        } else {

          $el = isElement($el) ? $el : isString($el) ? _this2.$($el) : null;

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
  }, {
    key: 'destroy',
    value: function destroy() {

      if (this.componentWillUnMount) {

        this.componentWillUnMount();
      }

      var $container = this.$el && this.$el.parentElement;

      return $container && $container.removeChild(this.$el);
    }
  }, {
    key: '$',
    value: function $(selector) {

      return this.$el && this.$el.querySelector(selector) || null;
    }
  }, {
    key: '$$',
    value: function $$(selector) {

      return this.$el && this.$el.querySelectorAll(selector) || null;
    }
  }], [{
    key: 'isComponent',
    value: function isComponent(input) {

      return input instanceof Component;
    }
  }, {
    key: 'mount',
    value: function mount(component, target) {

      if (!isElement(target) || !Component.isComponent(component) || component.mounted) {

        return;
      }

      return component.onRender(function () {

        target.appendChild(component.$el);
        Object.defineProperty(component, "mounted", { value: true });
        return component.componentDidMount && component.componentDidMount();
      });
    }
  }, {
    key: 'render',
    value: function render(_Component, props, container, parentComponent) {
      props.__sync = true;
      var component = new _Component(props, container);
      var vNode = component.render();
      var DOMNode = Component.parseVNode(vNode, component);

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
  }, {
    key: 'parseVNode',
    value: function parseVNode(vNode, parentComponent) {
      if (!(vNode instanceof VNode)) {
        console.error(vNode, 'is not an instance of vNode.');
      }

      var nodeType = vNode.nodeType,
          props = vNode.props,
          children = vNode.children;


      var childNodes = [];

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
        var DOMNode = document.createElement(nodeType);

        if (isObject(props)) {
          if (props.className) {
            DOMNode.className = props.className;
            delete props.className;
          }
          Object.keys(props).forEach(function (k) {
            return DOMNode.setAttribute(k, props[k]);
          });
        }

        if (childNodes) {
          childNodes.forEach(function (child) {
            return DOMNode.appendChild(child);
          });
        }

        return DOMNode;
      } else if (isFunction(nodeType) && nodeType.constructor === Component.constructor) {
        return Component.render(nodeType, props, null, parentComponent).$el;
      } else {
        console.error(nodeType, 'is an unknown type.');
      }
    }
  }, {
    key: 'createElement',
    value: function createElement(nodeType, props, children) {
      return new VNode(nodeType, props, children);
    }
  }]);
  return Component;
}();

var VNode = function VNode(nodeType, props, children) {
  classCallCheck(this, VNode);

  this.nodeType = nodeType;
  this.props = props;
  this.children = children;
};

var getEvent = function getEvent() {

  var subscribers = [];

  return {
    subscribe: function subscribe(subscriber) {

      return isFunction(subscriber) && subscribers.push(subscriber);
    },
    unSubscribe: function unSubscribe(subscriber) {

      var subscriberIndex = subscribers.indexOf(subscriber);

      return subscriberIndex >= 0 && subscribers.splice(subscriberIndex, 1);
    },
    publish: function publish() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return subscribers.forEach(function (subscriber) {
        return subscriber.apply(undefined, args);
      });
    },
    unSubscribeAll: function unSubscribeAll() {
      return subscribers = [];
    }
  };
};

var PublisherComponent = function (_Component) {
  inherits(PublisherComponent, _Component);

  function PublisherComponent(props, container) {
    classCallCheck(this, PublisherComponent);

    var _this = possibleConstructorReturn(this, (PublisherComponent.__proto__ || Object.getPrototypeOf(PublisherComponent)).call(this, props, container));

    _this.events = {};
    _this.context = { "events": _this.events };

    Object.defineProperty(_this, "destroyHandlers", { value: [] });
    return _this;
  }

  createClass(PublisherComponent, [{
    key: "registerEvent",
    value: function registerEvent(eventName) {

      if (this.events[eventName]) {

        return;
      }

      var _getEvent = getEvent(),
          subscribe = _getEvent.subscribe,
          unSubscribe = _getEvent.unSubscribe,
          publish = _getEvent.publish,
          unSubscribeAll = _getEvent.unSubscribeAll;

      this.events[eventName] = {
        subscribe: subscribe,
        unSubscribe: unSubscribe,
        trigger: function trigger() {

          return publish.apply(undefined, arguments);
        }
      };

      this.destroyHandlers.push(unSubscribeAll);
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var _this2 = this;

      for (var _len2 = arguments.length, eventNames = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        eventNames[_key2] = arguments[_key2];
      }

      eventNames.forEach(function (name) {
        return _this2.registerEvent(name);
      });
      return this;
    }
  }, {
    key: "destroy",
    value: function destroy() {

      get(PublisherComponent.prototype.__proto__ || Object.getPrototypeOf(PublisherComponent.prototype), "destroy", this).call(this);
      this.destroyHandlers.forEach(function (item) {
        return item();
      });
    }
  }]);
  return PublisherComponent;
}(Component);

Component.PublisherComponent = PublisherComponent;

module.exports = Component;
