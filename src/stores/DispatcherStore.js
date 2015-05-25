import AltStore from './AltStore'
import alt from '../flux/alt'

// XXX maybe some microflux?
class DispatcherStore {
//  static displayName = 'DispatcherStore'

  constructor() {
    this.dispatches = []

    this.alt.dispatcher.register(() => {
      this.waitFor(AltStore)

      this.dispatches = AltStore.getDispatches()
      this.emitChange()
    })
  }
}

export default alt.createStore(DispatcherStore)
