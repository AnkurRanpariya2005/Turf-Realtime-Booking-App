import { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react"; // Ensure correct import
import { FaUsers, FaStore, FaMoneyBillWave } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  const token = localStorage.getItem("token");
  const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/stats`, {headers})
        setStats(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData();
  }, []);


  return (
    <div className="flex">
      <AdminSidebar />
      <div className="min-h-screen w-screen bg-gray-100 p-6">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          Admin Dashboard
        </h2>
        {stats ? (
          <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-4 bg-white shadow-lg rounded-lg text-center">
              <h3 className="text-lg font-semibold">Total Users</h3>
              <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg text-center">
              <h3 className="text-lg font-semibold">Total Owners</h3>
              <p className="text-2xl font-bold text-green-600">{stats.totalOwners}</p>
            </div>
            <div className="p-4 bg-white shadow-lg rounded-lg text-center">
              <h3 className="text-lg font-semibold">Total Bookings</h3>
              <p className="text-2xl font-bold text-red-600">{stats.totalBookings}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading...</p>
        )}
      </div>
    </div>
  );
}