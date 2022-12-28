import React from "react";
import { DefaultButton } from "@@/components";
import "./ipnKeys.scss";
import { ModifyApplicationIpnKey} from "@@/utils/request/api";
import {conversionUtcDate} from "@@/utils/function";
import Refresh from "@@/assets/refresh.svg";
import Copy from "@@/assets/copy.svg";
import toast from "react-hot-toast";

const IpnKeys = ({ipnKeys,setIpnKeys}) => {

    const renewIpnKeys = async () => {
        const res = await ModifyApplicationIpnKey({app_id:0})
        if(res?.code === 1000){
            setIpnKeys({ipn_key:res?.data?.key,ipn_key_created_at:res?.data?.created_at})
        }
    }

    return (
        <div className="ipnKeysWrapper">
            <div className="row">
                <span>{ipnKeys.ipn_key}</span>
                {/*<span className="message">Tips：For security reasons we show it only once.</span>*/}
                <div className="img">
                    <img
                        src={Copy}
                        alt="copy"
                        onClick={async () => {
                            await navigator.clipboard.writeText(ipnKeys.ipn_key);
                            toast.success('Copy succeeded!')
                            // setOpenAlert(true)
                            // setAlertData({msg:'Copied! '})
                        }}
                    />
                </div>
            </div>

            <div className="row">
                <span>Last Created Time</span>
                <span className="time">{conversionUtcDate(ipnKeys.ipn_key_created_at)}</span>
            </div>

            <div className="row">
                <span>Renew</span>
                <div className="img" onClick={() => renewIpnKeys()}>
                    <img src={Refresh} alt="refresh" />
                </div>
            </div>
        </div>
    );
};

export default IpnKeys;
