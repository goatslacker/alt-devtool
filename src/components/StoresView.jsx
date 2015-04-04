import React from 'react'

class StoresView extends React.Component {
  constructor() {
    super()
  }

  render() {
    console.log(this.props)

    return (
      <div>
        <ul>
          {this.props.stores.map((store, i) => {
            return (
              <li key={i}>
                <strong>{store.name}</strong>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default StoresView
