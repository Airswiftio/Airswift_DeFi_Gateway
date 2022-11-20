import React from "react";

import "./modal.scss";

const Modal = ({ click,data }) => {
  return (
    <div className="modal" onClick={click}>
      <div className="modalContent">
        <div className="items">
          <div className="label">Status: </div>
          <div className="item green">{data.status}</div>
          <div className="label">Transaction ID: </div>
          <div className="item">{data.payment_num}</div>
          <div className="label">Currency: </div>
          <div className="item">{data.currency_symbol}</div>
          <div className="label">Amount: </div>
          <div className="item">{data.amount}</div>
          <div className="label">Time: </div>
          <div className="item">{data.created_at}</div>

          {/*<div className="label">Original Price: </div>*/}
          {/*<div className="item">400 USD</div>*/}
          {/*<div className="label">Pay Price: </div>*/}
          {/*<div className="item">400.01USDT</div>*/}
          {/*<div className="label">Exchange Rate: </div>*/}
          {/*<div className="item">1.01</div>*/}
          {/*<div className="label">Outcome Price: </div>*/}
          {/*<div className="item">398.29</div>*/}
          {/*<div className="label">Created at: </div>*/}
          {/*<div className="item">24 Mar 2022， 11:38am</div>*/}
          {/*<div className="label">Completed at: </div>*/}
          {/*<div className="item">24 Mar 2022， 11:46am</div>*/}
          {/*<div className="label">Payin address: </div>*/}
          {/*<div className="item">0xdd21116e2f4674b4c49253d4b31ba4348ac2c477</div>*/}
          {/*<div className="label">Payout address: </div>*/}
          {/*<div className="item">0x19ed768da39e69da5039b9853bee0df806d802e2</div>*/}
          {/*<div className="label">Payment Hash: </div>*/}
          {/*<div className="item">*/}
          {/*  0x036ced3c6d53797f4ce7798acc07ff5fbbb6d6941f88958ca18bdc47bcd1c540*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default Modal;
