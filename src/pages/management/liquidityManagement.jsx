import React, { useState, useEffect } from "react";
import axios from "axios";

import { Search, ManagementTable } from "../../components";
import Data from "./dummy_items.json";

import "./liquidityManagement.scss";

const LiquidityManagement = () => {
  const [pools, setPools] = useState();

  const getLiquidityPoolList = () => {
    axios
      .get("/api/admin/pool/list?page=1&size=10&status=all", {
        withCredentials: true,
        credentials: "same-origin",
      })
      .then(function (response) {
        setPools(response.data.msg.pools);
      })
      .catch(function (error) {
        console.log("Error", error);
      });
  };

  const manageLiquidityPoolList = (id, status) => {
    axios
      .post(
        "/api/admin/pool/status",
        {
          pool_id: id,
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
    getLiquidityPoolList();
  }, []);

  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper">
          <Search title="Search Pools or Token" />
        </div>
        <ManagementTable
          data={pools || {}}
          type={1}
          modify={manageLiquidityPoolList}
        />
      </div>
    </div>
  );
};

export default LiquidityManagement;
