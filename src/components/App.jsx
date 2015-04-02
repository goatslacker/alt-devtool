import React from 'react'
import Data from './Data.jsx'
import DevActions from '../actions/DevActions'
import DispatcherSearchStore from '../stores/DispatcherSearchStore'

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
    DevActions.search(ev.target.value)
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

export default App
