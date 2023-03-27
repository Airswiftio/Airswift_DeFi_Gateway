import React from "react";

import "./modal.scss";
import closeX from "@@/assets/close.png";

const Modal = ({ click, data }) => {
  const viewChainTx = (item) => {
    window.open(`${process.env.REACT_APP_EXPLORER_URL}/tx/${item.payment_hash}`);
}

  return (
    <div className="modal">
      <div className="modalContent0">
        <div className="closeX" ><img onClick={click} src={closeX} alt="closeX"/></div>
        <div className="modalContent">
          <div className="items">
            <div className="label">Status: </div>
            <div className="item green">{data?.status}</div>
            <div className="label">Transaction ID: </div>
            <div className="item">{data?.payment_num}</div>
            <div className="label">Original Price: </div>
            <div className="item">{data?.origin_amount}</div>
            <div className="label">Pay Price: </div>
            <div className="item">{data?.pay_amount} {data?.pay_currency_symbol}</div>
            <div className="label">Exchange Rate: </div>
            <div className="item">{data?.exchange_rate}</div>
            <div className="label">Outcome Price : </div>
            <div className="item">{data?.outcome_amount}</div>
            <div className="label">Created at : </div>
            <div className="item">{data?.created_at}</div>
            <div className="label">Completed at : </div>
            <div className="item">{data?.completed_at}</div>
            <div className="label">Payin address :</div>
            <div className="item">{data?.pay_in_address}</div>
            <div className="label">Payout address :</div>
            <div className="item">{data?.pay_out_address}</div>
            <div className="label"> Payment Hash :</div>
            {data?.payment_hash?.[0] && 
              <div className="item cursor_pointer" onClick={() => viewChainTx(data)}>{data?.payment_hash?.[0]}</div> 
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
