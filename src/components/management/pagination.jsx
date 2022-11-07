import React from "react";
import LeftArrow from "../../assets/small_arrow_left.svg";
import RightArrow from "../../assets/small_arrow_right.svg";
import "./pagination.scss";

const Pagination = ({ pages, currPage, setCurrPage }) => {
  const decrementPage = () => {
    if (currPage > 0) {
      setCurrPage(currPage - 1);
    }
  };

  const incrementPage = () => {
    if (currPage < pages - 1) {
      setCurrPage(currPage + 1);
    }
  };
  return (
    <div className="mPaginationWrapper">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={currPage === 0 ? "gray" : "#3ACBF6"}
        onClick={decrementPage}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
        />
      </svg>
      Page {currPage + 1} of {pages}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke={currPage === pages - 1 ? "gray" : "#3ACBF6"}
        onClick={incrementPage}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
        />
      </svg>
    </div>
  );
};

export default Pagination;
