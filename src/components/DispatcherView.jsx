import Data from './Data.jsx'
import DevActions from '../actions/DevActions'
import React from 'react'

class DispatcherView extends React.Component {
  constructor() {
    super()

    this.doSearch = this._doSearch.bind(this)
  }

  _doSearch(ev) {
    DevActions.search(ev.target.value)
  }

  render() {
    return (
      <div>
        <input type="text" value={this.props.searchValue} onChange={this.doSearch} />
        <i>O</i>

        <ul>
          {this.props.dispatches.map((payload, i) => {
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
}

export default DispatcherView
