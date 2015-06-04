export default function getStoreData(store, state) {
  return {
    name: store.displayName,
    state: state,
    dispatchId: store.dispatchToken,
    listeners: store.boundListeners
  }
}
