import { useState, useEffect } from 'react';
import { auth } from '_firebase';

const useAuth = () => {
  const [userInfo, setUserInfo] = useState({});
  const [isLoggedIn, setIsLoggedId] = useState(false);

  const addUserInfo = (newItem) => {
    setUserInfo(current => ({
      ...current,
      ...newItem,
    }));
  };

  const login = ({ displayName, email, uid }) => {
    if (isLoggedIn) return;
    addUserInfo({ email });
    addUserInfo({ id: uid });
    addUserInfo({ name: displayName });
    setIsLoggedId(true);
  };

  const logout = () => setIsLoggedId(false);

  useEffect(() => {
    auth.onAuthStateChanged(user => (
      user ? login(user) : logout()
    ));
  });

  const getUserInfo = () => ({ ...userInfo });

  return {
    isLoggedIn,
    getUserInfo,
  };
};

export default useAuth;
