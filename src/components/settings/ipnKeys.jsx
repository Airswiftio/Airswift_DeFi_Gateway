import React,{useEffect, useState} from "react";
import { DefaultButton } from "../";

import "./ipnKeys.scss";
import {GetApplicationDetail, ModifyApplicationApiKey, ModifyApplicationIpnKey} from "@@/utils/request/api";

const IpnKeys = () => {
    const [storeInfo, setStoreInfo] = useState({});

    const getAppDetail = async () => {
        const res = await GetApplicationDetail({app_id:0})
        if(res?.code === 1000){
            setStoreInfo(res?.msg)
        }
    }

    const renewIpnKeys = async () => {
        const res = await ModifyApplicationIpnKey({app_id:0})
        if(res?.code === 1000){
            setStoreInfo({ipn_key:res?.data?.key,ipn_key_created_at:res?.data?.created_at})
        }
    }

    useEffect(() => {
        getAppDetail();
    }, []);

  return (
    <div className="ipnKeysWrapper">
      <div className="row">
        <span>{storeInfo.ipn_key}</span>
        <span className="message">
          Tips：For security reasons we show it only once.
        </span>
      </div>

      <div className="row">
        <span>Last Created Time</span>
        <span className="time">
         {storeInfo.ipn_key_created_at}
        </span>
      </div>

      <div className="row">
        <span>Renew</span>
        <span className="button" onClick={()=>renewIpnKeys()}>
          <DefaultButton title="Generate" type={0} align={1} />
        </span>
      </div>
    </div>
  );
};

export default IpnKeys;
