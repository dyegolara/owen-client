import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import './css/index.scss'

import { auth } from '_firebase'
import App from './components/app'
import Login from './components/login'

class Router extends React.Component {
  state = {
    user: null
  }
  componentDidMount () {
    auth.onAuthStateChanged(user => {
      this.setState({ user })
    })
  }
  render () {
    const { user } = this.state
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/'>
            {user ? (
              <App
                userName={user.displayName}
                userId={user.uid}
                avatar={user.photoURL}
                email={user.email}
                activeLedger={user.activeLedger}
              />
            ) : (
              <Login />
            )}
          </Route>
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    )
  }
}

render(<Router />, document.getElementById('app'))
