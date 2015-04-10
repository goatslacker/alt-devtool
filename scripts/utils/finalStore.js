// XXX remove after 0.15.5
function FinalStore() {
  this.dispatcher.register(function (payload) {
    const stores = Object.keys(this.alt.stores).reduce(function (arr, store) {
      return arr.push(this.alt.stores[store].dispatchToken), arr
    }.bind(this), [])

    this.waitFor(stores)
    this.setState({ payload })
  }.bind(this))
}

function makeFinalStore(alt) {
  return alt.createStore(FinalStore, 'AltFinalStore', false)
}

export default makeFinalStore
