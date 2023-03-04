import React, {useState} from "react";

import Pagination from "./Pagination";

import "./historyTable.scss";

const Table = ({ title, columns, rows }) => {
  const [activePage, setActivePage] = useState(1);
  const rowsPerPage = 3;
  const count = rows.length;
  const totalPages = Math.ceil(count / rowsPerPage);
  const calculatedRows = rows.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage);

  return (
    <div className="history">
      <span className="title">{title}</span>
      <div className="selectorsWrapper">
        <div className="dropdownWrapperNew">
          <div className="container">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded="false"
              className=""
              style={{ width: 150 }}
            >
              Status
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <ul className="options " role="listbox" tabIndex={-1}>
              <li id={0} role="option" aria-selected="false" tabIndex={0}>
                All
              </li>
              <li id={1} role="option" aria-selected="false" tabIndex={0}>
                Closed
              </li>
              <li id={2} role="option" aria-selected="false" tabIndex={0}>
                Success
              </li>
              <li id={3} role="option" aria-selected="false" tabIndex={0}>
                Pending
              </li>
            </ul>
          </div>
        </div>
        <div className="dropdownWrapperNew">
          <div className="container">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded="false"
              className=""
              style={{ width: 150 }}
            >
              Currency
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>
            <ul className="options " role="listbox" tabIndex={-1}>
              <li id={0} role="option" aria-selected="false" tabIndex={0}>
                All
              </li>
              <li id={1} role="option" aria-selected="false" tabIndex={0}>
                <img
                  src="https://assets.coingecko.com/coins/images/6319/small/USD_Coin_icon.png"
                  alt="Eth"
                />
                USDC
              </li>
              <li id={2} role="option" aria-selected="false" tabIndex={0}>
                <img
                  src="https://assets.coingecko.com/coins/images/325/small/Tether.png"
                  alt="Eth"
                />
                USDT
              </li>
              <li id={3} role="option" aria-selected="false" tabIndex={0}>
                <img
                  src="https://assets.coingecko.com/coins/images/9956/small/4943.png"
                  alt="Eth"
                />
                DAI
              </li>
              <li id={4} role="option" aria-selected="false" tabIndex={0}>
                <img
                  src="https://assets.coingecko.com/coins/images/7598/small/wrapped_bitcoin_wbtc.png"
                  alt="Eth"
                />
                WBTC
              </li>
              <li id={5} role="option" aria-selected="false" tabIndex={0}>
                <img
                  src="https://assets.coingecko.com/coins/images/2518/small/weth.png"
                  alt="Eth"
                />
                WETH
              </li>
              <li id={6} role="option" aria-selected="false" tabIndex={0}>
                <img
                  src="https://assets.coingecko.com/coins/images/279/small/ethereum.png"
                  alt="Eth"
                />
                ETH
              </li>
            </ul>
          </div>
        </div>
        <div className="datepickerWrapper">
          <div className="react-datepicker-wrapper">
            <div className="react-datepicker__input-container">
              <span
                role="alert"
                aria-live="polite"
                className="react-datepicker__aria-live"
              />
              <div className="datepickerInput">
                Time
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="searchWrapper">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
          <input className="input" placeholder="Trans ID" defaultValue="" />
        </div>
        <div className="Search">Search</div>
        <div className="Clear">Clear</div>
      </div>

      <div className="incomeWrapper">
        <div className="historyTableWrapper">
          <div className="columnLabels">
            {columns.map(column => {
                return <span key={column.accessor}>{column.label}</span>
              })
            }
          </div>
          <div className="historyTableContent">
            {rows.map(row => 
              <div className="historyElementWrapper">
                {columns.map(column =>
                  <span key={column.accessor}>{row[column.accessor]}</span>)
                }
              </div>)
            }
          </div>
        </div>
        <Pagination 
          activePage={activePage} 
          count={count} 
          rowsPerPage={rowsPerPage} 
          totalPages={totalPages} 
          setActivePage={setActivePage} 
        />
      </div>
    </div>
  );
    
};

export default Table;
