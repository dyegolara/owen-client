import React from 'react';
import { auth } from '_firebase';
import Button from 'shared/button';

const SignOut = () => (
  <Button
    onClick={() => auth.signOut()}
    icon='logout'
    ariaLabel='Cerrar Sesión'
  />
);

export default SignOut;
