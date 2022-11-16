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
      .get(
        "/admin/merchant/list?page=1&size=10&status=all",
        {},
        { withCredentials: true }
      )
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        //setMerchants(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  const manageMerchantList = () => {};

  useEffect(() => {
    getMerchantList();
    console.log("Token", Cookies.get("admin-auth-token"));
  }, []);

  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper">
          <Search title="Search DID" />
        </div>
        <ManagementTable data={merchants || Data.management} />
      </div>
    </div>
  );
};

export default MerchantManagement;
