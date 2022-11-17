import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { Search, ManagementTable } from "../../components";
import Data from "./dummy_items.json";
import "./merchantManagement.scss";
const MerchantManagement = () => {
  const [merchants, setMerchants] = useState();

  const getMerchantList = () => {
    axios
      .get("/api/admin/merchant/list?page=1&size=10&status=all", {
        withCredentials: true,
        credentials: "same-origin",
      })
      .then(function (response) {
        setMerchants(response.data.msg.merchants);
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  const manageMerchantList = (id, status) => {
    axios
      .post(
        "/api/admin/merchant/status",
        {
          merchant_id: id,
          new_status: status,
        },
        {
          withCredentials: true,
          credentials: "same-origin",
        }
      )
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    getMerchantList();
  }, []);

  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper">
          <Search title="Search DID" />
        </div>
        <ManagementTable
          data={merchants || {}}
          modify={manageMerchantList}
          type={0}
        />
      </div>
    </div>
  );
};

export default MerchantManagement;
