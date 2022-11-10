import React from "react";
import { DefaultButton } from "@@/components";
import "./ipnKeys.scss";
import { ModifyApplicationIpnKey} from "@@/utils/request/api";

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
                <span className="message">Tips：For security reasons we show it only once.</span>
            </div>

            <div className="row">
                <span>Last Created Time</span>
                <span className="time">{ipnKeys.ipn_key_created_at}</span>
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
