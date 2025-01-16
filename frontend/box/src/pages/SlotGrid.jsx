import React from "react";
import "./SlotGrid.css";

const SlotGrid = ({ slots, onSlotToggle, selectedSlots, userId }) => {
  return (
    <div className="slot-grid">
      {Object.entries(slots).map(([timeSlot, { status, userId: slotUserId }]) => {
        const isSelectedByCurrentUser =
          status === "blocked" && slotUserId === userId;
        const isBlockedByOtherUser =
          status === "blocked" && slotUserId !== userId;
        const isAvailable = status === "available";

        let slotClass = "";
        let isClickable = true; // Default to clickable

        if (isSelectedByCurrentUser) {
          slotClass = "selected"; // Selected by current user (blue)
        } else if (isBlockedByOtherUser) {
          slotClass = "blocked"; // Blocked by another user (gray)
          isClickable = false; // Not clickable if blocked by another user
        } else if (isAvailable) {
          slotClass = "available"; // Available (green)
        }

        return (
          <div
            key={timeSlot}
            className={`slot ${slotClass}`}
            onClick={() => {
              // Allow toggling only if it's clickable
              if (isClickable) {
                const isSelected = selectedSlots.includes(timeSlot);
                onSlotToggle(timeSlot, isSelected);
              }
            }}
            style={{
              cursor:
                isClickable && !isSelectedByCurrentUser ? "pointer" : "not-allowed",
            }}
          >
            {timeSlot}
          </div>
        );
      })}
    </div>
  );
};

export default SlotGrid;
