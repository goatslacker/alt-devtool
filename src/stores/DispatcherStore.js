import DevActions from '../actions/DevActions'
import StoresStore from './StoresStore'
import alt from '../flux/alt'

class DispatcherStore {
  constructor() {
    this.dispatches = []
    this.logDispatches = true

    this.bindListeners({
      addItem: DevActions.addDispatch,
      clearAll: DevActions.clearDispatches,
      toggleLogDispatch: DevActions.toggleLogDispatch
    })
  }

  addItem(dispatch) {
    if (!this.logDispatches) {
      return false
    }

    const { stores } = StoresStore.getState()

    const dispatchedStores = stores
      .filter((x) => x.listeners.indexOf(dispatch.action) > -1)
      .map((x) => x.name)
      .join(', ')

    this.dispatches.unshift(Object.assign({
      stores: dispatchedStores
    }, dispatch))
  }

  clearAll() {
    this.dispatches = []
  }

  toggleLogDispatch() {
    this.logDispatches = !this.logDispatches
  }
}

export default alt.createStore(DispatcherStore, 'DispatcherStore')
