import React, { useState } from "react";
import { ApiKeys, IpnKeys, AppConfig, MyStore } from "../components/";

import "./settings.scss";

const Settings = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [<MyStore />, <ApiKeys />, <IpnKeys />, <AppConfig />];
  const titles = ["My Store", "API Keys", "IPN Keys", "App Configuration"];

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
