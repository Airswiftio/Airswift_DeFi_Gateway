import React, { useEffect, useState } from "react";
import { get, post } from "./requests";
import { TABLETYPE } from "@@/components/types";

import { Search, ManagementTable } from "../../components";
import "./merchantManagement.scss";
const MerchantManagement = () => {
  const [merchants, setMerchants] = useState();

  useEffect(() => {
    get(setMerchants, "/api/admin/merchant/list?page=1&size=10&status=all");
  }, []);

  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper">
          <Search title="Search DID" />
        </div>
        <ManagementTable
          data={merchants?.merchants || {}}
          modify={post}
          type={TABLETYPE.MERCHANT}
        />
      </div>
    </div>
  );
};

export default MerchantManagement;
