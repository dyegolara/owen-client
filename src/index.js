import React from 'react';
import { render } from 'react-dom';

import Owen from 'views/Owen';
import Login from 'views/Login';
import { AuthContextWrapper } from 'contexts/auth';
import useAuth from 'hooks/useAuth';

import GlobalStyle from 'styles';

const App = () => {
  const { isLoggedIn } = useAuth();

  return (
    <>
      <GlobalStyle />
      {isLoggedIn ? <Owen /> : <Login />}
    </>
  );
};

const AppWithAuth = () => (
  <AuthContextWrapper>
    <App />
  </AuthContextWrapper>
);

render(<AppWithAuth />, document.getElementById('app'));
