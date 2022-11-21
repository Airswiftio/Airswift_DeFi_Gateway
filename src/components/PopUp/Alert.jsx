import React from "react";
import { DefaultButton } from "../";
import './Alert.scss'

const Alert = ({alertData,setCloseAlert}) => {
    const CloseAlert = () => {
        setCloseAlert(false)
    }
  return (
    <div className="alertWrapper">
      <div className="title">{alertData?.title ?? 'Oops!'}</div>
      <div className="message">{alertData?.msg ?? 'Failed!'}</div>
      <DefaultButton title={alertData?.btnTitle ?? 'Okay'} type={1} align={1} click={CloseAlert} />
    </div>
  );
};

export default Alert;
