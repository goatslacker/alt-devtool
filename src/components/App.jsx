import AltContainer from 'alt/components/AltContainer'
import DispatcherSearchStore from '../stores/DispatcherSearchStore'
import DispatcherView from './DispatcherView.jsx'
import React from 'react'
import StoresStore from '../stores/StoresStore'
import StoresView from './StoresView.jsx'
import Tabs from 'react-simpletabs'

class App extends React.Component {
  postMessage(action, data) {
    this.props.connection.postMessage({
      name: 'alt-interface',
      payload: { action, data }
    })
  }

  render() {
    return (
      <Tabs>
        <Tabs.Panel title="Dispatches">
          <AltContainer store={DispatcherSearchStore}>
            <DispatcherView postMessage={this.postMessage.bind(this)} />
          </AltContainer>
        </Tabs.Panel>
        <Tabs.Panel title="Stores">
          <AltContainer store={StoresStore}>
            <StoresView postMessage={this.postMessage.bind(this)} />
          </AltContainer>
        </Tabs.Panel>
      </Tabs>
    )
  }
}

export default App
