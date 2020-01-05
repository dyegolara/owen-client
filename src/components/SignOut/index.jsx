import React from 'react';
import { auth } from '_firebase';
import Button from 'components/Button';

const SignOut = () => (
  <Button
    onClick={() => auth.signOut()}
    icon='logout'
    ariaLabel='Cerrar Sesión'
  />
);

export default SignOut;
