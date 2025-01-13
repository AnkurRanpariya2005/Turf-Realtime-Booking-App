import React, { useState } from 'react'
import axios from 'axios'
import { API_BASE_URL } from '../../config/api'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function AddTurf() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        dimension: "",
        pricePerHour: "",
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          // Replace with your API endpoint
          const apiUrl = `${API_BASE_URL}/api/venue/add`;
          console.log(apiUrl);
          const token = localStorage.getItem("token");
          const headers = {
            "Authorization": `Bearer ${token}`, // Use Bearer scheme for token
            "Content-Type": "application/json",
          };

          console.log(headers);
          const response = await axios.post(apiUrl, formData, {headers});
          console.log("Add turf response:", response);
    
          // Success response
          
          toast.success(response.data.message);
          setFormData({
            name: "",
            location: "",
            dimensions: "",
            pricePerHour: "",
          });
          navigate("/dashboard");
        } catch (error) {
          toast.error("Failed to add turf. Please try again.");
          console.error("Error adding turf:", error);
    
        }
      };
    
  return (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
        <div className="mb-5">
            <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Turf Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Box Cricket" required />
        </div>
        <div className="mb-5">
            <label htmlFor="Location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Gandhinagar" required />
        </div>
        <div className="mb-5">
            <label htmlFor="Dimension" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Dimension</label>
            <input type="text" name="dimension" value={formData.dimension} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="22 x 23 x 75 foot" required />
        </div>
        <div className="mb-5">
            <label htmlFor="Price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price per Hours</label>
            <input type="text" name="pricePerHour" value={formData.pricePerHour} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="600" required />
        </div>
        
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Turf</button>
        </form>

  )
}

export default AddTurf