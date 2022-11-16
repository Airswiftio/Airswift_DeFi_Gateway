import React, { useState,useEffect } from "react";
import "./dropdownNew.scss";

const DropdownNew = ({
                       options,
                       selected,
                         setSelected,
                       buttonStyle = null,
                       dropStyle = null,
                         defaultTitle = 'Please select',
                         optionKey = null,
                       doSomething = null,
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  /*let selectedIndex = 0;
  options.map((option, index) => {
    const value = optionKey === null ? option?.key :option[optionKey];
    if(selectedValue === value){
      selectedIndex = index
    }

  })*/
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const ExpandOrCloseOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const selectOptions = (key) => {
    setIsOptionsOpen(false);
    setSelected(key)
    doSomething !== null && doSomething(key);
  };

  return (
    <div className="dropdownWrapperNew" style={dropStyle}>
      <div className="container">
        <button
            style={buttonStyle}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          className={isOptionsOpen ? "expanded" : ""}
          onClick={ExpandOrCloseOptions}
        >
          {options?.[selected]?.img ? <img src={options?.[selected]?.img} alt="Eth" /> : null}
          {options?.[selected]?.title ? options?.[selected]?.title  : defaultTitle}
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
          aria-activedescendant={options[selected]}
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              id={index}
              role="option"
              aria-selected={selected === index}
              tabIndex={0}
              key={index}
              // Upon clicking, set as selected option then close the dropdown
              onClick={() => {selectOptions(index)}}
            >
              {option?.img ? <img src={option?.img} alt="Eth" /> : null}
              {option?.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownNew;
