import React from "react";

import { Search, ManagementTable } from "../../components";
import Data from "./dummy_items.json";

import "./liquidityManagement.scss";

const LiquidityManagement = () => {
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
