import React, { useState } from "react";
import {
  Dropdown,
  DefaultButton,
  Pagination,
  AdminHistoryTable,
  AdminHistoryElement,
  Invite,
} from "../components";

import "./admin.scss";

const Admin = () => {
  const [page, setPage] = useState(0);
  const [checked, setChecked] = useState([]);
  const [addUser, setAddUser] = useState(false);
  return (
    <div className="adminWrapper">
      {!addUser ? (
        <>
          <div className="controls">
            <Dropdown options={["Admin", "Shop Manager", "Contributor"]} />
            <DefaultButton
              title="Add User"
              type={0}
              align={2}
              click={() => setAddUser(true)}
            />
          </div>
          <div className="main">
            <AdminHistoryTable columns={["DID Wallet", "Role"]} select>
              <AdminHistoryElement
                data={[
                  "7NV25akgsX9ekU1TsrjEN79hEBCdreRc9K2xjbQSnC61",
                  "Shop Manager",
                ]}
                checked={checked}
                index={0}
                key={0}
              />
            </AdminHistoryTable>
            <Pagination pages={1} page={page} setPage={setPage} />
          </div>
        </>
      ) : (
        <Invite setAddUser={setAddUser} />
      )}
    </div>
  );
};

export default Admin;
