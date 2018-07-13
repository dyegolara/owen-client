import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import './css/index.scss'

import { auth } from '_firebase'
import AppStorage from 'appStorage'
import App from './components/app'
import Login from './components/login'

class Router extends React.Component {
  state = {
    hasSession: AppStorage.hasSession()
  }
  componentDidMount () {
    auth.onAuthStateChanged(user => {
      user ? this.login(user) : this.logout()
    })
  }
  login = ({ displayName, email, uid }) => {
    if (this.state.hasSession) return true
    AppStorage.setEmail(email)
    AppStorage.setUserId(uid)
    AppStorage.setUserName(displayName)
    this.setState({ hasSession: true })
  }
  logout = () => {
    AppStorage.clearAll()
    this.setState({ hasSession: false })
  }
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/'>{this.state.hasSession ? <App /> : <Login />}</Route>
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    )
  }
}

render(<Router />, document.getElementById('app'))
