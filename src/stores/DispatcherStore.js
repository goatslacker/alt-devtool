import DevActions from '../actions/DevActions'
import StoresStore from './StoresStore'
import alt from '../flux/alt'

const DispatcherStore = alt.createStore({
  displayName: 'DispatcherStore',

  bindListeners: {
    addItem: DevActions.addDispatch
  },

  state: {
    dispatches: [],
  },

  addItem(dispatch) {
    const { stores } = StoresStore.getState()
    dispatch.stores = stores
      .filter((x) => x.listeners.indexOf(dispatch.action) > -1)
      .map((x) => x.name)
      .join(', ')

    this.state.dispatches.push(dispatch)
  }
})

export default DispatcherStore
