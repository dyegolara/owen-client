import React from "react";
import { render } from "react-dom";

import Owen from "views/Owen";
import Login from "views/Login";
import { AuthContextWrapper } from "contexts/auth";
import useAuth from "hooks/useAuth";

import GlobalStyle from "styles";

function App() {
  const { sessionStatus, ACTIVE } = useAuth();

  return (
    <>
      <GlobalStyle />
      {sessionStatus === ACTIVE ? <Owen /> : <Login />}
    </>
  );
}

function AppWithAuth() {
  return (
    <AuthContextWrapper>
      <App />
    </AuthContextWrapper>
  );
}

render(<AppWithAuth />, document.getElementById("app"));
