import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../config/api";
import { jwtDecode } from "jwt-decode";

const PaymentSuccess = () => {
    const [searchParams] = useSearchParams();
    const venueId = searchParams.get("venueId");
    const date = searchParams.get("date");
    const slots = JSON.parse(searchParams.get("slots"));

    function getUserIdFromToken() {
        const token = localStorage.getItem("token"); // Assuming token is stored in localStorage
        if (token) {
          const decoded = jwtDecode(token);
          return decoded.sub; // Or the relevant property from the token
        }
        return null; // Return null if no token found
      }
    
      const userId = getUserIdFromToken();

      const token = localStorage.getItem("token");
        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        };

    useEffect(() => {
        const bookSlots = async () => {
            try {
                const response = await axios.post(`${API_BASE_URL}/api/booking/book`, {
                    venueId,
                    date,
                    slots,
                    userId, // Ensure userId is available
                }, { headers });

                console.log("Booking Results:", response.data);
                toast.success("Booked Successfully");
            } catch (error) {
                console.error("Error booking slots:", error);
            }
        };

        if (venueId && date && slots.length > 0) {
            bookSlots();
        }
    }, [venueId, date, slots]);

    return (
        <div className="flex h-screen w-screen bg-white justify-center items-center">
    <h1 className="text-3xl text-black">Payment Successful! Booking confirmed.</h1>
    </div>);
};

export default PaymentSuccess;
