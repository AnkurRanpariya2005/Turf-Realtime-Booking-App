import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Doctors from "./pages/Turfs";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointments from "./pages/MyAppointments";
import Appointment1 from "./pages/Appointment1";
import Message from "./components/Message";
import UserRegister from "./pages/UserRegister";
import OwnerRegister from "./pages/OwnerRegister";
import UserRouter from "./UserRouter";
import OwnerRouter from "./OwnerRouter";
import Dashboard from "./components/UserDashboard";
import { useSelector } from "react-redux";
import OwnerDashboard from "./components/OwnerDashboard";
import UserDashboard from "./components/UserDashboard";
import {jwtDecode} from "jwt-decode"
import OwnerHome from "./pages/Owner/OwnerHome";
import AddTurf from "./pages/Owner/AddTurf";
import Turfs from "./pages/Turfs";
import Home from "./pages/Home";
import Navbar1 from "./components/Navbar1";
import Test from "./pages/Test";
import MyBooking from "./pages/Owner/MyBooking";
import UserMyBooking from "./pages/User/UserMyBooking";

import MyVenues from "./pages/Owner/MyVenues";
import Pricing from "./pages/Pricing";


const App = () => {
  const {token} = useSelector((state) => state.auth);
  
  const [role, setRole] = useState("");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken?.role || ""); // Fallback to an empty string if role is undefined
      } catch (error) {
        console.error("Failed to decode token:", error);
        setRole(""); // Reset role in case of an error
        
      }
    } else {
      setRole(""); // Clear role when token is unavailable
    }
  }, [token]);

  return (
   <div className="bg-gray-900">
      {/* <Navbar /> */}
      <Navbar1/>
      <div className="">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<Test />} />

        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/owner-register" element={<OwnerRegister />} />
        <Route path="/" element={<Home />} index />
        
        <Route path="/pricing" element={<Pricing />} index />


        {role==="OWNER"?(

          <Route element={<OwnerRouter />}>
            <Route path="/dashboard" element={<OwnerHome />}></Route>
            <Route path="/add/turf" element={<AddTurf />}></Route>
            <Route path="/my-venues" element={<MyVenues />}></Route>
            <Route path="/my-venues/my-bookings/:venueId" element={<MyBooking />}></Route>




          </Route>

        ):(
          <Route element={<UserRouter />}>
            <Route path="/dashboard" element={<UserDashboard />}></Route>
            <Route path="/my-booking" element={<UserMyBooking />}></Route>

          </Route>
        )}



        <Route path="/dashboard" element={<Dashboard />}></Route>

        <Route path="/turfs" element={<Turfs />} />
        <Route path="/appointment/:turfId" element={<Appointment1 />} />


        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/message" element={<Message />} />
      </Routes>
      {/* <Footer /> */}
    </div>
    </div>
  );
};

export default App;
