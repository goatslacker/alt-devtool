import DevActions from '../actions/DevActions'
import alt from '../flux/alt'
import AltStore from '../stores/AltStore'

// XXX maybe some microflux?
class StoresStore {
//  static displayName = 'StoresStore'

  constructor() {
    this.selectedStore = null
    this.stores = []

    this.dispatcher.register(() => {
      this.stores = AltStore.getStores()
      this.emitChange()
    })

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
}

export default alt.createStore(StoresStore)
