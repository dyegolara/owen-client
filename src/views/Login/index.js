import React from "react";

import Button from "components/Button";
import LoginWrapper from "views/Login/styles";
import useAuth from "hooks/useAuth";

const Login = () => {
  const { sessionStatus, login, LOADING } = useAuth();

  return (
    <LoginWrapper className="hero is-fullheight is-bold is-link">
      <Button
        className={`is-medium ${sessionStatus === LOADING ? "is-loading" : ""}`}
        onClick={login}
        icon="google"
      >
        Iniciar sesión
      </Button>
    </LoginWrapper>
  );
};

export default Login;
