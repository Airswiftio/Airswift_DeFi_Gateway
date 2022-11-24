import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { DefaultButton } from "..";
import "./profileModal.scss";
import Verified from "../../assets/verified_green.svg";
import { dbClearAccount, dbGetUserWallet } from "@@/utils/function";

const ProfileModal = ({ click }) => {
  const navigate = useNavigate();
  const user = dbGetUserWallet();
  const disConnect = () => {
    dbClearAccount();
    navigate("/login");
  };
  useEffect(() => {
    const modal = document.getElementsByClassName("profileModal");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "profileModal") {
        click();
      }
    });
  }, []);

  return (
    <div className="profileModal">
      <div className="modalContent">
        <div className="username">{user?.nickname}</div>
        <div className="info">
          <img src={Verified} alt="Verified" />
          <div className="col">
            <div className="title">DID</div>
            <div className="subtitle">{user?.did}</div>
          </div>
        </div>

        <div className="info">
          <img src={Verified} alt="Verified" />
          <div className="col">
            <div className="title">Address</div>
            <div className="subtitle">{user?.account}</div>
          </div>
        </div>

        <DefaultButton title="Disconnect" click={() => disConnect()} />
      </div>
    </div>
  );
};

export default ProfileModal;
