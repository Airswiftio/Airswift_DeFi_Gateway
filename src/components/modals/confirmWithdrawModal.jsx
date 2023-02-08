import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DefaultButton } from "..";
import "./confirmWithdrawModal.scss";

import { MerchantWithdraw } from "@@/utils/request/api";
import { createVP } from "@@/utils/chain/did";
import { addAllVCs, array_column, dbGetUserWallet } from "@@/utils/function";
import Popup from "reactjs-popup";
import Alert from "@@/components/PopUp/Alert";

const ConfirmWithdrawModal = ({ click, data = [], total = 0, currency, setState }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const [alertData, setAlertData] = useState({});
  const withdraw = async () => {
    const VCids = data.map((vv) => vv?.vc_id);
    const VC_list = data.map((vv) => {
      vv.vc_status = "Withdraw";
      return vv;
    });

    const res = await createVP(VCids);
    console.log("res", res);
    if (res?.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: res?.msg });
      return false;
    }

    const res1 = await MerchantWithdraw({
      vp: res?.data,
      to_address: dbGetUserWallet()?.account,
    });
    if (res1?.code !== 1000) {
      setOpenAlert(true);
      setAlertData({ msg: res1?.msg });
      return false;
    }

    await addAllVCs(VC_list);
    setState(1);
    // wait for server processing
    setTimeout(() => {
      navigate("/assets", {
        state: { status: 1 },
      });
    }, 1000);
  };

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
      <Popup open={openAlert} closeOnDocumentClick onClose={() => setOpenAlert(false)}>
        <Alert alertData={alertData} setCloseAlert={setOpenAlert} />
      </Popup>

      <div className="modalContent">
        <button className="back" onClick={() => click()}>
          Back
        </button>
        <div className="title">Withdraw Confirmation </div>
        <div className="withdrawTotal">
          <div className="total">{`${total} `}</div>
          <div className="currency">
            {/*<img src={USDC} alt="currency" />*/}
            {` ${currency?.title}`}
          </div>
        </div>
        <DefaultButton title="Confirm Withdraw" click={withdraw} />
      </div>
    </div>
  );
};

export default ConfirmWithdrawModal;
