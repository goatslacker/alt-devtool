import DevActions from '../actions/DevActions'
import React from 'react'

class AltPickerView extends React.Component {
  constructor() {
    super()

    this.pickAlt = this.pickAlt.bind(this)
  }

  refresh() {
    this.props.postMessage('REFRESH')
  }

  pickAlt(ev) {
    const selected = ev.target.value
    this.props.postMessage('SELECT_ALT', { id: selected })
    DevActions.selectAlt(selected)
  }

  render() {
    return (
      <div>
        <span>Alt:</span>
        <select
          onChange={this.pickAlt}
          style={{ fontSize: '0.8em', height: '1.5em', margin: 0 }}
        >
          {this.props.alts.map((name, i) => {
            return (
              <option key={i} value={i}>
                {name}
              </option>
            )
          })}
        </select>
        {' '}
        <i className="fa fa-refresh" onClick={() => this.refresh()} />
      </div>
    )
  }
}

export default AltPickerView
