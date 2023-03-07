import React, { useState, useEffect } from "react";
import "./dropDown.scss";

const DropdownNew = ({
  filters,
  setFilters,
  options,
  buttonStyle = null,
  dropStyle = null,
}) => {
  const [open, setOpen] = useState(false);  
  const [option, setOption] = useState();

  const selectOptions = (option) => {
    setOpen(false);
    setOption(option);
    if (options.title === "Status") {
      setFilters(prevState => {
        return {...prevState, status: option.key}
      });
    }
    if (options.title === "Currency") {
      setFilters(prevState => {
        return {...prevState, currency_id: option.id}
      });
    }
  };

  useEffect(() => {
    if (Object.keys(filters).length === 0) {
      setOption(null);
    }
  }, [filters]);

  return (
    <div className="dropdownWrapperNew" style={dropStyle}>
      <div className="container">
        <button
          style={buttonStyle}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          className={open ? "expanded" : ""}
          onClick={() => setOpen(!open)}
        >
          {option?.img ? <img src={option.img} alt={option.title} /> : null}
          {option ? option.title : options.title}
          <svg style={{ transform: open ? "rotate(180deg)" : "" }}
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
        <ul
          className={`options ${open ? "show" : ""}`}
          role="listbox"
          tabIndex={-1}
        >
          {options.data.map((option, index) => (
            <li
              id={index}
              role="option"
              tabIndex={0}
              key={index}
              onClick={() => {selectOptions(option)}}
            >
              {option?.img ? <img src={option.img} alt={option.title} /> : null}
              {option?.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownNew;
