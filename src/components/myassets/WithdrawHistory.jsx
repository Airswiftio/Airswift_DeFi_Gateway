import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";

import { GetWithdrawList } from "@@/utils/request/api";
import { dbGetUserWallet } from "@@/utils/function";
import { DefaultButton, ProcessModal } from "../";
import Table from "@@/components/admin/Table";

import "react-tooltip/dist/react-tooltip.css";
import "./withdraw.scss";

const WithdrawHistory = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [dataTotal, setDataTotal] = useState(0);
  const [itemData, setItemData] = useState({});
  const [viewMore, setViewMore] = useState(false);
  const navigate = useNavigate();

  const rowsPerPage = 3;
    
  const handleViewMore = (item) => {
    if (item.status === "complete") {
      window.open(`${process.env.REACT_APP_EXPLORER_URL}/tx/${item.tx_hash}`)
    } else {
      setViewMore(true);
      setItemData(item);
    }
  };

  const getWithdrawHistory = async () => {
    const params = {
      page: page,
      size: rowsPerPage,
      status: filters.status ?? "all",
      currency_id: filters.currency_id,
      date: filters.date,
      withdraw_num: filters.search,
    }
    return await GetWithdrawList(params);
  }

  useEffect(() => {
    (async () => {
      const res = await getWithdrawHistory();
      if(res?.code === 1000){
        setDataList(res?.data?.withdraws ?? []);
        setDataTotal(res?.data?.total);
        if (modalIsOpen) {
          setItemData(res?.data?.withdraws.find(el => el.withdraw_num === itemData.withdraw_num));
        }
      }
    })()
    }, [page, filters, modalIsOpen]);

  const columns = [
    { accessor: 'withdraw_num', label: 'Trans ID', notify: true },
    { accessor: 'status', label: 'Status' },
    { accessor: 'currency_symbol', label: 'Currency' },
    { accessor: 'amount', label: 'Amount' },
    { accessor: 'created_at', label: 'Time', localTime: true },
    { accessor: 'view_more', label: 'View More', handler: handleViewMore, style: {width: "150px"} },
  ];

  const options = [
    {
      title: "Status", 
      data: [
        { key: "all", title: "All" },
        { key: "complete", title: "Complete" },
        { key: "pending", title: "Pending" },
      ],
    }
  ];  

  return (
    <>
      <Popup open={viewMore} closeOnDocumentClick onClose={() => setViewMore(false)}>
        <ProcessModal click={() => setViewMore(false)} itemData={itemData} />
      </Popup>
      <Table title="Withdraw History" columns={columns} rows={dataList} count={dataTotal} rowsPerPage={rowsPerPage}  options={options} filters={filters} setFilters={setFilters} activePage={page} setActivePage={setPage} >
        {dbGetUserWallet()?.roles === "admin" &&
          <DefaultButton
            title="Withdraw"
            align={1}
            click={() => navigate("/withdraw")}
          />
        }
      </Table>
    </>
  );
};

export default WithdrawHistory;
