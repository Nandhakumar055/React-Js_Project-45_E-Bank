import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    userId: '142420',
    userPin: '231225',
    errorMessage: '',
  }

  onChangeId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({userPin: event.target.value})
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    const {history} = this.props
    history.replace('/')
  }

  onSubmitLogin = async event => {
    event.preventDefault()

    const loginApiUrl = 'https://apis.ccbp.in/ebank/login'

    const {userId, userPin} = this.state

    const userData = {user_id: userId, pin: userPin}

    const options = {
      method: 'POST',
      body: JSON.stringify(userData),
    }

    const response = await fetch(loginApiUrl, options)
    const responseData = await response.json()

    if (response.ok === true) {
      this.loginSuccess(responseData.jwt_token)
    } else {
      this.setState({errorMessage: responseData.error_msg})
    }
  }

  render() {
    const {userId, userPin, errorMessage} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-route-container">
        <div className="login-card-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-banner-image"
          />
          <div className="login-container">
            <form
              className="login-form-container"
              onSubmit={this.onSubmitLogin}
            >
              <h1 className="greeting-text">Welcome Back</h1>
              <label htmlFor="UserId" className="input-label">
                User ID
              </label>
              <input
                type="text"
                id="UserId"
                className="user-input"
                placeholder="Enter User ID"
                onChange={this.onChangeId}
                value={userId}
              />
              <label htmlFor="UserPin" className="input-label">
                PIN
              </label>
              <input
                type="password"
                id="UserPin"
                className="user-input"
                placeholder="Enter PIN"
                onChange={this.onChangePin}
                value={userPin}
              />
              <button type="submit" className="login-button">
                Login
              </button>
              <p className="error-msg">{errorMessage}</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
