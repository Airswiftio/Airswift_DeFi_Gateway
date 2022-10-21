import React from "react";

import { HistoryTable, HistoryElement } from "../";

import "./income.scss";
import dummyData from "../../sample_data.json";

const Income = () => {
  return (
    <div className="incomeWrapper">
      <HistoryTable>
        {dummyData.incomeHistory.map(
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
              vc={vc}
              key={index}
            />
          )
        )}
      </HistoryTable>
    </div>
  );
};

export default Income;
