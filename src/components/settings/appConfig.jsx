import React from "react";
import "./appConfig.scss";

const AppConfig = ({appConfig,setAppConfig}) => {

    return (
        <div className="appConfigWrapper">
            <span className="label">App Name</span>
            <div className="item">{appConfig.name}</div>

            <span className="label">Application Link</span>
            <div className="item">{appConfig.link}</div>

            <span className="label">Callback Url</span>
            <div className="item">{appConfig.callbackUrl}</div>
        </div>
    );
};

export default AppConfig;
