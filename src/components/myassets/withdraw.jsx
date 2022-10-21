import React from "react";

import { HistoryTable, HistoryElement, DefaultButton } from "../";

import "./withdraw.scss";
import dummyData from "../../sample_data.json";

const Withdraw = () => {
  return (
    <div className="withdrawWrapper">
      <HistoryTable vc={false}>
        {dummyData.withdrawHistory.map(
          (
            { transId, status, currency, amount, time, viewMore, vc },
            index
          ) => (
            <HistoryElement
              transId={transId}
              status={status}
              currency={currency}
              amount={amount}
              time={time}
              viewMore={viewMore}
              key={index}
            />
          )
        )}
      </HistoryTable>
      <DefaultButton title="Withdraw" align={1} />
      <div className="help">How can I use VP?</div>
    </div>
  );
};

export default Withdraw;
