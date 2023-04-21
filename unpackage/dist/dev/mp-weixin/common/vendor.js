"use strict";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*.*?\*\//gs;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise$1 = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const LINEFEED = "\n";
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i = 0; i < fns.length; i++) {
    ret = fns[i](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
function sortObject(obj) {
  let sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach((key) => {
      const _key = key;
      sortObj[_key] = obj[_key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x) => x.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
function isUniLifecycleHook(name, value, checkType = true) {
  if (checkType && !isFunction(value)) {
    return false;
  }
  if (UniLifecycleHooks.indexOf(name) > -1) {
    return true;
  } else if (name.indexOf("on") === 0) {
    return true;
  }
  return false;
}
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const invokeCreateErrorHandler = once((app, createErrorHandler2) => {
  if (isFunction(app._component.onError)) {
    return createErrorHandler2(app);
  }
});
const E = function() {
};
E.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;
    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback)
          liveEvents.push(evts[i]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1 = E;
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  let locales = [LOCALE_EN, LOCALE_FR, LOCALE_ES];
  if (messages && Object.keys(messages).length > 0) {
    locales = Object.keys(messages);
  }
  const lang = startsWith(locale, locales);
  if (lang) {
    return lang;
  }
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i = 0; i < len; i++) {
    const opts = protocol[i];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i) {
      data[opts.name] = args[i];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType$1(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook, params) {
  return function(data) {
    return hook(data, params) || data;
  };
}
function queue$1(hooks, data, params) {
  let promise = false;
  for (let i = 0; i < hooks.length; i++) {
    const hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook, params));
    } else {
      const res = hook(data, params);
      if (isPromise$1(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$1(hooks, res, options).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(getApiInterceptorHooks(method), options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject(options.formatArgs) && isPlainObject(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  return invokeCallback(id, extend(res || {}, { errMsg: name + ":ok" }));
}
function invokeFail(id, name, errMsg, errRes) {
  return invokeCallback(id, extend({ errMsg: name + ":fail" + (errMsg ? " " + errMsg : "") }, errRes));
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options);
    const errMsg = beforeInvokeApi(name, [args], protocol, options);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options) {
  return wrapperTaskApi(name, fn, protocol, options);
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
function defineAsyncApi(name, fn, protocol, options) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
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
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i = 0; i < onPushMessageCallbacks.length; i++) {
      const callback = onPushMessageCallbacks[i];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "uniPush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction(options.success) || isFunction(options.fail) || isFunction(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`微信小程序 ${methodName} 暂不支持 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`微信小程序 暂不支持${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = isFunction(getApp) && getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "__UNI__B5E6A65",
    appName: "eleme_01_uniapp",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.7.13",
    uniRuntimeVersion: "3.7.13",
    uniPlatform: "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "__UNI__B5E6A65",
      appName: "eleme_01_uniapp",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2, platform = wx) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn(target, key)) {
        return target[key];
      }
      if (hasOwn(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, platform[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:服务[" + service + "]不存在"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const objectKeys = [
  "qy",
  "env",
  "error",
  "version",
  "lanDebug",
  "cloud",
  "serviceMarket",
  "router",
  "worklet"
];
const singlePageDisableKey = ["lanDebug", "router", "worklet"];
const launchOption = wx.getLaunchOptionsSync ? wx.getLaunchOptionsSync() : null;
function isWxKey(key) {
  if (launchOption && launchOption.scene === 1154 && singlePageDisableKey.includes(key)) {
    return false;
  }
  return objectKeys.indexOf(key) > -1 || typeof wx[key] === "function";
}
function initWx() {
  let global2 = wx;
  if (typeof globalThis !== "undefined" && globalThis.wx && wx !== globalThis.wx) {
    global2 = globalThis.wx;
  }
  const newWx = {};
  for (const key in global2) {
    if (isWxKey(key)) {
      newWx[key] = global2[key];
    }
  }
  if (typeof globalThis !== "undefined") {
    globalThis.wx = newWx;
  }
  return newWx;
}
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx$2.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
const wx$2 = initWx();
let baseInfo = wx$2.getAppBaseInfo && wx$2.getAppBaseInfo();
if (!baseInfo) {
  baseInfo = wx$2.getSystemInfoSync();
}
const host = baseInfo ? baseInfo.host : null;
const shareVideoMessage = host && host.env === "SAAASDK" ? wx$2.miniapp.shareVideoMessage : wx$2.shareVideoMessage;
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  createSelectorQuery,
  getProvider,
  shareVideoMessage
});
const compressImage = {
  args(fromArgs, toArgs) {
    if (fromArgs.compressedHeight && !toArgs.compressHeight) {
      toArgs.compressHeight = fromArgs.compressedHeight;
    }
    if (fromArgs.compressedWidth && !toArgs.compressWidth) {
      toArgs.compressWidth = fromArgs.compressedWidth;
    }
  }
};
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  compressImage,
  getAppAuthorizeSetting,
  getAppBaseInfo,
  getDeviceInfo,
  getSystemInfo,
  getSystemInfoSync,
  getWindowInfo,
  previewImage,
  redirectTo,
  showActionSheet
});
const wx$1 = initWx();
var index = initUni(shims, protocols, wx$1);
function warn$1(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn$1(`cannot run an inactive effect scope.`);
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    activeEffectScope = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray(target)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get3(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      warn$1(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      warn$1(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target = this[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$2(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get3.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get3 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get3 ? get3.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      // iterator protocol
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has,
    add,
    set: set$2,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod(
      "add"
      /* TriggerOpTypes.ADD */
    ),
    set: createReadonlyMethod(
      "set"
      /* TriggerOpTypes.SET */
    ),
    delete: createReadonlyMethod(
      "delete"
      /* TriggerOpTypes.DELETE */
    ),
    clear: createReadonlyMethod(
      "clear"
      /* TriggerOpTypes.CLEAR */
    ),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ] && !(isReadonly2 && target[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value[
      "__v_raw"
      /* ReactiveFlags.RAW */
    ]);
  }
  return !!(value && value[
    "__v_isReactive"
    /* ReactiveFlags.IS_REACTIVE */
  ]);
}
function isReadonly(value) {
  return !!(value && value[
    "__v_isReadonly"
    /* ReactiveFlags.IS_READONLY */
  ]);
}
function isShallow(value) {
  return !!(value && value[
    "__v_isShallow"
    /* ReactiveFlags.IS_SHALLOW */
  ]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed[
    "__v_raw"
    /* ReactiveFlags.RAW */
  ];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
var _a;
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this[_a] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this[
      "__v_isReadonly"
      /* ReactiveFlags.IS_READONLY */
    ] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
_a = "__v_isReadonly";
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && // avoid spamming console during tests
    true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i) => {
    logs.push(...i === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  [
    "sp"
    /* LifecycleHooks.SERVER_PREFETCH */
  ]: "serverPrefetch hook",
  [
    "bc"
    /* LifecycleHooks.BEFORE_CREATE */
  ]: "beforeCreate hook",
  [
    "c"
    /* LifecycleHooks.CREATED */
  ]: "created hook",
  [
    "bm"
    /* LifecycleHooks.BEFORE_MOUNT */
  ]: "beforeMount hook",
  [
    "m"
    /* LifecycleHooks.MOUNTED */
  ]: "mounted hook",
  [
    "bu"
    /* LifecycleHooks.BEFORE_UPDATE */
  ]: "beforeUpdate hook",
  [
    "u"
    /* LifecycleHooks.UPDATED */
  ]: "updated",
  [
    "bum"
    /* LifecycleHooks.BEFORE_UNMOUNT */
  ]: "beforeUnmount hook",
  [
    "um"
    /* LifecycleHooks.UNMOUNTED */
  ]: "unmounted hook",
  [
    "a"
    /* LifecycleHooks.ACTIVATED */
  ]: "activated hook",
  [
    "da"
    /* LifecycleHooks.DEACTIVATED */
  ]: "deactivated hook",
  [
    "ec"
    /* LifecycleHooks.ERROR_CAPTURED */
  ]: "errorCaptured hook",
  [
    "rtc"
    /* LifecycleHooks.RENDER_TRACKED */
  ]: "renderTracked hook",
  [
    "rtg"
    /* LifecycleHooks.RENDER_TRIGGERED */
  ]: "renderTriggered hook",
  [
    0
    /* ErrorCodes.SETUP_FUNCTION */
  ]: "setup function",
  [
    1
    /* ErrorCodes.RENDER_FUNCTION */
  ]: "render function",
  [
    2
    /* ErrorCodes.WATCH_GETTER */
  ]: "watcher getter",
  [
    3
    /* ErrorCodes.WATCH_CALLBACK */
  ]: "watcher callback",
  [
    4
    /* ErrorCodes.WATCH_CLEANUP */
  ]: "watcher cleanup function",
  [
    5
    /* ErrorCodes.NATIVE_EVENT_HANDLER */
  ]: "native event handler",
  [
    6
    /* ErrorCodes.COMPONENT_EVENT_HANDLER */
  ]: "component event handler",
  [
    7
    /* ErrorCodes.VNODE_HOOK */
  ]: "vnode hook",
  [
    8
    /* ErrorCodes.DIRECTIVE_HOOK */
  ]: "directive hook",
  [
    9
    /* ErrorCodes.TRANSITION_HOOK */
  ]: "transition hook",
  [
    10
    /* ErrorCodes.APP_ERROR_HANDLER */
  ]: "app errorHandler",
  [
    11
    /* ErrorCodes.APP_WARN_HANDLER */
  ]: "app warnHandler",
  [
    12
    /* ErrorCodes.FUNCTION_REF */
  ]: "ref function",
  [
    13
    /* ErrorCodes.ASYNC_COMPONENT_LOADER */
  ]: "async component loader",
  [
    14
    /* ErrorCodes.SCHEDULER */
  ]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise$1(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
const RECURSION_LIMIT = 100;
function nextTick$1(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if (!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i = queue.indexOf(job);
  if (i > flushIndex) {
    queue.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(cb, cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex)) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen, i = isFlushing ? flushIndex + 1 : 0) {
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  for (; i < queue.length; i++) {
    const cb = queue[i];
    if (cb && cb.pre) {
      if (checkRecursiveUpdates(seen, cb)) {
        continue;
      }
      queue.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff2 = getId(a) - getId(b);
  if (diff2 === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff2;
};
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  queue.sort(comparator);
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(
          job,
          null,
          14
          /* ErrorCodes.SCHEDULER */
        );
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
let devtools;
let buffer = [];
let devtoolsNotInstalled = false;
function emit$1(event, ...args) {
  if (devtools) {
    devtools.emit(event, ...args);
  } else if (!devtoolsNotInstalled) {
    buffer.push({ event, args });
  }
}
function setDevtoolsHook(hook, target) {
  var _a2, _b;
  devtools = hook;
  if (devtools) {
    devtools.enabled = true;
    buffer.forEach(({ event, args }) => devtools.emit(event, ...args));
    buffer = [];
  } else if (
    // handle late devtools injection - only do this if we are in an actual
    // browser environment to avoid the timer handle stalling test runner exit
    // (#4815)
    typeof window !== "undefined" && // some envs mock window but not fully
    // eslint-disable-next-line no-restricted-globals
    window.HTMLElement && // also exclude jsdom
    // eslint-disable-next-line no-restricted-globals
    !((_b = (_a2 = window.navigator) === null || _a2 === void 0 ? void 0 : _a2.userAgent) === null || _b === void 0 ? void 0 : _b.includes("jsdom"))
  ) {
    const replay = target.__VUE_DEVTOOLS_HOOK_REPLAY__ = target.__VUE_DEVTOOLS_HOOK_REPLAY__ || [];
    replay.push((newHook) => {
      setDevtoolsHook(newHook, target);
    });
    setTimeout(() => {
      if (!devtools) {
        target.__VUE_DEVTOOLS_HOOK_REPLAY__ = null;
        devtoolsNotInstalled = true;
        buffer = [];
      }
    }, 3e3);
  } else {
    devtoolsNotInstalled = true;
    buffer = [];
  }
}
function devtoolsInitApp(app, version2) {
  emit$1("app:init", app, version2, {
    Fragment,
    Text,
    Comment,
    Static
  });
}
const devtoolsComponentAdded = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:added"
  /* DevtoolsHooks.COMPONENT_ADDED */
);
const devtoolsComponentUpdated = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:updated"
  /* DevtoolsHooks.COMPONENT_UPDATED */
);
const _devtoolsComponentRemoved = /* @__PURE__ */ createDevtoolsComponentHook(
  "component:removed"
  /* DevtoolsHooks.COMPONENT_REMOVED */
);
const devtoolsComponentRemoved = (component) => {
  if (devtools && typeof devtools.cleanupBuffer === "function" && // remove the component if it wasn't buffered
  !devtools.cleanupBuffer(component)) {
    _devtoolsComponentRemoved(component);
  }
};
function createDevtoolsComponentHook(hook) {
  return (component) => {
    emit$1(
      hook,
      component.appContext.app,
      component.uid,
      // fixed by xxxxxx
      // 为 0 是 App，无 parent 是 Page 指向 App
      component.uid === 0 ? void 0 : component.parent ? component.parent.uid : 0,
      component
    );
  };
}
const devtoolsPerfStart = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:start"
  /* DevtoolsHooks.PERFORMANCE_START */
);
const devtoolsPerfEnd = /* @__PURE__ */ createDevtoolsPerformanceHook(
  "perf:end"
  /* DevtoolsHooks.PERFORMANCE_END */
);
function createDevtoolsPerformanceHook(hook) {
  return (component, type, time) => {
    emit$1(hook, component.appContext.app, component.uid, component, type, time);
  };
}
function devtoolsComponentEmit(component, event, params) {
  emit$1("component:emit", component.appContext.app, component, event, params);
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || // also try camelCase event handler (#2249)
  props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key, value);
    }
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn(`injection "${String(key)}" not found.`);
    }
  } else {
    warn(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction(cb)) {
    warn(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = getCurrentScope() === (currentInstance === null || currentInstance === void 0 ? void 0 : currentInstance.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(
          s2,
          instance,
          2
          /* ErrorCodes.WATCH_GETTER */
        );
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(
        source,
        instance,
        2
        /* ErrorCodes.WATCH_GETTER */
      );
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(
        fn,
        instance,
        4
        /* ErrorCodes.WATCH_CLEANUP */
      );
    };
  };
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          // pass undefined as the old value when it's changed for the first time
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect$1(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect$1(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value[
    "__v_skip"
    /* ReactiveFlags.SKIP */
  ]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key in value) {
      traverse(value[key], seen);
    }
  }
  return value;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
    /* prepend */
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook$1 = (lifecycle) => (hook, target = currentInstance) => (
  // post-create lifecycle registrations are noops during SSR (except for serverPrefetch)
  (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target)
);
const onBeforeMount = createHook$1(
  "bm"
  /* LifecycleHooks.BEFORE_MOUNT */
);
const onMounted = createHook$1(
  "m"
  /* LifecycleHooks.MOUNTED */
);
const onBeforeUpdate = createHook$1(
  "bu"
  /* LifecycleHooks.BEFORE_UPDATE */
);
const onUpdated = createHook$1(
  "u"
  /* LifecycleHooks.UPDATED */
);
const onBeforeUnmount = createHook$1(
  "bum"
  /* LifecycleHooks.BEFORE_UNMOUNT */
);
const onUnmounted = createHook$1(
  "um"
  /* LifecycleHooks.UNMOUNTED */
);
const onServerPrefetch = createHook$1(
  "sp"
  /* LifecycleHooks.SERVER_PREFETCH */
);
const onRenderTriggered = createHook$1(
  "rtg"
  /* LifecycleHooks.RENDER_TRIGGERED */
);
const onRenderTracked = createHook$1(
  "rtc"
  /* LifecycleHooks.RENDER_TRACKED */
);
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn("Do not use built-in directive ids as custom directive id: " + name);
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component2,
        false
        /* do not include inferred name to avoid breaking existing code */
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = (
      // local registration
      // check instance[type] first which is resolved for options API
      resolve(instance[type] || Component2[type], name) || // global registration
      resolve(instance.appContext[type], name)
    );
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
    $: (i) => i,
    // fixed by xxxxxx vue-i18n 在 dev 模式，访问了 $el，故模拟一个假的
    // $el: i => i.vnode.el,
    $el: (i) => i.__$el || (i.__$el = {}),
    $data: (i) => i.data,
    $props: (i) => shallowReadonly(i.props),
    $attrs: (i) => shallowReadonly(i.attrs),
    $slots: (i) => shallowReadonly(i.slots),
    $refs: (i) => shallowReadonly(i.refs),
    $parent: (i) => getPublicInstance(i.parent),
    $root: (i) => getPublicInstance(i.root),
    $emit: (i) => i.emit,
    $options: (i) => resolveMergedOptions(i),
    $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
    // $nextTick: i => i.n || (i.n = nextTick.bind(i.proxy!)),// fixed by xxxxxx
    $watch: (i) => instanceWatch.bind(i)
  })
);
const isReservedPrefix = (key) => key === "_" || key === "$";
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if (
        // only cache other properties when instance has declared (thus stable)
        // props
        (normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)
      ) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if (
      // css module (injected by vue-loader)
      (cssModule = type.__cssModules) && (cssModule = cssModule[key])
    ) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (
      // global properties
      globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)
    ) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || // #1091 avoid internal isRef/isVNode checks on component instance leading
    // to infinite warning loop
    key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key[0]) && hasOwn(data, key)) {
        warn(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (setupState.__isScriptSetup && hasOwn(setupState, key)) {
      warn(`Cannot mutate <script setup> binding "${key}" from Options API.`);
      return false;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      warn(`Attempting to mutate prop "${key}". Props are readonly.`);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      // intercepted by the proxy so no need for implementation,
      // but needed to prevent set errors
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key[0])) {
        warn(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(
      options.beforeCreate,
      instance,
      "bc"
      /* LifecycleHooks.BEFORE_CREATE */
    );
  }
  const {
    // state
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    // lifecycle
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    // public API
    expose,
    inheritAttrs,
    // assets
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise$1(data)) {
      warn(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$1(data)) {
      warn(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (!isReservedPrefix(key[0])) {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get3 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get3 === NOOP) {
        warn(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c = computed({
        get: get3,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(
        created,
        instance,
        "c"
        /* LifecycleHooks.CREATED */
      );
    }
  }
  function registerLifecycleHook(register2, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register2(_hook.bind(publicThis)));
    } else if (hook) {
      register2(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
          /* treat default function as factory */
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v) => injected.value = v
        });
      } else {
        {
          warn(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  if (isObject$1(base)) {
    cache.set(base, resolved);
  }
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m) => mergeOptions(to, m, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  // objects
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  // lifecycle
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  // assets
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  // watch
  watch: mergeWatchOptions,
  // provide / inject
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function isInHmrContext(instance) {
  while (instance) {
    if (instance.type.__hmrId)
      return true;
    instance = instance.parent;
  }
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    !isInHmrContext(instance) && (optimized || patchFlag > 0) && !(patchFlag & 16)
  ) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
              /* isAbsent */
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || // for camelCase
      !hasOwn(rawProps, key) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && // for camelCase
          (rawPrevProps[key] !== void 0 || // for kebab-case
          rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
              /* isAbsent */
            );
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[
      0
      /* BooleanFlags.shouldCast */
    ]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[
        1
        /* BooleanFlags.shouldCastTrue */
      ] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i = 0; i < raw.length; i++) {
      if (!isString(raw[i])) {
        warn(`props must be strings when using array syntax.`, raw[i]);
      }
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : Object.assign({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[
            0
            /* BooleanFlags.shouldCast */
          ] = booleanIndex > -1;
          prop[
            1
            /* BooleanFlags.shouldCastTrue */
          ] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn(rawProps, key) && !hasOwn(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i = 0; i < types.length && !isValid; i++) {
      const { valid, expectedType } = assertType(value, types[i]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
        {
          warn(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      // fixed by xxxxxx
      mount() {
      },
      // fixed by xxxxxx
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
let supported;
let perf;
function startMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    perf.mark(`vue-${type}-${instance.uid}`);
  }
  {
    devtoolsPerfStart(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function endMeasure(instance, type) {
  if (instance.appContext.config.performance && isSupported()) {
    const startTag = `vue-${type}-${instance.uid}`;
    const endTag = startTag + `:end`;
    perf.mark(endTag);
    perf.measure(`<${formatComponentName(instance, instance.type)}> ${type}`, startTag, endTag);
    perf.clearMarks(startTag);
    perf.clearMarks(endTag);
  }
  {
    devtoolsPerfEnd(instance, type, isSupported() ? perf.now() : Date.now());
  }
}
function isSupported() {
  if (supported !== void 0) {
    return supported;
  }
  if (typeof window !== "undefined" && window.performance) {
    supported = true;
    perf = window.performance;
  } else {
    supported = false;
  }
  return supported;
}
const queuePostRenderEffect$1 = queuePostFlushCb;
const Fragment = Symbol("Fragment");
const Text = Symbol("Text");
const Comment = Symbol("Comment");
const Static = Symbol("Static");
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    // emit
    emit: null,
    emitted: null,
    // props default value
    propsDefaults: EMPTY_OBJ,
    // inheritAttrs
    inheritAttrs: type.inheritAttrs,
    // state
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    // suspense related
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const {
    props
    /*, children*/
  } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i = 0; i < names.length; i++) {
        validateComponentName(names[i], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i = 0; i < names.length; i++) {
        validateDirectiveName(names[i]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise$1(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn(
        `Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`
        /* should not happen */
      );
    } else {
      warn(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key) {
        track(instance, "get", "$attrs");
        return target[key];
      },
      set() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    {
      if (instance.exposed) {
        warn(`expose() should be called only once per setup().`);
      }
      if (exposed != null) {
        let exposedType = typeof exposed;
        if (exposedType === "object") {
          if (isArray(exposed)) {
            exposedType = "array";
          } else if (isRef(exposed)) {
            exposedType = "ref";
          }
        }
        if (exposedType !== "object") {
          warn(`expose() should be passed a plain object, received ${exposedType}.`);
        }
      }
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      },
      has(target, key) {
        return key in target || key in publicPropertiesMap;
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c) => c.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.47";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k, v) {
  result[k] = v;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }
}
function nextTick(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    return nextTick$1(fn && fn.bind(instance.proxy));
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(
        fn.bind(instance.proxy),
        instance,
        14
        /* ErrorCodes.SCHEDULER */
      );
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i = 0; i < len; i++) {
        copy[i] = clone(src[i], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs();
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = (
      // 字节小程序 selectAllComponents 可能返回 null
      // https://github.com/dcloudio/uni-app/issues/3954
      ($scope.selectAllComponents(".r") || []).concat($scope.selectAllComponents(".r-i-f") || [])
    );
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick(instance, doSet);
  }
}
function toSkip(value) {
  if (isObject$1(value)) {
    markRaw(value);
  }
  return value;
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    if (vm) {
      return getExposeProxy(vm.$) || vm;
    }
    return toSkip(mpInstance);
  }
  return null;
}
function setTemplateRef({ r, f: f2 }, refValue, setupState) {
  if (isFunction(r)) {
    r(refValue, {});
  } else {
    const _isString = isString(r);
    const _isRef = isRef(r);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r.value)) {
          r.value = [];
        }
        const existing = r.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn(setupState, r)) {
          setupState[r] = refValue;
        }
      } else if (isRef(r)) {
        r.value = refValue;
      } else {
        warnRef(r);
      }
    } else {
      warnRef(r);
    }
  }
}
function warnRef(ref2) {
  warn("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
    startMeasure(instance, `mount`);
  }
  {
    startMeasure(instance, `init`);
  }
  setupComponent(instance);
  {
    endMeasure(instance, `init`);
  }
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
    endMeasure(instance, `mount`);
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(
        props,
        null
        /* we know it doesn't need it */
      );
    }
  } catch (err) {
    handleError(
      err,
      instance,
      1
      /* ErrorCodes.RENDER_FUNCTION */
    );
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter((key) => key !== "class" && key !== "style");
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key) => {
        if (!isModelListener(key) || !(key.slice(9) in propsOptions)) {
          props[key] = fallthroughAttrs2[key];
        }
      });
    } else {
      keys.forEach((key) => props[key] = fallthroughAttrs2[key]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs();
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update: update3 }, allowed) {
  effect.allowRecurse = update3.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick$1(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      {
        devtoolsComponentAdded(instance);
      }
    } else {
      const { next, bu, u } = instance;
      {
        pushWarningContext(next || instance.vnode);
      }
      toggleRecurse(instance, false);
      updateComponentPreRender();
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      {
        startMeasure(instance, `patch`);
      }
      patch(instance, renderComponentRoot(instance));
      {
        endMeasure(instance, `patch`);
      }
      if (u) {
        queuePostRenderEffect(u);
      }
      {
        devtoolsComponentUpdated(instance);
      }
      {
        popWarningContext();
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    () => queueJob(instance.update),
    instance.scope
    // track it in component's effect scope
  );
  const update3 = instance.update = effect.run.bind(effect);
  update3.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update3.ownerInstance = instance;
  }
  update3();
}
function unmountComponent(instance) {
  const { bum, scope, update: update3, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update3) {
    update3.active = false;
  }
  if (um) {
    queuePostRenderEffect(um);
  }
  queuePostRenderEffect(() => {
    instance.isUnmounted = true;
  });
  {
    devtoolsComponentRemoved(instance);
  }
}
const oldCreateApp = createAppAPI();
function getTarget() {
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  if (typeof my !== "undefined") {
    return my;
  }
}
function createVueApp(rootComponent, rootProps = null) {
  const target = getTarget();
  target.__VUE__ = true;
  {
    setDevtoolsHook(target.__VUE_DEVTOOLS_GLOBAL_HOOK__, target);
  }
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options) {
    return mountComponent(createVNode(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    app._instance = instance.$;
    {
      devtoolsInitApp(app, version);
    }
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType || mpType === "component") {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (isUniLifecycleHook(name, options[name], false)) {
      const hooks = options[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i = 0;
    for (; i < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 | (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("获取当前用户信息出错，详细错误信息为：" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  appConfig.errorHandler = invokeCreateErrorHandler(app, createErrorHandler);
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? String(eventTarget.dataset.eventsync) === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise$1(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  // touch事件暂不做延迟，否则在 Android 上会影响性能，比如一些拖拽跟手手势等
  // 'touchstart',
  // 'touchmove',
  // 'touchcancel',
  // 'touchend',
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn(event.detail, "checked") && !hasOwn(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, i);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, i);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i) => renderItem(item, i, i));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    ret += `${key.startsWith(`--`) ? key : hyphenate(key)}:${styles[key]};`;
  }
  return ret;
}
const o = (value, key) => vOn(value, key);
const f = (source, renderItem) => vFor(source, renderItem);
const s = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const n = (value) => normalizeClass(value);
const t = (val) => toDisplayString(val);
const p = (props) => renderProps(props);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
  // 'onReady', // lifetimes.ready
  // 'onPageScroll', // 影响性能，开发者手动注册
  // 'onShareTimeline', // 右上角菜单，开发者手动注册
  // 'onShareAppMessage' // 右上角菜单，开发者手动注册
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (isUniLifecycleHook(name, vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = isFunction(getApp) && getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = isFunction(getApp) && getApp({
      allowDefault: true
    });
    if (!app)
      return;
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v) {
      locale.value = v;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
const WORKLET_RE = /_(.*)_worklet_factory_/;
function initWorkletMethods(mpMethods, vueMethods) {
  if (vueMethods) {
    Object.keys(vueMethods).forEach((name) => {
      const matches = name.match(WORKLET_RE);
      if (matches) {
        const workletName = matches[1];
        mpMethods[name] = vueMethods[name];
        mpMethods[workletName] = vueMethods[workletName];
      }
    });
  }
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i = $children.length - 1; i >= 0; i--) {
    const childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i = $children.length - 1; i >= 0; i--) {
    parentVm = findVmByVueId($children[i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  // 百度小程序,快手小程序自定义组件不支持绑定动态事件，动态dataset，故通过props传递事件信息
  // event-opts
  "eO",
  // 组件 ref
  "uR",
  // 组件 ref-in-for
  "uRIF",
  // 组件 id
  "uI",
  // 组件类型 m: 小程序组件
  "uT",
  // 组件 props
  "uP",
  // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
  "uS"
];
function initDefaultProps(options, isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  if (options.behaviors) {
    if (options.behaviors.includes("wx://form-field")) {
      properties.name = {
        type: null,
        value: ""
      };
      properties.value = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initVirtualHostProps(options) {
  const properties = {};
  {
    if (options && options.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(mpComponentOptions), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initFormField(vm) {
  const vueOptions = vm.$options;
  if (isArray(vueOptions.behaviors) && vueOptions.behaviors.includes("uni://form-field")) {
    vm.$watch("modelValue", () => {
      vm.$scope && vm.$scope.setData({
        name: vm.name,
        value: vm.modelValue
      });
    }, {
      immediate: true
    });
  }
}
function initData(_) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("modelValue");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.modelValue = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    // styleIsolation: 'apply-shared',
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (isArray(vueOptions.mixins)) {
    vueOptions.mixins.forEach((item) => {
      if (isObject$1(item.options)) {
        extend(options, item.options);
      }
    });
  }
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  {
    initWorkletMethods(mpComponentOptions.methods, vueOptions.methods);
  }
  if (parse) {
    parse(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  return getApp().$vm;
}
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getAppVm().$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse && parse(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  const newTriggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
  try {
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}
function initMiniProgramHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initMiniProgramHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initMiniProgramHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
      if (!isMiniProgramPage) {
        initFormField(this.$vm);
      }
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  handleLink,
  initLifetimes,
  initRelation,
  isPage,
  mocks
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
/*!
 * vuex v4.1.0
 * (c) 2022 Evan You
 * @license MIT
 */
var storeKey = "store";
function useStore(key) {
  if (key === void 0)
    key = null;
  return inject(key !== null ? key : storeKey);
}
function forEachValue(obj, fn) {
  Object.keys(obj).forEach(function(key) {
    return fn(obj[key], key);
  });
}
function isObject(obj) {
  return obj !== null && typeof obj === "object";
}
function isPromise(val) {
  return val && typeof val.then === "function";
}
function assert(condition, msg) {
  if (!condition) {
    throw new Error("[vuex] " + msg);
  }
}
function partial(fn, arg) {
  return function() {
    return fn(arg);
  };
}
function genericSubscribe(fn, subs, options) {
  if (subs.indexOf(fn) < 0) {
    options && options.prepend ? subs.unshift(fn) : subs.push(fn);
  }
  return function() {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  };
}
function resetStore(store, hot) {
  store._actions = /* @__PURE__ */ Object.create(null);
  store._mutations = /* @__PURE__ */ Object.create(null);
  store._wrappedGetters = /* @__PURE__ */ Object.create(null);
  store._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  var state = store.state;
  installModule(store, state, [], store._modules.root, true);
  resetStoreState(store, state, hot);
}
function resetStoreState(store, state, hot) {
  var oldState = store._state;
  var oldScope = store._scope;
  store.getters = {};
  store._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  var wrappedGetters = store._wrappedGetters;
  var computedObj = {};
  var computedCache = {};
  var scope = effectScope(true);
  scope.run(function() {
    forEachValue(wrappedGetters, function(fn, key) {
      computedObj[key] = partial(fn, store);
      computedCache[key] = computed(function() {
        return computedObj[key]();
      });
      Object.defineProperty(store.getters, key, {
        get: function() {
          return computedCache[key].value;
        },
        enumerable: true
        // for local getters
      });
    });
  });
  store._state = reactive({
    data: state
  });
  store._scope = scope;
  if (store.strict) {
    enableStrictMode(store);
  }
  if (oldState) {
    if (hot) {
      store._withCommit(function() {
        oldState.data = null;
      });
    }
  }
  if (oldScope) {
    oldScope.stop();
  }
}
function installModule(store, rootState, path, module2, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);
  if (module2.namespaced) {
    if (store._modulesNamespaceMap[namespace] && true) {
      console.error("[vuex] duplicate namespace " + namespace + " for the namespaced module " + path.join("/"));
    }
    store._modulesNamespaceMap[namespace] = module2;
  }
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function() {
      {
        if (moduleName in parentState) {
          console.warn(
            '[vuex] state field "' + moduleName + '" was overridden by a module with the same name at "' + path.join(".") + '"'
          );
        }
      }
      parentState[moduleName] = module2.state;
    });
  }
  var local = module2.context = makeLocalContext(store, namespace, path);
  module2.forEachMutation(function(mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });
  module2.forEachAction(function(action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });
  module2.forEachGetter(function(getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });
  module2.forEachChild(function(child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}
function makeLocalContext(store, namespace, path) {
  var noNamespace = namespace === "";
  var local = {
    dispatch: noNamespace ? store.dispatch : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;
      if (!options || !options.root) {
        type = namespace + type;
        if (!store._actions[type]) {
          console.error("[vuex] unknown local action type: " + args.type + ", global type: " + type);
          return;
        }
      }
      return store.dispatch(type, payload);
    },
    commit: noNamespace ? store.commit : function(_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;
      if (!options || !options.root) {
        type = namespace + type;
        if (!store._mutations[type]) {
          console.error("[vuex] unknown local mutation type: " + args.type + ", global type: " + type);
          return;
        }
      }
      store.commit(type, payload, options);
    }
  };
  Object.defineProperties(local, {
    getters: {
      get: noNamespace ? function() {
        return store.getters;
      } : function() {
        return makeLocalGetters(store, namespace);
      }
    },
    state: {
      get: function() {
        return getNestedState(store.state, path);
      }
    }
  });
  return local;
}
function makeLocalGetters(store, namespace) {
  if (!store._makeLocalGettersCache[namespace]) {
    var gettersProxy = {};
    var splitPos = namespace.length;
    Object.keys(store.getters).forEach(function(type) {
      if (type.slice(0, splitPos) !== namespace) {
        return;
      }
      var localType = type.slice(splitPos);
      Object.defineProperty(gettersProxy, localType, {
        get: function() {
          return store.getters[type];
        },
        enumerable: true
      });
    });
    store._makeLocalGettersCache[namespace] = gettersProxy;
  }
  return store._makeLocalGettersCache[namespace];
}
function registerMutation(store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler(payload) {
    handler.call(store, local.state, payload);
  });
}
function registerAction(store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler(payload) {
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
      return res.catch(function(err) {
        store._devtoolHook.emit("vuex:error", err);
        throw err;
      });
    } else {
      return res;
    }
  });
}
function registerGetter(store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    {
      console.error("[vuex] duplicate getter key: " + type);
    }
    return;
  }
  store._wrappedGetters[type] = function wrappedGetter(store2) {
    return rawGetter(
      local.state,
      // local state
      local.getters,
      // local getters
      store2.state,
      // root state
      store2.getters
      // root getters
    );
  };
}
function enableStrictMode(store) {
  watch(function() {
    return store._state.data;
  }, function() {
    {
      assert(store._committing, "do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, flush: "sync" });
}
function getNestedState(state, path) {
  return path.reduce(function(state2, key) {
    return state2[key];
  }, state);
}
function unifyObjectStyle(type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }
  {
    assert(typeof type === "string", "expects string as the type, but found " + typeof type + ".");
  }
  return { type, payload, options };
}
var Module = function Module2(rawModule, runtime) {
  this.runtime = runtime;
  this._children = /* @__PURE__ */ Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === "function" ? rawState() : rawState) || {};
};
var prototypeAccessors$1 = { namespaced: { configurable: true } };
prototypeAccessors$1.namespaced.get = function() {
  return !!this._rawModule.namespaced;
};
Module.prototype.addChild = function addChild(key, module2) {
  this._children[key] = module2;
};
Module.prototype.removeChild = function removeChild(key) {
  delete this._children[key];
};
Module.prototype.getChild = function getChild(key) {
  return this._children[key];
};
Module.prototype.hasChild = function hasChild(key) {
  return key in this._children;
};
Module.prototype.update = function update(rawModule) {
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
Module.prototype.forEachChild = function forEachChild(fn) {
  forEachValue(this._children, fn);
};
Module.prototype.forEachGetter = function forEachGetter(fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};
Module.prototype.forEachAction = function forEachAction(fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};
Module.prototype.forEachMutation = function forEachMutation(fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};
Object.defineProperties(Module.prototype, prototypeAccessors$1);
var ModuleCollection = function ModuleCollection2(rawRootModule) {
  this.register([], rawRootModule, false);
};
ModuleCollection.prototype.get = function get2(path) {
  return path.reduce(function(module2, key) {
    return module2.getChild(key);
  }, this.root);
};
ModuleCollection.prototype.getNamespace = function getNamespace(path) {
  var module2 = this.root;
  return path.reduce(function(namespace, key) {
    module2 = module2.getChild(key);
    return namespace + (module2.namespaced ? key + "/" : "");
  }, "");
};
ModuleCollection.prototype.update = function update$1(rawRootModule) {
  update2([], this.root, rawRootModule);
};
ModuleCollection.prototype.register = function register(path, rawModule, runtime) {
  var this$1$1 = this;
  if (runtime === void 0)
    runtime = true;
  {
    assertRawModule(path, rawModule);
  }
  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function(rawChildModule, key) {
      this$1$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};
ModuleCollection.prototype.unregister = function unregister(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  var child = parent.getChild(key);
  if (!child) {
    {
      console.warn(
        "[vuex] trying to unregister module '" + key + "', which is not registered"
      );
    }
    return;
  }
  if (!child.runtime) {
    return;
  }
  parent.removeChild(key);
};
ModuleCollection.prototype.isRegistered = function isRegistered(path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (parent) {
    return parent.hasChild(key);
  }
  return false;
};
function update2(path, targetModule, newModule) {
  {
    assertRawModule(path, newModule);
  }
  targetModule.update(newModule);
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, manual reload is needed"
          );
        }
        return;
      }
      update2(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}
var functionAssert = {
  assert: function(value) {
    return typeof value === "function";
  },
  expected: "function"
};
var objectAssert = {
  assert: function(value) {
    return typeof value === "function" || typeof value === "object" && typeof value.handler === "function";
  },
  expected: 'function or object with "handler" function'
};
var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};
function assertRawModule(path, rawModule) {
  Object.keys(assertTypes).forEach(function(key) {
    if (!rawModule[key]) {
      return;
    }
    var assertOptions = assertTypes[key];
    forEachValue(rawModule[key], function(value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}
function makeAssertionMessage(path, key, type, value, expected) {
  var buf = key + " should be " + expected + ' but "' + key + "." + type + '"';
  if (path.length > 0) {
    buf += ' in module "' + path.join(".") + '"';
  }
  buf += " is " + JSON.stringify(value) + ".";
  return buf;
}
function createStore(options) {
  return new Store(options);
}
var Store = function Store2(options) {
  var this$1$1 = this;
  if (options === void 0)
    options = {};
  {
    assert(typeof Promise !== "undefined", "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store2, "store must be called with the new operator.");
  }
  var plugins = options.plugins;
  if (plugins === void 0)
    plugins = [];
  var strict = options.strict;
  if (strict === void 0)
    strict = false;
  var devtools2 = options.devtools;
  this._committing = false;
  this._actions = /* @__PURE__ */ Object.create(null);
  this._actionSubscribers = [];
  this._mutations = /* @__PURE__ */ Object.create(null);
  this._wrappedGetters = /* @__PURE__ */ Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = /* @__PURE__ */ Object.create(null);
  this._subscribers = [];
  this._makeLocalGettersCache = /* @__PURE__ */ Object.create(null);
  this._scope = null;
  this._devtools = devtools2;
  var store = this;
  var ref2 = this;
  var dispatch2 = ref2.dispatch;
  var commit2 = ref2.commit;
  this.dispatch = function boundDispatch(type, payload) {
    return dispatch2.call(store, type, payload);
  };
  this.commit = function boundCommit(type, payload, options2) {
    return commit2.call(store, type, payload, options2);
  };
  this.strict = strict;
  var state = this._modules.root.state;
  installModule(this, state, [], this._modules.root);
  resetStoreState(this, state);
  plugins.forEach(function(plugin2) {
    return plugin2(this$1$1);
  });
};
var prototypeAccessors = { state: { configurable: true } };
Store.prototype.install = function install(app, injectKey) {
  app.provide(injectKey || storeKey, this);
  app.config.globalProperties.$store = this;
  this._devtools !== void 0 ? this._devtools : true;
};
prototypeAccessors.state.get = function() {
  return this._state.data;
};
prototypeAccessors.state.set = function(v) {
  {
    assert(false, "use store.replaceState() to explicit replace store state.");
  }
};
Store.prototype.commit = function commit(_type, _payload, _options) {
  var this$1$1 = this;
  var ref2 = unifyObjectStyle(_type, _payload, _options);
  var type = ref2.type;
  var payload = ref2.payload;
  var options = ref2.options;
  var mutation = { type, payload };
  var entry = this._mutations[type];
  if (!entry) {
    {
      console.error("[vuex] unknown mutation type: " + type);
    }
    return;
  }
  this._withCommit(function() {
    entry.forEach(function commitIterator(handler) {
      handler(payload);
    });
  });
  this._subscribers.slice().forEach(function(sub) {
    return sub(mutation, this$1$1.state);
  });
  if (options && options.silent) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. Use the filter functionality in the vue-devtools"
    );
  }
};
Store.prototype.dispatch = function dispatch(_type, _payload) {
  var this$1$1 = this;
  var ref2 = unifyObjectStyle(_type, _payload);
  var type = ref2.type;
  var payload = ref2.payload;
  var action = { type, payload };
  var entry = this._actions[type];
  if (!entry) {
    {
      console.error("[vuex] unknown action type: " + type);
    }
    return;
  }
  try {
    this._actionSubscribers.slice().filter(function(sub) {
      return sub.before;
    }).forEach(function(sub) {
      return sub.before(action, this$1$1.state);
    });
  } catch (e2) {
    {
      console.warn("[vuex] error in before action subscribers: ");
      console.error(e2);
    }
  }
  var result = entry.length > 1 ? Promise.all(entry.map(function(handler) {
    return handler(payload);
  })) : entry[0](payload);
  return new Promise(function(resolve2, reject) {
    result.then(function(res) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.after;
        }).forEach(function(sub) {
          return sub.after(action, this$1$1.state);
        });
      } catch (e2) {
        {
          console.warn("[vuex] error in after action subscribers: ");
          console.error(e2);
        }
      }
      resolve2(res);
    }, function(error) {
      try {
        this$1$1._actionSubscribers.filter(function(sub) {
          return sub.error;
        }).forEach(function(sub) {
          return sub.error(action, this$1$1.state, error);
        });
      } catch (e2) {
        {
          console.warn("[vuex] error in error action subscribers: ");
          console.error(e2);
        }
      }
      reject(error);
    });
  });
};
Store.prototype.subscribe = function subscribe(fn, options) {
  return genericSubscribe(fn, this._subscribers, options);
};
Store.prototype.subscribeAction = function subscribeAction(fn, options) {
  var subs = typeof fn === "function" ? { before: fn } : fn;
  return genericSubscribe(subs, this._actionSubscribers, options);
};
Store.prototype.watch = function watch$1(getter, cb, options) {
  var this$1$1 = this;
  {
    assert(typeof getter === "function", "store.watch only accepts a function.");
  }
  return watch(function() {
    return getter(this$1$1.state, this$1$1.getters);
  }, cb, Object.assign({}, options));
};
Store.prototype.replaceState = function replaceState(state) {
  var this$1$1 = this;
  this._withCommit(function() {
    this$1$1._state.data = state;
  });
};
Store.prototype.registerModule = function registerModule(path, rawModule, options) {
  if (options === void 0)
    options = {};
  if (typeof path === "string") {
    path = [path];
  }
  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, "cannot register the root module by using registerModule.");
  }
  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  resetStoreState(this, this.state);
};
Store.prototype.unregisterModule = function unregisterModule(path) {
  var this$1$1 = this;
  if (typeof path === "string") {
    path = [path];
  }
  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }
  this._modules.unregister(path);
  this._withCommit(function() {
    var parentState = getNestedState(this$1$1.state, path.slice(0, -1));
    delete parentState[path[path.length - 1]];
  });
  resetStore(this);
};
Store.prototype.hasModule = function hasModule(path) {
  if (typeof path === "string") {
    path = [path];
  }
  {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }
  return this._modules.isRegistered(path);
};
Store.prototype.hotUpdate = function hotUpdate(newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};
Store.prototype._withCommit = function _withCommit(fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};
Object.defineProperties(Store.prototype, prototypeAccessors);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var mock_mpExports = {};
var mock_mp = {
  get exports() {
    return mock_mpExports;
  },
  set exports(v) {
    mock_mpExports = v;
  }
};
(function(module2, exports2) {
  (function(global2, factory) {
    module2.exports = factory();
  })(commonjsGlobal, function() {
    var constant = {
      GUID: 1,
      RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
      RE_TRANSFER_TYPE: /#(.*)$/,
      RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
      RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g
    };
    var type = function(value) {
      return isDef(value) ? Object.prototype.toString.call(value).match(/\[object (\w+)\]/)[1].toLowerCase() : String(value);
    };
    var isDef = function(value) {
      return value !== void 0 && value !== null;
    };
    var isString2 = function(value) {
      return type(value) === "string";
    };
    var isNumber = function(value) {
      return type(value) === "number";
    };
    var isObject2 = function(value) {
      return type(value) === "object";
    };
    var isArray2 = function(value) {
      return type(value) === "array";
    };
    var isRegExp = function(value) {
      return type(value) === "regexp";
    };
    var isFunction2 = function(value) {
      return type(value) === "function";
    };
    var keys = function(obj) {
      var keys2 = [];
      for (var key2 in obj) {
        if (obj.hasOwnProperty(key2)) {
          keys2.push(key2);
        }
      }
      return keys2;
    };
    var values = function(obj) {
      var values2 = [];
      for (var key2 in obj) {
        if (obj.hasOwnProperty(key2)) {
          values2.push(obj[key2]);
        }
      }
      return values2;
    };
    var heredoc = function(fn) {
      return fn.toString().replace(/^[^\/]+\/\*!?/, "").replace(/\*\/[^\/]+$/, "").replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
    };
    var noop = function() {
    };
    var assert2 = function(condition, error) {
      if (!condition) {
        throw new Error("[better-mock] " + error);
      }
    };
    var createCustomEvent = function(type2, bubbles2, cancelable, detail) {
      if (bubbles2 === void 0) {
        bubbles2 = false;
      }
      if (cancelable === void 0) {
        cancelable = false;
      }
      try {
        return new CustomEvent(type2, {
          bubbles: bubbles2,
          cancelable,
          detail
        });
      } catch (e2) {
        var event_1 = document.createEvent("CustomEvent");
        event_1.initCustomEvent(type2, bubbles2, cancelable, detail);
        return event_1;
      }
    };
    var Util = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      type,
      isDef,
      isString: isString2,
      isNumber,
      isObject: isObject2,
      isArray: isArray2,
      isRegExp,
      isFunction: isFunction2,
      keys,
      values,
      heredoc,
      noop,
      assert: assert2,
      createCustomEvent
    });
    /*! *****************************************************************************
    	  Copyright (c) Microsoft Corporation. All rights reserved.
    	  Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    	  this file except in compliance with the License. You may obtain a copy of the
    	  License at http://www.apache.org/licenses/LICENSE-2.0
    
    	  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    	  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    	  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    	  MERCHANTABLITY OR NON-INFRINGEMENT.
    
    	  See the Apache Version 2.0 License for specific language governing permissions
    	  and limitations under the License.
    	  ***************************************************************************** */
    var __assign = function() {
      __assign = Object.assign || function __assign2(t2) {
        for (var s2, i = 1, n2 = arguments.length; i < n2; i++) {
          s2 = arguments[i];
          for (var p2 in s2)
            if (Object.prototype.hasOwnProperty.call(s2, p2))
              t2[p2] = s2[p2];
        }
        return t2;
      };
      return __assign.apply(this, arguments);
    };
    function __spreadArrays() {
      for (var s2 = 0, i = 0, il = arguments.length; i < il; i++)
        s2 += arguments[i].length;
      for (var r = Array(s2), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
          r[k] = a[j];
      return r;
    }
    var MAX_NATURE_NUMBER = 9007199254740992;
    var MIN_NATURE_NUMBER = -9007199254740992;
    var boolean = function(min, max, current) {
      if (min === void 0) {
        min = 1;
      }
      if (max === void 0) {
        max = 1;
      }
      if (isDef(current)) {
        if (isDef(min)) {
          min = !isNaN(min) ? parseInt(min.toString(), 10) : 1;
        }
        if (isDef(max)) {
          max = !isNaN(max) ? parseInt(max.toString(), 10) : 1;
        }
        return Math.random() > 1 / (min + max) * min ? !current : current;
      }
      return Math.random() >= 0.5;
    };
    var bool = boolean;
    var natural = function(min, max) {
      if (min === void 0) {
        min = 0;
      }
      if (max === void 0) {
        max = MAX_NATURE_NUMBER;
      }
      min = parseInt(min.toString(), 10);
      max = parseInt(max.toString(), 10);
      return Math.round(Math.random() * (max - min)) + min;
    };
    var integer = function(min, max) {
      if (min === void 0) {
        min = MIN_NATURE_NUMBER;
      }
      if (max === void 0) {
        max = MAX_NATURE_NUMBER;
      }
      min = parseInt(min.toString(), 10);
      max = parseInt(max.toString(), 10);
      return Math.round(Math.random() * (max - min)) + min;
    };
    var int = integer;
    var float = function(min, max, dmin, dmax) {
      dmin = isDef(dmin) ? dmin : 0;
      dmin = Math.max(Math.min(dmin, 17), 0);
      dmax = isDef(dmax) ? dmax : 17;
      dmax = Math.max(Math.min(dmax, 17), 0);
      var ret = integer(min, max) + ".";
      for (var i = 0, dcount = natural(dmin, dmax); i < dcount; i++) {
        var num = i < dcount - 1 ? character("number") : character("123456789");
        ret += num;
      }
      return parseFloat(ret);
    };
    var character = function(pool) {
      if (pool === void 0) {
        pool = "";
      }
      var lower2 = "abcdefghijklmnopqrstuvwxyz";
      var upper2 = lower2.toUpperCase();
      var number2 = "0123456789";
      var symbol = "!@#$%^&*()[]";
      var pools = {
        lower: lower2,
        upper: upper2,
        number: number2,
        symbol,
        alpha: lower2 + upper2
      };
      if (!pool) {
        pool = lower2 + upper2 + number2 + symbol;
      } else {
        pool = pools[pool.toLowerCase()] || pool;
      }
      return pool.charAt(natural(0, pool.length - 1));
    };
    var char = character;
    var string = function(pool, min, max) {
      var len;
      switch (arguments.length) {
        case 0:
          len = natural(3, 7);
          break;
        case 1:
          len = pool;
          pool = void 0;
          break;
        case 2:
          if (typeof arguments[0] === "string") {
            len = min;
          } else {
            len = natural(pool, min);
            pool = void 0;
          }
          break;
        case 3:
          len = natural(min, max);
          break;
      }
      var text2 = "";
      for (var i = 0; i < len; i++) {
        text2 += character(pool);
      }
      return text2;
    };
    var str = string;
    var range = function(start, stop, step) {
      if (step === void 0) {
        step = 1;
      }
      if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
      }
      start = +start;
      stop = +stop;
      step = +step;
      var idx = 0;
      var len = Math.max(Math.ceil((stop - start) / step), 0);
      var range2 = new Array(len);
      while (idx < len) {
        range2[idx++] = start;
        start += step;
      }
      return range2;
    };
    var basic = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      boolean,
      bool,
      natural,
      integer,
      int,
      float,
      character,
      char,
      string,
      str,
      range
    });
    var _padZero = function(value) {
      return value < 10 ? "0" + value : value.toString();
    };
    var patternLetters = {
      yyyy: "getFullYear",
      yy: function(date2) {
        return date2.getFullYear().toString().slice(2);
      },
      y: "yy",
      MM: function(date2) {
        return _padZero(date2.getMonth() + 1);
      },
      M: function(date2) {
        return (date2.getMonth() + 1).toString();
      },
      dd: function(date2) {
        return _padZero(date2.getDate());
      },
      d: "getDate",
      HH: function(date2) {
        return _padZero(date2.getHours());
      },
      H: "getHours",
      hh: function(date2) {
        return _padZero(date2.getHours() % 12);
      },
      h: function(date2) {
        return (date2.getHours() % 12).toString();
      },
      mm: function(date2) {
        return _padZero(date2.getMinutes());
      },
      m: "getMinutes",
      ss: function(date2) {
        return _padZero(date2.getSeconds());
      },
      s: "getSeconds",
      SS: function(date2) {
        var ms = date2.getMilliseconds();
        return ms < 10 && "00" + ms || ms < 100 && "0" + ms || ms.toString();
      },
      S: "getMilliseconds",
      A: function(date2) {
        return date2.getHours() < 12 ? "AM" : "PM";
      },
      a: function(date2) {
        return date2.getHours() < 12 ? "am" : "pm";
      },
      T: "getTime"
    };
    var _createFormatRE = function() {
      var re = keys(patternLetters);
      return "(" + re.join("|") + ")";
    };
    var _formatDate = function(date2, format) {
      var formatRE = new RegExp(_createFormatRE(), "g");
      return format.replace(formatRE, function createNewSubString($0, flag) {
        return typeof patternLetters[flag] === "function" ? patternLetters[flag](date2) : patternLetters[flag] in patternLetters ? createNewSubString($0, patternLetters[flag]) : date2[patternLetters[flag]]();
      });
    };
    var _randomDate = function(min, max) {
      if (min === void 0) {
        min = /* @__PURE__ */ new Date(0);
      }
      if (max === void 0) {
        max = /* @__PURE__ */ new Date();
      }
      var randomTS = Math.random() * (max.getTime() - min.getTime());
      return new Date(randomTS);
    };
    var date = function(format) {
      if (format === void 0) {
        format = "yyyy-MM-dd";
      }
      return _formatDate(_randomDate(), format);
    };
    var time = function(format) {
      if (format === void 0) {
        format = "HH:mm:ss";
      }
      return _formatDate(_randomDate(), format);
    };
    var datetime = function(format) {
      if (format === void 0) {
        format = "yyyy-MM-dd HH:mm:ss";
      }
      return _formatDate(_randomDate(), format);
    };
    var timestamp = function() {
      return Number(_formatDate(_randomDate(), "T"));
    };
    var now = function(unit, format) {
      if (arguments.length === 1) {
        if (!/year|month|day|hour|minute|second|week/.test(unit)) {
          format = unit;
          unit = "";
        }
      }
      unit = (unit || "").toLowerCase();
      format = format || "yyyy-MM-dd HH:mm:ss";
      var date2 = /* @__PURE__ */ new Date();
      switch (unit) {
        case "year":
          date2.setMonth(0);
          break;
        case "month":
          date2.setDate(1);
          break;
        case "week":
          date2.setDate(date2.getDate() - date2.getDay());
          break;
        case "day":
          date2.setHours(0);
          break;
        case "hour":
          date2.setMinutes(0);
          break;
        case "minute":
          date2.setSeconds(0);
          break;
        case "second":
          date2.setMilliseconds(0);
      }
      return _formatDate(date2, format);
    };
    var date$1 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      date,
      time,
      datetime,
      timestamp,
      now
    });
    var capitalize2 = function(word2) {
      word2 = word2 + "";
      return word2.charAt(0).toUpperCase() + word2.substr(1);
    };
    var upper = function(str2) {
      return (str2 + "").toUpperCase();
    };
    var lower = function(str2) {
      return (str2 + "").toLowerCase();
    };
    var pickOne = function(arr) {
      return arr[natural(0, arr.length - 1)];
    };
    function pick(arr, min, max) {
      if (min === void 0) {
        min = 1;
      }
      if (!isArray2(arr)) {
        return pickOne(Array.from(arguments));
      }
      if (!isDef(max)) {
        max = min;
      }
      if (min === 1 && max === 1) {
        return pickOne(arr);
      }
      return shuffle(arr, min, max);
    }
    var pickMap = function(map) {
      return pick(values(map));
    };
    var shuffle = function(arr, min, max) {
      if (!Array.isArray(arr)) {
        return [];
      }
      var copy = arr.slice();
      var length = arr.length;
      for (var i = 0; i < length; i++) {
        var swapIndex = natural(0, length - 1);
        var swapValue = copy[swapIndex];
        copy[swapIndex] = copy[i];
        copy[i] = swapValue;
      }
      if (min && max) {
        return copy.slice(0, natural(min, max));
      }
      if (min) {
        return copy.slice(0, min);
      }
      return copy;
    };
    var helper = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      capitalize: capitalize2,
      upper,
      lower,
      pickOne,
      pick,
      pickMap,
      shuffle
    });
    var imageSize = [
      "150x100",
      "300x200",
      "400x300",
      "600x450",
      "800x600",
      "100x150",
      "200x300",
      "300x400",
      "450x600",
      "600x800",
      "100x100",
      "200x200",
      "300x300",
      "450x450",
      "600x600"
    ];
    var image = function(size2, background, foreground, format, text2) {
      if (size2 === void 0) {
        size2 = "";
      }
      if (background === void 0) {
        background = "";
      }
      if (foreground === void 0) {
        foreground = "";
      }
      if (format === void 0) {
        format = "";
      }
      if (text2 === void 0) {
        text2 = "";
      }
      if (arguments.length === 4) {
        text2 = format;
        format = "";
      }
      if (arguments.length === 3) {
        text2 = foreground;
        foreground = "";
      }
      if (arguments.length === 2) {
        text2 = background;
        background = "";
      }
      size2 = size2 || pick(imageSize);
      if (background && ~background.indexOf("#")) {
        background = background.slice(1);
      }
      if (foreground && ~foreground.indexOf("#")) {
        foreground = foreground.slice(1);
      }
      return format ? "https://dummyimage.com/" + size2 + (background ? "/" + background : "") + (foreground ? "/" + foreground : "") + (format ? "." + format : "") + (text2 ? "?text=" + encodeURIComponent(text2) : "") : "https://iph.href.lu/" + size2 + "?bg=" + background + "&fg=" + foreground + "&text=" + text2;
    };
    var img = image;
    var dataImage = function(size2, text2) {
      size2 = size2 || pick(imageSize);
      pick([
        "#171515",
        "#e47911",
        "#183693",
        "#720e9e",
        "#c4302b",
        "#dd4814",
        "#00acee",
        "#0071c5",
        "#3d9ae8",
        "#ec6231",
        "#003580",
        "#e51937"
      ]);
      var sizes = size2.split("x");
      var width = parseInt(sizes[0], 10);
      var height = parseInt(sizes[1], 10);
      assert2(isNumber(width) && isNumber(height), "Invalid size, expected INTxINT, e.g. 300x400");
      {
        return "";
      }
    };
    var image$1 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      image,
      img,
      dataImage
    });
    var hsv2rgb = function hsv2rgb2(hsv) {
      var h = hsv[0] / 60;
      var s2 = hsv[1] / 100;
      var v = hsv[2] / 100;
      var hi = Math.floor(h) % 6;
      var f2 = h - Math.floor(h);
      var p2 = 255 * v * (1 - s2);
      var q = 255 * v * (1 - s2 * f2);
      var t2 = 255 * v * (1 - s2 * (1 - f2));
      v = 255 * v;
      switch (hi) {
        case 0:
          return [v, t2, p2];
        case 1:
          return [q, v, p2];
        case 2:
          return [p2, v, t2];
        case 3:
          return [p2, q, v];
        case 4:
          return [t2, p2, v];
        case 5:
          return [v, p2, q];
      }
    };
    var hsv2hsl = function hsv2hsl2(hsv) {
      var h = hsv[0], s2 = hsv[1] / 100, v = hsv[2] / 100, sl, l;
      l = (2 - s2) * v;
      sl = s2 * v;
      sl /= l <= 1 ? l : 2 - l;
      l /= 2;
      return [h, sl * 100, l * 100];
    };
    var rgb2hex = function(a, b, c) {
      return "#" + ((256 + a << 8 | b) << 8 | c).toString(16).slice(1);
    };
    var colorMap = {
      navy: "#001F3F",
      blue: "#0074D9",
      aqua: "#7FDBFF",
      teal: "#39CCCC",
      olive: "#3D9970",
      green: "#2ECC40",
      lime: "#01FF70",
      yellow: "#FFDC00",
      orange: "#FF851B",
      red: "#FF4136",
      maroon: "#85144B",
      fuchsia: "#F012BE",
      purple: "#B10DC9",
      silver: "#DDDDDD",
      gray: "#AAAAAA",
      black: "#111111",
      white: "#FFFFFF"
    };
    var color = function(name2) {
      if (name2 === void 0) {
        name2 = "";
      }
      if (name2 && colorMap[name2]) {
        return colorMap[name2];
      }
      return hex();
    };
    var hex = function() {
      var hsv = _goldenRatioColor();
      var rgb2 = hsv2rgb(hsv);
      return rgb2hex(rgb2[0], rgb2[1], rgb2[2]);
    };
    var rgb = function() {
      var hsv = _goldenRatioColor();
      var rgb2 = hsv2rgb(hsv);
      return "rgb(" + parseInt(rgb2[0].toString(), 10) + ", " + parseInt(rgb2[1].toString(), 10) + ", " + parseInt(rgb2[2].toString(), 10) + ")";
    };
    var rgba = function() {
      var hsv = _goldenRatioColor();
      var rgb2 = hsv2rgb(hsv);
      return "rgba(" + parseInt(rgb2[0].toString(), 10) + ", " + parseInt(rgb2[1].toString(), 10) + ", " + parseInt(rgb2[2].toString(), 10) + ", " + Math.random().toFixed(2) + ")";
    };
    var hsl = function() {
      var hsv = _goldenRatioColor();
      var hsl2 = hsv2hsl(hsv);
      return "hsl(" + parseInt(hsl2[0], 10) + ", " + parseInt(hsl2[1], 10) + ", " + parseInt(hsl2[2], 10) + ")";
    };
    var _hue = 0;
    var _goldenRatioColor = function(saturation, value) {
      var _goldenRatio = 0.618033988749895;
      _hue = _hue || Math.random();
      _hue += _goldenRatio;
      _hue %= 1;
      if (typeof saturation !== "number")
        saturation = 0.5;
      if (typeof value !== "number")
        value = 0.95;
      return [
        _hue * 360,
        saturation * 100,
        value * 100
      ];
    };
    var color$1 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      color,
      hex,
      rgb,
      rgba,
      hsl
    });
    var rsAstralRange = "\\ud800-\\udfff";
    var rsComboMarksRange = "\\u0300-\\u036f";
    var reComboHalfMarksRange = "\\ufe20-\\ufe2f";
    var rsComboSymbolsRange = "\\u20d0-\\u20ff";
    var rsComboMarksExtendedRange = "\\u1ab0-\\u1aff";
    var rsComboMarksSupplementRange = "\\u1dc0-\\u1dff";
    var rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange + rsComboMarksExtendedRange + rsComboMarksSupplementRange;
    var rsVarRange = "\\ufe0e\\ufe0f";
    var rsZWJ = "\\u200d";
    var rsAstral = "[" + rsAstralRange + "]";
    var rsCombo = "[" + rsComboRange + "]";
    var rsFitz = "\\ud83c[\\udffb-\\udfff]";
    var rsModifier = "(?:" + rsCombo + "|" + rsFitz + ")";
    var rsNonAstral = "[^" + rsAstralRange + "]";
    var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
    var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
    var reOptMod = rsModifier + "?";
    var rsOptVar = "[" + rsVarRange + "]?";
    var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + (rsOptVar + reOptMod) + ")*";
    var rsSeq = rsOptVar + reOptMod + rsOptJoin;
    var rsNonAstralCombo = "" + rsNonAstral + rsCombo + "?";
    var rsSymbol = "(?:" + [rsNonAstralCombo, rsCombo, rsRegional, rsSurrPair, rsAstral].join("|") + ")";
    var reUnicode = RegExp(rsFitz + "(?=" + rsFitz + ")|" + (rsSymbol + rsSeq), "g");
    var reHasUnicode = RegExp("[" + (rsZWJ + rsAstralRange + rsComboRange + rsVarRange) + "]");
    function hasUnicode(string2) {
      return reHasUnicode.test(string2);
    }
    function asciiToArray(string2) {
      return string2.split("");
    }
    function unicodeToArray(string2) {
      return string2.match(reUnicode) || [];
    }
    function stringToArray(string2) {
      return hasUnicode(string2) ? unicodeToArray(string2) : asciiToArray(string2);
    }
    var _range = function(defaultMin, defaultMax, min, max) {
      return !isDef(min) ? natural(defaultMin, defaultMax) : !isDef(max) ? min : natural(parseInt(min.toString(), 10), parseInt(max.toString(), 10));
    };
    var paragraph = function(min, max) {
      var len = _range(3, 7, min, max);
      var result = [];
      for (var i = 0; i < len; i++) {
        result.push(sentence());
      }
      return result.join(" ");
    };
    var cparagraph = function(min, max) {
      var len = _range(3, 7, min, max);
      var result = [];
      for (var i = 0; i < len; i++) {
        result.push(csentence());
      }
      return result.join("");
    };
    var sentence = function(min, max) {
      var len = _range(12, 18, min, max);
      var result = [];
      for (var i = 0; i < len; i++) {
        result.push(word());
      }
      return capitalize2(result.join(" ")) + ".";
    };
    var csentence = function(min, max) {
      var len = _range(12, 18, min, max);
      var result = [];
      for (var i = 0; i < len; i++) {
        result.push(cword());
      }
      return result.join("") + "。";
    };
    var word = function(min, max) {
      var len = _range(3, 10, min, max);
      var result = "";
      for (var i = 0; i < len; i++) {
        result += character("lower");
      }
      return result;
    };
    var cword = function(pool, min, max) {
      if (pool === void 0) {
        pool = "";
      }
      var cnWords = "的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞";
      var len;
      switch (arguments.length) {
        case 0:
          pool = cnWords;
          len = 1;
          break;
        case 1:
          if (typeof arguments[0] === "string") {
            len = 1;
          } else {
            len = pool;
            pool = cnWords;
          }
          break;
        case 2:
          if (typeof arguments[0] === "string") {
            len = min;
          } else {
            len = natural(parseInt(pool, 10), min);
            pool = cnWords;
          }
          break;
        case 3:
          len = natural(min, max);
          break;
      }
      var result = "";
      for (var i = 0; i < len; i++) {
        result += pool.charAt(natural(0, pool.length - 1));
      }
      return result;
    };
    var emoji = function(pool, min, max) {
      if (!["string", "number", "undefined"].includes(typeof pool)) {
        return "";
      }
      var emojis = "😀😁😂😃😄😅😆😉😊😋😎😍😘😗😙😚☺😇😐😑😶😏😣😥😮😯😪😫😴😌😛😜😝😒😓😔😕😲😷😖😞😟😤😢😭😦😧😨😬😰😱😳😵😡😠😈👿👹👺💀👻👽👦👧👨👩👴👵👶👱👮👲👳👷👸💂🎅👰👼💆💇🙍🙎🙅🙆💁🙋🙇🙌🙏👤👥🚶🏃👯💃👫👬👭💏💑👪💪👈👉☝👆👇✌✋👌👍👎✊👊👋👏👐✍👣👀👂👃👅👄💋👓👔👕👖👗👘👙👚👛👜👝🎒💼👞👟👠👡👢👑👒🎩🎓💄💅💍🌂🙈🙉🙊🐵🐒🐶🐕🐩🐺🐱😺😸😹😻😼😽🙀😿😾🐈🐯🐅🐆🐴🐎🐮🐂🐃🐄🐷🐖🐗🐽🐏🐑🐐🐪🐫🐘🐭🐁🐀🐹🐰🐇🐻🐨🐼🐾🐔🐓🐣🐤🐥🐦🐧🐸🐊🐢🐍🐲🐉🐳🐋🐬🐟🐠🐡🐙🐚🐌🐛🐜🐝🐞💐🌸💮🌹🌺🌻🌼🌷🌱🌲🌳🌴🌵🌾🌿🍀🍁🍂🍃🌍🌎🌏🌐🌑🌒🌓🌔🌕🌖🌗🌘🌙🌚🌛🌜☀🌝🌞⭐🌟🌠☁⛅☔⚡❄🔥💧🌊💩🍇🍈🍉🍊🍋🍌🍍🍎🍏🍐🍑🍒🍓🍅🍆🌽🍄🌰🍞🍖🍗🍔🍟🍕🍳🍲🍱🍘🍙🍚🍛🍜🍝🍠🍢🍣🍤🍥🍡🍦🍧🍨🍩🍪🎂🍰🍫🍬🍭🍮🍯🍼☕🍵🍶🍷🍸🍹🍺🍻🍴";
      var array = stringToArray(emojis);
      if (typeof pool === "string") {
        array = stringToArray(pool);
      } else if (typeof pool === "number") {
        max = min;
        min = pool;
      }
      if (min === void 0 || min < 2) {
        return pick(array);
      }
      return pick(array, min, max).join("");
    };
    var title = function(min, max) {
      var len = _range(3, 7, min, max);
      var result = [];
      for (var i = 0; i < len; i++) {
        result.push(capitalize2(word()));
      }
      return result.join(" ");
    };
    var ctitle = function(min, max) {
      var len = _range(3, 7, min, max);
      var result = [];
      for (var i = 0; i < len; i++) {
        result.push(cword());
      }
      return result.join("");
    };
    var text = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      paragraph,
      cparagraph,
      sentence,
      csentence,
      word,
      cword,
      emoji,
      title,
      ctitle
    });
    var first = function() {
      var male = [
        "James",
        "John",
        "Robert",
        "Michael",
        "William",
        "David",
        "Richard",
        "Charles",
        "Joseph",
        "Thomas",
        "Christopher",
        "Daniel",
        "Paul",
        "Mark",
        "Donald",
        "George",
        "Kenneth",
        "Steven",
        "Edward",
        "Brian",
        "Ronald",
        "Anthony",
        "Kevin",
        "Jason",
        "Matthew",
        "Gary",
        "Timothy",
        "Jose",
        "Larry",
        "Jeffrey",
        "Frank",
        "Scott",
        "Eric"
      ];
      var female = [
        "Mary",
        "Patricia",
        "Linda",
        "Barbara",
        "Elizabeth",
        "Jennifer",
        "Maria",
        "Susan",
        "Margaret",
        "Dorothy",
        "Lisa",
        "Nancy",
        "Karen",
        "Betty",
        "Helen",
        "Sandra",
        "Donna",
        "Carol",
        "Ruth",
        "Sharon",
        "Michelle",
        "Laura",
        "Sarah",
        "Kimberly",
        "Deborah",
        "Jessica",
        "Shirley",
        "Cynthia",
        "Angela",
        "Melissa",
        "Brenda",
        "Amy",
        "Anna"
      ];
      return pick(__spreadArrays(male, female));
    };
    var last = function() {
      var names = [
        "Smith",
        "Johnson",
        "Williams",
        "Brown",
        "Jones",
        "Miller",
        "Davis",
        "Garcia",
        "Rodriguez",
        "Wilson",
        "Martinez",
        "Anderson",
        "Taylor",
        "Thomas",
        "Hernandez",
        "Moore",
        "Martin",
        "Jackson",
        "Thompson",
        "White",
        "Lopez",
        "Lee",
        "Gonzalez",
        "Harris",
        "Clark",
        "Lewis",
        "Robinson",
        "Walker",
        "Perez",
        "Hall",
        "Young",
        "Allen"
      ];
      return pick(names);
    };
    var name = function(middle) {
      if (middle === void 0) {
        middle = false;
      }
      return first() + " " + (middle ? first() + " " : "") + last();
    };
    var cfirst = function() {
      var names = [
        "王",
        "李",
        "张",
        "刘",
        "陈",
        "杨",
        "赵",
        "黄",
        "周",
        "吴",
        "徐",
        "孙",
        "胡",
        "朱",
        "高",
        "林",
        "何",
        "郭",
        "马",
        "罗",
        "梁",
        "宋",
        "郑",
        "谢",
        "韩",
        "唐",
        "冯",
        "于",
        "董",
        "萧",
        "程",
        "曹",
        "袁",
        "邓",
        "许",
        "傅",
        "沈",
        "曾",
        "彭",
        "吕",
        "苏",
        "卢",
        "蒋",
        "蔡",
        "贾",
        "丁",
        "魏",
        "薛",
        "叶",
        "阎",
        "余",
        "潘",
        "杜",
        "戴",
        "夏",
        "锺",
        "汪",
        "田",
        "任",
        "姜",
        "范",
        "方",
        "石",
        "姚",
        "谭",
        "廖",
        "邹",
        "熊",
        "金",
        "陆",
        "郝",
        "孔",
        "白",
        "崔",
        "康",
        "毛",
        "邱",
        "秦",
        "江",
        "史",
        "顾",
        "侯",
        "邵",
        "孟",
        "龙",
        "万",
        "段",
        "雷",
        "钱",
        "汤",
        "尹",
        "黎",
        "易",
        "常",
        "武",
        "乔",
        "贺",
        "赖",
        "龚",
        "文"
      ];
      return pick(names);
    };
    var clast = function() {
      var names = [
        "伟",
        "芳",
        "娜",
        "秀英",
        "敏",
        "静",
        "丽",
        "强",
        "磊",
        "军",
        "洋",
        "勇",
        "艳",
        "杰",
        "娟",
        "涛",
        "明",
        "超",
        "秀兰",
        "霞",
        "平",
        "刚",
        "桂英"
      ];
      return pick(names);
    };
    var cname = function() {
      return cfirst() + clast();
    };
    var name$1 = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      first,
      last,
      name,
      cfirst,
      clast,
      cname
    });
    var url = function(_protocol, host2) {
      if (_protocol === void 0) {
        _protocol = protocol();
      }
      if (host2 === void 0) {
        host2 = domain();
      }
      return _protocol + "://" + host2 + "/" + word();
    };
    var protocol = function() {
      var protocols2 = [
        "http",
        "ftp",
        "gopher",
        "mailto",
        "mid",
        "cid",
        "news",
        "nntp",
        "prospero",
        "telnet",
        "rlogin",
        "tn3270",
        "wais"
      ];
      return pick(protocols2);
    };
    var domain = function(_tld) {
      if (_tld === void 0) {
        _tld = tld();
      }
      return word() + "." + _tld;
    };
    var tld = function() {
      var tlds = (
        // 域名后缀
        "com net org edu gov int mil cn com.cn net.cn gov.cn org.cn 中国 中国互联.公司 中国互联.网络 tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw".split(" ")
      );
      return pick(tlds);
    };
    var email = function(_domain) {
      if (_domain === void 0) {
        _domain = domain();
      }
      return character("lower") + "." + word() + "@" + _domain;
    };
    var ip = function() {
      return natural(0, 255) + "." + natural(0, 255) + "." + natural(0, 255) + "." + natural(0, 255);
    };
    var web = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      url,
      protocol,
      domain,
      tld,
      email,
      ip
    });
    var location = {
      "110000": {
        code: "110000",
        name: "北京市",
        cities: {
          "110000": {
            code: "110000",
            name: "北京市",
            districts: {
              "110101": "东城区",
              "110102": "西城区",
              "110105": "朝阳区",
              "110106": "丰台区",
              "110107": "石景山区",
              "110108": "海淀区",
              "110109": "门头沟区",
              "110111": "房山区",
              "110112": "通州区",
              "110113": "顺义区",
              "110114": "昌平区",
              "110115": "大兴区",
              "110116": "怀柔区",
              "110117": "平谷区",
              "110118": "密云区",
              "110119": "延庆区"
            }
          }
        }
      },
      "120000": {
        code: "120000",
        name: "天津市",
        cities: {
          "120000": {
            code: "120000",
            name: "天津市",
            districts: {
              "120101": "和平区",
              "120102": "河东区",
              "120103": "河西区",
              "120104": "南开区",
              "120105": "河北区",
              "120106": "红桥区",
              "120110": "东丽区",
              "120111": "西青区",
              "120112": "津南区",
              "120113": "北辰区",
              "120114": "武清区",
              "120115": "宝坻区",
              "120116": "滨海新区",
              "120117": "宁河区",
              "120118": "静海区",
              "120119": "蓟州区"
            }
          }
        }
      },
      "130000": {
        code: "130000",
        name: "河北省",
        cities: {
          "130100": {
            code: "130100",
            name: "石家庄市",
            districts: {
              "130102": "长安区",
              "130104": "桥西区",
              "130105": "新华区",
              "130107": "井陉矿区",
              "130108": "裕华区",
              "130109": "藁城区",
              "130110": "鹿泉区",
              "130111": "栾城区",
              "130121": "井陉县",
              "130123": "正定县",
              "130125": "行唐县",
              "130126": "灵寿县",
              "130127": "高邑县",
              "130128": "深泽县",
              "130129": "赞皇县",
              "130130": "无极县",
              "130131": "平山县",
              "130132": "元氏县",
              "130133": "赵县",
              "130181": "辛集市",
              "130183": "晋州市",
              "130184": "新乐市"
            }
          },
          "130200": {
            code: "130200",
            name: "唐山市",
            districts: {
              "130202": "路南区",
              "130203": "路北区",
              "130204": "古冶区",
              "130205": "开平区",
              "130207": "丰南区",
              "130208": "丰润区",
              "130209": "曹妃甸区",
              "130224": "滦南县",
              "130225": "乐亭县",
              "130227": "迁西县",
              "130229": "玉田县",
              "130281": "遵化市",
              "130283": "迁安市",
              "130284": "滦州市"
            }
          },
          "130300": {
            code: "130300",
            name: "秦皇岛市",
            districts: {
              "130302": "海港区",
              "130303": "山海关区",
              "130304": "北戴河区",
              "130306": "抚宁区",
              "130321": "青龙满族自治县",
              "130322": "昌黎县",
              "130324": "卢龙县"
            }
          },
          "130400": {
            code: "130400",
            name: "邯郸市",
            districts: {
              "130402": "邯山区",
              "130403": "丛台区",
              "130404": "复兴区",
              "130406": "峰峰矿区",
              "130407": "肥乡区",
              "130408": "永年区",
              "130423": "临漳县",
              "130424": "成安县",
              "130425": "大名县",
              "130426": "涉县",
              "130427": "磁县",
              "130430": "邱县",
              "130431": "鸡泽县",
              "130432": "广平县",
              "130433": "馆陶县",
              "130434": "魏县",
              "130435": "曲周县",
              "130481": "武安市"
            }
          },
          "130500": {
            code: "130500",
            name: "邢台市",
            districts: {
              "130502": "桥东区",
              "130503": "桥西区",
              "130521": "邢台县",
              "130522": "临城县",
              "130523": "内丘县",
              "130524": "柏乡县",
              "130525": "隆尧县",
              "130526": "任县",
              "130527": "南和县",
              "130528": "宁晋县",
              "130529": "巨鹿县",
              "130530": "新河县",
              "130531": "广宗县",
              "130532": "平乡县",
              "130533": "威县",
              "130534": "清河县",
              "130535": "临西县",
              "130581": "南宫市",
              "130582": "沙河市"
            }
          },
          "130600": {
            code: "130600",
            name: "保定市",
            districts: {
              "130602": "竞秀区",
              "130606": "莲池区",
              "130607": "满城区",
              "130608": "清苑区",
              "130609": "徐水区",
              "130623": "涞水县",
              "130624": "阜平县",
              "130626": "定兴县",
              "130627": "唐县",
              "130628": "高阳县",
              "130629": "容城县",
              "130630": "涞源县",
              "130631": "望都县",
              "130632": "安新县",
              "130633": "易县",
              "130634": "曲阳县",
              "130635": "蠡县",
              "130636": "顺平县",
              "130637": "博野县",
              "130638": "雄县",
              "130681": "涿州市",
              "130682": "定州市",
              "130683": "安国市",
              "130684": "高碑店市"
            }
          },
          "130700": {
            code: "130700",
            name: "张家口市",
            districts: {
              "130702": "桥东区",
              "130703": "桥西区",
              "130705": "宣化区",
              "130706": "下花园区",
              "130708": "万全区",
              "130709": "崇礼区",
              "130722": "张北县",
              "130723": "康保县",
              "130724": "沽源县",
              "130725": "尚义县",
              "130726": "蔚县",
              "130727": "阳原县",
              "130728": "怀安县",
              "130730": "怀来县",
              "130731": "涿鹿县",
              "130732": "赤城县"
            }
          },
          "130800": {
            code: "130800",
            name: "承德市",
            districts: {
              "130802": "双桥区",
              "130803": "双滦区",
              "130804": "鹰手营子矿区",
              "130821": "承德县",
              "130822": "兴隆县",
              "130824": "滦平县",
              "130825": "隆化县",
              "130826": "丰宁满族自治县",
              "130827": "宽城满族自治县",
              "130828": "围场满族蒙古族自治县",
              "130881": "平泉市"
            }
          },
          "130900": {
            code: "130900",
            name: "沧州市",
            districts: {
              "130902": "新华区",
              "130903": "运河区",
              "130921": "沧县",
              "130922": "青县",
              "130923": "东光县",
              "130924": "海兴县",
              "130925": "盐山县",
              "130926": "肃宁县",
              "130927": "南皮县",
              "130928": "吴桥县",
              "130929": "献县",
              "130930": "孟村回族自治县",
              "130981": "泊头市",
              "130982": "任丘市",
              "130983": "黄骅市",
              "130984": "河间市"
            }
          },
          "131000": {
            code: "131000",
            name: "廊坊市",
            districts: {
              "131002": "安次区",
              "131003": "广阳区",
              "131022": "固安县",
              "131023": "永清县",
              "131024": "香河县",
              "131025": "大城县",
              "131026": "文安县",
              "131028": "大厂回族自治县",
              "131081": "霸州市",
              "131082": "三河市"
            }
          },
          "131100": {
            code: "131100",
            name: "衡水市",
            districts: {
              "131102": "桃城区",
              "131103": "冀州区",
              "131121": "枣强县",
              "131122": "武邑县",
              "131123": "武强县",
              "131124": "饶阳县",
              "131125": "安平县",
              "131126": "故城县",
              "131127": "景县",
              "131128": "阜城县",
              "131182": "深州市"
            }
          }
        }
      },
      "140000": {
        code: "140000",
        name: "山西省",
        cities: {
          "140100": {
            code: "140100",
            name: "太原市",
            districts: {
              "140105": "小店区",
              "140106": "迎泽区",
              "140107": "杏花岭区",
              "140108": "尖草坪区",
              "140109": "万柏林区",
              "140110": "晋源区",
              "140121": "清徐县",
              "140122": "阳曲县",
              "140123": "娄烦县",
              "140181": "古交市"
            }
          },
          "140200": {
            code: "140200",
            name: "大同市",
            districts: {
              "140212": "新荣区",
              "140213": "平城区",
              "140214": "云冈区",
              "140215": "云州区",
              "140221": "阳高县",
              "140222": "天镇县",
              "140223": "广灵县",
              "140224": "灵丘县",
              "140225": "浑源县",
              "140226": "左云县"
            }
          },
          "140300": {
            code: "140300",
            name: "阳泉市",
            districts: {
              "140302": "城区",
              "140303": "矿区",
              "140311": "郊区",
              "140321": "平定县",
              "140322": "盂县"
            }
          },
          "140400": {
            code: "140400",
            name: "长治市",
            districts: {
              "140403": "潞州区",
              "140404": "上党区",
              "140405": "屯留区",
              "140406": "潞城区",
              "140423": "襄垣县",
              "140425": "平顺县",
              "140426": "黎城县",
              "140427": "壶关县",
              "140428": "长子县",
              "140429": "武乡县",
              "140430": "沁县",
              "140431": "沁源县"
            }
          },
          "140500": {
            code: "140500",
            name: "晋城市",
            districts: {
              "140502": "城区",
              "140521": "沁水县",
              "140522": "阳城县",
              "140524": "陵川县",
              "140525": "泽州县",
              "140581": "高平市"
            }
          },
          "140600": {
            code: "140600",
            name: "朔州市",
            districts: {
              "140602": "朔城区",
              "140603": "平鲁区",
              "140621": "山阴县",
              "140622": "应县",
              "140623": "右玉县",
              "140681": "怀仁市"
            }
          },
          "140700": {
            code: "140700",
            name: "晋中市",
            districts: {
              "140702": "榆次区",
              "140721": "榆社县",
              "140722": "左权县",
              "140723": "和顺县",
              "140724": "昔阳县",
              "140725": "寿阳县",
              "140726": "太谷县",
              "140727": "祁县",
              "140728": "平遥县",
              "140729": "灵石县",
              "140781": "介休市"
            }
          },
          "140800": {
            code: "140800",
            name: "运城市",
            districts: {
              "140802": "盐湖区",
              "140821": "临猗县",
              "140822": "万荣县",
              "140823": "闻喜县",
              "140824": "稷山县",
              "140825": "新绛县",
              "140826": "绛县",
              "140827": "垣曲县",
              "140828": "夏县",
              "140829": "平陆县",
              "140830": "芮城县",
              "140881": "永济市",
              "140882": "河津市"
            }
          },
          "140900": {
            code: "140900",
            name: "忻州市",
            districts: {
              "140902": "忻府区",
              "140921": "定襄县",
              "140922": "五台县",
              "140923": "代县",
              "140924": "繁峙县",
              "140925": "宁武县",
              "140926": "静乐县",
              "140927": "神池县",
              "140928": "五寨县",
              "140929": "岢岚县",
              "140930": "河曲县",
              "140931": "保德县",
              "140932": "偏关县",
              "140981": "原平市"
            }
          },
          "141000": {
            code: "141000",
            name: "临汾市",
            districts: {
              "141002": "尧都区",
              "141021": "曲沃县",
              "141022": "翼城县",
              "141023": "襄汾县",
              "141024": "洪洞县",
              "141025": "古县",
              "141026": "安泽县",
              "141027": "浮山县",
              "141028": "吉县",
              "141029": "乡宁县",
              "141030": "大宁县",
              "141031": "隰县",
              "141032": "永和县",
              "141033": "蒲县",
              "141034": "汾西县",
              "141081": "侯马市",
              "141082": "霍州市"
            }
          },
          "141100": {
            code: "141100",
            name: "吕梁市",
            districts: {
              "141102": "离石区",
              "141121": "文水县",
              "141122": "交城县",
              "141123": "兴县",
              "141124": "临县",
              "141125": "柳林县",
              "141126": "石楼县",
              "141127": "岚县",
              "141128": "方山县",
              "141129": "中阳县",
              "141130": "交口县",
              "141181": "孝义市",
              "141182": "汾阳市"
            }
          }
        }
      },
      "150000": {
        code: "150000",
        name: "内蒙古自治区",
        cities: {
          "150100": {
            code: "150100",
            name: "呼和浩特市",
            districts: {
              "150102": "新城区",
              "150103": "回民区",
              "150104": "玉泉区",
              "150105": "赛罕区",
              "150121": "土默特左旗",
              "150122": "托克托县",
              "150123": "和林格尔县",
              "150124": "清水河县",
              "150125": "武川县"
            }
          },
          "150200": {
            code: "150200",
            name: "包头市",
            districts: {
              "150202": "东河区",
              "150203": "昆都仑区",
              "150204": "青山区",
              "150205": "石拐区",
              "150206": "白云鄂博矿区",
              "150207": "九原区",
              "150221": "土默特右旗",
              "150222": "固阳县",
              "150223": "达尔罕茂明安联合旗"
            }
          },
          "150300": {
            code: "150300",
            name: "乌海市",
            districts: {
              "150302": "海勃湾区",
              "150303": "海南区",
              "150304": "乌达区"
            }
          },
          "150400": {
            code: "150400",
            name: "赤峰市",
            districts: {
              "150402": "红山区",
              "150403": "元宝山区",
              "150404": "松山区",
              "150421": "阿鲁科尔沁旗",
              "150422": "巴林左旗",
              "150423": "巴林右旗",
              "150424": "林西县",
              "150425": "克什克腾旗",
              "150426": "翁牛特旗",
              "150428": "喀喇沁旗",
              "150429": "宁城县",
              "150430": "敖汉旗"
            }
          },
          "150500": {
            code: "150500",
            name: "通辽市",
            districts: {
              "150502": "科尔沁区",
              "150521": "科尔沁左翼中旗",
              "150522": "科尔沁左翼后旗",
              "150523": "开鲁县",
              "150524": "库伦旗",
              "150525": "奈曼旗",
              "150526": "扎鲁特旗",
              "150581": "霍林郭勒市"
            }
          },
          "150600": {
            code: "150600",
            name: "鄂尔多斯市",
            districts: {
              "150602": "东胜区",
              "150603": "康巴什区",
              "150621": "达拉特旗",
              "150622": "准格尔旗",
              "150623": "鄂托克前旗",
              "150624": "鄂托克旗",
              "150625": "杭锦旗",
              "150626": "乌审旗",
              "150627": "伊金霍洛旗"
            }
          },
          "150700": {
            code: "150700",
            name: "呼伦贝尔市",
            districts: {
              "150702": "海拉尔区",
              "150703": "扎赉诺尔区",
              "150721": "阿荣旗",
              "150722": "莫力达瓦达斡尔族自治旗",
              "150723": "鄂伦春自治旗",
              "150724": "鄂温克族自治旗",
              "150725": "陈巴尔虎旗",
              "150726": "新巴尔虎左旗",
              "150727": "新巴尔虎右旗",
              "150781": "满洲里市",
              "150782": "牙克石市",
              "150783": "扎兰屯市",
              "150784": "额尔古纳市",
              "150785": "根河市"
            }
          },
          "150800": {
            code: "150800",
            name: "巴彦淖尔市",
            districts: {
              "150802": "临河区",
              "150821": "五原县",
              "150822": "磴口县",
              "150823": "乌拉特前旗",
              "150824": "乌拉特中旗",
              "150825": "乌拉特后旗",
              "150826": "杭锦后旗"
            }
          },
          "150900": {
            code: "150900",
            name: "乌兰察布市",
            districts: {
              "150902": "集宁区",
              "150921": "卓资县",
              "150922": "化德县",
              "150923": "商都县",
              "150924": "兴和县",
              "150925": "凉城县",
              "150926": "察哈尔右翼前旗",
              "150927": "察哈尔右翼中旗",
              "150928": "察哈尔右翼后旗",
              "150929": "四子王旗",
              "150981": "丰镇市"
            }
          },
          "152200": {
            code: "152200",
            name: "兴安盟",
            districts: {
              "152201": "乌兰浩特市",
              "152202": "阿尔山市",
              "152221": "科尔沁右翼前旗",
              "152222": "科尔沁右翼中旗",
              "152223": "扎赉特旗",
              "152224": "突泉县"
            }
          },
          "152500": {
            code: "152500",
            name: "锡林郭勒盟",
            districts: {
              "152501": "二连浩特市",
              "152502": "锡林浩特市",
              "152522": "阿巴嘎旗",
              "152523": "苏尼特左旗",
              "152524": "苏尼特右旗",
              "152525": "东乌珠穆沁旗",
              "152526": "西乌珠穆沁旗",
              "152527": "太仆寺旗",
              "152528": "镶黄旗",
              "152529": "正镶白旗",
              "152530": "正蓝旗",
              "152531": "多伦县"
            }
          },
          "152900": {
            code: "152900",
            name: "阿拉善盟",
            districts: {
              "152921": "阿拉善左旗",
              "152922": "阿拉善右旗",
              "152923": "额济纳旗"
            }
          }
        }
      },
      "210000": {
        code: "210000",
        name: "辽宁省",
        cities: {
          "210100": {
            code: "210100",
            name: "沈阳市",
            districts: {
              "210102": "和平区",
              "210103": "沈河区",
              "210104": "大东区",
              "210105": "皇姑区",
              "210106": "铁西区",
              "210111": "苏家屯区",
              "210112": "浑南区",
              "210113": "沈北新区",
              "210114": "于洪区",
              "210115": "辽中区",
              "210123": "康平县",
              "210124": "法库县",
              "210181": "新民市"
            }
          },
          "210200": {
            code: "210200",
            name: "大连市",
            districts: {
              "210202": "中山区",
              "210203": "西岗区",
              "210204": "沙河口区",
              "210211": "甘井子区",
              "210212": "旅顺口区",
              "210213": "金州区",
              "210214": "普兰店区",
              "210224": "长海县",
              "210281": "瓦房店市",
              "210283": "庄河市"
            }
          },
          "210300": {
            code: "210300",
            name: "鞍山市",
            districts: {
              "210302": "铁东区",
              "210303": "铁西区",
              "210304": "立山区",
              "210311": "千山区",
              "210321": "台安县",
              "210323": "岫岩满族自治县",
              "210381": "海城市"
            }
          },
          "210400": {
            code: "210400",
            name: "抚顺市",
            districts: {
              "210402": "新抚区",
              "210403": "东洲区",
              "210404": "望花区",
              "210411": "顺城区",
              "210421": "抚顺县",
              "210422": "新宾满族自治县",
              "210423": "清原满族自治县"
            }
          },
          "210500": {
            code: "210500",
            name: "本溪市",
            districts: {
              "210502": "平山区",
              "210503": "溪湖区",
              "210504": "明山区",
              "210505": "南芬区",
              "210521": "本溪满族自治县",
              "210522": "桓仁满族自治县"
            }
          },
          "210600": {
            code: "210600",
            name: "丹东市",
            districts: {
              "210602": "元宝区",
              "210603": "振兴区",
              "210604": "振安区",
              "210624": "宽甸满族自治县",
              "210681": "东港市",
              "210682": "凤城市"
            }
          },
          "210700": {
            code: "210700",
            name: "锦州市",
            districts: {
              "210702": "古塔区",
              "210703": "凌河区",
              "210711": "太和区",
              "210726": "黑山县",
              "210727": "义县",
              "210781": "凌海市",
              "210782": "北镇市"
            }
          },
          "210800": {
            code: "210800",
            name: "营口市",
            districts: {
              "210802": "站前区",
              "210803": "西市区",
              "210804": "鲅鱼圈区",
              "210811": "老边区",
              "210881": "盖州市",
              "210882": "大石桥市"
            }
          },
          "210900": {
            code: "210900",
            name: "阜新市",
            districts: {
              "210902": "海州区",
              "210903": "新邱区",
              "210904": "太平区",
              "210905": "清河门区",
              "210911": "细河区",
              "210921": "阜新蒙古族自治县",
              "210922": "彰武县"
            }
          },
          "211000": {
            code: "211000",
            name: "辽阳市",
            districts: {
              "211002": "白塔区",
              "211003": "文圣区",
              "211004": "宏伟区",
              "211005": "弓长岭区",
              "211011": "太子河区",
              "211021": "辽阳县",
              "211081": "灯塔市"
            }
          },
          "211100": {
            code: "211100",
            name: "盘锦市",
            districts: {
              "211102": "双台子区",
              "211103": "兴隆台区",
              "211104": "大洼区",
              "211122": "盘山县"
            }
          },
          "211200": {
            code: "211200",
            name: "铁岭市",
            districts: {
              "211202": "银州区",
              "211204": "清河区",
              "211221": "铁岭县",
              "211223": "西丰县",
              "211224": "昌图县",
              "211281": "调兵山市",
              "211282": "开原市"
            }
          },
          "211300": {
            code: "211300",
            name: "朝阳市",
            districts: {
              "211302": "双塔区",
              "211303": "龙城区",
              "211321": "朝阳县",
              "211322": "建平县",
              "211324": "喀喇沁左翼蒙古族自治县",
              "211381": "北票市",
              "211382": "凌源市"
            }
          },
          "211400": {
            code: "211400",
            name: "葫芦岛市",
            districts: {
              "211402": "连山区",
              "211403": "龙港区",
              "211404": "南票区",
              "211421": "绥中县",
              "211422": "建昌县",
              "211481": "兴城市"
            }
          }
        }
      },
      "220000": {
        code: "220000",
        name: "吉林省",
        cities: {
          "220100": {
            code: "220100",
            name: "长春市",
            districts: {
              "220102": "南关区",
              "220103": "宽城区",
              "220104": "朝阳区",
              "220105": "二道区",
              "220106": "绿园区",
              "220112": "双阳区",
              "220113": "九台区",
              "220122": "农安县",
              "220182": "榆树市",
              "220183": "德惠市"
            }
          },
          "220200": {
            code: "220200",
            name: "吉林市",
            districts: {
              "220202": "昌邑区",
              "220203": "龙潭区",
              "220204": "船营区",
              "220211": "丰满区",
              "220221": "永吉县",
              "220281": "蛟河市",
              "220282": "桦甸市",
              "220283": "舒兰市",
              "220284": "磐石市"
            }
          },
          "220300": {
            code: "220300",
            name: "四平市",
            districts: {
              "220302": "铁西区",
              "220303": "铁东区",
              "220322": "梨树县",
              "220323": "伊通满族自治县",
              "220381": "公主岭市",
              "220382": "双辽市"
            }
          },
          "220400": {
            code: "220400",
            name: "辽源市",
            districts: {
              "220402": "龙山区",
              "220403": "西安区",
              "220421": "东丰县",
              "220422": "东辽县"
            }
          },
          "220500": {
            code: "220500",
            name: "通化市",
            districts: {
              "220502": "东昌区",
              "220503": "二道江区",
              "220521": "通化县",
              "220523": "辉南县",
              "220524": "柳河县",
              "220581": "梅河口市",
              "220582": "集安市"
            }
          },
          "220600": {
            code: "220600",
            name: "白山市",
            districts: {
              "220602": "浑江区",
              "220605": "江源区",
              "220621": "抚松县",
              "220622": "靖宇县",
              "220623": "长白朝鲜族自治县",
              "220681": "临江市"
            }
          },
          "220700": {
            code: "220700",
            name: "松原市",
            districts: {
              "220702": "宁江区",
              "220721": "前郭尔罗斯蒙古族自治县",
              "220722": "长岭县",
              "220723": "乾安县",
              "220781": "扶余市"
            }
          },
          "220800": {
            code: "220800",
            name: "白城市",
            districts: {
              "220802": "洮北区",
              "220821": "镇赉县",
              "220822": "通榆县",
              "220881": "洮南市",
              "220882": "大安市"
            }
          },
          "222400": {
            code: "222400",
            name: "延边朝鲜族自治州",
            districts: {
              "222401": "延吉市",
              "222402": "图们市",
              "222403": "敦化市",
              "222404": "珲春市",
              "222405": "龙井市",
              "222406": "和龙市",
              "222424": "汪清县",
              "222426": "安图县"
            }
          }
        }
      },
      "230000": {
        code: "230000",
        name: "黑龙江省",
        cities: {
          "230100": {
            code: "230100",
            name: "哈尔滨市",
            districts: {
              "230102": "道里区",
              "230103": "南岗区",
              "230104": "道外区",
              "230108": "平房区",
              "230109": "松北区",
              "230110": "香坊区",
              "230111": "呼兰区",
              "230112": "阿城区",
              "230113": "双城区",
              "230123": "依兰县",
              "230124": "方正县",
              "230125": "宾县",
              "230126": "巴彦县",
              "230127": "木兰县",
              "230128": "通河县",
              "230129": "延寿县",
              "230183": "尚志市",
              "230184": "五常市"
            }
          },
          "230200": {
            code: "230200",
            name: "齐齐哈尔市",
            districts: {
              "230202": "龙沙区",
              "230203": "建华区",
              "230204": "铁锋区",
              "230205": "昂昂溪区",
              "230206": "富拉尔基区",
              "230207": "碾子山区",
              "230208": "梅里斯达斡尔族区",
              "230221": "龙江县",
              "230223": "依安县",
              "230224": "泰来县",
              "230225": "甘南县",
              "230227": "富裕县",
              "230229": "克山县",
              "230230": "克东县",
              "230231": "拜泉县",
              "230281": "讷河市"
            }
          },
          "230300": {
            code: "230300",
            name: "鸡西市",
            districts: {
              "230302": "鸡冠区",
              "230303": "恒山区",
              "230304": "滴道区",
              "230305": "梨树区",
              "230306": "城子河区",
              "230307": "麻山区",
              "230321": "鸡东县",
              "230381": "虎林市",
              "230382": "密山市"
            }
          },
          "230400": {
            code: "230400",
            name: "鹤岗市",
            districts: {
              "230402": "向阳区",
              "230403": "工农区",
              "230404": "南山区",
              "230405": "兴安区",
              "230406": "东山区",
              "230407": "兴山区",
              "230421": "萝北县",
              "230422": "绥滨县"
            }
          },
          "230500": {
            code: "230500",
            name: "双鸭山市",
            districts: {
              "230502": "尖山区",
              "230503": "岭东区",
              "230505": "四方台区",
              "230506": "宝山区",
              "230521": "集贤县",
              "230522": "友谊县",
              "230523": "宝清县",
              "230524": "饶河县"
            }
          },
          "230600": {
            code: "230600",
            name: "大庆市",
            districts: {
              "230602": "萨尔图区",
              "230603": "龙凤区",
              "230604": "让胡路区",
              "230605": "红岗区",
              "230606": "大同区",
              "230621": "肇州县",
              "230622": "肇源县",
              "230623": "林甸县",
              "230624": "杜尔伯特蒙古族自治县"
            }
          },
          "230700": {
            code: "230700",
            name: "伊春市",
            districts: {
              "230702": "伊春区",
              "230703": "南岔区",
              "230704": "友好区",
              "230705": "西林区",
              "230706": "翠峦区",
              "230707": "新青区",
              "230708": "美溪区",
              "230709": "金山屯区",
              "230710": "五营区",
              "230711": "乌马河区",
              "230712": "汤旺河区",
              "230713": "带岭区",
              "230714": "乌伊岭区",
              "230715": "红星区",
              "230716": "上甘岭区",
              "230722": "嘉荫县",
              "230781": "铁力市"
            }
          },
          "230800": {
            code: "230800",
            name: "佳木斯市",
            districts: {
              "230803": "向阳区",
              "230804": "前进区",
              "230805": "东风区",
              "230811": "郊区",
              "230822": "桦南县",
              "230826": "桦川县",
              "230828": "汤原县",
              "230881": "同江市",
              "230882": "富锦市",
              "230883": "抚远市"
            }
          },
          "230900": {
            code: "230900",
            name: "七台河市",
            districts: {
              "230902": "新兴区",
              "230903": "桃山区",
              "230904": "茄子河区",
              "230921": "勃利县"
            }
          },
          "231000": {
            code: "231000",
            name: "牡丹江市",
            districts: {
              "231002": "东安区",
              "231003": "阳明区",
              "231004": "爱民区",
              "231005": "西安区",
              "231025": "林口县",
              "231081": "绥芬河市",
              "231083": "海林市",
              "231084": "宁安市",
              "231085": "穆棱市",
              "231086": "东宁市"
            }
          },
          "231100": {
            code: "231100",
            name: "黑河市",
            districts: {
              "231102": "爱辉区",
              "231121": "嫩江县",
              "231123": "逊克县",
              "231124": "孙吴县",
              "231181": "北安市",
              "231182": "五大连池市"
            }
          },
          "231200": {
            code: "231200",
            name: "绥化市",
            districts: {
              "231202": "北林区",
              "231221": "望奎县",
              "231222": "兰西县",
              "231223": "青冈县",
              "231224": "庆安县",
              "231225": "明水县",
              "231226": "绥棱县",
              "231281": "安达市",
              "231282": "肇东市",
              "231283": "海伦市"
            }
          },
          "232700": {
            code: "232700",
            name: "大兴安岭地区",
            districts: {
              "232701": "漠河市",
              "232721": "呼玛县",
              "232722": "塔河县"
            }
          }
        }
      },
      "310000": {
        code: "310000",
        name: "上海市",
        cities: {
          "310000": {
            code: "310000",
            name: "上海市",
            districts: {
              "310101": "黄浦区",
              "310104": "徐汇区",
              "310105": "长宁区",
              "310106": "静安区",
              "310107": "普陀区",
              "310109": "虹口区",
              "310110": "杨浦区",
              "310112": "闵行区",
              "310113": "宝山区",
              "310114": "嘉定区",
              "310115": "浦东新区",
              "310116": "金山区",
              "310117": "松江区",
              "310118": "青浦区",
              "310120": "奉贤区",
              "310151": "崇明区"
            }
          }
        }
      },
      "320000": {
        code: "320000",
        name: "江苏省",
        cities: {
          "320100": {
            code: "320100",
            name: "南京市",
            districts: {
              "320102": "玄武区",
              "320104": "秦淮区",
              "320105": "建邺区",
              "320106": "鼓楼区",
              "320111": "浦口区",
              "320113": "栖霞区",
              "320114": "雨花台区",
              "320115": "江宁区",
              "320116": "六合区",
              "320117": "溧水区",
              "320118": "高淳区"
            }
          },
          "320200": {
            code: "320200",
            name: "无锡市",
            districts: {
              "320205": "锡山区",
              "320206": "惠山区",
              "320211": "滨湖区",
              "320213": "梁溪区",
              "320214": "新吴区",
              "320281": "江阴市",
              "320282": "宜兴市"
            }
          },
          "320300": {
            code: "320300",
            name: "徐州市",
            districts: {
              "320302": "鼓楼区",
              "320303": "云龙区",
              "320305": "贾汪区",
              "320311": "泉山区",
              "320312": "铜山区",
              "320321": "丰县",
              "320322": "沛县",
              "320324": "睢宁县",
              "320381": "新沂市",
              "320382": "邳州市"
            }
          },
          "320400": {
            code: "320400",
            name: "常州市",
            districts: {
              "320402": "天宁区",
              "320404": "钟楼区",
              "320411": "新北区",
              "320412": "武进区",
              "320413": "金坛区",
              "320481": "溧阳市"
            }
          },
          "320500": {
            code: "320500",
            name: "苏州市",
            districts: {
              "320505": "虎丘区",
              "320506": "吴中区",
              "320507": "相城区",
              "320508": "姑苏区",
              "320509": "吴江区",
              "320581": "常熟市",
              "320582": "张家港市",
              "320583": "昆山市",
              "320585": "太仓市"
            }
          },
          "320600": {
            code: "320600",
            name: "南通市",
            districts: {
              "320602": "崇川区",
              "320611": "港闸区",
              "320612": "通州区",
              "320623": "如东县",
              "320681": "启东市",
              "320682": "如皋市",
              "320684": "海门市",
              "320685": "海安市"
            }
          },
          "320700": {
            code: "320700",
            name: "连云港市",
            districts: {
              "320703": "连云区",
              "320706": "海州区",
              "320707": "赣榆区",
              "320722": "东海县",
              "320723": "灌云县",
              "320724": "灌南县"
            }
          },
          "320800": {
            code: "320800",
            name: "淮安市",
            districts: {
              "320803": "淮安区",
              "320804": "淮阴区",
              "320812": "清江浦区",
              "320813": "洪泽区",
              "320826": "涟水县",
              "320830": "盱眙县",
              "320831": "金湖县"
            }
          },
          "320900": {
            code: "320900",
            name: "盐城市",
            districts: {
              "320902": "亭湖区",
              "320903": "盐都区",
              "320904": "大丰区",
              "320921": "响水县",
              "320922": "滨海县",
              "320923": "阜宁县",
              "320924": "射阳县",
              "320925": "建湖县",
              "320981": "东台市"
            }
          },
          "321000": {
            code: "321000",
            name: "扬州市",
            districts: {
              "321002": "广陵区",
              "321003": "邗江区",
              "321012": "江都区",
              "321023": "宝应县",
              "321081": "仪征市",
              "321084": "高邮市"
            }
          },
          "321100": {
            code: "321100",
            name: "镇江市",
            districts: {
              "321102": "京口区",
              "321111": "润州区",
              "321112": "丹徒区",
              "321181": "丹阳市",
              "321182": "扬中市",
              "321183": "句容市"
            }
          },
          "321200": {
            code: "321200",
            name: "泰州市",
            districts: {
              "321202": "海陵区",
              "321203": "高港区",
              "321204": "姜堰区",
              "321281": "兴化市",
              "321282": "靖江市",
              "321283": "泰兴市"
            }
          },
          "321300": {
            code: "321300",
            name: "宿迁市",
            districts: {
              "321302": "宿城区",
              "321311": "宿豫区",
              "321322": "沭阳县",
              "321323": "泗阳县",
              "321324": "泗洪县"
            }
          }
        }
      },
      "330000": {
        code: "330000",
        name: "浙江省",
        cities: {
          "330100": {
            code: "330100",
            name: "杭州市",
            districts: {
              "330102": "上城区",
              "330103": "下城区",
              "330104": "江干区",
              "330105": "拱墅区",
              "330106": "西湖区",
              "330108": "滨江区",
              "330109": "萧山区",
              "330110": "余杭区",
              "330111": "富阳区",
              "330112": "临安区",
              "330122": "桐庐县",
              "330127": "淳安县",
              "330182": "建德市"
            }
          },
          "330200": {
            code: "330200",
            name: "宁波市",
            districts: {
              "330203": "海曙区",
              "330205": "江北区",
              "330206": "北仑区",
              "330211": "镇海区",
              "330212": "鄞州区",
              "330213": "奉化区",
              "330225": "象山县",
              "330226": "宁海县",
              "330281": "余姚市",
              "330282": "慈溪市"
            }
          },
          "330300": {
            code: "330300",
            name: "温州市",
            districts: {
              "330302": "鹿城区",
              "330303": "龙湾区",
              "330304": "瓯海区",
              "330305": "洞头区",
              "330324": "永嘉县",
              "330326": "平阳县",
              "330327": "苍南县",
              "330328": "文成县",
              "330329": "泰顺县",
              "330381": "瑞安市",
              "330382": "乐清市"
            }
          },
          "330400": {
            code: "330400",
            name: "嘉兴市",
            districts: {
              "330402": "南湖区",
              "330411": "秀洲区",
              "330421": "嘉善县",
              "330424": "海盐县",
              "330481": "海宁市",
              "330482": "平湖市",
              "330483": "桐乡市"
            }
          },
          "330500": {
            code: "330500",
            name: "湖州市",
            districts: {
              "330502": "吴兴区",
              "330503": "南浔区",
              "330521": "德清县",
              "330522": "长兴县",
              "330523": "安吉县"
            }
          },
          "330600": {
            code: "330600",
            name: "绍兴市",
            districts: {
              "330602": "越城区",
              "330603": "柯桥区",
              "330604": "上虞区",
              "330624": "新昌县",
              "330681": "诸暨市",
              "330683": "嵊州市"
            }
          },
          "330700": {
            code: "330700",
            name: "金华市",
            districts: {
              "330702": "婺城区",
              "330703": "金东区",
              "330723": "武义县",
              "330726": "浦江县",
              "330727": "磐安县",
              "330781": "兰溪市",
              "330782": "义乌市",
              "330783": "东阳市",
              "330784": "永康市"
            }
          },
          "330800": {
            code: "330800",
            name: "衢州市",
            districts: {
              "330802": "柯城区",
              "330803": "衢江区",
              "330822": "常山县",
              "330824": "开化县",
              "330825": "龙游县",
              "330881": "江山市"
            }
          },
          "330900": {
            code: "330900",
            name: "舟山市",
            districts: {
              "330902": "定海区",
              "330903": "普陀区",
              "330921": "岱山县",
              "330922": "嵊泗县"
            }
          },
          "331000": {
            code: "331000",
            name: "台州市",
            districts: {
              "331002": "椒江区",
              "331003": "黄岩区",
              "331004": "路桥区",
              "331022": "三门县",
              "331023": "天台县",
              "331024": "仙居县",
              "331081": "温岭市",
              "331082": "临海市",
              "331083": "玉环市"
            }
          },
          "331100": {
            code: "331100",
            name: "丽水市",
            districts: {
              "331102": "莲都区",
              "331121": "青田县",
              "331122": "缙云县",
              "331123": "遂昌县",
              "331124": "松阳县",
              "331125": "云和县",
              "331126": "庆元县",
              "331127": "景宁畲族自治县",
              "331181": "龙泉市"
            }
          }
        }
      },
      "340000": {
        code: "340000",
        name: "安徽省",
        cities: {
          "340100": {
            code: "340100",
            name: "合肥市",
            districts: {
              "340102": "瑶海区",
              "340103": "庐阳区",
              "340104": "蜀山区",
              "340111": "包河区",
              "340121": "长丰县",
              "340122": "肥东县",
              "340123": "肥西县",
              "340124": "庐江县",
              "340181": "巢湖市"
            }
          },
          "340200": {
            code: "340200",
            name: "芜湖市",
            districts: {
              "340202": "镜湖区",
              "340203": "弋江区",
              "340207": "鸠江区",
              "340208": "三山区",
              "340221": "芜湖县",
              "340222": "繁昌县",
              "340223": "南陵县",
              "340225": "无为县"
            }
          },
          "340300": {
            code: "340300",
            name: "蚌埠市",
            districts: {
              "340302": "龙子湖区",
              "340303": "蚌山区",
              "340304": "禹会区",
              "340311": "淮上区",
              "340321": "怀远县",
              "340322": "五河县",
              "340323": "固镇县"
            }
          },
          "340400": {
            code: "340400",
            name: "淮南市",
            districts: {
              "340402": "大通区",
              "340403": "田家庵区",
              "340404": "谢家集区",
              "340405": "八公山区",
              "340406": "潘集区",
              "340421": "凤台县",
              "340422": "寿县"
            }
          },
          "340500": {
            code: "340500",
            name: "马鞍山市",
            districts: {
              "340503": "花山区",
              "340504": "雨山区",
              "340506": "博望区",
              "340521": "当涂县",
              "340522": "含山县",
              "340523": "和县"
            }
          },
          "340600": {
            code: "340600",
            name: "淮北市",
            districts: {
              "340602": "杜集区",
              "340603": "相山区",
              "340604": "烈山区",
              "340621": "濉溪县"
            }
          },
          "340700": {
            code: "340700",
            name: "铜陵市",
            districts: {
              "340705": "铜官区",
              "340706": "义安区",
              "340711": "郊区",
              "340722": "枞阳县"
            }
          },
          "340800": {
            code: "340800",
            name: "安庆市",
            districts: {
              "340802": "迎江区",
              "340803": "大观区",
              "340811": "宜秀区",
              "340822": "怀宁县",
              "340825": "太湖县",
              "340826": "宿松县",
              "340827": "望江县",
              "340828": "岳西县",
              "340881": "桐城市",
              "340882": "潜山市"
            }
          },
          "341000": {
            code: "341000",
            name: "黄山市",
            districts: {
              "341002": "屯溪区",
              "341003": "黄山区",
              "341004": "徽州区",
              "341021": "歙县",
              "341022": "休宁县",
              "341023": "黟县",
              "341024": "祁门县"
            }
          },
          "341100": {
            code: "341100",
            name: "滁州市",
            districts: {
              "341102": "琅琊区",
              "341103": "南谯区",
              "341122": "来安县",
              "341124": "全椒县",
              "341125": "定远县",
              "341126": "凤阳县",
              "341181": "天长市",
              "341182": "明光市"
            }
          },
          "341200": {
            code: "341200",
            name: "阜阳市",
            districts: {
              "341202": "颍州区",
              "341203": "颍东区",
              "341204": "颍泉区",
              "341221": "临泉县",
              "341222": "太和县",
              "341225": "阜南县",
              "341226": "颍上县",
              "341282": "界首市"
            }
          },
          "341300": {
            code: "341300",
            name: "宿州市",
            districts: {
              "341302": "埇桥区",
              "341321": "砀山县",
              "341322": "萧县",
              "341323": "灵璧县",
              "341324": "泗县"
            }
          },
          "341500": {
            code: "341500",
            name: "六安市",
            districts: {
              "341502": "金安区",
              "341503": "裕安区",
              "341504": "叶集区",
              "341522": "霍邱县",
              "341523": "舒城县",
              "341524": "金寨县",
              "341525": "霍山县"
            }
          },
          "341600": {
            code: "341600",
            name: "亳州市",
            districts: {
              "341602": "谯城区",
              "341621": "涡阳县",
              "341622": "蒙城县",
              "341623": "利辛县"
            }
          },
          "341700": {
            code: "341700",
            name: "池州市",
            districts: {
              "341702": "贵池区",
              "341721": "东至县",
              "341722": "石台县",
              "341723": "青阳县"
            }
          },
          "341800": {
            code: "341800",
            name: "宣城市",
            districts: {
              "341802": "宣州区",
              "341821": "郎溪县",
              "341822": "广德县",
              "341823": "泾县",
              "341824": "绩溪县",
              "341825": "旌德县",
              "341881": "宁国市"
            }
          }
        }
      },
      "350000": {
        code: "350000",
        name: "福建省",
        cities: {
          "350100": {
            code: "350100",
            name: "福州市",
            districts: {
              "350102": "鼓楼区",
              "350103": "台江区",
              "350104": "仓山区",
              "350105": "马尾区",
              "350111": "晋安区",
              "350112": "长乐区",
              "350121": "闽侯县",
              "350122": "连江县",
              "350123": "罗源县",
              "350124": "闽清县",
              "350125": "永泰县",
              "350128": "平潭县",
              "350181": "福清市"
            }
          },
          "350200": {
            code: "350200",
            name: "厦门市",
            districts: {
              "350203": "思明区",
              "350205": "海沧区",
              "350206": "湖里区",
              "350211": "集美区",
              "350212": "同安区",
              "350213": "翔安区"
            }
          },
          "350300": {
            code: "350300",
            name: "莆田市",
            districts: {
              "350302": "城厢区",
              "350303": "涵江区",
              "350304": "荔城区",
              "350305": "秀屿区",
              "350322": "仙游县"
            }
          },
          "350400": {
            code: "350400",
            name: "三明市",
            districts: {
              "350402": "梅列区",
              "350403": "三元区",
              "350421": "明溪县",
              "350423": "清流县",
              "350424": "宁化县",
              "350425": "大田县",
              "350426": "尤溪县",
              "350427": "沙县",
              "350428": "将乐县",
              "350429": "泰宁县",
              "350430": "建宁县",
              "350481": "永安市"
            }
          },
          "350500": {
            code: "350500",
            name: "泉州市",
            districts: {
              "350502": "鲤城区",
              "350503": "丰泽区",
              "350504": "洛江区",
              "350505": "泉港区",
              "350521": "惠安县",
              "350524": "安溪县",
              "350525": "永春县",
              "350526": "德化县",
              "350527": "金门县",
              "350581": "石狮市",
              "350582": "晋江市",
              "350583": "南安市"
            }
          },
          "350600": {
            code: "350600",
            name: "漳州市",
            districts: {
              "350602": "芗城区",
              "350603": "龙文区",
              "350622": "云霄县",
              "350623": "漳浦县",
              "350624": "诏安县",
              "350625": "长泰县",
              "350626": "东山县",
              "350627": "南靖县",
              "350628": "平和县",
              "350629": "华安县",
              "350681": "龙海市"
            }
          },
          "350700": {
            code: "350700",
            name: "南平市",
            districts: {
              "350702": "延平区",
              "350703": "建阳区",
              "350721": "顺昌县",
              "350722": "浦城县",
              "350723": "光泽县",
              "350724": "松溪县",
              "350725": "政和县",
              "350781": "邵武市",
              "350782": "武夷山市",
              "350783": "建瓯市"
            }
          },
          "350800": {
            code: "350800",
            name: "龙岩市",
            districts: {
              "350802": "新罗区",
              "350803": "永定区",
              "350821": "长汀县",
              "350823": "上杭县",
              "350824": "武平县",
              "350825": "连城县",
              "350881": "漳平市"
            }
          },
          "350900": {
            code: "350900",
            name: "宁德市",
            districts: {
              "350902": "蕉城区",
              "350921": "霞浦县",
              "350922": "古田县",
              "350923": "屏南县",
              "350924": "寿宁县",
              "350925": "周宁县",
              "350926": "柘荣县",
              "350981": "福安市",
              "350982": "福鼎市"
            }
          }
        }
      },
      "360000": {
        code: "360000",
        name: "江西省",
        cities: {
          "360100": {
            code: "360100",
            name: "南昌市",
            districts: {
              "360102": "东湖区",
              "360103": "西湖区",
              "360104": "青云谱区",
              "360105": "湾里区",
              "360111": "青山湖区",
              "360112": "新建区",
              "360121": "南昌县",
              "360123": "安义县",
              "360124": "进贤县"
            }
          },
          "360200": {
            code: "360200",
            name: "景德镇市",
            districts: {
              "360202": "昌江区",
              "360203": "珠山区",
              "360222": "浮梁县",
              "360281": "乐平市"
            }
          },
          "360300": {
            code: "360300",
            name: "萍乡市",
            districts: {
              "360302": "安源区",
              "360313": "湘东区",
              "360321": "莲花县",
              "360322": "上栗县",
              "360323": "芦溪县"
            }
          },
          "360400": {
            code: "360400",
            name: "九江市",
            districts: {
              "360402": "濂溪区",
              "360403": "浔阳区",
              "360404": "柴桑区",
              "360423": "武宁县",
              "360424": "修水县",
              "360425": "永修县",
              "360426": "德安县",
              "360428": "都昌县",
              "360429": "湖口县",
              "360430": "彭泽县",
              "360481": "瑞昌市",
              "360482": "共青城市",
              "360483": "庐山市"
            }
          },
          "360500": {
            code: "360500",
            name: "新余市",
            districts: {
              "360502": "渝水区",
              "360521": "分宜县"
            }
          },
          "360600": {
            code: "360600",
            name: "鹰潭市",
            districts: {
              "360602": "月湖区",
              "360603": "余江区",
              "360681": "贵溪市"
            }
          },
          "360700": {
            code: "360700",
            name: "赣州市",
            districts: {
              "360702": "章贡区",
              "360703": "南康区",
              "360704": "赣县区",
              "360722": "信丰县",
              "360723": "大余县",
              "360724": "上犹县",
              "360725": "崇义县",
              "360726": "安远县",
              "360727": "龙南县",
              "360728": "定南县",
              "360729": "全南县",
              "360730": "宁都县",
              "360731": "于都县",
              "360732": "兴国县",
              "360733": "会昌县",
              "360734": "寻乌县",
              "360735": "石城县",
              "360781": "瑞金市"
            }
          },
          "360800": {
            code: "360800",
            name: "吉安市",
            districts: {
              "360802": "吉州区",
              "360803": "青原区",
              "360821": "吉安县",
              "360822": "吉水县",
              "360823": "峡江县",
              "360824": "新干县",
              "360825": "永丰县",
              "360826": "泰和县",
              "360827": "遂川县",
              "360828": "万安县",
              "360829": "安福县",
              "360830": "永新县",
              "360881": "井冈山市"
            }
          },
          "360900": {
            code: "360900",
            name: "宜春市",
            districts: {
              "360902": "袁州区",
              "360921": "奉新县",
              "360922": "万载县",
              "360923": "上高县",
              "360924": "宜丰县",
              "360925": "靖安县",
              "360926": "铜鼓县",
              "360981": "丰城市",
              "360982": "樟树市",
              "360983": "高安市"
            }
          },
          "361000": {
            code: "361000",
            name: "抚州市",
            districts: {
              "361002": "临川区",
              "361003": "东乡区",
              "361021": "南城县",
              "361022": "黎川县",
              "361023": "南丰县",
              "361024": "崇仁县",
              "361025": "乐安县",
              "361026": "宜黄县",
              "361027": "金溪县",
              "361028": "资溪县",
              "361030": "广昌县"
            }
          },
          "361100": {
            code: "361100",
            name: "上饶市",
            districts: {
              "361102": "信州区",
              "361103": "广丰区",
              "361121": "上饶县",
              "361123": "玉山县",
              "361124": "铅山县",
              "361125": "横峰县",
              "361126": "弋阳县",
              "361127": "余干县",
              "361128": "鄱阳县",
              "361129": "万年县",
              "361130": "婺源县",
              "361181": "德兴市"
            }
          }
        }
      },
      "370000": {
        code: "370000",
        name: "山东省",
        cities: {
          "370100": {
            code: "370100",
            name: "济南市",
            districts: {
              "370102": "历下区",
              "370103": "市中区",
              "370104": "槐荫区",
              "370105": "天桥区",
              "370112": "历城区",
              "370113": "长清区",
              "370114": "章丘区",
              "370115": "济阳区",
              "370116": "莱芜区",
              "370117": "钢城区",
              "370124": "平阴县",
              "370126": "商河县"
            }
          },
          "370200": {
            code: "370200",
            name: "青岛市",
            districts: {
              "370202": "市南区",
              "370203": "市北区",
              "370211": "黄岛区",
              "370212": "崂山区",
              "370213": "李沧区",
              "370214": "城阳区",
              "370215": "即墨区",
              "370281": "胶州市",
              "370283": "平度市",
              "370285": "莱西市"
            }
          },
          "370300": {
            code: "370300",
            name: "淄博市",
            districts: {
              "370302": "淄川区",
              "370303": "张店区",
              "370304": "博山区",
              "370305": "临淄区",
              "370306": "周村区",
              "370321": "桓台县",
              "370322": "高青县",
              "370323": "沂源县"
            }
          },
          "370400": {
            code: "370400",
            name: "枣庄市",
            districts: {
              "370402": "市中区",
              "370403": "薛城区",
              "370404": "峄城区",
              "370405": "台儿庄区",
              "370406": "山亭区",
              "370481": "滕州市"
            }
          },
          "370500": {
            code: "370500",
            name: "东营市",
            districts: {
              "370502": "东营区",
              "370503": "河口区",
              "370505": "垦利区",
              "370522": "利津县",
              "370523": "广饶县"
            }
          },
          "370600": {
            code: "370600",
            name: "烟台市",
            districts: {
              "370602": "芝罘区",
              "370611": "福山区",
              "370612": "牟平区",
              "370613": "莱山区",
              "370614": "蓬莱区",
              "370681": "龙口市",
              "370682": "莱阳市",
              "370683": "莱州市",
              "370684": "蓬莱市",
              "370685": "招远市",
              "370686": "栖霞市",
              "370687": "海阳市"
            }
          },
          "370700": {
            code: "370700",
            name: "潍坊市",
            districts: {
              "370702": "潍城区",
              "370703": "寒亭区",
              "370704": "坊子区",
              "370705": "奎文区",
              "370724": "临朐县",
              "370725": "昌乐县",
              "370781": "青州市",
              "370782": "诸城市",
              "370783": "寿光市",
              "370784": "安丘市",
              "370785": "高密市",
              "370786": "昌邑市"
            }
          },
          "370800": {
            code: "370800",
            name: "济宁市",
            districts: {
              "370811": "任城区",
              "370812": "兖州区",
              "370826": "微山县",
              "370827": "鱼台县",
              "370828": "金乡县",
              "370829": "嘉祥县",
              "370830": "汶上县",
              "370831": "泗水县",
              "370832": "梁山县",
              "370881": "曲阜市",
              "370883": "邹城市"
            }
          },
          "370900": {
            code: "370900",
            name: "泰安市",
            districts: {
              "370902": "泰山区",
              "370911": "岱岳区",
              "370921": "宁阳县",
              "370923": "东平县",
              "370982": "新泰市",
              "370983": "肥城市"
            }
          },
          "371000": {
            code: "371000",
            name: "威海市",
            districts: {
              "371002": "环翠区",
              "371003": "文登区",
              "371082": "荣成市",
              "371083": "乳山市"
            }
          },
          "371100": {
            code: "371100",
            name: "日照市",
            districts: {
              "371102": "东港区",
              "371103": "岚山区",
              "371121": "五莲县",
              "371122": "莒县"
            }
          },
          "371300": {
            code: "371300",
            name: "临沂市",
            districts: {
              "371302": "兰山区",
              "371311": "罗庄区",
              "371312": "河东区",
              "371321": "沂南县",
              "371322": "郯城县",
              "371323": "沂水县",
              "371324": "兰陵县",
              "371325": "费县",
              "371326": "平邑县",
              "371327": "莒南县",
              "371328": "蒙阴县",
              "371329": "临沭县"
            }
          },
          "371400": {
            code: "371400",
            name: "德州市",
            districts: {
              "371402": "德城区",
              "371403": "陵城区",
              "371422": "宁津县",
              "371423": "庆云县",
              "371424": "临邑县",
              "371425": "齐河县",
              "371426": "平原县",
              "371427": "夏津县",
              "371428": "武城县",
              "371481": "乐陵市",
              "371482": "禹城市"
            }
          },
          "371500": {
            code: "371500",
            name: "聊城市",
            districts: {
              "371502": "东昌府区",
              "371521": "阳谷县",
              "371522": "莘县",
              "371523": "茌平县",
              "371524": "东阿县",
              "371525": "冠县",
              "371526": "高唐县",
              "371581": "临清市"
            }
          },
          "371600": {
            code: "371600",
            name: "滨州市",
            districts: {
              "371602": "滨城区",
              "371603": "沾化区",
              "371621": "惠民县",
              "371622": "阳信县",
              "371623": "无棣县",
              "371625": "博兴县",
              "371681": "邹平市"
            }
          },
          "371700": {
            code: "371700",
            name: "菏泽市",
            districts: {
              "371702": "牡丹区",
              "371703": "定陶区",
              "371721": "曹县",
              "371722": "单县",
              "371723": "成武县",
              "371724": "巨野县",
              "371725": "郓城县",
              "371726": "鄄城县",
              "371728": "东明县"
            }
          }
        }
      },
      "410000": {
        code: "410000",
        name: "河南省",
        cities: {
          "410100": {
            code: "410100",
            name: "郑州市",
            districts: {
              "410102": "中原区",
              "410103": "二七区",
              "410104": "管城回族区",
              "410105": "金水区",
              "410106": "上街区",
              "410108": "惠济区",
              "410122": "中牟县",
              "410181": "巩义市",
              "410182": "荥阳市",
              "410183": "新密市",
              "410184": "新郑市",
              "410185": "登封市"
            }
          },
          "410200": {
            code: "410200",
            name: "开封市",
            districts: {
              "410202": "龙亭区",
              "410203": "顺河回族区",
              "410204": "鼓楼区",
              "410205": "禹王台区",
              "410212": "祥符区",
              "410221": "杞县",
              "410222": "通许县",
              "410223": "尉氏县",
              "410225": "兰考县"
            }
          },
          "410300": {
            code: "410300",
            name: "洛阳市",
            districts: {
              "410302": "老城区",
              "410303": "西工区",
              "410304": "瀍河回族区",
              "410305": "涧西区",
              "410306": "吉利区",
              "410311": "洛龙区",
              "410322": "孟津县",
              "410323": "新安县",
              "410324": "栾川县",
              "410325": "嵩县",
              "410326": "汝阳县",
              "410327": "宜阳县",
              "410328": "洛宁县",
              "410329": "伊川县",
              "410381": "偃师市"
            }
          },
          "410400": {
            code: "410400",
            name: "平顶山市",
            districts: {
              "410402": "新华区",
              "410403": "卫东区",
              "410404": "石龙区",
              "410411": "湛河区",
              "410421": "宝丰县",
              "410422": "叶县",
              "410423": "鲁山县",
              "410425": "郏县",
              "410481": "舞钢市",
              "410482": "汝州市"
            }
          },
          "410500": {
            code: "410500",
            name: "安阳市",
            districts: {
              "410502": "文峰区",
              "410503": "北关区",
              "410505": "殷都区",
              "410506": "龙安区",
              "410522": "安阳县",
              "410523": "汤阴县",
              "410526": "滑县",
              "410527": "内黄县",
              "410581": "林州市"
            }
          },
          "410600": {
            code: "410600",
            name: "鹤壁市",
            districts: {
              "410602": "鹤山区",
              "410603": "山城区",
              "410611": "淇滨区",
              "410621": "浚县",
              "410622": "淇县"
            }
          },
          "410700": {
            code: "410700",
            name: "新乡市",
            districts: {
              "410702": "红旗区",
              "410703": "卫滨区",
              "410704": "凤泉区",
              "410711": "牧野区",
              "410721": "新乡县",
              "410724": "获嘉县",
              "410725": "原阳县",
              "410726": "延津县",
              "410727": "封丘县",
              "410728": "长垣县",
              "410781": "卫辉市",
              "410782": "辉县市"
            }
          },
          "410800": {
            code: "410800",
            name: "焦作市",
            districts: {
              "410802": "解放区",
              "410803": "中站区",
              "410804": "马村区",
              "410811": "山阳区",
              "410821": "修武县",
              "410822": "博爱县",
              "410823": "武陟县",
              "410825": "温县",
              "410882": "沁阳市",
              "410883": "孟州市"
            }
          },
          "410900": {
            code: "410900",
            name: "濮阳市",
            districts: {
              "410902": "华龙区",
              "410922": "清丰县",
              "410923": "南乐县",
              "410926": "范县",
              "410927": "台前县",
              "410928": "濮阳县"
            }
          },
          "411000": {
            code: "411000",
            name: "许昌市",
            districts: {
              "411002": "魏都区",
              "411003": "建安区",
              "411024": "鄢陵县",
              "411025": "襄城县",
              "411081": "禹州市",
              "411082": "长葛市"
            }
          },
          "411100": {
            code: "411100",
            name: "漯河市",
            districts: {
              "411102": "源汇区",
              "411103": "郾城区",
              "411104": "召陵区",
              "411121": "舞阳县",
              "411122": "临颍县"
            }
          },
          "411200": {
            code: "411200",
            name: "三门峡市",
            districts: {
              "411202": "湖滨区",
              "411203": "陕州区",
              "411221": "渑池县",
              "411224": "卢氏县",
              "411281": "义马市",
              "411282": "灵宝市"
            }
          },
          "411300": {
            code: "411300",
            name: "南阳市",
            districts: {
              "411302": "宛城区",
              "411303": "卧龙区",
              "411321": "南召县",
              "411322": "方城县",
              "411323": "西峡县",
              "411324": "镇平县",
              "411325": "内乡县",
              "411326": "淅川县",
              "411327": "社旗县",
              "411328": "唐河县",
              "411329": "新野县",
              "411330": "桐柏县",
              "411381": "邓州市"
            }
          },
          "411400": {
            code: "411400",
            name: "商丘市",
            districts: {
              "411402": "梁园区",
              "411403": "睢阳区",
              "411421": "民权县",
              "411422": "睢县",
              "411423": "宁陵县",
              "411424": "柘城县",
              "411425": "虞城县",
              "411426": "夏邑县",
              "411481": "永城市"
            }
          },
          "411500": {
            code: "411500",
            name: "信阳市",
            districts: {
              "411502": "浉河区",
              "411503": "平桥区",
              "411521": "罗山县",
              "411522": "光山县",
              "411523": "新县",
              "411524": "商城县",
              "411525": "固始县",
              "411526": "潢川县",
              "411527": "淮滨县",
              "411528": "息县"
            }
          },
          "411600": {
            code: "411600",
            name: "周口市",
            districts: {
              "411602": "川汇区",
              "411621": "扶沟县",
              "411622": "西华县",
              "411623": "商水县",
              "411624": "沈丘县",
              "411625": "郸城县",
              "411626": "淮阳县",
              "411627": "太康县",
              "411628": "鹿邑县",
              "411681": "项城市"
            }
          },
          "411700": {
            code: "411700",
            name: "驻马店市",
            districts: {
              "411702": "驿城区",
              "411721": "西平县",
              "411722": "上蔡县",
              "411723": "平舆县",
              "411724": "正阳县",
              "411725": "确山县",
              "411726": "泌阳县",
              "411727": "汝南县",
              "411728": "遂平县",
              "411729": "新蔡县"
            }
          }
        }
      },
      "420000": {
        code: "420000",
        name: "湖北省",
        cities: {
          "420100": {
            code: "420100",
            name: "武汉市",
            districts: {
              "420102": "江岸区",
              "420103": "江汉区",
              "420104": "硚口区",
              "420105": "汉阳区",
              "420106": "武昌区",
              "420107": "青山区",
              "420111": "洪山区",
              "420112": "东西湖区",
              "420113": "汉南区",
              "420114": "蔡甸区",
              "420115": "江夏区",
              "420116": "黄陂区",
              "420117": "新洲区"
            }
          },
          "420200": {
            code: "420200",
            name: "黄石市",
            districts: {
              "420202": "黄石港区",
              "420203": "西塞山区",
              "420204": "下陆区",
              "420205": "铁山区",
              "420222": "阳新县",
              "420281": "大冶市"
            }
          },
          "420300": {
            code: "420300",
            name: "十堰市",
            districts: {
              "420302": "茅箭区",
              "420303": "张湾区",
              "420304": "郧阳区",
              "420322": "郧西县",
              "420323": "竹山县",
              "420324": "竹溪县",
              "420325": "房县",
              "420381": "丹江口市"
            }
          },
          "420500": {
            code: "420500",
            name: "宜昌市",
            districts: {
              "420502": "西陵区",
              "420503": "伍家岗区",
              "420504": "点军区",
              "420505": "猇亭区",
              "420506": "夷陵区",
              "420525": "远安县",
              "420526": "兴山县",
              "420527": "秭归县",
              "420528": "长阳土家族自治县",
              "420529": "五峰土家族自治县",
              "420581": "宜都市",
              "420582": "当阳市",
              "420583": "枝江市"
            }
          },
          "420600": {
            code: "420600",
            name: "襄阳市",
            districts: {
              "420602": "襄城区",
              "420606": "樊城区",
              "420607": "襄州区",
              "420624": "南漳县",
              "420625": "谷城县",
              "420626": "保康县",
              "420682": "老河口市",
              "420683": "枣阳市",
              "420684": "宜城市"
            }
          },
          "420700": {
            code: "420700",
            name: "鄂州市",
            districts: {
              "420702": "梁子湖区",
              "420703": "华容区",
              "420704": "鄂城区"
            }
          },
          "420800": {
            code: "420800",
            name: "荆门市",
            districts: {
              "420802": "东宝区",
              "420804": "掇刀区",
              "420822": "沙洋县",
              "420881": "钟祥市",
              "420882": "京山市"
            }
          },
          "420900": {
            code: "420900",
            name: "孝感市",
            districts: {
              "420902": "孝南区",
              "420921": "孝昌县",
              "420922": "大悟县",
              "420923": "云梦县",
              "420981": "应城市",
              "420982": "安陆市",
              "420984": "汉川市"
            }
          },
          "421000": {
            code: "421000",
            name: "荆州市",
            districts: {
              "421002": "沙市区",
              "421003": "荆州区",
              "421022": "公安县",
              "421023": "监利县",
              "421024": "江陵县",
              "421081": "石首市",
              "421083": "洪湖市",
              "421087": "松滋市"
            }
          },
          "421100": {
            code: "421100",
            name: "黄冈市",
            districts: {
              "421102": "黄州区",
              "421121": "团风县",
              "421122": "红安县",
              "421123": "罗田县",
              "421124": "英山县",
              "421125": "浠水县",
              "421126": "蕲春县",
              "421127": "黄梅县",
              "421181": "麻城市",
              "421182": "武穴市"
            }
          },
          "421200": {
            code: "421200",
            name: "咸宁市",
            districts: {
              "421202": "咸安区",
              "421221": "嘉鱼县",
              "421222": "通城县",
              "421223": "崇阳县",
              "421224": "通山县",
              "421281": "赤壁市"
            }
          },
          "421300": {
            code: "421300",
            name: "随州市",
            districts: {
              "421303": "曾都区",
              "421321": "随县",
              "421381": "广水市"
            }
          },
          "422800": {
            code: "422800",
            name: "恩施土家族苗族自治州",
            districts: {
              "422801": "恩施市",
              "422802": "利川市",
              "422822": "建始县",
              "422823": "巴东县",
              "422825": "宣恩县",
              "422826": "咸丰县",
              "422827": "来凤县",
              "422828": "鹤峰县"
            }
          }
        }
      },
      "430000": {
        code: "430000",
        name: "湖南省",
        cities: {
          "430100": {
            code: "430100",
            name: "长沙市",
            districts: {
              "430102": "芙蓉区",
              "430103": "天心区",
              "430104": "岳麓区",
              "430105": "开福区",
              "430111": "雨花区",
              "430112": "望城区",
              "430121": "长沙县",
              "430181": "浏阳市",
              "430182": "宁乡市"
            }
          },
          "430200": {
            code: "430200",
            name: "株洲市",
            districts: {
              "430202": "荷塘区",
              "430203": "芦淞区",
              "430204": "石峰区",
              "430211": "天元区",
              "430212": "渌口区",
              "430223": "攸县",
              "430224": "茶陵县",
              "430225": "炎陵县",
              "430281": "醴陵市"
            }
          },
          "430300": {
            code: "430300",
            name: "湘潭市",
            districts: {
              "430302": "雨湖区",
              "430304": "岳塘区",
              "430321": "湘潭县",
              "430381": "湘乡市",
              "430382": "韶山市"
            }
          },
          "430400": {
            code: "430400",
            name: "衡阳市",
            districts: {
              "430405": "珠晖区",
              "430406": "雁峰区",
              "430407": "石鼓区",
              "430408": "蒸湘区",
              "430412": "南岳区",
              "430421": "衡阳县",
              "430422": "衡南县",
              "430423": "衡山县",
              "430424": "衡东县",
              "430426": "祁东县",
              "430481": "耒阳市",
              "430482": "常宁市"
            }
          },
          "430500": {
            code: "430500",
            name: "邵阳市",
            districts: {
              "430502": "双清区",
              "430503": "大祥区",
              "430511": "北塔区",
              "430521": "邵东县",
              "430522": "新邵县",
              "430523": "邵阳县",
              "430524": "隆回县",
              "430525": "洞口县",
              "430527": "绥宁县",
              "430528": "新宁县",
              "430529": "城步苗族自治县",
              "430581": "武冈市"
            }
          },
          "430600": {
            code: "430600",
            name: "岳阳市",
            districts: {
              "430602": "岳阳楼区",
              "430603": "云溪区",
              "430611": "君山区",
              "430621": "岳阳县",
              "430623": "华容县",
              "430624": "湘阴县",
              "430626": "平江县",
              "430681": "汨罗市",
              "430682": "临湘市"
            }
          },
          "430700": {
            code: "430700",
            name: "常德市",
            districts: {
              "430702": "武陵区",
              "430703": "鼎城区",
              "430721": "安乡县",
              "430722": "汉寿县",
              "430723": "澧县",
              "430724": "临澧县",
              "430725": "桃源县",
              "430726": "石门县",
              "430781": "津市市"
            }
          },
          "430800": {
            code: "430800",
            name: "张家界市",
            districts: {
              "430802": "永定区",
              "430811": "武陵源区",
              "430821": "慈利县",
              "430822": "桑植县"
            }
          },
          "430900": {
            code: "430900",
            name: "益阳市",
            districts: {
              "430902": "资阳区",
              "430903": "赫山区",
              "430921": "南县",
              "430922": "桃江县",
              "430923": "安化县",
              "430981": "沅江市"
            }
          },
          "431000": {
            code: "431000",
            name: "郴州市",
            districts: {
              "431002": "北湖区",
              "431003": "苏仙区",
              "431021": "桂阳县",
              "431022": "宜章县",
              "431023": "永兴县",
              "431024": "嘉禾县",
              "431025": "临武县",
              "431026": "汝城县",
              "431027": "桂东县",
              "431028": "安仁县",
              "431081": "资兴市"
            }
          },
          "431100": {
            code: "431100",
            name: "永州市",
            districts: {
              "431102": "零陵区",
              "431103": "冷水滩区",
              "431121": "祁阳县",
              "431122": "东安县",
              "431123": "双牌县",
              "431124": "道县",
              "431125": "江永县",
              "431126": "宁远县",
              "431127": "蓝山县",
              "431128": "新田县",
              "431129": "江华瑶族自治县"
            }
          },
          "431200": {
            code: "431200",
            name: "怀化市",
            districts: {
              "431202": "鹤城区",
              "431221": "中方县",
              "431222": "沅陵县",
              "431223": "辰溪县",
              "431224": "溆浦县",
              "431225": "会同县",
              "431226": "麻阳苗族自治县",
              "431227": "新晃侗族自治县",
              "431228": "芷江侗族自治县",
              "431229": "靖州苗族侗族自治县",
              "431230": "通道侗族自治县",
              "431281": "洪江市"
            }
          },
          "431300": {
            code: "431300",
            name: "娄底市",
            districts: {
              "431302": "娄星区",
              "431321": "双峰县",
              "431322": "新化县",
              "431381": "冷水江市",
              "431382": "涟源市"
            }
          },
          "433100": {
            code: "433100",
            name: "湘西土家族苗族自治州",
            districts: {
              "433101": "吉首市",
              "433122": "泸溪县",
              "433123": "凤凰县",
              "433124": "花垣县",
              "433125": "保靖县",
              "433126": "古丈县",
              "433127": "永顺县",
              "433130": "龙山县"
            }
          }
        }
      },
      "440000": {
        code: "440000",
        name: "广东省",
        cities: {
          "440100": {
            code: "440100",
            name: "广州市",
            districts: {
              "440103": "荔湾区",
              "440104": "越秀区",
              "440105": "海珠区",
              "440106": "天河区",
              "440111": "白云区",
              "440112": "黄埔区",
              "440113": "番禺区",
              "440114": "花都区",
              "440115": "南沙区",
              "440117": "从化区",
              "440118": "增城区"
            }
          },
          "440200": {
            code: "440200",
            name: "韶关市",
            districts: {
              "440203": "武江区",
              "440204": "浈江区",
              "440205": "曲江区",
              "440222": "始兴县",
              "440224": "仁化县",
              "440229": "翁源县",
              "440232": "乳源瑶族自治县",
              "440233": "新丰县",
              "440281": "乐昌市",
              "440282": "南雄市"
            }
          },
          "440300": {
            code: "440300",
            name: "深圳市",
            districts: {
              "440303": "罗湖区",
              "440304": "福田区",
              "440305": "南山区",
              "440306": "宝安区",
              "440307": "龙岗区",
              "440308": "盐田区",
              "440309": "龙华区",
              "440310": "坪山区",
              "440311": "光明区"
            }
          },
          "440400": {
            code: "440400",
            name: "珠海市",
            districts: {
              "440402": "香洲区",
              "440403": "斗门区",
              "440404": "金湾区"
            }
          },
          "440500": {
            code: "440500",
            name: "汕头市",
            districts: {
              "440507": "龙湖区",
              "440511": "金平区",
              "440512": "濠江区",
              "440513": "潮阳区",
              "440514": "潮南区",
              "440515": "澄海区",
              "440523": "南澳县"
            }
          },
          "440600": {
            code: "440600",
            name: "佛山市",
            districts: {
              "440604": "禅城区",
              "440605": "南海区",
              "440606": "顺德区",
              "440607": "三水区",
              "440608": "高明区"
            }
          },
          "440700": {
            code: "440700",
            name: "江门市",
            districts: {
              "440703": "蓬江区",
              "440704": "江海区",
              "440705": "新会区",
              "440781": "台山市",
              "440783": "开平市",
              "440784": "鹤山市",
              "440785": "恩平市"
            }
          },
          "440800": {
            code: "440800",
            name: "湛江市",
            districts: {
              "440802": "赤坎区",
              "440803": "霞山区",
              "440804": "坡头区",
              "440811": "麻章区",
              "440823": "遂溪县",
              "440825": "徐闻县",
              "440881": "廉江市",
              "440882": "雷州市",
              "440883": "吴川市"
            }
          },
          "440900": {
            code: "440900",
            name: "茂名市",
            districts: {
              "440902": "茂南区",
              "440904": "电白区",
              "440981": "高州市",
              "440982": "化州市",
              "440983": "信宜市"
            }
          },
          "441200": {
            code: "441200",
            name: "肇庆市",
            districts: {
              "441202": "端州区",
              "441203": "鼎湖区",
              "441204": "高要区",
              "441223": "广宁县",
              "441224": "怀集县",
              "441225": "封开县",
              "441226": "德庆县",
              "441284": "四会市"
            }
          },
          "441300": {
            code: "441300",
            name: "惠州市",
            districts: {
              "441302": "惠城区",
              "441303": "惠阳区",
              "441322": "博罗县",
              "441323": "惠东县",
              "441324": "龙门县"
            }
          },
          "441400": {
            code: "441400",
            name: "梅州市",
            districts: {
              "441402": "梅江区",
              "441403": "梅县区",
              "441422": "大埔县",
              "441423": "丰顺县",
              "441424": "五华县",
              "441426": "平远县",
              "441427": "蕉岭县",
              "441481": "兴宁市"
            }
          },
          "441500": {
            code: "441500",
            name: "汕尾市",
            districts: {
              "441502": "城区",
              "441521": "海丰县",
              "441523": "陆河县",
              "441581": "陆丰市"
            }
          },
          "441600": {
            code: "441600",
            name: "河源市",
            districts: {
              "441602": "源城区",
              "441621": "紫金县",
              "441622": "龙川县",
              "441623": "连平县",
              "441624": "和平县",
              "441625": "东源县"
            }
          },
          "441700": {
            code: "441700",
            name: "阳江市",
            districts: {
              "441702": "江城区",
              "441704": "阳东区",
              "441721": "阳西县",
              "441781": "阳春市"
            }
          },
          "441800": {
            code: "441800",
            name: "清远市",
            districts: {
              "441802": "清城区",
              "441803": "清新区",
              "441821": "佛冈县",
              "441823": "阳山县",
              "441825": "连山壮族瑶族自治县",
              "441826": "连南瑶族自治县",
              "441881": "英德市",
              "441882": "连州市"
            }
          },
          "441900": {
            code: "441900",
            name: "东莞市",
            districts: {}
          },
          "442000": {
            code: "442000",
            name: "中山市",
            districts: {}
          },
          "445100": {
            code: "445100",
            name: "潮州市",
            districts: {
              "445102": "湘桥区",
              "445103": "潮安区",
              "445122": "饶平县"
            }
          },
          "445200": {
            code: "445200",
            name: "揭阳市",
            districts: {
              "445202": "榕城区",
              "445203": "揭东区",
              "445222": "揭西县",
              "445224": "惠来县",
              "445281": "普宁市"
            }
          },
          "445300": {
            code: "445300",
            name: "云浮市",
            districts: {
              "445302": "云城区",
              "445303": "云安区",
              "445321": "新兴县",
              "445322": "郁南县",
              "445381": "罗定市"
            }
          }
        }
      },
      "450000": {
        code: "450000",
        name: "广西壮族自治区",
        cities: {
          "450100": {
            code: "450100",
            name: "南宁市",
            districts: {
              "450102": "兴宁区",
              "450103": "青秀区",
              "450105": "江南区",
              "450107": "西乡塘区",
              "450108": "良庆区",
              "450109": "邕宁区",
              "450110": "武鸣区",
              "450123": "隆安县",
              "450124": "马山县",
              "450125": "上林县",
              "450126": "宾阳县",
              "450127": "横县"
            }
          },
          "450200": {
            code: "450200",
            name: "柳州市",
            districts: {
              "450202": "城中区",
              "450203": "鱼峰区",
              "450204": "柳南区",
              "450205": "柳北区",
              "450206": "柳江区",
              "450222": "柳城县",
              "450223": "鹿寨县",
              "450224": "融安县",
              "450225": "融水苗族自治县",
              "450226": "三江侗族自治县"
            }
          },
          "450300": {
            code: "450300",
            name: "桂林市",
            districts: {
              "450302": "秀峰区",
              "450303": "叠彩区",
              "450304": "象山区",
              "450305": "七星区",
              "450311": "雁山区",
              "450312": "临桂区",
              "450321": "阳朔县",
              "450323": "灵川县",
              "450324": "全州县",
              "450325": "兴安县",
              "450326": "永福县",
              "450327": "灌阳县",
              "450328": "龙胜各族自治县",
              "450329": "资源县",
              "450330": "平乐县",
              "450332": "恭城瑶族自治县",
              "450381": "荔浦市"
            }
          },
          "450400": {
            code: "450400",
            name: "梧州市",
            districts: {
              "450403": "万秀区",
              "450405": "长洲区",
              "450406": "龙圩区",
              "450421": "苍梧县",
              "450422": "藤县",
              "450423": "蒙山县",
              "450481": "岑溪市"
            }
          },
          "450500": {
            code: "450500",
            name: "北海市",
            districts: {
              "450502": "海城区",
              "450503": "银海区",
              "450512": "铁山港区",
              "450521": "合浦县"
            }
          },
          "450600": {
            code: "450600",
            name: "防城港市",
            districts: {
              "450602": "港口区",
              "450603": "防城区",
              "450621": "上思县",
              "450681": "东兴市"
            }
          },
          "450700": {
            code: "450700",
            name: "钦州市",
            districts: {
              "450702": "钦南区",
              "450703": "钦北区",
              "450721": "灵山县",
              "450722": "浦北县"
            }
          },
          "450800": {
            code: "450800",
            name: "贵港市",
            districts: {
              "450802": "港北区",
              "450803": "港南区",
              "450804": "覃塘区",
              "450821": "平南县",
              "450881": "桂平市"
            }
          },
          "450900": {
            code: "450900",
            name: "玉林市",
            districts: {
              "450902": "玉州区",
              "450903": "福绵区",
              "450921": "容县",
              "450922": "陆川县",
              "450923": "博白县",
              "450924": "兴业县",
              "450981": "北流市"
            }
          },
          "451000": {
            code: "451000",
            name: "百色市",
            districts: {
              "451002": "右江区",
              "451021": "田阳县",
              "451022": "田东县",
              "451023": "平果县",
              "451024": "德保县",
              "451026": "那坡县",
              "451027": "凌云县",
              "451028": "乐业县",
              "451029": "田林县",
              "451030": "西林县",
              "451031": "隆林各族自治县",
              "451081": "靖西市"
            }
          },
          "451100": {
            code: "451100",
            name: "贺州市",
            districts: {
              "451102": "八步区",
              "451103": "平桂区",
              "451121": "昭平县",
              "451122": "钟山县",
              "451123": "富川瑶族自治县"
            }
          },
          "451200": {
            code: "451200",
            name: "河池市",
            districts: {
              "451202": "金城江区",
              "451203": "宜州区",
              "451221": "南丹县",
              "451222": "天峨县",
              "451223": "凤山县",
              "451224": "东兰县",
              "451225": "罗城仫佬族自治县",
              "451226": "环江毛南族自治县",
              "451227": "巴马瑶族自治县",
              "451228": "都安瑶族自治县",
              "451229": "大化瑶族自治县"
            }
          },
          "451300": {
            code: "451300",
            name: "来宾市",
            districts: {
              "451302": "兴宾区",
              "451321": "忻城县",
              "451322": "象州县",
              "451323": "武宣县",
              "451324": "金秀瑶族自治县",
              "451381": "合山市"
            }
          },
          "451400": {
            code: "451400",
            name: "崇左市",
            districts: {
              "451402": "江州区",
              "451421": "扶绥县",
              "451422": "宁明县",
              "451423": "龙州县",
              "451424": "大新县",
              "451425": "天等县",
              "451481": "凭祥市"
            }
          }
        }
      },
      "460000": {
        code: "460000",
        name: "海南省",
        cities: {
          "460100": {
            code: "460100",
            name: "海口市",
            districts: {
              "460105": "秀英区",
              "460106": "龙华区",
              "460107": "琼山区",
              "460108": "美兰区"
            }
          },
          "460200": {
            code: "460200",
            name: "三亚市",
            districts: {
              "460202": "海棠区",
              "460203": "吉阳区",
              "460204": "天涯区",
              "460205": "崖州区"
            }
          },
          "460300": {
            code: "460300",
            name: "三沙市",
            districts: {
              "460321": "西沙群岛",
              "460322": "南沙群岛",
              "460323": "中沙群岛的岛礁及其海域",
              "460324": "永乐群岛"
            }
          },
          "460400": {
            code: "460400",
            name: "儋州市",
            districts: {}
          }
        }
      },
      "500000": {
        code: "500000",
        name: "重庆市",
        cities: {
          "500000": {
            code: "500000",
            name: "重庆市",
            districts: {
              "500101": "万州区",
              "500102": "涪陵区",
              "500103": "渝中区",
              "500104": "大渡口区",
              "500105": "江北区",
              "500106": "沙坪坝区",
              "500107": "九龙坡区",
              "500108": "南岸区",
              "500109": "北碚区",
              "500110": "綦江区",
              "500111": "大足区",
              "500112": "渝北区",
              "500113": "巴南区",
              "500114": "黔江区",
              "500115": "长寿区",
              "500116": "江津区",
              "500117": "合川区",
              "500118": "永川区",
              "500119": "南川区",
              "500120": "璧山区",
              "500151": "铜梁区",
              "500152": "潼南区",
              "500153": "荣昌区",
              "500154": "开州区",
              "500155": "梁平区",
              "500156": "武隆区",
              "500229": "城口县",
              "500230": "丰都县",
              "500231": "垫江县",
              "500233": "忠县",
              "500235": "云阳县",
              "500236": "奉节县",
              "500237": "巫山县",
              "500238": "巫溪县",
              "500240": "石柱土家族自治县",
              "500241": "秀山土家族苗族自治县",
              "500242": "酉阳土家族苗族自治县",
              "500243": "彭水苗族土家族自治县"
            }
          }
        }
      },
      "510000": {
        code: "510000",
        name: "四川省",
        cities: {
          "510100": {
            code: "510100",
            name: "成都市",
            districts: {
              "510104": "锦江区",
              "510105": "青羊区",
              "510106": "金牛区",
              "510107": "武侯区",
              "510108": "成华区",
              "510112": "龙泉驿区",
              "510113": "青白江区",
              "510114": "新都区",
              "510115": "温江区",
              "510116": "双流区",
              "510117": "郫都区",
              "510121": "金堂县",
              "510129": "大邑县",
              "510131": "蒲江县",
              "510132": "新津县",
              "510181": "都江堰市",
              "510182": "彭州市",
              "510183": "邛崃市",
              "510184": "崇州市",
              "510185": "简阳市"
            }
          },
          "510300": {
            code: "510300",
            name: "自贡市",
            districts: {
              "510302": "自流井区",
              "510303": "贡井区",
              "510304": "大安区",
              "510311": "沿滩区",
              "510321": "荣县",
              "510322": "富顺县"
            }
          },
          "510400": {
            code: "510400",
            name: "攀枝花市",
            districts: {
              "510402": "东区",
              "510403": "西区",
              "510411": "仁和区",
              "510421": "米易县",
              "510422": "盐边县"
            }
          },
          "510500": {
            code: "510500",
            name: "泸州市",
            districts: {
              "510502": "江阳区",
              "510503": "纳溪区",
              "510504": "龙马潭区",
              "510521": "泸县",
              "510522": "合江县",
              "510524": "叙永县",
              "510525": "古蔺县"
            }
          },
          "510600": {
            code: "510600",
            name: "德阳市",
            districts: {
              "510603": "旌阳区",
              "510604": "罗江区",
              "510623": "中江县",
              "510681": "广汉市",
              "510682": "什邡市",
              "510683": "绵竹市"
            }
          },
          "510700": {
            code: "510700",
            name: "绵阳市",
            districts: {
              "510703": "涪城区",
              "510704": "游仙区",
              "510705": "安州区",
              "510722": "三台县",
              "510723": "盐亭县",
              "510725": "梓潼县",
              "510726": "北川羌族自治县",
              "510727": "平武县",
              "510781": "江油市"
            }
          },
          "510800": {
            code: "510800",
            name: "广元市",
            districts: {
              "510802": "利州区",
              "510811": "昭化区",
              "510812": "朝天区",
              "510821": "旺苍县",
              "510822": "青川县",
              "510823": "剑阁县",
              "510824": "苍溪县"
            }
          },
          "510900": {
            code: "510900",
            name: "遂宁市",
            districts: {
              "510903": "船山区",
              "510904": "安居区",
              "510921": "蓬溪县",
              "510922": "射洪县",
              "510923": "大英县"
            }
          },
          "511000": {
            code: "511000",
            name: "内江市",
            districts: {
              "511002": "市中区",
              "511011": "东兴区",
              "511024": "威远县",
              "511025": "资中县",
              "511083": "隆昌市"
            }
          },
          "511100": {
            code: "511100",
            name: "乐山市",
            districts: {
              "511102": "市中区",
              "511111": "沙湾区",
              "511112": "五通桥区",
              "511113": "金口河区",
              "511123": "犍为县",
              "511124": "井研县",
              "511126": "夹江县",
              "511129": "沐川县",
              "511132": "峨边彝族自治县",
              "511133": "马边彝族自治县",
              "511181": "峨眉山市"
            }
          },
          "511300": {
            code: "511300",
            name: "南充市",
            districts: {
              "511302": "顺庆区",
              "511303": "高坪区",
              "511304": "嘉陵区",
              "511321": "南部县",
              "511322": "营山县",
              "511323": "蓬安县",
              "511324": "仪陇县",
              "511325": "西充县",
              "511381": "阆中市"
            }
          },
          "511400": {
            code: "511400",
            name: "眉山市",
            districts: {
              "511402": "东坡区",
              "511403": "彭山区",
              "511421": "仁寿县",
              "511423": "洪雅县",
              "511424": "丹棱县",
              "511425": "青神县"
            }
          },
          "511500": {
            code: "511500",
            name: "宜宾市",
            districts: {
              "511502": "翠屏区",
              "511503": "南溪区",
              "511504": "叙州区",
              "511523": "江安县",
              "511524": "长宁县",
              "511525": "高县",
              "511526": "珙县",
              "511527": "筠连县",
              "511528": "兴文县",
              "511529": "屏山县"
            }
          },
          "511600": {
            code: "511600",
            name: "广安市",
            districts: {
              "511602": "广安区",
              "511603": "前锋区",
              "511621": "岳池县",
              "511622": "武胜县",
              "511623": "邻水县",
              "511681": "华蓥市"
            }
          },
          "511700": {
            code: "511700",
            name: "达州市",
            districts: {
              "511702": "通川区",
              "511703": "达川区",
              "511722": "宣汉县",
              "511723": "开江县",
              "511724": "大竹县",
              "511725": "渠县",
              "511781": "万源市"
            }
          },
          "511800": {
            code: "511800",
            name: "雅安市",
            districts: {
              "511802": "雨城区",
              "511803": "名山区",
              "511822": "荥经县",
              "511823": "汉源县",
              "511824": "石棉县",
              "511825": "天全县",
              "511826": "芦山县",
              "511827": "宝兴县"
            }
          },
          "511900": {
            code: "511900",
            name: "巴中市",
            districts: {
              "511902": "巴州区",
              "511903": "恩阳区",
              "511921": "通江县",
              "511922": "南江县",
              "511923": "平昌县"
            }
          },
          "512000": {
            code: "512000",
            name: "资阳市",
            districts: {
              "512002": "雁江区",
              "512021": "安岳县",
              "512022": "乐至县"
            }
          },
          "513200": {
            code: "513200",
            name: "阿坝藏族羌族自治州",
            districts: {
              "513201": "马尔康市",
              "513221": "汶川县",
              "513222": "理县",
              "513223": "茂县",
              "513224": "松潘县",
              "513225": "九寨沟县",
              "513226": "金川县",
              "513227": "小金县",
              "513228": "黑水县",
              "513230": "壤塘县",
              "513231": "阿坝县",
              "513232": "若尔盖县",
              "513233": "红原县"
            }
          },
          "513300": {
            code: "513300",
            name: "甘孜藏族自治州",
            districts: {
              "513301": "康定市",
              "513322": "泸定县",
              "513323": "丹巴县",
              "513324": "九龙县",
              "513325": "雅江县",
              "513326": "道孚县",
              "513327": "炉霍县",
              "513328": "甘孜县",
              "513329": "新龙县",
              "513330": "德格县",
              "513331": "白玉县",
              "513332": "石渠县",
              "513333": "色达县",
              "513334": "理塘县",
              "513335": "巴塘县",
              "513336": "乡城县",
              "513337": "稻城县",
              "513338": "得荣县"
            }
          },
          "513400": {
            code: "513400",
            name: "凉山彝族自治州",
            districts: {
              "513401": "西昌市",
              "513422": "木里藏族自治县",
              "513423": "盐源县",
              "513424": "德昌县",
              "513425": "会理县",
              "513426": "会东县",
              "513427": "宁南县",
              "513428": "普格县",
              "513429": "布拖县",
              "513430": "金阳县",
              "513431": "昭觉县",
              "513432": "喜德县",
              "513433": "冕宁县",
              "513434": "越西县",
              "513435": "甘洛县",
              "513436": "美姑县",
              "513437": "雷波县"
            }
          }
        }
      },
      "520000": {
        code: "520000",
        name: "贵州省",
        cities: {
          "520100": {
            code: "520100",
            name: "贵阳市",
            districts: {
              "520102": "南明区",
              "520103": "云岩区",
              "520111": "花溪区",
              "520112": "乌当区",
              "520113": "白云区",
              "520115": "观山湖区",
              "520121": "开阳县",
              "520122": "息烽县",
              "520123": "修文县",
              "520181": "清镇市"
            }
          },
          "520200": {
            code: "520200",
            name: "六盘水市",
            districts: {
              "520201": "钟山区",
              "520203": "六枝特区",
              "520221": "水城县",
              "520281": "盘州市"
            }
          },
          "520300": {
            code: "520300",
            name: "遵义市",
            districts: {
              "520302": "红花岗区",
              "520303": "汇川区",
              "520304": "播州区",
              "520322": "桐梓县",
              "520323": "绥阳县",
              "520324": "正安县",
              "520325": "道真仡佬族苗族自治县",
              "520326": "务川仡佬族苗族自治县",
              "520327": "凤冈县",
              "520328": "湄潭县",
              "520329": "余庆县",
              "520330": "习水县",
              "520381": "赤水市",
              "520382": "仁怀市"
            }
          },
          "520400": {
            code: "520400",
            name: "安顺市",
            districts: {
              "520402": "西秀区",
              "520403": "平坝区",
              "520422": "普定县",
              "520423": "镇宁布依族苗族自治县",
              "520424": "关岭布依族苗族自治县",
              "520425": "紫云苗族布依族自治县"
            }
          },
          "520500": {
            code: "520500",
            name: "毕节市",
            districts: {
              "520502": "七星关区",
              "520521": "大方县",
              "520522": "黔西县",
              "520523": "金沙县",
              "520524": "织金县",
              "520525": "纳雍县",
              "520526": "威宁彝族回族苗族自治县",
              "520527": "赫章县"
            }
          },
          "520600": {
            code: "520600",
            name: "铜仁市",
            districts: {
              "520602": "碧江区",
              "520603": "万山区",
              "520621": "江口县",
              "520622": "玉屏侗族自治县",
              "520623": "石阡县",
              "520624": "思南县",
              "520625": "印江土家族苗族自治县",
              "520626": "德江县",
              "520627": "沿河土家族自治县",
              "520628": "松桃苗族自治县"
            }
          },
          "522300": {
            code: "522300",
            name: "黔西南布依族苗族自治州",
            districts: {
              "522301": "兴义市",
              "522302": "兴仁市",
              "522323": "普安县",
              "522324": "晴隆县",
              "522325": "贞丰县",
              "522326": "望谟县",
              "522327": "册亨县",
              "522328": "安龙县"
            }
          },
          "522600": {
            code: "522600",
            name: "黔东南苗族侗族自治州",
            districts: {
              "522601": "凯里市",
              "522622": "黄平县",
              "522623": "施秉县",
              "522624": "三穗县",
              "522625": "镇远县",
              "522626": "岑巩县",
              "522627": "天柱县",
              "522628": "锦屏县",
              "522629": "剑河县",
              "522630": "台江县",
              "522631": "黎平县",
              "522632": "榕江县",
              "522633": "从江县",
              "522634": "雷山县",
              "522635": "麻江县",
              "522636": "丹寨县"
            }
          },
          "522700": {
            code: "522700",
            name: "黔南布依族苗族自治州",
            districts: {
              "522701": "都匀市",
              "522702": "福泉市",
              "522722": "荔波县",
              "522723": "贵定县",
              "522725": "瓮安县",
              "522726": "独山县",
              "522727": "平塘县",
              "522728": "罗甸县",
              "522729": "长顺县",
              "522730": "龙里县",
              "522731": "惠水县",
              "522732": "三都水族自治县"
            }
          }
        }
      },
      "530000": {
        code: "530000",
        name: "云南省",
        cities: {
          "530100": {
            code: "530100",
            name: "昆明市",
            districts: {
              "530102": "五华区",
              "530103": "盘龙区",
              "530111": "官渡区",
              "530112": "西山区",
              "530113": "东川区",
              "530114": "呈贡区",
              "530115": "晋宁区",
              "530124": "富民县",
              "530125": "宜良县",
              "530126": "石林彝族自治县",
              "530127": "嵩明县",
              "530128": "禄劝彝族苗族自治县",
              "530129": "寻甸回族彝族自治县",
              "530181": "安宁市"
            }
          },
          "530300": {
            code: "530300",
            name: "曲靖市",
            districts: {
              "530302": "麒麟区",
              "530303": "沾益区",
              "530304": "马龙区",
              "530322": "陆良县",
              "530323": "师宗县",
              "530324": "罗平县",
              "530325": "富源县",
              "530326": "会泽县",
              "530381": "宣威市"
            }
          },
          "530400": {
            code: "530400",
            name: "玉溪市",
            districts: {
              "530402": "红塔区",
              "530403": "江川区",
              "530422": "澄江县",
              "530423": "通海县",
              "530424": "华宁县",
              "530425": "易门县",
              "530426": "峨山彝族自治县",
              "530427": "新平彝族傣族自治县",
              "530428": "元江哈尼族彝族傣族自治县"
            }
          },
          "530500": {
            code: "530500",
            name: "保山市",
            districts: {
              "530502": "隆阳区",
              "530521": "施甸县",
              "530523": "龙陵县",
              "530524": "昌宁县",
              "530581": "腾冲市"
            }
          },
          "530600": {
            code: "530600",
            name: "昭通市",
            districts: {
              "530602": "昭阳区",
              "530621": "鲁甸县",
              "530622": "巧家县",
              "530623": "盐津县",
              "530624": "大关县",
              "530625": "永善县",
              "530626": "绥江县",
              "530627": "镇雄县",
              "530628": "彝良县",
              "530629": "威信县",
              "530681": "水富市"
            }
          },
          "530700": {
            code: "530700",
            name: "丽江市",
            districts: {
              "530702": "古城区",
              "530721": "玉龙纳西族自治县",
              "530722": "永胜县",
              "530723": "华坪县",
              "530724": "宁蒗彝族自治县"
            }
          },
          "530800": {
            code: "530800",
            name: "普洱市",
            districts: {
              "530802": "思茅区",
              "530821": "宁洱哈尼族彝族自治县",
              "530822": "墨江哈尼族自治县",
              "530823": "景东彝族自治县",
              "530824": "景谷傣族彝族自治县",
              "530825": "镇沅彝族哈尼族拉祜族自治县",
              "530826": "江城哈尼族彝族自治县",
              "530827": "孟连傣族拉祜族佤族自治县",
              "530828": "澜沧拉祜族自治县",
              "530829": "西盟佤族自治县"
            }
          },
          "530900": {
            code: "530900",
            name: "临沧市",
            districts: {
              "530902": "临翔区",
              "530921": "凤庆县",
              "530922": "云县",
              "530923": "永德县",
              "530924": "镇康县",
              "530925": "双江拉祜族佤族布朗族傣族自治县",
              "530926": "耿马傣族佤族自治县",
              "530927": "沧源佤族自治县"
            }
          },
          "532300": {
            code: "532300",
            name: "楚雄彝族自治州",
            districts: {
              "532301": "楚雄市",
              "532322": "双柏县",
              "532323": "牟定县",
              "532324": "南华县",
              "532325": "姚安县",
              "532326": "大姚县",
              "532327": "永仁县",
              "532328": "元谋县",
              "532329": "武定县",
              "532331": "禄丰县"
            }
          },
          "532500": {
            code: "532500",
            name: "红河哈尼族彝族自治州",
            districts: {
              "532501": "个旧市",
              "532502": "开远市",
              "532503": "蒙自市",
              "532504": "弥勒市",
              "532523": "屏边苗族自治县",
              "532524": "建水县",
              "532525": "石屏县",
              "532527": "泸西县",
              "532528": "元阳县",
              "532529": "红河县",
              "532530": "金平苗族瑶族傣族自治县",
              "532531": "绿春县",
              "532532": "河口瑶族自治县"
            }
          },
          "532600": {
            code: "532600",
            name: "文山壮族苗族自治州",
            districts: {
              "532601": "文山市",
              "532622": "砚山县",
              "532623": "西畴县",
              "532624": "麻栗坡县",
              "532625": "马关县",
              "532626": "丘北县",
              "532627": "广南县",
              "532628": "富宁县"
            }
          },
          "532800": {
            code: "532800",
            name: "西双版纳傣族自治州",
            districts: {
              "532801": "景洪市",
              "532822": "勐海县",
              "532823": "勐腊县"
            }
          },
          "532900": {
            code: "532900",
            name: "大理白族自治州",
            districts: {
              "532901": "大理市",
              "532922": "漾濞彝族自治县",
              "532923": "祥云县",
              "532924": "宾川县",
              "532925": "弥渡县",
              "532926": "南涧彝族自治县",
              "532927": "巍山彝族回族自治县",
              "532928": "永平县",
              "532929": "云龙县",
              "532930": "洱源县",
              "532931": "剑川县",
              "532932": "鹤庆县"
            }
          },
          "533100": {
            code: "533100",
            name: "德宏傣族景颇族自治州",
            districts: {
              "533102": "瑞丽市",
              "533103": "芒市",
              "533122": "梁河县",
              "533123": "盈江县",
              "533124": "陇川县"
            }
          },
          "533300": {
            code: "533300",
            name: "怒江傈僳族自治州",
            districts: {
              "533301": "泸水市",
              "533323": "福贡县",
              "533324": "贡山独龙族怒族自治县",
              "533325": "兰坪白族普米族自治县"
            }
          },
          "533400": {
            code: "533400",
            name: "迪庆藏族自治州",
            districts: {
              "533401": "香格里拉市",
              "533422": "德钦县",
              "533423": "维西傈僳族自治县"
            }
          }
        }
      },
      "540000": {
        code: "540000",
        name: "西藏自治区",
        cities: {
          "540100": {
            code: "540100",
            name: "拉萨市",
            districts: {
              "540102": "城关区",
              "540103": "堆龙德庆区",
              "540104": "达孜区",
              "540121": "林周县",
              "540122": "当雄县",
              "540123": "尼木县",
              "540124": "曲水县",
              "540127": "墨竹工卡县"
            }
          },
          "540200": {
            code: "540200",
            name: "日喀则市",
            districts: {
              "540202": "桑珠孜区",
              "540221": "南木林县",
              "540222": "江孜县",
              "540223": "定日县",
              "540224": "萨迦县",
              "540225": "拉孜县",
              "540226": "昂仁县",
              "540227": "谢通门县",
              "540228": "白朗县",
              "540229": "仁布县",
              "540230": "康马县",
              "540231": "定结县",
              "540232": "仲巴县",
              "540233": "亚东县",
              "540234": "吉隆县",
              "540235": "聂拉木县",
              "540236": "萨嘎县",
              "540237": "岗巴县"
            }
          },
          "540300": {
            code: "540300",
            name: "昌都市",
            districts: {
              "540302": "卡若区",
              "540321": "江达县",
              "540322": "贡觉县",
              "540323": "类乌齐县",
              "540324": "丁青县",
              "540325": "察雅县",
              "540326": "八宿县",
              "540327": "左贡县",
              "540328": "芒康县",
              "540329": "洛隆县",
              "540330": "边坝县"
            }
          },
          "540400": {
            code: "540400",
            name: "林芝市",
            districts: {
              "540402": "巴宜区",
              "540421": "工布江达县",
              "540422": "米林县",
              "540423": "墨脱县",
              "540424": "波密县",
              "540425": "察隅县",
              "540426": "朗县"
            }
          },
          "540500": {
            code: "540500",
            name: "山南市",
            districts: {
              "540502": "乃东区",
              "540521": "扎囊县",
              "540522": "贡嘎县",
              "540523": "桑日县",
              "540524": "琼结县",
              "540525": "曲松县",
              "540526": "措美县",
              "540527": "洛扎县",
              "540528": "加查县",
              "540529": "隆子县",
              "540530": "错那县",
              "540531": "浪卡子县"
            }
          },
          "540600": {
            code: "540600",
            name: "那曲市",
            districts: {
              "540602": "色尼区",
              "540621": "嘉黎县",
              "540622": "比如县",
              "540623": "聂荣县",
              "540624": "安多县",
              "540625": "申扎县",
              "540626": "索县",
              "540627": "班戈县",
              "540628": "巴青县",
              "540629": "尼玛县",
              "540630": "双湖县"
            }
          },
          "542500": {
            code: "542500",
            name: "阿里地区",
            districts: {
              "542521": "普兰县",
              "542522": "札达县",
              "542523": "噶尔县",
              "542524": "日土县",
              "542525": "革吉县",
              "542526": "改则县",
              "542527": "措勤县"
            }
          }
        }
      },
      "610000": {
        code: "610000",
        name: "陕西省",
        cities: {
          "610100": {
            code: "610100",
            name: "西安市",
            districts: {
              "610102": "新城区",
              "610103": "碑林区",
              "610104": "莲湖区",
              "610111": "灞桥区",
              "610112": "未央区",
              "610113": "雁塔区",
              "610114": "阎良区",
              "610115": "临潼区",
              "610116": "长安区",
              "610117": "高陵区",
              "610118": "鄠邑区",
              "610122": "蓝田县",
              "610124": "周至县"
            }
          },
          "610200": {
            code: "610200",
            name: "铜川市",
            districts: {
              "610202": "王益区",
              "610203": "印台区",
              "610204": "耀州区",
              "610222": "宜君县"
            }
          },
          "610300": {
            code: "610300",
            name: "宝鸡市",
            districts: {
              "610302": "渭滨区",
              "610303": "金台区",
              "610304": "陈仓区",
              "610322": "凤翔县",
              "610323": "岐山县",
              "610324": "扶风县",
              "610326": "眉县",
              "610327": "陇县",
              "610328": "千阳县",
              "610329": "麟游县",
              "610330": "凤县",
              "610331": "太白县"
            }
          },
          "610400": {
            code: "610400",
            name: "咸阳市",
            districts: {
              "610402": "秦都区",
              "610403": "杨陵区",
              "610404": "渭城区",
              "610422": "三原县",
              "610423": "泾阳县",
              "610424": "乾县",
              "610425": "礼泉县",
              "610426": "永寿县",
              "610428": "长武县",
              "610429": "旬邑县",
              "610430": "淳化县",
              "610431": "武功县",
              "610481": "兴平市",
              "610482": "彬州市"
            }
          },
          "610500": {
            code: "610500",
            name: "渭南市",
            districts: {
              "610502": "临渭区",
              "610503": "华州区",
              "610522": "潼关县",
              "610523": "大荔县",
              "610524": "合阳县",
              "610525": "澄城县",
              "610526": "蒲城县",
              "610527": "白水县",
              "610528": "富平县",
              "610581": "韩城市",
              "610582": "华阴市"
            }
          },
          "610600": {
            code: "610600",
            name: "延安市",
            districts: {
              "610602": "宝塔区",
              "610603": "安塞区",
              "610621": "延长县",
              "610622": "延川县",
              "610623": "子长县",
              "610625": "志丹县",
              "610626": "吴起县",
              "610627": "甘泉县",
              "610628": "富县",
              "610629": "洛川县",
              "610630": "宜川县",
              "610631": "黄龙县",
              "610632": "黄陵县"
            }
          },
          "610700": {
            code: "610700",
            name: "汉中市",
            districts: {
              "610702": "汉台区",
              "610703": "南郑区",
              "610722": "城固县",
              "610723": "洋县",
              "610724": "西乡县",
              "610725": "勉县",
              "610726": "宁强县",
              "610727": "略阳县",
              "610728": "镇巴县",
              "610729": "留坝县",
              "610730": "佛坪县"
            }
          },
          "610800": {
            code: "610800",
            name: "榆林市",
            districts: {
              "610802": "榆阳区",
              "610803": "横山区",
              "610822": "府谷县",
              "610824": "靖边县",
              "610825": "定边县",
              "610826": "绥德县",
              "610827": "米脂县",
              "610828": "佳县",
              "610829": "吴堡县",
              "610830": "清涧县",
              "610831": "子洲县",
              "610881": "神木市"
            }
          },
          "610900": {
            code: "610900",
            name: "安康市",
            districts: {
              "610902": "汉滨区",
              "610921": "汉阴县",
              "610922": "石泉县",
              "610923": "宁陕县",
              "610924": "紫阳县",
              "610925": "岚皋县",
              "610926": "平利县",
              "610927": "镇坪县",
              "610928": "旬阳县",
              "610929": "白河县"
            }
          },
          "611000": {
            code: "611000",
            name: "商洛市",
            districts: {
              "611002": "商州区",
              "611021": "洛南县",
              "611022": "丹凤县",
              "611023": "商南县",
              "611024": "山阳县",
              "611025": "镇安县",
              "611026": "柞水县"
            }
          }
        }
      },
      "620000": {
        code: "620000",
        name: "甘肃省",
        cities: {
          "620100": {
            code: "620100",
            name: "兰州市",
            districts: {
              "620102": "城关区",
              "620103": "七里河区",
              "620104": "西固区",
              "620105": "安宁区",
              "620111": "红古区",
              "620121": "永登县",
              "620122": "皋兰县",
              "620123": "榆中县"
            }
          },
          "620200": {
            code: "620200",
            name: "嘉峪关市",
            districts: {}
          },
          "620300": {
            code: "620300",
            name: "金昌市",
            districts: {
              "620302": "金川区",
              "620321": "永昌县"
            }
          },
          "620400": {
            code: "620400",
            name: "白银市",
            districts: {
              "620402": "白银区",
              "620403": "平川区",
              "620421": "靖远县",
              "620422": "会宁县",
              "620423": "景泰县"
            }
          },
          "620500": {
            code: "620500",
            name: "天水市",
            districts: {
              "620502": "秦州区",
              "620503": "麦积区",
              "620521": "清水县",
              "620522": "秦安县",
              "620523": "甘谷县",
              "620524": "武山县",
              "620525": "张家川回族自治县"
            }
          },
          "620600": {
            code: "620600",
            name: "武威市",
            districts: {
              "620602": "凉州区",
              "620621": "民勤县",
              "620622": "古浪县",
              "620623": "天祝藏族自治县"
            }
          },
          "620700": {
            code: "620700",
            name: "张掖市",
            districts: {
              "620702": "甘州区",
              "620721": "肃南裕固族自治县",
              "620722": "民乐县",
              "620723": "临泽县",
              "620724": "高台县",
              "620725": "山丹县"
            }
          },
          "620800": {
            code: "620800",
            name: "平凉市",
            districts: {
              "620802": "崆峒区",
              "620821": "泾川县",
              "620822": "灵台县",
              "620823": "崇信县",
              "620825": "庄浪县",
              "620826": "静宁县",
              "620881": "华亭市"
            }
          },
          "620900": {
            code: "620900",
            name: "酒泉市",
            districts: {
              "620902": "肃州区",
              "620921": "金塔县",
              "620922": "瓜州县",
              "620923": "肃北蒙古族自治县",
              "620924": "阿克塞哈萨克族自治县",
              "620981": "玉门市",
              "620982": "敦煌市"
            }
          },
          "621000": {
            code: "621000",
            name: "庆阳市",
            districts: {
              "621002": "西峰区",
              "621021": "庆城县",
              "621022": "环县",
              "621023": "华池县",
              "621024": "合水县",
              "621025": "正宁县",
              "621026": "宁县",
              "621027": "镇原县"
            }
          },
          "621100": {
            code: "621100",
            name: "定西市",
            districts: {
              "621102": "安定区",
              "621121": "通渭县",
              "621122": "陇西县",
              "621123": "渭源县",
              "621124": "临洮县",
              "621125": "漳县",
              "621126": "岷县"
            }
          },
          "621200": {
            code: "621200",
            name: "陇南市",
            districts: {
              "621202": "武都区",
              "621221": "成县",
              "621222": "文县",
              "621223": "宕昌县",
              "621224": "康县",
              "621225": "西和县",
              "621226": "礼县",
              "621227": "徽县",
              "621228": "两当县"
            }
          },
          "622900": {
            code: "622900",
            name: "临夏回族自治州",
            districts: {
              "622901": "临夏市",
              "622921": "临夏县",
              "622922": "康乐县",
              "622923": "永靖县",
              "622924": "广河县",
              "622925": "和政县",
              "622926": "东乡族自治县",
              "622927": "积石山保安族东乡族撒拉族自治县"
            }
          },
          "623000": {
            code: "623000",
            name: "甘南藏族自治州",
            districts: {
              "623001": "合作市",
              "623021": "临潭县",
              "623022": "卓尼县",
              "623023": "舟曲县",
              "623024": "迭部县",
              "623025": "玛曲县",
              "623026": "碌曲县",
              "623027": "夏河县"
            }
          }
        }
      },
      "630000": {
        code: "630000",
        name: "青海省",
        cities: {
          "630100": {
            code: "630100",
            name: "西宁市",
            districts: {
              "630102": "城东区",
              "630103": "城中区",
              "630104": "城西区",
              "630105": "城北区",
              "630121": "大通回族土族自治县",
              "630122": "湟中县",
              "630123": "湟源县"
            }
          },
          "630200": {
            code: "630200",
            name: "海东市",
            districts: {
              "630202": "乐都区",
              "630203": "平安区",
              "630222": "民和回族土族自治县",
              "630223": "互助土族自治县",
              "630224": "化隆回族自治县",
              "630225": "循化撒拉族自治县"
            }
          },
          "632200": {
            code: "632200",
            name: "海北藏族自治州",
            districts: {
              "632221": "门源回族自治县",
              "632222": "祁连县",
              "632223": "海晏县",
              "632224": "刚察县"
            }
          },
          "632300": {
            code: "632300",
            name: "黄南藏族自治州",
            districts: {
              "632321": "同仁县",
              "632322": "尖扎县",
              "632323": "泽库县",
              "632324": "河南蒙古族自治县"
            }
          },
          "632500": {
            code: "632500",
            name: "海南藏族自治州",
            districts: {
              "632521": "共和县",
              "632522": "同德县",
              "632523": "贵德县",
              "632524": "兴海县",
              "632525": "贵南县"
            }
          },
          "632600": {
            code: "632600",
            name: "果洛藏族自治州",
            districts: {
              "632621": "玛沁县",
              "632622": "班玛县",
              "632623": "甘德县",
              "632624": "达日县",
              "632625": "久治县",
              "632626": "玛多县"
            }
          },
          "632700": {
            code: "632700",
            name: "玉树藏族自治州",
            districts: {
              "632701": "玉树市",
              "632722": "杂多县",
              "632723": "称多县",
              "632724": "治多县",
              "632725": "囊谦县",
              "632726": "曲麻莱县"
            }
          },
          "632800": {
            code: "632800",
            name: "海西蒙古族藏族自治州",
            districts: {
              "632801": "格尔木市",
              "632802": "德令哈市",
              "632803": "茫崖市",
              "632821": "乌兰县",
              "632822": "都兰县",
              "632823": "天峻县"
            }
          }
        }
      },
      "640000": {
        code: "640000",
        name: "宁夏回族自治区",
        cities: {
          "640100": {
            code: "640100",
            name: "银川市",
            districts: {
              "640104": "兴庆区",
              "640105": "西夏区",
              "640106": "金凤区",
              "640121": "永宁县",
              "640122": "贺兰县",
              "640181": "灵武市"
            }
          },
          "640200": {
            code: "640200",
            name: "石嘴山市",
            districts: {
              "640202": "大武口区",
              "640205": "惠农区",
              "640221": "平罗县"
            }
          },
          "640300": {
            code: "640300",
            name: "吴忠市",
            districts: {
              "640302": "利通区",
              "640303": "红寺堡区",
              "640323": "盐池县",
              "640324": "同心县",
              "640381": "青铜峡市"
            }
          },
          "640400": {
            code: "640400",
            name: "固原市",
            districts: {
              "640402": "原州区",
              "640422": "西吉县",
              "640423": "隆德县",
              "640424": "泾源县",
              "640425": "彭阳县"
            }
          },
          "640500": {
            code: "640500",
            name: "中卫市",
            districts: {
              "640502": "沙坡头区",
              "640521": "中宁县",
              "640522": "海原县"
            }
          }
        }
      },
      "650000": {
        code: "650000",
        name: "新疆维吾尔自治区",
        cities: {
          "650100": {
            code: "650100",
            name: "乌鲁木齐市",
            districts: {
              "650102": "天山区",
              "650103": "沙依巴克区",
              "650104": "新市区",
              "650105": "水磨沟区",
              "650106": "头屯河区",
              "650107": "达坂城区",
              "650109": "米东区",
              "650121": "乌鲁木齐县"
            }
          },
          "650200": {
            code: "650200",
            name: "克拉玛依市",
            districts: {
              "650202": "独山子区",
              "650203": "克拉玛依区",
              "650204": "白碱滩区",
              "650205": "乌尔禾区"
            }
          },
          "650400": {
            code: "650400",
            name: "吐鲁番市",
            districts: {
              "650402": "高昌区",
              "650421": "鄯善县",
              "650422": "托克逊县"
            }
          },
          "650500": {
            code: "650500",
            name: "哈密市",
            districts: {
              "650502": "伊州区",
              "650521": "巴里坤哈萨克自治县",
              "650522": "伊吾县"
            }
          },
          "652300": {
            code: "652300",
            name: "昌吉回族自治州",
            districts: {
              "652301": "昌吉市",
              "652302": "阜康市",
              "652323": "呼图壁县",
              "652324": "玛纳斯县",
              "652325": "奇台县",
              "652327": "吉木萨尔县",
              "652328": "木垒哈萨克自治县"
            }
          },
          "652700": {
            code: "652700",
            name: "博尔塔拉蒙古自治州",
            districts: {
              "652701": "博乐市",
              "652702": "阿拉山口市",
              "652722": "精河县",
              "652723": "温泉县"
            }
          },
          "652800": {
            code: "652800",
            name: "巴音郭楞蒙古自治州",
            districts: {
              "652801": "库尔勒市",
              "652822": "轮台县",
              "652823": "尉犁县",
              "652824": "若羌县",
              "652825": "且末县",
              "652826": "焉耆回族自治县",
              "652827": "和静县",
              "652828": "和硕县",
              "652829": "博湖县"
            }
          },
          "652900": {
            code: "652900",
            name: "阿克苏地区",
            districts: {
              "652901": "阿克苏市",
              "652922": "温宿县",
              "652923": "库车县",
              "652924": "沙雅县",
              "652925": "新和县",
              "652926": "拜城县",
              "652927": "乌什县",
              "652928": "阿瓦提县",
              "652929": "柯坪县"
            }
          },
          "653000": {
            code: "653000",
            name: "克孜勒苏柯尔克孜自治州",
            districts: {
              "653001": "阿图什市",
              "653022": "阿克陶县",
              "653023": "阿合奇县",
              "653024": "乌恰县"
            }
          },
          "653100": {
            code: "653100",
            name: "喀什地区",
            districts: {
              "653101": "喀什市",
              "653121": "疏附县",
              "653122": "疏勒县",
              "653123": "英吉沙县",
              "653124": "泽普县",
              "653125": "莎车县",
              "653126": "叶城县",
              "653127": "麦盖提县",
              "653128": "岳普湖县",
              "653129": "伽师县",
              "653130": "巴楚县",
              "653131": "塔什库尔干塔吉克自治县"
            }
          },
          "653200": {
            code: "653200",
            name: "和田地区",
            districts: {
              "653201": "和田市",
              "653221": "和田县",
              "653222": "墨玉县",
              "653223": "皮山县",
              "653224": "洛浦县",
              "653225": "策勒县",
              "653226": "于田县",
              "653227": "民丰县"
            }
          },
          "654000": {
            code: "654000",
            name: "伊犁哈萨克自治州",
            districts: {
              "654002": "伊宁市",
              "654003": "奎屯市",
              "654004": "霍尔果斯市",
              "654021": "伊宁县",
              "654022": "察布查尔锡伯自治县",
              "654023": "霍城县",
              "654024": "巩留县",
              "654025": "新源县",
              "654026": "昭苏县",
              "654027": "特克斯县",
              "654028": "尼勒克县"
            }
          },
          "654200": {
            code: "654200",
            name: "塔城地区",
            districts: {
              "654201": "塔城市",
              "654202": "乌苏市",
              "654221": "额敏县",
              "654223": "沙湾县",
              "654224": "托里县",
              "654225": "裕民县",
              "654226": "和布克赛尔蒙古自治县"
            }
          },
          "654300": {
            code: "654300",
            name: "阿勒泰地区",
            districts: {
              "654301": "阿勒泰市",
              "654321": "布尔津县",
              "654322": "富蕴县",
              "654323": "福海县",
              "654324": "哈巴河县",
              "654325": "青河县",
              "654326": "吉木乃县"
            }
          }
        }
      },
      "810000": {
        code: "810000",
        name: "香港特别行政区",
        cities: {
          "810000": {
            code: "810000",
            name: "香港特别行政区",
            districts: {
              "810101": "中西区",
              "810102": "湾仔区",
              "810103": "东区",
              "810104": "南区",
              "810105": "油尖旺区",
              "810106": "深水埗区",
              "810107": "九龙城区",
              "810108": "黄大仙区",
              "810109": "观塘区",
              "810110": "北区",
              "810111": "大埔区",
              "810112": "沙田区",
              "810113": "西贡区",
              "810114": "荃湾区",
              "810115": "屯门区",
              "810116": "元朗区",
              "810117": "葵青区",
              "810118": "离岛区"
            }
          }
        }
      },
      "820000": {
        code: "820000",
        name: "澳门特别行政区",
        cities: {
          "820000": {
            code: "820000",
            name: "澳门特别行政区",
            districts: {
              "820101": "花地玛堂区",
              "820102": "圣安多尼堂区",
              "820103": "大堂区",
              "820104": "望德堂区",
              "820105": "风顺堂区",
              "820106": "嘉模堂区",
              "820107": "圣方济各堂区",
              "820108": "路氹城",
              "820109": "澳门新城"
            }
          }
        }
      },
      "830000": {
        code: "830000",
        name: "台湾省",
        cities: {
          "830100": {
            code: "830100",
            name: "台北市",
            districts: {
              "830101": "中正区",
              "830102": "大同区",
              "830103": "中山区",
              "830104": "万华区",
              "830105": "信义区",
              "830106": "松山区",
              "830107": "大安区",
              "830108": "南港区",
              "830109": "北投区",
              "830110": "内湖区",
              "830111": "士林区",
              "830112": "文山区"
            }
          },
          "830200": {
            code: "830200",
            name: "新北市",
            districts: {
              "830201": "板桥区",
              "830202": "土城区",
              "830203": "新庄区",
              "830204": "新店区",
              "830205": "深坑区",
              "830206": "石碇区",
              "830207": "坪林区",
              "830208": "乌来区",
              "830209": "五股区",
              "830210": "八里区",
              "830211": "林口区",
              "830212": "淡水区",
              "830213": "中和区",
              "830214": "永和区",
              "830215": "三重区",
              "830216": "芦洲区",
              "830217": "泰山区",
              "830218": "树林区",
              "830219": "莺歌区",
              "830220": "三峡区",
              "830221": "汐止区",
              "830222": "金山区",
              "830223": "万里区",
              "830224": "三芝区",
              "830225": "石门区",
              "830226": "瑞芳区",
              "830227": "贡寮区",
              "830228": "双溪区",
              "830229": "平溪区"
            }
          },
          "830300": {
            code: "830300",
            name: "桃园市",
            districts: {
              "830301": "桃园区",
              "830302": "中坜区",
              "830303": "平镇区",
              "830304": "八德区",
              "830305": "杨梅区",
              "830306": "芦竹区",
              "830307": "大溪区",
              "830308": "龙潭区",
              "830309": "龟山区",
              "830310": "大园区",
              "830311": "观音区",
              "830312": "新屋区",
              "830313": "复兴区"
            }
          },
          "830400": {
            code: "830400",
            name: "台中市",
            districts: {
              "830401": "中区",
              "830402": "东区",
              "830403": "西区",
              "830404": "南区",
              "830405": "北区",
              "830406": "西屯区",
              "830407": "南屯区",
              "830408": "北屯区",
              "830409": "丰原区",
              "830410": "大里区",
              "830411": "太平区",
              "830412": "东势区",
              "830413": "大甲区",
              "830414": "清水区",
              "830415": "沙鹿区",
              "830416": "梧栖区",
              "830417": "后里区",
              "830418": "神冈区",
              "830419": "潭子区",
              "830420": "大雅区",
              "830421": "新小区",
              "830422": "石冈区",
              "830423": "外埔区",
              "830424": "大安区",
              "830425": "乌日区",
              "830426": "大肚区",
              "830427": "龙井区",
              "830428": "雾峰区",
              "830429": "和平区"
            }
          },
          "830500": {
            code: "830500",
            name: "台南市",
            districts: {
              "830501": "中西区",
              "830502": "东区",
              "830503": "南区",
              "830504": "北区",
              "830505": "安平区",
              "830506": "安南区",
              "830507": "永康区",
              "830508": "归仁区",
              "830509": "新化区",
              "830510": "左镇区",
              "830511": "玉井区",
              "830512": "楠西区",
              "830513": "南化区",
              "830514": "仁德区",
              "830515": "关庙区",
              "830516": "龙崎区",
              "830517": "官田区",
              "830518": "麻豆区",
              "830519": "佳里区",
              "830520": "西港区",
              "830521": "七股区",
              "830522": "将军区",
              "830523": "学甲区",
              "830524": "北门区",
              "830525": "新营区",
              "830526": "后壁区",
              "830527": "白河区",
              "830528": "东山区",
              "830529": "六甲区",
              "830530": "下营区",
              "830531": "柳营区",
              "830532": "盐水区",
              "830533": "善化区",
              "830534": "大内区",
              "830535": "山上区",
              "830536": "新市区",
              "830537": "安定区"
            }
          },
          "830600": {
            code: "830600",
            name: "高雄市",
            districts: {
              "830601": "楠梓区",
              "830602": "左营区",
              "830603": "鼓山区",
              "830604": "三民区",
              "830605": "盐埕区",
              "830606": "前金区",
              "830607": "新兴区",
              "830608": "苓雅区",
              "830609": "前镇区",
              "830610": "旗津区",
              "830611": "小港区",
              "830612": "凤山区",
              "830613": "大寮区",
              "830614": "鸟松区",
              "830615": "林园区",
              "830616": "仁武区",
              "830617": "大树区",
              "830618": "大社区",
              "830619": "冈山区",
              "830620": "路竹区",
              "830621": "桥头区",
              "830622": "梓官区",
              "830623": "弥陀区",
              "830624": "永安区",
              "830625": "燕巢区",
              "830626": "阿莲区",
              "830627": "茄萣区",
              "830628": "湖内区",
              "830629": "旗山区",
              "830630": "美浓区",
              "830631": "内门区",
              "830632": "杉林区",
              "830633": "甲仙区",
              "830634": "六龟区",
              "830635": "茂林区",
              "830636": "桃源区",
              "830637": "那玛夏区"
            }
          },
          "830700": {
            code: "830700",
            name: "基隆市",
            districts: {
              "830701": "中正区",
              "830702": "七堵区",
              "830703": "暖暖区",
              "830704": "仁爱区",
              "830705": "中山区",
              "830706": "安乐区",
              "830707": "信义区"
            }
          },
          "830800": {
            code: "830800",
            name: "新竹市",
            districts: {
              "830801": "东区",
              "830802": "北区",
              "830803": "香山区"
            }
          },
          "830900": {
            code: "830900",
            name: "嘉义市",
            districts: {
              "830901": "东区",
              "830902": "西区"
            }
          }
        }
      }
    };
    var REGION = ["东北", "华北", "华东", "华中", "华南", "西南", "西北"];
    var areas = location;
    var region = function() {
      return pick(REGION);
    };
    var province = function() {
      return pickMap(areas).name;
    };
    var city = function(prefix) {
      if (prefix === void 0) {
        prefix = false;
      }
      var province2 = pickMap(areas);
      var city2 = pickMap(province2.cities);
      return prefix ? [province2.name, city2.name].join(" ") : city2.name;
    };
    var county = function(prefix) {
      if (prefix === void 0) {
        prefix = false;
      }
      var specialCity = ["460400", "441900", "442000", "620200"];
      var province2 = pickMap(areas);
      var city2 = pickMap(province2.cities);
      if (specialCity.indexOf(city2.code) !== -1) {
        return county(prefix);
      }
      var district = pickMap(city2.districts) || "-";
      return prefix ? [province2.name, city2.name, district].join(" ") : district;
    };
    var zip = function(len) {
      if (len === void 0) {
        len = 6;
      }
      var zip2 = "";
      for (var i = 0; i < len; i++) {
        zip2 += natural(0, 9);
      }
      return zip2;
    };
    var address = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      region,
      province,
      city,
      county,
      zip
    });
    var areas$1 = location;
    var guid = function() {
      var pool = "abcdefABCDEF1234567890";
      return string(pool, 8) + "-" + string(pool, 4) + "-" + string(pool, 4) + "-" + string(pool, 4) + "-" + string(pool, 12);
    };
    var uuid = guid;
    var id = function() {
      var _id;
      var _sum = 0;
      var rank = ["7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9", "10", "5", "8", "4", "2"];
      var last2 = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
      var specialCity = ["460400", "441900", "442000", "620200"];
      var province2 = pickMap(areas$1);
      var city2 = pickMap(province2.cities);
      if (specialCity.indexOf(city2.code) !== -1) {
        return id();
      }
      var districts = city2.districts;
      var district = pick(keys(districts));
      _id = district + date("yyyyMMdd") + string("number", 3);
      for (var i = 0; i < _id.length; i++) {
        _sum += _id[i] * Number(rank[i]);
      }
      _id += last2[_sum % 11];
      return _id;
    };
    var key = 0;
    var increment = function(step) {
      return key += Number(step) || 1;
    };
    var inc = increment;
    var version2 = function(depth) {
      if (depth === void 0) {
        depth = 3;
      }
      var numbers = [];
      for (var i = 0; i < depth; i++) {
        numbers.push(natural(0, 10));
      }
      return numbers.join(".");
    };
    var phone = function() {
      var segments = [
        // 移动号段
        "134",
        "135",
        "136",
        "137",
        "138",
        "139",
        "147",
        "150",
        "151",
        "152",
        "157",
        "158",
        "159",
        "165",
        "172",
        "178",
        "182",
        "183",
        "184",
        "187",
        "188",
        // 联通号段
        "130",
        "131",
        "132",
        "145",
        "155",
        "156",
        "171",
        "175",
        "176",
        "185",
        "186",
        // 电信号段
        "133",
        "149",
        "153",
        "173",
        "174",
        "177",
        "180",
        "181",
        "189",
        "191"
      ];
      return pick(segments) + string("number", 8);
    };
    var misc = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      guid,
      uuid,
      id,
      increment,
      inc,
      version: version2,
      phone
    });
    var random = __assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign(__assign({
      extend: extendFunc
    }, basic), date$1), image$1), color$1), text), name$1), web), address), helper), misc);
    function extendFunc(source) {
      if (isObject2(source)) {
        for (var key2 in source) {
          random[key2] = source[key2];
        }
      }
    }
    var parse = function(name2) {
      name2 = name2 === void 0 ? "" : name2 + "";
      var parameters = name2.match(constant.RE_KEY);
      var range2 = parameters && parameters[3] && parameters[3].match(constant.RE_RANGE);
      var min = range2 && range2[1] && parseInt(range2[1], 10);
      var max = range2 && range2[2] && parseInt(range2[2], 10);
      var count = range2 ? range2[2] ? random.integer(Number(min), Number(max)) : parseInt(range2[1], 10) : void 0;
      var decimal = parameters && parameters[4] && parameters[4].match(constant.RE_RANGE);
      var dmin = decimal && decimal[1] && parseInt(decimal[1], 10);
      var dmax = decimal && decimal[2] && parseInt(decimal[2], 10);
      var dcount = decimal ? decimal[2] ? random.integer(Number(dmin), Number(dmax)) : parseInt(decimal[1], 10) : void 0;
      var result = {
        // 1 name, 2 inc, 3 range, 4 decimal
        parameters,
        // 1 min, 2 max
        range: range2,
        min,
        max,
        count,
        decimal,
        dmin,
        dmax,
        dcount
      };
      for (var r in result) {
        if (result[r] != void 0) {
          return result;
        }
      }
      return {};
    };
    var number = Number;
    var boolean$1 = Boolean;
    var string$1 = String;
    var transfer = {
      number,
      boolean: boolean$1,
      string: string$1,
      extend: extend2
    };
    function extend2(source) {
      if (isObject2(source)) {
        for (var key2 in source) {
          transfer[key2] = source[key2];
        }
      }
    }
    var LOWER = ascii(97, 122);
    var UPPER = ascii(65, 90);
    var NUMBER = ascii(48, 57);
    var OTHER = ascii(32, 47) + ascii(58, 64) + ascii(91, 96) + ascii(
      123,
      126
    );
    var PRINTABLE = ascii(32, 126);
    var SPACE = " \f\n\r	\v \u2028\u2029";
    var CHARACTER_CLASSES = {
      "\\w": LOWER + UPPER + NUMBER + "_",
      "\\W": OTHER.replace("_", ""),
      "\\s": SPACE,
      "\\S": function() {
        var result = PRINTABLE;
        for (var i = 0; i < SPACE.length; i++) {
          result = result.replace(SPACE[i], "");
        }
        return result;
      }(),
      "\\d": NUMBER,
      "\\D": LOWER + UPPER + OTHER
    };
    function ascii(from, to) {
      var result = "";
      for (var i = from; i <= to; i++) {
        result += String.fromCharCode(i);
      }
      return result;
    }
    var handler = {
      // var ast = RegExpParser.parse(regexp.source)
      gen: function(node, result, cache) {
        cache = cache || {
          guid: 1
        };
        return handler[node.type] ? handler[node.type](node, result, cache) : handler.token(node);
      },
      token: (
        /* istanbul ignore next */
        function(node) {
          switch (node.type) {
            case "start":
            case "end":
              return "";
            case "any-character":
              return random.character();
            case "backspace":
              return "";
            case "word-boundary":
              return "";
            case "non-word-boundary":
              break;
            case "digit":
              return random.pick(NUMBER.split(""));
            case "non-digit":
              return random.pick((LOWER + UPPER + OTHER).split(""));
            case "form-feed":
              break;
            case "line-feed":
              return node.body || node.text;
            case "carriage-return":
              break;
            case "white-space":
              return random.pick(SPACE.split(""));
            case "non-white-space":
              return random.pick((LOWER + UPPER + NUMBER).split(""));
            case "tab":
              break;
            case "vertical-tab":
              break;
            case "word":
              return random.pick((LOWER + UPPER + NUMBER).split(""));
            case "non-word":
              return random.pick(OTHER.replace("_", "").split(""));
          }
          return node.body || node.text;
        }
      ),
      // {
      //   type: 'alternate',
      //   offset: 0,
      //   text: '',
      //   left: {
      //     boyd: []
      //   },
      //   right: {
      //     boyd: []
      //   }
      // }
      alternate: function(node, result, cache) {
        return handler.gen(random.boolean() ? node.left : node.right, result, cache);
      },
      // {
      //   type: 'match',
      //   offset: 0,
      //   text: '',
      //   body: []
      // }
      match: function(node, result, cache) {
        result = "";
        for (var i = 0; i < node.body.length; i++) {
          result += handler.gen(node.body[i], result, cache);
        }
        return result;
      },
      // ()
      "capture-group": function(node, result, cache) {
        result = handler.gen(node.body, result, cache);
        cache[cache.guid++] = result;
        return result;
      },
      // (?:...)
      "non-capture-group": function(node, result, cache) {
        return handler.gen(node.body, result, cache);
      },
      // (?=p)
      "positive-lookahead": function(node, result, cache) {
        return handler.gen(node.body, result, cache);
      },
      // (?!p)
      "negative-lookahead": function() {
        return "";
      },
      // {
      //   type: 'quantified',
      //   offset: 3,
      //   text: 'c*',
      //   body: {
      //     type: 'literal',
      //     offset: 3,
      //     text: 'c',
      //     body: 'c',
      //     escaped: false
      //   },
      //   quantifier: {
      //     type: 'quantifier',
      //     offset: 4,
      //     text: '*',
      //     min: 0,
      //     max: Infinity,
      //     greedy: true
      //   }
      // }
      quantified: function(node, result, cache) {
        result = "";
        var count = handler.quantifier(node.quantifier);
        for (var i = 0; i < count; i++) {
          result += handler.gen(node.body, result, cache);
        }
        return result;
      },
      // quantifier: {
      //   type: 'quantifier',
      //   offset: 4,
      //   text: '*',
      //   min: 0,
      //   max: Infinity,
      //   greedy: true
      // }
      quantifier: function(node) {
        var min = Math.max(node.min, 0);
        var max = isFinite(node.max) ? node.max : min + random.integer(3, 7);
        return random.integer(min, max);
      },
      charset: function(node, result, cache) {
        if (node.invert) {
          return handler["invert-charset"](node, result, cache);
        }
        var literal = random.pick(node.body);
        return handler.gen(literal, result, cache);
      },
      "invert-charset": function(node, result, cache) {
        var pool = PRINTABLE;
        var item;
        for (var i = 0; i < node.body.length; i++) {
          item = node.body[i];
          switch (item.type) {
            case "literal":
              pool = pool.replace(item.body, "");
              break;
            case "range":
              var min = handler.gen(item.start, result, cache).charCodeAt();
              var max = handler.gen(item.end, result, cache).charCodeAt();
              for (var ii = min; ii <= max; ii++) {
                pool = pool.replace(String.fromCharCode(ii), "");
              }
            default:
              var characters = CHARACTER_CLASSES[item.text];
              if (characters) {
                for (var iii = 0; iii <= characters.length; iii++) {
                  pool = pool.replace(characters[iii], "");
                }
              }
          }
        }
        return random.pick(pool.split(""));
      },
      range: function(node, result, cache) {
        var min = handler.gen(node.start, result, cache).charCodeAt();
        var max = handler.gen(node.end, result, cache).charCodeAt();
        return String.fromCharCode(random.integer(min, max));
      },
      literal: function(node) {
        return node.escaped ? node.body : node.text;
      },
      // Unicode \u
      unicode: function(node) {
        return String.fromCharCode(parseInt(node.code, 16));
      },
      // 十六进制 \xFF
      hex: function(node) {
        return String.fromCharCode(parseInt(node.code, 16));
      },
      octal: function(node) {
        return String.fromCharCode(parseInt(node.code, 8));
      },
      // 反向引用
      "back-reference": function(node, result, cache) {
        return cache[node.code] || "";
      },
      // http://en.wikipedia.org/wiki/C0_and_C1_control_codes
      CONTROL_CHARACTER_MAP: function() {
        var CONTROL_CHARACTER = "@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _".split(" ");
        var CONTROL_CHARACTER_UNICODE = "\0       \x07 \b 	 \n \v \f \r              \x1B    ".split(" ");
        var map = {};
        for (var i = 0; i < CONTROL_CHARACTER.length; i++) {
          map[CONTROL_CHARACTER[i]] = CONTROL_CHARACTER_UNICODE[i];
        }
        return map;
      }(),
      "control-character": function(node) {
        return this.CONTROL_CHARACTER_MAP[node.code];
      }
    };
    function Token(n2) {
      this.type = n2, this.offset = Token.offset(), this.text = Token.text();
    }
    function Alternate(n2, l) {
      Token.call(this, "alternate"), this.left = n2, this.right = l;
    }
    function Match(n2) {
      Token.call(this, "match"), this.body = n2.filter(Boolean);
    }
    function Group(n2, l) {
      Token.call(this, n2), this.body = l;
    }
    function CaptureGroup(n2) {
      Group.call(this, "capture-group"), this.index = cgs[this.offset] || (cgs[this.offset] = index2++), this.body = n2;
    }
    function Quantified(n2, l) {
      Token.call(this, "quantified"), this.body = n2, this.quantifier = l;
    }
    function Quantifier(n2, l) {
      Token.call(this, "quantifier"), this.min = n2, this.max = l, this.greedy = true;
    }
    function CharSet(n2, l) {
      Token.call(this, "charset"), this.invert = n2, this.body = l;
    }
    function CharacterRange(n2, l) {
      Token.call(this, "range"), this.start = n2, this.end = l;
    }
    function Literal(n2) {
      Token.call(this, "literal"), this.body = n2, this.escaped = this.body != this.text;
    }
    function Unicode(n2) {
      Token.call(this, "unicode"), this.code = n2.toUpperCase();
    }
    function Hex(n2) {
      Token.call(this, "hex"), this.code = n2.toUpperCase();
    }
    function Octal(n2) {
      Token.call(this, "octal"), this.code = n2.toUpperCase();
    }
    function BackReference(n2) {
      Token.call(this, "back-reference"), this.code = n2.toUpperCase();
    }
    function ControlCharacter(n2) {
      Token.call(this, "control-character"), this.code = n2.toUpperCase();
    }
    var parser = function() {
      function n2(n3, l2) {
        function u2() {
          this.constructor = n3;
        }
        u2.prototype = l2.prototype, n3.prototype = new u2();
      }
      function l(n3, l2, u2, t2, r) {
        function e2(n4, l3) {
          function u3(n5) {
            function l4(n6) {
              return n6.charCodeAt(0).toString(16).toUpperCase();
            }
            return n5.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(
              /[\x00-\x07\x0B\x0E\x0F]/g,
              function(n6) {
                return "\\x0" + l4(n6);
              }
            ).replace(/[\x10-\x1F\x80-\xFF]/g, function(n6) {
              return "\\x" + l4(n6);
            }).replace(/[\u0180-\u0FFF]/g, function(n6) {
              return "\\u0" + l4(n6);
            }).replace(/[\u1080-\uFFFF]/g, function(n6) {
              return "\\u" + l4(n6);
            });
          }
          var t3, r2;
          switch (n4.length) {
            case 0:
              t3 = "end of input";
              break;
            case 1:
              t3 = n4[0];
              break;
            default:
              t3 = n4.slice(0, -1).join(", ") + " or " + n4[n4.length - 1];
          }
          return r2 = l3 ? '"' + u3(l3) + '"' : "end of input", "Expected " + t3 + " but " + r2 + " found.";
        }
        this.expected = n3, this.found = l2, this.offset = u2, this.line = t2, this.column = r, this.name = "SyntaxError", this.message = e2(n3, l2);
      }
      function u(n3) {
        function u2() {
          return n3.substring(Lt, qt);
        }
        function t2() {
          return Lt;
        }
        function r(l2) {
          function u3(l3, u4, t3) {
            var r2, e3;
            for (r2 = u4; t3 > r2; r2++)
              e3 = n3.charAt(r2), "\n" === e3 ? (l3.seenCR || l3.line++, l3.column = 1, l3.seenCR = false) : "\r" === e3 || "\u2028" === e3 || "\u2029" === e3 ? (l3.line++, l3.column = 1, l3.seenCR = true) : (l3.column++, l3.seenCR = false);
          }
          return Mt !== l2 && (Mt > l2 && (Mt = 0, Dt = {
            line: 1,
            column: 1,
            seenCR: false
          }), u3(Dt, Mt, l2), Mt = l2), Dt;
        }
        function e2(n4) {
          Ht > qt || (qt > Ht && (Ht = qt, Ot = []), Ot.push(n4));
        }
        function o2(n4) {
          var l2 = 0;
          for (n4.sort(); l2 < n4.length; )
            n4[l2 - 1] === n4[l2] ? n4.splice(l2, 1) : l2++;
        }
        function c() {
          var l2, u3, t3, r2, o3;
          return l2 = qt, u3 = i(), null !== u3 ? (t3 = qt, 124 === n3.charCodeAt(qt) ? (r2 = fl, qt++) : (r2 = null, 0 === Wt && e2(sl)), null !== r2 ? (o3 = c(), null !== o3 ? (r2 = [r2, o3], t3 = r2) : (qt = t3, t3 = il)) : (qt = t3, t3 = il), null === t3 && (t3 = al), null !== t3 ? (Lt = l2, u3 = hl(u3, t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
        }
        function i() {
          var n4, l2, u3, t3, r2;
          if (n4 = qt, l2 = f2(), null === l2 && (l2 = al), null !== l2)
            if (u3 = qt, Wt++, t3 = d(), Wt--, null === t3 ? u3 = al : (qt = u3, u3 = il), null !== u3) {
              for (t3 = [], r2 = h(), null === r2 && (r2 = a()); null !== r2; )
                t3.push(r2), r2 = h(), null === r2 && (r2 = a());
              null !== t3 ? (r2 = s2(), null === r2 && (r2 = al), null !== r2 ? (Lt = n4, l2 = dl(l2, t3, r2), null === l2 ? (qt = n4, n4 = l2) : n4 = l2) : (qt = n4, n4 = il)) : (qt = n4, n4 = il);
            } else
              qt = n4, n4 = il;
          else
            qt = n4, n4 = il;
          return n4;
        }
        function a() {
          var n4;
          return n4 = x(), null === n4 && (n4 = Q(), null === n4 && (n4 = B())), n4;
        }
        function f2() {
          var l2, u3;
          return l2 = qt, 94 === n3.charCodeAt(qt) ? (u3 = pl, qt++) : (u3 = null, 0 === Wt && e2(vl)), null !== u3 && (Lt = l2, u3 = wl()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function s2() {
          var l2, u3;
          return l2 = qt, 36 === n3.charCodeAt(qt) ? (u3 = Al, qt++) : (u3 = null, 0 === Wt && e2(Cl)), null !== u3 && (Lt = l2, u3 = gl()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function h() {
          var n4, l2, u3;
          return n4 = qt, l2 = a(), null !== l2 ? (u3 = d(), null !== u3 ? (Lt = n4, l2 = bl(l2, u3), null === l2 ? (qt = n4, n4 = l2) : n4 = l2) : (qt = n4, n4 = il)) : (qt = n4, n4 = il), n4;
        }
        function d() {
          var n4, l2, u3;
          return Wt++, n4 = qt, l2 = p2(), null !== l2 ? (u3 = k(), null === u3 && (u3 = al), null !== u3 ? (Lt = n4, l2 = Tl(l2, u3), null === l2 ? (qt = n4, n4 = l2) : n4 = l2) : (qt = n4, n4 = il)) : (qt = n4, n4 = il), Wt--, null === n4 && (l2 = null, 0 === Wt && e2(kl)), n4;
        }
        function p2() {
          var n4;
          return n4 = v(), null === n4 && (n4 = w(), null === n4 && (n4 = A(), null === n4 && (n4 = C(), null === n4 && (n4 = g(), null === n4 && (n4 = b()))))), n4;
        }
        function v() {
          var l2, u3, t3, r2, o3, c2;
          return l2 = qt, 123 === n3.charCodeAt(qt) ? (u3 = xl, qt++) : (u3 = null, 0 === Wt && e2(yl)), null !== u3 ? (t3 = T(), null !== t3 ? (44 === n3.charCodeAt(qt) ? (r2 = ml, qt++) : (r2 = null, 0 === Wt && e2(Rl)), null !== r2 ? (o3 = T(), null !== o3 ? (125 === n3.charCodeAt(qt) ? (c2 = Fl, qt++) : (c2 = null, 0 === Wt && e2(Ql)), null !== c2 ? (Lt = l2, u3 = Sl(t3, o3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
        }
        function w() {
          var l2, u3, t3, r2;
          return l2 = qt, 123 === n3.charCodeAt(qt) ? (u3 = xl, qt++) : (u3 = null, 0 === Wt && e2(yl)), null !== u3 ? (t3 = T(), null !== t3 ? (n3.substr(qt, 2) === Ul ? (r2 = Ul, qt += 2) : (r2 = null, 0 === Wt && e2(El)), null !== r2 ? (Lt = l2, u3 = Gl(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
        }
        function A() {
          var l2, u3, t3, r2;
          return l2 = qt, 123 === n3.charCodeAt(qt) ? (u3 = xl, qt++) : (u3 = null, 0 === Wt && e2(yl)), null !== u3 ? (t3 = T(), null !== t3 ? (125 === n3.charCodeAt(qt) ? (r2 = Fl, qt++) : (r2 = null, 0 === Wt && e2(Ql)), null !== r2 ? (Lt = l2, u3 = Bl(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
        }
        function C() {
          var l2, u3;
          return l2 = qt, 43 === n3.charCodeAt(qt) ? (u3 = jl, qt++) : (u3 = null, 0 === Wt && e2($l)), null !== u3 && (Lt = l2, u3 = ql()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function g() {
          var l2, u3;
          return l2 = qt, 42 === n3.charCodeAt(qt) ? (u3 = Ll, qt++) : (u3 = null, 0 === Wt && e2(Ml)), null !== u3 && (Lt = l2, u3 = Dl()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function b() {
          var l2, u3;
          return l2 = qt, 63 === n3.charCodeAt(qt) ? (u3 = Hl, qt++) : (u3 = null, 0 === Wt && e2(Ol)), null !== u3 && (Lt = l2, u3 = Wl()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function k() {
          var l2;
          return 63 === n3.charCodeAt(qt) ? (l2 = Hl, qt++) : (l2 = null, 0 === Wt && e2(Ol)), l2;
        }
        function T() {
          var l2, u3, t3;
          if (l2 = qt, u3 = [], zl.test(n3.charAt(qt)) ? (t3 = n3.charAt(qt), qt++) : (t3 = null, 0 === Wt && e2(Il)), null !== t3)
            for (; null !== t3; )
              u3.push(t3), zl.test(n3.charAt(qt)) ? (t3 = n3.charAt(qt), qt++) : (t3 = null, 0 === Wt && e2(Il));
          else
            u3 = il;
          return null !== u3 && (Lt = l2, u3 = Jl(u3)), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function x() {
          var l2, u3, t3, r2;
          return l2 = qt, 40 === n3.charCodeAt(qt) ? (u3 = Kl, qt++) : (u3 = null, 0 === Wt && e2(Nl)), null !== u3 ? (t3 = R(), null === t3 && (t3 = F(), null === t3 && (t3 = m(), null === t3 && (t3 = y()))), null !== t3 ? (41 === n3.charCodeAt(qt) ? (r2 = Pl, qt++) : (r2 = null, 0 === Wt && e2(Vl)), null !== r2 ? (Lt = l2, u3 = Xl(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
        }
        function y() {
          var n4, l2;
          return n4 = qt, l2 = c(), null !== l2 && (Lt = n4, l2 = Yl(l2)), null === l2 ? (qt = n4, n4 = l2) : n4 = l2, n4;
        }
        function m() {
          var l2, u3, t3;
          return l2 = qt, n3.substr(qt, 2) === Zl ? (u3 = Zl, qt += 2) : (u3 = null, 0 === Wt && e2(_l)), null !== u3 ? (t3 = c(), null !== t3 ? (Lt = l2, u3 = nu(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
        }
        function R() {
          var l2, u3, t3;
          return l2 = qt, n3.substr(qt, 2) === lu ? (u3 = lu, qt += 2) : (u3 = null, 0 === Wt && e2(uu)), null !== u3 ? (t3 = c(), null !== t3 ? (Lt = l2, u3 = tu(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
        }
        function F() {
          var l2, u3, t3;
          return l2 = qt, n3.substr(qt, 2) === ru ? (u3 = ru, qt += 2) : (u3 = null, 0 === Wt && e2(eu)), null !== u3 ? (t3 = c(), null !== t3 ? (Lt = l2, u3 = ou(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
        }
        function Q() {
          var l2, u3, t3, r2, o3;
          if (Wt++, l2 = qt, 91 === n3.charCodeAt(qt) ? (u3 = iu, qt++) : (u3 = null, 0 === Wt && e2(au)), null !== u3)
            if (94 === n3.charCodeAt(qt) ? (t3 = pl, qt++) : (t3 = null, 0 === Wt && e2(vl)), null === t3 && (t3 = al), null !== t3) {
              for (r2 = [], o3 = S(), null === o3 && (o3 = U()); null !== o3; )
                r2.push(o3), o3 = S(), null === o3 && (o3 = U());
              null !== r2 ? (93 === n3.charCodeAt(qt) ? (o3 = fu, qt++) : (o3 = null, 0 === Wt && e2(su)), null !== o3 ? (Lt = l2, u3 = hu(t3, r2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il);
            } else
              qt = l2, l2 = il;
          else
            qt = l2, l2 = il;
          return Wt--, null === l2 && (u3 = null, 0 === Wt && e2(cu)), l2;
        }
        function S() {
          var l2, u3, t3, r2;
          return Wt++, l2 = qt, u3 = U(), null !== u3 ? (45 === n3.charCodeAt(qt) ? (t3 = pu, qt++) : (t3 = null, 0 === Wt && e2(vu)), null !== t3 ? (r2 = U(), null !== r2 ? (Lt = l2, u3 = wu(u3, r2), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), Wt--, null === l2 && (u3 = null, 0 === Wt && e2(du)), l2;
        }
        function U() {
          var n4;
          return Wt++, n4 = G(), null === n4 && (n4 = E2()), Wt--, null === n4 && (0 === Wt && e2(Au)), n4;
        }
        function E2() {
          var l2, u3;
          return l2 = qt, Cu.test(n3.charAt(qt)) ? (u3 = n3.charAt(qt), qt++) : (u3 = null, 0 === Wt && e2(gu)), null !== u3 && (Lt = l2, u3 = bu(u3)), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function G() {
          var n4;
          return n4 = L(), null === n4 && (n4 = Y(), null === n4 && (n4 = H(), null === n4 && (n4 = O(), null === n4 && (n4 = W(), null === n4 && (n4 = z(), null === n4 && (n4 = I(), null === n4 && (n4 = J(), null === n4 && (n4 = K(), null === n4 && (n4 = N(), null === n4 && (n4 = P(), null === n4 && (n4 = V(), null === n4 && (n4 = X(), null === n4 && (n4 = _(), null === n4 && (n4 = nl(), null === n4 && (n4 = ll(), null === n4 && (n4 = ul(), null === n4 && (n4 = tl()))))))))))))))))), n4;
        }
        function B() {
          var n4;
          return n4 = j(), null === n4 && (n4 = q(), null === n4 && (n4 = $())), n4;
        }
        function j() {
          var l2, u3;
          return l2 = qt, 46 === n3.charCodeAt(qt) ? (u3 = ku, qt++) : (u3 = null, 0 === Wt && e2(Tu)), null !== u3 && (Lt = l2, u3 = xu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function $() {
          var l2, u3;
          return Wt++, l2 = qt, mu.test(n3.charAt(qt)) ? (u3 = n3.charAt(qt), qt++) : (u3 = null, 0 === Wt && e2(Ru)), null !== u3 && (Lt = l2, u3 = bu(u3)), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, Wt--, null === l2 && (u3 = null, 0 === Wt && e2(yu)), l2;
        }
        function q() {
          var n4;
          return n4 = M(), null === n4 && (n4 = D(), null === n4 && (n4 = Y(), null === n4 && (n4 = H(), null === n4 && (n4 = O(), null === n4 && (n4 = W(), null === n4 && (n4 = z(), null === n4 && (n4 = I(), null === n4 && (n4 = J(), null === n4 && (n4 = K(), null === n4 && (n4 = N(), null === n4 && (n4 = P(), null === n4 && (n4 = V(), null === n4 && (n4 = X(), null === n4 && (n4 = Z(), null === n4 && (n4 = _(), null === n4 && (n4 = nl(), null === n4 && (n4 = ll(), null === n4 && (n4 = ul(), null === n4 && (n4 = tl()))))))))))))))))))), n4;
        }
        function L() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === Fu ? (u3 = Fu, qt += 2) : (u3 = null, 0 === Wt && e2(Qu)), null !== u3 && (Lt = l2, u3 = Su()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function M() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === Fu ? (u3 = Fu, qt += 2) : (u3 = null, 0 === Wt && e2(Qu)), null !== u3 && (Lt = l2, u3 = Uu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function D() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === Eu ? (u3 = Eu, qt += 2) : (u3 = null, 0 === Wt && e2(Gu)), null !== u3 && (Lt = l2, u3 = Bu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function H() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === ju ? (u3 = ju, qt += 2) : (u3 = null, 0 === Wt && e2($u)), null !== u3 && (Lt = l2, u3 = qu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function O() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === Lu ? (u3 = Lu, qt += 2) : (u3 = null, 0 === Wt && e2(Mu)), null !== u3 && (Lt = l2, u3 = Du()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function W() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === Hu ? (u3 = Hu, qt += 2) : (u3 = null, 0 === Wt && e2(Ou)), null !== u3 && (Lt = l2, u3 = Wu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function z() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === zu ? (u3 = zu, qt += 2) : (u3 = null, 0 === Wt && e2(Iu)), null !== u3 && (Lt = l2, u3 = Ju()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function I() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === Ku ? (u3 = Ku, qt += 2) : (u3 = null, 0 === Wt && e2(Nu)), null !== u3 && (Lt = l2, u3 = Pu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function J() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === Vu ? (u3 = Vu, qt += 2) : (u3 = null, 0 === Wt && e2(Xu)), null !== u3 && (Lt = l2, u3 = Yu()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function K() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === Zu ? (u3 = Zu, qt += 2) : (u3 = null, 0 === Wt && e2(_u)), null !== u3 && (Lt = l2, u3 = nt()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function N() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === lt ? (u3 = lt, qt += 2) : (u3 = null, 0 === Wt && e2(ut)), null !== u3 && (Lt = l2, u3 = tt2()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function P() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === rt ? (u3 = rt, qt += 2) : (u3 = null, 0 === Wt && e2(et)), null !== u3 && (Lt = l2, u3 = ot()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function V() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === ct ? (u3 = ct, qt += 2) : (u3 = null, 0 === Wt && e2(it)), null !== u3 && (Lt = l2, u3 = at()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function X() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === ft ? (u3 = ft, qt += 2) : (u3 = null, 0 === Wt && e2(st)), null !== u3 && (Lt = l2, u3 = ht()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function Y() {
          var l2, u3, t3;
          return l2 = qt, n3.substr(qt, 2) === dt ? (u3 = dt, qt += 2) : (u3 = null, 0 === Wt && e2(pt)), null !== u3 ? (n3.length > qt ? (t3 = n3.charAt(qt), qt++) : (t3 = null, 0 === Wt && e2(vt)), null !== t3 ? (Lt = l2, u3 = wt(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
        }
        function Z() {
          var l2, u3, t3;
          return l2 = qt, 92 === n3.charCodeAt(qt) ? (u3 = At, qt++) : (u3 = null, 0 === Wt && e2(Ct)), null !== u3 ? (gt.test(n3.charAt(qt)) ? (t3 = n3.charAt(qt), qt++) : (t3 = null, 0 === Wt && e2(bt)), null !== t3 ? (Lt = l2, u3 = kt(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
        }
        function _() {
          var l2, u3, t3, r2;
          if (l2 = qt, n3.substr(qt, 2) === Tt ? (u3 = Tt, qt += 2) : (u3 = null, 0 === Wt && e2(xt)), null !== u3) {
            if (t3 = [], yt.test(n3.charAt(qt)) ? (r2 = n3.charAt(qt), qt++) : (r2 = null, 0 === Wt && e2(mt)), null !== r2)
              for (; null !== r2; )
                t3.push(r2), yt.test(n3.charAt(qt)) ? (r2 = n3.charAt(qt), qt++) : (r2 = null, 0 === Wt && e2(mt));
            else
              t3 = il;
            null !== t3 ? (Lt = l2, u3 = Rt(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il);
          } else
            qt = l2, l2 = il;
          return l2;
        }
        function nl() {
          var l2, u3, t3, r2;
          if (l2 = qt, n3.substr(qt, 2) === Ft ? (u3 = Ft, qt += 2) : (u3 = null, 0 === Wt && e2(Qt)), null !== u3) {
            if (t3 = [], St.test(n3.charAt(qt)) ? (r2 = n3.charAt(qt), qt++) : (r2 = null, 0 === Wt && e2(Ut)), null !== r2)
              for (; null !== r2; )
                t3.push(r2), St.test(n3.charAt(qt)) ? (r2 = n3.charAt(qt), qt++) : (r2 = null, 0 === Wt && e2(Ut));
            else
              t3 = il;
            null !== t3 ? (Lt = l2, u3 = Et(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il);
          } else
            qt = l2, l2 = il;
          return l2;
        }
        function ll() {
          var l2, u3, t3, r2;
          if (l2 = qt, n3.substr(qt, 2) === Gt ? (u3 = Gt, qt += 2) : (u3 = null, 0 === Wt && e2(Bt)), null !== u3) {
            if (t3 = [], St.test(n3.charAt(qt)) ? (r2 = n3.charAt(qt), qt++) : (r2 = null, 0 === Wt && e2(Ut)), null !== r2)
              for (; null !== r2; )
                t3.push(r2), St.test(n3.charAt(qt)) ? (r2 = n3.charAt(qt), qt++) : (r2 = null, 0 === Wt && e2(Ut));
            else
              t3 = il;
            null !== t3 ? (Lt = l2, u3 = jt(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il);
          } else
            qt = l2, l2 = il;
          return l2;
        }
        function ul() {
          var l2, u3;
          return l2 = qt, n3.substr(qt, 2) === Tt ? (u3 = Tt, qt += 2) : (u3 = null, 0 === Wt && e2(xt)), null !== u3 && (Lt = l2, u3 = $t()), null === u3 ? (qt = l2, l2 = u3) : l2 = u3, l2;
        }
        function tl() {
          var l2, u3, t3;
          return l2 = qt, 92 === n3.charCodeAt(qt) ? (u3 = At, qt++) : (u3 = null, 0 === Wt && e2(Ct)), null !== u3 ? (n3.length > qt ? (t3 = n3.charAt(qt), qt++) : (t3 = null, 0 === Wt && e2(vt)), null !== t3 ? (Lt = l2, u3 = bu(t3), null === u3 ? (qt = l2, l2 = u3) : l2 = u3) : (qt = l2, l2 = il)) : (qt = l2, l2 = il), l2;
        }
        var rl, el = arguments.length > 1 ? arguments[1] : {}, ol = {
          regexp: c
        }, cl = c, il = null, al = "", fl = "|", sl = '"|"', hl = function(n4, l2) {
          return l2 ? new Alternate(n4, l2[1]) : n4;
        }, dl = function(n4, l2, u3) {
          return new Match([n4].concat(l2).concat([u3]));
        }, pl = "^", vl = '"^"', wl = function() {
          return new Token("start");
        }, Al = "$", Cl = '"$"', gl = function() {
          return new Token("end");
        }, bl = function(n4, l2) {
          return new Quantified(n4, l2);
        }, kl = "Quantifier", Tl = function(n4, l2) {
          return l2 && (n4.greedy = false), n4;
        }, xl = "{", yl = '"{"', ml = ",", Rl = '","', Fl = "}", Ql = '"}"', Sl = function(n4, l2) {
          return new Quantifier(n4, l2);
        }, Ul = ",}", El = '",}"', Gl = function(n4) {
          return new Quantifier(n4, 1 / 0);
        }, Bl = function(n4) {
          return new Quantifier(n4, n4);
        }, jl = "+", $l = '"+"', ql = function() {
          return new Quantifier(1, 1 / 0);
        }, Ll = "*", Ml = '"*"', Dl = function() {
          return new Quantifier(0, 1 / 0);
        }, Hl = "?", Ol = '"?"', Wl = function() {
          return new Quantifier(0, 1);
        }, zl = /^[0-9]/, Il = "[0-9]", Jl = function(n4) {
          return +n4.join("");
        }, Kl = "(", Nl = '"("', Pl = ")", Vl = '")"', Xl = function(n4) {
          return n4;
        }, Yl = function(n4) {
          return new CaptureGroup(n4);
        }, Zl = "?:", _l = '"?:"', nu = function(n4) {
          return new Group("non-capture-group", n4);
        }, lu = "?=", uu = '"?="', tu = function(n4) {
          return new Group("positive-lookahead", n4);
        }, ru = "?!", eu = '"?!"', ou = function(n4) {
          return new Group("negative-lookahead", n4);
        }, cu = "CharacterSet", iu = "[", au = '"["', fu = "]", su = '"]"', hu = function(n4, l2) {
          return new CharSet(!!n4, l2);
        }, du = "CharacterRange", pu = "-", vu = '"-"', wu = function(n4, l2) {
          return new CharacterRange(n4, l2);
        }, Au = "Character", Cu = /^[^\\\]]/, gu = "[^\\\\\\]]", bu = function(n4) {
          return new Literal(n4);
        }, ku = ".", Tu = '"."', xu = function() {
          return new Token("any-character");
        }, yu = "Literal", mu = /^[^|\\\/.[()?+*$\^]/, Ru = "[^|\\\\\\/.[()?+*$\\^]", Fu = "\\b", Qu = '"\\\\b"', Su = function() {
          return new Token("backspace");
        }, Uu = function() {
          return new Token("word-boundary");
        }, Eu = "\\B", Gu = '"\\\\B"', Bu = function() {
          return new Token("non-word-boundary");
        }, ju = "\\d", $u = '"\\\\d"', qu = function() {
          return new Token("digit");
        }, Lu = "\\D", Mu = '"\\\\D"', Du = function() {
          return new Token("non-digit");
        }, Hu = "\\f", Ou = '"\\\\f"', Wu = function() {
          return new Token("form-feed");
        }, zu = "\\n", Iu = '"\\\\n"', Ju = function() {
          return new Token("line-feed");
        }, Ku = "\\r", Nu = '"\\\\r"', Pu = function() {
          return new Token("carriage-return");
        }, Vu = "\\s", Xu = '"\\\\s"', Yu = function() {
          return new Token("white-space");
        }, Zu = "\\S", _u = '"\\\\S"', nt = function() {
          return new Token("non-white-space");
        }, lt = "\\t", ut = '"\\\\t"', tt2 = function() {
          return new Token("tab");
        }, rt = "\\v", et = '"\\\\v"', ot = function() {
          return new Token("vertical-tab");
        }, ct = "\\w", it = '"\\\\w"', at = function() {
          return new Token("word");
        }, ft = "\\W", st = '"\\\\W"', ht = function() {
          return new Token("non-word");
        }, dt = "\\c", pt = '"\\\\c"', vt = "any character", wt = function(n4) {
          return new ControlCharacter(n4);
        }, At = "\\", Ct = '"\\\\"', gt = /^[1-9]/, bt = "[1-9]", kt = function(n4) {
          return new BackReference(n4);
        }, Tt = "\\0", xt = '"\\\\0"', yt = /^[0-7]/, mt = "[0-7]", Rt = function(n4) {
          return new Octal(n4.join(""));
        }, Ft = "\\x", Qt = '"\\\\x"', St = /^[0-9a-fA-F]/, Ut = "[0-9a-fA-F]", Et = function(n4) {
          return new Hex(n4.join(""));
        }, Gt = "\\u", Bt = '"\\\\u"', jt = function(n4) {
          return new Unicode(n4.join(""));
        }, $t = function() {
          return new Token("null-character");
        }, qt = 0, Lt = 0, Mt = 0, Dt = {
          line: 1,
          column: 1,
          seenCR: false
        }, Ht = 0, Ot = [], Wt = 0;
        if ("startRule" in el) {
          if (!(el.startRule in ol))
            throw new Error(`Can't start parsing from rule "` + el.startRule + '".');
          cl = ol[el.startRule];
        }
        if (Token.offset = t2, Token.text = u2, rl = cl(), null !== rl && qt === n3.length)
          return rl;
        throw o2(Ot), Lt = Math.max(qt, Ht), new l(Ot, Lt < n3.length ? n3.charAt(Lt) : null, Lt, r(Lt).line, r(Lt).column);
      }
      return n2(l, Error), {
        SyntaxError: l,
        parse: u
      };
    }(), index2 = 1, cgs = {};
    var RE = {
      Parser: parser,
      Handler: handler
    };
    var handler$1 = {
      // template        属性值（即数据模板）
      // name            属性名
      // context         数据上下文，生成后的数据
      // templateContext 模板上下文，
      //
      // Handle.gen(template, name, options)
      // context
      //     currentContext, templateCurrentContext,
      //     path, templatePath
      //     root, templateRoot
      gen: function(template, name2, context) {
        name2 = name2 === void 0 ? "" : name2.toString();
        context = context || {};
        context = {
          // 当前访问路径，只有属性名，不包括生成规则
          path: context.path || [constant.GUID],
          templatePath: context.templatePath || [constant.GUID++],
          currentContext: context.currentContext,
          templateCurrentContext: context.templateCurrentContext || template,
          root: context.root || context.currentContext,
          templateRoot: context.templateRoot || context.templateCurrentContext || template
        };
        var rule = parse(name2);
        var type$1 = type(template);
        var data;
        if (handler$1[type$1]) {
          data = handler$1[type$1]({
            type: type$1,
            template,
            name: name2,
            rule,
            context,
            parsedName: name2 ? name2.replace(constant.RE_KEY, "$1") : name2
          });
          if (!context.root) {
            context.root = data;
          }
          return data;
        }
        return template;
      },
      array: function(options) {
        var result = [];
        if (options.template.length === 0)
          return result;
        if (!options.rule.parameters) {
          for (var i = 0; i < options.template.length; i++) {
            options.context.path.push(i);
            options.context.templatePath.push(i);
            result.push(handler$1.gen(options.template[i], i, {
              path: options.context.path,
              templatePath: options.context.templatePath,
              currentContext: result,
              templateCurrentContext: options.template,
              root: options.context.root || result,
              templateRoot: options.context.templateRoot || options.template
            }));
            options.context.path.pop();
            options.context.templatePath.pop();
          }
        } else {
          if (options.rule.min === 1 && options.rule.max === void 0) {
            options.context.path.push(options.name);
            options.context.templatePath.push(options.name);
            result = random.pick(handler$1.gen(options.template, void 0, {
              path: options.context.path,
              templatePath: options.context.templatePath,
              currentContext: result,
              templateCurrentContext: options.template,
              root: options.context.root || result,
              templateRoot: options.context.templateRoot || options.template
            }));
            options.context.path.pop();
            options.context.templatePath.pop();
          } else {
            if (options.rule.parameters[2]) {
              options.template.__order_index = options.template.__order_index || 0;
              options.context.path.push(options.name);
              options.context.templatePath.push(options.name);
              result = handler$1.gen(options.template, void 0, {
                path: options.context.path,
                templatePath: options.context.templatePath,
                currentContext: result,
                templateCurrentContext: options.template,
                root: options.context.root || result,
                templateRoot: options.context.templateRoot || options.template
              })[options.template.__order_index % options.template.length];
              options.template.__order_index += +options.rule.parameters[2];
              options.context.path.pop();
              options.context.templatePath.pop();
            } else if (options.rule.count) {
              for (var i = 0; i < options.rule.count; i++) {
                for (var ii = 0; ii < options.template.length; ii++) {
                  options.context.path.push(result.length);
                  options.context.templatePath.push(ii);
                  result.push(handler$1.gen(options.template[ii], result.length, {
                    path: options.context.path,
                    templatePath: options.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options.template,
                    root: options.context.root || result,
                    templateRoot: options.context.templateRoot || options.template
                  }));
                  options.context.path.pop();
                  options.context.templatePath.pop();
                }
              }
            }
          }
        }
        return result;
      },
      object: function(options) {
        var result = {};
        if (options.rule.min != void 0) {
          var keys$1 = keys(options.template);
          keys$1 = random.shuffle(keys$1);
          keys$1 = keys$1.slice(0, options.rule.count);
          for (var i = 0; i < keys$1.length; i++) {
            var key2 = keys$1[i];
            var parsedKey = key2.replace(constant.RE_KEY, "$1");
            var transferTypeCtor = handler$1.getTransferTypeCtor(key2);
            if (transferTypeCtor) {
              parsedKey = parsedKey.replace(constant.RE_TRANSFER_TYPE, "");
            }
            options.context.path.push(parsedKey);
            options.context.templatePath.push(key2);
            var generatedValue = handler$1.gen(options.template[key2], key2, {
              path: options.context.path,
              templatePath: options.context.templatePath,
              currentContext: result,
              templateCurrentContext: options.template,
              root: options.context.root || result,
              templateRoot: options.context.templateRoot || options.template
            });
            result[parsedKey] = transferTypeCtor(generatedValue);
            options.context.path.pop();
            options.context.templatePath.pop();
          }
        } else {
          var keys$1 = [];
          var fnKeys = [];
          for (var key2 in options.template) {
            var target = typeof options.template[key2] === "function" ? fnKeys : keys$1;
            target.push(key2);
          }
          keys$1 = keys$1.concat(fnKeys);
          for (var i = 0; i < keys$1.length; i++) {
            var key2 = keys$1[i];
            var parsedKey = key2.replace(constant.RE_KEY, "$1");
            var transferTypeCtor = handler$1.getTransferTypeCtor(key2);
            if (transferTypeCtor) {
              parsedKey = parsedKey.replace(constant.RE_TRANSFER_TYPE, "");
            }
            options.context.path.push(parsedKey);
            options.context.templatePath.push(key2);
            var generatedValue = handler$1.gen(options.template[key2], key2, {
              path: options.context.path,
              templatePath: options.context.templatePath,
              currentContext: result,
              templateCurrentContext: options.template,
              root: options.context.root || result,
              templateRoot: options.context.templateRoot || options.template
            });
            result[parsedKey] = transferTypeCtor(generatedValue);
            options.context.path.pop();
            options.context.templatePath.pop();
            var inc2 = key2.match(constant.RE_KEY);
            if (inc2 && inc2[2] && type(options.template[key2]) === "number") {
              options.template[key2] += parseInt(inc2[2], 10);
            }
          }
        }
        return result;
      },
      number: function(options) {
        var result;
        var parts;
        if (options.rule.decimal) {
          options.template += "";
          parts = options.template.split(".");
          parts[0] = options.rule.range ? options.rule.count : parts[0];
          parts[1] = (parts[1] || "").slice(0, options.rule.dcount);
          while (parts[1].length < options.rule.dcount) {
            parts[1] += parts[1].length < options.rule.dcount - 1 ? random.character("number") : random.character("123456789");
          }
          result = parseFloat(parts.join("."));
        } else {
          result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template;
        }
        return result;
      },
      boolean: function(options) {
        var result = options.rule.parameters ? random.bool(Number(options.rule.min), Number(options.rule.max), options.template) : options.template;
        return result;
      },
      string: function(options) {
        var source = "";
        var result = "";
        var match;
        var lastIndex = 0;
        if (options.template.length) {
          if (options.rule.count === void 0) {
            source += options.template;
          } else {
            for (var i = 0; i < options.rule.count; i++) {
              source += options.template;
            }
          }
          constant.RE_PLACEHOLDER.exec("");
          while (match = constant.RE_PLACEHOLDER.exec(source)) {
            var index3 = match.index;
            var input = match[0];
            if (index3 >= lastIndex) {
              if (/^\\/.test(input)) {
                result += source.slice(lastIndex, index3) + input.slice(1);
                lastIndex = index3 + input.length;
                continue;
              }
              var replaced = handler$1.placeholder(input, options.context.currentContext, options.context.templateCurrentContext, options);
              if (index3 === 0 && input.length === source.length) {
                result = replaced;
              } else {
                result += source.slice(lastIndex, index3) + replaced;
              }
              lastIndex = index3 + input.length;
            }
          }
          if (lastIndex < source.length) {
            result += source.slice(lastIndex);
          }
        } else {
          result = options.rule.range ? random.string(options.rule.count) : options.template;
        }
        return result;
      },
      function: function(options) {
        return options.template.call(options.context.currentContext, options);
      },
      regexp: function(options) {
        var source = "";
        if (options.rule.count === void 0) {
          source += options.template.source;
        } else {
          for (var i = 0; i < options.rule.count; i++) {
            source += options.template.source;
          }
        }
        return RE.Handler.gen(RE.Parser.parse(source));
      },
      _all: function() {
        var re = {};
        for (var key2 in random) {
          re[key2.toLowerCase()] = key2;
        }
        return re;
      },
      // 处理占位符，转换为最终值
      placeholder: function(placeholder, obj, templateContext, options) {
        constant.RE_PLACEHOLDER.exec("");
        var parts = constant.RE_PLACEHOLDER.exec(placeholder);
        var key2 = parts && parts[1];
        var lkey = key2 && key2.toLowerCase();
        var okey = handler$1._all()[lkey];
        parts && parts[2] || "";
        var pathParts = handler$1.splitPathToArray(key2);
        var params = [];
        if (obj && key2 in obj) {
          return obj[key2];
        }
        if (key2.charAt(0) === "/" || pathParts.length > 1) {
          return handler$1.getValueByKeyPath(key2, options);
        }
        if (templateContext && typeof templateContext === "object" && key2 in templateContext && placeholder !== templateContext[key2]) {
          templateContext[key2] = handler$1.gen(templateContext[key2], key2, {
            currentContext: obj,
            templateCurrentContext: templateContext
          });
          return templateContext[key2];
        }
        if (!(key2 in random) && !(lkey in random) && !(okey in random)) {
          return placeholder;
        }
        for (var i = 0; i < params.length; i++) {
          constant.RE_PLACEHOLDER.exec("");
          if (constant.RE_PLACEHOLDER.test(params[i])) {
            params[i] = handler$1.placeholder(params[i], obj, templateContext, options);
          }
        }
        var handle = random[key2] || random[lkey] || random[okey];
        if (isFunction2(handle)) {
          handle.options = options;
          var ret = handle.apply(random, params);
          if (ret === void 0) {
            ret = "";
          }
          delete handle.options;
          return ret;
        }
        return "";
      },
      getValueByKeyPath: function(key2, options) {
        var originalKey = key2;
        var keyPathParts = handler$1.splitPathToArray(key2);
        var absolutePathParts = [];
        if (key2.charAt(0) === "/") {
          absolutePathParts = [options.context.path[0]].concat(handler$1.normalizePath(keyPathParts));
        } else {
          if (keyPathParts.length > 1) {
            absolutePathParts = options.context.path.slice(0);
            absolutePathParts.pop();
            absolutePathParts = handler$1.normalizePath(absolutePathParts.concat(keyPathParts));
          }
        }
        try {
          key2 = keyPathParts[keyPathParts.length - 1];
          var currentContext = options.context.root;
          var templateCurrentContext = options.context.templateRoot;
          for (var i = 1; i < absolutePathParts.length - 1; i++) {
            currentContext = currentContext[absolutePathParts[i]];
            templateCurrentContext = templateCurrentContext[absolutePathParts[i]];
          }
          if (currentContext && key2 in currentContext) {
            return currentContext[key2];
          }
          if (templateCurrentContext && typeof templateCurrentContext === "object" && key2 in templateCurrentContext && originalKey !== templateCurrentContext[key2]) {
            templateCurrentContext[key2] = handler$1.gen(templateCurrentContext[key2], key2, {
              currentContext,
              templateCurrentContext
            });
            return templateCurrentContext[key2];
          }
        } catch (e2) {
        }
        return "@" + keyPathParts.join("/");
      },
      // https://github.com/kissyteam/kissy/blob/master/src/path/src/path.js
      normalizePath: function(pathParts) {
        var newPathParts = [];
        for (var i = 0; i < pathParts.length; i++) {
          switch (pathParts[i]) {
            case "..":
              newPathParts.pop();
              break;
            case ".":
              break;
            default:
              newPathParts.push(pathParts[i]);
          }
        }
        return newPathParts;
      },
      splitPathToArray: function(path) {
        return path.split(/\/+/).filter(function(_) {
          return _;
        });
      },
      getTransferTypeCtor: function(key2) {
        var matched = key2.match(constant.RE_TRANSFER_TYPE);
        var type2 = matched && matched[1];
        if (type2 && transfer.hasOwnProperty(type2) && type2 !== "extend") {
          return transfer[type2];
        }
        return function(value) {
          return value;
        };
      }
    };
    function toJSONSchema(template, name2, path) {
      path = path || [];
      var result = {
        name: typeof name2 === "string" ? name2.replace(constant.RE_KEY, "$1") : name2,
        template,
        type: type(template),
        rule: parse(name2),
        path: path.slice(0)
      };
      result.path.push(name2 === void 0 ? "ROOT" : result.name);
      if (isArray2(template)) {
        result.items = [];
        template.forEach(function(item, index3) {
          result.items.push(toJSONSchema(item, index3, result.path));
        });
      } else if (isObject2(template)) {
        result.properties = [];
        for (var key2 in template) {
          result.properties.push(toJSONSchema(template[key2], key2, result.path));
        }
      }
      return result;
    }
    var Diff = {
      diff: function(schema, data, name2) {
        var result = [];
        if (Diff.name(schema, data, name2, result) && Diff.type(schema, data, name2, result)) {
          Diff.value(schema, data, name2, result);
          Diff.properties(schema, data, name2, result);
          Diff.items(schema, data, name2, result);
        }
        return result;
      },
      /* jshint unused:false */
      name: function(schema, _data, name2, result) {
        var length = result.length;
        Assert.equal("name", schema.path, name2 + "", schema.name + "", result);
        return result.length === length;
      },
      type: function(schema, data, _name, result) {
        var length = result.length;
        if (isString2(schema.template)) {
          if (schema.template.match(constant.RE_PLACEHOLDER)) {
            var actualValue = handler$1.gen(schema.template);
            Assert.equal("type", schema.path, type(data), type(actualValue), result);
            return result.length === length;
          }
        } else if (isArray2(schema.template)) {
          if (schema.rule.parameters) {
            if (schema.rule.min !== void 0 && schema.rule.max === void 0) {
              if (schema.rule.count === 1) {
                return true;
              }
            }
            if (schema.rule.parameters[2]) {
              return true;
            }
          }
        } else if (isFunction2(schema.template)) {
          return true;
        }
        Assert.equal("type", schema.path, type(data), schema.type, result);
        return result.length === length;
      },
      value: function(schema, data, name2, result) {
        var length = result.length;
        var rule = schema.rule;
        var templateType = schema.type;
        if (templateType === "object" || templateType === "array" || templateType === "function") {
          return true;
        }
        if (!rule.parameters) {
          if (isRegExp(schema.template)) {
            Assert.match("value", schema.path, data, schema.template, result);
            return result.length === length;
          }
          if (isString2(schema.template)) {
            if (schema.template.match(constant.RE_PLACEHOLDER)) {
              return result.length === length;
            }
          }
          Assert.equal("value", schema.path, data, schema.template, result);
          return result.length === length;
        }
        var actualRepeatCount;
        if (isNumber(schema.template)) {
          var parts = (data + "").split(".");
          var intPart = Number(parts[0]);
          var floatPart = parts[1];
          if (rule.min !== void 0 && rule.max !== void 0) {
            Assert.greaterThanOrEqualTo("value", schema.path, intPart, Math.min(Number(rule.min), Number(rule.max)), result);
            Assert.lessThanOrEqualTo("value", schema.path, intPart, Math.max(Number(rule.min), Number(rule.max)), result);
          }
          if (rule.min !== void 0 && rule.max === void 0) {
            Assert.equal("value", schema.path, intPart, Number(rule.min), result, "[value] " + name2);
          }
          if (rule.decimal) {
            if (rule.dmin !== void 0 && rule.dmax !== void 0) {
              Assert.greaterThanOrEqualTo("value", schema.path, floatPart.length, Number(rule.dmin), result);
              Assert.lessThanOrEqualTo("value", schema.path, floatPart.length, Number(rule.dmax), result);
            }
            if (rule.dmin !== void 0 && rule.dmax === void 0) {
              Assert.equal("value", schema.path, floatPart.length, Number(rule.dmin), result);
            }
          }
        } else if (isString2(schema.template)) {
          actualRepeatCount = data.match(new RegExp(schema.template, "g"));
          actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;
          if (rule.min !== void 0 && rule.max !== void 0) {
            Assert.greaterThanOrEqualTo(
              "repeat count",
              schema.path,
              actualRepeatCount,
              Number(rule.min),
              result
            );
            Assert.lessThanOrEqualTo("repeat count", schema.path, actualRepeatCount, Number(rule.max), result);
          }
          if (rule.min !== void 0 && rule.max === void 0) {
            Assert.equal("repeat count", schema.path, actualRepeatCount, rule.min, result);
          }
        } else if (isRegExp(schema.template)) {
          actualRepeatCount = data.match(new RegExp(schema.template.source.replace(/^\^|\$$/g, ""), "g"));
          actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;
          if (rule.min !== void 0 && rule.max !== void 0) {
            Assert.greaterThanOrEqualTo(
              "repeat count",
              schema.path,
              actualRepeatCount,
              Number(rule.min),
              result
            );
            Assert.lessThanOrEqualTo("repeat count", schema.path, actualRepeatCount, Number(rule.max), result);
          }
          if (rule.min !== void 0 && rule.max === void 0) {
            Assert.equal("repeat count", schema.path, actualRepeatCount, rule.min, result);
          }
        }
        return result.length === length;
      },
      properties: function(schema, data, _name, result) {
        var length = result.length;
        var rule = schema.rule;
        var keys$1 = keys(data);
        if (!schema.properties) {
          return;
        }
        if (!schema.rule.parameters) {
          Assert.equal("properties length", schema.path, keys$1.length, schema.properties.length, result);
        } else {
          if (rule.min !== void 0 && rule.max !== void 0) {
            Assert.greaterThanOrEqualTo("properties length", schema.path, keys$1.length, Math.min(Number(rule.min), Number(rule.max)), result);
            Assert.lessThanOrEqualTo("properties length", schema.path, keys$1.length, Math.max(
              Number(rule.min),
              Number(rule.max)
            ), result);
          }
          if (rule.min !== void 0 && rule.max === void 0) {
            if (rule.count !== 1) {
              Assert.equal("properties length", schema.path, keys$1.length, Number(rule.min), result);
            }
          }
        }
        if (result.length !== length) {
          return false;
        }
        var _loop_1 = function(i2) {
          var property;
          schema.properties.forEach(function(item) {
            if (item.name === keys$1[i2]) {
              property = item;
            }
          });
          property = property || schema.properties[i2];
          result.push.apply(result, Diff.diff(property, data[keys$1[i2]], keys$1[i2]));
        };
        for (var i = 0; i < keys$1.length; i++) {
          _loop_1(i);
        }
        return result.length === length;
      },
      items: function(schema, data, _name, result) {
        var length = result.length;
        if (!schema.items) {
          return;
        }
        var rule = schema.rule;
        if (!schema.rule.parameters) {
          Assert.equal("items length", schema.path, data.length, schema.items.length, result);
        } else {
          if (rule.min !== void 0 && rule.max !== void 0) {
            Assert.greaterThanOrEqualTo(
              "items",
              schema.path,
              data.length,
              Math.min(Number(rule.min), Number(
                rule.max
              )) * schema.items.length,
              result,
              "[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements"
            );
            Assert.lessThanOrEqualTo(
              "items",
              schema.path,
              data.length,
              Math.max(Number(rule.min), Number(rule.max)) * schema.items.length,
              result,
              "[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements"
            );
          }
          if (rule.min !== void 0 && rule.max === void 0) {
            if (rule.count === 1) {
              return result.length === length;
            } else {
              Assert.equal(
                "items length",
                schema.path,
                data.length,
                Number(rule.min) * schema.items.length,
                result
              );
            }
          }
          if (rule.parameters && rule.parameters[2]) {
            return result.length === length;
          }
        }
        if (result.length !== length) {
          return false;
        }
        for (var i = 0; i < data.length; i++) {
          result.push.apply(result, Diff.diff(schema.items[i % schema.items.length], data[i], i % schema.items.length));
        }
        return result.length === length;
      }
    };
    var Assert = {
      message: function(item) {
        if (item.message) {
          return item.message;
        }
        var upperType = item.type.toUpperCase();
        var lowerType = item.type.toLowerCase();
        var path = isArray2(item.path) && item.path.join(".") || item.path;
        var action = item.action;
        var expected = item.expected;
        var actual = item.actual;
        return "[" + upperType + "] Expect " + path + "'" + lowerType + " " + action + " " + expected + ", but is " + actual;
      },
      equal: function(type2, path, actual, expected, result, message) {
        if (actual === expected) {
          return true;
        }
        if (type2 === "type" && expected === "regexp" && actual === "string") {
          return true;
        }
        result.push(Assert.createDiffResult(type2, path, actual, expected, message, "is equal to"));
        return false;
      },
      // actual matches expected
      match: function(type2, path, actual, expected, result, message) {
        if (expected.test(actual)) {
          return true;
        }
        result.push(Assert.createDiffResult(type2, path, actual, expected, message, "matches"));
        return false;
      },
      greaterThanOrEqualTo: function(type2, path, actual, expected, result, message) {
        if (actual >= expected) {
          return true;
        }
        result.push(Assert.createDiffResult(
          type2,
          path,
          actual,
          expected,
          message,
          "is greater than or equal to"
        ));
        return false;
      },
      lessThanOrEqualTo: function(type2, path, actual, expected, result, message) {
        if (actual <= expected) {
          return true;
        }
        result.push(Assert.createDiffResult(type2, path, actual, expected, message, "is less than or equal to"));
        return false;
      },
      createDiffResult: function(type2, path, actual, expected, message, action) {
        var item = {
          path,
          type: type2,
          actual,
          expected,
          action,
          message
        };
        item.message = Assert.message(item);
        return item;
      }
    };
    var valid = function(template, data) {
      var schema = toJSONSchema(template);
      return Diff.diff(schema, data);
    };
    valid.Diff = Diff;
    valid.Assert = Assert;
    function rgx(str2, loose) {
      if (str2 instanceof RegExp)
        return {
          keys: false,
          pattern: str2
        };
      var c, o2, tmp, ext, keys2 = [], pattern = "", arr = str2.split("/");
      arr[0] || arr.shift();
      while (tmp = arr.shift()) {
        c = tmp[0];
        if (c === "*") {
          keys2.push("wild");
          pattern += "/(.*)";
        } else if (c === ":") {
          o2 = tmp.indexOf("?", 1);
          ext = tmp.indexOf(".", 1);
          keys2.push(tmp.substring(1, !!~o2 ? o2 : !!~ext ? ext : tmp.length));
          pattern += !!~o2 && !~ext ? "(?:/([^/]+?))?" : "/([^/]+?)";
          if (!!~ext)
            pattern += (!!~o2 ? "?" : "") + "\\" + tmp.substring(ext);
        } else {
          pattern += "/" + tmp;
        }
      }
      return {
        keys: keys2,
        pattern: new RegExp("^" + pattern + (loose ? "(?=$|/)" : "/?$"), "i")
      };
    }
    var IMocked = (
      /** @class */
      function() {
        function IMocked2() {
          this._mocked = {};
        }
        IMocked2.prototype.set = function(key2, value) {
          this._mocked[key2] = value;
        };
        IMocked2.prototype.getMocked = function() {
          return this._mocked;
        };
        IMocked2.prototype.find = function(url2, type2) {
          var mockedItems = Object.values(this._mocked);
          for (var i = 0; i < mockedItems.length; i++) {
            var item = mockedItems[i];
            var urlMatched = this._matchUrl(item.rurl, url2);
            var typeMatched = this._matchType(item.rtype, type2);
            if (!item.rtype && urlMatched) {
              return item;
            }
            if (urlMatched && typeMatched) {
              return item;
            }
          }
        };
        IMocked2.prototype.convert = function(item, options) {
          return isFunction2(item.template) ? item.template(options) : handler$1.gen(item.template);
        };
        IMocked2.prototype._matchUrl = function(expected, actual) {
          if (isString2(expected)) {
            if (expected === actual) {
              return true;
            }
            if (actual.indexOf(expected) === 0 && actual[expected.length] === "?") {
              return true;
            }
            if (expected.indexOf("/") === 0) {
              return rgx(expected).pattern.test(actual);
            }
          }
          if (isRegExp(expected)) {
            return expected.test(actual);
          }
          return false;
        };
        IMocked2.prototype._matchType = function(expected, actual) {
          if (isString2(expected) || isRegExp(expected)) {
            return new RegExp(expected, "i").test(actual);
          }
          return false;
        };
        return IMocked2;
      }()
    );
    var mocked = new IMocked();
    var Setting = (
      /** @class */
      function() {
        function Setting2() {
          this._setting = {
            timeout: "10-100"
          };
        }
        Setting2.prototype.setup = function(setting2) {
          Object.assign(this._setting, setting2);
        };
        Setting2.prototype.parseTimeout = function(timeout) {
          if (timeout === void 0) {
            timeout = this._setting.timeout;
          }
          if (typeof timeout === "number") {
            return timeout;
          }
          if (typeof timeout === "string" && timeout.indexOf("-") === -1) {
            return parseInt(timeout, 10);
          }
          if (typeof timeout === "string" && timeout.indexOf("-") !== -1) {
            var tmp = timeout.split("-");
            var min = parseInt(tmp[0], 10);
            var max = parseInt(tmp[1], 10);
            return Math.round(Math.random() * (max - min)) + min;
          }
          return 0;
        };
        return Setting2;
      }()
    );
    var setting = new Setting();
    function getMpPlatform() {
      var global2;
      var name2;
      if (typeof wx$1 !== "undefined") {
        global2 = wx$1;
        name2 = "wx";
      } else if (typeof my !== "undefined") {
        global2 = my;
        name2 = "my";
      } else if (typeof tt !== "undefined") {
        global2 = tt;
        name2 = "tt";
      } else if (typeof swan !== "undefined") {
        global2 = swan;
        name2 = "swan";
      }
      assert2(global2 && name2, 'Invalid mini-program platform, just work in "wx", "my", "tt" or "swan"!');
      return {
        global: global2,
        name: name2
      };
    }
    var platform = getMpPlatform();
    var platformName = platform.name;
    var platformRequest = platform.global.request;
    function MockRequest(opts) {
      var options = {
        url: opts.url,
        type: opts.method || "GET",
        body: opts.data || null,
        headers: opts.header || opts.headers || {}
      };
      var item = mocked.find(options.url, options.type);
      if (!item) {
        return platformRequest(opts);
      }
      var responseData = mocked.convert(item, options);
      var successOptions;
      if (platformName === "my") {
        successOptions = {
          status: 200,
          data: responseData,
          headers: {}
        };
      } else {
        successOptions = {
          statusCode: 200,
          data: responseData,
          header: {}
        };
      }
      if (isFunction2(opts.success) || isFunction2(opts.complete)) {
        setTimeout(function() {
          isFunction2(opts.success) && opts.success(successOptions);
          isFunction2(opts.complete) && opts.complete(successOptions);
        }, setting.parseTimeout());
      }
    }
    function overrideRequest() {
      if (!platform.global.request.__MOCK__) {
        Object.defineProperty(platform.global, "request", {
          configurable: true,
          enumerable: true,
          writable: true,
          value: MockRequest
        });
        platform.global.request.__MOCK__ = true;
      }
    }
    var Mock2 = {
      Handler: handler$1,
      Random: random,
      Transfer: transfer,
      Util,
      RE,
      toJSONSchema,
      valid,
      mock,
      setup: setting.setup.bind(setting),
      _mocked: mocked.getMocked(),
      version: "0.3.6"
    };
    function mock(rurl, rtype, template) {
      assert2(arguments.length, "The mock function needs to pass at least one parameter!");
      if (arguments.length === 1) {
        return handler$1.gen(rurl);
      }
      if (arguments.length === 2) {
        template = rtype;
        rtype = void 0;
      }
      overrideRequest();
      var key2 = String(rurl) + String(rtype);
      mocked.set(key2, {
        rurl,
        rtype,
        template
      });
      return Mock2;
    }
    return Mock2;
  });
})(mock_mp);
const Mock = mock_mpExports;
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShow = /* @__PURE__ */ createHook(ON_SHOW);
const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
const onUnload = /* @__PURE__ */ createHook(ON_UNLOAD);
const onReachBottom = /* @__PURE__ */ createHook(ON_REACH_BOTTOM);
exports.Mock = Mock;
exports._export_sfc = _export_sfc;
exports.computed = computed;
exports.createSSRApp = createSSRApp;
exports.createStore = createStore;
exports.e = e;
exports.f = f;
exports.getCurrentInstance = getCurrentInstance;
exports.index = index;
exports.inject = inject;
exports.isRef = isRef;
exports.n = n;
exports.nextTick$1 = nextTick$1;
exports.o = o;
exports.onLoad = onLoad;
exports.onReachBottom = onReachBottom;
exports.onShow = onShow;
exports.onUnload = onUnload;
exports.p = p;
exports.reactive = reactive;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.s = s;
exports.t = t;
exports.unref = unref;
exports.useStore = useStore;
exports.watch = watch;
