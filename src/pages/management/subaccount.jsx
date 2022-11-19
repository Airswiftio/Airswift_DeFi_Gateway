import React, { useEffect, useState } from "react";
import { get } from "./requests";
import Popup from "reactjs-popup";
import { TABLETYPE } from "@@/components/types";
import { ManagementTable, DefaultButton, ConfirmationModal, SettingsModal } from "@@/components";

import "./subaccount.scss";

const SubAccount = () => {
  const [subAccounts, setSubAccounts] = useState();
  const [deleteIsOpen, setDeleteOpen] = useState(false);
  const [createIsOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    get(setSubAccounts, "/api/admin/manager/list?page=1&size=10&status=all");
  }, []);

  return (
    <div className="subAccountWrapper">
      <Popup open={deleteIsOpen} closeOnDocumentClick onClose={() => setDeleteOpen(false)}>
        <ConfirmationModal
          click={() => setDeleteOpen(false)}
          setValue={console.log}
          title="Are you sure 
you want to delete these accounts?"
          type={2}
        />
      </Popup>
      <Popup open={createIsOpen} closeOnDocumentClick onClose={() => setCreateOpen(false)}>
        <SettingsModal
          click={() => setCreateOpen(false)}
          setValue={console.log}
          title="Create Subaccount"
          type={2}
        />
      </Popup>
      <div className="subAccount">
        <div className="subAccountControls">
          <DefaultButton title="Create Subaccount" type={1} click={() => setCreateOpen(true)} />
          <DefaultButton title="Delete Subaccount" type={1} click={() => setDeleteOpen(true)} />
        </div>
        <ManagementTable data={subAccounts?.managers || {}} type={TABLETYPE.SUBACCOUNT} />
      </div>
    </div>
  );
};

export default SubAccount;
