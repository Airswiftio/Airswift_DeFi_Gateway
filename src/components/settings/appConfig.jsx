import React from "react";

import "./appConfig.scss";

const appConfig = () => {
  return (
    <div className="appConfigWrapper">
      <span className="label">App Name</span>
      <div className="item">Omnisolu</div>

      <span className="label">Application Link</span>
      <div className="item">111.111.111</div>

      <span className="label">Callback Url</span>
      <div className="item">176.298</div>
    </div>
  );
};

export default appConfig;
