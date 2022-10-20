import React from "react";
import { Navbar } from "../components/";

import "./settings.scss";

const Settings = () => {
  return (
    <div>
      <Navbar />
      <div className="settingsWrapper">
        <div className="sideColumn">
          <button className="selected">My Store</button>
          <button className="">API Keys</button>
          <button className="">IPN Keys</button>
          <button className="">App Configuration</button>
        </div>
        <div className="mainContent">
          <span className="title">My Store</span>
        </div>
      </div>
    </div>
  );
};

export default Settings;
