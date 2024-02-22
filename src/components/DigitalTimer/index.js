// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {timer: 25, seconds: 0, isTimeRunning: false}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearSetTimeInterval()
  }

  clearSetTimeInterval = () => {
    clearInterval(this.timerId)
  }

  onIncrementTime = () => {
    this.setState(prev => ({timer: prev.timer + 1}))
  }

  onDecrementTime = () => {
    const {timer} = this.state

    if (timer > 1) {
      this.setState(prev => ({timer: prev.timer - 1}))
    }
  }

  countDownTime = () => {
    const {timer, seconds} = this.state
    const isTimerFinished = seconds === timer * 60
    if (isTimerFinished) {
      this.clearSetTimeInterval()
      this.setState({isTimeRunning: false})
    } else {
      this.setState(prev => ({seconds: prev.seconds + 1}))
    }
  }

  startTimer = () => {
    const {timer, seconds, isTimeRunning} = this.state

    const isTimerFinished = seconds === timer * 60
    if (isTimerFinished) {
      this.setState({seconds: 0})
    }
    if (isTimeRunning) {
      this.clearSetTimeInterval()
    } else {
      this.timerId = setInterval(this.countDownTime, 1000)
    }
    this.setState(prev => ({isTimeRunning: !prev.isTimeRunning}))
  }

  resetTimer = () => {
    this.clearSetTimeInterval()
    this.setState(initialState)
  }

  getElapsedTime = () => {
    const {timer, seconds} = this.state
    const remainingSeconds = timer * 60 - seconds
    const minutes = Math.floor(remainingSeconds / 60)
    const timerSeconds = Math.floor(remainingSeconds % 60)
    const finalMinutes = minutes < 10 ? `0${minutes}` : minutes
    const finalSeconds = timerSeconds < 10 ? `0${timerSeconds}` : timerSeconds
    return `${finalMinutes}:${finalSeconds}`
  }

  render() {
    const {timer, seconds, isTimeRunning} = this.state
    const startPauseImageUrl = isTimeRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startPauseAlt = isTimeRunning ? 'play icon' : 'pause icon'
    const labelText = isTimeRunning ? 'Running' : 'Paused'

    return (
      <div className="main-bg">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="result-container">
          <div className="top-half-container">
            <div className="timer-container">
              <h3 className="timer">{this.getElapsedTime()}</h3>
              <p className="timer-status">{labelText}</p>
            </div>
          </div>
          <div className="bottom-half-container">
            <div className="play-reset-container">
              <div className="play-reset-btn-container">
                <button
                  type="button"
                  className="play-reset-btn"
                  onClick={this.startTimer}
                >
                  <img
                    alt={isTimeRunning ? 'play icon' : 'pause icon'}
                    className="btn-image"
                    src={
                      isTimeRunning
                        ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
                        : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
                    }
                  />
                  <p className="btn-text">
                    {isTimeRunning ? 'Pause' : 'Start'}
                  </p>
                </button>
              </div>

              <div className="play-reset-btn-container">
                <button
                  type="button"
                  className="play-reset-btn"
                  onClick={this.resetTimer}
                >
                  <img
                    className="btn-image"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                </button>
                <p className="btn-text">Reset</p>
              </div>
            </div>
            <div className="timer-limit-container">
              <p className="timer-limit-container">Set Timer Limit</p>
              <div className="icons-container">
                <button
                  disabled={seconds > 0}
                  type="button"
                  className="icon"
                  onClick={this.onDecrementTime}
                >
                  -
                </button>
                <p className="timer-limit">{timer}</p>

                <button
                  disabled={seconds > 0}
                  type="button"
                  className="icon"
                  onClick={this.onIncrementTime}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
