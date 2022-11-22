import React, { useEffect, useState } from "react";
import axios from "axios";
import { DefaultButton } from "..";
import "./settingsModal.scss";

const SettingsModal = ({ click, setValue, title, type, data }) => {
  const [name, setName] = useState(data.username);
  const [email, setEmail] = useState(data.email);
  const [password, setPassword] = useState(data.password);
  const [privileges, setPrivileges] = useState(data.privileges);

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

  const editSubaccount = () => {
    axios
      .post(
        "/api/admin/manager/change",
        {
          manager_id: data.id,
          name: name,
          privileges: privileges,
          password: password,
          email: email,
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
              <input value={password} onChange={(e) => setPassword(e.target.value)} />
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
                ? () => {
                    createSubaccount(name, email, password, privileges);
                    click();
                  }
                : () => {
                    editSubaccount();
                    click();
                  }
            }
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
