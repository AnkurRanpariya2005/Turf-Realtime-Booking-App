import React from "react";

const DateSelector = ({ setSelectedDate }) => {
  return (
    <div>
      <label>Select Date: </label>
      <input
        type="date"
        onChange={(e) => setSelectedDate(e.target.value)}
      />
    </div>
  );
};

export default DateSelector;
