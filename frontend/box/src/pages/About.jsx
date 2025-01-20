import React from "react";

const About = () => {
  return (
    <div className="mt-16 bg-gray-900 text-gray-200 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>
        <p className="text-lg leading-7 text-center max-w-3xl mx-auto mb-10">
          Welcome to our platform! We are dedicated to connecting sports enthusiasts with the best turfs and box cricket facilities in town. Whether you're here to book a match with friends or add your turf to our platform, we are here to make your experience seamless and enjoyable.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              To provide a hassle-free booking experience and empower turf owners to manage their bookings efficiently.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p>
              To be the leading platform for sports enthusiasts, promoting an active and healthy lifestyle.
            </p>
          </div>
          <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc list-inside">
              <li>Transparency</li>
              <li>Innovation</li>
              <li>Community Building</li>
              <li>Excellence</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
