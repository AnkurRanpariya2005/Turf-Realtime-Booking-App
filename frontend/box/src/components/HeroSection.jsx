import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function HeroSection() {
    const [location, setLocation] = useState();
    const navigate = useNavigate();

    const handleSearch = () => {
        if (location.trim()) {
        navigate(`/turfs?location=${location}`);
        }
    }

    return (
        <div>


            <div className="flex flex-col items-center justify-center w-auto h-96 m-1 p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-900">
                <h5 className="mb-2 text-5xl font-bold text-gray-900 dark:text-white">Book Your Turf Today!</h5>
                <p className="mb-5 text-base text-gray-500 sm:text-xl dark:text-gray-200">Find the best box cricket turfs near you and book them instantly.</p>
                <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
                    <div className="mt-6 flex flex-col sm:flex-row w-full sm:w-auto">
                        <input
                            type="text"
                            placeholder="Enter location"
                            //   value={location}
                            onChange={(e)=>setLocation(e.target.value)}
                            className="px-6 py-3 rounded-l-lg w-full sm:w-96 bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0 sm:mr-2"
                        />
                        <button onClick={handleSearch} className="px-8 py-3 bg-blue-800 text-black rounded-r-lg hover:bg-blue-400 transition-all w-full sm:w-auto">
                            {/* <SearchIcon className="h-5 w-5 inline-block mr-2" /> */}
                            Search
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default HeroSection