import Data from './Data.jsx'
import React from 'react'

class StoresView extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.stores.map((store, i) => {
            return (
              <li key={i}>
                <strong>{store.name}</strong>
                {' '}
                (<span>{store.dispatchId}</span>)
                <Data data={JSON.parse(store.state)} />
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default StoresView
