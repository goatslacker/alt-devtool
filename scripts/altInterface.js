(function () {
  const TIMEOUT = 10000
  const ALT = 'goatslacker.github.io/alt/'
  const snapshots = {}
  poke(100)

  function uid() {
    return (Date.now() * Math.random()).toString(35).substr(0, 7)
  }

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
      const store = window[ALT].stores[storeName]
      return {
        name: storeName,
        state: JSON.stringify(store.getState()),
        dispatchId: store.dispatchToken,
        listeners: store.boundListeners
      }
    })
  }

  function register() {
    post('STORES', {
      stores: parseStores()
    })

    const finalStore = makeFinalStore(window[ALT])

    finalStore.getEventEmitter().on('dispatch', function (payload) {
      const id = uid()

      post('STORES', {
        stores: parseStores()
      })

      post('DISPATCH', {
        id: id,
        action: Symbol.keyFor(payload.action),
        data: payload.data
      })

      snapshots[id] = window[ALT].takeSnapshot()
    })
  }

  function post(type, payload) {
    window.postMessage({
      type: type,
      payload: payload,
      source: 'alt-devtools'
    }, '*')
  }

  function FinalStore() {
    this.dispatcher.register(function (payload) {
      const stores = Object.keys(this.alt.stores).reduce(function (arr, store) {
        return arr.push(this.alt.stores[store].dispatchToken), arr
      }.bind(this), [])

      this.waitFor(stores)
      this.getInstance().getEventEmitter().emit('dispatch', payload)
    }.bind(this))
  }

  function makeFinalStore(alt) {
    return alt.createStore(FinalStore, 'AltFinalStore', false)
  }

  // handle messages from the hook
  function onMessageFromHook(event) {
    if (event && event.source !== window) {
      return;
    }

    const message = event.data;

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
      case 'REVERT':
        if (snapshots[message.payload.data.id]) {
          window[ALT].bootstrap(snapshots[message.payload.data.id])
        }
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
