import React, { useEffect } from "react";
import { get, post } from "@@/pages/management/requests";
import { DefaultButton } from "../..";
import "./confirmationModal.scss";

const DeleteSubAccountModal = ({ click, setValue, title, type, selected, setSelected }) => {
  useEffect(() => {
    const modal = document.getElementsByClassName("confirmationModal");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "confirmationModal") {
        click();
      }
    });
  }, []);

  const deleteAccount = () => {
    selected.forEach((id) => {
      post({ manager_id: id }, "/api/admin/manager/delete");
    });
    setSelected([]);
  };

  return (
    <div className="confirmationModal">
      <div className="modalContent">
        <div className="tip">{title}</div>
        <div className="btns">
          <DefaultButton
            title="Cancel"
            click={() => {
              //setValue("Cancel");
              click();
            }}
            type={2}
          />

          <DefaultButton
            title="Delete"
            click={() => {
              setValue("Confirm");
              deleteAccount();
              click();
              get(setValue, "/api/admin/manager/list?page=1&size=10&status=all");
            }}
            alternateBg={type === 2 ? true : false}
            type={2}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteSubAccountModal;
