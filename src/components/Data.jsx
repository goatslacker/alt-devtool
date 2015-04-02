var React = require('react')

const Leaf = React.createClass({
  displayName: 'Leaf',

  getInitialState() {
    return { hidden: true }
  },

  renderValue() {
    if (typeof this.props.data === 'object') {
      if (this.state.hidden) {
        return null
      }

      return Object.keys(this.props.data).map((node, i) => {
        return <Leaf key={i} label={node} data={this.props.data[node]} />
      })
    } else {
      const jstype = typeof this.props.data
      const className = `json-inspector__value json-inspector__value_${jstype}`

      return <span className={className}>{String(this.props.data)}</span>
    }
  },

  renderPluralCount(n) {
    return n === 0
      ? ''
      : n === 1 ? '1 item' : `${n} items`
  },

  renderLabel() {
    const label = this.props.label || 'root'

    const jstype = typeof this.props.data

    const type = jstype !== 'object'
      ? ''
      : Array.isArray(this.props.data) ? '[]' : '{}'

    const length = jstype === 'object' && this.props.data != null
      ? Object.keys(this.props.data).length
      : 0

    return (
      <span>
        <span className="json-inspector__key">
          {label}:
        </span>
        <span className="json-inspector__value json-inspector__value_helper">
          {type}
          {' '}
          {this.renderPluralCount(length)}
        </span>
      </span>
    )
  },

  toggle() {
    this.setState({
      hidden: !this.state.hidden
    })
  },

  render() {
    return (
      <div className="json-inspector__leaf json-inspector__line">
        <span onClick={this.toggle}>
          {this.renderLabel()}
        </span>
        {this.renderValue()}
      </div>
    )
  }
})

const Data = React.createClass({
  displayName: 'Leaf',

  render() {
    return (
      <div className="json-inspector">
        <Leaf data={this.props.data} />
      </div>
    )
  }
})

module.exports = Data
