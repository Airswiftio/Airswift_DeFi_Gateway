import React from "react";

import LeftArrow from "../../assets/small_arrow_left.svg";
import RightArrow from "../../assets/small_arrow_right.svg";

import "./pagination.scss";

const Pagination = ({ pages, page, setPage }) => {
  const decrementPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const incrementPage = () => {
    if (page < pages - 1) {
      setPage(page + 1);
    }
  };

  return (
    <div className="pagination">
      <button className="pageButton" onClick={() => setPage(0)}>
        First
      </button>
      <img src={LeftArrow} alt="left" onClick={() => decrementPage()} />
      {[...Array(pages).keys()].map((e) => (
        <button
          className={`pageButton ${e === page ? "selected" : null}`}
          onClick={() => setPage(e)}
          key={e}
        >
          {e+1}
        </button>
      ))}
      <img src={RightArrow} alt="right" onClick={() => incrementPage()} />
      <button className="pageButton" onClick={() => setPage(pages - 1)}>
        Last
      </button>
    </div>
  );
};

export default Pagination;
