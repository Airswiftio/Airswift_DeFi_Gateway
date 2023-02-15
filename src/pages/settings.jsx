import React, { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";
import Popup from "reactjs-popup";

import { ApiKeys, IpnKeys, AppConfig, MyStore, SlippageTolerance } from "@@/components";
import { GetApplicationDetail } from "@@/utils/request/api";
import Alert from "@@/components/PopUp/Alert";
import "react-tooltip/dist/react-tooltip.css";
import "./settings.scss";

const Settings = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [myStore, setMyStore] = useState({});
  const [apiKeys, setApiKeys] = useState({});
  const [ipnKeys, setIpnKeys] = useState({});
  const [appConfig, setAppConfig] = useState({});
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const [slippageInit, setSlippageInit] = useState();

  const pages = [
    <MyStore myStore={myStore} setMyStore={setMyStore} />,
    <ApiKeys
      apiKeys={apiKeys}
      setApiKeys={setApiKeys}
      setOpenAlert={setOpenAlert}
      setAlertData={setAlertData}
    />,
    <IpnKeys ipnKeys={ipnKeys} setIpnKeys={setIpnKeys} />,
    <AppConfig appConfig={appConfig} setAppConfig={setAppConfig} />,
    <SlippageTolerance slippageInit={slippageInit} setSlippageInit={setSlippageInit} />,
  ];
  const titles = ["My Store", "API Keys", "IPN Keys", "App Configuration", "Slippage Tolerance"];

  const getAppDetail = async () => {
    const res = await GetApplicationDetail({ app_id: 0 });
    if (res?.code === 1000) {
      setMyStore({
        id: res?.data?.id,
        name: res?.data?.name,
        link: res?.data?.link,
        callbackUrl: res?.data?.callbackUrl,
        legal_tender: res?.data?.legal_tender,
      });
      setApiKeys({
        api_key: res?.data?.api_key,
        api_key_created_at: res?.data?.api_key_created_at,
      });
      setIpnKeys({
        ipn_key: res?.data?.ipn_key,
        ipn_key_created_at: res?.data?.ipn_key_created_at,
      });
      setAppConfig({
        name: res?.data?.name,
        link: res?.data?.link,
        callbackUrl: res?.data?.callbackUrl,
      });
      setSlippageInit(res?.data?.slippage);
    }
  };

  useEffect(() => {
    getAppDetail();
  }, []);

  return (
    <div>
      <Popup open={openAlert} closeOnDocumentClick onClose={() => setOpenAlert(false)}>
        <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
      </Popup>
      <div className="settingsWrapper">
        <div className="sideColumn">
          <button className={currentPage === 0 ? "selected" : ""} onClick={() => setCurrentPage(0)}>
            My Store
          </button>
          <button className={currentPage === 1 ? "selected" : ""} onClick={() => setCurrentPage(1)}>
            API Keys
          </button>
          <button className={currentPage === 2 ? "selected" : ""} onClick={() => setCurrentPage(2)}>
            IPN Keys
          </button>
          {/*<button className={currentPage === 3 ? "selected" : ""} onClick={() => setCurrentPage(3)}>*/}
          {/*  App Configuration*/}
          {/*</button>*/}
          <button className={currentPage === 4 ? "selected" : ""} onClick={() => setCurrentPage(4)}>
            Slippage Tolerance
          </button>
        </div>
        <div className="mainContent">
          <span className="title">
            {titles[currentPage]}
            {currentPage === 4 && (
              <span id="app-slippage" className="help">
                ?
                <Tooltip
                  className="tooltip"
                  anchorId="app-slippage"
                  place="right"
                  html={`The slippage tolerance(floating range) allowing merchants' customers to pay under its customized floating range.<br /><br />E.g The slippage tolerance is set to 1% with order amount "100 USDC", then orders paid by customers ranging from 99 USDC to 101 USDC would be successful.`}
                />
              </span>
            )}
          </span>
          {pages[currentPage]}
        </div>
      </div>
    </div>
  );
};

export default Settings;
