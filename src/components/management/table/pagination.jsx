import React from "react";
import "./pagination.scss";
import { Arrow } from "@@/components";

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
      <Arrow direction="LEFT" isEnd={currPage === 0} click={decrementPage} />
      Page {currPage + 1} of {pages}
      <Arrow direction="RIGHT" isEnd={currPage === pages - 1} click={incrementPage} />
    </div>
  );
};

export default Pagination;
