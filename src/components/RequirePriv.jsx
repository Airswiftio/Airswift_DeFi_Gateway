import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

import AuthContext from "@@/context/AuthProvider";

const RequirePriv = ({ component, requiredPrivs }) => {
  const authCtx = useContext(AuthContext);
  const hasPriv = requiredPrivs.find((requiredPriv) => authCtx.privs?.includes(requiredPriv));

  return hasPriv ? component : <Navigate to="/management/dashboard" />;
};

export default RequirePriv;
