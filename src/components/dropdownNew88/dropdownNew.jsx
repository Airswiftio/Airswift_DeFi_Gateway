import React, { useState,useEffect } from "react";
import "./dropdownNew.scss";

const DropdownNew = ({
                       options,
                       selectedValue,
                       setSelectedValue,
                       optionKey = null,
                       doSomething = null,
}) => {
  console.log('selectedValue',selectedValue);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  let selectedIndex = 0;
  options.map((option, index) => {
    const value = optionKey === null ? option?.key :option[optionKey];
    if(selectedValue === value){
      selectedIndex = index
    }

  })
  // const [selectedIndex, setSelectedIndex] = useState(0);
  const ExpandOrCloseOptions = () => {
    setIsOptionsOpen(!isOptionsOpen);
  };

  const selectOptions = (key) => {
    // setSelectedIndex(key);
    selectedIndex = key
    setIsOptionsOpen(false);
    const value = optionKey === null ? options[key]?.key :options[key][optionKey];
    setSelectedValue()
    doSomething !== null && doSomething(value);
  };

  useEffect(() => {


  }, [selectedValue]);
  return (
    <div className="dropdownWrapper">
      <div className="container">
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          className={isOptionsOpen ? "expanded" : ""}
          onClick={ExpandOrCloseOptions}
        >
          {options[selectedIndex]?.img ? <img src={options[selectedIndex]?.img} alt="Eth" /> : null}
          {options[selectedIndex]?.name ? options[selectedIndex]?.name  : options[0]?.name }
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
          aria-activedescendant={options[selectedIndex]}
          tabIndex={-1}
        >
          {options.map((option, index) => (
            <li
              id={index}
              role="option"
              aria-selected={selectedIndex === index}
              tabIndex={0}
              key={index}
              // Upon clicking, set as selected option then close the dropdown
              onClick={() => {selectOptions(index)}}
            >
              {option?.img ? <img src={option?.img} alt="Eth" /> : null}
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownNew;
