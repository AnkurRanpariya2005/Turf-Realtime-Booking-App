import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

function OwnerList() {
    const [owners, setOwners] = useState([]);

    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${API_BASE_URL}/api/admin/get/all/owners`, { headers });
            setOwners(response.data.data);
            console.log(response.data.data);
        }
        fetchData();

    }, [])
    return (
        <div className="flex">
            <AdminSidebar /><div className="p-4 sm:ml-64">
                <div className="min-h-screen p-4 border-2 border-gray-200 border-dotted rounded-lg dark:border-gray-700 mt-14">
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">

                            <label htmlFor="table-search" className="sr-only">Search</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                    </svg>
                                </div>
                                <input type="text" id="table-search-users" className="ml-2 p-2 block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users" />
                            </div>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {owners.map((item, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                            <img className="w-10 h-10 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-3.jpg" alt="Jese image" />
                                            <div className="ps-3">
                                                <div className="text-base font-semibold">{item.name}</div>
                                            </div>
                                        </th>
                                        <td className="px-6 py-4">
                                            {item.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center">
                                                {item.phone}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OwnerList