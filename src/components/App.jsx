import AltContainer from 'alt/components/AltContainer'
import DispatcherSearchStore from '../stores/DispatcherSearchStore'
import DispatcherView from './DispatcherView.jsx'
import React from 'react'
import StoresStore from '../stores/StoresStore'
import StoresView from './StoresView.jsx'
import Tabs from 'react-simpletabs'

class App extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Tabs>
        <Tabs.Panel title="Dispatches">
          <AltContainer store={DispatcherSearchStore}>
            <DispatcherView />
          </AltContainer>
        </Tabs.Panel>
        <Tabs.Panel title="Stores">
          <AltContainer store={StoresStore}>
            <StoresView />
          </AltContainer>
        </Tabs.Panel>
        <Tabs.Panel title="Tools">
          <div>
            Take Snapshot
          </div>
        </Tabs.Panel>
      </Tabs>
    )
  }
}

export default App
