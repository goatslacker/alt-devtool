import DevActions from '../actions/DevActions'
import StoresStore from './StoresStore'
import alt from '../flux/alt'

const DispatcherStore = alt.createStore({
  displayName: 'DispatcherStore',

  bindListeners: {
    addItem: DevActions.addDispatch,
    clearAll: DevActions.clearDispatches,
    toggleLogDispatch: DevActions.toggleLogDispatch
  },

  state: {
    dispatches: [],
    logDispatches: true
  },

  addItem(dispatch) {
    if (!this.state.logDispatches) {
      return false
    }

    const { stores } = StoresStore.getState()

    const dispatchedStores = stores
      .filter((x) => x.listeners.indexOf(dispatch.action) > -1)
      .map((x) => x.name)
      .join(', ')

    this.state.dispatches.unshift(Object.assign({
      stores: dispatchedStores
    }, dispatch))
  },

  clearAll() {
    this.state.dispatches = []
  },

  toggleLogDispatch() {
    this.state.logDispatches = !this.state.logDispatches
  }
})

export default DispatcherStore
