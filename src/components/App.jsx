import AltContainer from 'alt/components/AltContainer'
import DispatcherSearchStore from '../stores/DispatcherSearchStore'
import DispatcherView from './DispatcherView.jsx'
import React from 'react'


class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <AltContainer store={DispatcherSearchStore}>
        <DispatcherView />
      </AltContainer>
    )
  }
}

export default App
