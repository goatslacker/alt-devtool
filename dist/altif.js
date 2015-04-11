(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var findAlt = _interopRequire(require("./utils/findAlt"));

findAlt(100);

},{"./utils/findAlt":4}],2:[function(require,module,exports){
"use strict";

module.exports = "goatslacker.github.io/alt/";

},{}],3:[function(require,module,exports){
// XXX remove after 0.15.5
"use strict";

function FinalStore() {
  this.dispatcher.register((function (payload) {
    var stores = Object.keys(this.alt.stores).reduce((function (arr, store) {
      return (arr.push(this.alt.stores[store].dispatchToken), arr);
    }).bind(this), []);

    this.waitFor(stores);
    this.setState({ payload: payload });
  }).bind(this));
}

function makeFinalStore(alt) {
  return alt.createStore(FinalStore, "AltFinalStore", false);
}

module.exports = makeFinalStore;

},{}],4:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var ALT = _interopRequire(require("./altKey"));

var registerAlt = _interopRequire(require("./registerAlt"));

var TIMEOUT = 1000;

function poke(time) {
  if (time > TIMEOUT) {
    return;
  }

  if (window[ALT]) {
    registerAlt();
  } else {
    setTimeout(function () {
      poke(time * 2);
    }, time);
  }
}

module.exports = poke;

},{"./altKey":2,"./registerAlt":7}],5:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var ALT = _interopRequire(require("./altKey"));

function parseStores() {
  return Object.keys(window[ALT].stores).map(function (storeName) {
    var store = window[ALT].stores[storeName];
    return {
      name: storeName,
      state: JSON.stringify(store.getState()),
      dispatchId: store.dispatchToken,
      listeners: store.boundListeners
    };
  });
}

module.exports = parseStores;

},{"./altKey":2}],6:[function(require,module,exports){
"use strict";

function post(type, payload) {
  window.postMessage({
    type: type,
    payload: payload,
    source: "alt-devtools"
  }, "*");
}

module.exports = post;

},{}],7:[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var ALT = _interopRequire(require("./altKey"));

var makeFinalStore = _interopRequire(require("./finalStore"));

var post = _interopRequire(require("./post"));

var parseStores = _interopRequire(require("./parseStores"));

var uid = _interopRequire(require("./uid"));

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
    case "SNAPSHOT":
      console.log(window[ALT].takeSnapshot());
      return;
    case "FLUSH":
      console.log(window[ALT].flush());
      post("STORES", {
        stores: parseStores()
      });
      return;
    case "RECYCLE_STORE":
      window[ALT].recycle(data.storeName);
      post("STORES", {
        stores: parseStores()
      });
      return;
    case "REVERT":
      if (snapshots[data.id]) {
        window[ALT].bootstrap(snapshots[data.id]);
        post("STORES", {
          stores: parseStores()
        });
      }
    case "BOOTSTRAP":
      if (data.bootstrapData) {
        window[ALT].bootstrap(data.bootstrapData);
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
  post("STORES", {
    stores: parseStores()
  });

  var finalStore = makeFinalStore(window[ALT]);

  finalStore.listen(function (_ref) {
    var payload = _ref.payload;

    var id = uid();

    post("STORES", {
      stores: parseStores()
    });

    post("DISPATCH", {
      id: id,
      action: Symbol.keyFor(payload.action),
      data: payload.data
    });

    snapshots[id] = window[ALT].takeSnapshot();
  });
}

module.exports = registerAlt;

},{"./altKey":2,"./finalStore":3,"./parseStores":5,"./post":6,"./uid":8}],8:[function(require,module,exports){
"use strict";

function uid() {
  return (Date.now() * Math.random()).toString(35).substr(0, 7);
}

module.exports = uid;

},{}]},{},[1]);
