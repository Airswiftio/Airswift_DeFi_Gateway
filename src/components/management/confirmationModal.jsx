import React, { useEffect } from "react";
import axios from "axios";
import { DefaultButton } from "..";
import "./confirmationModal.scss";

const ConfirmationModal = ({ click, setValue, title, type, selected }) => {
  useEffect(() => {
    const modal = document.getElementsByClassName("confirmationModal");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "confirmationModal") {
        click();
      }
    });
  }, []);

  const deleteAccount = (id) => {
    axios
      .post(
        "/api/admin/manager/delete",
        {
          manager_id: id,
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
            title={type === 2 ? "Delete" : "Confirm"}
            click={
              type === 2
                ? () => {
                    setValue("Confirm");
                    deleteAccount(selected);
                    click();
                  }
                : () => {
                    setValue("Confirm");
                    click();
                  }
            }
            alternateBg={type === 2 ? true : false}
            type={2}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
