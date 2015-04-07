import DevActions from '../actions/DevActions'
import StoresStore from './StoresStore'
import alt from '../flux/alt'

const DispatcherStore = alt.createStore({
  displayName: 'DispatcherStore',

  bindListeners: {
    addItem: DevActions.addDispatch,
    clearAll: DevActions.clearDispatches
  },

  state: {
    dispatches: [],
  },

  clearAll() {
    this.state.dispatches = []
  },

  addItem(dispatch) {
    const { stores } = StoresStore.getState()

    const dispatchedStores = stores
      .filter((x) => x.listeners.indexOf(dispatch.action) > -1)
      .map((x) => x.name)
      .join(', ')

    this.state.dispatches.push([
      dispatch.action,
      dispatchedStores,
      dispatch.data
    ])
  }
})

export default DispatcherStore
