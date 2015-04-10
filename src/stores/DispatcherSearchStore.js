import DevActions from '../actions/DevActions'
import DispatcherStore from './DispatcherStore'
import alt from '../flux/alt'
import stringScore from '../utils/stringScore'

class DispatcherSearchStore {
  constructor() {
    this.dispatches = []
    this.logDispatches = DispatcherStore.getState().logDispatches
    this.revertId = null
    this.searchValue = ''
    this.selectedPayload = {}

    this.bindListeners({
      addItem: DevActions.addDispatch,
      clearAll: DevActions.clearAll,
      clearDispatches: DevActions.clearDispatches,
      revert: DevActions.revert,
      search: DevActions.search,
      select: DevActions.selectRow,
      toggleLogDispatch: DevActions.toggleLogDispatch
    })
  }

  beforeEach() {
    this.waitFor(DispatcherStore)
  }

  addItem() {
    const { logDispatches } = DispatcherStore.getState()

    if (!logDispatches) {
      return false
    }

    return this.updateSearch(this.searchValue)
  }

  clearAll() {
    this.dispatches = []
    this.searchValue = ''
    this.selectedPayload = {}
  }

  clearDispatches() {
    this.clearAll()
  }

  revert(id) {
    this.revertId = id
  }

  search(searchValue) {
    return this.updateSearch(searchValue)
  }

  select(payload) {
    this.selectedPayload = payload
  }

  toggleLogDispatch() {
    this.logDispatches = DispatcherStore.getState().logDispatches
  }

  updateSearch(searchValue) {
    const { dispatches } = DispatcherStore.getState()

    if (!searchValue.trim()) {
      return this.setState({
        dispatches,
        searchValue
      })
    }

    const filteredDispatches = dispatches.filter((dispatch) => {
      return stringScore(dispatch.action.replace('#', ''), searchValue) > .25
    })

    const selectedPayload = filteredDispatches.reduce((obj, dispatch) => {
      return dispatch.data === this.selectedPayload
        ? dispatch.data
        : obj
    }, {})

    return this.setState({
      dispatches: filteredDispatches,
      searchValue,
      selectedPayload
    })
  }
}

export default alt.createStore(DispatcherSearchStore, 'DispatcherSearchStore')
