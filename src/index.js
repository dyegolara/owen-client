import React from 'react';
import { render } from 'react-dom';

import Owen from 'views/Owen';
import Login from 'views/Login';
import useAuth from 'hooks/useAuth';

import './css/index.scss';

const App = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Owen /> : <Login />;
};

render(<App />, document.getElementById('app'));
