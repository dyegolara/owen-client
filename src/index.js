import React from 'react';
import { render } from 'react-dom';

import Owen from 'views/Owen';
import Login from 'views/Login';
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

render(<App />, document.getElementById('app'));
