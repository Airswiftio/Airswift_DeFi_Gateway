import React from "react";
import { Formik, Field, Form } from "formik";
import Logo from "../../../assets/management/logo.png";

const ManagementCreateAccount = ({ setIsLogin, authenticate }) => {
  return (
    <div className="formWrapper">
      <img src={Logo} alt="Logo" />
      <div className="title">Create New Account</div>
      <Formik
        initialValues={{
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          agreeTerms: false,
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
        }}
      >
        <Form className="form">
          <label htmlFor="username">Username</label>
          <Field id="username" name="username" />

          <label htmlFor="email">Email</label>
          <Field
            id="email"
            name="email"
            placeholder="info@pelago.com"
            type="email"
          />

          <label htmlFor="password">Password</label>
          <Field id="password" name="password" />

          <label htmlFor="confirmPassword">Confirm password</label>
          <Field id="confirmPassword" name="confirmPassword" />
          <label>
            <Field type="checkbox" name="agreeTerms" />I agree to Pelago
            Management Terms and Agreement
          </label>
          <button className="btn" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
      <div className="login" onClick={() => setIsLogin(true)}>
        Already a member? <span>Log in</span>
      </div>
    </div>
  );
};

export default ManagementCreateAccount;
