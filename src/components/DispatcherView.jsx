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

// XXX table needs a max height of the document - a few px
    // table needs to resize, take up full remaining height of document
    // when selecting a row, highlight it.
    // I need a "payload" header
    return (
      <div>
        <div className="row">
          <div className="col c6">
            <input
              onChange={this.doSearch}
              placeholder="Filter dispatches"
              style={{ width: '100%' }}
              type="text"
              value={this.props.searchValue}
            />
          </div>
          <div className="col c6" style={{ lineHeight: '34px' }}>
            <i
              className="fa fa-ban"
              onClick={this.clearDispatches}
              style={{ margin: '0 1em' }}
              title="Clear Dispatches"
            />
            <label className="inline" style={{ margin: '0' }}>
              <input
                checked={this.props.logDispatches}
                onChange={this.toggleLogDispatch}
                type="checkbox"
              />
              Log Dispatches
            </label>
          </div>
        </div>

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
