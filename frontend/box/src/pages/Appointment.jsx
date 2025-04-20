import { useParams } from "react-router-dom";

import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { toast } from "react-toastify";

import React from 'react'
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from "axios";
import { format } from 'date-fns';
import SlotGrid from './SlotGrid';
import {jwtDecode} from "jwt-decode";

import { API_BASE_URL } from "../config/api";

function Appointment() {
  const [turfDetails, setTurfDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [slots, setSlots] = useState([])
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [loading, setLoading]=useState(false)
  const { turfId } = useParams();
  

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  const handlePayment = async () => {
  
    try {
        const numberOfSlot = selectedSlots.length;
        const formattedDate = format(selectedDate, 'yyyy-MM-dd')
        const price = turfDetails.pricePerHour*numberOfSlot * 100;
        const response = await axios.post("http://localhost:1234/api/payment/create-checkout-session", {
            currency: "INR",
            amount: price, // Convert ₹1000 to paisa
            successUrl: `http://localhost:5173/payment-success?venueId=${turfId}&date=${formattedDate}&slots=${JSON.stringify(selectedSlots)}`,
            cancelUrl: "http://localhost:5173/",
        });

        if (response.data.url) {
            window.location.href = response.data.url; // Redirect to Stripe Checkout
        }
    } catch (error) {
        
        console.error("Payment Error:", error);
    }
    setLoading(false);
};

const socket = new SockJS(`${API_BASE_URL}/ws`);
const stompClient = Stomp.over(socket);

useEffect(() => {
  stompClient.connect({}, () => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    stompClient.subscribe(`/topic/slots/${turfId}/${formattedDate}`, (message) => {
      const slotUpdate = JSON.parse(message.body);
      console.log("Slot update received:", slotUpdate);

      // // Update the slot status in the state
      fetchSlots();
    });
  });

  return () => {
    if (stompClient.connected) {
      stompClient.disconnect();
    }
  };
},[])

  useEffect(() => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd');
    stompClient.connect({}, () => {
      const subscription = stompClient.subscribe(`/topic/slots/${turfId}/${formattedDate}`, (message) => {
        const updatedSlots = JSON.parse(message.body);
                console.log("Slot updates received:", updatedSlots);
                setSlots(updatedSlots);

      });
      // Return a cleanup function to unsubscribe when the component unmounts or the date changes
    return () => {
      if (subscription) {
        subscription.unsubscribe(); // Unsubscribe from the WebSocket topic
      }
    };
      
    });

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect(); // Disconnect the WebSocket
      }
    };

    
            

}, [turfId, selectedDate]);




  useEffect(()=>{
    const fetchData = async() =>{
      const response = await axios.get(`${API_BASE_URL}/api/user/venue/${turfId}`, {headers});
      console.log(response)
      if(response){
        setTurfDetails(response.data);
      }
    }
    console.log(turfDetails,"#$$$$$$$$$$$$$$$$$$");
    fetchData();
  },[])


  function getUserIdFromToken() {
    const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.sub; // Or the relevant property from the token
    }
    return null; // Return null if no token found
  }

  const userId = getUserIdFromToken();
  




  // Fetch slots whenever the date changes
  const fetchSlots = async() => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd')
    console.log("sad" + formattedDate)
    await axios
      .get(`${API_BASE_URL}/api/booking/slots/${turfId}/${formattedDate}`, {
        headers,
        params: { userId },
      })
      .then((response) => setSlots(response.data))
      .catch((error) => console.error("Error fetching slots:", error));
      console.log(slots, "@@@@@@@@")
  };

  useEffect(() => {
    if (selectedDate) {
      fetchSlots(); // Fetch initial slot status
      
    }
  }, [selectedDate]);


  // useEffect(() => {
  //   // Fetch turf details (mocked for now)
  //   setTurfDetails({
  //     id: 1,
  //     name: 'Green Field Turf',
  //     location: 'Downtown City',
  //     price: 500,
  //     image: 'https://flowbite.com/docs/images/products/apple-watch.png',
  //     description: 'Green Field Turf offers a high-quality playing surface perfect for cricket enthusiasts. Located in the heart of the city, it features ample parking, floodlights, and refreshments.',
  //     amenities: ['Floodlights', 'Parking', 'Refreshments', 'Changing Rooms'],
  //   });

  //   // Fetch available time slots from backend (mocked for now)
  //   setTimeSlots([
  //     '9:00 AM - 10:00 AM',
  //     '10:00 AM - 11:00 AM',
  //     '11:00 AM - 12:00 PM',
  //     '2:00 PM - 3:00 PM',
  //     '3:00 PM - 4:00 PM',
  //   ]);
  // }, []);

  // Handle slot toggle (select/unselect)
  const handleSlotToggle = async(slot, isSelected) => {
    const formattedDate = format(selectedDate, 'yyyy-MM-dd')
    if (isSelected) {
      // Unblock the slot
      await axios
        .post(
          `${API_BASE_URL}/api/booking/unblock`,
          {
            venueId:turfId,
            date: formattedDate,
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
      await axios
        .post(
          `${API_BASE_URL}/api/booking/block`,
          {
            venueId:turfId,
            date: formattedDate,
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
  const handleBooking = () => {
    if (!selectedSlots) {
      alert('Please select a time slot.');
      return;
    }
    alert(`Booking confirmed for ${selectedDate.toDateString()} at ${selectedSlots}`);
  };

  if (!turfDetails) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }



    // Handle booking
    const bookSlots = () => {
      console.log(selectedSlots)
      const formattedDate = format(selectedDate, 'yyyy-MM-dd')
      if (selectedSlots.length === 0) return; // Prevent booking with no slots selected

      axios
        .post(`${API_BASE_URL}/api/booking/book`, {
          venueId:turfId,
          date: formattedDate,
          slots: selectedSlots,
          userId: userId,
        }, { headers })
        .then((response) => {
          console.log("Booking Results:", response.data);
          toast.success("Booked Successfully")
          setSelectedSlots([]); // Clear selection after booking
        })
        .catch((error) => console.error("Error booking slots:", error));
    };
  

  return (
    <div className="mt-12 w-auto bg-gray-900 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Image Section */}
          <div className="lg:w-1/2">
            <img
              src={turfDetails.imageUrl}
             
              className="w-full h-80 object-cover border border-gray-800  rounded-lg shadow-lg"
            />

            {/* Rating */}

            <div className='mt-12 flex flex-col '>
              <h1 className='text-gray-200 text-4xl font-bold'>Rating</h1>
              <div className="mt-5 w-screen flex items-center mb-2">

                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
              </div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
              <div className="flex items-center mt-4">
                <a href="#" className="text-sm font-medium text-blue-800 dark:text-blue-500 hover:underline">5 star</a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-300 rounded" style={{ width: "70%" }}></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
              </div>
              <div className="flex items-center mt-4">
                <a href="#" className="text-sm font-medium text-blue-800 dark:text-blue-500 hover:underline">4 star</a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-300 rounded" style={{ width: "17%" }}></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">17%</span>
              </div>
              <div className="flex items-center mt-4">
                <a href="#" className="text-sm font-medium text-blue-800 dark:text-blue-500 hover:underline">3 star</a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-300 rounded" style={{ width: "8%" }}></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">8%</span>
              </div>
              <div className="flex items-center mt-4">
                <a href="#" className="text-sm font-medium text-blue-800 dark:text-blue-500 hover:underline">2 star</a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-300 rounded" style={{ width: "4%" }}></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">4%</span>
              </div>
              <div className="flex items-center mt-4">
                <a href="#" className="text-sm font-medium text-blue-800 dark:text-blue-500 hover:underline">1 star</a>
                <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                  <div className="h-5 bg-yellow-300 rounded" style={{ width: "1%" }}></div>
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">1%</span>
              </div>
            </div>

            {/* userReview */}


            <article>
              <div className="mt-10 flex items-center mb-4">
                <img className="w-10 h-10 me-4 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="" />
                <div className="font-medium dark:text-white">
                  <p>Jese Leos <time dateTime="2014-08-16 19:00" className="block text-sm text-gray-500 dark:text-gray-400">Joined on August 2014</time></p>
                </div>
              </div>
              <div className="flex items-center mb-1 space-x-1 rtl:space-x-reverse">
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <h3 className="ms-2 text-sm font-semibold text-gray-900 dark:text-white">Thinking to buy another one!</h3>
              </div>
              <footer className="mb-5 text-sm text-gray-500 dark:text-gray-400"><p>Reviewed in the United Kingdom on <time dateTime="2017-03-03 19:00">March 3, 2017</time></p></footer>
              <p className="mb-2 text-gray-500 dark:text-gray-400">This is my third Invicta Pro Diver. They are just fantastic value for money. This one arrived yesterday and the first thing I did was set the time, popped on an identical strap from another Invicta and went in the shower with it to test the waterproofing.... No problems.</p>
              <p className="mb-3 text-gray-500 dark:text-gray-400">It is obviously not the same build quality as those very expensive watches. But that is like comparing a Citroën to a Ferrari. This watch was well under £100! An absolute bargain.</p>
              <a href="#" className="block mb-5 text-sm font-medium text-blue-800 hover:underline dark:text-blue-500">Read more</a>
              <aside>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">19 people found this helpful</p>
                <div className="flex items-center mt-3">
                  <a href="#" className="px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-800 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Helpful</a>
                  <a href="#" className="ps-4 text-sm font-medium text-blue-800 hover:underline dark:text-blue-500 border-gray-200 ms-4 border-s md:mb-0 dark:border-gray-600">Report abuse</a>
                </div>
              </aside>
            </article>

            {/* endreview */}

          </div>


          {/* Details Section */}
          <div className="lg:w-1/2 border border-gray-800 p-5">
            <h1 className="text-3xl font-bold text-gray-200 mb-4">{turfDetails.name}</h1>
            <p className="text-gray-300 mb-4">{turfDetails.location}</p>
            <p className="text-lg text-green-500 font-bold mb-6">₹{turfDetails.pricePerHour} per hour</p>
            {/* <p className="text-gray-400 mb-6">{turfDetails.description}</p> */}

            <h2 className="text-xl font-semibold text-gray-400 mb-4">Amenities</h2>
            {/* <ul className="list-disc list-inside text-gray-400 mb-6">
              {turfDetails.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul> */}

            <h2 className="text-xl font-semibold text-gray-300 mb-4">Select Date</h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              className="w-full px-4 py-2 bg-gray-800 text-gray-300 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />

            {selectedDate && <>
              <h2 className="text-xl font-semibold text-gray-300 mt-6 mb-4">Available Time Slots</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <SlotGrid
                  slots={slots}
                  onSlotToggle={handleSlotToggle}
                  selectedSlots={selectedSlots}
                  userId={userId}
                />

              </div></>
            }
            <center>
           {/* <button
              onClick={bookSlots}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-400 transition-all"
            >
              Book Now
            </button> */}

            <button
                onClick={handlePayment}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                disabled={loading}
            >
                payment
            </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appointment