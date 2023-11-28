(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!*********************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var objectKeys = ['qy', 'env', 'error', 'version', 'lanDebug', 'cloud', 'serviceMarket', 'router', 'worklet', '__webpack_require_UNI_MP_PLUGIN__'];
var singlePageDisableKey = ['lanDebug', 'router', 'worklet'];
var target = typeof globalThis !== 'undefined' ? globalThis : function () {
  return this;
}();
var key = ['w', 'x'].join('');
var oldWx = target[key];
var launchOption = oldWx.getLaunchOptionsSync ? oldWx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof oldWx[key] === 'function';
}
function initWx() {
  var newWx = {};
  for (var _key in oldWx) {
    if (isWxKey(_key)) {
      // TODO wrapper function
      newWx[_key] = oldWx[_key];
    }
  }
  return newWx;
}
target[key] = initWx();
var _default = target[key];
exports.default = _default;

/***/ }),
/* 2 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createApp = createApp;
exports.createComponent = createComponent;
exports.createPage = createPage;
exports.createPlugin = createPlugin;
exports.createSubpackageApp = createSubpackageApp;
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _construct2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/construct */ 15));
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 22);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var realAtob;
var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;
    var result = '';
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}
function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {
    var _getCurrentUserInfo = getCurrentUserInfo(),
      role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {
    var _getCurrentUserInfo2 = getCurrentUserInfo(),
      permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {
    var _getCurrentUserInfo3 = getCurrentUserInfo(),
      tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}
var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;
function isFn(fn) {
  return typeof fn === 'function';
}
function isStr(str) {
  return typeof str === 'string';
}
function isObject(obj) {
  return obj !== null && (0, _typeof2.default)(obj) === 'object';
}
function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
function noop() {}

/**
 * Create a cached version of a pure function.
 */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
});
function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
var HOOKS = ['invoke', 'success', 'fail', 'complete', 'returnValue'];
var globalInterceptors = {};
var scopedInterceptors = {};
function mergeHook(parentVal, childVal) {
  var res = childVal ? parentVal ? parentVal.concat(childVal) : Array.isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}
function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}
function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}
function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}
function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}
function wrapperHook(hook, params) {
  return function (data) {
    return hook(data, params) || data;
  };
}
function isPromise(obj) {
  return !!obj && ((0, _typeof2.default)(obj) === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}
function queue(hooks, data, params) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      var res = hook(data, params);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {}
        };
      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    }
  };
}
function wrapperOptions(interceptor) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res, options).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, (0, _toConsumableArray2.default)(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options) {
  for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    params[_key - 3] = arguments[_key];
  }
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        // 重新访问 getApiInterceptorHooks, 允许 invoke 中再次调用 addInterceptor,removeInterceptor
        return api.apply(void 0, [wrapperOptions(getApiInterceptorHooks(method), options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}
var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  }
};
var SYNC_API_RE = /^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting|initUTS|requireUTS|registerUTS/;
var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];
var CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}
function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).catch(function (err) {
    return [err];
  });
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(function (value) {
      return promise.resolve(callback()).then(function () {
        return value;
      });
    }, function (reason) {
      return promise.resolve(callback()).then(function () {
        throw reason;
      });
    });
  };
}
function promisify(name, api) {
  if (!shouldPromise(name) || !isFn(api)) {
    return api;
  }
  return function promiseApi() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      params[_key2 - 1] = arguments[_key2];
    }
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject
      })].concat(params));
    })));
  };
}
var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;
function checkDeviceWidth() {
  var _wx$getSystemInfoSync = wx.getSystemInfoSync(),
    platform = _wx$getSystemInfoSync.platform,
    pixelRatio = _wx$getSystemInfoSync.pixelRatio,
    windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}
function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}
var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';
var messages = {};
var locale;
{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}
initI18nMessages();
var i18n = (0, _uniI18n.initVueI18n)(locale, {});
var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {
    var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    }
  }
};
var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;
function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale()
  });
  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {
        return watch(v);
      });
    }
  });
}
function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  if (isFn(getApp)) {
    var app = getApp({
      allowDefault: true
    });
    if (app && app.$vm) {
      return app.$vm.$locale;
    }
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}
function setLocale$1(locale) {
  var app = isFn(getApp) ? getApp() : false;
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {
      return fn({
        locale: locale
      });
    });
    return true;
  }
  return false;
}
var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}
if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}
var interceptors = {
  promiseInterceptor: promiseInterceptor
};
var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors
});
function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}
var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  }
};
var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(function (item, index) {
        return index < currentIndex ? item !== urls[currentIndex] : true;
      });
    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId
    });
  }
  result.deviceId = deviceId;
}
function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(result) {
  var _result$brand = result.brand,
    brand = _result$brand === void 0 ? '' : _result$brand,
    _result$model = result.model,
    model = _result$model === void 0 ? '' : _result$model,
    _result$system = result.system,
    system = _result$system === void 0 ? '' : _result$system,
    _result$language = result.language,
    language = _result$language === void 0 ? '' : _result$language,
    theme = result.theme,
    version = result.version,
    platform = result.platform,
    fontSizeSetting = result.fontSizeSetting,
    SDKVersion = result.SDKVersion,
    pixelRatio = result.pixelRatio,
    deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  var extraParam = {};

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "",
    appName: "Camelcon_Transportation",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.98",
    uniRuntimeVersion: "3.98",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined
  };
  Object.assign(result, parameters, extraParam);
}
function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc'
    };
    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale$1 ? getLocale$1() : defaultLanguage;
}
function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }
  return _hostName;
}
var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  }
};
var showActionSheet = {
  args: function args(fromArgs) {
    if ((0, _typeof2.default)(fromArgs) === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  }
};
var getAppBaseInfo = {
  returnValue: function returnValue(result) {
    var _result = result,
      version = _result.version,
      language = _result.language,
      SDKVersion = _result.SDKVersion,
      theme = _result.theme;
    var _hostName = getHostName(result);
    var hostLanguage = language.replace('_', '-');
    result = sortObject(Object.assign(result, {
      appId: "",
      appName: "Camelcon_Transportation",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme
    }));
  }
};
var getDeviceInfo = {
  returnValue: function returnValue(result) {
    var _result2 = result,
      brand = _result2.brand,
      model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);
    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model
    }));
  }
};
var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);
    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {
    var locationReducedAccuracy = result.locationReducedAccuracy;
    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  }
};

// import navigateTo from 'uni-helpers/navigate-to'

var compressImage = {
  args: function args(fromArgs) {
    // https://developers.weixin.qq.com/community/develop/doc/000c08940c865011298e0a43256800?highLine=compressHeight
    if (fromArgs.compressedHeight && !fromArgs.compressHeight) {
      fromArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !fromArgs.compressWidth) {
      fromArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting,
  compressImage: compressImage
};
var todos = ['vibrate', 'preloadPage', 'unPreloadPage', 'loadSubPackage'];
var canIUses = [];
var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];
function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}
function processArgs(methodName, fromArgs) {
  var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {
    // 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {
          // 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {
          // 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {
          // {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}
function processReturnValue(methodName, res, returnValue) {
  var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {
    // 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}
function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {
      // 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {
      // 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        // 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}
var todoApis = Object.create(null);
var TODOS = ['onTabBarMidButtonTap', 'subscribePush', 'unsubscribePush', 'onPush', 'offPush', 'share'];
function createTodoApi(name) {
  return function todoApi(_ref) {
    var fail = _ref.fail,
      complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported")
    };
    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}
TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});
var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin']
};
function getProvider(_ref2) {
  var service = _ref2.service,
    success = _ref2.success,
    fail = _ref2.fail,
    complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service]
    };
    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found'
    };
    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}
var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider
});
var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();
function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}
function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}
var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit
});

/**
 * 框架内 try-catch
 */
/**
 * 开发者 try-catch
 */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}
function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}
var cid;
var cidErrMsg;
var enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}
function invokePushCallback(args) {
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message)
    };
    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message)
      });
    });
  }
}
var getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }
  var _getApiCallbacks = getApiCallbacks(args),
    success = _getApiCallbacks.success,
    fail = _getApiCallbacks.fail,
    complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'uniPush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid
        };
        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '')
        };
        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}
var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};
var baseInfo = wx.getAppBaseInfo && wx.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx.getSystemInfoSync();
}
var host = baseInfo ? baseInfo.host : null;
var shareVideoMessage = host && host.env === 'SAAASDK' ? wx.miniapp.shareVideoMessage : wx.shareVideoMessage;
var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  shareVideoMessage: shareVideoMessage,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback
});
var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];
function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
function initBehavior(options) {
  return Behavior(options);
}
function isPage() {
  return !!this.route;
}
function initRelation(detail) {
  this.triggerEvent('__l', detail);
}
function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector) || [];
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || toSkip(component);
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}
function syncRefs(refs, newRefs) {
  var oldKeys = (0, _construct2.default)(Set, (0, _toConsumableArray2.default)(Object.keys(refs)));
  var newKeys = Object.keys(newRefs);
  newKeys.forEach(function (key) {
    var oldValue = refs[key];
    var newValue = newRefs[key];
    if (Array.isArray(oldValue) && Array.isArray(newValue) && oldValue.length === newValue.length && newValue.every(function (value) {
      return oldValue.includes(value);
    })) {
      return;
    }
    refs[key] = newValue;
    oldKeys.delete(key);
  });
  oldKeys.forEach(function (key) {
    delete refs[key];
  });
  return refs;
}
function initRefs(vm) {
  var mpInstance = vm.$scope;
  var refs = {};
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for') || [];
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || toSkip(component));
      });
      return syncRefs(refs, $refs);
    }
  });
}
function handleLink(event) {
  var _ref3 = event.detail || event.value,
    vuePid = _ref3.vuePid,
    vueOptions = _ref3.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  vueOptions.parent = parentVm;
}
function markMPComponent(component) {
  // 在 Vue 中标记为小程序组件
  var IS_MP = '__v_isMPComponent';
  Object.defineProperty(component, IS_MP, {
    configurable: true,
    enumerable: false,
    value: true
  });
  return component;
}
function toSkip(obj) {
  var OB = '__ob__';
  var SKIP = '__v_skip';
  if (isObject(obj) && Object.isExtensible(obj)) {
    // 避免被 @vue/composition-api 观测
    Object.defineProperty(obj, OB, {
      configurable: true,
      enumerable: false,
      value: (0, _defineProperty2.default)({}, SKIP, true)
    });
  }
  return obj;
}
var WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach(function (name) {
      var matches = name.match(WORKLET_RE);
      if (matches) {
        var workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
var MPPage = Page;
var MPComponent = Component;
var customizeRE = /:/g;
var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});
function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {
    for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      args[_key3 - 1] = arguments[_key3];
    }
    // 事件名统一转驼峰格式，仅处理：当前组件为 vue 组件、当前组件为 vue 组件子组件
    if (this.$vm || this.dataset && this.dataset.comType) {
      event = customize(event);
    } else {
      // 针对微信/QQ小程序单独补充驼峰格式事件，以兼容历史项目
      var newEvent = customize(event);
      if (newEvent !== event) {
        oldTriggerEvent.apply(this, [newEvent].concat(args));
      }
    }
    return oldTriggerEvent.apply(this, [event].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initHook(name, options, isComponent) {
  var oldHook = options[name];
  options[name] = function () {
    markMPComponent(this);
    initTriggerEvent(this);
    if (oldHook) {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return oldHook.apply(this, args);
    }
  };
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;
  Component = function Component() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}
var PAGE_EVENT_HOOKS = ['onPullDownRefresh', 'onReachBottom', 'onAddToFavorites', 'onShareTimeline', 'onShareAppMessage', 'onPageScroll', 'onResize', 'onTabItemTap'];
function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}
function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }
  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }
  vueOptions = vueOptions.default || vueOptions;
  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super && vueOptions.super.options && Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }
  if (isFn(vueOptions[hook]) || Array.isArray(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {
      return hasHook(hook, mixin);
    });
  }
}
function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}
function initUnknownHooks(mpOptions, vueOptions) {
  var excludes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  findHooks(vueOptions).forEach(function (hook) {
    return initHook$1(mpOptions, hook, excludes);
  });
}
function findHooks(vueOptions) {
  var hooks = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  if (vueOptions) {
    Object.keys(vueOptions).forEach(function (name) {
      if (name.indexOf('on') === 0 && isFn(vueOptions[name])) {
        hooks.push(name);
      }
    });
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function (args) {
      return this.$vm && this.$vm.__call_hook(hook, args);
    };
  }
}
function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}
function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}
function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;
  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}
function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};
  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"Camelcon_Transportation","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }
  if (!isPlainObject(data)) {
    data = {};
  }
  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });
  return data;
}
var PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;
  var vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: ''
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ''
          };
        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(initBehavior({
      properties: initProperties(vueExtends.props, true)
    }));
  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(initBehavior({
          properties: initProperties(vueMixin.props, true)
        }));
      }
    });
  }
  return behaviors;
}
function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function initProperties(props) {
  var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: ''
    };
    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: ''
        };
        properties.virtualHostClass = {
          type: null,
          value: ''
        };
      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: ''
    };
    properties.vueSlots = {
      // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots
        });
      }
    };
  }
  if (Array.isArray(props)) {
    // ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key)
      };
    });
  } else if (isPlainObject(props)) {
    // {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {
        // title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }
        opts.type = parsePropType(key, opts.type);
        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key)
        };
      } else {
        // content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key)
        };
      }
    });
  }
  return properties;
}
function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}
  event.stopPropagation = noop;
  event.preventDefault = noop;
  event.target = event.target || {};
  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }
  if (hasOwn(event, 'markerId')) {
    event.detail = (0, _typeof2.default)(event.detail) === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }
  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }
  return event;
}
function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {
      // ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];
      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }
      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }
      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}
function processEventExtra(vm, extra, event, __args__) {
  var extraObj = {};
  if (Array.isArray(extra) && extra.length) {
    /**
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *[
     *    ['data.items', 'data.id', item.data.id],
     *    ['metas', 'id', meta.id]
     *],
     *'test'
     */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {
          // model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {
            // $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            extraObj['$' + index] = event.detail ? event.detail.__args__ || __args__ : __args__;
          } else if (dataPath.indexOf('$event.') === 0) {
            // $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }
  return extraObj;
}
function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}
function processEventArgs(vm, event) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
  var isCustom = arguments.length > 4 ? arguments[4] : undefined;
  var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象

  // fixed 用户直接触发 mpInstance.triggerEvent
  var __args__ = isPlainObject(event.detail) ? event.detail.__args__ || [event.detail] : [event.detail];
  if (isCustom) {
    // 自定义事件
    isCustomMPEvent = event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {
      // 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return __args__;
    }
  }
  var extraObj = processEventExtra(vm, extra, event, __args__);
  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {
        // input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(__args__[0]);
        } else {
          // wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });
  return ret;
}
var ONCE = '~';
var CUSTOM = '^';
function isMatchEventType(eventType, optType) {
  return eventType === optType || optType === 'regionchange' && (eventType === 'begin' || eventType === 'end');
}
function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}
function handleEvent(event) {
  var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;
  var ret = [];
  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];
    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;
    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {
            // mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx, processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName));
            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(_this2.$vm, event, eventArray[1], eventArray[2], isCustom, methodName);
          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });
  if (eventType === 'input' && ret.length === 1 && typeof ret[0] !== 'undefined') {
    return ret[0];
  }
}
var eventChannels = {};
function getEventChannel(id) {
  var eventChannel = eventChannels[id];
  delete eventChannels[id];
  return eventChannel;
}
var hooks = ['onShow', 'onHide', 'onError', 'onPageNotFound', 'onThemeChange', 'onUnhandledRejection'];
function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}
function initScopedSlotsParams() {
  var center = {};
  var parents = {};
  function currentId(fn) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      fn(vueId);
    }
  }
  _vue.default.prototype.$hasSSP = function (vueId) {
    var slot = center[vueId];
    if (!slot) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return slot;
  };
  _vue.default.prototype.$getSSP = function (vueId, name, needAll) {
    var slot = center[vueId];
    if (slot) {
      var params = slot[name] || [];
      if (needAll) {
        return params;
      }
      return params[0];
    }
  };
  _vue.default.prototype.$setSSP = function (name, value) {
    var index = 0;
    currentId.call(this, function (vueId) {
      var slot = center[vueId];
      var params = slot[name] = slot[name] || [];
      params.push(value);
      index = params.length - 1;
    });
    return index;
  };
  _vue.default.prototype.$initSSP = function () {
    currentId.call(this, function (vueId) {
      center[vueId] = {};
    });
  };
  _vue.default.prototype.$callSSP = function () {
    currentId.call(this, function (vueId) {
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    });
  };
  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    }
  });
}
function parseBaseApp(vm, _ref4) {
  var mocks = _ref4.mocks,
    initRefs = _ref4.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);
  _vue.default.prototype.mpHost = "mp-weixin";
  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }
      this.mpType = this.$options.mpType;
      this.$mp = (0, _defineProperty2.default)({
        data: {}
      }, this.mpType, this.$options.mpInstance);
      this.$scope = this.$options.mpInstance;
      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {
        // hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    }
  });
  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {
        // 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {
          // 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }
      this.$vm = vm;
      this.$vm.$mp = {
        app: this
      };
      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;
      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);
      this.$vm.__call_hook('onLaunch', args);
    }
  };

  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }
  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  initHooks(appOptions, hooks);
  initUnknownHooks(appOptions, vm.$options);
  return appOptions;
}
function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs
  });
}
function createApp(vm) {
  App(parseApp(vm));
  return vm;
}
var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {
  return '%' + c.charCodeAt(0).toString(16);
};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {
  return encodeURIComponent(str).replace(encodeReserveRE, encodeReserveReplacer).replace(commaRE, ',');
};
function stringifyQuery(obj) {
  var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];
    if (val === undefined) {
      return '';
    }
    if (val === null) {
      return encodeStr(key);
    }
    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }
    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {
    return x.length > 0;
  }).join('&') : null;
  return res ? "?".concat(res) : '';
}
function parseBaseComponent(vueComponentOptions) {
  var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    isPage = _ref5.isPage,
    initRelation = _ref5.initRelation;
  var needVueOptions = arguments.length > 2 ? arguments[2] : undefined;
  var _initVueComponent = initVueComponent(_vue.default, vueComponentOptions),
    _initVueComponent2 = (0, _slicedToArray2.default)(_initVueComponent, 2),
    VueComponent = _initVueComponent2[0],
    vueOptions = _initVueComponent2[1];
  var options = _objectSpread({
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true
  }, vueOptions.options || {});
  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }
  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;
        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties
        };
        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options
        });

        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      }
    },
    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      }
    },
    methods: {
      __l: handleLink,
      __e: handleEvent
    }
  };
  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }
  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }
  if (needVueOptions) {
    return [componentOptions, vueOptions, VueComponent];
  }
  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}
function parseComponent(vueComponentOptions, needVueOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation
  }, needVueOptions);
}
var hooks$1 = ['onShow', 'onHide', 'onUnload'];
hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);
function parseBasePage(vuePageOptions) {
  var _parseComponent = parseComponent(vuePageOptions, true),
    _parseComponent2 = (0, _slicedToArray2.default)(_parseComponent, 2),
    pageOptions = _parseComponent2[0],
    vueOptions = _parseComponent2[1];
  initHooks(pageOptions.methods, hooks$1, vueOptions);
  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery)
    };
    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };
  {
    initUnknownHooks(pageOptions.methods, vuePageOptions, ['onReady']);
  }
  {
    initWorkletMethods(pageOptions.methods, vueOptions.methods);
  }
  return pageOptions;
}
function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions);
}
function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}
function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}
function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true
  });
  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {
      for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
        args[_key7] = arguments[_key7];
      }
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {
      for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
        args[_key8] = arguments[_key8];
      }
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}
todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});
canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name : canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});
var uni = {};
if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    }
  });
} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });
  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, extraApi[name]);
    });
  }
  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });
  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });
  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}
wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;
var uni$1 = uni;
var _default = uni$1;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 3 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
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
/* 4 */
/*!**********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
module.exports = _interopRequireDefault, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 5 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/slicedToArray.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArrayLimit = __webpack_require__(/*! ./iterableToArrayLimit.js */ 7);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || unsupportedIterableToArray(arr, i) || nonIterableRest();
}
module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 6 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithHoles.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 7 */
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArrayLimit.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) {
        ;
      }
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 8 */
/*!***************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/unsupportedIterableToArray.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
}
module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 9 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayLikeToArray.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 10 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableRest.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 11 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/defineProperty.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperty(obj, key, value) {
  key = toPropertyKey(key);
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
module.exports = _defineProperty, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 12 */
/*!**************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPropertyKey.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
var toPrimitive = __webpack_require__(/*! ./toPrimitive.js */ 14);
function _toPropertyKey(arg) {
  var key = toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
module.exports = _toPropertyKey, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 13 */
/*!*******************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/typeof.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _typeof(obj) {
  "@babel/helpers - typeof";

  return (module.exports = _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports), _typeof(obj);
}
module.exports = _typeof, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 14 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toPrimitive.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
module.exports = _toPrimitive, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 15 */
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/construct.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__(/*! ./setPrototypeOf.js */ 16);
var isNativeReflectConstruct = __webpack_require__(/*! ./isNativeReflectConstruct.js */ 17);
function _construct(Parent, args, Class) {
  if (isNativeReflectConstruct()) {
    module.exports = _construct = Reflect.construct.bind(), module.exports.__esModule = true, module.exports["default"] = module.exports;
  } else {
    module.exports = _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) setPrototypeOf(instance, Class.prototype);
      return instance;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
  return _construct.apply(null, arguments);
}
module.exports = _construct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 16 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/setPrototypeOf.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  return _setPrototypeOf(o, p);
}
module.exports = _setPrototypeOf, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 17 */
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/isNativeReflectConstruct.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
module.exports = _isNativeReflectConstruct, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 18 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toConsumableArray.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithoutHoles = __webpack_require__(/*! ./arrayWithoutHoles.js */ 19);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableSpread = __webpack_require__(/*! ./nonIterableSpread.js */ 21);
function _toConsumableArray(arr) {
  return arrayWithoutHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableSpread();
}
module.exports = _toConsumableArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 19 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/arrayWithoutHoles.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeToArray = __webpack_require__(/*! ./arrayLikeToArray.js */ 9);
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return arrayLikeToArray(arr);
}
module.exports = _arrayWithoutHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 20 */
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/iterableToArray.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}
module.exports = _iterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 21 */
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/nonIterableSpread.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
module.exports = _nonIterableSpread, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 22 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;
exports.compileI18nJsonStr = compileI18nJsonStr;
exports.hasI18nJson = hasI18nJson;
exports.initVueI18n = initVueI18n;
exports.isI18nStr = isI18nStr;
exports.isString = void 0;
exports.normalizeLocale = normalizeLocale;
exports.parseI18nJson = parseI18nJson;
exports.resolveLocale = resolveLocale;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var isObject = function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
};
var defaultDelimiters = ['{', '}'];
var BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {
    (0, _classCallCheck2.default)(this, BaseFormatter);
    this._caches = Object.create(null);
  }
  (0, _createClass2.default)(BaseFormatter, [{
    key: "interpolate",
    value: function interpolate(message, values) {
      var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    }
  }]);
  return BaseFormatter;
}();
exports.Formatter = BaseFormatter;
var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {
  var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
    startDelimiter = _ref2[0],
    endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({
          type: 'text',
          value: text
        });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ? 'list' : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? 'named' : 'unknown';
      tokens.push({
        value: sub,
        type: type
      });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
      text += char;
    }
  }
  text && tokens.push({
    type: 'text',
    value: text
  });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = Array.isArray(values) ? 'list' : isObject(values) ? 'named' : 'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;
    }
    index++;
  }
  return compiled;
}
var LOCALE_ZH_HANS = 'zh-Hans';
exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';
exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';
exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';
exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';
exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {
  return hasOwnProperty.call(val, key);
};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {
    return str.indexOf(part) !== -1;
  });
}
function startsWith(str, parts) {
  return parts.find(function (part) {
    return str.indexOf(part) === 0;
  });
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  var lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
var I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {
    var locale = _ref3.locale,
      fallbackLocale = _ref3.fallbackLocale,
      messages = _ref3.messages,
      watcher = _ref3.watcher,
      formater = _ref3.formater;
    (0, _classCallCheck2.default)(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  (0, _createClass2.default)(I18n, [{
    key: "setLocale",
    value: function setLocale(locale) {
      var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    }
  }, {
    key: "getLocale",
    value: function getLocale() {
      return this.locale;
    }
  }, {
    key: "watchLocale",
    value: function watchLocale(fn) {
      var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    }
  }, {
    key: "add",
    value: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else {
        this.messages[locale] = message;
      }
    }
  }, {
    key: "f",
    value: function f(message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    }
  }, {
    key: "t",
    value: function t(key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    }
  }]);
  return I18n;
}();
exports.I18n = I18n;
function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(function () {
      return appVm.$locale;
    }, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {
  var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;
  var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {
    var _ref4 = [messages, locale];
    locale = _ref4[0];
    messages = _ref4[1];
  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale = typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher
  });
  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {
      var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
var isString = function isString(val) {
  return typeof val === 'string';
};
exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {
  var locale = _ref5.locale,
    locales = _ref5.locales,
    delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name]
      });
    }
  });
  localeValues.unshift({
    locale: locale,
    values: locales[locale]
  });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  } catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (Array.isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}
function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {
      return locales.indexOf(locale) > -1;
    });
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 23 */
/*!***************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/classCallCheck.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports = _classCallCheck, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 24 */
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/createClass.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var toPropertyKey = __webpack_require__(/*! ./toPropertyKey.js */ 12);
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}
module.exports = _createClass, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 25 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2023 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue &&
    !value.__v_isMPComponent
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
var NULLTYPE = '[object Null]';
var UNDEFINEDTYPE = '[object Undefined]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function nullOrUndefined(currentType, preType) {
    if(
        (currentType === NULLTYPE || currentType === UNDEFINEDTYPE) && 
        (preType === NULLTYPE || preType === UNDEFINEDTYPE)
    ) {
        return false
    }
    return true
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key] && nullOrUndefined(currentType, preType)) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"Camelcon_Transportation","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"Camelcon_Transportation","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"Camelcon_Transportation","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function clearInstance(key, value) {
  // 简易去除 Vue 和小程序组件实例
  if (value) {
    if (value._isVue || value.__v_isMPComponent) {
      return {}
    }
  }
  return value
}

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret, clearInstance))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_DARK_MODE":"false","VUE_APP_NAME":"Camelcon_Transportation","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      var triggerEvent = this.$scope['_triggerEvent'] || this.$scope['triggerEvent'];
      if (triggerEvent) {
        try {
          triggerEvent.call(this.$scope, event, {
            __args__: toArray(arguments, 1)
          });
        } catch (error) {

        }
      }
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    'onUploadDouyinVideo',
    'onNFCReadMessage',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 26 */
/*!**********************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/pages.json ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
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
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    if(typeof renderjs.beforeCreate === 'function'){
			renderjs.beforeCreate = [renderjs.beforeCreate]
		}
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

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
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
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
/* 33 */
/*!**************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/store/index.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _vuex = _interopRequireDefault(__webpack_require__(/*! vuex */ 34));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
_vue.default.use(_vuex.default);
// 工程化导入store
var modulesFiles = __webpack_require__(35);
var modules = modulesFiles.keys().reduce(function (modules, modulePath) {
  var moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1");
  var module = modulesFiles(modulePath);
  modules[moduleName] = module.default;
  return modules;
}, {});
var store = new _vuex.default.Store({
  modules: _objectSpread({}, modules)
});
var _default = store;
exports.default = _default;

/***/ }),
/* 34 */
/*!**************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vuex3/dist/vuex.common.js ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * vuex v3.6.2
 * (c) 2021 Evan You
 * @license MIT
 */


function applyMixin (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
}

var target = typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
    ? global
    : {};
var devtoolHook = target.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  }, { prepend: true });

  store.subscribeAction(function (action, state) {
    devtoolHook.emit('vuex:action', action, state);
  }, { prepend: true });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
function find (list, f) {
  return list.filter(f)[0]
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
function deepCopy (obj, cache) {
  if ( cache === void 0 ) cache = [];

  // just return if obj is immutable value
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  // if obj is hit, it is in circular structure
  var hit = find(cache, function (c) { return c.original === obj; });
  if (hit) {
    return hit.copy
  }

  var copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy: copy
  });

  Object.keys(obj).forEach(function (key) {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy
}

/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

function partial (fn, arg) {
  return function () {
    return fn(arg)
  }
}

// Base data struct for store's module, package with some attribute and method
var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  // Store some children item
  this._children = Object.create(null);
  // Store the origin module object which passed by programmer
  this._rawModule = rawModule;
  var rawState = rawModule.state;

  // Store the origin module's state
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors = { namespaced: { configurable: true } };

prototypeAccessors.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.hasChild = function hasChild (key) {
  return key in this._children
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if ((true)) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);

  if (!child) {
    if ((true)) {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is " +
        "not registered"
      );
    }
    return
  }

  if (!child.runtime) {
    return
  }

  parent.removeChild(key);
};

ModuleCollection.prototype.isRegistered = function isRegistered (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];

  if (parent) {
    return parent.hasChild(key)
  }

  return false
};

function update (path, targetModule, newModule) {
  if ((true)) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if ((true)) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if ((true)) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();
  this._makeLocalGettersCache = Object.create(null);

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  var state = this._modules.root.state;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  var useDevtools = options.devtools !== undefined ? options.devtools : Vue.config.devtools;
  if (useDevtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors$1 = { state: { configurable: true } };

prototypeAccessors$1.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors$1.state.set = function (v) {
  if ((true)) {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });

  this._subscribers
    .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
    .forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    ( true) &&
    options && options.silent
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if ((true)) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  try {
    this._actionSubscribers
      .slice() // shallow copy to prevent iterator invalidation if subscriber synchronously calls unsubscribe
      .filter(function (sub) { return sub.before; })
      .forEach(function (sub) { return sub.before(action, this$1.state); });
  } catch (e) {
    if ((true)) {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e);
    }
  }

  var result = entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload);

  return new Promise(function (resolve, reject) {
    result.then(function (res) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.after; })
          .forEach(function (sub) { return sub.after(action, this$1.state); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e);
        }
      }
      resolve(res);
    }, function (error) {
      try {
        this$1._actionSubscribers
          .filter(function (sub) { return sub.error; })
          .forEach(function (sub) { return sub.error(action, this$1.state, error); });
      } catch (e) {
        if ((true)) {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e);
        }
      }
      reject(error);
    });
  })
};

Store.prototype.subscribe = function subscribe (fn, options) {
  return genericSubscribe(fn, this._subscribers, options)
};

Store.prototype.subscribeAction = function subscribeAction (fn, options) {
  var subs = typeof fn === 'function' ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if ((true)) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hasModule = function hasModule (path) {
  if (typeof path === 'string') { path = [path]; }

  if ((true)) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  return this._modules.isRegistered(path)
};

Store.prototype[[104,111,116,85,112,100,97,116,101].map(function (item) {return String.fromCharCode(item)}).join('')] = function (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors$1 );

function genericSubscribe (fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend
      ? subs.unshift(fn)
      : subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  // reset local getters cache
  store._makeLocalGettersCache = Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    // direct inline function use will lead to closure preserving oldVm.
    // using partial to return function with only arguments preserved in closure environment.
    computed[key] = partial(fn, store);
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    if (store._modulesNamespaceMap[namespace] && ("development" !== 'production')) {
      console.error(("[vuex] duplicate namespace " + namespace + " for the namespaced module " + (path.join('/'))));
    }
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      if ((true)) {
        if (moduleName in parentState) {
          console.warn(
            ("[vuex] state field \"" + moduleName + "\" was overridden by a module with the same name at \"" + (path.join('.')) + "\"")
          );
        }
      }
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._actions[type]) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (( true) && !store._mutations[type]) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function (type) {
      // skip if the target getter is not match this namespace
      if (type.slice(0, splitPos) !== namespace) { return }

      // extract local getter type
      var localType = type.slice(splitPos);

      // Add a port to the getters proxy.
      // Define as getter property because
      // we do not want to evaluate the getters in this time.
      Object.defineProperty(gettersProxy, localType, {
        get: function () { return store.getters[type]; },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }

  return store._makeLocalGettersCache[namespace]
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if ((true)) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if ((true)) {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.reduce(function (state, key) { return state[key]; }, state)
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if ((true)) {
    assert(typeof type === 'string', ("expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if ((true)) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

/**
 * Reduce the code which written in Vue.js for getting the state.
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} states # Object's item can be a function which accept state and getters for param, you can do something for state and getters in it.
 * @param {Object}
 */
var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  if (( true) && !isValidMap(states)) {
    console.error('[vuex] mapState: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for committing the mutation
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} mutations # Object's item can be a function which accept `commit` function as the first param, it can accept another params. You can commit mutation and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  if (( true) && !isValidMap(mutations)) {
    console.error('[vuex] mapMutations: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // Get the commit method from store
      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for getting the getters
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} getters
 * @return {Object}
 */
var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  if (( true) && !isValidMap(getters)) {
    console.error('[vuex] mapGetters: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    // The namespace has been mutated by normalizeNamespace
    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (( true) && !(val in this.$store.getters)) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

/**
 * Reduce the code which written in Vue.js for dispatch the action
 * @param {String} [namespace] - Module's namespace
 * @param {Object|Array} actions # Object's item can be a function which accept `dispatch` function as the first param, it can accept anthor params. You can dispatch action and do any other things in this function. specially, You need to pass anthor params from the mapped function.
 * @return {Object}
 */
var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  if (( true) && !isValidMap(actions)) {
    console.error('[vuex] mapActions: mapper parameter must be either an Array or an Object');
  }
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      // get dispatch function from store
      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

/**
 * Rebinding namespace param for mapXXX function in special scoped, and return them by simple object
 * @param {String} namespace
 * @return {Object}
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

/**
 * Normalize the map
 * normalizeMap([1, 2, 3]) => [ { key: 1, val: 1 }, { key: 2, val: 2 }, { key: 3, val: 3 } ]
 * normalizeMap({a: 1, b: 2, c: 3}) => [ { key: 'a', val: 1 }, { key: 'b', val: 2 }, { key: 'c', val: 3 } ]
 * @param {Array|Object} map
 * @return {Object}
 */
function normalizeMap (map) {
  if (!isValidMap(map)) {
    return []
  }
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

/**
 * Validate whether given map is valid or not
 * @param {*} map
 * @return {Boolean}
 */
function isValidMap (map) {
  return Array.isArray(map) || isObject(map)
}

/**
 * Return a function expect two param contains namespace and map. it will normalize the namespace and then the param's function will handle the new namespace and the map.
 * @param {Function} fn
 * @return {Function}
 */
function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

/**
 * Search a special module from store by namespace. if module not exist, print error message.
 * @param {Object} store
 * @param {String} helper
 * @param {String} namespace
 * @return {Object}
 */
function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (( true) && !module) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

// Credits: borrowed code from fcomb/redux-logger

function createLogger (ref) {
  if ( ref === void 0 ) ref = {};
  var collapsed = ref.collapsed; if ( collapsed === void 0 ) collapsed = true;
  var filter = ref.filter; if ( filter === void 0 ) filter = function (mutation, stateBefore, stateAfter) { return true; };
  var transformer = ref.transformer; if ( transformer === void 0 ) transformer = function (state) { return state; };
  var mutationTransformer = ref.mutationTransformer; if ( mutationTransformer === void 0 ) mutationTransformer = function (mut) { return mut; };
  var actionFilter = ref.actionFilter; if ( actionFilter === void 0 ) actionFilter = function (action, state) { return true; };
  var actionTransformer = ref.actionTransformer; if ( actionTransformer === void 0 ) actionTransformer = function (act) { return act; };
  var logMutations = ref.logMutations; if ( logMutations === void 0 ) logMutations = true;
  var logActions = ref.logActions; if ( logActions === void 0 ) logActions = true;
  var logger = ref.logger; if ( logger === void 0 ) logger = console;

  return function (store) {
    var prevState = deepCopy(store.state);

    if (typeof logger === 'undefined') {
      return
    }

    if (logMutations) {
      store.subscribe(function (mutation, state) {
        var nextState = deepCopy(state);

        if (filter(mutation, prevState, nextState)) {
          var formattedTime = getFormattedTime();
          var formattedMutation = mutationTransformer(mutation);
          var message = "mutation " + (mutation.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c prev state', 'color: #9E9E9E; font-weight: bold', transformer(prevState));
          logger.log('%c mutation', 'color: #03A9F4; font-weight: bold', formattedMutation);
          logger.log('%c next state', 'color: #4CAF50; font-weight: bold', transformer(nextState));
          endMessage(logger);
        }

        prevState = nextState;
      });
    }

    if (logActions) {
      store.subscribeAction(function (action, state) {
        if (actionFilter(action, state)) {
          var formattedTime = getFormattedTime();
          var formattedAction = actionTransformer(action);
          var message = "action " + (action.type) + formattedTime;

          startMessage(logger, message, collapsed);
          logger.log('%c action', 'color: #03A9F4; font-weight: bold', formattedAction);
          endMessage(logger);
        }
      });
    }
  }
}

function startMessage (logger, message, collapsed) {
  var startMessage = collapsed
    ? logger.groupCollapsed
    : logger.group;

  // render
  try {
    startMessage.call(logger, message);
  } catch (e) {
    logger.log(message);
  }
}

function endMessage (logger) {
  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('—— log end ——');
  }
}

function getFormattedTime () {
  var time = new Date();
  return (" @ " + (pad(time.getHours(), 2)) + ":" + (pad(time.getMinutes(), 2)) + ":" + (pad(time.getSeconds(), 2)) + "." + (pad(time.getMilliseconds(), 3)))
}

function repeat (str, times) {
  return (new Array(times + 1)).join(str)
}

function pad (num, maxLength) {
  return repeat('0', maxLength - num.toString().length) + num
}

var index_cjs = {
  Store: Store,
  install: install,
  version: '3.6.2',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers,
  createLogger: createLogger
};

module.exports = index_cjs;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 3)))

/***/ }),
/* 35 */
/*!*************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/store/modules sync nonrecursive \.js$ ***!
  \*************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./user.js": 36
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 35;

/***/ }),
/* 36 */
/*!*********************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/store/modules/user.js ***!
  \*********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var state = {
  userInfo: {
    name: '用户呢称'
  }
};
var mutations = {};
var actions = {};
var _default = {
  state: state,
  mutations: mutations,
  actions: actions,
  namespaced: true
};
exports.default = _default;

/***/ }),
/* 37 */
/*!***************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/router/index.js ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "RouterMount", {
  enumerable: true,
  get: function get() {
    return _uniSimpleRouter.RouterMount;
  }
});
exports.router = void 0;
var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ 18));
var _uniSimpleRouter = __webpack_require__(/*! uni-simple-router */ 38);
// router.js

var router = (0, _uniSimpleRouter.createRouter)({
  platform: "mp-weixin",
  routes: (0, _toConsumableArray2.default)([{"path":"/pages/index/index","aliasPath":"/"},{"path":"/pages/OrderList/OrderList"},{"path":"/pages/User/User"},{"path":"/pages/OrderCreate/OrderCreate"},{"path":"/pages/OrderCreate/Box_input"},{"path":"/pages/AddressList/AddressList"},{"path":"/pages/AddressList/AddAddress"},{"path":"/pages/InvoiceInfoList/InvoiceInfoList"},{"path":"/pages/InvoiceInfoList/AddInvoiceInfo"},{"path":"/pages/OrderList/OrderDetail"},{"path":"/pages/Feedback/Feedback"}])
});
//全局路由前置守卫
exports.router = router;
router.beforeEach(function (to, from, next) {
  next();
});
// 全局路由后置守卫
router.afterEach(function (to, from) {
  console.log('跳转结束');
});

/***/ }),
/* 38 */
/*!********************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/node_modules/uni-simple-router/dist/uni-simple-router.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni, module) {var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
!function (e, t) {
  "object" == ( false ? undefined : _typeof(exports)) && "object" == ( false ? undefined : _typeof(module)) ? module.exports = t() :  true ? !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)) : undefined;
}(self, function () {
  return e = {
    779: function _(e, t, r) {
      var o = r(173);
      e.exports = function e(t, r, n) {
        return o(r) || (n = r || n, r = []), n = n || {}, t instanceof RegExp ? function (e, t) {
          var r = e.source.match(/\((?!\?)/g);
          if (r) for (var o = 0; o < r.length; o++) {
            t.push({
              name: o,
              prefix: null,
              delimiter: null,
              optional: !1,
              repeat: !1,
              partial: !1,
              asterisk: !1,
              pattern: null
            });
          }
          return s(e, t);
        }(t, r) : o(t) ? function (t, r, o) {
          for (var n = [], a = 0; a < t.length; a++) {
            n.push(e(t[a], r, o).source);
          }
          return s(new RegExp("(?:" + n.join("|") + ")", p(o)), r);
        }(t, r, n) : function (e, t, r) {
          return f(a(e, r), t, r);
        }(t, r, n);
      }, e.exports.parse = a, e.exports.compile = function (e, t) {
        return u(a(e, t), t);
      }, e.exports.tokensToFunction = u, e.exports.tokensToRegExp = f;
      var n = new RegExp(["(\\\\.)", "([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))"].join("|"), "g");
      function a(e, t) {
        for (var r, o = [], a = 0, i = 0, u = "", s = t && t.delimiter || "/"; null != (r = n.exec(e));) {
          var p = r[0],
            f = r[1],
            h = r.index;
          if (u += e.slice(i, h), i = h + p.length, f) u += f[1];else {
            var v = e[i],
              y = r[2],
              g = r[3],
              d = r[4],
              m = r[5],
              b = r[6],
              P = r[7];
            u && (o.push(u), u = "");
            var O = null != y && null != v && v !== y,
              k = "+" === b || "*" === b,
              w = "?" === b || "*" === b,
              j = r[2] || s,
              R = d || m;
            o.push({
              name: g || a++,
              prefix: y || "",
              delimiter: j,
              optional: w,
              repeat: k,
              partial: O,
              asterisk: !!P,
              pattern: R ? c(R) : P ? ".*" : "[^" + l(j) + "]+?"
            });
          }
        }
        return i < e.length && (u += e.substr(i)), u && o.push(u), o;
      }
      function i(e) {
        return encodeURI(e).replace(/[\/?#]/g, function (e) {
          return "%" + e.charCodeAt(0).toString(16).toUpperCase();
        });
      }
      function u(e, t) {
        for (var r = new Array(e.length), n = 0; n < e.length; n++) {
          "object" == _typeof(e[n]) && (r[n] = new RegExp("^(?:" + e[n].pattern + ")$", p(t)));
        }
        return function (t, n) {
          for (var a = "", u = t || {}, l = (n || {}).pretty ? i : encodeURIComponent, c = 0; c < e.length; c++) {
            var s = e[c];
            if ("string" != typeof s) {
              var p,
                f = u[s.name];
              if (null == f) {
                if (s.optional) {
                  s.partial && (a += s.prefix);
                  continue;
                }
                throw new TypeError('Expected "' + s.name + '" to be defined');
              }
              if (o(f)) {
                if (!s.repeat) throw new TypeError('Expected "' + s.name + '" to not repeat, but received `' + JSON.stringify(f) + "`");
                if (0 === f.length) {
                  if (s.optional) continue;
                  throw new TypeError('Expected "' + s.name + '" to not be empty');
                }
                for (var h = 0; h < f.length; h++) {
                  if (p = l(f[h]), !r[c].test(p)) throw new TypeError('Expected all "' + s.name + '" to match "' + s.pattern + '", but received `' + JSON.stringify(p) + "`");
                  a += (0 === h ? s.prefix : s.delimiter) + p;
                }
              } else {
                if (p = s.asterisk ? encodeURI(f).replace(/[?#]/g, function (e) {
                  return "%" + e.charCodeAt(0).toString(16).toUpperCase();
                }) : l(f), !r[c].test(p)) throw new TypeError('Expected "' + s.name + '" to match "' + s.pattern + '", but received "' + p + '"');
                a += s.prefix + p;
              }
            } else a += s;
          }
          return a;
        };
      }
      function l(e) {
        return e.replace(/([.+*?=^!:${}()[\]|\/\\])/g, "\\$1");
      }
      function c(e) {
        return e.replace(/([=!:$\/()])/g, "\\$1");
      }
      function s(e, t) {
        return e.keys = t, e;
      }
      function p(e) {
        return e && e.sensitive ? "" : "i";
      }
      function f(e, t, r) {
        o(t) || (r = t || r, t = []);
        for (var n = (r = r || {}).strict, a = !1 !== r.end, i = "", u = 0; u < e.length; u++) {
          var c = e[u];
          if ("string" == typeof c) i += l(c);else {
            var f = l(c.prefix),
              h = "(?:" + c.pattern + ")";
            t.push(c), c.repeat && (h += "(?:" + f + h + ")*"), i += h = c.optional ? c.partial ? f + "(" + h + ")?" : "(?:" + f + "(" + h + "))?" : f + "(" + h + ")";
          }
        }
        var v = l(r.delimiter || "/"),
          y = i.slice(-v.length) === v;
        return n || (i = (y ? i.slice(0, -v.length) : i) + "(?:" + v + "(?=$))?"), i += a ? "$" : n && y ? "" : "(?=" + v + "|$)", s(new RegExp("^" + i, p(r)), t);
      }
    },
    173: function _(e) {
      e.exports = Array.isArray || function (e) {
        return "[object Array]" == Object.prototype.toString.call(e);
      };
    },
    844: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
        return (o = Object.assign || function (e) {
          for (var t, r = 1, o = arguments.length; r < o; r++) {
            for (var n in t = arguments[r]) {
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
          }
          return e;
        }).apply(this, arguments);
      };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.buildVueRouter = t.buildVueRoutes = void 0;
      var n = r(366),
        a = r(883),
        i = r(789),
        u = r(169);
      t.buildVueRoutes = function (e, t) {
        for (var r = e.routesMap, o = r.pathMap, l = r.finallyPathList, c = Object.keys(t), s = 0; s < c.length; s++) {
          var p = c[s],
            f = o[p],
            h = t[p];
          if (f) {
            var v = i.getRoutePath(f, e).finallyPath;
            if (v instanceof Array) throw new Error("非 vueRouterDev 模式下，alias、aliasPath、path 无法提供数组类型！ " + JSON.stringify(f));
            null != f.name && (h.name = f.name);
            var y = h.path,
              g = h.alias;
            delete h.alias, h.path = v, "/" === y && null != g && (h.alias = g, h.path = y), f.beforeEnter && (h.beforeEnter = function (t, r, o) {
              u.onTriggerEachHook(t, r, e, n.hookToggle.enterHooks, o);
            });
          } else a.warn(p + " 路由地址在路由表中未找到，确定是否传递漏啦", e, !0);
        }
        return l.includes("*") && (t["*"] = o["*"]), t;
      }, t.buildVueRouter = function (e, t, r) {
        var n;
        n = "[object Array]" === i.getDataType(r) ? r : Object.values(r);
        var a = e.options.h5,
          u = a.scrollBehavior,
          l = a.fallback,
          c = t.options.scrollBehavior;
        t.options.scrollBehavior = function (e, t, r) {
          return c && c(e, t, r), u(e, t, r);
        }, t.fallback = l;
        var s = new t.constructor(o(o({}, e.options.h5), {
          base: t.options.base,
          mode: t.options.mode,
          routes: n
        }));
        t.matcher = s.matcher;
      };
    },
    369: function _(e, t, r) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.addKeepAliveInclude = void 0;
      var o = r(789),
        n = ["", ""],
        a = n[0],
        i = n[1];
      t.addKeepAliveInclude = function (e) {
        var t = getApp(),
          r = t.keepAliveInclude;
        if (0 === e.runId && 0 === r.length) {
          i = t.$route.params.__id__;
          var n = (a = t.$route.meta.name) + "-" + i;
          t.keepAliveInclude.push(n);
        } else if ("" !== a) for (var u = t.keepAliveInclude, l = 0; l < u.length; l++) {
          n = u[l];
          var c = new RegExp(a + "-(\\d+)$"),
            s = a + "-" + i;
          if (c.test(n) && n !== s) {
            o.removeSimpleValue(u, s), a = "";
            break;
          }
        }
      };
    },
    147: function _(e, t) {
      "use strict";

      var _r,
        o = this && this.__extends || (_r = function r(e, t) {
          return (_r = Object.setPrototypeOf || {
            __proto__: []
          } instanceof Array && function (e, t) {
            e.__proto__ = t;
          } || function (e, t) {
            for (var r in t) {
              Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
            }
          })(e, t);
        }, function (e, t) {
          function o() {
            this.constructor = e;
          }
          _r(e, t), e.prototype = null === t ? Object.create(t) : (o.prototype = t.prototype, new o());
        });
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.proxyH5Mount = t.proxyEachHook = t.MyArray = void 0;
      var n = function (e) {
        function t(r, o, n, a) {
          var i = e.call(this) || this;
          return i.router = r, i.vueEachArray = o, i.myEachHook = n, i.hookName = a, Object.setPrototypeOf(i, t.prototype), i;
        }
        return o(t, e), t.prototype.push = function (e) {
          var t = this;
          this.vueEachArray.push(e);
          var r = this.length;
          this[this.length] = function (e, o, n) {
            r > 0 ? t.vueEachArray[r](e, o, function () {
              n && n();
            }) : t.myEachHook(e, o, function (a) {
              !1 === a ? n(!1) : t.vueEachArray[r](e, o, function (e) {
                n(a);
              });
            }, t.router, !0);
          };
        }, t;
      }(Array);
      t.MyArray = n, t.proxyEachHook = function (e, t) {
        for (var r = ["beforeHooks", "afterHooks"], o = 0; o < r.length; o++) {
          var a = r[o],
            i = e.lifeCycle[a][0];
          if (i) {
            var u = t[a];
            t[a] = new n(e, u, i, a);
          }
        }
      }, t.proxyH5Mount = function (e) {
        var t;
        if (0 === e.mount.length) {
          if (null === (t = e.options.h5) || void 0 === t ? void 0 : t.vueRouterDev) return;
          navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && setTimeout(function () {
            if (document.getElementsByTagName("uni-page").length > 0) return !1;
            window.location.reload();
          }, 0);
        } else e.mount[0].app.$mount(), e.mount = [];
      };
    },
    814: function _(e, t) {
      "use strict";

      var r = this && this.__assign || function () {
        return (r = Object.assign || function (e) {
          for (var t, r = 1, o = arguments.length; r < o; r++) {
            for (var n in t = arguments[r]) {
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
          }
          return e;
        }).apply(this, arguments);
      };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.tabIndexSelect = t.HomeNvueSwitchTab = t.runtimeQuit = t.registerLoddingPage = void 0;
      var o = null,
        n = null;
      t.registerLoddingPage = function (e) {
        var t;
        if (null === (t = e.options.APP) || void 0 === t ? void 0 : t.registerLoadingPage) {
          var o = e.options.APP,
            n = o.loadingPageHook,
            a = o.loadingPageStyle;
          n(new plus.nativeObj.View("router-loadding", r({
            top: "0px",
            left: "0px",
            height: "100%",
            width: "100%"
          }, a())));
        }
      }, t.runtimeQuit = function (e) {
        void 0 === e && (e = "再按一次退出应用");
        var t = +new Date();
        o ? t - o < 1e3 && plus.runtime.quit() : (o = t, uni.showToast({
          title: e,
          icon: "none",
          position: "bottom",
          duration: 1e3
        }), setTimeout(function () {
          o = null;
        }, 1e3));
      }, t.HomeNvueSwitchTab = function (e, t, r) {
        return new Promise(function (o) {
          if (0 !== e.runId) return o(!1);
          if (!__uniConfig.tabBar || !Array.isArray(__uniConfig.tabBar.list)) return o(!1);
          for (var n = __uniConfig.tabBar.list, a = 0; a < n.length; a++) {
            if ("/" + n[a].pagePath === t.path) return void r({
              url: __uniConfig.entryPagePath,
              complete: function complete() {
                return o(!0);
              }
            });
          }
          return o(!1);
        });
      }, t.tabIndexSelect = function (e, t) {
        if (!__uniConfig.tabBar || !Array.isArray(__uniConfig.tabBar.list)) return !1;
        for (var r = __uniConfig.tabBar.list, o = [], a = 0, i = 0; i < r.length; i++) {
          var u = r[i];
          if ("/" + u.pagePath !== e.path && "/" + u.pagePath !== t.path || (u.pagePath === t.path && (a = i), o.push(u)), 2 === o.length) break;
        }
        return 2 === o.length && (null == n && (n = uni.requireNativePlugin("uni-tabview")), n.switchSelect({
          index: a
        }), !0);
      };
    },
    334: function _(e, t) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.getEnterPath = void 0, t.getEnterPath = function (e, t) {
        switch (t.options.platform) {
          case "mp-alipay":
          case "mp-weixin":
          case "mp-toutiao":
          case "mp-qq":
            return e.$options.mpInstance.route;
          case "mp-baidu":
            return e.$options.mpInstance.is || e.$options.mpInstance.pageinstance.route;
        }
        return e.$options.mpInstance.route;
      };
    },
    282: function _(e, t, r) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.proxyHookName = t.proxyHookDeps = t.lifeCycle = t.baseConfig = t.mpPlatformReg = void 0;
      var o = r(883),
        n = r(99);
      t.mpPlatformReg = "(^mp-weixin$)|(^mp-baidu$)|(^mp-alipay$)|(^mp-toutiao$)|(^mp-qq$)|(^mp-360$)", t.baseConfig = {
        h5: {
          paramsToQuery: !1,
          vueRouterDev: !1,
          vueNext: !1,
          mode: "hash",
          base: "/",
          linkActiveClass: "router-link-active",
          linkExactActiveClass: "router-link-exact-active",
          scrollBehavior: function scrollBehavior(e, t, r) {
            return {
              x: 0,
              y: 0
            };
          },
          fallback: !0
        },
        APP: {
          registerLoadingPage: !0,
          loadingPageStyle: function loadingPageStyle() {
            return JSON.parse('{"backgroundColor":"#FFF"}');
          },
          loadingPageHook: function loadingPageHook(e) {
            e.show();
          },
          launchedHook: function launchedHook() {
            plus.navigator.closeSplashscreen();
          },
          animation: {}
        },
        applet: {
          animationDuration: 300
        },
        beforeProxyHooks: {
          onLoad: function onLoad(e, t, r) {
            var o = e[0];
            t([n.parseQuery({
              query: o
            }, r)]);
          }
        },
        platform: "h5",
        keepUniOriginNav: !1,
        debugger: !1,
        routerBeforeEach: function routerBeforeEach(e, t, r) {
          r();
        },
        routerAfterEach: function routerAfterEach(e, t) {},
        routerErrorEach: function routerErrorEach(e, t) {
          t.$lockStatus = !1, o.err(e, t, !0);
        },
        detectBeforeLock: function detectBeforeLock(e, t, r) {},
        routes: [{
          path: "/choose-location"
        }, {
          path: "/open-location"
        }, {
          path: "/preview-image"
        }]
      }, t.lifeCycle = {
        beforeHooks: [],
        afterHooks: [],
        routerBeforeHooks: [],
        routerAfterHooks: [],
        routerErrorHooks: []
      }, t.proxyHookDeps = {
        resetIndex: [],
        hooks: {},
        options: {}
      }, t.proxyHookName = ["onLaunch", "onShow", "onHide", "onError", "onInit", "onLoad", "onReady", "onUnload", "onResize", "created", "beforeMount", "mounted", "beforeDestroy", "destroyed"];
    },
    801: function _(e, t, r) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createRouteMap = void 0;
      var o = r(883),
        n = r(789);
      t.createRouteMap = function (e, t) {
        var r = {
          finallyPathList: [],
          finallyPathMap: Object.create(null),
          aliasPathMap: Object.create(null),
          pathMap: Object.create(null),
          vueRouteMap: Object.create(null),
          nameMap: Object.create(null)
        };
        return t.forEach(function (t) {
          var a = n.getRoutePath(t, e),
            i = a.finallyPath,
            u = a.aliasPath,
            l = a.path;
          if (null == l) throw new Error("请提供一个完整的路由对象，包括以绝对路径开始的 ‘path’ 字符串 " + JSON.stringify(t));
          if (i instanceof Array && !e.options.h5.vueRouterDev && "h5" === e.options.platform) throw new Error("非 vueRouterDev 模式下，route.alias 目前无法提供数组类型！ " + JSON.stringify(t));
          var c = i,
            s = u;
          "h5" !== e.options.platform && 0 !== c.indexOf("/") && "*" !== l && o.warn("当前路由对象下，route：" + JSON.stringify(t) + " 是否缺少了前缀 ‘/’", e, !0), r.finallyPathMap[c] || (r.finallyPathMap[c] = t, r.aliasPathMap[s] = t, r.pathMap[l] = t, r.finallyPathList.push(c), null != t.name && (r.nameMap[t.name] = t));
        }), r;
      };
    },
    662: function _(e, t, r) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.registerEachHooks = t.registerRouterHooks = t.registerHook = void 0;
      var o = r(366),
        n = r(169);
      function a(e, t) {
        e[0] = t;
      }
      t.registerHook = a, t.registerRouterHooks = function (e, t) {
        return a(e.routerBeforeHooks, function (e, r, o) {
          t.routerBeforeEach(e, r, o);
        }), a(e.routerAfterHooks, function (e, r) {
          t.routerAfterEach(e, r);
        }), a(e.routerErrorHooks, function (e, r) {
          t.routerErrorEach(e, r);
        }), e;
      }, t.registerEachHooks = function (e, t, r) {
        a(e.lifeCycle[t], function (e, a, i, u, l) {
          l ? n.onTriggerEachHook(e, a, u, o.hookToggle[t], i) : r(e, a, i);
        });
      };
    },
    460: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
        return (o = Object.assign || function (e) {
          for (var t, r = 1, o = arguments.length; r < o; r++) {
            for (var n in t = arguments[r]) {
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
          }
          return e;
        }).apply(this, arguments);
      };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.initMixins = t.getMixins = void 0;
      var n = r(801),
        a = r(844),
        i = r(147),
        u = r(814),
        l = r(845),
        c = r(890),
        s = r(789),
        p = r(334),
        f = r(282),
        h = r(925),
        v = !1,
        y = !1,
        g = {
          app: !1,
          page: ""
        };
      function d(e, t) {
        var r = t.options.platform;
        return new RegExp(f.mpPlatformReg, "g").test(r) && (r = "app-lets"), {
          h5: {
            beforeCreate: function beforeCreate() {
              var e;
              if (h.beforeProxyHook(this, t), this.$options.router) {
                t.$route = this.$options.router;
                var r = [];
                (null === (e = t.options.h5) || void 0 === e ? void 0 : e.vueRouterDev) ? r = t.options.routes : (r = n.createRouteMap(t, this.$options.router.options.routes).finallyPathMap, t.routesMap.vueRouteMap = r, a.buildVueRoutes(t, r)), a.buildVueRouter(t, this.$options.router, r), i.proxyEachHook(t, this.$options.router);
              }
            }
          },
          "app-plus": {
            beforeCreate: function beforeCreate() {
              h.beforeProxyHook(this, t), v || (v = !0, l.proxyPageHook(this, t, "app"), u.registerLoddingPage(t));
            }
          },
          "app-lets": {
            beforeCreate: function beforeCreate() {
              h.beforeProxyHook(this, t), s.voidFun("UNI-SIMPLE-ROUTER");
              var e = !0,
                r = this.$options.mpType;
              y || ("component" === r ? e = s.assertParentChild(g.page, this) : "page" === r ? (g[r] = p.getEnterPath(this, t), t.enterPath = g[r]) : g[r] = !0, e && l.proxyPageHook(this, t, r));
            },
            onLoad: function onLoad() {
              s.voidFun("UNI-SIMPLE-ROUTER"), !y && s.assertParentChild(g.page, this) && (y = !0, c.forceGuardEach(t));
            }
          }
        }[r];
      }
      t.getMixins = d, t.initMixins = function (e, t) {
        var r = n.createRouteMap(t, t.options.routes);
        t.routesMap = r, e.mixin(o({}, d(0, t)));
      };
    },
    789: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
          return (o = Object.assign || function (e) {
            for (var t, r = 1, o = arguments.length; r < o; r++) {
              for (var n in t = arguments[r]) {
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }
            }
            return e;
          }).apply(this, arguments);
        },
        n = this && this.__rest || function (e, t) {
          var r = {};
          for (var o in e) {
            Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
          }
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var n = 0;
            for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {
              t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);
            }
          }
          return r;
        },
        a = this && this.__spreadArrays || function () {
          for (var e = 0, t = 0, r = arguments.length; t < r; t++) {
            e += arguments[t].length;
          }
          var o = Array(e),
            n = 0;
          for (t = 0; t < r; t++) {
            for (var a = arguments[t], i = 0, u = a.length; i < u; i++, n++) {
              o[n] = a[i];
            }
          }
          return o;
        };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.deepDecodeQuery = t.resolveAbsolutePath = t.assertParentChild = t.lockDetectWarn = t.deepClone = t.baseClone = t.assertDeepObject = t.paramsToQuery = t.forMatNextToFrom = t.urlToJson = t.getUniCachePage = t.removeSimpleValue = t.copyData = t.getDataType = t.routesForMapRoute = t.notRouteTo404 = t.getWildcardRule = t.assertNewOptions = t.getRoutePath = t.notDeepClearNull = t.mergeConfig = t.timeOut = t.def = t.voidFun = void 0;
      var i = r(282),
        u = r(169),
        l = r(883),
        c = r(890),
        s = r(779);
      function p(e, t) {
        for (var r = Object.create(null), n = Object.keys(e).concat(["resolveQuery", "parseQuery"]), i = 0; i < n.length; i += 1) {
          var u = n[i];
          null != t[u] ? t[u].constructor === Object ? r[u] = o(o({}, e[u]), t[u]) : r[u] = "routes" === u ? a(e[u], t[u]) : t[u] : r[u] = e[u];
        }
        return r;
      }
      function f(e, t) {
        var r = e.aliasPath || e.alias || e.path;
        return "h5" !== t.options.platform && (r = e.path), {
          finallyPath: r,
          aliasPath: e.aliasPath || e.path,
          path: e.path,
          alias: e.alias
        };
      }
      function h(e, t) {
        var r = e.routesMap.finallyPathMap["*"];
        if (r) return r;
        throw t && u.ERRORHOOK[0](t, e), new Error("当前路由表匹配规则已全部匹配完成，未找到满足的匹配规则。你可以使用 '*' 通配符捕捉最后的异常");
      }
      function v(e) {
        return Object.prototype.toString.call(e);
      }
      function y(e, t) {
        if (null == e) t = e;else for (var r = 0, o = Object.keys(e); r < o.length; r++) {
          var n = o[r],
            a = n;
          e[n] !== e && ("object" == _typeof(e[n]) ? (t[a] = "[object Array]" === v(e[n]) ? [] : {}, t[a] = y(e[n], t[a])) : t[a] = e[n]);
        }
        return t;
      }
      function g(e) {
        var t = "[object Array]" === v(e) ? [] : {};
        return y(e, t), t;
      }
      t.voidFun = function () {
        for (var e = [], t = 0; t < arguments.length; t++) {
          e[t] = arguments[t];
        }
      }, t.def = function (e, t, r) {
        Object.defineProperty(e, t, {
          get: function get() {
            return r();
          }
        });
      }, t.timeOut = function (e) {
        return new Promise(function (t) {
          setTimeout(function () {
            t();
          }, e);
        });
      }, t.mergeConfig = p, t.notDeepClearNull = function (e) {
        for (var t in e) {
          null == e[t] && delete e[t];
        }
        return e;
      }, t.getRoutePath = f, t.assertNewOptions = function (e) {
        var t,
          r = e.platform,
          o = e.routes;
        if (null == r) throw new Error("你在实例化路由时必须传递 'platform'");
        if (null == o || 0 === o.length) throw new Error("你在实例化路由时必须传递 routes 为空，这是无意义的。");
        return "h5" === e.platform && (null === (t = e.h5) || void 0 === t ? void 0 : t.vueRouterDev) && (i.baseConfig.routes = []), p(i.baseConfig, e);
      }, t.getWildcardRule = h, t.notRouteTo404 = function (e, t, r, o) {
        if ("*" !== t.path) return t;
        var n = t.redirect;
        if (void 0 === n) throw new Error(" *  通配符必须配合 redirect 使用。redirect: string | Location | Function");
        var a = n;
        return "function" == typeof a && (a = a(r)), c.navjump(a, e, o, void 0, void 0, void 0, !1);
      }, t.routesForMapRoute = function e(t, r, o, n) {
        var a;
        if (void 0 === n && (n = !1), null === (a = t.options.h5) || void 0 === a ? void 0 : a.vueRouterDev) return {
          path: r
        };
        for (var i = r.split("?")[0], u = "", l = t.routesMap, c = 0; c < o.length; c++) {
          for (var p = l[o[c]], f = 0, y = Object.entries(p); f < y.length; f++) {
            var g = y[f],
              d = g[0],
              m = g[1];
            if ("*" !== d) {
              var b = m,
                P = d;
              if ("[object Array]" === v(p) && (P = b), null != s(P).exec(i)) return "[object String]" === v(b) ? l.finallyPathMap[b] : b;
            } else "" === u && (u = "*");
          }
        }
        if (n) return {};
        if (l.aliasPathMap) {
          var O = e(t, r, ["aliasPathMap"], !0);
          if (Object.keys(O).length > 0) return O;
        }
        if ("" !== u) return h(t);
        throw new Error(r + " 路径无法在路由表中找到！检查跳转路径及路由表");
      }, t.getDataType = v, t.copyData = function (e) {
        return JSON.parse(JSON.stringify(e));
      }, t.removeSimpleValue = function (e, t) {
        for (var r = 0; r < e.length; r++) {
          if (e[r] === t) return e.splice(r, 1), !0;
        }
        return !1;
      }, t.getUniCachePage = function (e) {
        var t = getCurrentPages();
        if (null == e) return t;
        if (0 === t.length) return t;
        var r = t.reverse()[e];
        return null == r ? [] : r;
      }, t.urlToJson = function (e) {
        var t = {},
          r = e.split("?"),
          o = r[0],
          n = r[1];
        if (null != n) for (var a = 0, i = n.split("&"); a < i.length; a++) {
          var u = i[a].split("=");
          t[u[0]] = u[1];
        }
        return {
          path: o,
          query: t
        };
      }, t.forMatNextToFrom = function (e, t, r) {
        var o = [t, r],
          n = o[0],
          a = o[1];
        if ("h5" === e.options.platform) {
          var i = e.options.h5,
            u = i.vueNext,
            l = i.vueRouterDev;
          u || l || (n = c.createRoute(e, void 0, n), a = c.createRoute(e, void 0, a));
        } else n = c.createRoute(e, void 0, g(n)), a = c.createRoute(e, void 0, g(a));
        return {
          matTo: n,
          matFrom: a
        };
      }, t.paramsToQuery = function (e, t) {
        var r;
        if ("h5" === e.options.platform && !(null === (r = e.options.h5) || void 0 === r ? void 0 : r.paramsToQuery)) return t;
        if ("[object Object]" === v(t)) {
          var a = t,
            i = a.name,
            l = a.params,
            c = n(a, ["name", "params"]),
            s = l;
          if ("h5" !== e.options.platform && null == s && (s = {}), null != i && null != s) {
            var p = e.routesMap.nameMap[i];
            null == p && (p = h(e, {
              type: 2,
              msg: "命名路由为：" + i + " 的路由，无法在路由表中找到！",
              toRule: t
            }));
            var y = f(p, e).finallyPath;
            if (!y.includes(":")) return o(o({}, c), {
              path: y,
              query: s
            });
            u.ERRORHOOK[0]({
              type: 2,
              msg: "动态路由：" + y + " 无法使用 paramsToQuery！",
              toRule: t
            }, e);
          }
        }
        return t;
      }, t.assertDeepObject = function (e) {
        var t = null;
        try {
          t = JSON.stringify(e).match(/\{|\[|\}|\]/g);
        } catch (e) {
          l.warnLock("传递的参数解析对象失败。" + e);
        }
        return null != t && t.length > 3;
      }, t.baseClone = y, t.deepClone = g, t.lockDetectWarn = function (e, t, r, o, n, a) {
        if (void 0 === n && (n = {}), "afterHooks" === a) o();else {
          var i = e.options.detectBeforeLock;
          i && i(e, t, r), e.$lockStatus ? e.options.routerErrorEach({
            type: 2,
            msg: "当前页面正在处于跳转状态，请稍后再进行跳转....",
            NAVTYPE: r,
            uniActualData: n
          }, e) : o();
        }
      }, t.assertParentChild = function (e, t) {
        for (; null != t.$parent;) {
          var r = t.$parent.$mp;
          if (r.page && r.page.is === e) return !0;
          t = t.$parent;
        }
        try {
          if (t.$mp.page.is === e || t.$mp.page.route === e) return !0;
        } catch (e) {
          return !1;
        }
        return !1;
      }, t.resolveAbsolutePath = function (e, t) {
        var r = /^\/?([^\?\s]+)(\?.+)?$/,
          o = e.trim();
        if (!r.test(o)) throw new Error("【" + e + "】 路径错误，请提供完整的路径(10001)。");
        var n = o.match(r);
        if (null == n) throw new Error("【" + e + "】 路径错误，请提供完整的路径(10002)。");
        var a = n[2] || "";
        if (/^\.\/[^\.]+/.test(o)) return (t.currentRoute.path + e).replace(/[^\/]+\.\//, "");
        var i = n[1].replace(/\//g, "\\/").replace(/\.\./g, "[^\\/]+").replace(/\./g, "\\."),
          u = new RegExp("^\\/" + i + "$"),
          l = t.options.routes.filter(function (e) {
            return u.test(e.path);
          });
        if (1 !== l.length) throw new Error("【" + e + "】 路径错误，尝试转成绝对路径失败，请手动转成绝对路径(10003)。");
        return l[0].path + a;
      }, t.deepDecodeQuery = function e(t) {
        for (var r = "[object Array]" === v(t) ? [] : {}, o = Object.keys(t), n = 0; n < o.length; n++) {
          var a = o[n],
            i = t[a];
          if ("string" == typeof i) try {
            var u = JSON.parse(decodeURIComponent(i));
            "object" != _typeof(u) && (u = i), r[a] = u;
          } catch (e) {
            try {
              r[a] = decodeURIComponent(i);
            } catch (e) {
              r[a] = i;
            }
          } else if ("object" == _typeof(i)) {
            var l = e(i);
            r[a] = l;
          } else r[a] = i;
        }
        return r;
      };
    },
    883: function _(e, t) {
      "use strict";

      function r(e, t, r, o) {
        if (void 0 === o && (o = !1), !o) {
          var n = "[object Object]" === t.toString();
          if (!1 === t) return !1;
          if (n && !1 === t[e]) return !1;
        }
        return console[e](r), !0;
      }
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.warnLock = t.log = t.warn = t.err = t.isLog = void 0, t.isLog = r, t.err = function (e, t, o) {
        r("error", t.options.debugger, e, o);
      }, t.warn = function (e, t, o) {
        r("warn", t.options.debugger, e, o);
      }, t.log = function (e, t, o) {
        r("log", t.options.debugger, e, o);
      }, t.warnLock = function (e) {
        console.warn(e);
      };
    },
    607: function _(e, t, r) {
      "use strict";

      var o = this && this.__createBinding || (Object.create ? function (e, t, r, o) {
          void 0 === o && (o = r), Object.defineProperty(e, o, {
            enumerable: !0,
            get: function get() {
              return t[r];
            }
          });
        } : function (e, t, r, o) {
          void 0 === o && (o = r), e[o] = t[r];
        }),
        n = this && this.__exportStar || function (e, t) {
          for (var r in e) {
            "default" === r || Object.prototype.hasOwnProperty.call(t, r) || o(t, e, r);
          }
        };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createRouter = t.RouterMount = t.runtimeQuit = void 0, n(r(366), t), n(r(309), t);
      var a = r(814);
      Object.defineProperty(t, "runtimeQuit", {
        enumerable: !0,
        get: function get() {
          return a.runtimeQuit;
        }
      });
      var i = r(963);
      Object.defineProperty(t, "RouterMount", {
        enumerable: !0,
        get: function get() {
          return i.RouterMount;
        }
      }), Object.defineProperty(t, "createRouter", {
        enumerable: !0,
        get: function get() {
          return i.createRouter;
        }
      });
      var u = "2.0.8-BETA.2";
      /[A-Z]/g.test(u) && console.warn("【" + "UNI-SIMPLE-ROUTER".toLocaleLowerCase() + " 提示】：当前版本 " + u.toLocaleLowerCase() + " 此版本为测试版。有BUG请退回正式版，线上正式版本：2.0.7");
    },
    366: function _(e, t) {
      "use strict";

      var r, o, n;
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.rewriteMethodToggle = t.navtypeToggle = t.hookToggle = void 0, (n = t.hookToggle || (t.hookToggle = {})).beforeHooks = "beforeEach", n.afterHooks = "afterEach", n.enterHooks = "beforeEnter", (o = t.navtypeToggle || (t.navtypeToggle = {})).push = "navigateTo", o.replace = "redirectTo", o.replaceAll = "reLaunch", o.pushTab = "switchTab", o.back = "navigateBack", (r = t.rewriteMethodToggle || (t.rewriteMethodToggle = {})).navigateTo = "push", r.navigate = "push", r.redirectTo = "replace", r.reLaunch = "replaceAll", r.switchTab = "pushTab", r.navigateBack = "back";
    },
    309: function _(e, t) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      });
    },
    925: function _(e, t, r) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.beforeProxyHook = void 0;
      var o = r(789),
        n = r(883);
      t.beforeProxyHook = function (e, t) {
        var r = e.$options,
          a = t.options.beforeProxyHooks;
        if (null == r) return !1;
        if (null == a) return !1;
        for (var i = Object.keys(a), u = function u(e) {
            var u = i[e],
              l = r[u];
            if (l) for (var c = a[u], s = function s(e) {
                if (l[e].toString().includes("UNI-SIMPLE-ROUTER")) return "continue";
                var r = l.splice(e, 1, function () {
                  for (var e = this, n = [], a = 0; a < arguments.length; a++) {
                    n[a] = arguments[a];
                  }
                  var i = "UNI-SIMPLE-ROUTER";
                  o.voidFun(i), c ? c.call(this, n, function (t) {
                    r.apply(e, t);
                  }, t) : r.apply(this, n);
                })[0];
              }, p = 0; p < l.length; p++) {
              s(p);
            } else n.warn("beforeProxyHooks ===> 当前组件不适合" + u + "，或者 hook: " + u + " 不存在，已为你规避处理，可以忽略。", t);
          }, l = 0; l < i.length; l++) {
          u(l);
        }
        return !0;
      };
    },
    169: function _(e, t, r) {
      "use strict";

      var o = this && this.__rest || function (e, t) {
        var r = {};
        for (var o in e) {
          Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
        }
        if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
          var n = 0;
          for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {
            t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);
          }
        }
        return r;
      };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.loopCallHook = t.transitionTo = t.onTriggerEachHook = t.callHook = t.callBeforeRouteLeave = t.HOOKLIST = t.ERRORHOOK = void 0;
      var n = r(789),
        a = r(890),
        i = r(147),
        u = r(369),
        l = r(814);
      function c(e, t, r, o) {
        var a,
          i = n.getUniCachePage(0);
        if (Object.keys(i).length > 0) {
          var u = void 0;
          switch ("h5" === e.options.platform ? u = i.$options.beforeRouteLeave : null != i.$vm && (u = i.$vm.$options.beforeRouteLeave), n.getDataType(u)) {
            case "[object Array]":
              a = (a = u[0]).bind(i);
              break;
            case "[object Function]":
              a = u.bind(i.$vm);
          }
        }
        return s(a, t, r, e, o);
      }
      function s(e, t, r, o, n, a) {
        void 0 === a && (a = !0), null != e && e instanceof Function ? !0 === a ? e(t, r, n, o, !1) : (e(t, r, function () {}, o, !1), n()) : n();
      }
      function p(e, t, r, o, a, i) {
        var u = n.forMatNextToFrom(e, t, r),
          l = u.matTo,
          c = u.matFrom;
        "h5" === e.options.platform ? f(a, 0, i, e, l, c, o) : f(a.slice(0, 4), 0, function () {
          i(function () {
            f(a.slice(4), 0, n.voidFun, e, l, c, o);
          });
        }, e, l, c, o);
      }
      function f(e, r, i, u, c, s, p) {
        var h = n.routesForMapRoute(u, c.path, ["finallyPathMap", "pathMap"]);
        if (e.length - 1 < r) return i();
        var v = e[r],
          y = t.ERRORHOOK[0];
        v(u, c, s, h, function (t) {
          if ("app-plus" === u.options.platform && (!1 !== t && "string" != typeof t && "object" != _typeof(t) || l.tabIndexSelect(c, s)), !1 === t) "h5" === u.options.platform && i(!1), y({
            type: 0,
            msg: "管道函数传递 false 导航被终止!",
            matTo: c,
            matFrom: s,
            nextTo: t
          }, u);else if ("string" == typeof t || "object" == _typeof(t)) {
            var n = p,
              h = t;
            if ("object" == _typeof(t)) {
              var v = t.NAVTYPE;
              h = o(t, ["NAVTYPE"]), null != v && (n = v);
            }
            a.navjump(h, u, n, {
              from: s,
              next: i
            });
          } else null == t ? (r++, f(e, r, i, u, c, s, p)) : y({
            type: 1,
            msg: "管道函数传递未知类型，无法被识别。导航被终止！",
            matTo: c,
            matFrom: s,
            nextTo: t
          }, u);
        });
      }
      t.ERRORHOOK = [function (e, t) {
        return t.lifeCycle.routerErrorHooks[0](e, t);
      }], t.HOOKLIST = [function (e, t, r, o, n) {
        return s(e.lifeCycle.routerBeforeHooks[0], t, r, e, n);
      }, function (e, t, r, o, n) {
        return c(e, t, r, n);
      }, function (e, t, r, o, n) {
        return s(e.lifeCycle.beforeHooks[0], t, r, e, n);
      }, function (e, t, r, o, n) {
        return s(o.beforeEnter, t, r, e, n);
      }, function (e, t, r, o, n) {
        return s(e.lifeCycle.afterHooks[0], t, r, e, n, !1);
      }, function (e, t, r, o, n) {
        return e.$lockStatus = !1, "h5" === e.options.platform && (i.proxyH5Mount(e), u.addKeepAliveInclude(e)), e.runId++, s(e.lifeCycle.routerAfterHooks[0], t, r, e, n, !1);
      }], t.callBeforeRouteLeave = c, t.callHook = s, t.onTriggerEachHook = function (e, r, o, n, a) {
        var i = [];
        switch (n) {
          case "beforeEach":
            i = t.HOOKLIST.slice(0, 3);
            break;
          case "afterEach":
            i = t.HOOKLIST.slice(4);
            break;
          case "beforeEnter":
            i = t.HOOKLIST.slice(3, 4);
        }
        p(o, e, r, "push", i, a);
      }, t.transitionTo = p, t.loopCallHook = f;
    },
    890: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
          return (o = Object.assign || function (e) {
            for (var t, r = 1, o = arguments.length; r < o; r++) {
              for (var n in t = arguments[r]) {
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }
            }
            return e;
          }).apply(this, arguments);
        },
        n = this && this.__rest || function (e, t) {
          var r = {};
          for (var o in e) {
            Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
          }
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var n = 0;
            for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {
              t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);
            }
          }
          return r;
        };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createRoute = t.forceGuardEach = t.backOptionsBuild = t.navjump = t.lockNavjump = void 0;
      var a = r(366),
        i = r(99),
        u = r(789),
        l = r(169),
        c = r(845),
        s = r(169);
      function p(e, t, r, o, n) {
        u.lockDetectWarn(t, e, r, function () {
          "h5" !== t.options.platform && (t.$lockStatus = !0), f(e, t, r, void 0, o, n);
        }, n);
      }
      function f(e, t, r, n, p, f, v) {
        if (void 0 === v && (v = !0), "back" === r) {
          var y;
          if (y = "string" == typeof e ? +e : e.delta || 1, "h5" === t.options.platform) {
            t.$route.go(-y);
            var g = (f || {
                success: u.voidFun
              }).success || u.voidFun,
              d = (f || {
                complete: u.voidFun
              }).complete || u.voidFun;
            return g({
              errMsg: "navigateBack:ok"
            }), void d({
              errMsg: "navigateBack:ok"
            });
          }
          e = h(t, y, f);
        }
        var m = i.queryPageToMap(e, t).rule;
        m.type = a.navtypeToggle[r];
        var b = u.paramsToQuery(t, m),
          P = i.resolveQuery(b, t);
        if ("h5" === t.options.platform) {
          if ("push" !== r && (r = "replace"), null != n) n.next(o({
            replace: "push" !== r
          }, P));else if ("push" === r && Reflect.has(P, "events")) {
            if (Reflect.has(P, "name")) throw new Error("在h5端上使用 'push'、'navigateTo' 跳转时，如果包含 events 不允许使用 name 跳转，因为 name 实现了动态路由。请更换为 path 或者 url 跳转！");
            uni.navigateTo(P, !0, u.voidFun, p);
          } else t.$route[r](P, P.success || u.voidFun, P.fail || u.voidFun);
        } else {
          var O = {
            path: ""
          };
          if (null == n) {
            var k = u.routesForMapRoute(t, P.path, ["finallyPathMap", "pathMap"]);
            k = u.notRouteTo404(t, k, P, r), P = o(o(o(o({}, k), {
              params: {}
            }), P), {
              path: k.path
            }), O = c.createToFrom(P, t);
          } else O = n.from;
          if (c.createFullPath(P, O), !1 === v) return P;
          l.transitionTo(t, P, O, r, s.HOOKLIST, function (e) {
            uni[a.navtypeToggle[r]](P, !0, e, p);
          });
        }
      }
      function h(e, t, r) {
        void 0 === r && (r = {});
        var n = v(e, t, void 0, o({
            NAVTYPE: "back"
          }, r)),
          a = o(o({}, r), {
            path: n.path,
            query: n.query,
            delta: t
          });
        if ("[object Object]" === u.getDataType(r)) {
          var i = r,
            l = i.animationDuration,
            c = i.animationType;
          null != l && (a.animationDuration = l), null != c && (a.animationType = c);
          var s = r.from;
          null != s && (a.BACKTYPE = s);
        }
        return a;
      }
      function v(e, t, r, l) {
        void 0 === t && (t = 0), void 0 === l && (l = {});
        var c = {
          name: "",
          meta: {},
          path: "",
          fullPath: "",
          NAVTYPE: "",
          query: {},
          params: {},
          BACKTYPE: (r || {
            BACKTYPE: ""
          }).BACKTYPE || ""
        };
        if (19970806 === t) return c;
        if ("h5" === e.options.platform) {
          var s = {
            path: ""
          };
          s = null != r ? r : e.$route.currentRoute;
          var p = u.copyData(s.params);
          delete p.__id__;
          var f = i.parseQuery(o(o({}, p), u.copyData(s.query)), e);
          s = o(o({}, s), {
            query: f
          }), c.path = s.path, c.fullPath = s.fullPath || "", c.query = u.deepDecodeQuery(s.query || {}), c.NAVTYPE = a.rewriteMethodToggle[s.type || "reLaunch"];
        } else {
          var h = {};
          if (null != r) h = o(o({}, r), {
            openType: r.type
          });else {
            var v = u.getUniCachePage(t);
            if (0 === Object.keys(v).length) {
              var y = l.NAVTYPE,
                g = n(l, ["NAVTYPE"]),
                d = "不存在的页面栈，请确保有足够的页面可用，当前 level:" + t;
              throw e.options.routerErrorEach({
                type: 3,
                msg: d,
                NAVTYPE: y,
                level: t,
                uniActualData: g
              }, e), new Error(d);
            }
            var m = v.options || {};
            h = o(o({}, v.$page || {}), {
              query: u.deepDecodeQuery(m),
              fullPath: decodeURIComponent((v.$page || {}).fullPath || "/" + v.route)
            }), "app-plus" !== e.options.platform && (h.path = "/" + v.route);
          }
          var b = h.openType;
          c.query = h.query, c.path = h.path, c.fullPath = h.fullPath, c.NAVTYPE = a.rewriteMethodToggle[b || "reLaunch"];
        }
        var P = u.routesForMapRoute(e, c.path, ["finallyPathMap", "pathMap"]),
          O = o(o({}, c), P);
        return O.query = i.parseQuery(O.query, e), O;
      }
      t.lockNavjump = p, t.navjump = f, t.backOptionsBuild = h, t.forceGuardEach = function (e, t, r) {
        if (void 0 === t && (t = "replaceAll"), void 0 === r && (r = !1), "h5" === e.options.platform) throw new Error("在h5端上使用：forceGuardEach 是无意义的，目前 forceGuardEach 仅支持在非h5端上使用");
        var o = u.getUniCachePage(0);
        0 === Object.keys(o).length && e.options.routerErrorEach({
          type: 3,
          NAVTYPE: t,
          uniActualData: {},
          level: 0,
          msg: "不存在的页面栈，请确保有足够的页面可用，当前 level:0"
        }, e);
        var n = o,
          a = n.route,
          i = n.options;
        p({
          path: "/" + a,
          query: u.deepDecodeQuery(i || {})
        }, e, t, r);
      }, t.createRoute = v;
    },
    845: function _(e, t, r) {
      "use strict";

      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.resetPageHook = t.resetAndCallPageHook = t.proxyPageHook = t.createFullPath = t.createToFrom = void 0;
      var o = r(282),
        n = r(789),
        a = r(890),
        i = r(99);
      function u(e) {
        for (var t = e.proxyHookDeps, r = 0, o = Object.entries(t.hooks); r < o.length; r++) {
          (0, o[r][1].resetHook)();
        }
      }
      t.createToFrom = function (e, t) {
        var r = n.getUniCachePage(0);
        return "[object Array]" === n.getDataType(r) ? n.deepClone(e) : a.createRoute(t);
      }, t.createFullPath = function (e, t) {
        if (null == e.fullPath) {
          var r = i.stringifyQuery(e.query);
          e.fullPath = e.path + r;
        }
        null == t.fullPath && (r = i.stringifyQuery(t.query), t.fullPath = t.path + r);
      }, t.proxyPageHook = function (e, t, r) {
        for (var n = t.proxyHookDeps, a = e.$options, i = function i(_i) {
            var u = o.proxyHookName[_i],
              l = a[u];
            if (l) for (var c = function c(o) {
                if (l[o].toString().includes("UNI-SIMPLE-ROUTER")) return "continue";
                var a = Object.keys(n.hooks).length + 1,
                  i = function i() {
                    for (var e = [], t = 0; t < arguments.length; t++) {
                      e[t] = arguments[t];
                    }
                    n.resetIndex.push(a), n.options[a] = e;
                  },
                  u = l.splice(o, 1, i)[0];
                n.hooks[a] = {
                  proxyHook: i,
                  callHook: function callHook(o) {
                    if (t.enterPath.replace(/^\//, "") === o.replace(/^\//, "") || "app" === r) {
                      var i = n.options[a];
                      u.apply(e, i);
                    }
                  },
                  resetHook: function resetHook() {
                    l.splice(o, 1, u);
                  }
                };
              }, s = 0; s < l.length; s++) {
              c(s);
            }
          }, u = 0; u < o.proxyHookName.length; u++) {
          i(u);
        }
      }, t.resetAndCallPageHook = function (e, t, r) {
        void 0 === r && (r = !0);
        var o = t.trim().match(/^(\/?[^\?\s]+)(\?[\s\S]*$)?$/);
        if (null == o) throw new Error("还原hook失败。请检查 【" + t + "】 路径是否正确。");
        t = o[1];
        for (var n = e.proxyHookDeps, a = n.resetIndex, i = 0; i < a.length; i++) {
          var l = a[i];
          (0, n.hooks[l].callHook)(t);
        }
        r && u(e);
      }, t.resetPageHook = u;
    },
    99: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
        return (o = Object.assign || function (e) {
          for (var t, r = 1, o = arguments.length; r < o; r++) {
            for (var n in t = arguments[r]) {
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
          }
          return e;
        }).apply(this, arguments);
      };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.stringifyQuery = t.parseQuery = t.resolveQuery = t.queryPageToMap = void 0;
      var n = r(789),
        a = r(169),
        i = r(883),
        u = /[!'()*]/g,
        l = function l(e) {
          return "%" + e.charCodeAt(0).toString(16);
        },
        c = /%2C/g,
        s = function s(e) {
          return encodeURIComponent(e).replace(u, l).replace(c, ",");
        };
      t.queryPageToMap = function (e, t) {
        var r = {},
          i = "",
          u = e.success,
          l = e.fail;
        if ("[object Object]" === n.getDataType(e)) {
          var c = e;
          if (null != c.path) {
            var s = n.urlToJson(c.path),
              p = s.path,
              f = s.query;
            i = n.routesForMapRoute(t, p, ["finallyPathList", "pathMap"]), r = o(o({}, f), e.query || {}), c.path = p, c.query = r, delete e.params;
          } else null != c.name ? null == (i = t.routesMap.nameMap[c.name]) ? i = n.getWildcardRule(t, {
            type: 2,
            msg: "命名路由为：" + c.name + " 的路由，无法在路由表中找到！",
            toRule: e
          }) : (r = e.params || {}, delete e.query) : i = n.getWildcardRule(t, {
            type: 2,
            msg: e + " 解析失败，请检测当前路由表下是否有包含。",
            toRule: e
          });
        } else e = n.urlToJson(e), i = n.routesForMapRoute(t, e.path, ["finallyPathList", "pathMap"]), r = e.query;
        if ("h5" === t.options.platform) {
          n.getRoutePath(i, t).finallyPath.includes(":") && null == e.name && a.ERRORHOOK[0]({
            type: 2,
            msg: "当有设置 alias或者aliasPath 为动态路由时，不允许使用 path 跳转。请使用 name 跳转！",
            route: i
          }, t);
          var h = e.complete,
            v = e.success,
            y = e.fail;
          if ("[object Function]" === n.getDataType(h)) {
            var g = function g(e, t) {
              "[object Function]" === n.getDataType(t) && t.apply(this, e), h.apply(this, e);
            };
            u = function u() {
              for (var e = [], t = 0; t < arguments.length; t++) {
                e[t] = arguments[t];
              }
              g.call(this, e, v);
            }, l = function l() {
              for (var e = [], t = 0; t < arguments.length; t++) {
                e[t] = arguments[t];
              }
              g.call(this, e, y);
            };
          }
        }
        var d = e;
        return "[object Function]" === n.getDataType(d.success) && (d.success = u), "[object Function]" === n.getDataType(d.fail) && (d.fail = l), {
          rule: d,
          route: i,
          query: r
        };
      }, t.resolveQuery = function (e, t) {
        var r = "query";
        null != e.params && (r = "params"), null != e.query && (r = "query");
        var o = n.copyData(e[r] || {}),
          a = t.options.resolveQuery;
        if (a) {
          var u = a(o);
          "[object Object]" !== n.getDataType(u) ? i.warn("请按格式返回参数： resolveQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}", t) : e[r] = u;
        } else {
          if (!n.assertDeepObject(o)) return e;
          var l = JSON.stringify(o);
          e[r] = {
            query: l
          };
        }
        return e;
      }, t.parseQuery = function (e, t) {
        var r = t.options.parseQuery;
        if (r) e = r(n.copyData(e)), "[object Object]" !== n.getDataType(e) && i.warn("请按格式返回参数： parseQuery?:(jsonQuery:{[propName: string]: any;})=>{[propName: string]: any;}", t);else if (Reflect.get(e, "query")) {
          var o = Reflect.get(e, "query");
          if ("string" == typeof o) try {
            o = JSON.parse(o);
          } catch (e) {
            i.warn("尝试解析深度对象失败，按原样输出。" + e, t);
          }
          if ("object" == _typeof(o)) return n.deepDecodeQuery(o);
        }
        return e;
      }, t.stringifyQuery = function (e) {
        var t = e ? Object.keys(e).map(function (t) {
          var r = e[t];
          if (void 0 === r) return "";
          if (null === r) return s(t);
          if (Array.isArray(r)) {
            var o = [];
            return r.forEach(function (e) {
              void 0 !== e && (null === e ? o.push(s(t)) : o.push(s(t) + "=" + s(e)));
            }), o.join("&");
          }
          return s(t) + "=" + s(r);
        }).filter(function (e) {
          return e.length > 0;
        }).join("&") : null;
        return t ? "?" + t : "";
      };
    },
    314: function _(e, t, r) {
      "use strict";

      var o = this && this.__awaiter || function (e, t, r, o) {
          return new (r || (r = Promise))(function (n, a) {
            function i(e) {
              try {
                l(o.next(e));
              } catch (e) {
                a(e);
              }
            }
            function u(e) {
              try {
                l(o.throw(e));
              } catch (e) {
                a(e);
              }
            }
            function l(e) {
              var t;
              e.done ? n(e.value) : (t = e.value, t instanceof r ? t : new r(function (e) {
                e(t);
              })).then(i, u);
            }
            l((o = o.apply(e, t || [])).next());
          });
        },
        n = this && this.__generator || function (e, t) {
          var r,
            o,
            n,
            a,
            i = {
              label: 0,
              sent: function sent() {
                if (1 & n[0]) throw n[1];
                return n[1];
              },
              trys: [],
              ops: []
            };
          return a = {
            next: u(0),
            throw: u(1),
            return: u(2)
          }, "function" == typeof Symbol && (a[Symbol.iterator] = function () {
            return this;
          }), a;
          function u(a) {
            return function (u) {
              return function (a) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; i;) {
                  try {
                    if (r = 1, o && (n = 2 & a[0] ? o.return : a[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, a[1])).done) return n;
                    switch (o = 0, n && (a = [2 & a[0], n.value]), a[0]) {
                      case 0:
                      case 1:
                        n = a;
                        break;
                      case 4:
                        return i.label++, {
                          value: a[1],
                          done: !1
                        };
                      case 5:
                        i.label++, o = a[1], a = [0];
                        continue;
                      case 7:
                        a = i.ops.pop(), i.trys.pop();
                        continue;
                      default:
                        if (!((n = (n = i.trys).length > 0 && n[n.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                          i = 0;
                          continue;
                        }
                        if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {
                          i.label = a[1];
                          break;
                        }
                        if (6 === a[0] && i.label < n[1]) {
                          i.label = n[1], n = a;
                          break;
                        }
                        if (n && i.label < n[2]) {
                          i.label = n[2], i.ops.push(a);
                          break;
                        }
                        n[2] && i.ops.pop(), i.trys.pop();
                        continue;
                    }
                    a = t.call(e, i);
                  } catch (e) {
                    a = [6, e], o = 0;
                  } finally {
                    r = n = 0;
                  }
                }
                if (5 & a[0]) throw a[1];
                return {
                  value: a[0] ? a[1] : void 0,
                  done: !0
                };
              }([a, u]);
            };
          }
        };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.rewriteMethod = void 0;
      var a = r(366),
        i = r(789),
        u = r(883),
        l = r(809),
        c = r(814),
        s = ["navigateTo", "redirectTo", "reLaunch", "switchTab", "navigateBack"],
        p = {
          navigateTo: function navigateTo() {},
          redirectTo: function redirectTo() {},
          reLaunch: function reLaunch() {},
          switchTab: function switchTab() {},
          navigateBack: function navigateBack() {}
        };
      t.rewriteMethod = function (e) {
        !1 === e.options.keepUniOriginNav && s.forEach(function (t) {
          var r = uni[t];
          p[t] = r, uni[t] = function (s, f, h, v) {
            return void 0 === f && (f = !1), o(this, void 0, void 0, function () {
              return n(this, function (o) {
                switch (o.label) {
                  case 0:
                    return f ? "app-plus" !== e.options.platform ? [3, 2] : [4, c.HomeNvueSwitchTab(e, s, p.reLaunch)] : [3, 3];
                  case 1:
                    o.sent(), o.label = 2;
                  case 2:
                    return l.uniOriginJump(e, r, t, s, h, v), [3, 4];
                  case 3:
                    "app-plus" === e.options.platform && 0 === Object.keys(e.appMain).length && (e.appMain = {
                      NAVTYPE: t,
                      path: s.url
                    }), function (e, t, r) {
                      if ("app-plus" === r.options.platform) {
                        var o = null;
                        e && (o = e.openType), null != o && "appLaunch" === o && (t = "reLaunch");
                      }
                      if ("reLaunch" === t && '{"url":"/"}' === JSON.stringify(e) && (u.warn("uni-app 原生方法：reLaunch({url:'/'}) 默认被重写啦！你可以使用 this.$Router.replaceAll() 或者 uni.reLaunch({url:'/?xxx=xxx'})", r), t = "navigateBack", e = {
                        from: "backbutton"
                      }), "navigateBack" === t) {
                        var n = 1;
                        null == e && (e = {
                          delta: 1
                        }), "[object Number]" === i.getDataType(e.delta) && (n = e.delta), r.back(n, e);
                      } else {
                        var l = a.rewriteMethodToggle[t],
                          c = e.url;
                        if (!c.startsWith("/")) {
                          var s = i.resolveAbsolutePath(c, r);
                          c = s, e.url = s;
                        }
                        if ("switchTab" === t) {
                          var p = i.routesForMapRoute(r, c, ["pathMap", "finallyPathList"]),
                            f = i.getRoutePath(p, r).finallyPath;
                          if ("[object Array]" === i.getDataType(f) && u.warn("uni-app 原生方法跳转路径为：" + c + "。此路为是tab页面时，不允许设置 alias 为数组的情况，并且不能为动态路由！当然你可以通过通配符*解决！", r), "*" === f && u.warn("uni-app 原生方法跳转路径为：" + c + "。在路由表中找不到相关路由表！当然你可以通过通配符*解决！", r), "h5" === r.options.platform) {
                            var h = e.success;
                            e.success = function () {
                              for (var t = [], r = 0; r < arguments.length; r++) {
                                t[r] = arguments[r];
                              }
                              null == h || h.apply(null, t), i.timeOut(150).then(function () {
                                var t = e.detail || {};
                                if (Object.keys(t).length > 0 && Reflect.has(t, "index")) {
                                  var r = i.getUniCachePage(0);
                                  if (0 === Object.keys(r).length) return !1;
                                  var o = r,
                                    n = o.$options.onTabItemTap;
                                  if (n) for (var a = 0; a < n.length; a++) {
                                    n[a].call(o, t);
                                  }
                                }
                              });
                            };
                          }
                          c = f;
                        }
                        var v = e,
                          y = v.events,
                          g = v.success,
                          d = v.fail,
                          m = v.complete,
                          b = v.animationType,
                          P = {
                            path: c,
                            events: y,
                            success: g,
                            fail: d,
                            complete: m,
                            animationDuration: v.animationDuration,
                            animationType: b
                          };
                        r[l](i.notDeepClearNull(P));
                      }
                    }(s, t, e), o.label = 4;
                  case 4:
                    return [2];
                }
              });
            });
          };
        });
      };
    },
    963: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
        return (o = Object.assign || function (e) {
          for (var t, r = 1, o = arguments.length; r < o; r++) {
            for (var n in t = arguments[r]) {
              Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
            }
          }
          return e;
        }).apply(this, arguments);
      };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.createRouter = t.RouterMount = void 0;
      var n = r(282),
        a = r(789),
        i = r(662),
        u = r(460),
        l = r(890),
        c = r(314),
        s = function s() {},
        p = new Promise(function (e) {
          return s = e;
        });
      t.createRouter = function (e) {
        var t = a.assertNewOptions(e),
          r = {
            options: t,
            mount: [],
            runId: 0,
            Vue: null,
            proxyHookDeps: n.proxyHookDeps,
            appMain: {},
            enterPath: "",
            $route: null,
            $lockStatus: !1,
            routesMap: {},
            lifeCycle: i.registerRouterHooks(n.lifeCycle, t),
            push: function push(e) {
              l.lockNavjump(e, r, "push");
            },
            replace: function replace(e) {
              l.lockNavjump(e, r, "replace");
            },
            replaceAll: function replaceAll(e) {
              l.lockNavjump(e, r, "replaceAll");
            },
            pushTab: function pushTab(e) {
              l.lockNavjump(e, r, "pushTab");
            },
            back: function back(e, t) {
              void 0 === e && (e = 1), "[object Object]" !== a.getDataType(t) ? t = {
                from: "navigateBack"
              } : Reflect.has(t, "from") || (t = o(o({}, t), {
                from: "navigateBack"
              })), l.lockNavjump(e + "", r, "back", void 0, t);
            },
            forceGuardEach: function forceGuardEach(e, t) {
              l.forceGuardEach(r, e, t);
            },
            beforeEach: function beforeEach(e) {
              i.registerEachHooks(r, "beforeHooks", e);
            },
            afterEach: function afterEach(e) {
              i.registerEachHooks(r, "afterHooks", e);
            },
            install: function install(e) {
              r.Vue = e, c.rewriteMethod(this), u.initMixins(e, this), Object.defineProperty(e.prototype, "$Router", {
                get: function get() {
                  var e = r;
                  return Object.defineProperty(this, "$Router", {
                    value: e,
                    writable: !1,
                    configurable: !1,
                    enumerable: !1
                  }), Object.seal(e);
                }
              }), Object.defineProperty(e.prototype, "$Route", {
                get: function get() {
                  return l.createRoute(r);
                }
              }), Object.defineProperty(e.prototype, "$AppReady", {
                get: function get() {
                  return "h5" === r.options.platform ? Promise.resolve() : p;
                },
                set: function set(e) {
                  !0 === e && s();
                }
              });
            }
          };
        return a.def(r, "currentRoute", function () {
          return l.createRoute(r);
        }), r.beforeEach(function (e, t, r) {
          return r();
        }), r.afterEach(function () {}), r;
      }, t.RouterMount = function (e, t, r) {
        if (void 0 === r && (r = "#app"), "[object Array]" !== a.getDataType(t.mount)) throw new Error("挂载路由失败，router.app 应该为数组类型。当前类型：" + _typeof(t.mount));
        if (t.mount.push({
          app: e,
          el: r
        }), "h5" === t.options.platform) {
          var o = t.$route;
          o.replace({
            path: o.currentRoute.fullPath
          });
        }
      };
    },
    809: function _(e, t, r) {
      "use strict";

      var o = this && this.__assign || function () {
          return (o = Object.assign || function (e) {
            for (var t, r = 1, o = arguments.length; r < o; r++) {
              for (var n in t = arguments[r]) {
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
              }
            }
            return e;
          }).apply(this, arguments);
        },
        n = this && this.__awaiter || function (e, t, r, o) {
          return new (r || (r = Promise))(function (n, a) {
            function i(e) {
              try {
                l(o.next(e));
              } catch (e) {
                a(e);
              }
            }
            function u(e) {
              try {
                l(o.throw(e));
              } catch (e) {
                a(e);
              }
            }
            function l(e) {
              var t;
              e.done ? n(e.value) : (t = e.value, t instanceof r ? t : new r(function (e) {
                e(t);
              })).then(i, u);
            }
            l((o = o.apply(e, t || [])).next());
          });
        },
        a = this && this.__generator || function (e, t) {
          var r,
            o,
            n,
            a,
            i = {
              label: 0,
              sent: function sent() {
                if (1 & n[0]) throw n[1];
                return n[1];
              },
              trys: [],
              ops: []
            };
          return a = {
            next: u(0),
            throw: u(1),
            return: u(2)
          }, "function" == typeof Symbol && (a[Symbol.iterator] = function () {
            return this;
          }), a;
          function u(a) {
            return function (u) {
              return function (a) {
                if (r) throw new TypeError("Generator is already executing.");
                for (; i;) {
                  try {
                    if (r = 1, o && (n = 2 & a[0] ? o.return : a[0] ? o.throw || ((n = o.return) && n.call(o), 0) : o.next) && !(n = n.call(o, a[1])).done) return n;
                    switch (o = 0, n && (a = [2 & a[0], n.value]), a[0]) {
                      case 0:
                      case 1:
                        n = a;
                        break;
                      case 4:
                        return i.label++, {
                          value: a[1],
                          done: !1
                        };
                      case 5:
                        i.label++, o = a[1], a = [0];
                        continue;
                      case 7:
                        a = i.ops.pop(), i.trys.pop();
                        continue;
                      default:
                        if (!((n = (n = i.trys).length > 0 && n[n.length - 1]) || 6 !== a[0] && 2 !== a[0])) {
                          i = 0;
                          continue;
                        }
                        if (3 === a[0] && (!n || a[1] > n[0] && a[1] < n[3])) {
                          i.label = a[1];
                          break;
                        }
                        if (6 === a[0] && i.label < n[1]) {
                          i.label = n[1], n = a;
                          break;
                        }
                        if (n && i.label < n[2]) {
                          i.label = n[2], i.ops.push(a);
                          break;
                        }
                        n[2] && i.ops.pop(), i.trys.pop();
                        continue;
                    }
                    a = t.call(e, i);
                  } catch (e) {
                    a = [6, e], o = 0;
                  } finally {
                    r = n = 0;
                  }
                }
                if (5 & a[0]) throw a[1];
                return {
                  value: a[0] ? a[1] : void 0,
                  done: !0
                };
              }([a, u]);
            };
          }
        },
        i = this && this.__rest || function (e, t) {
          var r = {};
          for (var o in e) {
            Object.prototype.hasOwnProperty.call(e, o) && t.indexOf(o) < 0 && (r[o] = e[o]);
          }
          if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
            var n = 0;
            for (o = Object.getOwnPropertySymbols(e); n < o.length; n++) {
              t.indexOf(o[n]) < 0 && Object.prototype.propertyIsEnumerable.call(e, o[n]) && (r[o[n]] = e[o[n]]);
            }
          }
          return r;
        };
      Object.defineProperty(t, "__esModule", {
        value: !0
      }), t.formatOriginURLQuery = t.uniOriginJump = void 0;
      var u = r(99),
        l = r(789),
        c = r(282),
        s = r(845),
        p = 0,
        f = "reLaunch";
      function h(e, t, r) {
        var n,
          a = t.url,
          i = t.path,
          c = t.query,
          s = t.animationType,
          p = t.animationDuration,
          f = t.events,
          h = t.success,
          v = t.fail,
          y = t.complete,
          g = t.delta,
          d = t.animation,
          m = u.stringifyQuery(c || {}),
          b = "" === m ? i || a : (i || a) + m,
          P = {};
        return "app-plus" === e.options.platform && "navigateBack" !== r && (P = (null === (n = e.options.APP) || void 0 === n ? void 0 : n.animation) || {}, P = o(o({}, P), d || {})), l.notDeepClearNull({
          delta: g,
          url: b,
          animationType: s || P.animationType,
          animationDuration: p || P.animationDuration,
          events: f,
          success: h,
          fail: v,
          complete: y
        });
      }
      t.uniOriginJump = function (e, t, r, u, v, y) {
        var g = h(e, u, r),
          d = g.complete,
          m = i(g, ["complete"]),
          b = e.options.platform;
        null != y && !1 === y ? (0 === p && (p++, "h5" !== b && (s.resetAndCallPageHook(e, m.url), e.Vue.prototype.$AppReady = !0)), d && d.apply(null, {
          msg: "forceGuardEach强制触发并且不执行跳转"
        }), v && v.apply(null, {
          msg: "forceGuardEach强制触发并且不执行跳转"
        })) : (0 === p && ("app-plus" === b ? s.resetAndCallPageHook(e, m.url) : new RegExp(c.mpPlatformReg, "g").test(b) && s.resetAndCallPageHook(e, m.url, !1)), t(o(o({}, m), {
          from: u.BACKTYPE,
          complete: function complete() {
            for (var t, o, i, u, h = [], y = 0; y < arguments.length; y++) {
              h[y] = arguments[y];
            }
            return n(this, void 0, void 0, function () {
              var n, y, g;
              return a(this, function (a) {
                switch (a.label) {
                  case 0:
                    return 0 === p && (p++, "h5" !== b && (new RegExp(c.mpPlatformReg, "g").test(b) && s.resetPageHook(e), e.Vue.prototype.$AppReady = !0, "app-plus" === b && ((n = plus.nativeObj.View.getViewById("router-loadding")) && n.close(), (y = null === (t = e.options.APP) || void 0 === t ? void 0 : t.launchedHook) && y()))), g = 0, new RegExp(c.mpPlatformReg, "g").test(b) ? g = null === (o = e.options.applet) || void 0 === o ? void 0 : o.animationDuration : "app-plus" === b && "navigateBack" === r && "navigateTo" === f && (g = null === (u = null === (i = e.options.APP) || void 0 === i ? void 0 : i.animation) || void 0 === u ? void 0 : u.animationDuration), "navigateTo" !== r && "navigateBack" !== r || 0 === g ? [3, 2] : [4, l.timeOut(g)];
                  case 1:
                    a.sent(), a.label = 2;
                  case 2:
                    return f = r, d && d.apply(null, h), v && v.apply(null, h), [2];
                }
              });
            });
          }
        })));
      }, t.formatOriginURLQuery = h;
    }
  }, t = {}, function r(o) {
    if (t[o]) return t[o].exports;
    var n = t[o] = {
      exports: {}
    };
    return e[o].call(n.exports, n, n.exports, r), n.exports;
  }(607);
  var e, t;
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"], __webpack_require__(/*! ./../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/webpack/buildin/module.js */ 39)(module)))

/***/ }),
/* 39 */
/*!***********************************!*\
  !*** (webpack)/buildin/module.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 40 */
/*!*****************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/index.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _mixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mixin.js */ 41));
var _mpMixin = _interopRequireDefault(__webpack_require__(/*! ./libs/mixin/mpMixin.js */ 42));
var _luchRequest = _interopRequireDefault(__webpack_require__(/*! ./libs/luch-request */ 43));
var _route = _interopRequireDefault(__webpack_require__(/*! ./libs/util/route.js */ 61));
var _colorGradient = _interopRequireDefault(__webpack_require__(/*! ./libs/function/colorGradient.js */ 65));
var _test = _interopRequireDefault(__webpack_require__(/*! ./libs/function/test.js */ 66));
var _debounce = _interopRequireDefault(__webpack_require__(/*! ./libs/function/debounce.js */ 67));
var _throttle = _interopRequireDefault(__webpack_require__(/*! ./libs/function/throttle.js */ 68));
var _index = _interopRequireDefault(__webpack_require__(/*! ./libs/function/index.js */ 69));
var _config = _interopRequireDefault(__webpack_require__(/*! ./libs/config/config.js */ 72));
var _props = _interopRequireDefault(__webpack_require__(/*! ./libs/config/props.js */ 73));
var _zIndex = _interopRequireDefault(__webpack_require__(/*! ./libs/config/zIndex.js */ 163));
var _color = _interopRequireDefault(__webpack_require__(/*! ./libs/config/color.js */ 121));
var _platform = _interopRequireDefault(__webpack_require__(/*! ./libs/function/platform */ 164));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// 看到此报错，是因为没有配置vue.config.js的【transpileDependencies】，详见：https://www.uviewui.com/components/npmSetting.html#_5-cli模式额外配置
var pleaseSetTranspileDependencies = {},
  babelTest = pleaseSetTranspileDependencies === null || pleaseSetTranspileDependencies === void 0 ? void 0 : pleaseSetTranspileDependencies.test;

// 引入全局mixin

var $u = _objectSpread(_objectSpread({
  route: _route.default,
  date: _index.default.timeFormat,
  // 另名date
  colorGradient: _colorGradient.default.colorGradient,
  hexToRgb: _colorGradient.default.hexToRgb,
  rgbToHex: _colorGradient.default.rgbToHex,
  colorToRgba: _colorGradient.default.colorToRgba,
  test: _test.default,
  type: ['primary', 'success', 'error', 'warning', 'info'],
  http: new _luchRequest.default(),
  config: _config.default,
  // uView配置信息相关，比如版本号
  zIndex: _zIndex.default,
  debounce: _debounce.default,
  throttle: _throttle.default,
  mixin: _mixin.default,
  mpMixin: _mpMixin.default,
  props: _props.default
}, _index.default), {}, {
  color: _color.default,
  platform: _platform.default
});

// $u挂载到uni对象上
uni.$u = $u;
var install = function install(Vue) {
  // 时间格式化，同时两个名称，date和timeFormat
  Vue.filter('timeFormat', function (timestamp, format) {
    return uni.$u.timeFormat(timestamp, format);
  });
  Vue.filter('date', function (timestamp, format) {
    return uni.$u.timeFormat(timestamp, format);
  });
  // 将多久以前的方法，注入到全局过滤器
  Vue.filter('timeFrom', function (timestamp, format) {
    return uni.$u.timeFrom(timestamp, format);
  });
  // 同时挂载到uni和Vue.prototype中

  // 只有vue，挂载到Vue.prototype才有意义，因为nvue中全局Vue.prototype和Vue.mixin是无效的
  Vue.prototype.$u = $u;
  Vue.mixin(_mixin.default);
};
var _default = {
  install: install
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 41 */
/*!****************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/mixin/mixin.js ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {module.exports = {
  // 定义每个组件都可能需要用到的外部样式以及类名
  props: {
    // 每个组件都有的父组件传递的样式，可以为字符串或者对象形式
    customStyle: {
      type: [Object, String],
      default: function _default() {
        return {};
      }
    },
    customClass: {
      type: String,
      default: ''
    },
    // 跳转的页面路径
    url: {
      type: String,
      default: ''
    },
    // 页面跳转的类型
    linkType: {
      type: String,
      default: 'navigateTo'
    }
  },
  data: function data() {
    return {};
  },
  onLoad: function onLoad() {
    // getRect挂载到$u上，因为这方法需要使用in(this)，所以无法把它独立成一个单独的文件导出
    this.$u.getRect = this.$uGetRect;
  },
  created: function created() {
    // 组件当中，只有created声明周期，为了能在组件使用，故也在created中将方法挂载到$u
    this.$u.getRect = this.$uGetRect;
  },
  computed: {
    // 在2.x版本中，将会把$u挂载到uni对象下，导致在模板中无法使用uni.$u.xxx形式
    // 所以这里通过computed计算属性将其附加到this.$u上，就可以在模板或者js中使用uni.$u.xxx
    // 只在nvue环境通过此方式引入完整的$u，其他平台会出现性能问题，非nvue则按需引入（主要原因是props过大）
    $u: function $u() {
      // 在非nvue端，移除props，http，mixin等对象，避免在小程序setData时数据过大影响性能
      return uni.$u.deepMerge(uni.$u, {
        props: undefined,
        http: undefined,
        mixin: undefined
      });
    },
    /**
     * 生成bem规则类名
     * 由于微信小程序，H5，nvue之间绑定class的差异，无法通过:class="[bem()]"的形式进行同用
     * 故采用如下折中做法，最后返回的是数组（一般平台）或字符串（支付宝和字节跳动平台），类似['a', 'b', 'c']或'a b c'的形式
     * @param {String} name 组件名称
     * @param {Array} fixed 一直会存在的类名
     * @param {Array} change 会根据变量值为true或者false而出现或者隐藏的类名
     * @returns {Array|string}
     */
    bem: function bem() {
      return function (name, fixed, change) {
        var _this = this;
        // 类名前缀
        var prefix = "u-".concat(name, "--");
        var classes = {};
        if (fixed) {
          fixed.map(function (item) {
            // 这里的类名，会一直存在
            classes[prefix + _this[item]] = true;
          });
        }
        if (change) {
          change.map(function (item) {
            // 这里的类名，会根据this[item]的值为true或者false，而进行添加或者移除某一个类
            _this[item] ? classes[prefix + item] = _this[item] : delete classes[prefix + item];
          });
        }
        return Object.keys(classes);
        // 支付宝，头条小程序无法动态绑定一个数组类名，否则解析出来的结果会带有","，而导致失效
      };
    }
  },

  methods: {
    // 跳转某一个页面
    openPage: function openPage() {
      var urlKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'url';
      var url = this[urlKey];
      if (url) {
        // 执行类似uni.navigateTo的方法
        uni[this.linkType]({
          url: url
        });
      }
    },
    // 查询节点信息
    // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
    // 解决办法为在组件根部再套一个没有任何作用的view元素
    $uGetRect: function $uGetRect(selector, all) {
      var _this2 = this;
      return new Promise(function (resolve) {
        uni.createSelectorQuery().in(_this2)[all ? 'selectAll' : 'select'](selector).boundingClientRect(function (rect) {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }
          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    },
    getParentData: function getParentData() {
      var _this3 = this;
      var parentName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
      // 避免在created中去定义parent变量
      if (!this.parent) this.parent = {};
      // 这里的本质原理是，通过获取父组件实例(也即类似u-radio的父组件u-radio-group的this)
      // 将父组件this中对应的参数，赋值给本组件(u-radio的this)的parentData对象中对应的属性
      // 之所以需要这么做，是因为所有端中，头条小程序不支持通过this.parent.xxx去监听父组件参数的变化
      // 此处并不会自动更新子组件的数据，而是依赖父组件u-radio-group去监听data的变化，手动调用更新子组件的方法去重新获取
      this.parent = uni.$u.$parent.call(this, parentName);
      if (this.parent.children) {
        // 如果父组件的children不存在本组件的实例，才将本实例添加到父组件的children中
        this.parent.children.indexOf(this) === -1 && this.parent.children.push(this);
      }
      if (this.parent && this.parentData) {
        // 历遍parentData中的属性，将parent中的同名属性赋值给parentData
        Object.keys(this.parentData).map(function (key) {
          _this3.parentData[key] = _this3.parent[key];
        });
      }
    },
    // 阻止事件冒泡
    preventEvent: function preventEvent(e) {
      e && typeof e.stopPropagation === 'function' && e.stopPropagation();
    },
    // 空操作
    noop: function noop(e) {
      this.preventEvent(e);
    }
  },
  onReachBottom: function onReachBottom() {
    uni.$emit('uOnReachBottom');
  },
  beforeDestroy: function beforeDestroy() {
    var _this4 = this;
    // 判断当前页面是否存在parent和chldren，一般在checkbox和checkbox-group父子联动的场景会有此情况
    // 组件销毁时，移除子组件在父组件children数组中的实例，释放资源，避免数据混乱
    if (this.parent && uni.$u.test.array(this.parent.children)) {
      // 组件销毁时，移除父组件中的children数组中对应的实例
      var childrenList = this.parent.children;
      childrenList.map(function (child, index) {
        // 如果相等，则移除
        if (child === _this4) {
          childrenList.splice(index, 1);
        }
      });
    }
  }
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 42 */
/*!******************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/mixin/mpMixin.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  // 将自定义节点设置成虚拟的，更加接近Vue组件的表现，能更好的使用flex属性
  options: {
    virtualHost: true
  }
};
exports.default = _default;

/***/ }),
/* 43 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/index.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Request = _interopRequireDefault(__webpack_require__(/*! ./core/Request */ 44));
var _default = _Request.default;
exports.default = _default;

/***/ }),
/* 44 */
/*!******************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/core/Request.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
var _dispatchRequest = _interopRequireDefault(__webpack_require__(/*! ./dispatchRequest */ 45));
var _InterceptorManager = _interopRequireDefault(__webpack_require__(/*! ./InterceptorManager */ 53));
var _mergeConfig = _interopRequireDefault(__webpack_require__(/*! ./mergeConfig */ 54));
var _defaults = _interopRequireDefault(__webpack_require__(/*! ./defaults */ 55));
var _utils = __webpack_require__(/*! ../utils */ 48);
var _clone = _interopRequireDefault(__webpack_require__(/*! ../utils/clone */ 56));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Request = /*#__PURE__*/function () {
  /**
  * @param {Object} arg - 全局配置
  * @param {String} arg.baseURL - 全局根路径
  * @param {Object} arg.header - 全局header
  * @param {String} arg.method = [GET|POST|PUT|DELETE|CONNECT|HEAD|OPTIONS|TRACE] - 全局默认请求方式
  * @param {String} arg.dataType = [json] - 全局默认的dataType
  * @param {String} arg.responseType = [text|arraybuffer] - 全局默认的responseType。支付宝小程序不支持
  * @param {Object} arg.custom - 全局默认的自定义参数
  * @param {Number} arg.timeout - 全局默认的超时时间，单位 ms。默认60000。H5(HBuilderX 2.9.9+)、APP(HBuilderX 2.9.9+)、微信小程序（2.10.0）、支付宝小程序
  * @param {Boolean} arg.sslVerify - 全局默认的是否验证 ssl 证书。默认true.仅App安卓端支持（HBuilderX 2.3.3+）
  * @param {Boolean} arg.withCredentials - 全局默认的跨域请求时是否携带凭证（cookies）。默认false。仅H5支持（HBuilderX 2.6.15+）
  * @param {Boolean} arg.firstIpv4 - 全DNS解析时优先使用ipv4。默认false。仅 App-Android 支持 (HBuilderX 2.8.0+)
  * @param {Function(statusCode):Boolean} arg.validateStatus - 全局默认的自定义验证器。默认statusCode >= 200 && statusCode < 300
  */
  function Request() {
    var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0, _classCallCheck2.default)(this, Request);
    if (!(0, _utils.isPlainObject)(arg)) {
      arg = {};
      console.warn('设置全局参数必须接收一个Object');
    }
    this.config = (0, _clone.default)(_objectSpread(_objectSpread({}, _defaults.default), arg));
    this.interceptors = {
      request: new _InterceptorManager.default(),
      response: new _InterceptorManager.default()
    };
  }

  /**
  * @Function
  * @param {Request~setConfigCallback} f - 设置全局默认配置
  */
  (0, _createClass2.default)(Request, [{
    key: "setConfig",
    value: function setConfig(f) {
      this.config = f(this.config);
    }
  }, {
    key: "middleware",
    value: function middleware(config) {
      config = (0, _mergeConfig.default)(this.config, config);
      var chain = [_dispatchRequest.default, undefined];
      var promise = Promise.resolve(config);
      this.interceptors.request.forEach(function (interceptor) {
        chain.unshift(interceptor.fulfilled, interceptor.rejected);
      });
      this.interceptors.response.forEach(function (interceptor) {
        chain.push(interceptor.fulfilled, interceptor.rejected);
      });
      while (chain.length) {
        promise = promise.then(chain.shift(), chain.shift());
      }
      return promise;
    }

    /**
    * @Function
    * @param {Object} config - 请求配置项
    * @prop {String} options.url - 请求路径
    * @prop {Object} options.data - 请求参数
    * @prop {Object} [options.responseType = config.responseType] [text|arraybuffer] - 响应的数据类型
    * @prop {Object} [options.dataType = config.dataType] - 如果设为 json，会尝试对返回的数据做一次 JSON.parse
    * @prop {Object} [options.header = config.header] - 请求header
    * @prop {Object} [options.method = config.method] - 请求方法
    * @returns {Promise<unknown>}
    */
  }, {
    key: "request",
    value: function request() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      return this.middleware(config);
    }
  }, {
    key: "get",
    value: function get(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return this.middleware(_objectSpread({
        url: url,
        method: 'GET'
      }, options));
    }
  }, {
    key: "post",
    value: function post(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'POST'
      }, options));
    }
  }, {
    key: "put",
    value: function put(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'PUT'
      }, options));
    }
  }, {
    key: "delete",
    value: function _delete(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'DELETE'
      }, options));
    }
  }, {
    key: "connect",
    value: function connect(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'CONNECT'
      }, options));
    }
  }, {
    key: "head",
    value: function head(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'HEAD'
      }, options));
    }
  }, {
    key: "options",
    value: function options(url, data) {
      var _options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'OPTIONS'
      }, _options));
    }
  }, {
    key: "trace",
    value: function trace(url, data) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.middleware(_objectSpread({
        url: url,
        data: data,
        method: 'TRACE'
      }, options));
    }
  }, {
    key: "upload",
    value: function upload(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'UPLOAD';
      return this.middleware(config);
    }
  }, {
    key: "download",
    value: function download(url) {
      var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      config.url = url;
      config.method = 'DOWNLOAD';
      return this.middleware(config);
    }
  }]);
  return Request;
}();
/**
 * setConfig回调
 * @return {Object} - 返回操作后的config
 * @callback Request~setConfigCallback
 * @param {Object} config - 全局默认config
 */
exports.default = Request;

/***/ }),
/* 45 */
/*!**************************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/core/dispatchRequest.js ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _index = _interopRequireDefault(__webpack_require__(/*! ../adapters/index */ 46));
var _default = function _default(config) {
  return (0, _index.default)(config);
};
exports.default = _default;

/***/ }),
/* 46 */
/*!********************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/adapters/index.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _buildURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/buildURL */ 47));
var _buildFullPath = _interopRequireDefault(__webpack_require__(/*! ../core/buildFullPath */ 49));
var _settle = _interopRequireDefault(__webpack_require__(/*! ../core/settle */ 52));
var _utils = __webpack_require__(/*! ../utils */ 48);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 返回可选值存在的配置
 * @param {Array} keys - 可选值数组
 * @param {Object} config2 - 配置
 * @return {{}} - 存在的配置项
 */
var mergeKeys = function mergeKeys(keys, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    }
  });
  return config;
};
var _default = function _default(config) {
  return new Promise(function (resolve, reject) {
    var fullPath = (0, _buildURL.default)((0, _buildFullPath.default)(config.baseURL, config.url), config.params);
    var _config = {
      url: fullPath,
      header: config.header,
      complete: function complete(response) {
        config.fullPath = fullPath;
        response.config = config;
        try {
          // 对可能字符串不是json 的情况容错
          if (typeof response.data === 'string') {
            response.data = JSON.parse(response.data);
          }
          // eslint-disable-next-line no-empty
        } catch (e) {}
        (0, _settle.default)(resolve, reject, response);
      }
    };
    var requestTask;
    if (config.method === 'UPLOAD') {
      delete _config.header['content-type'];
      delete _config.header['Content-Type'];
      var otherConfig = {
        filePath: config.filePath,
        name: config.name
      };
      var optionalKeys = ['formData'];
      requestTask = uni.uploadFile(_objectSpread(_objectSpread(_objectSpread({}, _config), otherConfig), mergeKeys(optionalKeys, config)));
    } else if (config.method === 'DOWNLOAD') {
      requestTask = uni.downloadFile(_config);
    } else {
      var _optionalKeys = ['data', 'method', 'timeout', 'dataType', 'responseType'];
      requestTask = uni.request(_objectSpread(_objectSpread({}, _config), mergeKeys(_optionalKeys, config)));
    }
    if (config.getTask) {
      config.getTask(requestTask, config);
    }
  });
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 47 */
/*!**********************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/helpers/buildURL.js ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ 13);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildURL;
var utils = _interopRequireWildcard(__webpack_require__(/*! ../utils */ 48));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function encode(val) {
  return encodeURIComponent(val).replace(/%40/gi, '@').replace(/%3A/gi, ':').replace(/%24/g, '$').replace(/%2C/gi, ',').replace(/%20/g, '+').replace(/%5B/gi, '[').replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
function buildURL(url, params) {
  /* eslint no-param-reassign:0 */
  if (!params) {
    return url;
  }
  var serializedParams;
  if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];
    utils.forEach(params, function (val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }
      if (utils.isArray(val)) {
        key = "".concat(key, "[]");
      } else {
        val = [val];
      }
      utils.forEach(val, function (v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push("".concat(encode(key), "=").concat(encode(v)));
      });
    });
    serializedParams = parts.join('&');
  }
  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }
  return url;
}

/***/ }),
/* 48 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/utils.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// utils is a library of generic helper functions non-specific to axios
var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepMerge = deepMerge;
exports.forEach = forEach;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isObject = isObject;
exports.isPlainObject = isPlainObject;
exports.isURLSearchParams = isURLSearchParams;
exports.isUndefined = isUndefined;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && (0, _typeof2.default)(val) === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if ((0, _typeof2.default)(obj) !== 'object') {
    /* eslint no-param-reassign:0 */
    obj = [obj];
  }
  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * 是否为boolean 值
 * @param val
 * @returns {boolean}
 */
function isBoolean(val) {
  return typeof val === 'boolean';
}

/**
 * 是否为真正的对象{} new Object
 * @param {any} obj - 检测的对象
 * @returns {boolean}
 */
function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge( /* obj1, obj2, obj3, ... */
) {
  var result = {};
  function assignValue(val, key) {
    if ((0, _typeof2.default)(result[key]) === 'object' && (0, _typeof2.default)(val) === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if ((0, _typeof2.default)(val) === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }
  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
function isUndefined(val) {
  return typeof val === 'undefined';
}

/***/ }),
/* 49 */
/*!************************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/core/buildFullPath.js ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildFullPath;
var _isAbsoluteURL = _interopRequireDefault(__webpack_require__(/*! ../helpers/isAbsoluteURL */ 50));
var _combineURLs = _interopRequireDefault(__webpack_require__(/*! ../helpers/combineURLs */ 51));
/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !(0, _isAbsoluteURL.default)(requestedURL)) {
    return (0, _combineURLs.default)(baseURL, requestedURL);
  }
  return requestedURL;
}

/***/ }),
/* 50 */
/*!***************************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/helpers/isAbsoluteURL.js ***!
  \***************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isAbsoluteURL;
function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/***/ }),
/* 51 */
/*!*************************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/helpers/combineURLs.js ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = combineURLs;
function combineURLs(baseURL, relativeURL) {
  return relativeURL ? "".concat(baseURL.replace(/\/+$/, ''), "/").concat(relativeURL.replace(/^\/+/, '')) : baseURL;
}

/***/ }),
/* 52 */
/*!*****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/core/settle.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = settle;
/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  var status = response.statusCode;
  if (status && (!validateStatus || validateStatus(status))) {
    resolve(response);
  } else {
    reject(response);
  }
}

/***/ }),
/* 53 */
/*!*****************************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/core/InterceptorManager.js ***!
  \*****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  this.handlers.forEach(function (h) {
    if (h !== null) {
      fn(h);
    }
  });
};
var _default = InterceptorManager;
exports.default = _default;

/***/ }),
/* 54 */
/*!**********************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/core/mergeConfig.js ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _utils = __webpack_require__(/*! ../utils */ 48);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * 合并局部配置优先的配置，如果局部有该配置项则用局部，如果全局有该配置项则用全局
 * @param {Array} keys - 配置项
 * @param {Object} globalsConfig - 当前的全局配置
 * @param {Object} config2 - 局部配置
 * @return {{}}
 */
var mergeKeys = function mergeKeys(keys, globalsConfig, config2) {
  var config = {};
  keys.forEach(function (prop) {
    if (!(0, _utils.isUndefined)(config2[prop])) {
      config[prop] = config2[prop];
    } else if (!(0, _utils.isUndefined)(globalsConfig[prop])) {
      config[prop] = globalsConfig[prop];
    }
  });
  return config;
};
/**
 *
 * @param globalsConfig - 当前实例的全局配置
 * @param config2 - 当前的局部配置
 * @return - 合并后的配置
 */
var _default = function _default(globalsConfig) {
  var config2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var method = config2.method || globalsConfig.method || 'GET';
  var config = {
    baseURL: globalsConfig.baseURL || '',
    method: method,
    url: config2.url || '',
    params: config2.params || {},
    custom: _objectSpread(_objectSpread({}, globalsConfig.custom || {}), config2.custom || {}),
    header: (0, _utils.deepMerge)(globalsConfig.header || {}, config2.header || {})
  };
  var defaultToConfig2Keys = ['getTask', 'validateStatus'];
  config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultToConfig2Keys, globalsConfig, config2));

  // eslint-disable-next-line no-empty
  if (method === 'DOWNLOAD') {} else if (method === 'UPLOAD') {
    delete config.header['content-type'];
    delete config.header['Content-Type'];
    var uploadKeys = ['filePath', 'name', 'formData'];
    uploadKeys.forEach(function (prop) {
      if (!(0, _utils.isUndefined)(config2[prop])) {
        config[prop] = config2[prop];
      }
    });
  } else {
    var defaultsKeys = ['data', 'timeout', 'dataType', 'responseType'];
    config = _objectSpread(_objectSpread({}, config), mergeKeys(defaultsKeys, globalsConfig, config2));
  }
  return config;
};
exports.default = _default;

/***/ }),
/* 55 */
/*!*******************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/core/defaults.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 默认的全局配置
 */
var _default = {
  baseURL: '',
  header: {},
  method: 'GET',
  dataType: 'json',
  responseType: 'text',
  custom: {},
  timeout: 60000,
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};
exports.default = _default;

/***/ }),
/* 56 */
/*!*****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/luch-request/utils/clone.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/* eslint-disable */
var clone = function () {
  'use strict';

  function _instanceof(obj, type) {
    return type != null && obj instanceof type;
  }
  var nativeMap;
  try {
    nativeMap = Map;
  } catch (_) {
    // maybe a reference error because no `Map`. Give it a dummy value that no
    // value will ever be an instanceof.
    nativeMap = function nativeMap() {};
  }
  var nativeSet;
  try {
    nativeSet = Set;
  } catch (_) {
    nativeSet = function nativeSet() {};
  }
  var nativePromise;
  try {
    nativePromise = Promise;
  } catch (_) {
    nativePromise = function nativePromise() {};
  }

  /**
   * Clones (copies) an Object using deep copying.
   *
   * This function supports circular references by default, but if you are certain
   * there are no circular references in your object, you can save some CPU time
   * by calling clone(obj, false).
   *
   * Caution: if `circular` is false and `parent` contains circular references,
   * your program may enter an infinite loop and crash.
   *
   * @param `parent` - the object to be cloned
   * @param `circular` - set to true if the object to be cloned may contain
   *    circular references. (optional - true by default)
   * @param `depth` - set to a number if the object is only to be cloned to
   *    a particular depth. (optional - defaults to Infinity)
   * @param `prototype` - sets the prototype to be used when cloning an object.
   *    (optional - defaults to parent prototype).
   * @param `includeNonEnumerable` - set to true if the non-enumerable properties
   *    should be cloned as well. Non-enumerable properties on the prototype
   *    chain will be ignored. (optional - false by default)
   */
  function clone(parent, circular, depth, prototype, includeNonEnumerable) {
    if ((0, _typeof2.default)(circular) === 'object') {
      depth = circular.depth;
      prototype = circular.prototype;
      includeNonEnumerable = circular.includeNonEnumerable;
      circular = circular.circular;
    }
    // maintain two arrays for circular references, where corresponding parents
    // and children have the same index
    var allParents = [];
    var allChildren = [];
    var useBuffer = typeof Buffer != 'undefined';
    if (typeof circular == 'undefined') circular = true;
    if (typeof depth == 'undefined') depth = Infinity;

    // recurse this function so we don't reset allParents and allChildren
    function _clone(parent, depth) {
      // cloning null always returns null
      if (parent === null) return null;
      if (depth === 0) return parent;
      var child;
      var proto;
      if ((0, _typeof2.default)(parent) != 'object') {
        return parent;
      }
      if (_instanceof(parent, nativeMap)) {
        child = new nativeMap();
      } else if (_instanceof(parent, nativeSet)) {
        child = new nativeSet();
      } else if (_instanceof(parent, nativePromise)) {
        child = new nativePromise(function (resolve, reject) {
          parent.then(function (value) {
            resolve(_clone(value, depth - 1));
          }, function (err) {
            reject(_clone(err, depth - 1));
          });
        });
      } else if (clone.__isArray(parent)) {
        child = [];
      } else if (clone.__isRegExp(parent)) {
        child = new RegExp(parent.source, __getRegExpFlags(parent));
        if (parent.lastIndex) child.lastIndex = parent.lastIndex;
      } else if (clone.__isDate(parent)) {
        child = new Date(parent.getTime());
      } else if (useBuffer && Buffer.isBuffer(parent)) {
        if (Buffer.from) {
          // Node.js >= 5.10.0
          child = Buffer.from(parent);
        } else {
          // Older Node.js versions
          child = new Buffer(parent.length);
          parent.copy(child);
        }
        return child;
      } else if (_instanceof(parent, Error)) {
        child = Object.create(parent);
      } else {
        if (typeof prototype == 'undefined') {
          proto = Object.getPrototypeOf(parent);
          child = Object.create(proto);
        } else {
          child = Object.create(prototype);
          proto = prototype;
        }
      }
      if (circular) {
        var index = allParents.indexOf(parent);
        if (index != -1) {
          return allChildren[index];
        }
        allParents.push(parent);
        allChildren.push(child);
      }
      if (_instanceof(parent, nativeMap)) {
        parent.forEach(function (value, key) {
          var keyChild = _clone(key, depth - 1);
          var valueChild = _clone(value, depth - 1);
          child.set(keyChild, valueChild);
        });
      }
      if (_instanceof(parent, nativeSet)) {
        parent.forEach(function (value) {
          var entryChild = _clone(value, depth - 1);
          child.add(entryChild);
        });
      }
      for (var i in parent) {
        var attrs = Object.getOwnPropertyDescriptor(parent, i);
        if (attrs) {
          child[i] = _clone(parent[i], depth - 1);
        }
        try {
          var objProperty = Object.getOwnPropertyDescriptor(parent, i);
          if (objProperty.set === 'undefined') {
            // no setter defined. Skip cloning this property
            continue;
          }
          child[i] = _clone(parent[i], depth - 1);
        } catch (e) {
          if (e instanceof TypeError) {
            // when in strict mode, TypeError will be thrown if child[i] property only has a getter
            // we can't do anything about this, other than inform the user that this property cannot be set.
            continue;
          } else if (e instanceof ReferenceError) {
            //this may happen in non strict mode
            continue;
          }
        }
      }
      if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(parent);
        for (var i = 0; i < symbols.length; i++) {
          // Don't need to worry about cloning a symbol because it is a primitive,
          // like a number or string.
          var symbol = symbols[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, symbol);
          if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
            continue;
          }
          child[symbol] = _clone(parent[symbol], depth - 1);
          Object.defineProperty(child, symbol, descriptor);
        }
      }
      if (includeNonEnumerable) {
        var allPropertyNames = Object.getOwnPropertyNames(parent);
        for (var i = 0; i < allPropertyNames.length; i++) {
          var propertyName = allPropertyNames[i];
          var descriptor = Object.getOwnPropertyDescriptor(parent, propertyName);
          if (descriptor && descriptor.enumerable) {
            continue;
          }
          child[propertyName] = _clone(parent[propertyName], depth - 1);
          Object.defineProperty(child, propertyName, descriptor);
        }
      }
      return child;
    }
    return _clone(parent, depth);
  }

  /**
   * Simple flat clone using prototype, accepts only objects, usefull for property
   * override on FLAT configuration object (no nested props).
   *
   * USE WITH CAUTION! This may not behave as you wish if you do not know how this
   * works.
   */
  clone.clonePrototype = function clonePrototype(parent) {
    if (parent === null) return null;
    var c = function c() {};
    c.prototype = parent;
    return new c();
  };

  // private utility functions

  function __objToStr(o) {
    return Object.prototype.toString.call(o);
  }
  clone.__objToStr = __objToStr;
  function __isDate(o) {
    return (0, _typeof2.default)(o) === 'object' && __objToStr(o) === '[object Date]';
  }
  clone.__isDate = __isDate;
  function __isArray(o) {
    return (0, _typeof2.default)(o) === 'object' && __objToStr(o) === '[object Array]';
  }
  clone.__isArray = __isArray;
  function __isRegExp(o) {
    return (0, _typeof2.default)(o) === 'object' && __objToStr(o) === '[object RegExp]';
  }
  clone.__isRegExp = __isRegExp;
  function __getRegExpFlags(re) {
    var flags = '';
    if (re.global) flags += 'g';
    if (re.ignoreCase) flags += 'i';
    if (re.multiline) flags += 'm';
    return flags;
  }
  clone.__getRegExpFlags = __getRegExpFlags;
  return clone;
}();
var _default = clone;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../../../../../../Applications/HBuilderX.app/Contents/HBuilderX/plugins/uniapp-cli/node_modules/buffer/index.js */ 57).Buffer))

/***/ }),
/* 57 */
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ 58)
var ieee754 = __webpack_require__(/*! ieee754 */ 59)
var isArray = __webpack_require__(/*! isarray */ 60)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ 3)))

/***/ }),
/* 58 */
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 59 */
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 60 */
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 61 */
/*!***************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/util/route.js ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ 62));
var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ 64));
var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ 23));
var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ 24));
/**
 * 路由跳转方法，该方法相对于直接使用uni.xxx的好处是使用更加简单快捷
 * 并且带有路由拦截功能
 */
var Router = /*#__PURE__*/function () {
  function Router() {
    (0, _classCallCheck2.default)(this, Router);
    // 原始属性定义
    this.config = {
      type: 'navigateTo',
      url: '',
      delta: 1,
      // navigateBack页面后退时,回退的层数
      params: {},
      // 传递的参数
      animationType: 'pop-in',
      // 窗口动画,只在APP有效
      animationDuration: 300,
      // 窗口动画持续时间,单位毫秒,只在APP有效
      intercept: false // 是否需要拦截
    };
    // 因为route方法是需要对外赋值给另外的对象使用，同时route内部有使用this，会导致route失去上下文
    // 这里在构造函数中进行this绑定
    this.route = this.route.bind(this);
  }

  // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
  (0, _createClass2.default)(Router, [{
    key: "addRootPath",
    value: function addRootPath(url) {
      return url[0] === '/' ? url : "/".concat(url);
    }

    // 整合路由参数
  }, {
    key: "mixinParam",
    value: function mixinParam(url, params) {
      url = url && this.addRootPath(url);

      // 使用正则匹配，主要依据是判断是否有"/","?","="等，如“/page/index/index?name=mary"
      // 如果有url中有get参数，转换后无需带上"?"
      var query = '';
      if (/.*\/.*\?.*=.*/.test(url)) {
        // object对象转为get类型的参数
        query = uni.$u.queryParams(params, false);
        // 因为已有get参数,所以后面拼接的参数需要带上"&"隔开
        return url += "&".concat(query);
      }
      // 直接拼接参数，因为此处url中没有后面的query参数，也就没有"?/&"之类的符号
      query = uni.$u.queryParams(params);
      return url += query;
    }

    // 对外的方法名称
  }, {
    key: "route",
    value: function () {
      var _route = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
        var options,
          params,
          mergeConfig,
          isNext,
          _args = arguments;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                options = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                params = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
                // 合并用户的配置和内部的默认配置
                mergeConfig = {};
                if (typeof options === 'string') {
                  // 如果options为字符串，则为route(url, params)的形式
                  mergeConfig.url = this.mixinParam(options, params);
                  mergeConfig.type = 'navigateTo';
                } else {
                  mergeConfig = uni.$u.deepMerge(this.config, options);
                  // 否则正常使用mergeConfig中的url和params进行拼接
                  mergeConfig.url = this.mixinParam(options.url, options.params);
                }

                // 如果本次跳转的路径和本页面路径一致，不执行跳转，防止用户快速点击跳转按钮，造成多次跳转同一个页面的问题
                if (!(mergeConfig.url === uni.$u.page())) {
                  _context.next = 6;
                  break;
                }
                return _context.abrupt("return");
              case 6:
                if (params.intercept) {
                  this.config.intercept = params.intercept;
                }
                // params参数也带给拦截器
                mergeConfig.params = params;
                // 合并内外部参数
                mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
                // 判断用户是否定义了拦截器
                if (!(typeof uni.$u.routeIntercept === 'function')) {
                  _context.next = 16;
                  break;
                }
                _context.next = 12;
                return new Promise(function (resolve, reject) {
                  uni.$u.routeIntercept(mergeConfig, resolve);
                });
              case 12:
                isNext = _context.sent;
                // 如果isNext为true，则执行路由跳转
                isNext && this.openPage(mergeConfig);
                _context.next = 17;
                break;
              case 16:
                this.openPage(mergeConfig);
              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function route() {
        return _route.apply(this, arguments);
      }
      return route;
    }() // 执行路由跳转
  }, {
    key: "openPage",
    value: function openPage(config) {
      // 解构参数
      var url = config.url,
        type = config.type,
        delta = config.delta,
        animationType = config.animationType,
        animationDuration = config.animationDuration;
      if (config.type == 'navigateTo' || config.type == 'to') {
        uni.navigateTo({
          url: url,
          animationType: animationType,
          animationDuration: animationDuration
        });
      }
      if (config.type == 'redirectTo' || config.type == 'redirect') {
        uni.redirectTo({
          url: url
        });
      }
      if (config.type == 'switchTab' || config.type == 'tab') {
        uni.switchTab({
          url: url
        });
      }
      if (config.type == 'reLaunch' || config.type == 'launch') {
        uni.reLaunch({
          url: url
        });
      }
      if (config.type == 'navigateBack' || config.type == 'back') {
        uni.navigateBack({
          delta: delta
        });
      }
    }
  }]);
  return Router;
}();
var _default = new Router().route;
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 62 */
/*!************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/@babel/runtime/regenerator/index.js ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// TODO(Babel 8): Remove this file.

var runtime = __webpack_require__(/*! @babel/runtime/helpers/regeneratorRuntime */ 63)();
module.exports = runtime;

/***/ }),
/* 63 */
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/regeneratorRuntime.js ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__(/*! ./typeof.js */ 13)["default"];
function _regeneratorRuntime() {
  "use strict";

  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
  module.exports = _regeneratorRuntime = function _regeneratorRuntime() {
    return exports;
  }, module.exports.__esModule = true, module.exports["default"] = module.exports;
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty = Object.defineProperty || function (obj, key, desc) {
      obj[key] = desc.value;
    },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state) throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg;;) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
          if ("suspendedStart" === state) throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length;) {
              if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
            }
            return next.value = undefined, next.done = !0, next;
          };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: !0
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: !0
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (val) {
    var object = Object(val),
      keys = [];
    for (var key in object) {
      keys.push(key);
    }
    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }
      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function stop() {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done) throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
          record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
            hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}
module.exports = _regeneratorRuntime, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 64 */
/*!*****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/asyncToGenerator.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
module.exports = _asyncToGenerator, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 65 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/function/colorGradient.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 求两个颜色之间的渐变值
 * @param {string} startColor 开始的颜色
 * @param {string} endColor 结束的颜色
 * @param {number} step 颜色等分的份额
 * */
function colorGradient() {
  var startColor = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'rgb(0, 0, 0)';
  var endColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'rgb(255, 255, 255)';
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  var startRGB = hexToRgb(startColor, false); // 转换为rgb数组模式
  var startR = startRGB[0];
  var startG = startRGB[1];
  var startB = startRGB[2];
  var endRGB = hexToRgb(endColor, false);
  var endR = endRGB[0];
  var endG = endRGB[1];
  var endB = endRGB[2];
  var sR = (endR - startR) / step; // 总差值
  var sG = (endG - startG) / step;
  var sB = (endB - startB) / step;
  var colorArr = [];
  for (var i = 0; i < step; i++) {
    // 计算每一步的hex值
    var hex = rgbToHex("rgb(".concat(Math.round(sR * i + startR), ",").concat(Math.round(sG * i + startG), ",").concat(Math.round(sB * i + startB), ")"));
    // 确保第一个颜色值为startColor的值
    if (i === 0) hex = rgbToHex(startColor);
    // 确保最后一个颜色值为endColor的值
    if (i === step - 1) hex = rgbToHex(endColor);
    colorArr.push(hex);
  }
  return colorArr;
}

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
function hexToRgb(sColor) {
  var str = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  sColor = String(sColor).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i = 1; _i < 7; _i += 2) {
      sColorChange.push(parseInt("0x".concat(sColor.slice(_i, _i + 2))));
    }
    if (!str) {
      return sColorChange;
    }
    return "rgb(".concat(sColorChange[0], ",").concat(sColorChange[1], ",").concat(sColorChange[2], ")");
  }
  if (/^(rgb|RGB)/.test(sColor)) {
    var arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    return arr.map(function (val) {
      return Number(val);
    });
  }
  return sColor;
}

// 将rgb表示方式转换为hex表示方式
function rgbToHex(rgb) {
  var _this = rgb;
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  if (/^(rgb|RGB)/.test(_this)) {
    var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
    var strHex = '#';
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      hex = String(hex).length == 1 ? "".concat(0, hex) : hex; // 保证每个rgb的值为2位
      if (hex === '0') {
        hex += hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = _this;
    }
    return strHex;
  }
  if (reg.test(_this)) {
    var aNum = _this.replace(/#/, '').split('');
    if (aNum.length === 6) {
      return _this;
    }
    if (aNum.length === 3) {
      var numHex = '#';
      for (var _i2 = 0; _i2 < aNum.length; _i2 += 1) {
        numHex += aNum[_i2] + aNum[_i2];
      }
      return numHex;
    }
  } else {
    return _this;
  }
}

/**
* JS颜色十六进制转换为rgb或rgba,返回的格式为 rgba（255，255，255，0.5）字符串
* sHex为传入的十六进制的色值
* alpha为rgba的透明度
*/
function colorToRgba(color, alpha) {
  color = rgbToHex(color);
  // 十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  /* 16进制颜色转为RGB格式 */
  var sColor = String(color).toLowerCase();
  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      var sColorNew = '#';
      for (var i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }
      sColor = sColorNew;
    }
    // 处理六位的颜色值
    var sColorChange = [];
    for (var _i3 = 1; _i3 < 7; _i3 += 2) {
      sColorChange.push(parseInt("0x".concat(sColor.slice(_i3, _i3 + 2))));
    }
    // return sColorChange.join(',')
    return "rgba(".concat(sColorChange.join(','), ",").concat(alpha, ")");
  }
  return sColor;
}
var _default = {
  colorGradient: colorGradient,
  hexToRgb: hexToRgb,
  rgbToHex: rgbToHex,
  colorToRgba: colorToRgba
};
exports.default = _default;

/***/ }),
/* 66 */
/*!******************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/function/test.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
/**
 * 验证电子邮箱格式
 */
function email(value) {
  return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
}

/**
 * 验证手机格式
 */
function mobile(value) {
  return /^1([3589]\d|4[5-9]|6[1-2,4-7]|7[0-8])\d{8}$/.test(value);
}

/**
 * 验证URL格式
 */
function url(value) {
  return /^((https|http|ftp|rtsp|mms):\/\/)(([0-9a-zA-Z_!~*'().&=+$%-]+: )?[0-9a-zA-Z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-zA-Z_!~*'()-]+.)*([0-9a-zA-Z][0-9a-zA-Z-]{0,61})?[0-9a-zA-Z].[a-zA-Z]{2,6})(:[0-9]{1,4})?((\/?)|(\/[0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+\/?)$/.test(value);
}

/**
 * 验证日期格式
 */
function date(value) {
  if (!value) return false;
  // 判断是否数值或者字符串数值(意味着为时间戳)，转为数值，否则new Date无法识别字符串时间戳
  if (number(value)) value = +value;
  return !/Invalid|NaN/.test(new Date(value).toString());
}

/**
 * 验证ISO类型的日期格式
 */
function dateISO(value) {
  return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
}

/**
 * 验证十进制数字
 */
function number(value) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value);
}

/**
 * 验证字符串
 */
function string(value) {
  return typeof value === 'string';
}

/**
 * 验证整数
 */
function digits(value) {
  return /^\d+$/.test(value);
}

/**
 * 验证身份证号码
 */
function idCard(value) {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(value);
}

/**
 * 是否车牌号
 */
function carNo(value) {
  // 新能源车牌
  var xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
  // 旧车牌
  var creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
  if (value.length === 7) {
    return creg.test(value);
  }
  if (value.length === 8) {
    return xreg.test(value);
  }
  return false;
}

/**
 * 金额,只允许2位小数
 */
function amount(value) {
  // 金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
}

/**
 * 中文
 */
function chinese(value) {
  var reg = /^[\u4e00-\u9fa5]+$/gi;
  return reg.test(value);
}

/**
 * 只能输入字母
 */
function letter(value) {
  return /^[a-zA-Z]*$/.test(value);
}

/**
 * 只能是字母或者数字
 */
function enOrNum(value) {
  // 英文或者数字
  var reg = /^[0-9a-zA-Z]*$/g;
  return reg.test(value);
}

/**
 * 验证是否包含某个值
 */
function contains(value, param) {
  return value.indexOf(param) >= 0;
}

/**
 * 验证一个值范围[min, max]
 */
function range(value, param) {
  return value >= param[0] && value <= param[1];
}

/**
 * 验证一个长度范围[min, max]
 */
function rangeLength(value, param) {
  return value.length >= param[0] && value.length <= param[1];
}

/**
 * 是否固定电话
 */
function landline(value) {
  var reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
  return reg.test(value);
}

/**
 * 判断是否为空
 */
function empty(value) {
  switch ((0, _typeof2.default)(value)) {
    case 'undefined':
      return true;
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0) return true;
      break;
    case 'boolean':
      if (!value) return true;
      break;
    case 'number':
      if (value === 0 || isNaN(value)) return true;
      break;
    case 'object':
      if (value === null || value.length === 0) return true;
      for (var i in value) {
        return false;
      }
      return true;
  }
  return false;
}

/**
 * 是否json字符串
 */
function jsonString(value) {
  if (typeof value === 'string') {
    try {
      var obj = JSON.parse(value);
      if ((0, _typeof2.default)(obj) === 'object' && obj) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }
  return false;
}

/**
 * 是否数组
 */
function array(value) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(value);
  }
  return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * 是否对象
 */
function object(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * 是否短信验证码
 */
function code(value) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 6;
  return new RegExp("^\\d{".concat(len, "}$")).test(value);
}

/**
 * 是否函数方法
 * @param {Object} value
 */
function func(value) {
  return typeof value === 'function';
}

/**
 * 是否promise对象
 * @param {Object} value
 */
function promise(value) {
  return object(value) && func(value.then) && func(value.catch);
}

/** 是否图片格式
 * @param {Object} value
 */
function image(value) {
  var newValue = value.split('?')[0];
  var IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;
  return IMAGE_REGEXP.test(newValue);
}

/**
 * 是否视频格式
 * @param {Object} value
 */
function video(value) {
  var VIDEO_REGEXP = /\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8)/i;
  return VIDEO_REGEXP.test(value);
}

/**
 * 是否为正则对象
 * @param {Object}
 * @return {Boolean}
 */
function regExp(o) {
  return o && Object.prototype.toString.call(o) === '[object RegExp]';
}
var _default = {
  email: email,
  mobile: mobile,
  url: url,
  date: date,
  dateISO: dateISO,
  number: number,
  digits: digits,
  idCard: idCard,
  carNo: carNo,
  amount: amount,
  chinese: chinese,
  letter: letter,
  enOrNum: enOrNum,
  contains: contains,
  range: range,
  rangeLength: rangeLength,
  empty: empty,
  isEmpty: empty,
  jsonString: jsonString,
  landline: landline,
  object: object,
  array: array,
  code: code,
  func: func,
  promise: promise,
  video: video,
  image: image,
  regExp: regExp,
  string: string
};
exports.default = _default;

/***/ }),
/* 67 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/function/debounce.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timeout = null;

/**
 * 防抖原理：一定时间内，只有最后一次操作，再过wait毫秒后才执行函数
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout);
  // 立即执行，此类情况一般用不到
  if (immediate) {
    var callNow = !timeout;
    timeout = setTimeout(function () {
      timeout = null;
    }, wait);
    if (callNow) typeof func === 'function' && func();
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(function () {
      typeof func === 'function' && func();
    }, wait);
  }
}
var _default = debounce;
exports.default = _default;

/***/ }),
/* 68 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/function/throttle.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var timer;
var flag;
/**
 * 节流原理：在一定时间内，只能触发一次
 *
 * @param {Function} func 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function throttle(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  if (immediate) {
    if (!flag) {
      flag = true;
      // 如果是立即执行，则在wait毫秒内开始时执行
      typeof func === 'function' && func();
      timer = setTimeout(function () {
        flag = false;
      }, wait);
    }
  } else if (!flag) {
    flag = true;
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(function () {
      flag = false;
      typeof func === 'function' && func();
    }, wait);
  }
}
var _default = throttle;
exports.default = _default;

/***/ }),
/* 69 */
/*!*******************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/function/index.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ 5));
var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ 13));
var _test = _interopRequireDefault(__webpack_require__(/*! ./test.js */ 66));
var _digit = __webpack_require__(/*! ./digit.js */ 70);
/**
 * @description 如果value小于min，取min；如果value大于max，取max
 * @param {number} min
 * @param {number} max
 * @param {number} value
 */
function range() {
  var min = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var max = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  return Math.max(min, Math.min(max, Number(value)));
}

/**
 * @description 用于获取用户传递值的px值  如果用户传递了"xxpx"或者"xxrpx"，取出其数值部分，如果是"xxxrpx"还需要用过uni.upx2px进行转换
 * @param {number|string} value 用户传递值的px值
 * @param {boolean} unit
 * @returns {number|string}
 */
function getPx(value) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (_test.default.number(value)) {
    return unit ? "".concat(value, "px") : Number(value);
  }
  // 如果带有rpx，先取出其数值部分，再转为px值
  if (/(rpx|upx)$/.test(value)) {
    return unit ? "".concat(uni.upx2px(parseInt(value)), "px") : Number(uni.upx2px(parseInt(value)));
  }
  return unit ? "".concat(parseInt(value), "px") : parseInt(value);
}

/**
 * @description 进行延时，以达到可以简写代码的目的 比如: await uni.$u.sleep(20)将会阻塞20ms
 * @param {number} value 堵塞时间 单位ms 毫秒
 * @returns {Promise} 返回promise
 */
function sleep() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 30;
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, value);
  });
}
/**
 * @description 运行期判断平台
 * @returns {string} 返回所在平台(小写)
 * @link 运行期判断平台 https://uniapp.dcloud.io/frame?id=判断平台
 */
function os() {
  return uni.getSystemInfoSync().platform.toLowerCase();
}
/**
 * @description 获取系统信息同步接口
 * @link 获取系统信息同步接口 https://uniapp.dcloud.io/api/system/info?id=getsysteminfosync
 */
function sys() {
  return uni.getSystemInfoSync();
}

/**
 * @description 取一个区间数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
function random(min, max) {
  if (min >= 0 && max > 0 && max >= min) {
    var gab = max - min + 1;
    return Math.floor(Math.random() * gab + min);
  }
  return 0;
}

/**
 * @param {Number} len uuid的长度
 * @param {Boolean} firstU 将返回的首字母置为"u"
 * @param {Nubmer} radix 生成uuid的基数(意味着返回的字符串都是这个基数),2-二进制,8-八进制,10-十进制,16-十六进制
 */
function guid() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;
  var firstU = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var radix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  var uuid = [];
  radix = radix || chars.length;
  if (len) {
    // 如果指定uuid长度,只是取随机的字符,0|x为位运算,能去掉x的小数位,返回整数位
    for (var i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix];
    }
  } else {
    var r;
    // rfc4122标准要求返回的uuid中,某些位为固定的字符
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    for (var _i = 0; _i < 36; _i++) {
      if (!uuid[_i]) {
        r = 0 | Math.random() * 16;
        uuid[_i] = chars[_i == 19 ? r & 0x3 | 0x8 : r];
      }
    }
  }
  // 移除第一个字符,并用u替代,因为第一个字符为数值时,该guuid不能用作id或者class
  if (firstU) {
    uuid.shift();
    return "u".concat(uuid.join(''));
  }
  return uuid.join('');
}

/**
* @description 获取父组件的参数，因为支付宝小程序不支持provide/inject的写法
   this.$parent在非H5中，可以准确获取到父组件，但是在H5中，需要多次this.$parent.$parent.xxx
   这里默认值等于undefined有它的含义，因为最顶层元素(组件)的$parent就是undefined，意味着不传name
   值(默认为undefined)，就是查找最顶层的$parent
*  @param {string|undefined} name 父组件的参数名
*/
function $parent() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : undefined;
  var parent = this.$parent;
  // 通过while历遍，这里主要是为了H5需要多层解析的问题
  while (parent) {
    // 父组件
    if (parent.$options && parent.$options.name !== name) {
      // 如果组件的name不相等，继续上一级寻找
      parent = parent.$parent;
    } else {
      return parent;
    }
  }
  return false;
}

/**
 * @description 样式转换
 * 对象转字符串，或者字符串转对象
 * @param {object | string} customStyle 需要转换的目标
 * @param {String} target 转换的目的，object-转为对象，string-转为字符串
 * @returns {object|string}
 */
function addStyle(customStyle) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'object';
  // 字符串转字符串，对象转对象情形，直接返回
  if (_test.default.empty(customStyle) || (0, _typeof2.default)(customStyle) === 'object' && target === 'object' || target === 'string' && typeof customStyle === 'string') {
    return customStyle;
  }
  // 字符串转对象
  if (target === 'object') {
    // 去除字符串样式中的两端空格(中间的空格不能去掉，比如padding: 20px 0如果去掉了就错了)，空格是无用的
    customStyle = trim(customStyle);
    // 根据";"将字符串转为数组形式
    var styleArray = customStyle.split(';');
    var style = {};
    // 历遍数组，拼接成对象
    for (var i = 0; i < styleArray.length; i++) {
      // 'font-size:20px;color:red;'，如此最后字符串有";"的话，会导致styleArray最后一个元素为空字符串，这里需要过滤
      if (styleArray[i]) {
        var item = styleArray[i].split(':');
        style[trim(item[0])] = trim(item[1]);
      }
    }
    return style;
  }
  // 这里为对象转字符串形式
  var string = '';
  for (var _i2 in customStyle) {
    // 驼峰转为中划线的形式，否则css内联样式，无法识别驼峰样式属性名
    var key = _i2.replace(/([A-Z])/g, '-$1').toLowerCase();
    string += "".concat(key, ":").concat(customStyle[_i2], ";");
  }
  // 去除两端空格
  return trim(string);
}

/**
 * @description 添加单位，如果有rpx，upx，%，px等单位结尾或者值为auto，直接返回，否则加上px单位结尾
 * @param {string|number} value 需要添加单位的值
 * @param {string} unit 添加的单位名 比如px
 */
function addUnit() {
  var _uni$$u$config$unit, _uni, _uni$$u, _uni$$u$config;
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'auto';
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (_uni$$u$config$unit = (_uni = uni) === null || _uni === void 0 ? void 0 : (_uni$$u = _uni.$u) === null || _uni$$u === void 0 ? void 0 : (_uni$$u$config = _uni$$u.config) === null || _uni$$u$config === void 0 ? void 0 : _uni$$u$config.unit) !== null && _uni$$u$config$unit !== void 0 ? _uni$$u$config$unit : 'px';
  value = String(value);
  // 用uView内置验证规则中的number判断是否为数值
  return _test.default.number(value) ? "".concat(value).concat(unit) : value;
}

/**
 * @description 深度克隆
 * @param {object} obj 需要深度克隆的对象
 * @param cache 缓存
 * @returns {*} 克隆后的对象或者原值（不是对象）
 */
function deepClone(obj) {
  var cache = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new WeakMap();
  if (obj === null || (0, _typeof2.default)(obj) !== 'object') return obj;
  if (cache.has(obj)) return cache.get(obj);
  var clone;
  if (obj instanceof Date) {
    clone = new Date(obj.getTime());
  } else if (obj instanceof RegExp) {
    clone = new RegExp(obj);
  } else if (obj instanceof Map) {
    clone = new Map(Array.from(obj, function (_ref) {
      var _ref2 = (0, _slicedToArray2.default)(_ref, 2),
        key = _ref2[0],
        value = _ref2[1];
      return [key, deepClone(value, cache)];
    }));
  } else if (obj instanceof Set) {
    clone = new Set(Array.from(obj, function (value) {
      return deepClone(value, cache);
    }));
  } else if (Array.isArray(obj)) {
    clone = obj.map(function (value) {
      return deepClone(value, cache);
    });
  } else if (Object.prototype.toString.call(obj) === '[object Object]') {
    clone = Object.create(Object.getPrototypeOf(obj));
    cache.set(obj, clone);
    for (var _i3 = 0, _Object$entries = Object.entries(obj); _i3 < _Object$entries.length; _i3++) {
      var _Object$entries$_i = (0, _slicedToArray2.default)(_Object$entries[_i3], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];
      clone[key] = deepClone(value, cache);
    }
  } else {
    clone = Object.assign({}, obj);
  }
  cache.set(obj, clone);
  return clone;
}

/**
 * @description JS对象深度合并
 * @param {object} target 需要拷贝的对象
 * @param {object} source 拷贝的来源对象
 * @returns {object|boolean} 深度合并后的对象或者false（入参有不是对象）
 */
function deepMerge() {
  var target = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var source = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  target = deepClone(target);
  if ((0, _typeof2.default)(target) !== 'object' || target === null || (0, _typeof2.default)(source) !== 'object' || source === null) return target;
  var merged = Array.isArray(target) ? target.slice() : Object.assign({}, target);
  for (var prop in source) {
    if (!source.hasOwnProperty(prop)) continue;
    var sourceValue = source[prop];
    var targetValue = merged[prop];
    if (sourceValue instanceof Date) {
      merged[prop] = new Date(sourceValue);
    } else if (sourceValue instanceof RegExp) {
      merged[prop] = new RegExp(sourceValue);
    } else if (sourceValue instanceof Map) {
      merged[prop] = new Map(sourceValue);
    } else if (sourceValue instanceof Set) {
      merged[prop] = new Set(sourceValue);
    } else if ((0, _typeof2.default)(sourceValue) === 'object' && sourceValue !== null) {
      merged[prop] = deepMerge(targetValue, sourceValue);
    } else {
      merged[prop] = sourceValue;
    }
  }
  return merged;
}

/**
 * @description error提示
 * @param {*} err 错误内容
 */
function error(err) {
  // 开发环境才提示，生产环境不会提示
  if (true) {
    console.error("uView\u63D0\u793A\uFF1A".concat(err));
  }
}

/**
 * @description 打乱数组
 * @param {array} array 需要打乱的数组
 * @returns {array} 打乱后的数组
 */
function randomArray() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  // 原理是sort排序,Math.random()产生0<= x < 1之间的数,会导致x-0.05大于或者小于0
  return array.sort(function () {
    return Math.random() - 0.5;
  });
}

// padStart 的 polyfill，因为某些机型或情况，还无法支持es7的padStart，比如电脑版的微信小程序
// 所以这里做一个兼容polyfill的兼容处理
if (!String.prototype.padStart) {
  // 为了方便表示这里 fillString 用了ES6 的默认参数，不影响理解
  String.prototype.padStart = function (maxLength) {
    var fillString = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ' ';
    if (Object.prototype.toString.call(fillString) !== '[object String]') {
      throw new TypeError('fillString must be String');
    }
    var str = this;
    // 返回 String(str) 这里是为了使返回的值是字符串字面量，在控制台中更符合直觉
    if (str.length >= maxLength) return String(str);
    var fillLength = maxLength - str.length;
    var times = Math.ceil(fillLength / fillString.length);
    while (times >>= 1) {
      fillString += fillString;
      if (times === 1) {
        fillString += fillString;
      }
    }
    return fillString.slice(0, fillLength) + str;
  };
}

/**
 * @description 格式化时间
 * @param {String|Number} dateTime 需要格式化的时间戳
 * @param {String} fmt 格式化规则 yyyy:mm:dd|yyyy:mm|yyyy年mm月dd日|yyyy年mm月dd日 hh时MM分等,可自定义组合 默认yyyy-mm-dd
 * @returns {string} 返回格式化后的字符串
 */
function timeFormat() {
  var dateTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var formatStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  var date;
  // 若传入时间为假值，则取当前时间
  if (!dateTime) {
    date = new Date();
  }
  // 若为unix秒时间戳，则转为毫秒时间戳（逻辑有点奇怪，但不敢改，以保证历史兼容）
  else if (/^\d{10}$/.test(dateTime === null || dateTime === void 0 ? void 0 : dateTime.toString().trim())) {
    date = new Date(dateTime * 1000);
  }
  // 若用户传入字符串格式时间戳，new Date无法解析，需做兼容
  else if (typeof dateTime === 'string' && /^\d+$/.test(dateTime.trim())) {
    date = new Date(Number(dateTime));
  }
  // 处理平台性差异，在Safari/Webkit中，new Date仅支持/作为分割符的字符串时间
  // 处理 '2022-07-10 01:02:03'，跳过 '2022-07-10T01:02:03'
  else if (typeof dateTime === 'string' && dateTime.includes('-') && !dateTime.includes('T')) {
    date = new Date(dateTime.replace(/-/g, '/'));
  }
  // 其他都认为符合 RFC 2822 规范
  else {
    date = new Date(dateTime);
  }
  var timeSource = {
    'y': date.getFullYear().toString(),
    // 年
    'm': (date.getMonth() + 1).toString().padStart(2, '0'),
    // 月
    'd': date.getDate().toString().padStart(2, '0'),
    // 日
    'h': date.getHours().toString().padStart(2, '0'),
    // 时
    'M': date.getMinutes().toString().padStart(2, '0'),
    // 分
    's': date.getSeconds().toString().padStart(2, '0') // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };

  for (var key in timeSource) {
    var _ref3 = new RegExp("".concat(key, "+")).exec(formatStr) || [],
      _ref4 = (0, _slicedToArray2.default)(_ref3, 1),
      ret = _ref4[0];
    if (ret) {
      // 年可能只需展示两位
      var beginIndex = key === 'y' && ret.length === 2 ? 2 : 0;
      formatStr = formatStr.replace(ret, timeSource[key].slice(beginIndex));
    }
  }
  return formatStr;
}

/**
 * @description 时间戳转为多久之前
 * @param {String|Number} timestamp 时间戳
 * @param {String|Boolean} format
 * 格式化规则如果为时间格式字符串，超出一定时间范围，返回固定的时间格式；
 * 如果为布尔值false，无论什么时间，都返回多久以前的格式
 * @returns {string} 转化后的内容
 */
function timeFrom() {
  var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-mm-dd';
  if (timestamp == null) timestamp = Number(new Date());
  timestamp = parseInt(timestamp);
  // 判断用户输入的时间戳是秒还是毫秒,一般前端js获取的时间戳是毫秒(13位),后端传过来的为秒(10位)
  if (timestamp.toString().length == 10) timestamp *= 1000;
  var timer = new Date().getTime() - timestamp;
  timer = parseInt(timer / 1000);
  // 如果小于5分钟,则返回"刚刚",其他以此类推
  var tips = '';
  switch (true) {
    case timer < 300:
      tips = '刚刚';
      break;
    case timer >= 300 && timer < 3600:
      tips = "".concat(parseInt(timer / 60), "\u5206\u949F\u524D");
      break;
    case timer >= 3600 && timer < 86400:
      tips = "".concat(parseInt(timer / 3600), "\u5C0F\u65F6\u524D");
      break;
    case timer >= 86400 && timer < 2592000:
      tips = "".concat(parseInt(timer / 86400), "\u5929\u524D");
      break;
    default:
      // 如果format为false，则无论什么时间戳，都显示xx之前
      if (format === false) {
        if (timer >= 2592000 && timer < 365 * 86400) {
          tips = "".concat(parseInt(timer / (86400 * 30)), "\u4E2A\u6708\u524D");
        } else {
          tips = "".concat(parseInt(timer / (86400 * 365)), "\u5E74\u524D");
        }
      } else {
        tips = timeFormat(timestamp, format);
      }
  }
  return tips;
}

/**
 * @description 去除空格
 * @param String str 需要去除空格的字符串
 * @param String pos both(左右)|left|right|all 默认both
 */
function trim(str) {
  var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'both';
  str = String(str);
  if (pos == 'both') {
    return str.replace(/^\s+|\s+$/g, '');
  }
  if (pos == 'left') {
    return str.replace(/^\s*/, '');
  }
  if (pos == 'right') {
    return str.replace(/(\s*$)/g, '');
  }
  if (pos == 'all') {
    return str.replace(/\s+/g, '');
  }
  return str;
}

/**
 * @description 对象转url参数
 * @param {object} data,对象
 * @param {Boolean} isPrefix,是否自动加上"?"
 * @param {string} arrayFormat 规则 indices|brackets|repeat|comma
 */
function queryParams() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var isPrefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var arrayFormat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'brackets';
  var prefix = isPrefix ? '?' : '';
  var _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1) arrayFormat = 'brackets';
  var _loop = function _loop(key) {
    var value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      return "continue";
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (var i = 0; i < value.length; i++) {
            _result.push("".concat(key, "[").concat(i, "]=").concat(value[i]));
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(function (_value) {
            _result.push("".concat(key, "[]=").concat(_value));
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(function (_value) {
            _result.push("".concat(key, "=").concat(_value));
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          var commaStr = '';
          value.forEach(function (_value) {
            commaStr += (commaStr ? ',' : '') + _value;
          });
          _result.push("".concat(key, "=").concat(commaStr));
          break;
        default:
          value.forEach(function (_value) {
            _result.push("".concat(key, "[]=").concat(_value));
          });
      }
    } else {
      _result.push("".concat(key, "=").concat(value));
    }
  };
  for (var key in data) {
    var _ret = _loop(key);
    if (_ret === "continue") continue;
  }
  return _result.length ? prefix + _result.join('&') : '';
}

/**
 * 显示消息提示框
 * @param {String} title 提示的内容，长度与 icon 取值有关。
 * @param {Number} duration 提示的延迟时间，单位毫秒，默认：2000
 */
function toast(title) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2000;
  uni.showToast({
    title: String(title),
    icon: 'none',
    duration: duration
  });
}

/**
 * @description 根据主题type值,获取对应的图标
 * @param {String} type 主题名称,primary|info|error|warning|success
 * @param {boolean} fill 是否使用fill填充实体的图标
 */
function type2icon() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'success';
  var fill = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  // 如果非预置值,默认为success
  if (['primary', 'info', 'error', 'warning', 'success'].indexOf(type) == -1) type = 'success';
  var iconName = '';
  // 目前(2019-12-12),info和primary使用同一个图标
  switch (type) {
    case 'primary':
      iconName = 'info-circle';
      break;
    case 'info':
      iconName = 'info-circle';
      break;
    case 'error':
      iconName = 'close-circle';
      break;
    case 'warning':
      iconName = 'error-circle';
      break;
    case 'success':
      iconName = 'checkmark-circle';
      break;
    default:
      iconName = 'checkmark-circle';
  }
  // 是否是实体类型,加上-fill,在icon组件库中,实体的类名是后面加-fill的
  if (fill) iconName += '-fill';
  return iconName;
}

/**
 * @description 数字格式化
 * @param {number|string} number 要格式化的数字
 * @param {number} decimals 保留几位小数
 * @param {string} decimalPoint 小数点符号
 * @param {string} thousandsSeparator 千分位符号
 * @returns {string} 格式化后的数字
 */
function priceFormat(number) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var decimalPoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '.';
  var thousandsSeparator = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ',';
  number = "".concat(number).replace(/[^0-9+-Ee.]/g, '');
  var n = !isFinite(+number) ? 0 : +number;
  var prec = !isFinite(+decimals) ? 0 : Math.abs(decimals);
  var sep = typeof thousandsSeparator === 'undefined' ? ',' : thousandsSeparator;
  var dec = typeof decimalPoint === 'undefined' ? '.' : decimalPoint;
  var s = '';
  s = (prec ? (0, _digit.round)(n, prec) + '' : "".concat(Math.round(n))).split('.');
  var re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1".concat(sep, "$2"));
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || '';
    s[1] += new Array(prec - s[1].length + 1).join('0');
  }
  return s.join(dec);
}

/**
 * @description 获取duration值
 * 如果带有ms或者s直接返回，如果大于一定值，认为是ms单位，小于一定值，认为是s单位
 * 比如以30位阈值，那么300大于30，可以理解为用户想要的是300ms，而不是想花300s去执行一个动画
 * @param {String|number} value 比如: "1s"|"100ms"|1|100
 * @param {boolean} unit  提示: 如果是false 默认返回number
 * @return {string|number}
 */
function getDuration(value) {
  var unit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var valueNum = parseInt(value);
  if (unit) {
    if (/s$/.test(value)) return value;
    return value > 30 ? "".concat(value, "ms") : "".concat(value, "s");
  }
  if (/ms$/.test(value)) return valueNum;
  if (/s$/.test(value)) return valueNum > 30 ? valueNum : valueNum * 1000;
  return valueNum;
}

/**
 * @description 日期的月或日补零操作
 * @param {String} value 需要补零的值
 */
function padZero(value) {
  return "00".concat(value).slice(-2);
}

/**
 * @description 在u-form的子组件内容发生变化，或者失去焦点时，尝试通知u-form执行校验方法
 * @param {*} instance
 * @param {*} event
 */
function formValidate(instance, event) {
  var formItem = uni.$u.$parent.call(instance, 'u-form-item');
  var form = uni.$u.$parent.call(instance, 'u-form');
  // 如果发生变化的input或者textarea等，其父组件中有u-form-item或者u-form等，就执行form的validate方法
  // 同时将form-item的pros传递给form，让其进行精确对象验证
  if (formItem && form) {
    form.validateField(formItem.prop, function () {}, event);
  }
}

/**
 * @description 获取某个对象下的属性，用于通过类似'a.b.c'的形式去获取一个对象的的属性的形式
 * @param {object} obj 对象
 * @param {string} key 需要获取的属性字段
 * @returns {*}
 */
function getProperty(obj, key) {
  if (!obj) {
    return;
  }
  if (typeof key !== 'string' || key === '') {
    return '';
  }
  if (key.indexOf('.') !== -1) {
    var keys = key.split('.');
    var firstObj = obj[keys[0]] || {};
    for (var i = 1; i < keys.length; i++) {
      if (firstObj) {
        firstObj = firstObj[keys[i]];
      }
    }
    return firstObj;
  }
  return obj[key];
}

/**
 * @description 设置对象的属性值，如果'a.b.c'的形式进行设置
 * @param {object} obj 对象
 * @param {string} key 需要设置的属性
 * @param {string} value 设置的值
 */
function setProperty(obj, key, value) {
  if (!obj) {
    return;
  }
  // 递归赋值
  var inFn = function inFn(_obj, keys, v) {
    // 最后一个属性key
    if (keys.length === 1) {
      _obj[keys[0]] = v;
      return;
    }
    // 0~length-1个key
    while (keys.length > 1) {
      var k = keys[0];
      if (!_obj[k] || (0, _typeof2.default)(_obj[k]) !== 'object') {
        _obj[k] = {};
      }
      var _key = keys.shift();
      // 自调用判断是否存在属性，不存在则自动创建对象
      inFn(_obj[k], keys, v);
    }
  };
  if (typeof key !== 'string' || key === '') {} else if (key.indexOf('.') !== -1) {
    // 支持多层级赋值操作
    var keys = key.split('.');
    inFn(obj, keys, value);
  } else {
    obj[key] = value;
  }
}

/**
 * @description 获取当前页面路径
 */
function page() {
  var _pages$route, _pages;
  var pages = getCurrentPages();
  // 某些特殊情况下(比如页面进行redirectTo时的一些时机)，pages可能为空数组
  return "/".concat((_pages$route = (_pages = pages[pages.length - 1]) === null || _pages === void 0 ? void 0 : _pages.route) !== null && _pages$route !== void 0 ? _pages$route : '');
}

/**
 * @description 获取当前路由栈实例数组
 */
function pages() {
  var pages = getCurrentPages();
  return pages;
}

/**
 * 获取页面历史栈指定层实例
 * @param back {number} [0] - 0或者负数，表示获取历史栈的哪一层，0表示获取当前页面实例，-1 表示获取上一个页面实例。默认0。
 */
function getHistoryPage() {
  var back = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var pages = getCurrentPages();
  var len = pages.length;
  return pages[len - 1 + back];
}

/**
 * @description 修改uView内置属性值
 * @param {object} props 修改内置props属性
 * @param {object} config 修改内置config属性
 * @param {object} color 修改内置color属性
 * @param {object} zIndex 修改内置zIndex属性
 */
function setConfig(_ref5) {
  var _ref5$props = _ref5.props,
    props = _ref5$props === void 0 ? {} : _ref5$props,
    _ref5$config = _ref5.config,
    config = _ref5$config === void 0 ? {} : _ref5$config,
    _ref5$color = _ref5.color,
    color = _ref5$color === void 0 ? {} : _ref5$color,
    _ref5$zIndex = _ref5.zIndex,
    zIndex = _ref5$zIndex === void 0 ? {} : _ref5$zIndex;
  var deepMerge = uni.$u.deepMerge;
  uni.$u.config = deepMerge(uni.$u.config, config);
  uni.$u.props = deepMerge(uni.$u.props, props);
  uni.$u.color = deepMerge(uni.$u.color, color);
  uni.$u.zIndex = deepMerge(uni.$u.zIndex, zIndex);
}
var _default = {
  range: range,
  getPx: getPx,
  sleep: sleep,
  os: os,
  sys: sys,
  random: random,
  guid: guid,
  $parent: $parent,
  addStyle: addStyle,
  addUnit: addUnit,
  deepClone: deepClone,
  deepMerge: deepMerge,
  error: error,
  randomArray: randomArray,
  timeFormat: timeFormat,
  timeFrom: timeFrom,
  trim: trim,
  queryParams: queryParams,
  toast: toast,
  type2icon: type2icon,
  priceFormat: priceFormat,
  getDuration: getDuration,
  padZero: padZero,
  formValidate: formValidate,
  getProperty: getProperty,
  setProperty: setProperty,
  page: page,
  pages: pages,
  getHistoryPage: getHistoryPage,
  setConfig: setConfig
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 70 */
/*!*******************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/function/digit.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.divide = divide;
exports.enableBoundaryChecking = enableBoundaryChecking;
exports.minus = minus;
exports.plus = plus;
exports.round = round;
exports.times = times;
var _toArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toArray */ 71));
var _boundaryCheckingState = true; // 是否进行越界检查的全局开关

/**
 * 把错误的数据转正
 * @private
 * @example strip(0.09999999999999998)=0.1
 */
function strip(num) {
  var precision = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 15;
  return +parseFloat(Number(num).toPrecision(precision));
}

/**
 * Return digits length of a number
 * @private
 * @param {*number} num Input number
 */
function digitLength(num) {
  // Get digit length of e
  var eSplit = num.toString().split(/[eE]/);
  var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}

/**
 * 把小数转成整数,如果是小数则放大成整数
 * @private
 * @param {*number} num 输入数
 */
function float2Fixed(num) {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''));
  }
  var dLen = digitLength(num);
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}

/**
 * 检测数字是否越界，如果越界给出提示
 * @private
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn("".concat(num, " \u8D85\u51FA\u4E86\u7CBE\u5EA6\u9650\u5236\uFF0C\u7ED3\u679C\u53EF\u80FD\u4E0D\u6B63\u786E"));
    }
  }
}

/**
 * 把递归操作扁平迭代化
 * @param {number[]} arr 要操作的数字数组
 * @param {function} operation 迭代操作
 * @private
 */
function iteratorOperation(arr, operation) {
  var _arr = (0, _toArray2.default)(arr),
    num1 = _arr[0],
    num2 = _arr[1],
    others = _arr.slice(2);
  var res = operation(num1, num2);
  others.forEach(function (num) {
    res = operation(res, num);
  });
  return res;
}

/**
 * 高精度乘法
 * @export
 */
function times() {
  for (var _len = arguments.length, nums = new Array(_len), _key = 0; _key < _len; _key++) {
    nums[_key] = arguments[_key];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, times);
  }
  var num1 = nums[0],
    num2 = nums[1];
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  var baseNum = digitLength(num1) + digitLength(num2);
  var leftValue = num1Changed * num2Changed;
  checkBoundary(leftValue);
  return leftValue / Math.pow(10, baseNum);
}

/**
 * 高精度加法
 * @export
 */
function plus() {
  for (var _len2 = arguments.length, nums = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    nums[_key2] = arguments[_key2];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, plus);
  }
  var num1 = nums[0],
    num2 = nums[1];
  // 取最大的小数位
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  // 把小数都转为整数然后再计算
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}

/**
 * 高精度减法
 * @export
 */
function minus() {
  for (var _len3 = arguments.length, nums = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    nums[_key3] = arguments[_key3];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, minus);
  }
  var num1 = nums[0],
    num2 = nums[1];
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}

/**
 * 高精度除法
 * @export
 */
function divide() {
  for (var _len4 = arguments.length, nums = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    nums[_key4] = arguments[_key4];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, divide);
  }
  var num1 = nums[0],
    num2 = nums[1];
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  // 重要，这里必须用strip进行修正
  return times(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))));
}

/**
 * 四舍五入
 * @export
 */
function round(num, ratio) {
  var base = Math.pow(10, ratio);
  var result = divide(Math.round(Math.abs(times(num, base))), base);
  if (num < 0 && result !== 0) {
    result = times(result, -1);
  }
  // 位数不足则补0
  return result;
}

/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 * @export
 */
function enableBoundaryChecking() {
  var flag = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
  _boundaryCheckingState = flag;
}
var _default = {
  times: times,
  plus: plus,
  minus: minus,
  divide: divide,
  round: round,
  enableBoundaryChecking: enableBoundaryChecking
};
exports.default = _default;

/***/ }),
/* 71 */
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/toArray.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__(/*! ./arrayWithHoles.js */ 6);
var iterableToArray = __webpack_require__(/*! ./iterableToArray.js */ 20);
var unsupportedIterableToArray = __webpack_require__(/*! ./unsupportedIterableToArray.js */ 8);
var nonIterableRest = __webpack_require__(/*! ./nonIterableRest.js */ 10);
function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || unsupportedIterableToArray(arr) || nonIterableRest();
}
module.exports = _toArray, module.exports.__esModule = true, module.exports["default"] = module.exports;

/***/ }),
/* 72 */
/*!******************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/config.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 此版本发布于2023-03-27
var version = '2.0.36';

// 开发环境才提示，生产环境不会提示
if (true) {
  console.log("\n %c uView V".concat(version, " %c https://uviewui.com/ \n\n"), 'color: #ffffff; background: #3c9cff; padding:5px 0; border-radius: 5px;');
}
var _default = {
  v: version,
  version: version,
  // 主题名称
  type: ['primary', 'success', 'info', 'error', 'warning'],
  // 颜色部分，本来可以通过scss的:export导出供js使用，但是奈何nvue不支持
  color: {
    'u-primary': '#2979ff',
    'u-warning': '#ff9900',
    'u-success': '#19be6b',
    'u-error': '#fa3534',
    'u-info': '#909399',
    'u-main-color': '#303133',
    'u-content-color': '#606266',
    'u-tips-color': '#909399',
    'u-light-color': '#c0c4cc'
  },
  // 默认单位，可以通过配置为rpx，那么在用于传入组件大小参数为数值时，就默认为rpx
  unit: 'px'
};
exports.default = _default;

/***/ }),
/* 73 */
/*!*****************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ 11));
var _config = _interopRequireDefault(__webpack_require__(/*! ./config */ 72));
var _actionSheet = _interopRequireDefault(__webpack_require__(/*! ./props/actionSheet.js */ 74));
var _album = _interopRequireDefault(__webpack_require__(/*! ./props/album.js */ 75));
var _alert = _interopRequireDefault(__webpack_require__(/*! ./props/alert.js */ 76));
var _avatar = _interopRequireDefault(__webpack_require__(/*! ./props/avatar */ 77));
var _avatarGroup = _interopRequireDefault(__webpack_require__(/*! ./props/avatarGroup */ 78));
var _backtop = _interopRequireDefault(__webpack_require__(/*! ./props/backtop */ 79));
var _badge = _interopRequireDefault(__webpack_require__(/*! ./props/badge */ 80));
var _button = _interopRequireDefault(__webpack_require__(/*! ./props/button */ 81));
var _calendar = _interopRequireDefault(__webpack_require__(/*! ./props/calendar */ 82));
var _carKeyboard = _interopRequireDefault(__webpack_require__(/*! ./props/carKeyboard */ 83));
var _cell = _interopRequireDefault(__webpack_require__(/*! ./props/cell */ 84));
var _cellGroup = _interopRequireDefault(__webpack_require__(/*! ./props/cellGroup */ 85));
var _checkbox = _interopRequireDefault(__webpack_require__(/*! ./props/checkbox */ 86));
var _checkboxGroup = _interopRequireDefault(__webpack_require__(/*! ./props/checkboxGroup */ 87));
var _circleProgress = _interopRequireDefault(__webpack_require__(/*! ./props/circleProgress */ 88));
var _code = _interopRequireDefault(__webpack_require__(/*! ./props/code */ 89));
var _codeInput = _interopRequireDefault(__webpack_require__(/*! ./props/codeInput */ 90));
var _col = _interopRequireDefault(__webpack_require__(/*! ./props/col */ 91));
var _collapse = _interopRequireDefault(__webpack_require__(/*! ./props/collapse */ 92));
var _collapseItem = _interopRequireDefault(__webpack_require__(/*! ./props/collapseItem */ 93));
var _columnNotice = _interopRequireDefault(__webpack_require__(/*! ./props/columnNotice */ 94));
var _countDown = _interopRequireDefault(__webpack_require__(/*! ./props/countDown */ 95));
var _countTo = _interopRequireDefault(__webpack_require__(/*! ./props/countTo */ 96));
var _datetimePicker = _interopRequireDefault(__webpack_require__(/*! ./props/datetimePicker */ 97));
var _divider = _interopRequireDefault(__webpack_require__(/*! ./props/divider */ 98));
var _empty = _interopRequireDefault(__webpack_require__(/*! ./props/empty */ 99));
var _form = _interopRequireDefault(__webpack_require__(/*! ./props/form */ 100));
var _formItem = _interopRequireDefault(__webpack_require__(/*! ./props/formItem */ 101));
var _gap = _interopRequireDefault(__webpack_require__(/*! ./props/gap */ 102));
var _grid = _interopRequireDefault(__webpack_require__(/*! ./props/grid */ 103));
var _gridItem = _interopRequireDefault(__webpack_require__(/*! ./props/gridItem */ 104));
var _icon = _interopRequireDefault(__webpack_require__(/*! ./props/icon */ 105));
var _image = _interopRequireDefault(__webpack_require__(/*! ./props/image */ 106));
var _indexAnchor = _interopRequireDefault(__webpack_require__(/*! ./props/indexAnchor */ 107));
var _indexList = _interopRequireDefault(__webpack_require__(/*! ./props/indexList */ 108));
var _input = _interopRequireDefault(__webpack_require__(/*! ./props/input */ 109));
var _keyboard = _interopRequireDefault(__webpack_require__(/*! ./props/keyboard */ 110));
var _line = _interopRequireDefault(__webpack_require__(/*! ./props/line */ 111));
var _lineProgress = _interopRequireDefault(__webpack_require__(/*! ./props/lineProgress */ 112));
var _link = _interopRequireDefault(__webpack_require__(/*! ./props/link */ 113));
var _list = _interopRequireDefault(__webpack_require__(/*! ./props/list */ 114));
var _listItem = _interopRequireDefault(__webpack_require__(/*! ./props/listItem */ 115));
var _loadingIcon = _interopRequireDefault(__webpack_require__(/*! ./props/loadingIcon */ 116));
var _loadingPage = _interopRequireDefault(__webpack_require__(/*! ./props/loadingPage */ 117));
var _loadmore = _interopRequireDefault(__webpack_require__(/*! ./props/loadmore */ 118));
var _modal = _interopRequireDefault(__webpack_require__(/*! ./props/modal */ 119));
var _navbar = _interopRequireDefault(__webpack_require__(/*! ./props/navbar */ 120));
var _noNetwork = _interopRequireDefault(__webpack_require__(/*! ./props/noNetwork */ 122));
var _noticeBar = _interopRequireDefault(__webpack_require__(/*! ./props/noticeBar */ 123));
var _notify = _interopRequireDefault(__webpack_require__(/*! ./props/notify */ 124));
var _numberBox = _interopRequireDefault(__webpack_require__(/*! ./props/numberBox */ 125));
var _numberKeyboard = _interopRequireDefault(__webpack_require__(/*! ./props/numberKeyboard */ 126));
var _overlay = _interopRequireDefault(__webpack_require__(/*! ./props/overlay */ 127));
var _parse = _interopRequireDefault(__webpack_require__(/*! ./props/parse */ 128));
var _picker = _interopRequireDefault(__webpack_require__(/*! ./props/picker */ 129));
var _popup = _interopRequireDefault(__webpack_require__(/*! ./props/popup */ 130));
var _radio = _interopRequireDefault(__webpack_require__(/*! ./props/radio */ 131));
var _radioGroup = _interopRequireDefault(__webpack_require__(/*! ./props/radioGroup */ 132));
var _rate = _interopRequireDefault(__webpack_require__(/*! ./props/rate */ 133));
var _readMore = _interopRequireDefault(__webpack_require__(/*! ./props/readMore */ 134));
var _row = _interopRequireDefault(__webpack_require__(/*! ./props/row */ 135));
var _rowNotice = _interopRequireDefault(__webpack_require__(/*! ./props/rowNotice */ 136));
var _scrollList = _interopRequireDefault(__webpack_require__(/*! ./props/scrollList */ 137));
var _search = _interopRequireDefault(__webpack_require__(/*! ./props/search */ 138));
var _section = _interopRequireDefault(__webpack_require__(/*! ./props/section */ 139));
var _skeleton = _interopRequireDefault(__webpack_require__(/*! ./props/skeleton */ 140));
var _slider = _interopRequireDefault(__webpack_require__(/*! ./props/slider */ 141));
var _statusBar = _interopRequireDefault(__webpack_require__(/*! ./props/statusBar */ 142));
var _steps = _interopRequireDefault(__webpack_require__(/*! ./props/steps */ 143));
var _stepsItem = _interopRequireDefault(__webpack_require__(/*! ./props/stepsItem */ 144));
var _sticky = _interopRequireDefault(__webpack_require__(/*! ./props/sticky */ 145));
var _subsection = _interopRequireDefault(__webpack_require__(/*! ./props/subsection */ 146));
var _swipeAction = _interopRequireDefault(__webpack_require__(/*! ./props/swipeAction */ 147));
var _swipeActionItem = _interopRequireDefault(__webpack_require__(/*! ./props/swipeActionItem */ 148));
var _swiper = _interopRequireDefault(__webpack_require__(/*! ./props/swiper */ 149));
var _swipterIndicator = _interopRequireDefault(__webpack_require__(/*! ./props/swipterIndicator */ 150));
var _switch2 = _interopRequireDefault(__webpack_require__(/*! ./props/switch */ 151));
var _tabbar = _interopRequireDefault(__webpack_require__(/*! ./props/tabbar */ 152));
var _tabbarItem = _interopRequireDefault(__webpack_require__(/*! ./props/tabbarItem */ 153));
var _tabs = _interopRequireDefault(__webpack_require__(/*! ./props/tabs */ 154));
var _tag = _interopRequireDefault(__webpack_require__(/*! ./props/tag */ 155));
var _text = _interopRequireDefault(__webpack_require__(/*! ./props/text */ 156));
var _textarea = _interopRequireDefault(__webpack_require__(/*! ./props/textarea */ 157));
var _toast = _interopRequireDefault(__webpack_require__(/*! ./props/toast */ 158));
var _toolbar = _interopRequireDefault(__webpack_require__(/*! ./props/toolbar */ 159));
var _tooltip = _interopRequireDefault(__webpack_require__(/*! ./props/tooltip */ 160));
var _transition = _interopRequireDefault(__webpack_require__(/*! ./props/transition */ 161));
var _upload = _interopRequireDefault(__webpack_require__(/*! ./props/upload */ 162));
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var color = _config.default.color;
var _default = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, _actionSheet.default), _album.default), _alert.default), _avatar.default), _avatarGroup.default), _backtop.default), _badge.default), _button.default), _calendar.default), _carKeyboard.default), _cell.default), _cellGroup.default), _checkbox.default), _checkboxGroup.default), _circleProgress.default), _code.default), _codeInput.default), _col.default), _collapse.default), _collapseItem.default), _columnNotice.default), _countDown.default), _countTo.default), _datetimePicker.default), _divider.default), _empty.default), _form.default), _formItem.default), _gap.default), _grid.default), _gridItem.default), _icon.default), _image.default), _indexAnchor.default), _indexList.default), _input.default), _keyboard.default), _line.default), _lineProgress.default), _link.default), _list.default), _listItem.default), _loadingIcon.default), _loadingPage.default), _loadmore.default), _modal.default), _navbar.default), _noNetwork.default), _noticeBar.default), _notify.default), _numberBox.default), _numberKeyboard.default), _overlay.default), _parse.default), _picker.default), _popup.default), _radio.default), _radioGroup.default), _rate.default), _readMore.default), _row.default), _rowNotice.default), _scrollList.default), _search.default), _section.default), _skeleton.default), _slider.default), _statusBar.default), _steps.default), _stepsItem.default), _sticky.default), _subsection.default), _swipeAction.default), _swipeActionItem.default), _swiper.default), _swipterIndicator.default), _switch2.default), _tabbar.default), _tabbarItem.default), _tabs.default), _tag.default), _text.default), _textarea.default), _toast.default), _toolbar.default), _tooltip.default), _transition.default), _upload.default);
exports.default = _default;

/***/ }),
/* 74 */
/*!*****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/actionSheet.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:44:35
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/actionSheet.js
 */
var _default = {
  // action-sheet组件
  actionSheet: {
    show: false,
    title: '',
    description: '',
    actions: function actions() {
      return [];
    },
    index: '',
    cancelText: '',
    closeOnClickAction: true,
    safeAreaInsetBottom: true,
    openType: '',
    closeOnClickOverlay: true,
    round: 0
  }
};
exports.default = _default;

/***/ }),
/* 75 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/album.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:47:24
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/album.js
 */
var _default = {
  // album 组件
  album: {
    urls: function urls() {
      return [];
    },
    keyName: '',
    singleSize: 180,
    multipleSize: 70,
    space: 6,
    singleMode: 'scaleToFill',
    multipleMode: 'aspectFill',
    maxCount: 9,
    previewFullImage: true,
    rowCount: 3,
    showMore: true
  }
};
exports.default = _default;

/***/ }),
/* 76 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/alert.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:48:53
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/alert.js
 */
var _default = {
  // alert警告组件
  alert: {
    title: '',
    type: 'warning',
    description: '',
    closable: false,
    showIcon: false,
    effect: 'light',
    center: false,
    fontSize: 14
  }
};
exports.default = _default;

/***/ }),
/* 77 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/avatar.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:49:22
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/avatar.js
 */
var _default = {
  // avatar 组件
  avatar: {
    src: '',
    shape: 'circle',
    size: 40,
    mode: 'scaleToFill',
    text: '',
    bgColor: '#c0c4cc',
    color: '#ffffff',
    fontSize: 18,
    icon: '',
    mpAvatar: false,
    randomBgColor: false,
    defaultUrl: '',
    colorIndex: '',
    name: ''
  }
};
exports.default = _default;

/***/ }),
/* 78 */
/*!*****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/avatarGroup.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:49:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/avatarGroup.js
 */
var _default = {
  // avatarGroup 组件
  avatarGroup: {
    urls: function urls() {
      return [];
    },
    maxCount: 5,
    shape: 'circle',
    mode: 'scaleToFill',
    showMore: true,
    size: 40,
    keyName: '',
    gap: 0.5,
    extraValue: 0
  }
};
exports.default = _default;

/***/ }),
/* 79 */
/*!*************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/backtop.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:50:18
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/backtop.js
 */
var _default = {
  // backtop组件
  backtop: {
    mode: 'circle',
    icon: 'arrow-upward',
    text: '',
    duration: 100,
    scrollTop: 0,
    top: 400,
    bottom: 100,
    right: 20,
    zIndex: 9,
    iconStyle: function iconStyle() {
      return {
        color: '#909399',
        fontSize: '19px'
      };
    }
  }
};
exports.default = _default;

/***/ }),
/* 80 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/badge.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 19:51:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/badge.js
 */
var _default = {
  // 徽标数组件
  badge: {
    isDot: false,
    value: '',
    show: true,
    max: 999,
    type: 'error',
    showZero: false,
    bgColor: null,
    color: null,
    shape: 'circle',
    numberType: 'overflow',
    offset: function offset() {
      return [];
    },
    inverted: false,
    absolute: false
  }
};
exports.default = _default;

/***/ }),
/* 81 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/button.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:51:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/button.js
 */
var _default = {
  // button组件
  button: {
    hairline: false,
    type: 'info',
    size: 'normal',
    shape: 'square',
    plain: false,
    disabled: false,
    loading: false,
    loadingText: '',
    loadingMode: 'spinner',
    loadingSize: 15,
    openType: '',
    formType: '',
    appParameter: '',
    hoverStopPropagation: true,
    lang: 'en',
    sessionFrom: '',
    sendMessageTitle: '',
    sendMessagePath: '',
    sendMessageImg: '',
    showMessageCard: false,
    dataName: '',
    throttleTime: 0,
    hoverStartTime: 0,
    hoverStayTime: 200,
    text: '',
    icon: '',
    iconColor: '',
    color: ''
  }
};
exports.default = _default;

/***/ }),
/* 82 */
/*!**************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/calendar.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:52:43
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/calendar.js
 */
var _default = {
  // calendar 组件
  calendar: {
    title: '日期选择',
    showTitle: true,
    showSubtitle: true,
    mode: 'single',
    startText: '开始',
    endText: '结束',
    customList: function customList() {
      return [];
    },
    color: '#3c9cff',
    minDate: 0,
    maxDate: 0,
    defaultDate: null,
    maxCount: Number.MAX_SAFE_INTEGER,
    // Infinity
    rowHeight: 56,
    formatter: null,
    showLunar: false,
    showMark: true,
    confirmText: '确定',
    confirmDisabledText: '确定',
    show: false,
    closeOnClickOverlay: false,
    readonly: false,
    showConfirm: true,
    maxRange: Number.MAX_SAFE_INTEGER,
    // Infinity
    rangePrompt: '',
    showRangePrompt: true,
    allowSameDay: false,
    round: 0,
    monthNum: 3
  }
};
exports.default = _default;

/***/ }),
/* 83 */
/*!*****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/carKeyboard.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:53:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/carKeyboard.js
 */
var _default = {
  // 车牌号键盘
  carKeyboard: {
    random: false
  }
};
exports.default = _default;

/***/ }),
/* 84 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/cell.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 20:53:09
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/cell.js
 */
var _default = {
  // cell组件的props
  cell: {
    customClass: '',
    title: '',
    label: '',
    value: '',
    icon: '',
    disabled: false,
    border: true,
    center: false,
    url: '',
    linkType: 'navigateTo',
    clickable: false,
    isLink: false,
    required: false,
    arrowDirection: '',
    iconStyle: {},
    rightIconStyle: {},
    rightIcon: 'arrow-right',
    titleStyle: {},
    size: '',
    stop: true,
    name: ''
  }
};
exports.default = _default;

/***/ }),
/* 85 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/cellGroup.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:54:16
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/cellGroup.js
 */
var _default = {
  // cell-group组件的props
  cellGroup: {
    title: '',
    border: true,
    customStyle: {}
  }
};
exports.default = _default;

/***/ }),
/* 86 */
/*!**************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/checkbox.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-23 21:06:59
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/checkbox.js
 */
var _default = {
  // checkbox组件
  checkbox: {
    name: '',
    shape: '',
    size: '',
    checkbox: false,
    disabled: '',
    activeColor: '',
    inactiveColor: '',
    iconSize: '',
    iconColor: '',
    label: '',
    labelSize: '',
    labelColor: '',
    labelDisabled: ''
  }
};
exports.default = _default;

/***/ }),
/* 87 */
/*!*******************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/checkboxGroup.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:54:47
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/checkboxGroup.js
 */
var _default = {
  // checkbox-group组件
  checkboxGroup: {
    name: '',
    value: function value() {
      return [];
    },
    shape: 'square',
    disabled: false,
    activeColor: '#2979ff',
    inactiveColor: '#c8c9cc',
    size: 18,
    placement: 'row',
    labelSize: 14,
    labelColor: '#303133',
    labelDisabled: false,
    iconColor: '#ffffff',
    iconSize: 12,
    iconPlacement: 'left',
    borderBottom: false
  }
};
exports.default = _default;

/***/ }),
/* 88 */
/*!********************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/circleProgress.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:02
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/circleProgress.js
 */
var _default = {
  // circleProgress 组件
  circleProgress: {
    percentage: 30
  }
};
exports.default = _default;

/***/ }),
/* 89 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/code.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/code.js
 */
var _default = {
  // code 组件
  code: {
    seconds: 60,
    startText: '获取验证码',
    changeText: 'X秒重新获取',
    endText: '重新获取',
    keepRunning: false,
    uniqueKey: ''
  }
};
exports.default = _default;

/***/ }),
/* 90 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/codeInput.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:55:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/codeInput.js
 */
var _default = {
  // codeInput 组件
  codeInput: {
    adjustPosition: true,
    maxlength: 6,
    dot: false,
    mode: 'box',
    hairline: false,
    space: 10,
    value: '',
    focus: false,
    bold: false,
    color: '#606266',
    fontSize: 18,
    size: 35,
    disabledKeyboard: false,
    borderColor: '#c9cacc',
    disabledDot: true
  }
};
exports.default = _default;

/***/ }),
/* 91 */
/*!*********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/col.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:56:12
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/col.js
 */
var _default = {
  // col 组件
  col: {
    span: 12,
    offset: 0,
    justify: 'start',
    align: 'stretch',
    textAlign: 'left'
  }
};
exports.default = _default;

/***/ }),
/* 92 */
/*!**************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/collapse.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:56:30
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/collapse.js
 */
var _default = {
  // collapse 组件
  collapse: {
    value: null,
    accordion: false,
    border: true
  }
};
exports.default = _default;

/***/ }),
/* 93 */
/*!******************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/collapseItem.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:56:42
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/collapseItem.js
 */
var _default = {
  // collapseItem 组件
  collapseItem: {
    title: '',
    value: '',
    label: '',
    disabled: false,
    isLink: true,
    clickable: true,
    border: true,
    align: 'left',
    name: '',
    icon: '',
    duration: 300
  }
};
exports.default = _default;

/***/ }),
/* 94 */
/*!******************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/columnNotice.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:16
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/columnNotice.js
 */
var _default = {
  // columnNotice 组件
  columnNotice: {
    text: '',
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    fontSize: 14,
    speed: 80,
    step: false,
    duration: 1500,
    disableTouch: true
  }
};
exports.default = _default;

/***/ }),
/* 95 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/countDown.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:11:29
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/countDown.js
 */
var _default = {
  // u-count-down 计时器组件
  countDown: {
    time: 0,
    format: 'HH:mm:ss',
    autoStart: true,
    millisecond: false
  }
};
exports.default = _default;

/***/ }),
/* 96 */
/*!*************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/countTo.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:32
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/countTo.js
 */
var _default = {
  // countTo 组件
  countTo: {
    startVal: 0,
    endVal: 0,
    duration: 2000,
    autoplay: true,
    decimals: 0,
    useEasing: true,
    decimal: '.',
    color: '#606266',
    fontSize: 22,
    bold: false,
    separator: ''
  }
};
exports.default = _default;

/***/ }),
/* 97 */
/*!********************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/datetimePicker.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:57:48
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/datetimePicker.js
 */
var _default = {
  // datetimePicker 组件
  datetimePicker: {
    show: false,
    showToolbar: true,
    value: '',
    title: '',
    mode: 'datetime',
    maxDate: new Date(new Date().getFullYear() + 10, 0, 1).getTime(),
    minDate: new Date(new Date().getFullYear() - 10, 0, 1).getTime(),
    minHour: 0,
    maxHour: 23,
    minMinute: 0,
    maxMinute: 59,
    filter: null,
    formatter: null,
    loading: false,
    itemHeight: 44,
    cancelText: '取消',
    confirmText: '确认',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    visibleItemCount: 5,
    closeOnClickOverlay: false,
    defaultIndex: function defaultIndex() {
      return [];
    }
  }
};
exports.default = _default;

/***/ }),
/* 98 */
/*!*************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/divider.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:58:03
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/divider.js
 */
var _default = {
  // divider组件
  divider: {
    dashed: false,
    hairline: true,
    dot: false,
    textPosition: 'center',
    text: '',
    textSize: 14,
    textColor: '#909399',
    lineColor: '#dcdfe6'
  }
};
exports.default = _default;

/***/ }),
/* 99 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/empty.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:27
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/empty.js
 */
var _default = {
  // empty组件
  empty: {
    icon: '',
    text: '',
    textColor: '#c0c4cc',
    textSize: 14,
    iconColor: '#c0c4cc',
    iconSize: 90,
    mode: 'data',
    width: 160,
    height: 160,
    show: true,
    marginTop: 0
  }
};
exports.default = _default;

/***/ }),
/* 100 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/form.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:49
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/form.js
 */
var _default = {
  // form 组件
  form: {
    model: function model() {
      return {};
    },
    rules: function rules() {
      return {};
    },
    errorType: 'message',
    borderBottom: true,
    labelPosition: 'left',
    labelWidth: 45,
    labelAlign: 'left',
    labelStyle: function labelStyle() {
      return {};
    }
  }
};
exports.default = _default;

/***/ }),
/* 101 */
/*!**************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/formItem.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:04:32
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/formItem.js
 */
var _default = {
  // formItem 组件
  formItem: {
    label: '',
    prop: '',
    borderBottom: '',
    labelPosition: '',
    labelWidth: '',
    rightIcon: '',
    leftIcon: '',
    required: false,
    leftIconStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 102 */
/*!*********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/gap.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:05:25
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/gap.js
 */
var _default = {
  // gap组件
  gap: {
    bgColor: 'transparent',
    height: 20,
    marginTop: 0,
    marginBottom: 0,
    customStyle: {}
  }
};
exports.default = _default;

/***/ }),
/* 103 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/grid.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:05:57
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/grid.js
 */
var _default = {
  // grid组件
  grid: {
    col: 3,
    border: false,
    align: 'left'
  }
};
exports.default = _default;

/***/ }),
/* 104 */
/*!**************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/gridItem.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/gridItem.js
 */
var _default = {
  // grid-item组件
  gridItem: {
    name: null,
    bgColor: 'transparent'
  }
};
exports.default = _default;

/***/ }),
/* 105 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/icon.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 72));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 18:00:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/icon.js
 */

var color = _config.default.color;
var _default = {
  // icon组件
  icon: {
    name: '',
    color: color['u-content-color'],
    size: '16px',
    bold: false,
    index: '',
    hoverClass: '',
    customPrefix: 'uicon',
    label: '',
    labelPos: 'right',
    labelSize: '15px',
    labelColor: color['u-content-color'],
    space: '3px',
    imgMode: '',
    width: '',
    height: '',
    top: 0,
    stop: false
  }
};
exports.default = _default;

/***/ }),
/* 106 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/image.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:01:51
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/image.js
 */
var _default = {
  // image组件
  image: {
    src: '',
    mode: 'aspectFill',
    width: '300',
    height: '225',
    shape: 'square',
    radius: 0,
    lazyLoad: true,
    showMenuByLongpress: true,
    loadingIcon: 'photo',
    errorIcon: 'error-circle',
    showLoading: true,
    showError: true,
    fade: true,
    webp: false,
    duration: 500,
    bgColor: '#f3f4f6'
  }
};
exports.default = _default;

/***/ }),
/* 107 */
/*!*****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/indexAnchor.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:15
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/indexAnchor.js
 */
var _default = {
  // indexAnchor 组件
  indexAnchor: {
    text: '',
    color: '#606266',
    size: 14,
    bgColor: '#dedede',
    height: 32
  }
};
exports.default = _default;

/***/ }),
/* 108 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/indexList.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:35
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/indexList.js
 */
var _default = {
  // indexList 组件
  indexList: {
    inactiveColor: '#606266',
    activeColor: '#5677fc',
    indexList: function indexList() {
      return [];
    },
    sticky: true,
    customNavHeight: 0
  }
};
exports.default = _default;

/***/ }),
/* 109 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/input.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:13:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/input.js
 */
var _default = {
  // index 组件
  input: {
    value: '',
    type: 'text',
    fixed: false,
    disabled: false,
    disabledColor: '#f5f7fa',
    clearable: false,
    password: false,
    maxlength: -1,
    placeholder: null,
    placeholderClass: 'input-placeholder',
    placeholderStyle: 'color: #c0c4cc',
    showWordLimit: false,
    confirmType: 'done',
    confirmHold: false,
    holdKeyboard: false,
    focus: false,
    autoBlur: false,
    disableDefaultPadding: false,
    cursor: -1,
    cursorSpacing: 30,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    inputAlign: 'left',
    fontSize: '15px',
    color: '#303133',
    prefixIcon: '',
    prefixIconStyle: '',
    suffixIcon: '',
    suffixIconStyle: '',
    border: 'surround',
    readonly: false,
    shape: 'square',
    formatter: null
  }
};
exports.default = _default;

/***/ }),
/* 110 */
/*!**************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/keyboard.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:07:49
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/keyboard.js
 */
var _default = {
  // 键盘组件
  keyboard: {
    mode: 'number',
    dotDisabled: false,
    tooltip: true,
    showTips: true,
    tips: '',
    showCancel: true,
    showConfirm: true,
    random: false,
    safeAreaInsetBottom: true,
    closeOnClickOverlay: true,
    show: false,
    overlay: true,
    zIndex: 10075,
    cancelText: '取消',
    confirmText: '确定',
    autoChange: false
  }
};
exports.default = _default;

/***/ }),
/* 111 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/line.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:04:49
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/line.js
 */
var _default = {
  // line组件
  line: {
    color: '#d6d7d9',
    length: '100%',
    direction: 'row',
    hairline: true,
    margin: 0,
    dashed: false
  }
};
exports.default = _default;

/***/ }),
/* 112 */
/*!******************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/lineProgress.js ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:14:11
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/lineProgress.js
 */
var _default = {
  // lineProgress 组件
  lineProgress: {
    activeColor: '#19be6b',
    inactiveColor: '#ececec',
    percentage: 0,
    showText: true,
    height: 12
  }
};
exports.default = _default;

/***/ }),
/* 113 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/link.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 72));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:45:36
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/link.js
 */

var color = _config.default.color;
var _default = {
  // link超链接组件props参数
  link: {
    color: color['u-primary'],
    fontSize: 15,
    underLine: false,
    href: '',
    mpTips: '链接已复制，请在浏览器打开',
    lineColor: '',
    text: ''
  }
};
exports.default = _default;

/***/ }),
/* 114 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/list.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:14:53
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/list.js
 */
var _default = {
  // list 组件
  list: {
    showScrollbar: false,
    lowerThreshold: 50,
    upperThreshold: 0,
    scrollTop: 0,
    offsetAccuracy: 10,
    enableFlex: false,
    pagingEnabled: false,
    scrollable: true,
    scrollIntoView: '',
    scrollWithAnimation: false,
    enableBackToTop: false,
    height: 0,
    width: 0,
    preLoadScreen: 1
  }
};
exports.default = _default;

/***/ }),
/* 115 */
/*!**************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/listItem.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:40
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/listItem.js
 */
var _default = {
  // listItem 组件
  listItem: {
    anchor: ''
  }
};
exports.default = _default;

/***/ }),
/* 116 */
/*!*****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/loadingIcon.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _config = _interopRequireDefault(__webpack_require__(/*! ../config */ 72));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:45:47
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadingIcon.js
 */

var color = _config.default.color;
var _default = {
  // loading-icon加载中图标组件
  loadingIcon: {
    show: true,
    color: color['u-tips-color'],
    textColor: color['u-tips-color'],
    vertical: false,
    mode: 'spinner',
    size: 24,
    textSize: 15,
    text: '',
    timingFunction: 'ease-in-out',
    duration: 1200,
    inactiveColor: ''
  }
};
exports.default = _default;

/***/ }),
/* 117 */
/*!*****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/loadingPage.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:00:23
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadingPage.js
 */
var _default = {
  // loading-page组件
  loadingPage: {
    loadingText: '正在加载',
    image: '',
    loadingMode: 'circle',
    loading: false,
    bgColor: '#ffffff',
    color: '#C8C8C8',
    fontSize: 19,
    iconSize: 28,
    loadingColor: '#C8C8C8'
  }
};
exports.default = _default;

/***/ }),
/* 118 */
/*!**************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/loadmore.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:26
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/loadmore.js
 */
var _default = {
  // loadmore 组件
  loadmore: {
    status: 'loadmore',
    bgColor: 'transparent',
    icon: true,
    fontSize: 14,
    iconSize: 17,
    color: '#606266',
    loadingIcon: 'spinner',
    loadmoreText: '加载更多',
    loadingText: '正在加载...',
    nomoreText: '没有更多了',
    isDot: false,
    iconColor: '#b7b7b7',
    marginTop: 10,
    marginBottom: 10,
    height: 'auto',
    line: false,
    lineColor: '#E6E8EB',
    dashed: false
  }
};
exports.default = _default;

/***/ }),
/* 119 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/modal.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:15:59
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/modal.js
 */
var _default = {
  // modal 组件
  modal: {
    show: false,
    title: '',
    content: '',
    confirmText: '确认',
    cancelText: '取消',
    showConfirmButton: true,
    showCancelButton: false,
    confirmColor: '#2979ff',
    cancelColor: '#606266',
    buttonReverse: false,
    zoom: true,
    asyncClose: false,
    closeOnClickOverlay: false,
    negativeTop: 0,
    width: '650rpx',
    confirmButtonShape: ''
  }
};
exports.default = _default;

/***/ }),
/* 120 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/navbar.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _color = _interopRequireDefault(__webpack_require__(/*! ../color */ 121));
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:16:18
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/navbar.js
 */
var _default = {
  // navbar 组件
  navbar: {
    safeAreaInsetTop: true,
    placeholder: false,
    fixed: true,
    border: false,
    leftIcon: 'arrow-left',
    leftText: '',
    rightText: '',
    rightIcon: '',
    title: '',
    bgColor: '#ffffff',
    titleWidth: '400rpx',
    height: '44px',
    leftIconSize: 20,
    leftIconColor: _color.default.mainColor,
    autoBack: false,
    titleStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 121 */
/*!*****************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/color.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// 为了让用户能够自定义主题，会逐步弃用此文件，各颜色通过css提供
// 为了给某些特殊场景使用和向后兼容，无需删除此文件(2020-06-20)
var color = {
  primary: '#3c9cff',
  info: '#909399',
  default: '#909399',
  warning: '#f9ae3d',
  error: '#f56c6c',
  success: '#5ac725',
  mainColor: '#303133',
  contentColor: '#606266',
  tipsColor: '#909399',
  lightColor: '#c0c4cc',
  borderColor: '#e4e7ed'
};
var _default = color;
exports.default = _default;

/***/ }),
/* 122 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/noNetwork.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:16:39
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/noNetwork.js
 */
var _default = {
  // noNetwork
  noNetwork: {
    tips: '哎呀，网络信号丢失',
    zIndex: '',
    image: 'data:image/png;base64,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'
  }
};
exports.default = _default;

/***/ }),
/* 123 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/noticeBar.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:17:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/noticeBar.js
 */
var _default = {
  // noticeBar
  noticeBar: {
    text: function text() {
      return [];
    },
    direction: 'row',
    step: false,
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    speed: 80,
    fontSize: 14,
    duration: 2000,
    disableTouch: true,
    url: '',
    linkType: 'navigateTo'
  }
};
exports.default = _default;

/***/ }),
/* 124 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/notify.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:10:21
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/notify.js
 */
var _default = {
  // notify组件
  notify: {
    top: 0,
    type: 'primary',
    color: '#ffffff',
    bgColor: '',
    message: '',
    duration: 3000,
    fontSize: 15,
    safeAreaInsetTop: false
  }
};
exports.default = _default;

/***/ }),
/* 125 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/numberBox.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:11:46
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/numberBox.js
 */
var _default = {
  // 步进器组件
  numberBox: {
    name: '',
    value: 0,
    min: 1,
    max: Number.MAX_SAFE_INTEGER,
    step: 1,
    integer: false,
    disabled: false,
    disabledInput: false,
    asyncChange: false,
    inputWidth: 35,
    showMinus: true,
    showPlus: true,
    decimalLength: null,
    longPress: true,
    color: '#323233',
    buttonSize: 30,
    bgColor: '#EBECEE',
    cursorSpacing: 100,
    disableMinus: false,
    disablePlus: false,
    iconStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 126 */
/*!********************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/numberKeyboard.js ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:08:05
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/numberKeyboard.js
 */
var _default = {
  // 数字键盘
  numberKeyboard: {
    mode: 'number',
    dotDisabled: false,
    random: false
  }
};
exports.default = _default;

/***/ }),
/* 127 */
/*!*************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/overlay.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/overlay.js
 */
var _default = {
  // overlay组件
  overlay: {
    show: false,
    zIndex: 10070,
    duration: 300,
    opacity: 0.5
  }
};
exports.default = _default;

/***/ }),
/* 128 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/parse.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:17:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/parse.js
 */
var _default = {
  // parse
  parse: {
    copyLink: true,
    errorImg: '',
    lazyLoad: false,
    loadingImg: '',
    pauseVideo: true,
    previewImg: true,
    setTitle: true,
    showImgMenu: true
  }
};
exports.default = _default;

/***/ }),
/* 129 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/picker.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/picker.js
 */
var _default = {
  // picker
  picker: {
    show: false,
    showToolbar: true,
    title: '',
    columns: function columns() {
      return [];
    },
    loading: false,
    itemHeight: 44,
    cancelText: '取消',
    confirmText: '确定',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    visibleItemCount: 5,
    keyName: 'text',
    closeOnClickOverlay: false,
    defaultIndex: function defaultIndex() {
      return [];
    },
    immediateChange: false
  }
};
exports.default = _default;

/***/ }),
/* 130 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/popup.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:06:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/popup.js
 */
var _default = {
  // popup组件
  popup: {
    show: false,
    overlay: true,
    mode: 'bottom',
    duration: 300,
    closeable: false,
    overlayStyle: function overlayStyle() {},
    closeOnClickOverlay: true,
    zIndex: 10075,
    safeAreaInsetBottom: true,
    safeAreaInsetTop: false,
    closeIconPos: 'top-right',
    round: 0,
    zoom: true,
    bgColor: '',
    overlayOpacity: 0.5
  }
};
exports.default = _default;

/***/ }),
/* 131 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/radio.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:02:34
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/radio.js
 */
var _default = {
  // radio组件
  radio: {
    name: '',
    shape: '',
    disabled: '',
    labelDisabled: '',
    activeColor: '',
    inactiveColor: '',
    iconSize: '',
    labelSize: '',
    label: '',
    labelColor: '',
    size: '',
    iconColor: '',
    placement: ''
  }
};
exports.default = _default;

/***/ }),
/* 132 */
/*!****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/radioGroup.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:03:12
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/radioGroup.js
 */
var _default = {
  // radio-group组件
  radioGroup: {
    value: '',
    disabled: false,
    shape: 'circle',
    activeColor: '#2979ff',
    inactiveColor: '#c8c9cc',
    name: '',
    size: 18,
    placement: 'row',
    label: '',
    labelColor: '#303133',
    labelSize: 14,
    labelDisabled: false,
    iconColor: '#ffffff',
    iconSize: 12,
    borderBottom: false,
    iconPlacement: 'left'
  }
};
exports.default = _default;

/***/ }),
/* 133 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/rate.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:05:09
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/rate.js
 */
var _default = {
  // rate组件
  rate: {
    value: 1,
    count: 5,
    disabled: false,
    size: 18,
    inactiveColor: '#b2b2b2',
    activeColor: '#FA3534',
    gutter: 4,
    minCount: 1,
    allowHalf: false,
    activeIcon: 'star-fill',
    inactiveIcon: 'star',
    touchable: true
  }
};
exports.default = _default;

/***/ }),
/* 134 */
/*!**************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/readMore.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:41
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/readMore.js
 */
var _default = {
  // readMore
  readMore: {
    showHeight: 400,
    toggle: false,
    closeText: '展开阅读全文',
    openText: '收起',
    color: '#2979ff',
    fontSize: 14,
    textIndent: '2em',
    name: ''
  }
};
exports.default = _default;

/***/ }),
/* 135 */
/*!*********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/row.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:18:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/row.js
 */
var _default = {
  // row
  row: {
    gutter: 0,
    justify: 'start',
    align: 'center'
  }
};
exports.default = _default;

/***/ }),
/* 136 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/rowNotice.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/rowNotice.js
 */
var _default = {
  // rowNotice
  rowNotice: {
    text: '',
    icon: 'volume',
    mode: '',
    color: '#f9ae3d',
    bgColor: '#fdf6ec',
    fontSize: 14,
    speed: 80
  }
};
exports.default = _default;

/***/ }),
/* 137 */
/*!****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/scrollList.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:28
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/scrollList.js
 */
var _default = {
  // scrollList
  scrollList: {
    indicatorWidth: 50,
    indicatorBarWidth: 20,
    indicator: true,
    indicatorColor: '#f2f2f2',
    indicatorActiveColor: '#3c9cff',
    indicatorStyle: ''
  }
};
exports.default = _default;

/***/ }),
/* 138 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/search.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:19:45
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/search.js
 */
var _default = {
  // search
  search: {
    shape: 'round',
    bgColor: '#f2f2f2',
    placeholder: '请输入关键字',
    clearabled: true,
    focus: false,
    showAction: true,
    actionStyle: function actionStyle() {
      return {};
    },
    actionText: '搜索',
    inputAlign: 'left',
    inputStyle: function inputStyle() {
      return {};
    },
    disabled: false,
    borderColor: 'transparent',
    searchIconColor: '#909399',
    searchIconSize: 22,
    color: '#606266',
    placeholderColor: '#909399',
    searchIcon: 'search',
    margin: '0',
    animation: false,
    value: '',
    maxlength: '-1',
    height: 32,
    label: null
  }
};
exports.default = _default;

/***/ }),
/* 139 */
/*!*************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/section.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:07:33
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/section.js
 */
var _default = {
  // u-section组件
  section: {
    title: '',
    subTitle: '更多',
    right: true,
    fontSize: 15,
    bold: true,
    color: '#303133',
    subColor: '#909399',
    showLine: true,
    lineColor: '',
    arrow: true
  }
};
exports.default = _default;

/***/ }),
/* 140 */
/*!**************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/skeleton.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:20:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/skeleton.js
 */
var _default = {
  // skeleton
  skeleton: {
    loading: true,
    animate: true,
    rows: 0,
    rowsWidth: '100%',
    rowsHeight: 18,
    title: true,
    titleWidth: '50%',
    titleHeight: 18,
    avatar: false,
    avatarSize: 32,
    avatarShape: 'circle'
  }
};
exports.default = _default;

/***/ }),
/* 141 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/slider.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:08:25
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/slider.js
 */
var _default = {
  // slider组件
  slider: {
    value: 0,
    blockSize: 18,
    min: 0,
    max: 100,
    step: 1,
    activeColor: '#2979ff',
    inactiveColor: '#c0c4cc',
    blockColor: '#ffffff',
    showValue: false,
    disabled: false,
    blockStyle: function blockStyle() {}
  }
};
exports.default = _default;

/***/ }),
/* 142 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/statusBar.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:20:39
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/statusBar.js
 */
var _default = {
  // statusBar
  statusBar: {
    bgColor: 'transparent'
  }
};
exports.default = _default;

/***/ }),
/* 143 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/steps.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:37
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/steps.js
 */
var _default = {
  // steps组件
  steps: {
    direction: 'row',
    current: 0,
    activeColor: '#3c9cff',
    inactiveColor: '#969799',
    activeIcon: '',
    inactiveIcon: '',
    dot: false
  }
};
exports.default = _default;

/***/ }),
/* 144 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/stepsItem.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/stepsItem.js
 */
var _default = {
  // steps-item组件
  stepsItem: {
    title: '',
    desc: '',
    iconSize: 17,
    error: false
  }
};
exports.default = _default;

/***/ }),
/* 145 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/sticky.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:01:30
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/sticky.js
 */
var _default = {
  // sticky组件
  sticky: {
    offsetTop: 0,
    customNavHeight: 0,
    disabled: false,
    bgColor: 'transparent',
    zIndex: '',
    index: ''
  }
};
exports.default = _default;

/***/ }),
/* 146 */
/*!****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/subsection.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:12:20
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/subsection.js
 */
var _default = {
  // subsection组件
  subsection: {
    list: [],
    current: 0,
    activeColor: '#3c9cff',
    inactiveColor: '#303133',
    mode: 'button',
    fontSize: 12,
    bold: true,
    bgColor: '#eeeeef',
    keyName: 'name'
  }
};
exports.default = _default;

/***/ }),
/* 147 */
/*!*****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/swipeAction.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:00:42
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swipeAction.js
 */
var _default = {
  // swipe-action组件
  swipeAction: {
    autoClose: true
  }
};
exports.default = _default;

/***/ }),
/* 148 */
/*!*********************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/swipeActionItem.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:01:13
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swipeActionItem.js
 */
var _default = {
  // swipeActionItem 组件
  swipeActionItem: {
    show: false,
    name: '',
    disabled: false,
    threshold: 20,
    autoClose: true,
    options: [],
    duration: 300
  }
};
exports.default = _default;

/***/ }),
/* 149 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/swiper.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:21:38
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swiper.js
 */
var _default = {
  // swiper 组件
  swiper: {
    list: function list() {
      return [];
    },
    indicator: false,
    indicatorActiveColor: '#FFFFFF',
    indicatorInactiveColor: 'rgba(255, 255, 255, 0.35)',
    indicatorStyle: '',
    indicatorMode: 'line',
    autoplay: true,
    current: 0,
    currentItemId: '',
    interval: 3000,
    duration: 300,
    circular: false,
    previousMargin: 0,
    nextMargin: 0,
    acceleration: false,
    displayMultipleItems: 1,
    easingFunction: 'default',
    keyName: 'url',
    imgMode: 'aspectFill',
    height: 130,
    bgColor: '#f3f4f6',
    radius: 4,
    loading: false,
    showTitle: false
  }
};
exports.default = _default;

/***/ }),
/* 150 */
/*!**********************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/swipterIndicator.js ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:07
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/swiperIndicator.js
 */
var _default = {
  // swiperIndicator 组件
  swiperIndicator: {
    length: 0,
    current: 0,
    indicatorActiveColor: '',
    indicatorInactiveColor: '',
    indicatorMode: 'line'
  }
};
exports.default = _default;

/***/ }),
/* 151 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/switch.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:24
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/switch.js
 */
var _default = {
  // switch
  switch: {
    loading: false,
    disabled: false,
    size: 25,
    activeColor: '#2979ff',
    inactiveColor: '#ffffff',
    value: false,
    activeValue: true,
    inactiveValue: false,
    asyncChange: false,
    space: 0
  }
};
exports.default = _default;

/***/ }),
/* 152 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/tabbar.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:40
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabbar.js
 */
var _default = {
  // tabbar
  tabbar: {
    value: null,
    safeAreaInsetBottom: true,
    border: true,
    zIndex: 1,
    activeColor: '#1989fa',
    inactiveColor: '#7d7e80',
    fixed: true,
    placeholder: true
  }
};
exports.default = _default;

/***/ }),
/* 153 */
/*!****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/tabbarItem.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:22:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabbarItem.js
 */
var _default = {
  //
  tabbarItem: {
    name: null,
    icon: '',
    badge: null,
    dot: false,
    text: '',
    badgeStyle: 'top: 6px;right:2px;'
  }
};
exports.default = _default;

/***/ }),
/* 154 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/tabs.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tabs.js
 */
var _default = {
  //
  tabs: {
    duration: 300,
    list: function list() {
      return [];
    },
    lineColor: '#3c9cff',
    activeStyle: function activeStyle() {
      return {
        color: '#303133'
      };
    },
    inactiveStyle: function inactiveStyle() {
      return {
        color: '#606266'
      };
    },
    lineWidth: 20,
    lineHeight: 3,
    lineBgSize: 'cover',
    itemStyle: function itemStyle() {
      return {
        height: '44px'
      };
    },
    scrollable: true,
    current: 0,
    keyName: 'name'
  }
};
exports.default = _default;

/***/ }),
/* 155 */
/*!*********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/tag.js ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:37
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tag.js
 */
var _default = {
  // tag 组件
  tag: {
    type: 'primary',
    disabled: false,
    size: 'medium',
    shape: 'square',
    text: '',
    bgColor: '',
    color: '',
    borderColor: '',
    closeColor: '#C6C7CB',
    name: '',
    plainFill: false,
    plain: false,
    closable: false,
    show: true,
    icon: ''
  }
};
exports.default = _default;

/***/ }),
/* 156 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/text.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:23:58
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/text.js
 */
var _default = {
  // text 组件
  text: {
    type: '',
    show: true,
    text: '',
    prefixIcon: '',
    suffixIcon: '',
    mode: '',
    href: '',
    format: '',
    call: false,
    openType: '',
    bold: false,
    block: false,
    lines: '',
    color: '#303133',
    size: 15,
    iconStyle: function iconStyle() {
      return {
        fontSize: '15px'
      };
    },
    decoration: 'none',
    margin: 0,
    lineHeight: '',
    align: 'left',
    wordWrap: 'normal'
  }
};
exports.default = _default;

/***/ }),
/* 157 */
/*!**************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/textarea.js ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:24:32
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/textarea.js
 */
var _default = {
  // textarea 组件
  textarea: {
    value: '',
    placeholder: '',
    placeholderClass: 'textarea-placeholder',
    placeholderStyle: 'color: #c0c4cc',
    height: 70,
    confirmType: 'done',
    disabled: false,
    count: false,
    focus: false,
    autoHeight: false,
    fixed: false,
    cursorSpacing: 0,
    cursor: '',
    showConfirmBar: true,
    selectionStart: -1,
    selectionEnd: -1,
    adjustPosition: true,
    disableDefaultPadding: false,
    holdKeyboard: false,
    maxlength: 140,
    border: 'surround',
    formatter: null
  }
};
exports.default = _default;

/***/ }),
/* 158 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/toast.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:07:07
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/toast.js
 */
var _default = {
  // toast组件
  toast: {
    zIndex: 10090,
    loading: false,
    text: '',
    icon: '',
    type: '',
    loadingMode: '',
    show: '',
    overlay: false,
    position: 'center',
    params: function params() {},
    duration: 2000,
    isTab: false,
    url: '',
    callback: null,
    back: false
  }
};
exports.default = _default;

/***/ }),
/* 159 */
/*!*************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/toolbar.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:24:55
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/toolbar.js
 */
var _default = {
  // toolbar 组件
  toolbar: {
    show: true,
    cancelText: '取消',
    confirmText: '确认',
    cancelColor: '#909193',
    confirmColor: '#3c9cff',
    title: ''
  }
};
exports.default = _default;

/***/ }),
/* 160 */
/*!*************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/tooltip.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:25:14
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/tooltip.js
 */
var _default = {
  // tooltip 组件
  tooltip: {
    text: '',
    copyText: '',
    size: 14,
    color: '#606266',
    bgColor: 'transparent',
    direction: 'top',
    zIndex: 10071,
    showCopy: true,
    buttons: function buttons() {
      return [];
    },
    overlay: true,
    showToast: true
  }
};
exports.default = _default;

/***/ }),
/* 161 */
/*!****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/transition.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 16:59:00
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/transition.js
 */
var _default = {
  // transition动画组件的props
  transition: {
    show: false,
    mode: 'fade',
    duration: '300',
    timingFunction: 'ease-out'
  }
};
exports.default = _default;

/***/ }),
/* 162 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/props/upload.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-20 16:44:21
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-20 17:09:50
 * @FilePath     : /u-view2.0/uview-ui/libs/config/props/upload.js
 */
var _default = {
  // upload组件
  upload: {
    accept: 'image',
    capture: function capture() {
      return ['album', 'camera'];
    },
    compressed: true,
    camera: 'back',
    maxDuration: 60,
    uploadIcon: 'camera-fill',
    uploadIconColor: '#D3D4D6',
    useBeforeRead: false,
    previewFullImage: true,
    maxCount: 52,
    disabled: false,
    imageMode: 'aspectFill',
    name: '',
    sizeType: function sizeType() {
      return ['original', 'compressed'];
    },
    multiple: false,
    deletable: true,
    maxSize: Number.MAX_VALUE,
    fileList: function fileList() {
      return [];
    },
    uploadText: '',
    width: 80,
    height: 80,
    previewImage: true
  }
};
exports.default = _default;

/***/ }),
/* 163 */
/*!******************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/config/zIndex.js ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// uniapp在H5中各API的z-index值如下：
/**
 * actionsheet: 999
 * modal: 999
 * navigate: 998
 * tabbar: 998
 * toast: 999
 */
var _default = {
  toast: 10090,
  noNetwork: 10080,
  // popup包含popup，actionsheet，keyboard，picker的值
  popup: 10075,
  mask: 10070,
  navbar: 980,
  topTips: 975,
  sticky: 970,
  indexListSticky: 965
};
exports.default = _default;

/***/ }),
/* 164 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/function/platform.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/**
 * 注意：
 * 此部分内容，在vue-cli模式下，需要在vue.config.js加入如下内容才有效：
 * module.exports = {
 *     transpileDependencies: ['uview-v2']
 * }
 */

var platform = 'none';
platform = 'vue2';
platform = 'weixin';
platform = 'mp';
var _default = platform;
exports.default = _default;

/***/ }),
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */
/*!*************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-swiper/props.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 列表数组，元素可为字符串，如为对象可通过keyName指定目标属性名
    list: {
      type: Array,
      default: uni.$u.props.swiper.list
    },
    // 是否显示面板指示器
    indicator: {
      type: Boolean,
      default: uni.$u.props.swiper.indicator
    },
    // 指示器非激活颜色
    indicatorActiveColor: {
      type: String,
      default: uni.$u.props.swiper.indicatorActiveColor
    },
    // 指示器的激活颜色
    indicatorInactiveColor: {
      type: String,
      default: uni.$u.props.swiper.indicatorInactiveColor
    },
    // 指示器样式，可通过bottom，left，right进行定位
    indicatorStyle: {
      type: [String, Object],
      default: uni.$u.props.swiper.indicatorStyle
    },
    // 指示器模式，line-线型，dot-点型
    indicatorMode: {
      type: String,
      default: uni.$u.props.swiper.indicatorMode
    },
    // 是否自动切换
    autoplay: {
      type: Boolean,
      default: uni.$u.props.swiper.autoplay
    },
    // 当前所在滑块的 index
    current: {
      type: [String, Number],
      default: uni.$u.props.swiper.current
    },
    // 当前所在滑块的 item-id ，不能与 current 被同时指定
    currentItemId: {
      type: String,
      default: uni.$u.props.swiper.currentItemId
    },
    // 滑块自动切换时间间隔
    interval: {
      type: [String, Number],
      default: uni.$u.props.swiper.interval
    },
    // 滑块切换过程所需时间
    duration: {
      type: [String, Number],
      default: uni.$u.props.swiper.duration
    },
    // 播放到末尾后是否重新回到开头
    circular: {
      type: Boolean,
      default: uni.$u.props.swiper.circular
    },
    // 前边距，可用于露出前一项的一小部分，nvue和支付宝不支持
    previousMargin: {
      type: [String, Number],
      default: uni.$u.props.swiper.previousMargin
    },
    // 后边距，可用于露出后一项的一小部分，nvue和支付宝不支持
    nextMargin: {
      type: [String, Number],
      default: uni.$u.props.swiper.nextMargin
    },
    // 当开启时，会根据滑动速度，连续滑动多屏，支付宝不支持
    acceleration: {
      type: Boolean,
      default: uni.$u.props.swiper.acceleration
    },
    // 同时显示的滑块数量，nvue、支付宝小程序不支持
    displayMultipleItems: {
      type: Number,
      default: uni.$u.props.swiper.displayMultipleItems
    },
    // 指定swiper切换缓动动画类型，有效值：default、linear、easeInCubic、easeOutCubic、easeInOutCubic
    // 只对微信小程序有效
    easingFunction: {
      type: String,
      default: uni.$u.props.swiper.easingFunction
    },
    // list数组中指定对象的目标属性名
    keyName: {
      type: String,
      default: uni.$u.props.swiper.keyName
    },
    // 图片的裁剪模式
    imgMode: {
      type: String,
      default: uni.$u.props.swiper.imgMode
    },
    // 组件高度
    height: {
      type: [String, Number],
      default: uni.$u.props.swiper.height
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.swiper.bgColor
    },
    // 组件圆角，数值或带单位的字符串
    radius: {
      type: [String, Number],
      default: uni.$u.props.swiper.radius
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: uni.$u.props.swiper.loading
    },
    // 是否显示标题，要求数组对象中有title属性
    showTitle: {
      type: Boolean,
      default: uni.$u.props.swiper.showTitle
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-row/props.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 给col添加间距，左右边距各占一半
    gutter: {
      type: [String, Number],
      default: uni.$u.props.row.gutter
    },
    // 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
    justify: {
      type: String,
      default: uni.$u.props.row.justify
    },
    // 垂直对齐方式，可选值为top、center、bottom
    align: {
      type: String,
      default: uni.$u.props.row.align
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-col/props.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 占父容器宽度的多少等分，总分为12份
    span: {
      type: [String, Number],
      default: uni.$u.props.col.span
    },
    // 指定栅格左侧的间隔数(总12栏)
    offset: {
      type: [String, Number],
      default: uni.$u.props.col.offset
    },
    // 水平排列方式，可选值为`start`(或`flex-start`)、`end`(或`flex-end`)、`center`、`around`(或`space-around`)、`between`(或`space-between`)
    justify: {
      type: String,
      default: uni.$u.props.col.justify
    },
    // 垂直对齐方式，可选值为top、center、bottom、stretch
    align: {
      type: String,
      default: uni.$u.props.col.align
    },
    // 文字对齐方式
    textAlign: {
      type: String,
      default: uni.$u.props.col.textAlign
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-icon/icons.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  'uicon-level': "\uE693",
  'uicon-column-line': "\uE68E",
  'uicon-checkbox-mark': "\uE807",
  'uicon-folder': "\uE7F5",
  'uicon-movie': "\uE7F6",
  'uicon-star-fill': "\uE669",
  'uicon-star': "\uE65F",
  'uicon-phone-fill': "\uE64F",
  'uicon-phone': "\uE622",
  'uicon-apple-fill': "\uE881",
  'uicon-chrome-circle-fill': "\uE885",
  'uicon-backspace': "\uE67B",
  'uicon-attach': "\uE632",
  'uicon-cut': "\uE948",
  'uicon-empty-car': "\uE602",
  'uicon-empty-coupon': "\uE682",
  'uicon-empty-address': "\uE646",
  'uicon-empty-favor': "\uE67C",
  'uicon-empty-permission': "\uE686",
  'uicon-empty-news': "\uE687",
  'uicon-empty-search': "\uE664",
  'uicon-github-circle-fill': "\uE887",
  'uicon-rmb': "\uE608",
  'uicon-person-delete-fill': "\uE66A",
  'uicon-reload': "\uE788",
  'uicon-order': "\uE68F",
  'uicon-server-man': "\uE6BC",
  'uicon-search': "\uE62A",
  'uicon-fingerprint': "\uE955",
  'uicon-more-dot-fill': "\uE630",
  'uicon-scan': "\uE662",
  'uicon-share-square': "\uE60B",
  'uicon-map': "\uE61D",
  'uicon-map-fill': "\uE64E",
  'uicon-tags': "\uE629",
  'uicon-tags-fill': "\uE651",
  'uicon-bookmark-fill': "\uE63B",
  'uicon-bookmark': "\uE60A",
  'uicon-eye': "\uE613",
  'uicon-eye-fill': "\uE641",
  'uicon-mic': "\uE64A",
  'uicon-mic-off': "\uE649",
  'uicon-calendar': "\uE66E",
  'uicon-calendar-fill': "\uE634",
  'uicon-trash': "\uE623",
  'uicon-trash-fill': "\uE658",
  'uicon-play-left': "\uE66D",
  'uicon-play-right': "\uE610",
  'uicon-minus': "\uE618",
  'uicon-plus': "\uE62D",
  'uicon-info': "\uE653",
  'uicon-info-circle': "\uE7D2",
  'uicon-info-circle-fill': "\uE64B",
  'uicon-question': "\uE715",
  'uicon-error': "\uE6D3",
  'uicon-close': "\uE685",
  'uicon-checkmark': "\uE6A8",
  'uicon-android-circle-fill': "\uE67E",
  'uicon-android-fill': "\uE67D",
  'uicon-ie': "\uE87B",
  'uicon-IE-circle-fill': "\uE889",
  'uicon-google': "\uE87A",
  'uicon-google-circle-fill': "\uE88A",
  'uicon-setting-fill': "\uE872",
  'uicon-setting': "\uE61F",
  'uicon-minus-square-fill': "\uE855",
  'uicon-plus-square-fill': "\uE856",
  'uicon-heart': "\uE7DF",
  'uicon-heart-fill': "\uE851",
  'uicon-camera': "\uE7D7",
  'uicon-camera-fill': "\uE870",
  'uicon-more-circle': "\uE63E",
  'uicon-more-circle-fill': "\uE645",
  'uicon-chat': "\uE620",
  'uicon-chat-fill': "\uE61E",
  'uicon-bag-fill': "\uE617",
  'uicon-bag': "\uE619",
  'uicon-error-circle-fill': "\uE62C",
  'uicon-error-circle': "\uE624",
  'uicon-close-circle': "\uE63F",
  'uicon-close-circle-fill': "\uE637",
  'uicon-checkmark-circle': "\uE63D",
  'uicon-checkmark-circle-fill': "\uE635",
  'uicon-question-circle-fill': "\uE666",
  'uicon-question-circle': "\uE625",
  'uicon-share': "\uE631",
  'uicon-share-fill': "\uE65E",
  'uicon-shopping-cart': "\uE621",
  'uicon-shopping-cart-fill': "\uE65D",
  'uicon-bell': "\uE609",
  'uicon-bell-fill': "\uE640",
  'uicon-list': "\uE650",
  'uicon-list-dot': "\uE616",
  'uicon-zhihu': "\uE6BA",
  'uicon-zhihu-circle-fill': "\uE709",
  'uicon-zhifubao': "\uE6B9",
  'uicon-zhifubao-circle-fill': "\uE6B8",
  'uicon-weixin-circle-fill': "\uE6B1",
  'uicon-weixin-fill': "\uE6B2",
  'uicon-twitter-circle-fill': "\uE6AB",
  'uicon-twitter': "\uE6AA",
  'uicon-taobao-circle-fill': "\uE6A7",
  'uicon-taobao': "\uE6A6",
  'uicon-weibo-circle-fill': "\uE6A5",
  'uicon-weibo': "\uE6A4",
  'uicon-qq-fill': "\uE6A1",
  'uicon-qq-circle-fill': "\uE6A0",
  'uicon-moments-circel-fill': "\uE69A",
  'uicon-moments': "\uE69B",
  'uicon-qzone': "\uE695",
  'uicon-qzone-circle-fill': "\uE696",
  'uicon-baidu-circle-fill': "\uE680",
  'uicon-baidu': "\uE681",
  'uicon-facebook-circle-fill': "\uE68A",
  'uicon-facebook': "\uE689",
  'uicon-car': "\uE60C",
  'uicon-car-fill': "\uE636",
  'uicon-warning-fill': "\uE64D",
  'uicon-warning': "\uE694",
  'uicon-clock-fill': "\uE638",
  'uicon-clock': "\uE60F",
  'uicon-edit-pen': "\uE612",
  'uicon-edit-pen-fill': "\uE66B",
  'uicon-email': "\uE611",
  'uicon-email-fill': "\uE642",
  'uicon-minus-circle': "\uE61B",
  'uicon-minus-circle-fill': "\uE652",
  'uicon-plus-circle': "\uE62E",
  'uicon-plus-circle-fill': "\uE661",
  'uicon-file-text': "\uE663",
  'uicon-file-text-fill': "\uE665",
  'uicon-pushpin': "\uE7E3",
  'uicon-pushpin-fill': "\uE86E",
  'uicon-grid': "\uE673",
  'uicon-grid-fill': "\uE678",
  'uicon-play-circle': "\uE647",
  'uicon-play-circle-fill': "\uE655",
  'uicon-pause-circle-fill': "\uE654",
  'uicon-pause': "\uE8FA",
  'uicon-pause-circle': "\uE643",
  'uicon-eye-off': "\uE648",
  'uicon-eye-off-outline': "\uE62B",
  'uicon-gift-fill': "\uE65C",
  'uicon-gift': "\uE65B",
  'uicon-rmb-circle-fill': "\uE657",
  'uicon-rmb-circle': "\uE677",
  'uicon-kefu-ermai': "\uE656",
  'uicon-server-fill': "\uE751",
  'uicon-coupon-fill': "\uE8C4",
  'uicon-coupon': "\uE8AE",
  'uicon-integral': "\uE704",
  'uicon-integral-fill': "\uE703",
  'uicon-home-fill': "\uE964",
  'uicon-home': "\uE965",
  'uicon-hourglass-half-fill': "\uE966",
  'uicon-hourglass': "\uE967",
  'uicon-account': "\uE628",
  'uicon-plus-people-fill': "\uE626",
  'uicon-minus-people-fill': "\uE615",
  'uicon-account-fill': "\uE614",
  'uicon-thumb-down-fill': "\uE726",
  'uicon-thumb-down': "\uE727",
  'uicon-thumb-up': "\uE733",
  'uicon-thumb-up-fill': "\uE72F",
  'uicon-lock-fill': "\uE979",
  'uicon-lock-open': "\uE973",
  'uicon-lock-opened-fill': "\uE974",
  'uicon-lock': "\uE97A",
  'uicon-red-packet-fill': "\uE690",
  'uicon-photo-fill': "\uE98B",
  'uicon-photo': "\uE98D",
  'uicon-volume-off-fill': "\uE659",
  'uicon-volume-off': "\uE644",
  'uicon-volume-fill': "\uE670",
  'uicon-volume': "\uE633",
  'uicon-red-packet': "\uE691",
  'uicon-download': "\uE63C",
  'uicon-arrow-up-fill': "\uE6B0",
  'uicon-arrow-down-fill': "\uE600",
  'uicon-play-left-fill': "\uE675",
  'uicon-play-right-fill': "\uE676",
  'uicon-rewind-left-fill': "\uE679",
  'uicon-rewind-right-fill': "\uE67A",
  'uicon-arrow-downward': "\uE604",
  'uicon-arrow-leftward': "\uE601",
  'uicon-arrow-rightward': "\uE603",
  'uicon-arrow-upward': "\uE607",
  'uicon-arrow-down': "\uE60D",
  'uicon-arrow-right': "\uE605",
  'uicon-arrow-left': "\uE60E",
  'uicon-arrow-up': "\uE606",
  'uicon-skip-back-left': "\uE674",
  'uicon-skip-forward-right': "\uE672",
  'uicon-rewind-right': "\uE66F",
  'uicon-rewind-left': "\uE671",
  'uicon-arrow-right-double': "\uE68D",
  'uicon-arrow-left-double': "\uE68C",
  'uicon-wifi-off': "\uE668",
  'uicon-wifi': "\uE667",
  'uicon-empty-data': "\uE62F",
  'uicon-empty-history': "\uE684",
  'uicon-empty-list': "\uE68B",
  'uicon-empty-page': "\uE627",
  'uicon-empty-order': "\uE639",
  'uicon-man': "\uE697",
  'uicon-woman': "\uE69C",
  'uicon-man-add': "\uE61C",
  'uicon-man-add-fill': "\uE64C",
  'uicon-man-delete': "\uE61A",
  'uicon-man-delete-fill': "\uE66A",
  'uicon-zh': "\uE70A",
  'uicon-en': "\uE692"
};
exports.default = _default;

/***/ }),
/* 277 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-icon/props.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 图标类名
    name: {
      type: String,
      default: uni.$u.props.icon.name
    },
    // 图标颜色，可接受主题色
    color: {
      type: String,
      default: uni.$u.props.icon.color
    },
    // 字体大小，单位px
    size: {
      type: [String, Number],
      default: uni.$u.props.icon.size
    },
    // 是否显示粗体
    bold: {
      type: Boolean,
      default: uni.$u.props.icon.bold
    },
    // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
    index: {
      type: [String, Number],
      default: uni.$u.props.icon.index
    },
    // 触摸图标时的类名
    hoverClass: {
      type: String,
      default: uni.$u.props.icon.hoverClass
    },
    // 自定义扩展前缀，方便用户扩展自己的图标库
    customPrefix: {
      type: String,
      default: uni.$u.props.icon.customPrefix
    },
    // 图标右边或者下面的文字
    label: {
      type: [String, Number],
      default: uni.$u.props.icon.label
    },
    // label的位置，只能右边或者下边
    labelPos: {
      type: String,
      default: uni.$u.props.icon.labelPos
    },
    // label的大小
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.icon.labelSize
    },
    // label的颜色
    labelColor: {
      type: String,
      default: uni.$u.props.icon.labelColor
    },
    // label与图标的距离
    space: {
      type: [String, Number],
      default: uni.$u.props.icon.space
    },
    // 图片的mode
    imgMode: {
      type: String,
      default: uni.$u.props.icon.imgMode
    },
    // 用于显示图片小图标时，图片的宽度
    width: {
      type: [String, Number],
      default: uni.$u.props.icon.width
    },
    // 用于显示图片小图标时，图片的高度
    height: {
      type: [String, Number],
      default: uni.$u.props.icon.height
    },
    // 用于解决某些情况下，让图标垂直居中的用途
    top: {
      type: [String, Number],
      default: uni.$u.props.icon.top
    },
    // 是否阻止事件传播
    stop: {
      type: Boolean,
      default: uni.$u.props.icon.stop
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */
/*!*****************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-subsection/props.js ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // tab的数据
    list: {
      type: Array,
      default: uni.$u.props.subsection.list
    },
    // 当前活动的tab的index
    current: {
      type: [String, Number],
      default: uni.$u.props.subsection.current
    },
    // 激活的颜色
    activeColor: {
      type: String,
      default: uni.$u.props.subsection.activeColor
    },
    // 未激活的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.subsection.inactiveColor
    },
    // 模式选择，mode=button为按钮形式，mode=subsection时为分段模式
    mode: {
      type: String,
      default: uni.$u.props.subsection.mode
    },
    // 字体大小
    fontSize: {
      type: [String, Number],
      default: uni.$u.props.subsection.fontSize
    },
    // 激活tab的字体是否加粗
    bold: {
      type: Boolean,
      default: uni.$u.props.subsection.bold
    },
    // mode = button时，组件背景颜色
    bgColor: {
      type: String,
      default: uni.$u.props.subsection.bgColor
    },
    // 从list元素对象中读取的键名
    keyName: {
      type: String,
      default: uni.$u.props.subsection.keyName
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */
/*!*************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-avatar/props.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 头像图片路径(不能为相对路径)
    src: {
      type: String,
      default: uni.$u.props.avatar.src
    },
    // 头像形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: uni.$u.props.avatar.shape
    },
    // 头像尺寸
    size: {
      type: [String, Number],
      default: uni.$u.props.avatar.size
    },
    // 裁剪模式
    mode: {
      type: String,
      default: uni.$u.props.avatar.mode
    },
    // 显示的文字
    text: {
      type: String,
      default: uni.$u.props.avatar.text
    },
    // 背景色
    bgColor: {
      type: String,
      default: uni.$u.props.avatar.bgColor
    },
    // 文字颜色
    color: {
      type: String,
      default: uni.$u.props.avatar.color
    },
    // 文字大小
    fontSize: {
      type: [String, Number],
      default: uni.$u.props.avatar.fontSize
    },
    // 显示的图标
    icon: {
      type: String,
      default: uni.$u.props.avatar.icon
    },
    // 显示小程序头像，只对百度，微信，QQ小程序有效
    mpAvatar: {
      type: Boolean,
      default: uni.$u.props.avatar.mpAvatar
    },
    // 是否使用随机背景色
    randomBgColor: {
      type: Boolean,
      default: uni.$u.props.avatar.randomBgColor
    },
    // 加载失败的默认头像(组件有内置默认图片)
    defaultUrl: {
      type: String,
      default: uni.$u.props.avatar.defaultUrl
    },
    // 如果配置了randomBgColor为true，且配置了此值，则从默认的背景色数组中取出对应索引的颜色值，取值0-19之间
    colorIndex: {
      type: [String, Number],
      // 校验参数规则，索引在0-19之间
      validator: function validator(n) {
        return uni.$u.test.range(n, [0, 19]) || n === '';
      },
      default: uni.$u.props.avatar.colorIndex
    },
    // 组件标识符
    name: {
      type: String,
      default: uni.$u.props.avatar.name
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-line/props.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    color: {
      type: String,
      default: uni.$u.props.line.color
    },
    // 长度，竖向时表现为高度，横向时表现为长度，可以为百分比，带px单位的值等
    length: {
      type: [String, Number],
      default: uni.$u.props.line.length
    },
    // 线条方向，col-竖向，row-横向
    direction: {
      type: String,
      default: uni.$u.props.line.direction
    },
    // 是否显示细边框
    hairline: {
      type: Boolean,
      default: uni.$u.props.line.hairline
    },
    // 线条与上下左右元素的间距，字符串形式，如"30px"、"20px 30px"
    margin: {
      type: [String, Number],
      default: uni.$u.props.line.margin
    },
    // 是否虚线，true-虚线，false-实线
    dashed: {
      type: Boolean,
      default: uni.$u.props.line.dashed
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */
/*!*********************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-checkbox-group/props.js ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 标识符
    name: {
      type: String,
      default: uni.$u.props.checkboxGroup.name
    },
    // 绑定的值
    value: {
      type: Array,
      default: uni.$u.props.checkboxGroup.value
    },
    // 形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: uni.$u.props.checkboxGroup.shape
    },
    // 是否禁用全部checkbox
    disabled: {
      type: Boolean,
      default: uni.$u.props.checkboxGroup.disabled
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: uni.$u.props.checkboxGroup.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.checkboxGroup.inactiveColor
    },
    // 整个组件的尺寸，默认px
    size: {
      type: [String, Number],
      default: uni.$u.props.checkboxGroup.size
    },
    // 布局方式，row-横向，column-纵向
    placement: {
      type: String,
      default: uni.$u.props.checkboxGroup.placement
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.checkboxGroup.labelSize
    },
    // label的字体颜色
    labelColor: {
      type: [String],
      default: uni.$u.props.checkboxGroup.labelColor
    },
    // 是否禁止点击文本操作
    labelDisabled: {
      type: Boolean,
      default: uni.$u.props.checkboxGroup.labelDisabled
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: uni.$u.props.checkboxGroup.iconColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.checkboxGroup.iconSize
    },
    // 勾选图标的对齐方式，left-左边，right-右边
    iconPlacement: {
      type: String,
      default: uni.$u.props.checkboxGroup.iconPlacement
    },
    // 竖向配列时，是否显示下划线
    borderBottom: {
      type: Boolean,
      default: uni.$u.props.checkboxGroup.borderBottom
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-checkbox/props.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // checkbox的名称
    name: {
      type: [String, Number, Boolean],
      default: uni.$u.props.checkbox.name
    },
    // 形状，square为方形，circle为圆型
    shape: {
      type: String,
      default: uni.$u.props.checkbox.shape
    },
    // 整体的大小
    size: {
      type: [String, Number],
      default: uni.$u.props.checkbox.size
    },
    // 是否默认选中
    checked: {
      type: Boolean,
      default: uni.$u.props.checkbox.checked
    },
    // 是否禁用
    disabled: {
      type: [String, Boolean],
      default: uni.$u.props.checkbox.disabled
    },
    // 选中状态下的颜色，如设置此值，将会覆盖parent的activeColor值
    activeColor: {
      type: String,
      default: uni.$u.props.checkbox.activeColor
    },
    // 未选中的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.checkbox.inactiveColor
    },
    // 图标的大小，单位px
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.checkbox.iconSize
    },
    // 图标颜色
    iconColor: {
      type: String,
      default: uni.$u.props.checkbox.iconColor
    },
    // label提示文字，因为nvue下，直接slot进来的文字，由于特殊的结构，无法修改样式
    label: {
      type: [String, Number],
      default: uni.$u.props.checkbox.label
    },
    // label的字体大小，px单位
    labelSize: {
      type: [String, Number],
      default: uni.$u.props.checkbox.labelSize
    },
    // label的颜色
    labelColor: {
      type: String,
      default: uni.$u.props.checkbox.labelColor
    },
    // 是否禁止点击提示语选中复选框
    labelDisabled: {
      type: [String, Boolean],
      default: uni.$u.props.checkbox.labelDisabled
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-text/props.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 主题颜色
    type: {
      type: String,
      default: uni.$u.props.text.type
    },
    // 是否显示
    show: {
      type: Boolean,
      default: uni.$u.props.text.show
    },
    // 显示的值
    text: {
      type: [String, Number],
      default: uni.$u.props.text.text
    },
    // 前置图标
    prefixIcon: {
      type: String,
      default: uni.$u.props.text.prefixIcon
    },
    // 后置图标
    suffixIcon: {
      type: String,
      default: uni.$u.props.text.suffixIcon
    },
    // 文本处理的匹配模式
    // text-普通文本，price-价格，phone-手机号，name-姓名，date-日期，link-超链接
    mode: {
      type: String,
      default: uni.$u.props.text.mode
    },
    // mode=link下，配置的链接
    href: {
      type: String,
      default: uni.$u.props.text.href
    },
    // 格式化规则
    format: {
      type: [String, Function],
      default: uni.$u.props.text.format
    },
    // mode=phone时，点击文本是否拨打电话
    call: {
      type: Boolean,
      default: uni.$u.props.text.call
    },
    // 小程序的打开方式
    openType: {
      type: String,
      default: uni.$u.props.text.openType
    },
    // 是否粗体，默认normal
    bold: {
      type: Boolean,
      default: uni.$u.props.text.bold
    },
    // 是否块状
    block: {
      type: Boolean,
      default: uni.$u.props.text.block
    },
    // 文本显示的行数，如果设置，超出此行数，将会显示省略号
    lines: {
      type: [String, Number],
      default: uni.$u.props.text.lines
    },
    // 文本颜色
    color: {
      type: String,
      default: uni.$u.props.text.color
    },
    // 字体大小
    size: {
      type: [String, Number],
      default: uni.$u.props.text.size
    },
    // 图标的样式
    iconStyle: {
      type: [Object, String],
      default: uni.$u.props.text.iconStyle
    },
    // 文字装饰，下划线，中划线等，可选值 none|underline|line-through
    decoration: {
      type: String,
      default: uni.$u.props.text.decoration
    },
    // 外边距，对象、字符串，数值形式均可
    margin: {
      type: [Object, String, Number],
      default: uni.$u.props.text.margin
    },
    // 文本行高
    lineHeight: {
      type: [String, Number],
      default: uni.$u.props.text.lineHeight
    },
    // 文本对齐方式，可选值left|center|right
    align: {
      type: String,
      default: uni.$u.props.text.align
    },
    // 文字换行，可选值break-word|normal|anywhere
    wordWrap: {
      type: String,
      default: uni.$u.props.text.wordWrap
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-gap/props.js ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 背景颜色（默认transparent）
    bgColor: {
      type: String,
      default: uni.$u.props.gap.bgColor
    },
    // 分割槽高度，单位px（默认30）
    height: {
      type: [String, Number],
      default: uni.$u.props.gap.height
    },
    // 与上一个组件的距离
    marginTop: {
      type: [String, Number],
      default: uni.$u.props.gap.marginTop
    },
    // 与下一个组件的距离
    marginBottom: {
      type: [String, Number],
      default: uni.$u.props.gap.marginBottom
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */
/*!*****************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/mixin/button.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    lang: String,
    sessionFrom: String,
    sendMessageTitle: String,
    sendMessagePath: String,
    sendMessageImg: String,
    showMessageCard: Boolean,
    appParameter: String,
    formType: String,
    openType: String
  }
};
exports.default = _default;

/***/ }),
/* 340 */
/*!*******************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/libs/mixin/openType.js ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    openType: String
  },
  methods: {
    onGetUserInfo: function onGetUserInfo(event) {
      this.$emit('getuserinfo', event.detail);
    },
    onContact: function onContact(event) {
      this.$emit('contact', event.detail);
    },
    onGetPhoneNumber: function onGetPhoneNumber(event) {
      this.$emit('getphonenumber', event.detail);
    },
    onError: function onError(event) {
      this.$emit('error', event.detail);
    },
    onLaunchApp: function onLaunchApp(event) {
      this.$emit('launchapp', event.detail);
    },
    onOpenSetting: function onOpenSetting(event) {
      this.$emit('opensetting', event.detail);
    }
  }
};
exports.default = _default;

/***/ }),
/* 341 */
/*!*************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-button/props.js ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
/*
 * @Author       : LQ
 * @Description  :
 * @version      : 1.0
 * @Date         : 2021-08-16 10:04:04
 * @LastAuthor   : LQ
 * @lastTime     : 2021-08-16 10:04:24
 * @FilePath     : /u-view2.0/uview-ui/components/u-button/props.js
 */
var _default = {
  props: {
    // 是否细边框
    hairline: {
      type: Boolean,
      default: uni.$u.props.button.hairline
    },
    // 按钮的预置样式，info，primary，error，warning，success
    type: {
      type: String,
      default: uni.$u.props.button.type
    },
    // 按钮尺寸，large，normal，small，mini
    size: {
      type: String,
      default: uni.$u.props.button.size
    },
    // 按钮形状，circle（两边为半圆），square（带圆角）
    shape: {
      type: String,
      default: uni.$u.props.button.shape
    },
    // 按钮是否镂空
    plain: {
      type: Boolean,
      default: uni.$u.props.button.plain
    },
    // 是否禁止状态
    disabled: {
      type: Boolean,
      default: uni.$u.props.button.disabled
    },
    // 是否加载中
    loading: {
      type: Boolean,
      default: uni.$u.props.button.loading
    },
    // 加载中提示文字
    loadingText: {
      type: [String, Number],
      default: uni.$u.props.button.loadingText
    },
    // 加载状态图标类型
    loadingMode: {
      type: String,
      default: uni.$u.props.button.loadingMode
    },
    // 加载图标大小
    loadingSize: {
      type: [String, Number],
      default: uni.$u.props.button.loadingSize
    },
    // 开放能力，具体请看uniapp稳定关于button组件部分说明
    // https://uniapp.dcloud.io/component/button
    openType: {
      type: String,
      default: uni.$u.props.button.openType
    },
    // 用于 <form> 组件，点击分别会触发 <form> 组件的 submit/reset 事件
    // 取值为submit（提交表单），reset（重置表单）
    formType: {
      type: String,
      default: uni.$u.props.button.formType
    },
    // 打开 APP 时，向 APP 传递的参数，open-type=launchApp时有效
    // 只微信小程序、QQ小程序有效
    appParameter: {
      type: String,
      default: uni.$u.props.button.appParameter
    },
    // 指定是否阻止本节点的祖先节点出现点击态，微信小程序有效
    hoverStopPropagation: {
      type: Boolean,
      default: uni.$u.props.button.hoverStopPropagation
    },
    // 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。只微信小程序有效
    lang: {
      type: String,
      default: uni.$u.props.button.lang
    },
    // 会话来源，open-type="contact"时有效。只微信小程序有效
    sessionFrom: {
      type: String,
      default: uni.$u.props.button.sessionFrom
    },
    // 会话内消息卡片标题，open-type="contact"时有效
    // 默认当前标题，只微信小程序有效
    sendMessageTitle: {
      type: String,
      default: uni.$u.props.button.sendMessageTitle
    },
    // 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效
    // 默认当前分享路径，只微信小程序有效
    sendMessagePath: {
      type: String,
      default: uni.$u.props.button.sendMessagePath
    },
    // 会话内消息卡片图片，open-type="contact"时有效
    // 默认当前页面截图，只微信小程序有效
    sendMessageImg: {
      type: String,
      default: uni.$u.props.button.sendMessageImg
    },
    // 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，
    // 用户点击后可以快速发送小程序消息，open-type="contact"时有效
    showMessageCard: {
      type: Boolean,
      default: uni.$u.props.button.showMessageCard
    },
    // 额外传参参数，用于小程序的data-xxx属性，通过target.dataset.name获取
    dataName: {
      type: String,
      default: uni.$u.props.button.dataName
    },
    // 节流，一定时间内只能触发一次
    throttleTime: {
      type: [String, Number],
      default: uni.$u.props.button.throttleTime
    },
    // 按住后多久出现点击态，单位毫秒
    hoverStartTime: {
      type: [String, Number],
      default: uni.$u.props.button.hoverStartTime
    },
    // 手指松开后点击态保留时间，单位毫秒
    hoverStayTime: {
      type: [String, Number],
      default: uni.$u.props.button.hoverStayTime
    },
    // 按钮文字，之所以通过props传入，是因为slot传入的话
    // nvue中无法控制文字的样式
    text: {
      type: [String, Number],
      default: uni.$u.props.button.text
    },
    // 按钮图标
    icon: {
      type: String,
      default: uni.$u.props.button.icon
    },
    // 按钮图标
    iconColor: {
      type: String,
      default: uni.$u.props.button.icon
    },
    // 按钮颜色，支持传入linear-gradient渐变色
    color: {
      type: String,
      default: uni.$u.props.button.color
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-text/value.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  computed: {
    // 经处理后需要显示的值
    value: function value() {
      var text = this.text,
        mode = this.mode,
        format = this.format,
        href = this.href;
      // 价格类型
      if (mode === 'price') {
        // 如果text不为金额进行提示
        if (!/^\d+(\.\d+)?$/.test(text)) {
          uni.$u.error('金额模式下，text参数需要为金额格式');
        }
        // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的金额格式化处理
        if (uni.$u.test.func(format)) {
          // 如果用户传入的是函数，使用函数格式化
          return format(text);
        }
        // 如果format非正则，非函数，则使用默认的金额格式化方法进行操作
        return uni.$u.priceFormat(text, 2);
      }
      if (mode === 'date') {
        // 判断是否合法的日期或者时间戳
        !uni.$u.test.date(text) && uni.$u.error('日期模式下，text参数需要为日期或时间戳格式');
        // 进行格式化，判断用户传入的format参数为正则，或者函数，如果没有传入format，则使用默认的格式化处理
        if (uni.$u.test.func(format)) {
          // 如果用户传入的是函数，使用函数格式化
          return format(text);
        }
        if (format) {
          // 如果format非正则，非函数，则使用默认的时间格式化方法进行操作
          return uni.$u.timeFormat(text, format);
        }
        // 如果没有设置format，则设置为默认的时间格式化形式
        return uni.$u.timeFormat(text, 'yyyy-mm-dd');
      }
      if (mode === 'phone') {
        // 判断是否合法的手机号
        // !uni.$u.test.mobile(text) && uni.$u.error('手机号模式下，text参数需要为手机号码格式')
        if (uni.$u.test.func(format)) {
          // 如果用户传入的是函数，使用函数格式化
          return format(text);
        }
        if (format === 'encrypt') {
          // 如果format为encrypt，则将手机号进行星号加密处理
          return "".concat(text.substr(0, 3), "****").concat(text.substr(7));
        }
        return text;
      }
      if (mode === 'name') {
        // 判断是否合法的字符粗
        !(typeof text === 'string') && uni.$u.error('姓名模式下，text参数需要为字符串格式');
        if (uni.$u.test.func(format)) {
          // 如果用户传入的是函数，使用函数格式化
          return format(text);
        }
        if (format === 'encrypt') {
          // 如果format为encrypt，则将姓名进行星号加密处理
          return this.formatName(text);
        }
        return text;
      }
      if (mode === 'link') {
        // 判断是否合法的字符粗
        !uni.$u.test.url(href) && uni.$u.error('超链接模式下，href参数需要为URL格式');
        return text;
      }
      return text;
    }
  },
  methods: {
    // 默认的姓名脱敏规则
    formatName: function formatName(name) {
      var value = '';
      if (name.length === 2) {
        value = name.substr(0, 1) + '*';
      } else if (name.length > 2) {
        var char = '';
        for (var i = 0, len = name.length - 2; i < len; i++) {
          char += '*';
        }
        value = name.substr(0, 1) + char + name.substr(-1, 1);
      } else {
        value = name;
      }
      return value;
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-empty/props.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 内置图标名称，或图片路径，建议绝对路径
    icon: {
      type: String,
      default: uni.$u.props.empty.icon
    },
    // 提示文字
    text: {
      type: String,
      default: uni.$u.props.empty.text
    },
    // 文字颜色
    textColor: {
      type: String,
      default: uni.$u.props.empty.textColor
    },
    // 文字大小
    textSize: {
      type: [String, Number],
      default: uni.$u.props.empty.textSize
    },
    // 图标的颜色
    iconColor: {
      type: String,
      default: uni.$u.props.empty.iconColor
    },
    // 图标的大小
    iconSize: {
      type: [String, Number],
      default: uni.$u.props.empty.iconSize
    },
    // 选择预置的图标类型
    mode: {
      type: String,
      default: uni.$u.props.empty.mode
    },
    //  图标宽度，单位px
    width: {
      type: [String, Number],
      default: uni.$u.props.empty.width
    },
    // 图标高度，单位px
    height: {
      type: [String, Number],
      default: uni.$u.props.empty.height
    },
    // 是否显示组件
    show: {
      type: Boolean,
      default: uni.$u.props.empty.show
    },
    // 组件距离上一个元素之间的距离，默认px单位
    marginTop: {
      type: [String, Number],
      default: uni.$u.props.empty.marginTop
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-input/props.js ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 输入的值
    value: {
      type: [String, Number],
      default: uni.$u.props.input.value
    },
    // 输入框类型
    // number-数字输入键盘，app-vue下可以输入浮点数，app-nvue和小程序平台下只能输入整数
    // idcard-身份证输入键盘，微信、支付宝、百度、QQ小程序
    // digit-带小数点的数字键盘，App的nvue页面、微信、支付宝、百度、头条、QQ小程序
    // text-文本输入键盘
    type: {
      type: String,
      default: uni.$u.props.input.type
    },
    // 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true，
    // 兼容性：微信小程序、百度小程序、字节跳动小程序、QQ小程序
    fixed: {
      type: Boolean,
      default: uni.$u.props.input.fixed
    },
    // 是否禁用输入框
    disabled: {
      type: Boolean,
      default: uni.$u.props.input.disabled
    },
    // 禁用状态时的背景色
    disabledColor: {
      type: String,
      default: uni.$u.props.input.disabledColor
    },
    // 是否显示清除控件
    clearable: {
      type: Boolean,
      default: uni.$u.props.input.clearable
    },
    // 是否密码类型
    password: {
      type: Boolean,
      default: uni.$u.props.input.password
    },
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
      type: [String, Number],
      default: uni.$u.props.input.maxlength
    },
    // 	输入框为空时的占位符
    placeholder: {
      type: String,
      default: uni.$u.props.input.placeholder
    },
    // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
    placeholderClass: {
      type: String,
      default: uni.$u.props.input.placeholderClass
    },
    // 指定placeholder的样式
    placeholderStyle: {
      type: [String, Object],
      default: uni.$u.props.input.placeholderStyle
    },
    // 是否显示输入字数统计，只在 type ="text"或type ="textarea"时有效
    showWordLimit: {
      type: Boolean,
      default: uni.$u.props.input.showWordLimit
    },
    // 设置右下角按钮的文字，有效值：send|search|next|go|done，兼容性详见uni-app文档
    // https://uniapp.dcloud.io/component/input
    // https://uniapp.dcloud.io/component/textarea
    confirmType: {
      type: String,
      default: uni.$u.props.input.confirmType
    },
    // 点击键盘右下角按钮时是否保持键盘不收起，H5无效
    confirmHold: {
      type: Boolean,
      default: uni.$u.props.input.confirmHold
    },
    // focus时，点击页面的时候不收起键盘，微信小程序有效
    holdKeyboard: {
      type: Boolean,
      default: uni.$u.props.input.holdKeyboard
    },
    // 自动获取焦点
    // 在 H5 平台能否聚焦以及软键盘是否跟随弹出，取决于当前浏览器本身的实现。nvue 页面不支持，需使用组件的 focus()、blur() 方法控制焦点
    focus: {
      type: Boolean,
      default: uni.$u.props.input.focus
    },
    // 键盘收起时，是否自动失去焦点，目前仅App3.0.0+有效
    autoBlur: {
      type: Boolean,
      default: uni.$u.props.input.autoBlur
    },
    // 是否去掉 iOS 下的默认内边距，仅微信小程序，且type=textarea时有效
    disableDefaultPadding: {
      type: Boolean,
      default: uni.$u.props.input.disableDefaultPadding
    },
    // 指定focus时光标的位置
    cursor: {
      type: [String, Number],
      default: uni.$u.props.input.cursor
    },
    // 输入框聚焦时底部与键盘的距离
    cursorSpacing: {
      type: [String, Number],
      default: uni.$u.props.input.cursorSpacing
    },
    // 光标起始位置，自动聚集时有效，需与selection-end搭配使用
    selectionStart: {
      type: [String, Number],
      default: uni.$u.props.input.selectionStart
    },
    // 光标结束位置，自动聚集时有效，需与selection-start搭配使用
    selectionEnd: {
      type: [String, Number],
      default: uni.$u.props.input.selectionEnd
    },
    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      default: uni.$u.props.input.adjustPosition
    },
    // 输入框内容对齐方式，可选值为：left|center|right
    inputAlign: {
      type: String,
      default: uni.$u.props.input.inputAlign
    },
    // 输入框字体的大小
    fontSize: {
      type: [String, Number],
      default: uni.$u.props.input.fontSize
    },
    // 输入框字体颜色
    color: {
      type: String,
      default: uni.$u.props.input.color
    },
    // 输入框前置图标
    prefixIcon: {
      type: String,
      default: uni.$u.props.input.prefixIcon
    },
    // 前置图标样式，对象或字符串
    prefixIconStyle: {
      type: [String, Object],
      default: uni.$u.props.input.prefixIconStyle
    },
    // 输入框后置图标
    suffixIcon: {
      type: String,
      default: uni.$u.props.input.suffixIcon
    },
    // 后置图标样式，对象或字符串
    suffixIconStyle: {
      type: [String, Object],
      default: uni.$u.props.input.suffixIconStyle
    },
    // 边框类型，surround-四周边框，bottom-底部边框，none-无边框
    border: {
      type: String,
      default: uni.$u.props.input.border
    },
    // 是否只读，与disabled不同之处在于disabled会置灰组件，而readonly则不会
    readonly: {
      type: Boolean,
      default: uni.$u.props.input.readonly
    },
    // 输入框形状，circle-圆形，square-方形
    shape: {
      type: String,
      default: uni.$u.props.input.shape
    },
    // 用于处理或者过滤输入框内容的方法
    formatter: {
      type: [Function, null],
      default: uni.$u.props.input.formatter
    },
    // 是否忽略组件内对文本合成系统事件的处理
    ignoreCompositionEvent: {
      type: Boolean,
      default: true
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */
/*!***************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-textarea/props.js ***!
  \***************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 输入框的内容
    value: {
      type: [String, Number],
      default: uni.$u.props.textarea.value
    },
    // 输入框为空时占位符
    placeholder: {
      type: [String, Number],
      default: uni.$u.props.textarea.placeholder
    },
    // 指定placeholder的样式类，注意页面或组件的style中写了scoped时，需要在类名前写/deep/
    placeholderClass: {
      type: String,
      default: uni.$u.props.input.placeholderClass
    },
    // 指定placeholder的样式
    placeholderStyle: {
      type: [String, Object],
      default: uni.$u.props.input.placeholderStyle
    },
    // 输入框高度
    height: {
      type: [String, Number],
      default: uni.$u.props.textarea.height
    },
    // 设置键盘右下角按钮的文字，仅微信小程序，App-vue和H5有效
    confirmType: {
      type: String,
      default: uni.$u.props.textarea.confirmType
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: uni.$u.props.textarea.disabled
    },
    // 是否显示统计字数
    count: {
      type: Boolean,
      default: uni.$u.props.textarea.count
    },
    // 是否自动获取焦点，nvue不支持，H5取决于浏览器的实现
    focus: {
      type: Boolean,
      default: uni.$u.props.textarea.focus
    },
    // 是否自动增加高度
    autoHeight: {
      type: Boolean,
      default: uni.$u.props.textarea.autoHeight
    },
    // 如果textarea是在一个position:fixed的区域，需要显示指定属性fixed为true
    fixed: {
      type: Boolean,
      default: uni.$u.props.textarea.fixed
    },
    // 指定光标与键盘的距离
    cursorSpacing: {
      type: Number,
      default: uni.$u.props.textarea.cursorSpacing
    },
    // 指定focus时的光标位置
    cursor: {
      type: [String, Number],
      default: uni.$u.props.textarea.cursor
    },
    // 是否显示键盘上方带有”完成“按钮那一栏，
    showConfirmBar: {
      type: Boolean,
      default: uni.$u.props.textarea.showConfirmBar
    },
    // 光标起始位置，自动聚焦时有效，需与selection-end搭配使用
    selectionStart: {
      type: Number,
      default: uni.$u.props.textarea.selectionStart
    },
    // 光标结束位置，自动聚焦时有效，需与selection-start搭配使用
    selectionEnd: {
      type: Number,
      default: uni.$u.props.textarea.selectionEnd
    },
    // 键盘弹起时，是否自动上推页面
    adjustPosition: {
      type: Boolean,
      default: uni.$u.props.textarea.adjustPosition
    },
    // 是否去掉 iOS 下的默认内边距，只微信小程序有效
    disableDefaultPadding: {
      type: Boolean,
      default: uni.$u.props.textarea.disableDefaultPadding
    },
    // focus时，点击页面的时候不收起键盘，只微信小程序有效
    holdKeyboard: {
      type: Boolean,
      default: uni.$u.props.textarea.holdKeyboard
    },
    // 最大输入长度，设置为 -1 的时候不限制最大长度
    maxlength: {
      type: [String, Number],
      default: uni.$u.props.textarea.maxlength
    },
    // 边框类型，surround-四周边框，bottom-底部边框
    border: {
      type: String,
      default: uni.$u.props.textarea.border
    },
    // 用于处理或者过滤输入框内容的方法
    formatter: {
      type: [Function, null],
      default: uni.$u.props.textarea.formatter
    },
    // 是否忽略组件内对文本合成系统事件的处理
    ignoreCompositionEvent: {
      type: Boolean,
      default: true
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */
/*!************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/liu-choose-address/static/noData.png ***!
  \************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 385 */
/*!**********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/liu-choose-address/static/next.png ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 386 */
/*!**************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/liu-choose-address/city.js ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = [{
  value: '110000',
  label: '北京市',
  children: [{
    value: '110100',
    label: '北京市',
    children: [{
      value: '110101',
      label: '东城区'
    }, {
      value: '110102',
      label: '西城区'
    }, {
      value: '110105',
      label: '朝阳区'
    }, {
      value: '110106',
      label: '丰台区'
    }, {
      value: '110107',
      label: '石景山区'
    }, {
      value: '110108',
      label: '海淀区'
    }, {
      value: '110109',
      label: '门头沟区'
    }, {
      value: '110111',
      label: '房山区'
    }, {
      value: '110112',
      label: '通州区'
    }, {
      value: '110113',
      label: '顺义区'
    }, {
      value: '110114',
      label: '昌平区'
    }, {
      value: '110115',
      label: '大兴区'
    }, {
      value: '110116',
      label: '怀柔区'
    }, {
      value: '110117',
      label: '平谷区'
    }, {
      value: '110118',
      label: '密云区'
    }, {
      value: '110119',
      label: '延庆区'
    }]
  }]
}, {
  value: '120000',
  label: '天津市',
  children: [{
    value: '120100',
    label: '天津市',
    children: [{
      value: '120101',
      label: '和平区'
    }, {
      value: '120102',
      label: '河东区'
    }, {
      value: '120103',
      label: '河西区'
    }, {
      value: '120104',
      label: '南开区'
    }, {
      value: '120105',
      label: '河北区'
    }, {
      value: '120106',
      label: '红桥区'
    }, {
      value: '120110',
      label: '东丽区'
    }, {
      value: '120111',
      label: '西青区'
    }, {
      value: '120112',
      label: '津南区'
    }, {
      value: '120113',
      label: '北辰区'
    }, {
      value: '120114',
      label: '武清区'
    }, {
      value: '120115',
      label: '宝坻区'
    }, {
      value: '120116',
      label: '滨海新区'
    }, {
      value: '120117',
      label: '宁河区'
    }, {
      value: '120118',
      label: '静海区'
    }, {
      value: '120119',
      label: '蓟州区'
    }]
  }]
}, {
  value: '130000',
  label: '河北省',
  children: [{
    value: '130100',
    label: '石家庄市',
    children: [{
      value: '130102',
      label: '长安区'
    }, {
      value: '130104',
      label: '桥西区'
    }, {
      value: '130105',
      label: '新华区'
    }, {
      value: '130107',
      label: '井陉矿区'
    }, {
      value: '130108',
      label: '裕华区'
    }, {
      value: '130109',
      label: '藁城区'
    }, {
      value: '130110',
      label: '鹿泉区'
    }, {
      value: '130111',
      label: '栾城区'
    }, {
      value: '130121',
      label: '井陉县'
    }, {
      value: '130123',
      label: '正定县'
    }, {
      value: '130125',
      label: '行唐县'
    }, {
      value: '130126',
      label: '灵寿县'
    }, {
      value: '130127',
      label: '高邑县'
    }, {
      value: '130128',
      label: '深泽县'
    }, {
      value: '130129',
      label: '赞皇县'
    }, {
      value: '130130',
      label: '无极县'
    }, {
      value: '130131',
      label: '平山县'
    }, {
      value: '130132',
      label: '元氏县'
    }, {
      value: '130133',
      label: '赵县'
    }, {
      value: '130181',
      label: '辛集市'
    }, {
      value: '130183',
      label: '晋州市'
    }, {
      value: '130184',
      label: '新乐市'
    }]
  }, {
    value: '130200',
    label: '唐山市',
    children: [{
      value: '130202',
      label: '路南区'
    }, {
      value: '130203',
      label: '路北区'
    }, {
      value: '130204',
      label: '古冶区'
    }, {
      value: '130205',
      label: '开平区'
    }, {
      value: '130207',
      label: '丰南区'
    }, {
      value: '130208',
      label: '丰润区'
    }, {
      value: '130209',
      label: '曹妃甸区'
    }, {
      value: '130223',
      label: '滦县'
    }, {
      value: '130224',
      label: '滦南县'
    }, {
      value: '130225',
      label: '乐亭县'
    }, {
      value: '130227',
      label: '迁西县'
    }, {
      value: '130229',
      label: '玉田县'
    }, {
      value: '130281',
      label: '遵化市'
    }, {
      value: '130283',
      label: '迁安市'
    }]
  }, {
    value: '130300',
    label: '秦皇岛市',
    children: [{
      value: '130302',
      label: '海港区'
    }, {
      value: '130303',
      label: '山海关区'
    }, {
      value: '130304',
      label: '北戴河区'
    }, {
      value: '130306',
      label: '抚宁区'
    }, {
      value: '130321',
      label: '青龙满族自治县'
    }, {
      value: '130322',
      label: '昌黎县'
    }, {
      value: '130324',
      label: '卢龙县'
    }]
  }, {
    value: '130400',
    label: '邯郸市',
    children: [{
      value: '130402',
      label: '邯山区'
    }, {
      value: '130403',
      label: '丛台区'
    }, {
      value: '130404',
      label: '复兴区'
    }, {
      value: '130406',
      label: '峰峰矿区'
    }, {
      value: '130407',
      label: '肥乡区'
    }, {
      value: '130408',
      label: '永年区'
    }, {
      value: '130423',
      label: '临漳县'
    }, {
      value: '130424',
      label: '成安县'
    }, {
      value: '130425',
      label: '大名县'
    }, {
      value: '130426',
      label: '涉县'
    }, {
      value: '130427',
      label: '磁县'
    }, {
      value: '130430',
      label: '邱县'
    }, {
      value: '130431',
      label: '鸡泽县'
    }, {
      value: '130432',
      label: '广平县'
    }, {
      value: '130433',
      label: '馆陶县'
    }, {
      value: '130434',
      label: '魏县'
    }, {
      value: '130435',
      label: '曲周县'
    }, {
      value: '130481',
      label: '武安市'
    }]
  }, {
    value: '130500',
    label: '邢台市',
    children: [{
      value: '130502',
      label: '桥东区'
    }, {
      value: '130503',
      label: '桥西区'
    }, {
      value: '130521',
      label: '邢台县'
    }, {
      value: '130522',
      label: '临城县'
    }, {
      value: '130523',
      label: '内丘县'
    }, {
      value: '130524',
      label: '柏乡县'
    }, {
      value: '130525',
      label: '隆尧县'
    }, {
      value: '130526',
      label: '任县'
    }, {
      value: '130527',
      label: '南和县'
    }, {
      value: '130528',
      label: '宁晋县'
    }, {
      value: '130529',
      label: '巨鹿县'
    }, {
      value: '130530',
      label: '新河县'
    }, {
      value: '130531',
      label: '广宗县'
    }, {
      value: '130532',
      label: '平乡县'
    }, {
      value: '130533',
      label: '威县'
    }, {
      value: '130534',
      label: '清河县'
    }, {
      value: '130535',
      label: '临西县'
    }, {
      value: '130581',
      label: '南宫市'
    }, {
      value: '130582',
      label: '沙河市'
    }]
  }, {
    value: '130600',
    label: '保定市',
    children: [{
      value: '130602',
      label: '竞秀区'
    }, {
      value: '130606',
      label: '莲池区'
    }, {
      value: '130607',
      label: '满城区'
    }, {
      value: '130608',
      label: '清苑区'
    }, {
      value: '130609',
      label: '徐水区'
    }, {
      value: '130623',
      label: '涞水县'
    }, {
      value: '130624',
      label: '阜平县'
    }, {
      value: '130626',
      label: '定兴县'
    }, {
      value: '130627',
      label: '唐县'
    }, {
      value: '130628',
      label: '高阳县'
    }, {
      value: '130629',
      label: '容城县'
    }, {
      value: '130630',
      label: '涞源县'
    }, {
      value: '130631',
      label: '望都县'
    }, {
      value: '130632',
      label: '安新县'
    }, {
      value: '130633',
      label: '易县'
    }, {
      value: '130634',
      label: '曲阳县'
    }, {
      value: '130635',
      label: '蠡县'
    }, {
      value: '130636',
      label: '顺平县'
    }, {
      value: '130637',
      label: '博野县'
    }, {
      value: '130638',
      label: '雄县'
    }, {
      value: '130681',
      label: '涿州市'
    }, {
      value: '130682',
      label: '定州市'
    }, {
      value: '130683',
      label: '安国市'
    }, {
      value: '130684',
      label: '高碑店市'
    }]
  }, {
    value: '130700',
    label: '张家口市',
    children: [{
      value: '130702',
      label: '桥东区'
    }, {
      value: '130703',
      label: '桥西区'
    }, {
      value: '130705',
      label: '宣化区'
    }, {
      value: '130706',
      label: '下花园区'
    }, {
      value: '130708',
      label: '万全区'
    }, {
      value: '130709',
      label: '崇礼区'
    }, {
      value: '130722',
      label: '张北县'
    }, {
      value: '130723',
      label: '康保县'
    }, {
      value: '130724',
      label: '沽源县'
    }, {
      value: '130725',
      label: '尚义县'
    }, {
      value: '130726',
      label: '蔚县'
    }, {
      value: '130727',
      label: '阳原县'
    }, {
      value: '130728',
      label: '怀安县'
    }, {
      value: '130730',
      label: '怀来县'
    }, {
      value: '130731',
      label: '涿鹿县'
    }, {
      value: '130732',
      label: '赤城县'
    }]
  }, {
    value: '130800',
    label: '承德市',
    children: [{
      value: '130802',
      label: '双桥区'
    }, {
      value: '130803',
      label: '双滦区'
    }, {
      value: '130804',
      label: '鹰手营子矿区'
    }, {
      value: '130821',
      label: '承德县'
    }, {
      value: '130822',
      label: '兴隆县'
    }, {
      value: '130824',
      label: '滦平县'
    }, {
      value: '130825',
      label: '隆化县'
    }, {
      value: '130826',
      label: '丰宁满族自治县'
    }, {
      value: '130827',
      label: '宽城满族自治县'
    }, {
      value: '130828',
      label: '围场满族蒙古族自治县'
    }, {
      value: '130881',
      label: '平泉市'
    }]
  }, {
    value: '130900',
    label: '沧州市',
    children: [{
      value: '130902',
      label: '新华区'
    }, {
      value: '130903',
      label: '运河区'
    }, {
      value: '130921',
      label: '沧县'
    }, {
      value: '130922',
      label: '青县'
    }, {
      value: '130923',
      label: '东光县'
    }, {
      value: '130924',
      label: '海兴县'
    }, {
      value: '130925',
      label: '盐山县'
    }, {
      value: '130926',
      label: '肃宁县'
    }, {
      value: '130927',
      label: '南皮县'
    }, {
      value: '130928',
      label: '吴桥县'
    }, {
      value: '130929',
      label: '献县'
    }, {
      value: '130930',
      label: '孟村回族自治县'
    }, {
      value: '130981',
      label: '泊头市'
    }, {
      value: '130982',
      label: '任丘市'
    }, {
      value: '130983',
      label: '黄骅市'
    }, {
      value: '130984',
      label: '河间市'
    }]
  }, {
    value: '131000',
    label: '廊坊市',
    children: [{
      value: '131002',
      label: '安次区'
    }, {
      value: '131003',
      label: '广阳区'
    }, {
      value: '131022',
      label: '固安县'
    }, {
      value: '131023',
      label: '永清县'
    }, {
      value: '131024',
      label: '香河县'
    }, {
      value: '131025',
      label: '大城县'
    }, {
      value: '131026',
      label: '文安县'
    }, {
      value: '131028',
      label: '大厂回族自治县'
    }, {
      value: '131081',
      label: '霸州市'
    }, {
      value: '131082',
      label: '三河市'
    }]
  }, {
    value: '131100',
    label: '衡水市',
    children: [{
      value: '131102',
      label: '桃城区'
    }, {
      value: '131103',
      label: '冀州区'
    }, {
      value: '131121',
      label: '枣强县'
    }, {
      value: '131122',
      label: '武邑县'
    }, {
      value: '131123',
      label: '武强县'
    }, {
      value: '131124',
      label: '饶阳县'
    }, {
      value: '131125',
      label: '安平县'
    }, {
      value: '131126',
      label: '故城县'
    }, {
      value: '131127',
      label: '景县'
    }, {
      value: '131128',
      label: '阜城县'
    }, {
      value: '131182',
      label: '深州市'
    }]
  }]
}, {
  value: '140000',
  label: '山西省',
  children: [{
    value: '140100',
    label: '太原市',
    children: [{
      value: '140105',
      label: '小店区'
    }, {
      value: '140106',
      label: '迎泽区'
    }, {
      value: '140107',
      label: '杏花岭区'
    }, {
      value: '140108',
      label: '尖草坪区'
    }, {
      value: '140109',
      label: '万柏林区'
    }, {
      value: '140110',
      label: '晋源区'
    }, {
      value: '140121',
      label: '清徐县'
    }, {
      value: '140122',
      label: '阳曲县'
    }, {
      value: '140123',
      label: '娄烦县'
    }, {
      value: '140181',
      label: '古交市'
    }]
  }, {
    value: '140200',
    label: '大同市',
    children: [{
      value: '140202',
      label: '城区'
    }, {
      value: '140203',
      label: '矿区'
    }, {
      value: '140211',
      label: '南郊区'
    }, {
      value: '140212',
      label: '新荣区'
    }, {
      value: '140221',
      label: '阳高县'
    }, {
      value: '140222',
      label: '天镇县'
    }, {
      value: '140223',
      label: '广灵县'
    }, {
      value: '140224',
      label: '灵丘县'
    }, {
      value: '140225',
      label: '浑源县'
    }, {
      value: '140226',
      label: '左云县'
    }, {
      value: '140227',
      label: '大同县'
    }]
  }, {
    value: '140300',
    label: '阳泉市',
    children: [{
      value: '140302',
      label: '城区'
    }, {
      value: '140303',
      label: '矿区'
    }, {
      value: '140311',
      label: '郊区'
    }, {
      value: '140321',
      label: '平定县'
    }, {
      value: '140322',
      label: '盂县'
    }]
  }, {
    value: '140400',
    label: '长治市',
    children: [{
      value: '140402',
      label: '城区'
    }, {
      value: '140411',
      label: '郊区'
    }, {
      value: '140421',
      label: '长治县'
    }, {
      value: '140423',
      label: '襄垣县'
    }, {
      value: '140424',
      label: '屯留县'
    }, {
      value: '140425',
      label: '平顺县'
    }, {
      value: '140426',
      label: '黎城县'
    }, {
      value: '140427',
      label: '壶关县'
    }, {
      value: '140428',
      label: '长子县'
    }, {
      value: '140429',
      label: '武乡县'
    }, {
      value: '140430',
      label: '沁县'
    }, {
      value: '140431',
      label: '沁源县'
    }, {
      value: '140481',
      label: '潞城市'
    }]
  }, {
    value: '140500',
    label: '晋城市',
    children: [{
      value: '140502',
      label: '城区'
    }, {
      value: '140521',
      label: '沁水县'
    }, {
      value: '140522',
      label: '阳城县'
    }, {
      value: '140524',
      label: '陵川县'
    }, {
      value: '140525',
      label: '泽州县'
    }, {
      value: '140581',
      label: '高平市'
    }]
  }, {
    value: '140600',
    label: '朔州市',
    children: [{
      value: '140602',
      label: '朔城区'
    }, {
      value: '140603',
      label: '平鲁区'
    }, {
      value: '140621',
      label: '山阴县'
    }, {
      value: '140622',
      label: '应县'
    }, {
      value: '140623',
      label: '右玉县'
    }, {
      value: '140624',
      label: '怀仁县'
    }]
  }, {
    value: '140700',
    label: '晋中市',
    children: [{
      value: '140702',
      label: '榆次区'
    }, {
      value: '140721',
      label: '榆社县'
    }, {
      value: '140722',
      label: '左权县'
    }, {
      value: '140723',
      label: '和顺县'
    }, {
      value: '140724',
      label: '昔阳县'
    }, {
      value: '140725',
      label: '寿阳县'
    }, {
      value: '140726',
      label: '太谷县'
    }, {
      value: '140727',
      label: '祁县'
    }, {
      value: '140728',
      label: '平遥县'
    }, {
      value: '140729',
      label: '灵石县'
    }, {
      value: '140781',
      label: '介休市'
    }]
  }, {
    value: '140800',
    label: '运城市',
    children: [{
      value: '140802',
      label: '盐湖区'
    }, {
      value: '140821',
      label: '临猗县'
    }, {
      value: '140822',
      label: '万荣县'
    }, {
      value: '140823',
      label: '闻喜县'
    }, {
      value: '140824',
      label: '稷山县'
    }, {
      value: '140825',
      label: '新绛县'
    }, {
      value: '140826',
      label: '绛县'
    }, {
      value: '140827',
      label: '垣曲县'
    }, {
      value: '140828',
      label: '夏县'
    }, {
      value: '140829',
      label: '平陆县'
    }, {
      value: '140830',
      label: '芮城县'
    }, {
      value: '140881',
      label: '永济市'
    }, {
      value: '140882',
      label: '河津市'
    }]
  }, {
    value: '140900',
    label: '忻州市',
    children: [{
      value: '140902',
      label: '忻府区'
    }, {
      value: '140921',
      label: '定襄县'
    }, {
      value: '140922',
      label: '五台县'
    }, {
      value: '140923',
      label: '代县'
    }, {
      value: '140924',
      label: '繁峙县'
    }, {
      value: '140925',
      label: '宁武县'
    }, {
      value: '140926',
      label: '静乐县'
    }, {
      value: '140927',
      label: '神池县'
    }, {
      value: '140928',
      label: '五寨县'
    }, {
      value: '140929',
      label: '岢岚县'
    }, {
      value: '140930',
      label: '河曲县'
    }, {
      value: '140931',
      label: '保德县'
    }, {
      value: '140932',
      label: '偏关县'
    }, {
      value: '140981',
      label: '原平市'
    }]
  }, {
    value: '141000',
    label: '临汾市',
    children: [{
      value: '141002',
      label: '尧都区'
    }, {
      value: '141021',
      label: '曲沃县'
    }, {
      value: '141022',
      label: '翼城县'
    }, {
      value: '141023',
      label: '襄汾县'
    }, {
      value: '141024',
      label: '洪洞县'
    }, {
      value: '141025',
      label: '古县'
    }, {
      value: '141026',
      label: '安泽县'
    }, {
      value: '141027',
      label: '浮山县'
    }, {
      value: '141028',
      label: '吉县'
    }, {
      value: '141029',
      label: '乡宁县'
    }, {
      value: '141030',
      label: '大宁县'
    }, {
      value: '141031',
      label: '隰县'
    }, {
      value: '141032',
      label: '永和县'
    }, {
      value: '141033',
      label: '蒲县'
    }, {
      value: '141034',
      label: '汾西县'
    }, {
      value: '141081',
      label: '侯马市'
    }, {
      value: '141082',
      label: '霍州市'
    }]
  }, {
    value: '141100',
    label: '吕梁市',
    children: [{
      value: '141102',
      label: '离石区'
    }, {
      value: '141121',
      label: '文水县'
    }, {
      value: '141122',
      label: '交城县'
    }, {
      value: '141123',
      label: '兴县'
    }, {
      value: '141124',
      label: '临县'
    }, {
      value: '141125',
      label: '柳林县'
    }, {
      value: '141126',
      label: '石楼县'
    }, {
      value: '141127',
      label: '岚县'
    }, {
      value: '141128',
      label: '方山县'
    }, {
      value: '141129',
      label: '中阳县'
    }, {
      value: '141130',
      label: '交口县'
    }, {
      value: '141181',
      label: '孝义市'
    }, {
      value: '141182',
      label: '汾阳市'
    }]
  }]
}, {
  value: '150000',
  label: '内蒙古自治区',
  children: [{
    value: '150100',
    label: '呼和浩特市',
    children: [{
      value: '150102',
      label: '新城区'
    }, {
      value: '150103',
      label: '回民区'
    }, {
      value: '150104',
      label: '玉泉区'
    }, {
      value: '150105',
      label: '赛罕区'
    }, {
      value: '150121',
      label: '土默特左旗'
    }, {
      value: '150122',
      label: '托克托县'
    }, {
      value: '150123',
      label: '和林格尔县'
    }, {
      value: '150124',
      label: '清水河县'
    }, {
      value: '150125',
      label: '武川县'
    }]
  }, {
    value: '150200',
    label: '包头市',
    children: [{
      value: '150202',
      label: '东河区'
    }, {
      value: '150203',
      label: '昆都仑区'
    }, {
      value: '150204',
      label: '青山区'
    }, {
      value: '150205',
      label: '石拐区'
    }, {
      value: '150206',
      label: '白云鄂博矿区'
    }, {
      value: '150207',
      label: '九原区'
    }, {
      value: '150221',
      label: '土默特右旗'
    }, {
      value: '150222',
      label: '固阳县'
    }, {
      value: '150223',
      label: '达尔罕茂明安联合旗'
    }]
  }, {
    value: '150300',
    label: '乌海市',
    children: [{
      value: '150302',
      label: '海勃湾区'
    }, {
      value: '150303',
      label: '海南区'
    }, {
      value: '150304',
      label: '乌达区'
    }]
  }, {
    value: '150400',
    label: '赤峰市',
    children: [{
      value: '150402',
      label: '红山区'
    }, {
      value: '150403',
      label: '元宝山区'
    }, {
      value: '150404',
      label: '松山区'
    }, {
      value: '150421',
      label: '阿鲁科尔沁旗'
    }, {
      value: '150422',
      label: '巴林左旗'
    }, {
      value: '150423',
      label: '巴林右旗'
    }, {
      value: '150424',
      label: '林西县'
    }, {
      value: '150425',
      label: '克什克腾旗'
    }, {
      value: '150426',
      label: '翁牛特旗'
    }, {
      value: '150428',
      label: '喀喇沁旗'
    }, {
      value: '150429',
      label: '宁城县'
    }, {
      value: '150430',
      label: '敖汉旗'
    }]
  }, {
    value: '150500',
    label: '通辽市',
    children: [{
      value: '150502',
      label: '科尔沁区'
    }, {
      value: '150521',
      label: '科尔沁左翼中旗'
    }, {
      value: '150522',
      label: '科尔沁左翼后旗'
    }, {
      value: '150523',
      label: '开鲁县'
    }, {
      value: '150524',
      label: '库伦旗'
    }, {
      value: '150525',
      label: '奈曼旗'
    }, {
      value: '150526',
      label: '扎鲁特旗'
    }, {
      value: '150581',
      label: '霍林郭勒市'
    }]
  }, {
    value: '150600',
    label: '鄂尔多斯市',
    children: [{
      value: '150602',
      label: '东胜区'
    }, {
      value: '150603',
      label: '康巴什区'
    }, {
      value: '150621',
      label: '达拉特旗'
    }, {
      value: '150622',
      label: '准格尔旗'
    }, {
      value: '150623',
      label: '鄂托克前旗'
    }, {
      value: '150624',
      label: '鄂托克旗'
    }, {
      value: '150625',
      label: '杭锦旗'
    }, {
      value: '150626',
      label: '乌审旗'
    }, {
      value: '150627',
      label: '伊金霍洛旗'
    }]
  }, {
    value: '150700',
    label: '呼伦贝尔市',
    children: [{
      value: '150702',
      label: '海拉尔区'
    }, {
      value: '150703',
      label: '扎赉诺尔区'
    }, {
      value: '150721',
      label: '阿荣旗'
    }, {
      value: '150722',
      label: '莫力达瓦达斡尔族自治旗'
    }, {
      value: '150723',
      label: '鄂伦春自治旗'
    }, {
      value: '150724',
      label: '鄂温克族自治旗'
    }, {
      value: '150725',
      label: '陈巴尔虎旗'
    }, {
      value: '150726',
      label: '新巴尔虎左旗'
    }, {
      value: '150727',
      label: '新巴尔虎右旗'
    }, {
      value: '150781',
      label: '满洲里市'
    }, {
      value: '150782',
      label: '牙克石市'
    }, {
      value: '150783',
      label: '扎兰屯市'
    }, {
      value: '150784',
      label: '额尔古纳市'
    }, {
      value: '150785',
      label: '根河市'
    }]
  }, {
    value: '150800',
    label: '巴彦淖尔市',
    children: [{
      value: '150802',
      label: '临河区'
    }, {
      value: '150821',
      label: '五原县'
    }, {
      value: '150822',
      label: '磴口县'
    }, {
      value: '150823',
      label: '乌拉特前旗'
    }, {
      value: '150824',
      label: '乌拉特中旗'
    }, {
      value: '150825',
      label: '乌拉特后旗'
    }, {
      value: '150826',
      label: '杭锦后旗'
    }]
  }, {
    value: '150900',
    label: '乌兰察布市',
    children: [{
      value: '150902',
      label: '集宁区'
    }, {
      value: '150921',
      label: '卓资县'
    }, {
      value: '150922',
      label: '化德县'
    }, {
      value: '150923',
      label: '商都县'
    }, {
      value: '150924',
      label: '兴和县'
    }, {
      value: '150925',
      label: '凉城县'
    }, {
      value: '150926',
      label: '察哈尔右翼前旗'
    }, {
      value: '150927',
      label: '察哈尔右翼中旗'
    }, {
      value: '150928',
      label: '察哈尔右翼后旗'
    }, {
      value: '150929',
      label: '四子王旗'
    }, {
      value: '150981',
      label: '丰镇市'
    }]
  }, {
    value: '152200',
    label: '兴安盟',
    children: [{
      value: '152201',
      label: '乌兰浩特市'
    }, {
      value: '152202',
      label: '阿尔山市'
    }, {
      value: '152221',
      label: '科尔沁右翼前旗'
    }, {
      value: '152222',
      label: '科尔沁右翼中旗'
    }, {
      value: '152223',
      label: '扎赉特旗'
    }, {
      value: '152224',
      label: '突泉县'
    }]
  }, {
    value: '152500',
    label: '锡林郭勒盟',
    children: [{
      value: '152501',
      label: '二连浩特市'
    }, {
      value: '152502',
      label: '锡林浩特市'
    }, {
      value: '152522',
      label: '阿巴嘎旗'
    }, {
      value: '152523',
      label: '苏尼特左旗'
    }, {
      value: '152524',
      label: '苏尼特右旗'
    }, {
      value: '152525',
      label: '东乌珠穆沁旗'
    }, {
      value: '152526',
      label: '西乌珠穆沁旗'
    }, {
      value: '152527',
      label: '太仆寺旗'
    }, {
      value: '152528',
      label: '镶黄旗'
    }, {
      value: '152529',
      label: '正镶白旗'
    }, {
      value: '152530',
      label: '正蓝旗'
    }, {
      value: '152531',
      label: '多伦县'
    }]
  }, {
    value: '152900',
    label: '阿拉善盟',
    children: [{
      value: '152921',
      label: '阿拉善左旗'
    }, {
      value: '152922',
      label: '阿拉善右旗'
    }, {
      value: '152923',
      label: '额济纳旗'
    }]
  }]
}, {
  value: '210000',
  label: '辽宁省',
  children: [{
    value: '210100',
    label: '沈阳市',
    children: [{
      value: '210102',
      label: '和平区'
    }, {
      value: '210103',
      label: '沈河区'
    }, {
      value: '210104',
      label: '大东区'
    }, {
      value: '210105',
      label: '皇姑区'
    }, {
      value: '210106',
      label: '铁西区'
    }, {
      value: '210111',
      label: '苏家屯区'
    }, {
      value: '210112',
      label: '浑南区'
    }, {
      value: '210113',
      label: '沈北新区'
    }, {
      value: '210114',
      label: '于洪区'
    }, {
      value: '210115',
      label: '辽中区'
    }, {
      value: '210123',
      label: '康平县'
    }, {
      value: '210124',
      label: '法库县'
    }, {
      value: '210181',
      label: '新民市'
    }]
  }, {
    value: '210200',
    label: '大连市',
    children: [{
      value: '210202',
      label: '中山区'
    }, {
      value: '210203',
      label: '西岗区'
    }, {
      value: '210204',
      label: '沙河口区'
    }, {
      value: '210211',
      label: '甘井子区'
    }, {
      value: '210212',
      label: '旅顺口区'
    }, {
      value: '210213',
      label: '金州区'
    }, {
      value: '210214',
      label: '普兰店区'
    }, {
      value: '210224',
      label: '长海县'
    }, {
      value: '210281',
      label: '瓦房店市'
    }, {
      value: '210283',
      label: '庄河市'
    }]
  }, {
    value: '210300',
    label: '鞍山市',
    children: [{
      value: '210302',
      label: '铁东区'
    }, {
      value: '210303',
      label: '铁西区'
    }, {
      value: '210304',
      label: '立山区'
    }, {
      value: '210311',
      label: '千山区'
    }, {
      value: '210321',
      label: '台安县'
    }, {
      value: '210323',
      label: '岫岩满族自治县'
    }, {
      value: '210381',
      label: '海城市'
    }]
  }, {
    value: '210400',
    label: '抚顺市',
    children: [{
      value: '210402',
      label: '新抚区'
    }, {
      value: '210403',
      label: '东洲区'
    }, {
      value: '210404',
      label: '望花区'
    }, {
      value: '210411',
      label: '顺城区'
    }, {
      value: '210421',
      label: '抚顺县'
    }, {
      value: '210422',
      label: '新宾满族自治县'
    }, {
      value: '210423',
      label: '清原满族自治县'
    }]
  }, {
    value: '210500',
    label: '本溪市',
    children: [{
      value: '210502',
      label: '平山区'
    }, {
      value: '210503',
      label: '溪湖区'
    }, {
      value: '210504',
      label: '明山区'
    }, {
      value: '210505',
      label: '南芬区'
    }, {
      value: '210521',
      label: '本溪满族自治县'
    }, {
      value: '210522',
      label: '桓仁满族自治县'
    }]
  }, {
    value: '210600',
    label: '丹东市',
    children: [{
      value: '210602',
      label: '元宝区'
    }, {
      value: '210603',
      label: '振兴区'
    }, {
      value: '210604',
      label: '振安区'
    }, {
      value: '210624',
      label: '宽甸满族自治县'
    }, {
      value: '210681',
      label: '东港市'
    }, {
      value: '210682',
      label: '凤城市'
    }]
  }, {
    value: '210700',
    label: '锦州市',
    children: [{
      value: '210702',
      label: '古塔区'
    }, {
      value: '210703',
      label: '凌河区'
    }, {
      value: '210711',
      label: '太和区'
    }, {
      value: '210726',
      label: '黑山县'
    }, {
      value: '210727',
      label: '义县'
    }, {
      value: '210781',
      label: '凌海市'
    }, {
      value: '210782',
      label: '北镇市'
    }]
  }, {
    value: '210800',
    label: '营口市',
    children: [{
      value: '210802',
      label: '站前区'
    }, {
      value: '210803',
      label: '西市区'
    }, {
      value: '210804',
      label: '鲅鱼圈区'
    }, {
      value: '210811',
      label: '老边区'
    }, {
      value: '210881',
      label: '盖州市'
    }, {
      value: '210882',
      label: '大石桥市'
    }]
  }, {
    value: '210900',
    label: '阜新市',
    children: [{
      value: '210902',
      label: '海州区'
    }, {
      value: '210903',
      label: '新邱区'
    }, {
      value: '210904',
      label: '太平区'
    }, {
      value: '210905',
      label: '清河门区'
    }, {
      value: '210911',
      label: '细河区'
    }, {
      value: '210921',
      label: '阜新蒙古族自治县'
    }, {
      value: '210922',
      label: '彰武县'
    }]
  }, {
    value: '211000',
    label: '辽阳市',
    children: [{
      value: '211002',
      label: '白塔区'
    }, {
      value: '211003',
      label: '文圣区'
    }, {
      value: '211004',
      label: '宏伟区'
    }, {
      value: '211005',
      label: '弓长岭区'
    }, {
      value: '211011',
      label: '太子河区'
    }, {
      value: '211021',
      label: '辽阳县'
    }, {
      value: '211081',
      label: '灯塔市'
    }]
  }, {
    value: '211100',
    label: '盘锦市',
    children: [{
      value: '211102',
      label: '双台子区'
    }, {
      value: '211103',
      label: '兴隆台区'
    }, {
      value: '211104',
      label: '大洼区'
    }, {
      value: '211122',
      label: '盘山县'
    }]
  }, {
    value: '211200',
    label: '铁岭市',
    children: [{
      value: '211202',
      label: '银州区'
    }, {
      value: '211204',
      label: '清河区'
    }, {
      value: '211221',
      label: '铁岭县'
    }, {
      value: '211223',
      label: '西丰县'
    }, {
      value: '211224',
      label: '昌图县'
    }, {
      value: '211281',
      label: '调兵山市'
    }, {
      value: '211282',
      label: '开原市'
    }]
  }, {
    value: '211300',
    label: '朝阳市',
    children: [{
      value: '211302',
      label: '双塔区'
    }, {
      value: '211303',
      label: '龙城区'
    }, {
      value: '211321',
      label: '朝阳县'
    }, {
      value: '211322',
      label: '建平县'
    }, {
      value: '211324',
      label: '喀喇沁左翼蒙古族自治县'
    }, {
      value: '211381',
      label: '北票市'
    }, {
      value: '211382',
      label: '凌源市'
    }]
  }, {
    value: '211400',
    label: '葫芦岛市',
    children: [{
      value: '211402',
      label: '连山区'
    }, {
      value: '211403',
      label: '龙港区'
    }, {
      value: '211404',
      label: '南票区'
    }, {
      value: '211421',
      label: '绥中县'
    }, {
      value: '211422',
      label: '建昌县'
    }, {
      value: '211481',
      label: '兴城市'
    }]
  }]
}, {
  value: '220000',
  label: '吉林省',
  children: [{
    value: '220100',
    label: '长春市',
    children: [{
      value: '220102',
      label: '南关区'
    }, {
      value: '220103',
      label: '宽城区'
    }, {
      value: '220104',
      label: '朝阳区'
    }, {
      value: '220105',
      label: '二道区'
    }, {
      value: '220106',
      label: '绿园区'
    }, {
      value: '220112',
      label: '双阳区'
    }, {
      value: '220113',
      label: '九台区'
    }, {
      value: '220122',
      label: '农安县'
    }, {
      value: '220182',
      label: '榆树市'
    }, {
      value: '220183',
      label: '德惠市'
    }]
  }, {
    value: '220200',
    label: '吉林市',
    children: [{
      value: '220202',
      label: '昌邑区'
    }, {
      value: '220203',
      label: '龙潭区'
    }, {
      value: '220204',
      label: '船营区'
    }, {
      value: '220211',
      label: '丰满区'
    }, {
      value: '220221',
      label: '永吉县'
    }, {
      value: '220281',
      label: '蛟河市'
    }, {
      value: '220282',
      label: '桦甸市'
    }, {
      value: '220283',
      label: '舒兰市'
    }, {
      value: '220284',
      label: '磐石市'
    }]
  }, {
    value: '220300',
    label: '四平市',
    children: [{
      value: '220302',
      label: '铁西区'
    }, {
      value: '220303',
      label: '铁东区'
    }, {
      value: '220322',
      label: '梨树县'
    }, {
      value: '220323',
      label: '伊通满族自治县'
    }, {
      value: '220381',
      label: '公主岭市'
    }, {
      value: '220382',
      label: '双辽市'
    }]
  }, {
    value: '220400',
    label: '辽源市',
    children: [{
      value: '220402',
      label: '龙山区'
    }, {
      value: '220403',
      label: '西安区'
    }, {
      value: '220421',
      label: '东丰县'
    }, {
      value: '220422',
      label: '东辽县'
    }]
  }, {
    value: '220500',
    label: '通化市',
    children: [{
      value: '220502',
      label: '东昌区'
    }, {
      value: '220503',
      label: '二道江区'
    }, {
      value: '220521',
      label: '通化县'
    }, {
      value: '220523',
      label: '辉南县'
    }, {
      value: '220524',
      label: '柳河县'
    }, {
      value: '220581',
      label: '梅河口市'
    }, {
      value: '220582',
      label: '集安市'
    }]
  }, {
    value: '220600',
    label: '白山市',
    children: [{
      value: '220602',
      label: '浑江区'
    }, {
      value: '220605',
      label: '江源区'
    }, {
      value: '220621',
      label: '抚松县'
    }, {
      value: '220622',
      label: '靖宇县'
    }, {
      value: '220623',
      label: '长白朝鲜族自治县'
    }, {
      value: '220681',
      label: '临江市'
    }]
  }, {
    value: '220700',
    label: '松原市',
    children: [{
      value: '220702',
      label: '宁江区'
    }, {
      value: '220721',
      label: '前郭尔罗斯蒙古族自治县'
    }, {
      value: '220722',
      label: '长岭县'
    }, {
      value: '220723',
      label: '乾安县'
    }, {
      value: '220781',
      label: '扶余市'
    }]
  }, {
    value: '220800',
    label: '白城市',
    children: [{
      value: '220802',
      label: '洮北区'
    }, {
      value: '220821',
      label: '镇赉县'
    }, {
      value: '220822',
      label: '通榆县'
    }, {
      value: '220881',
      label: '洮南市'
    }, {
      value: '220882',
      label: '大安市'
    }]
  }, {
    value: '222400',
    label: '延边朝鲜族自治州',
    children: [{
      value: '222401',
      label: '延吉市'
    }, {
      value: '222402',
      label: '图们市'
    }, {
      value: '222403',
      label: '敦化市'
    }, {
      value: '222404',
      label: '珲春市'
    }, {
      value: '222405',
      label: '龙井市'
    }, {
      value: '222406',
      label: '和龙市'
    }, {
      value: '222424',
      label: '汪清县'
    }, {
      value: '222426',
      label: '安图县'
    }]
  }]
}, {
  value: '230000',
  label: '黑龙江省',
  children: [{
    value: '230100',
    label: '哈尔滨市',
    children: [{
      value: '230102',
      label: '道里区'
    }, {
      value: '230103',
      label: '南岗区'
    }, {
      value: '230104',
      label: '道外区'
    }, {
      value: '230108',
      label: '平房区'
    }, {
      value: '230109',
      label: '松北区'
    }, {
      value: '230110',
      label: '香坊区'
    }, {
      value: '230111',
      label: '呼兰区'
    }, {
      value: '230112',
      label: '阿城区'
    }, {
      value: '230113',
      label: '双城区'
    }, {
      value: '230123',
      label: '依兰县'
    }, {
      value: '230124',
      label: '方正县'
    }, {
      value: '230125',
      label: '宾县'
    }, {
      value: '230126',
      label: '巴彦县'
    }, {
      value: '230127',
      label: '木兰县'
    }, {
      value: '230128',
      label: '通河县'
    }, {
      value: '230129',
      label: '延寿县'
    }, {
      value: '230183',
      label: '尚志市'
    }, {
      value: '230184',
      label: '五常市'
    }]
  }, {
    value: '230200',
    label: '齐齐哈尔市',
    children: [{
      value: '230202',
      label: '龙沙区'
    }, {
      value: '230203',
      label: '建华区'
    }, {
      value: '230204',
      label: '铁锋区'
    }, {
      value: '230205',
      label: '昂昂溪区'
    }, {
      value: '230206',
      label: '富拉尔基区'
    }, {
      value: '230207',
      label: '碾子山区'
    }, {
      value: '230208',
      label: '梅里斯达斡尔族区'
    }, {
      value: '230221',
      label: '龙江县'
    }, {
      value: '230223',
      label: '依安县'
    }, {
      value: '230224',
      label: '泰来县'
    }, {
      value: '230225',
      label: '甘南县'
    }, {
      value: '230227',
      label: '富裕县'
    }, {
      value: '230229',
      label: '克山县'
    }, {
      value: '230230',
      label: '克东县'
    }, {
      value: '230231',
      label: '拜泉县'
    }, {
      value: '230281',
      label: '讷河市'
    }]
  }, {
    value: '230300',
    label: '鸡西市',
    children: [{
      value: '230302',
      label: '鸡冠区'
    }, {
      value: '230303',
      label: '恒山区'
    }, {
      value: '230304',
      label: '滴道区'
    }, {
      value: '230305',
      label: '梨树区'
    }, {
      value: '230306',
      label: '城子河区'
    }, {
      value: '230307',
      label: '麻山区'
    }, {
      value: '230321',
      label: '鸡东县'
    }, {
      value: '230381',
      label: '虎林市'
    }, {
      value: '230382',
      label: '密山市'
    }]
  }, {
    value: '230400',
    label: '鹤岗市',
    children: [{
      value: '230402',
      label: '向阳区'
    }, {
      value: '230403',
      label: '工农区'
    }, {
      value: '230404',
      label: '南山区'
    }, {
      value: '230405',
      label: '兴安区'
    }, {
      value: '230406',
      label: '东山区'
    }, {
      value: '230407',
      label: '兴山区'
    }, {
      value: '230421',
      label: '萝北县'
    }, {
      value: '230422',
      label: '绥滨县'
    }]
  }, {
    value: '230500',
    label: '双鸭山市',
    children: [{
      value: '230502',
      label: '尖山区'
    }, {
      value: '230503',
      label: '岭东区'
    }, {
      value: '230505',
      label: '四方台区'
    }, {
      value: '230506',
      label: '宝山区'
    }, {
      value: '230521',
      label: '集贤县'
    }, {
      value: '230522',
      label: '友谊县'
    }, {
      value: '230523',
      label: '宝清县'
    }, {
      value: '230524',
      label: '饶河县'
    }]
  }, {
    value: '230600',
    label: '大庆市',
    children: [{
      value: '230602',
      label: '萨尔图区'
    }, {
      value: '230603',
      label: '龙凤区'
    }, {
      value: '230604',
      label: '让胡路区'
    }, {
      value: '230605',
      label: '红岗区'
    }, {
      value: '230606',
      label: '大同区'
    }, {
      value: '230621',
      label: '肇州县'
    }, {
      value: '230622',
      label: '肇源县'
    }, {
      value: '230623',
      label: '林甸县'
    }, {
      value: '230624',
      label: '杜尔伯特蒙古族自治县'
    }]
  }, {
    value: '230700',
    label: '伊春市',
    children: [{
      value: '230702',
      label: '伊春区'
    }, {
      value: '230703',
      label: '南岔区'
    }, {
      value: '230704',
      label: '友好区'
    }, {
      value: '230705',
      label: '西林区'
    }, {
      value: '230706',
      label: '翠峦区'
    }, {
      value: '230707',
      label: '新青区'
    }, {
      value: '230708',
      label: '美溪区'
    }, {
      value: '230709',
      label: '金山屯区'
    }, {
      value: '230710',
      label: '五营区'
    }, {
      value: '230711',
      label: '乌马河区'
    }, {
      value: '230712',
      label: '汤旺河区'
    }, {
      value: '230713',
      label: '带岭区'
    }, {
      value: '230714',
      label: '乌伊岭区'
    }, {
      value: '230715',
      label: '红星区'
    }, {
      value: '230716',
      label: '上甘岭区'
    }, {
      value: '230722',
      label: '嘉荫县'
    }, {
      value: '230781',
      label: '铁力市'
    }]
  }, {
    value: '230800',
    label: '佳木斯市',
    children: [{
      value: '230803',
      label: '向阳区'
    }, {
      value: '230804',
      label: '前进区'
    }, {
      value: '230805',
      label: '东风区'
    }, {
      value: '230811',
      label: '郊区'
    }, {
      value: '230822',
      label: '桦南县'
    }, {
      value: '230826',
      label: '桦川县'
    }, {
      value: '230828',
      label: '汤原县'
    }, {
      value: '230881',
      label: '同江市'
    }, {
      value: '230882',
      label: '富锦市'
    }, {
      value: '230883',
      label: '抚远市'
    }]
  }, {
    value: '230900',
    label: '七台河市',
    children: [{
      value: '230902',
      label: '新兴区'
    }, {
      value: '230903',
      label: '桃山区'
    }, {
      value: '230904',
      label: '茄子河区'
    }, {
      value: '230921',
      label: '勃利县'
    }]
  }, {
    value: '231000',
    label: '牡丹江市',
    children: [{
      value: '231002',
      label: '东安区'
    }, {
      value: '231003',
      label: '阳明区'
    }, {
      value: '231004',
      label: '爱民区'
    }, {
      value: '231005',
      label: '西安区'
    }, {
      value: '231025',
      label: '林口县'
    }, {
      value: '231081',
      label: '绥芬河市'
    }, {
      value: '231083',
      label: '海林市'
    }, {
      value: '231084',
      label: '宁安市'
    }, {
      value: '231085',
      label: '穆棱市'
    }, {
      value: '231086',
      label: '东宁市'
    }]
  }, {
    value: '231100',
    label: '黑河市',
    children: [{
      value: '231102',
      label: '爱辉区'
    }, {
      value: '231121',
      label: '嫩江县'
    }, {
      value: '231123',
      label: '逊克县'
    }, {
      value: '231124',
      label: '孙吴县'
    }, {
      value: '231181',
      label: '北安市'
    }, {
      value: '231182',
      label: '五大连池市'
    }]
  }, {
    value: '231200',
    label: '绥化市',
    children: [{
      value: '231202',
      label: '北林区'
    }, {
      value: '231221',
      label: '望奎县'
    }, {
      value: '231222',
      label: '兰西县'
    }, {
      value: '231223',
      label: '青冈县'
    }, {
      value: '231224',
      label: '庆安县'
    }, {
      value: '231225',
      label: '明水县'
    }, {
      value: '231226',
      label: '绥棱县'
    }, {
      value: '231281',
      label: '安达市'
    }, {
      value: '231282',
      label: '肇东市'
    }, {
      value: '231283',
      label: '海伦市'
    }]
  }, {
    value: '232700',
    label: '大兴安岭地区',
    children: [{
      value: '232701',
      label: '加格达奇区'
    }, {
      value: '232702',
      label: '松岭区'
    }, {
      value: '232703',
      label: '新林区'
    }, {
      value: '232704',
      label: '呼中区'
    }, {
      value: '232721',
      label: '呼玛县'
    }, {
      value: '232722',
      label: '塔河县'
    }, {
      value: '232723',
      label: '漠河县'
    }]
  }]
}, {
  value: '310000',
  label: '上海市',
  children: [{
    value: '310100',
    label: '上海市',
    children: [{
      value: '310101',
      label: '黄浦区'
    }, {
      value: '310104',
      label: '徐汇区'
    }, {
      value: '310105',
      label: '长宁区'
    }, {
      value: '310106',
      label: '静安区'
    }, {
      value: '310107',
      label: '普陀区'
    }, {
      value: '310109',
      label: '虹口区'
    }, {
      value: '310110',
      label: '杨浦区'
    }, {
      value: '310112',
      label: '闵行区'
    }, {
      value: '310113',
      label: '宝山区'
    }, {
      value: '310114',
      label: '嘉定区'
    }, {
      value: '310115',
      label: '浦东新区'
    }, {
      value: '310116',
      label: '金山区'
    }, {
      value: '310117',
      label: '松江区'
    }, {
      value: '310118',
      label: '青浦区'
    }, {
      value: '310120',
      label: '奉贤区'
    }, {
      value: '310151',
      label: '崇明区'
    }]
  }]
}, {
  value: '320000',
  label: '江苏省',
  children: [{
    value: '320100',
    label: '南京市',
    children: [{
      value: '320102',
      label: '玄武区'
    }, {
      value: '320104',
      label: '秦淮区'
    }, {
      value: '320105',
      label: '建邺区'
    }, {
      value: '320106',
      label: '鼓楼区'
    }, {
      value: '320111',
      label: '浦口区'
    }, {
      value: '320113',
      label: '栖霞区'
    }, {
      value: '320114',
      label: '雨花台区'
    }, {
      value: '320115',
      label: '江宁区'
    }, {
      value: '320116',
      label: '六合区'
    }, {
      value: '320117',
      label: '溧水区'
    }, {
      value: '320118',
      label: '高淳区'
    }]
  }, {
    value: '320200',
    label: '无锡市',
    children: [{
      value: '320205',
      label: '锡山区'
    }, {
      value: '320206',
      label: '惠山区'
    }, {
      value: '320211',
      label: '滨湖区'
    }, {
      value: '320213',
      label: '梁溪区'
    }, {
      value: '320214',
      label: '新吴区'
    }, {
      value: '320281',
      label: '江阴市'
    }, {
      value: '320282',
      label: '宜兴市'
    }]
  }, {
    value: '320300',
    label: '徐州市',
    children: [{
      value: '320302',
      label: '鼓楼区'
    }, {
      value: '320303',
      label: '云龙区'
    }, {
      value: '320305',
      label: '贾汪区'
    }, {
      value: '320311',
      label: '泉山区'
    }, {
      value: '320312',
      label: '铜山区'
    }, {
      value: '320321',
      label: '丰县'
    }, {
      value: '320322',
      label: '沛县'
    }, {
      value: '320324',
      label: '睢宁县'
    }, {
      value: '320381',
      label: '新沂市'
    }, {
      value: '320382',
      label: '邳州市'
    }]
  }, {
    value: '320400',
    label: '常州市',
    children: [{
      value: '320402',
      label: '天宁区'
    }, {
      value: '320404',
      label: '钟楼区'
    }, {
      value: '320411',
      label: '新北区'
    }, {
      value: '320412',
      label: '武进区'
    }, {
      value: '320413',
      label: '金坛区'
    }, {
      value: '320481',
      label: '溧阳市'
    }]
  }, {
    value: '320500',
    label: '苏州市',
    children: [{
      value: '320505',
      label: '虎丘区'
    }, {
      value: '320506',
      label: '吴中区'
    }, {
      value: '320507',
      label: '相城区'
    }, {
      value: '320508',
      label: '姑苏区'
    }, {
      value: '320509',
      label: '吴江区'
    }, {
      value: '320581',
      label: '常熟市'
    }, {
      value: '320582',
      label: '张家港市'
    }, {
      value: '320583',
      label: '昆山市'
    }, {
      value: '320585',
      label: '太仓市'
    }]
  }, {
    value: '320600',
    label: '南通市',
    children: [{
      value: '320602',
      label: '崇川区'
    }, {
      value: '320611',
      label: '港闸区'
    }, {
      value: '320612',
      label: '通州区'
    }, {
      value: '320621',
      label: '海安县'
    }, {
      value: '320623',
      label: '如东县'
    }, {
      value: '320681',
      label: '启东市'
    }, {
      value: '320682',
      label: '如皋市'
    }, {
      value: '320684',
      label: '海门市'
    }]
  }, {
    value: '320700',
    label: '连云港市',
    children: [{
      value: '320703',
      label: '连云区'
    }, {
      value: '320706',
      label: '海州区'
    }, {
      value: '320707',
      label: '赣榆区'
    }, {
      value: '320722',
      label: '东海县'
    }, {
      value: '320723',
      label: '灌云县'
    }, {
      value: '320724',
      label: '灌南县'
    }]
  }, {
    value: '320800',
    label: '淮安市',
    children: [{
      value: '320803',
      label: '淮安区'
    }, {
      value: '320804',
      label: '淮阴区'
    }, {
      value: '320812',
      label: '清江浦区'
    }, {
      value: '320813',
      label: '洪泽区'
    }, {
      value: '320826',
      label: '涟水县'
    }, {
      value: '320830',
      label: '盱眙县'
    }, {
      value: '320831',
      label: '金湖县'
    }]
  }, {
    value: '320900',
    label: '盐城市',
    children: [{
      value: '320902',
      label: '亭湖区'
    }, {
      value: '320903',
      label: '盐都区'
    }, {
      value: '320904',
      label: '大丰区'
    }, {
      value: '320921',
      label: '响水县'
    }, {
      value: '320922',
      label: '滨海县'
    }, {
      value: '320923',
      label: '阜宁县'
    }, {
      value: '320924',
      label: '射阳县'
    }, {
      value: '320925',
      label: '建湖县'
    }, {
      value: '320981',
      label: '东台市'
    }]
  }, {
    value: '321000',
    label: '扬州市',
    children: [{
      value: '321002',
      label: '广陵区'
    }, {
      value: '321003',
      label: '邗江区'
    }, {
      value: '321012',
      label: '江都区'
    }, {
      value: '321023',
      label: '宝应县'
    }, {
      value: '321081',
      label: '仪征市'
    }, {
      value: '321084',
      label: '高邮市'
    }]
  }, {
    value: '321100',
    label: '镇江市',
    children: [{
      value: '321102',
      label: '京口区'
    }, {
      value: '321111',
      label: '润州区'
    }, {
      value: '321112',
      label: '丹徒区'
    }, {
      value: '321181',
      label: '丹阳市'
    }, {
      value: '321182',
      label: '扬中市'
    }, {
      value: '321183',
      label: '句容市'
    }]
  }, {
    value: '321200',
    label: '泰州市',
    children: [{
      value: '321202',
      label: '海陵区'
    }, {
      value: '321203',
      label: '高港区'
    }, {
      value: '321204',
      label: '姜堰区'
    }, {
      value: '321281',
      label: '兴化市'
    }, {
      value: '321282',
      label: '靖江市'
    }, {
      value: '321283',
      label: '泰兴市'
    }]
  }, {
    value: '321300',
    label: '宿迁市',
    children: [{
      value: '321302',
      label: '宿城区'
    }, {
      value: '321311',
      label: '宿豫区'
    }, {
      value: '321322',
      label: '沭阳县'
    }, {
      value: '321323',
      label: '泗阳县'
    }, {
      value: '321324',
      label: '泗洪县'
    }]
  }]
}, {
  value: '330000',
  label: '浙江省',
  children: [{
    value: '330100',
    label: '杭州市',
    children: [{
      value: '330102',
      label: '上城区'
    }, {
      value: '330103',
      label: '下城区'
    }, {
      value: '330104',
      label: '江干区'
    }, {
      value: '330105',
      label: '拱墅区'
    }, {
      value: '330106',
      label: '西湖区'
    }, {
      value: '330108',
      label: '滨江区'
    }, {
      value: '330109',
      label: '萧山区'
    }, {
      value: '330110',
      label: '余杭区'
    }, {
      value: '330111',
      label: '富阳区'
    }, {
      value: '330112',
      label: '临安区'
    }, {
      value: '330122',
      label: '桐庐县'
    }, {
      value: '330127',
      label: '淳安县'
    }, {
      value: '330182',
      label: '建德市'
    }]
  }, {
    value: '330200',
    label: '宁波市',
    children: [{
      value: '330203',
      label: '海曙区'
    }, {
      value: '330205',
      label: '江北区'
    }, {
      value: '330206',
      label: '北仑区'
    }, {
      value: '330211',
      label: '镇海区'
    }, {
      value: '330212',
      label: '鄞州区'
    }, {
      value: '330213',
      label: '奉化区'
    }, {
      value: '330225',
      label: '象山县'
    }, {
      value: '330226',
      label: '宁海县'
    }, {
      value: '330281',
      label: '余姚市'
    }, {
      value: '330282',
      label: '慈溪市'
    }]
  }, {
    value: '330300',
    label: '温州市',
    children: [{
      value: '330302',
      label: '鹿城区'
    }, {
      value: '330303',
      label: '龙湾区'
    }, {
      value: '330304',
      label: '瓯海区'
    }, {
      value: '330305',
      label: '洞头区'
    }, {
      value: '330324',
      label: '永嘉县'
    }, {
      value: '330326',
      label: '平阳县'
    }, {
      value: '330327',
      label: '苍南县'
    }, {
      value: '330328',
      label: '文成县'
    }, {
      value: '330329',
      label: '泰顺县'
    }, {
      value: '330381',
      label: '瑞安市'
    }, {
      value: '330382',
      label: '乐清市'
    }]
  }, {
    value: '330400',
    label: '嘉兴市',
    children: [{
      value: '330402',
      label: '南湖区'
    }, {
      value: '330411',
      label: '秀洲区'
    }, {
      value: '330421',
      label: '嘉善县'
    }, {
      value: '330424',
      label: '海盐县'
    }, {
      value: '330481',
      label: '海宁市'
    }, {
      value: '330482',
      label: '平湖市'
    }, {
      value: '330483',
      label: '桐乡市'
    }]
  }, {
    value: '330500',
    label: '湖州市',
    children: [{
      value: '330502',
      label: '吴兴区'
    }, {
      value: '330503',
      label: '南浔区'
    }, {
      value: '330521',
      label: '德清县'
    }, {
      value: '330522',
      label: '长兴县'
    }, {
      value: '330523',
      label: '安吉县'
    }]
  }, {
    value: '330600',
    label: '绍兴市',
    children: [{
      value: '330602',
      label: '越城区'
    }, {
      value: '330603',
      label: '柯桥区'
    }, {
      value: '330604',
      label: '上虞区'
    }, {
      value: '330624',
      label: '新昌县'
    }, {
      value: '330681',
      label: '诸暨市'
    }, {
      value: '330683',
      label: '嵊州市'
    }]
  }, {
    value: '330700',
    label: '金华市',
    children: [{
      value: '330702',
      label: '婺城区'
    }, {
      value: '330703',
      label: '金东区'
    }, {
      value: '330723',
      label: '武义县'
    }, {
      value: '330726',
      label: '浦江县'
    }, {
      value: '330727',
      label: '磐安县'
    }, {
      value: '330781',
      label: '兰溪市'
    }, {
      value: '330782',
      label: '义乌市'
    }, {
      value: '330783',
      label: '东阳市'
    }, {
      value: '330784',
      label: '永康市'
    }]
  }, {
    value: '330800',
    label: '衢州市',
    children: [{
      value: '330802',
      label: '柯城区'
    }, {
      value: '330803',
      label: '衢江区'
    }, {
      value: '330822',
      label: '常山县'
    }, {
      value: '330824',
      label: '开化县'
    }, {
      value: '330825',
      label: '龙游县'
    }, {
      value: '330881',
      label: '江山市'
    }]
  }, {
    value: '330900',
    label: '舟山市',
    children: [{
      value: '330902',
      label: '定海区'
    }, {
      value: '330903',
      label: '普陀区'
    }, {
      value: '330921',
      label: '岱山县'
    }, {
      value: '330922',
      label: '嵊泗县'
    }]
  }, {
    value: '331000',
    label: '台州市',
    children: [{
      value: '331002',
      label: '椒江区'
    }, {
      value: '331003',
      label: '黄岩区'
    }, {
      value: '331004',
      label: '路桥区'
    }, {
      value: '331022',
      label: '三门县'
    }, {
      value: '331023',
      label: '天台县'
    }, {
      value: '331024',
      label: '仙居县'
    }, {
      value: '331081',
      label: '温岭市'
    }, {
      value: '331082',
      label: '临海市'
    }, {
      value: '331083',
      label: '玉环市'
    }]
  }, {
    value: '331100',
    label: '丽水市',
    children: [{
      value: '331102',
      label: '莲都区'
    }, {
      value: '331121',
      label: '青田县'
    }, {
      value: '331122',
      label: '缙云县'
    }, {
      value: '331123',
      label: '遂昌县'
    }, {
      value: '331124',
      label: '松阳县'
    }, {
      value: '331125',
      label: '云和县'
    }, {
      value: '331126',
      label: '庆元县'
    }, {
      value: '331127',
      label: '景宁畲族自治县'
    }, {
      value: '331181',
      label: '龙泉市'
    }]
  }]
}, {
  value: '340000',
  label: '安徽省',
  children: [{
    value: '340100',
    label: '合肥市',
    children: [{
      value: '340102',
      label: '瑶海区'
    }, {
      value: '340103',
      label: '庐阳区'
    }, {
      value: '340104',
      label: '蜀山区'
    }, {
      value: '340111',
      label: '包河区'
    }, {
      value: '340121',
      label: '长丰县'
    }, {
      value: '340122',
      label: '肥东县'
    }, {
      value: '340123',
      label: '肥西县'
    }, {
      value: '340124',
      label: '庐江县'
    }, {
      value: '340181',
      label: '巢湖市'
    }]
  }, {
    value: '340200',
    label: '芜湖市',
    children: [{
      value: '340202',
      label: '镜湖区'
    }, {
      value: '340203',
      label: '弋江区'
    }, {
      value: '340207',
      label: '鸠江区'
    }, {
      value: '340208',
      label: '三山区'
    }, {
      value: '340221',
      label: '芜湖县'
    }, {
      value: '340222',
      label: '繁昌县'
    }, {
      value: '340223',
      label: '南陵县'
    }, {
      value: '340225',
      label: '无为县'
    }]
  }, {
    value: '340300',
    label: '蚌埠市',
    children: [{
      value: '340302',
      label: '龙子湖区'
    }, {
      value: '340303',
      label: '蚌山区'
    }, {
      value: '340304',
      label: '禹会区'
    }, {
      value: '340311',
      label: '淮上区'
    }, {
      value: '340321',
      label: '怀远县'
    }, {
      value: '340322',
      label: '五河县'
    }, {
      value: '340323',
      label: '固镇县'
    }]
  }, {
    value: '340400',
    label: '淮南市',
    children: [{
      value: '340402',
      label: '大通区'
    }, {
      value: '340403',
      label: '田家庵区'
    }, {
      value: '340404',
      label: '谢家集区'
    }, {
      value: '340405',
      label: '八公山区'
    }, {
      value: '340406',
      label: '潘集区'
    }, {
      value: '340421',
      label: '凤台县'
    }, {
      value: '340422',
      label: '寿县'
    }]
  }, {
    value: '340500',
    label: '马鞍山市',
    children: [{
      value: '340503',
      label: '花山区'
    }, {
      value: '340504',
      label: '雨山区'
    }, {
      value: '340506',
      label: '博望区'
    }, {
      value: '340521',
      label: '当涂县'
    }, {
      value: '340522',
      label: '含山县'
    }, {
      value: '340523',
      label: '和县'
    }]
  }, {
    value: '340600',
    label: '淮北市',
    children: [{
      value: '340602',
      label: '杜集区'
    }, {
      value: '340603',
      label: '相山区'
    }, {
      value: '340604',
      label: '烈山区'
    }, {
      value: '340621',
      label: '濉溪县'
    }]
  }, {
    value: '340700',
    label: '铜陵市',
    children: [{
      value: '340705',
      label: '铜官区'
    }, {
      value: '340706',
      label: '义安区'
    }, {
      value: '340711',
      label: '郊区'
    }, {
      value: '340722',
      label: '枞阳县'
    }]
  }, {
    value: '340800',
    label: '安庆市',
    children: [{
      value: '340802',
      label: '迎江区'
    }, {
      value: '340803',
      label: '大观区'
    }, {
      value: '340811',
      label: '宜秀区'
    }, {
      value: '340822',
      label: '怀宁县'
    }, {
      value: '340824',
      label: '潜山县'
    }, {
      value: '340825',
      label: '太湖县'
    }, {
      value: '340826',
      label: '宿松县'
    }, {
      value: '340827',
      label: '望江县'
    }, {
      value: '340828',
      label: '岳西县'
    }, {
      value: '340881',
      label: '桐城市'
    }]
  }, {
    value: '341000',
    label: '黄山市',
    children: [{
      value: '341002',
      label: '屯溪区'
    }, {
      value: '341003',
      label: '黄山区'
    }, {
      value: '341004',
      label: '徽州区'
    }, {
      value: '341021',
      label: '歙县'
    }, {
      value: '341022',
      label: '休宁县'
    }, {
      value: '341023',
      label: '黟县'
    }, {
      value: '341024',
      label: '祁门县'
    }]
  }, {
    value: '341100',
    label: '滁州市',
    children: [{
      value: '341102',
      label: '琅琊区'
    }, {
      value: '341103',
      label: '南谯区'
    }, {
      value: '341122',
      label: '来安县'
    }, {
      value: '341124',
      label: '全椒县'
    }, {
      value: '341125',
      label: '定远县'
    }, {
      value: '341126',
      label: '凤阳县'
    }, {
      value: '341181',
      label: '天长市'
    }, {
      value: '341182',
      label: '明光市'
    }]
  }, {
    value: '341200',
    label: '阜阳市',
    children: [{
      value: '341202',
      label: '颍州区'
    }, {
      value: '341203',
      label: '颍东区'
    }, {
      value: '341204',
      label: '颍泉区'
    }, {
      value: '341221',
      label: '临泉县'
    }, {
      value: '341222',
      label: '太和县'
    }, {
      value: '341225',
      label: '阜南县'
    }, {
      value: '341226',
      label: '颍上县'
    }, {
      value: '341282',
      label: '界首市'
    }]
  }, {
    value: '341300',
    label: '宿州市',
    children: [{
      value: '341302',
      label: '埇桥区'
    }, {
      value: '341321',
      label: '砀山县'
    }, {
      value: '341322',
      label: '萧县'
    }, {
      value: '341323',
      label: '灵璧县'
    }, {
      value: '341324',
      label: '泗县'
    }]
  }, {
    value: '341500',
    label: '六安市',
    children: [{
      value: '341502',
      label: '金安区'
    }, {
      value: '341503',
      label: '裕安区'
    }, {
      value: '341504',
      label: '叶集区'
    }, {
      value: '341522',
      label: '霍邱县'
    }, {
      value: '341523',
      label: '舒城县'
    }, {
      value: '341524',
      label: '金寨县'
    }, {
      value: '341525',
      label: '霍山县'
    }]
  }, {
    value: '341600',
    label: '亳州市',
    children: [{
      value: '341602',
      label: '谯城区'
    }, {
      value: '341621',
      label: '涡阳县'
    }, {
      value: '341622',
      label: '蒙城县'
    }, {
      value: '341623',
      label: '利辛县'
    }]
  }, {
    value: '341700',
    label: '池州市',
    children: [{
      value: '341702',
      label: '贵池区'
    }, {
      value: '341721',
      label: '东至县'
    }, {
      value: '341722',
      label: '石台县'
    }, {
      value: '341723',
      label: '青阳县'
    }]
  }, {
    value: '341800',
    label: '宣城市',
    children: [{
      value: '341802',
      label: '宣州区'
    }, {
      value: '341821',
      label: '郎溪县'
    }, {
      value: '341822',
      label: '广德县'
    }, {
      value: '341823',
      label: '泾县'
    }, {
      value: '341824',
      label: '绩溪县'
    }, {
      value: '341825',
      label: '旌德县'
    }, {
      value: '341881',
      label: '宁国市'
    }]
  }]
}, {
  value: '350000',
  label: '福建省',
  children: [{
    value: '350100',
    label: '福州市',
    children: [{
      value: '350102',
      label: '鼓楼区'
    }, {
      value: '350103',
      label: '台江区'
    }, {
      value: '350104',
      label: '仓山区'
    }, {
      value: '350105',
      label: '马尾区'
    }, {
      value: '350111',
      label: '晋安区'
    }, {
      value: '350112',
      label: '长乐区'
    }, {
      value: '350121',
      label: '闽侯县'
    }, {
      value: '350122',
      label: '连江县'
    }, {
      value: '350123',
      label: '罗源县'
    }, {
      value: '350124',
      label: '闽清县'
    }, {
      value: '350125',
      label: '永泰县'
    }, {
      value: '350128',
      label: '平潭县'
    }, {
      value: '350181',
      label: '福清市'
    }]
  }, {
    value: '350200',
    label: '厦门市',
    children: [{
      value: '350203',
      label: '思明区'
    }, {
      value: '350205',
      label: '海沧区'
    }, {
      value: '350206',
      label: '湖里区'
    }, {
      value: '350211',
      label: '集美区'
    }, {
      value: '350212',
      label: '同安区'
    }, {
      value: '350213',
      label: '翔安区'
    }]
  }, {
    value: '350300',
    label: '莆田市',
    children: [{
      value: '350302',
      label: '城厢区'
    }, {
      value: '350303',
      label: '涵江区'
    }, {
      value: '350304',
      label: '荔城区'
    }, {
      value: '350305',
      label: '秀屿区'
    }, {
      value: '350322',
      label: '仙游县'
    }]
  }, {
    value: '350400',
    label: '三明市',
    children: [{
      value: '350402',
      label: '梅列区'
    }, {
      value: '350403',
      label: '三元区'
    }, {
      value: '350421',
      label: '明溪县'
    }, {
      value: '350423',
      label: '清流县'
    }, {
      value: '350424',
      label: '宁化县'
    }, {
      value: '350425',
      label: '大田县'
    }, {
      value: '350426',
      label: '尤溪县'
    }, {
      value: '350427',
      label: '沙县'
    }, {
      value: '350428',
      label: '将乐县'
    }, {
      value: '350429',
      label: '泰宁县'
    }, {
      value: '350430',
      label: '建宁县'
    }, {
      value: '350481',
      label: '永安市'
    }]
  }, {
    value: '350500',
    label: '泉州市',
    children: [{
      value: '350502',
      label: '鲤城区'
    }, {
      value: '350503',
      label: '丰泽区'
    }, {
      value: '350504',
      label: '洛江区'
    }, {
      value: '350505',
      label: '泉港区'
    }, {
      value: '350521',
      label: '惠安县'
    }, {
      value: '350524',
      label: '安溪县'
    }, {
      value: '350525',
      label: '永春县'
    }, {
      value: '350526',
      label: '德化县'
    }, {
      value: '350527',
      label: '金门县'
    }, {
      value: '350581',
      label: '石狮市'
    }, {
      value: '350582',
      label: '晋江市'
    }, {
      value: '350583',
      label: '南安市'
    }]
  }, {
    value: '350600',
    label: '漳州市',
    children: [{
      value: '350602',
      label: '芗城区'
    }, {
      value: '350603',
      label: '龙文区'
    }, {
      value: '350622',
      label: '云霄县'
    }, {
      value: '350623',
      label: '漳浦县'
    }, {
      value: '350624',
      label: '诏安县'
    }, {
      value: '350625',
      label: '长泰县'
    }, {
      value: '350626',
      label: '东山县'
    }, {
      value: '350627',
      label: '南靖县'
    }, {
      value: '350628',
      label: '平和县'
    }, {
      value: '350629',
      label: '华安县'
    }, {
      value: '350681',
      label: '龙海市'
    }]
  }, {
    value: '350700',
    label: '南平市',
    children: [{
      value: '350702',
      label: '延平区'
    }, {
      value: '350703',
      label: '建阳区'
    }, {
      value: '350721',
      label: '顺昌县'
    }, {
      value: '350722',
      label: '浦城县'
    }, {
      value: '350723',
      label: '光泽县'
    }, {
      value: '350724',
      label: '松溪县'
    }, {
      value: '350725',
      label: '政和县'
    }, {
      value: '350781',
      label: '邵武市'
    }, {
      value: '350782',
      label: '武夷山市'
    }, {
      value: '350783',
      label: '建瓯市'
    }]
  }, {
    value: '350800',
    label: '龙岩市',
    children: [{
      value: '350802',
      label: '新罗区'
    }, {
      value: '350803',
      label: '永定区'
    }, {
      value: '350821',
      label: '长汀县'
    }, {
      value: '350823',
      label: '上杭县'
    }, {
      value: '350824',
      label: '武平县'
    }, {
      value: '350825',
      label: '连城县'
    }, {
      value: '350881',
      label: '漳平市'
    }]
  }, {
    value: '350900',
    label: '宁德市',
    children: [{
      value: '350902',
      label: '蕉城区'
    }, {
      value: '350921',
      label: '霞浦县'
    }, {
      value: '350922',
      label: '古田县'
    }, {
      value: '350923',
      label: '屏南县'
    }, {
      value: '350924',
      label: '寿宁县'
    }, {
      value: '350925',
      label: '周宁县'
    }, {
      value: '350926',
      label: '柘荣县'
    }, {
      value: '350981',
      label: '福安市'
    }, {
      value: '350982',
      label: '福鼎市'
    }]
  }]
}, {
  value: '360000',
  label: '江西省',
  children: [{
    value: '360100',
    label: '南昌市',
    children: [{
      value: '360102',
      label: '东湖区'
    }, {
      value: '360103',
      label: '西湖区'
    }, {
      value: '360104',
      label: '青云谱区'
    }, {
      value: '360105',
      label: '湾里区'
    }, {
      value: '360111',
      label: '青山湖区'
    }, {
      value: '360112',
      label: '新建区'
    }, {
      value: '360121',
      label: '南昌县'
    }, {
      value: '360123',
      label: '安义县'
    }, {
      value: '360124',
      label: '进贤县'
    }]
  }, {
    value: '360200',
    label: '景德镇市',
    children: [{
      value: '360202',
      label: '昌江区'
    }, {
      value: '360203',
      label: '珠山区'
    }, {
      value: '360222',
      label: '浮梁县'
    }, {
      value: '360281',
      label: '乐平市'
    }]
  }, {
    value: '360300',
    label: '萍乡市',
    children: [{
      value: '360302',
      label: '安源区'
    }, {
      value: '360313',
      label: '湘东区'
    }, {
      value: '360321',
      label: '莲花县'
    }, {
      value: '360322',
      label: '上栗县'
    }, {
      value: '360323',
      label: '芦溪县'
    }]
  }, {
    value: '360400',
    label: '九江市',
    children: [{
      value: '360402',
      label: '濂溪区'
    }, {
      value: '360403',
      label: '浔阳区'
    }, {
      value: '360404',
      label: '柴桑区'
    }, {
      value: '360423',
      label: '武宁县'
    }, {
      value: '360424',
      label: '修水县'
    }, {
      value: '360425',
      label: '永修县'
    }, {
      value: '360426',
      label: '德安县'
    }, {
      value: '360428',
      label: '都昌县'
    }, {
      value: '360429',
      label: '湖口县'
    }, {
      value: '360430',
      label: '彭泽县'
    }, {
      value: '360481',
      label: '瑞昌市'
    }, {
      value: '360482',
      label: '共青城市'
    }, {
      value: '360483',
      label: '庐山市'
    }]
  }, {
    value: '360500',
    label: '新余市',
    children: [{
      value: '360502',
      label: '渝水区'
    }, {
      value: '360521',
      label: '分宜县'
    }]
  }, {
    value: '360600',
    label: '鹰潭市',
    children: [{
      value: '360602',
      label: '月湖区'
    }, {
      value: '360622',
      label: '余江区'
    }, {
      value: '360681',
      label: '贵溪市'
    }]
  }, {
    value: '360700',
    label: '赣州市',
    children: [{
      value: '360702',
      label: '章贡区'
    }, {
      value: '360703',
      label: '南康区'
    }, {
      value: '360704',
      label: '赣县区'
    }, {
      value: '360722',
      label: '信丰县'
    }, {
      value: '360723',
      label: '大余县'
    }, {
      value: '360724',
      label: '上犹县'
    }, {
      value: '360725',
      label: '崇义县'
    }, {
      value: '360726',
      label: '安远县'
    }, {
      value: '360727',
      label: '龙南县'
    }, {
      value: '360728',
      label: '定南县'
    }, {
      value: '360729',
      label: '全南县'
    }, {
      value: '360730',
      label: '宁都县'
    }, {
      value: '360731',
      label: '于都县'
    }, {
      value: '360732',
      label: '兴国县'
    }, {
      value: '360733',
      label: '会昌县'
    }, {
      value: '360734',
      label: '寻乌县'
    }, {
      value: '360735',
      label: '石城县'
    }, {
      value: '360781',
      label: '瑞金市'
    }]
  }, {
    value: '360800',
    label: '吉安市',
    children: [{
      value: '360802',
      label: '吉州区'
    }, {
      value: '360803',
      label: '青原区'
    }, {
      value: '360821',
      label: '吉安县'
    }, {
      value: '360822',
      label: '吉水县'
    }, {
      value: '360823',
      label: '峡江县'
    }, {
      value: '360824',
      label: '新干县'
    }, {
      value: '360825',
      label: '永丰县'
    }, {
      value: '360826',
      label: '泰和县'
    }, {
      value: '360827',
      label: '遂川县'
    }, {
      value: '360828',
      label: '万安县'
    }, {
      value: '360829',
      label: '安福县'
    }, {
      value: '360830',
      label: '永新县'
    }, {
      value: '360881',
      label: '井冈山市'
    }]
  }, {
    value: '360900',
    label: '宜春市',
    children: [{
      value: '360902',
      label: '袁州区'
    }, {
      value: '360921',
      label: '奉新县'
    }, {
      value: '360922',
      label: '万载县'
    }, {
      value: '360923',
      label: '上高县'
    }, {
      value: '360924',
      label: '宜丰县'
    }, {
      value: '360925',
      label: '靖安县'
    }, {
      value: '360926',
      label: '铜鼓县'
    }, {
      value: '360981',
      label: '丰城市'
    }, {
      value: '360982',
      label: '樟树市'
    }, {
      value: '360983',
      label: '高安市'
    }]
  }, {
    value: '361000',
    label: '抚州市',
    children: [{
      value: '361002',
      label: '临川区'
    }, {
      value: '361003',
      label: '东乡区'
    }, {
      value: '361021',
      label: '南城县'
    }, {
      value: '361022',
      label: '黎川县'
    }, {
      value: '361023',
      label: '南丰县'
    }, {
      value: '361024',
      label: '崇仁县'
    }, {
      value: '361025',
      label: '乐安县'
    }, {
      value: '361026',
      label: '宜黄县'
    }, {
      value: '361027',
      label: '金溪县'
    }, {
      value: '361028',
      label: '资溪县'
    }, {
      value: '361030',
      label: '广昌县'
    }]
  }, {
    value: '361100',
    label: '上饶市',
    children: [{
      value: '361102',
      label: '信州区'
    }, {
      value: '361103',
      label: '广丰区'
    }, {
      value: '361121',
      label: '上饶县'
    }, {
      value: '361123',
      label: '玉山县'
    }, {
      value: '361124',
      label: '铅山县'
    }, {
      value: '361125',
      label: '横峰县'
    }, {
      value: '361126',
      label: '弋阳县'
    }, {
      value: '361127',
      label: '余干县'
    }, {
      value: '361128',
      label: '鄱阳县'
    }, {
      value: '361129',
      label: '万年县'
    }, {
      value: '361130',
      label: '婺源县'
    }, {
      value: '361181',
      label: '德兴市'
    }]
  }]
}, {
  value: '370000',
  label: '山东省',
  children: [{
    value: '370100',
    label: '济南市',
    children: [{
      value: '370102',
      label: '历下区'
    }, {
      value: '370103',
      label: '市中区'
    }, {
      value: '370104',
      label: '槐荫区'
    }, {
      value: '370105',
      label: '天桥区'
    }, {
      value: '370112',
      label: '历城区'
    }, {
      value: '370113',
      label: '长清区'
    }, {
      value: '370114',
      label: '章丘区'
    }, {
      value: '370124',
      label: '平阴县'
    }, {
      value: '370125',
      label: '济阳县'
    }, {
      value: '370126',
      label: '商河县'
    }]
  }, {
    value: '370200',
    label: '青岛市',
    children: [{
      value: '370202',
      label: '市南区'
    }, {
      value: '370203',
      label: '市北区'
    }, {
      value: '370211',
      label: '黄岛区'
    }, {
      value: '370212',
      label: '崂山区'
    }, {
      value: '370213',
      label: '李沧区'
    }, {
      value: '370214',
      label: '城阳区'
    }, {
      value: '370215',
      label: '即墨区'
    }, {
      value: '370281',
      label: '胶州市'
    }, {
      value: '370283',
      label: '平度市'
    }, {
      value: '370285',
      label: '莱西市'
    }]
  }, {
    value: '370300',
    label: '淄博市',
    children: [{
      value: '370302',
      label: '淄川区'
    }, {
      value: '370303',
      label: '张店区'
    }, {
      value: '370304',
      label: '博山区'
    }, {
      value: '370305',
      label: '临淄区'
    }, {
      value: '370306',
      label: '周村区'
    }, {
      value: '370321',
      label: '桓台县'
    }, {
      value: '370322',
      label: '高青县'
    }, {
      value: '370323',
      label: '沂源县'
    }]
  }, {
    value: '370400',
    label: '枣庄市',
    children: [{
      value: '370402',
      label: '市中区'
    }, {
      value: '370403',
      label: '薛城区'
    }, {
      value: '370404',
      label: '峄城区'
    }, {
      value: '370405',
      label: '台儿庄区'
    }, {
      value: '370406',
      label: '山亭区'
    }, {
      value: '370481',
      label: '滕州市'
    }]
  }, {
    value: '370500',
    label: '东营市',
    children: [{
      value: '370502',
      label: '东营区'
    }, {
      value: '370503',
      label: '河口区'
    }, {
      value: '370505',
      label: '垦利区'
    }, {
      value: '370522',
      label: '利津县'
    }, {
      value: '370523',
      label: '广饶县'
    }]
  }, {
    value: '370600',
    label: '烟台市',
    children: [{
      value: '370602',
      label: '芝罘区'
    }, {
      value: '370611',
      label: '福山区'
    }, {
      value: '370612',
      label: '牟平区'
    }, {
      value: '370613',
      label: '莱山区'
    }, {
      value: '370634',
      label: '长岛县'
    }, {
      value: '370681',
      label: '龙口市'
    }, {
      value: '370682',
      label: '莱阳市'
    }, {
      value: '370683',
      label: '莱州市'
    }, {
      value: '370684',
      label: '蓬莱市'
    }, {
      value: '370685',
      label: '招远市'
    }, {
      value: '370686',
      label: '栖霞市'
    }, {
      value: '370687',
      label: '海阳市'
    }]
  }, {
    value: '370700',
    label: '潍坊市',
    children: [{
      value: '370702',
      label: '潍城区'
    }, {
      value: '370703',
      label: '寒亭区'
    }, {
      value: '370704',
      label: '坊子区'
    }, {
      value: '370705',
      label: '奎文区'
    }, {
      value: '370724',
      label: '临朐县'
    }, {
      value: '370725',
      label: '昌乐县'
    }, {
      value: '370781',
      label: '青州市'
    }, {
      value: '370782',
      label: '诸城市'
    }, {
      value: '370783',
      label: '寿光市'
    }, {
      value: '370784',
      label: '安丘市'
    }, {
      value: '370785',
      label: '高密市'
    }, {
      value: '370786',
      label: '昌邑市'
    }]
  }, {
    value: '370800',
    label: '济宁市',
    children: [{
      value: '370811',
      label: '任城区'
    }, {
      value: '370812',
      label: '兖州区'
    }, {
      value: '370826',
      label: '微山县'
    }, {
      value: '370827',
      label: '鱼台县'
    }, {
      value: '370828',
      label: '金乡县'
    }, {
      value: '370829',
      label: '嘉祥县'
    }, {
      value: '370830',
      label: '汶上县'
    }, {
      value: '370831',
      label: '泗水县'
    }, {
      value: '370832',
      label: '梁山县'
    }, {
      value: '370881',
      label: '曲阜市'
    }, {
      value: '370883',
      label: '邹城市'
    }]
  }, {
    value: '370900',
    label: '泰安市',
    children: [{
      value: '370902',
      label: '泰山区'
    }, {
      value: '370911',
      label: '岱岳区'
    }, {
      value: '370921',
      label: '宁阳县'
    }, {
      value: '370923',
      label: '东平县'
    }, {
      value: '370982',
      label: '新泰市'
    }, {
      value: '370983',
      label: '肥城市'
    }]
  }, {
    value: '371000',
    label: '威海市',
    children: [{
      value: '371002',
      label: '环翠区'
    }, {
      value: '371003',
      label: '文登区'
    }, {
      value: '371082',
      label: '荣成市'
    }, {
      value: '371083',
      label: '乳山市'
    }]
  }, {
    value: '371100',
    label: '日照市',
    children: [{
      value: '371102',
      label: '东港区'
    }, {
      value: '371103',
      label: '岚山区'
    }, {
      value: '371121',
      label: '五莲县'
    }, {
      value: '371122',
      label: '莒县'
    }]
  }, {
    value: '371200',
    label: '莱芜市',
    children: [{
      value: '371202',
      label: '莱城区'
    }, {
      value: '371203',
      label: '钢城区'
    }]
  }, {
    value: '371300',
    label: '临沂市',
    children: [{
      value: '371302',
      label: '兰山区'
    }, {
      value: '371311',
      label: '罗庄区'
    }, {
      value: '371312',
      label: '河东区'
    }, {
      value: '371321',
      label: '沂南县'
    }, {
      value: '371322',
      label: '郯城县'
    }, {
      value: '371323',
      label: '沂水县'
    }, {
      value: '371324',
      label: '兰陵县'
    }, {
      value: '371325',
      label: '费县'
    }, {
      value: '371326',
      label: '平邑县'
    }, {
      value: '371327',
      label: '莒南县'
    }, {
      value: '371328',
      label: '蒙阴县'
    }, {
      value: '371329',
      label: '临沭县'
    }]
  }, {
    value: '371400',
    label: '德州市',
    children: [{
      value: '371402',
      label: '德城区'
    }, {
      value: '371403',
      label: '陵城区'
    }, {
      value: '371422',
      label: '宁津县'
    }, {
      value: '371423',
      label: '庆云县'
    }, {
      value: '371424',
      label: '临邑县'
    }, {
      value: '371425',
      label: '齐河县'
    }, {
      value: '371426',
      label: '平原县'
    }, {
      value: '371427',
      label: '夏津县'
    }, {
      value: '371428',
      label: '武城县'
    }, {
      value: '371481',
      label: '乐陵市'
    }, {
      value: '371482',
      label: '禹城市'
    }]
  }, {
    value: '371500',
    label: '聊城市',
    children: [{
      value: '371502',
      label: '东昌府区'
    }, {
      value: '371521',
      label: '阳谷县'
    }, {
      value: '371522',
      label: '莘县'
    }, {
      value: '371523',
      label: '茌平县'
    }, {
      value: '371524',
      label: '东阿县'
    }, {
      value: '371525',
      label: '冠县'
    }, {
      value: '371526',
      label: '高唐县'
    }, {
      value: '371581',
      label: '临清市'
    }]
  }, {
    value: '371600',
    label: '滨州市',
    children: [{
      value: '371602',
      label: '滨城区'
    }, {
      value: '371603',
      label: '沾化区'
    }, {
      value: '371621',
      label: '惠民县'
    }, {
      value: '371622',
      label: '阳信县'
    }, {
      value: '371623',
      label: '无棣县'
    }, {
      value: '371625',
      label: '博兴县'
    }, {
      value: '371626',
      label: '邹平县'
    }]
  }, {
    value: '371700',
    label: '菏泽市',
    children: [{
      value: '371702',
      label: '牡丹区'
    }, {
      value: '371703',
      label: '定陶区'
    }, {
      value: '371721',
      label: '曹县'
    }, {
      value: '371722',
      label: '单县'
    }, {
      value: '371723',
      label: '成武县'
    }, {
      value: '371724',
      label: '巨野县'
    }, {
      value: '371725',
      label: '郓城县'
    }, {
      value: '371726',
      label: '鄄城县'
    }, {
      value: '371728',
      label: '东明县'
    }]
  }]
}, {
  value: '410000',
  label: '河南省',
  children: [{
    value: '410100',
    label: '郑州市',
    children: [{
      value: '410102',
      label: '中原区'
    }, {
      value: '410103',
      label: '二七区'
    }, {
      value: '410104',
      label: '管城回族区'
    }, {
      value: '410105',
      label: '金水区'
    }, {
      value: '410106',
      label: '上街区'
    }, {
      value: '410108',
      label: '惠济区'
    }, {
      value: '410122',
      label: '中牟县'
    }, {
      value: '410181',
      label: '巩义市'
    }, {
      value: '410182',
      label: '荥阳市'
    }, {
      value: '410183',
      label: '新密市'
    }, {
      value: '410184',
      label: '新郑市'
    }, {
      value: '410185',
      label: '登封市'
    }]
  }, {
    value: '410200',
    label: '开封市',
    children: [{
      value: '410202',
      label: '龙亭区'
    }, {
      value: '410203',
      label: '顺河回族区'
    }, {
      value: '410204',
      label: '鼓楼区'
    }, {
      value: '410205',
      label: '禹王台区'
    }, {
      value: '410212',
      label: '祥符区'
    }, {
      value: '410221',
      label: '杞县'
    }, {
      value: '410222',
      label: '通许县'
    }, {
      value: '410223',
      label: '尉氏县'
    }, {
      value: '410225',
      label: '兰考县'
    }]
  }, {
    value: '410300',
    label: '洛阳市',
    children: [{
      value: '410302',
      label: '老城区'
    }, {
      value: '410303',
      label: '西工区'
    }, {
      value: '410304',
      label: '瀍河回族区'
    }, {
      value: '410305',
      label: '涧西区'
    }, {
      value: '410306',
      label: '吉利区'
    }, {
      value: '410311',
      label: '洛龙区'
    }, {
      value: '410322',
      label: '孟津县'
    }, {
      value: '410323',
      label: '新安县'
    }, {
      value: '410324',
      label: '栾川县'
    }, {
      value: '410325',
      label: '嵩县'
    }, {
      value: '410326',
      label: '汝阳县'
    }, {
      value: '410327',
      label: '宜阳县'
    }, {
      value: '410328',
      label: '洛宁县'
    }, {
      value: '410329',
      label: '伊川县'
    }, {
      value: '410381',
      label: '偃师市'
    }]
  }, {
    value: '410400',
    label: '平顶山市',
    children: [{
      value: '410402',
      label: '新华区'
    }, {
      value: '410403',
      label: '卫东区'
    }, {
      value: '410404',
      label: '石龙区'
    }, {
      value: '410411',
      label: '湛河区'
    }, {
      value: '410421',
      label: '宝丰县'
    }, {
      value: '410422',
      label: '叶县'
    }, {
      value: '410423',
      label: '鲁山县'
    }, {
      value: '410425',
      label: '郏县'
    }, {
      value: '410481',
      label: '舞钢市'
    }, {
      value: '410482',
      label: '汝州市'
    }]
  }, {
    value: '410500',
    label: '安阳市',
    children: [{
      value: '410502',
      label: '文峰区'
    }, {
      value: '410503',
      label: '北关区'
    }, {
      value: '410505',
      label: '殷都区'
    }, {
      value: '410506',
      label: '龙安区'
    }, {
      value: '410522',
      label: '安阳县'
    }, {
      value: '410523',
      label: '汤阴县'
    }, {
      value: '410526',
      label: '滑县'
    }, {
      value: '410527',
      label: '内黄县'
    }, {
      value: '410581',
      label: '林州市'
    }]
  }, {
    value: '410600',
    label: '鹤壁市',
    children: [{
      value: '410602',
      label: '鹤山区'
    }, {
      value: '410603',
      label: '山城区'
    }, {
      value: '410611',
      label: '淇滨区'
    }, {
      value: '410621',
      label: '浚县'
    }, {
      value: '410622',
      label: '淇县'
    }]
  }, {
    value: '410700',
    label: '新乡市',
    children: [{
      value: '410702',
      label: '红旗区'
    }, {
      value: '410703',
      label: '卫滨区'
    }, {
      value: '410704',
      label: '凤泉区'
    }, {
      value: '410711',
      label: '牧野区'
    }, {
      value: '410721',
      label: '新乡县'
    }, {
      value: '410724',
      label: '获嘉县'
    }, {
      value: '410725',
      label: '原阳县'
    }, {
      value: '410726',
      label: '延津县'
    }, {
      value: '410727',
      label: '封丘县'
    }, {
      value: '410728',
      label: '长垣县'
    }, {
      value: '410781',
      label: '卫辉市'
    }, {
      value: '410782',
      label: '辉县市'
    }]
  }, {
    value: '410800',
    label: '焦作市',
    children: [{
      value: '410802',
      label: '解放区'
    }, {
      value: '410803',
      label: '中站区'
    }, {
      value: '410804',
      label: '马村区'
    }, {
      value: '410811',
      label: '山阳区'
    }, {
      value: '410821',
      label: '修武县'
    }, {
      value: '410822',
      label: '博爱县'
    }, {
      value: '410823',
      label: '武陟县'
    }, {
      value: '410825',
      label: '温县'
    }, {
      value: '410882',
      label: '沁阳市'
    }, {
      value: '410883',
      label: '孟州市'
    }]
  }, {
    value: '410900',
    label: '濮阳市',
    children: [{
      value: '410902',
      label: '华龙区'
    }, {
      value: '410922',
      label: '清丰县'
    }, {
      value: '410923',
      label: '南乐县'
    }, {
      value: '410926',
      label: '范县'
    }, {
      value: '410927',
      label: '台前县'
    }, {
      value: '410928',
      label: '濮阳县'
    }]
  }, {
    value: '411000',
    label: '许昌市',
    children: [{
      value: '411002',
      label: '魏都区'
    }, {
      value: '411003',
      label: '建安区'
    }, {
      value: '411024',
      label: '鄢陵县'
    }, {
      value: '411025',
      label: '襄城县'
    }, {
      value: '411081',
      label: '禹州市'
    }, {
      value: '411082',
      label: '长葛市'
    }]
  }, {
    value: '411100',
    label: '漯河市',
    children: [{
      value: '411102',
      label: '源汇区'
    }, {
      value: '411103',
      label: '郾城区'
    }, {
      value: '411104',
      label: '召陵区'
    }, {
      value: '411121',
      label: '舞阳县'
    }, {
      value: '411122',
      label: '临颍县'
    }]
  }, {
    value: '411200',
    label: '三门峡市',
    children: [{
      value: '411202',
      label: '湖滨区'
    }, {
      value: '411203',
      label: '陕州区'
    }, {
      value: '411221',
      label: '渑池县'
    }, {
      value: '411224',
      label: '卢氏县'
    }, {
      value: '411281',
      label: '义马市'
    }, {
      value: '411282',
      label: '灵宝市'
    }]
  }, {
    value: '411300',
    label: '南阳市',
    children: [{
      value: '411302',
      label: '宛城区'
    }, {
      value: '411303',
      label: '卧龙区'
    }, {
      value: '411321',
      label: '南召县'
    }, {
      value: '411322',
      label: '方城县'
    }, {
      value: '411323',
      label: '西峡县'
    }, {
      value: '411324',
      label: '镇平县'
    }, {
      value: '411325',
      label: '内乡县'
    }, {
      value: '411326',
      label: '淅川县'
    }, {
      value: '411327',
      label: '社旗县'
    }, {
      value: '411328',
      label: '唐河县'
    }, {
      value: '411329',
      label: '新野县'
    }, {
      value: '411330',
      label: '桐柏县'
    }, {
      value: '411381',
      label: '邓州市'
    }]
  }, {
    value: '411400',
    label: '商丘市',
    children: [{
      value: '411402',
      label: '梁园区'
    }, {
      value: '411403',
      label: '睢阳区'
    }, {
      value: '411421',
      label: '民权县'
    }, {
      value: '411422',
      label: '睢县'
    }, {
      value: '411423',
      label: '宁陵县'
    }, {
      value: '411424',
      label: '柘城县'
    }, {
      value: '411425',
      label: '虞城县'
    }, {
      value: '411426',
      label: '夏邑县'
    }, {
      value: '411481',
      label: '永城市'
    }]
  }, {
    value: '411500',
    label: '信阳市',
    children: [{
      value: '411502',
      label: '浉河区'
    }, {
      value: '411503',
      label: '平桥区'
    }, {
      value: '411521',
      label: '罗山县'
    }, {
      value: '411522',
      label: '光山县'
    }, {
      value: '411523',
      label: '新县'
    }, {
      value: '411524',
      label: '商城县'
    }, {
      value: '411525',
      label: '固始县'
    }, {
      value: '411526',
      label: '潢川县'
    }, {
      value: '411527',
      label: '淮滨县'
    }, {
      value: '411528',
      label: '息县'
    }]
  }, {
    value: '411600',
    label: '周口市',
    children: [{
      value: '411602',
      label: '川汇区'
    }, {
      value: '411621',
      label: '扶沟县'
    }, {
      value: '411622',
      label: '西华县'
    }, {
      value: '411623',
      label: '商水县'
    }, {
      value: '411624',
      label: '沈丘县'
    }, {
      value: '411625',
      label: '郸城县'
    }, {
      value: '411626',
      label: '淮阳县'
    }, {
      value: '411627',
      label: '太康县'
    }, {
      value: '411628',
      label: '鹿邑县'
    }, {
      value: '411681',
      label: '项城市'
    }]
  }, {
    value: '411700',
    label: '驻马店市',
    children: [{
      value: '411702',
      label: '驿城区'
    }, {
      value: '411721',
      label: '西平县'
    }, {
      value: '411722',
      label: '上蔡县'
    }, {
      value: '411723',
      label: '平舆县'
    }, {
      value: '411724',
      label: '正阳县'
    }, {
      value: '411725',
      label: '确山县'
    }, {
      value: '411726',
      label: '泌阳县'
    }, {
      value: '411727',
      label: '汝南县'
    }, {
      value: '411728',
      label: '遂平县'
    }, {
      value: '411729',
      label: '新蔡县'
    }]
  }, {
    value: '419000',
    label: '省直辖县级行政区划',
    children: [{
      value: '419001',
      label: '济源市'
    }]
  }]
}, {
  value: '420000',
  label: '湖北省',
  children: [{
    value: '420100',
    label: '武汉市',
    children: [{
      value: '420102',
      label: '江岸区'
    }, {
      value: '420103',
      label: '江汉区'
    }, {
      value: '420104',
      label: '硚口区'
    }, {
      value: '420105',
      label: '汉阳区'
    }, {
      value: '420106',
      label: '武昌区'
    }, {
      value: '420107',
      label: '青山区'
    }, {
      value: '420111',
      label: '洪山区'
    }, {
      value: '420112',
      label: '东西湖区'
    }, {
      value: '420113',
      label: '汉南区'
    }, {
      value: '420114',
      label: '蔡甸区'
    }, {
      value: '420115',
      label: '江夏区'
    }, {
      value: '420116',
      label: '黄陂区'
    }, {
      value: '420117',
      label: '新洲区'
    }]
  }, {
    value: '420200',
    label: '黄石市',
    children: [{
      value: '420202',
      label: '黄石港区'
    }, {
      value: '420203',
      label: '西塞山区'
    }, {
      value: '420204',
      label: '下陆区'
    }, {
      value: '420205',
      label: '铁山区'
    }, {
      value: '420222',
      label: '阳新县'
    }, {
      value: '420281',
      label: '大冶市'
    }]
  }, {
    value: '420300',
    label: '十堰市',
    children: [{
      value: '420302',
      label: '茅箭区'
    }, {
      value: '420303',
      label: '张湾区'
    }, {
      value: '420304',
      label: '郧阳区'
    }, {
      value: '420322',
      label: '郧西县'
    }, {
      value: '420323',
      label: '竹山县'
    }, {
      value: '420324',
      label: '竹溪县'
    }, {
      value: '420325',
      label: '房县'
    }, {
      value: '420381',
      label: '丹江口市'
    }]
  }, {
    value: '420500',
    label: '宜昌市',
    children: [{
      value: '420502',
      label: '西陵区'
    }, {
      value: '420503',
      label: '伍家岗区'
    }, {
      value: '420504',
      label: '点军区'
    }, {
      value: '420505',
      label: '猇亭区'
    }, {
      value: '420506',
      label: '夷陵区'
    }, {
      value: '420525',
      label: '远安县'
    }, {
      value: '420526',
      label: '兴山县'
    }, {
      value: '420527',
      label: '秭归县'
    }, {
      value: '420528',
      label: '长阳土家族自治县'
    }, {
      value: '420529',
      label: '五峰土家族自治县'
    }, {
      value: '420581',
      label: '宜都市'
    }, {
      value: '420582',
      label: '当阳市'
    }, {
      value: '420583',
      label: '枝江市'
    }]
  }, {
    value: '420600',
    label: '襄阳市',
    children: [{
      value: '420602',
      label: '襄城区'
    }, {
      value: '420606',
      label: '樊城区'
    }, {
      value: '420607',
      label: '襄州区'
    }, {
      value: '420624',
      label: '南漳县'
    }, {
      value: '420625',
      label: '谷城县'
    }, {
      value: '420626',
      label: '保康县'
    }, {
      value: '420682',
      label: '老河口市'
    }, {
      value: '420683',
      label: '枣阳市'
    }, {
      value: '420684',
      label: '宜城市'
    }]
  }, {
    value: '420700',
    label: '鄂州市',
    children: [{
      value: '420702',
      label: '梁子湖区'
    }, {
      value: '420703',
      label: '华容区'
    }, {
      value: '420704',
      label: '鄂城区'
    }]
  }, {
    value: '420800',
    label: '荆门市',
    children: [{
      value: '420802',
      label: '东宝区'
    }, {
      value: '420804',
      label: '掇刀区'
    }, {
      value: '420821',
      label: '京山县'
    }, {
      value: '420822',
      label: '沙洋县'
    }, {
      value: '420881',
      label: '钟祥市'
    }]
  }, {
    value: '420900',
    label: '孝感市',
    children: [{
      value: '420902',
      label: '孝南区'
    }, {
      value: '420921',
      label: '孝昌县'
    }, {
      value: '420922',
      label: '大悟县'
    }, {
      value: '420923',
      label: '云梦县'
    }, {
      value: '420981',
      label: '应城市'
    }, {
      value: '420982',
      label: '安陆市'
    }, {
      value: '420984',
      label: '汉川市'
    }]
  }, {
    value: '421000',
    label: '荆州市',
    children: [{
      value: '421002',
      label: '沙市区'
    }, {
      value: '421003',
      label: '荆州区'
    }, {
      value: '421022',
      label: '公安县'
    }, {
      value: '421023',
      label: '监利县'
    }, {
      value: '421024',
      label: '江陵县'
    }, {
      value: '421081',
      label: '石首市'
    }, {
      value: '421083',
      label: '洪湖市'
    }, {
      value: '421087',
      label: '松滋市'
    }]
  }, {
    value: '421100',
    label: '黄冈市',
    children: [{
      value: '421102',
      label: '黄州区'
    }, {
      value: '421121',
      label: '团风县'
    }, {
      value: '421122',
      label: '红安县'
    }, {
      value: '421123',
      label: '罗田县'
    }, {
      value: '421124',
      label: '英山县'
    }, {
      value: '421125',
      label: '浠水县'
    }, {
      value: '421126',
      label: '蕲春县'
    }, {
      value: '421127',
      label: '黄梅县'
    }, {
      value: '421181',
      label: '麻城市'
    }, {
      value: '421182',
      label: '武穴市'
    }]
  }, {
    value: '421200',
    label: '咸宁市',
    children: [{
      value: '421202',
      label: '咸安区'
    }, {
      value: '421221',
      label: '嘉鱼县'
    }, {
      value: '421222',
      label: '通城县'
    }, {
      value: '421223',
      label: '崇阳县'
    }, {
      value: '421224',
      label: '通山县'
    }, {
      value: '421281',
      label: '赤壁市'
    }]
  }, {
    value: '421300',
    label: '随州市',
    children: [{
      value: '421303',
      label: '曾都区'
    }, {
      value: '421321',
      label: '随县'
    }, {
      value: '421381',
      label: '广水市'
    }]
  }, {
    value: '422800',
    label: '恩施土家族苗族自治州',
    children: [{
      value: '422801',
      label: '恩施市'
    }, {
      value: '422802',
      label: '利川市'
    }, {
      value: '422822',
      label: '建始县'
    }, {
      value: '422823',
      label: '巴东县'
    }, {
      value: '422825',
      label: '宣恩县'
    }, {
      value: '422826',
      label: '咸丰县'
    }, {
      value: '422827',
      label: '来凤县'
    }, {
      value: '422828',
      label: '鹤峰县'
    }]
  }, {
    value: '429000',
    label: '省直辖县级行政区划',
    children: [{
      value: '429004',
      label: '仙桃市'
    }, {
      value: '429005',
      label: '潜江市'
    }, {
      value: '429006',
      label: '天门市'
    }, {
      value: '429021',
      label: '神农架林区'
    }]
  }]
}, {
  value: '430000',
  label: '湖南省',
  children: [{
    value: '430100',
    label: '长沙市',
    children: [{
      value: '430102',
      label: '芙蓉区'
    }, {
      value: '430103',
      label: '天心区'
    }, {
      value: '430104',
      label: '岳麓区'
    }, {
      value: '430105',
      label: '开福区'
    }, {
      value: '430111',
      label: '雨花区'
    }, {
      value: '430112',
      label: '望城区'
    }, {
      value: '430121',
      label: '长沙县'
    }, {
      value: '430181',
      label: '浏阳市'
    }, {
      value: '430182',
      label: '宁乡市'
    }]
  }, {
    value: '430200',
    label: '株洲市',
    children: [{
      value: '430202',
      label: '荷塘区'
    }, {
      value: '430203',
      label: '芦淞区'
    }, {
      value: '430204',
      label: '石峰区'
    }, {
      value: '430211',
      label: '天元区'
    }, {
      value: '430221',
      label: '株洲县'
    }, {
      value: '430223',
      label: '攸县'
    }, {
      value: '430224',
      label: '茶陵县'
    }, {
      value: '430225',
      label: '炎陵县'
    }, {
      value: '430281',
      label: '醴陵市'
    }]
  }, {
    value: '430300',
    label: '湘潭市',
    children: [{
      value: '430302',
      label: '雨湖区'
    }, {
      value: '430304',
      label: '岳塘区'
    }, {
      value: '430321',
      label: '湘潭县'
    }, {
      value: '430381',
      label: '湘乡市'
    }, {
      value: '430382',
      label: '韶山市'
    }]
  }, {
    value: '430400',
    label: '衡阳市',
    children: [{
      value: '430405',
      label: '珠晖区'
    }, {
      value: '430406',
      label: '雁峰区'
    }, {
      value: '430407',
      label: '石鼓区'
    }, {
      value: '430408',
      label: '蒸湘区'
    }, {
      value: '430412',
      label: '南岳区'
    }, {
      value: '430421',
      label: '衡阳县'
    }, {
      value: '430422',
      label: '衡南县'
    }, {
      value: '430423',
      label: '衡山县'
    }, {
      value: '430424',
      label: '衡东县'
    }, {
      value: '430426',
      label: '祁东县'
    }, {
      value: '430481',
      label: '耒阳市'
    }, {
      value: '430482',
      label: '常宁市'
    }]
  }, {
    value: '430500',
    label: '邵阳市',
    children: [{
      value: '430502',
      label: '双清区'
    }, {
      value: '430503',
      label: '大祥区'
    }, {
      value: '430511',
      label: '北塔区'
    }, {
      value: '430521',
      label: '邵东县'
    }, {
      value: '430522',
      label: '新邵县'
    }, {
      value: '430523',
      label: '邵阳县'
    }, {
      value: '430524',
      label: '隆回县'
    }, {
      value: '430525',
      label: '洞口县'
    }, {
      value: '430527',
      label: '绥宁县'
    }, {
      value: '430528',
      label: '新宁县'
    }, {
      value: '430529',
      label: '城步苗族自治县'
    }, {
      value: '430581',
      label: '武冈市'
    }]
  }, {
    value: '430600',
    label: '岳阳市',
    children: [{
      value: '430602',
      label: '岳阳楼区'
    }, {
      value: '430603',
      label: '云溪区'
    }, {
      value: '430611',
      label: '君山区'
    }, {
      value: '430621',
      label: '岳阳县'
    }, {
      value: '430623',
      label: '华容县'
    }, {
      value: '430624',
      label: '湘阴县'
    }, {
      value: '430626',
      label: '平江县'
    }, {
      value: '430681',
      label: '汨罗市'
    }, {
      value: '430682',
      label: '临湘市'
    }]
  }, {
    value: '430700',
    label: '常德市',
    children: [{
      value: '430702',
      label: '武陵区'
    }, {
      value: '430703',
      label: '鼎城区'
    }, {
      value: '430721',
      label: '安乡县'
    }, {
      value: '430722',
      label: '汉寿县'
    }, {
      value: '430723',
      label: '澧县'
    }, {
      value: '430724',
      label: '临澧县'
    }, {
      value: '430725',
      label: '桃源县'
    }, {
      value: '430726',
      label: '石门县'
    }, {
      value: '430781',
      label: '津市市'
    }]
  }, {
    value: '430800',
    label: '张家界市',
    children: [{
      value: '430802',
      label: '永定区'
    }, {
      value: '430811',
      label: '武陵源区'
    }, {
      value: '430821',
      label: '慈利县'
    }, {
      value: '430822',
      label: '桑植县'
    }]
  }, {
    value: '430900',
    label: '益阳市',
    children: [{
      value: '430902',
      label: '资阳区'
    }, {
      value: '430903',
      label: '赫山区'
    }, {
      value: '430921',
      label: '南县'
    }, {
      value: '430922',
      label: '桃江县'
    }, {
      value: '430923',
      label: '安化县'
    }, {
      value: '430981',
      label: '沅江市'
    }]
  }, {
    value: '431000',
    label: '郴州市',
    children: [{
      value: '431002',
      label: '北湖区'
    }, {
      value: '431003',
      label: '苏仙区'
    }, {
      value: '431021',
      label: '桂阳县'
    }, {
      value: '431022',
      label: '宜章县'
    }, {
      value: '431023',
      label: '永兴县'
    }, {
      value: '431024',
      label: '嘉禾县'
    }, {
      value: '431025',
      label: '临武县'
    }, {
      value: '431026',
      label: '汝城县'
    }, {
      value: '431027',
      label: '桂东县'
    }, {
      value: '431028',
      label: '安仁县'
    }, {
      value: '431081',
      label: '资兴市'
    }]
  }, {
    value: '431100',
    label: '永州市',
    children: [{
      value: '431102',
      label: '零陵区'
    }, {
      value: '431103',
      label: '冷水滩区'
    }, {
      value: '431121',
      label: '祁阳县'
    }, {
      value: '431122',
      label: '东安县'
    }, {
      value: '431123',
      label: '双牌县'
    }, {
      value: '431124',
      label: '道县'
    }, {
      value: '431125',
      label: '江永县'
    }, {
      value: '431126',
      label: '宁远县'
    }, {
      value: '431127',
      label: '蓝山县'
    }, {
      value: '431128',
      label: '新田县'
    }, {
      value: '431129',
      label: '江华瑶族自治县'
    }]
  }, {
    value: '431200',
    label: '怀化市',
    children: [{
      value: '431202',
      label: '鹤城区'
    }, {
      value: '431221',
      label: '中方县'
    }, {
      value: '431222',
      label: '沅陵县'
    }, {
      value: '431223',
      label: '辰溪县'
    }, {
      value: '431224',
      label: '溆浦县'
    }, {
      value: '431225',
      label: '会同县'
    }, {
      value: '431226',
      label: '麻阳苗族自治县'
    }, {
      value: '431227',
      label: '新晃侗族自治县'
    }, {
      value: '431228',
      label: '芷江侗族自治县'
    }, {
      value: '431229',
      label: '靖州苗族侗族自治县'
    }, {
      value: '431230',
      label: '通道侗族自治县'
    }, {
      value: '431281',
      label: '洪江市'
    }]
  }, {
    value: '431300',
    label: '娄底市',
    children: [{
      value: '431302',
      label: '娄星区'
    }, {
      value: '431321',
      label: '双峰县'
    }, {
      value: '431322',
      label: '新化县'
    }, {
      value: '431381',
      label: '冷水江市'
    }, {
      value: '431382',
      label: '涟源市'
    }]
  }, {
    value: '433100',
    label: '湘西土家族苗族自治州',
    children: [{
      value: '433101',
      label: '吉首市'
    }, {
      value: '433122',
      label: '泸溪县'
    }, {
      value: '433123',
      label: '凤凰县'
    }, {
      value: '433124',
      label: '花垣县'
    }, {
      value: '433125',
      label: '保靖县'
    }, {
      value: '433126',
      label: '古丈县'
    }, {
      value: '433127',
      label: '永顺县'
    }, {
      value: '433130',
      label: '龙山县'
    }]
  }]
}, {
  value: '440000',
  label: '广东省',
  children: [{
    value: '440100',
    label: '广州市',
    children: [{
      value: '440103',
      label: '荔湾区'
    }, {
      value: '440104',
      label: '越秀区'
    }, {
      value: '440105',
      label: '海珠区'
    }, {
      value: '440106',
      label: '天河区'
    }, {
      value: '440111',
      label: '白云区'
    }, {
      value: '440112',
      label: '黄埔区'
    }, {
      value: '440113',
      label: '番禺区'
    }, {
      value: '440114',
      label: '花都区'
    }, {
      value: '440115',
      label: '南沙区'
    }, {
      value: '440117',
      label: '从化区'
    }, {
      value: '440118',
      label: '增城区'
    }]
  }, {
    value: '440200',
    label: '韶关市',
    children: [{
      value: '440203',
      label: '武江区'
    }, {
      value: '440204',
      label: '浈江区'
    }, {
      value: '440205',
      label: '曲江区'
    }, {
      value: '440222',
      label: '始兴县'
    }, {
      value: '440224',
      label: '仁化县'
    }, {
      value: '440229',
      label: '翁源县'
    }, {
      value: '440232',
      label: '乳源瑶族自治县'
    }, {
      value: '440233',
      label: '新丰县'
    }, {
      value: '440281',
      label: '乐昌市'
    }, {
      value: '440282',
      label: '南雄市'
    }]
  }, {
    value: '440300',
    label: '深圳市',
    children: [{
      value: '440303',
      label: '罗湖区'
    }, {
      value: '440304',
      label: '福田区'
    }, {
      value: '440305',
      label: '南山区'
    }, {
      value: '440306',
      label: '宝安区'
    }, {
      value: '440307',
      label: '龙岗区'
    }, {
      value: '440308',
      label: '盐田区'
    }, {
      value: '440309',
      label: '龙华区'
    }, {
      value: '440310',
      label: '坪山区'
    }]
  }, {
    value: '440400',
    label: '珠海市',
    children: [{
      value: '440402',
      label: '香洲区'
    }, {
      value: '440403',
      label: '斗门区'
    }, {
      value: '440404',
      label: '金湾区'
    }]
  }, {
    value: '440500',
    label: '汕头市',
    children: [{
      value: '440507',
      label: '龙湖区'
    }, {
      value: '440511',
      label: '金平区'
    }, {
      value: '440512',
      label: '濠江区'
    }, {
      value: '440513',
      label: '潮阳区'
    }, {
      value: '440514',
      label: '潮南区'
    }, {
      value: '440515',
      label: '澄海区'
    }, {
      value: '440523',
      label: '南澳县'
    }]
  }, {
    value: '440600',
    label: '佛山市',
    children: [{
      value: '440604',
      label: '禅城区'
    }, {
      value: '440605',
      label: '南海区'
    }, {
      value: '440606',
      label: '顺德区'
    }, {
      value: '440607',
      label: '三水区'
    }, {
      value: '440608',
      label: '高明区'
    }]
  }, {
    value: '440700',
    label: '江门市',
    children: [{
      value: '440703',
      label: '蓬江区'
    }, {
      value: '440704',
      label: '江海区'
    }, {
      value: '440705',
      label: '新会区'
    }, {
      value: '440781',
      label: '台山市'
    }, {
      value: '440783',
      label: '开平市'
    }, {
      value: '440784',
      label: '鹤山市'
    }, {
      value: '440785',
      label: '恩平市'
    }]
  }, {
    value: '440800',
    label: '湛江市',
    children: [{
      value: '440802',
      label: '赤坎区'
    }, {
      value: '440803',
      label: '霞山区'
    }, {
      value: '440804',
      label: '坡头区'
    }, {
      value: '440811',
      label: '麻章区'
    }, {
      value: '440823',
      label: '遂溪县'
    }, {
      value: '440825',
      label: '徐闻县'
    }, {
      value: '440881',
      label: '廉江市'
    }, {
      value: '440882',
      label: '雷州市'
    }, {
      value: '440883',
      label: '吴川市'
    }]
  }, {
    value: '440900',
    label: '茂名市',
    children: [{
      value: '440902',
      label: '茂南区'
    }, {
      value: '440904',
      label: '电白区'
    }, {
      value: '440981',
      label: '高州市'
    }, {
      value: '440982',
      label: '化州市'
    }, {
      value: '440983',
      label: '信宜市'
    }]
  }, {
    value: '441200',
    label: '肇庆市',
    children: [{
      value: '441202',
      label: '端州区'
    }, {
      value: '441203',
      label: '鼎湖区'
    }, {
      value: '441204',
      label: '高要区'
    }, {
      value: '441223',
      label: '广宁县'
    }, {
      value: '441224',
      label: '怀集县'
    }, {
      value: '441225',
      label: '封开县'
    }, {
      value: '441226',
      label: '德庆县'
    }, {
      value: '441284',
      label: '四会市'
    }]
  }, {
    value: '441300',
    label: '惠州市',
    children: [{
      value: '441302',
      label: '惠城区'
    }, {
      value: '441303',
      label: '惠阳区'
    }, {
      value: '441322',
      label: '博罗县'
    }, {
      value: '441323',
      label: '惠东县'
    }, {
      value: '441324',
      label: '龙门县'
    }]
  }, {
    value: '441400',
    label: '梅州市',
    children: [{
      value: '441402',
      label: '梅江区'
    }, {
      value: '441403',
      label: '梅县区'
    }, {
      value: '441422',
      label: '大埔县'
    }, {
      value: '441423',
      label: '丰顺县'
    }, {
      value: '441424',
      label: '五华县'
    }, {
      value: '441426',
      label: '平远县'
    }, {
      value: '441427',
      label: '蕉岭县'
    }, {
      value: '441481',
      label: '兴宁市'
    }]
  }, {
    value: '441500',
    label: '汕尾市',
    children: [{
      value: '441502',
      label: '城区'
    }, {
      value: '441521',
      label: '海丰县'
    }, {
      value: '441523',
      label: '陆河县'
    }, {
      value: '441581',
      label: '陆丰市'
    }]
  }, {
    value: '441600',
    label: '河源市',
    children: [{
      value: '441602',
      label: '源城区'
    }, {
      value: '441621',
      label: '紫金县'
    }, {
      value: '441622',
      label: '龙川县'
    }, {
      value: '441623',
      label: '连平县'
    }, {
      value: '441624',
      label: '和平县'
    }, {
      value: '441625',
      label: '东源县'
    }]
  }, {
    value: '441700',
    label: '阳江市',
    children: [{
      value: '441702',
      label: '江城区'
    }, {
      value: '441704',
      label: '阳东区'
    }, {
      value: '441721',
      label: '阳西县'
    }, {
      value: '441781',
      label: '阳春市'
    }]
  }, {
    value: '441800',
    label: '清远市',
    children: [{
      value: '441802',
      label: '清城区'
    }, {
      value: '441803',
      label: '清新区'
    }, {
      value: '441821',
      label: '佛冈县'
    }, {
      value: '441823',
      label: '阳山县'
    }, {
      value: '441825',
      label: '连山壮族瑶族自治县'
    }, {
      value: '441826',
      label: '连南瑶族自治县'
    }, {
      value: '441881',
      label: '英德市'
    }, {
      value: '441882',
      label: '连州市'
    }]
  }, {
    value: '441900',
    label: '东莞市',
    children: [{
      value: '441901',
      label: '东城街道'
    }, {
      value: '441902',
      label: '南城街道'
    }, {
      value: '441903',
      label: '万江街道'
    }, {
      value: '441904',
      label: '莞城街道'
    }, {
      value: '441905',
      label: '石碣镇'
    }, {
      value: '441906',
      label: '石龙镇'
    }, {
      value: '441907',
      label: '茶山镇'
    }, {
      value: '441908',
      label: '石排镇'
    }, {
      value: '441909',
      label: '企石镇'
    }, {
      value: '441910',
      label: '横沥镇'
    }, {
      value: '441911',
      label: '桥头镇'
    }, {
      value: '441912',
      label: '谢岗镇'
    }, {
      value: '441913',
      label: '东坑镇'
    }, {
      value: '441914',
      label: '常平镇'
    }, {
      value: '441915',
      label: '寮步镇'
    }, {
      value: '441916',
      label: '樟木头镇'
    }, {
      value: '441917',
      label: '大朗镇'
    }, {
      value: '441918',
      label: '黄江镇'
    }, {
      value: '441919',
      label: '清溪镇'
    }, {
      value: '441920',
      label: '塘厦镇'
    }, {
      value: '441921',
      label: '凤岗镇'
    }, {
      value: '441922',
      label: '大岭山镇'
    }, {
      value: '441923',
      label: '长安镇'
    }, {
      value: '441924',
      label: '虎门镇'
    }, {
      value: '441925',
      label: '厚街镇'
    }, {
      value: '441926',
      label: '沙田镇'
    }, {
      value: '441927',
      label: '道滘镇'
    }, {
      value: '441928',
      label: '洪梅镇'
    }, {
      value: '441929',
      label: '麻涌镇'
    }, {
      value: '441930',
      label: '望牛墩镇'
    }, {
      value: '441931',
      label: '中堂镇'
    }, {
      value: '441932',
      label: '高埗镇'
    }, {
      value: '441933',
      label: '松山湖管委会'
    }, {
      value: '441934',
      label: '虎门港管委会'
    }, {
      value: '441935',
      label: '东莞生态园'
    }]
  }, {
    value: '442000',
    label: '中山市',
    children: [{
      value: '442001',
      label: '石岐区街道'
    }, {
      value: '442002',
      label: '东区街道'
    }, {
      value: '442003',
      label: '火炬开发区'
    }, {
      value: '442004',
      label: '西区街道'
    }, {
      value: '442005',
      label: '南区街道'
    }, {
      value: '442006',
      label: '五桂山街道'
    }, {
      value: '442007',
      label: '小榄镇'
    }, {
      value: '442008',
      label: '黄圃镇'
    }, {
      value: '442009',
      label: '民众镇'
    }, {
      value: '442010',
      label: '东凤镇'
    }, {
      value: '442011',
      label: '东升镇'
    }, {
      value: '442012',
      label: '古镇镇'
    }, {
      value: '442013',
      label: '沙溪镇'
    }, {
      value: '442014',
      label: '坦洲镇'
    }, {
      value: '442015',
      label: '港口镇'
    }, {
      value: '442016',
      label: '三角镇'
    }, {
      value: '442017',
      label: '横栏镇'
    }, {
      value: '442018',
      label: '南头镇'
    }, {
      value: '442019',
      label: '阜沙镇'
    }, {
      value: '442020',
      label: '南朗镇'
    }, {
      value: '442021',
      label: '三乡镇'
    }, {
      value: '442022',
      label: '板芙镇'
    }, {
      value: '442023',
      label: '大涌镇'
    }, {
      value: '442024',
      label: '神湾镇'
    }]
  }, {
    value: '445100',
    label: '潮州市',
    children: [{
      value: '445102',
      label: '湘桥区'
    }, {
      value: '445103',
      label: '潮安区'
    }, {
      value: '445122',
      label: '饶平县'
    }]
  }, {
    value: '445200',
    label: '揭阳市',
    children: [{
      value: '445202',
      label: '榕城区'
    }, {
      value: '445203',
      label: '揭东区'
    }, {
      value: '445222',
      label: '揭西县'
    }, {
      value: '445224',
      label: '惠来县'
    }, {
      value: '445281',
      label: '普宁市'
    }]
  }, {
    value: '445300',
    label: '云浮市',
    children: [{
      value: '445302',
      label: '云城区'
    }, {
      value: '445303',
      label: '云安区'
    }, {
      value: '445321',
      label: '新兴县'
    }, {
      value: '445322',
      label: '郁南县'
    }, {
      value: '445381',
      label: '罗定市'
    }]
  }]
}, {
  value: '450000',
  label: '广西壮族自治区',
  children: [{
    value: '450100',
    label: '南宁市',
    children: [{
      value: '450102',
      label: '兴宁区'
    }, {
      value: '450103',
      label: '青秀区'
    }, {
      value: '450105',
      label: '江南区'
    }, {
      value: '450107',
      label: '西乡塘区'
    }, {
      value: '450108',
      label: '良庆区'
    }, {
      value: '450109',
      label: '邕宁区'
    }, {
      value: '450110',
      label: '武鸣区'
    }, {
      value: '450123',
      label: '隆安县'
    }, {
      value: '450124',
      label: '马山县'
    }, {
      value: '450125',
      label: '上林县'
    }, {
      value: '450126',
      label: '宾阳县'
    }, {
      value: '450127',
      label: '横县'
    }]
  }, {
    value: '450200',
    label: '柳州市',
    children: [{
      value: '450202',
      label: '城中区'
    }, {
      value: '450203',
      label: '鱼峰区'
    }, {
      value: '450204',
      label: '柳南区'
    }, {
      value: '450205',
      label: '柳北区'
    }, {
      value: '450206',
      label: '柳江区'
    }, {
      value: '450222',
      label: '柳城县'
    }, {
      value: '450223',
      label: '鹿寨县'
    }, {
      value: '450224',
      label: '融安县'
    }, {
      value: '450225',
      label: '融水苗族自治县'
    }, {
      value: '450226',
      label: '三江侗族自治县'
    }]
  }, {
    value: '450300',
    label: '桂林市',
    children: [{
      value: '450302',
      label: '秀峰区'
    }, {
      value: '450303',
      label: '叠彩区'
    }, {
      value: '450304',
      label: '象山区'
    }, {
      value: '450305',
      label: '七星区'
    }, {
      value: '450311',
      label: '雁山区'
    }, {
      value: '450312',
      label: '临桂区'
    }, {
      value: '450321',
      label: '阳朔县'
    }, {
      value: '450323',
      label: '灵川县'
    }, {
      value: '450324',
      label: '全州县'
    }, {
      value: '450325',
      label: '兴安县'
    }, {
      value: '450326',
      label: '永福县'
    }, {
      value: '450327',
      label: '灌阳县'
    }, {
      value: '450328',
      label: '龙胜各族自治县'
    }, {
      value: '450329',
      label: '资源县'
    }, {
      value: '450330',
      label: '平乐县'
    }, {
      value: '450331',
      label: '荔浦县'
    }, {
      value: '450332',
      label: '恭城瑶族自治县'
    }]
  }, {
    value: '450400',
    label: '梧州市',
    children: [{
      value: '450403',
      label: '万秀区'
    }, {
      value: '450405',
      label: '长洲区'
    }, {
      value: '450406',
      label: '龙圩区'
    }, {
      value: '450421',
      label: '苍梧县'
    }, {
      value: '450422',
      label: '藤县'
    }, {
      value: '450423',
      label: '蒙山县'
    }, {
      value: '450481',
      label: '岑溪市'
    }]
  }, {
    value: '450500',
    label: '北海市',
    children: [{
      value: '450502',
      label: '海城区'
    }, {
      value: '450503',
      label: '银海区'
    }, {
      value: '450512',
      label: '铁山港区'
    }, {
      value: '450521',
      label: '合浦县'
    }]
  }, {
    value: '450600',
    label: '防城港市',
    children: [{
      value: '450602',
      label: '港口区'
    }, {
      value: '450603',
      label: '防城区'
    }, {
      value: '450621',
      label: '上思县'
    }, {
      value: '450681',
      label: '东兴市'
    }]
  }, {
    value: '450700',
    label: '钦州市',
    children: [{
      value: '450702',
      label: '钦南区'
    }, {
      value: '450703',
      label: '钦北区'
    }, {
      value: '450721',
      label: '灵山县'
    }, {
      value: '450722',
      label: '浦北县'
    }]
  }, {
    value: '450800',
    label: '贵港市',
    children: [{
      value: '450802',
      label: '港北区'
    }, {
      value: '450803',
      label: '港南区'
    }, {
      value: '450804',
      label: '覃塘区'
    }, {
      value: '450821',
      label: '平南县'
    }, {
      value: '450881',
      label: '桂平市'
    }]
  }, {
    value: '450900',
    label: '玉林市',
    children: [{
      value: '450902',
      label: '玉州区'
    }, {
      value: '450903',
      label: '福绵区'
    }, {
      value: '450921',
      label: '容县'
    }, {
      value: '450922',
      label: '陆川县'
    }, {
      value: '450923',
      label: '博白县'
    }, {
      value: '450924',
      label: '兴业县'
    }, {
      value: '450981',
      label: '北流市'
    }]
  }, {
    value: '451000',
    label: '百色市',
    children: [{
      value: '451002',
      label: '右江区'
    }, {
      value: '451021',
      label: '田阳县'
    }, {
      value: '451022',
      label: '田东县'
    }, {
      value: '451023',
      label: '平果县'
    }, {
      value: '451024',
      label: '德保县'
    }, {
      value: '451026',
      label: '那坡县'
    }, {
      value: '451027',
      label: '凌云县'
    }, {
      value: '451028',
      label: '乐业县'
    }, {
      value: '451029',
      label: '田林县'
    }, {
      value: '451030',
      label: '西林县'
    }, {
      value: '451031',
      label: '隆林各族自治县'
    }, {
      value: '451081',
      label: '靖西市'
    }]
  }, {
    value: '451100',
    label: '贺州市',
    children: [{
      value: '451102',
      label: '八步区'
    }, {
      value: '451103',
      label: '平桂区'
    }, {
      value: '451121',
      label: '昭平县'
    }, {
      value: '451122',
      label: '钟山县'
    }, {
      value: '451123',
      label: '富川瑶族自治县'
    }]
  }, {
    value: '451200',
    label: '河池市',
    children: [{
      value: '451202',
      label: '金城江区'
    }, {
      value: '451203',
      label: '宜州区'
    }, {
      value: '451221',
      label: '南丹县'
    }, {
      value: '451222',
      label: '天峨县'
    }, {
      value: '451223',
      label: '凤山县'
    }, {
      value: '451224',
      label: '东兰县'
    }, {
      value: '451225',
      label: '罗城仫佬族自治县'
    }, {
      value: '451226',
      label: '环江毛南族自治县'
    }, {
      value: '451227',
      label: '巴马瑶族自治县'
    }, {
      value: '451228',
      label: '都安瑶族自治县'
    }, {
      value: '451229',
      label: '大化瑶族自治县'
    }]
  }, {
    value: '451300',
    label: '来宾市',
    children: [{
      value: '451302',
      label: '兴宾区'
    }, {
      value: '451321',
      label: '忻城县'
    }, {
      value: '451322',
      label: '象州县'
    }, {
      value: '451323',
      label: '武宣县'
    }, {
      value: '451324',
      label: '金秀瑶族自治县'
    }, {
      value: '451381',
      label: '合山市'
    }]
  }, {
    value: '451400',
    label: '崇左市',
    children: [{
      value: '451402',
      label: '江州区'
    }, {
      value: '451421',
      label: '扶绥县'
    }, {
      value: '451422',
      label: '宁明县'
    }, {
      value: '451423',
      label: '龙州县'
    }, {
      value: '451424',
      label: '大新县'
    }, {
      value: '451425',
      label: '天等县'
    }, {
      value: '451481',
      label: '凭祥市'
    }]
  }]
}, {
  value: '460000',
  label: '海南省',
  children: [{
    value: '460100',
    label: '海口市',
    children: [{
      value: '460105',
      label: '秀英区'
    }, {
      value: '460106',
      label: '龙华区'
    }, {
      value: '460107',
      label: '琼山区'
    }, {
      value: '460108',
      label: '美兰区'
    }]
  }, {
    value: '460200',
    label: '三亚市',
    children: [{
      value: '460202',
      label: '海棠区'
    }, {
      value: '460203',
      label: '吉阳区'
    }, {
      value: '460204',
      label: '天涯区'
    }, {
      value: '460205',
      label: '崖州区'
    }]
  }, {
    value: '460300',
    label: '三沙市',
    children: [{
      value: '460321',
      label: '西沙群岛'
    }, {
      value: '460322',
      label: '南沙群岛'
    }, {
      value: '460323',
      label: '中沙群岛的岛礁及其海域'
    }]
  }, {
    value: '460400',
    label: '儋州市',
    children: [{
      value: '460401',
      label: '那大镇'
    }, {
      value: '460402',
      label: '和庆镇'
    }, {
      value: '460403',
      label: '南丰镇'
    }, {
      value: '460404',
      label: '大成镇'
    }, {
      value: '460405',
      label: '雅星镇'
    }, {
      value: '460406',
      label: '兰洋镇'
    }, {
      value: '460407',
      label: '光村镇'
    }, {
      value: '460408',
      label: '木棠镇'
    }, {
      value: '460409',
      label: '海头镇'
    }, {
      value: '460410',
      label: '峨蔓镇'
    }, {
      value: '460411',
      label: '三都镇'
    }, {
      value: '460412',
      label: '王五镇'
    }, {
      value: '460413',
      label: '白马井镇'
    }, {
      value: '460414',
      label: '中和镇'
    }, {
      value: '460415',
      label: '排浦镇'
    }, {
      value: '460416',
      label: '东成镇'
    }, {
      value: '460417',
      label: '新州镇'
    }, {
      value: '460418',
      label: '国营西培农场'
    }, {
      value: '460419',
      label: '国营西联农场'
    }, {
      value: '460420',
      label: '国营蓝洋农场'
    }, {
      value: '460421',
      label: '国营八一农场'
    }, {
      value: '460422',
      label: '洋浦经济开发区'
    }, {
      value: '460423',
      label: '华南热作学院'
    }, {
      value: '460424',
      label: '红岭农场'
    }]
  }, {
    value: '469000',
    label: '省直辖县级行政区划',
    children: [{
      value: '469001',
      label: '五指山市'
    }, {
      value: '469002',
      label: '琼海市'
    }, {
      value: '469005',
      label: '文昌市'
    }, {
      value: '469006',
      label: '万宁市'
    }, {
      value: '469007',
      label: '东方市'
    }, {
      value: '469021',
      label: '定安县'
    }, {
      value: '469022',
      label: '屯昌县'
    }, {
      value: '469023',
      label: '澄迈县'
    }, {
      value: '469024',
      label: '临高县'
    }, {
      value: '469025',
      label: '白沙黎族自治县'
    }, {
      value: '469026',
      label: '昌江黎族自治县'
    }, {
      value: '469027',
      label: '乐东黎族自治县'
    }, {
      value: '469028',
      label: '陵水黎族自治县'
    }, {
      value: '469029',
      label: '保亭黎族苗族自治县'
    }, {
      value: '469030',
      label: '琼中黎族苗族自治县'
    }]
  }]
}, {
  value: '500000',
  label: '重庆市',
  children: [{
    value: '500100',
    label: '重庆市',
    children: [{
      value: '500101',
      label: '万州区'
    }, {
      value: '500102',
      label: '涪陵区'
    }, {
      value: '500103',
      label: '渝中区'
    }, {
      value: '500104',
      label: '大渡口区'
    }, {
      value: '500105',
      label: '江北区'
    }, {
      value: '500106',
      label: '沙坪坝区'
    }, {
      value: '500107',
      label: '九龙坡区'
    }, {
      value: '500108',
      label: '南岸区'
    }, {
      value: '500109',
      label: '北碚区'
    }, {
      value: '500110',
      label: '綦江区'
    }, {
      value: '500111',
      label: '大足区'
    }, {
      value: '500112',
      label: '渝北区'
    }, {
      value: '500113',
      label: '巴南区'
    }, {
      value: '500114',
      label: '黔江区'
    }, {
      value: '500115',
      label: '长寿区'
    }, {
      value: '500116',
      label: '江津区'
    }, {
      value: '500117',
      label: '合川区'
    }, {
      value: '500118',
      label: '永川区'
    }, {
      value: '500119',
      label: '南川区'
    }, {
      value: '500120',
      label: '璧山区'
    }, {
      value: '500151',
      label: '铜梁区'
    }, {
      value: '500152',
      label: '潼南区'
    }, {
      value: '500153',
      label: '荣昌区'
    }, {
      value: '500154',
      label: '开州区'
    }, {
      value: '500155',
      label: '梁平区'
    }, {
      value: '500156',
      label: '武隆区'
    }]
  }, {
    value: '500200',
    label: '县',
    children: [{
      value: '500229',
      label: '城口县'
    }, {
      value: '500230',
      label: '丰都县'
    }, {
      value: '500231',
      label: '垫江县'
    }, {
      value: '500233',
      label: '忠县'
    }, {
      value: '500235',
      label: '云阳县'
    }, {
      value: '500236',
      label: '奉节县'
    }, {
      value: '500237',
      label: '巫山县'
    }, {
      value: '500238',
      label: '巫溪县'
    }, {
      value: '500240',
      label: '石柱土家族自治县'
    }, {
      value: '500241',
      label: '秀山土家族苗族自治县'
    }, {
      value: '500242',
      label: '酉阳土家族苗族自治县'
    }, {
      value: '500243',
      label: '彭水苗族土家族自治县'
    }]
  }]
}, {
  value: '510000',
  label: '四川省',
  children: [{
    value: '510100',
    label: '成都市',
    children: [{
      value: '510104',
      label: '锦江区'
    }, {
      value: '510105',
      label: '青羊区'
    }, {
      value: '510106',
      label: '金牛区'
    }, {
      value: '510107',
      label: '武侯区'
    }, {
      value: '510108',
      label: '成华区'
    }, {
      value: '510112',
      label: '龙泉驿区'
    }, {
      value: '510113',
      label: '青白江区'
    }, {
      value: '510114',
      label: '新都区'
    }, {
      value: '510115',
      label: '温江区'
    }, {
      value: '510116',
      label: '双流区'
    }, {
      value: '510117',
      label: '郫都区'
    }, {
      value: '510121',
      label: '金堂县'
    }, {
      value: '510129',
      label: '大邑县'
    }, {
      value: '510131',
      label: '蒲江县'
    }, {
      value: '510132',
      label: '新津县'
    }, {
      value: '510181',
      label: '都江堰市'
    }, {
      value: '510182',
      label: '彭州市'
    }, {
      value: '510183',
      label: '邛崃市'
    }, {
      value: '510184',
      label: '崇州市'
    }, {
      value: '510185',
      label: '简阳市'
    }]
  }, {
    value: '510300',
    label: '自贡市',
    children: [{
      value: '510302',
      label: '自流井区'
    }, {
      value: '510303',
      label: '贡井区'
    }, {
      value: '510304',
      label: '大安区'
    }, {
      value: '510311',
      label: '沿滩区'
    }, {
      value: '510321',
      label: '荣县'
    }, {
      value: '510322',
      label: '富顺县'
    }]
  }, {
    value: '510400',
    label: '攀枝花市',
    children: [{
      value: '510402',
      label: '东区'
    }, {
      value: '510403',
      label: '西区'
    }, {
      value: '510411',
      label: '仁和区'
    }, {
      value: '510421',
      label: '米易县'
    }, {
      value: '510422',
      label: '盐边县'
    }]
  }, {
    value: '510500',
    label: '泸州市',
    children: [{
      value: '510502',
      label: '江阳区'
    }, {
      value: '510503',
      label: '纳溪区'
    }, {
      value: '510504',
      label: '龙马潭区'
    }, {
      value: '510521',
      label: '泸县'
    }, {
      value: '510522',
      label: '合江县'
    }, {
      value: '510524',
      label: '叙永县'
    }, {
      value: '510525',
      label: '古蔺县'
    }]
  }, {
    value: '510600',
    label: '德阳市',
    children: [{
      value: '510603',
      label: '旌阳区'
    }, {
      value: '510604',
      label: '罗江区'
    }, {
      value: '510623',
      label: '中江县'
    }, {
      value: '510681',
      label: '广汉市'
    }, {
      value: '510682',
      label: '什邡市'
    }, {
      value: '510683',
      label: '绵竹市'
    }]
  }, {
    value: '510700',
    label: '绵阳市',
    children: [{
      value: '510703',
      label: '涪城区'
    }, {
      value: '510704',
      label: '游仙区'
    }, {
      value: '510705',
      label: '安州区'
    }, {
      value: '510722',
      label: '三台县'
    }, {
      value: '510723',
      label: '盐亭县'
    }, {
      value: '510725',
      label: '梓潼县'
    }, {
      value: '510726',
      label: '北川羌族自治县'
    }, {
      value: '510727',
      label: '平武县'
    }, {
      value: '510781',
      label: '江油市'
    }]
  }, {
    value: '510800',
    label: '广元市',
    children: [{
      value: '510802',
      label: '利州区'
    }, {
      value: '510811',
      label: '昭化区'
    }, {
      value: '510812',
      label: '朝天区'
    }, {
      value: '510821',
      label: '旺苍县'
    }, {
      value: '510822',
      label: '青川县'
    }, {
      value: '510823',
      label: '剑阁县'
    }, {
      value: '510824',
      label: '苍溪县'
    }]
  }, {
    value: '510900',
    label: '遂宁市',
    children: [{
      value: '510903',
      label: '船山区'
    }, {
      value: '510904',
      label: '安居区'
    }, {
      value: '510921',
      label: '蓬溪县'
    }, {
      value: '510922',
      label: '射洪县'
    }, {
      value: '510923',
      label: '大英县'
    }]
  }, {
    value: '511000',
    label: '内江市',
    children: [{
      value: '511002',
      label: '市中区'
    }, {
      value: '511011',
      label: '东兴区'
    }, {
      value: '511024',
      label: '威远县'
    }, {
      value: '511025',
      label: '资中县'
    }, {
      value: '511083',
      label: '隆昌市'
    }]
  }, {
    value: '511100',
    label: '乐山市',
    children: [{
      value: '511102',
      label: '市中区'
    }, {
      value: '511111',
      label: '沙湾区'
    }, {
      value: '511112',
      label: '五通桥区'
    }, {
      value: '511113',
      label: '金口河区'
    }, {
      value: '511123',
      label: '犍为县'
    }, {
      value: '511124',
      label: '井研县'
    }, {
      value: '511126',
      label: '夹江县'
    }, {
      value: '511129',
      label: '沐川县'
    }, {
      value: '511132',
      label: '峨边彝族自治县'
    }, {
      value: '511133',
      label: '马边彝族自治县'
    }, {
      value: '511181',
      label: '峨眉山市'
    }]
  }, {
    value: '511300',
    label: '南充市',
    children: [{
      value: '511302',
      label: '顺庆区'
    }, {
      value: '511303',
      label: '高坪区'
    }, {
      value: '511304',
      label: '嘉陵区'
    }, {
      value: '511321',
      label: '南部县'
    }, {
      value: '511322',
      label: '营山县'
    }, {
      value: '511323',
      label: '蓬安县'
    }, {
      value: '511324',
      label: '仪陇县'
    }, {
      value: '511325',
      label: '西充县'
    }, {
      value: '511381',
      label: '阆中市'
    }]
  }, {
    value: '511400',
    label: '眉山市',
    children: [{
      value: '511402',
      label: '东坡区'
    }, {
      value: '511403',
      label: '彭山区'
    }, {
      value: '511421',
      label: '仁寿县'
    }, {
      value: '511423',
      label: '洪雅县'
    }, {
      value: '511424',
      label: '丹棱县'
    }, {
      value: '511425',
      label: '青神县'
    }]
  }, {
    value: '511500',
    label: '宜宾市',
    children: [{
      value: '511502',
      label: '翠屏区'
    }, {
      value: '511503',
      label: '南溪区'
    }, {
      value: '511521',
      label: '宜宾县'
    }, {
      value: '511523',
      label: '江安县'
    }, {
      value: '511524',
      label: '长宁县'
    }, {
      value: '511525',
      label: '高县'
    }, {
      value: '511526',
      label: '珙县'
    }, {
      value: '511527',
      label: '筠连县'
    }, {
      value: '511528',
      label: '兴文县'
    }, {
      value: '511529',
      label: '屏山县'
    }]
  }, {
    value: '511600',
    label: '广安市',
    children: [{
      value: '511602',
      label: '广安区'
    }, {
      value: '511603',
      label: '前锋区'
    }, {
      value: '511621',
      label: '岳池县'
    }, {
      value: '511622',
      label: '武胜县'
    }, {
      value: '511623',
      label: '邻水县'
    }, {
      value: '511681',
      label: '华蓥市'
    }]
  }, {
    value: '511700',
    label: '达州市',
    children: [{
      value: '511702',
      label: '通川区'
    }, {
      value: '511703',
      label: '达川区'
    }, {
      value: '511722',
      label: '宣汉县'
    }, {
      value: '511723',
      label: '开江县'
    }, {
      value: '511724',
      label: '大竹县'
    }, {
      value: '511725',
      label: '渠县'
    }, {
      value: '511781',
      label: '万源市'
    }]
  }, {
    value: '511800',
    label: '雅安市',
    children: [{
      value: '511802',
      label: '雨城区'
    }, {
      value: '511803',
      label: '名山区'
    }, {
      value: '511822',
      label: '荥经县'
    }, {
      value: '511823',
      label: '汉源县'
    }, {
      value: '511824',
      label: '石棉县'
    }, {
      value: '511825',
      label: '天全县'
    }, {
      value: '511826',
      label: '芦山县'
    }, {
      value: '511827',
      label: '宝兴县'
    }]
  }, {
    value: '511900',
    label: '巴中市',
    children: [{
      value: '511902',
      label: '巴州区'
    }, {
      value: '511903',
      label: '恩阳区'
    }, {
      value: '511921',
      label: '通江县'
    }, {
      value: '511922',
      label: '南江县'
    }, {
      value: '511923',
      label: '平昌县'
    }]
  }, {
    value: '512000',
    label: '资阳市',
    children: [{
      value: '512002',
      label: '雁江区'
    }, {
      value: '512021',
      label: '安岳县'
    }, {
      value: '512022',
      label: '乐至县'
    }]
  }, {
    value: '513200',
    label: '阿坝藏族羌族自治州',
    children: [{
      value: '513201',
      label: '马尔康市'
    }, {
      value: '513221',
      label: '汶川县'
    }, {
      value: '513222',
      label: '理县'
    }, {
      value: '513223',
      label: '茂县'
    }, {
      value: '513224',
      label: '松潘县'
    }, {
      value: '513225',
      label: '九寨沟县'
    }, {
      value: '513226',
      label: '金川县'
    }, {
      value: '513227',
      label: '小金县'
    }, {
      value: '513228',
      label: '黑水县'
    }, {
      value: '513230',
      label: '壤塘县'
    }, {
      value: '513231',
      label: '阿坝县'
    }, {
      value: '513232',
      label: '若尔盖县'
    }, {
      value: '513233',
      label: '红原县'
    }]
  }, {
    value: '513300',
    label: '甘孜藏族自治州',
    children: [{
      value: '513301',
      label: '康定市'
    }, {
      value: '513322',
      label: '泸定县'
    }, {
      value: '513323',
      label: '丹巴县'
    }, {
      value: '513324',
      label: '九龙县'
    }, {
      value: '513325',
      label: '雅江县'
    }, {
      value: '513326',
      label: '道孚县'
    }, {
      value: '513327',
      label: '炉霍县'
    }, {
      value: '513328',
      label: '甘孜县'
    }, {
      value: '513329',
      label: '新龙县'
    }, {
      value: '513330',
      label: '德格县'
    }, {
      value: '513331',
      label: '白玉县'
    }, {
      value: '513332',
      label: '石渠县'
    }, {
      value: '513333',
      label: '色达县'
    }, {
      value: '513334',
      label: '理塘县'
    }, {
      value: '513335',
      label: '巴塘县'
    }, {
      value: '513336',
      label: '乡城县'
    }, {
      value: '513337',
      label: '稻城县'
    }, {
      value: '513338',
      label: '得荣县'
    }]
  }, {
    value: '513400',
    label: '凉山彝族自治州',
    children: [{
      value: '513401',
      label: '西昌市'
    }, {
      value: '513422',
      label: '木里藏族自治县'
    }, {
      value: '513423',
      label: '盐源县'
    }, {
      value: '513424',
      label: '德昌县'
    }, {
      value: '513425',
      label: '会理县'
    }, {
      value: '513426',
      label: '会东县'
    }, {
      value: '513427',
      label: '宁南县'
    }, {
      value: '513428',
      label: '普格县'
    }, {
      value: '513429',
      label: '布拖县'
    }, {
      value: '513430',
      label: '金阳县'
    }, {
      value: '513431',
      label: '昭觉县'
    }, {
      value: '513432',
      label: '喜德县'
    }, {
      value: '513433',
      label: '冕宁县'
    }, {
      value: '513434',
      label: '越西县'
    }, {
      value: '513435',
      label: '甘洛县'
    }, {
      value: '513436',
      label: '美姑县'
    }, {
      value: '513437',
      label: '雷波县'
    }]
  }]
}, {
  value: '520000',
  label: '贵州省',
  children: [{
    value: '520100',
    label: '贵阳市',
    children: [{
      value: '520102',
      label: '南明区'
    }, {
      value: '520103',
      label: '云岩区'
    }, {
      value: '520111',
      label: '花溪区'
    }, {
      value: '520112',
      label: '乌当区'
    }, {
      value: '520113',
      label: '白云区'
    }, {
      value: '520115',
      label: '观山湖区'
    }, {
      value: '520121',
      label: '开阳县'
    }, {
      value: '520122',
      label: '息烽县'
    }, {
      value: '520123',
      label: '修文县'
    }, {
      value: '520181',
      label: '清镇市'
    }]
  }, {
    value: '520200',
    label: '六盘水市',
    children: [{
      value: '520201',
      label: '钟山区'
    }, {
      value: '520203',
      label: '六枝特区'
    }, {
      value: '520221',
      label: '水城县'
    }, {
      value: '520281',
      label: '盘州市'
    }]
  }, {
    value: '520300',
    label: '遵义市',
    children: [{
      value: '520302',
      label: '红花岗区'
    }, {
      value: '520303',
      label: '汇川区'
    }, {
      value: '520304',
      label: '播州区'
    }, {
      value: '520322',
      label: '桐梓县'
    }, {
      value: '520323',
      label: '绥阳县'
    }, {
      value: '520324',
      label: '正安县'
    }, {
      value: '520325',
      label: '道真仡佬族苗族自治县'
    }, {
      value: '520326',
      label: '务川仡佬族苗族自治县'
    }, {
      value: '520327',
      label: '凤冈县'
    }, {
      value: '520328',
      label: '湄潭县'
    }, {
      value: '520329',
      label: '余庆县'
    }, {
      value: '520330',
      label: '习水县'
    }, {
      value: '520381',
      label: '赤水市'
    }, {
      value: '520382',
      label: '仁怀市'
    }]
  }, {
    value: '520400',
    label: '安顺市',
    children: [{
      value: '520402',
      label: '西秀区'
    }, {
      value: '520403',
      label: '平坝区'
    }, {
      value: '520422',
      label: '普定县'
    }, {
      value: '520423',
      label: '镇宁布依族苗族自治县'
    }, {
      value: '520424',
      label: '关岭布依族苗族自治县'
    }, {
      value: '520425',
      label: '紫云苗族布依族自治县'
    }]
  }, {
    value: '520500',
    label: '毕节市',
    children: [{
      value: '520502',
      label: '七星关区'
    }, {
      value: '520521',
      label: '大方县'
    }, {
      value: '520522',
      label: '黔西县'
    }, {
      value: '520523',
      label: '金沙县'
    }, {
      value: '520524',
      label: '织金县'
    }, {
      value: '520525',
      label: '纳雍县'
    }, {
      value: '520526',
      label: '威宁彝族回族苗族自治县'
    }, {
      value: '520527',
      label: '赫章县'
    }]
  }, {
    value: '520600',
    label: '铜仁市',
    children: [{
      value: '520602',
      label: '碧江区'
    }, {
      value: '520603',
      label: '万山区'
    }, {
      value: '520621',
      label: '江口县'
    }, {
      value: '520622',
      label: '玉屏侗族自治县'
    }, {
      value: '520623',
      label: '石阡县'
    }, {
      value: '520624',
      label: '思南县'
    }, {
      value: '520625',
      label: '印江土家族苗族自治县'
    }, {
      value: '520626',
      label: '德江县'
    }, {
      value: '520627',
      label: '沿河土家族自治县'
    }, {
      value: '520628',
      label: '松桃苗族自治县'
    }]
  }, {
    value: '522300',
    label: '黔西南布依族苗族自治州',
    children: [{
      value: '522301',
      label: '兴义市'
    }, {
      value: '522322',
      label: '兴仁县'
    }, {
      value: '522323',
      label: '普安县'
    }, {
      value: '522324',
      label: '晴隆县'
    }, {
      value: '522325',
      label: '贞丰县'
    }, {
      value: '522326',
      label: '望谟县'
    }, {
      value: '522327',
      label: '册亨县'
    }, {
      value: '522328',
      label: '安龙县'
    }]
  }, {
    value: '522600',
    label: '黔东南苗族侗族自治州',
    children: [{
      value: '522601',
      label: '凯里市'
    }, {
      value: '522622',
      label: '黄平县'
    }, {
      value: '522623',
      label: '施秉县'
    }, {
      value: '522624',
      label: '三穗县'
    }, {
      value: '522625',
      label: '镇远县'
    }, {
      value: '522626',
      label: '岑巩县'
    }, {
      value: '522627',
      label: '天柱县'
    }, {
      value: '522628',
      label: '锦屏县'
    }, {
      value: '522629',
      label: '剑河县'
    }, {
      value: '522630',
      label: '台江县'
    }, {
      value: '522631',
      label: '黎平县'
    }, {
      value: '522632',
      label: '榕江县'
    }, {
      value: '522633',
      label: '从江县'
    }, {
      value: '522634',
      label: '雷山县'
    }, {
      value: '522635',
      label: '麻江县'
    }, {
      value: '522636',
      label: '丹寨县'
    }]
  }, {
    value: '522700',
    label: '黔南布依族苗族自治州',
    children: [{
      value: '522701',
      label: '都匀市'
    }, {
      value: '522702',
      label: '福泉市'
    }, {
      value: '522722',
      label: '荔波县'
    }, {
      value: '522723',
      label: '贵定县'
    }, {
      value: '522725',
      label: '瓮安县'
    }, {
      value: '522726',
      label: '独山县'
    }, {
      value: '522727',
      label: '平塘县'
    }, {
      value: '522728',
      label: '罗甸县'
    }, {
      value: '522729',
      label: '长顺县'
    }, {
      value: '522730',
      label: '龙里县'
    }, {
      value: '522731',
      label: '惠水县'
    }, {
      value: '522732',
      label: '三都水族自治县'
    }]
  }]
}, {
  value: '530000',
  label: '云南省',
  children: [{
    value: '530100',
    label: '昆明市',
    children: [{
      value: '530102',
      label: '五华区'
    }, {
      value: '530103',
      label: '盘龙区'
    }, {
      value: '530111',
      label: '官渡区'
    }, {
      value: '530112',
      label: '西山区'
    }, {
      value: '530113',
      label: '东川区'
    }, {
      value: '530114',
      label: '呈贡区'
    }, {
      value: '530115',
      label: '晋宁区'
    }, {
      value: '530124',
      label: '富民县'
    }, {
      value: '530125',
      label: '宜良县'
    }, {
      value: '530126',
      label: '石林彝族自治县'
    }, {
      value: '530127',
      label: '嵩明县'
    }, {
      value: '530128',
      label: '禄劝彝族苗族自治县'
    }, {
      value: '530129',
      label: '寻甸回族彝族自治县'
    }, {
      value: '530181',
      label: '安宁市'
    }]
  }, {
    value: '530300',
    label: '曲靖市',
    children: [{
      value: '530302',
      label: '麒麟区'
    }, {
      value: '530303',
      label: '沾益区'
    }, {
      value: '530321',
      label: '马龙县'
    }, {
      value: '530322',
      label: '陆良县'
    }, {
      value: '530323',
      label: '师宗县'
    }, {
      value: '530324',
      label: '罗平县'
    }, {
      value: '530325',
      label: '富源县'
    }, {
      value: '530326',
      label: '会泽县'
    }, {
      value: '530381',
      label: '宣威市'
    }]
  }, {
    value: '530400',
    label: '玉溪市',
    children: [{
      value: '530402',
      label: '红塔区'
    }, {
      value: '530403',
      label: '江川区'
    }, {
      value: '530422',
      label: '澄江县'
    }, {
      value: '530423',
      label: '通海县'
    }, {
      value: '530424',
      label: '华宁县'
    }, {
      value: '530425',
      label: '易门县'
    }, {
      value: '530426',
      label: '峨山彝族自治县'
    }, {
      value: '530427',
      label: '新平彝族傣族自治县'
    }, {
      value: '530428',
      label: '元江哈尼族彝族傣族自治县'
    }]
  }, {
    value: '530500',
    label: '保山市',
    children: [{
      value: '530502',
      label: '隆阳区'
    }, {
      value: '530521',
      label: '施甸县'
    }, {
      value: '530523',
      label: '龙陵县'
    }, {
      value: '530524',
      label: '昌宁县'
    }, {
      value: '530581',
      label: '腾冲市'
    }]
  }, {
    value: '530600',
    label: '昭通市',
    children: [{
      value: '530602',
      label: '昭阳区'
    }, {
      value: '530621',
      label: '鲁甸县'
    }, {
      value: '530622',
      label: '巧家县'
    }, {
      value: '530623',
      label: '盐津县'
    }, {
      value: '530624',
      label: '大关县'
    }, {
      value: '530625',
      label: '永善县'
    }, {
      value: '530626',
      label: '绥江县'
    }, {
      value: '530627',
      label: '镇雄县'
    }, {
      value: '530628',
      label: '彝良县'
    }, {
      value: '530629',
      label: '威信县'
    }, {
      value: '530630',
      label: '水富县'
    }]
  }, {
    value: '530700',
    label: '丽江市',
    children: [{
      value: '530702',
      label: '古城区'
    }, {
      value: '530721',
      label: '玉龙纳西族自治县'
    }, {
      value: '530722',
      label: '永胜县'
    }, {
      value: '530723',
      label: '华坪县'
    }, {
      value: '530724',
      label: '宁蒗彝族自治县'
    }]
  }, {
    value: '530800',
    label: '普洱市',
    children: [{
      value: '530802',
      label: '思茅区'
    }, {
      value: '530821',
      label: '宁洱哈尼族彝族自治县'
    }, {
      value: '530822',
      label: '墨江哈尼族自治县'
    }, {
      value: '530823',
      label: '景东彝族自治县'
    }, {
      value: '530824',
      label: '景谷傣族彝族自治县'
    }, {
      value: '530825',
      label: '镇沅彝族哈尼族拉祜族自治县'
    }, {
      value: '530826',
      label: '江城哈尼族彝族自治县'
    }, {
      value: '530827',
      label: '孟连傣族拉祜族佤族自治县'
    }, {
      value: '530828',
      label: '澜沧拉祜族自治县'
    }, {
      value: '530829',
      label: '西盟佤族自治县'
    }]
  }, {
    value: '530900',
    label: '临沧市',
    children: [{
      value: '530902',
      label: '临翔区'
    }, {
      value: '530921',
      label: '凤庆县'
    }, {
      value: '530922',
      label: '云县'
    }, {
      value: '530923',
      label: '永德县'
    }, {
      value: '530924',
      label: '镇康县'
    }, {
      value: '530925',
      label: '双江拉祜族佤族布朗族傣族自治县'
    }, {
      value: '530926',
      label: '耿马傣族佤族自治县'
    }, {
      value: '530927',
      label: '沧源佤族自治县'
    }]
  }, {
    value: '532300',
    label: '楚雄彝族自治州',
    children: [{
      value: '532301',
      label: '楚雄市'
    }, {
      value: '532322',
      label: '双柏县'
    }, {
      value: '532323',
      label: '牟定县'
    }, {
      value: '532324',
      label: '南华县'
    }, {
      value: '532325',
      label: '姚安县'
    }, {
      value: '532326',
      label: '大姚县'
    }, {
      value: '532327',
      label: '永仁县'
    }, {
      value: '532328',
      label: '元谋县'
    }, {
      value: '532329',
      label: '武定县'
    }, {
      value: '532331',
      label: '禄丰县'
    }]
  }, {
    value: '532500',
    label: '红河哈尼族彝族自治州',
    children: [{
      value: '532501',
      label: '个旧市'
    }, {
      value: '532502',
      label: '开远市'
    }, {
      value: '532503',
      label: '蒙自市'
    }, {
      value: '532504',
      label: '弥勒市'
    }, {
      value: '532523',
      label: '屏边苗族自治县'
    }, {
      value: '532524',
      label: '建水县'
    }, {
      value: '532525',
      label: '石屏县'
    }, {
      value: '532527',
      label: '泸西县'
    }, {
      value: '532528',
      label: '元阳县'
    }, {
      value: '532529',
      label: '红河县'
    }, {
      value: '532530',
      label: '金平苗族瑶族傣族自治县'
    }, {
      value: '532531',
      label: '绿春县'
    }, {
      value: '532532',
      label: '河口瑶族自治县'
    }]
  }, {
    value: '532600',
    label: '文山壮族苗族自治州',
    children: [{
      value: '532601',
      label: '文山市'
    }, {
      value: '532622',
      label: '砚山县'
    }, {
      value: '532623',
      label: '西畴县'
    }, {
      value: '532624',
      label: '麻栗坡县'
    }, {
      value: '532625',
      label: '马关县'
    }, {
      value: '532626',
      label: '丘北县'
    }, {
      value: '532627',
      label: '广南县'
    }, {
      value: '532628',
      label: '富宁县'
    }]
  }, {
    value: '532800',
    label: '西双版纳傣族自治州',
    children: [{
      value: '532801',
      label: '景洪市'
    }, {
      value: '532822',
      label: '勐海县'
    }, {
      value: '532823',
      label: '勐腊县'
    }]
  }, {
    value: '532900',
    label: '大理白族自治州',
    children: [{
      value: '532901',
      label: '大理市'
    }, {
      value: '532922',
      label: '漾濞彝族自治县'
    }, {
      value: '532923',
      label: '祥云县'
    }, {
      value: '532924',
      label: '宾川县'
    }, {
      value: '532925',
      label: '弥渡县'
    }, {
      value: '532926',
      label: '南涧彝族自治县'
    }, {
      value: '532927',
      label: '巍山彝族回族自治县'
    }, {
      value: '532928',
      label: '永平县'
    }, {
      value: '532929',
      label: '云龙县'
    }, {
      value: '532930',
      label: '洱源县'
    }, {
      value: '532931',
      label: '剑川县'
    }, {
      value: '532932',
      label: '鹤庆县'
    }]
  }, {
    value: '533100',
    label: '德宏傣族景颇族自治州',
    children: [{
      value: '533102',
      label: '瑞丽市'
    }, {
      value: '533103',
      label: '芒市'
    }, {
      value: '533122',
      label: '梁河县'
    }, {
      value: '533123',
      label: '盈江县'
    }, {
      value: '533124',
      label: '陇川县'
    }]
  }, {
    value: '533300',
    label: '怒江傈僳族自治州',
    children: [{
      value: '533301',
      label: '泸水市'
    }, {
      value: '533323',
      label: '福贡县'
    }, {
      value: '533324',
      label: '贡山独龙族怒族自治县'
    }, {
      value: '533325',
      label: '兰坪白族普米族自治县'
    }]
  }, {
    value: '533400',
    label: '迪庆藏族自治州',
    children: [{
      value: '533401',
      label: '香格里拉市'
    }, {
      value: '533422',
      label: '德钦县'
    }, {
      value: '533423',
      label: '维西傈僳族自治县'
    }]
  }]
}, {
  value: '540000',
  label: '西藏自治区',
  children: [{
    value: '540100',
    label: '拉萨市',
    children: [{
      value: '540102',
      label: '城关区'
    }, {
      value: '540103',
      label: '堆龙德庆区'
    }, {
      value: '540104',
      label: '达孜区'
    }, {
      value: '540121',
      label: '林周县'
    }, {
      value: '540122',
      label: '当雄县'
    }, {
      value: '540123',
      label: '尼木县'
    }, {
      value: '540124',
      label: '曲水县'
    }, {
      value: '540127',
      label: '墨竹工卡县'
    }]
  }, {
    value: '540200',
    label: '日喀则市',
    children: [{
      value: '540202',
      label: '桑珠孜区'
    }, {
      value: '540221',
      label: '南木林县'
    }, {
      value: '540222',
      label: '江孜县'
    }, {
      value: '540223',
      label: '定日县'
    }, {
      value: '540224',
      label: '萨迦县'
    }, {
      value: '540225',
      label: '拉孜县'
    }, {
      value: '540226',
      label: '昂仁县'
    }, {
      value: '540227',
      label: '谢通门县'
    }, {
      value: '540228',
      label: '白朗县'
    }, {
      value: '540229',
      label: '仁布县'
    }, {
      value: '540230',
      label: '康马县'
    }, {
      value: '540231',
      label: '定结县'
    }, {
      value: '540232',
      label: '仲巴县'
    }, {
      value: '540233',
      label: '亚东县'
    }, {
      value: '540234',
      label: '吉隆县'
    }, {
      value: '540235',
      label: '聂拉木县'
    }, {
      value: '540236',
      label: '萨嘎县'
    }, {
      value: '540237',
      label: '岗巴县'
    }]
  }, {
    value: '540300',
    label: '昌都市',
    children: [{
      value: '540302',
      label: '卡若区'
    }, {
      value: '540321',
      label: '江达县'
    }, {
      value: '540322',
      label: '贡觉县'
    }, {
      value: '540323',
      label: '类乌齐县'
    }, {
      value: '540324',
      label: '丁青县'
    }, {
      value: '540325',
      label: '察雅县'
    }, {
      value: '540326',
      label: '八宿县'
    }, {
      value: '540327',
      label: '左贡县'
    }, {
      value: '540328',
      label: '芒康县'
    }, {
      value: '540329',
      label: '洛隆县'
    }, {
      value: '540330',
      label: '边坝县'
    }]
  }, {
    value: '540400',
    label: '林芝市',
    children: [{
      value: '540402',
      label: '巴宜区'
    }, {
      value: '540421',
      label: '工布江达县'
    }, {
      value: '540422',
      label: '米林县'
    }, {
      value: '540423',
      label: '墨脱县'
    }, {
      value: '540424',
      label: '波密县'
    }, {
      value: '540425',
      label: '察隅县'
    }, {
      value: '540426',
      label: '朗县'
    }]
  }, {
    value: '540500',
    label: '山南市',
    children: [{
      value: '540502',
      label: '乃东区'
    }, {
      value: '540521',
      label: '扎囊县'
    }, {
      value: '540522',
      label: '贡嘎县'
    }, {
      value: '540523',
      label: '桑日县'
    }, {
      value: '540524',
      label: '琼结县'
    }, {
      value: '540525',
      label: '曲松县'
    }, {
      value: '540526',
      label: '措美县'
    }, {
      value: '540527',
      label: '洛扎县'
    }, {
      value: '540528',
      label: '加查县'
    }, {
      value: '540529',
      label: '隆子县'
    }, {
      value: '540530',
      label: '错那县'
    }, {
      value: '540531',
      label: '浪卡子县'
    }]
  }, {
    value: '542400',
    label: '那曲地区',
    children: [{
      value: '542421',
      label: '那曲县'
    }, {
      value: '542422',
      label: '嘉黎县'
    }, {
      value: '542423',
      label: '比如县'
    }, {
      value: '542424',
      label: '聂荣县'
    }, {
      value: '542425',
      label: '安多县'
    }, {
      value: '542426',
      label: '申扎县'
    }, {
      value: '542427',
      label: '索县'
    }, {
      value: '542428',
      label: '班戈县'
    }, {
      value: '542429',
      label: '巴青县'
    }, {
      value: '542430',
      label: '尼玛县'
    }, {
      value: '542431',
      label: '双湖县'
    }]
  }, {
    value: '542500',
    label: '阿里地区',
    children: [{
      value: '542521',
      label: '普兰县'
    }, {
      value: '542522',
      label: '札达县'
    }, {
      value: '542523',
      label: '噶尔县'
    }, {
      value: '542524',
      label: '日土县'
    }, {
      value: '542525',
      label: '革吉县'
    }, {
      value: '542526',
      label: '改则县'
    }, {
      value: '542527',
      label: '措勤县'
    }]
  }]
}, {
  value: '610000',
  label: '陕西省',
  children: [{
    value: '610100',
    label: '西安市',
    children: [{
      value: '610102',
      label: '新城区'
    }, {
      value: '610103',
      label: '碑林区'
    }, {
      value: '610104',
      label: '莲湖区'
    }, {
      value: '610111',
      label: '灞桥区'
    }, {
      value: '610112',
      label: '未央区'
    }, {
      value: '610113',
      label: '雁塔区'
    }, {
      value: '610114',
      label: '阎良区'
    }, {
      value: '610115',
      label: '临潼区'
    }, {
      value: '610116',
      label: '长安区'
    }, {
      value: '610117',
      label: '高陵区'
    }, {
      value: '610118',
      label: '鄠邑区'
    }, {
      value: '610122',
      label: '蓝田县'
    }, {
      value: '610124',
      label: '周至县'
    }]
  }, {
    value: '610200',
    label: '铜川市',
    children: [{
      value: '610202',
      label: '王益区'
    }, {
      value: '610203',
      label: '印台区'
    }, {
      value: '610204',
      label: '耀州区'
    }, {
      value: '610222',
      label: '宜君县'
    }]
  }, {
    value: '610300',
    label: '宝鸡市',
    children: [{
      value: '610302',
      label: '渭滨区'
    }, {
      value: '610303',
      label: '金台区'
    }, {
      value: '610304',
      label: '陈仓区'
    }, {
      value: '610322',
      label: '凤翔县'
    }, {
      value: '610323',
      label: '岐山县'
    }, {
      value: '610324',
      label: '扶风县'
    }, {
      value: '610326',
      label: '眉县'
    }, {
      value: '610327',
      label: '陇县'
    }, {
      value: '610328',
      label: '千阳县'
    }, {
      value: '610329',
      label: '麟游县'
    }, {
      value: '610330',
      label: '凤县'
    }, {
      value: '610331',
      label: '太白县'
    }]
  }, {
    value: '610400',
    label: '咸阳市',
    children: [{
      value: '610402',
      label: '秦都区'
    }, {
      value: '610403',
      label: '杨陵区'
    }, {
      value: '610404',
      label: '渭城区'
    }, {
      value: '610422',
      label: '三原县'
    }, {
      value: '610423',
      label: '泾阳县'
    }, {
      value: '610424',
      label: '乾县'
    }, {
      value: '610425',
      label: '礼泉县'
    }, {
      value: '610426',
      label: '永寿县'
    }, {
      value: '610427',
      label: '彬州市'
    }, {
      value: '610428',
      label: '长武县'
    }, {
      value: '610429',
      label: '旬邑县'
    }, {
      value: '610430',
      label: '淳化县'
    }, {
      value: '610431',
      label: '武功县'
    }, {
      value: '610481',
      label: '兴平市'
    }]
  }, {
    value: '610500',
    label: '渭南市',
    children: [{
      value: '610502',
      label: '临渭区'
    }, {
      value: '610503',
      label: '华州区'
    }, {
      value: '610522',
      label: '潼关县'
    }, {
      value: '610523',
      label: '大荔县'
    }, {
      value: '610524',
      label: '合阳县'
    }, {
      value: '610525',
      label: '澄城县'
    }, {
      value: '610526',
      label: '蒲城县'
    }, {
      value: '610527',
      label: '白水县'
    }, {
      value: '610528',
      label: '富平县'
    }, {
      value: '610581',
      label: '韩城市'
    }, {
      value: '610582',
      label: '华阴市'
    }]
  }, {
    value: '610600',
    label: '延安市',
    children: [{
      value: '610602',
      label: '宝塔区'
    }, {
      value: '610603',
      label: '安塞区'
    }, {
      value: '610621',
      label: '延长县'
    }, {
      value: '610622',
      label: '延川县'
    }, {
      value: '610623',
      label: '子长县'
    }, {
      value: '610625',
      label: '志丹县'
    }, {
      value: '610626',
      label: '吴起县'
    }, {
      value: '610627',
      label: '甘泉县'
    }, {
      value: '610628',
      label: '富县'
    }, {
      value: '610629',
      label: '洛川县'
    }, {
      value: '610630',
      label: '宜川县'
    }, {
      value: '610631',
      label: '黄龙县'
    }, {
      value: '610632',
      label: '黄陵县'
    }]
  }, {
    value: '610700',
    label: '汉中市',
    children: [{
      value: '610702',
      label: '汉台区'
    }, {
      value: '610703',
      label: '南郑区'
    }, {
      value: '610722',
      label: '城固县'
    }, {
      value: '610723',
      label: '洋县'
    }, {
      value: '610724',
      label: '西乡县'
    }, {
      value: '610725',
      label: '勉县'
    }, {
      value: '610726',
      label: '宁强县'
    }, {
      value: '610727',
      label: '略阳县'
    }, {
      value: '610728',
      label: '镇巴县'
    }, {
      value: '610729',
      label: '留坝县'
    }, {
      value: '610730',
      label: '佛坪县'
    }]
  }, {
    value: '610800',
    label: '榆林市',
    children: [{
      value: '610802',
      label: '榆阳区'
    }, {
      value: '610803',
      label: '横山区'
    }, {
      value: '610822',
      label: '府谷县'
    }, {
      value: '610824',
      label: '靖边县'
    }, {
      value: '610825',
      label: '定边县'
    }, {
      value: '610826',
      label: '绥德县'
    }, {
      value: '610827',
      label: '米脂县'
    }, {
      value: '610828',
      label: '佳县'
    }, {
      value: '610829',
      label: '吴堡县'
    }, {
      value: '610830',
      label: '清涧县'
    }, {
      value: '610831',
      label: '子洲县'
    }, {
      value: '610881',
      label: '神木市'
    }]
  }, {
    value: '610900',
    label: '安康市',
    children: [{
      value: '610902',
      label: '汉滨区'
    }, {
      value: '610921',
      label: '汉阴县'
    }, {
      value: '610922',
      label: '石泉县'
    }, {
      value: '610923',
      label: '宁陕县'
    }, {
      value: '610924',
      label: '紫阳县'
    }, {
      value: '610925',
      label: '岚皋县'
    }, {
      value: '610926',
      label: '平利县'
    }, {
      value: '610927',
      label: '镇坪县'
    }, {
      value: '610928',
      label: '旬阳县'
    }, {
      value: '610929',
      label: '白河县'
    }]
  }, {
    value: '611000',
    label: '商洛市',
    children: [{
      value: '611002',
      label: '商州区'
    }, {
      value: '611021',
      label: '洛南县'
    }, {
      value: '611022',
      label: '丹凤县'
    }, {
      value: '611023',
      label: '商南县'
    }, {
      value: '611024',
      label: '山阳县'
    }, {
      value: '611025',
      label: '镇安县'
    }, {
      value: '611026',
      label: '柞水县'
    }]
  }]
}, {
  value: '620000',
  label: '甘肃省',
  children: [{
    value: '620100',
    label: '兰州市',
    children: [{
      value: '620102',
      label: '城关区'
    }, {
      value: '620103',
      label: '七里河区'
    }, {
      value: '620104',
      label: '西固区'
    }, {
      value: '620105',
      label: '安宁区'
    }, {
      value: '620111',
      label: '红古区'
    }, {
      value: '620121',
      label: '永登县'
    }, {
      value: '620122',
      label: '皋兰县'
    }, {
      value: '620123',
      label: '榆中县'
    }]
  }, {
    value: '620200',
    label: '嘉峪关市',
    children: [{
      value: '620201',
      label: '雄关区'
    }, {
      value: '620202',
      label: '镜铁区'
    }, {
      value: '620203',
      label: '长城区'
    }]
  }, {
    value: '620300',
    label: '金昌市',
    children: [{
      value: '620302',
      label: '金川区'
    }, {
      value: '620321',
      label: '永昌县'
    }]
  }, {
    value: '620400',
    label: '白银市',
    children: [{
      value: '620402',
      label: '白银区'
    }, {
      value: '620403',
      label: '平川区'
    }, {
      value: '620421',
      label: '靖远县'
    }, {
      value: '620422',
      label: '会宁县'
    }, {
      value: '620423',
      label: '景泰县'
    }]
  }, {
    value: '620500',
    label: '天水市',
    children: [{
      value: '620502',
      label: '秦州区'
    }, {
      value: '620503',
      label: '麦积区'
    }, {
      value: '620521',
      label: '清水县'
    }, {
      value: '620522',
      label: '秦安县'
    }, {
      value: '620523',
      label: '甘谷县'
    }, {
      value: '620524',
      label: '武山县'
    }, {
      value: '620525',
      label: '张家川回族自治县'
    }]
  }, {
    value: '620600',
    label: '武威市',
    children: [{
      value: '620602',
      label: '凉州区'
    }, {
      value: '620621',
      label: '民勤县'
    }, {
      value: '620622',
      label: '古浪县'
    }, {
      value: '620623',
      label: '天祝藏族自治县'
    }]
  }, {
    value: '620700',
    label: '张掖市',
    children: [{
      value: '620702',
      label: '甘州区'
    }, {
      value: '620721',
      label: '肃南裕固族自治县'
    }, {
      value: '620722',
      label: '民乐县'
    }, {
      value: '620723',
      label: '临泽县'
    }, {
      value: '620724',
      label: '高台县'
    }, {
      value: '620725',
      label: '山丹县'
    }]
  }, {
    value: '620800',
    label: '平凉市',
    children: [{
      value: '620802',
      label: '崆峒区'
    }, {
      value: '620821',
      label: '泾川县'
    }, {
      value: '620822',
      label: '灵台县'
    }, {
      value: '620823',
      label: '崇信县'
    }, {
      value: '620824',
      label: '华亭县'
    }, {
      value: '620825',
      label: '庄浪县'
    }, {
      value: '620826',
      label: '静宁县'
    }]
  }, {
    value: '620900',
    label: '酒泉市',
    children: [{
      value: '620902',
      label: '肃州区'
    }, {
      value: '620921',
      label: '金塔县'
    }, {
      value: '620922',
      label: '瓜州县'
    }, {
      value: '620923',
      label: '肃北蒙古族自治县'
    }, {
      value: '620924',
      label: '阿克塞哈萨克族自治县'
    }, {
      value: '620981',
      label: '玉门市'
    }, {
      value: '620982',
      label: '敦煌市'
    }]
  }, {
    value: '621000',
    label: '庆阳市',
    children: [{
      value: '621002',
      label: '西峰区'
    }, {
      value: '621021',
      label: '庆城县'
    }, {
      value: '621022',
      label: '环县'
    }, {
      value: '621023',
      label: '华池县'
    }, {
      value: '621024',
      label: '合水县'
    }, {
      value: '621025',
      label: '正宁县'
    }, {
      value: '621026',
      label: '宁县'
    }, {
      value: '621027',
      label: '镇原县'
    }]
  }, {
    value: '621100',
    label: '定西市',
    children: [{
      value: '621102',
      label: '安定区'
    }, {
      value: '621121',
      label: '通渭县'
    }, {
      value: '621122',
      label: '陇西县'
    }, {
      value: '621123',
      label: '渭源县'
    }, {
      value: '621124',
      label: '临洮县'
    }, {
      value: '621125',
      label: '漳县'
    }, {
      value: '621126',
      label: '岷县'
    }]
  }, {
    value: '621200',
    label: '陇南市',
    children: [{
      value: '621202',
      label: '武都区'
    }, {
      value: '621221',
      label: '成县'
    }, {
      value: '621222',
      label: '文县'
    }, {
      value: '621223',
      label: '宕昌县'
    }, {
      value: '621224',
      label: '康县'
    }, {
      value: '621225',
      label: '西和县'
    }, {
      value: '621226',
      label: '礼县'
    }, {
      value: '621227',
      label: '徽县'
    }, {
      value: '621228',
      label: '两当县'
    }]
  }, {
    value: '622900',
    label: '临夏回族自治州',
    children: [{
      value: '622901',
      label: '临夏市'
    }, {
      value: '622921',
      label: '临夏县'
    }, {
      value: '622922',
      label: '康乐县'
    }, {
      value: '622923',
      label: '永靖县'
    }, {
      value: '622924',
      label: '广河县'
    }, {
      value: '622925',
      label: '和政县'
    }, {
      value: '622926',
      label: '东乡族自治县'
    }, {
      value: '622927',
      label: '积石山保安族东乡族撒拉族自治县'
    }]
  }, {
    value: '623000',
    label: '甘南藏族自治州',
    children: [{
      value: '623001',
      label: '合作市'
    }, {
      value: '623021',
      label: '临潭县'
    }, {
      value: '623022',
      label: '卓尼县'
    }, {
      value: '623023',
      label: '舟曲县'
    }, {
      value: '623024',
      label: '迭部县'
    }, {
      value: '623025',
      label: '玛曲县'
    }, {
      value: '623026',
      label: '碌曲县'
    }, {
      value: '623027',
      label: '夏河县'
    }]
  }]
}, {
  value: '630000',
  label: '青海省',
  children: [{
    value: '630100',
    label: '西宁市',
    children: [{
      value: '630102',
      label: '城东区'
    }, {
      value: '630103',
      label: '城中区'
    }, {
      value: '630104',
      label: '城西区'
    }, {
      value: '630105',
      label: '城北区'
    }, {
      value: '630121',
      label: '大通回族土族自治县'
    }, {
      value: '630122',
      label: '湟中县'
    }, {
      value: '630123',
      label: '湟源县'
    }]
  }, {
    value: '630200',
    label: '海东市',
    children: [{
      value: '630202',
      label: '乐都区'
    }, {
      value: '630203',
      label: '平安区'
    }, {
      value: '630222',
      label: '民和回族土族自治县'
    }, {
      value: '630223',
      label: '互助土族自治县'
    }, {
      value: '630224',
      label: '化隆回族自治县'
    }, {
      value: '630225',
      label: '循化撒拉族自治县'
    }]
  }, {
    value: '632200',
    label: '海北藏族自治州',
    children: [{
      value: '632221',
      label: '门源回族自治县'
    }, {
      value: '632222',
      label: '祁连县'
    }, {
      value: '632223',
      label: '海晏县'
    }, {
      value: '632224',
      label: '刚察县'
    }]
  }, {
    value: '632300',
    label: '黄南藏族自治州',
    children: [{
      value: '632321',
      label: '同仁县'
    }, {
      value: '632322',
      label: '尖扎县'
    }, {
      value: '632323',
      label: '泽库县'
    }, {
      value: '632324',
      label: '河南蒙古族自治县'
    }]
  }, {
    value: '632500',
    label: '海南藏族自治州',
    children: [{
      value: '632521',
      label: '共和县'
    }, {
      value: '632522',
      label: '同德县'
    }, {
      value: '632523',
      label: '贵德县'
    }, {
      value: '632524',
      label: '兴海县'
    }, {
      value: '632525',
      label: '贵南县'
    }]
  }, {
    value: '632600',
    label: '果洛藏族自治州',
    children: [{
      value: '632621',
      label: '玛沁县'
    }, {
      value: '632622',
      label: '班玛县'
    }, {
      value: '632623',
      label: '甘德县'
    }, {
      value: '632624',
      label: '达日县'
    }, {
      value: '632625',
      label: '久治县'
    }, {
      value: '632626',
      label: '玛多县'
    }]
  }, {
    value: '632700',
    label: '玉树藏族自治州',
    children: [{
      value: '632701',
      label: '玉树市'
    }, {
      value: '632722',
      label: '杂多县'
    }, {
      value: '632723',
      label: '称多县'
    }, {
      value: '632724',
      label: '治多县'
    }, {
      value: '632725',
      label: '囊谦县'
    }, {
      value: '632726',
      label: '曲麻莱县'
    }]
  }, {
    value: '632800',
    label: '海西蒙古族藏族自治州',
    children: [{
      value: '632801',
      label: '格尔木市'
    }, {
      value: '632802',
      label: '德令哈市'
    }, {
      value: '632821',
      label: '乌兰县'
    }, {
      value: '632822',
      label: '都兰县'
    }, {
      value: '632823',
      label: '天峻县'
    }, {
      value: '632824',
      label: '冷湖行政委员会'
    }, {
      value: '632825',
      label: '大柴旦行政委员会'
    }, {
      value: '632826',
      label: '茫崖行政委员会'
    }]
  }]
}, {
  value: '640000',
  label: '宁夏回族自治区',
  children: [{
    value: '640100',
    label: '银川市',
    children: [{
      value: '640104',
      label: '兴庆区'
    }, {
      value: '640105',
      label: '西夏区'
    }, {
      value: '640106',
      label: '金凤区'
    }, {
      value: '640121',
      label: '永宁县'
    }, {
      value: '640122',
      label: '贺兰县'
    }, {
      value: '640181',
      label: '灵武市'
    }]
  }, {
    value: '640200',
    label: '石嘴山市',
    children: [{
      value: '640202',
      label: '大武口区'
    }, {
      value: '640205',
      label: '惠农区'
    }, {
      value: '640221',
      label: '平罗县'
    }]
  }, {
    value: '640300',
    label: '吴忠市',
    children: [{
      value: '640302',
      label: '利通区'
    }, {
      value: '640303',
      label: '红寺堡区'
    }, {
      value: '640323',
      label: '盐池县'
    }, {
      value: '640324',
      label: '同心县'
    }, {
      value: '640381',
      label: '青铜峡市'
    }]
  }, {
    value: '640400',
    label: '固原市',
    children: [{
      value: '640402',
      label: '原州区'
    }, {
      value: '640422',
      label: '西吉县'
    }, {
      value: '640423',
      label: '隆德县'
    }, {
      value: '640424',
      label: '泾源县'
    }, {
      value: '640425',
      label: '彭阳县'
    }]
  }, {
    value: '640500',
    label: '中卫市',
    children: [{
      value: '640502',
      label: '沙坡头区'
    }, {
      value: '640521',
      label: '中宁县'
    }, {
      value: '640522',
      label: '海原县'
    }]
  }]
}, {
  value: '650000',
  label: '新疆维吾尔自治区',
  children: [{
    value: '650100',
    label: '乌鲁木齐市',
    children: [{
      value: '650102',
      label: '天山区'
    }, {
      value: '650103',
      label: '沙依巴克区'
    }, {
      value: '650104',
      label: '新市区'
    }, {
      value: '650105',
      label: '水磨沟区'
    }, {
      value: '650106',
      label: '头屯河区'
    }, {
      value: '650107',
      label: '达坂城区'
    }, {
      value: '650109',
      label: '米东区'
    }, {
      value: '650121',
      label: '乌鲁木齐县'
    }]
  }, {
    value: '650200',
    label: '克拉玛依市',
    children: [{
      value: '650202',
      label: '独山子区'
    }, {
      value: '650203',
      label: '克拉玛依区'
    }, {
      value: '650204',
      label: '白碱滩区'
    }, {
      value: '650205',
      label: '乌尔禾区'
    }]
  }, {
    value: '650400',
    label: '吐鲁番市',
    children: [{
      value: '650402',
      label: '高昌区'
    }, {
      value: '650421',
      label: '鄯善县'
    }, {
      value: '650422',
      label: '托克逊县'
    }]
  }, {
    value: '650500',
    label: '哈密市',
    children: [{
      value: '650502',
      label: '伊州区'
    }, {
      value: '650521',
      label: '巴里坤哈萨克自治县'
    }, {
      value: '650522',
      label: '伊吾县'
    }]
  }, {
    value: '652300',
    label: '昌吉回族自治州',
    children: [{
      value: '652301',
      label: '昌吉市'
    }, {
      value: '652302',
      label: '阜康市'
    }, {
      value: '652323',
      label: '呼图壁县'
    }, {
      value: '652324',
      label: '玛纳斯县'
    }, {
      value: '652325',
      label: '奇台县'
    }, {
      value: '652327',
      label: '吉木萨尔县'
    }, {
      value: '652328',
      label: '木垒哈萨克自治县'
    }]
  }, {
    value: '652700',
    label: '博尔塔拉蒙古自治州',
    children: [{
      value: '652701',
      label: '博乐市'
    }, {
      value: '652702',
      label: '阿拉山口市'
    }, {
      value: '652722',
      label: '精河县'
    }, {
      value: '652723',
      label: '温泉县'
    }]
  }, {
    value: '652800',
    label: '巴音郭楞蒙古自治州',
    children: [{
      value: '652801',
      label: '库尔勒市'
    }, {
      value: '652822',
      label: '轮台县'
    }, {
      value: '652823',
      label: '尉犁县'
    }, {
      value: '652824',
      label: '若羌县'
    }, {
      value: '652825',
      label: '且末县'
    }, {
      value: '652826',
      label: '焉耆回族自治县'
    }, {
      value: '652827',
      label: '和静县'
    }, {
      value: '652828',
      label: '和硕县'
    }, {
      value: '652829',
      label: '博湖县'
    }]
  }, {
    value: '652900',
    label: '阿克苏地区',
    children: [{
      value: '652901',
      label: '阿克苏市'
    }, {
      value: '652922',
      label: '温宿县'
    }, {
      value: '652923',
      label: '库车县'
    }, {
      value: '652924',
      label: '沙雅县'
    }, {
      value: '652925',
      label: '新和县'
    }, {
      value: '652926',
      label: '拜城县'
    }, {
      value: '652927',
      label: '乌什县'
    }, {
      value: '652928',
      label: '阿瓦提县'
    }, {
      value: '652929',
      label: '柯坪县'
    }]
  }, {
    value: '653000',
    label: '克孜勒苏柯尔克孜自治州',
    children: [{
      value: '653001',
      label: '阿图什市'
    }, {
      value: '653022',
      label: '阿克陶县'
    }, {
      value: '653023',
      label: '阿合奇县'
    }, {
      value: '653024',
      label: '乌恰县'
    }]
  }, {
    value: '653100',
    label: '喀什地区',
    children: [{
      value: '653101',
      label: '喀什市'
    }, {
      value: '653121',
      label: '疏附县'
    }, {
      value: '653122',
      label: '疏勒县'
    }, {
      value: '653123',
      label: '英吉沙县'
    }, {
      value: '653124',
      label: '泽普县'
    }, {
      value: '653125',
      label: '莎车县'
    }, {
      value: '653126',
      label: '叶城县'
    }, {
      value: '653127',
      label: '麦盖提县'
    }, {
      value: '653128',
      label: '岳普湖县'
    }, {
      value: '653129',
      label: '伽师县'
    }, {
      value: '653130',
      label: '巴楚县'
    }, {
      value: '653131',
      label: '塔什库尔干塔吉克自治县'
    }]
  }, {
    value: '653200',
    label: '和田地区',
    children: [{
      value: '653201',
      label: '和田市'
    }, {
      value: '653221',
      label: '和田县'
    }, {
      value: '653222',
      label: '墨玉县'
    }, {
      value: '653223',
      label: '皮山县'
    }, {
      value: '653224',
      label: '洛浦县'
    }, {
      value: '653225',
      label: '策勒县'
    }, {
      value: '653226',
      label: '于田县'
    }, {
      value: '653227',
      label: '民丰县'
    }]
  }, {
    value: '654000',
    label: '伊犁哈萨克自治州',
    children: [{
      value: '654002',
      label: '伊宁市'
    }, {
      value: '654003',
      label: '奎屯市'
    }, {
      value: '654004',
      label: '霍尔果斯市'
    }, {
      value: '654021',
      label: '伊宁县'
    }, {
      value: '654022',
      label: '察布查尔锡伯自治县'
    }, {
      value: '654023',
      label: '霍城县'
    }, {
      value: '654024',
      label: '巩留县'
    }, {
      value: '654025',
      label: '新源县'
    }, {
      value: '654026',
      label: '昭苏县'
    }, {
      value: '654027',
      label: '特克斯县'
    }, {
      value: '654028',
      label: '尼勒克县'
    }]
  }, {
    value: '654200',
    label: '塔城地区',
    children: [{
      value: '654201',
      label: '塔城市'
    }, {
      value: '654202',
      label: '乌苏市'
    }, {
      value: '654221',
      label: '额敏县'
    }, {
      value: '654223',
      label: '沙湾县'
    }, {
      value: '654224',
      label: '托里县'
    }, {
      value: '654225',
      label: '裕民县'
    }, {
      value: '654226',
      label: '和布克赛尔蒙古自治县'
    }]
  }, {
    value: '654300',
    label: '阿勒泰地区',
    children: [{
      value: '654301',
      label: '阿勒泰市'
    }, {
      value: '654321',
      label: '布尔津县'
    }, {
      value: '654322',
      label: '富蕴县'
    }, {
      value: '654323',
      label: '福海县'
    }, {
      value: '654324',
      label: '哈巴河县'
    }, {
      value: '654325',
      label: '青河县'
    }, {
      value: '654326',
      label: '吉木乃县'
    }]
  }, {
    value: '659000',
    label: '自治区直辖县级行政区划',
    children: [{
      value: '659001',
      label: '石河子市'
    }, {
      value: '659002',
      label: '阿拉尔市'
    }, {
      value: '659003',
      label: '图木舒克市'
    }, {
      value: '659004',
      label: '五家渠市'
    }, {
      value: '659005',
      label: '北屯市'
    }, {
      value: '659006',
      label: '铁门关市'
    }, {
      value: '659007',
      label: '双河市'
    }, {
      value: '659008',
      label: '可克达拉市'
    }, {
      value: '659009',
      label: '昆玉市'
    }]
  }]
}, {
  value: '710000',
  label: '台湾省',
  children: [{
    value: '710100',
    label: '台北市',
    children: [{
      value: '710101',
      label: '中正区'
    }, {
      value: '710102',
      label: '大同区'
    }, {
      value: '710103',
      label: '中山区'
    }, {
      value: '710104',
      label: '松山区'
    }, {
      value: '710105',
      label: '大安区'
    }, {
      value: '710106',
      label: '万华区'
    }, {
      value: '710107',
      label: '信义区'
    }, {
      value: '710108',
      label: '士林区'
    }, {
      value: '710109',
      label: '北投区'
    }, {
      value: '710110',
      label: '内湖区'
    }, {
      value: '710111',
      label: '南港区'
    }, {
      value: '710112',
      label: '文山区'
    }]
  }, {
    value: '710200',
    label: '高雄市',
    children: [{
      value: '710201',
      label: '新兴区'
    }, {
      value: '710202',
      label: '前金区'
    }, {
      value: '710203',
      label: '苓雅区'
    }, {
      value: '710204',
      label: '盐埕区'
    }, {
      value: '710205',
      label: '鼓山区'
    }, {
      value: '710206',
      label: '旗津区'
    }, {
      value: '710207',
      label: '前镇区'
    }, {
      value: '710208',
      label: '三民区'
    }, {
      value: '710209',
      label: '左营区'
    }, {
      value: '710210',
      label: '楠梓区'
    }, {
      value: '710211',
      label: '小港区'
    }, {
      value: '710242',
      label: '仁武区'
    }, {
      value: '710243',
      label: '大社区'
    }, {
      value: '710244',
      label: '冈山区'
    }, {
      value: '710245',
      label: '路竹区'
    }, {
      value: '710246',
      label: '阿莲区'
    }, {
      value: '710247',
      label: '田寮区'
    }, {
      value: '710248',
      label: '燕巢区'
    }, {
      value: '710249',
      label: '桥头区'
    }, {
      value: '710250',
      label: '梓官区'
    }, {
      value: '710251',
      label: '弥陀区'
    }, {
      value: '710252',
      label: '永安区'
    }, {
      value: '710253',
      label: '湖内区'
    }, {
      value: '710254',
      label: '凤山区'
    }, {
      value: '710255',
      label: '大寮区'
    }, {
      value: '710256',
      label: '林园区'
    }, {
      value: '710257',
      label: '鸟松区'
    }, {
      value: '710258',
      label: '大树区'
    }, {
      value: '710259',
      label: '旗山区'
    }, {
      value: '710260',
      label: '美浓区'
    }, {
      value: '710261',
      label: '六龟区'
    }, {
      value: '710262',
      label: '内门区'
    }, {
      value: '710263',
      label: '杉林区'
    }, {
      value: '710264',
      label: '甲仙区'
    }, {
      value: '710265',
      label: '桃源区'
    }, {
      value: '710266',
      label: '那玛夏区'
    }, {
      value: '710267',
      label: '茂林区'
    }, {
      value: '710268',
      label: '茄萣区'
    }]
  }, {
    value: '710300',
    label: '台南市',
    children: [{
      value: '710301',
      label: '中西区'
    }, {
      value: '710302',
      label: '东区'
    }, {
      value: '710303',
      label: '南区'
    }, {
      value: '710304',
      label: '北区'
    }, {
      value: '710305',
      label: '安平区'
    }, {
      value: '710306',
      label: '安南区'
    }, {
      value: '710339',
      label: '永康区'
    }, {
      value: '710340',
      label: '归仁区'
    }, {
      value: '710341',
      label: '新化区'
    }, {
      value: '710342',
      label: '左镇区'
    }, {
      value: '710343',
      label: '玉井区'
    }, {
      value: '710344',
      label: '楠西区'
    }, {
      value: '710345',
      label: '南化区'
    }, {
      value: '710346',
      label: '仁德区'
    }, {
      value: '710347',
      label: '关庙区'
    }, {
      value: '710348',
      label: '龙崎区'
    }, {
      value: '710349',
      label: '官田区'
    }, {
      value: '710350',
      label: '麻豆区'
    }, {
      value: '710351',
      label: '佳里区'
    }, {
      value: '710352',
      label: '西港区'
    }, {
      value: '710353',
      label: '七股区'
    }, {
      value: '710354',
      label: '将军区'
    }, {
      value: '710355',
      label: '学甲区'
    }, {
      value: '710356',
      label: '北门区'
    }, {
      value: '710357',
      label: '新营区'
    }, {
      value: '710358',
      label: '后壁区'
    }, {
      value: '710359',
      label: '白河区'
    }, {
      value: '710360',
      label: '东山区'
    }, {
      value: '710361',
      label: '六甲区'
    }, {
      value: '710362',
      label: '下营区'
    }, {
      value: '710363',
      label: '柳营区'
    }, {
      value: '710364',
      label: '盐水区'
    }, {
      value: '710365',
      label: '善化区'
    }, {
      value: '710366',
      label: '大内区'
    }, {
      value: '710367',
      label: '山上区'
    }, {
      value: '710368',
      label: '新市区'
    }, {
      value: '710369',
      label: '安定区'
    }]
  }, {
    value: '710400',
    label: '台中市',
    children: [{
      value: '710401',
      label: '中区'
    }, {
      value: '710402',
      label: '东区'
    }, {
      value: '710403',
      label: '南区'
    }, {
      value: '710404',
      label: '西区'
    }, {
      value: '710405',
      label: '北区'
    }, {
      value: '710406',
      label: '北屯区'
    }, {
      value: '710407',
      label: '西屯区'
    }, {
      value: '710408',
      label: '南屯区'
    }, {
      value: '710431',
      label: '太平区'
    }, {
      value: '710432',
      label: '大里区'
    }, {
      value: '710433',
      label: '雾峰区'
    }, {
      value: '710434',
      label: '乌日区'
    }, {
      value: '710435',
      label: '丰原区'
    }, {
      value: '710436',
      label: '后里区'
    }, {
      value: '710437',
      label: '石冈区'
    }, {
      value: '710438',
      label: '东势区'
    }, {
      value: '710439',
      label: '和平区'
    }, {
      value: '710440',
      label: '新社区'
    }, {
      value: '710441',
      label: '潭子区'
    }, {
      value: '710442',
      label: '大雅区'
    }, {
      value: '710443',
      label: '神冈区'
    }, {
      value: '710444',
      label: '大肚区'
    }, {
      value: '710445',
      label: '沙鹿区'
    }, {
      value: '710446',
      label: '龙井区'
    }, {
      value: '710447',
      label: '梧栖区'
    }, {
      value: '710448',
      label: '清水区'
    }, {
      value: '710449',
      label: '大甲区'
    }, {
      value: '710450',
      label: '外埔区'
    }, {
      value: '710451',
      label: '大安区'
    }]
  }, {
    value: '710600',
    label: '南投县',
    children: [{
      value: '710614',
      label: '南投市'
    }, {
      value: '710615',
      label: '中寮乡'
    }, {
      value: '710616',
      label: '草屯镇'
    }, {
      value: '710617',
      label: '国姓乡'
    }, {
      value: '710618',
      label: '埔里镇'
    }, {
      value: '710619',
      label: '仁爱乡'
    }, {
      value: '710620',
      label: '名间乡'
    }, {
      value: '710621',
      label: '集集镇'
    }, {
      value: '710622',
      label: '水里乡'
    }, {
      value: '710623',
      label: '鱼池乡'
    }, {
      value: '710624',
      label: '信义乡'
    }, {
      value: '710625',
      label: '竹山镇'
    }, {
      value: '710626',
      label: '鹿谷乡'
    }]
  }, {
    value: '710700',
    label: '基隆市',
    children: [{
      value: '710701',
      label: '仁爱区'
    }, {
      value: '710702',
      label: '信义区'
    }, {
      value: '710703',
      label: '中正区'
    }, {
      value: '710704',
      label: '中山区'
    }, {
      value: '710705',
      label: '安乐区'
    }, {
      value: '710706',
      label: '暖暖区'
    }, {
      value: '710707',
      label: '七堵区'
    }]
  }, {
    value: '710800',
    label: '新竹市',
    children: [{
      value: '710801',
      label: '东区'
    }, {
      value: '710802',
      label: '北区'
    }, {
      value: '710803',
      label: '香山区'
    }]
  }, {
    value: '710900',
    label: '嘉义市',
    children: [{
      value: '710901',
      label: '东区'
    }, {
      value: '710902',
      label: '西区'
    }]
  }, {
    value: '711100',
    label: '新北市',
    children: [{
      value: '711130',
      label: '万里区'
    }, {
      value: '711131',
      label: '金山区'
    }, {
      value: '711132',
      label: '板桥区'
    }, {
      value: '711133',
      label: '汐止区'
    }, {
      value: '711134',
      label: '深坑区'
    }, {
      value: '711135',
      label: '石碇区'
    }, {
      value: '711136',
      label: '瑞芳区'
    }, {
      value: '711137',
      label: '平溪区'
    }, {
      value: '711138',
      label: '双溪区'
    }, {
      value: '711139',
      label: '贡寮区'
    }, {
      value: '711140',
      label: '新店区'
    }, {
      value: '711141',
      label: '坪林区'
    }, {
      value: '711142',
      label: '乌来区'
    }, {
      value: '711143',
      label: '永和区'
    }, {
      value: '711144',
      label: '中和区'
    }, {
      value: '711145',
      label: '土城区'
    }, {
      value: '711146',
      label: '三峡区'
    }, {
      value: '711147',
      label: '树林区'
    }, {
      value: '711148',
      label: '莺歌区'
    }, {
      value: '711149',
      label: '三重区'
    }, {
      value: '711150',
      label: '新庄区'
    }, {
      value: '711151',
      label: '泰山区'
    }, {
      value: '711152',
      label: '林口区'
    }, {
      value: '711153',
      label: '芦洲区'
    }, {
      value: '711154',
      label: '五股区'
    }, {
      value: '711155',
      label: '八里区'
    }, {
      value: '711156',
      label: '淡水区'
    }, {
      value: '711157',
      label: '三芝区'
    }, {
      value: '711158',
      label: '石门区'
    }]
  }, {
    value: '711200',
    label: '宜兰县',
    children: [{
      value: '711214',
      label: '宜兰市'
    }, {
      value: '711215',
      label: '头城镇'
    }, {
      value: '711216',
      label: '礁溪乡'
    }, {
      value: '711217',
      label: '壮围乡'
    }, {
      value: '711218',
      label: '员山乡'
    }, {
      value: '711219',
      label: '罗东镇'
    }, {
      value: '711220',
      label: '三星乡'
    }, {
      value: '711221',
      label: '大同乡'
    }, {
      value: '711222',
      label: '五结乡'
    }, {
      value: '711223',
      label: '冬山乡'
    }, {
      value: '711224',
      label: '苏澳镇'
    }, {
      value: '711225',
      label: '南澳乡'
    }]
  }, {
    value: '711300',
    label: '新竹县',
    children: [{
      value: '711314',
      label: '竹北市'
    }, {
      value: '711315',
      label: '湖口乡'
    }, {
      value: '711316',
      label: '新丰乡'
    }, {
      value: '711317',
      label: '新埔镇'
    }, {
      value: '711318',
      label: '关西镇'
    }, {
      value: '711319',
      label: '芎林乡'
    }, {
      value: '711320',
      label: '宝山乡'
    }, {
      value: '711321',
      label: '竹东镇'
    }, {
      value: '711322',
      label: '五峰乡'
    }, {
      value: '711323',
      label: '横山乡'
    }, {
      value: '711324',
      label: '尖石乡'
    }, {
      value: '711325',
      label: '北埔乡'
    }, {
      value: '711326',
      label: '峨眉乡'
    }]
  }, {
    value: '711400',
    label: '桃园市',
    children: [{
      value: '711414',
      label: '中坜区'
    }, {
      value: '711415',
      label: '平镇区'
    }, {
      value: '711416',
      label: '龙潭区'
    }, {
      value: '711417',
      label: '杨梅区'
    }, {
      value: '711418',
      label: '新屋区'
    }, {
      value: '711419',
      label: '观音区'
    }, {
      value: '711420',
      label: '桃园区'
    }, {
      value: '711421',
      label: '龟山区'
    }, {
      value: '711422',
      label: '八德区'
    }, {
      value: '711423',
      label: '大溪区'
    }, {
      value: '711424',
      label: '复兴区'
    }, {
      value: '711425',
      label: '大园区'
    }, {
      value: '711426',
      label: '芦竹区'
    }]
  }, {
    value: '711500',
    label: '苗栗县',
    children: [{
      value: '711519',
      label: '竹南镇'
    }, {
      value: '711520',
      label: '头份市'
    }, {
      value: '711521',
      label: '三湾乡'
    }, {
      value: '711522',
      label: '南庄乡'
    }, {
      value: '711523',
      label: '狮潭乡'
    }, {
      value: '711524',
      label: '后龙镇'
    }, {
      value: '711525',
      label: '通霄镇'
    }, {
      value: '711526',
      label: '苑里镇'
    }, {
      value: '711527',
      label: '苗栗市'
    }, {
      value: '711528',
      label: '造桥乡'
    }, {
      value: '711529',
      label: '头屋乡'
    }, {
      value: '711530',
      label: '公馆乡'
    }, {
      value: '711531',
      label: '大湖乡'
    }, {
      value: '711532',
      label: '泰安乡'
    }, {
      value: '711533',
      label: '铜锣乡'
    }, {
      value: '711534',
      label: '三义乡'
    }, {
      value: '711535',
      label: '西湖乡'
    }, {
      value: '711536',
      label: '卓兰镇'
    }]
  }, {
    value: '711700',
    label: '彰化县',
    children: [{
      value: '711727',
      label: '彰化市'
    }, {
      value: '711728',
      label: '芬园乡'
    }, {
      value: '711729',
      label: '花坛乡'
    }, {
      value: '711730',
      label: '秀水乡'
    }, {
      value: '711731',
      label: '鹿港镇'
    }, {
      value: '711732',
      label: '福兴乡'
    }, {
      value: '711733',
      label: '线西乡'
    }, {
      value: '711734',
      label: '和美镇'
    }, {
      value: '711735',
      label: '伸港乡'
    }, {
      value: '711736',
      label: '员林市'
    }, {
      value: '711737',
      label: '社头乡'
    }, {
      value: '711738',
      label: '永靖乡'
    }, {
      value: '711739',
      label: '埔心乡'
    }, {
      value: '711740',
      label: '溪湖镇'
    }, {
      value: '711741',
      label: '大村乡'
    }, {
      value: '711742',
      label: '埔盐乡'
    }, {
      value: '711743',
      label: '田中镇'
    }, {
      value: '711744',
      label: '北斗镇'
    }, {
      value: '711745',
      label: '田尾乡'
    }, {
      value: '711746',
      label: '埤头乡'
    }, {
      value: '711747',
      label: '溪州乡'
    }, {
      value: '711748',
      label: '竹塘乡'
    }, {
      value: '711749',
      label: '二林镇'
    }, {
      value: '711750',
      label: '大城乡'
    }, {
      value: '711751',
      label: '芳苑乡'
    }, {
      value: '711752',
      label: '二水乡'
    }]
  }, {
    value: '711900',
    label: '嘉义县',
    children: [{
      value: '711919',
      label: '番路乡'
    }, {
      value: '711920',
      label: '梅山乡'
    }, {
      value: '711921',
      label: '竹崎乡'
    }, {
      value: '711922',
      label: '阿里山乡'
    }, {
      value: '711923',
      label: '中埔乡'
    }, {
      value: '711924',
      label: '大埔乡'
    }, {
      value: '711925',
      label: '水上乡'
    }, {
      value: '711926',
      label: '鹿草乡'
    }, {
      value: '711927',
      label: '太保市'
    }, {
      value: '711928',
      label: '朴子市'
    }, {
      value: '711929',
      label: '东石乡'
    }, {
      value: '711930',
      label: '六脚乡'
    }, {
      value: '711931',
      label: '新港乡'
    }, {
      value: '711932',
      label: '民雄乡'
    }, {
      value: '711933',
      label: '大林镇'
    }, {
      value: '711934',
      label: '溪口乡'
    }, {
      value: '711935',
      label: '义竹乡'
    }, {
      value: '711936',
      label: '布袋镇'
    }]
  }, {
    value: '712100',
    label: '云林县',
    children: [{
      value: '712121',
      label: '斗南镇'
    }, {
      value: '712122',
      label: '大埤乡'
    }, {
      value: '712123',
      label: '虎尾镇'
    }, {
      value: '712124',
      label: '土库镇'
    }, {
      value: '712125',
      label: '褒忠乡'
    }, {
      value: '712126',
      label: '东势乡'
    }, {
      value: '712127',
      label: '台西乡'
    }, {
      value: '712128',
      label: '仑背乡'
    }, {
      value: '712129',
      label: '麦寮乡'
    }, {
      value: '712130',
      label: '斗六市'
    }, {
      value: '712131',
      label: '林内乡'
    }, {
      value: '712132',
      label: '古坑乡'
    }, {
      value: '712133',
      label: '莿桐乡'
    }, {
      value: '712134',
      label: '西螺镇'
    }, {
      value: '712135',
      label: '二仑乡'
    }, {
      value: '712136',
      label: '北港镇'
    }, {
      value: '712137',
      label: '水林乡'
    }, {
      value: '712138',
      label: '口湖乡'
    }, {
      value: '712139',
      label: '四湖乡'
    }, {
      value: '712140',
      label: '元长乡'
    }]
  }, {
    value: '712400',
    label: '屏东县',
    children: [{
      value: '712434',
      label: '屏东市'
    }, {
      value: '712435',
      label: '三地门乡'
    }, {
      value: '712436',
      label: '雾台乡'
    }, {
      value: '712437',
      label: '玛家乡'
    }, {
      value: '712438',
      label: '九如乡'
    }, {
      value: '712439',
      label: '里港乡'
    }, {
      value: '712440',
      label: '高树乡'
    }, {
      value: '712441',
      label: '盐埔乡'
    }, {
      value: '712442',
      label: '长治乡'
    }, {
      value: '712443',
      label: '麟洛乡'
    }, {
      value: '712444',
      label: '竹田乡'
    }, {
      value: '712445',
      label: '内埔乡'
    }, {
      value: '712446',
      label: '万丹乡'
    }, {
      value: '712447',
      label: '潮州镇'
    }, {
      value: '712448',
      label: '泰武乡'
    }, {
      value: '712449',
      label: '来义乡'
    }, {
      value: '712450',
      label: '万峦乡'
    }, {
      value: '712451',
      label: '崁顶乡'
    }, {
      value: '712452',
      label: '新埤乡'
    }, {
      value: '712453',
      label: '南州乡'
    }, {
      value: '712454',
      label: '林边乡'
    }, {
      value: '712455',
      label: '东港镇'
    }, {
      value: '712456',
      label: '琉球乡'
    }, {
      value: '712457',
      label: '佳冬乡'
    }, {
      value: '712458',
      label: '新园乡'
    }, {
      value: '712459',
      label: '枋寮乡'
    }, {
      value: '712460',
      label: '枋山乡'
    }, {
      value: '712461',
      label: '春日乡'
    }, {
      value: '712462',
      label: '狮子乡'
    }, {
      value: '712463',
      label: '车城乡'
    }, {
      value: '712464',
      label: '牡丹乡'
    }, {
      value: '712465',
      label: '恒春镇'
    }, {
      value: '712466',
      label: '满州乡'
    }]
  }, {
    value: '712500',
    label: '台东县',
    children: [{
      value: '712517',
      label: '台东市'
    }, {
      value: '712518',
      label: '绿岛乡'
    }, {
      value: '712519',
      label: '兰屿乡'
    }, {
      value: '712520',
      label: '延平乡'
    }, {
      value: '712521',
      label: '卑南乡'
    }, {
      value: '712522',
      label: '鹿野乡'
    }, {
      value: '712523',
      label: '关山镇'
    }, {
      value: '712524',
      label: '海端乡'
    }, {
      value: '712525',
      label: '池上乡'
    }, {
      value: '712526',
      label: '东河乡'
    }, {
      value: '712527',
      label: '成功镇'
    }, {
      value: '712528',
      label: '长滨乡'
    }, {
      value: '712529',
      label: '金峰乡'
    }, {
      value: '712530',
      label: '大武乡'
    }, {
      value: '712531',
      label: '达仁乡'
    }, {
      value: '712532',
      label: '太麻里乡'
    }]
  }, {
    value: '712600',
    label: '花莲县',
    children: [{
      value: '712615',
      label: '花莲市'
    }, {
      value: '712616',
      label: '新城乡'
    }, {
      value: '712618',
      label: '秀林乡'
    }, {
      value: '712619',
      label: '吉安乡'
    }, {
      value: '712620',
      label: '寿丰乡'
    }, {
      value: '712621',
      label: '凤林镇'
    }, {
      value: '712622',
      label: '光复乡'
    }, {
      value: '712623',
      label: '丰滨乡'
    }, {
      value: '712624',
      label: '瑞穗乡'
    }, {
      value: '712625',
      label: '万荣乡'
    }, {
      value: '712626',
      label: '玉里镇'
    }, {
      value: '712627',
      label: '卓溪乡'
    }, {
      value: '712628',
      label: '富里乡'
    }]
  }, {
    value: '712700',
    label: '澎湖县',
    children: [{
      value: '712707',
      label: '马公市'
    }, {
      value: '712708',
      label: '西屿乡'
    }, {
      value: '712709',
      label: '望安乡'
    }, {
      value: '712710',
      label: '七美乡'
    }, {
      value: '712711',
      label: '白沙乡'
    }, {
      value: '712712',
      label: '湖西乡'
    }]
  }]
}, {
  value: '810000',
  label: '香港特别行政区',
  children: [{
    value: '810100',
    label: '香港特别行政区',
    children: [{
      value: '810101',
      label: '中西区'
    }, {
      value: '810102',
      label: '东区'
    }, {
      value: '810103',
      label: '九龙城区'
    }, {
      value: '810104',
      label: '观塘区'
    }, {
      value: '810105',
      label: '南区'
    }, {
      value: '810106',
      label: '深水埗区'
    }, {
      value: '810107',
      label: '湾仔区'
    }, {
      value: '810108',
      label: '黄大仙区'
    }, {
      value: '810109',
      label: '油尖旺区'
    }, {
      value: '810110',
      label: '离岛区'
    }, {
      value: '810111',
      label: '葵青区'
    }, {
      value: '810112',
      label: '北区'
    }, {
      value: '810113',
      label: '西贡区'
    }, {
      value: '810114',
      label: '沙田区'
    }, {
      value: '810115',
      label: '屯门区'
    }, {
      value: '810116',
      label: '大埔区'
    }, {
      value: '810117',
      label: '荃湾区'
    }, {
      value: '810118',
      label: '元朗区'
    }]
  }]
}, {
  value: '820000',
  label: '澳门特别行政区',
  children: [{
    value: '820100',
    label: '澳门特别行政区',
    children: [{
      value: '820101',
      label: '澳门半岛'
    }, {
      value: '820102',
      label: '凼仔'
    }, {
      value: '820103',
      label: '路凼城'
    }, {
      value: '820104',
      label: '路环'
    }]
  }]
}];
exports.default = _default;

/***/ }),
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */,
/* 395 */,
/* 396 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-rate/props.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 用于v-model双向绑定选中的星星数量
    value: {
      type: [String, Number],
      default: uni.$u.props.rate.value
    },
    // 要显示的星星数量
    count: {
      type: [String, Number],
      default: uni.$u.props.rate.count
    },
    // 是否不可选中
    disabled: {
      type: Boolean,
      default: uni.$u.props.rate.disabled
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: uni.$u.props.rate.readonly
    },
    // 星星的大小，单位px
    size: {
      type: [String, Number],
      default: uni.$u.props.rate.size
    },
    // 未选中时的颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.rate.inactiveColor
    },
    // 选中的颜色
    activeColor: {
      type: String,
      default: uni.$u.props.rate.activeColor
    },
    // 星星之间的间距，单位px
    gutter: {
      type: [String, Number],
      default: uni.$u.props.rate.gutter
    },
    // 最少能选择的星星个数
    minCount: {
      type: [String, Number],
      default: uni.$u.props.rate.minCount
    },
    // 是否允许半星
    allowHalf: {
      type: Boolean,
      default: uni.$u.props.rate.allowHalf
    },
    // 选中时的图标(星星)
    activeIcon: {
      type: String,
      default: uni.$u.props.rate.activeIcon
    },
    // 未选中时的图标(星星)
    inactiveIcon: {
      type: String,
      default: uni.$u.props.rate.inactiveIcon
    },
    // 是否可以通过滑动手势选择评分
    touchable: {
      type: Boolean,
      default: uni.$u.props.rate.touchable
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 397 */,
/* 398 */,
/* 399 */,
/* 400 */,
/* 401 */,
/* 402 */,
/* 403 */,
/* 404 */,
/* 405 */,
/* 406 */,
/* 407 */,
/* 408 */,
/* 409 */,
/* 410 */,
/* 411 */
/*!*******************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-loading-icon/props.js ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 是否显示组件
    show: {
      type: Boolean,
      default: uni.$u.props.loadingIcon.show
    },
    // 颜色
    color: {
      type: String,
      default: uni.$u.props.loadingIcon.color
    },
    // 提示文字颜色
    textColor: {
      type: String,
      default: uni.$u.props.loadingIcon.textColor
    },
    // 文字和图标是否垂直排列
    vertical: {
      type: Boolean,
      default: uni.$u.props.loadingIcon.vertical
    },
    // 模式选择，circle-圆形，spinner-花朵形，semicircle-半圆形
    mode: {
      type: String,
      default: uni.$u.props.loadingIcon.mode
    },
    // 图标大小，单位默认px
    size: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.size
    },
    // 文字大小
    textSize: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.textSize
    },
    // 文字内容
    text: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.text
    },
    // 动画模式
    timingFunction: {
      type: String,
      default: uni.$u.props.loadingIcon.timingFunction
    },
    // 动画执行周期时间
    duration: {
      type: [String, Number],
      default: uni.$u.props.loadingIcon.duration
    },
    // mode=circle时的暗边颜色
    inactiveColor: {
      type: String,
      default: uni.$u.props.loadingIcon.inactiveColor
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 412 */,
/* 413 */,
/* 414 */,
/* 415 */,
/* 416 */,
/* 417 */,
/* 418 */,
/* 419 */
/*!***********************************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-swiper-indicator/props.js ***!
  \***********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 轮播的长度
    length: {
      type: [String, Number],
      default: uni.$u.props.swiperIndicator.length
    },
    // 当前处于活动状态的轮播的索引
    current: {
      type: [String, Number],
      default: uni.$u.props.swiperIndicator.current
    },
    // 指示器非激活颜色
    indicatorActiveColor: {
      type: String,
      default: uni.$u.props.swiperIndicator.indicatorActiveColor
    },
    // 指示器的激活颜色
    indicatorInactiveColor: {
      type: String,
      default: uni.$u.props.swiperIndicator.indicatorInactiveColor
    },
    // 指示器模式，line-线型，dot-点型
    indicatorMode: {
      type: String,
      default: uni.$u.props.swiperIndicator.indicatorMode
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ }),
/* 420 */,
/* 421 */,
/* 422 */,
/* 423 */,
/* 424 */,
/* 425 */,
/* 426 */,
/* 427 */
/*!***********************************************************************************************************************!*\
  !*** /Users/panda/Documents/HBuilderProjects/Camelcon_Transportation/uni_modules/uview-ui/components/u-link/props.js ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    // 文字颜色
    color: {
      type: String,
      default: uni.$u.props.link.color
    },
    // 字体大小，单位px
    fontSize: {
      type: [String, Number],
      default: uni.$u.props.link.fontSize
    },
    // 是否显示下划线
    underLine: {
      type: Boolean,
      default: uni.$u.props.link.underLine
    },
    // 要跳转的链接
    href: {
      type: String,
      default: uni.$u.props.link.href
    },
    // 小程序中复制到粘贴板的提示语
    mpTips: {
      type: String,
      default: uni.$u.props.link.mpTips
    },
    // 下划线颜色
    lineColor: {
      type: String,
      default: uni.$u.props.link.lineColor
    },
    // 超链接的问题，不使用slot形式传入，是因为nvue下无法修改颜色
    text: {
      type: String,
      default: uni.$u.props.link.text
    }
  }
};
exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["default"]))

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map