/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./TodoApp/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../index.js":
/*!*******************!*\
  !*** ../index.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Component = __webpack_require__(/*! ./src */ "../src/index.js");

module.exports = Component.default || Component;

/***/ }),

/***/ "../src/index.js":
/*!***********************!*\
  !*** ../src/index.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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

/* harmony default export */ __webpack_exports__["default"] = (Component);

/***/ }),

/***/ "./TodoApp/TodoFooter/index.js":
/*!*************************************!*\
  !*** ./TodoApp/TodoFooter/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(/*! component */ "../index.js");

var _component2 = _interopRequireDefault(_component);

__webpack_require__(/*! ./styles.styl */ "./TodoApp/TodoFooter/styles.styl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoFooter = function (_Component) {
  _inherits(TodoFooter, _Component);

  function TodoFooter(props, container) {
    _classCallCheck(this, TodoFooter);

    var _this = _possibleConstructorReturn(this, (TodoFooter.__proto__ || Object.getPrototypeOf(TodoFooter)).call(this, props, container));

    _this.activeClass = " active";
    _this.count = _this.props.count || 0;
    _this.statuses = _this.props.statuses || [];
    _this.selectedStatus = _this.props.selectedStatus || _this.statuses[0];
    _this.handleClearCompleted = _this.handleClearCompleted.bind(_this);
    return _this;
  }

  _createClass(TodoFooter, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var _this2 = this;

      this.$statuses = this.$el.querySelectorAll(".status");
      this.$statuses.forEach(function ($status, index) {

        var statusText = _this2.statuses[index];

        $status.onclick = _this2.handleStatusClick.bind(_this2, statusText, index);
      });

      this.$el.querySelector(".clear-completed").onclick = this.handleClearCompleted;
    }
  }, {
    key: "updateNumTodos",
    value: function updateNumTodos(count) {

      this.$counter = this.$counter || this.$el.querySelector(".counter");
      this.$counter.innerText = count;
    }
  }, {
    key: "updateNumVisibleTodos",
    value: function updateNumVisibleTodos(count) {

      this.$visibleTodosCounter = this.$visibleTodosCounter || this.$el.querySelector(".visible-todos-counter");

      this.$visibleTodosCounter.innerText = count;
    }
  }, {
    key: "handleClearCompleted",
    value: function handleClearCompleted() {

      this.props.onClearCompleted();
    }
  }, {
    key: "handleStatusClick",
    value: function handleStatusClick(selectedStatus, selectedIndex) {
      var _this3 = this;

      if (this.selectedStatus === selectedStatus) {

        return;
      }

      this.$statuses.forEach(function ($status, index) {

        var className = $status.className;

        if (selectedIndex === index) {

          className += _this3.activeClass;
        } else {

          className = className.replace(_this3.activeClass, "");
        }

        $status.className = className;
      });

      this.selectedStatus = selectedStatus;

      return this.props.onStatusChange && this.props.onStatusChange(selectedStatus);
    }
  }, {
    key: "render",
    value: function render() {
      var statuses = this.statuses,
          selectedStatus = this.selectedStatus,
          count = this.count;


      return "\n      <div class=\"todo-footer\">\n        <div>\n          Showing <span class=\"visible-todos-counter\">" + count + "</span>\n          of <span class=\"counter\">" + count + "</span>\n        </div>\n        <div class=\"statuses\">\n          " + statuses.map(function (status) {
        return "\n            <div class=\"status" + (status === selectedStatus ? ' active' : "") + "\">\n              " + status + "\n            </div>\n          ";
      }).join("") + "\n        </div>\n        <div class=\"clear-completed\">Clear Completed</div>\n      </div>\n    ";
    }
  }]);

  return TodoFooter;
}(_component2.default);

exports.default = TodoFooter;

/***/ }),

/***/ "./TodoApp/TodoFooter/styles.styl":
/*!****************************************!*\
  !*** ./TodoApp/TodoFooter/styles.styl ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./TodoApp/TodoInput/index.js":
/*!************************************!*\
  !*** ./TodoApp/TodoInput/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(/*! component */ "../index.js");

var _component2 = _interopRequireDefault(_component);

__webpack_require__(/*! ./styles.styl */ "./TodoApp/TodoInput/styles.styl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoInput = function (_Component) {
  _inherits(TodoInput, _Component);

  function TodoInput() {
    var _ref;

    _classCallCheck(this, TodoInput);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = TodoInput.__proto__ || Object.getPrototypeOf(TodoInput)).call.apply(_ref, [this].concat(args)));

    _this.isCheckAllVisible = false;
    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.handleCheckAllChange = _this.handleCheckAllChange.bind(_this);
    return _this;
  }

  _createClass(TodoInput, [{
    key: "componentWillMount",
    value: function componentWillMount() {

      this.form = this.$el;
      this.input = this.form.todoText;
      this.checkbox = this.form.checkAll;
      this.form.onsubmit = this.onSubmit;

      this.checkbox.onchange = this.handleCheckAllChange;
    }
  }, {
    key: "onSubmit",
    value: function onSubmit(e) {
      e.preventDefault();

      var inputText = this.input.value.trim();

      if (!inputText) {

        return;
      }

      if (this.props.onSubmit) {

        this.props.onSubmit(inputText);
      }

      this.input.value = "";
    }
  }, {
    key: "setCheckAll",
    value: function setCheckAll(isChecked) {

      this.checkbox.checked = !!isChecked;
    }
  }, {
    key: "handleCheckAllChange",
    value: function handleCheckAllChange() {

      var isChecked = this.checkbox.checked;

      return this.props.onCheckAllChange && this.props.onCheckAllChange(isChecked);
    }
  }, {
    key: "render",
    value: function render() {

      return "\n      <form class=\"todo-input\">\n        <div class=\"checkbox\">\n          <input type=\"checkbox\" \n                 name=\"checkAll\"/>\n        </div>\n        <div class=\"input\">\n          <input type=\"text\"\n                 name=\"todoText\"\n                 placeholder=\"what needs to be done?\"/>\n        </div>\n      </form>\n    ";
    }
  }]);

  return TodoInput;
}(_component2.default);

exports.default = TodoInput;

/***/ }),

/***/ "./TodoApp/TodoInput/styles.styl":
/*!***************************************!*\
  !*** ./TodoApp/TodoInput/styles.styl ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./TodoApp/TodoList/Todo/index.js":
/*!****************************************!*\
  !*** ./TodoApp/TodoList/Todo/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(/*! component */ "../index.js");

var _component2 = _interopRequireDefault(_component);

__webpack_require__(/*! ./styles.styl */ "./TodoApp/TodoList/Todo/styles.styl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var completedClass = " completed";

var Todo = function (_Component) {
  _inherits(Todo, _Component);

  function Todo(props, container) {
    _classCallCheck(this, Todo);

    var _this = _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).call(this, props, container));

    _this.index = props.index;
    _this.completed = false;
    _this.isVisible = false;
    _this.handleStatusChange = _this.handleStatusChange.bind(_this);
    _this.handleRemove = _this.handleRemove.bind(_this);
    return _this;
  }

  _createClass(Todo, [{
    key: "show",
    value: function show() {

      this.isVisible = true;
      this.$el.style.display = "block";
    }
  }, {
    key: "hide",
    value: function hide() {

      this.isVisible = false;
      this.$el.style.display = "none";
    }
  }, {
    key: "setStatus",
    value: function setStatus(completed) {

      if (this.checkbox.checked === !!completed) {

        return;
      }

      this.checkbox.checked = !!completed;
      this.handleStatusChange(null, true);
    }
  }, {
    key: "handleRemove",
    value: function handleRemove() {

      return this.props.onRemoveTodo(this);
    }
  }, {
    key: "handleStatusChange",
    value: function handleStatusChange(e, isSynthetic) {

      var completed = this.completed = this.checkbox.checked;

      var className = this.$el.className;

      if (completed) {

        className = "" + className + completedClass;
      } else {

        className = className.replace(completedClass, "");
      }

      this.$el.className = className;

      return this.props.onStatusChange && this.props.onStatusChange(this, isSynthetic);
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {
      var completed = this.completed;


      this.checkbox = this.$el.querySelector("[type='checkbox']");

      if (completed) {

        this.checkbox.setAttribute("checked", completed);
      }

      this.checkbox.onchange = this.handleStatusChange;

      this.$el.querySelector(".close").onclick = this.handleRemove;
    }
  }, {
    key: "render",
    value: function render() {
      var text = this.props.text;


      return "\n      <li class=\"todo\" style=\"display: none\">\n        <div class=\"todo-check\">\n          <input type=\"checkbox\" name=\"check\"/>\n        </div>\n        <div class=\"todo-text\">" + text + "</div>\n        <span class=\"close\">&times;</span>\n      </li>\n    ";
    }
  }]);

  return Todo;
}(_component2.default);

exports.default = Todo;

/***/ }),

/***/ "./TodoApp/TodoList/Todo/styles.styl":
/*!*******************************************!*\
  !*** ./TodoApp/TodoList/Todo/styles.styl ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./TodoApp/TodoList/index.js":
/*!***********************************!*\
  !*** ./TodoApp/TodoList/index.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(/*! component */ "../index.js");

var _component2 = _interopRequireDefault(_component);

var _Todo = __webpack_require__(/*! ./Todo */ "./TodoApp/TodoList/Todo/index.js");

var _Todo2 = _interopRequireDefault(_Todo);

__webpack_require__(/*! ./styles.styl */ "./TodoApp/TodoList/styles.styl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TodoList = function (_Component) {
  _inherits(TodoList, _Component);

  function TodoList() {
    var _ref;

    _classCallCheck(this, TodoList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref = TodoList.__proto__ || Object.getPrototypeOf(TodoList)).call.apply(_ref, [this].concat(args)));

    _this.status = _this.props.status;
    _this.todos = _this.props.todos || [];
    _this.numVisibleTodos = _this.todos.length;
    _this.addTodo = _this.addTodo.bind(_this);
    _this.handleTodoStatusChange = _this.handleTodoStatusChange.bind(_this);
    _this.handleRemoveTodo = _this.handleRemoveTodo.bind(_this);
    return _this;
  }

  _createClass(TodoList, [{
    key: "componentWillMount",
    value: function componentWillMount() {

      this.$todoList = this.$el;
      this.todos.forEach(this.addTodo);
    }
  }, {
    key: "setVisibility",
    value: function setVisibility(status, todo) {

      var shouldShow = status === "All" || status === "Completed" && todo.completed || status === "Pending" && !todo.completed;

      if (shouldShow && !todo.isVisible) {

        todo.show();
        this.numVisibleTodos++;
      } else if (!shouldShow && todo.isVisible) {

        todo.hide();
        this.numVisibleTodos--;
      }

      return shouldShow;
    }
  }, {
    key: "setAllTodosStatus",
    value: function setAllTodosStatus(isChecked) {

      this.todos.forEach(function (todo) {
        return todo.setStatus(isChecked);
      });
    }
  }, {
    key: "handleTodoStatusChange",
    value: function handleTodoStatusChange(todo, isSynthetic) {
      var numVisibleTodos = this.numVisibleTodos;


      this.setVisibility(this.status, todo);

      if (numVisibleTodos !== this.numVisibleTodos) {

        this.props.onVisibleTodosChange();
      }

      if (!isSynthetic) {

        this.props.onTodoStatusChange();
      }
    }
  }, {
    key: "addTodo",
    value: function addTodo(item) {
      var _this2 = this;

      var todo = new _Todo2.default(_extends({}, item, {
        index: this.todos.length,
        onStatusChange: this.handleTodoStatusChange,
        onRemoveTodo: this.handleRemoveTodo
      }));

      this.todos.push(todo);

      todo.onRender(function () {

        var isVisible = _this2.setVisibility(_this2.status, todo);

        if (isVisible) {

          _this2.props.onVisibleTodosChange();
        }
      });

      todo.appendTo(this.$el);
    }
  }, {
    key: "filter",
    value: function filter(status) {
      var _this3 = this;

      this.status = status;

      var numVisibleTodos = this.numVisibleTodos;


      if (status !== "All") {

        this.todos.forEach(function (todo, index) {

          _this3.setVisibility(status, todo);
        });
      } else {

        this.numVisibleTodos = this.todos.length;
        this.todos.forEach(function (todo) {
          return todo.show();
        });
      }

      if (numVisibleTodos !== this.numVisibleTodos) {

        this.props.onVisibleTodosChange();
      }
    }
  }, {
    key: "handleRemoveTodo",
    value: function handleRemoveTodo(todo) {

      todo.destroy();

      var index = this.todos.indexOf(todo);

      this.todos.splice(index, 1);

      if (todo.isVisible) {

        this.numVisibleTodos--;
        this.props.onVisibleTodosChange();
      }

      this.props.onRemoveTodo();
    }
  }, {
    key: "clearCompleted",
    value: function clearCompleted() {

      this.todos.filter(function (todo) {
        return todo.completed;
      }).forEach(this.handleRemoveTodo);
    }
  }, {
    key: "render",
    value: function render() {
      return "<ol class=\"todo-list\"></ol>";
    }
  }, {
    key: "length",
    get: function get() {

      return this.todos.length;
    }
  }]);

  return TodoList;
}(_component2.default);

exports.default = TodoList;

/***/ }),

/***/ "./TodoApp/TodoList/styles.styl":
/*!**************************************!*\
  !*** ./TodoApp/TodoList/styles.styl ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./TodoApp/index.js":
/*!**************************!*\
  !*** ./TodoApp/index.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _component = __webpack_require__(/*! component */ "../index.js");

var _component2 = _interopRequireDefault(_component);

var _TodoInput = __webpack_require__(/*! ./TodoInput */ "./TodoApp/TodoInput/index.js");

var _TodoInput2 = _interopRequireDefault(_TodoInput);

var _TodoList = __webpack_require__(/*! ./TodoList */ "./TodoApp/TodoList/index.js");

var _TodoList2 = _interopRequireDefault(_TodoList);

var _TodoFooter = __webpack_require__(/*! ./TodoFooter */ "./TodoApp/TodoFooter/index.js");

var _TodoFooter2 = _interopRequireDefault(_TodoFooter);

__webpack_require__(/*! ./index.styl */ "./TodoApp/index.styl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var hasTodosClassName = " has-todos";

var TodoApp = function (_Component) {
  _inherits(TodoApp, _Component);

  function TodoApp(props, container) {
    _classCallCheck(this, TodoApp);

    var _this = _possibleConstructorReturn(this, (TodoApp.__proto__ || Object.getPrototypeOf(TodoApp)).call(this, props, container));

    _this.handleNewTodo = _this.handleNewTodo.bind(_this);
    _this.statuses = ["All", "Completed", "Pending"];
    _this.selectedStatus = _this.statuses[0];
    _this.handleStatusChange = _this.handleStatusChange.bind(_this);
    _this.handleRemoveTodo = _this.handleRemoveTodo.bind(_this);
    _this.handleVisibleTodosChange = _this.handleVisibleTodosChange.bind(_this);
    _this.handleTodoStatusChange = _this.handleTodoStatusChange.bind(_this);
    _this.handleCheckAllChange = _this.handleCheckAllChange.bind(_this);
    _this.handleClearCompleted = _this.handleClearCompleted.bind(_this);
    return _this;
  }

  _createClass(TodoApp, [{
    key: "toggleHasTodosClass",
    value: function toggleHasTodosClass() {

      var hasTodos = this.todoList.todos.length > 0;
      var className = this.$el.className;

      if (hasTodos) {

        className = "" + className + hasTodosClassName;
      } else {

        className = className.replace(hasTodosClassName, "");
      }

      this.$el.className = className;
    }
  }, {
    key: "handleStatusChange",
    value: function handleStatusChange(status) {

      this.todoList.filter(status);
    }
  }, {
    key: "handleVisibleTodosChange",
    value: function handleVisibleTodosChange() {

      this.todoFooter.updateNumVisibleTodos(this.todoList.numVisibleTodos);
    }
  }, {
    key: "handleTodoStatusChange",
    value: function handleTodoStatusChange() {

      this.todoInput.setCheckAll(false);
    }
  }, {
    key: "handleRemoveTodo",
    value: function handleRemoveTodo() {

      var todosLength = this.todoList.length;

      this.todoFooter.updateNumTodos(todosLength);

      if (!todosLength) {

        this.todoInput.setCheckAll(false);
        this.toggleHasTodosClass();
      }
    }
  }, {
    key: "handleNewTodo",
    value: function handleNewTodo(text) {

      var prevTodosLength = this.todoList.length;

      this.todoList.addTodo({ text: text });
      this.todoFooter.updateNumTodos(this.todoList.length);

      if (!prevTodosLength) {

        this.toggleHasTodosClass();
      }
    }
  }, {
    key: "handleCheckAllChange",
    value: function handleCheckAllChange(isChecked) {

      this.todoList.setAllTodosStatus(isChecked);
    }
  }, {
    key: "handleClearCompleted",
    value: function handleClearCompleted() {

      this.todoList.clearCompleted();
    }
  }, {
    key: "componentWillMount",
    value: function componentWillMount() {

      this.todoInput = new _TodoInput2.default({
        onSubmit: this.handleNewTodo,
        onCheckAllChange: this.handleCheckAllChange
      }, this.$el.querySelector(".todo-input-container"));
      this.todoList = new _TodoList2.default({
        onVisibleTodosChange: this.handleVisibleTodosChange,
        onTodoStatusChange: this.handleTodoStatusChange,
        onRemoveTodo: this.handleRemoveTodo,
        status: this.selectedStatus
      }, this.$el.querySelector(".todo-list-container"));
      this.todoFooter = new _TodoFooter2.default({
        statuses: this.statuses,
        selectedStatus: this.selectedStatus,
        onStatusChange: this.handleStatusChange,
        onClearCompleted: this.handleClearCompleted
      }, this.$el.querySelector(".todo-footer-container"));
    }
  }, {
    key: "render",
    value: function render() {

      return "\n      <div class=\"todo-app\">\n        <div class=\"todo-input-container\"></div>\n        <div class=\"todo-list-container\"></div>\n        <div class=\"todo-footer-container\"></div>\n      </div>\n    ";
    }
  }]);

  return TodoApp;
}(_component2.default);

var todoApp = new TodoApp({}, document.body);

/***/ }),

/***/ "./TodoApp/index.styl":
/*!****************************!*\
  !*** ./TodoApp/index.styl ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map