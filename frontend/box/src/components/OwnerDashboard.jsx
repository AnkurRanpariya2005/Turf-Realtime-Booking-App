import React from 'react'
import { Link } from 'react-router-dom'

function OwnerDashboard() {

    const user={role:"patient"}
  return (
    <div className="max-w-[36%] md:max-w-[25%] max-[520px]:hidden">
        <div className="flex flex-col h-screen md:h-screen items-center border-e bg-white">
          <div className="px-4 py-6">
            {/* <img
              src={logo}
              alt="patient"
              className="w-[200px] bg-slate-500 rounded-lg"
            /> */}
            <ul className="mt-6 space-y-1">
              {user.role === "patient" ? (
                <li>
                  <Link
                    to="/patient-dashboard"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-black bg-gray-100 hover:text-green-500 border-[3px] hover:border-green-400"
                  >
                    Home
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    to="/doctor-dashboard"
                    className="block rounded-lg px-4 py-2 text-sm font-medium text-black bg-gray-100 hover:text-green-500 border-[3px] hover:border-green-400"
                  >
                    Home
                  </Link>
                </li>
              )}
              <li>
                <Link
                  className="block rounded-lg px-4 py-2 text-sm font-medium text-black bg-gray-100  hover:text-purple-500 border-[3px] hover:border-purple-500 mt-5"
                  to="/logout"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default OwnerDashboard