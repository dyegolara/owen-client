import { useState, useEffect } from 'react';
import store from 'store';
import { auth } from '_firebase';

const ID_KEY = 'userId';
const EMAIL_KEY = 'email';
const USER_NAME_KEY = 'userName';
const IS_LOGGED_IN = 'isLoggedIn';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!store.get(IS_LOGGED_IN));

  const login = ({ displayName, email, uid }) => {
    if (isLoggedIn) return;
    store.set(ID_KEY, uid);
    store.set(EMAIL_KEY, email);
    store.set(USER_NAME_KEY, displayName);
    store.set(IS_LOGGED_IN, true);
    setIsLoggedIn(true);
  };

  const logout = () => {
    store.set(IS_LOGGED_IN, false);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    auth.onAuthStateChanged(user => (
      user ? login(user) : logout()
    ));
  });

  const getUserInfo = () => ({
    [ID_KEY]: store.get(ID_KEY),
    [EMAIL_KEY]: store.get(EMAIL_KEY),
    [USER_NAME_KEY]: store.get(USER_NAME_KEY),
  });

  return {
    isLoggedIn,
    getUserInfo,
  };
};

export default useAuth;
