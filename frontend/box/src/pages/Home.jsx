import React, { useEffect, useState } from 'react'
import Navbar1 from '../components/Navbar1'
import HeroSection from '../components/HeroSection'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'
import axios from 'axios'

function Home() {
  const[city, setCity] = useState('')
  const[venues, setVenues] = useState([]);

  const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

  useEffect(() => {
    async function getCityByIP() {
      try {
          let response = await fetch("https://ipwho.is/");
          let data = await response.json();
          
          if (data.city) {
              console.log("City (from IP):", data.city);
              setCity(data.city);
          } else {
              console.log("Failed to fetch city from IP-based service.");
          }
      } catch (error) {
          console.error("IP-based location failed:", error);
      }
  }
  
  getCityByIP();

  async function getVenues() {
    if(city){
      console.log("City@@@@:", city);
      try {
        let response = await axios.get(`${API_BASE_URL}/api/home/get/${city}`,{headers});

        console.log(response.data);
        if (response) {
            console.log("Venues:", response.data);
            setVenues(response.data);
        } else {
            console.log("Failed to fetch venues.");
        }
    } catch (error) {
        console.error("Venues fetch failed:", error);
    }
    }
    else{
      let response = await axios.get(`${API_BASE_URL}/api/home/get/top-venues`,{headers});
      setVenues(response.data);
      console.log(response,"@@@@@@");
    }
  }
  getVenues();
  
  },[])


  return (
    <div className='bg-gray-900'>
        
         <HeroSection/>
         
      {/* Features Section */}
      <section className="py-16 bg-gray-900" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-100">Why Choose Us?</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-100">Real-Time Booking</h3>
              <p className="mt-4 text-gray-300">Book turfs instantly and get real-time availability updates.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-100">Multiple Turf Options</h3>
              <p className="mt-4 text-gray-300">Choose from a variety of box cricket turfs based on your preferences.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-100">Secure Payment</h3>
              <p className="mt-4 text-gray-300">Safe and easy payment options to confirm your booking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Turf Owner Section */}
      <section className="py-16 m-2 rounded-lg bg-gray-800" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-200">Are You a Turf Owner?</h2>
          <p className="mt-4 text-gray-600">Add your turf and let users book it instantly. It's easy and quick!</p>
          <Link to="/owner-register" >
          <button className="mt-6 px-8 py-3 bg-blue-500 text-black rounded-lg hover:bg-blue-400 transition-all">
            Add Turf
          </button>
          </Link>
        </div>
      </section>

      {/* Available Turfs Section */}
      <section className="py-16 m-2 rounded-lg bg-gray-800" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-200">Available Turfs</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            
            {/* Repeat for other turfs */}
            {venues.map((item, index) => (
            <div key={index} className="relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
              <img src={item.imageUrl} alt="Turf 1" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black opacity-25"></div>
              <div className="relative z-10 p-6">
                <h3 className="text-xl font-semibold text-white">{item.name}</h3>
                <p className="mt-2 text-white">Located in your {item.location}. Book now!</p>
                <button className="mt-4 px-6 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-400 transition-all">Book Now {item.id}</button>
              </div>
            </div>
          ))}
            
          </div>
        </div>
        
      </section>
    </div>
  )
}

export default Home