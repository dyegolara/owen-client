import React from 'react'
import { auth, googleAuthProvider } from '../../firebase'

import styles from './Login.module.scss'

import Button from 'shared/button'

export default class Login extends React.Component {
  signIn = () => {
    auth.signInWithRedirect(googleAuthProvider)
  }
  render () {
    return (
      <div className={`hero is-fullheight is-bold is-link ${styles.login}`}>
        <Button className='is-medium' onClick={this.signIn} icon='google'>
          Iniciar sesión
        </Button>
      </div>
    )
  }
}
