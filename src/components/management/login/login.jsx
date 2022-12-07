import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import AuthContext from "@@/context/AuthProvider";
import * as yup from "yup";
import { post } from "@@/pages/management/requests";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import Logo from "@@/assets/management/logo.svg";
import { get } from "@@/utils/request/http";
import axios from "axios";

const formSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const ManagementLogin = () => {
  const [error, setError] = useState();
  const [captcha, setCaptcha] = useState();
  const navigate = useNavigate();

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.auth) {
      navigate("/management/dashboard");
    }
  }, []);

  useEffect(() => {
    axios
      .get("/api/admin/login/captcha/create")
      .then((response) => setCaptcha(response.data.msg.captcha_content));
  }, []);

  const checkAuth = (a) => {
    if (a.name === "AxiosError") {
      setError("Manager not found or password not correct.");
    } else if (a.privileges.includes("sub-account")) {
      authCtx.setPrivs(a.privileges);
      Cookies.set("auth", true);
      authCtx.setAuth(true);
      navigate("/management/dashboard");
    }
  };

  const onSubmit = () => {
    post(
      {
        username: values.username,
        password: values.password,
        captcha_id: "HRzGVk4MJJq0eYD4xSUk",
        captcha_code: "n4hkm6",
      },
      "/api/admin/login",
      checkAuth
    );
    console.log("Err: ", error);
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
      captcha: "",
    },
    validationSchema: formSchema,
    onSubmit: onSubmit,
  });

  return (
    <div className="formWrapper">
      <img src={Logo} alt="Logo" />
      <div className="title">Log in</div>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="username">Username</label>
        <input id="username" name="username" value={values.username} onChange={handleChange} />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          values={values.password}
          onChange={handleChange}
        />

        <div className="captchaWrapper">
          <div className="captcha">
            <img src={captcha} alt="captcha" />
          </div>
          <input
            id="captcha"
            name="captcha"
            type="text"
            className="captchaInput"
            values={values.captcha}
            onChange={handleChange}
            placeholder="Enter captcha text"
          />
        </div>

        <div className="row">
          <label>
            <input type="checkbox" name="agreeTerms" />
            Remember me
          </label>
          <span className="forgot" onClick={() => navigate("/management/pw")}>
            Forgot password?
          </span>
        </div>
        <span>{error}</span>

        <button className="btn" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default ManagementLogin;
