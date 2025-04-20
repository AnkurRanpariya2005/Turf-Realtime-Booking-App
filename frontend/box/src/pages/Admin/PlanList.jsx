import axios from "axios";
import { useState, useEffect } from "react";
import { API_BASE_URL } from "../../config/api";
import AdminSidebar from "./AdminSidebar";

const PlanList = () => {
  const [plans, setPlans] = useState([]);
  const [editPlan, setEditPlan] = useState({});

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/admin/subscriptions`, { headers });
        console.log(response.data)
        setPlans(response.data)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData();
  }, []);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/admin/subscriptions/${editPlan.id}`, editPlan, { headers: headers })
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message)
    }

  };

  return (
    <div className="flex">
      <AdminSidebar />

      <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-center text-indigo-600">
          Manage Subscription Plans
        </h2>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {plans.map((plan) => (
            <div key={plan.id} className="p-4 bg-gray-200 rounded-lg shadow">
              <h3 className="font-bold">{plan.name}</h3>
              <p>Price: ₹{plan.price}</p>
              <p>Max Turfs: {plan.maxTurfs}</p>
              <p>Duration: {plan.duration.replace("_", " ")}</p>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
                onClick={() => setEditPlan(plan)}
              >
                Edit
              </button>
            </div>
          ))}
        </div>

        {editPlan && (
          <div className="mt-6 p-4 bg-gray-100 shadow-lg rounded-lg">
            <h3 className="text-lg font-bold">Edit Plan</h3>
            <input
              type="text"
              value={editPlan.name}
              className="w-full px-3 py-2 border rounded mt-2"
              disabled
            />
            <input
              type="number"
              placeholder="Price"
              value={editPlan.price}
              onChange={(e) =>
                setEditPlan({ ...editPlan, price: e.target.value })
              }
              className="w-full px-3 py-2 border rounded mt-2"
            />
            <input
              type="number"
              placeholder="Max Turfs"
              value={editPlan.maxTurfs}
              onChange={(e) =>
                setEditPlan({ ...editPlan, maxTurfs: e.target.value })
              }
              className="w-full px-3 py-2 border rounded mt-2"
            />
            <select
              value={editPlan.duration}
              onChange={(e) =>
                setEditPlan({ ...editPlan, duration: e.target.value })
              }
              className="w-full px-3 py-2 border rounded mt-2"
            >
              <option value="THREE_MONTHS">3 Months</option>
              <option value="SIX_MONTHS">6 Months</option>
              <option value="ONE_YEAR">1 Year</option>
            </select>
            <button
              className="bg-green-500 text-white px-4 py-2 rounded mt-4 w-full"
              onClick={handleUpdate}
            >
              Update Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanList;
