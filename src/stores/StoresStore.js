import DevActions from '../actions/DevActions'
import alt from '../flux/alt'

const StoresStore = alt.createStore({
  displayName: 'StoresStore',

  bindListeners: {
    addStores: DevActions.addStores
  },

  state: { stores: [] },

  addStores(stores) {
    return this.setState({ stores })
  }
})

export default StoresStore
