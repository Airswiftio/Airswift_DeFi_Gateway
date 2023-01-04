import React, { useEffect } from "react";
import { get, post } from "@@/pages/management/requests";
import { DefaultButton } from "../..";
import "./confirmationModal.scss";

const DeleteSubAccountModal = ({ click, setValue, setRefresh, title, type, selected, setSelected }) => {
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
      post({ manager_id: id }, process.env.REACT_APP_API_URL+"/admin/manager/delete");
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
              setRefresh(true);
              click();
            }}
            type={2}
          />

          <DefaultButton
            title="Delete"
            click={() => {
              // setValue("Confirm");
              deleteAccount();
              setRefresh(true);
              click();
              //get(setValue, process.env.REACT_APP_API_URL+"/admin/manager/list?page=1&size=10&status=all");
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
