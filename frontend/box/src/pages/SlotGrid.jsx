import React, { useEffect } from "react";
import "./SlotGrid.css";

import { jwtDecode } from "jwt-decode";

const SlotGrid = ({ slots, onSlotToggle, selectedSlots, userId }) => {

  function getUserIdFromToken() {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.sub; // Or the relevant property from the token
    }
    return null; // Return null if no token found
  }

  const CuserId = getUserIdFromToken();


  return (
    <div className="slot-grid">
      {Object.entries(slots).map(([timeSlot, slotData]) => {

    if (!slotData) return null; // Skip null or undefined slot data

    const { status, userId: slotUserId, currentUserId } = slotData;
        
        // console.log("SlotGrid@@@@@@@@@@@@@@@@@@@@@@@", CuserId,status,  userId, currentUserId);
        const isSelectedByCurrentUser =
          status === "SelectedCurrentUser" && currentUserId === userId;
        const isBlockedByMe =
          status === "Blocked" && (userId===currentUserId);
        const isBlockedByOtherUser =
          (status === "Blocked" && (CuserId!==currentUserId))||(status === "SelectedCurrentUser" && (CuserId!==currentUserId));
        const isAvailable = status === "Available";

        let slotClass = "";
        let isClickable = true; // Default to clickable
        
        if (isSelectedByCurrentUser) {
          slotClass = "selected"; // Selected by current user (blue)
        } else if (isBlockedByMe) {
          slotClass = "selected"; // Selected by current user (blue)
        }
        else if (isBlockedByOtherUser) {
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
