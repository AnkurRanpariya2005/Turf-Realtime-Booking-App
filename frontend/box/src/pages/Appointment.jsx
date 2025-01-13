import React, { useState, useEffect } from "react";
import axios from "axios";
import SlotGrid from "./SlotGrid";
import DateSelector from "./DateSelector";


const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState({});
  const userId = 42; // Replace with actual user ID
  const venueId = 1; // Replace with actual venue ID

  const token = localStorage.getItem("token");
  const headers = {
    "Authorization": `Bearer ${token}`, // Use Bearer scheme for token
    "Content-Type": "application/json",
  };

  // Fetch slots whenever the date changes

  useEffect(() => {
    const fetchSlots = () => {
      axios
        .get(`http://localhost:1234/api/booking/slots/1/${selectedDate}`,{headers})
        .then((response) => setSlots(response.data))
        .catch((error) => console.error(error));
    };
  
    const interval = setInterval(() => {
      if (selectedDate) {
        fetchSlots(); // Fetch updated slot status
      }
    }, 5000); // Poll every 5 seconds
  
    return () => clearInterval(interval);
  }, [selectedDate]);
  

  // Periodic polling to refresh slot status
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedDate) {
        fetchSlots();
      }
    }, 5000); // Poll every 5 seconds
    return () => clearInterval(interval);
  }, [selectedDate]);

  // Fetch slots from the backend
  const fetchSlots = () => {
    axios
      .get(`http://localhost:1234/api/booking/slots/${venueId}/${selectedDate}`, {headers})
      .then((response) => setSlots(response.data))
      .catch((error) => console.error("Error fetching slots:", error));
  };

  // Block a slot
  const handleSlotBlock = (slot) => {
    axios
      .post("http://localhost:1234/api/booking/block", {
        venueId,
        date: selectedDate,
        slot,
        userId,
      }, {headers})
      .then(() => fetchSlots())
      .catch((error) => console.error("Error blocking slot:", error));
  };

  // Confirm a booking
  const handleSlotConfirm = (slot) => {
    axios
      .post("http://localhost:1234/api/booking/confirm", {
        venueId,
        date: selectedDate,
        slot,
        userId,
      }, {headers})
      .then(() => fetchSlots())
      .catch((error) => console.error("Error confirming slot:", error));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Box Cricket Booking</h1>
      <DateSelector setSelectedDate={setSelectedDate} />
      {selectedDate && (
        <SlotGrid
          slots={slots}
          onSlotBlock={handleSlotBlock}
          onSlotConfirm={handleSlotConfirm}
        />
      )}
    </div>
  );
};

export default Appointment;
