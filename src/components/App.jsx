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

  takeSnapshot() {
    this.postMessage('SNAPSHOT')
  }

  flush() {
    this.postMessage('FLUSH')
  }

  bootstrap() {
    this.postMessage('BOOTSTRAP', {
      bootstrapData: prompt('Enter JSON bootstrap data')
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
        <Tabs.Panel title="Tools">
          <div className="sp-lg txt-center">
            <label>
              <button
                className="btn btn-lg bg-blue"
                onClick={() => this.takeSnapshot()}
              >
                Take Snapshot
              </button>
            </label>
            <label>
              <button
                className="btn btn-lg bg-blue"
                onClick={() => this.flush()}
              >
                Flush
              </button>
            </label>
            <label>
              <button
                className="btn btn-lg bg-blue"
                onClick={() => this.bootstrap()}
              >
                Bootstrap
              </button>
            </label>
          </div>
        </Tabs.Panel>
      </Tabs>
    )
  }
}

export default App
