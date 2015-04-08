(function () {
  const TIMEOUT = 10000
  poke(100)

  function poke(time) {
    if (time > TIMEOUT) {
      return
    }

    if (window.Alt) {
      register()
    } else {
      setTimeout(function () {
        poke(time * 2)
      }, time)
    }
  }

  function parseStores() {
    return Object.keys(window.Alt.stores).map(function (storeName) {
      var store = window.Alt.stores[storeName]
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
    window.Alt.dispatcher.register(function (payload) {
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
        console.log(JSON.parse(window.Alt.takeSnapshot()))
      return
      case 'FLUSH':
        console.log(window.Alt.flush())
      return
      case 'RECYCLE_STORE':
        window.Alt.recycle(message.payload.data.storeName)
        post('STORES', {
          stores: parseStores()
        })
      return
    }
  }

  window.addEventListener('message', onMessageFromHook)
}())
