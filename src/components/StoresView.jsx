import { Column, Table } from 'fixed-data-table'
import Data from './Data.jsx'
import DevActions from '../actions/DevActions'
import FauxTable from './FauxTable.jsx'
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
    const table = React.findDOMNode(this.refs.table)
    this.setState({
      height: window.innerHeight - 26, // 26 is tabs height
      width: table.clientWidth - 6 // 6 is some magic number
    })
  }

  getStoreState() {
    return this.props.selectedStore === null
      ? {}
      : JSON.parse(this.props.stores[this.props.selectedStore].state)
  }

  highlightColumn(store, key, obj, id) {
    const node = (
      <div className="row">
        <div className="col c10">
          {store}
        </div>
        <div className="col c2">
          <i
            className="fa fa-recycle"
            onClick={() => this.recycleStore(store)}
            title="Recycle store"
          />
        </div>
      </div>
    )

    return id === this.props.selectedStore
      ? <div style={{ background: '#70bde6' }}>{node}</div>
      : node
  }

  recycleStore(store) {
    this.props.postMessage('RECYCLE_STORE', { storeName: store })
  }

  selectRow(ev, id, rowData) {
    DevActions.selectStore(id)
  }

  render() {
    return (
      <div className="row">
        <div className="col c4" ref="table">
          <Table
            headerHeight={20}
            height={this.state.height}
            onRowClick={this.selectRow}
            rowGetter={(idx) => this.props.stores[idx]}
            rowHeight={35}
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
          <FauxTable title="State" height={this.state.height}>
            <Data data={this.getStoreState()} />
          </FauxTable>
        </div>
      </div>
    )
  }
}

export default StoresView
