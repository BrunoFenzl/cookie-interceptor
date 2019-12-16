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
/******/ 	return __webpack_require__(__webpack_require__.s = "./demo/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./demo/main.js":
/*!**********************!*\
  !*** ./demo/main.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src */ "./src/index.js");

var config = {
  localStorageKey: 'allowedCategories',
  strict: true,
  l10n: window['ci_l10n'],
  categories: window['ciAvailableCookies'],
  collectedCookies: window['ciCollectedCookies']
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function () {
    new _src__WEBPACK_IMPORTED_MODULE_0__["CookieInterceptor"](config);
  });
} else {
  new _src__WEBPACK_IMPORTED_MODULE_0__["CookieInterceptor"](config);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: CookieInterceptor */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CookieInterceptor", function() { return CookieInterceptor; });
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_styles_css__WEBPACK_IMPORTED_MODULE_0__);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var cookieCatTemplate = function cookieCatTemplate(name, values, allowed) {
  return "\n\t\t<div id=\"ci-".concat(name, "\" class=\"ci__category ").concat(name === 'functional' ? 'ci__category--show' : '', "\">\n\t\t\t<div class=\"ci__content\">\n\t\t\t\t<strong>").concat(name, "</strong>\n\t\t\t</div>\n\t\t\t<div class=\"ci__control\">\n\t\t\t\t<input\n\t\t\t\t\tclass=\"ci__input\"\n\t\t\t\t\ttype=\"checkbox\"\n\t\t\t\t\tid=\"ci-").concat(name, "\"\n\t\t\t\t\tname=\"ci-").concat(name, "\"\n\t\t\t\t\t").concat(allowed.indexOf(name) > -1 ? ' checked' : '', ">\n\t\t\t\t<label for=\"ci-").concat(name, "\"></label>\n\t\t\t</div>\n\t\t</div>\n\t");
};

var template = function template(available, allowed, l10n, classes) {
  return "\n\t\t<div id=\"ci-options\" class=\"ci ".concat(classes, "\">\n\t\t\t<div class=\"ci__inner\">\n\t\t\t\t<p>\n\t\t\t\t").concat(l10n.description, "\n\t\t\t\t</p>\n\t\t\t\t<div class=\"ci__controls\">\n\t\t\t\t\t").concat(Object.keys(available).filter(function (c) {
    return available[c] && available[c].length && available[c][0] !== '';
  }).reduce(function (a, c) {
    return a += cookieCatTemplate(c, available[c], allowed);
  }, ''), "\n\t\t\t\t\t<button id=\"ci-submit\" class=\"btn btn-success ci__submit\">").concat(l10n.saveBtn, "</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t");
};

var CookieInterceptor =
/*#__PURE__*/
function () {
  function CookieInterceptor(options) {
    _classCallCheck(this, CookieInterceptor);

    var defaults = {};
    this.options = Object.assign(defaults, options); // setting to a past date effectively disables the cookie

    this.resetDate = 'Thu, 01-Jan-1970 00:00:01 GMT';
    var storedCategories = window.localStorage.getItem(this.options.localStorageKey);
    this.options.allowedCategories = storedCategories ? storedCategories.split(',') : []; // If this key is not present, means either it's the first visit
    // or localStorage was cleaned up. Either way, present the options.

    if (!storedCategories) {
      this.initUI();
    } else {
      this.maybeSetCollectedCookies();
    }
  }

  _createClass(CookieInterceptor, [{
    key: "initUI",
    value: function initUI(container) {
      var _this = this;

      // options are already rendered, skip.
      if (document.getElementById('ci-options') !== null) {
        return;
      }

      this.parentEl;
      var classes = ''; // nothing passed. Defaults to body

      if (!container) {
        this.parentEl = document.body;
      } else if (typeof container === 'string') {
        this.parentEl = document.querySelector(container);
        classes = 'ci--relative';
      } else if (container.nodeType === Node.ELEMENT_NODE) {
        this.parentEl = container;
        classes = 'ci--relative';
      } // render


      var range = document.createRange();
      range.selectNode(this.parentEl);
      var compiled = template(this.options.categories, this.options.allowedCategories, this.options.l10n, classes);
      var documentFragment = range.createContextualFragment(compiled);
      this.parentEl.appendChild(documentFragment);
      var controls = [].slice.call(document.querySelectorAll('input.ci__input'));
      var submit = document.getElementById('ci-submit');
      controls.forEach(function (control) {
        if (control.name === 'ci-necessary') {
          control.checked = true;
          control.disabled = true;
        } else {
          control.addEventListener('change', _this.optionChange.bind(_this));
        }
      });
      submit.addEventListener('click', this.destroyUI.bind(this));
    }
  }, {
    key: "optionChange",
    value: function optionChange() {
      var query = document.querySelectorAll('input.ci__input:checked');
      this.options.allowedCategories = [].slice.call(query).map(function (e) {
        return e.name.split('-')[1];
      });
      this.saveAllowedCategories();
      this.maybeSetCollectedCookies();
    }
  }, {
    key: "getCookiesFromCategories",
    value: function getCookiesFromCategories() {
      var whitelist = [];
      this.options.allowedCategories.forEach(function (e) {
        whitelist = [].concat.apply(whitelist, ciAvailableCookies[e]);
      });
      return whitelist;
    }
  }, {
    key: "saveAllowedCategories",
    value: function saveAllowedCategories() {
      window.localStorage.setItem('allowedCategories', this.options.allowedCategories.join(','));
    }
  }, {
    key: "maybeSetCollectedCookies",
    value: function maybeSetCollectedCookies() {
      var _this2 = this;

      var cookiesConsented = this.getCookiesFromCategories();
      /*
      Some scripts may try to set the same cookie a few times (e.g. google analytics)
      adding duplicate entries to collectedCookies. Let's dedupe them here.
      */

      var dedupe = {};
      this.options.collectedCookies.forEach(function (e) {
        var c = e.split('=')[0];
        dedupe[c] = e;
      }); // remove cookies from the document
      // that are't in the consented list

      if (this.options.strict) {
        var inDoc = this.getCookieKeys();
        inDoc.forEach(function (key) {
          if (cookiesConsented.indexOf(key) === -1) {
            _this2.eraseCookieFromAllPaths(key);
          }
        });
      }

      Object.keys(dedupe) // get all cookies already set for this domain
      .forEach(function (key) {
        // set the cookie if present in the list the user consented
        if (cookiesConsented.indexOf(key) > -1) {
          document.cookie = dedupe[key];
        }
      });
    } // This function will attempt to remove a cookie from all paths.

  }, {
    key: "eraseCookieFromAllPaths",
    value: function eraseCookieFromAllPaths(name) {
      var _this3 = this;

      var path = '/'; // Try without path and domain first

      document.cookie = "!".concat(name, "=; expires=").concat(this.resetDate, ";"); // Cookies that were set with path and/or domain need to be reset with
      // those same values otherwise they will be converted to session cookies

      location.pathname.split('/').forEach(function (chunk) {
        path += path.substr(-1) === '/' ? chunk : '/' + chunk;
        document.cookie = "!".concat(name, "=; expires=").concat(_this3.resetDate, "; path=").concat(path, "; domain=.").concat(window.location.hostname);
        document.cookie = "!".concat(name, "=; expires=").concat(_this3.resetDate, "; path=").concat(path, "; domain=").concat(window.location.hostname);
        document.cookie = "!".concat(name, "=; expires=").concat(_this3.resetDate, "; path=").concat(path, ";");
      });
    }
    /**
     * Based on keys() method from https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie/Simple_document.cookie_framework
     */

  }, {
    key: "getCookieKeys",
    value: function getCookieKeys() {
      return document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, '').split(/\s*(?:\=[^;]*)?;\s*/).map(function (e) {
        return decodeURIComponent(e);
      });
    }
  }, {
    key: "destroyUI",
    value: function destroyUI() {
      // set options from checkboxes
      this.optionChange();
      this.parentEl.removeChild(document.getElementById('ci-options'));
    }
  }]);

  return CookieInterceptor;
}();
window.cookieInterceptor = new CookieInterceptor({
  localStorageKey: 'allowedCategories',
  strict: true,
  l10n: window['ci_l10n'],
  categories: window['ciAvailableCookies'],
  collectedCookies: window['ciCollectedCookies']
});

/***/ }),

/***/ "./src/styles.css":
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vZGVtby9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvc3R5bGVzLmNzcz8xNTUzIl0sIm5hbWVzIjpbImNvbmZpZyIsImxvY2FsU3RvcmFnZUtleSIsInN0cmljdCIsImwxMG4iLCJ3aW5kb3ciLCJjYXRlZ29yaWVzIiwiY29sbGVjdGVkQ29va2llcyIsImRvY3VtZW50IiwicmVhZHlTdGF0ZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJDb29raWVJbnRlcmNlcHRvciIsImNvb2tpZUNhdFRlbXBsYXRlIiwibmFtZSIsInZhbHVlcyIsImFsbG93ZWQiLCJpbmRleE9mIiwidGVtcGxhdGUiLCJhdmFpbGFibGUiLCJjbGFzc2VzIiwiZGVzY3JpcHRpb24iLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwiYyIsImxlbmd0aCIsInJlZHVjZSIsImEiLCJzYXZlQnRuIiwib3B0aW9ucyIsImRlZmF1bHRzIiwiYXNzaWduIiwicmVzZXREYXRlIiwic3RvcmVkQ2F0ZWdvcmllcyIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJhbGxvd2VkQ2F0ZWdvcmllcyIsInNwbGl0IiwiaW5pdFVJIiwibWF5YmVTZXRDb2xsZWN0ZWRDb29raWVzIiwiY29udGFpbmVyIiwiZ2V0RWxlbWVudEJ5SWQiLCJwYXJlbnRFbCIsImJvZHkiLCJxdWVyeVNlbGVjdG9yIiwibm9kZVR5cGUiLCJOb2RlIiwiRUxFTUVOVF9OT0RFIiwicmFuZ2UiLCJjcmVhdGVSYW5nZSIsInNlbGVjdE5vZGUiLCJjb21waWxlZCIsImRvY3VtZW50RnJhZ21lbnQiLCJjcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQiLCJhcHBlbmRDaGlsZCIsImNvbnRyb2xzIiwic2xpY2UiLCJjYWxsIiwicXVlcnlTZWxlY3RvckFsbCIsInN1Ym1pdCIsImZvckVhY2giLCJjb250cm9sIiwiY2hlY2tlZCIsImRpc2FibGVkIiwib3B0aW9uQ2hhbmdlIiwiYmluZCIsImRlc3Ryb3lVSSIsInF1ZXJ5IiwibWFwIiwiZSIsInNhdmVBbGxvd2VkQ2F0ZWdvcmllcyIsIndoaXRlbGlzdCIsImNvbmNhdCIsImFwcGx5IiwiY2lBdmFpbGFibGVDb29raWVzIiwic2V0SXRlbSIsImpvaW4iLCJjb29raWVzQ29uc2VudGVkIiwiZ2V0Q29va2llc0Zyb21DYXRlZ29yaWVzIiwiZGVkdXBlIiwiaW5Eb2MiLCJnZXRDb29raWVLZXlzIiwia2V5IiwiZXJhc2VDb29raWVGcm9tQWxsUGF0aHMiLCJjb29raWUiLCJwYXRoIiwibG9jYXRpb24iLCJwYXRobmFtZSIsImNodW5rIiwic3Vic3RyIiwiaG9zdG5hbWUiLCJyZXBsYWNlIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwicmVtb3ZlQ2hpbGQiLCJjb29raWVJbnRlcmNlcHRvciJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQUFBO0FBQUE7QUFFQSxJQUFNQSxNQUFNLEdBQUc7QUFDYkMsaUJBQWUsRUFBRSxtQkFESjtBQUViQyxRQUFNLEVBQUUsSUFGSztBQUdiQyxNQUFJLEVBQUVDLE1BQU0sQ0FBQyxTQUFELENBSEM7QUFJYkMsWUFBVSxFQUFFRCxNQUFNLENBQUMsb0JBQUQsQ0FKTDtBQUtiRSxrQkFBZ0IsRUFBRUYsTUFBTSxDQUFDLG9CQUFEO0FBTFgsQ0FBZjs7QUFRQSxJQUFJRyxRQUFRLENBQUNDLFVBQVQsS0FBd0IsU0FBNUIsRUFBdUM7QUFDckNELFVBQVEsQ0FBQ0UsZ0JBQVQsQ0FBMEIsa0JBQTFCLEVBQThDLFlBQU07QUFDbEQsUUFBSUMsc0RBQUosQ0FBc0JWLE1BQXRCO0FBQ0QsR0FGRDtBQUdELENBSkQsTUFJTztBQUNMLE1BQUlVLHNEQUFKLENBQXNCVixNQUF0QjtBQUNELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQkQ7O0FBRUEsSUFBTVcsaUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFDQyxJQUFELEVBQU9DLE1BQVAsRUFBZUMsT0FBZjtBQUFBLHNDQUNWRixJQURVLHFDQUV4QkEsSUFBSSxLQUFLLFlBQVQsR0FBd0Isb0JBQXhCLEdBQStDLEVBRnZCLHFFQUtaQSxJQUxZLHVLQVdaQSxJQVhZLHFDQVlWQSxJQVpVLDJCQWFuQkUsT0FBTyxDQUFDQyxPQUFSLENBQWdCSCxJQUFoQixJQUF3QixDQUFDLENBQXpCLEdBQTZCLFVBQTdCLEdBQTBDLEVBYnZCLHdDQWNMQSxJQWRLO0FBQUEsQ0FBMUI7O0FBbUJBLElBQU1JLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUNDLFNBQUQsRUFBWUgsT0FBWixFQUFxQlgsSUFBckIsRUFBMkJlLE9BQTNCO0FBQUEsMkRBQ2tCQSxPQURsQix3RUFJWGYsSUFBSSxDQUFDZ0IsV0FKTSw2RUFPVkMsTUFBTSxDQUFDQyxJQUFQLENBQVlKLFNBQVosRUFDTUssTUFETixDQUVPLFVBQUFDLENBQUM7QUFBQSxXQUFJTixTQUFTLENBQUNNLENBQUQsQ0FBVCxJQUFnQk4sU0FBUyxDQUFDTSxDQUFELENBQVQsQ0FBYUMsTUFBN0IsSUFBdUNQLFNBQVMsQ0FBQ00sQ0FBRCxDQUFULENBQWEsQ0FBYixNQUFvQixFQUEvRDtBQUFBLEdBRlIsRUFJTUUsTUFKTixDQUtPLFVBQUNDLENBQUQsRUFBSUgsQ0FBSjtBQUFBLFdBQVdHLENBQUMsSUFBSWYsaUJBQWlCLENBQUNZLENBQUQsRUFBSU4sU0FBUyxDQUFDTSxDQUFELENBQWIsRUFBa0JULE9BQWxCLENBQWpDO0FBQUEsR0FMUCxFQU1PLEVBTlAsQ0FQVSx1RkFnQkxYLElBQUksQ0FBQ3dCLE9BaEJBO0FBQUEsQ0FBakI7O0FBdUJPLElBQU1qQixpQkFBYjtBQUFBO0FBQUE7QUFDRSw2QkFBWWtCLE9BQVosRUFBcUI7QUFBQTs7QUFDbkIsUUFBTUMsUUFBUSxHQUFHLEVBQWpCO0FBQ0EsU0FBS0QsT0FBTCxHQUFlUixNQUFNLENBQUNVLE1BQVAsQ0FBY0QsUUFBZCxFQUF3QkQsT0FBeEIsQ0FBZixDQUZtQixDQUduQjs7QUFDQSxTQUFLRyxTQUFMLEdBQWlCLCtCQUFqQjtBQUNBLFFBQU1DLGdCQUFnQixHQUFHNUIsTUFBTSxDQUFDNkIsWUFBUCxDQUFvQkMsT0FBcEIsQ0FDdkIsS0FBS04sT0FBTCxDQUFhM0IsZUFEVSxDQUF6QjtBQUdBLFNBQUsyQixPQUFMLENBQWFPLGlCQUFiLEdBQWlDSCxnQkFBZ0IsR0FDN0NBLGdCQUFnQixDQUFDSSxLQUFqQixDQUF1QixHQUF2QixDQUQ2QyxHQUU3QyxFQUZKLENBUm1CLENBWW5CO0FBQ0E7O0FBQ0EsUUFBSSxDQUFDSixnQkFBTCxFQUF1QjtBQUNyQixXQUFLSyxNQUFMO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsV0FBS0Msd0JBQUw7QUFDRDtBQUNGOztBQXBCSDtBQUFBO0FBQUEsMkJBc0JTQyxTQXRCVCxFQXNCb0I7QUFBQTs7QUFDaEI7QUFDQSxVQUFJaEMsUUFBUSxDQUFDaUMsY0FBVCxDQUF3QixZQUF4QixNQUEwQyxJQUE5QyxFQUFvRDtBQUNsRDtBQUNEOztBQUVELFdBQUtDLFFBQUw7QUFDQSxVQUFJdkIsT0FBTyxHQUFHLEVBQWQsQ0FQZ0IsQ0FRaEI7O0FBQ0EsVUFBSSxDQUFDcUIsU0FBTCxFQUFnQjtBQUNkLGFBQUtFLFFBQUwsR0FBZ0JsQyxRQUFRLENBQUNtQyxJQUF6QjtBQUNELE9BRkQsTUFFTyxJQUFJLE9BQU9ILFNBQVAsS0FBcUIsUUFBekIsRUFBbUM7QUFDeEMsYUFBS0UsUUFBTCxHQUFnQmxDLFFBQVEsQ0FBQ29DLGFBQVQsQ0FBdUJKLFNBQXZCLENBQWhCO0FBQ0FyQixlQUFPLEdBQUcsY0FBVjtBQUNELE9BSE0sTUFHQSxJQUFJcUIsU0FBUyxDQUFDSyxRQUFWLEtBQXVCQyxJQUFJLENBQUNDLFlBQWhDLEVBQThDO0FBQ25ELGFBQUtMLFFBQUwsR0FBZ0JGLFNBQWhCO0FBQ0FyQixlQUFPLEdBQUcsY0FBVjtBQUNELE9BakJlLENBa0JoQjs7O0FBQ0EsVUFBTTZCLEtBQUssR0FBR3hDLFFBQVEsQ0FBQ3lDLFdBQVQsRUFBZDtBQUNBRCxXQUFLLENBQUNFLFVBQU4sQ0FBaUIsS0FBS1IsUUFBdEI7QUFDQSxVQUFNUyxRQUFRLEdBQUdsQyxRQUFRLENBQ3ZCLEtBQUtZLE9BQUwsQ0FBYXZCLFVBRFUsRUFFdkIsS0FBS3VCLE9BQUwsQ0FBYU8saUJBRlUsRUFHdkIsS0FBS1AsT0FBTCxDQUFhekIsSUFIVSxFQUl2QmUsT0FKdUIsQ0FBekI7QUFNQSxVQUFNaUMsZ0JBQWdCLEdBQUdKLEtBQUssQ0FBQ0ssd0JBQU4sQ0FBK0JGLFFBQS9CLENBQXpCO0FBQ0EsV0FBS1QsUUFBTCxDQUFjWSxXQUFkLENBQTBCRixnQkFBMUI7QUFFQSxVQUFNRyxRQUFRLEdBQUcsR0FBR0MsS0FBSCxDQUFTQyxJQUFULENBQ2ZqRCxRQUFRLENBQUNrRCxnQkFBVCxDQUEwQixpQkFBMUIsQ0FEZSxDQUFqQjtBQUdBLFVBQU1DLE1BQU0sR0FBR25ELFFBQVEsQ0FBQ2lDLGNBQVQsQ0FBd0IsV0FBeEIsQ0FBZjtBQUVBYyxjQUFRLENBQUNLLE9BQVQsQ0FBaUIsVUFBQUMsT0FBTyxFQUFJO0FBQzFCLFlBQUlBLE9BQU8sQ0FBQ2hELElBQVIsS0FBaUIsY0FBckIsRUFBcUM7QUFDbkNnRCxpQkFBTyxDQUFDQyxPQUFSLEdBQWtCLElBQWxCO0FBQ0FELGlCQUFPLENBQUNFLFFBQVIsR0FBbUIsSUFBbkI7QUFDRCxTQUhELE1BR087QUFDTEYsaUJBQU8sQ0FBQ25ELGdCQUFSLENBQXlCLFFBQXpCLEVBQW1DLEtBQUksQ0FBQ3NELFlBQUwsQ0FBa0JDLElBQWxCLENBQXVCLEtBQXZCLENBQW5DO0FBQ0Q7QUFDRixPQVBEO0FBU0FOLFlBQU0sQ0FBQ2pELGdCQUFQLENBQXdCLE9BQXhCLEVBQWlDLEtBQUt3RCxTQUFMLENBQWVELElBQWYsQ0FBb0IsSUFBcEIsQ0FBakM7QUFDRDtBQW5FSDtBQUFBO0FBQUEsbUNBcUVpQjtBQUNiLFVBQU1FLEtBQUssR0FBRzNELFFBQVEsQ0FBQ2tELGdCQUFULENBQTBCLHlCQUExQixDQUFkO0FBQ0EsV0FBSzdCLE9BQUwsQ0FBYU8saUJBQWIsR0FBaUMsR0FBR29CLEtBQUgsQ0FDOUJDLElBRDhCLENBQ3pCVSxLQUR5QixFQUU5QkMsR0FGOEIsQ0FFMUIsVUFBQUMsQ0FBQztBQUFBLGVBQUlBLENBQUMsQ0FBQ3hELElBQUYsQ0FBT3dCLEtBQVAsQ0FBYSxHQUFiLEVBQWtCLENBQWxCLENBQUo7QUFBQSxPQUZ5QixDQUFqQztBQUlBLFdBQUtpQyxxQkFBTDtBQUNBLFdBQUsvQix3QkFBTDtBQUNEO0FBN0VIO0FBQUE7QUFBQSwrQ0ErRTZCO0FBQ3pCLFVBQUlnQyxTQUFTLEdBQUcsRUFBaEI7QUFDQSxXQUFLMUMsT0FBTCxDQUFhTyxpQkFBYixDQUErQndCLE9BQS9CLENBQXVDLFVBQVNTLENBQVQsRUFBWTtBQUNqREUsaUJBQVMsR0FBRyxHQUFHQyxNQUFILENBQVVDLEtBQVYsQ0FBZ0JGLFNBQWhCLEVBQTJCRyxrQkFBa0IsQ0FBQ0wsQ0FBRCxDQUE3QyxDQUFaO0FBQ0QsT0FGRDtBQUdBLGFBQU9FLFNBQVA7QUFDRDtBQXJGSDtBQUFBO0FBQUEsNENBdUYwQjtBQUN0QmxFLFlBQU0sQ0FBQzZCLFlBQVAsQ0FBb0J5QyxPQUFwQixDQUNFLG1CQURGLEVBRUUsS0FBSzlDLE9BQUwsQ0FBYU8saUJBQWIsQ0FBK0J3QyxJQUEvQixDQUFvQyxHQUFwQyxDQUZGO0FBSUQ7QUE1Rkg7QUFBQTtBQUFBLCtDQThGNkI7QUFBQTs7QUFDekIsVUFBTUMsZ0JBQWdCLEdBQUcsS0FBS0Msd0JBQUwsRUFBekI7QUFDQTs7Ozs7QUFJQSxVQUFNQyxNQUFNLEdBQUcsRUFBZjtBQUNBLFdBQUtsRCxPQUFMLENBQWF0QixnQkFBYixDQUE4QnFELE9BQTlCLENBQXNDLFVBQUFTLENBQUMsRUFBSTtBQUN6QyxZQUFNN0MsQ0FBQyxHQUFHNkMsQ0FBQyxDQUFDaEMsS0FBRixDQUFRLEdBQVIsRUFBYSxDQUFiLENBQVY7QUFDQTBDLGNBQU0sQ0FBQ3ZELENBQUQsQ0FBTixHQUFZNkMsQ0FBWjtBQUNELE9BSEQsRUFQeUIsQ0FZekI7QUFDQTs7QUFDQSxVQUFJLEtBQUt4QyxPQUFMLENBQWExQixNQUFqQixFQUF5QjtBQUN2QixZQUFNNkUsS0FBSyxHQUFHLEtBQUtDLGFBQUwsRUFBZDtBQUNBRCxhQUFLLENBQUNwQixPQUFOLENBQWMsVUFBQXNCLEdBQUcsRUFBSTtBQUNuQixjQUFJTCxnQkFBZ0IsQ0FBQzdELE9BQWpCLENBQXlCa0UsR0FBekIsTUFBa0MsQ0FBQyxDQUF2QyxFQUEwQztBQUN4QyxrQkFBSSxDQUFDQyx1QkFBTCxDQUE2QkQsR0FBN0I7QUFDRDtBQUNGLFNBSkQ7QUFLRDs7QUFFRDdELFlBQU0sQ0FBQ0MsSUFBUCxDQUFZeUQsTUFBWixFQUFvQjtBQUFwQixPQUNHbkIsT0FESCxDQUNXLFVBQUFzQixHQUFHLEVBQUk7QUFDZDtBQUNBLFlBQUlMLGdCQUFnQixDQUFDN0QsT0FBakIsQ0FBeUJrRSxHQUF6QixJQUFnQyxDQUFDLENBQXJDLEVBQXdDO0FBQ3RDMUUsa0JBQVEsQ0FBQzRFLE1BQVQsR0FBa0JMLE1BQU0sQ0FBQ0csR0FBRCxDQUF4QjtBQUNEO0FBQ0YsT0FOSDtBQU9ELEtBNUhILENBOEhFOztBQTlIRjtBQUFBO0FBQUEsNENBK0gwQnJFLElBL0gxQixFQStIZ0M7QUFBQTs7QUFDNUIsVUFBSXdFLElBQUksR0FBRyxHQUFYLENBRDRCLENBRzVCOztBQUNBN0UsY0FBUSxDQUFDNEUsTUFBVCxjQUFzQnZFLElBQXRCLHdCQUF3QyxLQUFLbUIsU0FBN0MsT0FKNEIsQ0FNNUI7QUFDQTs7QUFDQXNELGNBQVEsQ0FBQ0MsUUFBVCxDQUFrQmxELEtBQWxCLENBQXdCLEdBQXhCLEVBQTZCdUIsT0FBN0IsQ0FBcUMsVUFBQTRCLEtBQUssRUFBSTtBQUM1Q0gsWUFBSSxJQUFJQSxJQUFJLENBQUNJLE1BQUwsQ0FBWSxDQUFDLENBQWIsTUFBb0IsR0FBcEIsR0FBMEJELEtBQTFCLEdBQWtDLE1BQU1BLEtBQWhEO0FBQ0FoRixnQkFBUSxDQUFDNEUsTUFBVCxjQUFzQnZFLElBQXRCLHdCQUF3QyxNQUFJLENBQUNtQixTQUE3QyxvQkFBZ0VxRCxJQUFoRSx1QkFBaUZoRixNQUFNLENBQUNpRixRQUFQLENBQWdCSSxRQUFqRztBQUNBbEYsZ0JBQVEsQ0FBQzRFLE1BQVQsY0FBc0J2RSxJQUF0Qix3QkFBd0MsTUFBSSxDQUFDbUIsU0FBN0Msb0JBQWdFcUQsSUFBaEUsc0JBQWdGaEYsTUFBTSxDQUFDaUYsUUFBUCxDQUFnQkksUUFBaEc7QUFDQWxGLGdCQUFRLENBQUM0RSxNQUFULGNBQXNCdkUsSUFBdEIsd0JBQXdDLE1BQUksQ0FBQ21CLFNBQTdDLG9CQUFnRXFELElBQWhFO0FBQ0QsT0FMRDtBQU1EO0FBRUQ7Ozs7QUEvSUY7QUFBQTtBQUFBLG9DQWtKa0I7QUFDZCxhQUFPN0UsUUFBUSxDQUFDNEUsTUFBVCxDQUNKTyxPQURJLENBQ0kseURBREosRUFDK0QsRUFEL0QsRUFFSnRELEtBRkksQ0FFRSxxQkFGRixFQUdKK0IsR0FISSxDQUdBLFVBQUFDLENBQUM7QUFBQSxlQUFJdUIsa0JBQWtCLENBQUN2QixDQUFELENBQXRCO0FBQUEsT0FIRCxDQUFQO0FBSUQ7QUF2Skg7QUFBQTtBQUFBLGdDQXlKYztBQUNWO0FBQ0EsV0FBS0wsWUFBTDtBQUNBLFdBQUt0QixRQUFMLENBQWNtRCxXQUFkLENBQTBCckYsUUFBUSxDQUFDaUMsY0FBVCxDQUF3QixZQUF4QixDQUExQjtBQUNEO0FBN0pIOztBQUFBO0FBQUE7QUFnS0FwQyxNQUFNLENBQUN5RixpQkFBUCxHQUEyQixJQUFJbkYsaUJBQUosQ0FBc0I7QUFDL0NULGlCQUFlLEVBQUUsbUJBRDhCO0FBRS9DQyxRQUFNLEVBQUUsSUFGdUM7QUFHL0NDLE1BQUksRUFBRUMsTUFBTSxDQUFDLFNBQUQsQ0FIbUM7QUFJL0NDLFlBQVUsRUFBRUQsTUFBTSxDQUFDLG9CQUFELENBSjZCO0FBSy9DRSxrQkFBZ0IsRUFBRUYsTUFBTSxDQUFDLG9CQUFEO0FBTHVCLENBQXRCLENBQTNCLEM7Ozs7Ozs7Ozs7O0FDNU1BLHVDIiwiZmlsZSI6ImNvb2tpZS1pbnRlcmNlcHRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vZGVtby9tYWluLmpzXCIpO1xuIiwiaW1wb3J0IHsgQ29va2llSW50ZXJjZXB0b3IgfSBmcm9tICcuLi9zcmMnO1xuXG5jb25zdCBjb25maWcgPSB7XG4gIGxvY2FsU3RvcmFnZUtleTogJ2FsbG93ZWRDYXRlZ29yaWVzJyxcbiAgc3RyaWN0OiB0cnVlLFxuICBsMTBuOiB3aW5kb3dbJ2NpX2wxMG4nXSxcbiAgY2F0ZWdvcmllczogd2luZG93WydjaUF2YWlsYWJsZUNvb2tpZXMnXSxcbiAgY29sbGVjdGVkQ29va2llczogd2luZG93WydjaUNvbGxlY3RlZENvb2tpZXMnXVxufTtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIG5ldyBDb29raWVJbnRlcmNlcHRvcihjb25maWcpO1xuICB9KTtcbn0gZWxzZSB7XG4gIG5ldyBDb29raWVJbnRlcmNlcHRvcihjb25maWcpO1xufVxuIiwiaW1wb3J0ICcuL3N0eWxlcy5jc3MnO1xuXG5jb25zdCBjb29raWVDYXRUZW1wbGF0ZSA9IChuYW1lLCB2YWx1ZXMsIGFsbG93ZWQpID0+IGBcblx0XHQ8ZGl2IGlkPVwiY2ktJHtuYW1lfVwiIGNsYXNzPVwiY2lfX2NhdGVnb3J5ICR7XG4gIG5hbWUgPT09ICdmdW5jdGlvbmFsJyA/ICdjaV9fY2F0ZWdvcnktLXNob3cnIDogJydcbn1cIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJjaV9fY29udGVudFwiPlxuXHRcdFx0XHQ8c3Ryb25nPiR7bmFtZX08L3N0cm9uZz5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGRpdiBjbGFzcz1cImNpX19jb250cm9sXCI+XG5cdFx0XHRcdDxpbnB1dFxuXHRcdFx0XHRcdGNsYXNzPVwiY2lfX2lucHV0XCJcblx0XHRcdFx0XHR0eXBlPVwiY2hlY2tib3hcIlxuXHRcdFx0XHRcdGlkPVwiY2ktJHtuYW1lfVwiXG5cdFx0XHRcdFx0bmFtZT1cImNpLSR7bmFtZX1cIlxuXHRcdFx0XHRcdCR7YWxsb3dlZC5pbmRleE9mKG5hbWUpID4gLTEgPyAnIGNoZWNrZWQnIDogJyd9PlxuXHRcdFx0XHQ8bGFiZWwgZm9yPVwiY2ktJHtuYW1lfVwiPjwvbGFiZWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0YDtcblxuY29uc3QgdGVtcGxhdGUgPSAoYXZhaWxhYmxlLCBhbGxvd2VkLCBsMTBuLCBjbGFzc2VzKSA9PiBgXG5cdFx0PGRpdiBpZD1cImNpLW9wdGlvbnNcIiBjbGFzcz1cImNpICR7Y2xhc3Nlc31cIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJjaV9faW5uZXJcIj5cblx0XHRcdFx0PHA+XG5cdFx0XHRcdCR7bDEwbi5kZXNjcmlwdGlvbn1cblx0XHRcdFx0PC9wPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiY2lfX2NvbnRyb2xzXCI+XG5cdFx0XHRcdFx0JHtPYmplY3Qua2V5cyhhdmFpbGFibGUpXG4gICAgICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgICAgICBjID0+IGF2YWlsYWJsZVtjXSAmJiBhdmFpbGFibGVbY10ubGVuZ3RoICYmIGF2YWlsYWJsZVtjXVswXSAhPT0gJydcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5yZWR1Y2UoXG4gICAgICAgICAgICAgIChhLCBjKSA9PiAoYSArPSBjb29raWVDYXRUZW1wbGF0ZShjLCBhdmFpbGFibGVbY10sIGFsbG93ZWQpKSxcbiAgICAgICAgICAgICAgJydcbiAgICAgICAgICAgICl9XG5cdFx0XHRcdFx0PGJ1dHRvbiBpZD1cImNpLXN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1zdWNjZXNzIGNpX19zdWJtaXRcIj4ke1xuICAgICAgICAgICAgbDEwbi5zYXZlQnRuXG4gICAgICAgICAgfTwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHRgO1xuXG5leHBvcnQgY2xhc3MgQ29va2llSW50ZXJjZXB0b3Ige1xuICBjb25zdHJ1Y3RvcihvcHRpb25zKSB7XG4gICAgY29uc3QgZGVmYXVsdHMgPSB7fTtcbiAgICB0aGlzLm9wdGlvbnMgPSBPYmplY3QuYXNzaWduKGRlZmF1bHRzLCBvcHRpb25zKTtcbiAgICAvLyBzZXR0aW5nIHRvIGEgcGFzdCBkYXRlIGVmZmVjdGl2ZWx5IGRpc2FibGVzIHRoZSBjb29raWVcbiAgICB0aGlzLnJlc2V0RGF0ZSA9ICdUaHUsIDAxLUphbi0xOTcwIDAwOjAwOjAxIEdNVCc7XG4gICAgY29uc3Qgc3RvcmVkQ2F0ZWdvcmllcyA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShcbiAgICAgIHRoaXMub3B0aW9ucy5sb2NhbFN0b3JhZ2VLZXlcbiAgICApO1xuICAgIHRoaXMub3B0aW9ucy5hbGxvd2VkQ2F0ZWdvcmllcyA9IHN0b3JlZENhdGVnb3JpZXNcbiAgICAgID8gc3RvcmVkQ2F0ZWdvcmllcy5zcGxpdCgnLCcpXG4gICAgICA6IFtdO1xuXG4gICAgLy8gSWYgdGhpcyBrZXkgaXMgbm90IHByZXNlbnQsIG1lYW5zIGVpdGhlciBpdCdzIHRoZSBmaXJzdCB2aXNpdFxuICAgIC8vIG9yIGxvY2FsU3RvcmFnZSB3YXMgY2xlYW5lZCB1cC4gRWl0aGVyIHdheSwgcHJlc2VudCB0aGUgb3B0aW9ucy5cbiAgICBpZiAoIXN0b3JlZENhdGVnb3JpZXMpIHtcbiAgICAgIHRoaXMuaW5pdFVJKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubWF5YmVTZXRDb2xsZWN0ZWRDb29raWVzKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdFVJKGNvbnRhaW5lcikge1xuICAgIC8vIG9wdGlvbnMgYXJlIGFscmVhZHkgcmVuZGVyZWQsIHNraXAuXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaS1vcHRpb25zJykgIT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnBhcmVudEVsO1xuICAgIGxldCBjbGFzc2VzID0gJyc7XG4gICAgLy8gbm90aGluZyBwYXNzZWQuIERlZmF1bHRzIHRvIGJvZHlcbiAgICBpZiAoIWNvbnRhaW5lcikge1xuICAgICAgdGhpcy5wYXJlbnRFbCA9IGRvY3VtZW50LmJvZHk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgY29udGFpbmVyID09PSAnc3RyaW5nJykge1xuICAgICAgdGhpcy5wYXJlbnRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyKTtcbiAgICAgIGNsYXNzZXMgPSAnY2ktLXJlbGF0aXZlJztcbiAgICB9IGVsc2UgaWYgKGNvbnRhaW5lci5ub2RlVHlwZSA9PT0gTm9kZS5FTEVNRU5UX05PREUpIHtcbiAgICAgIHRoaXMucGFyZW50RWwgPSBjb250YWluZXI7XG4gICAgICBjbGFzc2VzID0gJ2NpLS1yZWxhdGl2ZSc7XG4gICAgfVxuICAgIC8vIHJlbmRlclxuICAgIGNvbnN0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICByYW5nZS5zZWxlY3ROb2RlKHRoaXMucGFyZW50RWwpO1xuICAgIGNvbnN0IGNvbXBpbGVkID0gdGVtcGxhdGUoXG4gICAgICB0aGlzLm9wdGlvbnMuY2F0ZWdvcmllcyxcbiAgICAgIHRoaXMub3B0aW9ucy5hbGxvd2VkQ2F0ZWdvcmllcyxcbiAgICAgIHRoaXMub3B0aW9ucy5sMTBuLFxuICAgICAgY2xhc3Nlc1xuICAgICk7XG4gICAgY29uc3QgZG9jdW1lbnRGcmFnbWVudCA9IHJhbmdlLmNyZWF0ZUNvbnRleHR1YWxGcmFnbWVudChjb21waWxlZCk7XG4gICAgdGhpcy5wYXJlbnRFbC5hcHBlbmRDaGlsZChkb2N1bWVudEZyYWdtZW50KTtcblxuICAgIGNvbnN0IGNvbnRyb2xzID0gW10uc2xpY2UuY2FsbChcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0LmNpX19pbnB1dCcpXG4gICAgKTtcbiAgICBjb25zdCBzdWJtaXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2ktc3VibWl0Jyk7XG5cbiAgICBjb250cm9scy5mb3JFYWNoKGNvbnRyb2wgPT4ge1xuICAgICAgaWYgKGNvbnRyb2wubmFtZSA9PT0gJ2NpLW5lY2Vzc2FyeScpIHtcbiAgICAgICAgY29udHJvbC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgY29udHJvbC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIHRoaXMub3B0aW9uQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5kZXN0cm95VUkuYmluZCh0aGlzKSk7XG4gIH1cblxuICBvcHRpb25DaGFuZ2UoKSB7XG4gICAgY29uc3QgcXVlcnkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dC5jaV9faW5wdXQ6Y2hlY2tlZCcpO1xuICAgIHRoaXMub3B0aW9ucy5hbGxvd2VkQ2F0ZWdvcmllcyA9IFtdLnNsaWNlXG4gICAgICAuY2FsbChxdWVyeSlcbiAgICAgIC5tYXAoZSA9PiBlLm5hbWUuc3BsaXQoJy0nKVsxXSk7XG5cbiAgICB0aGlzLnNhdmVBbGxvd2VkQ2F0ZWdvcmllcygpO1xuICAgIHRoaXMubWF5YmVTZXRDb2xsZWN0ZWRDb29raWVzKCk7XG4gIH1cblxuICBnZXRDb29raWVzRnJvbUNhdGVnb3JpZXMoKSB7XG4gICAgbGV0IHdoaXRlbGlzdCA9IFtdO1xuICAgIHRoaXMub3B0aW9ucy5hbGxvd2VkQ2F0ZWdvcmllcy5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHdoaXRlbGlzdCA9IFtdLmNvbmNhdC5hcHBseSh3aGl0ZWxpc3QsIGNpQXZhaWxhYmxlQ29va2llc1tlXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHdoaXRlbGlzdDtcbiAgfVxuXG4gIHNhdmVBbGxvd2VkQ2F0ZWdvcmllcygpIHtcbiAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oXG4gICAgICAnYWxsb3dlZENhdGVnb3JpZXMnLFxuICAgICAgdGhpcy5vcHRpb25zLmFsbG93ZWRDYXRlZ29yaWVzLmpvaW4oJywnKVxuICAgICk7XG4gIH1cblxuICBtYXliZVNldENvbGxlY3RlZENvb2tpZXMoKSB7XG4gICAgY29uc3QgY29va2llc0NvbnNlbnRlZCA9IHRoaXMuZ2V0Q29va2llc0Zyb21DYXRlZ29yaWVzKCk7XG4gICAgLypcblx0XHRcdFNvbWUgc2NyaXB0cyBtYXkgdHJ5IHRvIHNldCB0aGUgc2FtZSBjb29raWUgYSBmZXcgdGltZXMgKGUuZy4gZ29vZ2xlIGFuYWx5dGljcylcblx0XHRcdGFkZGluZyBkdXBsaWNhdGUgZW50cmllcyB0byBjb2xsZWN0ZWRDb29raWVzLiBMZXQncyBkZWR1cGUgdGhlbSBoZXJlLlxuXHRcdCovXG4gICAgY29uc3QgZGVkdXBlID0ge307XG4gICAgdGhpcy5vcHRpb25zLmNvbGxlY3RlZENvb2tpZXMuZm9yRWFjaChlID0+IHtcbiAgICAgIGNvbnN0IGMgPSBlLnNwbGl0KCc9JylbMF07XG4gICAgICBkZWR1cGVbY10gPSBlO1xuICAgIH0pO1xuXG4gICAgLy8gcmVtb3ZlIGNvb2tpZXMgZnJvbSB0aGUgZG9jdW1lbnRcbiAgICAvLyB0aGF0IGFyZSd0IGluIHRoZSBjb25zZW50ZWQgbGlzdFxuICAgIGlmICh0aGlzLm9wdGlvbnMuc3RyaWN0KSB7XG4gICAgICBjb25zdCBpbkRvYyA9IHRoaXMuZ2V0Q29va2llS2V5cygpO1xuICAgICAgaW5Eb2MuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBpZiAoY29va2llc0NvbnNlbnRlZC5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgdGhpcy5lcmFzZUNvb2tpZUZyb21BbGxQYXRocyhrZXkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhkZWR1cGUpIC8vIGdldCBhbGwgY29va2llcyBhbHJlYWR5IHNldCBmb3IgdGhpcyBkb21haW5cbiAgICAgIC5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIC8vIHNldCB0aGUgY29va2llIGlmIHByZXNlbnQgaW4gdGhlIGxpc3QgdGhlIHVzZXIgY29uc2VudGVkXG4gICAgICAgIGlmIChjb29raWVzQ29uc2VudGVkLmluZGV4T2Yoa2V5KSA+IC0xKSB7XG4gICAgICAgICAgZG9jdW1lbnQuY29va2llID0gZGVkdXBlW2tleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gVGhpcyBmdW5jdGlvbiB3aWxsIGF0dGVtcHQgdG8gcmVtb3ZlIGEgY29va2llIGZyb20gYWxsIHBhdGhzLlxuICBlcmFzZUNvb2tpZUZyb21BbGxQYXRocyhuYW1lKSB7XG4gICAgbGV0IHBhdGggPSAnLyc7XG5cbiAgICAvLyBUcnkgd2l0aG91dCBwYXRoIGFuZCBkb21haW4gZmlyc3RcbiAgICBkb2N1bWVudC5jb29raWUgPSBgISR7bmFtZX09OyBleHBpcmVzPSR7dGhpcy5yZXNldERhdGV9O2A7XG5cbiAgICAvLyBDb29raWVzIHRoYXQgd2VyZSBzZXQgd2l0aCBwYXRoIGFuZC9vciBkb21haW4gbmVlZCB0byBiZSByZXNldCB3aXRoXG4gICAgLy8gdGhvc2Ugc2FtZSB2YWx1ZXMgb3RoZXJ3aXNlIHRoZXkgd2lsbCBiZSBjb252ZXJ0ZWQgdG8gc2Vzc2lvbiBjb29raWVzXG4gICAgbG9jYXRpb24ucGF0aG5hbWUuc3BsaXQoJy8nKS5mb3JFYWNoKGNodW5rID0+IHtcbiAgICAgIHBhdGggKz0gcGF0aC5zdWJzdHIoLTEpID09PSAnLycgPyBjaHVuayA6ICcvJyArIGNodW5rO1xuICAgICAgZG9jdW1lbnQuY29va2llID0gYCEke25hbWV9PTsgZXhwaXJlcz0ke3RoaXMucmVzZXREYXRlfTsgcGF0aD0ke3BhdGh9OyBkb21haW49LiR7d2luZG93LmxvY2F0aW9uLmhvc3RuYW1lfWA7XG4gICAgICBkb2N1bWVudC5jb29raWUgPSBgISR7bmFtZX09OyBleHBpcmVzPSR7dGhpcy5yZXNldERhdGV9OyBwYXRoPSR7cGF0aH07IGRvbWFpbj0ke3dpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZX1gO1xuICAgICAgZG9jdW1lbnQuY29va2llID0gYCEke25hbWV9PTsgZXhwaXJlcz0ke3RoaXMucmVzZXREYXRlfTsgcGF0aD0ke3BhdGh9O2A7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQmFzZWQgb24ga2V5cygpIG1ldGhvZCBmcm9tIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9Eb2N1bWVudC9jb29raWUvU2ltcGxlX2RvY3VtZW50LmNvb2tpZV9mcmFtZXdvcmtcbiAgICovXG4gIGdldENvb2tpZUtleXMoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNvb2tpZVxuICAgICAgLnJlcGxhY2UoLygoPzpefFxccyo7KVteXFw9XSspKD89O3wkKXxeXFxzKnxcXHMqKD86XFw9W147XSopPyg/OlxcMXwkKS9nLCAnJylcbiAgICAgIC5zcGxpdCgvXFxzKig/OlxcPVteO10qKT87XFxzKi8pXG4gICAgICAubWFwKGUgPT4gZGVjb2RlVVJJQ29tcG9uZW50KGUpKTtcbiAgfVxuXG4gIGRlc3Ryb3lVSSgpIHtcbiAgICAvLyBzZXQgb3B0aW9ucyBmcm9tIGNoZWNrYm94ZXNcbiAgICB0aGlzLm9wdGlvbkNoYW5nZSgpO1xuICAgIHRoaXMucGFyZW50RWwucmVtb3ZlQ2hpbGQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NpLW9wdGlvbnMnKSk7XG4gIH1cbn1cblxud2luZG93LmNvb2tpZUludGVyY2VwdG9yID0gbmV3IENvb2tpZUludGVyY2VwdG9yKHtcbiAgbG9jYWxTdG9yYWdlS2V5OiAnYWxsb3dlZENhdGVnb3JpZXMnLFxuICBzdHJpY3Q6IHRydWUsXG4gIGwxMG46IHdpbmRvd1snY2lfbDEwbiddLFxuICBjYXRlZ29yaWVzOiB3aW5kb3dbJ2NpQXZhaWxhYmxlQ29va2llcyddLFxuICBjb2xsZWN0ZWRDb29raWVzOiB3aW5kb3dbJ2NpQ29sbGVjdGVkQ29va2llcyddXG59KTtcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpbiJdLCJzb3VyY2VSb290IjoiIn0=