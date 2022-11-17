import React, { useState, useEffect } from "react";
import {
  SwitchToggle,
  ManagementPagination,
  ConfirmationModal,
  SettingsModal,
} from "../";
import Popup from "reactjs-popup";
import "./managementTable.scss";
import SettingsSVG from "../../assets/settings.svg";
import Check from "../../assets/check.svg";

const ManagementTable = ({ data, type, modify }) => {
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
        <TableRow data={data[i]} key={i} type={type} modify={modify} />
      );
    }
    rows.push(temp);
    return rows;
  };

  const renderHeader = (t) => {
    switch (t) {
      case 0:
        return (
          <>
            <span className="col">ID</span>
            <span className="col">DID</span>
          </>
        );
      case 1:
        return (
          <>
            <span className="col">Pool</span>
          </>
        );

      case 2:
        return (
          <>
            <span className="col">
              <div className="checkBox" />
            </span>
            <span className="col">Account</span>
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
          {type === 2 ? (
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

const TableRow = ({ data, type, modify }) => {
  const [toggleState, setToggleState] = useState(data.status);
  const [modalIsOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    console.log("Clicked");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (modify && toggleState !== data.status) {
      modify(data.id, toggleState);
    }
  }, [toggleState]);

  const renderRow = (t) => {
    switch (t) {
      case 0:
        return (
          <>
            <span className="col">{data.id}</span>
            <span className="col">{data.did || "No DID Address Found"}</span>
          </>
        );
      case 1:
        return (
          <>
            <span className="col">{data.name}</span>
          </>
        );
      case 2:
        return (
          <>
            <span className="col">
              <div className="checkBox">
                {data.selected ? <img src={Check} alt="Check" /> : null}
              </div>
            </span>
            <span className="col">{data.name}</span>
            <span className="col">
              {data.privileges.map((d) => (
                <>
                  <span className="privilege">
                    {d.value ? <div className="selectedPrivilege" /> : null}
                  </span>
                  <span>{d.title}</span>
                </>
              ))}
            </span>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mTableRow">
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        {type === 2 ? (
          <SettingsModal
            click={closeModal}
            setValue={setToggleState}
            title="Settings"
            type={1}
          />
        ) : (
          <ConfirmationModal
            click={closeModal}
            setValue={setToggleState}
            title="Are you sure
you want to disable this DID?"
            type={1}
          />
        )}
      </Popup>
      <div>{renderRow(type)}</div>

      <span className="col status">
        {type !== 2 ? (
          <SwitchToggle
            isOn={toggleState === "available"}
            handleToggle={() =>
              setToggleState(
                toggleState === "available" ? "unavailable" : "available"
              )
            }
            id={data.id}
            open={openModal}
          />
        ) : (
          <img
            src={SettingsSVG}
            alt="settings"
            onClick={() => setIsOpen(true)}
          />
        )}
      </span>
    </div>
  );
};

export default ManagementTable;
