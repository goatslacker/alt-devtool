import assign from 'object-assign'
Object.assign = Object.assign || assign

import Alt from 'alt'
import App from './components/App.jsx'
import DevActions from './actions/DevActions'
import React from 'react'

// Create a connection to the background page
const backgroundPageConnection = chrome.runtime.connect({
  name: "panel"
})

backgroundPageConnection.onMessage.addListener((message) => {
  switch (message.type) {
    case 'DISPATCH':
      return DevActions.addDispatch(message.payload)
    case 'STORES':
      return DevActions.addStores(message.payload.stores)
    default:
      console.log('Unknown type ' + message.type)
  }
})

backgroundPageConnection.postMessage({
  name: 'init',
  tabId: chrome.devtools.inspectedWindow.tabId
})

React.render(
  <App connection={backgroundPageConnection} />,
  document.getElementById('alt-devtool')
)
