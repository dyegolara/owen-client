import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'

import { auth } from './firebase'
import App from './components/app'
import Login from './components/login'

class Router extends React.Component {
  state = {
    user: false
  }
  componentDidMount () {
    console.log({ auth })
    auth.onAuthStateChanged(user => {
      console.log({ user })
      this.setState({ user })
    })
  }
  render () {
    const component = this.state.user ? App : Login
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/' component={component} />
          <Redirect to='/' />
        </Switch>
      </BrowserRouter>
    )
  }
}

render(<Router />, document.getElementById('app'))
