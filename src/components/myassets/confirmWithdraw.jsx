import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HistoryTable, HistoryElement, DefaultButton } from "../";
import dummyData from "../../sample_data.json";
import "./confirmWithdraw.scss";

const ConfirmWithdraw = () => {
  const [checked, setChecked] = useState([]);
  const navigate = useNavigate();

  const selectRow = (key) => {
    if (checked.includes(key)) {
      setChecked(checked.filter((e) => e !== key));
    } else {
      setChecked([...checked, key]);
    }

    console.log(checked);
  };

  return (
    <div className="confWithdrawWrapper">
      <div className="title">Select available transactions</div>
      <HistoryTable vc={false} select>
        {dummyData.withdrawHistory.map(
          ({ transId, status, currency, amount, time, viewMore }, index) => (
            <HistoryElement
              checked={checked}
              click={() => selectRow(index)}
              transId={transId}
              status={status}
              currency={currency}
              amount={amount}
              time={time}
              viewMore={viewMore}
              key={index}
              indx={index}
            />
          )
        )}
      </HistoryTable>
      <DefaultButton
        title="Confirm Withdraw"
        align={1}
        click={() => navigate("/assets")}
      />
      <div className="help">How can I use VP?</div>
    </div>
  );
};

export default ConfirmWithdraw;
