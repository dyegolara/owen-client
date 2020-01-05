import { useContext } from "react";
import AuthContext from "contexts/auth";

interface AuthContextType {
  login: Function;
  sessionStatus: string;
  getUserInfo: Function;
  ACTIVE: string;
  LOADING: string;
  INACTIVE: string;
}

function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
export default useAuth;
