import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router";
import Logo from "../../../assets/management/logo.svg";

const ManagementLogin = ({ authenticate }) => {
  const navigate = useNavigate();

  return (
    <div className="formWrapper">
      <img src={Logo} alt="Logo" />
      <div className="title">Log in</div>
      <Formik
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={async ({ username, password }) => {
          await authenticate(
            {
              username: username,
              password: password,
              captcha_id: "HRzGVk4MJJq0eYD4xSUk",
              captcha_code: "n4hkm6",
            },
            "/api/admin/login"
          );
          navigate("/management/dashboard");
        }}
      >
        <Form className="form">
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" />

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
