import React from 'react'
import Alt from 'alt'
import stringScore from './stringScore'

import Data from './data'

const alt = new Alt()

const Actions = alt.generateActions('addDispatch', 'addStores', 'search')

const StoresStore = alt.createStore({
  displayName: 'StoresStore',

  bindListeners: {
    addStores: Actions.addStores
  },

  state: { stores: [] },

  addStores(stores) {
    return this.setState({ stores })
  }
})

const DispatcherStore = alt.createStore({
  displayName: 'DispatcherStore',

  bindListeners: {
    addItem: Actions.addDispatch
  },

  state: {
    dispatches: [],
  },

  addItem(dispatch) {
    const { stores } = StoresStore.getState()
    dispatch.stores = stores
      .filter((x) => x.listeners.indexOf(dispatch.action) > -1)
      .map((x) => x.name)
      .join(', ')

    this.state.dispatches.push(dispatch)
  },

})

const DispatcherSearchStore = alt.createStore({
  displayName: 'DispatcherSearchStore',

  bindListeners: {
    addItem: Actions.addDispatch,
    search: Actions.search
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
        // XXX remove the special # symbol from dispatch.action before scoring.
        return stringScore(dispatch.action, searchValue) > 0.5
      }),
      searchValue
    })
  }
})

const App = React.createClass({
  getInitialState() {
    return DispatcherSearchStore.getState()
  },

  componentDidMount() {
    DispatcherSearchStore.listen(this.onChange)
  },

  onChange() {
    this.setState(this.getInitialState())
  },

  doSearch(ev) {
    Actions.search(ev.target.value)
  },

  render() {
    return (
      <div>
        <input type="text" value={this.state.searchValue} onChange={this.doSearch} />
        <ul>
          {this.state.dispatches.map((payload, i) => {
            return (
              <li key={i}>
                <strong>{payload.action}</strong>
                <div>
                  Data:
                  <Data data={payload.data} />
                </div>
                <div>Stores received update: {payload.stores}</div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
})

React.render(<App />, document.body)


// The simulated background script
const XAlt = new Alt()

const XAltActions = XAlt.generateActions('foo', 'bar', 'baz')

const XAltStore = XAlt.createStore({
  displayName: 'TestStore',

  bindListeners: {
    foo: XAltActions.foo
  },

  state: { a: 0, b: 0, c: 0 },

  foo(x) {
    this.setState({ a: x })
  }
})

window.XAltActions = XAltActions

XAlt.dispatcher.register(function (payload) {
  Actions.addDispatch({
    action: Symbol.keyFor(payload.action),
    data: payload.data
  })
})

function parseStores(alt) {
  return Object.keys(alt.stores).map(function (storeName) {
    var store = alt.stores[storeName]
    return {
      name: storeName,
      state: JSON.stringify(store.getState()),
      dispatchId: store.dispatchToken,
      listeners: store.boundListeners
    }
  })
}
Actions.addStores(parseStores(XAlt))
