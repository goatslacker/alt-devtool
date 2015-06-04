export default function getStoreData(store, state) {
  return {
    name: store.displayName,
    state: JSON.stringify(state),
    dispatchId: store.dispatchToken,
    listeners: store.boundListeners
  }
}
