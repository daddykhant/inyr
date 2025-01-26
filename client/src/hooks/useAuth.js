import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

// Custom hook to use AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
