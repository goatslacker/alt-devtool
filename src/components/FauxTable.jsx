import React from 'react'

class FauxTable extends React.Component {
  render() {
    return (
      <div className="public_fixedDataTable_main">
        <div className="public_fixedDataTable_header">
          <div
            className="public_fixedDataTableCell_main"
            style={{ height: '19px' }}
          >
            <div className="public_fixedDataTableCell_cellContent">
              {this.props.title}
            </div>
          </div>
        </div>
        <div
          className="public_fixedDataTableCell_main"
          style={{ height: `${this.props.height - 20}px`, overflow: 'scroll' }}
        >
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default FauxTable
