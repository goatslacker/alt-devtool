import DevActions from '../actions/DevActions'
import DispatcherStore from './DispatcherStore'
import alt from '../flux/alt'
import stringScore from '../utils/stringScore'

const DispatcherSearchStore = alt.createStore({
  displayName: 'DispatcherSearchStore',

  bindListeners: {
    addItem: DevActions.addDispatch,
    clearAll: DevActions.clearDispatches,
    search: DevActions.search,
    select: DevActions.selectRow,
    toggleLogDispatch: DevActions.toggleLogDispatch
  },

  state: {
    dispatches: [],
    logDispatches: DispatcherStore.getState().logDispatches,
    searchValue: '',
    selectedPayload: {}
  },

  beforeEach() {
    this.waitFor(DispatcherStore)
  },

  addItem() {
    const { logDispatches } = DispatcherStore.getState()

    if (!logDispatches) {
      return false
    }

    return this.updateSearch(this.state.searchValue)
  },

  clearAll() {
    this.state.dispatches = []
    this.state.searchValue = ''
    this.state.selectedPayload = {}
  },

  search(searchValue) {
    return this.updateSearch(searchValue)
  },

  select(payload) {
    this.state.selectedPayload = payload
  },

  toggleLogDispatch() {
    this.state.logDispatches = DispatcherStore.getState().logDispatches
  },

  updateSearch(searchValue) {
    const { dispatches } = DispatcherStore.getState()

    if (!searchValue.trim()) {
      return this.setState({
        dispatches,
        searchValue
      })
    }

    const filteredDispatches = dispatches.filter((dispatch) => {
      return stringScore(dispatch[0].replace('#', ''), searchValue) > .25
    })

    const selectedPayload = filteredDispatches.reduce((obj, dispatch) => {
      return dispatch[2] === this.state.selectedPayload
        ? dispatch[2]
        : obj
    }, {})

    return this.setState({
      dispatches: filteredDispatches,
      searchValue,
      selectedPayload
    })
  }
})

export default DispatcherSearchStore
