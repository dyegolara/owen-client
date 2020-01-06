import React, { useState, useEffect } from "react";
import store from "store";
import { auth, googleAuthProvider } from "firebaseApi";
import { IAuthContext, UserInfo, User } from "types";

const ID_KEY = "userId";
const EMAIL_KEY = "email";
const USER_NAME_KEY = "userName";
const SESSION_STATUS = "sessionStatus";

export const ACTIVE = "active";
export const LOADING = "loading";
export const INACTIVE = "inactive";

const AuthContext = React.createContext<IAuthContext>({
  login: () => {},
  sessionStatus: INACTIVE,
  getUserInfo: () => ({
    [ID_KEY]: "",
    [EMAIL_KEY]: "",
    [USER_NAME_KEY]: ""
  }),
  ACTIVE,
  LOADING,
  INACTIVE
});

export function AuthContextWrapper(props: { children: React.ReactNode }) {
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

  const getUserInfo = (): UserInfo => ({
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

  return (
    <AuthContext.Provider value={value as IAuthContext}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
