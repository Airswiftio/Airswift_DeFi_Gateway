import React, { useEffect } from "react";
import { DefaultButton } from "..";
import "./confirmationModal.scss";

const ConfirmationModal = ({ click, setValue }) => {
  useEffect(() => {
    const modal = document.getElementsByClassName("confirmationModal");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "confirmationModal") {
        click();
      }
    });
  }, []);

  return (
    <div className="confirmationModal">
      <div className="modalContent">
        <div className="tip">
          Are you sure <br /> you want to disable this DID?
        </div>
        <div className="btn">
          <DefaultButton
            title="Confirm"
            click={() => {
              setValue(false);
              click();
            }}
            type={1}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
