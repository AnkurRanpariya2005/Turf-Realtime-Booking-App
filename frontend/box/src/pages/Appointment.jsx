import React, { useState, useEffect } from "react";
import axios from "axios";
import SlotGrid from "./SlotGrid";
import DateSelector from "./DateSelector";
import "./SlotGrid.css";

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState({});
  const [selectedSlots, setSelectedSlots] = useState([]);
  const userId = localStorage.getItem("userId"); // Replace with actual user ID dynamically
  const venueId = 1; // Replace with actual venue ID dynamically

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // Fetch slots whenever the date changes
  const fetchSlots = () => {
    axios
      .get(`http://localhost:1234/api/booking/slots/${venueId}/${selectedDate}`, {
        headers,
        params: { userId },
      })
      .then((response) => setSlots(response.data))
      .catch((error) => console.error("Error fetching slots:", error));
  };

  useEffect(() => {
    if (selectedDate) {
      fetchSlots(); // Fetch initial slot status
    }
  }, [selectedDate]);

  // Refresh slots every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedDate) {
        fetchSlots(); // Fetch updated slot status
      }
    }, 5000); // Poll every 5 seconds

    return () => clearInterval(interval);
  }, [selectedDate]);

  // Handle slot toggle (select/unselect)
  const handleSlotToggle = (slot, isSelected) => {
    if (isSelected) {
      // Unblock the slot
      axios
        .post(
          "http://localhost:1234/api/booking/unblock",
          {
            venueId,
            date: selectedDate,
            slot,
            userId,
          },
          { headers }
        )
        .then(() => {
          setSelectedSlots((prev) => prev.filter((s) => s !== slot)); // Remove from selected
          fetchSlots(); // Refresh slots
        })
        .catch((error) => console.error("Error unblocking slot:", error));
    } else {
      // Block the slot
      axios
        .post(
          "http://localhost:1234/api/booking/block",
          {
            venueId,
            date: selectedDate,
            slot,
            userId,
          },
          { headers }
        )
        .then(() => {
          setSelectedSlots((prev) => [...prev, slot]); // Add to selected
          fetchSlots(); // Refresh slots
        })
        .catch((error) => console.error("Error blocking slot:", error));
    }
  };

  // Handle booking
  const bookSlots = () => {
    if (selectedSlots.length === 0) return; // Prevent booking with no slots selected

    axios
      .post("http://localhost:1234/api/booking/book", {
        venueId,
        date: selectedDate,
        slots: selectedSlots,
        userId: userId,
      }, { headers })
      .then((response) => {
        console.log("Booking Results:", response.data);
        setSelectedSlots([]); // Clear selection after booking
        fetchSlots(); // Refresh slots
      })
      .catch((error) => console.error("Error booking slots:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Box Cricket Booking</h1>
      <DateSelector setSelectedDate={setSelectedDate} />
      {selectedDate && (
        <SlotGrid
          slots={slots}
          onSlotToggle={handleSlotToggle}
          selectedSlots={selectedSlots}
          userId={userId}
        />
      )}

      <button
        onClick={bookSlots}
        disabled={selectedSlots.length === 0} // Disable button if no slots are selected
        className={selectedSlots.length === 0 ? "disabled" : ""}
      >
        Book Slots
      </button>
    </div>
  );
};

export default Appointment;
