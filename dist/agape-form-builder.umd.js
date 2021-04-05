(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["agape-form-builder"] = factory();
	else
		root["agape-form-builder"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "066b":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "099a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var numToStr = Number.prototype.toString;
var tryNumberObject = function tryNumberObject(value) {
	try {
		numToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var numClass = '[object Number]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isNumberObject(value) {
	if (typeof value === 'number') {
		return true;
	}
	if (typeof value !== 'object') {
		return false;
	}
	return hasToStringTag ? tryNumberObject(value) : toStr.call(value) === numClass;
};


/***/ }),

/***/ "09fa":
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__("4588");
var toLength = __webpack_require__("9def");
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};


/***/ }),

/***/ "0a49":
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__("9b43");
var IObject = __webpack_require__("626a");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var asc = __webpack_require__("cd1c");
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),

/***/ "0aff":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormBuilder_vue_vue_type_style_index_0_id_1201e206_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c060");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormBuilder_vue_vue_type_style_index_0_id_1201e206_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormBuilder_vue_vue_type_style_index_0_id_1201e206_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_FormBuilder_vue_vue_type_style_index_0_id_1201e206_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "0e65":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getDay = Date.prototype.getDay;
var tryDateObject = function tryDateGetDayCall(value) {
	try {
		getDay.call(value);
		return true;
	} catch (e) {
		return false;
	}
};

var toStr = Object.prototype.toString;
var dateClass = '[object Date]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isDateObject(value) {
	if (typeof value !== 'object' || value === null) {
		return false;
	}
	return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
};


/***/ }),

/***/ "0f7c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__("688e");

module.exports = Function.prototype.bind || implementation;


/***/ }),

/***/ "0f88":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var uid = __webpack_require__("ca5a");
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = (
  'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'
).split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};


/***/ }),

/***/ "1169":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__("2d95");
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),

/***/ "11e9":
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__("52a7");
var createDesc = __webpack_require__("4630");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var has = __webpack_require__("69a8");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__("9e1e") ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "1696":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint complexity: [2, 18], max-statements: [2, 33] */
module.exports = function hasSymbols() {
	if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
	if (typeof Symbol.iterator === 'symbol') { return true; }

	var obj = {};
	var sym = Symbol('test');
	var symObj = Object(sym);
	if (typeof sym === 'string') { return false; }

	if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
	if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

	// temp disabled per https://github.com/ljharb/object.assign/issues/17
	// if (sym instanceof Symbol) { return false; }
	// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
	// if (!(symObj instanceof Symbol)) { return false; }

	// if (typeof Symbol.prototype.toString !== 'function') { return false; }
	// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

	var symVal = 42;
	obj[sym] = symVal;
	for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax
	if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

	if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

	var syms = Object.getOwnPropertySymbols(obj);
	if (syms.length !== 1 || syms[0] !== sym) { return false; }

	if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

	if (typeof Object.getOwnPropertyDescriptor === 'function') {
		var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
		if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
	}

	return true;
};


/***/ }),

/***/ "16e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// modified from https://github.com/es-shims/es6-shim
var keys = __webpack_require__("d6c7");
var bind = __webpack_require__("0f7c");
var canBeObject = function (obj) {
	return typeof obj !== 'undefined' && obj !== null;
};
var hasSymbols = __webpack_require__("1696")();
var toObject = Object;
var push = bind.call(Function.call, Array.prototype.push);
var propIsEnumerable = bind.call(Function.call, Object.prototype.propertyIsEnumerable);
var originalGetSymbols = hasSymbols ? Object.getOwnPropertySymbols : null;

module.exports = function assign(target, source1) {
	if (!canBeObject(target)) { throw new TypeError('target must be an object'); }
	var objTarget = toObject(target);
	var s, source, i, props, syms, value, key;
	for (s = 1; s < arguments.length; ++s) {
		source = toObject(arguments[s]);
		props = keys(source);
		var getSymbols = hasSymbols && (Object.getOwnPropertySymbols || originalGetSymbols);
		if (getSymbols) {
			syms = getSymbols(source);
			for (i = 0; i < syms.length; ++i) {
				key = syms[i];
				if (propIsEnumerable(source, key)) {
					push(props, key);
				}
			}
		}
		for (i = 0; i < props.length; ++i) {
			key = props[i];
			value = source[key];
			if (propIsEnumerable(source, key)) {
				objTarget[key] = value;
			}
		}
	}
	return objTarget;
};


/***/ }),

/***/ "198e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ControlView_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ee8f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ControlView_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ControlView_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ControlView_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "1b00":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1c4c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__("9b43");
var $export = __webpack_require__("5ca1");
var toObject = __webpack_require__("4bf8");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var toLength = __webpack_require__("9def");
var createProperty = __webpack_require__("f1ae");
var getIterFn = __webpack_require__("27ee");

$export($export.S + $export.F * !__webpack_require__("5cc5")(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),

/***/ "1c7e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var supportsDescriptors = __webpack_require__("f367").supportsDescriptors;
var getPolyfill = __webpack_require__("57ec");
var gOPD = Object.getOwnPropertyDescriptor;
var defineProperty = Object.defineProperty;
var TypeErr = TypeError;
var getProto = Object.getPrototypeOf;
var regex = /a/;

module.exports = function shimFlags() {
	if (!supportsDescriptors || !getProto) {
		throw new TypeErr('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	var polyfill = getPolyfill();
	var proto = getProto(regex);
	var descriptor = gOPD(proto, 'flags');
	if (!descriptor || descriptor.get !== polyfill) {
		defineProperty(proto, 'flags', {
			configurable: true,
			enumerable: false,
			get: polyfill
		});
	}
	return polyfill;
};


/***/ }),

/***/ "1dd1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("e9ac");

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;


/***/ }),

/***/ "1ec8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SidebarRenderer; });
/* harmony import */ var C_Users_Norton_azure_vue_form_builder_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d4ec");
/* harmony import */ var C_Users_Norton_azure_vue_form_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ade3");



var SidebarRenderer = // to recognize which components are triggering...
function SidebarRenderer(runnerId, component) {
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  Object(C_Users_Norton_azure_vue_form_builder_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, SidebarRenderer);

  Object(C_Users_Norton_azure_vue_form_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, "runnerId", '');

  Object(C_Users_Norton_azure_vue_form_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, "component", null);

  Object(C_Users_Norton_azure_vue_form_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, "data", {});

  this.runnerId = runnerId;
  this.component = component;
  this.data = data;
};



/***/ }),

/***/ "1fa8":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("cb7c");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "20d6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "22a0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FORM_DEFAULT_DATA; });
/**
 * Form-Configuration for Vue-Form-Builder
 * @author Phat Tran
 */
var FORM_DEFAULT_DATA = {
  headline: "",
  subHeadline: "",
  isShowHeadline: false,
  // <form></form> tag ??
  renderFormTag: false,
  formActionURL: "",
  formMethod: "POST"
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "242e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


if (typeof BigInt === 'function') {
	var bigIntValueOf = BigInt.prototype.valueOf;
	var tryBigInt = function tryBigIntObject(value) {
		try {
			bigIntValueOf.call(value);
			return true;
		} catch (e) {
		}
		return false;
	};

	module.exports = function isBigInt(value) {
		if (
			value === null
			|| typeof value === 'undefined'
			|| typeof value === 'boolean'
			|| typeof value === 'string'
			|| typeof value === 'number'
			|| typeof value === 'symbol'
			|| typeof value === 'function'
		) {
			return false;
		}
		if (typeof value === 'bigint') { // eslint-disable-line valid-typeof
			return true;
		}

		return tryBigInt(value);
	};
} else {
	module.exports = function isBigInt(value) {
		return  false && false;
	};
}


/***/ }),

/***/ "2560":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ installer_VueFormBuilderInstaller; });

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// CONCATENATED MODULE: ./src/libraries/icons/arrow-up.icon.js
var ARROW_UP_ICON = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"{0}\" height=\"{1}\" fill=\"{2}\">\n    <polygon points=\"9 3.828 2.929 9.899 1.515 8.485 10 0 10.707 .707 18.485 8.485 17.071 9.899 11 3.828 11 20 9 20 9 3.828\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/arrow-down.icon.js
var ARROW_DOWN_ICON = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"{0}\" height=\"{1}\" fill=\"{2}\">\n    <polygon points=\"9 16.172 2.929 10.101 1.515 11.515 10 20 10.707 19.293 18.485 11.515 17.071 10.101 11 16.172 11 0 9 0\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/edit-pencil.icon.js
var EDIT_PENCIL_ICON = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"{0}\" height=\"{1}\" fill=\"{2}\">\n    <path d=\"M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/edit-pencil-border.icon.js
var EDIT_PENCIL_BORDER = "\n<svg width=\"10\" height=\"10\" viewBox=\"0 0 10 10\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<g clip-path=\"url(#clip0)\">\n<path d=\"M7.39585 2.91576L5.83335 1.35326L1.66669 5.51992V7.08242H3.22919L7.39585 2.91576ZM8.62919 1.68242C8.79169 1.51992 8.79169 1.25742 8.62919 1.09492L7.65419 0.119922C7.49169 -0.0425781 7.22919 -0.0425781 7.06669 0.119922L6.25002 0.936589L7.81252 2.49909L8.62919 1.68242Z\" fill=\"white\"/>\n<path d=\"M0 8.33398H10V10.0007H0V8.33398Z\" fill=\"white\" fill-opacity=\"0.5\"/>\n</g>\n<defs>\n<clipPath id=\"clip0\">\n<rect width=\"10\" height=\"10\" fill=\"white\"/>\n</clipPath>\n</defs>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/cog.icon.js
var COG_ICON = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"{0}\" height=\"{1}\" fill=\"{2}\">\n    <path d=\"M3.94 6.5L2.22 3.64l1.42-1.42L6.5 3.94c.52-.3 1.1-.54 1.7-.7L9 0h2l.8 3.24c.6.16 1.18.4 1.7.7l2.86-1.72 1.42 1.42-1.72 2.86c.3.52.54 1.1.7 1.7L20 9v2l-3.24.8c-.16.6-.4 1.18-.7 1.7l1.72 2.86-1.42 1.42-2.86-1.72c-.52.3-1.1.54-1.7.7L11 20H9l-.8-3.24c-.6-.16-1.18-.4-1.7-.7l-2.86 1.72-1.42-1.42 1.72-2.86c-.3-.52-.54-1.1-.7-1.7L0 11V9l3.24-.8c.16-.6.4-1.18.7-1.7zM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/add-outline.icon.js
var ADD_OUTLINE_ICON = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"{0}\" height=\"{1}\" fill=\"{2}\">\n<path d=\"M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/close.icon.js
var CLOSE_ICON = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"{0}\" height=\"{1}\" fill=\"{2}\">\n<path d=\"M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/trash.icon.js
var TRASH_ICON = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"{0}\" height=\"{1}\" fill=\"{2}\">\n    <path d=\"M6 2l2-2h4l2 2h4v2H2V2h4zM3 6h14l-1 14H4L3 6zm5 2v10h1V8H8zm3 0v10h1V8h-1z\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/trash-custom.icon.js
var TRASH_ICON_CUSTOM = "\n<svg width=\"12\" height=\"16\" viewBox=\"0 0 12 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M0.857143 14.2222C0.857143 15.2 1.62857 16 2.57143 16H9.42857C10.3714 16 11.1429 15.2 11.1429 14.2222V3.55556H0.857143V14.2222ZM2.96571 7.89333L4.17429 6.64L6 8.52444L7.81714 6.64L9.02571 7.89333L7.20857 9.77778L9.02571 11.6622L7.81714 12.9156L6 11.0311L4.18286 12.9156L2.97429 11.6622L4.79143 9.77778L2.96571 7.89333ZM9 0.888889L8.14286 0H3.85714L3 0.888889H0V2.66667H12V0.888889H9Z\" fill=\"#E5817E\"/>\n</svg>\n\n";

// CONCATENATED MODULE: ./src/libraries/icons/chevron-up.icon.js
var CHEVRON_UP_ICON = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"{0}\" height=\"{1}\" fill=\"{2}\">\n<path d=\"M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/chevron-down.icon.js
var CHEVRON_DOWN_ICON = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"{0}\" height=\"{1}\" fill=\"{2}\">\n<path d=\"M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/navigation-more.icon.js
var NAVIGATION_MORE_ICON = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"{0}\" height=\"{1}\" fill=\"{2}\">\n<path d=\"M4 12a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm6 0a2 2 0 1 1 0-4 2 2 0 0 1 0 4z\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/information-outline.icon.js
var INFORMATION_OUTLINE_ICON = "\n<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" width=\"{0}\" height=\"{1}\" fill=\"{2}\">\n    <path d=\"M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/corner_left.icon.js
var CORNER_LEFT = "\n<svg width=\"297\" height=\"289\" viewBox=\"0 0 297 289\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M198.606 0L87.6186 60.1708C89.5165 63.4411 90.7393 67.0594 91.2144 70.8113C91.6895 74.5632 91.4074 78.3724 90.3847 82.0132C89.362 85.654 87.6195 89.0523 85.2606 92.0067C82.9016 94.9611 79.9742 97.4115 76.6517 99.2128C73.3292 101.014 69.6793 102.129 65.9182 102.493C62.1571 102.856 58.3614 102.461 54.7559 101.329C51.1505 100.197 47.8087 98.3528 44.9285 95.9047C42.0484 93.4566 39.6885 90.4548 37.9887 87.0772L0.14502 107.594L98.1718 288.731L296.633 181.137L198.606 0Z\" fill=\"#F2F2F2\"/>\n<path d=\"M63.5165 97.2954C76.1706 97.2954 86.4289 87.028 86.4289 74.3625C86.4289 61.6971 76.1706 51.4297 63.5165 51.4297C50.8623 51.4297 40.604 61.6971 40.604 74.3625C40.604 87.028 50.8623 97.2954 63.5165 97.2954Z\" fill=\"#5AAED3\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/corner_right.icon.js
var CORNER_RIGHT = "\n<svg width=\"279\" height=\"266\" viewBox=\"0 0 279 266\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M64.4219 265.917L184.423 226.74C183.144 223.181 182.593 219.401 182.801 215.625C183.009 211.849 183.972 208.153 185.633 204.756C187.294 201.359 189.619 198.331 192.472 195.85C195.324 193.369 198.644 191.486 202.236 190.314C205.829 189.141 209.62 188.702 213.385 189.022C217.15 189.343 220.812 190.416 224.155 192.179C227.498 193.943 230.453 196.359 232.845 199.287C235.238 202.214 237.019 205.592 238.083 209.221L279 195.862L215.174 0.015625L0.595947 70.0707L64.4219 265.917Z\" fill=\"#F2F2F2\"/>\n<path d=\"M211.101 240.42C223.755 240.42 234.013 230.153 234.013 217.488C234.013 204.822 223.755 194.555 211.101 194.555C198.446 194.555 188.188 204.822 188.188 217.488C188.188 230.153 198.446 240.42 211.101 240.42Z\" fill=\"#5AAED3\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/people.icon.js
var PEOPLE = "\n<svg width=\"214\" height=\"415\" viewBox=\"0 0 214 415\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M106.872 415.001C165.896 415.001 213.745 406.179 213.745 395.296C213.745 384.414 165.896 375.592 106.872 375.592C47.8484 375.592 0 384.414 0 395.296C0 406.179 47.8484 415.001 106.872 415.001Z\" fill=\"#F2F2F2\"/>\n<path d=\"M177.169 202.496L176.313 207.64C176.313 207.64 177.597 243.218 168.175 232.073C158.753 220.928 165.178 205.925 165.178 205.925L167.747 201.639L177.169 202.496Z\" fill=\"#FBBEBE\"/>\n<path d=\"M122.35 37.8926C122.35 37.8926 120.637 55.8961 119.78 56.7535C118.924 57.6108 132.628 73.8997 132.628 73.8997L144.62 62.7547C144.62 62.7547 143.764 46.4657 146.333 43.0365C148.903 39.6072 122.35 37.8926 122.35 37.8926Z\" fill=\"#FBBEBE\"/>\n<path opacity=\"0.1\" d=\"M122.35 37.8926C122.35 37.8926 120.637 55.8961 119.78 56.7535C118.924 57.6108 132.628 73.8997 132.628 73.8997L144.62 62.7547C144.62 62.7547 143.764 46.4657 146.333 43.0365C148.903 39.6072 122.35 37.8926 122.35 37.8926Z\" fill=\"black\"/>\n<path d=\"M90.658 366.242V381.674L84.6619 382.531L76.0967 379.959L78.6658 363.67L90.658 366.242Z\" fill=\"#3F3D56\"/>\n<path d=\"M82.9488 373.958C82.9488 373.958 80.3792 367.1 76.0964 367.957C71.8137 368.814 70.9571 373.958 70.9571 373.958C70.9571 373.958 67.5309 386.818 62.3916 391.104C57.2523 395.391 52.113 406.536 62.3916 408.251C72.6702 409.965 81.2357 405.679 81.2357 404.821C81.2357 403.964 83.8054 398.82 88.0881 397.963C92.3709 397.106 95.7971 396.248 95.7971 392.819C95.7971 389.39 93.2274 385.961 93.2274 385.961C93.2274 385.961 92.3709 369.699 90.6578 371.828C89.473 373.511 88.6025 375.394 88.0881 377.387L82.9488 373.958Z\" fill=\"#2F2E41\"/>\n<path d=\"M127.489 358.527L124.063 371.386L132.628 373.101L136.911 368.815L137.767 357.67L127.489 358.527Z\" fill=\"#3F3D56\"/>\n<path d=\"M126.633 369.673C126.633 369.673 130.059 367.101 131.772 367.101H134.342C134.342 367.101 134.342 361.1 138.624 361.1C142.907 361.1 142.051 365.386 142.051 365.386C142.051 365.386 151.473 379.961 154.042 382.532C156.612 385.104 170.317 392.82 159.182 396.249C148.047 399.679 140.338 399.679 135.198 393.678C135.198 393.678 130.059 391.106 126.633 391.106C123.207 391.106 118.924 389.391 118.924 386.819C118.924 384.247 121.493 379.103 121.493 379.103C121.493 379.103 123.207 363.672 124.063 365.386C124.92 367.101 126.633 369.673 126.633 369.673Z\" fill=\"#2F2E41\"/>\n<path d=\"M89.8012 161.346V189.637C89.8012 189.637 80.3791 244.505 80.3791 262.509C80.3791 280.512 65.8178 366.243 72.6702 367.958C79.5226 369.673 95.797 372.245 96.6536 369.673C97.5101 367.101 103.506 285.656 104.363 284.799C105.219 283.941 123.207 216.214 123.207 216.214L126.633 217.071L128.346 294.229C128.346 294.229 119.78 363.671 124.063 363.671C128.346 363.671 146.333 362.814 146.333 357.67C146.333 352.526 155.755 257.365 155.755 257.365C155.755 257.365 166.891 181.921 162.608 174.205C158.325 166.49 158.325 162.203 158.325 162.203L89.8012 161.346Z\" fill=\"#2F2E41\"/>\n<path d=\"M136.483 51.1812C145.944 51.1812 153.614 43.5045 153.614 34.0349C153.614 24.5653 145.944 16.8887 136.483 16.8887C127.022 16.8887 119.352 24.5653 119.352 34.0349C119.352 43.5045 127.022 51.1812 136.483 51.1812Z\" fill=\"#FBBEBE\"/>\n<path d=\"M132.629 63.6107C132.629 63.6107 121.922 54.6089 121.065 51.1797C121.065 51.1797 115.498 56.7522 115.498 57.6095C115.498 58.4668 91.5143 61.0388 85.5184 67.8973C79.5226 74.7558 74.3833 89.3301 74.3833 89.3301L88.9447 116.764C88.9447 116.764 89.8012 132.196 89.8012 133.91C89.8012 135.625 85.5185 163.059 87.2316 163.916C88.9447 164.774 106.076 173.347 120.637 171.632C135.198 169.917 149.76 167.345 154.042 167.345C158.325 167.345 161.751 169.06 161.751 167.345C161.751 165.631 159.182 162.202 159.182 160.487C159.182 158.772 158.325 154.486 158.325 151.914C158.325 149.342 156.612 145.055 156.612 141.626C156.612 138.197 175.456 91.902 175.456 91.902C175.456 91.902 174.6 77.3277 160.895 70.4692C147.19 63.6107 145.477 61.0388 145.477 61.0388C145.477 61.0388 145.21 55.8949 144.487 55.8949C143.764 55.8949 141.194 63.6107 134.342 64.468L132.629 63.6107Z\" fill=\"#9CD2EA\"/>\n<path d=\"M86.3748 177.634L92.3709 187.064L107.789 183.635L96.6535 170.775L86.3748 177.634Z\" fill=\"#FBBEBE\"/>\n<path d=\"M170.317 85.0449L175.456 91.9034C175.456 91.9034 185.735 141.628 184.022 159.631C182.308 177.635 180.595 191.352 180.595 191.352C180.595 191.352 184.022 204.211 181.452 204.211C178.882 204.211 163.464 205.069 163.464 202.497C163.464 199.925 165.177 183.636 165.177 183.636L160.895 145.914L151.473 133.054L170.317 85.0449Z\" fill=\"#9CD2EA\"/>\n<path d=\"M124.848 25.7106C125.898 25.2651 127.112 25.6265 128.236 25.4365C129.557 25.2133 130.738 24.2341 132.072 24.3576C132.704 24.4749 133.318 24.6744 133.898 24.9511C134.189 25.088 134.505 25.1646 134.827 25.1761C135.148 25.1876 135.469 25.1339 135.769 25.0181C135.912 24.9516 136.038 24.8541 136.139 24.7326C136.24 24.6111 136.312 24.4687 136.351 24.3157C136.39 24.1627 136.395 24.0029 136.364 23.848C136.334 23.693 136.27 23.5468 136.176 23.4199C137.304 23.3204 138.371 22.8608 139.218 22.109C139.387 21.9334 139.583 21.7862 139.799 21.673C140.05 21.6073 140.313 21.5941 140.569 21.6341C140.826 21.6741 141.072 21.7666 141.291 21.9056L143.251 22.8099C143.693 22.966 144.081 23.244 144.371 23.6119C144.604 23.9757 144.65 24.4649 144.98 24.7435C145.402 25.099 146.031 24.925 146.581 24.9599C147.081 25.0085 147.545 25.2388 147.886 25.6072C148.226 25.9756 148.42 26.4564 148.43 26.9583C148.423 27.534 148.213 28.2403 148.668 28.5926C148.932 28.797 149.307 28.7643 149.616 28.8899C150.417 29.2154 150.42 30.3317 150.302 31.189C150.183 32.0463 150.242 33.1772 151.066 33.4412C151.645 33.627 152.238 33.2308 152.84 33.1425C153.749 33.0092 154.59 33.5781 155.399 34.0134C156.208 34.4487 157.283 34.7423 157.984 34.1485C158.636 33.596 158.594 32.5852 158.415 31.7488C158.158 30.5497 157.735 29.3922 157.158 28.3097C156.945 27.9912 156.819 27.622 156.794 27.2395C156.843 26.9701 156.948 26.7142 157.103 26.4886C157.258 26.263 157.459 26.0727 157.692 25.9305C158.684 25.1461 159.824 24.3565 160.145 23.1333C160.38 22.2355 160.115 21.2887 160.136 20.3607C160.161 19.2316 160.609 18.1072 160.399 16.9976C160.018 14.9862 157.781 14.0182 156.337 12.568C154.354 10.5751 153.709 7.38772 151.368 5.83123C149.495 4.58603 147.045 4.73468 144.912 4.02224C142.569 3.23961 140.683 1.44157 138.372 0.569301C137.111 0.103654 135.762 -0.0768398 134.422 0.0407497C133.083 0.158339 131.786 0.571108 130.625 1.24945C129.935 1.76123 129.165 2.15483 128.347 2.41422C127.658 2.49414 126.961 2.48605 126.274 2.39015C124.908 2.31963 123.546 2.60074 122.32 3.20667C121.85 3.39447 121.459 3.73765 121.212 4.17898C120.798 5.09883 121.4 6.53682 120.493 6.97664C120.07 7.1817 119.57 6.98526 119.101 6.99558C118.187 7.01566 117.484 7.81131 117.049 8.61579C116.711 9.46628 116.224 10.2501 115.612 10.9309C114.496 11.9098 112.467 12.0716 112.175 13.5283C112.17 14.1451 112.205 14.7616 112.28 15.3738C112.195 16.6648 110.815 17.6459 110.887 18.9376C110.97 20.4276 112.861 21.1556 113.367 22.5595C113.752 23.6284 113.245 24.7843 112.897 25.8656C112.548 26.947 112.443 28.3331 113.343 29.0253C113.696 29.2967 114.15 29.408 114.51 29.6701C115.442 30.3482 115.43 31.7168 115.327 32.865C115.267 33.1034 115.267 33.3527 115.326 33.5912C115.385 33.8297 115.501 34.0501 115.665 34.2331C115.819 34.3263 115.991 34.3856 116.169 34.4071C116.348 34.4285 116.529 34.4116 116.7 34.3575C117.26 34.2218 117.785 33.9731 118.245 33.6267C118.705 33.2803 119.089 32.8435 119.375 32.3432C119.675 31.8467 119.735 31.4091 120.28 31.1457C120.65 30.967 121.099 31.1265 121.475 30.8946C123.266 29.7911 122.65 26.6429 124.848 25.7106Z\" fill=\"#2F2E41\"/>\n<path d=\"M76.9527 86.7578L74.3831 89.3298C74.3831 89.3298 58.9652 135.625 64.1045 145.912C69.2437 156.2 79.5224 181.92 82.9486 181.062C86.3748 180.205 98.3665 172.489 98.3665 171.632C98.3665 170.774 83.8051 146.77 83.8051 146.77C83.8051 146.77 82.092 141.626 82.9486 140.769C83.8051 139.911 83.8051 140.769 82.9486 139.054C82.092 137.339 82.092 139.054 83.8051 137.339C85.5182 135.625 85.5182 135.625 85.5182 134.767C85.5182 133.91 90.6575 112.477 90.6575 112.477L76.9527 86.7578Z\" fill=\"#9CD2EA\"/>\n<path d=\"M90.229 187.493L109.074 181.492L111.643 187.493L91.0861 191.779L90.229 187.493Z\" fill=\"#2F2E41\"/>\n<path opacity=\"0.1\" d=\"M90.229 187.493L109.074 181.492L111.643 187.493L91.0861 191.779L90.229 187.493Z\" fill=\"black\"/>\n<path opacity=\"0.1\" d=\"M115.926 58.0391L130.487 70.0412L132.2 67.4691L115.926 58.0391Z\" fill=\"black\"/>\n<path opacity=\"0.1\" d=\"M145.048 61.4688L134.77 67.4695L135.627 70.0416L145.048 61.4688Z\" fill=\"black\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/circle.icon.js
var CIRCLE = "\n<svg width=\"24\" height=\"23\" viewBox=\"0 0 24 23\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M11.8772 21.973C17.607 21.973 22.252 17.324 22.252 11.5891C22.252 5.85414 17.607 1.20508 11.8772 1.20508C6.14738 1.20508 1.50244 5.85414 1.50244 11.5891C1.50244 17.324 6.14738 21.973 11.8772 21.973Z\" stroke=\"#505050\" stroke-width=\"2\" stroke-miterlimit=\"10\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/add-control.icon.js
var ADD_CONTROL = "\n<svg width=\"218\" height=\"164\" viewBox=\"0 0 218 164\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M18.6561 161.31C28.9596 161.31 37.3122 160.667 37.3122 159.874C37.3122 159.08 28.9596 158.438 18.6561 158.438C8.35263 158.438 0 159.08 0 159.874C0 160.667 8.35263 161.31 18.6561 161.31Z\" fill=\"#E6E6E6\"/>\n<path d=\"M58.9 164.001C69.2035 164.001 77.5561 163.358 77.5561 162.565C77.5561 161.772 69.2035 161.129 58.9 161.129C48.5965 161.129 40.2439 161.772 40.2439 162.565C40.2439 163.358 48.5965 164.001 58.9 164.001Z\" fill=\"#E6E6E6\"/>\n<path d=\"M200.759 0H106.619C106.07 0.000674792 105.544 0.221051 105.156 0.612792C104.767 1.00453 104.549 1.53566 104.548 2.08966V161.182C104.549 161.737 104.767 162.268 105.155 162.66C105.543 163.052 106.07 163.272 106.619 163.272H200.759C201.252 163.272 201.729 163.095 202.104 162.771C202.478 162.448 202.726 162 202.802 161.508C202.821 161.401 202.83 161.292 202.83 161.182V2.08966C202.829 1.53566 202.611 1.00453 202.223 0.612792C201.834 0.221051 201.308 0.00067408 200.759 0ZM202.001 161.182C202.001 161.515 201.871 161.834 201.638 162.069C201.405 162.304 201.089 162.436 200.759 162.436H106.619C106.289 162.436 105.973 162.304 105.74 162.069C105.507 161.834 105.377 161.515 105.377 161.182V2.08966C105.377 1.75729 105.508 1.43867 105.741 1.20364C105.974 0.968619 106.29 0.836362 106.619 0.835864H200.759C201.088 0.836362 201.404 0.968619 201.637 1.20364C201.87 1.43867 202.001 1.75729 202.001 2.08966V161.182Z\" fill=\"#E6E6E6\"/>\n<path d=\"M114.073 11.7344C113.853 11.7346 113.643 11.8228 113.487 11.9795C113.332 12.1362 113.245 12.3486 113.245 12.5703V47.1193C113.245 47.3409 113.332 47.5534 113.487 47.7101C113.643 47.8668 113.853 47.9549 114.073 47.9551H193.305C193.525 47.9549 193.735 47.8668 193.891 47.7101C194.046 47.5534 194.133 47.3409 194.133 47.1193V12.5702C194.133 12.3486 194.046 12.1362 193.891 11.9795C193.735 11.8228 193.525 11.7346 193.305 11.7344L114.073 11.7344Z\" fill=\"#E6E6E6\"/>\n<path d=\"M80.9783 38.7676C80.7663 38.7678 80.563 38.8529 80.4131 39.0042C80.2633 39.1555 80.1789 39.3606 80.1787 39.5745V72.9277C80.1789 73.1417 80.2633 73.3468 80.4131 73.4981C80.563 73.6494 80.7663 73.7345 80.9783 73.7347H157.468C157.68 73.7345 157.883 73.6494 158.033 73.4981C158.183 73.3468 158.268 73.1417 158.268 72.9277V39.5745C158.268 39.3606 158.183 39.1555 158.033 39.0042C157.883 38.8529 157.68 38.7678 157.468 38.7676H80.9783Z\" fill=\"#5AAED3\"/>\n<path d=\"M42.045 116.239C42.1456 118.737 40.5646 120.951 39.0842 122.941C38.4091 123.873 32.1352 130.19 30.2403 132.951C29.7813 133.621 18.5155 146.745 17.9382 147.961C17.8024 148.249 17.6905 148.548 17.6036 148.854C17.2661 150.02 17.2513 151.275 17.2809 152.518V153.387C17.3401 155.285 17.426 157.191 17.873 159.029C17.9382 159.298 18.0122 159.57 18.0507 159.842C17.9311 159.762 17.8182 159.674 17.7132 159.576L11.5902 154.989L11.2083 154.702C10.8175 153.561 10.4474 152.407 10.0299 151.281C9.78119 150.611 10.0477 149.846 10.4859 149.287C10.9606 148.758 11.4841 148.276 12.0492 147.847C12.483 147.394 12.8699 146.897 13.2039 146.365C17.4289 140.159 29.3283 117.888 30.1958 113.406C31.3395 113.191 32.5113 113.176 33.66 113.361L39.7681 114.18C40.4284 114.269 41.1508 114.392 41.5801 114.903C41.8733 115.286 42.0363 115.755 42.045 116.239Z\" fill=\"#EFB7B9\"/>\n<path d=\"M68.1179 121.33C67.9877 122.262 67.6617 123.154 67.1615 123.948C66.5338 124.913 59.3243 143.628 57.083 151.355C56.6714 152.775 56.8876 154.146 56.8432 154.621C56.8076 155.016 56.7751 155.41 56.7454 155.802C56.704 156.289 56.6714 156.776 56.6359 157.26C56.5441 158.542 56.4642 159.889 57.0001 161.055C57.2103 161.515 57.5271 161.912 57.6663 162.373C57.4574 162.264 57.2641 162.127 57.0919 161.966L50.9689 157.379C50.4697 155.952 50.0846 154.486 49.8172 152.996C49.6632 152.15 49.5892 151.179 50.1133 150.531C50.1434 150.491 50.176 150.453 50.211 150.417C50.3819 150.255 50.573 150.117 50.7795 150.005C50.9688 149.9 51.1508 149.782 51.3242 149.652C51.4543 149.549 51.5717 149.431 51.6736 149.299C52.177 148.672 52.3576 147.79 52.5086 146.963C53.1007 143.574 58.1163 122.783 58.0215 122.269C57.9179 121.764 55.0696 116.92 53.1155 115.844C55.143 114.13 57.4557 112.793 59.9461 111.894C60.3849 111.688 60.8706 111.604 61.3525 111.652C61.6103 111.709 61.8566 111.81 62.0808 111.951C63.422 112.71 64.4494 113.905 65.4324 115.1C66.898 116.899 68.3636 119.015 68.1179 121.33Z\" fill=\"#EFB7B9\"/>\n<path d=\"M65.4459 114.13C65.2563 115.937 60.2254 117.537 53.8636 118.532C52.2207 118.789 48.184 108.753 46.424 108.923C44.3076 109.127 44.4553 119.514 42.3623 119.57C35.2368 119.76 30.6322 119.023 29.1436 116.891C28.3383 116.694 27.3672 116.228 27.4056 115.397C27.4323 114.922 27.8054 114.501 27.8024 114.035C27.8024 113.222 30.1385 104.323 31.5152 100.101C31.8587 99.0521 32.1074 97.9764 32.4952 96.9395C34.1711 92.266 34.8905 88.6802 37.952 84.7897C38.4204 84.2438 38.8056 83.6304 39.0949 82.9699C39.3576 82.1769 39.4945 81.3469 39.5005 80.5107L39.6693 77.5853C44.2082 77.3702 48.6168 77.4568 53.058 78.425C53.2989 78.4178 53.5329 78.5075 53.7083 78.6744C53.8837 78.8412 53.9863 79.0716 53.9934 79.3148L53.9936 79.3214C54.1653 80.3912 54.2857 81.4659 54.3548 82.5456C54.3569 82.7842 54.3907 83.0213 54.4555 83.2508C54.572 83.5409 54.734 83.8103 54.9351 84.0486C57.5051 87.4491 59.0802 91.519 60.3237 95.5948C61.5673 99.6706 62.5562 103.86 64.1195 107.846C64.6583 109.221 65.363 110.766 65.5051 112.239C66.0677 112.66 65.9433 113.613 65.4459 114.13Z\" fill=\"#2F2E41\"/>\n<path d=\"M69.7599 65.1318C70.5415 64.4655 71.3232 63.7962 72.0397 63.0611C73.0507 61.9796 73.9847 60.8273 74.8347 59.6128C75.7407 58.3667 76.6408 57.0908 77.2033 55.6505C77.8399 54.001 78.0353 52.1245 79.1426 50.7559C79.2678 50.5781 79.4417 50.441 79.643 50.3615C80.2737 50.1612 80.7444 50.9591 80.8658 51.6195C81.458 54.8526 80.0457 58.0798 78.6719 61.062C78.2189 62.0451 77.7451 63.0551 76.9605 63.7991C76.53 64.1705 76.0803 64.5186 75.6134 64.842C74.9197 65.4111 74.2813 66.0454 73.7066 66.7365C72.7197 67.868 71.7811 69.0403 70.8909 70.2535C69.7865 71.7476 68.7502 73.3134 67.4416 74.6311C66.1329 75.9489 64.4956 77.0217 62.6629 77.2816C63.1869 77.2099 63.0152 74.1052 62.9589 73.7138C62.879 73.146 62.4941 72.4767 62.4823 71.9209C62.4675 71.2396 62.7428 71.141 63.2994 70.6629L69.7599 65.1318Z\" fill=\"#EFB7B9\"/>\n<path d=\"M47.7848 45.5762C47.7848 45.5762 46.0083 54.5406 43.9357 56.0347C41.8632 57.5287 55.1868 59.3216 55.1868 59.3216C55.1868 59.3216 55.4828 52.1501 59.0358 48.8631C62.5887 45.5762 47.7848 45.5762 47.7848 45.5762Z\" fill=\"#EFB7B9\"/>\n<path d=\"M59.723 81.1753C60.1623 81.3141 60.6222 81.3748 61.082 81.3546C62.6365 81.3375 64.1685 80.9775 65.5706 80.2997C65.702 80.2484 65.8182 80.1641 65.9081 80.0547C65.9604 79.9403 65.9888 79.8162 65.9913 79.6902C65.9939 79.5642 65.9706 79.4391 65.9229 79.3226C65.088 75.9161 66.6987 72.0525 65.0998 68.9388C63.3618 69.5096 61.4551 70.1341 59.7171 70.6899C59.4506 70.7991 59.1636 70.848 58.8762 70.8333C58.532 70.7611 58.2167 70.5874 57.9702 70.3343C56.0872 68.6908 54.8999 66.4019 53.8251 64.1399C52.7503 61.8779 51.6963 59.5441 50.0028 57.7034C48.3092 55.8627 46.7251 54.8886 44.2499 55.1546C43.3713 55.2758 42.5647 55.7104 41.976 56.3797C40.5785 57.8977 40.3002 60.2075 40.7917 62.2215C41.2832 64.2355 42.4113 66.0194 43.5837 67.7197C45.1115 69.9369 46.7547 72.1212 48.8776 73.7677C50.0261 74.6071 51.218 75.3841 52.4484 76.0954\" fill=\"#E6E6E6\"/>\n<path d=\"M54.7427 52.3019C59.6483 52.3019 63.6251 48.2884 63.6251 43.3375C63.6251 38.3866 59.6483 34.373 54.7427 34.373C49.8371 34.373 45.8604 38.3866 45.8604 43.3375C45.8604 48.2884 49.8371 52.3019 54.7427 52.3019Z\" fill=\"#EFB7B9\"/>\n<path d=\"M58.2959 69.1362C55.6256 72.314 55.0613 76.3738 54.5149 80.3806C51.8325 79.4632 48.8598 81.0021 46.0826 80.4404C44.6878 79.9717 43.2121 79.7988 41.748 79.9326C40.7206 79.8338 39.7021 79.1824 38.7221 79.514C37.0928 80.5556 38.6794 74.1039 38.5826 72.2288C37.7287 40.5988 63.1489 55.9861 58.2959 69.1362Z\" fill=\"#E6E6E6\"/>\n<path d=\"M73.3129 66.3271C74.0945 65.6608 74.8762 64.9914 75.5927 64.2564C76.6037 63.1748 77.5377 62.0225 78.3877 60.8081C79.2937 59.562 80.1937 58.2861 80.7563 56.8458C81.3929 55.1963 81.5883 53.3198 82.6956 51.9512C82.8208 51.7734 82.9947 51.6363 83.196 51.5568C83.8266 51.3566 84.2974 52.1544 84.4188 52.8148C85.011 56.0479 83.5987 59.2751 82.2248 62.2573C81.7718 63.2404 81.2981 64.2504 80.5135 64.9944C80.083 65.3658 79.6333 65.7139 79.1663 66.0373C78.4727 66.6063 77.8342 67.2407 77.2596 67.9317C76.2727 69.0633 75.3341 70.2356 74.4439 71.4488C73.3395 72.9429 72.3032 74.5086 70.9946 75.8264C69.6859 77.1442 68.0486 78.2169 66.2158 78.4769C66.7399 78.4052 66.5682 75.3005 66.5119 74.9091C66.432 74.3413 66.0471 73.672 66.0352 73.1162C66.0204 72.4349 66.2958 72.3363 66.8524 71.8582L73.3129 66.3271Z\" fill=\"#EFB7B9\"/>\n<path opacity=\"0.1\" d=\"M57.4077 69.4344L57.3869 69.4733C56.8747 70.4325 56.1079 71.2392 55.5809 72.1955C54.9887 73.2772 54.7133 74.5113 54.4765 75.7274C54.3126 76.5442 54.1616 77.3619 54.0235 78.1807C52.9603 77.5652 51.9322 76.8899 50.9443 76.1577C48.8214 74.5113 47.1781 72.3269 45.6504 70.1067C44.466 68.4065 43.3409 66.6226 42.8583 64.6115C42.3757 62.6005 42.657 60.2877 44.0427 58.7697C44.6312 58.0997 45.4377 57.6641 46.3165 57.5416C48.7918 57.2756 50.3551 58.2408 52.0486 60.0785C53.7422 61.9162 54.7903 64.2619 55.871 66.515C56.3507 67.4921 56.8422 68.4931 57.4077 69.4344Z\" fill=\"black\"/>\n<path d=\"M47.8027 56.3499C46.924 56.4711 46.1174 56.9057 45.5288 57.575C44.1313 59.093 43.853 61.4028 44.3444 63.4168C44.8359 65.4308 45.964 67.2148 47.1365 68.915C48.6642 71.1322 50.3075 73.3166 52.4304 74.963C53.5788 75.8024 54.7707 76.5794 56.0011 77.2908C58.0456 78.5617 60.0103 78.1659 61.8842 79.6813C62.295 80.0567 62.7654 80.3597 63.2758 80.5777C63.715 80.7166 64.1749 80.7773 64.6348 80.757C66.1893 80.74 67.7213 79.7823 69.1233 79.1046C69.2547 79.0533 69.3709 78.9689 69.4609 78.8595C69.5132 78.7451 69.5415 78.621 69.544 78.495C69.5466 78.3691 69.5233 78.2439 69.4757 78.1274C68.6407 74.7209 70.2514 73.2478 68.6526 70.1342C66.9146 70.7049 65.0078 71.3294 63.2698 71.8852C63.0033 71.9944 62.7163 72.0434 62.429 72.0286C62.0847 71.9564 61.7694 71.7828 61.523 71.5296C59.6399 69.8861 58.4526 67.5972 57.3779 65.3352C56.3031 63.0732 55.249 60.7394 53.5555 58.8987C51.8619 57.058 50.2779 56.0839 47.8027 56.3499Z\" fill=\"#E6E6E6\"/>\n<path d=\"M60.171 162.48C59.7751 162.886 59.2603 163.153 58.7027 163.241C58.145 163.329 57.574 163.234 57.074 162.97C56.8651 162.861 56.6719 162.725 56.4996 162.564L50.3767 157.977L47.9488 156.157C47.6934 155.917 47.4891 155.628 47.3481 155.306C47.2072 154.984 47.1326 154.636 47.129 154.284C47.1254 153.932 47.1929 153.583 47.3272 153.258C47.4615 152.934 47.6599 152.64 47.9103 152.395L49.521 151.128L50.1872 150.602L51.0813 149.897L51.863 149.281L56.8786 152.12L56.9644 152.287L60.7602 159.674C60.9375 160.15 60.9762 160.667 60.8718 161.164C60.7674 161.661 60.5242 162.118 60.171 162.48Z\" fill=\"#2F2E41\"/>\n<path d=\"M20.7926 160.091C20.3967 160.497 19.8819 160.764 19.3242 160.852C18.7666 160.941 18.1956 160.846 17.6956 160.581C17.6156 160.539 17.5357 160.492 17.4587 160.441C17.3391 160.362 17.2262 160.273 17.1212 160.175L10.9982 155.588L10.6163 155.301L8.5704 153.768C8.31502 153.529 8.11063 153.239 7.9697 152.917C7.82876 152.595 7.75423 152.248 7.75063 151.896C7.74702 151.544 7.81443 151.195 7.94875 150.87C8.08307 150.545 8.28148 150.251 8.53191 150.006L10.1426 148.739L10.8088 148.213L11.7029 147.508L12.4846 146.893L12.6119 146.964L17.0116 149.453L17.5002 149.731L17.586 149.899L21.3817 157.285C21.5591 157.761 21.5978 158.278 21.4934 158.775C21.389 159.272 21.1458 159.729 20.7926 160.091Z\" fill=\"#2F2E41\"/>\n<path d=\"M63.1061 35.6949C59.6667 31.762 55.7886 29.881 51.1389 31.608C43.6786 29.0809 33.8721 46.4485 39.9105 52.747L50.137 53.6075L53.2683 47.917L52.1603 53.8114L60.3402 54.6354C56.1673 48.0873 57.5058 41.7929 63.1061 35.6949Z\" fill=\"#2F2E41\"/>\n<path d=\"M101.632 64.0838C105.918 64.0838 109.393 60.5769 109.393 56.2509C109.393 51.9249 105.918 48.418 101.632 48.418C97.3454 48.418 93.8706 51.9249 93.8706 56.2509C93.8706 60.5769 97.3454 64.0838 101.632 64.0838Z\" fill=\"white\"/>\n<path d=\"M119.149 55.2091C118.91 55.213 118.683 55.3113 118.516 55.4826C118.349 55.6539 118.256 55.8846 118.256 56.1249C118.256 56.3653 118.349 56.596 118.516 56.7673C118.683 56.9386 118.91 57.0368 119.149 57.0408H143.654C143.894 57.0447 144.127 56.9521 144.3 56.7832C144.473 56.6142 144.572 56.3829 144.576 56.14C144.58 55.8971 144.488 55.6626 144.321 55.488C144.153 55.3134 143.924 55.2131 143.683 55.2091C143.673 55.2089 143.664 55.2089 143.654 55.2091H119.149Z\" fill=\"white\"/>\n<path d=\"M119.149 49.9025C118.91 49.9064 118.683 50.0046 118.516 50.176C118.349 50.3473 118.256 50.578 118.256 50.8183C118.256 51.0586 118.349 51.2893 118.516 51.4606C118.683 51.6319 118.91 51.7302 119.149 51.7341H131.386C131.626 51.7379 131.858 51.6452 132.031 51.4762C132.204 51.3073 132.303 51.0761 132.307 50.8333C132.311 50.5906 132.22 50.3561 132.052 50.1816C131.885 50.007 131.656 49.9067 131.416 49.9025C131.406 49.9023 131.396 49.9023 131.386 49.9025H119.149Z\" fill=\"white\"/>\n<path d=\"M119.149 60.7677C118.91 60.7717 118.683 60.8699 118.516 61.0412C118.349 61.2125 118.256 61.4432 118.256 61.6835C118.256 61.9238 118.349 62.1545 118.516 62.3258C118.683 62.4972 118.91 62.5954 119.149 62.5993H143.654C143.773 62.6014 143.891 62.5797 144.002 62.5356C144.113 62.4914 144.214 62.4256 144.3 62.342C144.386 62.2583 144.454 62.1585 144.502 62.0481C144.549 61.9377 144.575 61.8189 144.577 61.6986C144.579 61.5782 144.557 61.4587 144.513 61.3468C144.469 61.2349 144.404 61.1328 144.321 61.0463C144.238 60.9599 144.139 60.8908 144.03 60.843C143.92 60.7952 143.803 60.7696 143.683 60.7677C143.673 60.7675 143.663 60.7675 143.654 60.7677H119.149Z\" fill=\"white\"/>\n<path d=\"M126.578 86.6839C127.645 86.6839 128.51 85.8107 128.51 84.7335C128.51 83.6564 127.645 82.7832 126.578 82.7832C125.51 82.7832 124.645 83.6564 124.645 84.7335C124.645 85.8107 125.51 86.6839 126.578 86.6839Z\" fill=\"#E6E6E6\"/>\n<path d=\"M134.542 83.7248C134.279 83.7292 134.029 83.8376 133.845 84.0265C133.661 84.2154 133.558 84.4697 133.558 84.7346C133.558 84.9995 133.661 85.2538 133.845 85.4427C134.029 85.6316 134.279 85.74 134.542 85.7445H181.716C181.981 85.7477 182.236 85.645 182.426 85.4589C182.616 85.2727 182.725 85.0182 182.729 84.7511C182.733 84.484 182.633 84.2261 182.449 84.0337C182.265 83.8414 182.014 83.7303 181.749 83.7248C181.738 83.7246 181.727 83.7246 181.716 83.7248H134.542Z\" fill=\"#E6E6E6\"/>\n<path d=\"M126.578 96.1586C127.645 96.1586 128.51 95.2853 128.51 94.2082C128.51 93.131 127.645 92.2578 126.578 92.2578C125.51 92.2578 124.645 93.131 124.645 94.2082C124.645 95.2853 125.51 96.1586 126.578 96.1586Z\" fill=\"#E6E6E6\"/>\n<path d=\"M134.541 93.1974C134.279 93.2019 134.029 93.3102 133.845 93.4991C133.661 93.688 133.558 93.9423 133.558 94.2073C133.558 94.4722 133.661 94.7265 133.845 94.9154C134.029 95.1043 134.279 95.2127 134.541 95.2171H181.716C181.981 95.2205 182.236 95.1178 182.426 94.9316C182.616 94.7455 182.725 94.4909 182.729 94.2238C182.733 93.9566 182.633 93.6986 182.449 93.5063C182.265 93.3139 182.014 93.2028 181.749 93.1974C181.738 93.1972 181.727 93.1972 181.716 93.1974H134.541Z\" fill=\"#E6E6E6\"/>\n<path d=\"M126.578 105.631C127.645 105.631 128.51 104.758 128.51 103.681C128.51 102.604 127.645 101.73 126.578 101.73C125.51 101.73 124.645 102.604 124.645 103.681C124.645 104.758 125.51 105.631 126.578 105.631Z\" fill=\"#E6E6E6\"/>\n<path d=\"M134.541 102.67C134.279 102.675 134.029 102.783 133.845 102.972C133.661 103.161 133.558 103.415 133.558 103.68C133.558 103.945 133.661 104.199 133.845 104.388C134.029 104.577 134.279 104.685 134.541 104.69H181.716C181.981 104.693 182.236 104.59 182.426 104.404C182.616 104.218 182.725 103.964 182.729 103.696C182.733 103.429 182.633 103.171 182.449 102.979C182.265 102.787 182.014 102.675 181.749 102.67C181.738 102.67 181.727 102.67 181.716 102.67H134.541Z\" fill=\"#E6E6E6\"/>\n<path d=\"M126.578 115.104C127.645 115.104 128.51 114.231 128.51 113.153C128.51 112.076 127.645 111.203 126.578 111.203C125.51 111.203 124.645 112.076 124.645 113.153C124.645 114.231 125.51 115.104 126.578 115.104Z\" fill=\"#E6E6E6\"/>\n<path d=\"M134.542 112.145C134.279 112.149 134.029 112.258 133.845 112.446C133.661 112.635 133.558 112.89 133.558 113.155C133.558 113.419 133.661 113.674 133.845 113.863C134.029 114.052 134.279 114.16 134.542 114.164H181.716C181.848 114.167 181.979 114.144 182.102 114.095C182.224 114.047 182.336 113.974 182.431 113.882C182.526 113.79 182.602 113.679 182.655 113.557C182.707 113.435 182.735 113.304 182.737 113.171C182.74 113.038 182.716 112.906 182.667 112.782C182.619 112.659 182.546 112.546 182.455 112.451C182.363 112.355 182.253 112.279 182.132 112.227C182.011 112.174 181.881 112.146 181.749 112.145C181.738 112.144 181.727 112.144 181.716 112.145H134.542Z\" fill=\"#E6E6E6\"/>\n<path d=\"M126.578 124.576C127.645 124.576 128.51 123.703 128.51 122.626C128.51 121.549 127.645 120.676 126.578 120.676C125.51 120.676 124.645 121.549 124.645 122.626C124.645 123.703 125.51 124.576 126.578 124.576Z\" fill=\"#E6E6E6\"/>\n<path d=\"M134.542 121.617C134.279 121.622 134.029 121.73 133.845 121.919C133.661 122.108 133.558 122.362 133.558 122.627C133.558 122.892 133.661 123.146 133.845 123.335C134.029 123.524 134.279 123.633 134.542 123.637H181.716C181.981 123.64 182.236 123.538 182.426 123.351C182.616 123.165 182.725 122.911 182.729 122.644C182.733 122.377 182.633 122.119 182.449 121.926C182.265 121.734 182.014 121.623 181.749 121.617C181.738 121.617 181.727 121.617 181.716 121.617H134.542Z\" fill=\"#E6E6E6\"/>\n<path d=\"M126.578 134.049C127.645 134.049 128.51 133.176 128.51 132.099C128.51 131.022 127.645 130.148 126.578 130.148C125.51 130.148 124.645 131.022 124.645 132.099C124.645 133.176 125.51 134.049 126.578 134.049Z\" fill=\"#E6E6E6\"/>\n<path d=\"M134.542 131.09C134.279 131.094 134.029 131.203 133.845 131.392C133.661 131.581 133.558 131.835 133.558 132.1C133.558 132.365 133.661 132.619 133.845 132.808C134.029 132.997 134.279 133.105 134.542 133.11H181.716C181.981 133.113 182.236 133.01 182.426 132.824C182.616 132.638 182.725 132.383 182.729 132.116C182.733 131.849 182.633 131.591 182.449 131.399C182.265 131.207 182.014 131.096 181.749 131.09C181.738 131.09 181.727 131.09 181.716 131.09H134.542Z\" fill=\"#E6E6E6\"/>\n<path d=\"M126.578 143.524C127.645 143.524 128.51 142.651 128.51 141.573C128.51 140.496 127.645 139.623 126.578 139.623C125.51 139.623 124.645 140.496 124.645 141.573C124.645 142.651 125.51 143.524 126.578 143.524Z\" fill=\"#E6E6E6\"/>\n<path d=\"M134.541 140.563C134.279 140.567 134.029 140.675 133.845 140.864C133.661 141.053 133.558 141.308 133.558 141.572C133.558 141.837 133.661 142.092 133.845 142.281C134.029 142.469 134.279 142.578 134.541 142.582H181.716C181.981 142.586 182.236 142.483 182.426 142.297C182.616 142.111 182.725 141.856 182.729 141.589C182.733 141.322 182.633 141.064 182.449 140.871C182.265 140.679 182.014 140.568 181.749 140.563C181.738 140.562 181.727 140.562 181.716 140.563H134.541Z\" fill=\"#E6E6E6\"/>\n<path d=\"M218 127.663C217.959 128.691 216.929 149.914 202.802 161.51C202.211 161.995 201.598 162.462 200.961 162.911L200.48 162.438H200.759C201.089 162.438 201.405 162.306 201.638 162.07C201.871 161.835 202.002 161.516 202.002 161.184V119.352C202.297 117.747 202.576 116.17 202.83 114.635C204.207 106.29 204.845 99.2408 203.813 96.3125C204.26 97.4437 213.238 120.58 208.362 144.155C213.191 137.482 217.774 130.477 218 127.663Z\" fill=\"#E6E6E6\"/>\n</g>\n<defs>\n<clipPath id=\"clip0\">\n<rect width=\"218\" height=\"164\" fill=\"white\"/>\n</clipPath>\n</defs>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/examples-controls/button.icon.js
var BUTTON_ICON = "\n<svg width=\"83\" height=\"22\" viewBox=\"0 0 83 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"83\" height=\"22\" rx=\"4\" fill=\"#EEEEEE\"/>\n<path d=\"M8.516 10.812C8.516 9.996 8.7 9.264 9.068 8.616C9.436 7.96 9.936 7.448 10.568 7.08C11.208 6.712 11.916 6.528 12.692 6.528C13.604 6.528 14.4 6.748 15.08 7.188C15.76 7.628 16.256 8.252 16.568 9.06H15.26C15.028 8.556 14.692 8.168 14.252 7.896C13.82 7.624 13.3 7.488 12.692 7.488C12.108 7.488 11.584 7.624 11.12 7.896C10.656 8.168 10.292 8.556 10.028 9.06C9.764 9.556 9.632 10.14 9.632 10.812C9.632 11.476 9.764 12.06 10.028 12.564C10.292 13.06 10.656 13.444 11.12 13.716C11.584 13.988 12.108 14.124 12.692 14.124C13.3 14.124 13.82 13.992 14.252 13.728C14.692 13.456 15.028 13.068 15.26 12.564H16.568C16.256 13.364 15.76 13.984 15.08 14.424C14.4 14.856 13.604 15.072 12.692 15.072C11.916 15.072 11.208 14.892 10.568 14.532C9.936 14.164 9.436 13.656 9.068 13.008C8.7 12.36 8.516 11.628 8.516 10.812ZM19.1055 6.12V15H18.0135V6.12H19.1055ZM21.3507 7.356C21.1427 7.356 20.9667 7.284 20.8227 7.14C20.6787 6.996 20.6067 6.82 20.6067 6.612C20.6067 6.404 20.6787 6.228 20.8227 6.084C20.9667 5.94 21.1427 5.868 21.3507 5.868C21.5507 5.868 21.7187 5.94 21.8547 6.084C21.9987 6.228 22.0707 6.404 22.0707 6.612C22.0707 6.82 21.9987 6.996 21.8547 7.14C21.7187 7.284 21.5507 7.356 21.3507 7.356ZM21.8787 8.424V15H20.7867V8.424H21.8787ZM23.1518 11.688C23.1518 11.016 23.2878 10.428 23.5598 9.924C23.8318 9.412 24.2038 9.016 24.6758 8.736C25.1558 8.456 25.6918 8.316 26.2838 8.316C26.8518 8.316 27.3478 8.444 27.7718 8.7C28.2038 8.948 28.5198 9.256 28.7198 9.624V8.424H29.8238V18.12H28.7198V13.788C28.5118 14.156 28.1918 14.468 27.7598 14.724C27.3278 14.98 26.8238 15.108 26.2478 15.108C25.6718 15.108 25.1478 14.964 24.6758 14.676C24.2038 14.388 23.8318 13.984 23.5598 13.464C23.2878 12.944 23.1518 12.352 23.1518 11.688ZM28.7198 11.7C28.7198 11.204 28.6198 10.772 28.4198 10.404C28.2198 10.036 27.9478 9.756 27.6038 9.564C27.2678 9.364 26.8958 9.264 26.4878 9.264C26.0798 9.264 25.7078 9.36 25.3718 9.552C25.0358 9.744 24.7678 10.024 24.5678 10.392C24.3678 10.76 24.2678 11.192 24.2678 11.688C24.2678 12.192 24.3678 12.632 24.5678 13.008C24.7678 13.376 25.0358 13.66 25.3718 13.86C25.7078 14.052 26.0798 14.148 26.4878 14.148C26.8958 14.148 27.2678 14.052 27.6038 13.86C27.9478 13.66 28.2198 13.376 28.4198 13.008C28.6198 12.632 28.7198 12.196 28.7198 11.7ZM37.3212 8.424V15H36.2292V14.028C36.0212 14.364 35.7292 14.628 35.3532 14.82C34.9852 15.004 34.5772 15.096 34.1292 15.096C33.6172 15.096 33.1572 14.992 32.7492 14.784C32.3412 14.568 32.0172 14.248 31.7772 13.824C31.5452 13.4 31.4292 12.884 31.4292 12.276V8.424H32.5092V12.132C32.5092 12.78 32.6732 13.28 33.0012 13.632C33.3292 13.976 33.7772 14.148 34.3452 14.148C34.9292 14.148 35.3892 13.968 35.7252 13.608C36.0612 13.248 36.2292 12.724 36.2292 12.036V8.424H37.3212ZM44.9849 11.46C44.9849 11.668 44.9729 11.888 44.9489 12.12H39.6929C39.7329 12.768 39.9529 13.276 40.3529 13.644C40.7609 14.004 41.2529 14.184 41.8289 14.184C42.3009 14.184 42.6929 14.076 43.0049 13.86C43.3249 13.636 43.5489 13.34 43.6769 12.972H44.8529C44.6769 13.604 44.3249 14.12 43.7969 14.52C43.2689 14.912 42.6129 15.108 41.8289 15.108C41.2049 15.108 40.6449 14.968 40.1489 14.688C39.6609 14.408 39.2769 14.012 38.9969 13.5C38.7169 12.98 38.5769 12.38 38.5769 11.7C38.5769 11.02 38.7129 10.424 38.9849 9.912C39.2569 9.4 39.6369 9.008 40.1249 8.736C40.6209 8.456 41.1889 8.316 41.8289 8.316C42.4529 8.316 43.0049 8.452 43.4849 8.724C43.9649 8.996 44.3329 9.372 44.5889 9.852C44.8529 10.324 44.9849 10.86 44.9849 11.46ZM43.8569 11.232C43.8569 10.816 43.7649 10.46 43.5809 10.164C43.3969 9.86 43.1449 9.632 42.8249 9.48C42.5129 9.32 42.1649 9.24 41.7809 9.24C41.2289 9.24 40.7569 9.416 40.3649 9.768C39.9809 10.12 39.7609 10.608 39.7049 11.232H43.8569ZM48.8576 11.688C48.8576 11.016 48.9936 10.428 49.2656 9.924C49.5376 9.412 49.9096 9.016 50.3816 8.736C50.8616 8.456 51.3936 8.316 51.9776 8.316C52.5536 8.316 53.0536 8.44 53.4776 8.688C53.9016 8.936 54.2176 9.248 54.4256 9.624V8.424H55.5296V15H54.4256V13.776C54.2096 14.16 53.8856 14.48 53.4536 14.736C53.0296 14.984 52.5336 15.108 51.9656 15.108C51.3816 15.108 50.8536 14.964 50.3816 14.676C49.9096 14.388 49.5376 13.984 49.2656 13.464C48.9936 12.944 48.8576 12.352 48.8576 11.688ZM54.4256 11.7C54.4256 11.204 54.3256 10.772 54.1256 10.404C53.9256 10.036 53.6536 9.756 53.3096 9.564C52.9736 9.364 52.6016 9.264 52.1936 9.264C51.7856 9.264 51.4136 9.36 51.0776 9.552C50.7416 9.744 50.4736 10.024 50.2736 10.392C50.0736 10.76 49.9736 11.192 49.9736 11.688C49.9736 12.192 50.0736 12.632 50.2736 13.008C50.4736 13.376 50.7416 13.66 51.0776 13.86C51.4136 14.052 51.7856 14.148 52.1936 14.148C52.6016 14.148 52.9736 14.052 53.3096 13.86C53.6536 13.66 53.9256 13.376 54.1256 13.008C54.3256 12.632 54.4256 12.196 54.4256 11.7ZM56.7869 11.688C56.7869 11.016 56.9229 10.428 57.1949 9.924C57.4669 9.412 57.8389 9.016 58.3109 8.736C58.7909 8.456 59.3269 8.316 59.9189 8.316C60.4869 8.316 60.9829 8.444 61.4069 8.7C61.8389 8.948 62.1549 9.256 62.3549 9.624V8.424H63.4589V18.12H62.3549V13.788C62.1469 14.156 61.8269 14.468 61.3949 14.724C60.9629 14.98 60.4589 15.108 59.8829 15.108C59.3069 15.108 58.7829 14.964 58.3109 14.676C57.8389 14.388 57.4669 13.984 57.1949 13.464C56.9229 12.944 56.7869 12.352 56.7869 11.688ZM62.3549 11.7C62.3549 11.204 62.2549 10.772 62.0549 10.404C61.8549 10.036 61.5829 9.756 61.2389 9.564C60.9029 9.364 60.5309 9.264 60.1229 9.264C59.7149 9.264 59.3429 9.36 59.0069 9.552C58.6709 9.744 58.4029 10.024 58.2029 10.392C58.0029 10.76 57.9029 11.192 57.9029 11.688C57.9029 12.192 58.0029 12.632 58.2029 13.008C58.4029 13.376 58.6709 13.66 59.0069 13.86C59.3429 14.052 59.7149 14.148 60.1229 14.148C60.5309 14.148 60.9029 14.052 61.2389 13.86C61.5829 13.66 61.8549 13.376 62.0549 13.008C62.2549 12.632 62.3549 12.196 62.3549 11.7ZM70.9563 8.424V15H69.8643V14.028C69.6563 14.364 69.3643 14.628 68.9883 14.82C68.6203 15.004 68.2123 15.096 67.7643 15.096C67.2523 15.096 66.7923 14.992 66.3843 14.784C65.9763 14.568 65.6523 14.248 65.4123 13.824C65.1803 13.4 65.0643 12.884 65.0643 12.276V8.424H66.1443V12.132C66.1443 12.78 66.3083 13.28 66.6363 13.632C66.9643 13.976 67.4123 14.148 67.9803 14.148C68.5643 14.148 69.0243 13.968 69.3603 13.608C69.6963 13.248 69.8643 12.724 69.8643 12.036V8.424H70.9563ZM73.1841 7.356C72.9761 7.356 72.8001 7.284 72.6561 7.14C72.5121 6.996 72.4401 6.82 72.4401 6.612C72.4401 6.404 72.5121 6.228 72.6561 6.084C72.8001 5.94 72.9761 5.868 73.1841 5.868C73.3841 5.868 73.5521 5.94 73.6881 6.084C73.8321 6.228 73.9041 6.404 73.9041 6.612C73.9041 6.82 73.8321 6.996 73.6881 7.14C73.5521 7.284 73.3841 7.356 73.1841 7.356ZM73.7121 8.424V15H72.6201V8.424H73.7121Z\" fill=\"#505050\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/examples-controls/checkbox.icon.js
var CHECKBOX_ICON = "\n<svg width=\"84\" height=\"9\" viewBox=\"0 0 84 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect x=\"0.5\" y=\"0.5\" width=\"8\" height=\"8\" rx=\"1.5\" stroke=\"#C4C4C4\"/>\n<rect width=\"9\" height=\"9\" transform=\"translate(25)\" fill=\"white\"/>\n<rect x=\"25\" width=\"9\" height=\"9\" rx=\"2\" fill=\"#505050\"/>\n<path d=\"M28.4091 5.8097L26.9773 4.39925L26.5 4.8694L28.4091 6.75L32.5 2.72015L32.0227 2.25L28.4091 5.8097Z\" fill=\"white\"/>\n<rect x=\"50.5\" y=\"0.5\" width=\"8\" height=\"8\" rx=\"1.5\" stroke=\"#C4C4C4\"/>\n<rect width=\"9\" height=\"9\" transform=\"translate(75)\" fill=\"white\"/>\n<rect x=\"75\" width=\"9\" height=\"9\" rx=\"2\" fill=\"#505050\"/>\n<path d=\"M78.4091 5.8097L76.9773 4.39925L76.5 4.8694L78.4091 6.75L82.5 2.72015L82.0227 2.25L78.4091 5.8097Z\" fill=\"white\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/examples-controls/date.icon.js
var DATE_ICON = "\n<svg width=\"90\" height=\"22\" viewBox=\"0 0 90 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"90\" height=\"22\" rx=\"4\" fill=\"#EEEEEE\"/>\n<path d=\"M80.6667 6.2H80V5.6C80 5.27 79.7 5 79.3333 5C78.9667 5 78.6667 5.27 78.6667 5.6V6.2H73.3333V5.6C73.3333 5.27 73.0333 5 72.6667 5C72.3 5 72 5.27 72 5.6V6.2H71.3333C70.5933 6.2 70.0067 6.74 70.0067 7.40001L70 15.8C70 16.1183 70.1405 16.4235 70.3905 16.6486C70.6406 16.8736 70.9797 17 71.3333 17H80.6667C81.4 17 82 16.46 82 15.8V7.40001C82 6.74 81.4 6.2 80.6667 6.2ZM80.6667 9.80001V15.8H71.3333V9.80001H80.6667ZM73.3333 11C73.7 11 74 11.27 74 11.6C74 11.93 73.7 12.2 73.3333 12.2C72.9667 12.2 72.6667 11.93 72.6667 11.6C72.6667 11.27 72.9667 11 73.3333 11ZM76 11C76.3667 11 76.6667 11.27 76.6667 11.6C76.6667 11.93 76.3667 12.2 76 12.2C75.6333 12.2 75.3333 11.93 75.3333 11.6C75.3333 11.27 75.6333 11 76 11ZM78.6667 11C79.0333 11 79.3333 11.27 79.3333 11.6C79.3333 11.93 79.0333 12.2 78.6667 12.2C78.3 12.2 78 11.93 78 11.6C78 11.27 78.3 11 78.6667 11Z\" fill=\"#505050\"/>\n</svg>\n\n";

// CONCATENATED MODULE: ./src/libraries/icons/examples-controls/dropdown.icon.js
var DROPDOWN_ICON = "\n<svg width=\"90\" height=\"22\" viewBox=\"0 0 90 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"90\" height=\"22\" rx=\"4\" fill=\"#EEEEEE\"/>\n<path d=\"M75.8225 9L78.5 11.4723L81.1775 9L82 9.76113L78.5 13L75 9.76113L75.8225 9Z\" fill=\"#505050\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/examples-controls/input.icon.js
var INPUT_ICON = "\n<svg width=\"90\" height=\"22\" viewBox=\"0 0 90 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"90\" height=\"22\" rx=\"4\" fill=\"#EEEEEE\"/>\n<path d=\"M55.125 13.9783C55.125 14.1027 55.1908 14.2221 55.3081 14.3101C55.4253 14.3981 55.5842 14.4476 55.75 14.4476H57V15.3862H55.4375C55.0938 15.3862 54.5 15.175 54.5 14.9169C54.5 15.175 53.9062 15.3862 53.5625 15.3862H52V14.4476H53.25C53.4158 14.4476 53.5747 14.3981 53.6919 14.3101C53.8092 14.2221 53.875 14.1027 53.875 13.9783V7.40793C53.875 7.28346 53.8092 7.16409 53.6919 7.07608C53.5747 6.98806 53.4158 6.93862 53.25 6.93862H52V6H53.5625C53.9062 6 54.5 6.21119 54.5 6.46931C54.5 6.21119 55.0938 6 55.4375 6H57V6.93862H55.75C55.5842 6.93862 55.4253 6.98806 55.3081 7.07608C55.1908 7.16409 55.125 7.28346 55.125 7.40793V13.9783Z\" fill=\"#C4C4C4\"/>\n<path d=\"M11.868 13.14H8.22L7.548 15H6.396L9.42 6.684H10.68L13.692 15H12.54L11.868 13.14ZM11.556 12.252L10.044 8.028L8.532 12.252H11.556ZM19.0179 10.692C19.3219 10.74 19.5979 10.864 19.8459 11.064C20.1019 11.264 20.3019 11.512 20.4459 11.808C20.5979 12.104 20.6739 12.42 20.6739 12.756C20.6739 13.18 20.5659 13.564 20.3499 13.908C20.1339 14.244 19.8179 14.512 19.4019 14.712C18.9939 14.904 18.5099 15 17.9499 15H14.8299V6.636H17.8299C18.3979 6.636 18.8819 6.732 19.2819 6.924C19.6819 7.108 19.9819 7.36 20.1819 7.68C20.3819 8 20.4819 8.36 20.4819 8.76C20.4819 9.256 20.3459 9.668 20.0739 9.996C19.8099 10.316 19.4579 10.548 19.0179 10.692ZM15.9219 10.248H17.7579C18.2699 10.248 18.6659 10.128 18.9459 9.888C19.2259 9.648 19.3659 9.316 19.3659 8.892C19.3659 8.468 19.2259 8.136 18.9459 7.896C18.6659 7.656 18.2619 7.536 17.7339 7.536H15.9219V10.248ZM17.8539 14.1C18.3979 14.1 18.8219 13.972 19.1259 13.716C19.4299 13.46 19.5819 13.104 19.5819 12.648C19.5819 12.184 19.4219 11.82 19.1019 11.556C18.7819 11.284 18.3539 11.148 17.8179 11.148H15.9219V14.1H17.8539ZM21.6013 10.812C21.6013 9.996 21.7853 9.264 22.1533 8.616C22.5213 7.96 23.0213 7.448 23.6533 7.08C24.2933 6.712 25.0013 6.528 25.7773 6.528C26.6893 6.528 27.4853 6.748 28.1653 7.188C28.8453 7.628 29.3413 8.252 29.6533 9.06H28.3453C28.1133 8.556 27.7773 8.168 27.3373 7.896C26.9053 7.624 26.3853 7.488 25.7773 7.488C25.1933 7.488 24.6693 7.624 24.2053 7.896C23.7413 8.168 23.3773 8.556 23.1133 9.06C22.8493 9.556 22.7173 10.14 22.7173 10.812C22.7173 11.476 22.8493 12.06 23.1133 12.564C23.3773 13.06 23.7413 13.444 24.2053 13.716C24.6693 13.988 25.1933 14.124 25.7773 14.124C26.3853 14.124 26.9053 13.992 27.3373 13.728C27.7773 13.456 28.1133 13.068 28.3453 12.564H29.6533C29.3413 13.364 28.8453 13.984 28.1653 14.424C27.4853 14.856 26.6893 15.072 25.7773 15.072C25.0013 15.072 24.2933 14.892 23.6533 14.532C23.0213 14.164 22.5213 13.656 22.1533 13.008C21.7853 12.36 21.6013 11.628 21.6013 10.812ZM33.7028 6.636C34.6148 6.636 35.4028 6.808 36.0668 7.152C36.7388 7.488 37.2508 7.972 37.6028 8.604C37.9628 9.236 38.1428 9.98 38.1428 10.836C38.1428 11.692 37.9628 12.436 37.6028 13.068C37.2508 13.692 36.7388 14.172 36.0668 14.508C35.4028 14.836 34.6148 15 33.7028 15H31.0988V6.636H33.7028ZM33.7028 14.1C34.7828 14.1 35.6068 13.816 36.1748 13.248C36.7428 12.672 37.0268 11.868 37.0268 10.836C37.0268 9.796 36.7388 8.984 36.1628 8.4C35.5948 7.816 34.7748 7.524 33.7028 7.524H32.1908V14.1H33.7028ZM40.4952 7.524V10.32H43.5432V11.22H40.4952V14.1H43.9032V15H39.4032V6.624H43.9032V7.524H40.4952ZM50.1036 6.636V7.524H46.4676V10.344H49.4196V11.232H46.4676V15H45.3756V6.636H50.1036Z\" fill=\"#505050\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/examples-controls/radio-button.icon.js
var RADIO_ICON = "\n<svg width=\"84\" height=\"9\" viewBox=\"0 0 84 9\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<circle cx=\"4.5\" cy=\"4.5\" r=\"4\" stroke=\"#C4C4C4\"/>\n<circle cx=\"29.5\" cy=\"4.5\" r=\"4.5\" fill=\"#505050\"/>\n<circle cx=\"29.5\" cy=\"4.49954\" r=\"2.38235\" fill=\"white\"/>\n<circle cx=\"54.5\" cy=\"4.5\" r=\"4\" stroke=\"#C4C4C4\"/>\n<circle cx=\"79.5\" cy=\"4.5\" r=\"4\" stroke=\"#C4C4C4\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/examples-controls/text-area.icon.js
var TEXTAREA_ICON = "\n<svg width=\"90\" height=\"44\" viewBox=\"0 0 90 44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"90\" height=\"44\" rx=\"4\" fill=\"#EEEEEE\"/>\n<path d=\"M11.868 13.14H8.22L7.548 15H6.396L9.42 6.684H10.68L13.692 15H12.54L11.868 13.14ZM11.556 12.252L10.044 8.028L8.532 12.252H11.556ZM19.0179 10.692C19.3219 10.74 19.5979 10.864 19.8459 11.064C20.1019 11.264 20.3019 11.512 20.4459 11.808C20.5979 12.104 20.6739 12.42 20.6739 12.756C20.6739 13.18 20.5659 13.564 20.3499 13.908C20.1339 14.244 19.8179 14.512 19.4019 14.712C18.9939 14.904 18.5099 15 17.9499 15H14.8299V6.636H17.8299C18.3979 6.636 18.8819 6.732 19.2819 6.924C19.6819 7.108 19.9819 7.36 20.1819 7.68C20.3819 8 20.4819 8.36 20.4819 8.76C20.4819 9.256 20.3459 9.668 20.0739 9.996C19.8099 10.316 19.4579 10.548 19.0179 10.692ZM15.9219 10.248H17.7579C18.2699 10.248 18.6659 10.128 18.9459 9.888C19.2259 9.648 19.3659 9.316 19.3659 8.892C19.3659 8.468 19.2259 8.136 18.9459 7.896C18.6659 7.656 18.2619 7.536 17.7339 7.536H15.9219V10.248ZM17.8539 14.1C18.3979 14.1 18.8219 13.972 19.1259 13.716C19.4299 13.46 19.5819 13.104 19.5819 12.648C19.5819 12.184 19.4219 11.82 19.1019 11.556C18.7819 11.284 18.3539 11.148 17.8179 11.148H15.9219V14.1H17.8539ZM21.6013 10.812C21.6013 9.996 21.7853 9.264 22.1533 8.616C22.5213 7.96 23.0213 7.448 23.6533 7.08C24.2933 6.712 25.0013 6.528 25.7773 6.528C26.6893 6.528 27.4853 6.748 28.1653 7.188C28.8453 7.628 29.3413 8.252 29.6533 9.06H28.3453C28.1133 8.556 27.7773 8.168 27.3373 7.896C26.9053 7.624 26.3853 7.488 25.7773 7.488C25.1933 7.488 24.6693 7.624 24.2053 7.896C23.7413 8.168 23.3773 8.556 23.1133 9.06C22.8493 9.556 22.7173 10.14 22.7173 10.812C22.7173 11.476 22.8493 12.06 23.1133 12.564C23.3773 13.06 23.7413 13.444 24.2053 13.716C24.6693 13.988 25.1933 14.124 25.7773 14.124C26.3853 14.124 26.9053 13.992 27.3373 13.728C27.7773 13.456 28.1133 13.068 28.3453 12.564H29.6533C29.3413 13.364 28.8453 13.984 28.1653 14.424C27.4853 14.856 26.6893 15.072 25.7773 15.072C25.0013 15.072 24.2933 14.892 23.6533 14.532C23.0213 14.164 22.5213 13.656 22.1533 13.008C21.7853 12.36 21.6013 11.628 21.6013 10.812ZM30.6308 7.32V6.324H32.8868V15H31.7828V7.32H30.6308ZM34.4506 14.124C35.4666 13.308 36.2626 12.64 36.8386 12.12C37.4146 11.592 37.8986 11.044 38.2906 10.476C38.6906 9.9 38.8906 9.336 38.8906 8.784C38.8906 8.264 38.7626 7.856 38.5066 7.56C38.2586 7.256 37.8546 7.104 37.2946 7.104C36.7506 7.104 36.3266 7.276 36.0226 7.62C35.7266 7.956 35.5666 8.408 35.5426 8.976H34.4866C34.5186 8.08 34.7906 7.388 35.3026 6.9C35.8146 6.412 36.4746 6.168 37.2826 6.168C38.1066 6.168 38.7586 6.396 39.2386 6.852C39.7266 7.308 39.9706 7.936 39.9706 8.736C39.9706 9.4 39.7706 10.048 39.3706 10.68C38.9786 11.304 38.5306 11.856 38.0266 12.336C37.5226 12.808 36.8786 13.36 36.0946 13.992H40.2226V14.904H34.4506V14.124ZM41.2809 8.508C41.3369 7.772 41.6209 7.196 42.1329 6.78C42.6449 6.364 43.3089 6.156 44.1249 6.156C44.6689 6.156 45.1369 6.256 45.5289 6.456C45.9289 6.648 46.2289 6.912 46.4289 7.248C46.6369 7.584 46.7409 7.964 46.7409 8.388C46.7409 8.884 46.5969 9.312 46.3089 9.672C46.0289 10.032 45.6609 10.264 45.2049 10.368V10.428C45.7249 10.556 46.1369 10.808 46.4409 11.184C46.7449 11.56 46.8969 12.052 46.8969 12.66C46.8969 13.116 46.7929 13.528 46.5849 13.896C46.3769 14.256 46.0649 14.54 45.6489 14.748C45.2329 14.956 44.7329 15.06 44.1489 15.06C43.3009 15.06 42.6049 14.84 42.0609 14.4C41.5169 13.952 41.2129 13.32 41.1489 12.504H42.2049C42.2609 12.984 42.4569 13.376 42.7929 13.68C43.1289 13.984 43.5769 14.136 44.1369 14.136C44.6969 14.136 45.1209 13.992 45.4089 13.704C45.7049 13.408 45.8529 13.028 45.8529 12.564C45.8529 11.964 45.6529 11.532 45.2529 11.268C44.8529 11.004 44.2489 10.872 43.4409 10.872H43.1649V9.96H43.4529C44.1889 9.952 44.7449 9.832 45.1209 9.6C45.4969 9.36 45.6849 8.992 45.6849 8.496C45.6849 8.072 45.5449 7.732 45.2649 7.476C44.9929 7.22 44.6009 7.092 44.0889 7.092C43.5929 7.092 43.1929 7.22 42.8889 7.476C42.5849 7.732 42.4049 8.076 42.3489 8.508H41.2809ZM50.9753 6.636C51.8873 6.636 52.6753 6.808 53.3393 7.152C54.0113 7.488 54.5233 7.972 54.8753 8.604C55.2353 9.236 55.4153 9.98 55.4153 10.836C55.4153 11.692 55.2353 12.436 54.8753 13.068C54.5233 13.692 54.0113 14.172 53.3393 14.508C52.6753 14.836 51.8873 15 50.9753 15H48.3713V6.636H50.9753ZM50.9753 14.1C52.0553 14.1 52.8793 13.816 53.4473 13.248C54.0153 12.672 54.2993 11.868 54.2993 10.836C54.2993 9.796 54.0113 8.984 53.4353 8.4C52.8673 7.816 52.0473 7.524 50.9753 7.524H49.4633V14.1H50.9753ZM57.7677 7.524V10.32H60.8157V11.22H57.7677V14.1H61.1757V15H56.6757V6.624H61.1757V7.524H57.7677ZM67.3761 6.636V7.524H63.7401V10.344H66.6921V11.232H63.7401V15H62.6481V6.636H67.3761ZM68.0709 13.068V12.24L72.2829 6.408H73.5909V12.12H74.7909V13.068H73.5909V15H72.5109V13.068H68.0709ZM72.5589 7.548L69.3309 12.12H72.5589V7.548ZM12.276 25.272H8.064V28.008C8.248 27.752 8.52 27.544 8.88 27.384C9.24 27.216 9.628 27.132 10.044 27.132C10.708 27.132 11.248 27.272 11.664 27.552C12.08 27.824 12.376 28.18 12.552 28.62C12.736 29.052 12.828 29.512 12.828 30C12.828 30.576 12.72 31.092 12.504 31.548C12.288 32.004 11.956 32.364 11.508 32.628C11.068 32.892 10.52 33.024 9.864 33.024C9.024 33.024 8.344 32.808 7.824 32.376C7.304 31.944 6.988 31.368 6.876 30.648H7.944C8.048 31.104 8.268 31.46 8.604 31.716C8.94 31.972 9.364 32.1 9.876 32.1C10.508 32.1 10.984 31.912 11.304 31.536C11.624 31.152 11.784 30.648 11.784 30.024C11.784 29.4 11.624 28.92 11.304 28.584C10.984 28.24 10.512 28.068 9.888 28.068C9.464 28.068 9.092 28.172 8.772 28.38C8.46 28.58 8.232 28.856 8.088 29.208H7.056V24.312H12.276V25.272ZM18.9352 26.388C18.7592 25.5 18.2112 25.056 17.2912 25.056C16.5792 25.056 16.0472 25.332 15.6952 25.884C15.3432 26.428 15.1712 27.328 15.1792 28.584C15.3632 28.168 15.6672 27.844 16.0912 27.612C16.5232 27.372 17.0032 27.252 17.5312 27.252C18.3552 27.252 19.0112 27.508 19.4992 28.02C19.9952 28.532 20.2432 29.24 20.2432 30.144C20.2432 30.688 20.1352 31.176 19.9192 31.608C19.7112 32.04 19.3912 32.384 18.9592 32.64C18.5352 32.896 18.0192 33.024 17.4112 33.024C16.5872 33.024 15.9432 32.84 15.4792 32.472C15.0152 32.104 14.6912 31.596 14.5072 30.948C14.3232 30.3 14.2312 29.5 14.2312 28.548C14.2312 25.612 15.2552 24.144 17.3032 24.144C18.0872 24.144 18.7032 24.356 19.1512 24.78C19.5992 25.204 19.8632 25.74 19.9432 26.388H18.9352ZM17.3032 28.176C16.9592 28.176 16.6352 28.248 16.3312 28.392C16.0272 28.528 15.7792 28.74 15.5872 29.028C15.4032 29.308 15.3112 29.652 15.3112 30.06C15.3112 30.668 15.4872 31.164 15.8392 31.548C16.1912 31.924 16.6952 32.112 17.3512 32.112C17.9112 32.112 18.3552 31.94 18.6832 31.596C19.0192 31.244 19.1872 30.772 19.1872 30.18C19.1872 29.556 19.0272 29.068 18.7072 28.716C18.3872 28.356 17.9192 28.176 17.3032 28.176ZM22.8083 24.636V33H21.7163V24.636H22.8083ZM28.7015 24.636V30.816C28.7015 31.504 28.4895 32.056 28.0655 32.472C27.6415 32.88 27.0815 33.084 26.3855 33.084C25.6815 33.084 25.1175 32.876 24.6935 32.46C24.2695 32.036 24.0575 31.46 24.0575 30.732H25.1495C25.1575 31.14 25.2615 31.472 25.4615 31.728C25.6695 31.984 25.9775 32.112 26.3855 32.112C26.7935 32.112 27.0975 31.992 27.2975 31.752C27.4975 31.504 27.5975 31.192 27.5975 30.816V24.636H28.7015ZM35.2088 33L31.7648 29.184V33H30.6728V24.636H31.7648V28.512L35.2208 24.636H36.6008L32.8088 28.824L36.6368 33H35.2088Z\" fill=\"#505050\"/>\n<path d=\"M42.125 31.9783C42.125 32.1028 42.1908 32.2222 42.3081 32.3102C42.4253 32.3982 42.5842 32.4476 42.75 32.4476H44V33.3863H42.4375C42.0938 33.3863 41.5 33.1751 41.5 32.9169C41.5 33.1751 40.9062 33.3863 40.5625 33.3863H39V32.4476H40.25C40.4158 32.4476 40.5747 32.3982 40.6919 32.3102C40.8092 32.2222 40.875 32.1028 40.875 31.9783V25.4079C40.875 25.2835 40.8092 25.1641 40.6919 25.0761C40.5747 24.9881 40.4158 24.9386 40.25 24.9386H39V24H40.5625C40.9062 24 41.5 24.2112 41.5 24.4693C41.5 24.2112 42.0938 24 42.4375 24H44V24.9386H42.75C42.5842 24.9386 42.4253 24.9881 42.3081 25.0761C42.1908 25.1641 42.125 25.2835 42.125 25.4079V31.9783Z\" fill=\"#C4C4C4\"/>\n<path d=\"M86 41.5L85.1213 42.4998\" stroke=\"#C4C4C4\" stroke-linecap=\"round\"/>\n<path d=\"M85.9999 38.9489L82.4647 42.4848\" stroke=\"#C4C4C4\" stroke-linecap=\"round\"/>\n<line x1=\"86\" y1=\"35.7071\" x2=\"79.2047\" y2=\"42.5024\" stroke=\"#C4C4C4\" stroke-linecap=\"round\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/examples-controls/text-block.icon.js
var TEXTBLOCK_ICON = "\n<svg width=\"83\" height=\"63\" viewBox=\"0 0 83 63\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M5.868 11.14H2.22L1.548 13H0.396L3.42 4.684H4.68L7.692 13H6.54L5.868 11.14ZM5.556 10.252L4.044 6.028L2.532 10.252H5.556ZM13.0179 8.692C13.3219 8.74 13.5979 8.864 13.8459 9.064C14.1019 9.264 14.3019 9.512 14.4459 9.808C14.5979 10.104 14.6739 10.42 14.6739 10.756C14.6739 11.18 14.5659 11.564 14.3499 11.908C14.1339 12.244 13.8179 12.512 13.4019 12.712C12.9939 12.904 12.5099 13 11.9499 13H8.82994V4.636H11.8299C12.3979 4.636 12.8819 4.732 13.2819 4.924C13.6819 5.108 13.9819 5.36 14.1819 5.68C14.3819 6 14.4819 6.36 14.4819 6.76C14.4819 7.256 14.3459 7.668 14.0739 7.996C13.8099 8.316 13.4579 8.548 13.0179 8.692ZM9.92194 8.248H11.7579C12.2699 8.248 12.6659 8.128 12.9459 7.888C13.2259 7.648 13.3659 7.316 13.3659 6.892C13.3659 6.468 13.2259 6.136 12.9459 5.896C12.6659 5.656 12.2619 5.536 11.7339 5.536H9.92194V8.248ZM11.8539 12.1C12.3979 12.1 12.8219 11.972 13.1259 11.716C13.4299 11.46 13.5819 11.104 13.5819 10.648C13.5819 10.184 13.4219 9.82 13.1019 9.556C12.7819 9.284 12.3539 9.148 11.8179 9.148H9.92194V12.1H11.8539ZM15.6013 8.812C15.6013 7.996 15.7853 7.264 16.1533 6.616C16.5213 5.96 17.0213 5.448 17.6533 5.08C18.2933 4.712 19.0013 4.528 19.7773 4.528C20.6893 4.528 21.4853 4.748 22.1653 5.188C22.8453 5.628 23.3413 6.252 23.6533 7.06H22.3453C22.1133 6.556 21.7773 6.168 21.3373 5.896C20.9053 5.624 20.3853 5.488 19.7773 5.488C19.1933 5.488 18.6693 5.624 18.2053 5.896C17.7413 6.168 17.3773 6.556 17.1133 7.06C16.8493 7.556 16.7173 8.14 16.7173 8.812C16.7173 9.476 16.8493 10.06 17.1133 10.564C17.3773 11.06 17.7413 11.444 18.2053 11.716C18.6693 11.988 19.1933 12.124 19.7773 12.124C20.3853 12.124 20.9053 11.992 21.3373 11.728C21.7773 11.456 22.1133 11.068 22.3453 10.564H23.6533C23.3413 11.364 22.8453 11.984 22.1653 12.424C21.4853 12.856 20.6893 13.072 19.7773 13.072C19.0013 13.072 18.2933 12.892 17.6533 12.532C17.0213 12.164 16.5213 11.656 16.1533 11.008C15.7853 10.36 15.6013 9.628 15.6013 8.812ZM27.7028 4.636C28.6148 4.636 29.4028 4.808 30.0668 5.152C30.7388 5.488 31.2508 5.972 31.6028 6.604C31.9628 7.236 32.1428 7.98 32.1428 8.836C32.1428 9.692 31.9628 10.436 31.6028 11.068C31.2508 11.692 30.7388 12.172 30.0668 12.508C29.4028 12.836 28.6148 13 27.7028 13H25.0988V4.636H27.7028ZM27.7028 12.1C28.7828 12.1 29.6068 11.816 30.1748 11.248C30.7428 10.672 31.0268 9.868 31.0268 8.836C31.0268 7.796 30.7388 6.984 30.1628 6.4C29.5948 5.816 28.7748 5.524 27.7028 5.524H26.1908V12.1H27.7028Z\" fill=\"#C4C4C4\"/>\n<path d=\"M3.528 31.636C4.44 31.636 5.228 31.808 5.892 32.152C6.564 32.488 7.076 32.972 7.428 33.604C7.788 34.236 7.968 34.98 7.968 35.836C7.968 36.692 7.788 37.436 7.428 38.068C7.076 38.692 6.564 39.172 5.892 39.508C5.228 39.836 4.44 40 3.528 40H0.924V31.636H3.528ZM3.528 39.1C4.608 39.1 5.432 38.816 6 38.248C6.568 37.672 6.852 36.868 6.852 35.836C6.852 34.796 6.564 33.984 5.988 33.4C5.42 32.816 4.6 32.524 3.528 32.524H2.016V39.1H3.528ZM10.3204 32.524V35.32H13.3684V36.22H10.3204V39.1H13.7284V40H9.22837V31.624H13.7284V32.524H10.3204ZM19.9287 31.636V32.524H16.2927V35.344H19.2447V36.232H16.2927V40H15.2007V31.636H19.9287ZM27.4036 34.06C27.1716 33.572 26.8356 33.196 26.3956 32.932C25.9556 32.66 25.4436 32.524 24.8596 32.524C24.2756 32.524 23.7476 32.66 23.2756 32.932C22.8116 33.196 22.4436 33.58 22.1716 34.084C21.9076 34.58 21.7756 35.156 21.7756 35.812C21.7756 36.468 21.9076 37.044 22.1716 37.54C22.4436 38.036 22.8116 38.42 23.2756 38.692C23.7476 38.956 24.2756 39.088 24.8596 39.088C25.6756 39.088 26.3476 38.844 26.8756 38.356C27.4036 37.868 27.7116 37.208 27.7996 36.376H24.4636V35.488H28.9636V36.328C28.8996 37.016 28.6836 37.648 28.3156 38.224C27.9476 38.792 27.4636 39.244 26.8636 39.58C26.2636 39.908 25.5956 40.072 24.8596 40.072C24.0836 40.072 23.3756 39.892 22.7356 39.532C22.0956 39.164 21.5876 38.656 21.2116 38.008C20.8436 37.36 20.6596 36.628 20.6596 35.812C20.6596 34.996 20.8436 34.264 21.2116 33.616C21.5876 32.96 22.0956 32.452 22.7356 32.092C23.3756 31.724 24.0836 31.54 24.8596 31.54C25.7476 31.54 26.5316 31.76 27.2116 32.2C27.8996 32.64 28.3996 33.26 28.7116 34.06H27.4036ZM36.6714 31.636V40H35.5794V36.208H31.3194V40H30.2274V31.636H31.3194V35.308H35.5794V31.636H36.6714ZM39.448 31.636V40H38.356V31.636H39.448ZM45.3412 31.636V37.816C45.3412 38.504 45.1292 39.056 44.7052 39.472C44.2812 39.88 43.7212 40.084 43.0252 40.084C42.3212 40.084 41.7572 39.876 41.3332 39.46C40.9092 39.036 40.6972 38.46 40.6972 37.732H41.7892C41.7972 38.14 41.9012 38.472 42.1012 38.728C42.3092 38.984 42.6172 39.112 43.0252 39.112C43.4332 39.112 43.7372 38.992 43.9372 38.752C44.1372 38.504 44.2372 38.192 44.2372 37.816V31.636H45.3412ZM51.8484 40L48.4044 36.184V40H47.3124V31.636H48.4044V35.512L51.8604 31.636H53.2404L49.4484 35.824L53.2764 40H51.8484ZM55.408 39.112H58.336V40H54.316V31.636H55.408V39.112ZM67.7997 31.696V40H66.7077V33.808L63.9477 40H63.1797L60.4077 33.796V40H59.3157V31.696H60.4917L63.5637 38.56L66.6357 31.696H67.7997ZM76.0477 40H74.9557L70.5637 33.34V40H69.4717V31.624H70.5637L74.9557 38.272V31.624H76.0477V40ZM4.716 58.084C3.94 58.084 3.232 57.904 2.592 57.544C1.952 57.176 1.444 56.668 1.068 56.02C0.7 55.364 0.516 54.628 0.516 53.812C0.516 52.996 0.7 52.264 1.068 51.616C1.444 50.96 1.952 50.452 2.592 50.092C3.232 49.724 3.94 49.54 4.716 49.54C5.5 49.54 6.212 49.724 6.852 50.092C7.492 50.452 7.996 50.956 8.364 51.604C8.732 52.252 8.916 52.988 8.916 53.812C8.916 54.636 8.732 55.372 8.364 56.02C7.996 56.668 7.492 57.176 6.852 57.544C6.212 57.904 5.5 58.084 4.716 58.084ZM4.716 57.136C5.3 57.136 5.824 57 6.288 56.728C6.76 56.456 7.128 56.068 7.392 55.564C7.664 55.06 7.8 54.476 7.8 53.812C7.8 53.14 7.664 52.556 7.392 52.06C7.128 51.556 6.764 51.168 6.3 50.896C5.836 50.624 5.308 50.488 4.716 50.488C4.124 50.488 3.596 50.624 3.132 50.896C2.668 51.168 2.3 51.556 2.028 52.06C1.764 52.556 1.632 53.14 1.632 53.812C1.632 54.476 1.764 55.06 2.028 55.564C2.3 56.068 2.668 56.456 3.132 56.728C3.604 57 4.132 57.136 4.716 57.136ZM15.7696 52.084C15.7696 52.78 15.5296 53.36 15.0496 53.824C14.5776 54.28 13.8536 54.508 12.8776 54.508H11.2696V58H10.1776V49.636H12.8776C13.8216 49.636 14.5376 49.864 15.0256 50.32C15.5216 50.776 15.7696 51.364 15.7696 52.084ZM12.8776 53.608C13.4856 53.608 13.9336 53.476 14.2216 53.212C14.5096 52.948 14.6536 52.572 14.6536 52.084C14.6536 51.052 14.0616 50.536 12.8776 50.536H11.2696V53.608H12.8776ZM23.6548 59.584L21.9868 57.916C21.5788 58.028 21.1628 58.084 20.7388 58.084C19.9628 58.084 19.2548 57.904 18.6148 57.544C17.9748 57.176 17.4668 56.668 17.0908 56.02C16.7228 55.364 16.5388 54.628 16.5388 53.812C16.5388 52.996 16.7228 52.264 17.0908 51.616C17.4668 50.96 17.9748 50.452 18.6148 50.092C19.2548 49.724 19.9628 49.54 20.7388 49.54C21.5228 49.54 22.2348 49.724 22.8748 50.092C23.5148 50.452 24.0188 50.956 24.3868 51.604C24.7548 52.252 24.9388 52.988 24.9388 53.812C24.9388 54.612 24.7628 55.332 24.4108 55.972C24.0588 56.612 23.5748 57.116 22.9588 57.484L25.0708 59.584H23.6548ZM17.6548 53.812C17.6548 54.476 17.7868 55.06 18.0508 55.564C18.3228 56.068 18.6908 56.456 19.1548 56.728C19.6268 57 20.1548 57.136 20.7388 57.136C21.3228 57.136 21.8468 57 22.3108 56.728C22.7828 56.456 23.1508 56.068 23.4148 55.564C23.6868 55.06 23.8228 54.476 23.8228 53.812C23.8228 53.14 23.6868 52.556 23.4148 52.06C23.1508 51.556 22.7868 51.168 22.3228 50.896C21.8588 50.624 21.3308 50.488 20.7388 50.488C20.1468 50.488 19.6188 50.624 19.1548 50.896C18.6908 51.168 18.3228 51.556 18.0508 52.06C17.7868 52.556 17.6548 53.14 17.6548 53.812ZM30.6278 58L28.6358 54.58H27.3158V58H26.2238V49.636H28.9238C29.5558 49.636 30.0878 49.744 30.5198 49.96C30.9598 50.176 31.2878 50.468 31.5038 50.836C31.7198 51.204 31.8278 51.624 31.8278 52.096C31.8278 52.672 31.6598 53.18 31.3238 53.62C30.9958 54.06 30.4998 54.352 29.8358 54.496L31.9358 58H30.6278ZM27.3158 53.704H28.9238C29.5158 53.704 29.9598 53.56 30.2558 53.272C30.5518 52.976 30.6998 52.584 30.6998 52.096C30.6998 51.6 30.5518 51.216 30.2558 50.944C29.9678 50.672 29.5238 50.536 28.9238 50.536H27.3158V53.704ZM35.9966 58.084C35.4446 58.084 34.9486 57.988 34.5086 57.796C34.0766 57.596 33.7366 57.324 33.4886 56.98C33.2406 56.628 33.1126 56.224 33.1046 55.768H34.2686C34.3086 56.16 34.4686 56.492 34.7486 56.764C35.0366 57.028 35.4526 57.16 35.9966 57.16C36.5166 57.16 36.9246 57.032 37.2206 56.776C37.5246 56.512 37.6766 56.176 37.6766 55.768C37.6766 55.448 37.5886 55.188 37.4126 54.988C37.2366 54.788 37.0166 54.636 36.7526 54.532C36.4886 54.428 36.1326 54.316 35.6846 54.196C35.1326 54.052 34.6886 53.908 34.3526 53.764C34.0246 53.62 33.7406 53.396 33.5006 53.092C33.2686 52.78 33.1526 52.364 33.1526 51.844C33.1526 51.388 33.2686 50.984 33.5006 50.632C33.7326 50.28 34.0566 50.008 34.4726 49.816C34.8966 49.624 35.3806 49.528 35.9246 49.528C36.7086 49.528 37.3486 49.724 37.8446 50.116C38.3486 50.508 38.6326 51.028 38.6966 51.676H37.4966C37.4566 51.356 37.2886 51.076 36.9926 50.836C36.6966 50.588 36.3046 50.464 35.8166 50.464C35.3606 50.464 34.9886 50.584 34.7006 50.824C34.4126 51.056 34.2686 51.384 34.2686 51.808C34.2686 52.112 34.3526 52.36 34.5206 52.552C34.6966 52.744 34.9086 52.892 35.1566 52.996C35.4126 53.092 35.7686 53.204 36.2246 53.332C36.7766 53.484 37.2206 53.636 37.5566 53.788C37.8926 53.932 38.1806 54.16 38.4206 54.472C38.6606 54.776 38.7806 55.192 38.7806 55.72C38.7806 56.128 38.6726 56.512 38.4566 56.872C38.2406 57.232 37.9206 57.524 37.4966 57.748C37.0726 57.972 36.5726 58.084 35.9966 58.084ZM45.3556 49.636V50.524H43.0756V58H41.9836V50.524H39.6916V49.636H45.3556ZM47.5878 49.636V54.928C47.5878 55.672 47.7678 56.224 48.1278 56.584C48.4958 56.944 49.0038 57.124 49.6518 57.124C50.2918 57.124 50.7918 56.944 51.1518 56.584C51.5198 56.224 51.7038 55.672 51.7038 54.928V49.636H52.7958V54.916C52.7958 55.612 52.6558 56.2 52.3758 56.68C52.0958 57.152 51.7158 57.504 51.2358 57.736C50.7638 57.968 50.2318 58.084 49.6398 58.084C49.0478 58.084 48.5118 57.968 48.0318 57.736C47.5598 57.504 47.1838 57.152 46.9038 56.68C46.6318 56.2 46.4958 55.612 46.4958 54.916V49.636H47.5878ZM61.3494 49.636L58.1934 58H56.9334L53.7774 49.636H54.9414L57.5694 56.848L60.1974 49.636H61.3494Z\" fill=\"#C4C4C4\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/examples-controls/number.icon.js
var NUMBER_ICON = "\n<svg width=\"90\" height=\"22\" viewBox=\"0 0 90 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"90\" height=\"22\" rx=\"4\" fill=\"#EEEEEE\"/>\n<path d=\"M6.456 7.32V6.324H8.712V15H7.608V7.32H6.456ZM10.2757 14.124C11.2917 13.308 12.0877 12.64 12.6637 12.12C13.2398 11.592 13.7238 11.044 14.1158 10.476C14.5158 9.9 14.7158 9.336 14.7158 8.784C14.7158 8.264 14.5878 7.856 14.3318 7.56C14.0838 7.256 13.6798 7.104 13.1198 7.104C12.5758 7.104 12.1518 7.276 11.8478 7.62C11.5518 7.956 11.3918 8.408 11.3677 8.976H10.3117C10.3437 8.08 10.6157 7.388 11.1278 6.9C11.6398 6.412 12.2997 6.168 13.1077 6.168C13.9318 6.168 14.5838 6.396 15.0638 6.852C15.5518 7.308 15.7958 7.936 15.7958 8.736C15.7958 9.4 15.5958 10.048 15.1958 10.68C14.8038 11.304 14.3558 11.856 13.8518 12.336C13.3478 12.808 12.7038 13.36 11.9198 13.992H16.0477V14.904H10.2757V14.124ZM17.1061 8.508C17.1621 7.772 17.4461 7.196 17.9581 6.78C18.4701 6.364 19.1341 6.156 19.9501 6.156C20.4941 6.156 20.9621 6.256 21.3541 6.456C21.7541 6.648 22.0541 6.912 22.2541 7.248C22.4621 7.584 22.5661 7.964 22.5661 8.388C22.5661 8.884 22.4221 9.312 22.1341 9.672C21.8541 10.032 21.4861 10.264 21.0301 10.368V10.428C21.5501 10.556 21.9621 10.808 22.2661 11.184C22.5701 11.56 22.7221 12.052 22.7221 12.66C22.7221 13.116 22.6181 13.528 22.4101 13.896C22.2021 14.256 21.8901 14.54 21.4741 14.748C21.0581 14.956 20.5581 15.06 19.9741 15.06C19.1261 15.06 18.4301 14.84 17.8861 14.4C17.3421 13.952 17.0381 13.32 16.9741 12.504H18.0301C18.0861 12.984 18.2821 13.376 18.6181 13.68C18.9541 13.984 19.4021 14.136 19.9621 14.136C20.5221 14.136 20.9461 13.992 21.2341 13.704C21.5301 13.408 21.6781 13.028 21.6781 12.564C21.6781 11.964 21.4781 11.532 21.0781 11.268C20.6781 11.004 20.0741 10.872 19.2661 10.872H18.9901V9.96H19.2781C20.0141 9.952 20.5701 9.832 20.9461 9.6C21.3221 9.36 21.5101 8.992 21.5101 8.496C21.5101 8.072 21.3701 7.732 21.0901 7.476C20.8181 7.22 20.4261 7.092 19.9141 7.092C19.4181 7.092 19.0181 7.22 18.7141 7.476C18.4101 7.732 18.2301 8.076 18.1741 8.508H17.1061ZM23.7525 13.068V12.24L27.9645 6.408H29.2725V12.12H30.4725V13.068H29.2725V15H28.1925V13.068H23.7525ZM28.2405 7.548L25.0125 12.12H28.2405V7.548ZM36.9154 7.272H32.7034V10.008C32.8874 9.752 33.1594 9.544 33.5194 9.384C33.8794 9.216 34.2674 9.132 34.6834 9.132C35.3474 9.132 35.8874 9.272 36.3034 9.552C36.7194 9.824 37.0154 10.18 37.1914 10.62C37.3754 11.052 37.4674 11.512 37.4674 12C37.4674 12.576 37.3594 13.092 37.1434 13.548C36.9274 14.004 36.5954 14.364 36.1474 14.628C35.7074 14.892 35.1594 15.024 34.5034 15.024C33.6634 15.024 32.9834 14.808 32.4634 14.376C31.9434 13.944 31.6274 13.368 31.5154 12.648H32.5834C32.6874 13.104 32.9074 13.46 33.2434 13.716C33.5794 13.972 34.0034 14.1 34.5154 14.1C35.1474 14.1 35.6234 13.912 35.9434 13.536C36.2634 13.152 36.4234 12.648 36.4234 12.024C36.4234 11.4 36.2634 10.92 35.9434 10.584C35.6234 10.24 35.1514 10.068 34.5274 10.068C34.1034 10.068 33.7314 10.172 33.4114 10.38C33.0994 10.58 32.8714 10.856 32.7274 11.208H31.6954V6.312H36.9154V7.272ZM43.5745 8.388C43.3985 7.5 42.8505 7.056 41.9305 7.056C41.2185 7.056 40.6865 7.332 40.3345 7.884C39.9825 8.428 39.8105 9.328 39.8185 10.584C40.0025 10.168 40.3065 9.844 40.7305 9.612C41.1625 9.372 41.6425 9.252 42.1705 9.252C42.9945 9.252 43.6505 9.508 44.1385 10.02C44.6345 10.532 44.8825 11.24 44.8825 12.144C44.8825 12.688 44.7745 13.176 44.5585 13.608C44.3505 14.04 44.0305 14.384 43.5985 14.64C43.1745 14.896 42.6585 15.024 42.0505 15.024C41.2265 15.024 40.5825 14.84 40.1185 14.472C39.6545 14.104 39.3305 13.596 39.1465 12.948C38.9625 12.3 38.8705 11.5 38.8705 10.548C38.8705 7.612 39.8945 6.144 41.9425 6.144C42.7265 6.144 43.3425 6.356 43.7905 6.78C44.2385 7.204 44.5025 7.74 44.5825 8.388H43.5745ZM41.9425 10.176C41.5985 10.176 41.2745 10.248 40.9705 10.392C40.6665 10.528 40.4185 10.74 40.2265 11.028C40.0425 11.308 39.9505 11.652 39.9505 12.06C39.9505 12.668 40.1265 13.164 40.4785 13.548C40.8305 13.924 41.3345 14.112 41.9905 14.112C42.5505 14.112 42.9945 13.94 43.3225 13.596C43.6585 13.244 43.8265 12.772 43.8265 12.18C43.8265 11.556 43.6665 11.068 43.3465 10.716C43.0265 10.356 42.5585 10.176 41.9425 10.176Z\" fill=\"#505050\"/>\n<path d=\"M50.125 13.9783C50.125 14.1028 50.1908 14.2221 50.3081 14.3101C50.4253 14.3981 50.5842 14.4476 50.75 14.4476H52V15.3862H50.4375C50.0938 15.3862 49.5 15.175 49.5 14.9169C49.5 15.175 48.9062 15.3862 48.5625 15.3862H47V14.4476H48.25C48.4158 14.4476 48.5747 14.3981 48.6919 14.3101C48.8092 14.2221 48.875 14.1028 48.875 13.9783V7.40793C48.875 7.28346 48.8092 7.16409 48.6919 7.07608C48.5747 6.98807 48.4158 6.93862 48.25 6.93862H47V6H48.5625C48.9062 6 49.5 6.21119 49.5 6.46931C49.5 6.21119 50.0938 6 50.4375 6H52V6.93862H50.75C50.5842 6.93862 50.4253 6.98807 50.3081 7.07608C50.1908 7.16409 50.125 7.28346 50.125 7.40793V13.9783Z\" fill=\"#C4C4C4\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icons/add-section.icon.js
var ADD_SECTION = "\n<svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M9.83342 4.83464H8.16675V8.16797H4.83342V9.83464H8.16675V13.168H9.83342V9.83464H13.1667V8.16797H9.83342V4.83464ZM9.00008 0.667969C4.40008 0.667969 0.666748 4.4013 0.666748 9.0013C0.666748 13.6013 4.40008 17.3346 9.00008 17.3346C13.6001 17.3346 17.3334 13.6013 17.3334 9.0013C17.3334 4.4013 13.6001 0.667969 9.00008 0.667969ZM9.00008 15.668C5.32508 15.668 2.33341 12.6763 2.33341 9.0013C2.33341 5.3263 5.32508 2.33464 9.00008 2.33464C12.6751 2.33464 15.6667 5.3263 15.6667 9.0013C15.6667 12.6763 12.6751 15.668 9.00008 15.668Z\" fill=\"#5AAED3\"/>\n</svg>\n\n";

// CONCATENATED MODULE: ./src/libraries/icons/close-custom.icon.js
var CLOSE_CUSTOM = "\n<svg width=\"14\" height=\"14\" viewBox=\"0 0 14 14\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z\" fill=\"#5AAED3\"/>\n</svg>\n";

// CONCATENATED MODULE: ./src/libraries/icon-facade.js


/**
 * Form-Icon-Facade is a lightweight library to help you retain ICON inside Form-Builder v2
 * @author Phat Tran <phattranminh96@gmail.com>
 * @license From Zondicons of Steve Schoger. Thanks very much for the beautiful/lightweight icons
 * @iconHomePage https://www.zondicons.com/
 */





























var ICONS = {
  addOutline: ADD_OUTLINE_ICON,
  arrowUp: ARROW_UP_ICON,
  arrowDown: ARROW_DOWN_ICON,
  editPencil: EDIT_PENCIL_ICON,
  editPencilBorder: EDIT_PENCIL_BORDER,
  cog: COG_ICON,
  close: CLOSE_ICON,
  trash: TRASH_ICON,
  trashCustom: TRASH_ICON_CUSTOM,
  chevronUp: CHEVRON_UP_ICON,
  chevronDown: CHEVRON_DOWN_ICON,
  navigationMore: NAVIGATION_MORE_ICON,
  informationOutline: INFORMATION_OUTLINE_ICON,
  corner_left: CORNER_LEFT,
  corner_right: CORNER_RIGHT,
  people: PEOPLE,
  circle: CIRCLE,
  add_control: ADD_CONTROL,
  control_button: BUTTON_ICON,
  control_checkbox: CHECKBOX_ICON,
  control_date: DATE_ICON,
  control_dropdown: DROPDOWN_ICON,
  control_input: INPUT_ICON,
  control_textarea: TEXTAREA_ICON,
  control_radiobutton: RADIO_ICON,
  control_textblock: TEXTBLOCK_ICON,
  control_number: NUMBER_ICON,
  add_section: ADD_SECTION,
  close_custom: CLOSE_CUSTOM
};
var FormIcon = {
  /**
   * Get SVG Icon for Form-Builder
   * @param {String} iconName
   * @param {String} width - Width with px (Eg: 16px)
   * @param {String} height - Height with px (Eg: 16px)
   * @param {String} fillColor - Hex Color String (Eg: #ffffff)
   * @returns {string} of SVG HTML TAG
   */
  getSVG: function getSVG(iconName) {
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '16px';
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '16px';
    var fillColor = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '#ffffff';

    if (!ICONS[iconName]) {
      throw new TypeError("Icon Name '".concat(iconName, "' doesn't exists in Vue-Form-Builder."));
    }

    var replacedIconWithData = ICONS[iconName].replace("{0}", width).replace("{1}", height).replace("{2}", fillColor);
    return replacedIconWithData;
  }
};

// EXTERNAL MODULE: ./src/components/FormBuilder.vue + 39 modules
var FormBuilder = __webpack_require__("6a29");

// EXTERNAL MODULE: ./src/components/FormRenderer.vue + 22 modules
var FormRenderer = __webpack_require__("fbdb");

// EXTERNAL MODULE: ./src/configs/controls.js + 92 modules
var controls = __webpack_require__("8dbe");

// EXTERNAL MODULE: ./src/configs/styles.js
var styles = __webpack_require__("d60e");

// EXTERNAL MODULE: ./src/configs/validation.js
var validation = __webpack_require__("a786");

// CONCATENATED MODULE: ./src/installer.js











var installer_VueFormBuilderInstaller = function VueFormBuilderInstaller(Vue) {
  var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
    globalInjection: true,
    validationErrorShowAlert: true,
    validationErrorAlertText: "Your form got error(s), please fix it and submit again"
  };

  if (VueFormBuilderInstaller.installed) {
    return;
  } // DI for Form-Builder


  var formDI = {
    getIcon: FormIcon.getSVG // a method to get icon from IconFacade

  }; // control extend?

  if (properties.hasOwnProperty('controls')) {
    installer_extendingControls(properties.controls);
  } // style override?


  if (properties.hasOwnProperty('styles')) {
    Object.assign(styles["a" /* STYLES */], properties.styles);
  } // validation extend?


  if (properties.hasOwnProperty('validations')) {
    installer_extendingValidations(properties.validations);
  } // validation closures


  if (properties.hasOwnProperty('validationClosures')) {
    formDI.validationClosures = properties.validationClosures;
  } // show alert or not?


  formDI.validationErrorShowAlert = properties.validationErrorShowAlert || true;
  formDI.validationErrorAlertText = properties.validationErrorAlertText; // For Event-Bus purpose

  Vue.prototype.$formEvent = new Vue();
  Vue.prototype.$form = formDI; // Register Form-Components

  if (!properties.hasOwnProperty('globalInjection') || properties.globalInjection) {
    Vue.component('FormBuilder', FormBuilder["a" /* default */]);
    Vue.component('FormRenderer', FormRenderer["a" /* default */]);
  } // Mark as registered


  VueFormBuilderInstaller.installed = true;
};
/**
 * Extending Control from the users
 * @param {Object} moreControlObject
 */


var installer_extendingControls = function extendingControls(moreControlObject) {
  // validation if it does conflict or not
  var allKeys = Object.keys(moreControlObject);

  for (var iKey = 0; iKey < allKeys.length; iKey++) {
    var key = allKeys[iKey]; // duplicated => error

    if (controls["a" /* CONTROLS */].hasOwnProperty(key)) {
      throw new TypeError("Extend-Control-Error: Your '".concat(key, "' control is duplicated with our build-in Controls. Please change to another key name instead."));
    }
  } // eligible to extend now


  Object.assign(controls["a" /* CONTROLS */], moreControlObject);
};
/**
 * Extending Validation
 * @param {Object} validationObj
 */


var installer_extendingValidations = function extendingValidations(validationObj) {
  // validation if it does conflict or not
  var allKeys = Object.keys(validationObj);

  for (var iKey = 0; iKey < allKeys.length; iKey++) {
    var key = allKeys[iKey]; // duplicated => error

    if (validation["a" /* VALIDATION_RULES */].hasOwnProperty(key)) {
      throw new TypeError("Extend-Validation-Error: Your '".concat(key, "' validation is duplicated with our build-in Validation. Please change to another key name instead."));
    }
  } // eligible to extend now


  Object.assign(validation["a" /* VALIDATION_RULES */], validationObj);
};



/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "2714":
/***/ (function(module, exports, __webpack_require__) {

var hasMap = typeof Map === 'function' && Map.prototype;
var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
var mapForEach = hasMap && Map.prototype.forEach;
var hasSet = typeof Set === 'function' && Set.prototype;
var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
var setForEach = hasSet && Set.prototype.forEach;
var hasWeakMap = typeof WeakMap === 'function' && WeakMap.prototype;
var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
var hasWeakSet = typeof WeakSet === 'function' && WeakSet.prototype;
var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
var booleanValueOf = Boolean.prototype.valueOf;
var objectToString = Object.prototype.toString;
var functionToString = Function.prototype.toString;
var match = String.prototype.match;
var bigIntValueOf = typeof BigInt === 'function' ? BigInt.prototype.valueOf : null;

var inspectCustom = __webpack_require__(0).custom;
var inspectSymbol = inspectCustom && isSymbol(inspectCustom) ? inspectCustom : null;

module.exports = function inspect_(obj, options, depth, seen) {
    var opts = options || {};

    if (has(opts, 'quoteStyle') && (opts.quoteStyle !== 'single' && opts.quoteStyle !== 'double')) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
    }
    if (
        has(opts, 'maxStringLength') && (typeof opts.maxStringLength === 'number'
            ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity
            : opts.maxStringLength !== null
        )
    ) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
    }
    var customInspect = has(opts, 'customInspect') ? opts.customInspect : true;
    if (typeof customInspect !== 'boolean') {
        throw new TypeError('option "customInspect", if provided, must be `true` or `false`');
    }

    if (
        has(opts, 'indent')
        && opts.indent !== null
        && opts.indent !== '\t'
        && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)
    ) {
        throw new TypeError('options "indent" must be "\\t", an integer > 0, or `null`');
    }

    if (typeof obj === 'undefined') {
        return 'undefined';
    }
    if (obj === null) {
        return 'null';
    }
    if (typeof obj === 'boolean') {
        return obj ? 'true' : 'false';
    }

    if (typeof obj === 'string') {
        return inspectString(obj, opts);
    }
    if (typeof obj === 'number') {
        if (obj === 0) {
            return Infinity / obj > 0 ? '0' : '-0';
        }
        return String(obj);
    }
    if (typeof obj === 'bigint') { // eslint-disable-line valid-typeof
        return String(obj) + 'n';
    }

    var maxDepth = typeof opts.depth === 'undefined' ? 5 : opts.depth;
    if (typeof depth === 'undefined') { depth = 0; }
    if (depth >= maxDepth && maxDepth > 0 && typeof obj === 'object') {
        return isArray(obj) ? '[Array]' : '[Object]';
    }

    var indent = getIndent(opts, depth);

    if (typeof seen === 'undefined') {
        seen = [];
    } else if (indexOf(seen, obj) >= 0) {
        return '[Circular]';
    }

    function inspect(value, from, noIndent) {
        if (from) {
            seen = seen.slice();
            seen.push(from);
        }
        if (noIndent) {
            var newOpts = {
                depth: opts.depth
            };
            if (has(opts, 'quoteStyle')) {
                newOpts.quoteStyle = opts.quoteStyle;
            }
            return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
    }

    if (typeof obj === 'function') {
        var name = nameOf(obj);
        return '[Function' + (name ? ': ' + name : ' (anonymous)') + ']';
    }
    if (isSymbol(obj)) {
        var symString = Symbol.prototype.toString.call(obj);
        return typeof obj === 'object' ? markBoxed(symString) : symString;
    }
    if (isElement(obj)) {
        var s = '<' + String(obj.nodeName).toLowerCase();
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
            s += ' ' + attrs[i].name + '=' + wrapQuotes(quote(attrs[i].value), 'double', opts);
        }
        s += '>';
        if (obj.childNodes && obj.childNodes.length) { s += '...'; }
        s += '</' + String(obj.nodeName).toLowerCase() + '>';
        return s;
    }
    if (isArray(obj)) {
        if (obj.length === 0) { return '[]'; }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
            return '[' + indentedJoin(xs, indent) + ']';
        }
        return '[ ' + xs.join(', ') + ' ]';
    }
    if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (parts.length === 0) { return '[' + String(obj) + ']'; }
        return '{ [' + String(obj) + '] ' + parts.join(', ') + ' }';
    }
    if (typeof obj === 'object' && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === 'function') {
            return obj[inspectSymbol]();
        } else if (typeof obj.inspect === 'function') {
            return obj.inspect();
        }
    }
    if (isMap(obj)) {
        var mapParts = [];
        mapForEach.call(obj, function (value, key) {
            mapParts.push(inspect(key, obj, true) + ' => ' + inspect(value, obj));
        });
        return collectionOf('Map', mapSize.call(obj), mapParts, indent);
    }
    if (isSet(obj)) {
        var setParts = [];
        setForEach.call(obj, function (value) {
            setParts.push(inspect(value, obj));
        });
        return collectionOf('Set', setSize.call(obj), setParts, indent);
    }
    if (isWeakMap(obj)) {
        return weakCollectionOf('WeakMap');
    }
    if (isWeakSet(obj)) {
        return weakCollectionOf('WeakSet');
    }
    if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
    }
    if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
    }
    if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
    }
    if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
    }
    if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        if (ys.length === 0) { return '{}'; }
        if (indent) {
            return '{' + indentedJoin(ys, indent) + '}';
        }
        return '{ ' + ys.join(', ') + ' }';
    }
    return String(obj);
};

function wrapQuotes(s, defaultStyle, opts) {
    var quoteChar = (opts.quoteStyle || defaultStyle) === 'double' ? '"' : "'";
    return quoteChar + s + quoteChar;
}

function quote(s) {
    return String(s).replace(/"/g, '&quot;');
}

function isArray(obj) { return toStr(obj) === '[object Array]'; }
function isDate(obj) { return toStr(obj) === '[object Date]'; }
function isRegExp(obj) { return toStr(obj) === '[object RegExp]'; }
function isError(obj) { return toStr(obj) === '[object Error]'; }
function isSymbol(obj) { return toStr(obj) === '[object Symbol]'; }
function isString(obj) { return toStr(obj) === '[object String]'; }
function isNumber(obj) { return toStr(obj) === '[object Number]'; }
function isBigInt(obj) { return toStr(obj) === '[object BigInt]'; }
function isBoolean(obj) { return toStr(obj) === '[object Boolean]'; }

var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
function has(obj, key) {
    return hasOwn.call(obj, key);
}

function toStr(obj) {
    return objectToString.call(obj);
}

function nameOf(f) {
    if (f.name) { return f.name; }
    var m = match.call(functionToString.call(f), /^function\s*([\w$]+)/);
    if (m) { return m[1]; }
    return null;
}

function indexOf(xs, x) {
    if (xs.indexOf) { return xs.indexOf(x); }
    for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) { return i; }
    }
    return -1;
}

function isMap(x) {
    if (!mapSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        mapSize.call(x);
        try {
            setSize.call(x);
        } catch (s) {
            return true;
        }
        return x instanceof Map; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakMap(x) {
    if (!weakMapHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakMapHas.call(x, weakMapHas);
        try {
            weakSetHas.call(x, weakSetHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakMap; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isSet(x) {
    if (!setSize || !x || typeof x !== 'object') {
        return false;
    }
    try {
        setSize.call(x);
        try {
            mapSize.call(x);
        } catch (m) {
            return true;
        }
        return x instanceof Set; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isWeakSet(x) {
    if (!weakSetHas || !x || typeof x !== 'object') {
        return false;
    }
    try {
        weakSetHas.call(x, weakSetHas);
        try {
            weakMapHas.call(x, weakMapHas);
        } catch (s) {
            return true;
        }
        return x instanceof WeakSet; // core-js workaround, pre-v2.5.0
    } catch (e) {}
    return false;
}

function isElement(x) {
    if (!x || typeof x !== 'object') { return false; }
    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
        return true;
    }
    return typeof x.nodeName === 'string' && typeof x.getAttribute === 'function';
}

function inspectString(str, opts) {
    if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = '... ' + remaining + ' more character' + (remaining > 1 ? 's' : '');
        return inspectString(str.slice(0, opts.maxStringLength), opts) + trailer;
    }
    // eslint-disable-next-line no-control-regex
    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
    return wrapQuotes(s, 'single', opts);
}

function lowbyte(c) {
    var n = c.charCodeAt(0);
    var x = {
        8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r'
    }[n];
    if (x) { return '\\' + x; }
    return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
}

function markBoxed(str) {
    return 'Object(' + str + ')';
}

function weakCollectionOf(type) {
    return type + ' { ? }';
}

function collectionOf(type, size, entries, indent) {
    var joinedEntries = indent ? indentedJoin(entries, indent) : entries.join(', ');
    return type + ' (' + size + ') {' + joinedEntries + '}';
}

function singleLineValues(xs) {
    for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], '\n') >= 0) {
            return false;
        }
    }
    return true;
}

function getIndent(opts, depth) {
    var baseIndent;
    if (opts.indent === '\t') {
        baseIndent = '\t';
    } else if (typeof opts.indent === 'number' && opts.indent > 0) {
        baseIndent = Array(opts.indent + 1).join(' ');
    } else {
        return null;
    }
    return {
        base: baseIndent,
        prev: Array(depth + 1).join(baseIndent)
    };
}

function indentedJoin(xs, indent) {
    if (xs.length === 0) { return ''; }
    var lineJoiner = '\n' + indent.prev + indent.base;
    return lineJoiner + xs.join(',' + lineJoiner) + '\n' + indent.prev;
}

function arrObjKeys(obj, inspect) {
    var isArr = isArray(obj);
    var xs = [];
    if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
        }
    }
    for (var key in obj) { // eslint-disable-line no-restricted-syntax
        if (!has(obj, key)) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if (isArr && String(Number(key)) === key && key < obj.length) { continue; } // eslint-disable-line no-restricted-syntax, no-continue
        if ((/[^\w$]/).test(key)) {
            xs.push(inspect(key, obj) + ': ' + inspect(obj[key], obj));
        } else {
            xs.push(key + ': ' + inspect(obj[key], obj));
        }
    }
    return xs;
}


/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("23c6");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var Iterators = __webpack_require__("84f2");
module.exports = __webpack_require__("8378").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "27fc":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "2877":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "28fe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STYLE_INJECTION_MIXIN; });
/* harmony import */ var _configs_styles__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d60e");

var STYLE_INJECTION_MIXIN = {
  computed: {
    styles: function styles() {
      return _configs_styles__WEBPACK_IMPORTED_MODULE_0__[/* STYLES */ "a"];
    }
  }
};


/***/ }),

/***/ "2a1a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("e9ac");

var callBind = __webpack_require__("44b7");

var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

module.exports = function callBoundIntrinsic(name, allowMissing) {
	var intrinsic = GetIntrinsic(name, !!allowMissing);
	if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.')) {
		return callBind(intrinsic);
	}
	return intrinsic;
};


/***/ }),

/***/ "2a8a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defineProperties = __webpack_require__("f367");

var implementation = __webpack_require__("16e7");
var getPolyfill = __webpack_require__("c8ba6");
var shim = __webpack_require__("f11f");

var polyfill = getPolyfill();

defineProperties(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2f21":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("79e5");

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () { /* empty */ }, 1) : method.call(null);
  });
};


/***/ }),

/***/ "2fb9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isString = __webpack_require__("55b2");
var isNumber = __webpack_require__("099a");
var isBoolean = __webpack_require__("353a");
var isSymbol = __webpack_require__("fec5");
var isBigInt = __webpack_require__("242e");

// eslint-disable-next-line consistent-return
module.exports = function whichBoxedPrimitive(value) {
	// eslint-disable-next-line eqeqeq
	if (value == null || (typeof value !== 'object' && typeof value !== 'function')) {
		return null;
	}
	if (isString(value)) {
		return 'String';
	}
	if (isNumber(value)) {
		return 'Number';
	}
	if (isBoolean(value)) {
		return 'Boolean';
	}
	if (isSymbol(value)) {
		return 'Symbol';
	}
	if (isBigInt(value)) {
		return 'BigInt';
	}
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "310e":
/***/ (function(module, exports, __webpack_require__) {

module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "01f9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var $iterCreate = __webpack_require__("41a0");
var setToStringTag = __webpack_require__("7f20");
var getPrototypeOf = __webpack_require__("38fd");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),

/***/ "02f4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var defined = __webpack_require__("be13");
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),

/***/ "0390":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var at = __webpack_require__("02f4")(true);

 // `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};


/***/ }),

/***/ "0bfb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags
var anObject = __webpack_require__("cb7c");
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "0d58":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__("ce10");
var enumBugKeys = __webpack_require__("e11e");

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),

/***/ "1495":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var anObject = __webpack_require__("cb7c");
var getKeys = __webpack_require__("0d58");

module.exports = __webpack_require__("9e1e") ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("b0c5");
var redefine = __webpack_require__("2aba");
var hide = __webpack_require__("32e9");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");
var regexpExec = __webpack_require__("520a");

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
})();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () { execCalled = true; return null; };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(
      defined,
      SYMBOL,
      ''[KEY],
      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
        if (regexp.exec === regexpExec) {
          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
            // The native String method already delegates to @@method (this
            // polyfilled function), leasing to infinite recursion.
            // We avoid it by directly calling the native @@method method.
            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
          }
          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
        }
        return { done: false };
      }
    );
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "2621":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var $toString = __webpack_require__("fa5b");
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2aeb":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__("cb7c");
var dPs = __webpack_require__("1495");
var enumBugKeys = __webpack_require__("e11e");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__("230e")('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__("fab2").appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "2fdb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)

var $export = __webpack_require__("5ca1");
var context = __webpack_require__("d2c8");
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__("5147")(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES)
      .indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a352":
/***/ (function(module, exports) {

module.exports = __webpack_require__("aa47");

/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c649":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return insertNodeAt; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return camelize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return console; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return removeNode; });
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a481");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_0__);


function getConsole() {
  if (typeof window !== "undefined") {
    return window.console;
  }

  return global.console;
}

var console = getConsole();

function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

var regex = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(regex, function (_, c) {
    return c ? c.toUpperCase() : "";
  });
});

function removeNode(node) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}

function insertNodeAt(fatherNode, node, position) {
  var refNode = position === 0 ? fatherNode.children[0] : fatherNode.children[position - 1].nextSibling;
  fatherNode.insertBefore(node, refNode);
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "f559":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])

var $export = __webpack_require__("5ca1");
var toLength = __webpack_require__("9def");
var context = __webpack_require__("d2c8");
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__("5147")(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith
      ? $startsWith.call(that, search, index)
      : that.slice(index, index + search.length) === search;
  }
});


/***/ }),

/***/ "f6fd":
/***/ (function(module, exports) {

// document.currentScript polyfill by Adam Miller

// MIT license

(function(document){
  var currentScript = "currentScript",
      scripts = document.getElementsByTagName('script'); // Live NodeList collection

  // If browser needs currentScript polyfill, add get currentScript() to the document object
  if (!(currentScript in document)) {
    Object.defineProperty(document, currentScript, {
      get: function(){

        // IE 6-10 supports script readyState
        // IE 10+ support stack trace
        try { throw new Error(); }
        catch (err) {

          // Find the second match for the "at" string to get file src url from stack.
          // Specifically works with the format of stack traces in IE.
          var i, res = ((/.*at [^\(]*\((.*):.+:.+\)$/ig).exec(err.stack) || [false])[1];

          // For all scripts on the page, if src matches or if ready state is interactive, return the script tag
          for(i in scripts){
            if(scripts[i].src == res || scripts[i].readyState == "interactive"){
              return scripts[i];
            }
          }

          // If no match, return null
          return null;
        }
      }
    });
  }
})(document);


/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (true) {
    __webpack_require__("f6fd")
  }

  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.starts-with.js
var es6_string_starts_with = __webpack_require__("f559");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithoutHoles.js

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArray.js
function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableSpread.js
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js




function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}
// EXTERNAL MODULE: external {"commonjs":"sortablejs","commonjs2":"sortablejs","amd":"sortablejs","root":"Sortable"}
var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_ = __webpack_require__("a352");
var external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_);

// EXTERNAL MODULE: ./src/util/helper.js
var helper = __webpack_require__("c649");

// CONCATENATED MODULE: ./src/vuedraggable.js












function buildAttribute(object, propName, value) {
  if (value === undefined) {
    return object;
  }

  object = object || {};
  object[propName] = value;
  return object;
}

function computeVmIndex(vnodes, element) {
  return vnodes.map(function (elt) {
    return elt.elm;
  }).indexOf(element);
}

function _computeIndexes(slots, children, isTransition, footerOffset) {
  if (!slots) {
    return [];
  }

  var elmFromNodes = slots.map(function (elt) {
    return elt.elm;
  });
  var footerIndex = children.length - footerOffset;

  var rawIndexes = _toConsumableArray(children).map(function (elt, idx) {
    return idx >= footerIndex ? elmFromNodes.length : elmFromNodes.indexOf(elt);
  });

  return isTransition ? rawIndexes.filter(function (ind) {
    return ind !== -1;
  }) : rawIndexes;
}

function emit(evtName, evtData) {
  var _this = this;

  this.$nextTick(function () {
    return _this.$emit(evtName.toLowerCase(), evtData);
  });
}

function delegateAndEmit(evtName) {
  var _this2 = this;

  return function (evtData) {
    if (_this2.realList !== null) {
      _this2["onDrag" + evtName](evtData);
    }

    emit.call(_this2, evtName, evtData);
  };
}

function isTransitionName(name) {
  return ["transition-group", "TransitionGroup"].includes(name);
}

function vuedraggable_isTransition(slots) {
  if (!slots || slots.length !== 1) {
    return false;
  }

  var _slots = _slicedToArray(slots, 1),
      componentOptions = _slots[0].componentOptions;

  if (!componentOptions) {
    return false;
  }

  return isTransitionName(componentOptions.tag);
}

function getSlot(slot, scopedSlot, key) {
  return slot[key] || (scopedSlot[key] ? scopedSlot[key]() : undefined);
}

function computeChildrenAndOffsets(children, slot, scopedSlot) {
  var headerOffset = 0;
  var footerOffset = 0;
  var header = getSlot(slot, scopedSlot, "header");

  if (header) {
    headerOffset = header.length;
    children = children ? [].concat(_toConsumableArray(header), _toConsumableArray(children)) : _toConsumableArray(header);
  }

  var footer = getSlot(slot, scopedSlot, "footer");

  if (footer) {
    footerOffset = footer.length;
    children = children ? [].concat(_toConsumableArray(children), _toConsumableArray(footer)) : _toConsumableArray(footer);
  }

  return {
    children: children,
    headerOffset: headerOffset,
    footerOffset: footerOffset
  };
}

function getComponentAttributes($attrs, componentData) {
  var attributes = null;

  var update = function update(name, value) {
    attributes = buildAttribute(attributes, name, value);
  };

  var attrs = Object.keys($attrs).filter(function (key) {
    return key === "id" || key.startsWith("data-");
  }).reduce(function (res, key) {
    res[key] = $attrs[key];
    return res;
  }, {});
  update("attrs", attrs);

  if (!componentData) {
    return attributes;
  }

  var on = componentData.on,
      props = componentData.props,
      componentDataAttrs = componentData.attrs;
  update("on", on);
  update("props", props);
  Object.assign(attributes.attrs, componentDataAttrs);
  return attributes;
}

var eventsListened = ["Start", "Add", "Remove", "Update", "End"];
var eventsToEmit = ["Choose", "Unchoose", "Sort", "Filter", "Clone"];
var readonlyProperties = ["Move"].concat(eventsListened, eventsToEmit).map(function (evt) {
  return "on" + evt;
});
var draggingElement = null;
var props = {
  options: Object,
  list: {
    type: Array,
    required: false,
    default: null
  },
  value: {
    type: Array,
    required: false,
    default: null
  },
  noTransitionOnDrag: {
    type: Boolean,
    default: false
  },
  clone: {
    type: Function,
    default: function _default(original) {
      return original;
    }
  },
  element: {
    type: String,
    default: "div"
  },
  tag: {
    type: String,
    default: null
  },
  move: {
    type: Function,
    default: null
  },
  componentData: {
    type: Object,
    required: false,
    default: null
  }
};
var draggableComponent = {
  name: "draggable",
  inheritAttrs: false,
  props: props,
  data: function data() {
    return {
      transitionMode: false,
      noneFunctionalComponentMode: false
    };
  },
  render: function render(h) {
    var slots = this.$slots.default;
    this.transitionMode = vuedraggable_isTransition(slots);

    var _computeChildrenAndOf = computeChildrenAndOffsets(slots, this.$slots, this.$scopedSlots),
        children = _computeChildrenAndOf.children,
        headerOffset = _computeChildrenAndOf.headerOffset,
        footerOffset = _computeChildrenAndOf.footerOffset;

    this.headerOffset = headerOffset;
    this.footerOffset = footerOffset;
    var attributes = getComponentAttributes(this.$attrs, this.componentData);
    return h(this.getTag(), attributes, children);
  },
  created: function created() {
    if (this.list !== null && this.value !== null) {
      helper["b" /* console */].error("Value and list props are mutually exclusive! Please set one or another.");
    }

    if (this.element !== "div") {
      helper["b" /* console */].warn("Element props is deprecated please use tag props instead. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#element-props");
    }

    if (this.options !== undefined) {
      helper["b" /* console */].warn("Options props is deprecated, add sortable options directly as vue.draggable item, or use v-bind. See https://github.com/SortableJS/Vue.Draggable/blob/master/documentation/migrate.md#options-props");
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.noneFunctionalComponentMode = this.getTag().toLowerCase() !== this.$el.nodeName.toLowerCase() && !this.getIsFunctional();

    if (this.noneFunctionalComponentMode && this.transitionMode) {
      throw new Error("Transition-group inside component is not supported. Please alter tag value or remove transition-group. Current tag value: ".concat(this.getTag()));
    }

    var optionsAdded = {};
    eventsListened.forEach(function (elt) {
      optionsAdded["on" + elt] = delegateAndEmit.call(_this3, elt);
    });
    eventsToEmit.forEach(function (elt) {
      optionsAdded["on" + elt] = emit.bind(_this3, elt);
    });
    var attributes = Object.keys(this.$attrs).reduce(function (res, key) {
      res[Object(helper["a" /* camelize */])(key)] = _this3.$attrs[key];
      return res;
    }, {});
    var options = Object.assign({}, this.options, attributes, optionsAdded, {
      onMove: function onMove(evt, originalEvent) {
        return _this3.onDragMove(evt, originalEvent);
      }
    });
    !("draggable" in options) && (options.draggable = ">*");
    this._sortable = new external_commonjs_sortablejs_commonjs2_sortablejs_amd_sortablejs_root_Sortable_default.a(this.rootContainer, options);
    this.computeIndexes();
  },
  beforeDestroy: function beforeDestroy() {
    if (this._sortable !== undefined) this._sortable.destroy();
  },
  computed: {
    rootContainer: function rootContainer() {
      return this.transitionMode ? this.$el.children[0] : this.$el;
    },
    realList: function realList() {
      return this.list ? this.list : this.value;
    }
  },
  watch: {
    options: {
      handler: function handler(newOptionValue) {
        this.updateOptions(newOptionValue);
      },
      deep: true
    },
    $attrs: {
      handler: function handler(newOptionValue) {
        this.updateOptions(newOptionValue);
      },
      deep: true
    },
    realList: function realList() {
      this.computeIndexes();
    }
  },
  methods: {
    getIsFunctional: function getIsFunctional() {
      var fnOptions = this._vnode.fnOptions;
      return fnOptions && fnOptions.functional;
    },
    getTag: function getTag() {
      return this.tag || this.element;
    },
    updateOptions: function updateOptions(newOptionValue) {
      for (var property in newOptionValue) {
        var value = Object(helper["a" /* camelize */])(property);

        if (readonlyProperties.indexOf(value) === -1) {
          this._sortable.option(value, newOptionValue[property]);
        }
      }
    },
    getChildrenNodes: function getChildrenNodes() {
      if (this.noneFunctionalComponentMode) {
        return this.$children[0].$slots.default;
      }

      var rawNodes = this.$slots.default;
      return this.transitionMode ? rawNodes[0].child.$slots.default : rawNodes;
    },
    computeIndexes: function computeIndexes() {
      var _this4 = this;

      this.$nextTick(function () {
        _this4.visibleIndexes = _computeIndexes(_this4.getChildrenNodes(), _this4.rootContainer.children, _this4.transitionMode, _this4.footerOffset);
      });
    },
    getUnderlyingVm: function getUnderlyingVm(htmlElt) {
      var index = computeVmIndex(this.getChildrenNodes() || [], htmlElt);

      if (index === -1) {
        //Edge case during move callback: related element might be
        //an element different from collection
        return null;
      }

      var element = this.realList[index];
      return {
        index: index,
        element: element
      };
    },
    getUnderlyingPotencialDraggableComponent: function getUnderlyingPotencialDraggableComponent(_ref) {
      var vue = _ref.__vue__;

      if (!vue || !vue.$options || !isTransitionName(vue.$options._componentTag)) {
        if (!("realList" in vue) && vue.$children.length === 1 && "realList" in vue.$children[0]) return vue.$children[0];
        return vue;
      }

      return vue.$parent;
    },
    emitChanges: function emitChanges(evt) {
      var _this5 = this;

      this.$nextTick(function () {
        _this5.$emit("change", evt);
      });
    },
    alterList: function alterList(onList) {
      if (this.list) {
        onList(this.list);
        return;
      }

      var newList = _toConsumableArray(this.value);

      onList(newList);
      this.$emit("input", newList);
    },
    spliceList: function spliceList() {
      var _arguments = arguments;

      var spliceList = function spliceList(list) {
        return list.splice.apply(list, _toConsumableArray(_arguments));
      };

      this.alterList(spliceList);
    },
    updatePosition: function updatePosition(oldIndex, newIndex) {
      var updatePosition = function updatePosition(list) {
        return list.splice(newIndex, 0, list.splice(oldIndex, 1)[0]);
      };

      this.alterList(updatePosition);
    },
    getRelatedContextFromMoveEvent: function getRelatedContextFromMoveEvent(_ref2) {
      var to = _ref2.to,
          related = _ref2.related;
      var component = this.getUnderlyingPotencialDraggableComponent(to);

      if (!component) {
        return {
          component: component
        };
      }

      var list = component.realList;
      var context = {
        list: list,
        component: component
      };

      if (to !== related && list && component.getUnderlyingVm) {
        var destination = component.getUnderlyingVm(related);

        if (destination) {
          return Object.assign(destination, context);
        }
      }

      return context;
    },
    getVmIndex: function getVmIndex(domIndex) {
      var indexes = this.visibleIndexes;
      var numberIndexes = indexes.length;
      return domIndex > numberIndexes - 1 ? numberIndexes : indexes[domIndex];
    },
    getComponent: function getComponent() {
      return this.$slots.default[0].componentInstance;
    },
    resetTransitionData: function resetTransitionData(index) {
      if (!this.noTransitionOnDrag || !this.transitionMode) {
        return;
      }

      var nodes = this.getChildrenNodes();
      nodes[index].data = null;
      var transitionContainer = this.getComponent();
      transitionContainer.children = [];
      transitionContainer.kept = undefined;
    },
    onDragStart: function onDragStart(evt) {
      this.context = this.getUnderlyingVm(evt.item);
      evt.item._underlying_vm_ = this.clone(this.context.element);
      draggingElement = evt.item;
    },
    onDragAdd: function onDragAdd(evt) {
      var element = evt.item._underlying_vm_;

      if (element === undefined) {
        return;
      }

      Object(helper["d" /* removeNode */])(evt.item);
      var newIndex = this.getVmIndex(evt.newIndex);
      this.spliceList(newIndex, 0, element);
      this.computeIndexes();
      var added = {
        element: element,
        newIndex: newIndex
      };
      this.emitChanges({
        added: added
      });
    },
    onDragRemove: function onDragRemove(evt) {
      Object(helper["c" /* insertNodeAt */])(this.rootContainer, evt.item, evt.oldIndex);

      if (evt.pullMode === "clone") {
        Object(helper["d" /* removeNode */])(evt.clone);
        return;
      }

      var oldIndex = this.context.index;
      this.spliceList(oldIndex, 1);
      var removed = {
        element: this.context.element,
        oldIndex: oldIndex
      };
      this.resetTransitionData(oldIndex);
      this.emitChanges({
        removed: removed
      });
    },
    onDragUpdate: function onDragUpdate(evt) {
      Object(helper["d" /* removeNode */])(evt.item);
      Object(helper["c" /* insertNodeAt */])(evt.from, evt.item, evt.oldIndex);
      var oldIndex = this.context.index;
      var newIndex = this.getVmIndex(evt.newIndex);
      this.updatePosition(oldIndex, newIndex);
      var moved = {
        element: this.context.element,
        oldIndex: oldIndex,
        newIndex: newIndex
      };
      this.emitChanges({
        moved: moved
      });
    },
    updateProperty: function updateProperty(evt, propertyName) {
      evt.hasOwnProperty(propertyName) && (evt[propertyName] += this.headerOffset);
    },
    computeFutureIndex: function computeFutureIndex(relatedContext, evt) {
      if (!relatedContext.element) {
        return 0;
      }

      var domChildren = _toConsumableArray(evt.to.children).filter(function (el) {
        return el.style["display"] !== "none";
      });

      var currentDOMIndex = domChildren.indexOf(evt.related);
      var currentIndex = relatedContext.component.getVmIndex(currentDOMIndex);
      var draggedInList = domChildren.indexOf(draggingElement) !== -1;
      return draggedInList || !evt.willInsertAfter ? currentIndex : currentIndex + 1;
    },
    onDragMove: function onDragMove(evt, originalEvent) {
      var onMove = this.move;

      if (!onMove || !this.realList) {
        return true;
      }

      var relatedContext = this.getRelatedContextFromMoveEvent(evt);
      var draggedContext = this.context;
      var futureIndex = this.computeFutureIndex(relatedContext, evt);
      Object.assign(draggedContext, {
        futureIndex: futureIndex
      });
      var sendEvt = Object.assign({}, evt, {
        relatedContext: relatedContext,
        draggedContext: draggedContext
      });
      return onMove(sendEvt, originalEvent);
    },
    onDragEnd: function onDragEnd() {
      this.computeIndexes();
      draggingElement = null;
    }
  }
};

if (typeof window !== "undefined" && "Vue" in window) {
  window.Vue.component("draggable", draggableComponent);
}

/* harmony default export */ var vuedraggable = (draggableComponent);
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (vuedraggable);



/***/ })

/******/ })["default"];
//# sourceMappingURL=vuedraggable.common.js.map

/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "33a4":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("84f2");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "34ef":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("ec30")('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});


/***/ }),

/***/ "353a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var boolToStr = Boolean.prototype.toString;

var tryBooleanObject = function booleanBrandCheck(value) {
	try {
		boolToStr.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var boolClass = '[object Boolean]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isBoolean(value) {
	if (typeof value === 'boolean') {
		return true;
	}
	if (value === null || typeof value !== 'object') {
		return false;
	}
	return hasToStringTag && Symbol.toStringTag in value ? tryBooleanObject(value) : toStr.call(value) === boolClass;
};


/***/ }),

/***/ "36bd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)

var toObject = __webpack_require__("4bf8");
var toAbsoluteIndex = __webpack_require__("77f1");
var toLength = __webpack_require__("9def");
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) O[index++] = value;
  return O;
};


/***/ }),

/***/ "37c8":
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__("2b4c");


/***/ }),

/***/ "3835":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ _slicedToArray; });

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js
function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

/***/ }),

/***/ "3846":
/***/ (function(module, exports, __webpack_require__) {

// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__("9e1e") && /./g.flags != 'g') __webpack_require__("86cc").f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__("0bfb")
});


/***/ }),

/***/ "38fd":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__("69a8");
var toObject = __webpack_require__("4bf8");
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),

/***/ "3a72":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var LIBRARY = __webpack_require__("2d00");
var wksExt = __webpack_require__("37c8");
var defineProperty = __webpack_require__("86cc").f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),

/***/ "41a0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__("2aeb");
var descriptor = __webpack_require__("4630");
var setToStringTag = __webpack_require__("7f20");
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__("32e9")(IteratorPrototype, __webpack_require__("2b4c")('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),

/***/ "4362":
/***/ (function(module, exports, __webpack_require__) {

exports.nextTick = function nextTick(fn) {
    var args = Array.prototype.slice.call(arguments);
    args.shift();
    setTimeout(function () {
        fn.apply(null, args);
    }, 0);
};

exports.platform = exports.arch = 
exports.execPath = exports.title = 'browser';
exports.pid = 1;
exports.browser = true;
exports.env = {};
exports.argv = [];

exports.binding = function (name) {
	throw new Error('No such module. (Possibly not yet loaded)')
};

(function () {
    var cwd = '/';
    var path;
    exports.cwd = function () { return cwd };
    exports.chdir = function (dir) {
        if (!path) path = __webpack_require__("df7c");
        cwd = path.resolve(dir, cwd);
    };
})();

exports.exit = exports.kill = 
exports.umask = exports.dlopen = 
exports.uptime = exports.memoryUsage = 
exports.uvCounters = function() {};
exports.features = {};


/***/ }),

/***/ "43b3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HELPER; });
/* harmony import */ var core_js_modules_es6_array_find_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("20d6");
/* harmony import */ var core_js_modules_es6_array_find_index__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find_index__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ac6a");
/* harmony import */ var core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_web_dom_iterable__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("cadf");
/* harmony import */ var core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_iterator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("456d");
/* harmony import */ var core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_object_keys__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("7514");
/* harmony import */ var core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_array_find__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var core_js_modules_es6_typed_uint8_array__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("34ef");
/* harmony import */ var core_js_modules_es6_typed_uint8_array__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_typed_uint8_array__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("6b54");
/* harmony import */ var core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_to_string__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__("a481");
/* harmony import */ var core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_regexp_replace__WEBPACK_IMPORTED_MODULE_7__);








var HELPER = {};
/**
 * Deep-Clone an Object
 * @param obj
 * @returns {any}
 */

HELPER.cloneDeep = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};
/**
 * Get UUIDv4
 * @returns {String}
 */


HELPER.getUUIDv4 = function () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
    return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
  });
};
/**
 * Find inside object/array by a specific rule
 * @param {Array|Object} collection
 * @param {string} ruleKey
 * @param {string} value
 * @returns {any|undefined} first item that matched the rule or undefined
 * @complexity O(n) for normal cases, best case will be O(1) or O(logn)
 */


HELPER.find = function (collection, ruleKey, value) {
  // Only array has `length` property
  if (collection.length) {
    // array
    return collection.find(function (item) {
      return item[ruleKey] == value;
    });
  } // object traversal


  var keys = Object.keys(collection);

  for (var _i = 0, _keys = keys; _i < _keys.length; _i++) {
    var objKey = _keys[_i];
    var data = collection[objKey];

    if (data && data[ruleKey] == value) {
      return data;
    }
  }

  return undefined;
};
/**
 * Find array by a specific rule and return the index
 * @param {Array} array
 * @param {string} ruleKey - If it's undefined, we check the item only
 * @param {string} value
 * @returns {number} first item that matched the rule or -1
 * @complexity O(n) for normal cases, best case will be O(1) or O(logn)
 */


HELPER.findIndex = function (array, ruleKey, value) {
  return array.findIndex(function (item) {
    if (!ruleKey) return item == value;
    return item[ruleKey] == value;
  });
};



/***/ }),

/***/ "44b7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__("0f7c");

var GetIntrinsic = __webpack_require__("e9ac");

var $apply = GetIntrinsic('%Function.prototype.apply%');
var $call = GetIntrinsic('%Function.prototype.call%');
var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

module.exports = function callBind() {
	return $reflectApply(bind, $call, arguments);
};

module.exports.apply = function applyBind() {
	return $reflectApply(bind, $apply, arguments);
};


/***/ }),

/***/ "456d":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__("4bf8");
var $keys = __webpack_require__("0d58");

__webpack_require__("5eda")('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "467f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4957":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "4ad6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/GlobalSidebar.vue?vue&type=template&id=c7307c46&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.isOpen)?_c('div',{staticClass:"sidebar container p-0"},[_c('div',{staticClass:"row sidebarHeader px-2 py-3"},[_c('div',{staticClass:"col-md-10 text-center"},[_c('span',{staticClass:"title"},[_vm._v(_vm._s(_vm.title))])]),_c('div',{staticClass:"col-md-2"},[_c('span',{staticClass:"closeIcon",domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('close_custom'))},on:{"click":_vm.close}})])]),_c('div',{staticClass:"row px-3"},[(_vm.component)?_c(_vm.component,{tag:"component",attrs:{"dataPackage":_vm.dynamicData,"formData":_vm.formData},on:{"save":_vm.save,"saveAndClose":_vm.saveAndClose,"close":_vm.close}}):_vm._e()],1)]):_vm._e()}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/GlobalSidebar.vue?vue&type=template&id=c7307c46&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./src/configs/events.js
var events = __webpack_require__("fbe6");

// EXTERNAL MODULE: ./src/libraries/alert-dialog.js
var alert_dialog = __webpack_require__("caca");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/GlobalSidebar.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var GlobalSidebarvue_type_script_lang_js_ = ({
  name: "GlobalSidebar",
  props: {
    formData: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      component: null,
      dynamicData: {},
      runnerId: null,
      isOpen: false,
      title: "Titulo"
    };
  },
  methods: {
    /**
     * Open the Right Sidebar
     */
    open: function open(runnerId) {
      if (this.isOpen) {
        /*  ALERT_DIALOG.show('Please close the current active sidebar before open another')
                    return */
        this.close();
      } // turn on flag and notify watcher that sidebar is opened
      // `runnerId` will be sent back in order to make sure other components will touch yours


      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.OPENED, runnerId);
      this.isOpen = true;
    },

    /**
     * Save - Emitting data to the listener but do not close the sidebar
     * @hook Emit Data to the Listener
     */
    save: function save() {
      var specialData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.SAVE, this.runnerId, Object.assign({}, specialData));
    },

    /**
     * Save event with close the right sidebar
     */
    saveAndClose: function saveAndClose() {
      var specialData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.SAVE_AND_CLOSE, this.runnerId, Object.assign({}, specialData));
      this.close();
    },

    /**
     * Close the right sidebar
     * @hook After Closed - Fire an Event to notify (maybe someone will listen :v )
     */
    close: function close() {
      this.$el.style.width = 0; // fire event after closed (if emit == true)

      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.AFTER_CLOSED, this.runnerId, null); // remove renderer

      this.component = null;
      this.dynamicData = {};
      this.runnerId = null;
      this.isOpen = false;
    },

    /**
     * This method will help us inject our Component into the Sidebar Body
     * @param {SidebarRenderer} rendererInfo - data that will be assigned for the Component
     */
    updateBody: function updateBody(rendererInfo) {
      if (this.isOpen) {
        return;
      }

      this.dynamicData = Object.assign({}, rendererInfo.data);
      this.component = rendererInfo.component;
      this.runnerId = rendererInfo.runnerId;
    }
  },
  created: function created() {
    var _this = this;

    // listen to render even
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.INJECT, this.updateBody); // listen to open

    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.OPEN, function (param) {
      _this.title = param.title || "Título";

      _this.open(param.runnerId);
    });
  }
});
// CONCATENATED MODULE: ./src/views/builder/GlobalSidebar.vue?vue&type=script&lang=js&
 /* harmony default export */ var builder_GlobalSidebarvue_type_script_lang_js_ = (GlobalSidebarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/builder/GlobalSidebar.vue?vue&type=style&index=0&id=c7307c46&scoped=true&lang=css&
var GlobalSidebarvue_type_style_index_0_id_c7307c46_scoped_true_lang_css_ = __webpack_require__("562a");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/builder/GlobalSidebar.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  builder_GlobalSidebarvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "c7307c46",
  null
  
)

/* harmony default export */ var GlobalSidebar = __webpack_exports__["a"] = (component.exports);

/***/ }),

/***/ "4bf8":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),

/***/ "504c":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var toIObject = __webpack_require__("6821");
var isEnum = __webpack_require__("52a7").f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      key = keys[i++];
      if (!DESCRIPTORS || isEnum.call(O, key)) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }
    return result;
  };
};


/***/ }),

/***/ "5147":
/***/ (function(module, exports, __webpack_require__) {

var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) { /* empty */ }
  } return true;
};


/***/ }),

/***/ "5156":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var origSymbol = global.Symbol;
var hasSymbolSham = __webpack_require__("1696");

module.exports = function hasNativeSymbols() {
	if (typeof origSymbol !== 'function') { return false; }
	if (typeof Symbol !== 'function') { return false; }
	if (typeof origSymbol('foo') !== 'symbol') { return false; }
	if (typeof Symbol('bar') !== 'symbol') { return false; }

	return hasSymbolSham();
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "520a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__("0bfb");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
})();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "52a7":
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ "5360":
/***/ (function(module, exports, __webpack_require__) {

/*!
 * 
 *     Litepicker v1.5.7 (https://github.com/wakirin/Litepicker)
 *     Package: litepicker (https://www.npmjs.com/package/litepicker)
 *     License: MIT (https://github.com/wakirin/Litepicker/blob/master/LICENCE.md)
 *     Copyright 2019-2020 Rinat G.
 *     
 *     Hash: 85b7ce11883a11b98abb
 *     Generated on: 1592979305748
 *     
 */
!function(t,e){ true?module.exports=e():undefined}(window,(function(){return function(t){var e={};function i(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}return i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(i.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(o,n,function(e){return t[e]}.bind(null,n));return o},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=4)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(e,i,o){void 0===e&&(e=null),void 0===i&&(i=null),void 0===o&&(o="en-US"),this.dateInstance=i?t.parseDateTime(e,i,o):e?t.parseDateTime(e):t.parseDateTime(new Date),this.lang=o}return t.parseDateTime=function(e,i,o){if(void 0===i&&(i="YYYY-MM-DD"),void 0===o&&(o="en-US"),!e)return new Date(NaN);if(e instanceof Date)return new Date(e);if(e instanceof t)return e.clone().getDateInstance();if(/^-?\d{10,}$/.test(e))return t.getDateZeroTime(new Date(Number(e)));if("string"==typeof e){for(var n=[],s=null;null!=(s=t.regex.exec(i));)"\\"!==s[1]&&n.push(s);if(n.length){var r={year:null,month:null,shortMonth:null,longMonth:null,day:null,value:""};n[0].index>0&&(r.value+=".*?");for(var a=0,l=Object.entries(n);a<l.length;a++){var p=l[a],c=p[0],h=p[1],d=Number(c),u=t.formatPatterns(h[0],o),m=u.group,f=u.pattern;r[m]=d+1,r.value+=f,r.value+=".*?"}var g=new RegExp("^"+r.value+"$");if(g.test(e)){var y=g.exec(e),k=Number(y[r.year]),v=null;r.month?v=Number(y[r.month])-1:r.shortMonth?v=t.shortMonths(o).indexOf(y[r.shortMonth]):r.longMonth&&(v=t.longMonths(o).indexOf(y[r.longMonth]));var D=Number(y[r.day])||1;return new Date(k,v,D,0,0,0,0)}}}return t.getDateZeroTime(new Date(e))},t.convertArray=function(e,i){return e.map((function(e){return e instanceof Array?e.map((function(e){return new t(e,i)})):new t(e,i)}))},t.getDateZeroTime=function(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate(),0,0,0,0)},t.shortMonths=function(e){return t.MONTH_JS.map((function(t){return new Date(2019,t).toLocaleString(e,{month:"short"})}))},t.longMonths=function(e){return t.MONTH_JS.map((function(t){return new Date(2019,t).toLocaleString(e,{month:"long"})}))},t.formatPatterns=function(e,i){switch(e){case"YY":case"YYYY":return{group:"year",pattern:"(\\d{"+e.length+"})"};case"M":return{group:"month",pattern:"(\\d{1,2})"};case"MM":return{group:"month",pattern:"(\\d{2})"};case"MMM":return{group:"shortMonth",pattern:"("+t.shortMonths(i).join("|")+")"};case"MMMM":return{group:"longMonth",pattern:"("+t.longMonths(i).join("|")+")"};case"D":return{group:"day",pattern:"(\\d{1,2})"};case"DD":return{group:"day",pattern:"(\\d{2})"}}},t.prototype.getDateInstance=function(){return this.dateInstance},t.prototype.toLocaleString=function(t,e){return this.dateInstance.toLocaleString(t,e)},t.prototype.toDateString=function(){return this.dateInstance.toDateString()},t.prototype.getSeconds=function(){return this.dateInstance.getSeconds()},t.prototype.getDay=function(){return this.dateInstance.getDay()},t.prototype.getTime=function(){return this.dateInstance.getTime()},t.prototype.getDate=function(){return this.dateInstance.getDate()},t.prototype.getMonth=function(){return this.dateInstance.getMonth()},t.prototype.getFullYear=function(){return this.dateInstance.getFullYear()},t.prototype.setMonth=function(t){return this.dateInstance.setMonth(t)},t.prototype.setHours=function(t,e,i,o){void 0===t&&(t=0),void 0===e&&(e=0),void 0===i&&(i=0),void 0===o&&(o=0),this.dateInstance.setHours(t,e,i,o)},t.prototype.setSeconds=function(t){return this.dateInstance.setSeconds(t)},t.prototype.setDate=function(t){return this.dateInstance.setDate(t)},t.prototype.setFullYear=function(t){return this.dateInstance.setFullYear(t)},t.prototype.getWeek=function(t){var e=new Date(this.timestamp()),i=(this.getDay()+(7-t))%7;e.setDate(e.getDate()-i);var o=e.getTime();return e.setMonth(0,1),e.getDay()!==t&&e.setMonth(0,1+(4-e.getDay()+7)%7),1+Math.ceil((o-e.getTime())/6048e5)},t.prototype.clone=function(){return new t(this.getDateInstance())},t.prototype.isBetween=function(t,e,i){switch(void 0===i&&(i="()"),i){default:case"()":return this.timestamp()>t.getTime()&&this.timestamp()<e.getTime();case"[)":return this.timestamp()>=t.getTime()&&this.timestamp()<e.getTime();case"(]":return this.timestamp()>t.getTime()&&this.timestamp()<=e.getTime();case"[]":return this.timestamp()>=t.getTime()&&this.timestamp()<=e.getTime()}},t.prototype.isBefore=function(t,e){switch(void 0===e&&(e="seconds"),e){case"second":case"seconds":return t.getTime()>this.getTime();case"day":case"days":return new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()>new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime();case"month":case"months":return new Date(t.getFullYear(),t.getMonth(),1).getTime()>new Date(this.getFullYear(),this.getMonth(),1).getTime();case"year":case"years":return t.getFullYear()>this.getFullYear()}throw new Error("isBefore: Invalid unit!")},t.prototype.isSameOrBefore=function(t,e){switch(void 0===e&&(e="seconds"),e){case"second":case"seconds":return t.getTime()>=this.getTime();case"day":case"days":return new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime()>=new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime();case"month":case"months":return new Date(t.getFullYear(),t.getMonth(),1).getTime()>=new Date(this.getFullYear(),this.getMonth(),1).getTime()}throw new Error("isSameOrBefore: Invalid unit!")},t.prototype.isAfter=function(t,e){switch(void 0===e&&(e="seconds"),e){case"second":case"seconds":return this.getTime()>t.getTime();case"day":case"days":return new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime()>new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();case"month":case"months":return new Date(this.getFullYear(),this.getMonth(),1).getTime()>new Date(t.getFullYear(),t.getMonth(),1).getTime();case"year":case"years":return this.getFullYear()>t.getFullYear()}throw new Error("isAfter: Invalid unit!")},t.prototype.isSameOrAfter=function(t,e){switch(void 0===e&&(e="seconds"),e){case"second":case"seconds":return this.getTime()>=t.getTime();case"day":case"days":return new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime()>=new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();case"month":case"months":return new Date(this.getFullYear(),this.getMonth(),1).getTime()>=new Date(t.getFullYear(),t.getMonth(),1).getTime()}throw new Error("isSameOrAfter: Invalid unit!")},t.prototype.isSame=function(t,e){switch(void 0===e&&(e="seconds"),e){case"second":case"seconds":return this.getTime()===t.getTime();case"day":case"days":return new Date(this.getFullYear(),this.getMonth(),this.getDate()).getTime()===new Date(t.getFullYear(),t.getMonth(),t.getDate()).getTime();case"month":case"months":return new Date(this.getFullYear(),this.getMonth(),1).getTime()===new Date(t.getFullYear(),t.getMonth(),1).getTime()}throw new Error("isSame: Invalid unit!")},t.prototype.add=function(t,e){switch(void 0===e&&(e="seconds"),e){case"second":case"seconds":this.setSeconds(this.getSeconds()+t);break;case"day":case"days":this.setDate(this.getDate()+t);break;case"month":case"months":this.setMonth(this.getMonth()+t)}return this},t.prototype.subtract=function(t,e){switch(void 0===e&&(e="seconds"),e){case"second":case"seconds":this.setSeconds(this.getSeconds()-t);break;case"day":case"days":this.setDate(this.getDate()-t);break;case"month":case"months":this.setMonth(this.getMonth()-t)}return this},t.prototype.diff=function(t,e){void 0===e&&(e="seconds");switch(e){default:case"second":case"seconds":return this.getTime()-t.getTime();case"day":case"days":return Math.round((this.timestamp()-t.getTime())/864e5);case"month":case"months":}},t.prototype.format=function(e,i){void 0===i&&(i="en-US");for(var o="",n=[],s=null;null!=(s=t.regex.exec(e));)"\\"!==s[1]&&n.push(s);if(n.length){n[0].index>0&&(o+=e.substring(0,n[0].index));for(var r=0,a=Object.entries(n);r<a.length;r++){var l=a[r],p=l[0],c=l[1],h=Number(p);o+=this.formatTokens(c[0],i),n[h+1]&&(o+=e.substring(c.index+c[0].length,n[h+1].index)),h===n.length-1&&(o+=e.substring(c.index+c[0].length))}}return o.replace(/\\/g,"")},t.prototype.timestamp=function(){return new Date(this.getFullYear(),this.getMonth(),this.getDate(),0,0,0,0).getTime()},t.prototype.formatTokens=function(e,i){switch(e){case"YY":return String(this.getFullYear()).slice(-2);case"YYYY":return String(this.getFullYear());case"M":return String(this.getMonth()+1);case"MM":return("0"+(this.getMonth()+1)).slice(-2);case"MMM":return t.shortMonths(i)[this.getMonth()];case"MMMM":return t.longMonths(i)[this.getMonth()];case"D":return String(this.getDate());case"DD":return("0"+this.getDate()).slice(-2);default:return""}},t.regex=/(\\)?(Y{2,4}|M{1,4}|D{1,2}|d{1,4})/g,t.MONTH_JS=[0,1,2,3,4,5,6,7,8,9,10,11],t}();e.DateTime=o},function(t,e,i){var o=i(6);"string"==typeof o&&(o=[[t.i,o,""]]);var n={insert:function(t){var e=document.querySelector("head"),i=window._lastElementInsertedByStyleLoader;window.disableLitepickerStyles||(i?i.nextSibling?e.insertBefore(t,i.nextSibling):e.appendChild(t):e.insertBefore(t,e.firstChild),window._lastElementInsertedByStyleLoader=t)},singleton:!1};i(8)(o,n);o.locals&&(t.exports=o.locals)},function(t,e,i){"use strict";function o(){return window.matchMedia("(orientation: portrait)").matches?"portrait":"landscape"}Object.defineProperty(e,"__esModule",{value:!0}),e.isMobile=function(){var t="portrait"===o();return window.matchMedia("(max-device-"+(t?"width":"height")+": 480px)").matches},e.getOrientation=o,e.findNestedMonthItem=function(t){for(var e=t.parentNode.childNodes,i=0;i<e.length;i+=1){if(e.item(i)===t)return i}return 0}},function(t,e,i){"use strict";var o,n=this&&this.__extends||(o=function(t,e){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}o(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),s=this&&this.__assign||function(){return(s=Object.assign||function(t){for(var e,i=1,o=arguments.length;i<o;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)},r=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var a=i(5),l=i(0),p=r(i(1)),c=i(2),h=function(t){function e(e){var i=t.call(this)||this;i.options=s(s({},i.options),e.element.dataset),Object.keys(i.options).forEach((function(t){"true"!==i.options[t]&&"false"!==i.options[t]||(i.options[t]="true"===i.options[t])}));var o=s(s({},i.options.dropdowns),e.dropdowns),n=s(s({},i.options.buttonText),e.buttonText),r=s(s({},i.options.tooltipText),e.tooltipText);i.options=s(s({},i.options),e),i.options.dropdowns=s({},o),i.options.buttonText=s({},n),i.options.tooltipText=s({},r),i.options.elementEnd||(i.options.allowRepick=!1),i.options.lockDays.length&&(i.options.lockDays=l.DateTime.convertArray(i.options.lockDays,i.options.lockDaysFormat)),i.options.bookedDays.length&&(i.options.bookedDays=l.DateTime.convertArray(i.options.bookedDays,i.options.bookedDaysFormat)),i.options.highlightedDays.length&&(i.options.highlightedDays=l.DateTime.convertArray(i.options.highlightedDays,i.options.highlightedDaysFormat)),!i.options.hotelMode||"bookedDaysInclusivity"in e||(i.options.bookedDaysInclusivity="[)"),!i.options.hotelMode||"disallowBookedDaysInRange"in e||(i.options.disallowBookedDaysInRange=!0),!i.options.hotelMode||"selectForward"in e||(i.options.selectForward=!0);var a=i.parseInput(),p=a[0],c=a[1];i.options.startDate&&(i.options.singleMode||i.options.endDate)&&(p=new l.DateTime(i.options.startDate,i.options.format,i.options.lang)),p&&i.options.endDate&&(c=new l.DateTime(i.options.endDate,i.options.format,i.options.lang)),p instanceof l.DateTime&&!isNaN(p.getTime())&&(i.options.startDate=p),i.options.startDate&&c instanceof l.DateTime&&!isNaN(c.getTime())&&(i.options.endDate=c),!i.options.singleMode||i.options.startDate instanceof l.DateTime||(i.options.startDate=null),i.options.singleMode||i.options.startDate instanceof l.DateTime&&i.options.endDate instanceof l.DateTime||(i.options.startDate=null,i.options.endDate=null);for(var h=0;h<i.options.numberOfMonths;h+=1){var d=i.options.startDate instanceof l.DateTime?i.options.startDate.clone():new l.DateTime;d.setDate(1),d.setMonth(d.getMonth()+h),i.calendars[h]=d}if(i.options.showTooltip)if(i.options.tooltipPluralSelector)i.pluralSelector=i.options.tooltipPluralSelector;else try{var u=new Intl.PluralRules(i.options.lang);i.pluralSelector=u.select.bind(u)}catch(t){i.pluralSelector=function(t){return 0===Math.abs(t)?"one":"other"}}return i.loadPolyfillsForIE11(),i.onInit(),i}return n(e,t),e.prototype.onInit=function(){var t=this;if(document.addEventListener("click",(function(e){return t.onClick(e)}),!0),this.picker=document.createElement("div"),this.picker.className=p.litepicker,this.picker.style.display="none",this.picker.addEventListener("mouseenter",(function(e){return t.onMouseEnter(e)}),!0),this.picker.addEventListener("mouseleave",(function(e){return t.onMouseLeave(e)}),!1),this.options.autoRefresh?(this.options.element instanceof HTMLElement&&this.options.element.addEventListener("keyup",(function(e){return t.onInput(e)}),!0),this.options.elementEnd instanceof HTMLElement&&this.options.elementEnd.addEventListener("keyup",(function(e){return t.onInput(e)}),!0)):(this.options.element instanceof HTMLElement&&this.options.element.addEventListener("change",(function(e){return t.onInput(e)}),!0),this.options.elementEnd instanceof HTMLElement&&this.options.elementEnd.addEventListener("change",(function(e){return t.onInput(e)}),!0)),this.options.moduleNavKeyboard){if("function"!=typeof this.enableModuleNavKeyboard)throw new Error("moduleNavKeyboard is on but library does not included. See https://github.com/wakirin/litepicker-module-navkeyboard.");this.enableModuleNavKeyboard.call(this,this)}this.render(),this.options.parentEl?this.options.parentEl instanceof HTMLElement?this.options.parentEl.appendChild(this.picker):document.querySelector(this.options.parentEl).appendChild(this.picker):this.options.inlineMode?this.options.element instanceof HTMLInputElement?this.options.element.parentNode.appendChild(this.picker):this.options.element.appendChild(this.picker):document.body.appendChild(this.picker),this.options.mobileFriendly&&(this.backdrop=document.createElement("div"),this.backdrop.className=p.litepickerBackdrop,this.backdrop.addEventListener("click",this.hide()),this.options.element&&this.options.element.parentNode&&this.options.element.parentNode.appendChild(this.backdrop),window.addEventListener("orientationchange",(function(e){var i=function(){if(c.isMobile()&&t.isShowning()){switch(c.getOrientation()){case"landscape":t.options.numberOfMonths=2,t.options.numberOfColumns=2;break;default:t.options.numberOfMonths=1,t.options.numberOfColumns=1}if(t.render(),!t.options.inlineMode){var e=t.picker.getBoundingClientRect();t.picker.style.top="calc(50% - "+e.height/2+"px)",t.picker.style.left="calc(50% - "+e.width/2+"px)"}}window.removeEventListener("resize",i)};window.addEventListener("resize",i)}))),this.options.inlineMode&&(this.show(),this.options.mobileFriendly&&c.isMobile()&&(window.dispatchEvent(new Event("orientationchange")),window.dispatchEvent(new Event("resize")))),this.updateInput()},e.prototype.parseInput=function(){var t=this.options.delimiter,e=new RegExp(""+t),i=this.options.element instanceof HTMLInputElement?this.options.element.value.split(t):[];if(this.options.elementEnd){if(this.options.element instanceof HTMLInputElement&&this.options.element.value.length&&this.options.elementEnd instanceof HTMLInputElement&&this.options.elementEnd.value.length)return[new l.DateTime(this.options.element.value,this.options.format),new l.DateTime(this.options.elementEnd.value,this.options.format)]}else if(this.options.singleMode){if(this.options.element instanceof HTMLInputElement&&this.options.element.value.length)return[new l.DateTime(this.options.element.value,this.options.format)]}else if(this.options.element instanceof HTMLInputElement&&e.test(this.options.element.value)&&i.length&&i.length%2==0){var o=i.slice(0,i.length/2).join(t),n=i.slice(i.length/2).join(t);return[new l.DateTime(o,this.options.format),new l.DateTime(n,this.options.format)]}return[]},e.prototype.updateInput=function(){if(this.options.element instanceof HTMLInputElement){if(this.options.singleMode&&this.options.startDate)this.options.element.value=this.options.startDate.format(this.options.format,this.options.lang);else if(!this.options.singleMode&&this.options.startDate&&this.options.endDate){var t=this.options.startDate.format(this.options.format,this.options.lang),e=this.options.endDate.format(this.options.format,this.options.lang);this.options.elementEnd?(this.options.element.value=t,this.options.elementEnd.value=e):this.options.element.value=""+t+this.options.delimiter+e}this.options.startDate||this.options.endDate||(this.options.element.value="",this.options.elementEnd&&(this.options.elementEnd.value=""))}},e.prototype.isSamePicker=function(t){return t.closest("."+p.litepicker)===this.picker},e.prototype.shouldShown=function(t){return t===this.options.element||this.options.elementEnd&&t===this.options.elementEnd},e.prototype.shouldResetDatePicked=function(){return this.options.singleMode||2===this.datePicked.length},e.prototype.shouldSwapDatePicked=function(){return 2===this.datePicked.length&&this.datePicked[0].getTime()>this.datePicked[1].getTime()},e.prototype.shouldCheckLockDays=function(){return this.options.disallowLockDaysInRange&&this.options.lockDays.length&&2===this.datePicked.length},e.prototype.shouldCheckBookedDays=function(){return this.options.disallowBookedDaysInRange&&this.options.bookedDays.length&&2===this.datePicked.length},e.prototype.onClick=function(t){var e=this,i=t.target;if(i&&this.picker)if(this.shouldShown(i))this.show(i);else if(i.closest("."+p.litepicker)){if(i.classList.contains(p.dayItem)){if(t.preventDefault(),!this.isSamePicker(i))return;if(i.classList.contains(p.isLocked))return;if(i.classList.contains(p.isBooked))return;if(this.shouldResetDatePicked()&&(this.datePicked.length=0),this.datePicked[this.datePicked.length]=new l.DateTime(i.dataset.time),this.shouldSwapDatePicked()){var o=this.datePicked[1].clone();this.datePicked[1]=this.datePicked[0].clone(),this.datePicked[0]=o.clone()}if(this.shouldCheckLockDays()){var n=this.options.lockDaysInclusivity;this.options.lockDays.filter((function(t){return t instanceof Array?t[0].isBetween(e.datePicked[0],e.datePicked[1],n)||t[1].isBetween(e.datePicked[0],e.datePicked[1],n):t.isBetween(e.datePicked[0],e.datePicked[1],n)})).length&&(this.datePicked.length=0,"function"==typeof this.options.onError&&this.options.onError.call(this,"INVALID_RANGE"))}if(this.shouldCheckBookedDays()){var s=this.options.bookedDaysInclusivity;this.options.hotelMode&&2===this.datePicked.length&&(s="()");var r=this.options.bookedDays.filter((function(t){return t instanceof Array?t[0].isBetween(e.datePicked[0],e.datePicked[1],s)||t[1].isBetween(e.datePicked[0],e.datePicked[1],s):t.isBetween(e.datePicked[0],e.datePicked[1])})).length,a=this.options.anyBookedDaysAsCheckout&&1===this.datePicked.length;r&&!a&&(this.datePicked.length=0,"function"==typeof this.options.onError&&this.options.onError.call(this,"INVALID_RANGE"))}return this.render(),void(this.options.autoApply&&(this.options.singleMode&&this.datePicked.length?(this.setDate(this.datePicked[0]),this.hide()):this.options.singleMode||2!==this.datePicked.length||(this.setDateRange(this.datePicked[0],this.datePicked[1]),this.hide())))}if(i.classList.contains(p.buttonPreviousMonth)){if(t.preventDefault(),!this.isSamePicker(i))return;var h=0,d=this.options.moveByOneMonth?1:this.options.numberOfMonths;if(this.options.splitView){var u=i.closest("."+p.monthItem);h=c.findNestedMonthItem(u),d=1}return this.calendars[h].setMonth(this.calendars[h].getMonth()-d),this.gotoDate(this.calendars[h],h),void("function"==typeof this.options.onChangeMonth&&this.options.onChangeMonth.call(this,this.calendars[h],h))}if(i.classList.contains(p.buttonNextMonth)){if(t.preventDefault(),!this.isSamePicker(i))return;h=0,d=this.options.moveByOneMonth?1:this.options.numberOfMonths;if(this.options.splitView){u=i.closest("."+p.monthItem);h=c.findNestedMonthItem(u),d=1}return this.calendars[h].setMonth(this.calendars[h].getMonth()+d),this.gotoDate(this.calendars[h],h),void("function"==typeof this.options.onChangeMonth&&this.options.onChangeMonth.call(this,this.calendars[h],h))}if(i.classList.contains(p.buttonCancel)){if(t.preventDefault(),!this.isSamePicker(i))return;this.hide()}if(i.classList.contains(p.buttonApply)){if(t.preventDefault(),!this.isSamePicker(i))return;this.options.singleMode&&this.datePicked.length?this.setDate(this.datePicked[0]):this.options.singleMode||2!==this.datePicked.length||this.setDateRange(this.datePicked[0],this.datePicked[1]),this.hide()}}else this.hide()},e.prototype.showTooltip=function(t,e){var i=this.picker.querySelector("."+p.containerTooltip);i.style.visibility="visible",i.innerHTML=e;var o=this.picker.getBoundingClientRect(),n=i.getBoundingClientRect(),s=t.getBoundingClientRect(),r=s.top,a=s.left;if(this.options.inlineMode&&this.options.parentEl){var l=this.picker.parentNode.getBoundingClientRect();r-=l.top,a-=l.left}else r-=o.top,a-=o.left;r-=n.height,a-=n.width/2,a+=s.width/2,i.style.top=r+"px",i.style.left=a+"px","function"==typeof this.options.onShowTooltip&&this.options.onShowTooltip.call(this,i,t)},e.prototype.hideTooltip=function(){this.picker.querySelector("."+p.containerTooltip).style.visibility="hidden"},e.prototype.shouldAllowMouseEnter=function(t){return!this.options.singleMode&&!t.classList.contains(p.isLocked)&&!t.classList.contains(p.isBooked)},e.prototype.shouldAllowRepick=function(){return this.options.elementEnd&&this.options.allowRepick&&this.options.startDate&&this.options.endDate},e.prototype.isDayItem=function(t){return t.classList.contains(p.dayItem)},e.prototype.onMouseEnter=function(t){var e=this,i=t.target;if(this.isDayItem(i)&&("function"==typeof this.options.onDayHover&&this.options.onDayHover.call(this,l.DateTime.parseDateTime(i.dataset.time),i.classList.toString().split(/\s/),i),this.shouldAllowMouseEnter(i))){if(this.shouldAllowRepick()&&(this.triggerElement===this.options.element?this.datePicked[0]=this.options.endDate.clone():this.triggerElement===this.options.elementEnd&&(this.datePicked[0]=this.options.startDate.clone())),1!==this.datePicked.length)return;var o=this.picker.querySelector("."+p.dayItem+'[data-time="'+this.datePicked[0].getTime()+'"]'),n=this.datePicked[0].clone(),s=new l.DateTime(i.dataset.time),r=!1;if(n.getTime()>s.getTime()){var a=n.clone();n=s.clone(),s=a.clone(),r=!0}if(Array.prototype.slice.call(this.picker.querySelectorAll("."+p.dayItem)).forEach((function(t){var i=new l.DateTime(t.dataset.time),o=e.renderDay(i);i.isBetween(n,s)&&o.classList.add(p.isInRange),t.className=o.className})),i.classList.add(p.isEndDate),r?(o&&o.classList.add(p.isFlipped),i.classList.add(p.isFlipped)):(o&&o.classList.remove(p.isFlipped),i.classList.remove(p.isFlipped)),this.options.showTooltip){var c=s.diff(n,"day");if(this.options.hotelMode||(c+=1),c>0){var h=this.pluralSelector(c),d=c+" "+(this.options.tooltipText[h]?this.options.tooltipText[h]:"["+h+"]");this.showTooltip(i,d)}else this.hideTooltip()}}},e.prototype.onMouseLeave=function(t){t.target;this.options.allowRepick&&(!this.options.allowRepick||this.options.startDate||this.options.endDate)&&(this.datePicked.length=0,this.render())},e.prototype.onInput=function(t){var e=this.parseInput(),i=e[0],o=e[1],n=this.options.format;if(this.options.elementEnd?i instanceof l.DateTime&&o instanceof l.DateTime&&i.format(n)===this.options.element.value&&o.format(n)===this.options.elementEnd.value:this.options.singleMode?i instanceof l.DateTime&&i.format(n)===this.options.element.value:i instanceof l.DateTime&&o instanceof l.DateTime&&""+i.format(n)+this.options.delimiter+o.format(n)===this.options.element.value){if(o&&i.getTime()>o.getTime()){var s=i.clone();i=o.clone(),o=s.clone()}this.options.startDate=new l.DateTime(i,this.options.format,this.options.lang),o&&(this.options.endDate=new l.DateTime(o,this.options.format,this.options.lang)),this.updateInput(),this.render();var r=i.clone(),a=0;(this.options.elementEnd?i.format(n)===t.target.value:t.target.value.startsWith(i.format(n)))||(r=o.clone(),a=this.options.numberOfMonths-1),"function"==typeof this.options.onSelect&&this.options.onSelect.call(this,this.getStartDate(),this.getEndDate()),this.gotoDate(r,a)}},e.prototype.isShowning=function(){return this.picker&&"none"!==this.picker.style.display},e.prototype.loadPolyfillsForIE11=function(){Object.entries||(Object.entries=function(t){for(var e=Object.keys(t),i=e.length,o=new Array(i);i;)o[i-=1]=[e[i],t[e[i]]];return o}),Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector),Element.prototype.closest||(Element.prototype.closest=function(t){var e=this;do{if(e.matches(t))return e;e=e.parentElement||e.parentNode}while(null!==e&&1===e.nodeType);return null})},e}(a.Calendar);e.Litepicker=h},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=i(3);e.Litepicker=o.Litepicker,i(9),i(10),window.Litepicker=o.Litepicker,e.default=o.Litepicker},function(t,e,i){"use strict";var o=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var n=i(0),s=o(i(1)),r=i(2),a=function(){function t(){this.options={element:null,elementEnd:null,parentEl:null,firstDay:1,format:"YYYY-MM-DD",lang:"en-US",delimiter:" - ",numberOfMonths:1,numberOfColumns:1,startDate:null,endDate:null,zIndex:9999,minDate:null,maxDate:null,minDays:null,maxDays:null,selectForward:!1,selectBackward:!1,splitView:!1,inlineMode:!1,singleMode:!0,autoApply:!0,allowRepick:!1,showWeekNumbers:!1,showTooltip:!0,hotelMode:!1,disableWeekends:!1,scrollToDate:!0,mobileFriendly:!0,useResetBtn:!1,autoRefresh:!1,moveByOneMonth:!1,lockDaysFormat:"YYYY-MM-DD",lockDays:[],disallowLockDaysInRange:!1,lockDaysInclusivity:"[]",bookedDaysFormat:"YYYY-MM-DD",bookedDays:[],disallowBookedDaysInRange:!1,bookedDaysInclusivity:"[]",anyBookedDaysAsCheckout:!1,highlightedDaysFormat:"YYYY-MM-DD",highlightedDays:[],dropdowns:{minYear:1990,maxYear:null,months:!1,years:!1},buttonText:{apply:"Apply",cancel:"Cancel",previousMonth:'<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M7.919 0l2.748 2.667L5.333 8l5.334 5.333L7.919 16 0 8z" fill-rule="nonzero"/></svg>',nextMonth:'<svg width="11" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.748 16L0 13.333 5.333 8 0 2.667 2.748 0l7.919 8z" fill-rule="nonzero"/></svg>',reset:'<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">\n        <path d="M0 0h24v24H0z" fill="none"/>\n        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>\n      </svg>'},tooltipText:{one:"day",other:"days"},tooltipPluralSelector:null,onShow:null,onHide:null,onSelect:null,onError:null,onRender:null,onRenderDay:null,onChangeMonth:null,onChangeYear:null,onDayHover:null,onShowTooltip:null,resetBtnCallback:null,moduleRanges:null,moduleNavKeyboard:null},this.calendars=[],this.datePicked=[]}return t.prototype.render=function(){var t=this,e=document.createElement("div");e.className=s.containerMain;var i=document.createElement("div");i.className=s.containerMonths,s["columns"+this.options.numberOfColumns]&&(i.classList.remove(s.columns2,s.columns3,s.columns4),i.classList.add(s["columns"+this.options.numberOfColumns])),this.options.splitView&&i.classList.add(s.splitView),this.options.showWeekNumbers&&i.classList.add(s.showWeekNumbers);for(var o=this.calendars[0].clone(),n=o.getMonth(),r=o.getMonth()+this.options.numberOfMonths,a=0,l=n;l<r;l+=1){var p=o.clone();p.setDate(1),this.options.splitView?p=this.calendars[a].clone():p.setMonth(l),i.appendChild(this.renderMonth(p)),a+=1}if(this.picker.innerHTML="",e.appendChild(i),this.options.useResetBtn){var c=document.createElement("a");c.href="#",c.className=s.resetButton,c.innerHTML=this.options.buttonText.reset,c.addEventListener("click",(function(e){e.preventDefault(),t.clearSelection(),"function"==typeof t.options.resetBtnCallback&&t.options.resetBtnCallback.call(t)})),e.querySelector("."+s.monthItem+":last-child").querySelector("."+s.monthItemHeader).appendChild(c)}if(this.picker.appendChild(e),this.options.autoApply&&!this.options.footerHTML||this.picker.appendChild(this.renderFooter()),this.options.showTooltip&&this.picker.appendChild(this.renderTooltip()),this.options.moduleRanges){if("function"!=typeof this.enableModuleRanges)throw new Error("moduleRanges is on but library does not included. See https://github.com/wakirin/litepicker-module-ranges.");this.enableModuleRanges.call(this,this)}"function"==typeof this.options.onRender&&this.options.onRender.call(this,this.picker)},t.prototype.renderMonth=function(t){var e=this,i=t.clone(),o=32-new Date(i.getFullYear(),i.getMonth(),32).getDate(),a=document.createElement("div");a.className=s.monthItem;var l=document.createElement("div");l.className=s.monthItemHeader;var p=document.createElement("div");if(this.options.dropdowns.months){var c=document.createElement("select");c.className=s.monthItemName;for(var h=0;h<12;h+=1){var d=document.createElement("option"),u=new n.DateTime(new Date(t.getFullYear(),h,1,0,0,0));d.value=String(h),d.text=u.toLocaleString(this.options.lang,{month:"long"}),d.disabled=this.options.minDate&&u.isBefore(new n.DateTime(this.options.minDate),"month")||this.options.maxDate&&u.isAfter(new n.DateTime(this.options.maxDate),"month"),d.selected=u.getMonth()===t.getMonth(),c.appendChild(d)}c.addEventListener("change",(function(t){var i=t.target,o=0;if(e.options.splitView){var n=i.closest("."+s.monthItem);o=r.findNestedMonthItem(n)}e.calendars[o].setMonth(Number(i.value)),e.render(),"function"==typeof e.options.onChangeMonth&&e.options.onChangeMonth.call(e,e.calendars[o],o)})),p.appendChild(c)}else{var m=document.createElement("strong");m.className=s.monthItemName,m.innerHTML=t.toLocaleString(this.options.lang,{month:"long"}),p.appendChild(m)}if(this.options.dropdowns.years){var f=document.createElement("select");f.className=s.monthItemYear;var g=this.options.dropdowns.minYear,y=this.options.dropdowns.maxYear?this.options.dropdowns.maxYear:(new Date).getFullYear();if(t.getFullYear()>y)(d=document.createElement("option")).value=String(t.getFullYear()),d.text=String(t.getFullYear()),d.selected=!0,d.disabled=!0,f.appendChild(d);for(h=y;h>=g;h-=1){var d=document.createElement("option"),k=new n.DateTime(new Date(h,0,1,0,0,0));d.value=h,d.text=h,d.disabled=this.options.minDate&&k.isBefore(new n.DateTime(this.options.minDate),"year")||this.options.maxDate&&k.isAfter(new n.DateTime(this.options.maxDate),"year"),d.selected=t.getFullYear()===h,f.appendChild(d)}if(t.getFullYear()<g)(d=document.createElement("option")).value=String(t.getFullYear()),d.text=String(t.getFullYear()),d.selected=!0,d.disabled=!0,f.appendChild(d);if("asc"===this.options.dropdowns.years){var v=Array.prototype.slice.call(f.childNodes).reverse();f.innerHTML="",v.forEach((function(t){t.innerHTML=t.value,f.appendChild(t)}))}f.addEventListener("change",(function(t){var i=t.target,o=0;if(e.options.splitView){var n=i.closest("."+s.monthItem);o=r.findNestedMonthItem(n)}e.calendars[o].setFullYear(Number(i.value)),e.render(),"function"==typeof e.options.onChangeYear&&e.options.onChangeYear.call(e,e.calendars[o],o)})),p.appendChild(f)}else{var D=document.createElement("span");D.className=s.monthItemYear,D.innerHTML=String(t.getFullYear()),p.appendChild(D)}var b=document.createElement("a");b.href="#",b.className=s.buttonPreviousMonth,b.innerHTML=this.options.buttonText.previousMonth;var w=document.createElement("a");w.href="#",w.className=s.buttonNextMonth,w.innerHTML=this.options.buttonText.nextMonth,l.appendChild(b),l.appendChild(p),l.appendChild(w),this.options.minDate&&i.isSameOrBefore(new n.DateTime(this.options.minDate),"month")&&a.classList.add(s.noPreviousMonth),this.options.maxDate&&i.isSameOrAfter(new n.DateTime(this.options.maxDate),"month")&&a.classList.add(s.noNextMonth);var M=document.createElement("div");M.className=s.monthItemWeekdaysRow,this.options.showWeekNumbers&&(M.innerHTML="<div>W</div>");for(var x=1;x<=7;x+=1){var T=3+this.options.firstDay+x,_=document.createElement("div");_.innerHTML=this.weekdayName(T),_.title=this.weekdayName(T,"long"),M.appendChild(_)}var L=document.createElement("div");L.className=s.containerDays;var S=this.calcSkipDays(i);this.options.showWeekNumbers&&S&&L.appendChild(this.renderWeekNumber(i));for(var E=0;E<S;E+=1){var I=document.createElement("div");L.appendChild(I)}for(E=1;E<=o;E+=1)i.setDate(E),this.options.showWeekNumbers&&i.getDay()===this.options.firstDay&&L.appendChild(this.renderWeekNumber(i)),L.appendChild(this.renderDay(i));return a.appendChild(l),a.appendChild(M),a.appendChild(L),a},t.prototype.renderDay=function(t){var e=this;t.setHours();var i=document.createElement("a");if(i.href="#",i.className=s.dayItem,i.innerHTML=String(t.getDate()),i.dataset.time=String(t.getTime()),t.toDateString()===(new Date).toDateString()&&i.classList.add(s.isToday),this.datePicked.length?(this.datePicked[0].toDateString()===t.toDateString()&&(i.classList.add(s.isStartDate),this.options.singleMode&&i.classList.add(s.isEndDate)),2===this.datePicked.length&&this.datePicked[1].toDateString()===t.toDateString()&&i.classList.add(s.isEndDate),2===this.datePicked.length&&t.isBetween(this.datePicked[0],this.datePicked[1])&&i.classList.add(s.isInRange)):this.options.startDate&&(this.options.startDate.toDateString()===t.toDateString()&&(i.classList.add(s.isStartDate),this.options.singleMode&&i.classList.add(s.isEndDate)),this.options.endDate&&this.options.endDate.toDateString()===t.toDateString()&&i.classList.add(s.isEndDate),this.options.startDate&&this.options.endDate&&t.isBetween(this.options.startDate,this.options.endDate)&&i.classList.add(s.isInRange)),this.options.minDate&&t.isBefore(new n.DateTime(this.options.minDate))&&i.classList.add(s.isLocked),this.options.maxDate&&t.isAfter(new n.DateTime(this.options.maxDate))&&i.classList.add(s.isLocked),this.options.minDays&&1===this.datePicked.length){var o=Number(!this.options.hotelMode),r=this.datePicked[0].clone().subtract(this.options.minDays-o,"day"),a=this.datePicked[0].clone().add(this.options.minDays-o,"day");t.isBetween(r,this.datePicked[0],"(]")&&i.classList.add(s.isLocked),t.isBetween(this.datePicked[0],a,"[)")&&i.classList.add(s.isLocked)}if(this.options.maxDays&&1===this.datePicked.length){o=Number(this.options.hotelMode),r=this.datePicked[0].clone().subtract(this.options.maxDays+o,"day"),a=this.datePicked[0].clone().add(this.options.maxDays+o,"day");t.isSameOrBefore(r)&&i.classList.add(s.isLocked),t.isSameOrAfter(a)&&i.classList.add(s.isLocked)}(this.options.selectForward&&1===this.datePicked.length&&t.isBefore(this.datePicked[0])&&i.classList.add(s.isLocked),this.options.selectBackward&&1===this.datePicked.length&&t.isAfter(this.datePicked[0])&&i.classList.add(s.isLocked),this.options.lockDays.length)&&(this.options.lockDays.filter((function(i){return i instanceof Array?t.isBetween(i[0],i[1],e.options.lockDaysInclusivity):i.isSame(t,"day")})).length&&i.classList.add(s.isLocked));this.options.highlightedDays.length&&(this.options.highlightedDays.filter((function(e){return e instanceof Array?t.isBetween(e[0],e[1],"[]"):e.isSame(t,"day")})).length&&i.classList.add(s.isHighlighted));if(this.datePicked.length<=1&&this.options.bookedDays.length){var l=this.options.bookedDaysInclusivity;this.options.hotelMode&&1===this.datePicked.length&&(l="()");var p=t.clone();p.subtract(1,"day"),t.clone().add(1,"day");var c=this.dateIsBooked(t,l),h=this.dateIsBooked(p,"[]"),d=this.dateIsBooked(t,"(]"),u=0===this.datePicked.length&&c||1===this.datePicked.length&&h&&c||1===this.datePicked.length&&h&&d,m=this.options.anyBookedDaysAsCheckout&&1===this.datePicked.length;u&&!m&&i.classList.add(s.isBooked)}return!this.options.disableWeekends||6!==t.getDay()&&0!==t.getDay()||i.classList.add(s.isLocked),"function"==typeof this.options.onRenderDay&&this.options.onRenderDay.call(this,i),i},t.prototype.renderFooter=function(){var t=document.createElement("div");if(t.className=s.containerFooter,this.options.footerHTML?t.innerHTML=this.options.footerHTML:t.innerHTML='\n      <span class="'+s.previewDateRange+'"></span>\n      <button type="button" class="'+s.buttonCancel+'">'+this.options.buttonText.cancel+'</button>\n      <button type="button" class="'+s.buttonApply+'">'+this.options.buttonText.apply+"</button>\n      ",this.options.singleMode){if(1===this.datePicked.length){var e=this.datePicked[0].format(this.options.format,this.options.lang);t.querySelector("."+s.previewDateRange).innerHTML=e}}else if(1===this.datePicked.length&&t.querySelector("."+s.buttonApply).setAttribute("disabled",""),2===this.datePicked.length){e=this.datePicked[0].format(this.options.format,this.options.lang);var i=this.datePicked[1].format(this.options.format,this.options.lang);t.querySelector("."+s.previewDateRange).innerHTML=""+e+this.options.delimiter+i}return t},t.prototype.renderWeekNumber=function(t){var e=document.createElement("div"),i=t.getWeek(this.options.firstDay);return e.className=s.weekNumber,e.innerHTML=53===i&&0===t.getMonth()?"53 / 1":i,e},t.prototype.renderTooltip=function(){var t=document.createElement("div");return t.className=s.containerTooltip,t},t.prototype.dateIsBooked=function(t,e){return this.options.bookedDays.filter((function(i){return i instanceof Array?t.isBetween(i[0],i[1],e):i.isSame(t,"day")})).length},t.prototype.weekdayName=function(t,e){return void 0===e&&(e="short"),new Date(1970,0,t,12,0,0,0).toLocaleString(this.options.lang,{weekday:e})},t.prototype.calcSkipDays=function(t){var e=t.getDay()-this.options.firstDay;return e<0&&(e+=7),e},t}();e.Calendar=a},function(t,e,i){(e=t.exports=i(7)(!1)).push([t.i,':root{--litepickerBgColor: #fff;--litepickerMonthHeaderTextColor: #333;--litepickerMonthButton: #9e9e9e;--litepickerMonthButtonHover: #2196f3;--litepickerMonthWidth: calc(var(--litepickerDayWidth) * 7);--litepickerMonthWeekdayColor: #9e9e9e;--litepickerDayColor: #333;--litepickerDayColorHover: #2196f3;--litepickerDayIsTodayColor: #f44336;--litepickerDayIsInRange: #bbdefb;--litepickerDayIsLockedColor: #9e9e9e;--litepickerDayIsBookedColor: #9e9e9e;--litepickerDayIsStartColor: #fff;--litepickerDayIsStartBg: #2196f3;--litepickerDayIsEndColor: #fff;--litepickerDayIsEndBg: #2196f3;--litepickerDayWidth: 38px;--litepickerButtonCancelColor: #fff;--litepickerButtonCancelBg: #9e9e9e;--litepickerButtonApplyColor: #fff;--litepickerButtonApplyBg: #2196f3;--litepickerButtonResetBtn: #909090;--litepickerButtonResetBtnHover: #2196f3;--litepickerHighlightedDayColor: #333;--litepickerHighlightedDayBg: #ffeb3b}.show-week-numbers{--litepickerMonthWidth: calc(var(--litepickerDayWidth) * 8)}.litepicker{font-family:-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;font-size:0.8em;display:none}.litepicker .container__main{display:-webkit-box;display:-ms-flexbox;display:flex}.litepicker .container__months{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;background-color:var(--litepickerBgColor);border-radius:5px;-webkit-box-shadow:0 0 5px #ddd;box-shadow:0 0 5px #ddd;width:calc(var(--litepickerMonthWidth) + 10px);-webkit-box-sizing:content-box;box-sizing:content-box}.litepicker .container__months.columns-2{width:calc((var(--litepickerMonthWidth) * 2) + 20px)}.litepicker .container__months.columns-3{width:calc((var(--litepickerMonthWidth) * 3) + 30px)}.litepicker .container__months.columns-4{width:calc((var(--litepickerMonthWidth) * 4) + 40px)}.litepicker .container__months.split-view .month-item-header .button-previous-month,.litepicker .container__months.split-view .month-item-header .button-next-month{visibility:visible}.litepicker .container__months .month-item{padding:5px;width:var(--litepickerMonthWidth);-webkit-box-sizing:content-box;box-sizing:content-box}.litepicker .container__months .month-item-header{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-weight:500;padding:10px 5px;text-align:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;color:var(--litepickerMonthHeaderTextColor)}.litepicker .container__months .month-item-header div{-webkit-box-flex:1;-ms-flex:1;flex:1}.litepicker .container__months .month-item-header div>.month-item-name{margin-right:5px}.litepicker .container__months .month-item-header div>.month-item-year{padding:0}.litepicker .container__months .month-item-header .reset-button{color:var(--litepickerButtonResetBtn)}.litepicker .container__months .month-item-header .reset-button>svg,.litepicker .container__months .month-item-header .reset-button>img{fill:var(--litepickerButtonResetBtn);pointer-events:none}.litepicker .container__months .month-item-header .reset-button:hover{color:var(--litepickerButtonResetBtnHover)}.litepicker .container__months .month-item-header .reset-button:hover>svg{fill:var(--litepickerButtonResetBtnHover)}.litepicker .container__months .month-item-header .button-previous-month,.litepicker .container__months .month-item-header .button-next-month{visibility:hidden;text-decoration:none;color:var(--litepickerMonthButton);padding:3px 5px;border-radius:3px;-webkit-transition:color 0.3s, border 0.3s;transition:color 0.3s, border 0.3s;cursor:default}.litepicker .container__months .month-item-header .button-previous-month>svg,.litepicker .container__months .month-item-header .button-previous-month>img,.litepicker .container__months .month-item-header .button-next-month>svg,.litepicker .container__months .month-item-header .button-next-month>img{fill:var(--litepickerMonthButton);pointer-events:none}.litepicker .container__months .month-item-header .button-previous-month:hover,.litepicker .container__months .month-item-header .button-next-month:hover{color:var(--litepickerMonthButtonHover)}.litepicker .container__months .month-item-header .button-previous-month:hover>svg,.litepicker .container__months .month-item-header .button-next-month:hover>svg{fill:var(--litepickerMonthButtonHover)}.litepicker .container__months .month-item-weekdays-row{display:-webkit-box;display:-ms-flexbox;display:flex;justify-self:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;color:var(--litepickerMonthWeekdayColor)}.litepicker .container__months .month-item-weekdays-row>div{padding:5px 0;font-size:85%;-webkit-box-flex:1;-ms-flex:1;flex:1;width:var(--litepickerDayWidth);text-align:center}.litepicker .container__months .month-item:first-child .button-previous-month{visibility:visible}.litepicker .container__months .month-item:last-child .button-next-month{visibility:visible}.litepicker .container__months .month-item.no-previous-month .button-previous-month{visibility:hidden}.litepicker .container__months .month-item.no-next-month .button-next-month{visibility:hidden}.litepicker .container__days{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;justify-self:center;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;text-align:center;-webkit-box-sizing:content-box;box-sizing:content-box}.litepicker .container__days>div,.litepicker .container__days>a{padding:5px 0;width:var(--litepickerDayWidth)}.litepicker .container__days .day-item{color:var(--litepickerDayColor);text-align:center;text-decoration:none;border-radius:3px;-webkit-transition:color 0.3s, border 0.3s;transition:color 0.3s, border 0.3s;cursor:default}.litepicker .container__days .day-item:hover{color:var(--litepickerDayColorHover);-webkit-box-shadow:inset 0 0 0 1px var(--litepickerDayColorHover);box-shadow:inset 0 0 0 1px var(--litepickerDayColorHover)}.litepicker .container__days .day-item.is-today{color:var(--litepickerDayIsTodayColor)}.litepicker .container__days .day-item.is-locked{color:var(--litepickerDayIsLockedColor)}.litepicker .container__days .day-item.is-locked:hover{color:var(--litepickerDayIsLockedColor);-webkit-box-shadow:none;box-shadow:none;cursor:default}.litepicker .container__days .day-item.is-booked{color:var(--litepickerDayIsBookedColor)}.litepicker .container__days .day-item.is-booked:hover{color:var(--litepickerDayIsBookedColor);-webkit-box-shadow:none;box-shadow:none;cursor:default}.litepicker .container__days .day-item.is-in-range{background-color:var(--litepickerDayIsInRange);border-radius:0}.litepicker .container__days .day-item.is-start-date{color:var(--litepickerDayIsStartColor);background-color:var(--litepickerDayIsStartBg);border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:0;border-bottom-right-radius:0}.litepicker .container__days .day-item.is-start-date.is-flipped{border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:5px;border-bottom-right-radius:5px}.litepicker .container__days .day-item.is-end-date{color:var(--litepickerDayIsEndColor);background-color:var(--litepickerDayIsEndBg);border-top-left-radius:0;border-bottom-left-radius:0;border-top-right-radius:5px;border-bottom-right-radius:5px}.litepicker .container__days .day-item.is-end-date.is-flipped{border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:0;border-bottom-right-radius:0}.litepicker .container__days .day-item.is-start-date.is-end-date{border-top-left-radius:5px;border-bottom-left-radius:5px;border-top-right-radius:5px;border-bottom-right-radius:5px}.litepicker .container__days .day-item.is-highlighted{color:var(--litepickerHighlightedDayColor);background-color:var(--litepickerHighlightedDayBg)}.litepicker .container__days .week-number{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;color:#9e9e9e;font-size:85%}.litepicker .container__footer{text-align:right;padding:10px 5px;margin:0 5px;background-color:#fafafa;-webkit-box-shadow:inset 0px 3px 3px 0px #ddd;box-shadow:inset 0px 3px 3px 0px #ddd;border-bottom-left-radius:5px;border-bottom-right-radius:5px}.litepicker .container__footer .preview-date-range{margin-right:10px;font-size:90%}.litepicker .container__footer .button-cancel{background-color:var(--litepickerButtonCancelBg);color:var(--litepickerButtonCancelColor);border:0;padding:3px 7px 4px;border-radius:3px}.litepicker .container__footer .button-cancel>svg,.litepicker .container__footer .button-cancel>img{pointer-events:none}.litepicker .container__footer .button-apply{background-color:var(--litepickerButtonApplyBg);color:var(--litepickerButtonApplyColor);border:0;padding:3px 7px 4px;border-radius:3px;margin-left:10px;margin-right:10px}.litepicker .container__footer .button-apply:disabled{opacity:0.7}.litepicker .container__footer .button-apply>svg,.litepicker .container__footer .button-apply>img{pointer-events:none}.litepicker .container__tooltip{position:absolute;margin-top:-4px;padding:4px 8px;border-radius:4px;background-color:#fff;-webkit-box-shadow:0 1px 3px rgba(0,0,0,0.25);box-shadow:0 1px 3px rgba(0,0,0,0.25);white-space:nowrap;font-size:11px;pointer-events:none;visibility:hidden}.litepicker .container__tooltip:before{position:absolute;bottom:-5px;left:calc(50% - 5px);border-top:5px solid rgba(0,0,0,0.12);border-right:5px solid transparent;border-left:5px solid transparent;content:""}.litepicker .container__tooltip:after{position:absolute;bottom:-4px;left:calc(50% - 4px);border-top:4px solid #fff;border-right:4px solid transparent;border-left:4px solid transparent;content:""}.litepicker-open{overflow:hidden}.litepicker-backdrop{display:none;background-color:#000;opacity:0.3;position:fixed;top:0;right:0;bottom:0;left:0}\n',""]),e.locals={showWeekNumbers:"show-week-numbers",litepicker:"litepicker",containerMain:"container__main",containerMonths:"container__months",columns2:"columns-2",columns3:"columns-3",columns4:"columns-4",splitView:"split-view",monthItemHeader:"month-item-header",buttonPreviousMonth:"button-previous-month",buttonNextMonth:"button-next-month",monthItem:"month-item",monthItemName:"month-item-name",monthItemYear:"month-item-year",resetButton:"reset-button",monthItemWeekdaysRow:"month-item-weekdays-row",noPreviousMonth:"no-previous-month",noNextMonth:"no-next-month",containerDays:"container__days",dayItem:"day-item",isToday:"is-today",isLocked:"is-locked",isBooked:"is-booked",isInRange:"is-in-range",isStartDate:"is-start-date",isFlipped:"is-flipped",isEndDate:"is-end-date",isHighlighted:"is-highlighted",weekNumber:"week-number",containerFooter:"container__footer",previewDateRange:"preview-date-range",buttonCancel:"button-cancel",buttonApply:"button-apply",containerTooltip:"container__tooltip",litepickerOpen:"litepicker-open",litepickerBackdrop:"litepicker-backdrop"}},function(t,e,i){"use strict";t.exports=function(t){var e=[];return e.toString=function(){return this.map((function(e){var i=function(t,e){var i=t[1]||"",o=t[3];if(!o)return i;if(e&&"function"==typeof btoa){var n=(r=o,a=btoa(unescape(encodeURIComponent(JSON.stringify(r)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a),"/*# ".concat(l," */")),s=o.sources.map((function(t){return"/*# sourceURL=".concat(o.sourceRoot).concat(t," */")}));return[i].concat(s).concat([n]).join("\n")}var r,a,l;return[i].join("\n")}(e,t);return e[2]?"@media ".concat(e[2],"{").concat(i,"}"):i})).join("")},e.i=function(t,i){"string"==typeof t&&(t=[[null,t,""]]);for(var o={},n=0;n<this.length;n++){var s=this[n][0];null!=s&&(o[s]=!0)}for(var r=0;r<t.length;r++){var a=t[r];null!=a[0]&&o[a[0]]||(i&&!a[2]?a[2]=i:i&&(a[2]="(".concat(a[2],") and (").concat(i,")")),e.push(a))}},e}},function(t,e,i){"use strict";var o,n={},s=function(){return void 0===o&&(o=Boolean(window&&document&&document.all&&!window.atob)),o},r=function(){var t={};return function(e){if(void 0===t[e]){var i=document.querySelector(e);if(window.HTMLIFrameElement&&i instanceof window.HTMLIFrameElement)try{i=i.contentDocument.head}catch(t){i=null}t[e]=i}return t[e]}}();function a(t,e){for(var i=[],o={},n=0;n<t.length;n++){var s=t[n],r=e.base?s[0]+e.base:s[0],a={css:s[1],media:s[2],sourceMap:s[3]};o[r]?o[r].parts.push(a):i.push(o[r]={id:r,parts:[a]})}return i}function l(t,e){for(var i=0;i<t.length;i++){var o=t[i],s=n[o.id],r=0;if(s){for(s.refs++;r<s.parts.length;r++)s.parts[r](o.parts[r]);for(;r<o.parts.length;r++)s.parts.push(g(o.parts[r],e))}else{for(var a=[];r<o.parts.length;r++)a.push(g(o.parts[r],e));n[o.id]={id:o.id,refs:1,parts:a}}}}function p(t){var e=document.createElement("style");if(void 0===t.attributes.nonce){var o=i.nc;o&&(t.attributes.nonce=o)}if(Object.keys(t.attributes).forEach((function(i){e.setAttribute(i,t.attributes[i])})),"function"==typeof t.insert)t.insert(e);else{var n=r(t.insert||"head");if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");n.appendChild(e)}return e}var c,h=(c=[],function(t,e){return c[t]=e,c.filter(Boolean).join("\n")});function d(t,e,i,o){var n=i?"":o.css;if(t.styleSheet)t.styleSheet.cssText=h(e,n);else{var s=document.createTextNode(n),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(s,r[e]):t.appendChild(s)}}function u(t,e,i){var o=i.css,n=i.media,s=i.sourceMap;if(n&&t.setAttribute("media",n),s&&btoa&&(o+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(s))))," */")),t.styleSheet)t.styleSheet.cssText=o;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(o))}}var m=null,f=0;function g(t,e){var i,o,n;if(e.singleton){var s=f++;i=m||(m=p(e)),o=d.bind(null,i,s,!1),n=d.bind(null,i,s,!0)}else i=p(e),o=u.bind(null,i,e),n=function(){!function(t){if(null===t.parentNode)return!1;t.parentNode.removeChild(t)}(i)};return o(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;o(t=e)}else n()}}t.exports=function(t,e){(e=e||{}).attributes="object"==typeof e.attributes?e.attributes:{},e.singleton||"boolean"==typeof e.singleton||(e.singleton=s());var i=a(t,e);return l(i,e),function(t){for(var o=[],s=0;s<i.length;s++){var r=i[s],p=n[r.id];p&&(p.refs--,o.push(p))}t&&l(a(t,e),e);for(var c=0;c<o.length;c++){var h=o[c];if(0===h.refs){for(var d=0;d<h.parts.length;d++)h.parts[d]();delete n[h.id]}}}}},function(t,e,i){"use strict";var o=this&&this.__assign||function(){return(o=Object.assign||function(t){for(var e,i=1,o=arguments.length;i<o;i++)for(var n in e=arguments[i])Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t}).apply(this,arguments)},n=this&&this.__importStar||function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var i in t)Object.hasOwnProperty.call(t,i)&&(e[i]=t[i]);return e.default=t,e};Object.defineProperty(e,"__esModule",{value:!0});var s=i(0),r=i(3),a=n(i(1)),l=i(2);r.Litepicker.prototype.show=function(t){void 0===t&&(t=null);var e=t||this.options.element;if(this.triggerElement=e,this.options.inlineMode)return this.picker.style.position="static",this.picker.style.display="inline-block",this.picker.style.top=null,this.picker.style.left=null,this.picker.style.bottom=null,void(this.picker.style.right=null);if(this.options.scrollToDate)if(!this.options.startDate||t&&t!==this.options.element){if(t&&this.options.endDate&&t===this.options.elementEnd){var i=this.options.endDate.clone();i.setDate(1),this.options.numberOfMonths>1&&i.setMonth(i.getMonth()-(this.options.numberOfMonths-1)),this.calendars[0]=i.clone()}}else{var o=this.options.startDate.clone();o.setDate(1),this.calendars[0]=o.clone()}if(this.options.mobileFriendly&&l.isMobile()){this.picker.style.position="fixed",this.picker.style.display="block","portrait"===l.getOrientation()?(this.options.numberOfMonths=1,this.options.numberOfColumns=1):(this.options.numberOfMonths=2,this.options.numberOfColumns=2),this.render();var n=this.picker.getBoundingClientRect();return this.picker.style.top="calc(50% - "+n.height/2+"px)",this.picker.style.left="calc(50% - "+n.width/2+"px)",this.picker.style.right=null,this.picker.style.bottom=null,this.picker.style.zIndex=this.options.zIndex,this.backdrop.style.display="block",this.backdrop.style.zIndex=this.options.zIndex-1,document.body.classList.add(a.litepickerOpen),"function"==typeof this.options.onShow&&this.options.onShow.call(this),void(t?t.blur():this.options.element.blur())}this.render(),this.picker.style.position="absolute",this.picker.style.display="block",this.picker.style.zIndex=this.options.zIndex;var s=e.getBoundingClientRect(),r=this.picker.getBoundingClientRect(),p=s.bottom,c=s.left,h=0,d=0,u=0,m=0;if(this.options.parentEl){var f=this.picker.parentNode.getBoundingClientRect();p-=f.bottom,(p+=s.height)+r.height>window.innerHeight&&s.top-f.top-s.height>0&&(u=s.top-f.top-s.height),(c-=f.left)+r.width>window.innerWidth&&s.right-f.right-r.width>0&&(m=s.right-f.right-r.width)}else h=window.scrollX||window.pageXOffset,d=window.scrollY||window.pageYOffset,p+r.height>window.innerHeight&&s.top-r.height>0&&(u=s.top-r.height),c+r.width>window.innerWidth&&s.right-r.width>0&&(m=s.right-r.width);this.picker.style.top=(u||p)+d+"px",this.picker.style.left=(m||c)+h+"px",this.picker.style.right=null,this.picker.style.bottom=null,"function"==typeof this.options.onShow&&this.options.onShow.call(this)},r.Litepicker.prototype.hide=function(){this.isShowning()&&(this.datePicked.length=0,this.updateInput(),this.options.inlineMode?this.render():(this.picker.style.display="none","function"==typeof this.options.onHide&&this.options.onHide.call(this),this.options.mobileFriendly&&(document.body.classList.remove(a.litepickerOpen),this.backdrop.style.display="none")))},r.Litepicker.prototype.getDate=function(){return this.getStartDate()},r.Litepicker.prototype.getStartDate=function(){return this.options.startDate?this.options.startDate.clone().getDateInstance():null},r.Litepicker.prototype.getEndDate=function(){return this.options.endDate?this.options.endDate.clone().getDateInstance():null},r.Litepicker.prototype.setDate=function(t){this.setStartDate(t),"function"==typeof this.options.onSelect&&this.options.onSelect.call(this,this.getDate())},r.Litepicker.prototype.setStartDate=function(t){t&&(this.options.startDate=new s.DateTime(t,this.options.format,this.options.lang),this.updateInput())},r.Litepicker.prototype.setEndDate=function(t){t&&(this.options.endDate=new s.DateTime(t,this.options.format,this.options.lang),this.options.startDate.getTime()>this.options.endDate.getTime()&&(this.options.endDate=this.options.startDate.clone(),this.options.startDate=new s.DateTime(t,this.options.format,this.options.lang)),this.updateInput())},r.Litepicker.prototype.setDateRange=function(t,e){this.triggerElement=void 0,this.setStartDate(t),this.setEndDate(e),this.updateInput(),"function"==typeof this.options.onSelect&&this.options.onSelect.call(this,this.getStartDate(),this.getEndDate())},r.Litepicker.prototype.gotoDate=function(t,e){void 0===e&&(e=0);var i=new s.DateTime(t);i.setDate(1),this.calendars[e]=i.clone(),this.render()},r.Litepicker.prototype.setLockDays=function(t){this.options.lockDays=s.DateTime.convertArray(t,this.options.lockDaysFormat),this.render()},r.Litepicker.prototype.setBookedDays=function(t){this.options.bookedDays=s.DateTime.convertArray(t,this.options.bookedDaysFormat),this.render()},r.Litepicker.prototype.setHighlightedDays=function(t){this.options.highlightedDays=s.DateTime.convertArray(t,this.options.highlightedDaysFormat),this.render()},r.Litepicker.prototype.setOptions=function(t){delete t.element,delete t.elementEnd,delete t.parentEl,t.startDate&&(t.startDate=new s.DateTime(t.startDate,this.options.format,this.options.lang)),t.endDate&&(t.endDate=new s.DateTime(t.endDate,this.options.format,this.options.lang));var e=o(o({},this.options.dropdowns),t.dropdowns),i=o(o({},this.options.buttonText),t.buttonText),n=o(o({},this.options.tooltipText),t.tooltipText);this.options=o(o({},this.options),t),this.options.dropdowns=o({},e),this.options.buttonText=o({},i),this.options.tooltipText=o({},n),!this.options.singleMode||this.options.startDate instanceof s.DateTime||(this.options.startDate=null,this.options.endDate=null),this.options.singleMode||this.options.startDate instanceof s.DateTime&&this.options.endDate instanceof s.DateTime||(this.options.startDate=null,this.options.endDate=null);for(var r=0;r<this.options.numberOfMonths;r+=1){var a=this.options.startDate?this.options.startDate.clone():new s.DateTime;a.setDate(1),a.setMonth(a.getMonth()+r),this.calendars[r]=a}this.options.lockDays.length&&(this.options.lockDays=s.DateTime.convertArray(this.options.lockDays,this.options.lockDaysFormat)),this.options.bookedDays.length&&(this.options.bookedDays=s.DateTime.convertArray(this.options.bookedDays,this.options.bookedDaysFormat)),this.options.highlightedDays.length&&(this.options.highlightedDays=s.DateTime.convertArray(this.options.highlightedDays,this.options.highlightedDaysFormat)),this.render(),this.options.inlineMode&&this.show(),this.updateInput()},r.Litepicker.prototype.clearSelection=function(){this.options.startDate=null,this.options.endDate=null,this.datePicked.length=0,this.updateInput(),this.isShowning()&&this.render()},r.Litepicker.prototype.destroy=function(){this.picker&&this.picker.parentNode&&(this.picker.parentNode.removeChild(this.picker),this.picker=null),this.backdrop&&this.backdrop.parentNode&&this.backdrop.parentNode.removeChild(this.backdrop)}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0})}]).Litepicker}));

/***/ }),

/***/ "53ca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _typeof; });
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

/***/ }),

/***/ "5402":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var GetIntrinsic = __webpack_require__("e9ac");
var callBound = __webpack_require__("2a1a");
var inspect = __webpack_require__("2714");

var $TypeError = GetIntrinsic('%TypeError%');
var $WeakMap = GetIntrinsic('%WeakMap%', true);
var $Map = GetIntrinsic('%Map%', true);
var $push = callBound('Array.prototype.push');

var $weakMapGet = callBound('WeakMap.prototype.get', true);
var $weakMapSet = callBound('WeakMap.prototype.set', true);
var $weakMapHas = callBound('WeakMap.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSet = callBound('Map.prototype.set', true);
var $mapHas = callBound('Map.prototype.has', true);
var objectGet = function (objects, key) { // eslint-disable-line consistent-return
	for (var i = 0; i < objects.length; i += 1) {
		if (objects[i].key === key) {
			return objects[i].value;
		}
	}
};
var objectSet = function (objects, key, value) {
	for (var i = 0; i < objects.length; i += 1) {
		if (objects[i].key === key) {
			objects[i].value = value; // eslint-disable-line no-param-reassign
			return;
		}
	}
	$push(objects, {
		key: key,
		value: value
	});
};
var objectHas = function (objects, key) {
	for (var i = 0; i < objects.length; i += 1) {
		if (objects[i].key === key) {
			return true;
		}
	}
	return false;
};

module.exports = function getSideChannel() {
	var $wm;
	var $m;
	var $o;
	var channel = {
		assert: function (key) {
			if (!channel.has(key)) {
				throw new $TypeError('Side channel does not contain ' + inspect(key));
			}
		},
		get: function (key) { // eslint-disable-line consistent-return
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapGet($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapGet($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return objectGet($o, key);
				}
			}
		},
		has: function (key) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if ($wm) {
					return $weakMapHas($wm, key);
				}
			} else if ($Map) {
				if ($m) {
					return $mapHas($m, key);
				}
			} else {
				if ($o) { // eslint-disable-line no-lonely-if
					return objectHas($o, key);
				}
			}
			return false;
		},
		set: function (key, value) {
			if ($WeakMap && key && (typeof key === 'object' || typeof key === 'function')) {
				if (!$wm) {
					$wm = new $WeakMap();
				}
				$weakMapSet($wm, key, value);
			} else if ($Map) {
				if (!$m) {
					$m = new $Map();
				}
				$mapSet($m, key, value);
			} else {
				if (!$o) {
					$o = [];
				}
				objectSet($o, key, value);
			}
		}
	};
	return channel;
};


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "55b2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strValue = String.prototype.valueOf;
var tryStringObject = function tryStringObject(value) {
	try {
		strValue.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var strClass = '[object String]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isString(value) {
	if (typeof value === 'string') {
		return true;
	}
	if (typeof value !== 'object') {
		return false;
	}
	return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
};


/***/ }),

/***/ "55dd":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $export = __webpack_require__("5ca1");
var aFunction = __webpack_require__("d8e8");
var toObject = __webpack_require__("4bf8");
var fails = __webpack_require__("79e5");
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__("2f21")($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined
      ? $sort.call(toObject(this))
      : $sort.call(toObject(this), aFunction(comparefn));
  }
});


/***/ }),

/***/ "562a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalSidebar_vue_vue_type_style_index_0_id_c7307c46_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("467f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalSidebar_vue_vue_type_style_index_0_id_c7307c46_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalSidebar_vue_vue_type_style_index_0_id_c7307c46_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_GlobalSidebar_vue_vue_type_style_index_0_id_c7307c46_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5708":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $Object = Object;
var $TypeError = TypeError;

module.exports = function flags() {
	if (this != null && this !== $Object(this)) {
		throw new $TypeError('RegExp.prototype.flags getter called on non-object');
	}
	var result = '';
	if (this.global) {
		result += 'g';
	}
	if (this.ignoreCase) {
		result += 'i';
	}
	if (this.multiline) {
		result += 'm';
	}
	if (this.dotAll) {
		result += 's';
	}
	if (this.unicode) {
		result += 'u';
	}
	if (this.sticky) {
		result += 'y';
	}
	return result;
};


/***/ }),

/***/ "57ec":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__("5708");

var supportsDescriptors = __webpack_require__("f367").supportsDescriptors;
var $gOPD = Object.getOwnPropertyDescriptor;
var $TypeError = TypeError;

module.exports = function getPolyfill() {
	if (!supportsDescriptors) {
		throw new $TypeError('RegExp.prototype.flags requires a true ES5 environment that supports property descriptors');
	}
	if ((/a/mig).flags === 'gim') {
		var descriptor = $gOPD(RegExp.prototype, 'flags');
		if (descriptor && typeof descriptor.get === 'function' && typeof (/a/).dotAll === 'boolean') {
			return descriptor.get;
		}
	}
	return implementation;
};


/***/ }),

/***/ "5834":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__("d6ef");

module.exports = function getPolyfill() {
	return typeof Object.is === 'function' ? Object.is : implementation;
};


/***/ }),

/***/ "5a0c":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){"use strict";var t="millisecond",e="second",n="minute",r="hour",i="day",s="week",u="month",o="quarter",a="year",h=/^(\d{4})-?(\d{1,2})-?(\d{0,2})[^0-9]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?.?(\d{1,3})?$/,f=/\[([^\]]+)]|Y{2,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,c=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},d={s:c,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+c(r,2,"0")+":"+c(i,2,"0")},m:function(t,e){var n=12*(e.year()-t.year())+(e.month()-t.month()),r=t.clone().add(n,u),i=e-r<0,s=t.clone().add(n+(i?-1:1),u);return Number(-(n+(e-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(h){return{M:u,y:a,w:s,d:i,D:"date",h:r,m:n,s:e,ms:t,Q:o}[h]||String(h||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},l="en",m={};m[l]=$;var y=function(t){return t instanceof v},M=function(t,e,n){var r;if(!t)return l;if("string"==typeof t)m[t]&&(r=t),e&&(m[t]=e,r=t);else{var i=t.name;m[i]=t,r=i}return!n&&r&&(l=r),r||!n&&l},g=function(t,e){if(y(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new v(n)},D=d;D.l=M,D.i=y,D.w=function(t,e){return g(t,{locale:e.$L,utc:e.$u,$offset:e.$offset})};var v=function(){function c(t){this.$L=this.$L||M(t.locale,null,!0),this.parse(t)}var d=c.prototype;return d.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(D.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(h);if(r)return n?new Date(Date.UTC(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)):new Date(r[1],r[2]-1,r[3]||1,r[4]||0,r[5]||0,r[6]||0,r[7]||0)}return new Date(e)}(t),this.init()},d.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},d.$utils=function(){return D},d.isValid=function(){return!("Invalid Date"===this.$d.toString())},d.isSame=function(t,e){var n=g(t);return this.startOf(e)<=n&&n<=this.endOf(e)},d.isAfter=function(t,e){return g(t)<this.startOf(e)},d.isBefore=function(t,e){return this.endOf(e)<g(t)},d.$g=function(t,e,n){return D.u(t)?this[e]:this.set(n,t)},d.year=function(t){return this.$g(t,"$y",a)},d.month=function(t){return this.$g(t,"$M",u)},d.day=function(t){return this.$g(t,"$W",i)},d.date=function(t){return this.$g(t,"$D","date")},d.hour=function(t){return this.$g(t,"$H",r)},d.minute=function(t){return this.$g(t,"$m",n)},d.second=function(t){return this.$g(t,"$s",e)},d.millisecond=function(e){return this.$g(e,"$ms",t)},d.unix=function(){return Math.floor(this.valueOf()/1e3)},d.valueOf=function(){return this.$d.getTime()},d.startOf=function(t,o){var h=this,f=!!D.u(o)||o,c=D.p(t),d=function(t,e){var n=D.w(h.$u?Date.UTC(h.$y,e,t):new Date(h.$y,e,t),h);return f?n:n.endOf(i)},$=function(t,e){return D.w(h.toDate()[t].apply(h.toDate("s"),(f?[0,0,0,0]:[23,59,59,999]).slice(e)),h)},l=this.$W,m=this.$M,y=this.$D,M="set"+(this.$u?"UTC":"");switch(c){case a:return f?d(1,0):d(31,11);case u:return f?d(1,m):d(0,m+1);case s:var g=this.$locale().weekStart||0,v=(l<g?l+7:l)-g;return d(f?y-v:y+(6-v),m);case i:case"date":return $(M+"Hours",0);case r:return $(M+"Minutes",1);case n:return $(M+"Seconds",2);case e:return $(M+"Milliseconds",3);default:return this.clone()}},d.endOf=function(t){return this.startOf(t,!1)},d.$set=function(s,o){var h,f=D.p(s),c="set"+(this.$u?"UTC":""),d=(h={},h[i]=c+"Date",h.date=c+"Date",h[u]=c+"Month",h[a]=c+"FullYear",h[r]=c+"Hours",h[n]=c+"Minutes",h[e]=c+"Seconds",h[t]=c+"Milliseconds",h)[f],$=f===i?this.$D+(o-this.$W):o;if(f===u||f===a){var l=this.clone().set("date",1);l.$d[d]($),l.init(),this.$d=l.set("date",Math.min(this.$D,l.daysInMonth())).toDate()}else d&&this.$d[d]($);return this.init(),this},d.set=function(t,e){return this.clone().$set(t,e)},d.get=function(t){return this[D.p(t)]()},d.add=function(t,o){var h,f=this;t=Number(t);var c=D.p(o),d=function(e){var n=g(f);return D.w(n.date(n.date()+Math.round(e*t)),f)};if(c===u)return this.set(u,this.$M+t);if(c===a)return this.set(a,this.$y+t);if(c===i)return d(1);if(c===s)return d(7);var $=(h={},h[n]=6e4,h[r]=36e5,h[e]=1e3,h)[c]||1,l=this.$d.getTime()+t*$;return D.w(l,this)},d.subtract=function(t,e){return this.add(-1*t,e)},d.format=function(t){var e=this;if(!this.isValid())return"Invalid Date";var n=t||"YYYY-MM-DDTHH:mm:ssZ",r=D.z(this),i=this.$locale(),s=this.$H,u=this.$m,o=this.$M,a=i.weekdays,h=i.months,c=function(t,r,i,s){return t&&(t[r]||t(e,n))||i[r].substr(0,s)},d=function(t){return D.s(s%12||12,t,"0")},$=i.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:D.s(o+1,2,"0"),MMM:c(i.monthsShort,o,h,3),MMMM:c(h,o),D:this.$D,DD:D.s(this.$D,2,"0"),d:String(this.$W),dd:c(i.weekdaysMin,this.$W,a,2),ddd:c(i.weekdaysShort,this.$W,a,3),dddd:a[this.$W],H:String(s),HH:D.s(s,2,"0"),h:d(1),hh:d(2),a:$(s,u,!0),A:$(s,u,!1),m:String(u),mm:D.s(u,2,"0"),s:String(this.$s),ss:D.s(this.$s,2,"0"),SSS:D.s(this.$ms,3,"0"),Z:r};return n.replace(f,function(t,e){return e||l[t]||r.replace(":","")})},d.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},d.diff=function(t,h,f){var c,d=D.p(h),$=g(t),l=6e4*($.utcOffset()-this.utcOffset()),m=this-$,y=D.m(this,$);return y=(c={},c[a]=y/12,c[u]=y,c[o]=y/3,c[s]=(m-l)/6048e5,c[i]=(m-l)/864e5,c[r]=m/36e5,c[n]=m/6e4,c[e]=m/1e3,c)[d]||m,f?y:D.a(y)},d.daysInMonth=function(){return this.endOf(u).$D},d.$locale=function(){return m[this.$L]},d.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=M(t,e,!0);return r&&(n.$L=r),n},d.clone=function(){return D.w(this.$d,this)},d.toDate=function(){return new Date(this.valueOf())},d.toJSON=function(){return this.isValid()?this.toISOString():null},d.toISOString=function(){return this.$d.toISOString()},d.toString=function(){return this.$d.toUTCString()},c}();return g.prototype=v.prototype,g.extend=function(t,e){return t(e,v,g),g},g.locale=M,g.isDayjs=y,g.unix=function(t){return g(1e3*t)},g.en=m[l],g.Ls=m,g});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5cc5":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("2b4c")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "5df3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__("02f4")(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__("01f9")(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "5eda":
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__("5ca1");
var core = __webpack_require__("8378");
var fails = __webpack_require__("79e5");
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),

/***/ "5efb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SectionNavigationBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7584");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SectionNavigationBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SectionNavigationBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SectionNavigationBar_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5f1b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__("23c6");
var builtinExec = RegExp.prototype.exec;

 // `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};


/***/ }),

/***/ "613b":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5537")('keys');
var uid = __webpack_require__("ca5a");
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),

/***/ "626a":
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__("2d95");
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),

/***/ "653e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CONTROL_FIELD_EXTEND_MIXIN; });
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("7f7f");
/* harmony import */ var core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es6_function_name__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _mixins_style_injection_mixin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("28fe");


/**
 * Base Setup for any `controls` of Control in Vue-Form-Builder
 * @example InputControl - use the mixin. I'll keep our code extendable as possible
 */

var EMIT_EVENT = "change";
var CONTROL_FIELD_EXTEND_MIXIN = {
  mixins: [_mixins_style_injection_mixin__WEBPACK_IMPORTED_MODULE_1__[/* STYLE_INJECTION_MIXIN */ "a"]],
  props: {
    // control configuration
    control: {
      type: Object,
      required: true
    },
    // v-model value
    value: null // any types

  },
  // global data-field - available to override
  data: function data() {
    return {
      stopDefaultValueAssign: false
    };
  },

  /**
   * For V-Model Purpose
   * Basically, we will emit the 'change' to the parent to keep the update...
   */
  model: {
    event: EMIT_EVENT,
    props: "value"
  },
  watch: {
    /**
     * Watch if there is new data being assigned
     * @param val
     */
    value: function value(val) {
      this.setValue(val);
    }
  },
  methods: {
    /**
     * Run this to emit the value to the parent
     * @param val
     */
    updateValue: function updateValue(val) {
      this.$emit(EMIT_EVENT, val);
    },

    /**
     * Need-To-Override Method - Set Value.
     * Set value from parent to the current field/control
     */
    setValue: function setValue(val) {
      return val;
    } // NEED TO OVERRIDE

  },
  computed: {
    /**
     * Class for Field (input)
     * @returns {(string)[]}
     */
    controlFieldClass: function controlFieldClass() {
      return [this.styles.FORM.FORM_CONTROL, this.control.additionalFieldClass];
    },

    /**
     * Control Name
     * @returns {*|string|string}
     */
    controlName: function controlName() {
      return this.control.name || this.control.uniqueId;
    }
  },

  /**
   * Global post-mounted processing
   */
  mounted: function mounted() {
    // default set value
    if (this.stopDefaultValueAssign === false && !this.value && this.control.defaultValue) {
      this.updateValue(this.control.defaultValue);
    }
  }
};


/***/ }),

/***/ "6762":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes
var $export = __webpack_require__("5ca1");
var $includes = __webpack_require__("c366")(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__("9c6c")('includes');


/***/ }),

/***/ "67ab":
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__("ca5a")('meta');
var isObject = __webpack_require__("d3f4");
var has = __webpack_require__("69a8");
var setDesc = __webpack_require__("86cc").f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__("79e5")(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),

/***/ "6821":
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__("626a");
var defined = __webpack_require__("be13");
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),

/***/ "688e":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint no-invalid-this: 1 */

var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
var slice = Array.prototype.slice;
var toStr = Object.prototype.toString;
var funcType = '[object Function]';

module.exports = function bind(that) {
    var target = this;
    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
    }
    var args = slice.call(arguments, 1);

    var bound;
    var binder = function () {
        if (this instanceof bound) {
            var result = target.apply(
                this,
                args.concat(slice.call(arguments))
            );
            if (Object(result) === result) {
                return result;
            }
            return this;
        } else {
            return target.apply(
                that,
                args.concat(slice.call(arguments))
            );
        }
    };

    var boundLength = Math.max(0, target.length - args.length);
    var boundArgs = [];
    for (var i = 0; i < boundLength; i++) {
        boundArgs.push('$' + i);
    }

    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

    if (target.prototype) {
        var Empty = function Empty() {};
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
    }

    return bound;
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a29":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FormBuilder.vue?vue&type=template&id=1201e206&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"row",class:[_vm.styles.CONTAINER.FLUID, 'form-padding', 'vue-form-builder']},[_c('div',{staticClass:"col"},[_c('FormConfiguration',{model:{value:(_vm.formData.formConfig),callback:function ($$v) {_vm.$set(_vm.formData, "formConfig", $$v)},expression:"formData.formConfig"}}),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.formData.formConfig.isShowHeadline),expression:"formData.formConfig.isShowHeadline"}],staticClass:"form-headline-container"},[_c('h1',{domProps:{"textContent":_vm._s(_vm.formData.formConfig.headline)}}),_c('p',{domProps:{"textContent":_vm._s(_vm.formData.formConfig.subHeadline)}})]),_vm._l((_vm.sortedSections),function(sectionData){return _c('SectionContainer',{key:sectionData.uniqueId,attrs:{"section":sectionData,"rows":_vm.formData.rows,"controls":_vm.formData.controls,"context":_vm.sortedSections}})}),_c('AddSectionControl',{attrs:{"listSections":_vm.sortedSections},on:{"addSectionNotify":_vm.addSection}})],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FormBuilder.vue?vue&type=template&id=1201e206&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("53ca");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/add-controls/AddSectionControl.vue?vue&type=template&id=796c62b7&scoped=true&
var AddSectionControlvue_type_template_id_796c62b7_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.listSections.length == 0)?_c('div',{staticClass:"container"},[_c('span',{staticClass:"cornerLeft",domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('corner_left'))}}),_c('span',{staticClass:"circle",domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('circle'))}}),_c('div',{staticClass:"row cardSection"},[_vm._m(0),_c('div',{staticClass:"cardSectionButtons col-md-12 row-fluid d-flex py-3"},_vm._l((_vm.sectionTypes),function(sectionInfo,sectionKey){return _c('div',{key:sectionKey,staticClass:"button col-3 col-lg-3 col-md-4 col-sm-4 mr-2",on:{"click":function($event){return _vm.addNew(sectionKey)}}},[_c('div',{staticClass:"title mt-1"},[_vm._v(_vm._s(_vm.$t(("canvas." + (sectionInfo.name)))))]),_c('div',{staticClass:"desc mt-1"},[_vm._v(_vm._s(_vm.$t(("canvas." + (sectionInfo.description)))))])])}),0)]),_c('span',{staticClass:"people",domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('people'))}}),_c('span',{staticClass:"cornerRight",domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('corner_right'))}})]):_c('div',{staticClass:"text-center addNewSection",on:{"click":_vm.addNewSection}},[_c('span',{staticClass:"mr-2",domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('add_section'))}}),_vm._m(1)])}
var AddSectionControlvue_type_template_id_796c62b7_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"cardSectionTexts col-md-12 row d-flex"},[_c('div',{staticClass:"pt-3"},[_vm._v(" Este espaço se chama "),_c('b',[_vm._v("seção")]),_vm._v(". ")]),_c('div',{staticClass:"py-2"},[_vm._v("Nela é possível colocar todos os elementos que irão compor seu formulário, você pode criar quantas seções precisar!")]),_c('div',[_vm._v("Para começar, escolha o tipo de seção com a qual deseja trabalhar:")])])},function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',[_c('u',[_vm._v("Adicionar nova seção")])])}]


// CONCATENATED MODULE: ./src/views/builder/add-controls/AddSectionControl.vue?vue&type=template&id=796c62b7&scoped=true&

// EXTERNAL MODULE: ./src/configs/section.js + 83 modules
var section = __webpack_require__("dd3c");

// EXTERNAL MODULE: ./src/mixins/style-injection-mixin.js
var style_injection_mixin = __webpack_require__("28fe");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/add-controls/AddSectionControl.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var AddSectionControlvue_type_script_lang_js_ = ({
  name: "AddSectionControl",
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  data: function data() {
    return {
      sectionTypes: section["b" /* SECTION_TYPES */],
      typeOfSections: ""
    };
  },
  methods: {
    addNewSection: function addNewSection() {
      this.$emit("addSectionNotify", this.typeOfSections);
    },
    addNew: function addNew(type) {
      this.typeOfSections = type;
      this.$emit("addSectionNotify", type);
    }
  },
  props: {
    listSections: {
      default: []
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/add-controls/AddSectionControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var add_controls_AddSectionControlvue_type_script_lang_js_ = (AddSectionControlvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/builder/add-controls/AddSectionControl.vue?vue&type=style&index=0&id=796c62b7&scoped=true&lang=css&
var AddSectionControlvue_type_style_index_0_id_796c62b7_scoped_true_lang_css_ = __webpack_require__("c6c0");

// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/builder/add-controls/AddSectionControl.vue






/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  add_controls_AddSectionControlvue_type_script_lang_js_,
  AddSectionControlvue_type_template_id_796c62b7_scoped_true_render,
  AddSectionControlvue_type_template_id_796c62b7_scoped_true_staticRenderFns,
  false,
  null,
  "796c62b7",
  null
  
)

/* harmony default export */ var AddSectionControl = (component.exports);
// CONCATENATED MODULE: ./src/configs/index.js
/**
 * Main Configuration of the Vue-Form-Builder
 * @author Phat Tran
 */
var MAIN_CONSTANTS = {
  COPYRIGHT: "Vue-Form-Builder v2.0.0 - github.com/sethsandaru with Love <3"
};

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/SectionContainer.vue?vue&type=template&id=2cf8a151&scoped=true&
var SectionContainervue_type_template_id_2cf8a151_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"section-container",class:{'active': _vm.isDoingConfiguration}},[_c('SectionNavigationBar',{attrs:{"section":_vm.section,"context":_vm.context},on:{"active":_vm.setActive}}),_c(_vm.sectionViewComponent,{key:_vm.section.uniqueId,tag:"component",attrs:{"section":_vm.section,"rows":_vm.rows,"controls":_vm.controls}})],1)}
var SectionContainervue_type_template_id_2cf8a151_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/SectionContainer.vue?vue&type=template&id=2cf8a151&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/SectionNavigationBar.vue?vue&type=template&id=4e35f6cd&
var SectionNavigationBarvue_type_template_id_4e35f6cd_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"section-config"},[_c('div',{staticClass:"buttons"},[_c('button',{staticClass:"btn btn-outline-primary border-primary-2",class:!_vm.canDown ? 'disabled' : '',attrs:{"title":"Push Down","disabled":!_vm.canDown},domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('arrowDown', '16px', '16px', '#5AAED3'))},on:{"click":_vm.pushDown}}),_c('button',{staticClass:"btn btn-outline-primary border-primary-2",class:!_vm.canUp ? 'disabled' : '',attrs:{"title":"Push Up","disabled":!_vm.canUp},domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('arrowUp', '16px', '16px', '#5AAED3'))},on:{"click":_vm.pushUp}}),_c('button',{staticClass:"btn btn-custom-primary",on:{"click":_vm.openConfiguration}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('editPencilBorder'))}}),_c('span',[_vm._v(_vm._s(_vm.$t('buttons.configuration')))])]),_c('button',{staticClass:"btn btn-outline-danger border-danger-2",on:{"click":_vm.deleteSection}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('trashCustom'))}}),_c('span',[_vm._v(_vm._s(_vm.$t('buttons.delete')))])])])])}
var SectionNavigationBarvue_type_template_id_4e35f6cd_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/SectionNavigationBar.vue?vue&type=template&id=4e35f6cd&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./src/configs/events.js
var events = __webpack_require__("fbe6");

// CONCATENATED MODULE: ./src/mixins/section-sort-mixins.js
/**
 * Section Sort Mixins
 * @desc Where I handle the sorting (push up/down) for the Section
 * @used SectionNavigationBar
 * @author Phat Tran
 */

var SECTION_SORT_MIXINS = {
  methods: {
    /**
     * Push-up Section
     * @desc Send Fire Event to Parent to handle the Push-Up of Current Section
     * @listener FormBuilder
     */
    pushUp: function pushUp() {
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SECTION.PUSH, this.section, 0);
    },

    /**
     * Push-down Section
     * @desc Send Fire Event to Parent to handle the Push-Down of Current Section
     * @listener FormBuilder
     */
    pushDown: function pushDown() {
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SECTION.PUSH, this.section, 1);
    }
  }
};

// EXTERNAL MODULE: ./src/libraries/sidebar-renderer.class.js
var sidebar_renderer_class = __webpack_require__("1ec8");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/SidebarSectionConfiguration.vue?vue&type=template&id=34be2cb1&
var SidebarSectionConfigurationvue_type_template_id_34be2cb1_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sidebar-form-configuration"},[_c('h5',{staticClass:"subheader"},[_vm._v(_vm._s(_vm.$t('config.section_form_configuration')))]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',{staticClass:"labelInput"},[_vm._v(_vm._s(_vm.$t('config.name_section')))]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.sectionConfiguration.headline),expression:"sectionConfiguration.headline"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.sectionConfiguration.headline)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.sectionConfiguration, "headline", $event.target.value)},_vm.change]}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',{staticClass:"labelInput"},[_vm._v(_vm._s(_vm.$t('config.subname_section')))]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.sectionConfiguration.subHeadline),expression:"sectionConfiguration.subHeadline"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.sectionConfiguration.subHeadline)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.sectionConfiguration, "subHeadline", $event.target.value)},_vm.change]}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',{staticClass:"labelInput"},[_vm._v(_vm._s(_vm.$t('config.type_section')))]),_c('select',{class:_vm.styles.FORM.FORM_CONTROL,on:{"change":function($event){return _vm.change()}}},_vm._l((_vm.listCategory),function(className,classID){return _c('option',{key:classID},[_vm._v(_vm._s(className))])}),0)]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',{staticClass:"labelInput"},[_vm._v(_vm._s(_vm.$t('config.show_name_section')))]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.sectionConfiguration.isShowHeadline),expression:"sectionConfiguration.isShowHeadline"}],attrs:{"id":"checkbox","type":"checkbox"},domProps:{"checked":Array.isArray(_vm.sectionConfiguration.isShowHeadline)?_vm._i(_vm.sectionConfiguration.isShowHeadline,null)>-1:(_vm.sectionConfiguration.isShowHeadline)},on:{"change":[function($event){var $$a=_vm.sectionConfiguration.isShowHeadline,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.sectionConfiguration, "isShowHeadline", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.sectionConfiguration, "isShowHeadline", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.sectionConfiguration, "isShowHeadline", $$c)}},_vm.change]}}),_c('label',{staticClass:"ml-2",attrs:{"for":"checkbox"}},[_vm._v("Sim")])])])}
var SidebarSectionConfigurationvue_type_template_id_34be2cb1_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/SidebarSectionConfiguration.vue?vue&type=template&id=34be2cb1&

// EXTERNAL MODULE: ./src/mixins/sidebar-body-mixin.js
var sidebar_body_mixin = __webpack_require__("cbce");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/SidebarSectionConfiguration.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var SidebarSectionConfigurationvue_type_script_lang_js_ = ({
  name: "SidebarSectionConfiguration",
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */], sidebar_body_mixin["a" /* SIDEBAR_BODY_MIXIN */]],
  data: function data() {
    return {
      dataKey: "sectionConfiguration",
      sectionConfiguration: Object.assign({}, section["a" /* SECTION_DEFAULT_DATA */]),
      listCategory: ["Teste 01", "Teste 02", "Teste 03"]
    };
  },
  created: function created() {
    // retrieve the data from `GlobalSidebar` passed in
    this.sectionConfiguration = Object.assign({}, this.sectionConfiguration, this.dataPackage);
  },
  methods: {
    change: function change() {
      this.save(false);
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/SidebarSectionConfiguration.vue?vue&type=script&lang=js&
 /* harmony default export */ var sidebar_config_views_SidebarSectionConfigurationvue_type_script_lang_js_ = (SidebarSectionConfigurationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/SidebarSectionConfiguration.vue





/* normalize component */

var SidebarSectionConfiguration_component = Object(componentNormalizer["a" /* default */])(
  sidebar_config_views_SidebarSectionConfigurationvue_type_script_lang_js_,
  SidebarSectionConfigurationvue_type_template_id_34be2cb1_render,
  SidebarSectionConfigurationvue_type_template_id_34be2cb1_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SidebarSectionConfiguration = (SidebarSectionConfiguration_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/SectionNavigationBar.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ var SectionNavigationBarvue_type_script_lang_js_ = ({
  name: "SectionNavigationBar",
  mixins: [SECTION_SORT_MIXINS, style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  props: {
    section: {
      type: Object,
      required: true
    },
    context: {
      type: Array,
      default: []
    }
  },
  methods: {
    /**
     * Submit to delete a Section
     */
    deleteSection: function deleteSection() {
      if (this.section.rows.length > 0) {
        if (!confirm("This section contains row(s). Are you sure? Everything is gone and can't be recovered after deleted.")) {
          return;
        }
      } // submit to delete


      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SECTION.DELETE, this.section.uniqueId);
    },

    /**
     * Tell the sidebar to open so we can configure our Section =))
     */
    openConfiguration: function openConfiguration() {
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.OPEN, {
        runnerId: this.section.uniqueId,
        title: "CONFIGURAÇÕES DO COMPONENTE"
      });
    },

    /**
     * We need this special event to know when the sidebar is opened
     * Therefore, we will render the sidebar and turn on the border (current editing section)
     */
    configurationOpened: function configurationOpened(runnerId) {
      if (this.section.uniqueId !== runnerId) {
        return;
      } // render sidebar and turn on the border


      this.renderSidebar();
      this.$emit("active", true); // call to parent to let it know this section is currently editing..
    },

    /**
     * Emitting the configuration to render the Section-Config-Sidebar
     */
    renderSidebar: function renderSidebar() {
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.INJECT, new sidebar_renderer_class["a" /* default */](this.section.uniqueId, SidebarSectionConfiguration, this.section));
    },

    /**
     * Handle Saving the Form Configuration
     * @param {string} runnerId
     * @param {Object} data
     */
    saveConfiguration: function saveConfiguration(runnerId, data) {
      // does it out of scope? if it does, stop
      if (runnerId !== this.section.uniqueId) {
        return;
      }

      var newValue = Object.assign({}, this.section, data);
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SECTION.UPDATE, newValue);
    },

    /**
     * Save and close
     * @param runnerId
     * @param data
     */
    saveAndClose: function saveAndClose(runnerId, data) {
      // does it out of scope? if it does, stop
      if (runnerId !== this.section.uniqueId) {
        return;
      }

      this.saveConfiguration(runnerId, data);
    },

    /**
     * After Sidebar closed => Remove the Active Class
     */
    removeActive: function removeActive() {
      this.$emit("active", false); // call to parent to let it know this section is finished edit
    }
  },
  created: function created() {
    // listen to after-closed from GlobalSidebar
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.SAVE, this.saveConfiguration);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.SAVE_AND_CLOSE, this.saveAndClose);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.AFTER_CLOSED, this.removeActive);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.OPENED, this.configurationOpened);
  },
  computed: {
    canUp: function canUp() {
      if (this.section.sortOrder == 1 || this.context.length == 1) {
        return false;
      } else {
        return true;
      }
    },
    canDown: function canDown() {
      if (this.context.length == 1 || this.section.sortOrder == this.context[this.context.length - 1].sortOrder) {
        return false;
      } else {
        return true;
      }
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/SectionNavigationBar.vue?vue&type=script&lang=js&
 /* harmony default export */ var builder_SectionNavigationBarvue_type_script_lang_js_ = (SectionNavigationBarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/builder/SectionNavigationBar.vue?vue&type=style&index=0&lang=css&
var SectionNavigationBarvue_type_style_index_0_lang_css_ = __webpack_require__("5efb");

// CONCATENATED MODULE: ./src/views/builder/SectionNavigationBar.vue






/* normalize component */

var SectionNavigationBar_component = Object(componentNormalizer["a" /* default */])(
  builder_SectionNavigationBarvue_type_script_lang_js_,
  SectionNavigationBarvue_type_template_id_4e35f6cd_render,
  SectionNavigationBarvue_type_template_id_4e35f6cd_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SectionNavigationBar = (SectionNavigationBar_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/SectionContainer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var SectionContainervue_type_script_lang_js_ = ({
  name: "SectionContainer",
  components: {
    SectionNavigationBar: SectionNavigationBar
  },
  props: {
    section: Object,
    rows: Object,
    controls: Object,
    context: Array
  },
  data: function data() {
    return {
      isDoingConfiguration: false
    };
  },
  methods: {
    /**
     * Set Active in order to show the holder of current editing section
     * @param val
     */
    setActive: function setActive() {
      var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.isDoingConfiguration = val;
    }
  },
  computed: {
    sectionViewComponent: function sectionViewComponent() {
      return section["b" /* SECTION_TYPES */][this.section.type].builderView;
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/SectionContainer.vue?vue&type=script&lang=js&
 /* harmony default export */ var builder_SectionContainervue_type_script_lang_js_ = (SectionContainervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/builder/SectionContainer.vue





/* normalize component */

var SectionContainer_component = Object(componentNormalizer["a" /* default */])(
  builder_SectionContainervue_type_script_lang_js_,
  SectionContainervue_type_template_id_2cf8a151_scoped_true_render,
  SectionContainervue_type_template_id_2cf8a151_scoped_true_staticRenderFns,
  false,
  null,
  "2cf8a151",
  null
  
)

/* harmony default export */ var SectionContainer = (SectionContainer_component.exports);
// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.symbol.async-iterator.js
var es7_symbol_async_iterator = __webpack_require__("ac4d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.symbol.js
var es6_symbol = __webpack_require__("8a81");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.iterator.js
var es6_string_iterator = __webpack_require__("5df3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.from.js
var es6_array_from = __webpack_require__("1c4c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find-index.js
var es6_array_find_index = __webpack_require__("20d6");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.find.js
var es6_array_find = __webpack_require__("7514");

// EXTERNAL MODULE: ./src/libraries/helper.js
var helper = __webpack_require__("43b3");

// CONCATENATED MODULE: ./src/mixins/form-builder/form-builder-event-handler.js











function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * [Note] Do not use this mixin for other purpose. This is where I move all the code of FormBuilder to keep easy to:
 *  - Structuring
 *  - Refactoring
 *  - ...
 *  This file will be handled all the Event (mostly listening) from the children to update the big `formData`
 *  @author Phat Tran <phattranminh96@gmail.com>
 */


var FORM_BUILDER_EVENT_HANDLER = {
  methods: {
    /**
     * Do mapping for section after row added
     * @param sectionId
     * @param rowId
     */
    sectionAndRowMapping: function sectionAndRowMapping(sectionId, rowId) {
      // push it into the section Rows...
      // I can ensure that sectionId is exists to be retrieve
      this.formData.sections[sectionId].rows.push(rowId);
    },

    /**
     * Push-up section (SORT)
     * @param sectionObj
     * @param {Number} type
     *  - 0 => Up
     *  - 1 => Down
     */
    sectionPushedUp: function sectionPushedUp(sectionObj) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      if ( // sort == 0 and push up => stop
      sectionObj.sortOrder <= 1 && type === 0 || // sort == total_sections and push down => stop
      sectionObj.sortOrder === this.sortedSections.length && type === 1) {
        return;
      } // old sort order to exchange with the upper section


      var postSortOrder = sectionObj.sortOrder; // pick section from sort order - Sort Order is unique

      var preSectionOrder = type === 0 ? postSortOrder - 1 : postSortOrder + 1;
      var preSection = helper["a" /* HELPER */].find(this.formData.sections, "sortOrder", preSectionOrder); // swap now

      this.$set(this.formData.sections[sectionObj.uniqueId], 'sortOrder', preSectionOrder);
      this.$set(this.formData.sections[preSection.uniqueId], 'sortOrder', postSortOrder); // Sort Again After Swapped Order

      this.doSortSection();
    },

    /**
     * Delete a section
     * @param sectionId
     */
    sectionDelete: function sectionDelete(sectionId) {
      var _this = this;

      // validate input
      if (!this.formData.sections[sectionId]) {
        return;
      } // need to delete all the related control & row


      var sectionObj = this.formData.sections[sectionId];
      sectionObj.rows.forEach(function (rowId) {
        // delete inner control of the rows
        var rowItem = _this.formData.rows[rowId];
        rowItem.controls.forEach(function (controlId) {
          // delete control by ID :D
          _this.$delete(_this.formData.controls, controlId);
        }); // delete this rows.

        _this.$delete(_this.formData.rows, rowItem.uniqueId);
      }); // delete ($delete to reactive)

      this.$delete(this.formData.sections, sectionId); // Sort Again After Deleted

      this.doSortSection(); // re-index sortOrder
      // thankfully this still keep reference... :D

      var index = 1;

      var _iterator = _createForOfIteratorHelper(this.sortedSections),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _sectionObj = _step.value;
          _sectionObj.sortOrder = index++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },

    /**
     * Update data for section
     * @param sectionObj
     */
    sectionUpdate: function sectionUpdate(sectionObj) {
      var sectionId = sectionObj.uniqueId; // validate input

      if (!this.formData.sections.hasOwnProperty(sectionId)) {
        return;
      } // update by using the extend . best way


      this.formData.sections[sectionId] = Object.assign(this.formData.sections[sectionId], sectionObj);
    },

    /**
     * Added new row
     * @param rowObject
     */
    rowNewAdded: function rowNewAdded(rowObject) {
      this.formData.rows[rowObject.uniqueId] = rowObject;
    },

    /**
     * Added new control to a section
     * @param {string} sectionId
     * @param {Object} controlObj
     */
    controlNewAdded: function controlNewAdded(sectionId, controlObj) {
      // add into big list
      this.$set(this.formData.controls, controlObj.uniqueId, controlObj); // add controlID to section

      this.formData.sections[sectionId].controls.push(controlObj.uniqueId);
    },

    /**
     * Delete a control from section/row
     * @param {string} parentId - Might be SectionId, might be RowId
     * @param {string} controlId - LOL
     * @afterHandled Emit an event to notify the deletion is complete
     */
    controlDeletion: function controlDeletion(parentId, controlId) {
      var type = this.formData.sections.hasOwnProperty(parentId) ? 'section' : 'row'; // FIRST: We delete the relationship in section/row

      if (type === 'section') {
        // find index and delete in section-controls
        var indexInSection = helper["a" /* HELPER */].findIndex(this.formData.sections[parentId].controls, undefined, controlId);
        this.formData.sections[parentId].controls.splice(indexInSection, 1);
      } else {
        // find index and delete in row-controls
        var indexInRow = helper["a" /* HELPER */].findIndex(this.formData.rows[parentId].controls, undefined, controlId);
        this.formData.rows[parentId].controls.splice(indexInRow, 1);
      } // SECOND: We delete the control object in `controls`


      this.$delete(this.formData.controls, controlId); // LAST: Emit DELETED (might be some component will register this??)

      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.CONTROL.DELETED, parentId, controlId);
    },

    /**
     * Update a control
     * @param {String} controlId
     * @param {Object} controlData
     */
    controlUpdated: function controlUpdated(controlId, controlData) {
      // validate input
      if (!this.formData.controls.hasOwnProperty(controlId)) {
        return;
      } // update by using the extend . best way


      this.formData.controls[controlId] = Object.assign(this.formData.controls[controlId], controlData);
    }
  },
  created: function created() {
    // section events
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SECTION.ADDED_ROW, this.sectionAndRowMapping);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SECTION.PUSH, this.sectionPushedUp);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SECTION.DELETE, this.sectionDelete);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SECTION.UPDATE, this.sectionUpdate); // row events

    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.ROW.CREATE, this.rowNewAdded); // control events

    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.CONTROL.CREATE, this.controlNewAdded);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.CONTROL.DELETE, this.controlDeletion);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.CONTROL.UPDATE, this.controlUpdated);
  }
};

// EXTERNAL MODULE: ./src/mixins/form-builder/form-builder-methods.js + 1 modules
var form_builder_methods = __webpack_require__("bcc7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// CONCATENATED MODULE: ./src/mixins/form-builder/form-builder-model.js




/**
 * [Note] Do not use this mixin for other purpose. This is where I move all the code of FormBuilder to keep easy to:
 *  - Structuring
 *  - Refactoring
 *  - ...
 *  This file will be handle the v-model of the FormBuilder.
 *  @author Phat Tran <phattranminh96@gmail.com>
 */
var EMIT_EVENT = "change";

var deepEqual = __webpack_require__("7fae"); // TO CHECK THE DEEPEST VALUES OF THE FORM...


var FORM_BUILDER_MODEL = {
  props: {
    value: Object
  },
  model: {
    event: EMIT_EVENT,
    props: "value"
  },
  watch: {
    /**
     * For Update New Configuration After User Changed the Form
     */
    formData: {
      deep: true,
      // deep watcher - because we have a long-tree object
      handler: function handler(newFormData) {
        this.$emit(EMIT_EVENT, newFormData);
      }
    },

    /**
     * For Update the New Configuration After User Applied new DATA into v-model
     */
    value: {
      deep: true,
      handler: function handler(newFormData, oldFormData) {
        // because this is in the initialize => no data at first
        if (typeof oldFormData === 'undefined') {
          return;
        } // we have to create a new formConfig for the "unexpected value" like: {}, null, undefined
        // only available for null and empty object data


        if (!newFormData || !Object.keys(newFormData).length) {
          return this.mapping();
        } // this time object have data, we have to make sure everything


        if (deepEqual(newFormData, oldFormData)) {
          return;
        } // okay this time object is fully new and we need to do mapping again


        return this.mapping(newFormData);
      }
    }
  }
};

// CONCATENATED MODULE: ./src/mixins/form-builder-mixins.js




/* harmony default export */ var form_builder_mixins = ([FORM_BUILDER_EVENT_HANDLER, form_builder_methods["a" /* FORM_BUILDER_METHODS */], FORM_BUILDER_MODEL, style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]]);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/FormConfiguration.vue?vue&type=template&id=4e4f2234&
var FormConfigurationvue_type_template_id_4e4f2234_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"form-configuration-block pbottom-10"},[_c('button',{class:_vm.styles.BUTTON.PRIMARY,on:{"click":_vm.open}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('cog'))}}),_c('span',[_vm._v(_vm._s(_vm.$t('buttons.form_configurations')))])])])}
var FormConfigurationvue_type_template_id_4e4f2234_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/FormConfiguration.vue?vue&type=template&id=4e4f2234&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/SidebarFormConfiguration.vue?vue&type=template&id=11e452ed&scoped=true&
var SidebarFormConfigurationvue_type_template_id_11e452ed_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sidebar-form-configuration w-100"},[_c('h5',{staticClass:"subheader"},[_vm._v(_vm._s(_vm.$t('config.main_form_configuration')))]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',{staticClass:"labelInput"},[_vm._v(_vm._s(_vm.$t('config.name_form')))]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.formConfiguration.headline),expression:"formConfiguration.headline"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.formConfiguration.headline)},on:{"input":[function($event){if($event.target.composing){ return; }_vm.$set(_vm.formConfiguration, "headline", $event.target.value)},function($event){return _vm.change()}]}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(_vm._s(_vm.$t('config.type_form')))]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.formConfiguration.subHeadline),expression:"formConfiguration.subHeadline"}],class:_vm.styles.FORM.FORM_CONTROL,on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.formConfiguration, "subHeadline", $event.target.multiple ? $$selectedVal : $$selectedVal[0])},function($event){return _vm.change()}]}},_vm._l((_vm.listCategory),function(className,classID){return _c('option',{key:classID},[_vm._v(" "+_vm._s(className)+" ")])}),0)]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',{staticClass:"labelInput"},[_vm._v(" "+_vm._s(_vm.$t('config.category_form')))]),_c('select',{class:_vm.styles.FORM.FORM_CONTROL,on:{"change":function($event){return _vm.change()}}},_vm._l((_vm.listCategory),function(className,classID){return _c('option',{key:classID},[_vm._v(" "+_vm._s(className)+" ")])}),0)]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.formConfiguration.renderFormTag),expression:"formConfiguration.renderFormTag"}]},[_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',{staticClass:"labelInput"},[_vm._v("Form-TAG Action URL")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.formConfiguration.formActionURL),expression:"formConfiguration.formActionURL"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.formConfiguration.formActionURL)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.formConfiguration, "formActionURL", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Form-TAG Method")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.formConfiguration.formMethod),expression:"formConfiguration.formMethod"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.formConfiguration.formMethod)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.formConfiguration, "formMethod", $event.target.value)}}})])])])}
var SidebarFormConfigurationvue_type_template_id_11e452ed_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/SidebarFormConfiguration.vue?vue&type=template&id=11e452ed&scoped=true&

// EXTERNAL MODULE: ./src/configs/form.js
var configs_form = __webpack_require__("22a0");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/SidebarFormConfiguration.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var SidebarFormConfigurationvue_type_script_lang_js_ = ({
  name: "SidebarFormConfiguration",
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */], sidebar_body_mixin["a" /* SIDEBAR_BODY_MIXIN */]],
  data: function data() {
    return {
      dataKey: "formConfiguration",
      formConfiguration: Object.assign({}, configs_form["a" /* FORM_DEFAULT_DATA */]),
      listCategory: ['Teste 01', 'Teste 02', 'Teste 03']
    };
  },
  created: function created() {
    this.formConfiguration = Object.assign({}, this.formConfiguration, this.dataPackage);
  },
  methods: {
    change: function change() {
      this.save(false);
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/SidebarFormConfiguration.vue?vue&type=script&lang=js&
 /* harmony default export */ var sidebar_config_views_SidebarFormConfigurationvue_type_script_lang_js_ = (SidebarFormConfigurationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/SidebarFormConfiguration.vue





/* normalize component */

var SidebarFormConfiguration_component = Object(componentNormalizer["a" /* default */])(
  sidebar_config_views_SidebarFormConfigurationvue_type_script_lang_js_,
  SidebarFormConfigurationvue_type_template_id_11e452ed_scoped_true_render,
  SidebarFormConfigurationvue_type_template_id_11e452ed_scoped_true_staticRenderFns,
  false,
  null,
  "11e452ed",
  null
  
)

/* harmony default export */ var SidebarFormConfiguration = (SidebarFormConfiguration_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/FormConfiguration.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//




var RUNNER_ID = "FormConfiguration";
/* harmony default export */ var FormConfigurationvue_type_script_lang_js_ = ({
  name: "FormConfiguration",
  components: {
    SidebarFormConfiguration: SidebarFormConfiguration
  },
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  props: {
    value: Object
  },
  model: {
    event: "change",
    props: "value"
  },
  methods: {
    /**
     * Open Configuration Sidebar
     * @desc Fire an Event to GlobalSidebar
     */
    open: function open() {
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.OPEN, {
        runnerId: RUNNER_ID,
        title: "CONFIGURAÇÕES DO FORMULÁRIO"
      });
    },

    /**
     * Emit an Event to Render Sidebar Body
     * @desc Fire an Event to GlobalSidebar
     */
    renderSidebar: function renderSidebar() {
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.INJECT, new sidebar_renderer_class["a" /* default */](RUNNER_ID, SidebarFormConfiguration, this.value));
    },

    /**
     * Handle Saving the Form Configuration
     * @param {string} runnerId
     * @param {Object} data
     */
    saveConfiguration: function saveConfiguration(runnerId, data) {
      // does it out of scope? if it does, stop
      if (runnerId !== RUNNER_ID) {
        return;
      }

      var newValue = Object.assign({}, this.value, data);
      this.$emit("change", newValue); // run this to update v-model
    },

    /**
     * After sidebar is opened - we will render the GlobalSidebar's body
     * @param runnerId
     */
    afterOpenedSidebar: function afterOpenedSidebar(runnerId) {
      // does it out of scope? if it does, stop
      if (runnerId !== RUNNER_ID) {
        return;
      } // render sidebar if its from FormConfiguration


      this.renderSidebar();
    }
  },
  created: function created() {
    // listen to GlobalSidebar Event...
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.SAVE, this.saveConfiguration);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.SAVE_AND_CLOSE, this.saveConfiguration);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.OPENED, this.renderSidebar);
  }
});
// CONCATENATED MODULE: ./src/views/builder/FormConfiguration.vue?vue&type=script&lang=js&
 /* harmony default export */ var builder_FormConfigurationvue_type_script_lang_js_ = (FormConfigurationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/builder/FormConfiguration.vue





/* normalize component */

var FormConfiguration_component = Object(componentNormalizer["a" /* default */])(
  builder_FormConfigurationvue_type_script_lang_js_,
  FormConfigurationvue_type_template_id_4e4f2234_render,
  FormConfigurationvue_type_template_id_4e4f2234_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var FormConfiguration = (FormConfiguration_component.exports);
// EXTERNAL MODULE: ./src/views/builder/GlobalSidebar.vue + 4 modules
var GlobalSidebar = __webpack_require__("4ad6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FormBuilder.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var FormBuildervue_type_script_lang_js_ = ({
  name: "FormBuilder",
  components: {
    GlobalSidebar: GlobalSidebar["a" /* default */],
    FormConfiguration: FormConfiguration,
    SectionContainer: SectionContainer,
    AddSectionControl: AddSectionControl
  },
  methods: {
    openFormConfig: function openFormConfig() {
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.OPEN, {
        runnerId: "FormConfiguration",
        title: "CONFIGURAÇÕES DO FORMULÁRIO"
      });
    }
  },
  mixins: form_builder_mixins,
  data: function data() {
    return {
      formData: {
        formConfig: {},
        sections: {},
        rows: {},
        controls: {}
      }
    };
  },
  created: function created() {
    if (this.value && Object(esm_typeof["a" /* default */])(this.value) === "object") {
      this.mapping(this.value);
    } else {
      this.createDefaultData();
    }
  }
});
// CONCATENATED MODULE: ./src/components/FormBuilder.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FormBuildervue_type_script_lang_js_ = (FormBuildervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/FormBuilder.vue?vue&type=style&index=0&id=1201e206&scoped=true&lang=css&
var FormBuildervue_type_style_index_0_id_1201e206_scoped_true_lang_css_ = __webpack_require__("0aff");

// CONCATENATED MODULE: ./src/components/FormBuilder.vue






/* normalize component */

var FormBuilder_component = Object(componentNormalizer["a" /* default */])(
  components_FormBuildervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "1201e206",
  null
  
)

/* harmony default export */ var FormBuilder = __webpack_exports__["a"] = (FormBuilder_component.exports);

/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "6b54":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

__webpack_require__("3846");
var anObject = __webpack_require__("cb7c");
var $flags = __webpack_require__("0bfb");
var DESCRIPTORS = __webpack_require__("9e1e");
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function (fn) {
  __webpack_require__("2aba")(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__("79e5")(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/',
      'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
// FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}


/***/ }),

/***/ "6d4a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ControlLabel_vue_vue_type_style_index_0_id_8c437052_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("066b");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ControlLabel_vue_vue_type_style_index_0_id_8c437052_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ControlLabel_vue_vue_type_style_index_0_id_8c437052_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_ControlLabel_vue_vue_type_style_index_0_id_8c437052_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6db7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__("f367");
var callBind = __webpack_require__("44b7");

var implementation = __webpack_require__("d6ef");
var getPolyfill = __webpack_require__("5834");
var shim = __webpack_require__("c15a");

var polyfill = callBind(getPolyfill(), Object);

define(polyfill, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = polyfill;


/***/ }),

/***/ "7226":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var filter = __webpack_require__("b2bf");

module.exports = function availableTypedArrays() {
	return filter([
		'BigInt64Array',
		'BigUint64Array',
		'Float32Array',
		'Float64Array',
		'Int16Array',
		'Int32Array',
		'Int8Array',
		'Uint16Array',
		'Uint32Array',
		'Uint8Array',
		'Uint8ClampedArray'
	], function (typedArray) {
		return typeof global[typedArray] === 'function';
	});
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "7333":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var DESCRIPTORS = __webpack_require__("9e1e");
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
var toObject = __webpack_require__("4bf8");
var IObject = __webpack_require__("626a");
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__("79e5")(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || isEnum.call(S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;


/***/ }),

/***/ "7514":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
var $export = __webpack_require__("5ca1");
var $find = __webpack_require__("0a49")(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () { forced = false; });
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__("9c6c")(KEY);


/***/ }),

/***/ "7584":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "77f1":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("4588");
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7bbc":
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__("6821");
var gOPN = __webpack_require__("9093").f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),

/***/ "7d7e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ROW_TYPES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ROW_DEFAULT_DATA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return createNewRow; });
/* harmony import */ var _libraries_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("43b3");
/**
 * Row Constants in Vue-Form-Builder
 * @author Phat Tran
 */

var ROW_TYPES = {
  normal: 'normal',
  // Normal Row in Div (div.row)
  tableRow: 'tableRow' // Table row (tr)

};
var ROW_DEFAULT_DATA = {
  uniqueId: '',
  additionalClass: '',
  type: ROW_TYPES.normal,
  sortOrder: 0,
  controls: [] // ids of control

};
/**
 * Create new Row Object
 * @param type
 */

function createNewRow(type) {
  if (!ROW_TYPES[type]) {
    throw new TypeError("Row Type: ".concat(type, " doesn't exists in Vue-Form-Builder"));
  } // create new section data base on the default data


  var newRowObject = _libraries_helper__WEBPACK_IMPORTED_MODULE_0__[/* HELPER */ "a"].cloneDeep(ROW_DEFAULT_DATA);
  newRowObject.type = type;
  newRowObject.uniqueId = "row-" + _libraries_helper__WEBPACK_IMPORTED_MODULE_0__[/* HELPER */ "a"].getUUIDv4();
  return newRowObject;
}



/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "7f7f":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc").f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__("9e1e") && dP(FProto, NAME, {
  configurable: true,
  get: function () {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});


/***/ }),

/***/ "7fae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var objectKeys = __webpack_require__("d6c7");
var isArguments = __webpack_require__("e39c");
var is = __webpack_require__("6db7");
var isRegex = __webpack_require__("d8d8");
var flags = __webpack_require__("e710");
var isArray = __webpack_require__("e3db");
var isDate = __webpack_require__("0e65");
var whichBoxedPrimitive = __webpack_require__("2fb9");
var GetIntrinsic = __webpack_require__("e9ac");
var callBound = __webpack_require__("2a1a");
var whichCollection = __webpack_require__("bd25");
var getIterator = __webpack_require__("b2b8");
var getSideChannel = __webpack_require__("5402");
var whichTypedArray = __webpack_require__("edc4");
var assign = __webpack_require__("2a8a");

var $getTime = callBound('Date.prototype.getTime');
var gPO = Object.getPrototypeOf;
var $objToString = callBound('Object.prototype.toString');

var $Set = GetIntrinsic('%Set%', true);
var $mapHas = callBound('Map.prototype.has', true);
var $mapGet = callBound('Map.prototype.get', true);
var $mapSize = callBound('Map.prototype.size', true);
var $setAdd = callBound('Set.prototype.add', true);
var $setDelete = callBound('Set.prototype.delete', true);
var $setHas = callBound('Set.prototype.has', true);
var $setSize = callBound('Set.prototype.size', true);

// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L401-L414
function setHasEqualElement(set, val1, opts, channel) {
  var i = getIterator(set);
  var result;
  while ((result = i.next()) && !result.done) {
    if (internalDeepEqual(val1, result.value, opts, channel)) { // eslint-disable-line no-use-before-define
      // Remove the matching element to make sure we do not check that again.
      $setDelete(set, result.value);
      return true;
    }
  }

  return false;
}

// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L416-L439
function findLooseMatchingPrimitives(prim) {
  if (typeof prim === 'undefined') {
    return null;
  }
  if (typeof prim === 'object') { // Only pass in null as object!
    return void 0;
  }
  if (typeof prim === 'symbol') {
    return false;
  }
  if (typeof prim === 'string' || typeof prim === 'number') {
    // Loose equal entries exist only if the string is possible to convert to a regular number and not NaN.
    return +prim === +prim; // eslint-disable-line no-implicit-coercion
  }
  return true;
}

// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L449-L460
function mapMightHaveLoosePrim(a, b, prim, item, opts, channel) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) {
    return altValue;
  }
  var curB = $mapGet(b, altValue);
  var looseOpts = assign({}, opts, { strict: false });
  if (
    (typeof curB === 'undefined' && !$mapHas(b, altValue))
    // eslint-disable-next-line no-use-before-define
    || !internalDeepEqual(item, curB, looseOpts, channel)
  ) {
    return false;
  }
  // eslint-disable-next-line no-use-before-define
  return !$mapHas(a, altValue) && internalDeepEqual(item, curB, looseOpts, channel);
}

// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L441-L447
function setMightHaveLoosePrim(a, b, prim) {
  var altValue = findLooseMatchingPrimitives(prim);
  if (altValue != null) {
    return altValue;
  }

  return $setHas(b, altValue) && !$setHas(a, altValue);
}

// taken from https://github.com/browserify/commonjs-assert/blob/bba838e9ba9e28edf3127ce6974624208502f6bc/internal/util/comparisons.js#L518-L533
function mapHasEqualEntry(set, map, key1, item1, opts, channel) {
  var i = getIterator(set);
  var result;
  var key2;
  while ((result = i.next()) && !result.done) {
    key2 = result.value;
    if (
      // eslint-disable-next-line no-use-before-define
      internalDeepEqual(key1, key2, opts, channel)
      // eslint-disable-next-line no-use-before-define
      && internalDeepEqual(item1, $mapGet(map, key2), opts, channel)
    ) {
      $setDelete(set, key2);
      return true;
    }
  }

  return false;
}

function internalDeepEqual(actual, expected, options, channel) {
  var opts = options || {};

  // 7.1. All identical values are equivalent, as determined by ===.
  if (opts.strict ? is(actual, expected) : actual === expected) {
    return true;
  }

  var actualBoxed = whichBoxedPrimitive(actual);
  var expectedBoxed = whichBoxedPrimitive(expected);
  if (actualBoxed !== expectedBoxed) {
    return false;
  }

  // 7.3. Other pairs that do not both pass typeof value == 'object', equivalence is determined by ==.
  if (!actual || !expected || (typeof actual !== 'object' && typeof expected !== 'object')) {
    return opts.strict ? is(actual, expected) : actual == expected; // eslint-disable-line eqeqeq
  }

  /*
   * 7.4. For all other Object pairs, including Array objects, equivalence is
   * determined by having the same number of owned properties (as verified
   * with Object.prototype.hasOwnProperty.call), the same set of keys
   * (although not necessarily the same order), equivalent values for every
   * corresponding key, and an identical 'prototype' property. Note: this
   * accounts for both named and indexed properties on Arrays.
   */
  // see https://github.com/nodejs/node/commit/d3aafd02efd3a403d646a3044adcf14e63a88d32 for memos/channel inspiration

  var hasActual = channel.has(actual);
  var hasExpected = channel.has(expected);
  var sentinel;
  if (hasActual && hasExpected) {
    if (channel.get(actual) === channel.get(expected)) {
      return true;
    }
  } else {
    sentinel = {};
  }
  if (!hasActual) { channel.set(actual, sentinel); }
  if (!hasExpected) { channel.set(expected, sentinel); }

  // eslint-disable-next-line no-use-before-define
  return objEquiv(actual, expected, opts, channel);
}

function isBuffer(x) {
  if (!x || typeof x !== 'object' || typeof x.length !== 'number') {
    return false;
  }
  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
    return false;
  }
  if (x.length > 0 && typeof x[0] !== 'number') {
    return false;
  }

  return !!(x.constructor && x.constructor.isBuffer && x.constructor.isBuffer(x));
}

function setEquiv(a, b, opts, channel) {
  if ($setSize(a) !== $setSize(b)) {
    return false;
  }
  var iA = getIterator(a);
  var iB = getIterator(b);
  var resultA;
  var resultB;
  var set;
  while ((resultA = iA.next()) && !resultA.done) {
    if (resultA.value && typeof resultA.value === 'object') {
      if (!set) { set = new $Set(); }
      $setAdd(set, resultA.value);
    } else if (!$setHas(b, resultA.value)) {
      if (opts.strict) { return false; }
      if (!setMightHaveLoosePrim(a, b, resultA.value)) {
        return false;
      }
      if (!set) { set = new $Set(); }
      $setAdd(set, resultA.value);
    }
  }
  if (set) {
    while ((resultB = iB.next()) && !resultB.done) {
      // We have to check if a primitive value is already matching and only if it's not, go hunting for it.
      if (resultB.value && typeof resultB.value === 'object') {
        if (!setHasEqualElement(set, resultB.value, opts.strict, channel)) {
          return false;
        }
      } else if (
        !opts.strict
        && !$setHas(a, resultB.value)
        && !setHasEqualElement(set, resultB.value, opts.strict, channel)
      ) {
        return false;
      }
    }
    return $setSize(set) === 0;
  }
  return true;
}

function mapEquiv(a, b, opts, channel) {
  if ($mapSize(a) !== $mapSize(b)) {
    return false;
  }
  var iA = getIterator(a);
  var iB = getIterator(b);
  var resultA;
  var resultB;
  var set;
  var key;
  var item1;
  var item2;
  while ((resultA = iA.next()) && !resultA.done) {
    key = resultA.value[0];
    item1 = resultA.value[1];
    if (key && typeof key === 'object') {
      if (!set) { set = new $Set(); }
      $setAdd(set, key);
    } else {
      item2 = $mapGet(b, key);
      if ((typeof item2 === 'undefined' && !$mapHas(b, key)) || !internalDeepEqual(item1, item2, opts, channel)) {
        if (opts.strict) {
          return false;
        }
        if (!mapMightHaveLoosePrim(a, b, key, item1, opts, channel)) {
          return false;
        }
        if (!set) { set = new $Set(); }
        $setAdd(set, key);
      }
    }
  }

  if (set) {
    while ((resultB = iB.next()) && !resultB.done) {
      key = resultB.value[0];
      item2 = resultB.value[1];
      if (key && typeof key === 'object') {
        if (!mapHasEqualEntry(set, a, key, item2, opts, channel)) {
          return false;
        }
      } else if (
        !opts.strict
        && (!a.has(key) || !internalDeepEqual($mapGet(a, key), item2, opts, channel))
        && !mapHasEqualEntry(set, a, key, item2, assign({}, opts, { strict: false }), channel)
      ) {
        return false;
      }
    }
    return $setSize(set) === 0;
  }
  return true;
}

function objEquiv(a, b, opts, channel) {
  /* eslint max-statements: [2, 100], max-lines-per-function: [2, 120], max-depth: [2, 5] */
  var i, key;

  if (typeof a !== typeof b) { return false; }
  if (a == null || b == null) { return false; }

  if ($objToString(a) !== $objToString(b)) { return false; }

  if (isArguments(a) !== isArguments(b)) { return false; }

  var aIsArray = isArray(a);
  var bIsArray = isArray(b);
  if (aIsArray !== bIsArray) { return false; }

  // TODO: replace when a cross-realm brand check is available
  var aIsError = a instanceof Error;
  var bIsError = b instanceof Error;
  if (aIsError !== bIsError) { return false; }
  if (aIsError || bIsError) {
    if (a.name !== b.name || a.message !== b.message) { return false; }
  }

  var aIsRegex = isRegex(a);
  var bIsRegex = isRegex(b);
  if (aIsRegex !== bIsRegex) { return false; }
  if ((aIsRegex || bIsRegex) && (a.source !== b.source || flags(a) !== flags(b))) {
    return false;
  }

  var aIsDate = isDate(a);
  var bIsDate = isDate(b);
  if (aIsDate !== bIsDate) { return false; }
  if (aIsDate || bIsDate) { // && would work too, because both are true or both false here
    if ($getTime(a) !== $getTime(b)) { return false; }
  }
  if (opts.strict && gPO && gPO(a) !== gPO(b)) { return false; }

  if (whichTypedArray(a) !== whichTypedArray(b)) {
    return false;
  }

  var aIsBuffer = isBuffer(a);
  var bIsBuffer = isBuffer(b);
  if (aIsBuffer !== bIsBuffer) { return false; }
  if (aIsBuffer || bIsBuffer) { // && would work too, because both are true or both false here
    if (a.length !== b.length) { return false; }
    for (i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) { return false; }
    }
    return true;
  }

  if (typeof a !== typeof b) { return false; }

  var ka = objectKeys(a);
  var kb = objectKeys(b);
  // having the same number of owned properties (keys incorporates hasOwnProperty)
  if (ka.length !== kb.length) { return false; }

  // the same set of keys (although not necessarily the same order),
  ka.sort();
  kb.sort();
  // ~~~cheap key test
  for (i = ka.length - 1; i >= 0; i--) {
    if (ka[i] != kb[i]) { return false; } // eslint-disable-line eqeqeq
  }

  // equivalent values for every corresponding key, and ~~~possibly expensive deep test
  for (i = ka.length - 1; i >= 0; i--) {
    key = ka[i];
    if (!internalDeepEqual(a[key], b[key], opts, channel)) { return false; }
  }

  var aCollection = whichCollection(a);
  var bCollection = whichCollection(b);
  if (aCollection !== bCollection) {
    return false;
  }
  if (aCollection === 'Set' || bCollection === 'Set') { // aCollection === bCollection
    return setEquiv(a, b, opts, channel);
  }
  if (aCollection === 'Map') { // aCollection === bCollection
    return mapEquiv(a, b, opts, channel);
  }

  return true;
}

module.exports = function deepEqual(a, b, opts) {
  return internalDeepEqual(a, b, opts, getSideChannel());
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.11' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    var descriptor = Object.getOwnPropertyDescriptor(document, 'currentScript')
    // for chrome
    if (!descriptor && 'currentScript' in document && document.currentScript) {
      return document.currentScript
    }

    // for other browsers with native support for currentScript
    if (descriptor && descriptor.get !== getCurrentScript && document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8a81":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__("7726");
var has = __webpack_require__("69a8");
var DESCRIPTORS = __webpack_require__("9e1e");
var $export = __webpack_require__("5ca1");
var redefine = __webpack_require__("2aba");
var META = __webpack_require__("67ab").KEY;
var $fails = __webpack_require__("79e5");
var shared = __webpack_require__("5537");
var setToStringTag = __webpack_require__("7f20");
var uid = __webpack_require__("ca5a");
var wks = __webpack_require__("2b4c");
var wksExt = __webpack_require__("37c8");
var wksDefine = __webpack_require__("3a72");
var enumKeys = __webpack_require__("d4c0");
var isArray = __webpack_require__("1169");
var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var toObject = __webpack_require__("4bf8");
var toIObject = __webpack_require__("6821");
var toPrimitive = __webpack_require__("6a99");
var createDesc = __webpack_require__("4630");
var _create = __webpack_require__("2aeb");
var gOPNExt = __webpack_require__("7bbc");
var $GOPD = __webpack_require__("11e9");
var $GOPS = __webpack_require__("2621");
var $DP = __webpack_require__("86cc");
var $keys = __webpack_require__("0d58");
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function' && !!$GOPS.f;
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__("9093").f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__("52a7").f = $propertyIsEnumerable;
  $GOPS.f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__("2d00")) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
var FAILS_ON_PRIMITIVES = $fails(function () { $GOPS.f(1); });

$export($export.S + $export.F * FAILS_ON_PRIMITIVES, 'Object', {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return $GOPS.f(toObject(it));
  }
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__("32e9")($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ "8ae1":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ CONTROL_SPECIAL_CONFIG_MIXIN; });

// EXTERNAL MODULE: ./src/mixins/style-injection-mixin.js
var style_injection_mixin = __webpack_require__("28fe");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/misc/IconTooltip.vue?vue&type=template&id=df0da044&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"v-tooltip"},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.$form.getIcon(_vm.icon, _vm.iconSize, _vm.iconSize, _vm.iconColor))}}),_c('span',{staticClass:"tooltiptext",domProps:{"innerHTML":_vm._s(_vm.text)}})])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/misc/IconTooltip.vue?vue&type=template&id=df0da044&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/misc/IconTooltip.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
/* harmony default export */ var IconTooltipvue_type_script_lang_js_ = ({
  name: "IconTooltip",
  props: {
    text: String,
    icon: String,
    iconSize: {
      type: String,
      default: '16px'
    },
    iconColor: {
      type: String,
      default: '#000'
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/misc/IconTooltip.vue?vue&type=script&lang=js&
 /* harmony default export */ var misc_IconTooltipvue_type_script_lang_js_ = (IconTooltipvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/builder/misc/IconTooltip.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  misc_IconTooltipvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "df0da044",
  null
  
)

/* harmony default export */ var IconTooltip = (component.exports);
// CONCATENATED MODULE: ./src/mixins/control-special-config-mixin.js


var CONTROL_SPECIAL_CONFIG_MIXIN = {
  components: {
    IconTooltip: IconTooltip
  },
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  props: {
    /**
     * Control Object Configuration
     */
    control: {
      type: Object,
      required: true
    },

    /**
     * Form-Data from the ROOT
     */
    formData: {
      type: Object,
      required: true
    }
  }
};


/***/ }),

/***/ "8dbe":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ CONTROLS; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ CONTROL_DEFAULT_DATA; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ createControlData; });

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./src/configs/styles.js
var styles = __webpack_require__("d60e");

// EXTERNAL MODULE: ./src/libraries/helper.js
var helper = __webpack_require__("43b3");

// CONCATENATED MODULE: ./src/configs/control-config-enum.js
/**
 * Constant for Radio/Checkbox Styling
 * @type {{next: string, bothSide: string, line: string}}
 */
var RADIO_CHECKBOX_STYLE = {
  line: {
    val: 'line',
    description: "Line by Line"
  },
  next: {
    val: 'next',
    description: "Next to each others"
  },
  bothSide: {
    val: "bothSide",
    description: "Stay on each sides in a row (Left - Right)"
  }
};
/**
 * Constant for Radio/Checkbox position
 * @type {{left: string, center: string, right: string}}
 */

var RADIO_CHECKBOX_POSITION = {
  left: {
    val: 'left',
    description: "Left"
  },
  center: {
    val: 'center',
    description: 'Center'
  },
  right: {
    val: 'right',
    description: 'Right'
  }
};
/**
 * Return Type for Date-Picker
 * @type {{format: {val: string, description: string}, object: {val: string, description: string}}}
 */

var DATE_PICKER_RETURN_TYPES = {
  format: {
    val: "format",
    description: "Date String from Date Format"
  },
  object: {
    val: "object",
    description: "JS-Date Object"
  }
};
/**
 * Date Picker Start Date (Sunday, Monday,...) of the Week
 */

var DATE_PICKER_START_DATES = {
  monday: {
    val: 1,
    description: "Monday"
  },
  tuesday: {
    val: 2,
    description: "Tuesday"
  },
  wednesday: {
    val: 3,
    description: "Wednesday"
  },
  thursday: {
    val: 4,
    description: "Thursday"
  },
  friday: {
    val: 5,
    description: "Friday"
  },
  saturday: {
    val: 6,
    description: "Saturday"
  },
  sunday: {
    val: 0,
    description: "Sunday"
  }
};
/**
 * DROPDOWN DATA MODE
 *  - Normal
 *  - API
 */

var DROPDOWN_DATA_MODES = {
  list: {
    val: 'list',
    description: "Normal - Pre-Config List Items"
  },
  api: {
    val: 'api',
    description: "API - List Items from your own API"
  }
};
/**
 * File Upload Modes
 */

var FILE_UPLOAD_MODES = {
  normal: {
    val: 'normal',
    description: "Keep the file there for HTTP Form Request"
  },
  preUpload: {
    val: 'preUpload',
    description: "Pre-Upload to your own API"
  }
};

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/InputControl.vue?vue&type=template&id=20b13064&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',{class:_vm.controlFieldClass,attrs:{"id":_vm.control.uniqueId,"type":"text","name":_vm.control.name || _vm.control.uniqueId,"placeholder":_vm.control.placeholderText},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event.target.value)}}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/controls/InputControl.vue?vue&type=template&id=20b13064&scoped=true&

// EXTERNAL MODULE: ./src/mixins/control-field-extend-mixin.js
var control_field_extend_mixin = __webpack_require__("653e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/InputControl.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//

/**
 * InputControl doesn't need to setValue. We can eventually assign the bind the value into the <input>
 * Safe safe...
 */

/* harmony default export */ var InputControlvue_type_script_lang_js_ = ({
  name: "InputControl",
  mixins: [control_field_extend_mixin["a" /* CONTROL_FIELD_EXTEND_MIXIN */]]
});
// CONCATENATED MODULE: ./src/views/controls/InputControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var controls_InputControlvue_type_script_lang_js_ = (InputControlvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/controls/InputControl.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  controls_InputControlvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "20b13064",
  null
  
)

/* harmony default export */ var InputControl = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/TextControl.vue?vue&type=template&id=6325b7a9&
var TextControlvue_type_template_id_6325b7a9_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('textarea',{class:_vm.controlFieldClass,attrs:{"id":_vm.control.uniqueId,"type":"text","rows":_vm.control.rows,"name":_vm.control.name,"placeholder":_vm.control.placeholderText},domProps:{"value":_vm.value},on:{"input":function($event){return _vm.updateValue($event.target.value)}}})}
var TextControlvue_type_template_id_6325b7a9_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/controls/TextControl.vue?vue&type=template&id=6325b7a9&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/TextControl.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * TextControl doesn't need to setValue. We can eventually assign the bind the value into the <textarea>
 * Safe safe...
 */

/* harmony default export */ var TextControlvue_type_script_lang_js_ = ({
  name: "TextControl",
  mixins: [control_field_extend_mixin["a" /* CONTROL_FIELD_EXTEND_MIXIN */]]
});
// CONCATENATED MODULE: ./src/views/controls/TextControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var controls_TextControlvue_type_script_lang_js_ = (TextControlvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/controls/TextControl.vue





/* normalize component */

var TextControl_component = Object(componentNormalizer["a" /* default */])(
  controls_TextControlvue_type_script_lang_js_,
  TextControlvue_type_template_id_6325b7a9_render,
  TextControlvue_type_template_id_6325b7a9_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TextControl = (TextControl_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/ButtonControl.vue?vue&type=template&id=2981344a&
var ButtonControlvue_type_template_id_2981344a_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{class:_vm.buttonClasses,attrs:{"id":_vm.control.uniqueId,"name":_vm.control.name,"type":_vm.control.buttonType || 'button'},domProps:{"textContent":_vm._s(_vm.control.label)},on:{"click":_vm.clickedHandle}})}
var ButtonControlvue_type_template_id_2981344a_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/controls/ButtonControl.vue?vue&type=template&id=2981344a&

// EXTERNAL MODULE: ./src/configs/events.js
var events = __webpack_require__("fbe6");

// EXTERNAL MODULE: ./src/configs/global.js
var global = __webpack_require__("b1f2");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/ButtonControl.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//



/**
 * Button Control
 * Usage:
 *  - label => button name
 *  - buttonType
 *  - buttonClass
 *  - additionalFieldClass
 */

/* harmony default export */ var ButtonControlvue_type_script_lang_js_ = ({
  name: "ButtonControl",
  mixins: [control_field_extend_mixin["a" /* CONTROL_FIELD_EXTEND_MIXIN */]],
  methods: {
    /**
     * What should we do if user clicked?
     *  - Validation
     *  - Emit
     */
    clickedHandle: function clickedHandle() {
      if (this.control.isRunValidation) {
        this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].RENDERER.RUN_VALIDATION, true);
      } else {
        // no need to validation => submit
        this.submit();
      }
    },

    /**
     * [VALIDATION-OK-EMIT] Continue to process
     */
    continueProcessAfterValidationOk: function continueProcessAfterValidationOk() {
      // can be submit after validation
      this.submit();
    },

    /**
     * Submitting The Form
     * Rules:
     *  - Had Event Code & Event Data => Submit By Emitting
     *  - Empty Event Code & Event Data, Had <Form>, Had type = "submit" => Submit by Form Request
     */
    submit: function submit() {
      if (this.control.emitEventCode && this.control.emitEventData) {
        // emit to the specific emitEventCode
        this.$formEvent.$emit(this.control.emitEventCode, this.control.emitEventData);
        return;
      } // triggering form-submit if exists
      // use DOM object ??


      var formDOM = document.getElementById(global["a" /* GLOBAL_CONFIG */].rendererFormId);

      if (!formDOM || this.$el.type !== 'submit') {
        return;
      }

      formDOM.submit();
    }
  },
  computed: {
    buttonClasses: function buttonClasses() {
      return [this.control.buttonClass, this.control.additionalFieldClass];
    }
  },
  created: function created() {
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].RENDERER.VALIDATION_OK, this.continueProcessAfterValidationOk);
  }
});
// CONCATENATED MODULE: ./src/views/controls/ButtonControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var controls_ButtonControlvue_type_script_lang_js_ = (ButtonControlvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/controls/ButtonControl.vue





/* normalize component */

var ButtonControl_component = Object(componentNormalizer["a" /* default */])(
  controls_ButtonControlvue_type_script_lang_js_,
  ButtonControlvue_type_template_id_2981344a_render,
  ButtonControlvue_type_template_id_2981344a_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ButtonControl = (ButtonControl_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/EmptyBlockControl.vue?vue&type=template&id=5f49965c&
var EmptyBlockControlvue_type_template_id_5f49965c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div')}
var EmptyBlockControlvue_type_template_id_5f49965c_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/controls/EmptyBlockControl.vue?vue&type=template&id=5f49965c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/EmptyBlockControl.vue?vue&type=script&lang=js&
//
//
//
//

/**
 * As you can see, it's surely an empty block =))
 */
/* harmony default export */ var EmptyBlockControlvue_type_script_lang_js_ = ({
  name: "EmptyBlockControl"
});
// CONCATENATED MODULE: ./src/views/controls/EmptyBlockControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var controls_EmptyBlockControlvue_type_script_lang_js_ = (EmptyBlockControlvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/controls/EmptyBlockControl.vue





/* normalize component */

var EmptyBlockControl_component = Object(componentNormalizer["a" /* default */])(
  controls_EmptyBlockControlvue_type_script_lang_js_,
  EmptyBlockControlvue_type_template_id_5f49965c_render,
  EmptyBlockControlvue_type_template_id_5f49965c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var EmptyBlockControl = (EmptyBlockControl_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/TextBlockControl.vue?vue&type=template&id=5e2a7e3c&
var TextBlockControlvue_type_template_id_5e2a7e3c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.control.additionalFieldClass,domProps:{"textContent":_vm._s(_vm.control.text)}})}
var TextBlockControlvue_type_template_id_5e2a7e3c_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/controls/TextBlockControl.vue?vue&type=template&id=5e2a7e3c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/TextBlockControl.vue?vue&type=script&lang=js&
//
//
//
//
//

/**
 * As you can see, it's surely an empty block =))
 */

/* harmony default export */ var TextBlockControlvue_type_script_lang_js_ = ({
  name: "TextBlockControl",
  mixins: [control_field_extend_mixin["a" /* CONTROL_FIELD_EXTEND_MIXIN */]]
});
// CONCATENATED MODULE: ./src/views/controls/TextBlockControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var controls_TextBlockControlvue_type_script_lang_js_ = (TextBlockControlvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/controls/TextBlockControl.vue





/* normalize component */

var TextBlockControl_component = Object(componentNormalizer["a" /* default */])(
  controls_TextBlockControlvue_type_script_lang_js_,
  TextBlockControlvue_type_template_id_5e2a7e3c_render,
  TextBlockControlvue_type_template_id_5e2a7e3c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TextBlockControl = (TextBlockControl_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/LabelControl.vue?vue&type=template&id=271f2012&
var LabelControlvue_type_template_id_271f2012_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:_vm.control.additionalLabelClass,attrs:{"id":_vm.control.uniqueId,"for":_vm.control.forAttribute},domProps:{"innerHTML":_vm._s(_vm.control.label)}})}
var LabelControlvue_type_template_id_271f2012_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/controls/LabelControl.vue?vue&type=template&id=271f2012&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/LabelControl.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//

/**
 * LabelControl
 * <label for='...'>...</label>
 */

/* harmony default export */ var LabelControlvue_type_script_lang_js_ = ({
  name: "LabelControl",
  mixins: [control_field_extend_mixin["a" /* CONTROL_FIELD_EXTEND_MIXIN */]]
});
// CONCATENATED MODULE: ./src/views/controls/LabelControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var controls_LabelControlvue_type_script_lang_js_ = (LabelControlvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/controls/LabelControl.vue





/* normalize component */

var LabelControl_component = Object(componentNormalizer["a" /* default */])(
  controls_LabelControlvue_type_script_lang_js_,
  LabelControlvue_type_template_id_271f2012_render,
  LabelControlvue_type_template_id_271f2012_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var LabelControl = (LabelControl_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/RadioCheckboxControl.vue?vue&type=template&id=7b2b0ce0&
var RadioCheckboxControlvue_type_template_id_7b2b0ce0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":_vm.control.uniqueId}},[(_vm.isSameBlock)?_c('div',{staticClass:"radio-checkbox",class:_vm.lineNextClasses},_vm._l((_vm.control.items),function(listItem){return _c('label',{key:listItem.value,class:_vm.positionClasses},[((_vm.control.type)==='checkbox')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueContainer[_vm.controlName]),expression:"valueContainer[controlName]"}],class:_vm.control.additionalFieldClass,attrs:{"name":_vm.inputName,"type":"checkbox"},domProps:{"value":listItem.value,"checked":Array.isArray(_vm.valueContainer[_vm.controlName])?_vm._i(_vm.valueContainer[_vm.controlName],listItem.value)>-1:(_vm.valueContainer[_vm.controlName])},on:{"change":function($event){var $$a=_vm.valueContainer[_vm.controlName],$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=listItem.value,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.valueContainer, _vm.controlName, $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.valueContainer, _vm.controlName, $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.valueContainer, _vm.controlName, $$c)}}}}):((_vm.control.type)==='radio')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueContainer[_vm.controlName]),expression:"valueContainer[controlName]"}],class:_vm.control.additionalFieldClass,attrs:{"name":_vm.inputName,"type":"radio"},domProps:{"value":listItem.value,"checked":_vm._q(_vm.valueContainer[_vm.controlName],listItem.value)},on:{"change":function($event){return _vm.$set(_vm.valueContainer, _vm.controlName, listItem.value)}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueContainer[_vm.controlName]),expression:"valueContainer[controlName]"}],class:_vm.control.additionalFieldClass,attrs:{"name":_vm.inputName,"type":_vm.control.type},domProps:{"value":listItem.value,"value":(_vm.valueContainer[_vm.controlName])},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.valueContainer, _vm.controlName, $event.target.value)}}}),_vm._v(" "+_vm._s(listItem.text)+" "),(_vm.displayMode === 'line')?_c('br'):_vm._e()])}),0):_c('div',[_c('div',{staticClass:"radio-checkbox",class:_vm.styles.ROW},_vm._l((_vm.control.items),function(listItem){return _c('div',{key:listItem.value,class:[_vm.styles.COLUMNS.COL6, _vm.positionClasses]},[_c('label',[((_vm.control.type)==='checkbox')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueContainer[_vm.controlName]),expression:"valueContainer[controlName]"}],class:_vm.control.additionalFieldClass,attrs:{"name":_vm.inputName,"type":"checkbox"},domProps:{"value":listItem.value,"checked":Array.isArray(_vm.valueContainer[_vm.controlName])?_vm._i(_vm.valueContainer[_vm.controlName],listItem.value)>-1:(_vm.valueContainer[_vm.controlName])},on:{"change":function($event){var $$a=_vm.valueContainer[_vm.controlName],$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=listItem.value,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.valueContainer, _vm.controlName, $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.valueContainer, _vm.controlName, $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.valueContainer, _vm.controlName, $$c)}}}}):((_vm.control.type)==='radio')?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueContainer[_vm.controlName]),expression:"valueContainer[controlName]"}],class:_vm.control.additionalFieldClass,attrs:{"name":_vm.inputName,"type":"radio"},domProps:{"value":listItem.value,"checked":_vm._q(_vm.valueContainer[_vm.controlName],listItem.value)},on:{"change":function($event){return _vm.$set(_vm.valueContainer, _vm.controlName, listItem.value)}}}):_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.valueContainer[_vm.controlName]),expression:"valueContainer[controlName]"}],class:_vm.control.additionalFieldClass,attrs:{"name":_vm.inputName,"type":_vm.control.type},domProps:{"value":listItem.value,"value":(_vm.valueContainer[_vm.controlName])},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.valueContainer, _vm.controlName, $event.target.value)}}}),_vm._v(" "+_vm._s(listItem.text)+" ")])])}),0)])])}
var RadioCheckboxControlvue_type_template_id_7b2b0ce0_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/controls/RadioCheckboxControl.vue?vue&type=template&id=7b2b0ce0&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/RadioCheckboxControl.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/**
 * Radio/Checkbox List Control
 * Probably, we can use them together. Because the only main difference is input[type=radio|checkbox]
 * @property {ListItem[]} control.items
 */

/* harmony default export */ var RadioCheckboxControlvue_type_script_lang_js_ = ({
  name: "RadioCheckboxControl",
  mixins: [control_field_extend_mixin["a" /* CONTROL_FIELD_EXTEND_MIXIN */]],
  props: {
    valueContainer: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  data: function data() {
    return {
      stopDefaultValueAssign: true,
      defaultBucket: ''
    };
  },
  created: function created() {
    // special case for Form-Builder since we can't use the
    // valueContainer (value container only available on Renderer)
    if (!this.valueContainer[this.controlName]) {
      this.valueContainer[this.controlName] = '';
    }
  },
  mounted: function mounted() {
    if (this.control.defaultValue) {
      // assign default value for control
      if (this.isRadio) {
        this.updateValue(this.control.defaultValue);
      } else {
        this.updateValue([this.control.defaultValue]);
      }
    }
  },
  computed: {
    /**
     * Check if the current instance control is radio??
     * @returns {boolean}
     */
    isRadio: function isRadio() {
      return this.control.type === 'radio';
    },

    /**
     * Quick Access to The Control.DisplayMode
     * @returns {string}
     */
    displayMode: function displayMode() {
      return this.control.displayMode;
    },

    /**
     * Check if the displayMode either line or next. Because both of them are in the same `div` block
     * @returns {boolean}
     */
    isSameBlock: function isSameBlock() {
      return this.displayMode === RADIO_CHECKBOX_STYLE.line.val || this.displayMode === RADIO_CHECKBOX_STYLE.next.val;
    },

    /**
     * Get classes for view mode of Line - Next
     * @returns {Object}
     */
    lineNextClasses: function lineNextClasses() {
      return {
        'line': this.displayMode === 'line',
        'next': this.displayMode === 'next'
      };
    },

    /**
     * Get position class depends on the configuration
     * @returns {Object}
     */
    positionClasses: function positionClasses() {
      return {
        'text-center': this.control.position === RADIO_CHECKBOX_POSITION.center.val,
        'text-right': this.control.position === RADIO_CHECKBOX_POSITION.right.val,
        'text-left': this.control.position === RADIO_CHECKBOX_POSITION.left.val
      };
    },

    /**
     * Generate the :name for the input[type=checkbox|radio]
     * @returns {string|string}
     */
    inputName: function inputName() {
      // For input[name] of Radio, they need to be the same.
      // If Control Name is Empty => Use ID instead (otherwise, control will break =)) )
      if (this.isRadio) {
        return this.controlName;
      } // For Checkbox, name will always be Array Mode (name[])


      return this.controlName + "[]";
    }
  }
});
// CONCATENATED MODULE: ./src/views/controls/RadioCheckboxControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var controls_RadioCheckboxControlvue_type_script_lang_js_ = (RadioCheckboxControlvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/controls/RadioCheckboxControl.vue





/* normalize component */

var RadioCheckboxControl_component = Object(componentNormalizer["a" /* default */])(
  controls_RadioCheckboxControlvue_type_script_lang_js_,
  RadioCheckboxControlvue_type_template_id_7b2b0ce0_render,
  RadioCheckboxControlvue_type_template_id_7b2b0ce0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var RadioCheckboxControl = (RadioCheckboxControl_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/DatePickerControl.vue?vue&type=template&id=1b7bf3e2&scoped=true&
var DatePickerControlvue_type_template_id_1b7bf3e2_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.control.singleMode)?[_c('input',{class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text","id":_vm.control.uniqueId,"name":_vm.control.name || _vm.control.uniqueId,"placeholder":_vm.control.placeholderText,"autocomplete":"off"}})]:[_c('input',{class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text","id":_vm.control.uniqueId,"placeholder":_vm.control.placeholderText,"autocomplete":"off"}}),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.value.startDate),expression:"value.startDate"}],attrs:{"type":"hidden","name":_vm.startDateFieldName},domProps:{"value":(_vm.value.startDate)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.value, "startDate", $event.target.value)}}}),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.value.endDate),expression:"value.endDate"}],attrs:{"type":"hidden","name":_vm.endDateFieldName},domProps:{"value":(_vm.value.endDate)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.value, "endDate", $event.target.value)}}})]],2)}
var DatePickerControlvue_type_template_id_1b7bf3e2_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/controls/DatePickerControl.vue?vue&type=template&id=1b7bf3e2&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.get-own-property-descriptors.js
var es7_object_get_own_property_descriptors = __webpack_require__("8e6e");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("ade3");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("53ca");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/litepicker/dist/js/main.js
var main = __webpack_require__("5360");
var main_default = /*#__PURE__*/__webpack_require__.n(main);

// EXTERNAL MODULE: ./node_modules/dayjs/dayjs.min.js
var dayjs_min = __webpack_require__("5a0c");
var dayjs_min_default = /*#__PURE__*/__webpack_require__.n(dayjs_min);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/DatePickerControl.vue?vue&type=script&lang=js&








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { Object(defineProperty["a" /* default */])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var DatePickerControlvue_type_script_lang_js_ = ({
  name: "DatePickerControl",
  mixins: [control_field_extend_mixin["a" /* CONTROL_FIELD_EXTEND_MIXIN */]],
  data: function data() {
    return {
      datepicker: null,
      currentValue: null
    };
  },
  model: {
    event: 'change',
    prop: 'value'
  },
  watch: {
    control: {
      deep: true,
      handler: function handler(val) {
        this.setOption(val);
      }
    },
    value: function value(val) {
      this.setValue(val);
    }
  },
  methods: {
    /**
     * Re-set the DatePicker Configuration
     */
    setOption: function setOption() {
      var ops = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (!Object.keys(ops).length) {
        return;
      }

      this.datepicker.setOptions(ops);
    },

    /**
     * Special Func to set Value
     * @param val
     */
    setValue: function setValue(val) {
      if (val === null || val === undefined || val === '') {
        this.datepicker.setDate(null);
        return;
      } // set for date-range


      if (Object(esm_typeof["a" /* default */])(val) === 'object' && val.startDate && val.endDate) {
        // stop if same value
        if (this.currentValue && this.currentValue.startDate === val.startDate && this.currentValue.endDate === val.endDate) {
          return;
        }

        this.datepicker.setDateRange(val.startDate, val.endDate);
        return;
      } // set by single date


      if (typeof val === 'string' || val instanceof Date) {
        // stop reset because of same date
        if (this.val === this.currentValue) {
          return;
        }

        this.datepicker.setDate(val);
      }
    },

    /**
     * onSelect get date
     * @param {Date} startDate
     * @param {Date|null} endDate
     */
    getValue: function getValue(startDate, endDate) {
      if (startDate == null) {
        return this.updateValue(null);
      } // Single-mode will have a single emit


      if (this.control.singleMode) {
        var _emitValue = startDate; // Parse to format before emit??

        if (this.control.returnType === DATE_PICKER_RETURN_TYPES.format.val) {
          _emitValue = dayjs_min_default()(startDate).format(this.control.format);
        } // emit to parent


        this.updateValue(_emitValue);
        this.currentValue = _emitValue;
        return;
      } // date-range will have {startDate: ... , endDate: ...}


      var emitValue = {
        startDate: startDate,
        endDate: endDate
      }; // Parse to format before emit??

      if (this.control.returnType === DATE_PICKER_RETURN_TYPES.format.val) {
        emitValue.startDate = dayjs_min_default()(startDate).format(this.control.format);
        emitValue.endDate = dayjs_min_default()(endDate).format(this.control.format);
      } // emit to parent


      this.updateValue(emitValue);
      this.currentValue = emitValue;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.datepicker = new main_default.a(_objectSpread(_objectSpread({
      element: document.getElementById(this.control.uniqueId)
    }, this.control), {}, {
      /**
       * Post-render processing
       */
      onRender: function onRender() {
        if (_this.control.defaultValue) {
          _this.setValue(_this.control.defaultValue);
        }
      },

      /**
       * On-Selected a Day
       * @param {Date} date
       */
      onSelect: this.getValue
    }));
  },
  beforeDestroy: function beforeDestroy() {
    this.datepicker.destroy();
  },
  computed: {
    startDateFieldName: function startDateFieldName() {
      return (this.control.name || this.control.uniqueId) + '[startDate]';
    },
    endDateFieldName: function endDateFieldName() {
      return (this.control.name || this.control.uniqueId) + '[endDate]';
    }
  }
});
// CONCATENATED MODULE: ./src/views/controls/DatePickerControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var controls_DatePickerControlvue_type_script_lang_js_ = (DatePickerControlvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/controls/DatePickerControl.vue





/* normalize component */

var DatePickerControl_component = Object(componentNormalizer["a" /* default */])(
  controls_DatePickerControlvue_type_script_lang_js_,
  DatePickerControlvue_type_template_id_1b7bf3e2_scoped_true_render,
  DatePickerControlvue_type_template_id_1b7bf3e2_scoped_true_staticRenderFns,
  false,
  null,
  "1b7bf3e2",
  null
  
)

/* harmony default export */ var DatePickerControl = (DatePickerControl_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/NumberControl.vue?vue&type=template&id=2311e100&scoped=true&
var NumberControlvue_type_template_id_2311e100_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',{class:_vm.controlFieldClass,attrs:{"id":_vm.control.uniqueId,"type":"number","name":_vm.control.name,"placeholder":_vm.control.placeholderText},domProps:{"value":_vm.number},on:{"input":function($event){return _vm.convertToNumber($event.target.value)}}})}
var NumberControlvue_type_template_id_2311e100_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/controls/NumberControl.vue?vue&type=template&id=2311e100&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/NumberControl.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//

/**
 * Number Control
 * Later
 * @focusin="previewMode = number"
 * @focusout="updatedPreview"
 */

/* harmony default export */ var NumberControlvue_type_script_lang_js_ = ({
  name: "NumberControl",
  mixins: [control_field_extend_mixin["a" /* CONTROL_FIELD_EXTEND_MIXIN */]],
  data: function data() {
    return {
      number: 0,
      stopDefaultValueAssign: true,
      previewMode: "0"
    };
  },
  methods: {
    /**
     * Convert to Number before Emit V-Model
     * @param value
     */
    convertToNumber: function convertToNumber(value) {
      var convertedVal = this.isRealNumber ? parseFloat(value) : parseInt(value, 10); // emit now

      this.updateValue(convertedVal); // re-assign val
      //this.updatedPreview()

      this.number = convertedVal;
    },

    /**
     * Updated Preview Mode (Mask preview, eg: 1,123,456.00) for Number
     * TODO: Available only v2.1
     */
    updatedPreview: function updatedPreview() {},

    /**
     * Specific set value for the Number Control from the v-model
     */
    setValue: function setValue(val) {
      this.convertToNumber(val);
    }
  },
  computed: {
    /**
     * Check if the num control is using int or float/double
     * @returns {boolean}
     */
    isRealNumber: function isRealNumber() {
      return this.control.isReal;
    }
  },
  created: function created() {
    // set default value (if exists)
    if (this.control.defaultValue) {
      this.convertToNumber(this.control.defaultValue);
    }
  }
});
// CONCATENATED MODULE: ./src/views/controls/NumberControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var controls_NumberControlvue_type_script_lang_js_ = (NumberControlvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/controls/NumberControl.vue





/* normalize component */

var NumberControl_component = Object(componentNormalizer["a" /* default */])(
  controls_NumberControlvue_type_script_lang_js_,
  NumberControlvue_type_template_id_2311e100_scoped_true_render,
  NumberControlvue_type_template_id_2311e100_scoped_true_staticRenderFns,
  false,
  null,
  "2311e100",
  null
  
)

/* harmony default export */ var NumberControl = (NumberControl_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/DropdownControl.vue?vue&type=template&id=275e5f5f&scoped=true&
var DropdownControlvue_type_template_id_275e5f5f_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('select',{class:_vm.controlFieldClass,attrs:{"id":_vm.control.uniqueId,"name":_vm.control.name || _vm.control.uniqueId,"multiple":this.control.multiple},on:{"input":function($event){return _vm.updateValue($event.target.value)}}},[(_vm.control.placeholderText)?_c('option',{attrs:{"disabled":"","selected":""},domProps:{"textContent":_vm._s(_vm.control.placeholderText)}}):_vm._e(),_vm._l((_vm.listOptions),function(optionObj){return _c('option',{key:optionObj.value,domProps:{"value":optionObj.value,"selected":_vm.value === optionObj.value,"textContent":_vm._s(optionObj.text)}})})],2)}
var DropdownControlvue_type_template_id_275e5f5f_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/controls/DropdownControl.vue?vue&type=template&id=275e5f5f&scoped=true&

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// CONCATENATED MODULE: ./src/libraries/list-item.class.js



/**
 * List-Item for Checkbox/Radio/Select
 */
var list_item_class_ListItem = function ListItem(value, text) {
  Object(classCallCheck["a" /* default */])(this, ListItem);

  Object(defineProperty["a" /* default */])(this, "value", "");

  Object(defineProperty["a" /* default */])(this, "text", "");

  this.value = value;
  this.text = text;
};


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/controls/DropdownControl.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/**
 * Dropdown Control.
 * I've been thinking all day, all night, should I use some library (select2, choices.js,...)
 * But, after some researched via https://bundlephobia.com/ , I decided to use Native Select instead
 * In order to save some KBs, the bundle is kinda bigger now @@
 * @property {ListItem[]} listOptions
 */

/* harmony default export */ var DropdownControlvue_type_script_lang_js_ = ({
  name: "DropdownControl",
  mixins: [control_field_extend_mixin["a" /* CONTROL_FIELD_EXTEND_MIXIN */]],
  data: function data() {
    return {
      listOptions: [],
      dataMode: "",
      apiURL: ""
    };
  },
  watch: {
    control: {
      deep: true,
      handler: function handler(controlObj) {
        // we cached it. If nothing change => no reload
        if ( // single check
        controlObj.dataMode !== this.dataMode || controlObj.apiURL !== this.apiURL || // list check
        controlObj.dataMode === DROPDOWN_DATA_MODES.list.val && controlObj.items.length !== this.listOptions.length) {
          return this.retrieveOptionLists();
        }
      }
    }
  },
  methods: {
    retrieveOptionLists: function retrieveOptionLists() {
      this.dataMode = this.control.dataMode;
      this.apiURL = this.control.apiURL; // pick up option data

      if (this.control.dataMode === DROPDOWN_DATA_MODES.list.val) {
        this.listOptions = this.control.items;
        return;
      } // our code goes down here? => REST-API


      if (!this.control.apiURL) {
        throw new TypeError("[Dropdown] In order to use REST-API for Dropdown. You must set your Rest-API Endpoint.");
      } // is it http/https?


      if (this.control.apiURL.indexOf("http://") < 0 && this.control.apiURL.indexOf("https://") < 0) {
        throw new TypeError("[Dropdown] Rest-API Endpoint must be valid http/https URL.");
      } // ok retrieve now


      fetch(this.control.apiURL, {
        method: "GET"
      }).then(function (result) {
        return result.json();
      }).then(this.afterRestAPICallDataSuccessfully).catch(this.restAPICallErrorHandling);
    },

    /**
     * [FOR-RestAPI-Dropdown][EVENT]
     * Appending data after success
     * @param {[]} result
     */
    afterRestAPICallDataSuccessfully: function afterRestAPICallDataSuccessfully(result) {
      var _this = this;

      if (!Array.isArray(result)) {
        throw new TypeError("[DROPDOWN-".concat(this.control.name, "] Wrong API-data format."));
      } // clear list


      this.listOptions = []; // traversal all list and add it into the list

      result.forEach(function (optionObj) {
        _this.listOptions.push(new list_item_class_ListItem(optionObj[_this.valueKey], optionObj[_this.textKey]));
      });
    },

    /**
     * [FOR-RestAPI-Dropdown][EVENT]
     * Show error for dropdown.
     */
    restAPICallErrorHandling: function restAPICallErrorHandling(e) {
      console.error("[DROPDOWN-Control-".concat(this.control.uniqueId, "] Request API to get data failed."), e);
    }
  },
  computed: {
    /**
     * [API-Only] Get Text Key
     * @returns {string}
     */
    textKey: function textKey() {
      return this.control.apiTextKey || "text";
    },

    /**
     * [API-Only] Get Text Key
     * @returns {string}
     */
    valueKey: function valueKey() {
      return this.control.apiValueKey || "value";
    }
  },
  created: function created() {
    this.retrieveOptionLists();
  }
});
// CONCATENATED MODULE: ./src/views/controls/DropdownControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var controls_DropdownControlvue_type_script_lang_js_ = (DropdownControlvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/controls/DropdownControl.vue





/* normalize component */

var DropdownControl_component = Object(componentNormalizer["a" /* default */])(
  controls_DropdownControlvue_type_script_lang_js_,
  DropdownControlvue_type_template_id_275e5f5f_scoped_true_render,
  DropdownControlvue_type_template_id_275e5f5f_scoped_true_staticRenderFns,
  false,
  null,
  "275e5f5f",
  null
  
)

/* harmony default export */ var DropdownControl = (DropdownControl_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/TextBlockConfigView.vue?vue&type=template&id=35b999c0&
var TextBlockConfigViewvue_type_template_id_35b999c0_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Text for Text-Block")]),_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.text),expression:"control.text"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text","rows":"6"},domProps:{"value":(_vm.control.text)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "text", $event.target.value)}}})])])}
var TextBlockConfigViewvue_type_template_id_35b999c0_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/control-configs/TextBlockConfigView.vue?vue&type=template&id=35b999c0&

// EXTERNAL MODULE: ./src/mixins/control-special-config-mixin.js + 5 modules
var control_special_config_mixin = __webpack_require__("8ae1");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/TextBlockConfigView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//

/* harmony default export */ var TextBlockConfigViewvue_type_script_lang_js_ = ({
  name: "TextBlockConfigView",
  mixins: [control_special_config_mixin["a" /* CONTROL_SPECIAL_CONFIG_MIXIN */]]
});
// CONCATENATED MODULE: ./src/views/control-configs/TextBlockConfigView.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_configs_TextBlockConfigViewvue_type_script_lang_js_ = (TextBlockConfigViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/control-configs/TextBlockConfigView.vue





/* normalize component */

var TextBlockConfigView_component = Object(componentNormalizer["a" /* default */])(
  control_configs_TextBlockConfigViewvue_type_script_lang_js_,
  TextBlockConfigViewvue_type_template_id_35b999c0_render,
  TextBlockConfigViewvue_type_template_id_35b999c0_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TextBlockConfigView = (TextBlockConfigView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/ButtonConfigView.vue?vue&type=template&id=d6dddb00&
var ButtonConfigViewvue_type_template_id_d6dddb00_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Button Type (Type Attribute)")]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.buttonType),expression:"control.buttonType"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.control, "buttonType", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},_vm._l((_vm.buttonTypeList),function(item){return _c('option',{key:item,domProps:{"value":item,"textContent":_vm._s(item)}})}),0)]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Button Class (Type Attribute)")]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.buttonClass),expression:"control.buttonClass"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.control, "buttonClass", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},_vm._l((_vm.buttonClasses),function(className,name){return _c('option',{key:className,domProps:{"value":className}},[_vm._v(" "+_vm._s(name)+" ("+_vm._s(className)+") ")])}),0)]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" Run validation before emitting? "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.isRunValidation),expression:"control.isRunValidation"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.control.isRunValidation)?_vm._i(_vm.control.isRunValidation,null)>-1:(_vm.control.isRunValidation)},on:{"change":function($event){var $$a=_vm.control.isRunValidation,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.control, "isRunValidation", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.control, "isRunValidation", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.control, "isRunValidation", $$c)}}}})])]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" Emitting Code "),_c('IconTooltip',{attrs:{"icon":"informationOutline","text":"V-Form will $emit an Event with <strong>YOUR CODE</strong>"}})],1),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.emitEventCode),expression:"control.emitEventCode"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.emitEventCode)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "emitEventCode", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" Emitting Value "),_c('IconTooltip',{attrs:{"icon":"informationOutline","text":"Specific Data-String when V-Form performs invoke $emit"}})],1),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.emitEventData),expression:"control.emitEventData"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.emitEventData)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "emitEventData", $event.target.value)}}})])])}
var ButtonConfigViewvue_type_template_id_d6dddb00_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/control-configs/ButtonConfigView.vue?vue&type=template&id=d6dddb00&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/ButtonConfigView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ButtonConfigViewvue_type_script_lang_js_ = ({
  name: "ButtonConfigView",
  mixins: [control_special_config_mixin["a" /* CONTROL_SPECIAL_CONFIG_MIXIN */]],
  computed: {
    buttonTypeList: function buttonTypeList() {
      return ['button', 'submit', 'clear'];
    },
    buttonClasses: function buttonClasses() {
      return this.styles.BUTTON;
    }
  }
});
// CONCATENATED MODULE: ./src/views/control-configs/ButtonConfigView.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_configs_ButtonConfigViewvue_type_script_lang_js_ = (ButtonConfigViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/control-configs/ButtonConfigView.vue





/* normalize component */

var ButtonConfigView_component = Object(componentNormalizer["a" /* default */])(
  control_configs_ButtonConfigViewvue_type_script_lang_js_,
  ButtonConfigViewvue_type_template_id_d6dddb00_render,
  ButtonConfigViewvue_type_template_id_d6dddb00_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ButtonConfigView = (ButtonConfigView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/LabelConfigView.vue?vue&type=template&id=0f07b56c&
var LabelConfigViewvue_type_template_id_0f07b56c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("For-Attribute to Control?")]),_c('select',{class:_vm.styles.FORM.FORM_CONTROL,on:{"input":_vm.selectedFor}},[_c('option',[_vm._v("None")]),_vm._l((_vm.listControlData),function(item){return _c('option',{key:item.value,domProps:{"value":item.value,"textContent":_vm._s(item.text)}})})],2)])])}
var LabelConfigViewvue_type_template_id_0f07b56c_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/control-configs/LabelConfigView.vue?vue&type=template&id=0f07b56c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/LabelConfigView.vue?vue&type=script&lang=js&




//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


var LABEL_SELECTED_CLASS = 'label-selected';
/**
 * @property {ListItem[]} listControlData
 */

/* harmony default export */ var LabelConfigViewvue_type_script_lang_js_ = ({
  name: "LabelConfigView",
  mixins: [control_special_config_mixin["a" /* CONTROL_SPECIAL_CONFIG_MIXIN */]],
  data: function data() {
    return {
      listControlData: []
    };
  },
  methods: {
    selectedFor: function selectedFor($e) {
      this.clearAllMapped();
      this.control.forAttribute = $e.target.value; // is eligible to add selected class??

      if (this.control.forAttribute) {
        this.labelMappedAssign(this.control.forAttribute);
      }
    },

    /**
     * Find the control and add it a simple class to let the configurator know which
     * label they're assigning to which control.
     * @param controlId
     */
    labelMappedAssign: function labelMappedAssign(controlId) {
      var controlDOM = document.getElementById(controlId);

      if (!controlDOM || !controlDOM.parentNode) {
        return;
      }

      controlDOM.parentNode.classList.add(LABEL_SELECTED_CLASS);
    },

    /**
     * Simply loop through all the controls and remove the `bordered` class
     * Vanilla JS rules
     */
    clearAllMapped: function clearAllMapped() {
      this.listControlData.forEach(function (controlOption) {
        var controlDOM = document.getElementById(controlOption.value);

        if (!controlDOM || !controlDOM.parentNode) {
          return;
        }

        controlDOM.parentNode.classList.remove(LABEL_SELECTED_CLASS);
      });
    }
  },
  created: function created() {
    // prepare control list and remove the current
    var pureIds = Object.keys(this.formData.controls);

    for (var _i = 0, _pureIds = pureIds; _i < _pureIds.length; _i++) {
      var controlId = _pureIds[_i];

      // Current Label => NO ID should be added
      if (controlId === this.control.uniqueId) {
        continue;
      } // Label Control => NO ID should be added


      if (this.formData.controls[controlId].type === 'label') {
        continue;
      } // option text generation


      var controlObj = this.formData.controls[controlId];
      var fieldName = "".concat(controlObj.label, " - #").concat(controlObj.uniqueId); // if name is exist => use it instead of uniqueID

      if (controlObj.name) {
        fieldName = "".concat(controlObj.label, " - ").concat(controlObj.name);
      } // add it to the list


      this.listControlData.push(new list_item_class_ListItem(controlId, fieldName));
    } // do we need to mark the border??


    if (this.control.forAttribute) {
      this.labelMappedAssign(this.control.forAttribute);
    }
  },
  beforeDestroy: function beforeDestroy() {
    this.clearAllMapped();
  }
});
// CONCATENATED MODULE: ./src/views/control-configs/LabelConfigView.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_configs_LabelConfigViewvue_type_script_lang_js_ = (LabelConfigViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/control-configs/LabelConfigView.vue





/* normalize component */

var LabelConfigView_component = Object(componentNormalizer["a" /* default */])(
  control_configs_LabelConfigViewvue_type_script_lang_js_,
  LabelConfigViewvue_type_template_id_0f07b56c_render,
  LabelConfigViewvue_type_template_id_0f07b56c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var LabelConfigView = (LabelConfigView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/RadioCheckboxConfigView.vue?vue&type=template&id=9cfe8e28&
var RadioCheckboxConfigViewvue_type_template_id_9cfe8e28_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Display Mode")]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.displayMode),expression:"control.displayMode"}],class:_vm.styles.FORM.FORM_CONTROL,on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.control, "displayMode", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},_vm._l((_vm.listDisplayModes),function(item){return _c('option',{key:item.val,domProps:{"value":item.val,"textContent":_vm._s(item.description)}})}),0)]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Display Position")]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.position),expression:"control.position"}],class:_vm.styles.FORM.FORM_CONTROL,on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.control, "position", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},_vm._l((_vm.listPositions),function(item){return _c('option',{key:item.val,domProps:{"value":item.val,"textContent":_vm._s(item.description)}})}),0)]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" List Selections "),_c('span',{staticClass:"pointer",domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('addOutline', '16px', '16px', 'green'))},on:{"click":_vm.addListItem}})]),_vm._l((_vm.control.items),function(listItem,iItem){return _c('div',{key:iItem,class:['list-selection']},[_c('div',{staticClass:"tool-block"},[_c('span',{staticClass:"pointer",domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('close', '16px', '16px', 'red'))},on:{"click":function($event){return _vm.removeListItem(iItem)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Item Value")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(listItem.value),expression:"listItem.value"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text","placeholder":"Radio/Checkbox-Value"},domProps:{"value":(listItem.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(listItem, "value", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Label Text")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(listItem.text),expression:"listItem.text"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text","placeholder":"Label text"},domProps:{"value":(listItem.text)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(listItem, "text", $event.target.value)}}})])])})],2)])}
var RadioCheckboxConfigViewvue_type_template_id_9cfe8e28_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/control-configs/RadioCheckboxConfigView.vue?vue&type=template&id=9cfe8e28&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/RadioCheckboxConfigView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var RadioCheckboxConfigViewvue_type_script_lang_js_ = ({
  name: "RadioCheckboxConfigView",
  mixins: [control_special_config_mixin["a" /* CONTROL_SPECIAL_CONFIG_MIXIN */]],
  methods: {
    /**
     * Add new List-Item for the Current Radio/Checkbox
     */
    addListItem: function addListItem() {
      this.control.items.push(new list_item_class_ListItem('', ''));
    },

    /**
     * Remove list-Item by Index of the Array
     */
    removeListItem: function removeListItem(index) {
      this.control.items.splice(index, 1);
    }
  },
  computed: {
    /**
     * Configuration for the displayMode
     */
    listDisplayModes: function listDisplayModes() {
      return RADIO_CHECKBOX_STYLE;
    },

    /**
     * Configuration for the position
     */
    listPositions: function listPositions() {
      return RADIO_CHECKBOX_POSITION;
    }
  }
});
// CONCATENATED MODULE: ./src/views/control-configs/RadioCheckboxConfigView.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_configs_RadioCheckboxConfigViewvue_type_script_lang_js_ = (RadioCheckboxConfigViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/control-configs/RadioCheckboxConfigView.vue





/* normalize component */

var RadioCheckboxConfigView_component = Object(componentNormalizer["a" /* default */])(
  control_configs_RadioCheckboxConfigViewvue_type_script_lang_js_,
  RadioCheckboxConfigViewvue_type_template_id_9cfe8e28_render,
  RadioCheckboxConfigViewvue_type_template_id_9cfe8e28_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var RadioCheckboxConfigView = (RadioCheckboxConfigView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/NumberConfigView.vue?vue&type=template&id=512d0063&
var NumberConfigViewvue_type_template_id_512d0063_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" Is Real Number (Float/Double) "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.isReal),expression:"control.isReal"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.control.isReal)?_vm._i(_vm.control.isReal,null)>-1:(_vm.control.isReal)},on:{"change":function($event){var $$a=_vm.control.isReal,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.control, "isReal", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.control, "isReal", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.control, "isReal", $$c)}}}})])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.control.isReal),expression:"control.isReal"}],class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Decimal Places")]),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.control.decimalPlace),expression:"control.decimalPlace",modifiers:{"number":true}}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"number","step":"1","min":"0","max":"10"},domProps:{"value":(_vm.control.decimalPlace)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "decimalPlace", _vm._n($event.target.value))},"blur":function($event){return _vm.$forceUpdate()}}})])])}
var NumberConfigViewvue_type_template_id_512d0063_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/control-configs/NumberConfigView.vue?vue&type=template&id=512d0063&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/NumberConfigView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var NumberConfigViewvue_type_script_lang_js_ = ({
  name: "NumberConfigView",
  mixins: [control_special_config_mixin["a" /* CONTROL_SPECIAL_CONFIG_MIXIN */]]
});
// CONCATENATED MODULE: ./src/views/control-configs/NumberConfigView.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_configs_NumberConfigViewvue_type_script_lang_js_ = (NumberConfigViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/control-configs/NumberConfigView.vue





/* normalize component */

var NumberConfigView_component = Object(componentNormalizer["a" /* default */])(
  control_configs_NumberConfigViewvue_type_script_lang_js_,
  NumberConfigViewvue_type_template_id_512d0063_render,
  NumberConfigViewvue_type_template_id_512d0063_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var NumberConfigView = (NumberConfigView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/DatePickerConfigView.vue?vue&type=template&id=8943775c&
var DatePickerConfigViewvue_type_template_id_8943775c_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Data Return Type")]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.returnType),expression:"control.returnType"}],class:_vm.styles.FORM.FORM_CONTROL,on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.control, "returnType", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},_vm._l((_vm.listReturnTypes),function(item){return _c('option',{key:item.val,domProps:{"value":item.val,"textContent":_vm._s(item.description)}})}),0)]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.control.returnType === _vm.listReturnTypes.format.val),expression:"control.returnType === listReturnTypes.format.val"}],class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Date Format")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.format),expression:"control.format"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.format)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "format", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Start Date of the Week")]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.firstDay),expression:"control.firstDay"}],class:_vm.styles.FORM.FORM_CONTROL,on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.control, "firstDay", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},_vm._l((_vm.listStartDates),function(item){return _c('option',{key:item.val,domProps:{"value":item.val,"textContent":_vm._s(item.description)}})}),0)]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" Minimum Date "),_c('IconTooltip',{attrs:{"icon":"informationOutline","text":"Follow this format: YYYY-MM-DD. Empty for none."}})],1),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.minDate),expression:"control.minDate"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.minDate)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "minDate", $event.target.value)}}}),_c('small',[_vm._v("Minimum Date can be selected in the Calendar")])]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" Maximum Date "),_c('IconTooltip',{attrs:{"icon":"informationOutline","text":"Follow this format: YYYY-MM-DD. Empty for none."}})],1),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.maxDate),expression:"control.maxDate"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.maxDate)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "maxDate", $event.target.value)}}}),_c('small',[_vm._v("Maximum Date can be selected in the Calendar")])]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" Enable Date-Range? "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.singleMode),expression:"control.singleMode"}],attrs:{"type":"checkbox","name":"enableDateRange","true-value":false,"false-value":true},domProps:{"checked":Array.isArray(_vm.control.singleMode)?_vm._i(_vm.control.singleMode,null)>-1:_vm._q(_vm.control.singleMode,false)},on:{"change":function($event){var $$a=_vm.control.singleMode,$$el=$event.target,$$c=$$el.checked?(false):(true);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.control, "singleMode", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.control, "singleMode", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.control, "singleMode", $$c)}}}})])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.control.singleMode),expression:"!control.singleMode"}],class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Minimum Day in Range (0 for none)")]),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.control.minDays),expression:"control.minDays",modifiers:{"number":true}}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"number","step":"1"},domProps:{"value":(_vm.control.minDays)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "minDays", _vm._n($event.target.value))},"blur":function($event){return _vm.$forceUpdate()}}})]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(!_vm.control.singleMode),expression:"!control.singleMode"}],class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Maximum Day in Range (0 for none)")]),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.control.maxDays),expression:"control.maxDays",modifiers:{"number":true}}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"number","step":"1"},domProps:{"value":(_vm.control.maxDays)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "maxDays", _vm._n($event.target.value))},"blur":function($event){return _vm.$forceUpdate()}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Number of Months")]),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.control.numberOfMonths),expression:"control.numberOfMonths",modifiers:{"number":true}}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"number","step":"1"},domProps:{"value":(_vm.control.numberOfMonths)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "numberOfMonths", _vm._n($event.target.value))},"blur":function($event){return _vm.$forceUpdate()}}}),_c('small',[_vm._v("Number of Months will be shown up")])]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Number of Columns")]),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.control.numberOfColumns),expression:"control.numberOfColumns",modifiers:{"number":true}}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"number","step":"1"},domProps:{"value":(_vm.control.numberOfColumns)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "numberOfColumns", _vm._n($event.target.value))},"blur":function($event){return _vm.$forceUpdate()}}}),_c('small',[_vm._v("Number of Columns will be shown up")])])])}
var DatePickerConfigViewvue_type_template_id_8943775c_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/control-configs/DatePickerConfigView.vue?vue&type=template&id=8943775c&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/DatePickerConfigView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var DatePickerConfigViewvue_type_script_lang_js_ = ({
  name: "DatePickerConfigView",
  mixins: [control_special_config_mixin["a" /* CONTROL_SPECIAL_CONFIG_MIXIN */]],
  computed: {
    /**
     * Return types of DatePicker
     */
    listReturnTypes: function listReturnTypes() {
      return DATE_PICKER_RETURN_TYPES;
    },

    /**
     * Start dates of the Week
     */
    listStartDates: function listStartDates() {
      return DATE_PICKER_START_DATES;
    }
  }
});
// CONCATENATED MODULE: ./src/views/control-configs/DatePickerConfigView.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_configs_DatePickerConfigViewvue_type_script_lang_js_ = (DatePickerConfigViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/control-configs/DatePickerConfigView.vue





/* normalize component */

var DatePickerConfigView_component = Object(componentNormalizer["a" /* default */])(
  control_configs_DatePickerConfigViewvue_type_script_lang_js_,
  DatePickerConfigViewvue_type_template_id_8943775c_render,
  DatePickerConfigViewvue_type_template_id_8943775c_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DatePickerConfigView = (DatePickerConfigView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/TextConfigView.vue?vue&type=template&id=52a50861&
var TextConfigViewvue_type_template_id_52a50861_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Number of Rows")]),_c('input',{directives:[{name:"model",rawName:"v-model.number",value:(_vm.control.rows),expression:"control.rows",modifiers:{"number":true}}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"number","step":"1"},domProps:{"value":(_vm.control.rows)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "rows", _vm._n($event.target.value))},"blur":function($event){return _vm.$forceUpdate()}}}),_c('small',[_vm._v("`row` HTML Attribute Configuration")])])])}
var TextConfigViewvue_type_template_id_52a50861_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/control-configs/TextConfigView.vue?vue&type=template&id=52a50861&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/TextConfigView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var TextConfigViewvue_type_script_lang_js_ = ({
  name: "TextConfigView",
  mixins: [control_special_config_mixin["a" /* CONTROL_SPECIAL_CONFIG_MIXIN */]]
});
// CONCATENATED MODULE: ./src/views/control-configs/TextConfigView.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_configs_TextConfigViewvue_type_script_lang_js_ = (TextConfigViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/control-configs/TextConfigView.vue





/* normalize component */

var TextConfigView_component = Object(componentNormalizer["a" /* default */])(
  control_configs_TextConfigViewvue_type_script_lang_js_,
  TextConfigViewvue_type_template_id_52a50861_render,
  TextConfigViewvue_type_template_id_52a50861_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var TextConfigView = (TextConfigView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/DropdownConfigView.vue?vue&type=template&id=58d24939&
var DropdownConfigViewvue_type_template_id_58d24939_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" Multiple Selection? "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.multiple),expression:"control.multiple"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.control.multiple)?_vm._i(_vm.control.multiple,null)>-1:(_vm.control.multiple)},on:{"change":function($event){var $$a=_vm.control.multiple,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.control, "multiple", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.control, "multiple", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.control, "multiple", $$c)}}}})])]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Option-Data-List Mode")]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.dataMode),expression:"control.dataMode"}],class:_vm.styles.FORM.FORM_CONTROL,on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.control, "dataMode", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},_vm._l((_vm.listDataModes),function(item){return _c('option',{key:item.val,domProps:{"value":item.val,"textContent":_vm._s(item.description)}})}),0)]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(this.control.dataMode === _vm.listDataModes.api.val),expression:"this.control.dataMode === listDataModes.api.val"}]},[_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" Rest-API URL "),_c('icon-tooltip',{attrs:{"icon":"informationOutline","text":"Your API-Endpoint URL - GET Method. It must return an Array. Read more on Documentation"}})],1),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.apiURL),expression:"control.apiURL"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text","placeholder":"https://your-domain/rest-api/get-list/..."},domProps:{"value":(_vm.control.apiURL)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "apiURL", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" Value Key of your Object "),_c('icon-tooltip',{attrs:{"icon":"informationOutline","text":"[{'value': '',...}] => value"}})],1),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.apiValueKey),expression:"control.apiValueKey"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.apiValueKey)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "apiValueKey", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" Text Key of your Object "),_c('icon-tooltip',{attrs:{"icon":"informationOutline","text":"[{'text': '',...}] => text"}})],1),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.apiTextKey),expression:"control.apiTextKey"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.apiTextKey)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "apiTextKey", $event.target.value)}}})])]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(this.control.dataMode === _vm.listDataModes.list.val),expression:"this.control.dataMode === listDataModes.list.val"}],class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" List Options "),_c('span',{staticClass:"pointer",domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('addOutline', '16px', '16px', 'green'))},on:{"click":_vm.addListItem}})]),_vm._l((_vm.control.items),function(listItem,iItem){return _c('div',{key:iItem,class:['list-selection']},[_c('div',{staticClass:"tool-block"},[_c('span',{staticClass:"pointer",domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('close', '16px', '16px', 'red'))},on:{"click":function($event){return _vm.removeListItem(iItem)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Item Value")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(listItem.value),expression:"listItem.value"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text","placeholder":"Radio-Value"},domProps:{"value":(listItem.value)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(listItem, "value", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Label Text")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(listItem.text),expression:"listItem.text"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text","placeholder":"Label text"},domProps:{"value":(listItem.text)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(listItem, "text", $event.target.value)}}})])])})],2)])}
var DropdownConfigViewvue_type_template_id_58d24939_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/control-configs/DropdownConfigView.vue?vue&type=template&id=58d24939&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/control-configs/DropdownConfigView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var DropdownConfigViewvue_type_script_lang_js_ = ({
  name: "DropdownConfigView",
  mixins: [control_special_config_mixin["a" /* CONTROL_SPECIAL_CONFIG_MIXIN */]],
  methods: {
    /**
     * Add new List-Item for the Current Radio/Checkbox
     */
    addListItem: function addListItem() {
      this.control.items.push(new list_item_class_ListItem('', ''));
    },

    /**
     * Remove list-Item by Index of the Array
     */
    removeListItem: function removeListItem(index) {
      this.control.items.splice(index, 1);
    }
  },
  computed: {
    /**
     * Dropdown Data Modes List
     */
    listDataModes: function listDataModes() {
      return DROPDOWN_DATA_MODES;
    }
  }
});
// CONCATENATED MODULE: ./src/views/control-configs/DropdownConfigView.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_configs_DropdownConfigViewvue_type_script_lang_js_ = (DropdownConfigViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/control-configs/DropdownConfigView.vue





/* normalize component */

var DropdownConfigView_component = Object(componentNormalizer["a" /* default */])(
  control_configs_DropdownConfigViewvue_type_script_lang_js_,
  DropdownConfigViewvue_type_template_id_58d24939_render,
  DropdownConfigViewvue_type_template_id_58d24939_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var DropdownConfigView = (DropdownConfigView_component.exports);
// CONCATENATED MODULE: ./src/configs/controls.js



/**
 * Supported Controls in Vue-Form-Builder
 * @author Phat Tran
 */


 // Control-GUI-Component










 // Control-Config-Component









var CONTROLS = {
  input: {
    name: "input_field",
    description: "input_field",
    group: 'data_entry',
    exampleImage: 'control_input',
    // component mapping
    fieldComponent: InputControl
  },
  number: {
    name: "number_input_field",
    description: "number_input_field",
    exampleImage: 'control_number',
    configData: {
      isReal: false,
      // integer or real (float/double)
      decimalPlace: 1 // [For Real] 0.xxx?? (x = num of places)

    },
    fieldComponent: NumberControl,
    configComponent: NumberConfigView,

    /**
     * As same like Vue-JS Property Default Data
     * Specific field need some special data-type/structure, they need to
     * put the creation in a factory method.
     * It must return a value.
     */
    rendererDefaultData: function rendererDefaultData() {
      return 0;
    }
  },
  text: {
    name: "text_field",
    description: "text_field",
    exampleImage: 'control_textarea',
    // config data for the input field - it will be merge with the CONTROL_DEFAULT_DATA
    configData: {
      rows: 3 // numeric

    },
    // component mapping
    fieldComponent: TextControl,
    configComponent: TextConfigView
  },
  // I would love to support this, but the thing is, many rich editors are too large:
  // js: 150KB+
  // css: 30KB+
  // So 2.0.0 won't have this field.
  // richText: {
  //     name: "Rich-Text Field",
  //     description: "Multiple line text field - Rich Editor (WYSIWYG)",
  // },
  date: {
    name: "date_picker",
    description: "date_picker",
    exampleImage: 'control_date',
    configData: {
      format: "DD/MM/YYYY",
      firstDay: DATE_PICKER_START_DATES.monday.val,
      // 0 Sunday, 1 Monday,...
      numberOfMonths: 1,
      // Number of Month(s) will be shown
      numberOfColumns: 1,
      // Number of Column(s) will be shown
      minDate: null,
      // min day (less => can't select)
      maxDate: null,
      // max day (more => can't select),
      singleMode: true,
      // date or date-range
      // for date-range
      minDays: 0,
      // min-day range
      maxDays: 0,
      // max-day range
      returnType: DATE_PICKER_RETURN_TYPES.format.val // specific return type

    },
    fieldComponent: DatePickerControl,
    configComponent: DatePickerConfigView
  },
  dropDown: {
    name: "dropdown",
    description: "dropdown",
    group: "list_elements",
    exampleImage: 'control_dropdown',
    configData: {
      dataMode: DROPDOWN_DATA_MODES.list.val,
      // normal - api
      multiple: false,
      // is multiple selection

      /**
       * @var {ListItem[]} items
       */
      items: [],
      // for normal hard-list
      apiURL: "",
      // for api-request - must be entered
      apiTextKey: "text",
      // <option>TEXT</option>
      apiValueKey: "value" // <option value=value>...</option>

    },
    fieldComponent: DropdownControl,
    configComponent: DropdownConfigView
  },
  checkbox: {
    name: "checkbox_list",
    description: "checkbox_list",
    exampleImage: 'control_checkbox',
    configData: {
      displayMode: RADIO_CHECKBOX_STYLE.line.val,
      // line by line / next to each others / 2 items per line
      position: RADIO_CHECKBOX_POSITION.left.val,
      // POSITION

      /**
       * @var {ListItem[]} items
       */
      items: [] // list-item

    },
    fieldComponent: RadioCheckboxControl,
    configComponent: RadioCheckboxConfigView,
    rendererDefaultData: function rendererDefaultData() {
      return [];
    }
  },
  radio: {
    name: "radio_list",
    description: "radio_list",
    exampleImage: 'control_radiobutton',
    configData: {
      displayMode: RADIO_CHECKBOX_STYLE.line.val,
      // line by line / next to each others / 2 items per line
      position: RADIO_CHECKBOX_POSITION.left.val,
      // POSITION

      /**
       * @var {ListItem[]} items
       */
      items: [] // list-item

    },
    fieldComponent: RadioCheckboxControl,
    configComponent: RadioCheckboxConfigView
  },
  textBlock: {
    name: "text_block",
    description: "text_block",
    exampleImage: 'control_textblock',
    group: "others",
    disableValidation: true,
    disableValue: true,
    // if you provide this, the control field value will not be recorded.
    fieldComponent: TextBlockControl,
    configComponent: TextBlockConfigView,
    configData: {
      text: ""
    }
  },
  button: {
    name: "button",
    description: "button",
    exampleImage: 'control_button',
    disableValidation: true,
    disableValue: true,
    configData: {
      buttonClass: styles["a" /* STYLES */].BUTTON.PRIMARY,
      buttonType: "button",
      // submit/reset/button/...
      emitEventCode: "",
      // like: "BtnClicked/clicked/change"
      emitEventData: "",
      // special data to emit to let you know which button is clicked
      // if this is true => validation will be run before the real invoke method
      isRunValidation: false,
      // Override here in order to not show the Label
      isShowLabel: false
    },
    fieldComponent: ButtonControl,
    configComponent: ButtonConfigView
  }
};
var CONTROLS2 = {
  input: {
    name: "input_field",
    description: "input_field",
    icon: 'editPencil',
    // Follow ICON in `icon-facade.js` to see how it works.
    // component mapping
    fieldComponent: InputControl
  },
  number: {
    name: "number_input_field",
    description: "number_input_field",
    configData: {
      isReal: false,
      // integer or real (float/double)
      decimalPlace: 1 // [For Real] 0.xxx?? (x = num of places)

    },
    fieldComponent: NumberControl,
    configComponent: NumberConfigView,

    /**
     * As same like Vue-JS Property Default Data
     * Specific field need some special data-type/structure, they need to
     * put the creation in a factory method.
     * It must return a value.
     */
    rendererDefaultData: function rendererDefaultData() {
      return 0;
    }
  },
  text: {
    name: "text_field",
    description: "text_field",
    // config data for the input field - it will be merge with the CONTROL_DEFAULT_DATA
    configData: {
      rows: 3 // numeric

    },
    // component mapping
    fieldComponent: TextControl,
    configComponent: TextConfigView
  },
  // I would love to support this, but the thing is, many rich editors are too large:
  // js: 150KB+
  // css: 30KB+
  // So 2.0.0 won't have this field.
  // richText: {
  //     name: "Rich-Text Field",
  //     description: "Multiple line text field - Rich Editor (WYSIWYG)",
  // },
  date: {
    name: "date_picker",
    description: "date_picker",
    configData: {
      format: "DD/MM/YYYY",
      firstDay: DATE_PICKER_START_DATES.monday.val,
      // 0 Sunday, 1 Monday,...
      numberOfMonths: 1,
      // Number of Month(s) will be shown
      numberOfColumns: 1,
      // Number of Column(s) will be shown
      minDate: null,
      // min day (less => can't select)
      maxDate: null,
      // max day (more => can't select),
      singleMode: true,
      // date or date-range
      // for date-range
      minDays: 0,
      // min-day range
      maxDays: 0,
      // max-day range
      returnType: DATE_PICKER_RETURN_TYPES.format.val // specific return type

    },
    fieldComponent: DatePickerControl,
    configComponent: DatePickerConfigView
  },
  // fileUpload: {
  //     name: "File Upload",
  //     description: "Upload single file through API",
  //
  //     configData: {
  //         uploadMode: FILE_UPLOAD_MODES.normal.val,
  //         apiURL: "", // API-Url to upload
  //     },
  // },
  dropDown: {
    name: "dropdown",
    description: "dropdown",
    configData: {
      dataMode: DROPDOWN_DATA_MODES.list.val,
      // normal - api
      multiple: false,
      // is multiple selection

      /**
       * @var {ListItem[]} items
       */
      items: [],
      // for normal hard-list
      apiURL: "",
      // for api-request - must be entered
      apiTextKey: "text",
      // <option>TEXT</option>
      apiValueKey: "value" // <option value=value>...</option>

    },
    fieldComponent: DropdownControl,
    configComponent: DropdownConfigView
  },
  checkbox: {
    name: "checkbox_list",
    description: "checkbox_list",
    configData: {
      displayMode: RADIO_CHECKBOX_STYLE.line.val,
      // line by line / next to each others / 2 items per line
      position: RADIO_CHECKBOX_POSITION.left.val,
      // POSITION

      /**
       * @var {ListItem[]} items
       */
      items: [] // list-item

    },
    fieldComponent: RadioCheckboxControl,
    configComponent: RadioCheckboxConfigView,
    rendererDefaultData: function rendererDefaultData() {
      return [];
    }
  },
  radio: {
    name: "radio_list",
    description: "radio_list",
    configData: {
      displayMode: RADIO_CHECKBOX_STYLE.line.val,
      // line by line / next to each others / 2 items per line
      position: RADIO_CHECKBOX_POSITION.left.val,
      // POSITION

      /**
       * @var {ListItem[]} items
       */
      items: [] // list-item

    },
    fieldComponent: RadioCheckboxControl,
    configComponent: RadioCheckboxConfigView
  },
  label: {
    name: "label",
    description: "Simple label text show up in your Form",
    disableValue: true,
    configData: {
      forAttribute: null,
      // `for` for any control? (except the Label)
      // Override here in order to not show the Label
      isShowLabel: false
    },
    // no need validation
    disableValidation: true,
    fieldComponent: LabelControl,
    configComponent: LabelConfigView
  },
  button: {
    name: "button",
    description: "Simple button for your own purpose",
    disableValidation: true,
    disableValue: true,
    configData: {
      buttonClass: styles["a" /* STYLES */].BUTTON.PRIMARY,
      buttonType: "button",
      // submit/reset/button/...
      emitEventCode: "",
      // like: "BtnClicked/clicked/change"
      emitEventData: "",
      // special data to emit to let you know which button is clicked
      // if this is true => validation will be run before the real invoke method
      isRunValidation: false,
      // Override here in order to not show the Label
      isShowLabel: false
    },
    fieldComponent: ButtonControl,
    configComponent: ButtonConfigView
  },
  emptyBlock: {
    name: "empty_block",
    description: "Empty block to design your section/row.",
    disableValidation: true,
    disableValue: true,
    fieldComponent: EmptyBlockControl,
    configData: {
      // Override here in order to not show the Label
      isShowLabel: false
    }
  },
  textBlock: {
    name: "text_block",
    description: "Block with text only (without any controls)",
    disableValidation: true,
    disableValue: true,
    // if you provide this, the control field value will not be recorded.
    fieldComponent: TextBlockControl,
    configComponent: TextBlockConfigView,
    configData: {
      text: ""
    }
  }
};
var CONTROL_DEFAULT_DATA = {
  // default configuration
  'uniqueId': '',
  // :id
  'type': '',
  // control type...
  'name': '',
  // :name
  'label': '',
  'subLabel': '',
  'isShowLabel': true,
  'placeholderText': '',
  // :placeholder
  'containerClass': styles["a" /* STYLES */].COLUMNS.COL4,
  'additionalContainerClass': '',
  // :class for the <div> outer container
  'additionalFieldClass': '',
  // :class for <input> <select> ...
  'additionalLabelClass': '',
  // :class for the <label>
  'defaultValue': '',

  /**
   * Validation that applied to the control
   * @var {ValidationRule[]} validations
   */
  'validations': [] // data of the others - coming up later

};
/**
 * Create new control data
 * @param controlKey
 * @returns {CONTROL_DEFAULT_DATA}
 */

function createControlData(controlKey) {
  var newData = Object.assign({}, CONTROL_DEFAULT_DATA, CONTROLS[controlKey].configData || {}); // set default data

  newData.label = CONTROLS[controlKey].name;
  newData.type = controlKey; // unique ID is a must - I used UUIDv4 => 99% Unique

  newData.uniqueId = "control-" + helper["a" /* HELPER */].getUUIDv4();
  return newData;
}



/***/ }),

/***/ "8e6e":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__("5ca1");
var ownKeys = __webpack_require__("990b");
var toIObject = __webpack_require__("6821");
var gOPD = __webpack_require__("11e9");
var createProperty = __webpack_require__("f1ae");

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});


/***/ }),

/***/ "9093":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__("ce10");
var hiddenKeys = __webpack_require__("e11e").concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),

/***/ "990b":
/***/ (function(module, exports, __webpack_require__) {

// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__("9093");
var gOPS = __webpack_require__("2621");
var anObject = __webpack_require__("cb7c");
var Reflect = __webpack_require__("7726").Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};


/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c6c":
/***/ (function(module, exports, __webpack_require__) {

// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__("2b4c")('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__("32e9")(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a101":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;
var $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;

var exported;

if (!$WeakMap) {
	// eslint-disable-next-line no-unused-vars
	exported = function isWeakSet(x) {
		// `WeakSet` is not present in this environment.
		return false;
	};
}

var $mapHas = $WeakMap ? $WeakMap.prototype.has : null;
var $setHas = $WeakSet ? $WeakSet.prototype.has : null;
if (!exported && !$setHas) {
	// eslint-disable-next-line no-unused-vars
	module.exports = function isWeakSet(x) {
		// `WeakSet` does not have a `has` method
		return false;
	};
}

module.exports = exported || function isWeakSet(x) {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$setHas.call(x, $setHas);
		if ($mapHas) {
			try {
				$mapHas.call(x, $mapHas);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $WeakSet; // core-js workaround, pre-v3
	} catch (e) {}
	return false;
};


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__("cb7c");
var toObject = __webpack_require__("4bf8");
var toLength = __webpack_require__("9def");
var toInteger = __webpack_require__("4588");
var advanceStringIndex = __webpack_require__("0390");
var regExpExec = __webpack_require__("5f1b");
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = defined(this);
      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
      return fn !== undefined
        ? fn.call(searchValue, O, replaceValue)
        : $replace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      var res = maybeCallNative($replace, regexp, this, replaceValue);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);
      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;
        results.push(result);
        if (!global) break;
        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }
      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];
        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

    // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "a6c9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "a786":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VALIDATION_RULES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ValidationRule; });
/* harmony import */ var C_Users_Norton_azure_vue_form_builder_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d4ec");
/* harmony import */ var C_Users_Norton_azure_vue_form_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ade3");



/**
 * Validation Rules of Vue-Form-Builder
 * - desc: Validation Rule Info
 * - needValue - boolean: Need additional value from user or not? True is yes
 * - errorMessage: default error message, can be edit by the users
 * -
 */
var VALIDATION_RULES = {
  required: {
    desc: "Field must have value (at least length must be 1)",
    needValue: false,
    errorMessage: "This field is required"
  },
  min: {
    desc: "Minimum length of the value. For number field, it will be the value (not length)",
    needValue: true,
    valueInfo: "Number",
    errorMessage: "Minimum value for this field is :min"
  },
  max: {
    desc: "Maximum length of the value. For number field, it will be the value (not length)",
    needValue: true,
    valueInfo: "Number",
    errorMessage: "Maximum value for this field is :max"
  },
  isEmail: {
    desc: "Validate email address",
    needValue: false,
    errorMessage: "Wrong email address format"
  },
  regex: {
    desc: "Validation the field by using your own Regex Rule",
    needValue: true,
    valueInfo: "Your Regex Rule here - JavaScript",
    errorMessage: "This field value doesn't match with the rule"
  },
  sameAs: {
    desc: "Check if the field has same value with another field",
    needValue: true,
    valueInfo: "The field name you want to check with",
    errorMessage: "This field value doesn't as same as :sameAs"
  },
  customClosure: {
    desc: "Invoke your own method to check your field",
    needValue: true,
    valueInfo: "Your method name",
    errorMessage: "Custom validation failed."
  }
};
/**
 * Add Validation Rule for the Control Validation
 * @param ruleType
 * @returns {{errorMessage: (string), type: (string)}}
 */

var ValidationRule =
/**
 * Needed properties
 */
function ValidationRule(ruleType, customErrorMessage) {
  Object(C_Users_Norton_azure_vue_form_builder_node_modules_babel_runtime_helpers_esm_classCallCheck__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(this, ValidationRule);

  Object(C_Users_Norton_azure_vue_form_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, "ruleType", "");

  Object(C_Users_Norton_azure_vue_form_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, "errorMessage", "");

  Object(C_Users_Norton_azure_vue_form_builder_node_modules_babel_runtime_helpers_esm_defineProperty__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(this, "additionalValue", "");

  this.ruleType = ruleType;

  if (ruleType) {
    this.errorMessage = customErrorMessage || VALIDATION_RULES[ruleType].errorMessage || "";
  }
};



/***/ }),

/***/ "aa47":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MultiDrag", function() { return MultiDragPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Sortable", function() { return Sortable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Swap", function() { return SwapPlugin; });
/**!
 * Sortable 1.10.2
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var version = "1.10.2";

function userAgent(pattern) {
  if (typeof window !== 'undefined' && window.navigator) {
    return !!
    /*@__PURE__*/
    navigator.userAgent.match(pattern);
  }
}

var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
var Edge = userAgent(/Edge/i);
var FireFox = userAgent(/firefox/i);
var Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
var IOS = userAgent(/iP(ad|od|hone)/i);
var ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);

var captureMode = {
  capture: false,
  passive: false
};

function on(el, event, fn) {
  el.addEventListener(event, fn, !IE11OrLess && captureMode);
}

function off(el, event, fn) {
  el.removeEventListener(event, fn, !IE11OrLess && captureMode);
}

function matches(
/**HTMLElement*/
el,
/**String*/
selector) {
  if (!selector) return;
  selector[0] === '>' && (selector = selector.substring(1));

  if (el) {
    try {
      if (el.matches) {
        return el.matches(selector);
      } else if (el.msMatchesSelector) {
        return el.msMatchesSelector(selector);
      } else if (el.webkitMatchesSelector) {
        return el.webkitMatchesSelector(selector);
      }
    } catch (_) {
      return false;
    }
  }

  return false;
}

function getParentOrHost(el) {
  return el.host && el !== document && el.host.nodeType ? el.host : el.parentNode;
}

function closest(
/**HTMLElement*/
el,
/**String*/
selector,
/**HTMLElement*/
ctx, includeCTX) {
  if (el) {
    ctx = ctx || document;

    do {
      if (selector != null && (selector[0] === '>' ? el.parentNode === ctx && matches(el, selector) : matches(el, selector)) || includeCTX && el === ctx) {
        return el;
      }

      if (el === ctx) break;
      /* jshint boss:true */
    } while (el = getParentOrHost(el));
  }

  return null;
}

var R_SPACE = /\s+/g;

function toggleClass(el, name, state) {
  if (el && name) {
    if (el.classList) {
      el.classList[state ? 'add' : 'remove'](name);
    } else {
      var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
      el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
    }
  }
}

function css(el, prop, val) {
  var style = el && el.style;

  if (style) {
    if (val === void 0) {
      if (document.defaultView && document.defaultView.getComputedStyle) {
        val = document.defaultView.getComputedStyle(el, '');
      } else if (el.currentStyle) {
        val = el.currentStyle;
      }

      return prop === void 0 ? val : val[prop];
    } else {
      if (!(prop in style) && prop.indexOf('webkit') === -1) {
        prop = '-webkit-' + prop;
      }

      style[prop] = val + (typeof val === 'string' ? '' : 'px');
    }
  }
}

function matrix(el, selfOnly) {
  var appliedTransforms = '';

  if (typeof el === 'string') {
    appliedTransforms = el;
  } else {
    do {
      var transform = css(el, 'transform');

      if (transform && transform !== 'none') {
        appliedTransforms = transform + ' ' + appliedTransforms;
      }
      /* jshint boss:true */

    } while (!selfOnly && (el = el.parentNode));
  }

  var matrixFn = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  /*jshint -W056 */

  return matrixFn && new matrixFn(appliedTransforms);
}

function find(ctx, tagName, iterator) {
  if (ctx) {
    var list = ctx.getElementsByTagName(tagName),
        i = 0,
        n = list.length;

    if (iterator) {
      for (; i < n; i++) {
        iterator(list[i], i);
      }
    }

    return list;
  }

  return [];
}

function getWindowScrollingElement() {
  var scrollingElement = document.scrollingElement;

  if (scrollingElement) {
    return scrollingElement;
  } else {
    return document.documentElement;
  }
}
/**
 * Returns the "bounding client rect" of given element
 * @param  {HTMLElement} el                       The element whose boundingClientRect is wanted
 * @param  {[Boolean]} relativeToContainingBlock  Whether the rect should be relative to the containing block of (including) the container
 * @param  {[Boolean]} relativeToNonStaticParent  Whether the rect should be relative to the relative parent of (including) the contaienr
 * @param  {[Boolean]} undoScale                  Whether the container's scale() should be undone
 * @param  {[HTMLElement]} container              The parent the element will be placed in
 * @return {Object}                               The boundingClientRect of el, with specified adjustments
 */


function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
  if (!el.getBoundingClientRect && el !== window) return;
  var elRect, top, left, bottom, right, height, width;

  if (el !== window && el !== getWindowScrollingElement()) {
    elRect = el.getBoundingClientRect();
    top = elRect.top;
    left = elRect.left;
    bottom = elRect.bottom;
    right = elRect.right;
    height = elRect.height;
    width = elRect.width;
  } else {
    top = 0;
    left = 0;
    bottom = window.innerHeight;
    right = window.innerWidth;
    height = window.innerHeight;
    width = window.innerWidth;
  }

  if ((relativeToContainingBlock || relativeToNonStaticParent) && el !== window) {
    // Adjust for translate()
    container = container || el.parentNode; // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
    // Not needed on <= IE11

    if (!IE11OrLess) {
      do {
        if (container && container.getBoundingClientRect && (css(container, 'transform') !== 'none' || relativeToNonStaticParent && css(container, 'position') !== 'static')) {
          var containerRect = container.getBoundingClientRect(); // Set relative to edges of padding box of container

          top -= containerRect.top + parseInt(css(container, 'border-top-width'));
          left -= containerRect.left + parseInt(css(container, 'border-left-width'));
          bottom = top + elRect.height;
          right = left + elRect.width;
          break;
        }
        /* jshint boss:true */

      } while (container = container.parentNode);
    }
  }

  if (undoScale && el !== window) {
    // Adjust for scale()
    var elMatrix = matrix(container || el),
        scaleX = elMatrix && elMatrix.a,
        scaleY = elMatrix && elMatrix.d;

    if (elMatrix) {
      top /= scaleY;
      left /= scaleX;
      width /= scaleX;
      height /= scaleY;
      bottom = top + height;
      right = left + width;
    }
  }

  return {
    top: top,
    left: left,
    bottom: bottom,
    right: right,
    width: width,
    height: height
  };
}
/**
 * Checks if a side of an element is scrolled past a side of its parents
 * @param  {HTMLElement}  el           The element who's side being scrolled out of view is in question
 * @param  {String}       elSide       Side of the element in question ('top', 'left', 'right', 'bottom')
 * @param  {String}       parentSide   Side of the parent in question ('top', 'left', 'right', 'bottom')
 * @return {HTMLElement}               The parent scroll element that the el's side is scrolled past, or null if there is no such element
 */


function isScrolledPast(el, elSide, parentSide) {
  var parent = getParentAutoScrollElement(el, true),
      elSideVal = getRect(el)[elSide];
  /* jshint boss:true */

  while (parent) {
    var parentSideVal = getRect(parent)[parentSide],
        visible = void 0;

    if (parentSide === 'top' || parentSide === 'left') {
      visible = elSideVal >= parentSideVal;
    } else {
      visible = elSideVal <= parentSideVal;
    }

    if (!visible) return parent;
    if (parent === getWindowScrollingElement()) break;
    parent = getParentAutoScrollElement(parent, false);
  }

  return false;
}
/**
 * Gets nth child of el, ignoring hidden children, sortable's elements (does not ignore clone if it's visible)
 * and non-draggable elements
 * @param  {HTMLElement} el       The parent element
 * @param  {Number} childNum      The index of the child
 * @param  {Object} options       Parent Sortable's options
 * @return {HTMLElement}          The child at index childNum, or null if not found
 */


function getChild(el, childNum, options) {
  var currentChild = 0,
      i = 0,
      children = el.children;

  while (i < children.length) {
    if (children[i].style.display !== 'none' && children[i] !== Sortable.ghost && children[i] !== Sortable.dragged && closest(children[i], options.draggable, el, false)) {
      if (currentChild === childNum) {
        return children[i];
      }

      currentChild++;
    }

    i++;
  }

  return null;
}
/**
 * Gets the last child in the el, ignoring ghostEl or invisible elements (clones)
 * @param  {HTMLElement} el       Parent element
 * @param  {selector} selector    Any other elements that should be ignored
 * @return {HTMLElement}          The last child, ignoring ghostEl
 */


function lastChild(el, selector) {
  var last = el.lastElementChild;

  while (last && (last === Sortable.ghost || css(last, 'display') === 'none' || selector && !matches(last, selector))) {
    last = last.previousElementSibling;
  }

  return last || null;
}
/**
 * Returns the index of an element within its parent for a selected set of
 * elements
 * @param  {HTMLElement} el
 * @param  {selector} selector
 * @return {number}
 */


function index(el, selector) {
  var index = 0;

  if (!el || !el.parentNode) {
    return -1;
  }
  /* jshint boss:true */


  while (el = el.previousElementSibling) {
    if (el.nodeName.toUpperCase() !== 'TEMPLATE' && el !== Sortable.clone && (!selector || matches(el, selector))) {
      index++;
    }
  }

  return index;
}
/**
 * Returns the scroll offset of the given element, added with all the scroll offsets of parent elements.
 * The value is returned in real pixels.
 * @param  {HTMLElement} el
 * @return {Array}             Offsets in the format of [left, top]
 */


function getRelativeScrollOffset(el) {
  var offsetLeft = 0,
      offsetTop = 0,
      winScroller = getWindowScrollingElement();

  if (el) {
    do {
      var elMatrix = matrix(el),
          scaleX = elMatrix.a,
          scaleY = elMatrix.d;
      offsetLeft += el.scrollLeft * scaleX;
      offsetTop += el.scrollTop * scaleY;
    } while (el !== winScroller && (el = el.parentNode));
  }

  return [offsetLeft, offsetTop];
}
/**
 * Returns the index of the object within the given array
 * @param  {Array} arr   Array that may or may not hold the object
 * @param  {Object} obj  An object that has a key-value pair unique to and identical to a key-value pair in the object you want to find
 * @return {Number}      The index of the object in the array, or -1
 */


function indexOfObject(arr, obj) {
  for (var i in arr) {
    if (!arr.hasOwnProperty(i)) continue;

    for (var key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] === arr[i][key]) return Number(i);
    }
  }

  return -1;
}

function getParentAutoScrollElement(el, includeSelf) {
  // skip to window
  if (!el || !el.getBoundingClientRect) return getWindowScrollingElement();
  var elem = el;
  var gotSelf = false;

  do {
    // we don't need to get elem css if it isn't even overflowing in the first place (performance)
    if (elem.clientWidth < elem.scrollWidth || elem.clientHeight < elem.scrollHeight) {
      var elemCSS = css(elem);

      if (elem.clientWidth < elem.scrollWidth && (elemCSS.overflowX == 'auto' || elemCSS.overflowX == 'scroll') || elem.clientHeight < elem.scrollHeight && (elemCSS.overflowY == 'auto' || elemCSS.overflowY == 'scroll')) {
        if (!elem.getBoundingClientRect || elem === document.body) return getWindowScrollingElement();
        if (gotSelf || includeSelf) return elem;
        gotSelf = true;
      }
    }
    /* jshint boss:true */

  } while (elem = elem.parentNode);

  return getWindowScrollingElement();
}

function extend(dst, src) {
  if (dst && src) {
    for (var key in src) {
      if (src.hasOwnProperty(key)) {
        dst[key] = src[key];
      }
    }
  }

  return dst;
}

function isRectEqual(rect1, rect2) {
  return Math.round(rect1.top) === Math.round(rect2.top) && Math.round(rect1.left) === Math.round(rect2.left) && Math.round(rect1.height) === Math.round(rect2.height) && Math.round(rect1.width) === Math.round(rect2.width);
}

var _throttleTimeout;

function throttle(callback, ms) {
  return function () {
    if (!_throttleTimeout) {
      var args = arguments,
          _this = this;

      if (args.length === 1) {
        callback.call(_this, args[0]);
      } else {
        callback.apply(_this, args);
      }

      _throttleTimeout = setTimeout(function () {
        _throttleTimeout = void 0;
      }, ms);
    }
  };
}

function cancelThrottle() {
  clearTimeout(_throttleTimeout);
  _throttleTimeout = void 0;
}

function scrollBy(el, x, y) {
  el.scrollLeft += x;
  el.scrollTop += y;
}

function clone(el) {
  var Polymer = window.Polymer;
  var $ = window.jQuery || window.Zepto;

  if (Polymer && Polymer.dom) {
    return Polymer.dom(el).cloneNode(true);
  } else if ($) {
    return $(el).clone(true)[0];
  } else {
    return el.cloneNode(true);
  }
}

function setRect(el, rect) {
  css(el, 'position', 'absolute');
  css(el, 'top', rect.top);
  css(el, 'left', rect.left);
  css(el, 'width', rect.width);
  css(el, 'height', rect.height);
}

function unsetRect(el) {
  css(el, 'position', '');
  css(el, 'top', '');
  css(el, 'left', '');
  css(el, 'width', '');
  css(el, 'height', '');
}

var expando = 'Sortable' + new Date().getTime();

function AnimationStateManager() {
  var animationStates = [],
      animationCallbackId;
  return {
    captureAnimationState: function captureAnimationState() {
      animationStates = [];
      if (!this.options.animation) return;
      var children = [].slice.call(this.el.children);
      children.forEach(function (child) {
        if (css(child, 'display') === 'none' || child === Sortable.ghost) return;
        animationStates.push({
          target: child,
          rect: getRect(child)
        });

        var fromRect = _objectSpread({}, animationStates[animationStates.length - 1].rect); // If animating: compensate for current animation


        if (child.thisAnimationDuration) {
          var childMatrix = matrix(child, true);

          if (childMatrix) {
            fromRect.top -= childMatrix.f;
            fromRect.left -= childMatrix.e;
          }
        }

        child.fromRect = fromRect;
      });
    },
    addAnimationState: function addAnimationState(state) {
      animationStates.push(state);
    },
    removeAnimationState: function removeAnimationState(target) {
      animationStates.splice(indexOfObject(animationStates, {
        target: target
      }), 1);
    },
    animateAll: function animateAll(callback) {
      var _this = this;

      if (!this.options.animation) {
        clearTimeout(animationCallbackId);
        if (typeof callback === 'function') callback();
        return;
      }

      var animating = false,
          animationTime = 0;
      animationStates.forEach(function (state) {
        var time = 0,
            target = state.target,
            fromRect = target.fromRect,
            toRect = getRect(target),
            prevFromRect = target.prevFromRect,
            prevToRect = target.prevToRect,
            animatingRect = state.rect,
            targetMatrix = matrix(target, true);

        if (targetMatrix) {
          // Compensate for current animation
          toRect.top -= targetMatrix.f;
          toRect.left -= targetMatrix.e;
        }

        target.toRect = toRect;

        if (target.thisAnimationDuration) {
          // Could also check if animatingRect is between fromRect and toRect
          if (isRectEqual(prevFromRect, toRect) && !isRectEqual(fromRect, toRect) && // Make sure animatingRect is on line between toRect & fromRect
          (animatingRect.top - toRect.top) / (animatingRect.left - toRect.left) === (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
            // If returning to same place as started from animation and on same axis
            time = calculateRealTime(animatingRect, prevFromRect, prevToRect, _this.options);
          }
        } // if fromRect != toRect: animate


        if (!isRectEqual(toRect, fromRect)) {
          target.prevFromRect = fromRect;
          target.prevToRect = toRect;

          if (!time) {
            time = _this.options.animation;
          }

          _this.animate(target, animatingRect, toRect, time);
        }

        if (time) {
          animating = true;
          animationTime = Math.max(animationTime, time);
          clearTimeout(target.animationResetTimer);
          target.animationResetTimer = setTimeout(function () {
            target.animationTime = 0;
            target.prevFromRect = null;
            target.fromRect = null;
            target.prevToRect = null;
            target.thisAnimationDuration = null;
          }, time);
          target.thisAnimationDuration = time;
        }
      });
      clearTimeout(animationCallbackId);

      if (!animating) {
        if (typeof callback === 'function') callback();
      } else {
        animationCallbackId = setTimeout(function () {
          if (typeof callback === 'function') callback();
        }, animationTime);
      }

      animationStates = [];
    },
    animate: function animate(target, currentRect, toRect, duration) {
      if (duration) {
        css(target, 'transition', '');
        css(target, 'transform', '');
        var elMatrix = matrix(this.el),
            scaleX = elMatrix && elMatrix.a,
            scaleY = elMatrix && elMatrix.d,
            translateX = (currentRect.left - toRect.left) / (scaleX || 1),
            translateY = (currentRect.top - toRect.top) / (scaleY || 1);
        target.animatingX = !!translateX;
        target.animatingY = !!translateY;
        css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
        repaint(target); // repaint

        css(target, 'transition', 'transform ' + duration + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''));
        css(target, 'transform', 'translate3d(0,0,0)');
        typeof target.animated === 'number' && clearTimeout(target.animated);
        target.animated = setTimeout(function () {
          css(target, 'transition', '');
          css(target, 'transform', '');
          target.animated = false;
          target.animatingX = false;
          target.animatingY = false;
        }, duration);
      }
    }
  };
}

function repaint(target) {
  return target.offsetWidth;
}

function calculateRealTime(animatingRect, fromRect, toRect, options) {
  return Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) + Math.pow(fromRect.left - animatingRect.left, 2)) / Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) + Math.pow(fromRect.left - toRect.left, 2)) * options.animation;
}

var plugins = [];
var defaults = {
  initializeByDefault: true
};
var PluginManager = {
  mount: function mount(plugin) {
    // Set default static properties
    for (var option in defaults) {
      if (defaults.hasOwnProperty(option) && !(option in plugin)) {
        plugin[option] = defaults[option];
      }
    }

    plugins.push(plugin);
  },
  pluginEvent: function pluginEvent(eventName, sortable, evt) {
    var _this = this;

    this.eventCanceled = false;

    evt.cancel = function () {
      _this.eventCanceled = true;
    };

    var eventNameGlobal = eventName + 'Global';
    plugins.forEach(function (plugin) {
      if (!sortable[plugin.pluginName]) return; // Fire global events if it exists in this sortable

      if (sortable[plugin.pluginName][eventNameGlobal]) {
        sortable[plugin.pluginName][eventNameGlobal](_objectSpread({
          sortable: sortable
        }, evt));
      } // Only fire plugin event if plugin is enabled in this sortable,
      // and plugin has event defined


      if (sortable.options[plugin.pluginName] && sortable[plugin.pluginName][eventName]) {
        sortable[plugin.pluginName][eventName](_objectSpread({
          sortable: sortable
        }, evt));
      }
    });
  },
  initializePlugins: function initializePlugins(sortable, el, defaults, options) {
    plugins.forEach(function (plugin) {
      var pluginName = plugin.pluginName;
      if (!sortable.options[pluginName] && !plugin.initializeByDefault) return;
      var initialized = new plugin(sortable, el, sortable.options);
      initialized.sortable = sortable;
      initialized.options = sortable.options;
      sortable[pluginName] = initialized; // Add default options from plugin

      _extends(defaults, initialized.defaults);
    });

    for (var option in sortable.options) {
      if (!sortable.options.hasOwnProperty(option)) continue;
      var modified = this.modifyOption(sortable, option, sortable.options[option]);

      if (typeof modified !== 'undefined') {
        sortable.options[option] = modified;
      }
    }
  },
  getEventProperties: function getEventProperties(name, sortable) {
    var eventProperties = {};
    plugins.forEach(function (plugin) {
      if (typeof plugin.eventProperties !== 'function') return;

      _extends(eventProperties, plugin.eventProperties.call(sortable[plugin.pluginName], name));
    });
    return eventProperties;
  },
  modifyOption: function modifyOption(sortable, name, value) {
    var modifiedValue;
    plugins.forEach(function (plugin) {
      // Plugin must exist on the Sortable
      if (!sortable[plugin.pluginName]) return; // If static option listener exists for this option, call in the context of the Sortable's instance of this plugin

      if (plugin.optionListeners && typeof plugin.optionListeners[name] === 'function') {
        modifiedValue = plugin.optionListeners[name].call(sortable[plugin.pluginName], value);
      }
    });
    return modifiedValue;
  }
};

function dispatchEvent(_ref) {
  var sortable = _ref.sortable,
      rootEl = _ref.rootEl,
      name = _ref.name,
      targetEl = _ref.targetEl,
      cloneEl = _ref.cloneEl,
      toEl = _ref.toEl,
      fromEl = _ref.fromEl,
      oldIndex = _ref.oldIndex,
      newIndex = _ref.newIndex,
      oldDraggableIndex = _ref.oldDraggableIndex,
      newDraggableIndex = _ref.newDraggableIndex,
      originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      extraEventProperties = _ref.extraEventProperties;
  sortable = sortable || rootEl && rootEl[expando];
  if (!sortable) return;
  var evt,
      options = sortable.options,
      onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1); // Support for new CustomEvent feature

  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent(name, true, true);
  }

  evt.to = toEl || rootEl;
  evt.from = fromEl || rootEl;
  evt.item = targetEl || rootEl;
  evt.clone = cloneEl;
  evt.oldIndex = oldIndex;
  evt.newIndex = newIndex;
  evt.oldDraggableIndex = oldDraggableIndex;
  evt.newDraggableIndex = newDraggableIndex;
  evt.originalEvent = originalEvent;
  evt.pullMode = putSortable ? putSortable.lastPutMode : undefined;

  var allEventProperties = _objectSpread({}, extraEventProperties, PluginManager.getEventProperties(name, sortable));

  for (var option in allEventProperties) {
    evt[option] = allEventProperties[option];
  }

  if (rootEl) {
    rootEl.dispatchEvent(evt);
  }

  if (options[onName]) {
    options[onName].call(sortable, evt);
  }
}

var pluginEvent = function pluginEvent(eventName, sortable) {
  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      originalEvent = _ref.evt,
      data = _objectWithoutProperties(_ref, ["evt"]);

  PluginManager.pluginEvent.bind(Sortable)(eventName, sortable, _objectSpread({
    dragEl: dragEl,
    parentEl: parentEl,
    ghostEl: ghostEl,
    rootEl: rootEl,
    nextEl: nextEl,
    lastDownEl: lastDownEl,
    cloneEl: cloneEl,
    cloneHidden: cloneHidden,
    dragStarted: moved,
    putSortable: putSortable,
    activeSortable: Sortable.active,
    originalEvent: originalEvent,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex,
    hideGhostForTarget: _hideGhostForTarget,
    unhideGhostForTarget: _unhideGhostForTarget,
    cloneNowHidden: function cloneNowHidden() {
      cloneHidden = true;
    },
    cloneNowShown: function cloneNowShown() {
      cloneHidden = false;
    },
    dispatchSortableEvent: function dispatchSortableEvent(name) {
      _dispatchEvent({
        sortable: sortable,
        name: name,
        originalEvent: originalEvent
      });
    }
  }, data));
};

function _dispatchEvent(info) {
  dispatchEvent(_objectSpread({
    putSortable: putSortable,
    cloneEl: cloneEl,
    targetEl: dragEl,
    rootEl: rootEl,
    oldIndex: oldIndex,
    oldDraggableIndex: oldDraggableIndex,
    newIndex: newIndex,
    newDraggableIndex: newDraggableIndex
  }, info));
}

var dragEl,
    parentEl,
    ghostEl,
    rootEl,
    nextEl,
    lastDownEl,
    cloneEl,
    cloneHidden,
    oldIndex,
    newIndex,
    oldDraggableIndex,
    newDraggableIndex,
    activeGroup,
    putSortable,
    awaitingDragStarted = false,
    ignoreNextClick = false,
    sortables = [],
    tapEvt,
    touchEvt,
    lastDx,
    lastDy,
    tapDistanceLeft,
    tapDistanceTop,
    moved,
    lastTarget,
    lastDirection,
    pastFirstInvertThresh = false,
    isCircumstantialInvert = false,
    targetMoveDistance,
    // For positioning ghost absolutely
ghostRelativeParent,
    ghostRelativeParentInitialScroll = [],
    // (left, top)
_silent = false,
    savedInputChecked = [];
/** @const */

var documentExists = typeof document !== 'undefined',
    PositionGhostAbsolutely = IOS,
    CSSFloatProperty = Edge || IE11OrLess ? 'cssFloat' : 'float',
    // This will not pass for IE9, because IE9 DnD only works on anchors
supportDraggable = documentExists && !ChromeForAndroid && !IOS && 'draggable' in document.createElement('div'),
    supportCssPointerEvents = function () {
  if (!documentExists) return; // false when <= IE11

  if (IE11OrLess) {
    return false;
  }

  var el = document.createElement('x');
  el.style.cssText = 'pointer-events:auto';
  return el.style.pointerEvents === 'auto';
}(),
    _detectDirection = function _detectDirection(el, options) {
  var elCSS = css(el),
      elWidth = parseInt(elCSS.width) - parseInt(elCSS.paddingLeft) - parseInt(elCSS.paddingRight) - parseInt(elCSS.borderLeftWidth) - parseInt(elCSS.borderRightWidth),
      child1 = getChild(el, 0, options),
      child2 = getChild(el, 1, options),
      firstChildCSS = child1 && css(child1),
      secondChildCSS = child2 && css(child2),
      firstChildWidth = firstChildCSS && parseInt(firstChildCSS.marginLeft) + parseInt(firstChildCSS.marginRight) + getRect(child1).width,
      secondChildWidth = secondChildCSS && parseInt(secondChildCSS.marginLeft) + parseInt(secondChildCSS.marginRight) + getRect(child2).width;

  if (elCSS.display === 'flex') {
    return elCSS.flexDirection === 'column' || elCSS.flexDirection === 'column-reverse' ? 'vertical' : 'horizontal';
  }

  if (elCSS.display === 'grid') {
    return elCSS.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
  }

  if (child1 && firstChildCSS["float"] && firstChildCSS["float"] !== 'none') {
    var touchingSideChild2 = firstChildCSS["float"] === 'left' ? 'left' : 'right';
    return child2 && (secondChildCSS.clear === 'both' || secondChildCSS.clear === touchingSideChild2) ? 'vertical' : 'horizontal';
  }

  return child1 && (firstChildCSS.display === 'block' || firstChildCSS.display === 'flex' || firstChildCSS.display === 'table' || firstChildCSS.display === 'grid' || firstChildWidth >= elWidth && elCSS[CSSFloatProperty] === 'none' || child2 && elCSS[CSSFloatProperty] === 'none' && firstChildWidth + secondChildWidth > elWidth) ? 'vertical' : 'horizontal';
},
    _dragElInRowColumn = function _dragElInRowColumn(dragRect, targetRect, vertical) {
  var dragElS1Opp = vertical ? dragRect.left : dragRect.top,
      dragElS2Opp = vertical ? dragRect.right : dragRect.bottom,
      dragElOppLength = vertical ? dragRect.width : dragRect.height,
      targetS1Opp = vertical ? targetRect.left : targetRect.top,
      targetS2Opp = vertical ? targetRect.right : targetRect.bottom,
      targetOppLength = vertical ? targetRect.width : targetRect.height;
  return dragElS1Opp === targetS1Opp || dragElS2Opp === targetS2Opp || dragElS1Opp + dragElOppLength / 2 === targetS1Opp + targetOppLength / 2;
},

/**
 * Detects first nearest empty sortable to X and Y position using emptyInsertThreshold.
 * @param  {Number} x      X position
 * @param  {Number} y      Y position
 * @return {HTMLElement}   Element of the first found nearest Sortable
 */
_detectNearestEmptySortable = function _detectNearestEmptySortable(x, y) {
  var ret;
  sortables.some(function (sortable) {
    if (lastChild(sortable)) return;
    var rect = getRect(sortable),
        threshold = sortable[expando].options.emptyInsertThreshold,
        insideHorizontally = x >= rect.left - threshold && x <= rect.right + threshold,
        insideVertically = y >= rect.top - threshold && y <= rect.bottom + threshold;

    if (threshold && insideHorizontally && insideVertically) {
      return ret = sortable;
    }
  });
  return ret;
},
    _prepareGroup = function _prepareGroup(options) {
  function toFn(value, pull) {
    return function (to, from, dragEl, evt) {
      var sameGroup = to.options.group.name && from.options.group.name && to.options.group.name === from.options.group.name;

      if (value == null && (pull || sameGroup)) {
        // Default pull value
        // Default pull and put value if same group
        return true;
      } else if (value == null || value === false) {
        return false;
      } else if (pull && value === 'clone') {
        return value;
      } else if (typeof value === 'function') {
        return toFn(value(to, from, dragEl, evt), pull)(to, from, dragEl, evt);
      } else {
        var otherGroup = (pull ? to : from).options.group.name;
        return value === true || typeof value === 'string' && value === otherGroup || value.join && value.indexOf(otherGroup) > -1;
      }
    };
  }

  var group = {};
  var originalGroup = options.group;

  if (!originalGroup || _typeof(originalGroup) != 'object') {
    originalGroup = {
      name: originalGroup
    };
  }

  group.name = originalGroup.name;
  group.checkPull = toFn(originalGroup.pull, true);
  group.checkPut = toFn(originalGroup.put);
  group.revertClone = originalGroup.revertClone;
  options.group = group;
},
    _hideGhostForTarget = function _hideGhostForTarget() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, 'display', 'none');
  }
},
    _unhideGhostForTarget = function _unhideGhostForTarget() {
  if (!supportCssPointerEvents && ghostEl) {
    css(ghostEl, 'display', '');
  }
}; // #1184 fix - Prevent click event on fallback if dragged but item not changed position


if (documentExists) {
  document.addEventListener('click', function (evt) {
    if (ignoreNextClick) {
      evt.preventDefault();
      evt.stopPropagation && evt.stopPropagation();
      evt.stopImmediatePropagation && evt.stopImmediatePropagation();
      ignoreNextClick = false;
      return false;
    }
  }, true);
}

var nearestEmptyInsertDetectEvent = function nearestEmptyInsertDetectEvent(evt) {
  if (dragEl) {
    evt = evt.touches ? evt.touches[0] : evt;

    var nearest = _detectNearestEmptySortable(evt.clientX, evt.clientY);

    if (nearest) {
      // Create imitation event
      var event = {};

      for (var i in evt) {
        if (evt.hasOwnProperty(i)) {
          event[i] = evt[i];
        }
      }

      event.target = event.rootEl = nearest;
      event.preventDefault = void 0;
      event.stopPropagation = void 0;

      nearest[expando]._onDragOver(event);
    }
  }
};

var _checkOutsideTargetEl = function _checkOutsideTargetEl(evt) {
  if (dragEl) {
    dragEl.parentNode[expando]._isOutsideThisEl(evt.target);
  }
};
/**
 * @class  Sortable
 * @param  {HTMLElement}  el
 * @param  {Object}       [options]
 */


function Sortable(el, options) {
  if (!(el && el.nodeType && el.nodeType === 1)) {
    throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(el));
  }

  this.el = el; // root element

  this.options = options = _extends({}, options); // Export instance

  el[expando] = this;
  var defaults = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(el.nodeName) ? '>li' : '>*',
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function direction() {
      return _detectDirection(el, this.options);
    },
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    ignore: 'a, img',
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function setData(dataTransfer, dragEl) {
      dataTransfer.setData('Text', dragEl.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: 'data-id',
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: 'sortable-fallback',
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0
    },
    supportPointer: Sortable.supportPointer !== false && 'PointerEvent' in window,
    emptyInsertThreshold: 5
  };
  PluginManager.initializePlugins(this, el, defaults); // Set default options

  for (var name in defaults) {
    !(name in options) && (options[name] = defaults[name]);
  }

  _prepareGroup(options); // Bind all private methods


  for (var fn in this) {
    if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
      this[fn] = this[fn].bind(this);
    }
  } // Setup drag mode


  this.nativeDraggable = options.forceFallback ? false : supportDraggable;

  if (this.nativeDraggable) {
    // Touch start threshold cannot be greater than the native dragstart threshold
    this.options.touchStartThreshold = 1;
  } // Bind events


  if (options.supportPointer) {
    on(el, 'pointerdown', this._onTapStart);
  } else {
    on(el, 'mousedown', this._onTapStart);
    on(el, 'touchstart', this._onTapStart);
  }

  if (this.nativeDraggable) {
    on(el, 'dragover', this);
    on(el, 'dragenter', this);
  }

  sortables.push(this.el); // Restore sorting

  options.store && options.store.get && this.sort(options.store.get(this) || []); // Add animation state manager

  _extends(this, AnimationStateManager());
}

Sortable.prototype =
/** @lends Sortable.prototype */
{
  constructor: Sortable,
  _isOutsideThisEl: function _isOutsideThisEl(target) {
    if (!this.el.contains(target) && target !== this.el) {
      lastTarget = null;
    }
  },
  _getDirection: function _getDirection(evt, target) {
    return typeof this.options.direction === 'function' ? this.options.direction.call(this, evt, target, dragEl) : this.options.direction;
  },
  _onTapStart: function _onTapStart(
  /** Event|TouchEvent */
  evt) {
    if (!evt.cancelable) return;

    var _this = this,
        el = this.el,
        options = this.options,
        preventOnFilter = options.preventOnFilter,
        type = evt.type,
        touch = evt.touches && evt.touches[0] || evt.pointerType && evt.pointerType === 'touch' && evt,
        target = (touch || evt).target,
        originalTarget = evt.target.shadowRoot && (evt.path && evt.path[0] || evt.composedPath && evt.composedPath()[0]) || target,
        filter = options.filter;

    _saveInputCheckedState(el); // Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.


    if (dragEl) {
      return;
    }

    if (/mousedown|pointerdown/.test(type) && evt.button !== 0 || options.disabled) {
      return; // only left button and enabled
    } // cancel dnd if original target is content editable


    if (originalTarget.isContentEditable) {
      return;
    }

    target = closest(target, options.draggable, el, false);

    if (target && target.animated) {
      return;
    }

    if (lastDownEl === target) {
      // Ignoring duplicate `down`
      return;
    } // Get the index of the dragged element within its parent


    oldIndex = index(target);
    oldDraggableIndex = index(target, options.draggable); // Check filter

    if (typeof filter === 'function') {
      if (filter.call(this, evt, target, this)) {
        _dispatchEvent({
          sortable: _this,
          rootEl: originalTarget,
          name: 'filter',
          targetEl: target,
          toEl: el,
          fromEl: el
        });

        pluginEvent('filter', _this, {
          evt: evt
        });
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    } else if (filter) {
      filter = filter.split(',').some(function (criteria) {
        criteria = closest(originalTarget, criteria.trim(), el, false);

        if (criteria) {
          _dispatchEvent({
            sortable: _this,
            rootEl: criteria,
            name: 'filter',
            targetEl: target,
            fromEl: el,
            toEl: el
          });

          pluginEvent('filter', _this, {
            evt: evt
          });
          return true;
        }
      });

      if (filter) {
        preventOnFilter && evt.cancelable && evt.preventDefault();
        return; // cancel dnd
      }
    }

    if (options.handle && !closest(originalTarget, options.handle, el, false)) {
      return;
    } // Prepare `dragstart`


    this._prepareDragStart(evt, touch, target);
  },
  _prepareDragStart: function _prepareDragStart(
  /** Event */
  evt,
  /** Touch */
  touch,
  /** HTMLElement */
  target) {
    var _this = this,
        el = _this.el,
        options = _this.options,
        ownerDocument = el.ownerDocument,
        dragStartFn;

    if (target && !dragEl && target.parentNode === el) {
      var dragRect = getRect(target);
      rootEl = el;
      dragEl = target;
      parentEl = dragEl.parentNode;
      nextEl = dragEl.nextSibling;
      lastDownEl = target;
      activeGroup = options.group;
      Sortable.dragged = dragEl;
      tapEvt = {
        target: dragEl,
        clientX: (touch || evt).clientX,
        clientY: (touch || evt).clientY
      };
      tapDistanceLeft = tapEvt.clientX - dragRect.left;
      tapDistanceTop = tapEvt.clientY - dragRect.top;
      this._lastX = (touch || evt).clientX;
      this._lastY = (touch || evt).clientY;
      dragEl.style['will-change'] = 'all';

      dragStartFn = function dragStartFn() {
        pluginEvent('delayEnded', _this, {
          evt: evt
        });

        if (Sortable.eventCanceled) {
          _this._onDrop();

          return;
        } // Delayed drag has been triggered
        // we can re-enable the events: touchmove/mousemove


        _this._disableDelayedDragEvents();

        if (!FireFox && _this.nativeDraggable) {
          dragEl.draggable = true;
        } // Bind the events: dragstart/dragend


        _this._triggerDragStart(evt, touch); // Drag start event


        _dispatchEvent({
          sortable: _this,
          name: 'choose',
          originalEvent: evt
        }); // Chosen item


        toggleClass(dragEl, options.chosenClass, true);
      }; // Disable "draggable"


      options.ignore.split(',').forEach(function (criteria) {
        find(dragEl, criteria.trim(), _disableDraggable);
      });
      on(ownerDocument, 'dragover', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mousemove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'touchmove', nearestEmptyInsertDetectEvent);
      on(ownerDocument, 'mouseup', _this._onDrop);
      on(ownerDocument, 'touchend', _this._onDrop);
      on(ownerDocument, 'touchcancel', _this._onDrop); // Make dragEl draggable (must be before delay for FireFox)

      if (FireFox && this.nativeDraggable) {
        this.options.touchStartThreshold = 4;
        dragEl.draggable = true;
      }

      pluginEvent('delayStart', this, {
        evt: evt
      }); // Delay is impossible for native DnD in Edge or IE

      if (options.delay && (!options.delayOnTouchOnly || touch) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
        if (Sortable.eventCanceled) {
          this._onDrop();

          return;
        } // If the user moves the pointer or let go the click or touch
        // before the delay has been reached:
        // disable the delayed drag


        on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
        on(ownerDocument, 'touchend', _this._disableDelayedDrag);
        on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
        on(ownerDocument, 'mousemove', _this._delayedDragTouchMoveHandler);
        on(ownerDocument, 'touchmove', _this._delayedDragTouchMoveHandler);
        options.supportPointer && on(ownerDocument, 'pointermove', _this._delayedDragTouchMoveHandler);
        _this._dragStartTimer = setTimeout(dragStartFn, options.delay);
      } else {
        dragStartFn();
      }
    }
  },
  _delayedDragTouchMoveHandler: function _delayedDragTouchMoveHandler(
  /** TouchEvent|PointerEvent **/
  e) {
    var touch = e.touches ? e.touches[0] : e;

    if (Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1))) {
      this._disableDelayedDrag();
    }
  },
  _disableDelayedDrag: function _disableDelayedDrag() {
    dragEl && _disableDraggable(dragEl);
    clearTimeout(this._dragStartTimer);

    this._disableDelayedDragEvents();
  },
  _disableDelayedDragEvents: function _disableDelayedDragEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._disableDelayedDrag);
    off(ownerDocument, 'touchend', this._disableDelayedDrag);
    off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
    off(ownerDocument, 'mousemove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'touchmove', this._delayedDragTouchMoveHandler);
    off(ownerDocument, 'pointermove', this._delayedDragTouchMoveHandler);
  },
  _triggerDragStart: function _triggerDragStart(
  /** Event */
  evt,
  /** Touch */
  touch) {
    touch = touch || evt.pointerType == 'touch' && evt;

    if (!this.nativeDraggable || touch) {
      if (this.options.supportPointer) {
        on(document, 'pointermove', this._onTouchMove);
      } else if (touch) {
        on(document, 'touchmove', this._onTouchMove);
      } else {
        on(document, 'mousemove', this._onTouchMove);
      }
    } else {
      on(dragEl, 'dragend', this);
      on(rootEl, 'dragstart', this._onDragStart);
    }

    try {
      if (document.selection) {
        // Timeout neccessary for IE9
        _nextTick(function () {
          document.selection.empty();
        });
      } else {
        window.getSelection().removeAllRanges();
      }
    } catch (err) {}
  },
  _dragStarted: function _dragStarted(fallback, evt) {

    awaitingDragStarted = false;

    if (rootEl && dragEl) {
      pluginEvent('dragStarted', this, {
        evt: evt
      });

      if (this.nativeDraggable) {
        on(document, 'dragover', _checkOutsideTargetEl);
      }

      var options = this.options; // Apply effect

      !fallback && toggleClass(dragEl, options.dragClass, false);
      toggleClass(dragEl, options.ghostClass, true);
      Sortable.active = this;
      fallback && this._appendGhost(); // Drag start event

      _dispatchEvent({
        sortable: this,
        name: 'start',
        originalEvent: evt
      });
    } else {
      this._nulling();
    }
  },
  _emulateDragOver: function _emulateDragOver() {
    if (touchEvt) {
      this._lastX = touchEvt.clientX;
      this._lastY = touchEvt.clientY;

      _hideGhostForTarget();

      var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
      var parent = target;

      while (target && target.shadowRoot) {
        target = target.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY);
        if (target === parent) break;
        parent = target;
      }

      dragEl.parentNode[expando]._isOutsideThisEl(target);

      if (parent) {
        do {
          if (parent[expando]) {
            var inserted = void 0;
            inserted = parent[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: target,
              rootEl: parent
            });

            if (inserted && !this.options.dragoverBubble) {
              break;
            }
          }

          target = parent; // store last element
        }
        /* jshint boss:true */
        while (parent = parent.parentNode);
      }

      _unhideGhostForTarget();
    }
  },
  _onTouchMove: function _onTouchMove(
  /**TouchEvent*/
  evt) {
    if (tapEvt) {
      var options = this.options,
          fallbackTolerance = options.fallbackTolerance,
          fallbackOffset = options.fallbackOffset,
          touch = evt.touches ? evt.touches[0] : evt,
          ghostMatrix = ghostEl && matrix(ghostEl, true),
          scaleX = ghostEl && ghostMatrix && ghostMatrix.a,
          scaleY = ghostEl && ghostMatrix && ghostMatrix.d,
          relativeScrollOffset = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent),
          dx = (touch.clientX - tapEvt.clientX + fallbackOffset.x) / (scaleX || 1) + (relativeScrollOffset ? relativeScrollOffset[0] - ghostRelativeParentInitialScroll[0] : 0) / (scaleX || 1),
          dy = (touch.clientY - tapEvt.clientY + fallbackOffset.y) / (scaleY || 1) + (relativeScrollOffset ? relativeScrollOffset[1] - ghostRelativeParentInitialScroll[1] : 0) / (scaleY || 1); // only set the status to dragging, when we are actually dragging

      if (!Sortable.active && !awaitingDragStarted) {
        if (fallbackTolerance && Math.max(Math.abs(touch.clientX - this._lastX), Math.abs(touch.clientY - this._lastY)) < fallbackTolerance) {
          return;
        }

        this._onDragStart(evt, true);
      }

      if (ghostEl) {
        if (ghostMatrix) {
          ghostMatrix.e += dx - (lastDx || 0);
          ghostMatrix.f += dy - (lastDy || 0);
        } else {
          ghostMatrix = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: dx,
            f: dy
          };
        }

        var cssMatrix = "matrix(".concat(ghostMatrix.a, ",").concat(ghostMatrix.b, ",").concat(ghostMatrix.c, ",").concat(ghostMatrix.d, ",").concat(ghostMatrix.e, ",").concat(ghostMatrix.f, ")");
        css(ghostEl, 'webkitTransform', cssMatrix);
        css(ghostEl, 'mozTransform', cssMatrix);
        css(ghostEl, 'msTransform', cssMatrix);
        css(ghostEl, 'transform', cssMatrix);
        lastDx = dx;
        lastDy = dy;
        touchEvt = touch;
      }

      evt.cancelable && evt.preventDefault();
    }
  },
  _appendGhost: function _appendGhost() {
    // Bug if using scale(): https://stackoverflow.com/questions/2637058
    // Not being adjusted for
    if (!ghostEl) {
      var container = this.options.fallbackOnBody ? document.body : rootEl,
          rect = getRect(dragEl, true, PositionGhostAbsolutely, true, container),
          options = this.options; // Position absolutely

      if (PositionGhostAbsolutely) {
        // Get relatively positioned parent
        ghostRelativeParent = container;

        while (css(ghostRelativeParent, 'position') === 'static' && css(ghostRelativeParent, 'transform') === 'none' && ghostRelativeParent !== document) {
          ghostRelativeParent = ghostRelativeParent.parentNode;
        }

        if (ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement) {
          if (ghostRelativeParent === document) ghostRelativeParent = getWindowScrollingElement();
          rect.top += ghostRelativeParent.scrollTop;
          rect.left += ghostRelativeParent.scrollLeft;
        } else {
          ghostRelativeParent = getWindowScrollingElement();
        }

        ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
      }

      ghostEl = dragEl.cloneNode(true);
      toggleClass(ghostEl, options.ghostClass, false);
      toggleClass(ghostEl, options.fallbackClass, true);
      toggleClass(ghostEl, options.dragClass, true);
      css(ghostEl, 'transition', '');
      css(ghostEl, 'transform', '');
      css(ghostEl, 'box-sizing', 'border-box');
      css(ghostEl, 'margin', 0);
      css(ghostEl, 'top', rect.top);
      css(ghostEl, 'left', rect.left);
      css(ghostEl, 'width', rect.width);
      css(ghostEl, 'height', rect.height);
      css(ghostEl, 'opacity', '0.8');
      css(ghostEl, 'position', PositionGhostAbsolutely ? 'absolute' : 'fixed');
      css(ghostEl, 'zIndex', '100000');
      css(ghostEl, 'pointerEvents', 'none');
      Sortable.ghost = ghostEl;
      container.appendChild(ghostEl); // Set transform-origin

      css(ghostEl, 'transform-origin', tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + '% ' + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + '%');
    }
  },
  _onDragStart: function _onDragStart(
  /**Event*/
  evt,
  /**boolean*/
  fallback) {
    var _this = this;

    var dataTransfer = evt.dataTransfer;
    var options = _this.options;
    pluginEvent('dragStart', this, {
      evt: evt
    });

    if (Sortable.eventCanceled) {
      this._onDrop();

      return;
    }

    pluginEvent('setupClone', this);

    if (!Sortable.eventCanceled) {
      cloneEl = clone(dragEl);
      cloneEl.draggable = false;
      cloneEl.style['will-change'] = '';

      this._hideClone();

      toggleClass(cloneEl, this.options.chosenClass, false);
      Sortable.clone = cloneEl;
    } // #1143: IFrame support workaround


    _this.cloneId = _nextTick(function () {
      pluginEvent('clone', _this);
      if (Sortable.eventCanceled) return;

      if (!_this.options.removeCloneOnHide) {
        rootEl.insertBefore(cloneEl, dragEl);
      }

      _this._hideClone();

      _dispatchEvent({
        sortable: _this,
        name: 'clone'
      });
    });
    !fallback && toggleClass(dragEl, options.dragClass, true); // Set proper drop events

    if (fallback) {
      ignoreNextClick = true;
      _this._loopId = setInterval(_this._emulateDragOver, 50);
    } else {
      // Undo what was set in _prepareDragStart before drag started
      off(document, 'mouseup', _this._onDrop);
      off(document, 'touchend', _this._onDrop);
      off(document, 'touchcancel', _this._onDrop);

      if (dataTransfer) {
        dataTransfer.effectAllowed = 'move';
        options.setData && options.setData.call(_this, dataTransfer, dragEl);
      }

      on(document, 'drop', _this); // #1276 fix:

      css(dragEl, 'transform', 'translateZ(0)');
    }

    awaitingDragStarted = true;
    _this._dragStartId = _nextTick(_this._dragStarted.bind(_this, fallback, evt));
    on(document, 'selectstart', _this);
    moved = true;

    if (Safari) {
      css(document.body, 'user-select', 'none');
    }
  },
  // Returns true - if no further action is needed (either inserted or another condition)
  _onDragOver: function _onDragOver(
  /**Event*/
  evt) {
    var el = this.el,
        target = evt.target,
        dragRect,
        targetRect,
        revert,
        options = this.options,
        group = options.group,
        activeSortable = Sortable.active,
        isOwner = activeGroup === group,
        canSort = options.sort,
        fromSortable = putSortable || activeSortable,
        vertical,
        _this = this,
        completedFired = false;

    if (_silent) return;

    function dragOverEvent(name, extra) {
      pluginEvent(name, _this, _objectSpread({
        evt: evt,
        isOwner: isOwner,
        axis: vertical ? 'vertical' : 'horizontal',
        revert: revert,
        dragRect: dragRect,
        targetRect: targetRect,
        canSort: canSort,
        fromSortable: fromSortable,
        target: target,
        completed: completed,
        onMove: function onMove(target, after) {
          return _onMove(rootEl, el, dragEl, dragRect, target, getRect(target), evt, after);
        },
        changed: changed
      }, extra));
    } // Capture animation state


    function capture() {
      dragOverEvent('dragOverAnimationCapture');

      _this.captureAnimationState();

      if (_this !== fromSortable) {
        fromSortable.captureAnimationState();
      }
    } // Return invocation when dragEl is inserted (or completed)


    function completed(insertion) {
      dragOverEvent('dragOverCompleted', {
        insertion: insertion
      });

      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        } else {
          activeSortable._showClone(_this);
        }

        if (_this !== fromSortable) {
          // Set ghost class to new sortable's ghost class
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : activeSortable.options.ghostClass, false);
          toggleClass(dragEl, options.ghostClass, true);
        }

        if (putSortable !== _this && _this !== Sortable.active) {
          putSortable = _this;
        } else if (_this === Sortable.active && putSortable) {
          putSortable = null;
        } // Animation


        if (fromSortable === _this) {
          _this._ignoreWhileAnimating = target;
        }

        _this.animateAll(function () {
          dragOverEvent('dragOverAnimationComplete');
          _this._ignoreWhileAnimating = null;
        });

        if (_this !== fromSortable) {
          fromSortable.animateAll();
          fromSortable._ignoreWhileAnimating = null;
        }
      } // Null lastTarget if it is not inside a previously swapped element


      if (target === dragEl && !dragEl.animated || target === el && !target.animated) {
        lastTarget = null;
      } // no bubbling and not fallback


      if (!options.dragoverBubble && !evt.rootEl && target !== document) {
        dragEl.parentNode[expando]._isOutsideThisEl(evt.target); // Do not detect for empty insert if already inserted


        !insertion && nearestEmptyInsertDetectEvent(evt);
      }

      !options.dragoverBubble && evt.stopPropagation && evt.stopPropagation();
      return completedFired = true;
    } // Call when dragEl has been inserted


    function changed() {
      newIndex = index(dragEl);
      newDraggableIndex = index(dragEl, options.draggable);

      _dispatchEvent({
        sortable: _this,
        name: 'change',
        toEl: el,
        newIndex: newIndex,
        newDraggableIndex: newDraggableIndex,
        originalEvent: evt
      });
    }

    if (evt.preventDefault !== void 0) {
      evt.cancelable && evt.preventDefault();
    }

    target = closest(target, options.draggable, el, true);
    dragOverEvent('dragOver');
    if (Sortable.eventCanceled) return completedFired;

    if (dragEl.contains(evt.target) || target.animated && target.animatingX && target.animatingY || _this._ignoreWhileAnimating === target) {
      return completed(false);
    }

    ignoreNextClick = false;

    if (activeSortable && !options.disabled && (isOwner ? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
    : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) && group.checkPut(this, activeSortable, dragEl, evt))) {
      vertical = this._getDirection(evt, target) === 'vertical';
      dragRect = getRect(dragEl);
      dragOverEvent('dragOverValid');
      if (Sortable.eventCanceled) return completedFired;

      if (revert) {
        parentEl = rootEl; // actualization

        capture();

        this._hideClone();

        dragOverEvent('revert');

        if (!Sortable.eventCanceled) {
          if (nextEl) {
            rootEl.insertBefore(dragEl, nextEl);
          } else {
            rootEl.appendChild(dragEl);
          }
        }

        return completed(true);
      }

      var elLastChild = lastChild(el, options.draggable);

      if (!elLastChild || _ghostIsLast(evt, vertical, this) && !elLastChild.animated) {
        // If already at end of list: Do not insert
        if (elLastChild === dragEl) {
          return completed(false);
        } // assign target only if condition is true


        if (elLastChild && el === evt.target) {
          target = elLastChild;
        }

        if (target) {
          targetRect = getRect(target);
        }

        if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, !!target) !== false) {
          capture();
          el.appendChild(dragEl);
          parentEl = el; // actualization

          changed();
          return completed(true);
        }
      } else if (target.parentNode === el) {
        targetRect = getRect(target);
        var direction = 0,
            targetBeforeFirstSwap,
            differentLevel = dragEl.parentNode !== el,
            differentRowCol = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || dragRect, target.animated && target.toRect || targetRect, vertical),
            side1 = vertical ? 'top' : 'left',
            scrolledPastTop = isScrolledPast(target, 'top', 'top') || isScrolledPast(dragEl, 'top', 'top'),
            scrollBefore = scrolledPastTop ? scrolledPastTop.scrollTop : void 0;

        if (lastTarget !== target) {
          targetBeforeFirstSwap = targetRect[side1];
          pastFirstInvertThresh = false;
          isCircumstantialInvert = !differentRowCol && options.invertSwap || differentLevel;
        }

        direction = _getSwapDirection(evt, target, targetRect, vertical, differentRowCol ? 1 : options.swapThreshold, options.invertedSwapThreshold == null ? options.swapThreshold : options.invertedSwapThreshold, isCircumstantialInvert, lastTarget === target);
        var sibling;

        if (direction !== 0) {
          // Check if target is beside dragEl in respective direction (ignoring hidden elements)
          var dragIndex = index(dragEl);

          do {
            dragIndex -= direction;
            sibling = parentEl.children[dragIndex];
          } while (sibling && (css(sibling, 'display') === 'none' || sibling === ghostEl));
        } // If dragEl is already beside target: Do not insert


        if (direction === 0 || sibling === target) {
          return completed(false);
        }

        lastTarget = target;
        lastDirection = direction;
        var nextSibling = target.nextElementSibling,
            after = false;
        after = direction === 1;

        var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

        if (moveVector !== false) {
          if (moveVector === 1 || moveVector === -1) {
            after = moveVector === 1;
          }

          _silent = true;
          setTimeout(_unsilent, 30);
          capture();

          if (after && !nextSibling) {
            el.appendChild(dragEl);
          } else {
            target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
          } // Undo chrome's scroll adjustment (has no effect on other browsers)


          if (scrolledPastTop) {
            scrollBy(scrolledPastTop, 0, scrollBefore - scrolledPastTop.scrollTop);
          }

          parentEl = dragEl.parentNode; // actualization
          // must be done before animation

          if (targetBeforeFirstSwap !== undefined && !isCircumstantialInvert) {
            targetMoveDistance = Math.abs(targetBeforeFirstSwap - getRect(target)[side1]);
          }

          changed();
          return completed(true);
        }
      }

      if (el.contains(dragEl)) {
        return completed(false);
      }
    }

    return false;
  },
  _ignoreWhileAnimating: null,
  _offMoveEvents: function _offMoveEvents() {
    off(document, 'mousemove', this._onTouchMove);
    off(document, 'touchmove', this._onTouchMove);
    off(document, 'pointermove', this._onTouchMove);
    off(document, 'dragover', nearestEmptyInsertDetectEvent);
    off(document, 'mousemove', nearestEmptyInsertDetectEvent);
    off(document, 'touchmove', nearestEmptyInsertDetectEvent);
  },
  _offUpEvents: function _offUpEvents() {
    var ownerDocument = this.el.ownerDocument;
    off(ownerDocument, 'mouseup', this._onDrop);
    off(ownerDocument, 'touchend', this._onDrop);
    off(ownerDocument, 'pointerup', this._onDrop);
    off(ownerDocument, 'touchcancel', this._onDrop);
    off(document, 'selectstart', this);
  },
  _onDrop: function _onDrop(
  /**Event*/
  evt) {
    var el = this.el,
        options = this.options; // Get the index of the dragged element within its parent

    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);
    pluginEvent('drop', this, {
      evt: evt
    });
    parentEl = dragEl && dragEl.parentNode; // Get again after plugin event

    newIndex = index(dragEl);
    newDraggableIndex = index(dragEl, options.draggable);

    if (Sortable.eventCanceled) {
      this._nulling();

      return;
    }

    awaitingDragStarted = false;
    isCircumstantialInvert = false;
    pastFirstInvertThresh = false;
    clearInterval(this._loopId);
    clearTimeout(this._dragStartTimer);

    _cancelNextTick(this.cloneId);

    _cancelNextTick(this._dragStartId); // Unbind events


    if (this.nativeDraggable) {
      off(document, 'drop', this);
      off(el, 'dragstart', this._onDragStart);
    }

    this._offMoveEvents();

    this._offUpEvents();

    if (Safari) {
      css(document.body, 'user-select', '');
    }

    css(dragEl, 'transform', '');

    if (evt) {
      if (moved) {
        evt.cancelable && evt.preventDefault();
        !options.dropBubble && evt.stopPropagation();
      }

      ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        // Remove clone(s)
        cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
      }

      if (dragEl) {
        if (this.nativeDraggable) {
          off(dragEl, 'dragend', this);
        }

        _disableDraggable(dragEl);

        dragEl.style['will-change'] = ''; // Remove classes
        // ghostClass is added in dragStarted

        if (moved && !awaitingDragStarted) {
          toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false);
        }

        toggleClass(dragEl, this.options.chosenClass, false); // Drag stop event

        _dispatchEvent({
          sortable: this,
          name: 'unchoose',
          toEl: parentEl,
          newIndex: null,
          newDraggableIndex: null,
          originalEvent: evt
        });

        if (rootEl !== parentEl) {
          if (newIndex >= 0) {
            // Add event
            _dispatchEvent({
              rootEl: parentEl,
              name: 'add',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            }); // Remove event


            _dispatchEvent({
              sortable: this,
              name: 'remove',
              toEl: parentEl,
              originalEvent: evt
            }); // drag from one list and drop into another


            _dispatchEvent({
              rootEl: parentEl,
              name: 'sort',
              toEl: parentEl,
              fromEl: rootEl,
              originalEvent: evt
            });

            _dispatchEvent({
              sortable: this,
              name: 'sort',
              toEl: parentEl,
              originalEvent: evt
            });
          }

          putSortable && putSortable.save();
        } else {
          if (newIndex !== oldIndex) {
            if (newIndex >= 0) {
              // drag & drop within the same list
              _dispatchEvent({
                sortable: this,
                name: 'update',
                toEl: parentEl,
                originalEvent: evt
              });

              _dispatchEvent({
                sortable: this,
                name: 'sort',
                toEl: parentEl,
                originalEvent: evt
              });
            }
          }
        }

        if (Sortable.active) {
          /* jshint eqnull:true */
          if (newIndex == null || newIndex === -1) {
            newIndex = oldIndex;
            newDraggableIndex = oldDraggableIndex;
          }

          _dispatchEvent({
            sortable: this,
            name: 'end',
            toEl: parentEl,
            originalEvent: evt
          }); // Save sorting


          this.save();
        }
      }
    }

    this._nulling();
  },
  _nulling: function _nulling() {
    pluginEvent('nulling', this);
    rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
    savedInputChecked.forEach(function (el) {
      el.checked = true;
    });
    savedInputChecked.length = lastDx = lastDy = 0;
  },
  handleEvent: function handleEvent(
  /**Event*/
  evt) {
    switch (evt.type) {
      case 'drop':
      case 'dragend':
        this._onDrop(evt);

        break;

      case 'dragenter':
      case 'dragover':
        if (dragEl) {
          this._onDragOver(evt);

          _globalDragOver(evt);
        }

        break;

      case 'selectstart':
        evt.preventDefault();
        break;
    }
  },

  /**
   * Serializes the item into an array of string.
   * @returns {String[]}
   */
  toArray: function toArray() {
    var order = [],
        el,
        children = this.el.children,
        i = 0,
        n = children.length,
        options = this.options;

    for (; i < n; i++) {
      el = children[i];

      if (closest(el, options.draggable, this.el, false)) {
        order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
      }
    }

    return order;
  },

  /**
   * Sorts the elements according to the array.
   * @param  {String[]}  order  order of the items
   */
  sort: function sort(order) {
    var items = {},
        rootEl = this.el;
    this.toArray().forEach(function (id, i) {
      var el = rootEl.children[i];

      if (closest(el, this.options.draggable, rootEl, false)) {
        items[id] = el;
      }
    }, this);
    order.forEach(function (id) {
      if (items[id]) {
        rootEl.removeChild(items[id]);
        rootEl.appendChild(items[id]);
      }
    });
  },

  /**
   * Save the current sorting
   */
  save: function save() {
    var store = this.options.store;
    store && store.set && store.set(this);
  },

  /**
   * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
   * @param   {HTMLElement}  el
   * @param   {String}       [selector]  default: `options.draggable`
   * @returns {HTMLElement|null}
   */
  closest: function closest$1(el, selector) {
    return closest(el, selector || this.options.draggable, this.el, false);
  },

  /**
   * Set/get option
   * @param   {string} name
   * @param   {*}      [value]
   * @returns {*}
   */
  option: function option(name, value) {
    var options = this.options;

    if (value === void 0) {
      return options[name];
    } else {
      var modifiedValue = PluginManager.modifyOption(this, name, value);

      if (typeof modifiedValue !== 'undefined') {
        options[name] = modifiedValue;
      } else {
        options[name] = value;
      }

      if (name === 'group') {
        _prepareGroup(options);
      }
    }
  },

  /**
   * Destroy
   */
  destroy: function destroy() {
    pluginEvent('destroy', this);
    var el = this.el;
    el[expando] = null;
    off(el, 'mousedown', this._onTapStart);
    off(el, 'touchstart', this._onTapStart);
    off(el, 'pointerdown', this._onTapStart);

    if (this.nativeDraggable) {
      off(el, 'dragover', this);
      off(el, 'dragenter', this);
    } // Remove draggable attributes


    Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
      el.removeAttribute('draggable');
    });

    this._onDrop();

    this._disableDelayedDragEvents();

    sortables.splice(sortables.indexOf(this.el), 1);
    this.el = el = null;
  },
  _hideClone: function _hideClone() {
    if (!cloneHidden) {
      pluginEvent('hideClone', this);
      if (Sortable.eventCanceled) return;
      css(cloneEl, 'display', 'none');

      if (this.options.removeCloneOnHide && cloneEl.parentNode) {
        cloneEl.parentNode.removeChild(cloneEl);
      }

      cloneHidden = true;
    }
  },
  _showClone: function _showClone(putSortable) {
    if (putSortable.lastPutMode !== 'clone') {
      this._hideClone();

      return;
    }

    if (cloneHidden) {
      pluginEvent('showClone', this);
      if (Sortable.eventCanceled) return; // show clone at dragEl or original position

      if (rootEl.contains(dragEl) && !this.options.group.revertClone) {
        rootEl.insertBefore(cloneEl, dragEl);
      } else if (nextEl) {
        rootEl.insertBefore(cloneEl, nextEl);
      } else {
        rootEl.appendChild(cloneEl);
      }

      if (this.options.group.revertClone) {
        this.animate(dragEl, cloneEl);
      }

      css(cloneEl, 'display', '');
      cloneHidden = false;
    }
  }
};

function _globalDragOver(
/**Event*/
evt) {
  if (evt.dataTransfer) {
    evt.dataTransfer.dropEffect = 'move';
  }

  evt.cancelable && evt.preventDefault();
}

function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvent, willInsertAfter) {
  var evt,
      sortable = fromEl[expando],
      onMoveFn = sortable.options.onMove,
      retVal; // Support for new CustomEvent feature

  if (window.CustomEvent && !IE11OrLess && !Edge) {
    evt = new CustomEvent('move', {
      bubbles: true,
      cancelable: true
    });
  } else {
    evt = document.createEvent('Event');
    evt.initEvent('move', true, true);
  }

  evt.to = toEl;
  evt.from = fromEl;
  evt.dragged = dragEl;
  evt.draggedRect = dragRect;
  evt.related = targetEl || toEl;
  evt.relatedRect = targetRect || getRect(toEl);
  evt.willInsertAfter = willInsertAfter;
  evt.originalEvent = originalEvent;
  fromEl.dispatchEvent(evt);

  if (onMoveFn) {
    retVal = onMoveFn.call(sortable, evt, originalEvent);
  }

  return retVal;
}

function _disableDraggable(el) {
  el.draggable = false;
}

function _unsilent() {
  _silent = false;
}

function _ghostIsLast(evt, vertical, sortable) {
  var rect = getRect(lastChild(sortable.el, sortable.options.draggable));
  var spacer = 10;
  return vertical ? evt.clientX > rect.right + spacer || evt.clientX <= rect.right && evt.clientY > rect.bottom && evt.clientX >= rect.left : evt.clientX > rect.right && evt.clientY > rect.top || evt.clientX <= rect.right && evt.clientY > rect.bottom + spacer;
}

function _getSwapDirection(evt, target, targetRect, vertical, swapThreshold, invertedSwapThreshold, invertSwap, isLastTarget) {
  var mouseOnAxis = vertical ? evt.clientY : evt.clientX,
      targetLength = vertical ? targetRect.height : targetRect.width,
      targetS1 = vertical ? targetRect.top : targetRect.left,
      targetS2 = vertical ? targetRect.bottom : targetRect.right,
      invert = false;

  if (!invertSwap) {
    // Never invert or create dragEl shadow when target movemenet causes mouse to move past the end of regular swapThreshold
    if (isLastTarget && targetMoveDistance < targetLength * swapThreshold) {
      // multiplied only by swapThreshold because mouse will already be inside target by (1 - threshold) * targetLength / 2
      // check if past first invert threshold on side opposite of lastDirection
      if (!pastFirstInvertThresh && (lastDirection === 1 ? mouseOnAxis > targetS1 + targetLength * invertedSwapThreshold / 2 : mouseOnAxis < targetS2 - targetLength * invertedSwapThreshold / 2)) {
        // past first invert threshold, do not restrict inverted threshold to dragEl shadow
        pastFirstInvertThresh = true;
      }

      if (!pastFirstInvertThresh) {
        // dragEl shadow (target move distance shadow)
        if (lastDirection === 1 ? mouseOnAxis < targetS1 + targetMoveDistance // over dragEl shadow
        : mouseOnAxis > targetS2 - targetMoveDistance) {
          return -lastDirection;
        }
      } else {
        invert = true;
      }
    } else {
      // Regular
      if (mouseOnAxis > targetS1 + targetLength * (1 - swapThreshold) / 2 && mouseOnAxis < targetS2 - targetLength * (1 - swapThreshold) / 2) {
        return _getInsertDirection(target);
      }
    }
  }

  invert = invert || invertSwap;

  if (invert) {
    // Invert of regular
    if (mouseOnAxis < targetS1 + targetLength * invertedSwapThreshold / 2 || mouseOnAxis > targetS2 - targetLength * invertedSwapThreshold / 2) {
      return mouseOnAxis > targetS1 + targetLength / 2 ? 1 : -1;
    }
  }

  return 0;
}
/**
 * Gets the direction dragEl must be swapped relative to target in order to make it
 * seem that dragEl has been "inserted" into that element's position
 * @param  {HTMLElement} target       The target whose position dragEl is being inserted at
 * @return {Number}                   Direction dragEl must be swapped
 */


function _getInsertDirection(target) {
  if (index(dragEl) < index(target)) {
    return 1;
  } else {
    return -1;
  }
}
/**
 * Generate id
 * @param   {HTMLElement} el
 * @returns {String}
 * @private
 */


function _generateId(el) {
  var str = el.tagName + el.className + el.src + el.href + el.textContent,
      i = str.length,
      sum = 0;

  while (i--) {
    sum += str.charCodeAt(i);
  }

  return sum.toString(36);
}

function _saveInputCheckedState(root) {
  savedInputChecked.length = 0;
  var inputs = root.getElementsByTagName('input');
  var idx = inputs.length;

  while (idx--) {
    var el = inputs[idx];
    el.checked && savedInputChecked.push(el);
  }
}

function _nextTick(fn) {
  return setTimeout(fn, 0);
}

function _cancelNextTick(id) {
  return clearTimeout(id);
} // Fixed #973:


if (documentExists) {
  on(document, 'touchmove', function (evt) {
    if ((Sortable.active || awaitingDragStarted) && evt.cancelable) {
      evt.preventDefault();
    }
  });
} // Export utils


Sortable.utils = {
  on: on,
  off: off,
  css: css,
  find: find,
  is: function is(el, selector) {
    return !!closest(el, selector, el, false);
  },
  extend: extend,
  throttle: throttle,
  closest: closest,
  toggleClass: toggleClass,
  clone: clone,
  index: index,
  nextTick: _nextTick,
  cancelNextTick: _cancelNextTick,
  detectDirection: _detectDirection,
  getChild: getChild
};
/**
 * Get the Sortable instance of an element
 * @param  {HTMLElement} element The element
 * @return {Sortable|undefined}         The instance of Sortable
 */

Sortable.get = function (element) {
  return element[expando];
};
/**
 * Mount a plugin to Sortable
 * @param  {...SortablePlugin|SortablePlugin[]} plugins       Plugins being mounted
 */


Sortable.mount = function () {
  for (var _len = arguments.length, plugins = new Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  if (plugins[0].constructor === Array) plugins = plugins[0];
  plugins.forEach(function (plugin) {
    if (!plugin.prototype || !plugin.prototype.constructor) {
      throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(plugin));
    }

    if (plugin.utils) Sortable.utils = _objectSpread({}, Sortable.utils, plugin.utils);
    PluginManager.mount(plugin);
  });
};
/**
 * Create sortable instance
 * @param {HTMLElement}  el
 * @param {Object}      [options]
 */


Sortable.create = function (el, options) {
  return new Sortable(el, options);
}; // Export


Sortable.version = version;

var autoScrolls = [],
    scrollEl,
    scrollRootEl,
    scrolling = false,
    lastAutoScrollX,
    lastAutoScrollY,
    touchEvt$1,
    pointerElemChangedInterval;

function AutoScrollPlugin() {
  function AutoScroll() {
    this.defaults = {
      scroll: true,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true
    }; // Bind all private methods

    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }
  }

  AutoScroll.prototype = {
    dragStarted: function dragStarted(_ref) {
      var originalEvent = _ref.originalEvent;

      if (this.sortable.nativeDraggable) {
        on(document, 'dragover', this._handleAutoScroll);
      } else {
        if (this.options.supportPointer) {
          on(document, 'pointermove', this._handleFallbackAutoScroll);
        } else if (originalEvent.touches) {
          on(document, 'touchmove', this._handleFallbackAutoScroll);
        } else {
          on(document, 'mousemove', this._handleFallbackAutoScroll);
        }
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref2) {
      var originalEvent = _ref2.originalEvent;

      // For when bubbling is canceled and using fallback (fallback 'touchmove' always reached)
      if (!this.options.dragOverBubble && !originalEvent.rootEl) {
        this._handleAutoScroll(originalEvent);
      }
    },
    drop: function drop() {
      if (this.sortable.nativeDraggable) {
        off(document, 'dragover', this._handleAutoScroll);
      } else {
        off(document, 'pointermove', this._handleFallbackAutoScroll);
        off(document, 'touchmove', this._handleFallbackAutoScroll);
        off(document, 'mousemove', this._handleFallbackAutoScroll);
      }

      clearPointerElemChangedInterval();
      clearAutoScrolls();
      cancelThrottle();
    },
    nulling: function nulling() {
      touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null;
      autoScrolls.length = 0;
    },
    _handleFallbackAutoScroll: function _handleFallbackAutoScroll(evt) {
      this._handleAutoScroll(evt, true);
    },
    _handleAutoScroll: function _handleAutoScroll(evt, fallback) {
      var _this = this;

      var x = (evt.touches ? evt.touches[0] : evt).clientX,
          y = (evt.touches ? evt.touches[0] : evt).clientY,
          elem = document.elementFromPoint(x, y);
      touchEvt$1 = evt; // IE does not seem to have native autoscroll,
      // Edge's autoscroll seems too conditional,
      // MACOS Safari does not have autoscroll,
      // Firefox and Chrome are good

      if (fallback || Edge || IE11OrLess || Safari) {
        autoScroll(evt, this.options, elem, fallback); // Listener for pointer element change

        var ogElemScroller = getParentAutoScrollElement(elem, true);

        if (scrolling && (!pointerElemChangedInterval || x !== lastAutoScrollX || y !== lastAutoScrollY)) {
          pointerElemChangedInterval && clearPointerElemChangedInterval(); // Detect for pointer elem change, emulating native DnD behaviour

          pointerElemChangedInterval = setInterval(function () {
            var newElem = getParentAutoScrollElement(document.elementFromPoint(x, y), true);

            if (newElem !== ogElemScroller) {
              ogElemScroller = newElem;
              clearAutoScrolls();
            }

            autoScroll(evt, _this.options, newElem, fallback);
          }, 10);
          lastAutoScrollX = x;
          lastAutoScrollY = y;
        }
      } else {
        // if DnD is enabled (and browser has good autoscrolling), first autoscroll will already scroll, so get parent autoscroll of first autoscroll
        if (!this.options.bubbleScroll || getParentAutoScrollElement(elem, true) === getWindowScrollingElement()) {
          clearAutoScrolls();
          return;
        }

        autoScroll(evt, this.options, getParentAutoScrollElement(elem, false), false);
      }
    }
  };
  return _extends(AutoScroll, {
    pluginName: 'scroll',
    initializeByDefault: true
  });
}

function clearAutoScrolls() {
  autoScrolls.forEach(function (autoScroll) {
    clearInterval(autoScroll.pid);
  });
  autoScrolls = [];
}

function clearPointerElemChangedInterval() {
  clearInterval(pointerElemChangedInterval);
}

var autoScroll = throttle(function (evt, options, rootEl, isFallback) {
  // Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
  if (!options.scroll) return;
  var x = (evt.touches ? evt.touches[0] : evt).clientX,
      y = (evt.touches ? evt.touches[0] : evt).clientY,
      sens = options.scrollSensitivity,
      speed = options.scrollSpeed,
      winScroller = getWindowScrollingElement();
  var scrollThisInstance = false,
      scrollCustomFn; // New scroll root, set scrollEl

  if (scrollRootEl !== rootEl) {
    scrollRootEl = rootEl;
    clearAutoScrolls();
    scrollEl = options.scroll;
    scrollCustomFn = options.scrollFn;

    if (scrollEl === true) {
      scrollEl = getParentAutoScrollElement(rootEl, true);
    }
  }

  var layersOut = 0;
  var currentParent = scrollEl;

  do {
    var el = currentParent,
        rect = getRect(el),
        top = rect.top,
        bottom = rect.bottom,
        left = rect.left,
        right = rect.right,
        width = rect.width,
        height = rect.height,
        canScrollX = void 0,
        canScrollY = void 0,
        scrollWidth = el.scrollWidth,
        scrollHeight = el.scrollHeight,
        elCSS = css(el),
        scrollPosX = el.scrollLeft,
        scrollPosY = el.scrollTop;

    if (el === winScroller) {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll' || elCSS.overflowX === 'visible');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll' || elCSS.overflowY === 'visible');
    } else {
      canScrollX = width < scrollWidth && (elCSS.overflowX === 'auto' || elCSS.overflowX === 'scroll');
      canScrollY = height < scrollHeight && (elCSS.overflowY === 'auto' || elCSS.overflowY === 'scroll');
    }

    var vx = canScrollX && (Math.abs(right - x) <= sens && scrollPosX + width < scrollWidth) - (Math.abs(left - x) <= sens && !!scrollPosX);
    var vy = canScrollY && (Math.abs(bottom - y) <= sens && scrollPosY + height < scrollHeight) - (Math.abs(top - y) <= sens && !!scrollPosY);

    if (!autoScrolls[layersOut]) {
      for (var i = 0; i <= layersOut; i++) {
        if (!autoScrolls[i]) {
          autoScrolls[i] = {};
        }
      }
    }

    if (autoScrolls[layersOut].vx != vx || autoScrolls[layersOut].vy != vy || autoScrolls[layersOut].el !== el) {
      autoScrolls[layersOut].el = el;
      autoScrolls[layersOut].vx = vx;
      autoScrolls[layersOut].vy = vy;
      clearInterval(autoScrolls[layersOut].pid);

      if (vx != 0 || vy != 0) {
        scrollThisInstance = true;
        /* jshint loopfunc:true */

        autoScrolls[layersOut].pid = setInterval(function () {
          // emulate drag over during autoscroll (fallback), emulating native DnD behaviour
          if (isFallback && this.layer === 0) {
            Sortable.active._onTouchMove(touchEvt$1); // To move ghost if it is positioned absolutely

          }

          var scrollOffsetY = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * speed : 0;
          var scrollOffsetX = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * speed : 0;

          if (typeof scrollCustomFn === 'function') {
            if (scrollCustomFn.call(Sortable.dragged.parentNode[expando], scrollOffsetX, scrollOffsetY, evt, touchEvt$1, autoScrolls[this.layer].el) !== 'continue') {
              return;
            }
          }

          scrollBy(autoScrolls[this.layer].el, scrollOffsetX, scrollOffsetY);
        }.bind({
          layer: layersOut
        }), 24);
      }
    }

    layersOut++;
  } while (options.bubbleScroll && currentParent !== winScroller && (currentParent = getParentAutoScrollElement(currentParent, false)));

  scrolling = scrollThisInstance; // in case another function catches scrolling as false in between when it is not
}, 30);

var drop = function drop(_ref) {
  var originalEvent = _ref.originalEvent,
      putSortable = _ref.putSortable,
      dragEl = _ref.dragEl,
      activeSortable = _ref.activeSortable,
      dispatchSortableEvent = _ref.dispatchSortableEvent,
      hideGhostForTarget = _ref.hideGhostForTarget,
      unhideGhostForTarget = _ref.unhideGhostForTarget;
  if (!originalEvent) return;
  var toSortable = putSortable || activeSortable;
  hideGhostForTarget();
  var touch = originalEvent.changedTouches && originalEvent.changedTouches.length ? originalEvent.changedTouches[0] : originalEvent;
  var target = document.elementFromPoint(touch.clientX, touch.clientY);
  unhideGhostForTarget();

  if (toSortable && !toSortable.el.contains(target)) {
    dispatchSortableEvent('spill');
    this.onSpill({
      dragEl: dragEl,
      putSortable: putSortable
    });
  }
};

function Revert() {}

Revert.prototype = {
  startIndex: null,
  dragStart: function dragStart(_ref2) {
    var oldDraggableIndex = _ref2.oldDraggableIndex;
    this.startIndex = oldDraggableIndex;
  },
  onSpill: function onSpill(_ref3) {
    var dragEl = _ref3.dragEl,
        putSortable = _ref3.putSortable;
    this.sortable.captureAnimationState();

    if (putSortable) {
      putSortable.captureAnimationState();
    }

    var nextSibling = getChild(this.sortable.el, this.startIndex, this.options);

    if (nextSibling) {
      this.sortable.el.insertBefore(dragEl, nextSibling);
    } else {
      this.sortable.el.appendChild(dragEl);
    }

    this.sortable.animateAll();

    if (putSortable) {
      putSortable.animateAll();
    }
  },
  drop: drop
};

_extends(Revert, {
  pluginName: 'revertOnSpill'
});

function Remove() {}

Remove.prototype = {
  onSpill: function onSpill(_ref4) {
    var dragEl = _ref4.dragEl,
        putSortable = _ref4.putSortable;
    var parentSortable = putSortable || this.sortable;
    parentSortable.captureAnimationState();
    dragEl.parentNode && dragEl.parentNode.removeChild(dragEl);
    parentSortable.animateAll();
  },
  drop: drop
};

_extends(Remove, {
  pluginName: 'removeOnSpill'
});

var lastSwapEl;

function SwapPlugin() {
  function Swap() {
    this.defaults = {
      swapClass: 'sortable-swap-highlight'
    };
  }

  Swap.prototype = {
    dragStart: function dragStart(_ref) {
      var dragEl = _ref.dragEl;
      lastSwapEl = dragEl;
    },
    dragOverValid: function dragOverValid(_ref2) {
      var completed = _ref2.completed,
          target = _ref2.target,
          onMove = _ref2.onMove,
          activeSortable = _ref2.activeSortable,
          changed = _ref2.changed,
          cancel = _ref2.cancel;
      if (!activeSortable.options.swap) return;
      var el = this.sortable.el,
          options = this.options;

      if (target && target !== el) {
        var prevSwapEl = lastSwapEl;

        if (onMove(target) !== false) {
          toggleClass(target, options.swapClass, true);
          lastSwapEl = target;
        } else {
          lastSwapEl = null;
        }

        if (prevSwapEl && prevSwapEl !== lastSwapEl) {
          toggleClass(prevSwapEl, options.swapClass, false);
        }
      }

      changed();
      completed(true);
      cancel();
    },
    drop: function drop(_ref3) {
      var activeSortable = _ref3.activeSortable,
          putSortable = _ref3.putSortable,
          dragEl = _ref3.dragEl;
      var toSortable = putSortable || this.sortable;
      var options = this.options;
      lastSwapEl && toggleClass(lastSwapEl, options.swapClass, false);

      if (lastSwapEl && (options.swap || putSortable && putSortable.options.swap)) {
        if (dragEl !== lastSwapEl) {
          toSortable.captureAnimationState();
          if (toSortable !== activeSortable) activeSortable.captureAnimationState();
          swapNodes(dragEl, lastSwapEl);
          toSortable.animateAll();
          if (toSortable !== activeSortable) activeSortable.animateAll();
        }
      }
    },
    nulling: function nulling() {
      lastSwapEl = null;
    }
  };
  return _extends(Swap, {
    pluginName: 'swap',
    eventProperties: function eventProperties() {
      return {
        swapItem: lastSwapEl
      };
    }
  });
}

function swapNodes(n1, n2) {
  var p1 = n1.parentNode,
      p2 = n2.parentNode,
      i1,
      i2;
  if (!p1 || !p2 || p1.isEqualNode(n2) || p2.isEqualNode(n1)) return;
  i1 = index(n1);
  i2 = index(n2);

  if (p1.isEqualNode(p2) && i1 < i2) {
    i2++;
  }

  p1.insertBefore(n2, p1.children[i1]);
  p2.insertBefore(n1, p2.children[i2]);
}

var multiDragElements = [],
    multiDragClones = [],
    lastMultiDragSelect,
    // for selection with modifier key down (SHIFT)
multiDragSortable,
    initialFolding = false,
    // Initial multi-drag fold when drag started
folding = false,
    // Folding any other time
dragStarted = false,
    dragEl$1,
    clonesFromRect,
    clonesHidden;

function MultiDragPlugin() {
  function MultiDrag(sortable) {
    // Bind all private methods
    for (var fn in this) {
      if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
        this[fn] = this[fn].bind(this);
      }
    }

    if (sortable.options.supportPointer) {
      on(document, 'pointerup', this._deselectMultiDrag);
    } else {
      on(document, 'mouseup', this._deselectMultiDrag);
      on(document, 'touchend', this._deselectMultiDrag);
    }

    on(document, 'keydown', this._checkKeyDown);
    on(document, 'keyup', this._checkKeyUp);
    this.defaults = {
      selectedClass: 'sortable-selected',
      multiDragKey: null,
      setData: function setData(dataTransfer, dragEl) {
        var data = '';

        if (multiDragElements.length && multiDragSortable === sortable) {
          multiDragElements.forEach(function (multiDragElement, i) {
            data += (!i ? '' : ', ') + multiDragElement.textContent;
          });
        } else {
          data = dragEl.textContent;
        }

        dataTransfer.setData('Text', data);
      }
    };
  }

  MultiDrag.prototype = {
    multiDragKeyDown: false,
    isMultiDrag: false,
    delayStartGlobal: function delayStartGlobal(_ref) {
      var dragged = _ref.dragEl;
      dragEl$1 = dragged;
    },
    delayEnded: function delayEnded() {
      this.isMultiDrag = ~multiDragElements.indexOf(dragEl$1);
    },
    setupClone: function setupClone(_ref2) {
      var sortable = _ref2.sortable,
          cancel = _ref2.cancel;
      if (!this.isMultiDrag) return;

      for (var i = 0; i < multiDragElements.length; i++) {
        multiDragClones.push(clone(multiDragElements[i]));
        multiDragClones[i].sortableIndex = multiDragElements[i].sortableIndex;
        multiDragClones[i].draggable = false;
        multiDragClones[i].style['will-change'] = '';
        toggleClass(multiDragClones[i], this.options.selectedClass, false);
        multiDragElements[i] === dragEl$1 && toggleClass(multiDragClones[i], this.options.chosenClass, false);
      }

      sortable._hideClone();

      cancel();
    },
    clone: function clone(_ref3) {
      var sortable = _ref3.sortable,
          rootEl = _ref3.rootEl,
          dispatchSortableEvent = _ref3.dispatchSortableEvent,
          cancel = _ref3.cancel;
      if (!this.isMultiDrag) return;

      if (!this.options.removeCloneOnHide) {
        if (multiDragElements.length && multiDragSortable === sortable) {
          insertMultiDragClones(true, rootEl);
          dispatchSortableEvent('clone');
          cancel();
        }
      }
    },
    showClone: function showClone(_ref4) {
      var cloneNowShown = _ref4.cloneNowShown,
          rootEl = _ref4.rootEl,
          cancel = _ref4.cancel;
      if (!this.isMultiDrag) return;
      insertMultiDragClones(false, rootEl);
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', '');
      });
      cloneNowShown();
      clonesHidden = false;
      cancel();
    },
    hideClone: function hideClone(_ref5) {
      var _this = this;

      var sortable = _ref5.sortable,
          cloneNowHidden = _ref5.cloneNowHidden,
          cancel = _ref5.cancel;
      if (!this.isMultiDrag) return;
      multiDragClones.forEach(function (clone) {
        css(clone, 'display', 'none');

        if (_this.options.removeCloneOnHide && clone.parentNode) {
          clone.parentNode.removeChild(clone);
        }
      });
      cloneNowHidden();
      clonesHidden = true;
      cancel();
    },
    dragStartGlobal: function dragStartGlobal(_ref6) {
      var sortable = _ref6.sortable;

      if (!this.isMultiDrag && multiDragSortable) {
        multiDragSortable.multiDrag._deselectMultiDrag();
      }

      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.sortableIndex = index(multiDragElement);
      }); // Sort multi-drag elements

      multiDragElements = multiDragElements.sort(function (a, b) {
        return a.sortableIndex - b.sortableIndex;
      });
      dragStarted = true;
    },
    dragStarted: function dragStarted(_ref7) {
      var _this2 = this;

      var sortable = _ref7.sortable;
      if (!this.isMultiDrag) return;

      if (this.options.sort) {
        // Capture rects,
        // hide multi drag elements (by positioning them absolute),
        // set multi drag elements rects to dragRect,
        // show multi drag elements,
        // animate to rects,
        // unset rects & remove from DOM
        sortable.captureAnimationState();

        if (this.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            css(multiDragElement, 'position', 'absolute');
          });
          var dragRect = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRect);
          });
          folding = true;
          initialFolding = true;
        }
      }

      sortable.animateAll(function () {
        folding = false;
        initialFolding = false;

        if (_this2.options.animation) {
          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
        } // Remove all auxiliary multidrag items from el, if sorting enabled


        if (_this2.options.sort) {
          removeMultiDragElements();
        }
      });
    },
    dragOver: function dragOver(_ref8) {
      var target = _ref8.target,
          completed = _ref8.completed,
          cancel = _ref8.cancel;

      if (folding && ~multiDragElements.indexOf(target)) {
        completed(false);
        cancel();
      }
    },
    revert: function revert(_ref9) {
      var fromSortable = _ref9.fromSortable,
          rootEl = _ref9.rootEl,
          sortable = _ref9.sortable,
          dragRect = _ref9.dragRect;

      if (multiDragElements.length > 1) {
        // Setup unfold animation
        multiDragElements.forEach(function (multiDragElement) {
          sortable.addAnimationState({
            target: multiDragElement,
            rect: folding ? getRect(multiDragElement) : dragRect
          });
          unsetRect(multiDragElement);
          multiDragElement.fromRect = dragRect;
          fromSortable.removeAnimationState(multiDragElement);
        });
        folding = false;
        insertMultiDragElements(!this.options.removeCloneOnHide, rootEl);
      }
    },
    dragOverCompleted: function dragOverCompleted(_ref10) {
      var sortable = _ref10.sortable,
          isOwner = _ref10.isOwner,
          insertion = _ref10.insertion,
          activeSortable = _ref10.activeSortable,
          parentEl = _ref10.parentEl,
          putSortable = _ref10.putSortable;
      var options = this.options;

      if (insertion) {
        // Clones must be hidden before folding animation to capture dragRectAbsolute properly
        if (isOwner) {
          activeSortable._hideClone();
        }

        initialFolding = false; // If leaving sort:false root, or already folding - Fold to new location

        if (options.animation && multiDragElements.length > 1 && (folding || !isOwner && !activeSortable.options.sort && !putSortable)) {
          // Fold: Set all multi drag elements's rects to dragEl's rect when multi-drag elements are invisible
          var dragRectAbsolute = getRect(dragEl$1, false, true, true);
          multiDragElements.forEach(function (multiDragElement) {
            if (multiDragElement === dragEl$1) return;
            setRect(multiDragElement, dragRectAbsolute); // Move element(s) to end of parentEl so that it does not interfere with multi-drag clones insertion if they are inserted
            // while folding, and so that we can capture them again because old sortable will no longer be fromSortable

            parentEl.appendChild(multiDragElement);
          });
          folding = true;
        } // Clones must be shown (and check to remove multi drags) after folding when interfering multiDragElements are moved out


        if (!isOwner) {
          // Only remove if not folding (folding will remove them anyways)
          if (!folding) {
            removeMultiDragElements();
          }

          if (multiDragElements.length > 1) {
            var clonesHiddenBefore = clonesHidden;

            activeSortable._showClone(sortable); // Unfold animation for clones if showing from hidden


            if (activeSortable.options.animation && !clonesHidden && clonesHiddenBefore) {
              multiDragClones.forEach(function (clone) {
                activeSortable.addAnimationState({
                  target: clone,
                  rect: clonesFromRect
                });
                clone.fromRect = clonesFromRect;
                clone.thisAnimationDuration = null;
              });
            }
          } else {
            activeSortable._showClone(sortable);
          }
        }
      }
    },
    dragOverAnimationCapture: function dragOverAnimationCapture(_ref11) {
      var dragRect = _ref11.dragRect,
          isOwner = _ref11.isOwner,
          activeSortable = _ref11.activeSortable;
      multiDragElements.forEach(function (multiDragElement) {
        multiDragElement.thisAnimationDuration = null;
      });

      if (activeSortable.options.animation && !isOwner && activeSortable.multiDrag.isMultiDrag) {
        clonesFromRect = _extends({}, dragRect);
        var dragMatrix = matrix(dragEl$1, true);
        clonesFromRect.top -= dragMatrix.f;
        clonesFromRect.left -= dragMatrix.e;
      }
    },
    dragOverAnimationComplete: function dragOverAnimationComplete() {
      if (folding) {
        folding = false;
        removeMultiDragElements();
      }
    },
    drop: function drop(_ref12) {
      var evt = _ref12.originalEvent,
          rootEl = _ref12.rootEl,
          parentEl = _ref12.parentEl,
          sortable = _ref12.sortable,
          dispatchSortableEvent = _ref12.dispatchSortableEvent,
          oldIndex = _ref12.oldIndex,
          putSortable = _ref12.putSortable;
      var toSortable = putSortable || this.sortable;
      if (!evt) return;
      var options = this.options,
          children = parentEl.children; // Multi-drag selection

      if (!dragStarted) {
        if (options.multiDragKey && !this.multiDragKeyDown) {
          this._deselectMultiDrag();
        }

        toggleClass(dragEl$1, options.selectedClass, !~multiDragElements.indexOf(dragEl$1));

        if (!~multiDragElements.indexOf(dragEl$1)) {
          multiDragElements.push(dragEl$1);
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'select',
            targetEl: dragEl$1,
            originalEvt: evt
          }); // Modifier activated, select from last to dragEl

          if (evt.shiftKey && lastMultiDragSelect && sortable.el.contains(lastMultiDragSelect)) {
            var lastIndex = index(lastMultiDragSelect),
                currentIndex = index(dragEl$1);

            if (~lastIndex && ~currentIndex && lastIndex !== currentIndex) {
              // Must include lastMultiDragSelect (select it), in case modified selection from no selection
              // (but previous selection existed)
              var n, i;

              if (currentIndex > lastIndex) {
                i = lastIndex;
                n = currentIndex;
              } else {
                i = currentIndex;
                n = lastIndex + 1;
              }

              for (; i < n; i++) {
                if (~multiDragElements.indexOf(children[i])) continue;
                toggleClass(children[i], options.selectedClass, true);
                multiDragElements.push(children[i]);
                dispatchEvent({
                  sortable: sortable,
                  rootEl: rootEl,
                  name: 'select',
                  targetEl: children[i],
                  originalEvt: evt
                });
              }
            }
          } else {
            lastMultiDragSelect = dragEl$1;
          }

          multiDragSortable = toSortable;
        } else {
          multiDragElements.splice(multiDragElements.indexOf(dragEl$1), 1);
          lastMultiDragSelect = null;
          dispatchEvent({
            sortable: sortable,
            rootEl: rootEl,
            name: 'deselect',
            targetEl: dragEl$1,
            originalEvt: evt
          });
        }
      } // Multi-drag drop


      if (dragStarted && this.isMultiDrag) {
        // Do not "unfold" after around dragEl if reverted
        if ((parentEl[expando].options.sort || parentEl !== rootEl) && multiDragElements.length > 1) {
          var dragRect = getRect(dragEl$1),
              multiDragIndex = index(dragEl$1, ':not(.' + this.options.selectedClass + ')');
          if (!initialFolding && options.animation) dragEl$1.thisAnimationDuration = null;
          toSortable.captureAnimationState();

          if (!initialFolding) {
            if (options.animation) {
              dragEl$1.fromRect = dragRect;
              multiDragElements.forEach(function (multiDragElement) {
                multiDragElement.thisAnimationDuration = null;

                if (multiDragElement !== dragEl$1) {
                  var rect = folding ? getRect(multiDragElement) : dragRect;
                  multiDragElement.fromRect = rect; // Prepare unfold animation

                  toSortable.addAnimationState({
                    target: multiDragElement,
                    rect: rect
                  });
                }
              });
            } // Multi drag elements are not necessarily removed from the DOM on drop, so to reinsert
            // properly they must all be removed


            removeMultiDragElements();
            multiDragElements.forEach(function (multiDragElement) {
              if (children[multiDragIndex]) {
                parentEl.insertBefore(multiDragElement, children[multiDragIndex]);
              } else {
                parentEl.appendChild(multiDragElement);
              }

              multiDragIndex++;
            }); // If initial folding is done, the elements may have changed position because they are now
            // unfolding around dragEl, even though dragEl may not have his index changed, so update event
            // must be fired here as Sortable will not.

            if (oldIndex === index(dragEl$1)) {
              var update = false;
              multiDragElements.forEach(function (multiDragElement) {
                if (multiDragElement.sortableIndex !== index(multiDragElement)) {
                  update = true;
                  return;
                }
              });

              if (update) {
                dispatchSortableEvent('update');
              }
            }
          } // Must be done after capturing individual rects (scroll bar)


          multiDragElements.forEach(function (multiDragElement) {
            unsetRect(multiDragElement);
          });
          toSortable.animateAll();
        }

        multiDragSortable = toSortable;
      } // Remove clones if necessary


      if (rootEl === parentEl || putSortable && putSortable.lastPutMode !== 'clone') {
        multiDragClones.forEach(function (clone) {
          clone.parentNode && clone.parentNode.removeChild(clone);
        });
      }
    },
    nullingGlobal: function nullingGlobal() {
      this.isMultiDrag = dragStarted = false;
      multiDragClones.length = 0;
    },
    destroyGlobal: function destroyGlobal() {
      this._deselectMultiDrag();

      off(document, 'pointerup', this._deselectMultiDrag);
      off(document, 'mouseup', this._deselectMultiDrag);
      off(document, 'touchend', this._deselectMultiDrag);
      off(document, 'keydown', this._checkKeyDown);
      off(document, 'keyup', this._checkKeyUp);
    },
    _deselectMultiDrag: function _deselectMultiDrag(evt) {
      if (typeof dragStarted !== "undefined" && dragStarted) return; // Only deselect if selection is in this sortable

      if (multiDragSortable !== this.sortable) return; // Only deselect if target is not item in this sortable

      if (evt && closest(evt.target, this.options.draggable, this.sortable.el, false)) return; // Only deselect if left click

      if (evt && evt.button !== 0) return;

      while (multiDragElements.length) {
        var el = multiDragElements[0];
        toggleClass(el, this.options.selectedClass, false);
        multiDragElements.shift();
        dispatchEvent({
          sortable: this.sortable,
          rootEl: this.sortable.el,
          name: 'deselect',
          targetEl: el,
          originalEvt: evt
        });
      }
    },
    _checkKeyDown: function _checkKeyDown(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = true;
      }
    },
    _checkKeyUp: function _checkKeyUp(evt) {
      if (evt.key === this.options.multiDragKey) {
        this.multiDragKeyDown = false;
      }
    }
  };
  return _extends(MultiDrag, {
    // Static methods & properties
    pluginName: 'multiDrag',
    utils: {
      /**
       * Selects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be selected
       */
      select: function select(el) {
        var sortable = el.parentNode[expando];
        if (!sortable || !sortable.options.multiDrag || ~multiDragElements.indexOf(el)) return;

        if (multiDragSortable && multiDragSortable !== sortable) {
          multiDragSortable.multiDrag._deselectMultiDrag();

          multiDragSortable = sortable;
        }

        toggleClass(el, sortable.options.selectedClass, true);
        multiDragElements.push(el);
      },

      /**
       * Deselects the provided multi-drag item
       * @param  {HTMLElement} el    The element to be deselected
       */
      deselect: function deselect(el) {
        var sortable = el.parentNode[expando],
            index = multiDragElements.indexOf(el);
        if (!sortable || !sortable.options.multiDrag || !~index) return;
        toggleClass(el, sortable.options.selectedClass, false);
        multiDragElements.splice(index, 1);
      }
    },
    eventProperties: function eventProperties() {
      var _this3 = this;

      var oldIndicies = [],
          newIndicies = [];
      multiDragElements.forEach(function (multiDragElement) {
        oldIndicies.push({
          multiDragElement: multiDragElement,
          index: multiDragElement.sortableIndex
        }); // multiDragElements will already be sorted if folding

        var newIndex;

        if (folding && multiDragElement !== dragEl$1) {
          newIndex = -1;
        } else if (folding) {
          newIndex = index(multiDragElement, ':not(.' + _this3.options.selectedClass + ')');
        } else {
          newIndex = index(multiDragElement);
        }

        newIndicies.push({
          multiDragElement: multiDragElement,
          index: newIndex
        });
      });
      return {
        items: _toConsumableArray(multiDragElements),
        clones: [].concat(multiDragClones),
        oldIndicies: oldIndicies,
        newIndicies: newIndicies
      };
    },
    optionListeners: {
      multiDragKey: function multiDragKey(key) {
        key = key.toLowerCase();

        if (key === 'ctrl') {
          key = 'Control';
        } else if (key.length > 1) {
          key = key.charAt(0).toUpperCase() + key.substr(1);
        }

        return key;
      }
    }
  });
}

function insertMultiDragElements(clonesInserted, rootEl) {
  multiDragElements.forEach(function (multiDragElement, i) {
    var target = rootEl.children[multiDragElement.sortableIndex + (clonesInserted ? Number(i) : 0)];

    if (target) {
      rootEl.insertBefore(multiDragElement, target);
    } else {
      rootEl.appendChild(multiDragElement);
    }
  });
}
/**
 * Insert multi-drag clones
 * @param  {[Boolean]} elementsInserted  Whether the multi-drag elements are inserted
 * @param  {HTMLElement} rootEl
 */


function insertMultiDragClones(elementsInserted, rootEl) {
  multiDragClones.forEach(function (clone, i) {
    var target = rootEl.children[clone.sortableIndex + (elementsInserted ? Number(i) : 0)];

    if (target) {
      rootEl.insertBefore(clone, target);
    } else {
      rootEl.appendChild(clone);
    }
  });
}

function removeMultiDragElements() {
  multiDragElements.forEach(function (multiDragElement) {
    if (multiDragElement === dragEl$1) return;
    multiDragElement.parentNode && multiDragElement.parentNode.removeChild(multiDragElement);
  });
}

Sortable.mount(new AutoScrollPlugin());
Sortable.mount(Remove, Revert);

/* harmony default export */ __webpack_exports__["default"] = (Sortable);



/***/ }),

/***/ "aae3":
/***/ (function(module, exports, __webpack_require__) {

// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__("d3f4");
var cof = __webpack_require__("2d95");
var MATCH = __webpack_require__("2b4c")('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};


/***/ }),

/***/ "ac4d":
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("3a72")('asyncIterator');


/***/ }),

/***/ "ac6a":
/***/ (function(module, exports, __webpack_require__) {

var $iterators = __webpack_require__("cadf");
var getKeys = __webpack_require__("0d58");
var redefine = __webpack_require__("2aba");
var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var Iterators = __webpack_require__("84f2");
var wks = __webpack_require__("2b4c");
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) if (!proto[key]) redefine(proto, key, $iterators[key], true);
  }
}


/***/ }),

/***/ "ade3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _defineProperty; });
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

/***/ }),

/***/ "b0c5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpExec = __webpack_require__("520a");
__webpack_require__("5ca1")({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});


/***/ }),

/***/ "b189":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keysShim;
if (!Object.keys) {
	// modified from https://github.com/es-shims/es5-shim
	var has = Object.prototype.hasOwnProperty;
	var toStr = Object.prototype.toString;
	var isArgs = __webpack_require__("d4ab"); // eslint-disable-line global-require
	var isEnumerable = Object.prototype.propertyIsEnumerable;
	var hasDontEnumBug = !isEnumerable.call({ toString: null }, 'toString');
	var hasProtoEnumBug = isEnumerable.call(function () {}, 'prototype');
	var dontEnums = [
		'toString',
		'toLocaleString',
		'valueOf',
		'hasOwnProperty',
		'isPrototypeOf',
		'propertyIsEnumerable',
		'constructor'
	];
	var equalsConstructorPrototype = function (o) {
		var ctor = o.constructor;
		return ctor && ctor.prototype === o;
	};
	var excludedKeys = {
		$applicationCache: true,
		$console: true,
		$external: true,
		$frame: true,
		$frameElement: true,
		$frames: true,
		$innerHeight: true,
		$innerWidth: true,
		$onmozfullscreenchange: true,
		$onmozfullscreenerror: true,
		$outerHeight: true,
		$outerWidth: true,
		$pageXOffset: true,
		$pageYOffset: true,
		$parent: true,
		$scrollLeft: true,
		$scrollTop: true,
		$scrollX: true,
		$scrollY: true,
		$self: true,
		$webkitIndexedDB: true,
		$webkitStorageInfo: true,
		$window: true
	};
	var hasAutomationEqualityBug = (function () {
		/* global window */
		if (typeof window === 'undefined') { return false; }
		for (var k in window) {
			try {
				if (!excludedKeys['$' + k] && has.call(window, k) && window[k] !== null && typeof window[k] === 'object') {
					try {
						equalsConstructorPrototype(window[k]);
					} catch (e) {
						return true;
					}
				}
			} catch (e) {
				return true;
			}
		}
		return false;
	}());
	var equalsConstructorPrototypeIfNotBuggy = function (o) {
		/* global window */
		if (typeof window === 'undefined' || !hasAutomationEqualityBug) {
			return equalsConstructorPrototype(o);
		}
		try {
			return equalsConstructorPrototype(o);
		} catch (e) {
			return false;
		}
	};

	keysShim = function keys(object) {
		var isObject = object !== null && typeof object === 'object';
		var isFunction = toStr.call(object) === '[object Function]';
		var isArguments = isArgs(object);
		var isString = isObject && toStr.call(object) === '[object String]';
		var theKeys = [];

		if (!isObject && !isFunction && !isArguments) {
			throw new TypeError('Object.keys called on a non-object');
		}

		var skipProto = hasProtoEnumBug && isFunction;
		if (isString && object.length > 0 && !has.call(object, 0)) {
			for (var i = 0; i < object.length; ++i) {
				theKeys.push(String(i));
			}
		}

		if (isArguments && object.length > 0) {
			for (var j = 0; j < object.length; ++j) {
				theKeys.push(String(j));
			}
		} else {
			for (var name in object) {
				if (!(skipProto && name === 'prototype') && has.call(object, name)) {
					theKeys.push(String(name));
				}
			}
		}

		if (hasDontEnumBug) {
			var skipConstructor = equalsConstructorPrototypeIfNotBuggy(object);

			for (var k = 0; k < dontEnums.length; ++k) {
				if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
					theKeys.push(dontEnums[k]);
				}
			}
		}
		return theKeys;
	};
}
module.exports = keysShim;


/***/ }),

/***/ "b1f2":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GLOBAL_CONFIG; });
var GLOBAL_CONFIG = {
  rendererFormId: "vue-form-render-pro-max" // ID of <form> for Renderer

};


/***/ }),

/***/ "b2b8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

/* eslint global-require: 0 */
// the code is structured this way so that bundlers can
// alias out `has-symbols` to `() => true` or `() => false` if your target
// environments' Symbol capabilities are known, and then use
// dead code elimination on the rest of this module.
//
// Similarly, `isarray` can be aliased to `Array.isArray` if
// available in all target environments.

var isArguments = __webpack_require__("e39c");

if (__webpack_require__("5156")() || __webpack_require__("1696")()) {
	var $iterator = Symbol.iterator;
	// Symbol is available natively or shammed
	// natively:
	//  - Chrome >= 38
	//  - Edge 12-14?, Edge >= 15 for sure
	//  - FF >= 36
	//  - Safari >= 9
	//  - node >= 0.12
	module.exports = function getIterator(iterable) {
		// alternatively, `iterable[$iterator]?.()`
		if (iterable != null && typeof iterable[$iterator] !== 'undefined') {
			return iterable[$iterator]();
		}
		if (isArguments(iterable)) {
			// arguments objects lack Symbol.iterator
			// - node 0.12
			return Array.prototype[$iterator].call(iterable);
		}
	};
} else {
	// Symbol is not available, native or shammed
	var isArray = __webpack_require__("e3db");
	var isString = __webpack_require__("55b2");
	var GetIntrinsic = __webpack_require__("e9ac");
	var $Map = GetIntrinsic('%Map%', true);
	var $Set = GetIntrinsic('%Set%', true);
	var callBound = __webpack_require__("2a1a");
	var $arrayPush = callBound('Array.prototype.push');
	var $charCodeAt = callBound('String.prototype.charCodeAt');
	var $stringSlice = callBound('String.prototype.slice');

	var advanceStringIndex = function advanceStringIndex(S, index) {
		var length = S.length;
		if ((index + 1) >= length) {
			return index + 1;
		}

		var first = $charCodeAt(S, index);
		if (first < 0xD800 || first > 0xDBFF) {
			return index + 1;
		}

		var second = $charCodeAt(S, index + 1);
		if (second < 0xDC00 || second > 0xDFFF) {
			return index + 1;
		}

		return index + 2;
	};

	var getArrayIterator = function getArrayIterator(arraylike) {
		var i = 0;
		return {
			next: function next() {
				var done = i >= arraylike.length;
				var value;
				if (!done) {
					value = arraylike[i];
					i += 1;
				}
				return {
					done: done,
					value: value
				};
			}
		};
	};

	var getNonCollectionIterator = function getNonCollectionIterator(iterable) {
		if (isArray(iterable) || isArguments(iterable)) {
			return getArrayIterator(iterable);
		}
		if (isString(iterable)) {
			var i = 0;
			return {
				next: function next() {
					var nextIndex = advanceStringIndex(iterable, i);
					var value = $stringSlice(iterable, i, nextIndex);
					i = nextIndex;
					return {
						done: nextIndex > iterable.length,
						value: value
					};
				}
			};
		}
	};

	if (!$Map && !$Set) {
		// the only language iterables are Array, String, arguments
		// - Safari <= 6.0
		// - Chrome < 38
		// - node < 0.12
		// - FF < 13
		// - IE < 11
		// - Edge < 11

		module.exports = getNonCollectionIterator;
	} else {
		// either Map or Set are available, but Symbol is not
		// - es6-shim on an ES5 browser
		// - Safari 6.2 (maybe 6.1?)
		// - FF v[13, 36)
		// - IE 11
		// - Edge 11
		// - Safari v[6, 9)

		var isMap = __webpack_require__("fd13");
		var isSet = __webpack_require__("be03");

		// Firefox >= 27, IE 11, Safari 6.2 - 9, Edge 11, es6-shim in older envs, all have forEach
		var $mapForEach = callBound('Map.prototype.forEach', true);
		var $setForEach = callBound('Set.prototype.forEach', true);
		if (typeof process === 'undefined' || !process.versions || !process.versions.node) { // "if is not node"

			// Firefox 17 - 26 has `.iterator()`, whose iterator `.next()` either
			// returns a value, or throws a StopIteration object. These browsers
			// do not have any other mechanism for iteration.
			var $mapIterator = callBound('Map.prototype.iterator', true);
			var $setIterator = callBound('Set.prototype.iterator', true);
			var getStopIterationIterator = function (iterator) {
				var done = false;
				return {
					next: function next() {
						try {
							return {
								done: done,
								value: done ? undefined : iterator.next()
							};
						} catch (e) {
							done = true;
							return {
								done: true,
								value: undefined
							};
						}
					}
				};
			};
		}
		// Firefox 27-35, and some older es6-shim versions, use a string "@@iterator" property
		// this returns a proper iterator object, so we should use it instead of forEach.
		// newer es6-shim versions use a string "_es6-shim iterator_" property.
		var $mapAtAtIterator = callBound('Map.prototype.@@iterator', true) || callBound('Map.prototype._es6-shim iterator_', true);
		var $setAtAtIterator = callBound('Set.prototype.@@iterator', true) || callBound('Set.prototype._es6-shim iterator_', true);

		var getCollectionIterator = function getCollectionIterator(iterable) {
			if (isMap(iterable)) {
				if ($mapIterator) {
					return getStopIterationIterator($mapIterator(iterable));
				}
				if ($mapAtAtIterator) {
					return $mapAtAtIterator(iterable);
				}
				if ($mapForEach) {
					var entries = [];
					$mapForEach(iterable, function (v, k) {
						$arrayPush(entries, [k, v]);
					});
					return getArrayIterator(entries);
				}
			}
			if (isSet(iterable)) {
				if ($setIterator) {
					return getStopIterationIterator($setIterator(iterable));
				}
				if ($setAtAtIterator) {
					return $setAtAtIterator(iterable);
				}
				if ($setForEach) {
					var values = [];
					$setForEach(iterable, function (v) {
						$arrayPush(values, v);
					});
					return getArrayIterator(values);
				}
			}
		};

		module.exports = function getIterator(iterable) {
			return getCollectionIterator(iterable) || getNonCollectionIterator(iterable);
		};
	}
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "b2bf":
/***/ (function(module, exports) {


/**
 * Array#filter.
 *
 * @param {Array} arr
 * @param {Function} fn
 * @param {Object=} self
 * @return {Array}
 * @throw TypeError
 */

module.exports = function (arr, fn, self) {
  if (arr.filter) return arr.filter(fn, self);
  if (void 0 === arr || null === arr) throw new TypeError;
  if ('function' != typeof fn) throw new TypeError;
  var ret = [];
  for (var i = 0; i < arr.length; i++) {
    if (!hasOwn.call(arr, i)) continue;
    var val = arr[i];
    if (fn.call(self, val, i, arr)) ret.push(val);
  }
  return ret;
};

var hasOwn = Object.prototype.hasOwnProperty;


/***/ }),

/***/ "b635":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "f", function() { return VueFormBuilderPlugin; });
/* harmony import */ var _installer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2560");
/* harmony import */ var _components_FormBuilder__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("6a29");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "c", function() { return _components_FormBuilder__WEBPACK_IMPORTED_MODULE_1__["a"]; });

/* harmony import */ var _components_FormRenderer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("fbdb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "d", function() { return _components_FormRenderer__WEBPACK_IMPORTED_MODULE_2__["a"]; });

/* harmony import */ var _skeletons_controls_BaseControlSkeleton__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("c72d");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _skeletons_controls_BaseControlSkeleton__WEBPACK_IMPORTED_MODULE_3__["a"]; });

/* harmony import */ var _skeletons_controls_BaseControlConfigSkeleton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__("da2a");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _skeletons_controls_BaseControlConfigSkeleton__WEBPACK_IMPORTED_MODULE_4__["a"]; });

/* harmony import */ var _views_builder_GlobalSidebar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__("4ad6");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "e", function() { return _views_builder_GlobalSidebar__WEBPACK_IMPORTED_MODULE_5__["a"]; });

/* harmony import */ var _assets_v_form_builder_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__("c992");
/* harmony import */ var _assets_v_form_builder_css__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_assets_v_form_builder_css__WEBPACK_IMPORTED_MODULE_6__);






 // Create module definition for Vue.use()

var VueFormBuilderPlugin = {
  install: _installer__WEBPACK_IMPORTED_MODULE_0__[/* VueFormBuilderInstaller */ "a"]
}; // For Browser-Vue's purpose
// Export the VueFormBuilderPlugin to let developers register it later.
// I won't automatically register it, therefore you would have a big chance to
// - Configure the Internal Configuration of the Form
// - Extendable (Registering more controls, Styling Classes,...)
// - ...

if (typeof window !== 'undefined') {
  window.VueFormBuilderPlugin = VueFormBuilderPlugin;
} else if (typeof global !== 'undefined') {
  global.VueFormBuilderPlugin = VueFormBuilderPlugin;
}


/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "ba92":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)

var toObject = __webpack_require__("4bf8");
var toAbsoluteIndex = __webpack_require__("77f1");
var toLength = __webpack_require__("9def");

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];
    else delete O[to];
    to += inc;
    from += inc;
  } return O;
};


/***/ }),

/***/ "bcc7":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ FORM_BUILDER_METHODS; });

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.sort.js
var es6_array_sort = __webpack_require__("55dd");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 5 modules
var slicedToArray = __webpack_require__("3835");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.entries.js
var es7_object_entries = __webpack_require__("ffc1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./src/configs/section.js + 83 modules
var section = __webpack_require__("dd3c");

// EXTERNAL MODULE: ./src/configs/controls.js + 92 modules
var controls = __webpack_require__("8dbe");

// EXTERNAL MODULE: ./src/configs/form.js
var configs_form = __webpack_require__("22a0");

// EXTERNAL MODULE: ./src/libraries/helper.js
var helper = __webpack_require__("43b3");

// EXTERNAL MODULE: ./src/configs/row.js
var row = __webpack_require__("7d7e");

// CONCATENATED MODULE: ./src/libraries/applier.js










/**
 * Applier is an extending-object to make sure your old form-configuration still working well with the new version
 * @author Phat Tran
 * @param {{formConfig: Object, sections: Array, rows: Object, controls: Object}|undefined} formConfigObject
 * @return {Object} Final Object that can always use with the Form-Builder/Renderer
 */

var applier_dataApplier = function dataApplier(formConfigObject) {
  var appliedObject = {
    formConfig: {},
    sections: {},
    rows: {},
    controls: {}
  }; // base-created-form

  if (!formConfigObject) {
    appliedObject.formConfig = helper["a" /* HELPER */].cloneDeep(configs_form["a" /* FORM_DEFAULT_DATA */]);
    return appliedObject;
  } // Form-Config Apply


  appliedObject.formConfig = Object.assign({}, configs_form["a" /* FORM_DEFAULT_DATA */], formConfigObject.formConfig); // Section(s) Apply

  for (var _i = 0, _Object$entries = Object.entries(formConfigObject.sections); _i < _Object$entries.length; _i++) {
    var _Object$entries$_i = Object(slicedToArray["a" /* default */])(_Object$entries[_i], 2),
        sectionId = _Object$entries$_i[0],
        sectionObject = _Object$entries$_i[1];

    appliedObject.sections[sectionId] = baseObjectExtend(section["a" /* SECTION_DEFAULT_DATA */], sectionObject);
  } // Row(s) Apply


  for (var _i2 = 0, _Object$entries2 = Object.entries(formConfigObject.rows); _i2 < _Object$entries2.length; _i2++) {
    var _Object$entries2$_i = Object(slicedToArray["a" /* default */])(_Object$entries2[_i2], 2),
        rowId = _Object$entries2$_i[0],
        rowObject = _Object$entries2$_i[1];

    appliedObject.rows[rowId] = baseObjectExtend(row["a" /* ROW_DEFAULT_DATA */], rowObject);
  } // Control(s) Apply


  for (var _i3 = 0, _Object$entries3 = Object.entries(formConfigObject.controls); _i3 < _Object$entries3.length; _i3++) {
    var _Object$entries3$_i = Object(slicedToArray["a" /* default */])(_Object$entries3[_i3], 2),
        controlId = _Object$entries3$_i[0],
        controlObject = _Object$entries3$_i[1];

    // get type - pick up config of type - merge it with the base
    var type = controlObject.type;
    var baseConfigOfType = controls["a" /* CONTROLS */][type].configData;
    var baseDefaultConfig = baseObjectExtend(controls["b" /* CONTROL_DEFAULT_DATA */], baseConfigOfType); // add to base

    appliedObject.controls[controlId] = Object.assign(baseDefaultConfig, controlObject);
  }

  return appliedObject;
};
/**
 * From A Base Object - We Clone and Extending from a different Object
 * @param {Object} baseObject
 * @param {Object} fromObject
 * @returns {Object}
 */


function baseObjectExtend(baseObject, fromObject) {
  var clonedData = helper["a" /* HELPER */].cloneDeep(baseObject);
  return Object.assign(clonedData, fromObject);
}


// CONCATENATED MODULE: ./src/mixins/form-builder/form-builder-methods.js








/**
 * [Note] Do not use this mixin for other purpose. This is where I move all the code of FormBuilder to keep easy to:
 *  - Structuring
 *  - Refactoring
 *  - ...
 *  This file will keep 90% methods of Form-Builder
 *  @author Phat Tran <phattranminh96@gmail.com>
 */


var FORM_BUILDER_METHODS = {
  data: function data() {
    return {
      sortedSections: []
    };
  },
  methods: {
    /**
     * Do Mapping Before Rendering/Showing Up
     */
    mapping: function mapping(value) {
      this.formData = Object.assign({}, this.formData, applier_dataApplier(value));
      this.doSortSection();
    },

    /**
     * Create Default Form-Config-Data on a new section...
     */
    createDefaultData: function createDefaultData() {
      this.formData = Object.assign({}, applier_dataApplier(this.formData));
    },

    /**
     * Create a new Blank Section into the Big `sections`
     */
    addSection: function addSection(sectionType) {
      var newSortOrder = Object.keys(this.formData.sections).length + 1;
      var sectionObject = Object(section["c" /* createNewSection */])(sectionType, newSortOrder); // we have to push it from $set otherwise it will not reactive (LOL)

      this.$set(this.formData.sections, sectionObject.uniqueId, sectionObject);
      this.doSortSection();
    },

    /**
     * Sort Section and Cache it...
     */
    doSortSection: function doSortSection() {
      this.sortedSections = [];

      for (var _i = 0, _Object$entries = Object.entries(this.formData.sections); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = Object(slicedToArray["a" /* default */])(_Object$entries[_i], 2),
            sectionId = _Object$entries$_i[0],
            sectionObject = _Object$entries$_i[1];

        this.sortedSections.push(sectionObject);
      }

      this.sortedSections.sort(function (a, b) {
        return a.sortOrder - b.sortOrder;
      });
    }
  }
};


/***/ }),

/***/ "bd25":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isMap = __webpack_require__("fd13");
var isSet = __webpack_require__("be03");
var isWeakMap = __webpack_require__("e3e3");
var isWeakSet = __webpack_require__("a101");

module.exports = function whichCollection(value) {
	if (value && typeof value === 'object') {
		if (isMap(value)) {
			return 'Map';
		}
		if (isSet(value)) {
			return 'Set';
		}
		if (isWeakMap(value)) {
			return 'WeakMap';
		}
		if (isWeakSet(value)) {
			return 'WeakSet';
		}
	}
	return false;
};


/***/ }),

/***/ "be03":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $Map = typeof Map === 'function' && Map.prototype ? Map : null;
var $Set = typeof Set === 'function' && Set.prototype ? Set : null;

var exported;

if (!$Set) {
	// eslint-disable-next-line no-unused-vars
	exported = function isSet(x) {
		// `Set` is not present in this environment.
		return false;
	};
}

var $mapHas = $Map ? Map.prototype.has : null;
var $setHas = $Set ? Set.prototype.has : null;
if (!exported && !$setHas) {
	// eslint-disable-next-line no-unused-vars
	exported = function isSet(x) {
		// `Set` does not have a `has` method
		return false;
	};
}

module.exports = exported || function isSet(x) {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$setHas.call(x);
		if ($mapHas) {
			try {
				$mapHas.call(x);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $Set; // core-js workaround, pre-v2.5.0
	} catch (e) {}
	return false;
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "bfad":
/***/ (function(module, exports) {


var hasOwn = Object.prototype.hasOwnProperty;
var toString = Object.prototype.toString;

module.exports = function forEach (obj, fn, ctx) {
    if (toString.call(fn) !== '[object Function]') {
        throw new TypeError('iterator must be a function');
    }
    var l = obj.length;
    if (l === +l) {
        for (var i = 0; i < l; i++) {
            fn.call(ctx, obj[i], i, obj);
        }
    } else {
        for (var k in obj) {
            if (hasOwn.call(obj, k)) {
                fn.call(ctx, obj[k], k, obj);
            }
        }
    }
};



/***/ }),

/***/ "c060":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "c15a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var getPolyfill = __webpack_require__("5834");
var define = __webpack_require__("f367");

module.exports = function shimObjectIs() {
	var polyfill = getPolyfill();
	define(Object, { is: polyfill }, {
		is: function testObjectIs() {
			return Object.is !== polyfill;
		}
	});
	return polyfill;
};


/***/ }),

/***/ "c366":
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__("6821");
var toLength = __webpack_require__("9def");
var toAbsoluteIndex = __webpack_require__("77f1");
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "c6c0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddSectionControl_vue_vue_type_style_index_0_id_796c62b7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a6c9");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddSectionControl_vue_vue_type_style_index_0_id_796c62b7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddSectionControl_vue_vue_type_style_index_0_id_796c62b7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddSectionControl_vue_vue_type_style_index_0_id_796c62b7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c72d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _mixins_control_field_extend_mixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("653e");
/**
 * Control Skeleton
 * To extend for creating new custom control
 */

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "BaseControlSkeleton",
  mixins: [_mixins_control_field_extend_mixin__WEBPACK_IMPORTED_MODULE_0__[/* CONTROL_FIELD_EXTEND_MIXIN */ "a"]]
});

/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c8ba6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var implementation = __webpack_require__("16e7");

var lacksProperEnumerationOrder = function () {
	if (!Object.assign) {
		return false;
	}
	// v8, specifically in node 4.x, has a bug with incorrect property enumeration order
	// note: this does not detect the bug unless there's 20 characters
	var str = 'abcdefghijklmnopqrst';
	var letters = str.split('');
	var map = {};
	for (var i = 0; i < letters.length; ++i) {
		map[letters[i]] = letters[i];
	}
	var obj = Object.assign({}, map);
	var actual = '';
	for (var k in obj) {
		actual += k;
	}
	return str !== actual;
};

var assignHasPendingExceptions = function () {
	if (!Object.assign || !Object.preventExtensions) {
		return false;
	}
	// Firefox 37 still has "pending exception" logic in its Object.assign implementation,
	// which is 72% slower than our shim, and Firefox 40's native implementation.
	var thrower = Object.preventExtensions({ 1: 2 });
	try {
		Object.assign(thrower, 'xy');
	} catch (e) {
		return thrower[1] === 'y';
	}
	return false;
};

module.exports = function getPolyfill() {
	if (!Object.assign) {
		return implementation;
	}
	if (lacksProperEnumerationOrder()) {
		return implementation;
	}
	if (assignHasPendingExceptions()) {
		return implementation;
	}
	return Object.assign;
};


/***/ }),

/***/ "c8c4":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddControlControl_vue_vue_type_style_index_0_id_80f4029a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("f63a");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddControlControl_vue_vue_type_style_index_0_id_80f4029a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddControlControl_vue_vue_type_style_index_0_id_80f4029a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_AddControlControl_vue_vue_type_style_index_0_id_80f4029a_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "c992":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "caca":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ALERT_DIALOG; });
var ALERT_DIALOG = {
  /**
   * Show Alert Dialog
   * @param message
   * @param stopTime
   */
  show: function show(message) {
    var stopTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
    var alert = document.createElement('div');
    alert.className = 'v-form-alert';
    alert.innerText = message;
    document.getElementsByTagName('body')[0].append(alert);
    setTimeout(function () {
      alert.remove();
    }, stopTime || 3000);
  }
};


/***/ }),

/***/ "cadf":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__("9c6c");
var step = __webpack_require__("d53b");
var Iterators = __webpack_require__("84f2");
var toIObject = __webpack_require__("6821");

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__("01f9")(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "cbce":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SIDEBAR_BODY_MIXIN; });
var SIDEBAR_BODY_MIXIN = {
  props: {
    /**
     * Data Object that you will use for the Component inner Sidebar body
     * Normally, you need to create your own `data` field and emit it later.
     */
    dataPackage: Object,

    /**
     * Main Form-Data from the Parent.
     * There might be some Configuration need these data.
     */
    formData: Object
  },
  data: function data() {
    return {
      /**
       * Ideally, you have put override this key. It will be used to access your data to send it back to your component
       * @example For SidebarFormConfiguration. I created `formConfiguration` data field. And I will handle all data-changing stuff
       * only in `formConfiguration`. And that will be the data I need to send it back to the right component.
       * @required
       */
      dataKey: ""
    };
  },
  methods: {
    /**
     * Close the sidebar without fire any events
     */
    close: function close() {
      this.$emit(this.emitCloseKey, false);
    },

    /**
     * Save the configuration (Actually I will close the sidebar and emit event =)) )
     */
    save: function save() {
      var close = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var data = this[this.dataKey];

      if (close) {
        this.$emit(this.emitSaveAndCloseKey, data);
      } else {
        this.$emit(this.emitSaveKey, data);
      }
    }
  },
  computed: {
    /**
     * Emit-Key to parent to close the sidebar
     * @returns {string}
     */
    emitCloseKey: function emitCloseKey() {
      return 'close';
    },

    /**
     * Emit-Key to the parent to save the result
     * @returns {string}
     */
    emitSaveKey: function emitSaveKey() {
      return 'save';
    },

    /**
     * Emit-Key - Save and Close
     * @returns {string}
     */
    emitSaveAndCloseKey: function emitSaveAndCloseKey() {
      return 'saveAndClose';
    }
  }
};


/***/ }),

/***/ "cd1c":
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__("e853");

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),

/***/ "ce10":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("69a8");
var toIObject = __webpack_require__("6821");
var arrayIndexOf = __webpack_require__("c366")(false);
var IE_PROTO = __webpack_require__("613b")('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "d2c8":
/***/ (function(module, exports, __webpack_require__) {

// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__("aae3");
var defined = __webpack_require__("be13");

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d4ab":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]' &&
			value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};


/***/ }),

/***/ "d4c0":
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__("0d58");
var gOPS = __webpack_require__("2621");
var pIE = __webpack_require__("52a7");
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),

/***/ "d4ec":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _classCallCheck; });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "d53b":
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),

/***/ "d60e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return STYLES; });
/**
 * Styling for Vue-Form-Builder
 * Mostly it about the Container class.
 * <note>
 * The classes can be re-placed in run-time (For other CSS framework if you want)
 * But the main ideas is following Bootstrap, hopefully yours framework is have a same structural.
 * </note>
 * @author Phat Tran
 */
var STYLES = {
  CONTAINER: {
    FLUID: "container-fluid md-layout",
    NORMAL: "container"
  },
  ROW: "row md-layout",
  COLUMNS: {
    COL1: "col-md-1 md-layout-item md-size-5",
    COL2: "col-md-2 md-layout-item md-size-10",
    COL3: "col-md-3 md-layout-item md-size-25",
    COL4: "col-md-4 md-layout-item md-size-33",
    COL5: "col-md-5 md-layout-item md-size-40",
    COL6: "col-md-6 md-layout-item md-size-50",
    COL7: "col-md-7 md-layout-item md-size-60",
    COL8: "col-md-8 md-layout-item md-size-66",
    COL9: "col-md-9 md-layout-item md-size-75",
    COL10: "col-md-10 md-layout-item md-size-90",
    COL11: "col-md-11 md-layout-item md-size-95",
    COL12: "col-md-12 md-layout-item md-size-100"
  },

  /**
   * List Group Classes - Used in AddSectionVueControl
   */
  LIST_GROUP: {
    CONTAINER: "list-group md-list",
    // div.list-group
    SINGLE_ITEM: "list-group-item list-group-item-action md-list-item md-list-item-action" //a[href=...].list-group-item.list-group-item-action

  },

  /**
   * Button Classes
   */
  BUTTON: {
    PRIMARY: "btn btn-primary md-button md-raised md-primary md-theme-default",
    SECONDARY: "btn btn-secondary md-button md-raised md-secondary md-theme-default",
    DEFAULT: "btn btn-default md-button md-raised md-default md-theme-default",
    SUCCESS: "btn btn-success md-button md-raised md-success md-theme-default",
    DANGER: "btn btn-danger md-button md-raised md-accent md-theme-default",
    WARNING: "btn btn-warning md-button md-raised md-warning md-theme-default",
    INFO: "btn btn-info md-button md-raised md-info md-theme-default"
  },

  /**
   * Form Classes
   */
  FORM: {
    FORM_GROUP: "form-group",
    INPUT_GROUP: "input-group",
    FORM_CONTROL: "form-control md-field",
    ERROR_OUTLINE: "is-invalid md-error",
    ERROR_MESSAGE: "invalid-feedback"
  },

  /**
   * Table Classes
   */
  TABLE: {
    TABLE_CLASS: "table md-table",
    TR_CLASS: "md-table-row",
    TD_CLASS: "md-table-cell"
  }
};


/***/ }),

/***/ "d6c7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slice = Array.prototype.slice;
var isArgs = __webpack_require__("d4ab");

var origKeys = Object.keys;
var keysShim = origKeys ? function keys(o) { return origKeys(o); } : __webpack_require__("b189");

var originalKeys = Object.keys;

keysShim.shim = function shimObjectKeys() {
	if (Object.keys) {
		var keysWorksWithArguments = (function () {
			// Safari 5.0 bug
			var args = Object.keys(arguments);
			return args && args.length === arguments.length;
		}(1, 2));
		if (!keysWorksWithArguments) {
			Object.keys = function keys(object) { // eslint-disable-line func-name-matching
				if (isArgs(object)) {
					return originalKeys(slice.call(object));
				}
				return originalKeys(object);
			};
		}
	} else {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;


/***/ }),

/***/ "d6ef":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var numberIsNaN = function (value) {
	return value !== value;
};

module.exports = function is(a, b) {
	if (a === 0 && b === 0) {
		return 1 / a === 1 / b;
	}
	if (a === b) {
		return true;
	}
	if (numberIsNaN(a) && numberIsNaN(b)) {
		return true;
	}
	return false;
};



/***/ }),

/***/ "d8d8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasSymbols = __webpack_require__("5156")();
var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === 'symbol';
var regexExec;
var isRegexMarker;
var badStringifier;

if (hasToStringTag) {
	regexExec = Function.call.bind(RegExp.prototype.exec);
	isRegexMarker = {};

	var throwRegexMarker = function () {
		throw isRegexMarker;
	};
	badStringifier = {
		toString: throwRegexMarker,
		valueOf: throwRegexMarker
	};

	if (typeof Symbol.toPrimitive === 'symbol') {
		badStringifier[Symbol.toPrimitive] = throwRegexMarker;
	}
}

var toStr = Object.prototype.toString;
var regexClass = '[object RegExp]';

module.exports = hasToStringTag
	// eslint-disable-next-line consistent-return
	? function isRegex(value) {
		if (!value || typeof value !== 'object') {
			return false;
		}

		try {
			regexExec(value, badStringifier);
		} catch (e) {
			return e === isRegexMarker;
		}
	}
	: function isRegex(value) {
		// In older browsers, typeof regex incorrectly returns 'function'
		if (!value || (typeof value !== 'object' && typeof value !== 'function')) {
			return false;
		}

		return toStr.call(value) === regexClass;
	};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "da2a":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _mixins_control_special_config_mixin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8ae1");

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "BaseControlConfigSkeleton",
  mixins: [_mixins_control_special_config_mixin__WEBPACK_IMPORTED_MODULE_0__[/* CONTROL_SPECIAL_CONFIG_MIXIN */ "a"]]
});

/***/ }),

/***/ "dcbc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("2aba");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "dd3c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ SECTION_TYPES; });
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ SECTION_DEFAULT_DATA; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ createNewSection; });

// EXTERNAL MODULE: ./src/libraries/helper.js
var helper = __webpack_require__("43b3");

// EXTERNAL MODULE: ./src/configs/row.js
var row = __webpack_require__("7d7e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/section-views/NormalSectionView.vue?vue&type=template&id=b2b8cdd4&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"normal-section"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.section.isShowHeadline),expression:"section.isShowHeadline"}],staticClass:"headline-block p5"},[_c('h6',{staticClass:"header",class:_vm.section.headlineAdditionalClass},[_vm._v(_vm._s(_vm.section.headline))]),_c('div',{staticClass:"subheader",class:_vm.section.subHeadlineAdditionalClass},[_vm._v(_vm._s(_vm.section.subHeadline))])]),_c('draggable',{staticClass:"dragAndDrop p-0",class:_vm.draggableClasses,style:(_vm.hasControl ? 'padding-bottom: 50px !important;' : ''),attrs:{"handle":_vm.dragControlHandle,"list":_vm.section.controls,"group":_vm.dragGroup},nativeOn:{"click":function($event){if($event.target !== $event.currentTarget){ return null; }return _vm.openAddControl(4)}}},[_vm._l((_vm.section.controls),function(controlId){return _c('ControlView',{key:controlId,attrs:{"control":_vm.controls[controlId],"parent-id":_vm.section.uniqueId}})}),_c('AddControlControl',{directives:[{name:"show",rawName:"v-show",value:(!_vm.hasControl),expression:"!hasControl"}],ref:"AddControl",attrs:{"section":_vm.section}})],2)],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/section-views/NormalSectionView.vue?vue&type=template&id=b2b8cdd4&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/add-controls/AddRowControl.vue?vue&type=template&id=174adab8&scoped=true&
var AddRowControlvue_type_template_id_174adab8_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"add-row-outer"},[_c('div',{staticClass:"add-row-container",class:_vm.styles.COLUMNS.COL12,on:{"click":_vm.addNew}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('addOutline', '32px', '32px', '#000'))}}),_c('span',[_vm._v("Add Row")])])])}
var AddRowControlvue_type_template_id_174adab8_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/add-controls/AddRowControl.vue?vue&type=template&id=174adab8&scoped=true&

// EXTERNAL MODULE: ./src/configs/styles.js
var styles = __webpack_require__("d60e");

// EXTERNAL MODULE: ./src/mixins/style-injection-mixin.js
var style_injection_mixin = __webpack_require__("28fe");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/add-controls/AddRowControl.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//


/* harmony default export */ var AddRowControlvue_type_script_lang_js_ = ({
  name: "AddRowControl",
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  data: function data() {
    return {
      show: false
    };
  },
  methods: {
    /**
     * Add a new row by notify the parent...
     */
    addNew: function addNew() {
      this.$emit('addRowNotify', true);
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/add-controls/AddRowControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var add_controls_AddRowControlvue_type_script_lang_js_ = (AddRowControlvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/builder/add-controls/AddRowControl.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  add_controls_AddRowControlvue_type_script_lang_js_,
  AddRowControlvue_type_template_id_174adab8_scoped_true_render,
  AddRowControlvue_type_template_id_174adab8_scoped_true_staticRenderFns,
  false,
  null,
  "174adab8",
  null
  
)

/* harmony default export */ var AddRowControl = (component.exports);
// EXTERNAL MODULE: ./src/configs/events.js
var events = __webpack_require__("fbe6");

// EXTERNAL MODULE: ./node_modules/vuedraggable/dist/vuedraggable.common.js
var vuedraggable_common = __webpack_require__("310e");
var vuedraggable_common_default = /*#__PURE__*/__webpack_require__.n(vuedraggable_common);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/add-controls/AddControlControl.vue?vue&type=template&id=80f4029a&scoped=true&
var AddControlControlvue_type_template_id_80f4029a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"add-control-outer m-0",class:_vm.styles.COLUMNS.COL12},[_c('div',{staticClass:"w-100 row justify-content-center m-0",on:{"click":_vm.openAddControl}},[_c('div',{staticClass:"col-md-3 text-right"},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('add_control'))}})]),_vm._m(0)])])}
var AddControlControlvue_type_template_id_80f4029a_scoped_true_staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"col-md-5 align-self-center"},[_c('div',{staticClass:"title"},[_vm._v("Insira os componentes do formulário")]),_c('div',{staticClass:"desc"},[_vm._v("Para adicionar conteúdo a seu formulário, clique no elemento que deseja no menu ao lado.")])])}]


// CONCATENATED MODULE: ./src/views/builder/add-controls/AddControlControl.vue?vue&type=template&id=80f4029a&scoped=true&

// EXTERNAL MODULE: ./src/libraries/sidebar-renderer.class.js
var sidebar_renderer_class = __webpack_require__("1ec8");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/SidebarControlSelectList.vue?vue&type=template&id=d7d8c770&scoped=true&
var SidebarControlSelectListvue_type_template_id_d7d8c770_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"container"},_vm._l((_vm.controlTypes),function(controlInfo,controlKey){return _c('div',{key:controlKey},[(controlInfo.group)?_c('div',{staticClass:"controlGroupTitle mb-3"},[_vm._v(_vm._s(_vm.$t(("constrolsGroup." + (controlInfo.group)))))]):_vm._e(),_c('div',{staticClass:"controlCard p-2 mb-2",on:{"click":function($event){return _vm.selectedControl(controlKey)}}},[_c('div',{staticClass:"header"},[_c('span',{staticClass:"title"},[_vm._v(_vm._s(_vm.$t(("controls." + (controlInfo.name)))))]),_c('span',{staticClass:"float-right",domProps:{"innerHTML":_vm._s(_vm.$form.getIcon(controlInfo.exampleImage))}})]),_c('div',{staticClass:"body"},[_c('span',{staticClass:"desc"},[_vm._v(_vm._s(_vm.$t(("controlsDescription." + (controlInfo.description)))))])])])])}),0)}
var SidebarControlSelectListvue_type_template_id_d7d8c770_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/SidebarControlSelectList.vue?vue&type=template&id=d7d8c770&scoped=true&

// EXTERNAL MODULE: ./src/configs/controls.js + 92 modules
var controls = __webpack_require__("8dbe");

// EXTERNAL MODULE: ./src/mixins/sidebar-body-mixin.js
var sidebar_body_mixin = __webpack_require__("cbce");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/SidebarControlSelectList.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var SidebarControlSelectListvue_type_script_lang_js_ = ({
  name: "SidebarControlSelectList",
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */], sidebar_body_mixin["a" /* SIDEBAR_BODY_MIXIN */]],
  data: function data() {
    return {
      dataKey: "newControlData",
      newControlData: null,
      controlTypes: []
    };
  },
  mounted: function mounted() {
    this.controlTypes = controls["a" /* CONTROLS */];
  },
  methods: {
    /**
     * Selected a control => we will generate a new control data then emit it to the section
     * @param controlKey
     */
    selectedControl: function selectedControl(controlKey) {
      if (!controls["a" /* CONTROLS */][controlKey]) {
        alert("Control ".concat(controlKey, " doesn't exists in Vue-Form-Builder"));
        return;
      } // create


      this.newControlData = Object(controls["c" /* createControlData */])(controlKey);
      this.save(true);
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/SidebarControlSelectList.vue?vue&type=script&lang=js&
 /* harmony default export */ var sidebar_config_views_SidebarControlSelectListvue_type_script_lang_js_ = (SidebarControlSelectListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/builder/sidebar-config-views/SidebarControlSelectList.vue?vue&type=style&index=0&id=d7d8c770&scoped=true&lang=css&
var SidebarControlSelectListvue_type_style_index_0_id_d7d8c770_scoped_true_lang_css_ = __webpack_require__("ee19");

// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/SidebarControlSelectList.vue






/* normalize component */

var SidebarControlSelectList_component = Object(componentNormalizer["a" /* default */])(
  sidebar_config_views_SidebarControlSelectListvue_type_script_lang_js_,
  SidebarControlSelectListvue_type_template_id_d7d8c770_scoped_true_render,
  SidebarControlSelectListvue_type_template_id_d7d8c770_scoped_true_staticRenderFns,
  false,
  null,
  "d7d8c770",
  null
  
)

/* harmony default export */ var SidebarControlSelectList = (SidebarControlSelectList_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/add-controls/AddControlControl.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var AddControlControlvue_type_script_lang_js_ = ({
  name: "AddControlControl",
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  props: {
    section: {
      type: Object,
      required: true
    } // TODO: Need to extend: Row too.

  },
  data: function data() {
    return {
      show: false
    };
  },
  methods: {
    /**
     * Open the sidebar to add control yeah yeah
     */
    openAddControl: function openAddControl() {
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.OPEN, {
        title: "COMPONENTES",
        runnerId: this.runnerId
      });
    },

    /**
     * Render the sidebar if can be opened hehe
     */
    afterOpenedSidebar: function afterOpenedSidebar(runnerId) {
      if (runnerId !== this.runnerId) {
        return;
      } // render


      this.renderSidebar();
    },

    /**
     * Trigger this to render the GlobalSidebar for Select Controls
     */
    renderSidebar: function renderSidebar() {
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.INJECT, new sidebar_renderer_class["a" /* default */](this.runnerId, SidebarControlSelectList, this.section));
    },

    /**
     * After user chose a control. This will be invoked in order to create a new control
     */
    createNewControlForSection: function createNewControlForSection(runnerId, controlObj) {
      // runnerId to check the right identifier of the Invoker
      // uniqueId to check if we create new control or not
      if (this.runnerId !== runnerId) {
        return;
      } // emit to FormBuilder and let it create control...
      // TODO: Need to extend - For Rows


      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.CONTROL.CREATE, this.section.uniqueId, controlObj);
    }
  },
  computed: {
    /**
     * Runner ID to detect the right
     * @returns {string}
     */
    runnerId: function runnerId() {
      return "add-control-".concat(this.section.uniqueId);
    }
  },
  created: function created() {
    // listen to Global Sidebar
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.OPENED, this.afterOpenedSidebar);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.SAVE_AND_CLOSE, this.createNewControlForSection);
  }
});
// CONCATENATED MODULE: ./src/views/builder/add-controls/AddControlControl.vue?vue&type=script&lang=js&
 /* harmony default export */ var add_controls_AddControlControlvue_type_script_lang_js_ = (AddControlControlvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/builder/add-controls/AddControlControl.vue?vue&type=style&index=0&id=80f4029a&scoped=true&lang=css&
var AddControlControlvue_type_style_index_0_id_80f4029a_scoped_true_lang_css_ = __webpack_require__("c8c4");

// CONCATENATED MODULE: ./src/views/builder/add-controls/AddControlControl.vue






/* normalize component */

var AddControlControl_component = Object(componentNormalizer["a" /* default */])(
  add_controls_AddControlControlvue_type_script_lang_js_,
  AddControlControlvue_type_template_id_80f4029a_scoped_true_render,
  AddControlControlvue_type_template_id_80f4029a_scoped_true_staticRenderFns,
  false,
  null,
  "80f4029a",
  null
  
)

/* harmony default export */ var AddControlControl = (AddControlControl_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/ControlView.vue?vue&type=template&id=c68d6564&
var ControlViewvue_type_template_id_c68d6564_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.control.containerClass, 'control-view-wrapper', _vm.control.additionalContainerClass]},[_c('div',{staticClass:"control-view option-control drag-item",class:{'active': _vm.isActive},on:{"click":_vm.openConfiguration}},[_c('ControlLabel',{directives:[{name:"show",rawName:"v-show",value:(_vm.control.isShowLabel),expression:"control.isShowLabel"}],attrs:{"control":_vm.control},on:{"delete":_vm.deleteControl}}),_c(_vm.controlComponent,{tag:"component",attrs:{"control":_vm.control}})],1)])}
var ControlViewvue_type_template_id_c68d6564_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/ControlView.vue?vue&type=template&id=c68d6564&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/control-views/ControlLabel.vue?vue&type=template&id=8c437052&scoped=true&
var ControlLabelvue_type_template_id_8c437052_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"control-label-container"},[_c('div',{staticClass:"d-flex justify-content-between align-items-center"},[_c('label',{staticClass:"label m-0",class:_vm.control.additionalLabelClass,attrs:{"for":_vm.control.uniqueId},domProps:{"textContent":_vm._s(_vm.control.label)}}),_c('div',{staticClass:"exclude btn btn-sm",on:{"click":function($event){$event.stopPropagation();return _vm.emitExclude($event)}}},[_c('span',{staticClass:"mr-1",domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('trashCustom', '20px', '20px'))}}),_c('u',[_vm._v("Excluir")])])]),(_vm.control.subLabel)?_c('br'):_vm._e(),(_vm.control.subLabel)?_c('small',{domProps:{"textContent":_vm._s(_vm.control.subLabel)}}):_vm._e()])}
var ControlLabelvue_type_template_id_8c437052_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/control-views/ControlLabel.vue?vue&type=template&id=8c437052&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/control-views/ControlLabel.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var ControlLabelvue_type_script_lang_js_ = ({
  name: "ControlLabel",
  methods: {
    emitExclude: function emitExclude() {
      this.$emit("delete", true);
    }
  },
  props: {
    control: {
      type: Object,
      required: true
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/control-views/ControlLabel.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_views_ControlLabelvue_type_script_lang_js_ = (ControlLabelvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/builder/control-views/ControlLabel.vue?vue&type=style&index=0&id=8c437052&scoped=true&lang=css&
var ControlLabelvue_type_style_index_0_id_8c437052_scoped_true_lang_css_ = __webpack_require__("6d4a");

// CONCATENATED MODULE: ./src/views/builder/control-views/ControlLabel.vue






/* normalize component */

var ControlLabel_component = Object(componentNormalizer["a" /* default */])(
  control_views_ControlLabelvue_type_script_lang_js_,
  ControlLabelvue_type_template_id_8c437052_scoped_true_render,
  ControlLabelvue_type_template_id_8c437052_scoped_true_staticRenderFns,
  false,
  null,
  "8c437052",
  null
  
)

/* harmony default export */ var ControlLabel = (ControlLabel_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/control-views/ControlOption.vue?vue&type=template&id=6a093137&
var ControlOptionvue_type_template_id_6a093137_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"control-option-container"},[_c('div',{staticClass:"option-control drag-item",attrs:{"title":"Re-position / Drag"}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('navigationMore', '24px', '24px', '#f1c40f'))}})]),_c('div',{staticClass:"option-control",attrs:{"title":"Control Configuration"},on:{"click":_vm.clickedConfiguration}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('cog', '24px', '24px', '#3498db'))}})]),_c('div',{staticClass:"option-control",attrs:{"title":"Delete Control"},on:{"click":_vm.clickedDelete}},[_c('span',{domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('trash', '24px', '24px', '#e74c3c'))}})])])}
var ControlOptionvue_type_template_id_6a093137_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/control-views/ControlOption.vue?vue&type=template&id=6a093137&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/control-views/ControlOption.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var ControlOptionvue_type_script_lang_js_ = ({
  name: "ControlOption",
  methods: {
    /**
     * Emit to parent to delete this control...
     */
    clickedDelete: function clickedDelete() {
      this.$emit('delete', true);
    },

    /**
     * Emit to parent to open the configuration
     */
    clickedConfiguration: function clickedConfiguration() {
      this.$emit('config', true);
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/control-views/ControlOption.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_views_ControlOptionvue_type_script_lang_js_ = (ControlOptionvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/builder/control-views/ControlOption.vue





/* normalize component */

var ControlOption_component = Object(componentNormalizer["a" /* default */])(
  control_views_ControlOptionvue_type_script_lang_js_,
  ControlOptionvue_type_template_id_6a093137_render,
  ControlOptionvue_type_template_id_6a093137_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ControlOption = (ControlOption_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/SidebarControlConfiguration.vue?vue&type=template&id=37952f62&
var SidebarControlConfigurationvue_type_template_id_37952f62_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sidebar-form-configuration"},[_c('h5',{staticClass:"title"},[_vm._v(_vm._s(_vm.$t('controlsConfig.basic_details')))]),_c('ControlBasicInformation',{attrs:{"control":_vm.control}}),_c('ControlStylingInformation',{attrs:{"control":_vm.control}}),(_vm.specificConfigurationView)?_c('SidebarToggleableContainer',{attrs:{"headline":"Control Specific Configuration"}},[_c(_vm.specificConfigurationView,{tag:"component",attrs:{"formData":_vm.formData,"control":_vm.control}})],1):_vm._e(),_c('ControlValidationInformation',{attrs:{"control":_vm.control}}),_c('div',{staticClass:"buttons"},[_c('button',{class:_vm.styles.BUTTON.PRIMARY,on:{"click":function($event){return _vm.save(false)}}},[_vm._v("Save")]),_c('button',{class:_vm.styles.BUTTON.INFO,on:{"click":function($event){return _vm.save(true)}}},[_vm._v("Save & Close")])])],1)}
var SidebarControlConfigurationvue_type_template_id_37952f62_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/SidebarControlConfiguration.vue?vue&type=template&id=37952f62&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/container-views/SidebarToggleableContainer.vue?vue&type=template&id=25a08964&
var SidebarToggleableContainervue_type_template_id_25a08964_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"toggleable-section"},[_c('div',{staticClass:"headline-block"},[_c('h5',[_c('span',{staticClass:"toggle-item",domProps:{"innerHTML":_vm._s(_vm.isVisible ? _vm.iconClose : _vm.iconOpen)},on:{"click":function($event){_vm.isVisible = !_vm.isVisible}}}),_c('span',{domProps:{"textContent":_vm._s(_vm.headline)}}),_c('small',{staticClass:"toggleable-sub-headline",domProps:{"textContent":_vm._s(_vm.subHeadline)}})])]),_c('transition',{attrs:{"name":"slide"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isVisible),expression:"isVisible"}]},[_vm._t("default")],2)])],1)}
var SidebarToggleableContainervue_type_template_id_25a08964_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/container-views/SidebarToggleableContainer.vue?vue&type=template&id=25a08964&

// CONCATENATED MODULE: ./src/mixins/toggleable-mixin.js
/**
 * Toggleable Mixin - Same Methods/Properties would be use for Toggleable container
 *
 */
var TOGGLEABLE_MIXIN = {
  data: function data() {
    return {
      isVisible: true
    };
  },
  computed: {
    iconColor: function iconColor() {
      return '#000';
    },
    iconSize: function iconSize() {
      return '32px';
    },
    iconClose: function iconClose() {
      return this.$form.getIcon('chevronUp', this.iconSize, this.iconSize, this.iconColor);
    },
    iconOpen: function iconOpen() {
      return this.$form.getIcon('chevronDown', this.iconSize, this.iconSize, this.iconColor);
    }
  }
};

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/container-views/SidebarToggleableContainer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * Normal ToggleableContainer to use anywhere
 * Not used for Toggleable Renderer...
 */

/* harmony default export */ var SidebarToggleableContainervue_type_script_lang_js_ = ({
  name: "SidebarToggleableContainer",
  mixins: [TOGGLEABLE_MIXIN],
  props: {
    headline: {
      type: String
    },
    subHeadline: {
      type: String
    },
    initialOpen: {
      type: Boolean,
      default: true
    }
  },
  created: function created() {
    if (!this.initialOpen) {
      this.isVisible = false;
    }
  }
});
// CONCATENATED MODULE: ./src/views/container-views/SidebarToggleableContainer.vue?vue&type=script&lang=js&
 /* harmony default export */ var container_views_SidebarToggleableContainervue_type_script_lang_js_ = (SidebarToggleableContainervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/container-views/SidebarToggleableContainer.vue





/* normalize component */

var SidebarToggleableContainer_component = Object(componentNormalizer["a" /* default */])(
  container_views_SidebarToggleableContainervue_type_script_lang_js_,
  SidebarToggleableContainervue_type_template_id_25a08964_render,
  SidebarToggleableContainervue_type_template_id_25a08964_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SidebarToggleableContainer = (SidebarToggleableContainer_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/control-configuration-views/ControlBasicInformation.vue?vue&type=template&id=2bc16a1b&scoped=true&
var ControlBasicInformationvue_type_template_id_2bc16a1b_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(_vm._s(_vm.$t('controlsConfig.unique_id')))]),_c('input',{class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text","readonly":""},domProps:{"value":_vm.control.uniqueId}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(_vm._s(_vm.$t('controlsConfig.name')))]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.name),expression:"control.name"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.name)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "name", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(_vm._s(_vm.$t('controlsConfig.label'))+"Label")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.label),expression:"control.label"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.label)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "label", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(_vm._s(_vm.$t('controlsConfig.sub_label'))+"Sub-label")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.subLabel),expression:"control.subLabel"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.subLabel)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "subLabel", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(" "+_vm._s(_vm.$t('controlsConfig.show_label'))+" "),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.isShowLabel),expression:"control.isShowLabel"}],attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.control.isShowLabel)?_vm._i(_vm.control.isShowLabel,null)>-1:(_vm.control.isShowLabel)},on:{"change":function($event){var $$a=_vm.control.isShowLabel,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.$set(_vm.control, "isShowLabel", $$a.concat([$$v])))}else{$$i>-1&&(_vm.$set(_vm.control, "isShowLabel", $$a.slice(0,$$i).concat($$a.slice($$i+1))))}}else{_vm.$set(_vm.control, "isShowLabel", $$c)}}}})])]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(_vm._s(_vm.$t('controlsConfig.placeholder')))]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.placeholderText),expression:"control.placeholderText"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.placeholderText)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "placeholderText", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v(_vm._s(_vm.$t('controlsConfig.default_value')))]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.defaultValue),expression:"control.defaultValue"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.defaultValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "defaultValue", $event.target.value)}}})])])}
var ControlBasicInformationvue_type_template_id_2bc16a1b_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/control-configuration-views/ControlBasicInformation.vue?vue&type=template&id=2bc16a1b&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/control-configuration-views/ControlBasicInformation.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ControlBasicInformationvue_type_script_lang_js_ = ({
  name: "ControlBasicInformation",
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  props: {
    control: Object
  }
});
// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/control-configuration-views/ControlBasicInformation.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_configuration_views_ControlBasicInformationvue_type_script_lang_js_ = (ControlBasicInformationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/control-configuration-views/ControlBasicInformation.vue





/* normalize component */

var ControlBasicInformation_component = Object(componentNormalizer["a" /* default */])(
  control_configuration_views_ControlBasicInformationvue_type_script_lang_js_,
  ControlBasicInformationvue_type_template_id_2bc16a1b_scoped_true_render,
  ControlBasicInformationvue_type_template_id_2bc16a1b_scoped_true_staticRenderFns,
  false,
  null,
  "2bc16a1b",
  null
  
)

/* harmony default export */ var ControlBasicInformation = (ControlBasicInformation_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/control-configuration-views/ControlStylingInformation.vue?vue&type=template&id=b762a8de&scoped=true&
var ControlStylingInformationvue_type_template_id_b762a8de_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SidebarToggleableContainer',{attrs:{"headline":"Styling/Classes"}},[_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Container Size Class")]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.containerClass),expression:"control.containerClass"}],class:_vm.styles.FORM.FORM_CONTROL,on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(_vm.control, "containerClass", $event.target.multiple ? $$selectedVal : $$selectedVal[0])}}},_vm._l((_vm.containerClasses),function(className,classID){return _c('option',{key:className,domProps:{"value":className}},[_vm._v(" "+_vm._s(classID)+" ("+_vm._s(className)+") ")])}),0)]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Container Additional Classes")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.additionalContainerClass),expression:"control.additionalContainerClass"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.additionalContainerClass)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "additionalContainerClass", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Control Field Additional Classes")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.additionalFieldClass),expression:"control.additionalFieldClass"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.additionalFieldClass)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "additionalFieldClass", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Control-Label Additional Classes")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.control.additionalLabelClass),expression:"control.additionalLabelClass"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(_vm.control.additionalLabelClass)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(_vm.control, "additionalLabelClass", $event.target.value)}}})])])}
var ControlStylingInformationvue_type_template_id_b762a8de_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/control-configuration-views/ControlStylingInformation.vue?vue&type=template&id=b762a8de&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/control-configuration-views/ControlStylingInformation.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var ControlStylingInformationvue_type_script_lang_js_ = ({
  name: "ControlStylingInformation",
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  components: {
    SidebarToggleableContainer: SidebarToggleableContainer
  },
  props: {
    control: Object
  },
  computed: {
    containerClasses: function containerClasses() {
      return this.styles.COLUMNS;
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/control-configuration-views/ControlStylingInformation.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_configuration_views_ControlStylingInformationvue_type_script_lang_js_ = (ControlStylingInformationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/control-configuration-views/ControlStylingInformation.vue





/* normalize component */

var ControlStylingInformation_component = Object(componentNormalizer["a" /* default */])(
  control_configuration_views_ControlStylingInformationvue_type_script_lang_js_,
  ControlStylingInformationvue_type_template_id_b762a8de_scoped_true_render,
  ControlStylingInformationvue_type_template_id_b762a8de_scoped_true_staticRenderFns,
  false,
  null,
  "b762a8de",
  null
  
)

/* harmony default export */ var ControlStylingInformation = (ControlStylingInformation_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/control-configuration-views/ControlValidationInformation.vue?vue&type=template&id=1350508e&
var ControlValidationInformationvue_type_template_id_1350508e_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('SidebarToggleableContainer',{attrs:{"headline":"Validation"}},[_c('label',[_vm._v(" Validation Rules "),_c('span',{staticClass:"pointer",attrs:{"title":"Click this to add a new rule"},domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('addOutline', '16px', '16px', 'green'))},on:{"click":_vm.addNewRule}})]),_vm._l((_vm.control.validations),function(addedRule,ruleIndex){return _c('div',{key:addedRule.ruleType,staticClass:"list-selection"},[_c('div',{staticClass:"tool-block"},[_c('span',{staticClass:"pointer",attrs:{"title":"Click this to remove this rule"},domProps:{"innerHTML":_vm._s(_vm.$form.getIcon('close', '16px', '16px', 'red'))},on:{"click":function($event){return _vm.removeRule(ruleIndex)}}})]),_c('div',{class:[_vm.styles.FORM.FORM_GROUP]},[_c('label',[_vm._v("Validation Rule")]),_c('select',{directives:[{name:"model",rawName:"v-model",value:(addedRule.ruleType),expression:"addedRule.ruleType"}],class:_vm.styles.FORM.FORM_CONTROL,on:{"change":[function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.$set(addedRule, "ruleType", $event.target.multiple ? $$selectedVal : $$selectedVal[0])},function($event){return _vm.updateDefaultErrorMessage(addedRule)}]}},[_c('option',{attrs:{"selected":"","disabled":""}},[_vm._v("Choose a Rule")]),_vm._l((_vm.getRuleList(addedRule.ruleType)),function(ruleName,ruleIndex){return _c('option',{key:ruleIndex,domProps:{"value":ruleName,"textContent":_vm._s(ruleName)}})})],2),_c('small',{directives:[{name:"show",rawName:"v-show",value:(_vm.getRuleInfo(addedRule.ruleType, 'desc')),expression:"getRuleInfo(addedRule.ruleType, 'desc')"}],domProps:{"textContent":_vm._s(_vm.getRuleInfo(addedRule.ruleType, 'desc'))}})]),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.getRuleInfo(addedRule.ruleType, 'needValue')),expression:"getRuleInfo(addedRule.ruleType, 'needValue')"}],class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Rule Value")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(addedRule.additionalValue),expression:"addedRule.additionalValue"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text","placeholder":_vm.getRuleInfo(addedRule.ruleType, 'valueInfo')},domProps:{"value":(addedRule.additionalValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(addedRule, "additionalValue", $event.target.value)}}})]),_c('div',{class:_vm.styles.FORM.FORM_GROUP},[_c('label',[_vm._v("Default Error Message")]),_c('input',{directives:[{name:"model",rawName:"v-model",value:(addedRule.errorMessage),expression:"addedRule.errorMessage"}],class:_vm.styles.FORM.FORM_CONTROL,attrs:{"type":"text"},domProps:{"value":(addedRule.errorMessage)},on:{"input":function($event){if($event.target.composing){ return; }_vm.$set(addedRule, "errorMessage", $event.target.value)}}})])])})],2)}
var ControlValidationInformationvue_type_template_id_1350508e_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/control-configuration-views/ControlValidationInformation.vue?vue&type=template&id=1350508e&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.array.includes.js
var es7_array_includes = __webpack_require__("6762");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.includes.js
var es6_string_includes = __webpack_require__("2fdb");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./src/configs/validation.js
var validation = __webpack_require__("a786");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/control-configuration-views/ControlValidationInformation.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var ControlValidationInformationvue_type_script_lang_js_ = ({
  name: "ControlValidationInformation",
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  components: {
    SidebarToggleableContainer: SidebarToggleableContainer
  },
  props: {
    control: Object
  },
  methods: {
    /**
     * Get the rule info based on the validation rule
     * @param ruleName
     * @param ruleKey
     * @returns {boolean}
     */
    getRuleInfo: function getRuleInfo(ruleName, ruleKey) {
      if (!ruleName) {
        return false;
      }

      return validation["a" /* VALIDATION_RULES */][ruleName][ruleKey];
    },

    /**
     * [ON-INPUT] Every-Time the rule-select is selected, we need to update the default error message.
     */
    updateDefaultErrorMessage: function updateDefaultErrorMessage(addedRule) {
      addedRule.errorMessage = this.getRuleInfo(addedRule.ruleType, 'errorMessage');
    },

    /**
     * [CLICK] Add a new rule into validation array
     */
    addNewRule: function addNewRule() {
      this.control.validations.push(new validation["b" /* ValidationRule */]());
    },

    /**
     * [CLICK] Remove a rule
     */
    removeRule: function removeRule(index) {
      this.control.validations.splice(index, 1);
    },

    /**
     * Get all the available rules without the current one
     * @return {String[]}
     */
    getRuleList: function getRuleList(currentRule) {
      var allUsedRules = this.control.validations.map(function (rule) {
        return rule.ruleType;
      }).filter(function (ruleName) {
        return ruleName !== currentRule;
      });
      var allRules = Object.keys(validation["a" /* VALIDATION_RULES */]);
      return allRules.filter(function (rule) {
        return !allUsedRules.includes(rule);
      });
    }
  },
  computed: {
    /**
     * Get all Rule List
     * @returns {string[]}
     */
    ruleList: function ruleList() {
      return Object.keys(validation["a" /* VALIDATION_RULES */]);
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/control-configuration-views/ControlValidationInformation.vue?vue&type=script&lang=js&
 /* harmony default export */ var control_configuration_views_ControlValidationInformationvue_type_script_lang_js_ = (ControlValidationInformationvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/control-configuration-views/ControlValidationInformation.vue





/* normalize component */

var ControlValidationInformation_component = Object(componentNormalizer["a" /* default */])(
  control_configuration_views_ControlValidationInformationvue_type_script_lang_js_,
  ControlValidationInformationvue_type_template_id_1350508e_render,
  ControlValidationInformationvue_type_template_id_1350508e_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ControlValidationInformation = (ControlValidationInformation_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/sidebar-config-views/SidebarControlConfiguration.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ var SidebarControlConfigurationvue_type_script_lang_js_ = ({
  name: "SidebarControlConfiguration",
  components: {
    ControlValidationInformation: ControlValidationInformation,
    ControlStylingInformation: ControlStylingInformation,
    ControlBasicInformation: ControlBasicInformation,
    SidebarToggleableContainer: SidebarToggleableContainer
  },
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */], sidebar_body_mixin["a" /* SIDEBAR_BODY_MIXIN */]],
  data: function data() {
    return {
      dataKey: "control",
      control: null
    };
  },
  created: function created() {
    // clone to make sure, no references will interrupt the configuration...
    this.control = helper["a" /* HELPER */].cloneDeep(this.dataPackage);
  },
  computed: {
    /**
     * Quick'n'Short access to the control type
     */
    controlType: function controlType() {
      return this.control.type;
    },

    /**
     * CHeck if the control doesn't need validation
     */
    isValidationDisabled: function isValidationDisabled() {
      if (controls["a" /* CONTROLS */][this.controlType].disableValidation) {
        return true;
      }

      return false;
    },

    /**
     * Pick-up the specific configuration View for the Control
     * Depend on the `configComponent` of CONTROLS in `src/configs/controls.js`
     * If there's none => No Specific Configuration for the field
     * @returns VueComponent
     */
    specificConfigurationView: function specificConfigurationView() {
      if (!controls["a" /* CONTROLS */][this.controlType].hasOwnProperty("configComponent")) {
        return null;
      } // NOTE: this is a hash map access , not 2d array =))


      return controls["a" /* CONTROLS */][this.controlType]["configComponent"];
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/SidebarControlConfiguration.vue?vue&type=script&lang=js&
 /* harmony default export */ var sidebar_config_views_SidebarControlConfigurationvue_type_script_lang_js_ = (SidebarControlConfigurationvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/builder/sidebar-config-views/SidebarControlConfiguration.vue?vue&type=style&index=0&lang=css&
var SidebarControlConfigurationvue_type_style_index_0_lang_css_ = __webpack_require__("f643");

// CONCATENATED MODULE: ./src/views/builder/sidebar-config-views/SidebarControlConfiguration.vue






/* normalize component */

var SidebarControlConfiguration_component = Object(componentNormalizer["a" /* default */])(
  sidebar_config_views_SidebarControlConfigurationvue_type_script_lang_js_,
  SidebarControlConfigurationvue_type_template_id_37952f62_render,
  SidebarControlConfigurationvue_type_template_id_37952f62_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var SidebarControlConfiguration = (SidebarControlConfiguration_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/ControlView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







/* harmony default export */ var ControlViewvue_type_script_lang_js_ = ({
  name: "ControlView",
  components: {
    ControlOption: ControlOption,
    ControlLabel: ControlLabel
  },
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  props: {
    control: {
      type: Object,
      required: true
    },
    parentId: {
      type: String,
      required: true
    }
  },
  data: function data() {
    return {
      isActive: false
    };
  },
  methods: {
    /**
     * [Emit-from-children] ControlOption will emit this if user want to delete the current control
     */
    deleteControl: function deleteControl() {
      // EMIT to FormBuilder to let it delete the control for us
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.CONTROL.DELETE, this.parentId, this.control.uniqueId);
    },

    /**
     * [Emit-from-children] ControlOption will emit this when user clicked "Cog" button
     * We're opening the sidebar configuration....
     */
    openConfiguration: function openConfiguration() {
      // If the current one active => no trigger...
      if (this.isActive) {
        return;
      }

      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.OPEN, {
        runnerId: this.control.uniqueId,
        title: "CONFIGURAÇÕES DO COMPONENTE"
      });
    },

    /**
     * [Emit-from-GlobalSidebar]
     */
    openedConfiguration: function openedConfiguration(runnerId) {
      if (runnerId !== this.control.uniqueId) {
        return;
      } // eligible to render sidebar


      this.isActive = true;
      this.renderSidebar();
    },

    /**
     * Push an Event to GlobalSidebar to Render the Body :D
     */
    renderSidebar: function renderSidebar() {
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.INJECT, new sidebar_renderer_class["a" /* default */](this.control.uniqueId, SidebarControlConfiguration, this.control));
    },

    /**
     * Received closed notification from sidebar
     */
    closedConfiguration: function closedConfiguration() {
      this.isActive = false;
    },

    /**
     * Save Control Configuration Data
     * @param {String} runnerId - Control ID
     * @param {Object} controlData - Control Object (After edited in the sidebar)
     */
    saveConfiguration: function saveConfiguration(runnerId, controlData) {
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.CONTROL.UPDATE, runnerId, controlData);
    }
  },
  computed: {
    /**
     * This accessor will get the component object to let us inject the right control
     */
    controlComponent: function controlComponent() {
      // validate input
      if (!controls["a" /* CONTROLS */][this.control.type] || !controls["a" /* CONTROLS */][this.control.type].fieldComponent) {
        throw new TypeError("Control Type Mapping failed => Can't be rendered. Reason: Your control type ".concat(this.control.type, " doesn't have 'fieldComponent' property"));
      }

      return controls["a" /* CONTROLS */][this.control.type].fieldComponent;
    }
  },
  created: function created() {
    // listen to GlobalSidebar
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.SAVE, this.saveConfiguration);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.SAVE_AND_CLOSE, this.saveConfiguration);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.AFTER_CLOSED, this.closedConfiguration);
    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].BUILDER.SIDEBAR.OPENED, this.openedConfiguration);
  }
});
// CONCATENATED MODULE: ./src/views/builder/ControlView.vue?vue&type=script&lang=js&
 /* harmony default export */ var builder_ControlViewvue_type_script_lang_js_ = (ControlViewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/builder/ControlView.vue?vue&type=style&index=0&lang=css&
var ControlViewvue_type_style_index_0_lang_css_ = __webpack_require__("198e");

// CONCATENATED MODULE: ./src/views/builder/ControlView.vue






/* normalize component */

var ControlView_component = Object(componentNormalizer["a" /* default */])(
  builder_ControlViewvue_type_script_lang_js_,
  ControlViewvue_type_template_id_c68d6564_render,
  ControlViewvue_type_template_id_c68d6564_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ControlView = (ControlView_component.exports);
// CONCATENATED MODULE: ./src/mixins/section-view-mixins.js








var SECTION_VIEW_MIXINS = {
  components: {
    AddRowControl: AddRowControl,
    // Add Row
    draggable: vuedraggable_common_default.a,
    // For Sorting Row/Control
    AddControlControl: AddControlControl,
    // Add Control
    ControlView: ControlView // Show Control

  },
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  props: {
    section: Object,
    rows: Object,
    controls: Object
  },
  data: function data() {
    return {};
  },
  methods: {
    /**
     * Add a new rows for the section
     * @desc Typically, we create a new Row Object, push it into the global `Rows` Object. And then assign the ID
     * into the current section.rows
     * This method will be invoked whenever `AddRowControl` is emitted any value.
     * @emitKey addRowNotify
     */
    addRow: function addRow() {
      // get rowType of Section
      var rowType = SECTION_TYPES[this.section.type].rowType; // Create new Row Object - BUSS: New Object

      var newRowObject = Object(row["c" /* createNewRow */])(rowType); // Parent-Handle: Add Row | Push ID into Section.rows

      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.ROW.CREATE, newRowObject);
      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].BUILDER.SECTION.ADDED_ROW, this.section.uniqueId, newRowObject.uniqueId);
    }
  },
  computed: {
    /**
     * Property that will be used to drag - for Control Only
     */
    dragControlHandle: function dragControlHandle() {
      return ".option-control.drag-item";
    },

    /**
     * Base group of drag/drop
     * We can share this for each section/row
     */
    dragGroup: function dragGroup() {
      return "v-form-builder-control";
    },

    /**
     * Accessor helper to check if the current section has control(s) or not
     */
    hasControl: function hasControl() {
      return this.section.controls.length > 0;
    },

    /**
     * Classes for draggable
     * @returns {(string|string)[]}
     */
    draggableClasses: function draggableClasses() {
      return [this.styles.ROW, 'control-list-container', this.hasControl ? '' : 'empty'];
    }
  }
};

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/section-views/NormalSectionView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/**
 * @property {Object} section
 * @property {Object} rows RowId - RowData
 * @property {Object} controls ControlId - ControlData
 * @property {Array} section.rows
 * @property {Array} section.controls
 */

/* harmony default export */ var NormalSectionViewvue_type_script_lang_js_ = ({
  name: "NormalSectionView",
  mixins: [SECTION_VIEW_MIXINS],
  data: function data() {
    return {};
  },
  methods: {
    openAddControl: function openAddControl() {
      this.$refs["AddControl"].openAddControl();
    }
  }
});
// CONCATENATED MODULE: ./src/views/builder/section-views/NormalSectionView.vue?vue&type=script&lang=js&
 /* harmony default export */ var section_views_NormalSectionViewvue_type_script_lang_js_ = (NormalSectionViewvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/views/builder/section-views/NormalSectionView.vue?vue&type=style&index=0&id=b2b8cdd4&scoped=true&lang=css&
var NormalSectionViewvue_type_style_index_0_id_b2b8cdd4_scoped_true_lang_css_ = __webpack_require__("f853");

// CONCATENATED MODULE: ./src/views/builder/section-views/NormalSectionView.vue






/* normalize component */

var NormalSectionView_component = Object(componentNormalizer["a" /* default */])(
  section_views_NormalSectionViewvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "b2b8cdd4",
  null
  
)

/* harmony default export */ var NormalSectionView = (NormalSectionView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/section-views/ToggleableSectionView.vue?vue&type=template&id=1f760b30&
var ToggleableSectionViewvue_type_template_id_1f760b30_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"toggleable-section"},[_c('div',{staticClass:"headline-block p5"},[_c('h2',{class:_vm.section.headlineAdditionalClass},[_c('span',{staticClass:"toggle-item",domProps:{"innerHTML":_vm._s(_vm.isVisible ? _vm.iconClose : _vm.iconOpen)},on:{"click":function($event){_vm.isVisible = !_vm.isVisible}}}),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.section.isShowHeadline),expression:"section.isShowHeadline"}]},[_vm._v(" "+_vm._s(_vm.$t(("canvas." + (_vm.section.headline))))+" ")]),_c('small',{directives:[{name:"show",rawName:"v-show",value:(_vm.section.isShowHeadline),expression:"section.isShowHeadline"}],class:[_vm.section.subHeadlineAdditionalClass, 'toggleable-sub-headline']},[_vm._v(" "+_vm._s(_vm.$t(("canvas." + (_vm.section.subHeadline))))+" ")])])]),_c('transition',{attrs:{"name":"slide"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isVisible),expression:"isVisible"}]},[_c('draggable',{class:_vm.draggableClasses,attrs:{"ghost-class":"ghost","handle":_vm.dragControlHandle,"list":_vm.section.controls,"group":_vm.dragGroup}},[_vm._l((_vm.section.controls),function(controlId){return _c('ControlView',{key:controlId,attrs:{"control":_vm.controls[controlId],"parent-id":_vm.section.uniqueId}})}),(!_vm.hasControl)?_c('p',[_vm._v(" Droppable Zone / Controls will be showed here... ")]):_vm._e()],2),_c('AddControlControl',{attrs:{"section":_vm.section}})],1)])],1)}
var ToggleableSectionViewvue_type_template_id_1f760b30_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/builder/section-views/ToggleableSectionView.vue?vue&type=template&id=1f760b30&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/builder/section-views/ToggleableSectionView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var ToggleableSectionViewvue_type_script_lang_js_ = ({
  name: "ToggleableSectionView",
  components: {
    AddControlControl: AddControlControl
  },
  mixins: [SECTION_VIEW_MIXINS, style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */], TOGGLEABLE_MIXIN]
});
// CONCATENATED MODULE: ./src/views/builder/section-views/ToggleableSectionView.vue?vue&type=script&lang=js&
 /* harmony default export */ var section_views_ToggleableSectionViewvue_type_script_lang_js_ = (ToggleableSectionViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/builder/section-views/ToggleableSectionView.vue





/* normalize component */

var ToggleableSectionView_component = Object(componentNormalizer["a" /* default */])(
  section_views_ToggleableSectionViewvue_type_script_lang_js_,
  ToggleableSectionViewvue_type_template_id_1f760b30_render,
  ToggleableSectionViewvue_type_template_id_1f760b30_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var ToggleableSectionView = (ToggleableSectionView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/renderer/section-views/NormalSectionView.vue?vue&type=template&id=adf6e8c6&
var NormalSectionViewvue_type_template_id_adf6e8c6_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"normal-section"},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.section.isShowHeadline),expression:"section.isShowHeadline"}],staticClass:"headline-block"},[_c('h2',{class:_vm.section.headlineAdditionalClass,domProps:{"textContent":_vm._s(_vm.section.headline)}}),_c('p',{class:_vm.section.subHeadlineAdditionalClass,domProps:{"textContent":_vm._s(_vm.section.subHeadline)}})]),_c('div',{class:_vm.containerClasses},_vm._l((_vm.section.controls),function(controlId){return _c('ControlView',{key:controlId,attrs:{"control":_vm.controls[controlId],"parent-id":_vm.section.uniqueId,"value-container":_vm.valueContainer,"validation-errors":_vm.validationErrors}})}),1)])}
var NormalSectionViewvue_type_template_id_adf6e8c6_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/renderer/section-views/NormalSectionView.vue?vue&type=template&id=adf6e8c6&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/renderer/ControlView.vue?vue&type=template&id=715e7b39&
var ControlViewvue_type_template_id_715e7b39_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.control.containerClass, 'control-view-wrapper', _vm.control.additionalContainerClass]},[_c('div',{staticClass:"control-view"},[_c('ControlLabel',{directives:[{name:"show",rawName:"v-show",value:(_vm.control.isShowLabel),expression:"control.isShowLabel"}],attrs:{"control":_vm.control}}),_c(_vm.controlComponent,{tag:"component",class:_vm.validationErrorClasses,attrs:{"control":_vm.control,"value-container":_vm.valueContainer},model:{value:(_vm.valueContainer[_vm.controlName]),callback:function ($$v) {_vm.$set(_vm.valueContainer, _vm.controlName, $$v)},expression:"valueContainer[controlName]"}}),(_vm.hasValidationError)?_vm._l((_vm.validationErrorMessages),function(mess,i){return _c('div',{key:i,class:_vm.styles.FORM.ERROR_MESSAGE,domProps:{"textContent":_vm._s(mess)}})}):_vm._e()],2)])}
var ControlViewvue_type_template_id_715e7b39_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/renderer/ControlView.vue?vue&type=template&id=715e7b39&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/renderer/ControlView.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



/* harmony default export */ var renderer_ControlViewvue_type_script_lang_js_ = ({
  name: "ControlView",
  components: {
    ControlLabel: ControlLabel
  },
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  props: {
    control: {
      type: Object,
      required: true
    },
    parentId: {
      type: String,
      required: true
    },
    valueContainer: {
      type: Object,
      required: true
    },
    validationErrors: {
      type: Object,
      default: function _default() {
        return {};
      } // empty object

    }
  },
  computed: {
    /**
     * This accessor will get the component object to let us inject the right control
     */
    controlComponent: function controlComponent() {
      // validate input
      if (!controls["a" /* CONTROLS */][this.control.type] || !controls["a" /* CONTROLS */][this.control.type].fieldComponent) {
        throw new TypeError("Control Type Mapping failed => Can't be rendered. Reason: Your control type ".concat(this.control.type, " doesn't have 'fieldComponent' property"));
      }

      return controls["a" /* CONTROLS */][this.control.type].fieldComponent;
    },

    /**
     * Generate Control Base Name
     * @returns {string}
     */
    controlName: function controlName() {
      return this.control.name || this.control.uniqueId;
    },

    /**
     * Check if current control has validation error(s)
     * @returns {boolean}
     */
    hasValidationError: function hasValidationError() {
      return !!this.validationErrors[this.controlName];
    },

    /**
     * Short-Path access to the Validation Error MEssages List
     * @returns {String[]}
     */
    validationErrorMessages: function validationErrorMessages() {
      return this.validationErrors[this.controlName];
    },
    validationErrorClasses: function validationErrorClasses() {
      var classes = {};
      classes[this.styles.FORM.ERROR_OUTLINE] = this.hasValidationError;
      return classes;
    }
  }
});
// CONCATENATED MODULE: ./src/views/renderer/ControlView.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_renderer_ControlViewvue_type_script_lang_js_ = (renderer_ControlViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/renderer/ControlView.vue





/* normalize component */

var renderer_ControlView_component = Object(componentNormalizer["a" /* default */])(
  views_renderer_ControlViewvue_type_script_lang_js_,
  ControlViewvue_type_template_id_715e7b39_render,
  ControlViewvue_type_template_id_715e7b39_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var renderer_ControlView = (renderer_ControlView_component.exports);
// CONCATENATED MODULE: ./src/mixins/renderer-section-view-mixin.js


var RENDERER_SECTION_VIEW_MIXIN = {
  components: {
    ControlView: renderer_ControlView // Show Control

  },
  mixins: [style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */]],
  props: {
    section: Object,
    rows: Object,
    controls: Object,
    valueContainer: Object,
    validationErrors: Object
  },
  data: function data() {
    return {};
  },
  methods: {},
  computed: {
    /**
     * Classes for draggable
     * @returns {(string|string)[]}
     */
    containerClasses: function containerClasses() {
      return [this.styles.ROW, 'control-list-container'];
    }
  }
};

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/renderer/section-views/NormalSectionView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/**
 * @property {Object} section
 * @property {Object} rows RowId - RowData
 * @property {Object} controls ControlId - ControlData
 * @property {Array} section.rows
 * @property {Array} section.controls
 */

/* harmony default export */ var renderer_section_views_NormalSectionViewvue_type_script_lang_js_ = ({
  name: "NormalSectionView",
  mixins: [RENDERER_SECTION_VIEW_MIXIN],
  data: function data() {
    return {};
  }
});
// CONCATENATED MODULE: ./src/views/renderer/section-views/NormalSectionView.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_renderer_section_views_NormalSectionViewvue_type_script_lang_js_ = (renderer_section_views_NormalSectionViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/renderer/section-views/NormalSectionView.vue





/* normalize component */

var section_views_NormalSectionView_component = Object(componentNormalizer["a" /* default */])(
  views_renderer_section_views_NormalSectionViewvue_type_script_lang_js_,
  NormalSectionViewvue_type_template_id_adf6e8c6_render,
  NormalSectionViewvue_type_template_id_adf6e8c6_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var section_views_NormalSectionView = (section_views_NormalSectionView_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/renderer/section-views/ToggleableSectionView.vue?vue&type=template&id=8e1ab932&
var ToggleableSectionViewvue_type_template_id_8e1ab932_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"toggleable-section"},[_c('div',{staticClass:"headline-block"},[_c('h2',{class:_vm.section.headlineAdditionalClass},[_c('span',{staticClass:"toggle-item",domProps:{"innerHTML":_vm._s(_vm.isVisible ? _vm.iconClose : _vm.iconOpen)},on:{"click":function($event){_vm.isVisible = !_vm.isVisible}}}),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.section.isShowHeadline),expression:"section.isShowHeadline"}],domProps:{"textContent":_vm._s(_vm.section.headline)}}),_c('small',{directives:[{name:"show",rawName:"v-show",value:(_vm.section.isShowHeadline),expression:"section.isShowHeadline"}],class:[_vm.section.subHeadlineAdditionalClass, 'toggleable-sub-headline'],domProps:{"textContent":_vm._s(_vm.section.subHeadline)}})])]),_c('transition',{attrs:{"name":"slide"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.isVisible),expression:"isVisible"}],class:_vm.containerClasses},_vm._l((_vm.section.controls),function(controlId){return _c('ControlView',{key:controlId,attrs:{"control":_vm.controls[controlId],"parent-id":_vm.section.uniqueId,"value-container":_vm.valueContainer,"validation-errors":_vm.validationErrors}})}),1)])],1)}
var ToggleableSectionViewvue_type_template_id_8e1ab932_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/renderer/section-views/ToggleableSectionView.vue?vue&type=template&id=8e1ab932&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/renderer/section-views/ToggleableSectionView.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var renderer_section_views_ToggleableSectionViewvue_type_script_lang_js_ = ({
  name: "ToggleableSectionView",
  mixins: [RENDERER_SECTION_VIEW_MIXIN, TOGGLEABLE_MIXIN]
});
// CONCATENATED MODULE: ./src/views/renderer/section-views/ToggleableSectionView.vue?vue&type=script&lang=js&
 /* harmony default export */ var views_renderer_section_views_ToggleableSectionViewvue_type_script_lang_js_ = (renderer_section_views_ToggleableSectionViewvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/views/renderer/section-views/ToggleableSectionView.vue





/* normalize component */

var section_views_ToggleableSectionView_component = Object(componentNormalizer["a" /* default */])(
  views_renderer_section_views_ToggleableSectionViewvue_type_script_lang_js_,
  ToggleableSectionViewvue_type_template_id_8e1ab932_render,
  ToggleableSectionViewvue_type_template_id_8e1ab932_staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var section_views_ToggleableSectionView = (section_views_ToggleableSectionView_component.exports);
// CONCATENATED MODULE: ./src/configs/section.js
/**
 * Supported Section & Section Constants in Vue-Form-Builder
 * @author Phat Tran
 */


 // import TableSectionView from "@/views/builder/section-views/TableSectionView";




var SECTION_TYPES = {
  normal: {
    name: "normal_block_name",
    description: "normal_block_description",
    value: 'normal',
    rowType: row["b" /* ROW_TYPES */].normal,
    builderView: NormalSectionView,
    rendererView: section_views_NormalSectionView
  },
  toggleable: {
    name: "toggleable_block_name",
    description: "toggleable_block_description",
    value: 'toggleable',
    rowType: row["b" /* ROW_TYPES */].normal,
    builderView: ToggleableSectionView,
    rendererView: section_views_ToggleableSectionView
  } // table: {
  //     name: "Table Block",
  //     description: "Section block built from a table with 2 column",
  //     value: 'table',
  //
  //     rowType: ROW_TYPES.tableRow,
  //     builderView: TableSectionView
  // },

};
/**
 * DEFAULT DATA in order to create/reread from the configuration
 */

var SECTION_DEFAULT_DATA = {
  uniqueId: '',
  headline: '',
  headlineAdditionalClass: '',
  subHeadline: '',
  subHeadlineAdditionalClass: '',
  isShowHeadline: true,
  sortOrder: 0,
  type: '',
  rows: [],
  // array of rowId
  controls: [] // array of controlIds

};
/**
 * Create new Section
 * @param type
 * @param sortOrder
 */

function createNewSection(type) {
  var sortOrder = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!SECTION_TYPES[type]) {
    throw new TypeError("Section Type: ".concat(type, " doesn't exists in Vue-Form-Builder"));
  } // create new section data base on the default data


  var newSectionData = helper["a" /* HELPER */].cloneDeep(SECTION_DEFAULT_DATA);
  newSectionData.type = type;
  newSectionData.uniqueId = "section-" + helper["a" /* HELPER */].getUUIDv4();
  newSectionData.headline = "Nova Seção";
  newSectionData.subHeadline = "Este é o subtítulo da nova seção";
  newSectionData.sortOrder = sortOrder;
  return newSectionData;
}



/***/ }),

/***/ "df7c":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("4362")))

/***/ }),

/***/ "e11e":
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),

/***/ "e39c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
var toStr = Object.prototype.toString;

var isStandardArguments = function isArguments(value) {
	if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
		return false;
	}
	return toStr.call(value) === '[object Arguments]';
};

var isLegacyArguments = function isArguments(value) {
	if (isStandardArguments(value)) {
		return true;
	}
	return value !== null &&
		typeof value === 'object' &&
		typeof value.length === 'number' &&
		value.length >= 0 &&
		toStr.call(value) !== '[object Array]' &&
		toStr.call(value.callee) === '[object Function]';
};

var supportsStandardArguments = (function () {
	return isStandardArguments(arguments);
}());

isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;


/***/ }),

/***/ "e3db":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "e3e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $WeakMap = typeof WeakMap === 'function' && WeakMap.prototype ? WeakMap : null;
var $WeakSet = typeof WeakSet === 'function' && WeakSet.prototype ? WeakSet : null;

var exported;

if (!$WeakMap) {
	// eslint-disable-next-line no-unused-vars
	exported = function isWeakMap(x) {
		// `WeakMap` is not present in this environment.
		return false;
	};
}

var $mapHas = $WeakMap ? $WeakMap.prototype.has : null;
var $setHas = $WeakSet ? $WeakSet.prototype.has : null;
if (!exported && !$mapHas) {
	// eslint-disable-next-line no-unused-vars
	exported = function isWeakMap(x) {
		// `WeakMap` does not have a `has` method
		return false;
	};
}

module.exports = exported || function isWeakMap(x) {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$mapHas.call(x, $mapHas);
		if ($setHas) {
			try {
				$setHas.call(x, $setHas);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $WeakMap; // core-js workaround, pre-v3
	} catch (e) {}
	return false;
};


/***/ }),

/***/ "e710":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__("f367");
var callBind = __webpack_require__("44b7");

var implementation = __webpack_require__("5708");
var getPolyfill = __webpack_require__("57ec");
var shim = __webpack_require__("1c7e");

var flagsBound = callBind(implementation);

define(flagsBound, {
	getPolyfill: getPolyfill,
	implementation: implementation,
	shim: shim
});

module.exports = flagsBound;


/***/ }),

/***/ "e853":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var isArray = __webpack_require__("1169");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),

/***/ "e9ac":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* globals
	Atomics,
	SharedArrayBuffer,
*/

var undefined;

var $TypeError = TypeError;

var $gOPD = Object.getOwnPropertyDescriptor;
if ($gOPD) {
	try {
		$gOPD({}, '');
	} catch (e) {
		$gOPD = null; // this is IE 8, which has a broken gOPD
	}
}

var throwTypeError = function () { throw new $TypeError(); };
var ThrowTypeError = $gOPD
	? (function () {
		try {
			// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
			arguments.callee; // IE 8 does not throw here
			return throwTypeError;
		} catch (calleeThrows) {
			try {
				// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
				return $gOPD(arguments, 'callee').get;
			} catch (gOPDthrows) {
				return throwTypeError;
			}
		}
	}())
	: throwTypeError;

var hasSymbols = __webpack_require__("5156")();

var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

var generator; // = function * () {};
var generatorFunction = generator ? getProto(generator) : undefined;
var asyncFn; // async function() {};
var asyncFunction = asyncFn ? asyncFn.constructor : undefined;
var asyncGen; // async function * () {};
var asyncGenFunction = asyncGen ? getProto(asyncGen) : undefined;
var asyncGenIterator = asyncGen ? asyncGen() : undefined;

var TypedArray = typeof Uint8Array === 'undefined' ? undefined : getProto(Uint8Array);

var INTRINSICS = {
	'%Array%': Array,
	'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer,
	'%ArrayBufferPrototype%': typeof ArrayBuffer === 'undefined' ? undefined : ArrayBuffer.prototype,
	'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined,
	'%ArrayPrototype%': Array.prototype,
	'%ArrayProto_entries%': Array.prototype.entries,
	'%ArrayProto_forEach%': Array.prototype.forEach,
	'%ArrayProto_keys%': Array.prototype.keys,
	'%ArrayProto_values%': Array.prototype.values,
	'%AsyncFromSyncIteratorPrototype%': undefined,
	'%AsyncFunction%': asyncFunction,
	'%AsyncFunctionPrototype%': asyncFunction ? asyncFunction.prototype : undefined,
	'%AsyncGenerator%': asyncGen ? getProto(asyncGenIterator) : undefined,
	'%AsyncGeneratorFunction%': asyncGenFunction,
	'%AsyncGeneratorPrototype%': asyncGenFunction ? asyncGenFunction.prototype : undefined,
	'%AsyncIteratorPrototype%': asyncGenIterator && hasSymbols && Symbol.asyncIterator ? asyncGenIterator[Symbol.asyncIterator]() : undefined,
	'%Atomics%': typeof Atomics === 'undefined' ? undefined : Atomics,
	'%Boolean%': Boolean,
	'%BooleanPrototype%': Boolean.prototype,
	'%DataView%': typeof DataView === 'undefined' ? undefined : DataView,
	'%DataViewPrototype%': typeof DataView === 'undefined' ? undefined : DataView.prototype,
	'%Date%': Date,
	'%DatePrototype%': Date.prototype,
	'%decodeURI%': decodeURI,
	'%decodeURIComponent%': decodeURIComponent,
	'%encodeURI%': encodeURI,
	'%encodeURIComponent%': encodeURIComponent,
	'%Error%': Error,
	'%ErrorPrototype%': Error.prototype,
	'%eval%': eval, // eslint-disable-line no-eval
	'%EvalError%': EvalError,
	'%EvalErrorPrototype%': EvalError.prototype,
	'%Float32Array%': typeof Float32Array === 'undefined' ? undefined : Float32Array,
	'%Float32ArrayPrototype%': typeof Float32Array === 'undefined' ? undefined : Float32Array.prototype,
	'%Float64Array%': typeof Float64Array === 'undefined' ? undefined : Float64Array,
	'%Float64ArrayPrototype%': typeof Float64Array === 'undefined' ? undefined : Float64Array.prototype,
	'%Function%': Function,
	'%FunctionPrototype%': Function.prototype,
	'%Generator%': generator ? getProto(generator()) : undefined,
	'%GeneratorFunction%': generatorFunction,
	'%GeneratorPrototype%': generatorFunction ? generatorFunction.prototype : undefined,
	'%Int8Array%': typeof Int8Array === 'undefined' ? undefined : Int8Array,
	'%Int8ArrayPrototype%': typeof Int8Array === 'undefined' ? undefined : Int8Array.prototype,
	'%Int16Array%': typeof Int16Array === 'undefined' ? undefined : Int16Array,
	'%Int16ArrayPrototype%': typeof Int16Array === 'undefined' ? undefined : Int8Array.prototype,
	'%Int32Array%': typeof Int32Array === 'undefined' ? undefined : Int32Array,
	'%Int32ArrayPrototype%': typeof Int32Array === 'undefined' ? undefined : Int32Array.prototype,
	'%isFinite%': isFinite,
	'%isNaN%': isNaN,
	'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined,
	'%JSON%': typeof JSON === 'object' ? JSON : undefined,
	'%JSONParse%': typeof JSON === 'object' ? JSON.parse : undefined,
	'%Map%': typeof Map === 'undefined' ? undefined : Map,
	'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined : getProto(new Map()[Symbol.iterator]()),
	'%MapPrototype%': typeof Map === 'undefined' ? undefined : Map.prototype,
	'%Math%': Math,
	'%Number%': Number,
	'%NumberPrototype%': Number.prototype,
	'%Object%': Object,
	'%ObjectPrototype%': Object.prototype,
	'%ObjProto_toString%': Object.prototype.toString,
	'%ObjProto_valueOf%': Object.prototype.valueOf,
	'%parseFloat%': parseFloat,
	'%parseInt%': parseInt,
	'%Promise%': typeof Promise === 'undefined' ? undefined : Promise,
	'%PromisePrototype%': typeof Promise === 'undefined' ? undefined : Promise.prototype,
	'%PromiseProto_then%': typeof Promise === 'undefined' ? undefined : Promise.prototype.then,
	'%Promise_all%': typeof Promise === 'undefined' ? undefined : Promise.all,
	'%Promise_reject%': typeof Promise === 'undefined' ? undefined : Promise.reject,
	'%Promise_resolve%': typeof Promise === 'undefined' ? undefined : Promise.resolve,
	'%Proxy%': typeof Proxy === 'undefined' ? undefined : Proxy,
	'%RangeError%': RangeError,
	'%RangeErrorPrototype%': RangeError.prototype,
	'%ReferenceError%': ReferenceError,
	'%ReferenceErrorPrototype%': ReferenceError.prototype,
	'%Reflect%': typeof Reflect === 'undefined' ? undefined : Reflect,
	'%RegExp%': RegExp,
	'%RegExpPrototype%': RegExp.prototype,
	'%Set%': typeof Set === 'undefined' ? undefined : Set,
	'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined : getProto(new Set()[Symbol.iterator]()),
	'%SetPrototype%': typeof Set === 'undefined' ? undefined : Set.prototype,
	'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer,
	'%SharedArrayBufferPrototype%': typeof SharedArrayBuffer === 'undefined' ? undefined : SharedArrayBuffer.prototype,
	'%String%': String,
	'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined,
	'%StringPrototype%': String.prototype,
	'%Symbol%': hasSymbols ? Symbol : undefined,
	'%SymbolPrototype%': hasSymbols ? Symbol.prototype : undefined,
	'%SyntaxError%': SyntaxError,
	'%SyntaxErrorPrototype%': SyntaxError.prototype,
	'%ThrowTypeError%': ThrowTypeError,
	'%TypedArray%': TypedArray,
	'%TypedArrayPrototype%': TypedArray ? TypedArray.prototype : undefined,
	'%TypeError%': $TypeError,
	'%TypeErrorPrototype%': $TypeError.prototype,
	'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array,
	'%Uint8ArrayPrototype%': typeof Uint8Array === 'undefined' ? undefined : Uint8Array.prototype,
	'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray,
	'%Uint8ClampedArrayPrototype%': typeof Uint8ClampedArray === 'undefined' ? undefined : Uint8ClampedArray.prototype,
	'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array,
	'%Uint16ArrayPrototype%': typeof Uint16Array === 'undefined' ? undefined : Uint16Array.prototype,
	'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array,
	'%Uint32ArrayPrototype%': typeof Uint32Array === 'undefined' ? undefined : Uint32Array.prototype,
	'%URIError%': URIError,
	'%URIErrorPrototype%': URIError.prototype,
	'%WeakMap%': typeof WeakMap === 'undefined' ? undefined : WeakMap,
	'%WeakMapPrototype%': typeof WeakMap === 'undefined' ? undefined : WeakMap.prototype,
	'%WeakSet%': typeof WeakSet === 'undefined' ? undefined : WeakSet,
	'%WeakSetPrototype%': typeof WeakSet === 'undefined' ? undefined : WeakSet.prototype
};

var bind = __webpack_require__("0f7c");
var $replace = bind.call(Function.call, String.prototype.replace);

/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
var stringToPath = function stringToPath(string) {
	var result = [];
	$replace(string, rePropName, function (match, number, quote, subString) {
		result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : (number || match);
	});
	return result;
};
/* end adaptation */

var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
	if (!(name in INTRINSICS)) {
		throw new SyntaxError('intrinsic ' + name + ' does not exist!');
	}

	// istanbul ignore if // hopefully this is impossible to test :-)
	if (typeof INTRINSICS[name] === 'undefined' && !allowMissing) {
		throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
	}

	return INTRINSICS[name];
};

module.exports = function GetIntrinsic(name, allowMissing) {
	if (typeof name !== 'string' || name.length === 0) {
		throw new TypeError('intrinsic name must be a non-empty string');
	}
	if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
		throw new TypeError('"allowMissing" argument must be a boolean');
	}

	var parts = stringToPath(name);

	var value = getBaseIntrinsic('%' + (parts.length > 0 ? parts[0] : '') + '%', allowMissing);
	for (var i = 1; i < parts.length; i += 1) {
		if (value != null) {
			if ($gOPD && (i + 1) >= parts.length) {
				var desc = $gOPD(value, parts[i]);
				if (!allowMissing && !(parts[i] in value)) {
					throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
				}
				value = desc ? (desc.get || desc.value) : value[parts[i]];
			} else {
				value = value[parts[i]];
			}
		}
	}
	return value;
};


/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "ec30":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

if (__webpack_require__("9e1e")) {
  var LIBRARY = __webpack_require__("2d00");
  var global = __webpack_require__("7726");
  var fails = __webpack_require__("79e5");
  var $export = __webpack_require__("5ca1");
  var $typed = __webpack_require__("0f88");
  var $buffer = __webpack_require__("ed0b");
  var ctx = __webpack_require__("9b43");
  var anInstance = __webpack_require__("f605");
  var propertyDesc = __webpack_require__("4630");
  var hide = __webpack_require__("32e9");
  var redefineAll = __webpack_require__("dcbc");
  var toInteger = __webpack_require__("4588");
  var toLength = __webpack_require__("9def");
  var toIndex = __webpack_require__("09fa");
  var toAbsoluteIndex = __webpack_require__("77f1");
  var toPrimitive = __webpack_require__("6a99");
  var has = __webpack_require__("69a8");
  var classof = __webpack_require__("23c6");
  var isObject = __webpack_require__("d3f4");
  var toObject = __webpack_require__("4bf8");
  var isArrayIter = __webpack_require__("33a4");
  var create = __webpack_require__("2aeb");
  var getPrototypeOf = __webpack_require__("38fd");
  var gOPN = __webpack_require__("9093").f;
  var getIterFn = __webpack_require__("27ee");
  var uid = __webpack_require__("ca5a");
  var wks = __webpack_require__("2b4c");
  var createArrayMethod = __webpack_require__("0a49");
  var createArrayIncludes = __webpack_require__("c366");
  var speciesConstructor = __webpack_require__("ebd6");
  var ArrayIterators = __webpack_require__("cadf");
  var Iterators = __webpack_require__("84f2");
  var $iterDetect = __webpack_require__("5cc5");
  var setSpecies = __webpack_require__("7a56");
  var arrayFill = __webpack_require__("36bd");
  var arrayCopyWithin = __webpack_require__("ba92");
  var $DP = __webpack_require__("86cc");
  var $GOPD = __webpack_require__("11e9");
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function (it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function (it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function (C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    } return new C(length);
  };

  var speciesFromList = function (O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function (C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) result[index] = list[index++];
    return result;
  };

  var addGetter = function (it, key, internal) {
    dP(it, key, { get: function () { return this._d[internal]; } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      } O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of(/* ...items */) {
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) result[index] = arguments[index++];
    return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () { arrayToLocaleString.call(new Uint8Array(1)); });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) { // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn,
        arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) { // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) { // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) { // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      } return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(
        O.buffer,
        O.byteOffset + $begin * O.BYTES_PER_ELEMENT,
        toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin)
      );
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) this[offset + index] = src[index++];
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function (target, key) {
    return isObject(target)
      && target[TYPED_ARRAY]
      && typeof key != 'symbol'
      && key in target
      && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true))
      ? propertyDesc(2, target[key])
      : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true))
      && isObject(desc)
      && has(desc, 'value')
      && !has(desc, 'get')
      && !has(desc, 'set')
      // TODO: add validation descriptor w/o calling accessors
      && !desc.configurable
      && (!has(desc, 'writable') || desc.writable)
      && (!has(desc, 'enumerable') || desc.enumerable)
    ) {
      target[key] = desc.value;
      return target;
    } return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () { arrayToString.call({}); })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function () { /* noop */ },
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function () { return this[TYPED_ARRAY]; }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function (that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function (that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function (that, index) {
      dP(that, index, {
        get: function () {
          return getter(this, index);
        },
        set: function (value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) addElement(that, index++);
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined
            ? new Base(data, toOffset($offset, BYTES), $length)
            : $offset !== undefined
              ? new Base(data, toOffset($offset, BYTES))
              : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator
      && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function () { return NAME; }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () { Base.of.call(TypedArray, 1); }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () { /* empty */ };


/***/ }),

/***/ "ed0b":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var DESCRIPTORS = __webpack_require__("9e1e");
var LIBRARY = __webpack_require__("2d00");
var $typed = __webpack_require__("0f88");
var hide = __webpack_require__("32e9");
var redefineAll = __webpack_require__("dcbc");
var fails = __webpack_require__("79e5");
var anInstance = __webpack_require__("f605");
var toInteger = __webpack_require__("4588");
var toLength = __webpack_require__("9def");
var toIndex = __webpack_require__("09fa");
var gOPN = __webpack_require__("9093").f;
var dP = __webpack_require__("86cc").f;
var arrayFill = __webpack_require__("36bd");
var setToStringTag = __webpack_require__("7f20");
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8);
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8);
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8);
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8);
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  } return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function () { return this[internal]; } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;


/***/ }),

/***/ "edc4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var forEach = __webpack_require__("bfad");
var availableTypedArrays = __webpack_require__("7226");
var callBound = __webpack_require__("2a1a");

var $toString = callBound('Object.prototype.toString');
var hasSymbols = __webpack_require__("5156")();
var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === 'symbol';

var typedArrays = availableTypedArrays();

var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = __webpack_require__("1dd1");
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		if (typeof global[typedArray] === 'function') {
			var arr = new global[typedArray]();
			if (!(Symbol.toStringTag in arr)) {
				throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
			}
			var proto = getPrototypeOf(arr);
			var descriptor = gOPD(proto, Symbol.toStringTag);
			if (!descriptor) {
				var superProto = getPrototypeOf(proto);
				descriptor = gOPD(superProto, Symbol.toStringTag);
			}
			toStrTags[typedArray] = descriptor.get;
		}
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var foundName = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!foundName) {
			try {
				var name = getter.call(value);
				if (name === typedArray) {
					foundName = name;
				}
			} catch (e) {}
		}
	});
	return foundName;
};

var isTypedArray = __webpack_require__("f4e3");

module.exports = function whichTypedArray(value) {
	if (!isTypedArray(value)) { return false; }
	if (!hasToStringTag) { return $slice($toString(value), 8, -1); }
	return tryTypedArrays(value);
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "ee19":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarControlSelectList_vue_vue_type_style_index_0_id_d7d8c770_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("1b00");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarControlSelectList_vue_vue_type_style_index_0_id_d7d8c770_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarControlSelectList_vue_vue_type_style_index_0_id_d7d8c770_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarControlSelectList_vue_vue_type_style_index_0_id_d7d8c770_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ee8f":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f11f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var define = __webpack_require__("f367");
var getPolyfill = __webpack_require__("c8ba6");

module.exports = function shimAssign() {
	var polyfill = getPolyfill();
	define(
		Object,
		{ assign: polyfill },
		{ assign: function () { return Object.assign !== polyfill; } }
	);
	return polyfill;
};


/***/ }),

/***/ "f1ae":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),

/***/ "f367":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var keys = __webpack_require__("d6c7");
var hasSymbols = typeof Symbol === 'function' && typeof Symbol('foo') === 'symbol';

var toStr = Object.prototype.toString;
var concat = Array.prototype.concat;
var origDefineProperty = Object.defineProperty;

var isFunction = function (fn) {
	return typeof fn === 'function' && toStr.call(fn) === '[object Function]';
};

var arePropertyDescriptorsSupported = function () {
	var obj = {};
	try {
		origDefineProperty(obj, 'x', { enumerable: false, value: obj });
		// eslint-disable-next-line no-unused-vars, no-restricted-syntax
		for (var _ in obj) { // jscs:ignore disallowUnusedVariables
			return false;
		}
		return obj.x === obj;
	} catch (e) { /* this is IE 8. */
		return false;
	}
};
var supportsDescriptors = origDefineProperty && arePropertyDescriptorsSupported();

var defineProperty = function (object, name, value, predicate) {
	if (name in object && (!isFunction(predicate) || !predicate())) {
		return;
	}
	if (supportsDescriptors) {
		origDefineProperty(object, name, {
			configurable: true,
			enumerable: false,
			value: value,
			writable: true
		});
	} else {
		object[name] = value;
	}
};

var defineProperties = function (object, map) {
	var predicates = arguments.length > 2 ? arguments[2] : {};
	var props = keys(map);
	if (hasSymbols) {
		props = concat.call(props, Object.getOwnPropertySymbols(map));
	}
	for (var i = 0; i < props.length; i += 1) {
		defineProperty(object, props[i], map[props[i]], predicates[props[i]]);
	}
};

defineProperties.supportsDescriptors = !!supportsDescriptors;

module.exports = defineProperties;


/***/ }),

/***/ "f4e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var forEach = __webpack_require__("bfad");
var availableTypedArrays = __webpack_require__("7226");
var callBound = __webpack_require__("2a1a");

var $toString = callBound('Object.prototype.toString');
var hasSymbols = __webpack_require__("5156")();
var hasToStringTag = hasSymbols && typeof Symbol.toStringTag === 'symbol';

var typedArrays = availableTypedArrays();

var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
	for (var i = 0; i < array.length; i += 1) {
		if (array[i] === value) {
			return i;
		}
	}
	return -1;
};
var $slice = callBound('String.prototype.slice');
var toStrTags = {};
var gOPD = __webpack_require__("1dd1");
var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
if (hasToStringTag && gOPD && getPrototypeOf) {
	forEach(typedArrays, function (typedArray) {
		var arr = new global[typedArray]();
		if (!(Symbol.toStringTag in arr)) {
			throw new EvalError('this engine has support for Symbol.toStringTag, but ' + typedArray + ' does not have the property! Please report this.');
		}
		var proto = getPrototypeOf(arr);
		var descriptor = gOPD(proto, Symbol.toStringTag);
		if (!descriptor) {
			var superProto = getPrototypeOf(proto);
			descriptor = gOPD(superProto, Symbol.toStringTag);
		}
		toStrTags[typedArray] = descriptor.get;
	});
}

var tryTypedArrays = function tryAllTypedArrays(value) {
	var anyTrue = false;
	forEach(toStrTags, function (getter, typedArray) {
		if (!anyTrue) {
			try {
				anyTrue = getter.call(value) === typedArray;
			} catch (e) { /**/ }
		}
	});
	return anyTrue;
};

module.exports = function isTypedArray(value) {
	if (!value || typeof value !== 'object') { return false; }
	if (!hasToStringTag) {
		var tag = $slice($toString(value), 8, -1);
		return $indexOf(typedArrays, tag) > -1;
	}
	if (!gOPD) { return false; }
	return tryTypedArrays(value);
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "f605":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "f63a":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "f643":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarControlConfiguration_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("4957");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarControlConfiguration_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarControlConfiguration_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_SidebarControlConfiguration_vue_vue_type_style_index_0_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "f751":
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__("5ca1");

$export($export.S + $export.F, 'Object', { assign: __webpack_require__("7333") });


/***/ }),

/***/ "f853":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NormalSectionView_vue_vue_type_style_index_0_id_b2b8cdd4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("27fc");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NormalSectionView_vue_vue_type_style_index_0_id_b2b8cdd4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NormalSectionView_vue_vue_type_style_index_0_id_b2b8cdd4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_NormalSectionView_vue_vue_type_style_index_0_id_b2b8cdd4_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "fa5b":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("5537")('native-function-to-string', Function.toString);


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "VueFormBuilderPlugin", function() { return /* reexport */ src_0["f" /* VueFormBuilderPlugin */]; });
__webpack_require__.d(__webpack_exports__, "FormBuilder", function() { return /* reexport */ src_0["c" /* FormBuilder */]; });
__webpack_require__.d(__webpack_exports__, "FormRenderer", function() { return /* reexport */ src_0["d" /* FormRenderer */]; });
__webpack_require__.d(__webpack_exports__, "GlobalSidebar", function() { return /* reexport */ src_0["e" /* GlobalSidebar */]; });
__webpack_require__.d(__webpack_exports__, "BaseControlSkeleton", function() { return /* reexport */ src_0["b" /* BaseControlSkeleton */]; });
__webpack_require__.d(__webpack_exports__, "BaseControlConfigSkeleton", function() { return /* reexport */ src_0["a" /* BaseControlConfigSkeleton */]; });

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./src/index.js
var src_0 = __webpack_require__("b635");

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js




/***/ }),

/***/ "fbdb":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FormRenderer.vue?vue&type=template&id=a8472188&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.styles.CONTAINER.FLUID, 'form-padding', 'vue-form-renderer']},[(_vm.formData.formConfig.renderFormTag)?_c('form',{attrs:{"action":_vm.formData.formConfig.formActionURL,"method":_vm.formData.formConfig.formMethod,"id":_vm.formTagId},on:{"submit":function($event){$event.preventDefault();}}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.formData.formConfig.isShowHeadline),expression:"formData.formConfig.isShowHeadline"}],staticClass:"form-headline-container"},[_c('h1',{domProps:{"textContent":_vm._s(_vm.formData.formConfig.headline)}}),_c('p',{domProps:{"textContent":_vm._s(_vm.formData.formConfig.subHeadline)}})]),_vm._l((_vm.sortedSections),function(sectionData){return _c('SectionContainer',{key:sectionData.uniqueId,attrs:{"section":sectionData,"rows":_vm.formData.rows,"controls":_vm.formData.controls,"value-container":_vm.valueContainer,"validation-errors":_vm.validationErrors}})})],2):[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.formData.formConfig.isShowHeadline),expression:"formData.formConfig.isShowHeadline"}],staticClass:"form-headline-container"},[_c('h1',{domProps:{"textContent":_vm._s(_vm.formData.formConfig.headline)}}),_c('p',{domProps:{"textContent":_vm._s(_vm.formData.formConfig.subHeadline)}})]),_vm._l((_vm.sortedSections),function(sectionData){return _c('SectionContainer',{key:sectionData.uniqueId,attrs:{"section":sectionData,"rows":_vm.formData.rows,"controls":_vm.formData.controls,"value-container":_vm.valueContainer,"validation-errors":_vm.validationErrors}})})]],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/FormRenderer.vue?vue&type=template&id=a8472188&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.function.name.js
var es6_function_name = __webpack_require__("7f7f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom.iterable.js
var web_dom_iterable = __webpack_require__("ac6a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.iterator.js
var es6_array_iterator = __webpack_require__("cadf");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.keys.js
var es6_object_keys = __webpack_require__("456d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.object.assign.js
var es6_object_assign = __webpack_require__("f751");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js
var esm_typeof = __webpack_require__("53ca");

// EXTERNAL MODULE: ./src/configs/controls.js + 92 modules
var configs_controls = __webpack_require__("8dbe");

// CONCATENATED MODULE: ./src/mixins/form-renderer/model.js







/**
 * V-Model of Form-Renderer
 */

var EMIT_EVENT = "change";
var MODEL = {
  props: {
    value: Object
  },
  model: {
    event: EMIT_EVENT,
    props: "value"
  },
  data: function data() {
    return {
      valueContainer: null
    };
  },
  watch: {
    value: {
      deep: true,
      handler: function handler(val) {
        if (Object(esm_typeof["a" /* default */])(val) !== 'object') {
          return;
        } // set value for fields


        Object.assign(this.valueContainer, val);
      }
    },
    valueContainer: {
      deep: true,
      handler: function handler(val) {
        if (!val) return;
        this.$emit(EMIT_EVENT, this.valueContainer);
      }
    }
  },
  methods: {
    /**
     * Create Value Container to Store the Data
     */
    createValueContainer: function createValueContainer() {
      var _this = this;

      var containerObj = {};
      var controlIds = Object.keys(this.formData.controls);
      controlIds.forEach(function (controlId) {
        var controlItem = _this.formData.controls[controlId]; // if disableValue is provided, we don't need to solve more for the control

        if (typeof configs_controls["a" /* CONTROLS */][controlItem.type].disableValue === 'boolean' && configs_controls["a" /* CONTROLS */][controlItem.type].disableValue) {
          return;
        } // get the key-name value


        var name = controlItem.name;

        if (!name) {
          // fall-back to id if no name
          name = controlId;
        } // add new empty field value


        containerObj[name] = ""; // if the control has default factory creation closure, run it

        if (typeof configs_controls["a" /* CONTROLS */][controlItem.type].rendererDefaultData === 'function') {
          containerObj[name] = configs_controls["a" /* CONTROLS */][controlItem.type].rendererDefaultData(controlItem);
        }
      }); // emit to the parent for the value detail

      if (this.value) {
        this.$emit(EMIT_EVENT, containerObj);
      } // set to the real handler


      this.valueContainer = containerObj;
    }
  },
  created: function created() {
    this.createValueContainer();
  }
};

// EXTERNAL MODULE: ./src/configs/global.js
var global = __webpack_require__("b1f2");

// CONCATENATED MODULE: ./src/mixins/form-renderer/configuration.js
/**
 * Form-Renderer Configuration Handler
 */


var deepEqual = __webpack_require__("7fae"); // TO CHECK THE DEEPEST VALUES OF THE FORM...


var CONFIGURATION = {
  props: {
    formConfiguration: {
      type: Object,
      required: true
    }
  },
  watch: {
    /**
     * Watching the configuration, if user change it => need to re-updated the form itself
     */
    formConfiguration: {
      deep: true,
      handler: function handler(val) {
        if (deepEqual(val, this.formData)) {
          return;
        }

        this.mapping(val);
        this.createValueContainer(val);
      }
    }
  },
  created: function created() {
    this.mapping(this.formConfiguration);
  },
  computed: {
    /**
     * Get the <form> id
     * @returns {string}
     */
    formTagId: function formTagId() {
      return global["a" /* GLOBAL_CONFIG */].rendererFormId;
    }
  }
};

// EXTERNAL MODULE: ./src/mixins/style-injection-mixin.js
var style_injection_mixin = __webpack_require__("28fe");

// EXTERNAL MODULE: ./src/mixins/form-builder/form-builder-methods.js + 1 modules
var form_builder_methods = __webpack_require__("bcc7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.symbol.async-iterator.js
var es7_symbol_async_iterator = __webpack_require__("ac4d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.symbol.js
var es6_symbol = __webpack_require__("8a81");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.string.iterator.js
var es6_string_iterator = __webpack_require__("5df3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.array.from.js
var es6_array_from = __webpack_require__("1c4c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.to-string.js
var es6_regexp_to_string = __webpack_require__("6b54");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js + 5 modules
var slicedToArray = __webpack_require__("3835");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es7.object.entries.js
var es7_object_entries = __webpack_require__("ffc1");

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
var classCallCheck = __webpack_require__("d4ec");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
var defineProperty = __webpack_require__("ade3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// EXTERNAL MODULE: ./src/configs/validation.js
var validation = __webpack_require__("a786");

// CONCATENATED MODULE: ./src/libraries/classes/validation-result.class.js






var validation_result_class_ValidationResult = /*#__PURE__*/function () {
  function ValidationResult() {
    Object(classCallCheck["a" /* default */])(this, ValidationResult);

    Object(defineProperty["a" /* default */])(this, "hasError", false);

    Object(defineProperty["a" /* default */])(this, "errorBuckets", {});
  }

  _createClass(ValidationResult, [{
    key: "errors",

    /**
     * Check if the validation is successfully or not
     * @returns {boolean}
     */
    value: function errors() {
      return this.hasError;
    }
    /**
     * Add error and generate error message
     * @param {String} fieldName
     * @param {ValidationRule} validationRule
     */

  }, {
    key: "addError",
    value: function addError(fieldName, validationRule) {
      this.hasError = true;

      if (!this.errorBuckets[fieldName]) {
        this.errorBuckets[fieldName] = [];
      } // generate error message and add it


      var errorMessage = validationRule.errorMessage || validation["a" /* VALIDATION_RULES */][validationRule.ruleType].errorMessage; // if it has replaceable variable => replace it (:mix, :max, :lol)

      var replaceableVar = ":".concat(validationRule.ruleType);

      if (errorMessage.indexOf(replaceableVar) >= 0) {
        errorMessage = errorMessage.replace(replaceableVar, validationRule.additionalValue);
      } // add the error message


      this.errorBuckets[fieldName].push(errorMessage);
    }
  }]);

  return ValidationResult;
}();


// CONCATENATED MODULE: ./src/libraries/validations/required.js
/**
 * Require check for validation
 * @param {any} fieldValue
 * @return {boolean}
 */
function requiredRule(fieldValue) {
  // for checkboxes / multiple dropdown
  if (Array.isArray(fieldValue)) {
    return fieldValue.length > 0;
  } // for text/number/any...


  if (fieldValue === "") {
    return false;
  }

  return true;
}
// CONCATENATED MODULE: ./src/libraries/validations/min.js
/**
 * Check min value for a field
 * - Text => min length
 * - Number => min value
 * - Checkboxes => min selected items
 * @param {any} fieldValue
 * @param {number} constraintValue
 * @return {boolean}
 */
function minRule(fieldValue, constraintValue) {
  var minVal = parseInt(constraintValue); // let's check - first is array

  if (Array.isArray(fieldValue)) {
    return fieldValue.length >= minVal;
  } // second, number
  // second, number


  if (typeof fieldValue === 'number') {
    return fieldValue >= minVal;
  } // lastly, string


  return fieldValue.length >= minVal;
}
// CONCATENATED MODULE: ./src/libraries/validations/max.js
/**
 * Check max value for a field
 * - Text => max length
 * - Number => max value
 * - Checkboxes => max selected items
 * @param {any} fieldValue
 * @param {number} constraintValue
 * @return {boolean}
 */
function maxRule(fieldValue, constraintValue) {
  var minVal = parseInt(constraintValue); // let's check - first is array

  if (Array.isArray(fieldValue)) {
    return fieldValue.length <= minVal;
  } // second, number


  if (typeof fieldValue === 'number') {
    return fieldValue <= minVal;
  } // lastly, string


  return fieldValue.length <= minVal;
}
// CONCATENATED MODULE: ./src/libraries/validations/is-email.js
/**
 * Check if the field is truly email or not
 * @param {any} fieldValue
 * @return {boolean}
 */
function isEmailRule(fieldValue) {
  var REGEX_RULE = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  return REGEX_RULE.test(fieldValue);
}
// CONCATENATED MODULE: ./src/libraries/validations/same-as.js
/**
 * Same-As check (field must be same as another field in the form)
 * @param {any} fieldValue
 * @param {any} fieldToCheck
 * @param {Object} valuesContainer
 * @return {boolean}
 */
function sameAsRule(fieldValue, fieldToCheck, valuesContainer) {
  if (!valuesContainer[fieldToCheck]) {
    return false;
  }

  return fieldValue === valuesContainer[fieldToCheck];
}
// CONCATENATED MODULE: ./src/libraries/validations/custom-closure.js
/**
 * Run custom closure of to check
 * @param {any} fieldValue
 * @param {any} customClosureName
 * @param {Object} valuesContainer
 * @param {Object} customClosures
 * @return {boolean}
 */
function customClosureRule(fieldValue, customClosureName, valuesContainer, customClosures) {
  // since there no closure registered, no need to run and it always true
  if (typeof customClosures[customClosureName] !== 'function') {
    console.error("Custom Validation Closure ".concat(customClosureName, " does not exists. Bypassed"));
    return true;
  }

  var closure = customClosures[customClosureName];
  /**
   * Custom closure can access field value & valuesContainer as well
   */

  var result = closure(fieldValue, valuesContainer); // because it might be null/undefined => falsy will be false

  if (!result) {
    return false;
  }

  return true;
}
// CONCATENATED MODULE: ./src/libraries/validation.js















function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }









var validation_Validation = /*#__PURE__*/function () {
  /**
   * Validation Result. Always create a new instance every time the validation is run
   * @type {ValidationResult}
   */

  /**
   * Create a new Validation handler
   * @param {Object} valueContainer
   * @param {Object} controls
   * @param {Object} definedClosures
   */
  function Validation(valueContainer, controls) {
    var definedClosures = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    Object(classCallCheck["a" /* default */])(this, Validation);

    Object(defineProperty["a" /* default */])(this, "rules", null);

    Object(defineProperty["a" /* default */])(this, "valueContainer", null);

    Object(defineProperty["a" /* default */])(this, "customClosures", {});

    Object(defineProperty["a" /* default */])(this, "validationResult", null);

    this.valueContainer = valueContainer;
    this.validationClosures = definedClosures;
    this.setRules(controls);
  }
  /**
   * Set validation rules from the controls
   * @param {{validations: ValidationRule[]}} controls
   */


  _createClass(Validation, [{
    key: "setRules",
    value: function setRules(controls) {
      var _this = this;

      var rules = {}; // traversal all control and pick the validations info

      Object.entries(controls).forEach(function (controlInfo) {
        var _controlInfo = Object(slicedToArray["a" /* default */])(controlInfo, 2),
            controlId = _controlInfo[0],
            controlItem = _controlInfo[1];

        var controlName = controlItem.name || controlId; // no name => this field didn't have value

        if (!_this.valueContainer.hasOwnProperty(controlName)) {
          return;
        }

        rules[controlName] = controlItem.validations;
      });
      this.rules = rules;
    }
    /**
     * Start a validation check
     * @return {ValidationResult}
     */

  }, {
    key: "run",
    value: function run() {
      this.validationResult = new validation_result_class_ValidationResult();
      var controlKeys = Object.keys(this.rules);

      for (var _i = 0, _controlKeys = controlKeys; _i < _controlKeys.length; _i++) {
        var key = _controlKeys[_i];
        // pickup basic data
        var controlValue = this.valueContainer[key];
        var controlRules = this.rules[key] || []; // no rule no run

        if (!controlRules.length) {
          continue;
        }
        /**
         * start the validation process by each rules added for the control
         */


        var _iterator = _createForOfIteratorHelper(controlRules),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var validationRule = _step.value;

            var status = this._singleRuleRun(validationRule, controlValue);

            if (!status) {
              this.validationResult.addError(key, validationRule);
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return this.validationResult;
    }
    /**
     * Run single rule to check
     * @param {ValidationRule} validationRule
     * @param {any} fieldValue
     * @private
     */

  }, {
    key: "_singleRuleRun",
    value: function _singleRuleRun(validationRule, fieldValue) {
      switch (validationRule.ruleType) {
        case "required":
          return requiredRule(fieldValue);

        case "min":
          return minRule(fieldValue, validationRule.additionalValue);

        case "max":
          return maxRule(fieldValue, validationRule.additionalValue);

        case "isEmail":
          return isEmailRule(fieldValue);

        case "sameAs":
          return sameAsRule(fieldValue, validationRule.additionalValue, this.valueContainer);

        case "customClosure":
          return customClosureRule(fieldValue, validationRule.additionalValue, this.valueContainer, this.customClosures);

        default:
          throw new TypeError("This validation type ".concat(validationRule.ruleType, " is not supported."));
      }
    }
  }]);

  return Validation;
}();


// EXTERNAL MODULE: ./src/configs/events.js
var events = __webpack_require__("fbe6");

// EXTERNAL MODULE: ./src/libraries/alert-dialog.js
var alert_dialog = __webpack_require__("caca");

// CONCATENATED MODULE: ./src/mixins/form-renderer/validation.js



var VALIDATION_MIXIN = {
  data: function data() {
    return {
      validationErrors: {}
    };
  },
  methods: {
    /**
     * Run the validation process
     */
    runValidation: function runValidation() {
      // always clear validation before run...
      this.$set(this, 'validationErrors', {}); // run the validation

      var result = this.$form.Validation.run(); // field-error handling

      if (result.errors()) {
        // use set for reactive...
        this.$set(this, 'validationErrors', result.errorBuckets);

        if (this.$form.validationErrorShowAlert) {
          alert_dialog["a" /* ALERT_DIALOG */].show(this.$form.validationErrorAlertText);
        }

        return;
      } // ok emit to all listener if they want to know the validation is ok or not


      this.$formEvent.$emit(events["a" /* EVENT_CONSTANTS */].RENDERER.VALIDATION_OK, true);
    }
  },

  /**
   * Dependencies Injection into the Form-Renderer.
   */
  created: function created() {
    // create validation instance
    this.$form.Validation = new validation_Validation(this.valueContainer, this.formData.controls, this.$form.validationClosures || {}); // listen to validation invoke

    this.$formEvent.$on(events["a" /* EVENT_CONSTANTS */].RENDERER.RUN_VALIDATION, this.runValidation);
  }
};

// CONCATENATED MODULE: ./src/mixins/form-renderer-mixins.js





/* harmony default export */ var form_renderer_mixins = ([CONFIGURATION, MODEL, style_injection_mixin["a" /* STYLE_INJECTION_MIXIN */], form_builder_methods["a" /* FORM_BUILDER_METHODS */], VALIDATION_MIXIN]);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"7fa53cf0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/renderer/SectionContainer.vue?vue&type=template&id=26b5e728&scoped=true&
var SectionContainervue_type_template_id_26b5e728_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"section-container"},[_c(_vm.sectionViewComponent,{key:_vm.section.uniqueId,tag:"component",attrs:{"section":_vm.section,"rows":_vm.rows,"controls":_vm.controls,"value-container":_vm.valueContainer,"validation-errors":_vm.validationErrors}})],1)}
var SectionContainervue_type_template_id_26b5e728_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/views/renderer/SectionContainer.vue?vue&type=template&id=26b5e728&scoped=true&

// EXTERNAL MODULE: ./src/configs/section.js + 83 modules
var section = __webpack_require__("dd3c");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/renderer/SectionContainer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var SectionContainervue_type_script_lang_js_ = ({
  name: "SectionContainer",
  props: {
    section: Object,
    rows: Object,
    controls: Object,
    valueContainer: Object,
    validationErrors: Object
  },
  computed: {
    sectionViewComponent: function sectionViewComponent() {
      return section["b" /* SECTION_TYPES */][this.section.type].rendererView;
    }
  }
});
// CONCATENATED MODULE: ./src/views/renderer/SectionContainer.vue?vue&type=script&lang=js&
 /* harmony default export */ var renderer_SectionContainervue_type_script_lang_js_ = (SectionContainervue_type_script_lang_js_); 
// EXTERNAL MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
var componentNormalizer = __webpack_require__("2877");

// CONCATENATED MODULE: ./src/views/renderer/SectionContainer.vue





/* normalize component */

var component = Object(componentNormalizer["a" /* default */])(
  renderer_SectionContainervue_type_script_lang_js_,
  SectionContainervue_type_template_id_26b5e728_scoped_true_render,
  SectionContainervue_type_template_id_26b5e728_scoped_true_staticRenderFns,
  false,
  null,
  "26b5e728",
  null
  
)

/* harmony default export */ var SectionContainer = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/FormRenderer.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ var FormRenderervue_type_script_lang_js_ = ({
  name: "FormRenderer",
  components: {
    SectionContainer: SectionContainer
  },
  mixins: form_renderer_mixins,
  data: function data() {
    return {
      formData: null
    };
  }
});
// CONCATENATED MODULE: ./src/components/FormRenderer.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_FormRenderervue_type_script_lang_js_ = (FormRenderervue_type_script_lang_js_); 
// CONCATENATED MODULE: ./src/components/FormRenderer.vue





/* normalize component */

var FormRenderer_component = Object(componentNormalizer["a" /* default */])(
  components_FormRenderervue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "a8472188",
  null
  
)

/* harmony default export */ var FormRenderer = __webpack_exports__["a"] = (FormRenderer_component.exports);

/***/ }),

/***/ "fbe6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EVENT_CONSTANTS; });
/**
 * Event-Communication Constants in Vue-Form-Builder
 * @author Phat Tran <phattranminh96@gmai.com>
 */
var EVENT_CONSTANTS = {
  /**
   * Constants for Form-Builder
   */
  BUILDER: {
    SECTION: {
      ADDED_ROW: "builder.section.added_row",
      DELETE: "builder.section.delete",
      UPDATE: "builder.section.update",
      // section sort
      PUSH: "builder.section.push"
    },
    ROW: {
      CREATE: "builder.row.create",
      UPDATE: "builder.row.update",
      DELETE: "builder.row.delete"
    },
    CONTROL: {
      CREATE: "builder.control.create",
      UPDATE: "builder.control.update",
      DELETE: "builder.control.delete",
      DELETED: "builder.control.deleted",
      SORT: "builder.control.delete"
    },

    /**
     * GLOBAL SIDEBAR EVENTS
     */
    SIDEBAR: {
      INJECT: "builder.sidebar.inject",
      OPEN: "builder.sidebar.open",
      OPENED: "builder.sidebar.opened",
      SAVE: "builder.sidebar.save",
      SAVE_AND_CLOSE: "builder.sidebar.save_and_close",
      AFTER_CLOSED: "builder.sidebar.after_closed"
    }
  },

  /**
   * Constants for Form-Renderer
   */
  RENDERER: {
    RUN_VALIDATION: "renderer.run_validation",
    VALIDATION_OK: "renderer.validation_ok"
  }
};


/***/ }),

/***/ "fd13":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var $Map = typeof Map === 'function' && Map.prototype ? Map : null;
var $Set = typeof Set === 'function' && Set.prototype ? Set : null;

var exported;

if (!$Map) {
	// eslint-disable-next-line no-unused-vars
	exported = function isMap(x) {
		// `Map` is not present in this environment.
		return false;
	};
}

var $mapHas = $Map ? Map.prototype.has : null;
var $setHas = $Set ? Set.prototype.has : null;
if (!exported && !$mapHas) {
	// eslint-disable-next-line no-unused-vars
	exported = function isMap(x) {
		// `Map` does not have a `has` method
		return false;
	};
}

module.exports = exported || function isMap(x) {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$mapHas.call(x);
		if ($setHas) {
			try {
				$setHas.call(x);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $Map; // core-js workaround, pre-v2.5.0
	} catch (e) {}
	return false;
};


/***/ }),

/***/ "fec5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var toStr = Object.prototype.toString;
var hasSymbols = __webpack_require__("5156")();

if (hasSymbols) {
	var symToStr = Symbol.prototype.toString;
	var symStringRegex = /^Symbol\(.*\)$/;
	var isSymbolObject = function isRealSymbolObject(value) {
		if (typeof value.valueOf() !== 'symbol') {
			return false;
		}
		return symStringRegex.test(symToStr.call(value));
	};

	module.exports = function isSymbol(value) {
		if (typeof value === 'symbol') {
			return true;
		}
		if (toStr.call(value) !== '[object Symbol]') {
			return false;
		}
		try {
			return isSymbolObject(value);
		} catch (e) {
			return false;
		}
	};
} else {

	module.exports = function isSymbol(value) {
		// this environment does not support Symbols.
		return  false && false;
	};
}


/***/ }),

/***/ "ffc1":
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__("5ca1");
var $entries = __webpack_require__("504c")(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});


/***/ })

/******/ });
});