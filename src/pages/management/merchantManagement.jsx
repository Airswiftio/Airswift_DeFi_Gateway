import React, { useEffect, useState } from "react";

import { get, post } from "./requests";
import { TABLETYPE } from "@@/components/types";
import { ManagementTable } from "@@/components";
import "./styles/merchantManagement.scss";

const MerchantManagement = () => {
  const [merchants, setMerchants] = useState([]);
  const [items, setItems] = useState(merchants);

  useEffect(() => {
    get(setMerchants, "/api/admin/merchant/list?page=1&size=10&status=all");
  }, []);

  const search = (val) => {
    setItems(merchants.merchants.filter((m) => m.id.toString().includes(val)));
  };

  useEffect(() => {
    setItems(merchants?.merchants);
  }, [merchants]);

  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper">
          <div className="searchWrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>

            <input
              className="input"
              placeholder="Search by ID"
              onChange={(event) => {
                search(event.target.value);
              }}
            />
          </div>
        </div>
        <ManagementTable data={items} modify={post} type={TABLETYPE.MERCHANT} />
      </div>
    </div>
  );
};

export default MerchantManagement;
