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
      if (column.accessor === "amount") {
        return (
          <React.Fragment key={column.accessor}>
            <span id="amount" className="help">{column.label}<div>?</div></span>
            <Tooltip
              anchorId="amount"
              place="bottom"
              content="service fee 0.3%"
            />
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
          <React.Fragment key={content + index}>
            <span
              id={content}
              className="over_play cursor_pointer"
              onClick={() => {
                copy_text(content) === true
                  ? toast.success("Copy succeeded!")
                  : toast.error("Copy failed!");
              }}
            >
              {content}
            </span>
            <Tooltip
              anchorId={content}
              place="bottom"
              content={content}
            />
          </React.Fragment>
        );
      }

      // Status
      if (column.accessor === "status") {
        if (row.collection_amount === "0") return;
        let statusTag;
        // overpay
        if (row.status === "success") {
          const overpay =
            row.collection_amount * 1 > row.order_amount * (1 + row.slippage / 100);
          if (overpay) statusTag = "overpay";
        }
        // underpay
        if (row.status === "closed") {
          const underpay =
            row.collection_amount * 1 < row.order_amount * (1 - row.slippage / 100);
          if (underpay) statusTag = "underpay";
        }
        if (statusTag) return <span key={content + index} className="status">{content}<div className="status__tag">{statusTag}</div></span>;
      }

      // Time 
      if (column.accessor === "created_at") {
        return <span key={content + index}>{conversionUtcDate(content)}</span>
      }
      if (column.accessor === "view_more") {
        return (
          <span key={content + index} className="cursor_pointer"> 
            <img src={Doc} alt="View more" />
          </span>
        )
      }

      // VCs
      if (column.accessor === "vcs") {
        const vcStatus = row.vc_status;
        if (vcStatus === "lose" ) {
          return  (
            <div key={content + index} className="RestoreVC"> 
              <div>Restore VC</div>
            </div>

          );
        }
        if (vcStatus === "yes") {
          return (
            <span key={content + index}>
              <img src={Verified} alt="Verified" />
            </span>
          );
        }
        if (vcStatus === "none") {
          return <span key={content + index}>None </span>;
        }
        return <span></span>
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
