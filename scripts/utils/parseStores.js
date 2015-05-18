import getAlt from './alt'

function parseStores() {
  return Object.keys(getAlt().stores).map(function (storeName) {
    const store = getAlt().stores[storeName]
    return {
      name: storeName,
      state: JSON.stringify(store.getState()),
      dispatchId: store.dispatchToken,
      listeners: store.boundListeners
    }
  })
}

export default parseStores
