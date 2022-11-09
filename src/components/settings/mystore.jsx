import React,{useEffect,useState} from "react";

import { Dropdown } from "@@/components";
import "./mystore.scss";
import {GetApplicationDetail} from "@@/utils/request/api";
import {dbGetUserWallet} from "@@/utils/function";

const MyStore = () => {

  const baseCurrency = ["USD", "CAD"];
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
    <div className="myStore">
      <div className="main">
        <div className="row">
          <span className="label">Store Name</span>
          <span>{storeInfo.name}</span>
        </div>

        <div className="row">
          <span className="label">Role</span>
          <span>{dbGetUserWallet().roles}</span>
        </div>

        <div className="row">
          <span className="label">Store ID</span>
          <span>{storeInfo.id}</span>
        </div>
      </div>

      <div className="bottomSection">
        <span className="bottomSectionTitle">Base Currency</span>
        <Dropdown options={baseCurrency} />
      </div>
    </div>
  );
};

export default MyStore;
