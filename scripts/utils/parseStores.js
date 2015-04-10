import ALT from './altKey'

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

export default parseStores
