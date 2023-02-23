import React, { useState, useEffect } from "react";

import QRCodeTransaction from "@@/pages/management/qrcodeTransaction";
import { Datepicker, Search, DropdownNew } from "@@/components";
import BackButton from "@@/components/buttons/BackButton";
import { select_currency } from "@@/utils/config";
import { QRCodeScan } from "..";
import "./styles/expenseManagement.scss";

const QRCodeManagement = () => {
  const [search, setSearch] = useState("");
  const [searchTransID, setSearchTransID] = useState("");
  const [selectStatus, setSelectStatus] = useState();
  const [date, setDate] = useState();
  const [initial, setInitial] = useState(true);
  const [selectCurrency, setSelectCurrency] = useState();
  const [openScan, setOpenScan] = useState(false);
  const [payoutAddress, setPayoutAddress] = useState("");

  const currencyOptions = select_currency();
  currencyOptions.unshift({ key: "all", title: "All" });

  const SearchTransID = () => {
    setSearchTransID(search);
  };

  const ClearSearch = () => {
    setSelectStatus(null);
    setSelectCurrency(null);
    setDate(null);
    setInitial(true);
    setSearchTransID("");
    setSearch("");
  };

  const statusOptions = [
    { key: "all", title: "All" },
    { key: "closed", title: "Closed" },
    { key: "success", title: "Success" },
    { key: "pending", title: "Pending" },
    { key: "created", title: "Created" },
  ];

  return openScan ? (
    <QRCodeScan payoutAddress={payoutAddress} setOpenScan={setOpenScan} />
  ) : (
    <div>
      <div className="expenseContent">
        <BackButton style={{ width: "calc(60% + 4em)", textAlign: "left" }} />
        <div className="history">
          <span className="title">Transaction History</span>
          <div className="selectorsWrapper">
            <DropdownNew
              buttonStyle={{ width: "150px" }}
              options={statusOptions}
              defaultTitle="Status"
              selected={selectStatus}
              setSelected={setSelectStatus}
            />
            <DropdownNew
              buttonStyle={{ width: "150px" }}
              options={currencyOptions}
              defaultTitle="Currency"
              selected={selectCurrency}
              setSelected={setSelectCurrency}
            />
            <Datepicker date={date} setDate={setDate} initial={initial} setInitial={setInitial} />
            <Search search={search} setSearch={setSearch} />
            <div className="Search" onClick={SearchTransID}>
              Search
            </div>
            <div className="Clear" onClick={ClearSearch}>
              Clear
            </div>
          </div>
          <QRCodeTransaction
            selectCurrency={selectCurrency}
            selectStatus={selectStatus}
            search={search}
            searchTransID={searchTransID}
            date={date ?? ""}
            setOpenScan={setOpenScan}
            setPayoutAddress={setPayoutAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default QRCodeManagement;
