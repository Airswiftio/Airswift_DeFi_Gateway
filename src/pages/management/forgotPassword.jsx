import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import { ManagementResetPassword } from "../../components";
import Logo from "../../assets/management/logo.svg";
import "./styles/login.scss";

const ForgotPassword = () => {
  const [resetEnabled, setResetEnabled] = useState(true);
  return (
    <div className="managementLoginWrapper">
      {resetEnabled ? (
        <ManagementResetPassword />
      ) : (
        <div className="formWrapper">
          <img src={Logo} alt="Logo" />
          <div className="title">Forgot password?</div>
          <div className="subtitle">
            Please enter the email you registered with us. We will sent you a link to reset your
            password.
          </div>
          <Formik
            initialValues={{
              email: "",
            }}
            onSubmit={async (values) => {
              await new Promise((r) => setTimeout(r, 500));
              alert(JSON.stringify(values, null, 2));
            }}
          >
            <Form className="form">
              <label htmlFor="email">Email</label>
              <Field id="email" name="email" />

              <button className="btn" type="submit">
                Submit
              </button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
