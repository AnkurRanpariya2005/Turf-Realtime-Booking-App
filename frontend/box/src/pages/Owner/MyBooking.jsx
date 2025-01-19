import React, { useEffect, useState } from 'react'
import OwnerSidebar from './OwnerSidebar'
import { useParams } from 'react-router-dom'
import { API_BASE_URL } from '../../config/api';
import axios from 'axios';

function MyBooking() {
    const {venueId} = useParams();
    const [booking, setBooking] = useState([]);

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get(`${API_BASE_URL}/api/booking/my-booking?venueId=${venueId}`)
            if(response){
                setBooking(response.data)
            }
        }
        
        fetchData();
        
        
    },[])
    return (
        <>
            <OwnerSidebar />

            
            <div className='bg-gray-700 mt-16 flex flex-col items-center justify-center min-h-screen min-w-full max-w-sm mx-auto text-gray-200'>

       

       

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <caption class="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                            Our products
                            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Flowbite products designed to help you work and play, stay organized, get answers, keep in touch, grow your business, and more.</p>
                        </caption>
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Id
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Venue Name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Booking Date
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Booking Time
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    User Phone
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    <span class="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                        {booking.map((item, index)=>(
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                   {item.id}
                                </th>
                                <td class="px-6 py-4">
                                    {item.venue.name}
                                </td>
                                <td class="px-6 py-4">
                                    {item.date}
                                </td>
                                <td class="px-6 py-4">
                                    {item.slot}
                                </td>
                                <td class="px-6 py-4">
                                    {item.user.phone}
                                </td>
                                <td class="px-6 py-4 text-right">
                                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
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

export default MyBooking