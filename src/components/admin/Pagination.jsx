import React from "react";

import LeftArrow from "../../assets/small_arrow_left.svg";
import RightArrow from "../../assets/small_arrow_right.svg";
import "./pagination.scss";

const Pagination = ({activePage, setActivePage, totalPages}) => {
  console.log(activePage, "activePage");
  const setFirst = () => {
    setActivePage(1);
  }
  const decrement = () => {
    if (activePage === 1) return;
    setActivePage(activePage - 1);
  }
  const increment = () => {
    if (activePage === totalPages) return;
    setActivePage(activePage + 1);
  }
  const setLast = () => {
    setActivePage(totalPages);
  }

  return (
    <div className="pagination">
      <button className="pageButton pointer" disabled={activePage === 1} onClick={setFirst}>First</button>
      <img className="pointer"
        src={LeftArrow}
        alt="left"
        onClick={decrement}
      />
      {Array.from({length: totalPages === 0 ? 1 : totalPages}, (_, i) => i + 1).map((page, index) => {
          return <button key={index} className={page === activePage ? "pageButton selected default" : "pageButton pointer"} onClick={() => setActivePage(page)}>{page}</button>;
      })}
      <img
        className="pointer"
        src={RightArrow}
        alt="right"
        onClick={increment}
      />
      <button className="pageButton pointer" disabled={activePage === totalPages} onClick={setLast}>Last</button>
    </div>
  );
}

export default Pagination;
