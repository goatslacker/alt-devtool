import DevActions from '../actions/DevActions'
import alt from '../flux/alt'

const StoresStore = alt.createStore({
  displayName: 'StoresStore',

  bindListeners: {
    addStores: DevActions.addStores,
    selectStore: DevActions.selectStore
  },

  state: {
    selectedStore: null,
    stores: []
  },

  addStores(stores) {
    const selectedStore = this.state.selectedStore === null
      ? this.state.stores.length ? 0 : null
      : this.state.selectedStore

    return this.setState({
      selectedStore,
      stores
    })
  },

  selectStore(id) {
    this.state.selectedStore = id
  }
})

export default StoresStore
