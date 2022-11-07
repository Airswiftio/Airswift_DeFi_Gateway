import React, { useState } from "react";
import { ManagementCreateAccount, ManagementLogin } from "../../components";
import "./login.scss";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="managementLoginWrapper">
      {isLogin ? (
        <ManagementLogin setIsLogin={setIsLogin} />
      ) : (
        <ManagementCreateAccount setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default Login;
