import React from 'react'

class RecorderView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isRecording: false
    }
  }

  renderRecordingButton() {
    if (this.state.isRecording) {
      return <i className="fa fa-pause blink" />
    } else {
      return <i className="fa fa-dot-circle-o" />
    }
  }

  toggleRecording() {
    this.setState({
      isRecording: !this.state.isRecording
    })
  }

  render() {
    return (
      <div className="inline recorder">
        <span onClick={() => this.toggleRecording()}>
          {this.renderRecordingButton()}
        </span>
        <span className={this.state.isRecording ? '' : 'disabled'}>
          <i className="fa fa-play-circle" />
          <i className="fa fa-trash" />
          <i className="fa fa-download" />
        </span>
        <i className="fa fa-upload" />
      </div>
    )
  }
}

export default RecorderView
