import React from "react";
import axios from "axios";

import { Search, ManagementTable } from "../../components";
import Data from "./dummy_items.json";

import "./liquidityManagement.scss";

const LiquidityManagement = () => {
  const getLiquidityPoolList = () => {
    var config = {
      method: "get",
      url: "http://34.221.50.218:23456/api/admin/pool/list?page=1&size=10&status=all",
      headers: {
        Authorization: "GL9gEdV1JXaB%*1zk)G7TPWbFuPbtL&o",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const manageLiquidityPoolList = () => {};

  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper">
          <Search title="Search Pools or Token" />
        </div>
        <ManagementTable data={Data.liquidity} />
      </div>
    </div>
  );
};

export default LiquidityManagement;
