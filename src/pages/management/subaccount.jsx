import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import {
  ManagementTable,
  DefaultButton,
  ConfirmationModal,
} from "@@/components";

import "./subaccount.scss";

const SubAccount = () => {
  const [subAccounts, setSubAccounts] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    console.log("Clicked");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const getSubAccounts = () => {
    axios
      .get("/api/admin/merchant/list?page=1&size=10&status=all", {
        withCredentials: true,
        credentials: "same-origin",
      })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setSubAccounts(response.data.msg.merchants);
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  const manageSubAccounts = (id, status) => {
    axios
      .post(
        "/api/admin/merchant/status",
        {
          merchant_id: id,
          new_status: status,
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
    <div className="subAccountWrapper">
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <ConfirmationModal
          click={closeModal}
          setValue={console.log}
          title="Are you sure 
you want to delete these accounts?"
          type={2}
        />
      </Popup>
      <div className="subAccount">
        <div className="subAccountControls">
          <DefaultButton title="Create Subaccount" type={1} />
          <DefaultButton
            title="Delete Subaccount"
            type={1}
            click={() => setIsOpen(true)}
          />
        </div>
        <ManagementTable data={sample_data} type={2} />
      </div>
    </div>
  );
};

const sample_data = [
  {
    selected: 1,
    name: "LittlePiu",
    privileges: [
      { value: 0, title: "Subaccount" },
      { value: 1, title: "Merchant" },
      { value: 1, title: "Liquidity Pool" },
    ],
  },
  {
    selected: 0,
    name: "StevenChow",
    privileges: [
      { value: 1, title: "Subaccount" },
      { value: 1, title: "Merchant" },
      { value: 1, title: "Liquidity Pool" },
    ],
  },
  {
    selected: 1,
    name: "TinyMonster",
    privileges: [
      { value: 0, title: "Subaccount" },
      { value: 0, title: "Merchant" },
      { value: 0, title: "Liquidity Pool" },
    ],
  },
  {
    selected: 0,
    name: "AnnieLin",
    privileges: [
      { value: 0, title: "Subaccount" },
      { value: 1, title: "Merchant" },
      { value: 0, title: "Liquidity Pool" },
    ],
  },
];

export default SubAccount;
