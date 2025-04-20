import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";


import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";


import UserRegister from "./pages/UserRegister";
import OwnerRegister from "./pages/OwnerRegister";
import UserRouter from "./UserRouter";
import OwnerRouter from "./OwnerRouter";

import { useSelector } from "react-redux";

import UserDashboard from "./components/UserDashboard";
import { jwtDecode } from "jwt-decode"
import OwnerHome from "./pages/Owner/OwnerHome";
import AddTurf from "./pages/Owner/AddTurf";
import Turfs from "./pages/Turfs";
import Home from "./pages/Home";
import Navbar1 from "./components/Navbar";
;
import MyBooking from "./pages/Owner/MyBooking";
import UserMyBooking from "./pages/User/UserMyBooking";

import MyVenues from "./pages/Owner/MyVenues";
import Pricing from "./pages/Pricing";

import UserList from "./pages/Admin/UserList";
import OwnerList from "./pages/Admin/OwnerList";
import PlanList from "./pages/Admin/PlanList";
import VenueList from "./pages/Admin/VenueList";
import PaymentSuccess from "./pages/PaymentSuccess";
import Appointment from "./pages/Appointment";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRouter from "./AdminRouter";
import BookingList from "./pages/Admin/BookingList";


const App = () => {
  const { token } = useSelector((state) => state.auth);

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
      <Navbar1 />
      <div className="">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/owner-register" element={<OwnerRegister />} />
          <Route path="/" element={<Home />} index />
          <Route path="/pricing" element={<Pricing />} index />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />

          {role === "OWNER" ? (
            <Route element={<OwnerRouter />}>
              <Route path="/dashboard" element={<OwnerHome />}></Route>
              <Route path="/add/turf" element={<AddTurf />}></Route>
              <Route path="/my-venues" element={<MyVenues />}></Route>
              <Route path="/my-profile" element={<MyProfile />} />
              <Route path="/my-venues/my-bookings/:venueId" element={<MyBooking />}></Route>
            </Route>

          ) : (role === "ADMIN" ? (
            <Route element={<AdminRouter />}>
              <Route path="/dashboard" element={<AdminDashboard />}></Route>
              <Route path="/admin-bookings" element={<BookingList />}></Route>
              <Route path="/admin-users" element={<UserList />}></Route>
              <Route path="/admin-owners" element={<OwnerList />}></Route>
              <Route path="/admin-plans" element={<PlanList />}></Route>
              <Route path="/admin-venues" element={<VenueList />}></Route>
            </Route>
          ) : (
            <Route element={<UserRouter />}>
              <Route path="/dashboard" element={<UserDashboard />}></Route>
              <Route path="/my-booking" element={<UserMyBooking />}></Route>
              <Route path="/turfs" element={<Turfs />} />
              <Route path="/appointment/:turfId" element={<Appointment />} />
            </Route>
          ))}

        </Routes>
      </div>
    </div>
  );
};

export default App;
