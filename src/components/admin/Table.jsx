import React, { useEffect } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";

import { copy_text, conversionUtcDate } from "@@/utils/function";
import Pagination from "./Pagination";
import Filter from "./Filter";
import Verified from "@@/assets/verified.svg";
import Doc from "@@/assets/document.svg";
import "./historyTable.scss";

const Table = ({ title, columns, rows, rowsPerPage, count, options, filters, setFilters, activePage, setActivePage}) => {
  const renderColumn = () => 
    columns.map(column => {
      // Amount
      if (column.accessor === "amount") {
        return (
          <React.Fragment key={column.accessor}>
            <span data-tooltip-id="amount" data-tooltip-content="service fee 0.3%" data-tooltip-place="bottom" className="help">
              {column.label}<div>?</div>
            </span>
            <Tooltip id="amount" />
          </React.Fragment>
        );
      }
      return <span key={column.accessor}>{column.label}</span>
    }) ;

  const renderRow = (row) => 
    columns.map((column, index) => {
      const content = row[column.accessor];
      // Trans ID
      if (column.accessor === "payment_num") {
        return (
          <React.Fragment key={content}>
            <span
              data-tooltip-id={content}
              data-tooltip-content={content}
              data-tooltip-place="bottom"
              className="over_play cursor_pointer"
              onClick={() => {
                copy_text(content) === true
                  ? toast.success("Copy succeeded!")
                  : toast.error("Copy failed!");
              }}
            >
              {content}
            </span>
            <Tooltip id={content} />
          </React.Fragment>
        );
      }

      // Status
      if (column.accessor === "status" && row.statusTag) {
        return (
          <span key={content + index} className="status">
            {content}<div className="status__tag">{row.statusTag}</div>
          </span>
        );
      }

      // Time 
      if (column.accessor === "created_at") {
        return <span key={content + index}>{conversionUtcDate(content)}</span>
      }
      
      // View More
      if (column.accessor === "view_more") {
        return (
          <span key={content + index} className="cursor_pointer" onClick={() => column.handler(row.payment_num)}> 
            <img src={Doc} alt="View more" />
          </span>
        )
      }

      // VCs
      if (column.accessor === "vcs" && row.vcStatus) {
        const status = row.vcStatus;
        if (status === "lose" ) {
          return  (
            <div key={content + index} className="RestoreVC" onClick={() => column.handler(row.vcs[0].vcid)}> 
              <div>Restore VC</div>
            </div>
          );
        }
        if (status === "yes") {
          return (
            <span key={content + index}>
              <img src={Verified} alt="Verified" />
            </span>
          );
        }
        if (status === "none") {
          return <span key={content + index}>None</span>;
        }
      }

      // Default
      return  <span key={content + index}>{content}</span>;
    });
  

  useEffect(() => {
    setActivePage(1);
  },[filters])

  console.log(rows, "rows")
  return (
    <div className="history">
      <span className="title">{title}</span>
      <Filter options={options} filters={filters} setFilters={setFilters} setActivePage={setActivePage}/>
      <div className="incomeWrapper">
        <div className="historyTableWrapper">
          <div className="columnLabels">
            {renderColumn()}
          </div>
          <div className="historyTableContent">
            {rows && rows.map((row, index) => 
              <div key={index} className="historyElementWrapper">
                {renderRow(row)}
              </div>)
            }
          </div>
        </div>
        <Pagination 
          activePage={activePage} 
          setActivePage={setActivePage} 
          totalPages={Math.ceil(count / rowsPerPage)} 
        />
      </div>
    </div>
  );
    
};

export default Table;
