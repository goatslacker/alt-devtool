import AltStore from './AltStore'
import DevActions from '../actions/DevActions'
import DispatcherStore from './DispatcherStore'
import alt from '../flux/alt'
import stringScore from '../utils/stringScore'

class DispatcherSearchStore {
//  static displayName = 'DispatcherSearchStore'

  constructor() {
    this.dispatches = []
    this.revertId = null
    this.searchValue = ''
    this.selectedPayload = {}

    this.bindListeners({
      clearAll: [DevActions.clearAll, DevActions.clearDispatches],
      revert: DevActions.revert,
      search: DevActions.search,
      select: DevActions.selectRow,
    })
  }

  clearAll() {
    this.dispatches = []
    this.searchValue = ''
    this.selectedPayload = {}
  }

  revert(id) {
    this.revertId = id
  }

  search(searchValue) {
    this.updateSearch(searchValue)
  }

  select(payload) {
    this.selectedPayload = {
      id: payload.id,
      root: {
        action: payload.action,
        data: payload.data
      }
    }
  }

  otherwise() {
    this.waitFor(AltStore, DispatcherStore)

    const { logDispatches } = AltStore.getState()
    if (!logDispatches) return

    this.updateSearch(this.searchValue)
  }

  updateSearch(searchValue) {
    const { dispatches } = DispatcherStore.getState()

    if (!searchValue.trim()) {
      this.setState({
        dispatches,
        searchValue
      })
      return
    }

    const filteredDispatches = dispatches.filter((dispatch) => {
      return stringScore(dispatch.action.replace('#', ''), searchValue) > .25
    })

    const selectedPayload = filteredDispatches.reduce((obj, dispatch) => {
      return dispatch.id === this.selectedPayload.id ? dispatch : obj
    }, {})

    this.setState({
      dispatches: filteredDispatches,
      searchValue,
      selectedPayload
    })
  }
}

export default alt.createStore(DispatcherSearchStore)
