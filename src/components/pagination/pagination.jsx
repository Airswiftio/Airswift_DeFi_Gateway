import React from "react";

import LeftArrow from "../../assets/small_arrow_left.svg";
import RightArrow from "../../assets/small_arrow_right.svg";

import "./pagination.scss";

const Pagination = ({ pages, page, setPage }) => {
    const decrementPage = () => {
        setPage( page <= 1 ? 1:page - 1);
    };

    const incrementPage = () => {
        setPage(page >= pages ? pages:page + 1);
    };

  return (
    <div className="pagination">
      <button className="pageButton pointer" onClick={() => setPage(1)}>
        First
      </button>
      <img className="pointer" src={LeftArrow} alt="left" onClick={() => decrementPage()} />
        {page >= 4 && <button className="pageButton default"> ... </button>}
        {page >= 3 &&
            <button className="pageButton pointer" onClick={() => setPage(page - 2)}>
                {page - 2}
            </button>
        }
        {page >= 2 &&
            <button className="pageButton pointer" onClick={() => setPage(page - 1)}>
                {page - 1}
            </button>
        }
        <button className="pageButton selected default" >
            {page}
        </button>
        {page <= pages - 1 &&
            <button className="pageButton pointer" onClick={() => setPage(page + 1)}>
                {page + 1}
            </button>
        }
        {page <= pages - 2 &&
            <button className="pageButton pointer" onClick={() => setPage(page + 2)}>
                {page + 2}
            </button>
        }
        {page <= pages - 3 && <button className="pageButton default"> ... </button>}
      <img className="pointer" src={RightArrow} alt="right" onClick={() => incrementPage()} />
      <button className="pageButton pointer" onClick={() => setPage(pages)}>
        Last
      </button>
    </div>
  );
};

export default Pagination;
