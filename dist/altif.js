(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = makeFinalStore;
/**
 * makeFinalStore(alt: AltInstance): AltStore
 *
 * > Creates a `FinalStore` which is a store like any other except that it
 * waits for all other stores in your alt instance to emit a change before it
 * emits a change itself.
 *
 * Want to know when a particular dispatch has completed? This is the util
 * you want.
 *
 * Good for: taking a snapshot and persisting it somewhere, saving data from
 * a set of stores, syncing data, etc.
 *
 * Usage:
 *
 * ```js
 * var FinalStore = makeFinalStore(alt);
 *
 * FinalStore.listen(function () {
 *   // all stores have now changed
 * });
 * ```
 */

function FinalStore() {
  var _this = this;

  this.dispatcher.register(function (payload) {
    var stores = Object.keys(_this.alt.stores).reduce(function (arr, store) {
      arr.push(_this.alt.stores[store].dispatchToken);
      return arr;
    }, []);

    _this.waitFor(stores);
    _this.setState({ payload: payload });
    _this.emitChange();
  });
}

function makeFinalStore(alt) {
  return alt.FinalStore ? alt.FinalStore : alt.FinalStore = alt.createUnsavedStore(FinalStore);
}

module.exports = exports["default"];
},{}],2:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var findAlt = _interopRequire(require("./utils/findAlt"));

findAlt(100);

},{"./utils/findAlt":4}],3:[function(require,module,exports){
"use strict";

var idx = 0;

var alts = {
  "switch": function _switch(i) {
    idx = i;
  },

  all: function all() {
    return window["goatslacker.github.io/alt/"] || window["alt.js.org"];
  },

  map: function map(f) {
    var all = alts.all();
    return (Array.isArray(all) ? all : [{ alt: all, name: "Alt" }]).map(f);
  },

  get: function get() {
    var all = alts.all();
    if (all) {
      return Array.isArray(all) ? all[idx].alt : all;
    }

    return null;
  }
};

module.exports = alts;

},{}],4:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var alts = _interopRequire(require("./alts"));

var registerAlt = _interopRequire(require("./registerAlt"));

var TIMEOUT = 30000;

function poke(time) {
  if (time > TIMEOUT) {
    return;
  }

  if (alts.get()) {
    registerAlt();
  } else {
    setTimeout(function () {
      poke(time * 2);
    }, time);
  }
}

module.exports = poke;

},{"./alts":3,"./registerAlt":8}],5:[function(require,module,exports){
"use strict";

module.exports = getStoreData;

function getStoreData(store, state) {
  return {
    name: store.displayName,
    state: JSON.stringify(state),
    dispatchId: store.dispatchToken,
    listeners: store.boundListeners
  };
}

},{}],6:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

module.exports = parseStores;

var alts = _interopRequire(require("./alts"));

var getStoreData = _interopRequire(require("./getStoreData"));

function parseStores() {
  return alts.map(function (obj, i) {
    var alt = obj.alt;
    var stores = Object.keys(alt.stores).map(function (storeName) {
      var store = alt.stores[storeName];
      return getStoreData(store, alt.takeSnapshot(store));
    }, {});

    return { alt: i, stores: stores };
  });
}

},{"./alts":3,"./getStoreData":5}],7:[function(require,module,exports){
"use strict";

function post(type, payload) {
  window.postMessage({
    type: type,
    payload: payload,
    source: "alt-devtools"
  }, "*");
}

module.exports = post;

},{}],8:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var alts = _interopRequire(require("./alts"));

var makeFinalStore = _interopRequire(require("alt/utils/makeFinalStore"));

var post = _interopRequire(require("./post"));

var parseStores = _interopRequire(require("./parseStores"));

var getStoreData = _interopRequire(require("./getStoreData"));

var uid = _interopRequire(require("./uid"));

var listeners = [];
var snapshots = {};

// handle messages from the hook
function onMessageFromHook(event) {
  if (event && event.source !== window) {
    return;
  }

  var message = event.data;

  if (typeof message !== "object" || message === null || message.source !== "alt-hook") {
    return;
  }

  var _message$payload = message.payload;
  var action = _message$payload.action;
  var data = _message$payload.data;

  switch (action) {
    case "SELECT_ALT":
      alts["switch"](data.id);
      post("ALT", {
        alts: alts.map(function (x) {
          return x.name;
        })
      });
      return;
    case "REFRESH":
      registerAlt();
      return;
    case "SNAPSHOT":
      var snapshot = alts.get().takeSnapshot();
      prompt("Look! Here's your entire app state in a string:", snapshot);
      console.log("App snapshot", JSON.parse(snapshot));
      return;
    case "FLUSH":
      var flushed = alts.get().flush();
      prompt("App flushed; App snapshot taken:", flushed);
      console.log("App flushed and snapshotted", JSON.parse(flushed));

      parseStores().forEach(function (data) {
        return post("STORES", data);
      });
      return;
    case "RECYCLE_STORE":
      alts.get().recycle(data.storeName);
      parseStores().forEach(function (data) {
        return post("STORES", data);
      });
      return;
    case "REVERT":
      if (snapshots[data.id]) {
        alts.get().bootstrap(snapshots[data.id]);
        parseStores().forEach(function (data) {
          return post("STORES", data);
        });
      }
    case "BOOTSTRAP":
      if (data.bootstrapData) {
        alts.get().bootstrap(data.bootstrapData);
      }
      return;
      return;
    case "START_RECORDING":
    // XXX start recording
    // if we're recording let the dispatch now that it was recorded...
    case "CLEAR_RECORDING":
    // XXX I guess we need to retroactively clear all the dispatches. This should be handled in the store
    case "STOP_RECORDING":
    // XXX we stop the recording and let the post dispatches know.
    case "REPLAY_RECORDING":
    // XXX straight-forward, just replay them in a standard way.
    case "LOAD_RECORDING":
    // XXX I wish this used the file system API
    case "SAVE_RECORDING":
    // XXX I wish this used the file system API
  }
}

window.addEventListener("message", onMessageFromHook);

function registerAlt() {
  listeners.forEach(function (x) {
    return x.destroy();
  });

  // initial post of alts
  post("ALT", {
    alts: alts.map(function (x) {
      return x.name;
    })
  });

  parseStores().forEach(function (data) {
    return post("STORES", data);
  });

  listeners = alts.map(function (obj, i) {
    var alt = obj.alt;

    // create our state container for each store
    var altStores = alt.deserialize(alt.takeSnapshot());
    var stores = Object.keys(altStores).reduce(function (obj, storeName) {
      obj[storeName] = getStoreData(alt.stores[storeName], altStores[storeName]);
      return obj;
    }, {});

    // store listeners for when each store changes
    var storeListeners = Object.keys(alt.stores).map(function (storeName) {
      var store = alt.stores[storeName];

      function mapState(state) {
        return store.config.onSerialize ? store.config.onSerialize(state) : state;
      }

      return store.listen(function (nextState) {
        stores[storeName] = getStoreData(store, mapState(nextState));
      });
    });

    // the final store for dispatch
    var finalStore = makeFinalStore(alt);

    var listener = finalStore.listen(function (_ref) {
      var payload = _ref.payload;

      var id = uid();

      post("STORES", {
        alt: i,
        stores: Object.keys(stores).map(function (name) {
          return stores[name];
        })
      });

      post("DISPATCH", {
        alt: i,
        id: id,
        action: Symbol.keyFor(payload.action),
        data: JSON.stringify(payload.data)
      });

      snapshots[id] = alt.takeSnapshot();
    });

    return {
      destroy: function destroy() {
        storeListeners.forEach(function (f) {
          return f();
        });
        listener();
      }
    };
  });
}

module.exports = registerAlt;

},{"./alts":3,"./getStoreData":5,"./parseStores":6,"./post":7,"./uid":9,"alt/utils/makeFinalStore":1}],9:[function(require,module,exports){
"use strict";

function uid() {
  return (Date.now() * Math.random()).toString(35).substr(0, 16);
}

module.exports = uid;

},{}]},{},[2]);
