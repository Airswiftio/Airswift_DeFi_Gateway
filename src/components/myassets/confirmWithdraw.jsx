import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import {
  HistoryTable,
  HistoryElement,
  DefaultButton,
  ConfirmWithdrawModal,
} from "../";
import dummyData from "../../sample_data.json";
import "./confirmWithdraw.scss";
import {GetWithdrawList} from "@@/utils/request/api";

const ConfirmWithdraw = () => {
  const [checked, setChecked] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const openModal = () => {
    setIsOpen(true);
    console.log("Clicked");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const selectRow = (key) => {
    if (checked.includes(key)) {
      setChecked(checked.filter((e) => e !== key));
    } else {
      setChecked([...checked, key]);
    }

    console.log(checked);
  };

    const [dataList, setDataList] = useState([]);
    const [dataTotal, setDataTotal] = useState(0);


    const getList = async () => {
        const res = await GetWithdrawList()
        if(res?.code === 1000){
            setDataList(res?.msg?.withdraws ?? [])
            setDataTotal(res?.msg?.total)
        }
    }
    useEffect(() => {
        getList();
        // getWithdrawTotal();
    }, []);

  return (
    <div className="confWithdrawWrapper">
      <Popup open={modalIsOpen} closeOnDocumentClick onClose={closeModal}>
        <ConfirmWithdrawModal click={closeModal} />
      </Popup>
      <div className="title">Select available transactions</div>
      <HistoryTable vc={false} select>
        {dataList.map(
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
        click={() => setIsOpen(true)}
      />
      <div className="help">How can I use VP?</div>
    </div>
  );
};

export default ConfirmWithdraw;
