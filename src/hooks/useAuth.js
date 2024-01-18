import { useContext } from "react";
import { AuthContext } from "src/context/AuthContext";

const useAuth = () => useContext(AuthContext);

export default useAuth;
