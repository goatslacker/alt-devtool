import DevActions from '../actions/DevActions'
import DispatcherStore from './DispatcherStore'
import alt from '../flux/alt'
import stringScore from '../utils/stringScore'

const DispatcherSearchStore = alt.createStore({
  displayName: 'DispatcherSearchStore',

  bindListeners: {
    addItem: DevActions.addDispatch,
    search: DevActions.search
  },

  state: {
    dispatches: [],
    searchValue: ''
  },

  addItem() {
    return this.updateSearch(this.state.searchValue)
  },

  search(searchValue) {
    return this.updateSearch(searchValue)
  },

  updateSearch(searchValue) {
    this.waitFor(DispatcherStore)

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
