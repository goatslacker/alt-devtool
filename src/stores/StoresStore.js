import DevActions from '../actions/DevActions'
import alt from '../flux/alt'
import AltStore from '../stores/AltStore'

class StoresStore {
//  static displayName = 'StoresStore'

  constructor() {
    this.selectedStore = null
    this.stores = []

    this.bindListeners({
      clearAll: DevActions.clearAll,
      selectAlt: DevActions.selectAlt,
      selectStore: DevActions.selectStore,
    })
  }

  selectAlt() {
    this.selectedStore = null
  }

  clearAll() {
    this.selectedStore = null
  }

  selectStore(id) {
    this.selectedStore = id
  }

  otherwise() {
    this.stores = AltStore.getStores()
  }
}

export default alt.createStore(StoresStore)
