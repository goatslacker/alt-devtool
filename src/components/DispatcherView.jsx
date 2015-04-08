import { Column, Table } from 'fixed-data-table'
import Data from './Data.jsx'
import DevActions from '../actions/DevActions'
import React from 'react'

class DispatcherView extends React.Component {
  constructor() {
    super()

    this.state = {
      height: 300,
      width: 600
    }
  }

  componentDidMount() {
    this.setState({
      height: window.innerHeight - 150,
      width: window.innerWidth / 2 - 40
    })
  }

  clearDispatches() {
    DevActions.clearDispatches()
  }

  doSearch(ev) {
    DevActions.search(ev.target.value)
  }

  highlightColumn(x, id, data) {
    const node = x || 'N/A'
    return data[2] === this.props.selectedPayload
      ? <div style={{ background: '#70bde6' }}>{node}</div>
      : node
  }

  selectRow(ev, id, rowData) {
    DevActions.selectRow(rowData[2])
  }

  toggleLogDispatch() {
    DevActions.toggleLogDispatch()
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

// XXX table needs a max height of the document - a few px
    // table needs to resize, take up full remaining height of document
    // when selecting a row, highlight it.
    // I need a "payload" header
    return (
      <div>
        <button className="btn btn-sm bg-red" onClick={this.clearDispatches}>
          <i className="fa fa-ban"></i> Clear Dispatches
        </button>
        {' '}
        <input type="text" value={this.props.searchValue} onChange={this.doSearch} />

        <label>
          Log Dispatches
          <input type="checkbox" checked={this.props.logDispatches} onChange={this.toggleLogDispatch} />
        </label>

        <div className="row">
          <div className="col c6">
            <Table
              headerHeight={40}
              height={this.state.height}
              onRowClick={this.selectRow}
              rowGetter={(idx) => this.props.dispatches[idx]}
              rowHeight={40}
              rowsCount={this.props.dispatches.length}
              width={this.state.width}
            >
              <Column
                cellRenderer={this.highlightColumn.bind(this)}
                dataKey={0}
                label="Name"
                width={this.state.width / 2}
              />
              <Column
                cellRenderer={this.highlightColumn.bind(this)}
                dataKey={1}
                label="Stores"
                width={this.state.width / 2}
              />
            </Table>
          </div>
          <div className="col c6">
            <div className="public_fixedDataTable_main">
              <div className="public_fixedDataTable_header">
                <div className="public_fixedDataTableCell_main">
                  <div className="public_fixedDataTableCell_cellContent">
                    Payload
                  </div>
                </div>
              </div>
              <div className="public_fixedDataTableCell_main">
                <Data data={this.props.selectedPayload} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DispatcherView
