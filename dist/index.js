/******/ var __webpack_modules__ = ({

/***/ "@tarojs/components":
/*!*************************************!*\
  !*** external "@tarojs/components" ***!
  \*************************************/
/***/ (function(module) {

module.exports = require("@tarojs/components");

/***/ }),

/***/ "@tarojs/taro":
/*!*******************************!*\
  !*** external "@tarojs/taro" ***!
  \*******************************/
/***/ (function(module) {

module.exports = require("@tarojs/taro");

/***/ }),

/***/ "classnames":
/*!*****************************!*\
  !*** external "classnames" ***!
  \*****************************/
/***/ (function(module) {

module.exports = require("classnames");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ (function(module) {

module.exports = require("react");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ (function(module) {

module.exports = require("react/jsx-runtime");

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
var exports = __webpack_exports__;
/*!***********************!*\
  !*** ./src/index.tsx ***!
  \***********************/


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports["default"] = void 0;
var _components = __webpack_require__(/*! @tarojs/components */ "@tarojs/components");
var _react = __webpack_require__(/*! react */ "react");
var _taro = _interopRequireDefault(__webpack_require__(/*! @tarojs/taro */ "@tarojs/taro"));
var _jsxRuntime = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var stylesNames = function stylesNames(extra) {
  function LodashGet() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var split = url.replace(/(\"|'*)/g, '').replace(/[\[]|[\]]/g, '.').split('.');
    var key = split.reduce(function (a, b) {
      return !b && a || a && a[b];
    }, data);
    return key;
  }
  // cssMap 直接注入
  var cssMap = {
    "styles": {
      "copyright": {
        "padding": "24rpx",
        "textAlign": "center",
        "fontFamily": "PingFangSC-Regular",
        "color": "rgb(71, 75, 78)",
        "fontSize": "24rpx"
      }
    }
  };
  // TODO 根据录入选择是否需要classnames
  for (var _len = arguments.length, arg = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    arg[_key - 1] = arguments[_key];
  }
  var t2 = __webpack_require__(/*! classnames */ "classnames")(arg);
  // 固有style直接注入
  var style = {};
  t2.split(' ').forEach(function (item) {
    style = Object.assign({}, style, LodashGet(cssMap, item));
  });
  // console.log(extra,style)
  return Object.assign({}, extra, style);
};
var _default = function _default() {
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    count = _useState2[0],
    setCount = _useState2[1];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.View, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_components.View, {
      style: stylesNames({}, "styles.copyright"),
      onClick: function onClick() {
        _taro["default"].showToast({
          title: 'Copyright © 2022 梨籽'
        });
      },
      children: "Copyright \xA9 2022 \u68A8\u7C7D"
    })
  });
};
exports["default"] = _default;
}();
exports["default"] = __webpack_exports__["default"];
