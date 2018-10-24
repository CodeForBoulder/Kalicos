import React from 'react'
import auth0 from 'auth0-js'
import history from '../history'

const {Provider, Consumer} = React.createContext()

class AuthProvider extends React.Component {
  state = {
    auth: new auth0.WebAuth({
      domain: process.env.REACT_APP_DOMAIN,
      clientID: process.env.REACT_APP_CLIENT_ID,
      redirectUri: process.env.REACT_APP_REDIRECT_URI,
      audience: 'odin-api',
      responseType: 'token id_token',
      scope: 'openid'
    })
  }

  login = () => this.state.auth.authorize()

  logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    history.replace('/')
  }

  setSession = authResult => {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime())

    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    history.replace('/dashboard')
  }

  authenticate = () => {
    this.state.auth.parseHash((err, authResult) => {
      if(authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult)
        history.replace('/dashboard')
      } else if (err) {
        console.log('Auth Error: ', err)
        history.replace('/')
      }
    })
  }

  isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  render() {
    return (
      <Provider value={this}>
        {this.props.children}
      </Provider>
    )
  }
}

export { AuthProvider, Consumer }
