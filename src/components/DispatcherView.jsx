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
        <i className="fa fa-ban"></i> Clear

        <i className="fa fa-dot-circle-o"></i> Record
        <i className="fa fa-pause"></i> Pause
        <i className="fa fa-play-circle"></i> Play

        <i className="fa fa-recycle"></i> Recycle
        <i className="fa fa-refresh"></i> Refresh
        <i className="fa fa-filter"></i> Filter
        <i className="fa fa-history"></i> History
        <i className="fa fa-undo"></i> Undo

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
