import React from 'react'
import { auth, googleAuthProvider } from '_firebase'

import styles from './Login.module.scss'

import Button from 'shared/button'

export default class Login extends React.Component {
  state = {
    isLoading: false
  }
  signIn = () => {
    this.setState({ isLoading: true }, () => {
      auth.signInWithRedirect(googleAuthProvider).finally(() => {
        this.setState({ isLoading: false })
      })
    })
  }
  render () {
    return (
      <div className={`hero is-fullheight is-bold is-link ${styles.login}`}>
        <Button
          className={`is-medium ${this.state.isLoading ? 'is-loading' : ''}`}
          onClick={this.signIn}
          icon='google'
        >
          Iniciar sesión
        </Button>
      </div>
    )
  }
}
