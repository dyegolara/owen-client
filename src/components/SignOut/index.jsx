import React from "react";
import { auth } from "_firebase";
import Button from "components/Button";

export default function SignOut() {
  return (
    <Button
      onClick={() => auth.signOut()}
      icon="logout"
      ariaLabel="Cerrar Sesión"
    />
  );
}
