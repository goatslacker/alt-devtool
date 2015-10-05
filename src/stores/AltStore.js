import DevActions from '../actions/DevActions'
import alt from '../flux/alt'

class AltStore {
  constructor() {
    this.alts = []
    this.dispatches = {}
    this.stores = {}
    this.selectedAlt = null
    this.logDispatches = false

    this.bindListeners({
      addItem: DevActions.addDispatch,
      addStores: DevActions.addStores,
      clearAll: DevActions.clearAll,
      clearDispatches: DevActions.clearDispatches,
      replaceAlts: DevActions.replaceAlts,
      selectAlt: DevActions.selectAlt,
      toggleLogDispatch: DevActions.toggleLogDispatch
    })

    this.exportPublicMethods({
      getDispatches: () => this.dispatches[this.selectedAlt] || [],
      getStores: () => this.stores[this.selectedAlt] || [],
    })
  }

  addItem(dispatch) {
    if (!this.logDispatches) {
      return false
    }

    this.dispatches[dispatch.alt] = this.dispatches[dispatch.alt] || []

    const stores = this.stores[dispatch.alt] || []

    const dispatchedStores = stores
      .filter((x) => x.listeners.indexOf(dispatch.action) > -1)
      .map((x) => x.name)
      .join(', ')

    this.dispatches[dispatch.alt].unshift(Object.assign({
      stores: dispatchedStores
    }, dispatch))

    this.setState({ dispatches: this.dispatches })
  }

  addStores(payload) {
    this.stores[payload.alt] = payload.stores
  }

  clearAll() {
    this.dispatches = {}
  }

  clearDispatches() {
    this.dispatches[this.selectedAlt] = []
  }

  selectAlt(id) {
    this.selectedAlt = id
  }

  replaceAlts(alts) {
    this.selectedAlt = this.selectedAlt || 0
    this.alts = alts
  }

  toggleLogDispatch() {
    this.logDispatches = !this.logDispatches
  }
}

export default alt.createStore(AltStore, 'AltStore')
