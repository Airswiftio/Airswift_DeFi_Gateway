import React, { useEffect, useState } from "react";

import { get, post } from "@@/pages/management/requests";
import { post as httpPost } from "@@/utils/request/http";
import "./settingsModal.scss";

const SettingsModal = ({ click, setValue, title, type, data }) => {
  const [name, setName] = useState(data?.username || "");
  const [email, setEmail] = useState(data?.email || "");
  const [password, setPassword] = useState(data?.password || "");
  const [privileges, setPrivileges] = useState([0, 0, 0, 0, 0, 0]);

  const createSubaccount = (name, email, password, privileges) => {
    post(
      {
        name: name,
        email: email,
        password: password,
        privileges: privileges,
      },
      process.env.REACT_APP_API_URL + "/admin/manager/create"
    );
  };

  const editSubaccount = async () => {
    const res = await httpPost("/admin/manager/change", {
      manager_id: data.id,
      name: name,
      privileges: privileges,
      password: password,
      email: email,
    });
    if (res.code === 1000) {
      click();
      get(
        setValue,
        process.env.REACT_APP_API_URL + "/admin/manager/list?page=1&size=10&status=all"
      );
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

  useEffect(() => {
    let temp = [];
    data?.permissions.forEach((p) => temp.push(p.id));
    setPrivileges(temp);
  }, [data]);

  const changePrivilege = (id) => {
    if (privileges.includes(id)) {
      setPrivileges(privileges.filter((p) => p !== id));
    } else {
      setPrivileges([...privileges, id]);
    }
  };

  useEffect(() => {
    console.log("Priv: ", privileges);
  }, [privileges]);

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
          <div className="row">
            <span>Privileges:</span>

            <div className="selector">
              <span className="privilege" onClick={() => changePrivilege(1)}>
                {privileges.includes(1) ? <div className="selectedPrivilege" /> : null}
              </span>
              <span>Sub Account</span>
            </div>

            <div className="selector">
              <span className="privilege" onClick={() => changePrivilege(2)}>
                {privileges.includes(2) ? <div className="selectedPrivilege" /> : null}
              </span>
              <span>DID</span>
            </div>

            <div className="selector">
              <span className="privilege" onClick={() => changePrivilege(3)}>
                {privileges.includes(3) ? <div className="selectedPrivilege" /> : null}
              </span>
              <span>Liquidity Pool</span>
            </div>

            {/* <div className="selector">
              <span className="privilege" onClick={() => changePrivilege(4)}>
                {privileges.includes(4) ? <div className="selectedPrivilege" /> : null}
              </span>
              <span>Withdraw</span>
            </div> */}

            <div className="selector">
              <span className="privilege" onClick={() => changePrivilege(5)}>
                {privileges.includes(5) ? <div className="selectedPrivilege" /> : null}
              </span>
              <span>Gateway</span>
            </div>

            <div className="selector">
              <span className="privilege" onClick={() => changePrivilege(6)}>
                {privileges.includes(6) ? <div className="selectedPrivilege" /> : null}
              </span>
              <span>Expense</span>
            </div>
          </div>
        </div>
        <button
          className="btn"
          onClick={() => {
            editSubaccount();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default SettingsModal;
