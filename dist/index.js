'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

      object[name] = value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" ? deepFreeze(value) : value;
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

    _classCallCheck(this, Component);

    Object.defineProperty(this, "props", { value: deepFreeze(props || {}) });

    this.rendered = false;
    this.__renderSubscribers = [];

    if (this.render) {

      // let other things in constructor get executed
      window.setTimeout(function () {

        var $el = null;

        if (_this.render) {

          var html = _this.render(props),
              _node = (_this.parser || createNode)(html);

          $el = _node;
        }

        Object.defineProperty(_this, "$el", { value: $el });

        _this.rendered = true;

        _this.__renderSubscribers.forEach(function (fn) {
          return fn();
        });

        _this.__renderSubscribers = [];

        if (!$el) {

          return;
        }

        Object.defineProperty(_this, "$container", {
          get: function get() {
            return $el.parentElement;
          }
        });

        if (container) {

          _this.appendTo(container);
        }
      });
    }
  }

  _createClass(Component, [{
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
    key: "appendTo",
    value: function appendTo(container) {
      var _this2 = this;

      return this.onRender(function () {
        var $el = _this2.$el;


        if (!container || container === $el.parentElement) {

          return;
        }

        if (_this2.componentWillMount) {

          _this2.componentWillMount();
        }

        container.appendChild($el);

        if (_this2.componentDidMount) {

          _this2.componentDidMount();
        }
      });
    }
  }, {
    key: "remove",
    value: function remove() {

      return this.$container && this.$container.removeChild(this.$el);
    }
  }, {
    key: "destroy",
    value: function destroy() {

      if (this.componentWillUnMount) {

        this.componentWillUnMount();
      }

      this.remove();
    }
  }]);

  return Component;
}();

module.exports = Component;
