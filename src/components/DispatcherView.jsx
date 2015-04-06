import { Column, Table } from 'fixed-data-table'
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
//    <i className="fa fa-dot-circle-o"></i> Record
//    <i className="fa fa-pause"></i> Pause
//    <i className="fa fa-play-circle"></i> Play
//
//    <i className="fa fa-recycle"></i> Recycle
//    <i className="fa fa-refresh"></i> Refresh
//    <i className="fa fa-filter"></i> Filter
//    <i className="fa fa-history"></i> History
//    <i className="fa fa-undo"></i> Undo

    return (
      <div>
        <i className="fa fa-ban"></i> Clear
        <input type="text" value={this.props.searchValue} onChange={this.doSearch} />
        <Table
          rowHeight={50}
          rowGetter={(idx) => this.props.dispatches[idx]}
          rowsCount={this.props.dispatches.length}
          width={400}
          height={1000}
          headerHeight={50}>
          <Column
            dataKey={0}
            flexGrow={1}
            label="Name"
            width={100}
          />
          <Column
            cellRenderer={(obj) => {
              return <Data data={obj} />
            }}
            dataKey={1}
            flexGrow={1}
            label="Payload"
            width={200}
          />
          <Column
            dataKey={2}
            flexGrow={1}
            label="Stores"
            width={100}
          />
        </Table>
      </div>
    )
  }
}

export default DispatcherView
