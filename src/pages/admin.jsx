import React, { useState } from "react";
import {
  Dropdown,
  DefaultButton,
  Pagination,
  AdminHistoryTable,
  AdminHistoryElement,
} from "../components";

import "./admin.scss";

const Admin = () => {
  const [page, setPage] = useState(0);
  const [checked, setChecked] = useState([]);
  return (
    <div className="adminWrapper">
      <div className="controls">
        <Dropdown options={["Admin", "Shop Manager", "Contributor"]} />
        <DefaultButton title="Add User" type={0} align={2} />
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
    </div>
  );
};

export default Admin;
