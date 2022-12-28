import React, { useState } from "react";
import Check from "@@/assets/check.svg";
import { ManagementPagination, TableRow } from "../..";
import { TABLETYPE } from "../../types";

import "./managementTable.scss";
import { useEffect } from "react";

const ManagementTable = ({
  data,
  type,
  modify,
  selected,
  setSelected,
  currPage,
  setCurrPage,
  pages,
}) => {
  const [items, setItems] = useState(0);
  const [allSelected, setAllSelected] = useState(false);

  console.log(data)

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
              <div className="checkBox" onClick={selectAll}>
                {allSelected ? <img src={Check} alt="Check" /> : null}
              </div>
            </span>
            <span className="col checkboxColumn">Account</span>
            <span className="col">Privileges</span>
          </>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    setItems(data?.length);
  }, [data]);

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

      <ManagementPagination pages={pages} currPage={currPage} setCurrPage={setCurrPage} />
    </div>
  );
};

export default ManagementTable;
