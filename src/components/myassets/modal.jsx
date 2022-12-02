import React from "react";

import "./modal.scss";

const Modal = ({ click,data }) => {
  return (
    <div className="modal" onClick={click}>
      <div className="modalContent">
        <div className="items">
          <div className="label">Status: </div>
          <div className="item green">{data?.status}</div>
          <div className="label">Transaction ID: </div>
          <div className="item">{data?.payment_num}</div>
          <div className="label">Original Price: </div>
          <div className="item">{data?.origin_amount} {data?.pay_currency_symbol}</div>
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
          <div className="item">{data?.payment_hash?.[0]}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
