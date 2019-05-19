import React from 'react';
import { auth, googleAuthProvider } from '_firebase';

import Button from 'shared/button';
import styles from './Login.module.scss';


export default class Login extends React.Component {
  state = {
    isLoading: false,
  }

  signIn = () => {
    this.setState({ isLoading: true }, () => {
      auth.signInWithRedirect(googleAuthProvider).finally(() => {
        this.setState({ isLoading: false });
      });
    });
  }

  render() {
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
    );
  }
}
