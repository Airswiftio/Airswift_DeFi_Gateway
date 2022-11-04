import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import { DefaultButton } from "..";
import "./profileModal.scss";
import Verified from "../../assets/verified_green.svg";

const ProfileModal = ({ click }) => {
  useEffect(() => {
    const modal = document.getElementsByClassName("profileModal");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "profileModal") {
        click();
      }
    });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="profileModal">
      <div className="modalContent">
        <div className="username">AtomX</div>
        <div className="info">
          <img src={Verified} alt="Verified" />
          <div className="col">
            <div className="title">DID</div>
            <div className="subtitle">
              7NV25akgsX9ekU1TsrjEN79hEBCdreRc9K2xjbQSnC61
            </div>
          </div>
        </div>

        <div className="info">
          <img src={Verified} alt="Verified" />
          <div className="col">
            <div className="title">Address</div>
            <div className="subtitle">
              0x0c82dF11b5dF20f7e33486e796a246Cf7EDDba1e
            </div>
          </div>
        </div>

        <DefaultButton
          title="Disconnect"
          click={() => console.log("disconnect")}
        />
      </div>
    </div>
  );
};

export default ProfileModal;
