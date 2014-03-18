(function(global) {
  'use strict';
  if (global.$traceurRuntime) {
    return;
  }
  var $Object = Object;
  var $TypeError = TypeError;
  var $create = $Object.create;
  var $defineProperties = $Object.defineProperties;
  var $defineProperty = $Object.defineProperty;
  var $freeze = $Object.freeze;
  var $getOwnPropertyDescriptor = $Object.getOwnPropertyDescriptor;
  var $getOwnPropertyNames = $Object.getOwnPropertyNames;
  var $getPrototypeOf = $Object.getPrototypeOf;
  var $hasOwnProperty = $Object.prototype.hasOwnProperty;
  var $toString = $Object.prototype.toString;
  function nonEnum(value) {
    return {
      configurable: true,
      enumerable: false,
      value: value,
      writable: true
    };
  }
  var types = {
    void: function voidType() {},
    any: function any() {},
    string: function string() {},
    number: function number() {},
    boolean: function boolean() {}
  };
  var method = nonEnum;
  var counter = 0;
  function newUniqueString() {
    return '__$' + Math.floor(Math.random() * 1e9) + '$' + ++counter + '$__';
  }
  var symbolInternalProperty = newUniqueString();
  var symbolDescriptionProperty = newUniqueString();
  var symbolDataProperty = newUniqueString();
  var symbolValues = $create(null);
  function isSymbol(symbol) {
    return typeof symbol === 'object' && symbol instanceof SymbolValue;
  }
  function typeOf(v) {
    if (isSymbol(v))
      return 'symbol';
    return typeof v;
  }
  function Symbol(description) {
    var value = new SymbolValue(description);
    if (!(this instanceof Symbol))
      return value;
    throw new TypeError('Symbol cannot be new\'ed');
  }
  $defineProperty(Symbol.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(Symbol.prototype, 'toString', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    var desc = symbolValue[symbolDescriptionProperty];
    if (desc === undefined)
      desc = '';
    return 'Symbol(' + desc + ')';
  }));
  $defineProperty(Symbol.prototype, 'valueOf', method(function() {
    var symbolValue = this[symbolDataProperty];
    if (!symbolValue)
      throw TypeError('Conversion from symbol to string');
    if (!getOption('symbols'))
      return symbolValue[symbolInternalProperty];
    return symbolValue;
  }));
  function SymbolValue(description) {
    var key = newUniqueString();
    $defineProperty(this, symbolDataProperty, {value: this});
    $defineProperty(this, symbolInternalProperty, {value: key});
    $defineProperty(this, symbolDescriptionProperty, {value: description});
    $freeze(this);
    symbolValues[key] = this;
  }
  $defineProperty(SymbolValue.prototype, 'constructor', nonEnum(Symbol));
  $defineProperty(SymbolValue.prototype, 'toString', {
    value: Symbol.prototype.toString,
    enumerable: false
  });
  $defineProperty(SymbolValue.prototype, 'valueOf', {
    value: Symbol.prototype.valueOf,
    enumerable: false
  });
  $freeze(SymbolValue.prototype);
  Symbol.iterator = Symbol();
  function toProperty(name) {
    if (isSymbol(name))
      return name[symbolInternalProperty];
    return name;
  }
  function getOwnPropertyNames(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (!symbolValues[name])
        rv.push(name);
    }
    return rv;
  }
  function getOwnPropertyDescriptor(object, name) {
    return $getOwnPropertyDescriptor(object, toProperty(name));
  }
  function getOwnPropertySymbols(object) {
    var rv = [];
    var names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var symbol = symbolValues[names[i]];
      if (symbol)
        rv.push(symbol);
    }
    return rv;
  }
  function hasOwnProperty(name) {
    return $hasOwnProperty.call(this, toProperty(name));
  }
  function getOption(name) {
    return global.traceur && global.traceur.options[name];
  }
  function setProperty(object, name, value) {
    var sym,
        desc;
    if (isSymbol(name)) {
      sym = name;
      name = name[symbolInternalProperty];
    }
    object[name] = value;
    if (sym && (desc = $getOwnPropertyDescriptor(object, name)))
      $defineProperty(object, name, {enumerable: false});
    return value;
  }
  function defineProperty(object, name, descriptor) {
    if (isSymbol(name)) {
      if (descriptor.enumerable) {
        descriptor = $create(descriptor, {enumerable: {value: false}});
      }
      name = name[symbolInternalProperty];
    }
    $defineProperty(object, name, descriptor);
    return object;
  }
  function polyfillObject(Object) {
    $defineProperty(Object, 'defineProperty', {value: defineProperty});
    $defineProperty(Object, 'getOwnPropertyNames', {value: getOwnPropertyNames});
    $defineProperty(Object, 'getOwnPropertyDescriptor', {value: getOwnPropertyDescriptor});
    $defineProperty(Object.prototype, 'hasOwnProperty', {value: hasOwnProperty});
    Object.getOwnPropertySymbols = getOwnPropertySymbols;
    function is(left, right) {
      if (left === right)
        return left !== 0 || 1 / left === 1 / right;
      return left !== left && right !== right;
    }
    $defineProperty(Object, 'is', method(is));
    function assign(target, source) {
      var props = $getOwnPropertyNames(source);
      var p,
          length = props.length;
      for (p = 0; p < length; p++) {
        target[props[p]] = source[props[p]];
      }
      return target;
    }
    $defineProperty(Object, 'assign', method(assign));
    function mixin(target, source) {
      var props = $getOwnPropertyNames(source);
      var p,
          descriptor,
          length = props.length;
      for (p = 0; p < length; p++) {
        descriptor = $getOwnPropertyDescriptor(source, props[p]);
        $defineProperty(target, props[p], descriptor);
      }
      return target;
    }
    $defineProperty(Object, 'mixin', method(mixin));
  }
  function exportStar(object) {
    for (var i = 1; i < arguments.length; i++) {
      var names = $getOwnPropertyNames(arguments[i]);
      for (var j = 0; j < names.length; j++) {
        (function(mod, name) {
          $defineProperty(object, name, {
            get: function() {
              return mod[name];
            },
            enumerable: true
          });
        })(arguments[i], names[j]);
      }
    }
    return object;
  }
  function toObject(value) {
    if (value == null)
      throw $TypeError();
    return $Object(value);
  }
  function spread() {
    var rv = [],
        k = 0;
    for (var i = 0; i < arguments.length; i++) {
      var valueToSpread = toObject(arguments[i]);
      for (var j = 0; j < valueToSpread.length; j++) {
        rv[k++] = valueToSpread[j];
      }
    }
    return rv;
  }
  function getPropertyDescriptor(object, name) {
    while (object !== null) {
      var result = $getOwnPropertyDescriptor(object, name);
      if (result)
        return result;
      object = $getPrototypeOf(object);
    }
    return undefined;
  }
  function superDescriptor(homeObject, name) {
    var proto = $getPrototypeOf(homeObject);
    if (!proto)
      throw $TypeError('super is null');
    return getPropertyDescriptor(proto, name);
  }
  function superCall(self, homeObject, name, args) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      if ('value' in descriptor)
        return descriptor.value.apply(self, args);
      if (descriptor.get)
        return descriptor.get.call(self).apply(self, args);
    }
    throw $TypeError("super has no method '" + name + "'.");
  }
  function superGet(self, homeObject, name) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor) {
      if (descriptor.get)
        return descriptor.get.call(self);
      else if ('value' in descriptor)
        return descriptor.value;
    }
    return undefined;
  }
  function superSet(self, homeObject, name, value) {
    var descriptor = superDescriptor(homeObject, name);
    if (descriptor && descriptor.set) {
      descriptor.set.call(self, value);
      return;
    }
    throw $TypeError("super has no setter '" + name + "'.");
  }
  function getDescriptors(object) {
    var descriptors = {},
        name,
        names = $getOwnPropertyNames(object);
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      descriptors[name] = $getOwnPropertyDescriptor(object, name);
    }
    return descriptors;
  }
  function createClass(ctor, object, staticObject, superClass) {
    $defineProperty(object, 'constructor', {
      value: ctor,
      configurable: true,
      enumerable: false,
      writable: true
    });
    if (arguments.length > 3) {
      if (typeof superClass === 'function')
        ctor.__proto__ = superClass;
      ctor.prototype = $create(getProtoParent(superClass), getDescriptors(object));
    } else {
      ctor.prototype = object;
    }
    $defineProperty(ctor, 'prototype', {
      configurable: false,
      writable: false
    });
    return $defineProperties(ctor, getDescriptors(staticObject));
  }
  function getProtoParent(superClass) {
    if (typeof superClass === 'function') {
      var prototype = superClass.prototype;
      if ($Object(prototype) === prototype || prototype === null)
        return superClass.prototype;
    }
    if (superClass === null)
      return null;
    throw new TypeError();
  }
  function defaultSuperCall(self, homeObject, args) {
    if ($getPrototypeOf(homeObject) !== null)
      superCall(self, homeObject, 'constructor', args);
  }
  var ST_NEWBORN = 0;
  var ST_EXECUTING = 1;
  var ST_SUSPENDED = 2;
  var ST_CLOSED = 3;
  var END_STATE = -3;
  function addIterator(object) {
    return defineProperty(object, Symbol.iterator, nonEnum(function() {
      return this;
    }));
  }
  function GeneratorContext() {
    this.state = 0;
    this.GState = ST_NEWBORN;
    this.storedException = undefined;
    this.finallyFallThrough = undefined;
    this.sent = undefined;
    this.returnValue = undefined;
    this.tryStack_ = [];
  }
  GeneratorContext.prototype = {
    pushTry: function(catchState, finallyState) {
      if (finallyState !== null) {
        var finallyFallThrough = null;
        for (var i = this.tryStack_.length - 1; i >= 0; i--) {
          if (this.tryStack_[i].catch !== undefined) {
            finallyFallThrough = this.tryStack_[i].catch;
            break;
          }
        }
        if (finallyFallThrough === null)
          finallyFallThrough = -3;
        this.tryStack_.push({
          finally: finallyState,
          finallyFallThrough: finallyFallThrough
        });
      }
      if (catchState !== null) {
        this.tryStack_.push({catch: catchState});
      }
    },
    popTry: function() {
      this.tryStack_.pop();
    }
  };
  function getNextOrThrow(ctx, moveNext, action) {
    return function(x) {
      switch (ctx.GState) {
        case ST_EXECUTING:
          throw new Error(("\"" + action + "\" on executing generator"));
        case ST_CLOSED:
          throw new Error(("\"" + action + "\" on closed generator"));
        case ST_NEWBORN:
          if (action === 'throw') {
            ctx.GState = ST_CLOSED;
            throw x;
          }
          if (x !== undefined)
            throw $TypeError('Sent value to newborn generator');
        case ST_SUSPENDED:
          ctx.GState = ST_EXECUTING;
          ctx.action = action;
          ctx.sent = x;
          var value = moveNext(ctx);
          var done = value === ctx;
          if (done)
            value = ctx.returnValue;
          ctx.GState = done ? ST_CLOSED : ST_SUSPENDED;
          return {
            value: value,
            done: done
          };
      }
    };
  }
  function generatorWrap(innerFunction, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new GeneratorContext();
    return addIterator({
      next: getNextOrThrow(ctx, moveNext, 'next'),
      throw: getNextOrThrow(ctx, moveNext, 'throw')
    });
  }
  function AsyncFunctionContext() {
    GeneratorContext.call(this);
    this.err = undefined;
    var ctx = this;
    ctx.result = new Promise(function(resolve, reject) {
      ctx.resolve = resolve;
      ctx.reject = reject;
    });
  }
  AsyncFunctionContext.prototype = Object.create(GeneratorContext.prototype);
  function asyncWrap(innerFunction, self) {
    var moveNext = getMoveNext(innerFunction, self);
    var ctx = new AsyncFunctionContext();
    ctx.createCallback = function(newState) {
      return function(value) {
        ctx.state = newState;
        ctx.value = value;
        moveNext(ctx);
      };
    };
    ctx.createErrback = function(newState) {
      return function(err) {
        ctx.state = newState;
        ctx.err = err;
        moveNext(ctx);
      };
    };
    moveNext(ctx);
    return ctx.result;
  }
  function getMoveNext(innerFunction, self) {
    return function(ctx) {
      while (true) {
        try {
          return innerFunction.call(self, ctx);
        } catch (ex) {
          ctx.storedException = ex;
          var last = ctx.tryStack_[ctx.tryStack_.length - 1];
          if (!last) {
            ctx.GState = ST_CLOSED;
            ctx.state = END_STATE;
            throw ex;
          }
          ctx.state = last.catch !== undefined ? last.catch : last.finally;
          if (last.finallyFallThrough !== undefined)
            ctx.finallyFallThrough = last.finallyFallThrough;
        }
      }
    };
  }
  function setupGlobals(global) {
    global.Symbol = Symbol;
    polyfillObject(global.Object);
  }
  setupGlobals(global);
  global.$traceurRuntime = {
    asyncWrap: asyncWrap,
    createClass: createClass,
    defaultSuperCall: defaultSuperCall,
    exportStar: exportStar,
    generatorWrap: generatorWrap,
    setProperty: setProperty,
    setupGlobals: setupGlobals,
    spread: spread,
    superCall: superCall,
    superGet: superGet,
    superSet: superSet,
    toObject: toObject,
    toProperty: toProperty,
    type: types,
    typeof: typeOf
  };
})(typeof global !== 'undefined' ? global : this);
(function() {
  function buildFromEncodedParts(opt_scheme, opt_userInfo, opt_domain, opt_port, opt_path, opt_queryData, opt_fragment) {
    var out = [];
    if (opt_scheme) {
      out.push(opt_scheme, ':');
    }
    if (opt_domain) {
      out.push('//');
      if (opt_userInfo) {
        out.push(opt_userInfo, '@');
      }
      out.push(opt_domain);
      if (opt_port) {
        out.push(':', opt_port);
      }
    }
    if (opt_path) {
      out.push(opt_path);
    }
    if (opt_queryData) {
      out.push('?', opt_queryData);
    }
    if (opt_fragment) {
      out.push('#', opt_fragment);
    }
    return out.join('');
  }
  ;
  var splitRe = new RegExp('^' + '(?:' + '([^:/?#.]+)' + ':)?' + '(?://' + '(?:([^/?#]*)@)?' + '([\\w\\d\\-\\u0100-\\uffff.%]*)' + '(?::([0-9]+))?' + ')?' + '([^?#]+)?' + '(?:\\?([^#]*))?' + '(?:#(.*))?' + '$');
  var ComponentIndex = {
    SCHEME: 1,
    USER_INFO: 2,
    DOMAIN: 3,
    PORT: 4,
    PATH: 5,
    QUERY_DATA: 6,
    FRAGMENT: 7
  };
  function split(uri) {
    return (uri.match(splitRe));
  }
  function removeDotSegments(path) {
    if (path === '/')
      return '/';
    var leadingSlash = path[0] === '/' ? '/' : '';
    var trailingSlash = path.slice(-1) === '/' ? '/' : '';
    var segments = path.split('/');
    var out = [];
    var up = 0;
    for (var pos = 0; pos < segments.length; pos++) {
      var segment = segments[pos];
      switch (segment) {
        case '':
        case '.':
          break;
        case '..':
          if (out.length)
            out.pop();
          else
            up++;
          break;
        default:
          out.push(segment);
      }
    }
    if (!leadingSlash) {
      while (up-- > 0) {
        out.unshift('..');
      }
      if (out.length === 0)
        out.push('.');
    }
    return leadingSlash + out.join('/') + trailingSlash;
  }
  function joinAndCanonicalizePath(parts) {
    var path = parts[ComponentIndex.PATH] || '';
    path = removeDotSegments(path.replace(/\/\//.g, '/'));
    parts[ComponentIndex.PATH] = path;
    return buildFromEncodedParts(parts[ComponentIndex.SCHEME], parts[ComponentIndex.USER_INFO], parts[ComponentIndex.DOMAIN], parts[ComponentIndex.PORT], parts[ComponentIndex.PATH], parts[ComponentIndex.QUERY_DATA], parts[ComponentIndex.FRAGMENT]);
  }
  function canonicalizeUrl(url) {
    var parts = split(url);
    return joinAndCanonicalizePath(parts);
  }
  function resolveUrl(base, url) {
    var parts = split(url);
    var baseParts = split(base);
    if (parts[ComponentIndex.SCHEME]) {
      return joinAndCanonicalizePath(parts);
    } else {
      parts[ComponentIndex.SCHEME] = baseParts[ComponentIndex.SCHEME];
    }
    for (var i = ComponentIndex.SCHEME; i <= ComponentIndex.PORT; i++) {
      if (!parts[i]) {
        parts[i] = baseParts[i];
      }
    }
    if (parts[ComponentIndex.PATH][0] == '/') {
      return joinAndCanonicalizePath(parts);
    }
    var path = baseParts[ComponentIndex.PATH];
    var index = path.lastIndexOf('/');
    path = path.slice(0, index + 1) + parts[ComponentIndex.PATH];
    parts[ComponentIndex.PATH] = path;
    return joinAndCanonicalizePath(parts);
  }
  function isAbsolute(name) {
    if (!name)
      return false;
    if (name[0] === '/')
      return true;
    var parts = split(name);
    if (parts[ComponentIndex.SCHEME])
      return true;
    return false;
  }
  $traceurRuntime.canonicalizeUrl = canonicalizeUrl;
  $traceurRuntime.isAbsolute = isAbsolute;
  $traceurRuntime.removeDotSegments = removeDotSegments;
  $traceurRuntime.resolveUrl = resolveUrl;
})();
(function(global) {
  'use strict';
  var $__2 = $traceurRuntime,
      canonicalizeUrl = $__2.canonicalizeUrl,
      resolveUrl = $__2.resolveUrl,
      isAbsolute = $__2.isAbsolute;
  var moduleInstantiators = Object.create(null);
  var baseURL;
  if (global.location && global.location.href)
    baseURL = resolveUrl(global.location.href, './');
  else
    baseURL = '';
  var UncoatedModuleEntry = function UncoatedModuleEntry(url, uncoatedModule) {
    this.url = url;
    this.value_ = uncoatedModule;
  };
  ($traceurRuntime.createClass)(UncoatedModuleEntry, {}, {});
  var UncoatedModuleInstantiator = function UncoatedModuleInstantiator(url, func) {
    $traceurRuntime.superCall(this, $UncoatedModuleInstantiator.prototype, "constructor", [url, null]);
    this.func = func;
  };
  var $UncoatedModuleInstantiator = UncoatedModuleInstantiator;
  ($traceurRuntime.createClass)(UncoatedModuleInstantiator, {getUncoatedModule: function() {
      if (this.value_)
        return this.value_;
      return this.value_ = this.func.call(global);
    }}, {}, UncoatedModuleEntry);
  function getUncoatedModuleInstantiator(name) {
    if (!name)
      return;
    var url = ModuleStore.normalize(name);
    return moduleInstantiators[url];
  }
  ;
  var moduleInstances = Object.create(null);
  var liveModuleSentinel = {};
  function Module(uncoatedModule) {
    var isLive = arguments[1];
    var coatedModule = Object.create(null);
    Object.getOwnPropertyNames(uncoatedModule).forEach((function(name) {
      var getter,
          value;
      if (isLive === liveModuleSentinel) {
        var descr = Object.getOwnPropertyDescriptor(uncoatedModule, name);
        if (descr.get)
          getter = descr.get;
      }
      if (!getter) {
        value = uncoatedModule[name];
        getter = function() {
          return value;
        };
      }
      Object.defineProperty(coatedModule, name, {
        get: getter,
        enumerable: true
      });
    }));
    Object.preventExtensions(coatedModule);
    return coatedModule;
  }
  var ModuleStore = {
    normalize: function(name, refererName, refererAddress) {
      if (typeof name !== "string")
        throw new TypeError("module name must be a string, not " + typeof name);
      if (isAbsolute(name))
        return canonicalizeUrl(name);
      if (/[^\.]\/\.\.\//.test(name)) {
        throw new Error('module name embeds /../: ' + name);
      }
      if (name[0] === '.' && refererName)
        return resolveUrl(refererName, name);
      return canonicalizeUrl(name);
    },
    get: function(normalizedName) {
      var m = getUncoatedModuleInstantiator(normalizedName);
      if (!m)
        return undefined;
      var moduleInstance = moduleInstances[m.url];
      if (moduleInstance)
        return moduleInstance;
      moduleInstance = Module(m.getUncoatedModule(), liveModuleSentinel);
      return moduleInstances[m.url] = moduleInstance;
    },
    set: function(normalizedName, module) {
      normalizedName = String(normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, (function() {
        return module;
      }));
      moduleInstances[normalizedName] = module;
    },
    get baseURL() {
      return baseURL;
    },
    set baseURL(v) {
      baseURL = String(v);
    },
    registerModule: function(name, func) {
      var normalizedName = ModuleStore.normalize(name);
      if (moduleInstantiators[normalizedName])
        throw new Error('duplicate module named ' + normalizedName);
      moduleInstantiators[normalizedName] = new UncoatedModuleInstantiator(normalizedName, func);
    },
    bundleStore: Object.create(null),
    register: function(name, deps, func) {
      if (!deps || !deps.length) {
        this.registerModule(name, func);
      } else {
        this.bundleStore[name] = {
          deps: deps,
          execute: func
        };
      }
    },
    getAnonymousModule: function(func) {
      return new Module(func.call(global), liveModuleSentinel);
    },
    getForTesting: function(name) {
      var $__0 = this;
      if (!this.testingPrefix_) {
        Object.keys(moduleInstances).some((function(key) {
          var m = /(traceur@[^\/]*\/)/.exec(key);
          if (m) {
            $__0.testingPrefix_ = m[1];
            return true;
          }
        }));
      }
      return this.get(this.testingPrefix_ + name);
    }
  };
  ModuleStore.set('@traceur/src/runtime/ModuleStore', new Module({ModuleStore: ModuleStore}));
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
  };
  $traceurRuntime.ModuleStore = ModuleStore;
  global.System = {
    register: ModuleStore.register.bind(ModuleStore),
    get: ModuleStore.get,
    set: ModuleStore.set,
    normalize: ModuleStore.normalize
  };
  $traceurRuntime.getModuleImpl = function(name) {
    var instantiator = getUncoatedModuleInstantiator(name);
    return instantiator && instantiator.getUncoatedModule();
  };
})(typeof global !== 'undefined' ? global : this);
System.register("traceur-runtime@0.0.25/src/runtime/polyfills/utils", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.25/src/runtime/polyfills/utils";
  var toObject = $traceurRuntime.toObject;
  function toUint32(x) {
    return x | 0;
  }
  return {
    get toObject() {
      return toObject;
    },
    get toUint32() {
      return toUint32;
    }
  };
});
System.register("traceur-runtime@0.0.25/src/runtime/polyfills/ArrayIterator", [], function() {
  "use strict";
  var $__4;
  var __moduleName = "traceur-runtime@0.0.25/src/runtime/polyfills/ArrayIterator";
  var $__5 = $traceurRuntime.getModuleImpl("traceur-runtime@0.0.25/src/runtime/polyfills/utils"),
      toObject = $__5.toObject,
      toUint32 = $__5.toUint32;
  var ARRAY_ITERATOR_KIND_KEYS = 1;
  var ARRAY_ITERATOR_KIND_VALUES = 2;
  var ARRAY_ITERATOR_KIND_ENTRIES = 3;
  var ArrayIterator = function ArrayIterator() {};
  ($traceurRuntime.createClass)(ArrayIterator, ($__4 = {}, Object.defineProperty($__4, "next", {
    value: function() {
      var iterator = toObject(this);
      var array = iterator.iteratorObject_;
      if (!array) {
        throw new TypeError('Object is not an ArrayIterator');
      }
      var index = iterator.arrayIteratorNextIndex_;
      var itemKind = iterator.arrayIterationKind_;
      var length = toUint32(array.length);
      if (index >= length) {
        iterator.arrayIteratorNextIndex_ = Infinity;
        return createIteratorResultObject(undefined, true);
      }
      iterator.arrayIteratorNextIndex_ = index + 1;
      if (itemKind == ARRAY_ITERATOR_KIND_VALUES)
        return createIteratorResultObject(array[index], false);
      if (itemKind == ARRAY_ITERATOR_KIND_ENTRIES)
        return createIteratorResultObject([index, array[index]], false);
      return createIteratorResultObject(index, false);
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), Object.defineProperty($__4, Symbol.iterator, {
    value: function() {
      return this;
    },
    configurable: true,
    enumerable: true,
    writable: true
  }), $__4), {});
  function createArrayIterator(array, kind) {
    var object = toObject(array);
    var iterator = new ArrayIterator;
    iterator.iteratorObject_ = object;
    iterator.arrayIteratorNextIndex_ = 0;
    iterator.arrayIterationKind_ = kind;
    return iterator;
  }
  function createIteratorResultObject(value, done) {
    return {
      value: value,
      done: done
    };
  }
  function entries() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_ENTRIES);
  }
  function keys() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_KEYS);
  }
  function values() {
    return createArrayIterator(this, ARRAY_ITERATOR_KIND_VALUES);
  }
  return {
    get entries() {
      return entries;
    },
    get keys() {
      return keys;
    },
    get values() {
      return values;
    }
  };
});
System.register("traceur-runtime@0.0.25/node_modules/rsvp/lib/rsvp/asap", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.25/node_modules/rsvp/lib/rsvp/asap";
  var $__default = function asap(callback, arg) {
    var length = queue.push([callback, arg]);
    if (length === 1) {
      scheduleFlush();
    }
  };
  var browserGlobal = (typeof window !== 'undefined') ? window : {};
  var BrowserMutationObserver = browserGlobal.MutationObserver || browserGlobal.WebKitMutationObserver;
  function useNextTick() {
    return function() {
      process.nextTick(flush);
    };
  }
  function useMutationObserver() {
    var iterations = 0;
    var observer = new BrowserMutationObserver(flush);
    var node = document.createTextNode('');
    observer.observe(node, {characterData: true});
    return function() {
      node.data = (iterations = ++iterations % 2);
    };
  }
  function useSetTimeout() {
    return function() {
      setTimeout(flush, 1);
    };
  }
  var queue = [];
  function flush() {
    for (var i = 0; i < queue.length; i++) {
      var tuple = queue[i];
      var callback = tuple[0],
          arg = tuple[1];
      callback(arg);
    }
    queue = [];
  }
  var scheduleFlush;
  if (typeof process !== 'undefined' && {}.toString.call(process) === '[object process]') {
    scheduleFlush = useNextTick();
  } else if (BrowserMutationObserver) {
    scheduleFlush = useMutationObserver();
  } else {
    scheduleFlush = useSetTimeout();
  }
  return {get default() {
      return $__default;
    }};
});
System.register("traceur-runtime@0.0.25/src/runtime/polyfills/Promise", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.25/src/runtime/polyfills/Promise";
  var async = $traceurRuntime.getModuleImpl("traceur-runtime@0.0.25/node_modules/rsvp/lib/rsvp/asap").default;
  function isPromise(x) {
    return x && typeof x === 'object' && x.status_ !== undefined;
  }
  function chain(promise) {
    var onResolve = arguments[1] !== (void 0) ? arguments[1] : (function(x) {
      return x;
    });
    var onReject = arguments[2] !== (void 0) ? arguments[2] : (function(e) {
      throw e;
    });
    var deferred = getDeferred(promise.constructor);
    switch (promise.status_) {
      case undefined:
        throw TypeError;
      case 'pending':
        promise.onResolve_.push([deferred, onResolve]);
        promise.onReject_.push([deferred, onReject]);
        break;
      case 'resolved':
        promiseReact(deferred, onResolve, promise.value_);
        break;
      case 'rejected':
        promiseReact(deferred, onReject, promise.value_);
        break;
    }
    return deferred.promise;
  }
  function getDeferred(C) {
    var result = {};
    result.promise = new C((function(resolve, reject) {
      result.resolve = resolve;
      result.reject = reject;
    }));
    return result;
  }
  var Promise = function Promise(resolver) {
    var $__6 = this;
    this.status_ = 'pending';
    this.onResolve_ = [];
    this.onReject_ = [];
    resolver((function(x) {
      promiseResolve($__6, x);
    }), (function(r) {
      promiseReject($__6, r);
    }));
  };
  ($traceurRuntime.createClass)(Promise, {
    catch: function(onReject) {
      return this.then(undefined, onReject);
    },
    then: function() {
      var onResolve = arguments[0] !== (void 0) ? arguments[0] : (function(x) {
        return x;
      });
      var onReject = arguments[1];
      var $__6 = this;
      var constructor = this.constructor;
      return chain(this, (function(x) {
        x = promiseCoerce(constructor, x);
        return x === $__6 ? onReject(new TypeError) : isPromise(x) ? x.then(onResolve, onReject) : onResolve(x);
      }), onReject);
    }
  }, {
    resolve: function(x) {
      return new this((function(resolve, reject) {
        resolve(x);
      }));
    },
    reject: function(r) {
      return new this((function(resolve, reject) {
        reject(r);
      }));
    },
    cast: function(x) {
      if (x instanceof this)
        return x;
      if (isPromise(x)) {
        var result = getDeferred(this);
        chain(x, result.resolve, result.reject);
        return result.promise;
      }
      return this.resolve(x);
    },
    all: function(values) {
      var deferred = getDeferred(this);
      var count = 0;
      var resolutions = [];
      try {
        for (var i = 0; i < values.length; i++) {
          ++count;
          this.cast(values[i]).then(function(i, x) {
            resolutions[i] = x;
            if (--count === 0)
              deferred.resolve(resolutions);
          }.bind(undefined, i), (function(r) {
            if (count > 0)
              count = 0;
            deferred.reject(r);
          }));
        }
        if (count === 0)
          deferred.resolve(resolutions);
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    },
    race: function(values) {
      var deferred = getDeferred(this);
      try {
        for (var i = 0; i < values.length; i++) {
          this.cast(values[i]).then((function(x) {
            deferred.resolve(x);
          }), (function(r) {
            deferred.reject(r);
          }));
        }
      } catch (e) {
        deferred.reject(e);
      }
      return deferred.promise;
    }
  });
  function promiseResolve(promise, x) {
    promiseDone(promise, 'resolved', x, promise.onResolve_);
  }
  function promiseReject(promise, r) {
    promiseDone(promise, 'rejected', r, promise.onReject_);
  }
  function promiseDone(promise, status, value, reactions) {
    if (promise.status_ !== 'pending')
      return;
    for (var i = 0; i < reactions.length; i++) {
      promiseReact(reactions[i][0], reactions[i][1], value);
    }
    promise.status_ = status;
    promise.value_ = value;
    promise.onResolve_ = promise.onReject_ = undefined;
  }
  function promiseReact(deferred, handler, x) {
    async((function() {
      try {
        var y = handler(x);
        if (y === deferred.promise)
          throw new TypeError;
        else if (isPromise(y))
          chain(y, deferred.resolve, deferred.reject);
        else
          deferred.resolve(y);
      } catch (e) {
        deferred.reject(e);
      }
    }));
  }
  var thenableSymbol = '@@thenable';
  function promiseCoerce(constructor, x) {
    if (isPromise(x)) {
      return x;
    } else if (x && typeof x.then === 'function') {
      var p = x[thenableSymbol];
      if (p) {
        return p;
      } else {
        var deferred = getDeferred(constructor);
        x[thenableSymbol] = deferred.promise;
        try {
          x.then(deferred.resolve, deferred.reject);
        } catch (e) {
          deferred.reject(e);
        }
        return deferred.promise;
      }
    } else {
      return x;
    }
  }
  return {get Promise() {
      return Promise;
    }};
});
System.register("traceur-runtime@0.0.25/src/runtime/polyfills/String", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.25/src/runtime/polyfills/String";
  var $toString = Object.prototype.toString;
  var $indexOf = String.prototype.indexOf;
  var $lastIndexOf = String.prototype.lastIndexOf;
  function startsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) == start;
  }
  function endsWith(search) {
    var string = String(this);
    if (this == null || $toString.call(search) == '[object RegExp]') {
      throw TypeError();
    }
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var pos = stringLength;
    if (arguments.length > 1) {
      var position = arguments[1];
      if (position !== undefined) {
        pos = position ? Number(position) : 0;
        if (isNaN(pos)) {
          pos = 0;
        }
      }
    }
    var end = Math.min(Math.max(pos, 0), stringLength);
    var start = end - searchLength;
    if (start < 0) {
      return false;
    }
    return $lastIndexOf.call(string, searchString, start) == start;
  }
  function contains(search) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var stringLength = string.length;
    var searchString = String(search);
    var searchLength = searchString.length;
    var position = arguments.length > 1 ? arguments[1] : undefined;
    var pos = position ? Number(position) : 0;
    if (isNaN(pos)) {
      pos = 0;
    }
    var start = Math.min(Math.max(pos, 0), stringLength);
    return $indexOf.call(string, searchString, pos) != -1;
  }
  function repeat(count) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var n = count ? Number(count) : 0;
    if (isNaN(n)) {
      n = 0;
    }
    if (n < 0 || n == Infinity) {
      throw RangeError();
    }
    if (n == 0) {
      return '';
    }
    var result = '';
    while (n--) {
      result += string;
    }
    return result;
  }
  function codePointAt(position) {
    if (this == null) {
      throw TypeError();
    }
    var string = String(this);
    var size = string.length;
    var index = position ? Number(position) : 0;
    if (isNaN(index)) {
      index = 0;
    }
    if (index < 0 || index >= size) {
      return undefined;
    }
    var first = string.charCodeAt(index);
    var second;
    if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
      second = string.charCodeAt(index + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }
  function raw(callsite) {
    var raw = callsite.raw;
    var len = raw.length >>> 0;
    if (len === 0)
      return '';
    var s = '';
    var i = 0;
    while (true) {
      s += raw[i];
      if (i + 1 === len)
        return s;
      s += arguments[++i];
    }
  }
  function fromCodePoint() {
    var codeUnits = [];
    var floor = Math.floor;
    var highSurrogate;
    var lowSurrogate;
    var index = -1;
    var length = arguments.length;
    if (!length) {
      return '';
    }
    while (++index < length) {
      var codePoint = Number(arguments[index]);
      if (!isFinite(codePoint) || codePoint < 0 || codePoint > 0x10FFFF || floor(codePoint) != codePoint) {
        throw RangeError('Invalid code point: ' + codePoint);
      }
      if (codePoint <= 0xFFFF) {
        codeUnits.push(codePoint);
      } else {
        codePoint -= 0x10000;
        highSurrogate = (codePoint >> 10) + 0xD800;
        lowSurrogate = (codePoint % 0x400) + 0xDC00;
        codeUnits.push(highSurrogate, lowSurrogate);
      }
    }
    return String.fromCharCode.apply(null, codeUnits);
  }
  return {
    get startsWith() {
      return startsWith;
    },
    get endsWith() {
      return endsWith;
    },
    get contains() {
      return contains;
    },
    get repeat() {
      return repeat;
    },
    get codePointAt() {
      return codePointAt;
    },
    get raw() {
      return raw;
    },
    get fromCodePoint() {
      return fromCodePoint;
    }
  };
});
System.register("traceur-runtime@0.0.25/src/runtime/polyfills/polyfills", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.25/src/runtime/polyfills/polyfills";
  var Promise = $traceurRuntime.getModuleImpl("traceur-runtime@0.0.25/src/runtime/polyfills/Promise").Promise;
  var $__9 = $traceurRuntime.getModuleImpl("traceur-runtime@0.0.25/src/runtime/polyfills/String"),
      codePointAt = $__9.codePointAt,
      contains = $__9.contains,
      endsWith = $__9.endsWith,
      fromCodePoint = $__9.fromCodePoint,
      repeat = $__9.repeat,
      raw = $__9.raw,
      startsWith = $__9.startsWith;
  var $__9 = $traceurRuntime.getModuleImpl("traceur-runtime@0.0.25/src/runtime/polyfills/ArrayIterator"),
      entries = $__9.entries,
      keys = $__9.keys,
      values = $__9.values;
  function maybeDefineMethod(object, name, value) {
    if (!(name in object)) {
      Object.defineProperty(object, name, {
        value: value,
        configurable: true,
        enumerable: false,
        writable: true
      });
    }
  }
  function maybeAddFunctions(object, functions) {
    for (var i = 0; i < functions.length; i += 2) {
      var name = functions[i];
      var value = functions[i + 1];
      maybeDefineMethod(object, name, value);
    }
  }
  function polyfillPromise(global) {
    if (!global.Promise)
      global.Promise = Promise;
  }
  function polyfillString(String) {
    maybeAddFunctions(String.prototype, ['codePointAt', codePointAt, 'contains', contains, 'endsWith', endsWith, 'startsWith', startsWith, 'repeat', repeat]);
    maybeAddFunctions(String, ['fromCodePoint', fromCodePoint, 'raw', raw]);
  }
  function polyfillArray(Array, Symbol) {
    maybeAddFunctions(Array.prototype, ['entries', entries, 'keys', keys, 'values', values]);
    if (Symbol && Symbol.iterator) {
      Object.defineProperty(Array.prototype, Symbol.iterator, {
        value: values,
        configurable: true,
        enumerable: false,
        writable: true
      });
    }
  }
  function polyfill(global) {
    polyfillPromise(global);
    polyfillString(global.String);
    polyfillArray(global.Array, global.Symbol);
  }
  polyfill(this);
  var setupGlobals = $traceurRuntime.setupGlobals;
  $traceurRuntime.setupGlobals = function(global) {
    setupGlobals(global);
    polyfill(global);
  };
  return {};
});
System.register("traceur-runtime@0.0.25/src/runtime/polyfill-import", [], function() {
  "use strict";
  var __moduleName = "traceur-runtime@0.0.25/src/runtime/polyfill-import";
  var $__11 = $traceurRuntime.getModuleImpl("traceur-runtime@0.0.25/src/runtime/polyfills/polyfills");
  return {};
});
System.get("traceur-runtime@0.0.25/src/runtime/polyfill-import" + '');
;var $__Object = Object, $__getOwnPropertyNames = $__Object.getOwnPropertyNames, $__getOwnPropertyDescriptor = $__Object.getOwnPropertyDescriptor, $__getDescriptors = function(object) {
  var descriptors = {}, name, names = $__getOwnPropertyNames(object);
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    descriptors[name] = $__getOwnPropertyDescriptor(object, name);
  }
  return descriptors;
}, $__createClassNoExtends = function(object, staticObject) {
  var ctor = object.constructor;
  Object.defineProperty(object, 'constructor', {enumerable: false});
  ctor.prototype = object;
  Object.defineProperties(ctor, $__getDescriptors(staticObject));
  return ctor;
}, $__TypeError = TypeError, $__getPrototypeOf = $__Object.getPrototypeOf, $__getPropertyDescriptor = function(object, name) {
  while (object !== null) {
    var result = $__getOwnPropertyDescriptor(object, name);
    if (result) return result;
    object = $__getPrototypeOf(object);
  }
  return undefined;
}, $__superDescriptor = function(proto, name) {
  if (!proto) throw new $__TypeError('super is null');
  return $__getPropertyDescriptor(proto, name);
}, $__superCall = function(self, proto, name, args) {
  var descriptor = $__superDescriptor(proto, name);
  if (descriptor) {
    if ('value'in descriptor) return descriptor.value.apply(self, args);
    if (descriptor.get) return descriptor.get.call(self).apply(self, args);
  }
  throw new $__TypeError("Object has no method '" + name + "'.");
}, $__getProtoParent = function(superClass) {
  if (typeof superClass === 'function') {
    var prototype = superClass.prototype;
    if (Object(prototype) === prototype || prototype === null) return superClass.prototype;
  }
  if (superClass === null) return null;
  throw new TypeError();
}, $__createClass = function(object, staticObject, protoParent, superClass, hasConstructor) {
  var ctor = object.constructor;
  if (typeof superClass === 'function') ctor.__proto__ = superClass;
  if (!hasConstructor && protoParent === null) ctor = object.constructor = function() {};
  var descriptors = $__getDescriptors(object);
  descriptors.constructor.enumerable = false;
  ctor.prototype = Object.create(protoParent, descriptors);
  Object.defineProperties(ctor, $__getDescriptors(staticObject));
  return ctor;
};
var ES6Slider = function() {
  'use strict';
  var $ES6Slider = ($__createClassNoExtends)({
    constructor: function(name) {
      this.name = name;
      this.slides = [];
      this.currentSlide = 0;
      document.title = this.name;
    },
    goTo: function(slideN) {
      if (slideN < this.slides.length - 1 || slideN > 0) {
        try {
          throw undefined;
        } catch (stateObj) {
          try {
            throw undefined;
          } catch (cur) {
            cur = document.location.href.split(/\/+/g).pop().split('.')[0];
            document.querySelector('#es6slide_' + this.currentSlide).classList.add('invisible');
            document.querySelector('#es6slide_' + slideN).classList.remove('invisible');
            this.currentSlide = slideN;
            stateObj = {slide: cur};
            history.pushState(stateObj, "Slide " + this.currentSlide, this.currentSlide);
          }
        }
      }
    },
    next: function() {
      var canNext = (function(x, y) {
        return x < y;
      });
      if (canNext(this.currentSlide, this.slides.length - 1)) {
        try {
          throw undefined;
        } catch (stateObj) {
          document.querySelector('#es6slide_' + this.currentSlide).classList.add('invisible');
          document.querySelector('#es6slide_' + (this.currentSlide + 1)).classList.remove('invisible');
          stateObj = {slide: this.currentSlide};
          this.currentSlide += 1;
          history.pushState(stateObj, "Slide " + this.currentSlide, this.currentSlide);
        }
      } else {
        try {
          throw undefined;
        } catch (stateObj) {
          document.querySelector('#es6slide_' + this.currentSlide).classList.add('invisible');
          this.currentSlide = 0;
          document.querySelector('#es6slide_' + (this.currentSlide)).classList.remove('invisible');
          stateObj = {slide: this.currentSlide};
          history.pushState(stateObj, "Slide " + this.currentSlide, this.currentSlide);
        }
      }
    },
    prev: function() {
      var canPrev = (function(x) {
        return x > 0;
      });
      if (canPrev(this.currentSlide)) {
        try {
          throw undefined;
        } catch (stateObj) {
          document.querySelector('#es6slide_' + this.currentSlide).classList.add('invisible');
          document.querySelector('#es6slide_' + (this.currentSlide - 1)).classList.remove('invisible');
          stateObj = {slide: this.currentSlide};
          this.currentSlide -= 1;
          history.pushState(stateObj, "Slide " + this.currentSlide, this.currentSlide);
        }
      } else {
        try {
          throw undefined;
        } catch (stateObj) {
          document.querySelector('#es6slide_' + this.currentSlide).classList.add('invisible');
          this.currentSlide = this.slides.length;
          document.querySelector('#es6slide_' + (this.currentSlide - 1)).classList.remove('invisible');
          stateObj = {slide: this.currentSlide};
          this.currentSlide -= 1;
          history.pushState(stateObj, "Slide " + this.currentSlide, this.currentSlide);
        }
      }
    },
    addSlide: function() {
      var slide = arguments[0] !== (void 0) ? arguments[0]: new Slide();
      if (slide instanceof Slide) {
        this.slides.push(slide);
      }
      return this;
    },
    render: function() {
      var mainDOMContainer = document.querySelector('#es6slider');
      var _this = this;
      this.slides.forEach(function(slide, index) {
        var DOMElementSlide = document.createElement('div');
        DOMElementSlide.id = 'es6slide_' + index;
        DOMElementSlide.setAttribute('class', 'es6slider slide invisible');
        if (index === 0) {
          DOMElementSlide.classList.remove('invisible');
        }
        var style = slide.style.get();
        if (style) {
          Object.assign(DOMElementSlide.style, style);
        }
        slide.texts.forEach(function(text) {
          var DOMElementText = document.createElement('div');
          DOMElementText.setAttribute('class', 'es6slider text');
          DOMElementText.innerHTML = text.str;
          var style = text.style.get();
          if (style) {
            Object.assign(DOMElementText.style, style);
          }
          DOMElementSlide.appendChild(DOMElementText);
        });
        slide.images.forEach(function(image) {
          var DOMElementImage = document.createElement('img');
          DOMElementImage.src = image.src;
          DOMElementImage.setAttribute('class', 'es6slider image');
          var style = image.style.get();
          if (style) {
            Object.assign(DOMElementImage.style, style);
          }
          DOMElementSlide.appendChild(DOMElementImage);
        });
        slide.DOMElement = DOMElementSlide;
        mainDOMContainer.appendChild(DOMElementSlide);
        var stateObj = {slide: 0};
      });
      var keyboard = new Keyboard();
      keyboard.on(37, (function() {
        return _this.prev();
      }));
      keyboard.on(39, (function() {
        return _this.next();
      }));
      window.addEventListener('popstate', function(event) {
        if (event.state) {
          console.log(event.state);
          _this.goTo(event.state.slide);
        }
      });
    }
  }, {});
  return $ES6Slider;
}();
var Style = function() {
  'use strict';
  var $Style = ($__createClassNoExtends)({
    constructor: function() {
      this.style = {};
    },
    set: function(style) {
      if (typeof style === 'object') {
        Object.assign(this.style, style);
      } else if (arguments.length === 2) {
        this.style[arguments[0]] = arguments[1];
      } else {
        throw "Invalid style";
      }
    },
    get: function() {
      return this.style;
    }
  }, {});
  return $Style;
}();
var Slide = function() {
  'use strict';
  var $Slide = ($__createClassNoExtends)({
    constructor: function() {
      var title = arguments[0] !== (void 0) ? arguments[0]: 'New slide';
      this.title = title;
      this.images = [];
      this.texts = [];
      this.style = new Style();
      return this;
    },
    setBackgroundImage: function(url) {
      var img = new Image(url);
      img.style.set({
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: '0',
        left: '0',
        margin: '0'
      });
      this.images.push(img);
    },
    addImage: function() {
      var image = arguments[0] !== (void 0) ? arguments[0]: new Image('img/default.png');
      if (image instanceof Image) {
        this.images.push(image);
      } else {
        throw "Invalid image";
      }
      return this;
    },
    addText: function() {
      var text = arguments[0] !== (void 0) ? arguments[0]: new Text('Your text here...');
      if (text instanceof Text) {
        this.texts.push(text);
      } else {
        throw "Invalid text";
      }
      return this;
    }
  }, {});
  return $Slide;
}();
var RegularSlide = function($__super) {
  'use strict';
  var $__proto = $__getProtoParent($__super);
  var $RegularSlide = ($__createClass)({constructor: function(title) {
      $__superCall(this, $__proto, "constructor", [title]);
      return this;
    }}, {}, $__proto, $__super, true);
  return $RegularSlide;
}(Slide);
var MasterSlide = function($__super) {
  'use strict';
  var $__proto = $__getProtoParent($__super);
  var $MasterSlide = ($__createClass)({constructor: function() {
      return this;
    }}, {}, $__proto, $__super, true);
  return $MasterSlide;
}(Slide);
var Image = function() {
  'use strict';
  var $Image = ($__createClassNoExtends)({constructor: function(src) {
      this.src = src;
      this.style = new Style();
      return this;
    }}, {});
  return $Image;
}();
var Text = function() {
  'use strict';
  var $Text = ($__createClassNoExtends)({constructor: function(str) {
      this.str = str;
      this.style = new Style();
      return this;
    }}, {});
  return $Text;
}();
var Keyboard = function() {
  'use strict';
  var $Keyboard = ($__createClassNoExtends)({
    constructor: function() {
      return this;
    },
    on: function(key, fn) {
      document.addEventListener('keyup', function(event) {
        var _evt = event || window.event;
        if (_evt.keyCode === key) {
          fn.call(null);
        }
      });
    }
  }, {});
  return $Keyboard;
}();
;(function() {
  var es6slider = new ES6Slider('JavaScript do Futuro no Presente');
  var slide1 = new Slide('Slide 1');
  slide1.setBackgroundImage('img/backtothefuture.jpg');
  var text1 = new Text(es6slider.name);
  text1.style.set({
    color: 'rgb(228, 193, 7)',
    fontSize: '2em',
    position: 'absolute',
    paddingLeft: '5px',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    '-webkit-transform': 'skewX(-16deg)',
    '-moz-transform': 'skewX(-16deg)',
    'transform': 'skewX(-16deg)',
    zIndex: '99',
    fontWeight: 'bold'
  });
  slide1.addText(text1);
  var me = new Slide('Jaydson');
  me.style.set({backgroundColor: '#09311E'});
  var bio = new Text('<span style="font-style:italic;font-size:1.3em;color:#F3EA1A">~Jaydson Gomes~ </span><br> * Entusiasta JavaScript <br> * FrontEnd Engineer no Terra <br> * Curador da BrazilJS Conf/RSJS/FrontInPoa');
  bio.style.set({
    color: '#fff',
    fontSize: '1.3em',
    position: 'absolute',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    zIndex: '99',
    fontWeight: 'bold'
  });
  me.addText(bio);
  var enthusiasm1 = new Slide('enthusiasm');
  enthusiasm1.setBackgroundImage('img/superhtml5.jpeg');
  var enthusiasm2 = new Slide('enthusiasm 2');
  enthusiasm2.setBackgroundImage('img/jesus.jpg');
  var douglas = new Slide('Douglas');
  douglas.setBackgroundImage('img/douglas.jpg');
  var brendan = new Slide('Brendan');
  brendan.setBackgroundImage('img/brendan.jpeg');
  var futurenow = new Slide('futurenow');
  futurenow.setBackgroundImage('img/future-now.gif');
  var cronograma = new Slide('Cronograma');
  cronograma.style.set({backgroundColor: '#09311E'});
  var list = ['História', 'Arrows functions', 'Classes', 'Template Strings', 'default/rest/spread params', 'let + const', 'modules', 'promises'];
  var textCronograma = new Text(("<span style=\"font-style:italic;font-size:1.4em\">~Cronograma~ </span><br>\n\t\t \t\t\t\t\t\t\t<ul style=\"font-size:0.8em\">\n\t\t \t\t\t\t\t\t\t\t<li>" + list[0] + "</li>\n\t\t\t\t\t\t\t\t\t\t<li>" + list[1] + "</li>\n\t\t\t\t\t\t\t\t\t\t<li>" + list[2] + "</li>\n\t\t\t\t\t\t\t\t\t\t<li>" + list[3] + "</li>\n\t\t\t\t\t\t\t\t\t\t<li>" + list[4] + "</li>\n\t\t\t\t\t\t\t\t\t\t<li>" + list[5] + "</li>\n\t\t\t\t\t\t\t\t\t\t<li>" + list[6] + "</li>\n\t\t\t\t\t\t\t\t\t\t<li>" + list[7] + "</li>\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t  "));
  textCronograma.style.set({
    color: '#fff',
    fontSize: '0.6em',
    position: 'absolute',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    zIndex: '99',
    fontWeight: 'bold'
  });
  cronograma.addText(textCronograma);
  var historia = new Slide('historia');
  historia.setBackgroundImage('img/senta-que-la-vem-historia.gif');
  var nineties = new Slide('nineties');
  nineties.style.set({backgroundColor: '#09311E'});
  var ninetiesT = new Text("\n\t\t<div style=\"font-style:italic;font-size:3.2em\">~1995~</div>\n\t\t<div>Mocha</div>\n\t\t<div>LiveScript</div>\n\t\t<div>JavaScript</div>\n\t\t<div>ECMAScript</div>\n\t");
  ninetiesT.style.set({
    color: '#fff',
    fontSize: '1em',
    position: 'absolute',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    zIndex: '99',
    fontWeight: 'bold'
  });
  nineties.addText(ninetiesT);
  var ninetiesECMA3 = new Slide('ninetiesECMA3');
  ninetiesECMA3.style.set({backgroundColor: '#09311E'});
  var ninetiesECMA3T = new Text("\n\t\t<div style=\"font-style:italic;font-size:2.2em\">~1999 - ES3~</div>\n\t\t<div>Versão suportada na maioria dos browsers</div>\n\t\t<div>Introduziu algumas features como expressões regulares, try/catch, entre outras</div>\n\t");
  ninetiesECMA3T.style.set({
    color: '#fff',
    fontSize: '1em',
    position: 'absolute',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    zIndex: '99',
    fontWeight: 'bold'
  });
  ninetiesECMA3.addText(ninetiesECMA3T);
  var brendanYoung = new Slide('brendanYoung');
  brendanYoung.setBackgroundImage('img/brendan-young.jpg');
  var ecma262 = new Slide('historia');
  ecma262.style.set({backgroundColor: '#09311E'});
  var ecma262Text = new Text("ECMA-262");
  ecma262Text.style.set({
    fontSize: '3.5em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff',
    marginTop: '1em'
  });
  ecma262.addText(ecma262Text);
  var ninetiesECMA4 = new Slide('ninetiesECMA4');
  ninetiesECMA4.style.set({backgroundColor: '#09311E'});
  var ninetiesECMA4T = new Text("\n\t\t<div style=\"font-style:italic;font-size:2.2em\">~2008 - ES4~</div>\n\t\t<div>Versão abandonada :(</div>\n\t");
  ninetiesECMA4T.style.set({
    color: '#fff',
    fontSize: '1em',
    position: 'absolute',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    zIndex: '99',
    fontWeight: 'bold'
  });
  ninetiesECMA4.addText(ninetiesECMA4T);
  var ninetiesECMA5 = new Slide('ninetiesECMA5');
  ninetiesECMA5.style.set({backgroundColor: '#09311E'});
  var ninetiesECMA5T = new Text("\n\t\t<div style=\"font-style:italic;font-size:2.2em\">~2009 - ES5~</div>\n\t\t<div> Várias melhorias na linguagem</div>\n\t\t<div><a target=\"_blank\" href=\"http://kangax.github.io/es5-compat-table/\">es5-compat-table</a> by @kangax</div>\n\t");
  ninetiesECMA5T.style.set({
    color: '#fff',
    fontSize: '1em',
    position: 'absolute',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    zIndex: '99',
    fontWeight: 'bold'
  });
  ninetiesECMA5.addText(ninetiesECMA5T);
  var coffee = new Slide('coffee');
  coffee.setBackgroundImage('img/coffeescript.jpg');
  var coruja = new Slide('coruja');
  coruja.style.set({
    backgroundColor: '#000',
    textAlign: 'center',
    padding: '0'
  });
  var imgCoruja = new Image('img/coruja.jpg');
  imgCoruja.style.set({minHeight: '100%'});
  coruja.addImage(imgCoruja);
  var dart = new Slide('dart');
  dart.setBackgroundImage('img/dart.jpg');
  var gato = new Slide('gato');
  gato.style.set({
    backgroundColor: '#000',
    textAlign: 'center',
    padding: '0'
  });
  var imgGato = new Image('img/gato.gif');
  imgGato.style.set({minHeight: '100%'});
  gato.addImage(imgGato);
  var type = new Slide('type');
  type.setBackgroundImage('img/typescript.jpg');
  var ape = new Slide('ape');
  ape.style.set({
    backgroundColor: '#000',
    textAlign: 'center',
    padding: '0'
  });
  var imgApe = new Image('img/ape.jpg');
  imgApe.style.set({minHeight: '100%'});
  ape.addImage(imgApe);
  var fuckometer = new Slide('fuckometer');
  fuckometer.setBackgroundImage('img/fuckometer.gif');
  var ecma6 = new Slide('ecma6');
  ecma6.style.set({backgroundColor: '#09311E'});
  var ecma6T = new Text("ES6");
  ecma6T.style.set({
    fontSize: '10.5em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  ecma6.addText(ecma6T);
  var jake = new Slide('jake');
  jake.setBackgroundImage('img/jake.gif');
  var arrows = new Slide('arrows');
  arrows.style.set({backgroundColor: '#09311E'});
  var arrowsT = new Text("Arrows");
  arrowsT.style.set({
    fontSize: '6.5em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  arrows.addText(arrowsT);
  var arrowsS = new Slide('arrows-syntax');
  arrowsS.style.set({backgroundColor: '#09311E'});
  var arrowsST = new Text("=>");
  arrowsST.style.set({
    fontSize: '10.5em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  arrowsS.addText(arrowsST);
  var arrowsC = new Slide('arrows-characteristics');
  arrowsC.style.set({backgroundColor: '#09311E'});
  var arrowsCT = new Text("\n\t\t<ul style=\"font-size:0.8em\">\n\t\t\t<li>Lexical this binding</li>\n\t\t\t<li>Not newable</li>\n\t\t\t<li>Can’t change this</li>\n\t\t\t<li>Always anonymus</li>\n\t\t</ul>\n\t");
  arrowsCT.style.set({
    fontSize: '4.5em',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '1.2em'
  });
  arrowsC.addText(arrowsCT);
  var arrowsExample = new Slide('arrows-example');
  arrowsExample.style.set({
    backgroundColor: '#09311E',
    padding: '0'
  });
  var arrowsExampleT = new Text("\n\t\t<h1>Arrows - Exemplo 1</h1>\n\t\t<iframe width=\"100%\" height=\"300\" frameborder=\"0\" allowfullscreen src=\"http://www.es6fiddle.net/embed/hst76yeh/\"></iframe>\n\t");
  arrowsExampleT.style.set({
    width: '100%',
    height: '100%'
  });
  arrowsExample.addText(arrowsExampleT);
  var arrowsExample1 = new Slide('arrows-example1');
  arrowsExample1.style.set({
    backgroundColor: '#09311E',
    padding: '0'
  });
  var arrowsExampleT1 = new Text("\n\t\t<h1>Arrows - Exemplo 2</h1>\n\t\t<iframe width=\"100%\" height=\"300\" src=\"http://jsfiddle.net/bmBAE/embedded/\" allowfullscreen=\"allowfullscreen\" frameborder=\"0\"></iframe>\n\t");
  arrowsExampleT1.style.set({
    width: '100%',
    height: '100%'
  });
  arrowsExample1.addText(arrowsExampleT1);
  var arrowsExample2 = new Slide('arrows-example2');
  arrowsExample2.style.set({
    backgroundColor: '#09311E',
    padding: '0'
  });
  var arrowsExampleT2 = new Text("\n\t\t<h1>Arrows - Exemplo 3</h1>\n\t\t<iframe width=\"100%\" height=\"300\" frameborder=\"0\" allowfullscreen src=\"http://www.es6fiddle.net/embed/hst6dkb7/\"></iframe>\n\t");
  arrowsExampleT2.style.set({
    width: '100%',
    height: '100%'
  });
  arrowsExample2.addText(arrowsExampleT2);
  var classes = new Slide('classes');
  classes.style.set({backgroundColor: '#09311E'});
  var classesT = new Text("Classes");
  classesT.style.set({
    fontSize: '5.5em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  classes.addText(classesT);
  var classesC = new Slide('classes-characteristics');
  classesC.style.set({backgroundColor: '#09311E'});
  var classesCT = new Text("\n\t\t<ul style=\"font-size:0.8em\">\n\t\t\t<li>OO clássica</li>\n\t\t\t<li>super call</li>\n\t\t\t<li>static methods</li>\n\t\t\t<li>constructors</li>\n\t\t</ul>\n\t");
  classesCT.style.set({
    fontSize: '4.5em',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '1.2em'
  });
  classesC.addText(classesCT);
  var classesExample = new Slide('classes-example');
  classesExample.style.set({
    backgroundColor: '#09311E',
    padding: '0'
  });
  var classesExampleT = new Text("\n\t\t<h1>Classes - Exemplo</h1>\n\t\t<iframe width=\"100%\" height=\"300\" frameborder=\"0\" allowfullscreen src=\"http://www.es6fiddle.net/embed/hsv688sz/\"></iframe>\n\t");
  classesExampleT.style.set({
    width: '100%',
    height: '100%'
  });
  classesExample.addText(classesExampleT);
  var classesExample1 = new Slide('classes-example1');
  classesExample1.style.set({
    backgroundColor: '#09311E',
    padding: '0'
  });
  var classesExampleT1 = new Text("\n\t\t<h1>Classes - Exemplo</h1>\n\t\t<iframe width=\"100%\" height=\"300\" src=\"http://jsfiddle.net/AAbm8/embedded/\" allowfullscreen=\"allowfullscreen\" frameborder=\"0\"></iframe>\n\t");
  classesExampleT1.style.set({
    width: '100%',
    height: '100%'
  });
  classesExample1.addText(classesExampleT1);
  var tplstrings = new Slide('template-strings');
  tplstrings.style.set({backgroundColor: '#09311E'});
  var tplstringsT = new Text("Template Strings");
  tplstringsT.style.set({
    fontSize: '3.5em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  tplstrings.addText(tplstringsT);
  var tplStringsC = new Slide('template-strings-characteristics');
  tplStringsC.style.set({backgroundColor: '#09311E'});
  var tplStringsCT = new Text("\n\t\t<ul style=\"font-size:0.8em\">\n\t\t\t<li>Multiline strings</li>\n\t\t\t<li>Basic string formatting</li>\n\t\t\t<li>HTML escaping</li>\n\t\t\t<li>Localization of strings</li>\n\t\t</ul>\n\t");
  tplStringsCT.style.set({
    fontSize: '4.5em',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '1.2em'
  });
  tplStringsC.addText(tplStringsCT);
  var tplStringsExample = new Slide('template-strings-example');
  tplStringsExample.style.set({
    backgroundColor: '#09311E',
    padding: '0'
  });
  var tplStringsExampleT = new Text("\n\t\t<h1>Template strings - Exemplo</h1>\n\t\t<iframe width=\"100%\" height=\"300\" frameborder=\"0\" allowfullscreen src=\"http://www.es6fiddle.net/embed/hsv8wrep/\"></iframe>\n\t");
  tplStringsExampleT.style.set({
    width: '100%',
    height: '100%'
  });
  tplStringsExample.addText(tplStringsExampleT);
  var default_rest_spread = new Slide('Paramaters');
  default_rest_spread.style.set({backgroundColor: '#09311E'});
  var default_rest_spreadT = new Text("Paramaters");
  default_rest_spreadT.style.set({
    fontSize: '3.5em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  default_rest_spread.addText(default_rest_spreadT);
  var default_rest_spreadC = new Slide('default_rest_spread_characteristics');
  default_rest_spreadC.style.set({backgroundColor: '#09311E'});
  var default_rest_spreadCCT = new Text("\n\t\t<ul style=\"font-size:0.8em\">\n\t\t\t<li>Rest</li>\n\t\t\t<li>Spread</li>\n\t\t\t<li>Default</li>\n\t\t</ul>\n\t");
  default_rest_spreadCCT.style.set({
    fontSize: '4.5em',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '1.2em'
  });
  default_rest_spreadC.addText(default_rest_spreadCCT);
  var default_rest_spreadExample = new Slide('default_rest_spreadExample-example');
  default_rest_spreadExample.style.set({
    backgroundColor: '#09311E',
    padding: '0'
  });
  var default_rest_spreadExampleT = new Text("\n\t\t<h1>Rest/Spread/Default - Exemplo</h1>\n\t\t<iframe width=\"100%\" height=\"300\" frameborder=\"0\" allowfullscreen src=\"http://www.es6fiddle.net/embed/hsw6mqvi/\"></iframe>\n\t");
  default_rest_spreadExampleT.style.set({
    width: '100%',
    height: '100%'
  });
  default_rest_spreadExample.addText(default_rest_spreadExampleT);
  var block = new Slide('block-scope');
  block.style.set({backgroundColor: '#09311E'});
  var blockT = new Text("Block Scope");
  blockT.style.set({
    fontSize: '3.5em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  block.addText(blockT);
  var blockC = new Slide('block_characteristics');
  blockC.style.set({backgroundColor: '#09311E'});
  var blockCT = new Text("\n\t\t<ul style=\"font-size:0.8em\">\n\t\t\t<li>let</li>\n\t\t\t<li>const</li>\n\t\t</ul>\n\t");
  blockCT.style.set({
    fontSize: '4.5em',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '1.2em'
  });
  blockC.addText(blockCT);
  var blockExample = new Slide('block-example');
  blockExample.style.set({
    backgroundColor: '#09311E',
    padding: '0'
  });
  var blockExampleT = new Text("\n\t\t<h1>Block Scope - Exemplo</h1>\n\t\t<iframe width=\"100%\" height=\"300\" frameborder=\"0\" allowfullscreen src=\"http://www.es6fiddle.net/embed/hswm5cid/\"></iframe>\n\t");
  blockExampleT.style.set({
    width: '100%',
    height: '100%'
  });
  blockExample.addText(blockExampleT);
  var moduleSlide = new Slide('module');
  moduleSlide.style.set({backgroundColor: '#09311E'});
  var moduleSlideT = new Text("Module");
  moduleSlideT.style.set({
    fontSize: '3.5em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  moduleSlide.addText(moduleSlideT);
  var moduleSlideC = new Slide('module_characteristics');
  moduleSlideC.style.set({backgroundColor: '#09311E'});
  var moduleSlideCT = new Text("\n\t\t<ul style=\"font-size:0.8em\">\n\t\t\t\n\t\t</ul>\n\t");
  moduleSlideCT.style.set({
    fontSize: '4.5em',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '1.2em'
  });
  moduleSlideC.addText(moduleSlideCT);
  var viva = new Slide('viva');
  ape.style.set({
    backgroundColor: '#000',
    textAlign: 'center',
    padding: '0'
  });
  var imgViva = new Image('img/viva.jpg');
  imgViva.style.set({minHeight: '100%'});
  viva.addImage(imgViva);
  var moduleExample = new Slide('module-example');
  moduleExample.style.set({
    backgroundColor: '#09311E',
    padding: '0'
  });
  var moduleExampleT = new Text("\n\t\t<h1>Module - Exemplo</h1>\n\t\t<iframe width=\"100%\" height=\"300\" frameborder=\"0\" allowfullscreen src=\"http://www.es6fiddle.net/embed/hswmt17n/\"></iframe>\n\t");
  moduleExampleT.style.set({
    width: '100%',
    height: '100%'
  });
  moduleExample.addText(moduleExampleT);
  var promiseImage = new Slide('promise-image');
  promiseImage.style.set({
    backgroundColor: '#000',
    textAlign: 'center',
    padding: '0'
  });
  var promiseImageSrc = new Image('img/promise.jpg');
  promiseImageSrc.style.set({minHeight: '100%'});
  promiseImage.addImage(promiseImageSrc);
  var promiseSlide = new Slide('promise');
  promiseSlide.style.set({backgroundColor: '#09311E'});
  var promiseSlideT = new Text("Promises");
  promiseSlideT.style.set({
    fontSize: '3.5em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  promiseSlide.addText(promiseSlideT);
  var promiseSlideC = new Slide('promises_characteristics');
  promiseSlideC.style.set({backgroundColor: '#09311E'});
  var promiseSlideCT = new Text("\n\t\t<ul style=\"font-size:0.6em\">\n\t\t\t<li>Uma promise representa um valor não necessariamente conhecido no seu tempo de criação</li>\n\t\t\t<li>Promises permitem associar handlers de sucesso ou erro de uma ação assíncrona</li>\n\t\t\t<li>Isso permite que métodos assíncronos retornem valores como métodos ~síncronos~</li>\n\t\t\t<li>Ao invés do valor final, o método assíncrono retorna uma promessa de ter um valor em algum momento no futuro</li>\n\t\t</ul>\n\t");
  promiseSlideCT.style.set({
    fontSize: '4.5em',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff',
    fontSize: '1.2em'
  });
  promiseSlideC.addText(promiseSlideCT);
  var promiseExample = new Slide('promise-example');
  promiseExample.style.set({
    backgroundColor: '#09311E',
    padding: '0'
  });
  var promiseExampleT = new Text("\n\t\t<h1>Promises - Exemplo</h1>\n\t\t<iframe width=\"100%\" height=\"300\" frameborder=\"0\" allowfullscreen src=\"http://www.es6fiddle.net/embed/hswp4eb2/\"></iframe>\n\t");
  promiseExampleT.style.set({
    width: '100%',
    height: '100%'
  });
  promiseExample.addText(promiseExampleT);
  var how = new Slide('how');
  how.style.set({backgroundColor: '#09311E'});
  var howT = new Text("Como usar hoje?");
  howT.style.set({
    fontSize: '3.5em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  how.addText(howT);
  var caseSlide = new Slide('case');
  caseSlide.style.set({backgroundColor: '#09311E'});
  var traceur = new Slide('traceur');
  traceur.setBackgroundImage('img/tc.png');
  var traceurLink = new Text("\n\t\t<a href=\"https://github.com/google/traceur-compiler\">https://github.com/google/traceur-compiler</a>\n\t");
  traceurLink.style.set({
    position: 'absolute',
    zIndex: '999',
    fontSize: '0.8em',
    marginLeft: '70px',
    textAlign: 'center',
    marginTop: '25px'
  });
  traceur.addText(traceurLink);
  var es6table = new Slide('es6table');
  es6table.style.set({backgroundColor: '#09311E'});
  var es6tableT = new Text("\n\t\t<h1>Tabela ES6</h1>\n\t\t<a href=\"http://kangax.github.io/es5-compat-table/es6/\">http://kangax.github.io/es5-compat-table/es6/</a>\n\t");
  es6tableT.style.set({
    fontSize: '1em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  es6table.addText(es6tableT);
  var caseSlideT = new Text("Case");
  caseSlideT.style.set({
    fontSize: '3.5em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  caseSlide.addText(caseSlideT);
  var end = new Slide('end');
  end.style.set({backgroundColor: '#09311E'});
  var endT = new Text("\n\t\t<a href=\"https://github.com/jaydson/js-future-in-the-present\">https://github.com/jaydson/js-future-in-the-present</a><br>\n\t\t<a href=\"https://github.com/jaydson/es6slider\">https://github.com/jaydson/es6slider</a>\n\t");
  endT.style.set({
    fontSize: '1em',
    textAlign: 'center',
    textShadow: '4px 4px 2px rgba(10, 10, 10, 1)',
    fontWeight: 'bold',
    color: '#fff'
  });
  end.addText(endT);
  es6slider.addSlide(slide1).addSlide(me).addSlide(enthusiasm1).addSlide(enthusiasm2).addSlide(douglas).addSlide(brendan).addSlide(cronograma).addSlide(historia).addSlide(brendanYoung).addSlide(nineties).addSlide(ecma262).addSlide(ninetiesECMA3).addSlide(ninetiesECMA4).addSlide(ninetiesECMA5).addSlide(coffee).addSlide(coruja).addSlide(dart).addSlide(gato).addSlide(type).addSlide(ape).addSlide(fuckometer).addSlide(ecma6).addSlide(jake).addSlide(arrows).addSlide(arrowsS).addSlide(arrowsC).addSlide(arrowsExample).addSlide(arrowsExample1).addSlide(arrowsExample2).addSlide(classes).addSlide(classesC).addSlide(classesExample).addSlide(classesExample1).addSlide(tplstrings).addSlide(tplStringsC).addSlide(tplStringsExample).addSlide(default_rest_spread).addSlide(default_rest_spreadC).addSlide(default_rest_spreadExample).addSlide(block).addSlide(blockC).addSlide(blockExample).addSlide(moduleSlide).addSlide(viva).addSlide(moduleExample).addSlide(promiseImage).addSlide(promiseSlide).addSlide(promiseSlideC).addSlide(promiseExample).addSlide(how).addSlide(futurenow).addSlide(traceur).addSlide(es6table).addSlide(caseSlide).addSlide(end).render();
  console.log(es6slider);
}());
