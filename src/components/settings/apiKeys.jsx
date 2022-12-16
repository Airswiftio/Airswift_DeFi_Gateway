import React from "react";
import Copy from "@@/assets/copy.svg";
import Refresh from "@@/assets/refresh.svg";
import "./apiKeys.scss";
import { ModifyApplicationApiKey } from "@@/utils/request/api";
import { conversionUtcDate } from "@@/utils/function";

const ApiKeys = ({ apiKeys, setApiKeys }) => {
  const renewApiKeys = async () => {
    const res = await ModifyApplicationApiKey({ app_id: 0 });
    console.log("res", res);
    if (res?.code === 1000) {
      setApiKeys({ api_key: res?.data?.key, api_key_created_at: res?.data?.created_at });
    }
  };

  return (
    <div className="apiKeysWrapper">
      <div className="row">
        <span>{apiKeys.api_key}</span>
        <div className="img">
          <img
            src={Copy}
            alt="copy"
            onClick={async () => {
              await navigator.clipboard.writeText(apiKeys.api_key);
              alert("Copied the text: " + apiKeys.api_key);
            }}
          />
        </div>
      </div>

      <div className="row">
        <span>Created Time</span>
        <span className="time">{conversionUtcDate(apiKeys.api_key_created_at)}</span>
      </div>

      <div className="row">
        <span>Renew</span>
        <div className="img" onClick={() => renewApiKeys()}>
          <img src={Refresh} alt="refresh" />
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
