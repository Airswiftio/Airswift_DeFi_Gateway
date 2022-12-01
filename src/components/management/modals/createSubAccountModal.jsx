import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { get, post } from "@@/pages/management/requests";
import * as yup from "yup";
import "./settingsModal.scss";

const formSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required(),
  name: yup.string().required(),
  password: yup.string().min(5).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required(),
});

const CreateSubAccountModal = ({ click, setValue, title }) => {
  const [privs, setPrivs] = useState([]);

  const createSubaccount = (name, email, password, privileges) => {
    post(
      {
        name: name,
        email: email,
        password: password,
        privileges: privileges,
      },
      "/api/admin/manager/create"
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
    get(setValue, "/api/admin/manager/list?page=1&size=10&status=all");
  };

  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: formSchema,
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
            </div>
            <div className="input">
              <span>Email</span>
              <input value={values.email} onChange={handleChange} name="email" />
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
            </div>
            <div className="input">
              <span>Confirm Password</span>
              <input
                value={values.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                type="password"
              />
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
              <span>Merchant</span>
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
          </div>
        </div>
        <div className="btn">
          <button type="submit"> Submit </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubAccountModal;
