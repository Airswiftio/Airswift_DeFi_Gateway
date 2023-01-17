import React, { useContext, useEffect, useRef,useState } from "react";
import Cookies from "js-cookie";
import AuthContext from "@@/context/AuthProvider";
import * as yup from "yup";
import { post } from "@@/pages/management/requests";
import { useFormik } from "formik";
import { useNavigate } from "react-router";
import Logo from "@@/assets/management/logo.svg";
import Refresh from "@@/assets/management/refresh.svg";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const formSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const ManagementLogin = () => {
  const [error, setError] = useState();
  const [captcha, setCaptcha] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    if (authCtx.auth&&authCtx.privs!==undefined) {
      navigate("/management/dashboard");
    }
  }, []);

  const onLoad = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
    // console.log("recap loading")
    // // captchaRef.current.execute();
  };
    const onRefresh = () => {
    // this reaches out to the hCaptcha JS API and runs the
    // execute function on it. you can use other functions as
    // documented here:
    // https://docs.hcaptcha.com/configuration#jsapi
   captchaRef.current.resetCaptcha();
  };

  // useEffect(() => {
  //   fetchCaptcha();
  // }, []);

  // const fetchCaptcha = () => {
  //   axios.get(process.env.REACT_APP_API_URL+"/admin/login/captcha/create").then((response) => {
  //     console.log(response.data.msg);
  //     setCaptcha(response.data.msg);
  //   });
  // };

  const checkAuth = (a) => {
    console.log("A: ", a);
    if (a.name === "AxiosError") {
      onRefresh();
      setError("Manager not found or password not correct.");
    } else if (a?.privileges.length>0) {
      // set the cookies that expres 1 day from now to match the httpOnly cookie admin-auth-token
      // whihc is used for authentication
      Cookies.set("privs", a.privileges, { expires: 0.5 });
      Cookies.set("auth", true, { expires: 0.5 });
      authCtx.setPrivs(a.privileges);
      authCtx.setAuth(true);
      if (a.username === 'admin') {
        Cookies.set("admin", true, { expires: 0.5});
        authCtx.setAdmin(true); 
      }
      navigate("/management/dashboard");
    }
  };

  const onSubmit = () => {
    post(
      {
        username: values.username,
        password: values.password,
        captcha_id: captcha.captcha_id,
        captcha_code: values.captcha,
        
      },
        process.env.REACT_APP_API_URL +"/admin/login?"+"h-captcha-response="+token,
      checkAuth
    );
    console.log("Err: ", error);
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: onSubmit,
  });

  return (
    <div className="formWrapper">
      <img src={Logo} alt="Logo" />
      <div className="title">Log in</div>
      <form onSubmit={handleSubmit} className="form">
        <label htmlFor="username">Username</label>
        <div className="input">
          <input id="username" name="username" value={values.username} onChange={handleChange} />
        </div>
        <span className="errorMessage">{errors.username}</span>

        <label htmlFor="password">Password</label>
        <div className="input">
          <input
            id="password"
            name="password"
            type="password"
            values={values.password}
            onChange={handleChange}
          />
        </div>
        <span className="errorMessage">{errors.password}</span>

        <div className="captchaWrapper">
          <div>
          <HCaptcha
            sitekey="c594cd42-7325-4ca7-a19e-d7a6715a8f4e"
            onLoad={onLoad}
            onVerify={setToken}
            ref={captchaRef}
            className="captcha"
          />
          </div>

        </div>

        <span className="errorMessage">{error}</span>

        <button className="btn" type="submit">
          Log in
        </button>
      </form>
    </div>
  );
};

export default ManagementLogin;
