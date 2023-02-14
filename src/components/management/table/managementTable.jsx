import React, { useState, useEffect } from "react";

import { ManagementPagination, TableRow } from "../..";
import { TABLETYPE } from "../../types";
import Check from "@@/assets/check.svg";
import "./managementTable.scss";

const ManagementTable = ({
  data,
  type,
  modify,
  selected,
  setSelected,
  currPage,
  setCurrPage,
  pages,
  title
}) => {
  const [items, setItems] = useState(0);
  const [allSelected, setAllSelected] = useState(false);

  const selectAll = () => {
    console.log(data);
    if (allSelected) {
      setAllSelected(false);
      setSelected([]);
    } else {
      setAllSelected(true);
      let all = [];
      data.forEach((d) => {
        all.push(d.id);
      });
      setSelected(all);
    }
  };

  const renderHeader = () =>
    type !== TABLETYPE.SUBACCOUNT ? (
      <>
        {type === TABLETYPE.MERCHANT && <span className="col">ID</span>}
        <span className="col">{title}</span>
        <span className="status">Status</span>
      </>
    ) : (
      <>
        <div>
          <span className="col checkboxColumn">
            <div className="checkBox" onClick={selectAll}>
              {allSelected ? <img src={Check} alt="Check" /> : null}
            </div>
          </span>
          <span className="col">Account</span>
          <span className="col">Privileges</span>
        </div>
        <span className="status">Setting</span>
      </>
    );

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
          title={title}
        />
      );
    }
    rows.push(temp);
    return rows;
  };

  useEffect(() => {
    setItems(data?.length);
  }, [data]);

  return (
    <div className="managementTableWrapper">
      <div className="row">
        <div className="mTableHeader">{renderHeader()}</div>
        <div>
          {renderRows(items)[currPage]}
        </div>
      </div>

      <ManagementPagination pages={pages} currPage={currPage} setCurrPage={setCurrPage} />
    </div>
  );
};

export default ManagementTable;
