import React from "react";
import { auth } from "firebaseApi";
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
