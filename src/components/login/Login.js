import React from 'react'
import { auth, googleAuthProvider } from '../../firebase'

import styles from './Login.scss'

export default class Login extends React.Component {
  signIn = () => {
    auth.signInWithRedirect(googleAuthProvider)
  }
  render () {
    return (
      <div className={styles.login}>
        <div>
          <button onClick={this.signIn}>Loguearse</button>
        </div>
      </div>
    )
  }
}
