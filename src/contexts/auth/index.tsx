import React, { useState, useEffect } from "react";
import store from "store";
import { auth, googleAuthProvider } from "firebaseApi";

const ID_KEY = "userId";
const EMAIL_KEY = "email";
const USER_NAME_KEY = "userName";
const SESSION_STATUS = "sessionStatus";

export const ACTIVE = "active";
export const LOADING = "loading";
export const INACTIVE = "inactive";

interface AuthContextType {
  login: Function;
  sessionStatus: string;
  getUserInfo: Function;
  ACTIVE: string;
  LOADING: string;
  INACTIVE: string;
}

const AuthContext = React.createContext<AuthContextType>({
  login: () => {},
  sessionStatus: INACTIVE,
  getUserInfo: () => {},
  ACTIVE,
  LOADING,
  INACTIVE
});
const { Provider } = AuthContext;

type User = Readonly<{
  uid: string;
  displayName: string | null;
  email: string | null;
}>;
export function AuthContextWrapper(props: { children: JSX.Element }) {
  const [sessionStatus, setSessionStatus] = useState(store.get(SESSION_STATUS));

  const login = () => {
    store.set(SESSION_STATUS, LOADING);
    setSessionStatus(LOADING);
    auth.signInWithRedirect(googleAuthProvider);
  };

  const logout = () => {
    store.set(SESSION_STATUS, INACTIVE);
    setSessionStatus(INACTIVE);
  };

  const getUserInfo = () => ({
    [ID_KEY]: store.get(ID_KEY),
    [EMAIL_KEY]: store.get(EMAIL_KEY),
    [USER_NAME_KEY]: store.get(USER_NAME_KEY)
  });

  useEffect(() => {
    const setUserInfo = ({ displayName, email, uid }: User) => {
      if (sessionStatus === ACTIVE) {
        return;
      }
      store.set(ID_KEY, uid);
      store.set(EMAIL_KEY, email);
      store.set(USER_NAME_KEY, displayName);
      store.set(SESSION_STATUS, ACTIVE);
      setSessionStatus(ACTIVE);
    };

    auth.onAuthStateChanged(user => (user ? setUserInfo(user) : logout()));
    // eslint-disable-next-line
  }, []);

  const value = {
    login,
    sessionStatus,
    getUserInfo,
    ACTIVE,
    LOADING,
    INACTIVE
  };

  return <Provider value={value as AuthContextType}>{props.children}</Provider>;
}

export default AuthContext;
