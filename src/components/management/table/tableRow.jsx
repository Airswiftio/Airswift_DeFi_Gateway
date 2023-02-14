import React, { useState, useEffect, useContext } from "react";
import { SwitchToggle, ConfirmationModal, SettingsModal } from "@@/components";
import { post } from "@@/pages/management/requests";
import SettingsSVG from "@@/assets/settings.svg";
import Check from "@@/assets/check.svg";
import Popup from "reactjs-popup";
import { TABLETYPE } from "@@/components/types";
import { Tooltip } from "react-tooltip";
import AuthContext from "@@/context/AuthProvider";
import "./managementTable.scss";

const TableRow = ({ data, type, modify, selected, setSelected, title }) => {
  const [toggleState, setToggleState] = useState(data?.status);
  const [modalIsOpen, setIsOpen] = useState(false);

  const authCtx = useContext(AuthContext);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    if (toggleState === "unavailable" || toggleState === "Confirm") {
      if (type === TABLETYPE.MERCHANT) {
        post(
          { merchant_id: data?.id, new_status: "available" },
          process.env.REACT_APP_API_URL + "/admin/merchant/status"
        );
      } else if (type === TABLETYPE.LIQUIDITY) {
        post(
          { pool_id: data?.id, new_status: "available" },
          process.env.REACT_APP_API_URL + "/admin/pool/status"
        );
      } else if (type === TABLETYPE.CURRENCY) {
        post(
          { currency_id: data?.id, new_status: "available" },
          process.env.REACT_APP_API_URL + "/admin/currency/status"
        );
      } else if (type === TABLETYPE.NETWORK) {
        post(
          { chain_id: data?.id, new_status: "available" },
          process.env.REACT_APP_API_URL + "/admin/blockchain/status"
        );
      }
    }

    setToggleState(toggleState === "available" ? "unavailable" : "available");
  };

  const renderRow = (t) => {
    switch (t) {
      case TABLETYPE.NETWORK:
        return <span className="col">{data?.name}</span>;
      case TABLETYPE.CURRENCY:
        return (
          <>
            <span className="col">{data?.symbol}</span>
          </>
        );
      case TABLETYPE.MERCHANT:
        return (
          <>
            <span className="col">{data?.id}</span>
            <span className="col">{data?.did || "No DID Address Found"}</span>
          </>
        );
      case TABLETYPE.LIQUIDITY:
        return (
          <>
            <span className="col">{data?.name}</span>
          </>
        );
      case TABLETYPE.SUBACCOUNT:
        return (
          <>
            <span className="col checkboxColumn">
              <div
                className="checkBox"
                onClick={() =>
                  selected.includes(data?.id)
                    ? setSelected(selected.filter((e) => e !== data?.id))
                    : setSelected([...selected, data?.id])
                }
              >
                {selected.includes(data?.id) ? <img src={Check} alt="Check" /> : null}
              </div>
            </span>
            <span className="col">{data?.username}</span>
            <span className="col">
              {data?.permissions.map((d) => (
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
        {type !== TABLETYPE.SUBACCOUNT ? (
          <ConfirmationModal
            click={closeModal}
            setValue={setToggleState}
            title={`Are you sure you want to disable this ${title.toLowerCase()}?`}
            id={data?.id}
            type={type}
          />
        ) : (
          authCtx.admin &&
          data?.username !== "admin" && (
            <SettingsModal
              click={closeModal}
              title="Settings"
              type={1}
              data={data}
              setValue={modify}
            />
          )
        )}
      </Popup>
      <div>{renderRow(type)}</div>

      <span className="col status">
        {type !== TABLETYPE.SUBACCOUNT ? (
          <div className="col">
            <SwitchToggle
              isOn={toggleState === "available"}
              handleToggle={handleToggle}
              id={data?.id}
              open={openModal}
            />
            <span style={{ minWidth: "80px", textAlign: "right" }}>
              {toggleState === "available" ? "enable" : "disable"}
            </span>
          </div>
        ) : authCtx.admin && data?.username !== "admin" ? (
          <img src={SettingsSVG} alt="settings" onClick={() => setIsOpen(true)} />
        ) : (
          <img
            src={SettingsSVG}
            alt="settings"
            style={{ filter: "invert(50%)" }}
            id={"setting-" + data?.id}
          />
        )}
      </span>
      <Tooltip anchorId={"setting-" + data?.id} content="Operation not permitted" place="bottom" />
    </div>
  );
};

export default TableRow;
