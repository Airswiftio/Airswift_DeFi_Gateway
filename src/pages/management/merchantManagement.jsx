import React from "react";

import { Search, ManagementTable } from "../../components";
import Data from "./dummy_items.json";
import "./merchantManagement.scss";

const MerchantManagement = () => {
  return (
    <div className="merchantManagementWrapper">
      <div className="management">
        <div className="managementSearchWrapper">
          <Search title="Search DID" />
        </div>
        <ManagementTable data={Data.management} />
      </div>
    </div>
  );
};

export default MerchantManagement;
