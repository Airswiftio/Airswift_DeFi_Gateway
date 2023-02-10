import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { get, post } from "@@/pages/management/requests";
import * as yup from "yup";
import "./settingsModal.scss";

const formSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Please enter an email address"),
  name: yup.string().required("Name field cannot be blank"),
  password: yup
    .string()
    .min(5, "Password must be atleast 5 characters")
    .required("Password field cannot be blank"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords do not match")
    .required("Please confirm your password"),
});

const CreateSubAccountModal = ({ click, setValue, setRefresh , title }) => {
  const [privs, setPrivs] = useState([]);
  const [showErrors, setShowErrors] = useState(false);

  const createSubaccount = (name, email, password, privileges) => {
    post(
      {
        name: name,
        email: email,
        password: password,
        privileges: privileges,
      },
        process.env.REACT_APP_API_URL+"/admin/manager/create"
    );
  };

  const changePrivilege = (id) => {
    if (privs.includes(id)) {
      setPrivs(privs.filter((p) => p !== id));
    } else {
      setPrivs([...privs, id]);
    }
  };

  useEffect(() => {
    const modal = document.getElementsByClassName("settingsModal");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "settingsModal") {
        click();
      }
    });
  }, []);

  const onSubmit = () => {
    console.log("Privs", privs);
    createSubaccount(values.name, values.email, values.password, privs);
    click();
    setRefresh(true);
    get(setValue, process.env.REACT_APP_API_URL+"/admin/manager/list?page=1&size=10&status=all");
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: formSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: onSubmit,
  });

  return (
    <div className="settingsModal">
      <form className="modalContent" onSubmit={handleSubmit}>
        <div className="tip">{title}</div>

        <div className="inputs">
          <div className="row">
            <div className="input">
              <span>Name</span>
              <input value={values.name} onChange={handleChange} name="name" />
              <span className="errorMessage">{errors.name ? errors.name : " "}</span>
            </div>
            <div className="input">
              <span>Email</span>
              <input value={values.email} onChange={handleChange} name="email" />
              <span className="errorMessage">{errors.email ? errors.email : " "}</span>
            </div>
          </div>
          <div className="row">
            <div className="input">
              <span>Password</span>
              <input
                value={values.password}
                onChange={handleChange}
                name="password"
                type="password"
              />
              <span className="errorMessage">{errors.password ? errors.password : " "}</span>
            </div>
            <div className="input">
              <span>Confirm Password</span>
              <input
                value={values.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                type="password"
              />
              <span className="errorMessage">
                {errors.confirmPassword ? errors.confirmPassword : ""}
              </span>
            </div>
          </div>
          <div className="row">
            <span>Privileges:</span>

            <div className="selector">
              <span className="privilege" onClick={() => changePrivilege(1)}>
                {privs.includes(1) ? <div className="selectedPrivilege" /> : null}
              </span>
              <span>Sub Account</span>
            </div>

            <div className="selector">
              <span className="privilege" onClick={() => changePrivilege(2)}>
                {privs.includes(2) ? <div className="selectedPrivilege" /> : null}
              </span>
              <span>DID</span>
            </div>

            <div className="selector">
              <span className="privilege" onClick={() => changePrivilege(3)}>
                {privs.includes(3) ? <div className="selectedPrivilege" /> : null}
              </span>
              <span>Liquidity Pool</span>
            </div>

            <div className="selector">
              <span className="privilege" onClick={() => changePrivilege(4)}>
                {privs.includes(4) ? <div className="selectedPrivilege" /> : null}
              </span>
              <span>Withdraw</span>
            </div>

            <div className="selector">
              <span className="privilege" onClick={() => changePrivilege(5)}>
                {privs.includes(5) ? <div className="selectedPrivilege" /> : null}
              </span>
              <span>Gatewary</span>
            </div>


            <div className="selector">
              <span className="privilege" onClick={() => changePrivilege(6)}>
                {privs.includes(6) ? <div className="selectedPrivilege" /> : null}
              </span>
              <span>Expense</span>
            </div>
          </div>
        </div>

        <button type="submit" className="btn">
          {" "}
          Submit{" "}
        </button>
      </form>
    </div>
  );
};

export default CreateSubAccountModal;
