import DevActions from '../actions/DevActions'
import DispatcherStore from './DispatcherStore'
import alt from '../flux/alt'
import stringScore from '../utils/stringScore'

const DispatcherSearchStore = alt.createStore({
  displayName: 'DispatcherSearchStore',

  bindListeners: {
    addItem: DevActions.addDispatch,
    clearAll: DevActions.clearDispatches,
    search: DevActions.search
  },

  state: {
    dispatches: [],
    searchValue: ''
  },

  beforeEach() {
    this.waitFor(DispatcherStore)
  },

  addItem() {
    return this.updateSearch(this.state.searchValue)
  },

  search(searchValue) {
    return this.updateSearch(searchValue)
  },

  clearAll() {
    this.state.dispatches = []
    this.state.searchValue = ''
  },

  updateSearch(searchValue) {
    const { dispatches } = DispatcherStore.getState()

    if (!searchValue.trim()) {
      return this.setState({
        dispatches,
        searchValue
      })
    }

    return this.setState({
      dispatches: dispatches.filter((dispatch) => {
        return stringScore(dispatch[0].replace('#', ''), searchValue) > .25
      }),
      searchValue
    })
  }
})

export default DispatcherSearchStore
