import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router";
import Logo from "../../../assets/management/logo.png";

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const ManagementResetPassword = () => {
  const navigate = useNavigate();

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    navigate("/management/login");
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: formSchema,
    onSubmit: onSubmit,
  });

  return (
    <div className="formWrapper">
      <img src={Logo} alt="Logo" />
      <div className="title">Reset password</div>
      <form onSubmit={handleSubmit} className="form">
        <div className="input">
          <input
            id="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="Please enter your email"
          />
        </div>

        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ManagementResetPassword;
