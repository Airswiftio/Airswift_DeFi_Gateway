import React, { useState, useEffect } from "react";
import { SwitchToggle, ConfirmationModal, SettingsModal } from "@@/components";
import SettingsSVG from "@@/assets/settings.svg";
import Check from "@@/assets/check.svg";
import Popup from "reactjs-popup";
import { TABLETYPE } from "@@/components/types";
import "./managementTable.scss";

const TableRow = ({ data, type, modify, selected, setSelected }) => {
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
      if (type === TABLETYPE.MERCHANT) {
        modify({ merchant_id: data.id, new_status: toggleState }, "/api/admin/merchant/status");
      } else if (type === TABLETYPE.LIQUIDITY) {
        modify({ pool_id: data.id, new_status: toggleState }, "/api/admin/pool/status");
      }
    }
  }, [toggleState, data.id, data.status, modify, type]);

  const renderRow = (t) => {
    switch (t) {
      case TABLETYPE.MERCHANT:
        return (
          <>
            <span className="col">{data.id}</span>
            <span className="col">{data.did || "No DID Address Found"}</span>
          </>
        );
      case TABLETYPE.LIQUIDITY:
        return (
          <>
            <span className="col">{data.name}</span>
          </>
        );
      case TABLETYPE.SUBACCOUNT:
        return (
          <>
            <span className="col">
              <div
                className="checkBox"
                onClick={() =>
                  selected.includes(data.id)
                    ? setSelected(selected.filter((e) => e !== data.id))
                    : setSelected([...selected, data.id])
                }
              >
                {selected.includes(data.id) ? <img src={Check} alt="Check" /> : null}
              </div>
            </span>
            <span className="col">{data.username}</span>
            <span className="col">
              {data.permissions.map((d) => (
                <div key={d.id}>
                  <span className="privilege">
                    {d.group_id ? <div className="selectedPrivilege" /> : null}
                  </span>
                  <span>{d.name}</span>
                </div>
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
        {type === TABLETYPE.SUBACCOUNT ? (
          <SettingsModal
            click={closeModal}
            setValue={setToggleState}
            title="Settings"
            type={1}
            data={data}
          />
        ) : (
          <ConfirmationModal
            click={closeModal}
            setValue={setToggleState}
            title="Are you sure you want to disable this DID?"
            type={1}
          />
        )}
      </Popup>
      <div>{renderRow(type)}</div>

      <span className="col status">
        {type !== TABLETYPE.SUBACCOUNT ? (
          <SwitchToggle
            isOn={toggleState === "available"}
            handleToggle={() =>
              setToggleState(toggleState === "available" ? "unavailable" : "available")
            }
            id={data.id}
            open={openModal}
          />
        ) : (
          <img src={SettingsSVG} alt="settings" onClick={() => setIsOpen(true)} />
        )}
      </span>
    </div>
  );
};

export default TableRow;
