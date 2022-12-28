import React, { useState, useEffect } from "react";
import { get, post } from "./requests";
import { TABLETYPE } from "@@/components/types";
import { Search, ManagementTable } from "@@/components";

const LiquidityManagement = () => {
  const [pools, setPools] = useState();
  const [currPage, setCurrPage] = useState(0);
  const [pages, setPages] = useState(0);

  useEffect(() => {
    get(setPools, "/api/admin/pool/list?page="+(currPage+1)+"&size=10&status=available");
    console.log(pools)
  }, [currPage]);

  useEffect(() => {
    setPages(Math.ceil(pools?.pools.length / 5));
  }, [pools]);

  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper">
          <Search title="Search Pools or Token" />
        </div>
        <ManagementTable
          data={pools?.pools || {}}
          type={TABLETYPE.LIQUIDITY}
          modify={post}
          currPage={currPage}
          setCurrPage={setCurrPage}
          pages={pages}
        />
      </div>
    </div>
  );
};

export default LiquidityManagement;
