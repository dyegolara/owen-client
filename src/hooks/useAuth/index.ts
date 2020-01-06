import { useContext } from "react";
import AuthContext from "contexts/auth";

function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
export default useAuth;
