import React, { useState } from "react";
import { SwitchToggle, ManagementPagination } from "../";
import "./managementTable.scss";

const ManagementTable = ({ data }) => {
  const [items, setItems] = useState(data.length);
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
          id={i}
          did={data[i].did}
          status={data[i].status}
          data={data[i]}
        />
      );
    }
    rows.push(temp);
    console.log(rows);
    return rows;
  };

  return (
    <div className="managementTableWrapper">
      <div>
        <div className="mTableHeader">
          <div>
            {Object.keys(data[0]).map((e, i) =>
              e !== "status" ? <span>{e}</span> : null
            )}
          </div>
          <span className="status">Status</span>
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

const TableRow = ({ id, did, status, data }) => {
  const [value, setValue] = useState(status);

  return (
    <div className="mTableRow">
      <div>
        {Object.values(data).map((e, i) => (
          <span className="col">{e}</span>
        ))}
      </div>

      <span className="col status">
        <SwitchToggle
          isOn={value}
          handleToggle={() => setValue(!value)}
          id={id}
        />
      </span>
    </div>
  );
};

export default ManagementTable;
