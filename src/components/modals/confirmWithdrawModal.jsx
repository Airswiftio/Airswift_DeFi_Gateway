import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router";
import { DefaultButton } from "..";
import "./confirmWithdrawModal.scss";

import USDC from "../../assets/usdc_icon.svg";
import {MerchantWithdraw} from "@@/utils/request/api";
import {createVP} from "@@/utils/chain/did";
import {array_column, dbGetUserWallet} from "@@/utils/function";
import Popup from "reactjs-popup";
import Alert from "@@/components/PopUp/Alert";

const ConfirmWithdrawModal = ({ click,data = [], total = 0, currency }) => {

  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const withdraw = async () => {
    const VCids = array_column(data,'vc_id')

    const res = await createVP(VCids);
    if(res?.code !== 1000){
      setOpenAlert(true)
      setAlertData({msg:res?.msg})
      return false;
    }


    const res1 = await MerchantWithdraw({
      vp: res?.data,
      to_address:dbGetUserWallet()?.account})
    if(res1?.code !== 1000){
      setOpenAlert(true)
      setAlertData({msg:res1?.msg})
      return false;
    }
    navigate("/dashboard")
  }

  useEffect(() => {
    const modal = document.getElementsByClassName("withdrawModal");
    modal[0].addEventListener("click", (e) => {
      if (e.target.classList[0] === "withdrawModal") {
        click();
      }
    });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="withdrawModal">
      <Popup open={openAlert} closeOnDocumentClick onClose={()=>setOpenAlert(false)}>
        <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
      </Popup>
      <div className="modalContent">
        <div className="title">Withdraw Confirmation</div>
        <div className="withdrawTotal">
          <div className="total">{`$ ${total}`}</div>
          <div className="currency">
            <img src={USDC} alt="currency" />
            {` ${currency?.title}`}
          </div>
        </div>
        <div className="gas">
          <span>Gas Tips:</span>
          <span>Gas fee**** ETH</span>
        </div>
        <DefaultButton
          title="Confirm Withdraw"
          click={withdraw}
        />
      </div>
    </div>
  );
};

export default ConfirmWithdrawModal;
