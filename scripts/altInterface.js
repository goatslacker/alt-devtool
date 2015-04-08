(function () {
  const TIMEOUT = 10000
  const ALT = 'goatslacker.github.io/alt/'
  poke(100)

  function poke(time) {
    if (time > TIMEOUT) {
      return
    }

    if (window[ALT]) {
      register()
    } else {
      setTimeout(function () {
        poke(time * 2)
      }, time)
    }
  }

  function parseStores() {
    return Object.keys(window[ALT].stores).map(function (storeName) {
      var store = window[ALT].stores[storeName]
      return {
        name: storeName,
        state: JSON.stringify(store.getState()),
        dispatchId: store.dispatchToken,
        listeners: store.boundListeners
      }
    })
  }

  function register() {
    // XXX if stores change within a dispatch, dispatch new stores...
    var cachedStores = []

    // XXX it would be great if I could capture the stack trace of where these actions are triggered
    window[ALT].dispatcher.register(function (payload) {
      post('STORES', {
        stores: parseStores()
      })

      post('DISPATCH', {
        action: Symbol.keyFor(payload.action),
        data: payload.data
      })
    })

    post('STORES', {
      stores: parseStores()
    })
  }

  function post(type, payload) {
    window.postMessage({
      type: type,
      payload: payload,
      source: 'alt-devtools'
    }, '*')
  }

  // handle messages from the hook
  function onMessageFromHook(event) {
    if (event && event.source !== window) {
      return;
    }

    var message = event.data;

//    console.log('%%%%%%%%%%%%%%', event, message);

    if (typeof message !== 'object' || message === null || message.source !== 'alt-hook') {
      return;
    }

    switch (message.payload.action) {
      case 'REFRESH_STORES':
        post('STORES', {
          stores: parseStores()
        })
      return
      case 'SNAPSHOT':
        console.log(window[ALT].takeSnapshot())
      return
      case 'FLUSH':
        console.log(window[ALT].flush())
      return
      case 'RECYCLE_STORE':
        window[ALT].recycle(message.payload.data.storeName)
        post('STORES', {
          stores: parseStores()
        })
      return
      case 'START_RECORDING':
      case 'CLEAR_RECORDING':
      case 'STOP_RECORDING':
      case 'REPLAY_RECORDING':
      case 'LOAD_RECORDING':
      case 'SAVE_RECORDING':

    }
  }

  window.addEventListener('message', onMessageFromHook)
}())
