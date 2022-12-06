import React, { useEffect } from "react";
import { get, post } from "@@/pages/management/requests";
import { DefaultButton } from "../..";
import "./confirmationModal.scss";

const ConfirmationModal = ({ click, setValue, title, type, id }) => {
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
        <div className="tip">{title}</div>
        <div className="btns">
          {type === 2 ? (
            <DefaultButton
              title="Cancel"
              click={() => {
                setValue("Cancel");
                click();
              }}
              type={2}
            />
          ) : null}
          <DefaultButton
            title="Confirm"
            click={() => {
              setValue("Confirm");
              click();
              post({ merchant_id: id, new_status: "unavailable" }, "/api/admin/merchant/status");
            }}
            alternateBg={type === 2 ? true : false}
            type={2}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;