import React from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSuccess = () => {
    // setAuth({ ... })
    // navigate(from, { replace: true })
  };

  return <div>Login</div>;
};

export default Login;
