import { Column, Table } from 'fixed-data-table'
import Data from './Data.jsx'
import DevActions from '../actions/DevActions'
import React from 'react'

class DispatcherView extends React.Component {
  constructor() {
    super()

    this.doSearch = this._doSearch.bind(this)
    this.clearDispatches = this._clearDispatches.bind(this)

    this.state = {
      height: 300,
      width: 600
    }
  }

  componentDidMount() {
    this.setState({
      height: window.innerHeight / 2,
      width: window.innerWidth - 40
    })
  }

  _clearDispatches() {
    DevActions.clearDispatches()
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
        <span onClick={this.clearDispatches}>
          <i className="fa fa-ban"></i> Clear Dispatches
        </span>
        <input type="text" value={this.props.searchValue} onChange={this.doSearch} />
        <Table
          rowHeight={50}
          rowGetter={(idx) => this.props.dispatches[idx]}
          rowsCount={this.props.dispatches.length}
          width={this.state.width}
          height={this.props.dispatches.length * 50 + 50}
          headerHeight={50}>
          <Column
            dataKey={0}
            label="Name"
            width={this.state.width / 6}
          />
          <Column
            cellRenderer={(obj) => {
              return <Data data={obj} />
            }}
            dataKey={1}
            flexGrow={1}
            label="Payload"
            width={this.state.width / 2}
          />
          <Column
            dataKey={2}
            label="Stores"
            width={this.state.width / 3}
          />
        </Table>
      </div>
    )
  }
}

export default DispatcherView
