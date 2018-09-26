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
var isFunction = isType("function");
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

    Object.defineProperty(this, "props", { value: deepFreeze(props || {}) });

    this.__renderSubscribers = [];

    if (this.render) {

      // let other things in constructor get executed
      window.setTimeout(function () {

        var $el = null;

        if (_this.render) {

          var html = _this.render(props),
              node = html instanceof Node ? html : (_this.parser || createNode)(html);

          $el = node;
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
    key: "onRender",
    value: function onRender(fn) {

      if (this.rendered) {

        fn();
      } else {

        this.__renderSubscribers.push(fn);
      }

      return this;
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {

      if (this.$el) {
        var _$el;

        (_$el = this.$el).addEventListener.apply(_$el, arguments);
      }

      return this;
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {

      if (this.$el) {
        var _$el2;

        (_$el2 = this.$el).removeEventListener.apply(_$el2, arguments);
      }

      return this;
    }
  }, {
    key: "appendChild",
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
    key: "destroy",
    value: function destroy() {

      if (this.componentWillUnMount) {

        this.componentWillUnMount();
      }

      var $container = this.$el && this.$el.parentElement;

      return $container && $container.removeChild(this.$el);
    }
  }, {
    key: "$",
    value: function $(selector) {

      return this.$el && this.$el.querySelector(selector) || null;
    }
  }, {
    key: "$$",
    value: function $$(selector) {

      return this.$el && this.$el.querySelectorAll(selector) || null;
    }
  }], [{
    key: "isComponent",
    value: function isComponent(input) {

      return input instanceof Component;
    }
  }, {
    key: "mount",
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
  }]);
  return Component;
}();

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

  function PublisherComponent() {
    var _ref;

    classCallCheck(this, PublisherComponent);

    for (var _len2 = arguments.length, props = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      props[_key2] = arguments[_key2];
    }

    var _this = possibleConstructorReturn(this, (_ref = PublisherComponent.__proto__ || Object.getPrototypeOf(PublisherComponent)).call.apply(_ref, [this].concat(props)));

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

      for (var _len3 = arguments.length, eventNames = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        eventNames[_key3] = arguments[_key3];
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
