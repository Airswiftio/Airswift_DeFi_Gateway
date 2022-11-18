import React from "react";
import { post } from "./requests";
import { ManagementLogin } from "../../components";
import "./login.scss";

const Login = () => {
  return (
    <div className="managementLoginWrapper">
      <ManagementLogin authenticate={post} />
    </div>
  );
};

export default Login;
