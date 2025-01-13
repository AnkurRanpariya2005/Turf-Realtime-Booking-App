import React from "react";
import "./SlotGrid.css";

const SlotGrid = ({ slots, onSlotBlock, onSlotConfirm }) => {
  const handleSlotClick = (slot, status) => {
    if (status === "available") {
      onSlotBlock(slot);
    }
  };

  const handleConfirmClick = () => {
    Object.entries(slots).forEach(([slot, status]) => {
      if (status === "blocked") {
        onSlotConfirm(slot);
      }
    });
  };

  return (
    <div className="slot-grid">
      {Object.entries(slots).map(([timeSlot, status]) => (
        <div
          key={timeSlot}
          className={`slot ${status}`}
          onClick={() => handleSlotClick(timeSlot, status)}
        >
          {timeSlot}
        </div>
      ))}
      <button onClick={handleConfirmClick} className="confirm-button">
        Confirm Booking
      </button>
    </div>
  );
};

export default SlotGrid;
