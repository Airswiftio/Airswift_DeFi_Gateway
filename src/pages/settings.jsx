import React, { useState,useEffect } from "react";
import { ApiKeys, IpnKeys, AppConfig, MyStore } from "@@/components";

import "./settings.scss";
import {GetApplicationDetail} from "@@/utils/request/api";

const Settings = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const [myStore, setMyStore] = useState({});
  const [apiKeys, setApiKeys] = useState({});
  const [ipnKeys, setIpnKeys] = useState({});
  const [appConfig, setAppConfig] = useState({});

  const pages = [
    <MyStore myStore={myStore} setMyStore={setMyStore}/>,
    <ApiKeys apiKeys={apiKeys} setApiKeys={setApiKeys} />,
    <IpnKeys ipnKeys={ipnKeys} setIpnKeys={setIpnKeys}/>,
    <AppConfig appConfig={appConfig} setAppConfig={setAppConfig}/>
  ];
  const titles = ["My Store", "API Keys", "IPN Keys", "App Configuration"];


  const getAppDetail = async () => {
    const res = await GetApplicationDetail({app_id:0})
    if(res?.code === 1000){
      setMyStore({id:res?.msg?.id,name:res?.msg?.name,link:res?.msg?.link,callbackUrl:res?.msg?.callbackUrl,legal_tender:res?.msg?.legal_tender})
      setApiKeys({api_key:res?.msg?.api_key,api_key_created_at:res?.msg?.api_key_created_at})
      setIpnKeys({ipn_key:res?.msg?.ipn_key,ipn_key_created_at:res?.msg?.ipn_key_created_at})
      setAppConfig({name:res?.msg?.name,link:res?.msg?.link,callbackUrl:res?.msg?.callbackUrl})


    }
  }

  useEffect(() => {
    getAppDetail();
  }, []);

  return (
    <div>
      <div className="settingsWrapper">
        <div className="sideColumn">
          <button
            className={currentPage === 0 ? "selected" : ""}
            onClick={() => setCurrentPage(0)}
          >
            My Store
          </button>
          <button
            className={currentPage === 1 ? "selected" : ""}
            onClick={() => setCurrentPage(1)}
          >
            API Keys
          </button>
          <button
            className={currentPage === 2 ? "selected" : ""}
            onClick={() => setCurrentPage(2)}
          >
            IPN Keys
          </button>
          <button
            className={currentPage === 3 ? "selected" : ""}
            onClick={() => setCurrentPage(3)}
          >
            App Configuration
          </button>
        </div>
        <div className="mainContent">
          <span className="title">{titles[currentPage]}</span>
          {pages[currentPage]}
        </div>
      </div>
    </div>
  );
};

export default Settings;
