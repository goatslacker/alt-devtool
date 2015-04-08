import { Column, Table } from 'fixed-data-table'
import Data from './Data.jsx'
import DevActions from '../actions/DevActions'
import React from 'react'

class StoresView extends React.Component {
  constructor() {
    super()

    this.state = {
      height: 300,
      width: 300
    }
  }

  componentDidMount() {
    this.setState({
      height: window.innerHeight - 150,
      width: window.innerWidth / 3 - 40
    })
  }

  getStoreState() {
    return this.props.selectedStore === null
      ? {}
      : JSON.parse(this.props.stores[this.props.selectedStore].state)
  }

  highlightColumn(store, key, obj, id) {
    return id === this.props.selectedStore
      ? <div style={{ background: '#70bde6' }}>{store}</div>
      : store
  }

  selectRow(ev, id, rowData) {
    DevActions.selectStore(id)
  }

  render() {
    return (
      <div className="row">
        <div className="col c4">
          <Table
            headerHeight={40}
            height={this.state.height}
            onRowClick={this.selectRow}
            rowGetter={(idx) => this.props.stores[idx]}
            rowHeight={40}
            rowsCount={this.props.stores.length}
            width={this.state.width}
          >
          <Column
            cellRenderer={this.highlightColumn.bind(this)}
            dataKey="name"
            label="Store"
            width={this.state.width}
          />
          </Table>
        </div>

        <div className="col c8">
          <div className="public_fixedDataTable_main">
            <div className="public_fixedDataTable_header">
              <div className="public_fixedDataTableCell_main">
                <div className="public_fixedDataTableCell_cellContent">
                  State
                </div>
              </div>
            </div>
            <div className="public_fixedDataTableCell_main">
              <Data data={this.getStoreState()} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default StoresView
