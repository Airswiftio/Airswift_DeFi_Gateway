import React, { forwardRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import moment from "moment";

import "./datePicker.scss";

const DatePicker = ({ filters, setFilters }) => {
  const [pickedDate, setPickedDate] = useState(new Date());

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="datepickerInput" onClick={onClick} ref={ref}>
      {!filters.date ? 
        <>
          Time
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
              d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </>
        : 
        `${pickedDate.getDate()}/${pickedDate.getMonth() + 1}/${pickedDate.getFullYear()}`
      }
    </div>
  ));

  return (
    <div className="datepickerWrapper">
      <ReactDatePicker
        selected={pickedDate}
        startDate={pickedDate}
        customInput={<CustomInput />}
        onChange={(date) => {
          setPickedDate(date);
          setFilters(prevState => {
            return {...prevState, date: moment(date).format('YYYY-MM-DD')}
          })
        }}
        popperPlacement="bottom"
        popperModifiers={[
          {
            name: "flip",
            options: {
              fallbackPlacements: ["bottom"],
              allowedAutoPlacements: ["bottom"],
            },
          },
        ]}
        className="customCalendar"
        calendarClassName="customCalendar"
        highlightDates={[{ selectedDay: [pickedDate] }]}
        dayClassName={(date) =>
          date === pickedDate ? "selectedDay" : "customDay"
        }
      />
    </div>
  );
};

export default DatePicker;
