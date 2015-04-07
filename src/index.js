import assign from 'object-assign'
Object.assign = Object.assign || assign

import Alt from 'alt'
import App from './components/App.jsx'
import DevActions from './actions/DevActions'
import React from 'react'

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

// XXX use finalStore actually
XAlt.dispatcher.register(function (payload) {
  DevActions.addDispatch({
    action: Symbol.keyFor(payload.action),
    data: payload.data
  })


  // hack to make sure all stores get the update
  setTimeout(function () {
    DevActions.addStores(parseStores(XAlt))
  }, 0)
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
DevActions.addStores(parseStores(XAlt))

// test actions
XAltActions.foo({ num: Math.random() })
XAltActions.bar({ num: Math.random() })
XAltActions.bar({ num: Math.random() })
XAltActions.baz({ num: Math.random(), obj: { foo: 1, bar: 2, baz: [1,2,3], spazz: { a: 'a', b: 'b' }} })
XAltActions.bar({ num: Math.random() })
XAltActions.foo({ num: Math.random() })
XAltActions.baz({ num: Math.random() })
