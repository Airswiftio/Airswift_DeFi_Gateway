import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import AuthContext from "@@/context/AuthProvider";
import { post } from "@@/pages/management/requests";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router";
import Logo from "@@/assets/management/logo.svg";

const ManagementLogin = () => {
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.auth) {
      navigate("/management/dashboard");
    }
  }, []);

  const checkAuth = (a) => {
    if (a.privileges.includes("sub-account")) {
      authCtx.setPrivs(a.privileges);
      Cookies.set("auth", true);
      authCtx.setAuth(true);
      navigate("/management/dashboard");
    }
  };

  return (
    <div className="formWrapper">
      <img src={Logo} alt="Logo" />
      <div className="title">Log in</div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={({ username, password }) => {
          post(
            {
              username: username,
              password: password,
              captcha_id: "HRzGVk4MJJq0eYD4xSUk",
              captcha_code: "n4hkm6",
            },
            "/api/admin/login",
            checkAuth
          );
        }}
      >
        <Form className="form">
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" type="password" />

          <div className="row">
            <label>
              <Field type="checkbox" name="agreeTerms" />
              Remember password
            </label>
            <span className="forgot" onClick={() => navigate("/management/pw")}>
              Forgot password?
            </span>
          </div>

          <button className="btn" type="submit">
            Log in
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ManagementLogin;
