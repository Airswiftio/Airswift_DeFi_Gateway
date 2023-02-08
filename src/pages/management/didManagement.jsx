import React, { useEffect, useState } from "react";

import { get, post } from "./requests";
import { TABLETYPE } from "@@/components/types";
import { Search, ManagementTable } from "@@/components";
import "./styles/merchantManagement.scss";

const DIDManagement = () => {
  const [merchants, setMerchants] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    get(
      setMerchants,
      process.env.REACT_APP_API_URL + `/admin/merchant/list?page=${1}&size=1000&status=all`
    );
  }, [currPage]);

  useEffect(() => {
    setPages(Math.ceil(merchants.total / 5));
  }, [merchants]);

  console.log(merchants);

  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper">
          <Search title="Search by ID" search={search} setSearch={setSearch} />
        </div>
        <ManagementTable
          data={
            search
              ? merchants?.merchants.filter((el) =>
                  el.did.toUpperCase().includes(search.toUpperCase())
                )
              : merchants.merchants
          }
          modify={post}
          type={TABLETYPE.MERCHANT}
          currPage={currPage}
          setCurrPage={setCurrPage}
          pages={pages}
        />
      </div>
    </div>
  );
};

export default DIDManagement;
