import React,{useEffect,useState} from "react";

import Copy from "../../assets/copy.svg";
import Refresh from "../../assets/refresh.svg";

import "./apiKeys.scss";
import {GetApplicationDetail} from "@@/utils/request/api";

const ApiKeys = () => {
    const [storeInfo, setStoreInfo] = useState({});

    const getAppDetail = async () => {
        const res = await GetApplicationDetail({app_id:0})
        if(res?.code === 1000){
            setStoreInfo(res?.msg)
        }
    }

    useEffect(() => {
        getAppDetail();
    }, []);

  return (
    <div className="apiKeysWrapper">
      <div className="row">
        <span>{storeInfo.api_key}</span>
        <div className="img">
          <img src={Copy} alt="copy" />
        </div>
      </div>

      <div className="row">
        <span>Created Time</span>
        <span className="time">
          {storeInfo.created_at}
        </span>
      </div>

      <div className="row">
        <span>Renew</span>
        <div className="img">
          <img src={Refresh} alt="refresh" />
        </div>
      </div>
    </div>
  );
};

export default ApiKeys;
