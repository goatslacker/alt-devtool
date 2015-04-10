import DevActions from '../actions/DevActions'
import alt from '../flux/alt'

class StoresStore {
  constructor() {
    this.selectedStore = null
    this.stores = []

    this.bindListeners({
      addStores: DevActions.addStores,
      clearAll: DevActions.clearAll,
      selectStore: DevActions.selectStore
    })
  }

  addStores(stores) {
    const selectedStore = this.selectedStore === null
      ? this.stores.length ? 0 : null
      : this.selectedStore

    return this.setState({
      selectedStore,
      stores
    })
  }

  clearAll() {
    this.selectedStore = null
    this.stores = []
  }

  selectStore(id) {
    this.selectedStore = id
  }
}

export default alt.createStore(StoresStore, 'StoresStore')
