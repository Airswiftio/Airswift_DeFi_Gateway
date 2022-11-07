import React from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router";
import Logo from "../../../assets/management/logo.svg";

const ManagementResetPassword = () => {
  const navigate = useNavigate();
  return (
    <div className="formWrapper">
      <img src={Logo} alt="Logo" />
      <div className="title">Reset password</div>
      <Formik
        initialValues={{
          password: "",
          confirmPassword: "",
        }}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          alert(JSON.stringify(values, null, 2));
          navigate("/management/login");
        }}
      >
        <Form className="form">
          <label htmlFor="password">New password</label>
          <Field id="password" name="password" />

          <label htmlFor="confirmPassword">Confirm new password</label>
          <Field id="confirmPassword" name="confirmPassword" />

          <button className="btn" type="submit">
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ManagementResetPassword;
