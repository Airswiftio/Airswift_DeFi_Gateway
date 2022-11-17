import React, { useEffect } from "react";
import { DefaultButton } from "..";
import "./settingsModal.scss";

const SettingsModal = ({ click, setValue, title, type }) => {
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
              <input />
            </div>
            <div className="input">
              <span>Email</span>
              <input />
            </div>
          </div>
          <div className="row">
            <div className="input">
              <span>Password</span>
              <input />
            </div>
            <div className="input">
              <span>Confirm Password</span>
              <input />
            </div>
          </div>
        </div>
        <div className="btn">
          <DefaultButton title="Save" type={1} />
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
