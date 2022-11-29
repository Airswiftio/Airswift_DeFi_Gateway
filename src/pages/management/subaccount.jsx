import React, { useEffect, useState } from "react";
import { get } from "./requests";
import Popup from "reactjs-popup";
import { TABLETYPE } from "@@/components/types";
import { ManagementTable, DefaultButton, ConfirmationModal, SettingsModal } from "@@/components";

import "./styles/subaccount.scss";

const SubAccount = () => {
  const [subAccounts, setSubAccounts] = useState();
  const [deleteIsOpen, setDeleteOpen] = useState(false);
  const [createIsOpen, setCreateOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    get(setSubAccounts, "/api/admin/manager/list?page=1&size=10&status=all");
  }, [createIsOpen, deleteIsOpen]);

  useEffect(() => {
    console.log(selected);
  });

  return (
    <div className="subAccountWrapper">
      <Popup open={deleteIsOpen} closeOnDocumentClick onClose={() => setDeleteOpen(false)}>
        <ConfirmationModal
          click={() => setDeleteOpen(false)}
          setValue={setSubAccounts}
          title="Are you sure 
you want to delete these accounts?"
          type={2}
          selected={selected[0]}
        />
      </Popup>
      <Popup open={createIsOpen} closeOnDocumentClick onClose={() => setCreateOpen(false)}>
        <SettingsModal
          click={() => setCreateOpen(false)}
          setValue={setSubAccounts}
          title="Create Subaccount"
          type={2}
        />
      </Popup>
      <div className="subAccount">
        <div className="subAccountControls">
          <DefaultButton title="Create Subaccount" type={1} click={() => setCreateOpen(true)} />
          <DefaultButton title="Delete Subaccount" type={1} click={() => setDeleteOpen(true)} />
        </div>
        <ManagementTable
          data={subAccounts?.managers || {}}
          type={TABLETYPE.SUBACCOUNT}
          selected={selected}
          setSelected={setSelected}
        />
      </div>
    </div>
  );
};

export default SubAccount;
