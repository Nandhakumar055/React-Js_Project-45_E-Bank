import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const Home = props => {
  const onClickLogoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <div className="home-route-container">
      <nav className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="app-logo-image"
        />
        <button
          className="logout-button"
          type="button"
          onClick={onClickLogoutButton}
        >
          Logout
        </button>
      </nav>
      <div className="body-container">
        <h1 className="app-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
          className="visa-card-image"
        />
      </div>
    </div>
  )
}

export default Home
