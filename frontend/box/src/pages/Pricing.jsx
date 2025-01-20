import React from "react";

const Pricing = () => {
  return (
    <div className="mt-16 bg-gray-900 text-gray-200 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Pricing Plans</h1>
        <p className="text-lg leading-7 text-center max-w-3xl mx-auto mb-10">
          Choose a plan that fits your needs. Whether you're a casual player or a regular, we have something for everyone.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Basic</h2>
            <p className="text-xl font-bold mb-4">$10 per match</p>
            <ul className="list-disc list-inside mb-6">
              <li>1-hour booking</li>
              <li>Standard facilities</li>
              <li>Real-time updates</li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-gray-200 py-2 px-4 rounded">
              Get Started
            </button>
          </div>
          {/* Premium Plan */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Premium</h2>
            <p className="text-xl font-bold mb-4">$25 per match</p>
            <ul className="list-disc list-inside mb-6">
              <li>2-hour booking</li>
              <li>Advanced facilities</li>
              <li>Priority support</li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-gray-200 py-2 px-4 rounded">
              Get Started
            </button>
          </div>
          {/* Pro Plan */}
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <h2 className="text-2xl font-semibold mb-4">Pro</h2>
            <p className="text-xl font-bold mb-4">$50 per match</p>
            <ul className="list-disc list-inside mb-6">
              <li>4-hour booking</li>
              <li>Premium facilities</li>
              <li>Dedicated support</li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-700 text-gray-200 py-2 px-4 rounded">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
