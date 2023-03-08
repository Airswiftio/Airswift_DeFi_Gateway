import React, { useEffect } from "react";
import { Tooltip } from "react-tooltip";
import toast from "react-hot-toast";

import { copy_text, conversionUtcDate } from "@@/utils/function";
import Pagination from "@@/components/pagination/pagination"; 
import Filter from "./Filter";
import Verified from "@@/assets/verified.svg";
import Doc from "@@/assets/document.svg";
import "react-tooltip/dist/react-tooltip.css";
import "./historyTable.scss";
import "./table.scss";

const Table = ({ title, columns, rows, rowsPerPage, count, options, filters, setFilters, activePage, setActivePage, children }) => {
  const renderColumn = () => 
    columns.map(column => {
      // Amount
      if (column.tooltip) {
        return (
          <React.Fragment key={column.accessor}>
            <span id={column.accessor} className="help">
              {column.label}<div>?</div>
            </span>
            <Tooltip anchorId={column.accessor} place="bottom" content={column.tooltip} />
          </React.Fragment>
        );
      }
      return <span key={column.accessor} style={column.style}>{column.label}</span>
    }) ;

  const renderRow = (row) => 
    columns.map((column, index) => {
      const content = row[column.accessor];
      // Trans ID
      if (column.notify) {
        return (
          <React.Fragment key={content}>
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
            <Tooltip anchorId={content} place="bottom" content={content} />
          </React.Fragment>
        );
      }

      // Status
      if (column.tag && row.statusTag) {
        return (
          <span key={content + index} className="status">
            {content}<div className="status__tag">{row.statusTag}</div>
          </span>
        );
      }

      // Time 
      if (column.localTime) {
        return <span key={content + index}>{conversionUtcDate(content)}</span>
      }
      
      // View More
      if (column.accessor === "view_more") {
        if (row.status === "pending") {
          return ( <span key={content + index} className="cursor_pointer" style={column.style} onClick={() => column.handler(row)}> 
            <div className="onChainStatus center_text">On Chain Status</div>
          </span> 
          )
        }
        return (
            <span key={content + index} className="cursor_pointer" style={column.style} onClick={() => column.handler(row)}> 
              <img src={Doc} alt="View more" />
            </span> 
        )
      }

      // VCs
      if (column.accessor === "vcs" && row.vcStatus) {
        const status = row.vcStatus;
        if (status === "lose") {
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

  return (
    <div className="table">
      <span className="table__title">{title}</span>
      <Filter options={options} filters={filters} setFilters={setFilters} setActivePage={setActivePage}/>
      <div className="table__content">
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
          page={activePage} 
          setPage={setActivePage} 
          pages={Math.ceil(count / rowsPerPage)} 
        />
        { children }
      </div>
    </div>
  );
    
};

export default Table;
