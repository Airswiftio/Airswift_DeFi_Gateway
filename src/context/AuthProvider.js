import { createContext, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(Cookies.get("auth") === "true");
  const [privs, setPrivs] = useState(Cookies.get("privs"));
  const [admin, setAdmin] = useState(Cookies.get("admin") === "true");

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, privs, setPrivs, admin, setAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
