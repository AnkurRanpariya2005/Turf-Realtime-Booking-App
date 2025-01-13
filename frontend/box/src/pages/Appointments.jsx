import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../config/api";


const Appointment = () => {
  // const { docId } = useParams();
  const {turfId} = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);


  const [turfInfo, setTurfInfo] = useState(null);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlotTime, setSelectedSlotTime] = useState("");

  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  



  const fetchTurfInfo = async () => {
    try {
      const apiUrl = `${API_BASE_URL}/api/user/venue/${turfId}`;
      const token = localStorage.getItem("token");
      const headers = {
        "Authorization": `Bearer ${token}`, // Use Bearer scheme for token
        "Content-Type": "application/json",
      };

      const response = await axios.get(apiUrl, {headers});
      setTurfInfo(response.data);
    }
    catch (error) {
      toast.error("Failed to add turf. Please try again.");
    };
  }

  

  const getAvailableSlots = async () => {
    try {
      const apiUrl = `${API_BASE_URL}/api/booking/slots/${turfId}/${selectedDate}`;
      const token = localStorage.getItem("token");
      const headers = {
        "Authorization": `Bearer ${token}`, // Use Bearer scheme for token
        "Content-Type": "application/json",
      };

      const response = await axios.get(apiUrl, {headers});
      setSlots(response.data);
    }
    catch (error) {
      toast.error("Failed to get Slots. Please try again.");
    };
  }

  useEffect(() => {
    // Generate the dates for today and the next 7 days
    const generateDates = () => {
      const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
      const generatedDates = [];
      const today = new Date();

      for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);

        generatedDates.push({
          day: daysOfWeek[date.getDay()],
          date: date.getDate(),
        });
      }

      setDates(generatedDates);
    };
    generateDates();
},[])

  useEffect(() => {
 
    fetchTurfInfo();
  }, [doctors, turfId]);

  useEffect(() => {
    getAvailableSlots();
  }, [selectedDate]);

  useEffect(() => {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    const blockSlots = async () => {
      try {
        const apiUrl = `${API_BASE_URL}/api/booking/block`;
        const token = localStorage.getItem("token");
        const headers = {
          "Authorization": `Bearer ${token}`, // Use Bearer scheme for token
          "Content-Type": "application/json",
        };
  
        const response = await axios.post(apiUrl,{
          userId:1,
          venueId:turfId,
          date:selectedDate,
          slot:selectedSlotTime,
        },{headers}
      );
        console.log(response)
        setSlots(response.data);
      }
      catch (error) {
        toast.error("Failed to get Slots. Please try again.");
      };
    }
    blockSlots();
    console.log(slots)
  }, [selectedSlotTime]);

  return (
    turfInfo && (
      <div>
        {/* -------- Doctor Details ------- */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div>
            <img
              className="bg-primary w-full sm:max-w-72 rounded-lg"
              src="https://v1.tailwindcss.com/img/card-top.jpg"
              alt=""
            />
          </div>
          <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* -------- Doctor Info: name, degree and experience ------- */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
              {turfInfo.name}{" "}
              <img className="w-5" src={assets.verified_icon} alt="" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              {/* <p>
                {docInfo.degree} - {docInfo.speciality}
              </p> */}
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {turfInfo.location}
              </button>
            </div>
            {/* -------- Doctor About ------- */}
            <div>
              <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
                About <img src={assets.info_icon} alt="" />
              </p>
              <p className="text-sm text-gray-500 max-w-[700px] mt-1">
                {turfInfo.dimension}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment fee:{" "}
              <span className="text-gray-600">
                {currencySymbol}
                {turfInfo.pricePerHour}
              </span>
            </p>
          </div>
        </div>

        {/* -------- Booking Slots ------- */}
        <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
          <p>Booking Slots</p>
          <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
              {/* {docSlots.length &&
                docSlots.map((item, index) => (
                  <div
                    onClick={() => setSlotIndex(index)}
                    className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                      slotIndex === index
                        ? "bg-primary text-white"
                        : "border border-gray-200"
                    }`}
                    key={index}
                  >
                    <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                    <p>{item[0] && item[0].datetime.getDate()}</p>
                  </div>
              ))} */}
              {dates.map((item, index) => (
                
                <div
                onClick={() => setSelectedDate(item.date)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
                key={index}
              >
                <div>
                  <p>{item.day}</p>
                  <p>{item.date}</p>
                </div>
                
              </div>
              ))}
          </div>
          <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
            {
              Object.entries(slots).map(([time, available], index) => (
                <p
                  onClick={() => setSelectedSlotTime(time)}
                  className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                    available==="available"
                      ? "bg-light-green-300 text-white"
                      :"text-gray-400 border border-gray-300"
                  }`}
                  key={index}
                >
                  {time}
                </p>
              ))}
          </div>
          <button className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6">
            Book an appointment
          </button>
        </div>

        {/* Listing Related Doctors */}
        {/* <RelatedDoctors docId={docId} speciality={docInfo.speciality} /> */}
      </div>
    )
  );
};

export default Appointment;
