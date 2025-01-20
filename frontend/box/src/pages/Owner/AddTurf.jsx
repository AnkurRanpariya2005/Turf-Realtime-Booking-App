import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../config/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import OwnerSidebar from "./OwnerSidebar";

function AddTurf() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false); // To track upload state
  const [uploadProgress, setUploadProgress] = useState(0);
  const navigate = useNavigate();

  const imageChangeHandler = async() => {
  

    const form = new FormData()
    form.append("file", selectedFile)
    form.append("upload_preset", "preset")

    try {
        const response = await axios.post(
            "https://api.cloudinary.com/v1_1/dbfile/image/upload",
            form,
            {
                onUploadProgress: (progressEvent) => {
                    const bytesUploaded = progressEvent.loaded;
                    const totalBytes = progressEvent.total;
                    const progress = ((bytesUploaded / totalBytes) * 100);
                    setUploadProgress(progress);
                },
            }
        );
       
        console.log("Upload successful!", response.data);
        setImageUrl(response.data.url); // Handle the response data as needed
        setUploadProgress(0);
    } catch (error) {
        console.error("Error uploading image:", error);
    }
  };

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    dimension: "",
    pricePerHour: "",
    imageUrl: "", // Add image URL to form data
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
      const apiUrl = `${API_BASE_URL}/api/venue/add`;
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.post(
        apiUrl,
        { ...formData, imageUrl }, // Include image URL in the payload
        { headers }
      );

      toast.success(response.data.message);
      setFormData({
        name: "",
        location: "",
        dimension: "",
        pricePerHour: "",
      });
      setImageUrl(""); // Reset image URL
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to add turf. Please try again.");
      console.error("Error adding turf:", error);
    } 
  };

  return (<>
  <div>
    <OwnerSidebar />
    </div>
    <div className="mt-16">
    <form onSubmit={handleSubmit} className="mt-16 ml-100 min-h-screen justify-center items-center max-w-sm mx-auto text-black">
      <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-white">Upload Image</label>
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          accept="image/*"
        />
        <button
          type="button"
          onClick={imageChangeHandler}
          disabled={!selectedFile || isUploading}
          className="mt-2 text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
        >
          {isUploading ? "Uploading..." : "Upload Image"}
        </button>
        {imageUrl && <p className="text-green-500 mt-2">Image uploaded successfully!</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
          Turf Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="bg-gray-50 border rounded-lg p-2.5 w-full"
          placeholder="Box Cricket"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="location" className="block mb-2 text-sm font-medium text-white">
          Location
        </label>
        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="bg-gray-50 border rounded-lg p-2.5 w-full"
          placeholder="Gandhinagar"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="dimension" className="block mb-2 text-sm font-medium text-white">
          Enter Dimension
        </label>
        <input
          type="text"
          name="dimension"
          value={formData.dimension}
          onChange={handleChange}
          className="bg-gray-50 border rounded-lg p-2.5 w-full"
          placeholder="22 x 23 x 75 foot"
          required
        />
      </div>

      <div className="mb-5">
        <label htmlFor="pricePerHour" className="block mb-2 text-sm font-medium text-white">
          Price per Hour
        </label>
        <input
          type="text"
          name="pricePerHour"
          value={formData.pricePerHour}
          onChange={handleChange}
          className="bg-gray-50 border rounded-lg p-2.5 w-full"
          placeholder="600"
          required
        />
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 px-5 py-2.5 rounded-lg w-full"
        disabled={!imageUrl || isUploading} // Disable until image is uploaded
      >
        Add Turf
      </button>
    </form>
    </div>
    </>
  );
}

export default AddTurf;
