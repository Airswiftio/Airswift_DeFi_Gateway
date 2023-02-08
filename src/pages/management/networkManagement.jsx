import React, { useState, useEffect } from "react";
import { get, post } from "./requests";
import { get as httpGet } from "@@/utils/request/http";
import { TABLETYPE } from "@@/components/types";
import { Search, ManagementTable } from "@@/components";

const NetworkManagement = () => {
  const [networks, setNetworks] = useState([]);
  const [currPage, setCurrPage] = useState(0);
  const [pages, setPages] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      const res = await httpGet("admin/blockchain/list", {
        page: 1,
        size: 10,
        status: "all",
      });
      setNetworks(res.data.blockchains);
    })()
  }, [currPage]);
  console.log(networks, "networks");

  useEffect(() => {
    setPages(Math.ceil(networks.length / 5));
  }, [networks]);

  console.log(networks?.filter((el) =>
  el.name.toUpperCase().includes(search.toUpperCase())
));
console.log(search);
  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper">
          <Search title="Search by ID" search={search} setSearch={setSearch} />
        </div>
        <ManagementTable
          data={
            search
              ? networks?.filter((el) =>
                  el.name.toUpperCase().includes(search.toUpperCase())
                )
              : networks
          }
          type={TABLETYPE.NETWORK}
          modify={post}
          currPage={currPage}
          setCurrPage={setCurrPage}
          pages={pages}
        />
      </div>
    </div>
  );
};

export default NetworkManagement;
