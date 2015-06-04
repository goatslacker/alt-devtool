import AltStore from './AltStore'
import alt from '../flux/alt'

class DispatcherStore {
//  static displayName = 'DispatcherStore'

  constructor() {
    this.dispatches = []
  }

  reduce() {
    this.waitFor(AltStore)
    return { dispatches: AltStore.getDispatches() }
  }
}

export default alt.createStore(DispatcherStore)
