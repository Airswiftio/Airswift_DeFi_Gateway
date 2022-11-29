import React, { useState } from "react";
import { ManagementPagination, TableRow } from "../..";
import { TABLETYPE } from "../../types";

import "./managementTable.scss";

const ManagementTable = ({ data, type, modify, selected, setSelected }) => {
  const items = data.length;
  const [currPage, setCurrPage] = useState(0);

  const renderRows = (num) => {
    const rows = [];
    let temp = [];
    for (let i = 0; i < num; i++) {
      if (temp.length === 5) {
        rows.push(temp);
        temp = [];
      }

      temp.push(
        <TableRow
          data={data[i]}
          key={i}
          type={type}
          modify={modify}
          selected={selected}
          setSelected={setSelected}
        />
      );
    }
    rows.push(temp);
    return rows;
  };

  const renderHeader = (t) => {
    switch (t) {
      case TABLETYPE.MERCHANT:
        return (
          <>
            <span className="col">ID</span>
            <span className="col">DID</span>
          </>
        );
      case TABLETYPE.LIQUIDITY:
        return (
          <>
            <span className="col">Pool</span>
          </>
        );

      case TABLETYPE.SUBACCOUNT:
        return (
          <>
            <span className="col checkboxColumn">
              <div className="checkBox" />
            </span>
            <span className="col checkboxColumn">Account</span>
            <span className="col">Privileges</span>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="managementTableWrapper">
      <div className="row">
        <div className="mTableHeader">
          <div>{renderHeader(type)}</div>
          {type === TABLETYPE.SUBACCOUNT ? (
            <span className="status">Setting</span>
          ) : (
            <span className="status">Status</span>
          )}
        </div>

        <div>{renderRows(items)[currPage]}</div>
      </div>

      <ManagementPagination
        pages={Math.ceil(items / 5)}
        currPage={currPage}
        setCurrPage={setCurrPage}
      />
    </div>
  );
};

export default ManagementTable;
