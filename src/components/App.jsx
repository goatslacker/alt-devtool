import AltContainer from 'alt/components/AltContainer'
import AltPickerView from './AltPickerView.jsx'
import AltStore from '../stores/AltStore'
import DispatcherSearchStore from '../stores/DispatcherSearchStore'
import DispatcherView from './DispatcherView.jsx'
import React from 'react'
import StoresStore from '../stores/StoresStore'
import StoresView from './StoresView.jsx'
import Tabs from 'react-simpletabs'

class App extends React.Component {
  constructor() {
    super()

    this.postMessage = this.postMessage.bind(this)
  }

  postMessage(action, data) {
    this.props.connection.postMessage({
      name: 'alt-interface',
      payload: { action, data }
    })
  }

  render() {
    return (
      <div style={{ position: 'relative' }}>
        <Tabs>
          <Tabs.Panel title="Dispatches">
            <AltContainer store={DispatcherSearchStore}>
              <DispatcherView postMessage={this.postMessage} />
            </AltContainer>
          </Tabs.Panel>
          <Tabs.Panel title="Stores">
            <AltContainer store={StoresStore}>
              <StoresView postMessage={this.postMessage} />
            </AltContainer>
          </Tabs.Panel>
        </Tabs>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <AltContainer store={AltStore}>
            <AltPickerView postMessage={this.postMessage} />
          </AltContainer>
        </div>
      </div>
    )
  }
}

export default App
