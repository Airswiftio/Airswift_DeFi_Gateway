import React, { useState } from "react";
import useFilters from "../../hooks/useFilters";

import "./dropdown.scss";

const Dropdown = ({
  options,
  images = null,
  defaultTitle = null,
  isFilter,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(0);
  const [initial, setInitial] = useState(true);
  const { filters, setFilters } = useFilters();

  const toggleOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
    addFilter(selectedOption);
    console.log("Filters: ", filters);
  };

  const addFilter = (f) => {
    if (isFilter) {
      switch (defaultTitle) {
        case "Status":
          setFilters({ status: f, currency: filters?.currency });
          break;
        case "Currency":
          setFilters({ status: filters?.status, currency: f });
          break;
        default:
          break;
      }
    }
  };

  return (
    <div className="dropdownWrapper">
      <div className="container">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          className={isOptionsOpen ? "expanded" : ""}
          onClick={toggleOptions}
        >
          {initial && defaultTitle ? defaultTitle : options[selectedOption]}
          {isOptionsOpen ? (
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
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
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
          )}
        </button>
        <ul
          className={`options ${isOptionsOpen ? "show" : ""}`}
          role="listbox"
          aria-activedescendant={options[selectedOption]}
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              id={option}
              role="option"
              aria-selected={selectedOption === index}
              tabIndex={0}
              key={index}
              // Upon clicking, set as selected option then close the dropdown
              onClick={() => {
                setSelectedOption(index);
                setIsOptionsOpen(false);
                setInitial(false);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dropdown;
