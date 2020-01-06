import { useContext } from "react";
import AuthContext from "contexts/auth";
import { IAuthContext } from "types";

function useAuth(): IAuthContext {
  return useContext(AuthContext);
}
export default useAuth;
