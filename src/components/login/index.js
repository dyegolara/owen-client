import React, { useState } from 'react';
import { auth, googleAuthProvider } from '_firebase';

import Button from 'shared/button';
import styles from './Login.module.scss';


const Login = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signIn = () => {
    setIsLoading(true);

    auth.signInWithRedirect(googleAuthProvider)
      .finally(() => setIsLoading(false));
  };

  return (
    <div className={`hero is-fullheight is-bold is-link ${styles.login}`}>
      <Button
        className={`is-medium ${isLoading ? 'is-loading' : ''}`}
        onClick={signIn}
        icon='google'
      >
          Iniciar sesión
      </Button>
    </div>
  );
};

export default Login;
