import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import axios from 'axios';
import { API_BASE_URL } from '../../config/api';

function UserList() {
    const [users, setUsers] = useState([]);

    const token = localStorage.getItem("token");
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };

    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axios.get(`${API_BASE_URL}/admin/get/all/users`,{headers});
            setUsers(response.data.data);
            console.log(response.data.data);
        }
        fetchData();

    },[])
    return (
        <>
            <AdminSidebar />
            <div className="p-4 sm:ml-64">
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
                                    <th scope="col" className="px-6 py-3">
                                        Edit
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Delete
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                            {users.map((item, index)=>(
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
                                    <td className="px-6 py-4">
                                        <a href={item.id} type="button" data-modal-target="editUserModal" data-modal-show="editUserModal" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</a>
                                    </td>
                                    <td className="px-6 py-4">
                                        <a href={item.id} type="button"  className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete user</a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {/* <!-- Edit user modal --> */}
                        <div id="editUserModal" tabIndex="-1" aria-hidden="true" className="fixed top-0 left-0 right-0 z-50 items-center justify-center hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                            <div className="relative w-full max-w-2xl max-h-full">
                                {/* <!-- Modal content --> */}
                                <form className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                    {/* <!-- Modal header --> */}
                                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600 border-gray-200">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                            Edit user
                                        </h3>
                                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="editUserModal">
                                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                            </svg>
                                            <span className="sr-only">Close modal</span>
                                        </button>
                                    </div>
                                    {/* <!-- Modal body --> */}
                                    <div className="p-6 space-y-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                <input type="text" name="name"  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Bonnie" required="" />
                                            </div>
                                           
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                                <input type="email" name="email" id="email" className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@company.com" required="" />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                                <input type="number" name="phone"  className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. +(12)3456 789" required="" />
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    {/* <!-- Modal footer --> */}
                                    <div className="flex items-center p-6 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600">
                                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save all</button>
                                    </div>
                                </form>
                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </>
    )
}

export default UserList