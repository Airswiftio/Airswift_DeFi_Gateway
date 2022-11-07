import React,{useEffect, useState} from "react";

import "./appConfig.scss";
import {GetApplicationDetail} from "@@/utils/request/api";

const AppConfig = () => {
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
    <div className="appConfigWrapper">
      <span className="label">App Name</span>
      <div className="item">{storeInfo.name}</div>

      <span className="label">Application Link</span>
      <div className="item">{storeInfo.link}</div>

      <span className="label">Callback Url</span>
      <div className="item">{storeInfo.callbackUrl}</div>
    </div>
  );
};

export default AppConfig;
