import React, { useEffect, useState } from 'react'


import { API_BASE_URL } from '../../config/api';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserMyBooking() {

    const [booking, setBooking] = useState([]);
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get(`${API_BASE_URL}/api/user/my-booking`,{headers})
            if(response){
                console.log(response)
                setBooking(response.data)
            }
        }
        
        fetchData();
        
        
    },[])
    return (
        <>
 
            
            <div className='bg-gray-700 mt-16 flex flex-col items-center justify-center min-h-screen min-w-full max-w-sm mx-auto text-gray-200'>

       

       

                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                            My Appointment
                        </caption>
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Venue Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Booking Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Booking Time
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    User Phone
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {booking.map((item, index)=>(
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                   {item.id}
                                </th>
                                <td className="px-6 py-4">
                                    {item.venue.name}
                                </td>
                                <td className="px-6 py-4">
                                    {item.date}
                                </td>
                                <td className="px-6 py-4">
                                    {item.slot}
                                </td>
                                <td className="px-6 py-4">
                                    {item.user.phone}
                                </td>
                                <td className="px-6 py-4 text-right bg-red-500 text-white">
                                    <Link to="#" className="font-medium rounded-lg bg-red-500 text-white dark:text-white hover:underline">Cancle</Link>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </>
    )
}

export default UserMyBooking