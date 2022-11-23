import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./datepicker.scss";
import moment from "moment";

const Datepicker = ({date,setDate}) => {
  const [initial, setInitial] = useState(true);
  const [pickedDate, setPickedDate] = useState(new Date());

  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <div className="datepickerInput" onClick={onClick} ref={ref}>
      {initial ? (
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
      ) : (
        `${pickedDate.getDate()}/${pickedDate.getMonth()}/${pickedDate.getFullYear()}`
      )}
    </div>
  ));

  return (
    <div className="datepickerWrapper">
      <DatePicker
        selected={pickedDate}
        startDate={pickedDate}
        customInput={<CustomInput />}
        onChange={(date) => {
          setInitial(false);
          setPickedDate(date);
          setDate(moment(date).format('YYYY-MM-DD'))
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

export default Datepicker;
