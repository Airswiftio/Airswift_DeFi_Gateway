import React, { useState, useEffect } from "react";
import { get, post } from "./requests";
import { TABLETYPE } from "@@/components/types";
import { Search, ManagementTable } from "@@/components";

const GatewayManagement = () => {
  const [currencies, setCurrencies] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    get(
      setCurrencies,
      process.env.REACT_APP_API_URL + `/admin/currency/list?page=${1}&size=1000&status=all`
    );
  }, [currPage]);

  useEffect(() => {
    setPages(Math.ceil(currencies?.total / 5));
  }, [currencies]);

  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper">
          <Search title="Search Token" search={search} setSearch={setSearch} />
        </div>
        <ManagementTable
          data={
            search
              ? currencies?.currencies.filter((el) =>
                  el.symbol.toUpperCase().includes(search.toUpperCase())
                )
              : currencies.currencies
          }
          type={TABLETYPE.CURRENCY}
          modify={post}
          currPage={currPage}
          setCurrPage={setCurrPage}
          pages={pages}
        />
      </div>
    </div>
  );
};

export default GatewayManagement;
