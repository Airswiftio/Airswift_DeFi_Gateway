import React from "react";
import { useNavigate } from "react-router";

import Back from "@@/assets/back.svg";
import "./search.scss";

const Search = ({ title = "Trans ID", search, setSearch, back = false }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("../");
  };

  return (
    <div className="searchWrapper">
      <div className="back" onClick={handleClick}>
        {back && <><img src={Back} alt="Back" /> back</>}
      </div>
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

      <input
        className="input"
        placeholder={title}
        value={search === null ? "" : search}
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </div>
  );
};

export default Search;
