import React, { useEffect, useState } from "react";
import axios from "axios";
import { DefaultButton } from "..";
import "./settingsModal.scss";

const SettingsModal = ({ click, setValue, title, type }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [privileges, setPrivileges] = useState([92, 64]);

  const createSubaccount = (name, email, password, privileges) => {
    axios
      .post(
        "/api/admin/manager/create",
        {
          name: name,
          email: email,
          password: password,
          privileges: privileges,
        },
        {
          withCredentials: true,
          credentials: "same-origin",
        }
      )
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    const modal = document.getElementsByClassName("settingsModal");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "settingsModal") {
        click();
      }
    });
  }, []);

  return (
    <div className="settingsModal">
      <div className="modalContent">
        <div className="tip">{title}</div>

        <div className="inputs">
          <div className="row">
            <div className="input">
              <span>Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="input">
              <span>Email</span>
              <input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          <div className="row">
            <div className="input">
              <span>Password</span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input">
              <span>Confirm Password</span>
              <input />
            </div>
          </div>
        </div>
        <div className="btn">
          <DefaultButton
            title="Save"
            type={1}
            click={
              type === 2
                ? () => createSubaccount(name, email, password, privileges)
                : () => console.log("click")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
