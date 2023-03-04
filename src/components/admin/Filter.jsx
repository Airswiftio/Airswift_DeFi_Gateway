import React, {useState}  from "react";

import { select_currency } from "@@/utils/config";
import Search from "./Search";
import Datepicker from "./DatePicker";
import Dropdown from "./DropDown";

const Filter = ({options, filters, setFilters}) => {
  const optionsList = [
    ...options, 
    {
      title: "Currency",
      data: [{ key: "all", title: "All"}].concat(select_currency()) 
    }
  ];

  return ( 
    <div className="selectorsWrapper">
      {optionsList.map((options, index) => 
        <Dropdown
          key={index}
          buttonStyle={{ width: "150px" }}
          options={options}
          filters={filters}
          setFilters={setFilters}
        />)
      }
      <Datepicker filters={filters} setFilters={setFilters} />
      <Search filters={filters} setFilters={setFilters} />
      <div className="Clear" onClick={() => setFilters({})}>Clear</div>
    </div>)
};

export default Filter;
