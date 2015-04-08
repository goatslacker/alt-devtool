import assign from 'object-assign'
Object.assign = Object.assign || assign

import App from './components/App.jsx'
import React from 'react'

React.render(
  <App connection={null} />,
  document.getElementById('alt-devtool')
)
