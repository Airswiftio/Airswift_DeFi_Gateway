import React, { useState, useEffect } from "react";
import { get, post } from "./requests";
import { TABLETYPE } from "@@/components/types";
import { Search, ManagementTable } from "@@/components";

import "./liquidityManagement.scss";

const LiquidityManagement = () => {
  const [pools, setPools] = useState();

  useEffect(() => {
    get(setPools, "/api/admin/pool/list?page=1&size=10&status=all");
  }, []);

  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper">
          <Search title="Search Pools or Token" />
        </div>
        <ManagementTable data={pools?.pools || {}} type={TABLETYPE.LIQUIDITY} modify={post} />
      </div>
    </div>
  );
};

export default LiquidityManagement;
