import React from 'react'
import Navbar1 from '../components/Navbar1'
import HeroSection from '../components/HeroSection'

function Home1() {
  return (
    <div className='bg-gray-900'>
        
         <HeroSection/>
         
      {/* Features Section */}
      <section className="py-16 bg-gray-900" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-100">Why Choose Us?</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-100">Real-Time Booking</h3>
              <p className="mt-4 text-gray-300">Book turfs instantly and get real-time availability updates.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-100">Multiple Turf Options</h3>
              <p className="mt-4 text-gray-300">Choose from a variety of box cricket turfs based on your preferences.</p>
            </div>
            <div className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold text-gray-100">Secure Payment</h3>
              <p className="mt-4 text-gray-300">Safe and easy payment options to confirm your booking.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Turf Owner Section */}
      <section className="py-16 m-2 rounded-lg bg-gray-800" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-200">Are You a Turf Owner?</h2>
          <p className="mt-4 text-gray-600">Add your turf and let users book it instantly. It's easy and quick!</p>
          <button className="mt-6 px-8 py-3 bg-blue-500 text-black rounded-lg hover:bg-blue-400 transition-all">
            Add a Turf
          </button>
        </div>
      </section>

      {/* Available Turfs Section */}
      <section className="py-16 m-2 rounded-lg bg-gray-800" data-aos="fade-up">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-200">Available Turfs</h2>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
              <img src="https://th.bing.com/th?id=OIP.NAVfn35ndjHq7Fcpa2om5QHaFy&w=282&h=220&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2" alt="Turf 1" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black opacity-25"></div>
              <div className="relative z-10 p-6">
                <h3 className="text-xl font-semibold text-white">Turf 1</h3>
                <p className="mt-2 text-white">Located in your area. Book now!</p>
                <button className="mt-4 px-6 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-400 transition-all">Book Now</button>
              </div>
            </div>
            {/* Repeat for other turfs */}
            <div className="relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
              <img src="https://th.bing.com/th?id=OIP.NAVfn35ndjHq7Fcpa2om5QHaFy&w=282&h=220&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2" alt="Turf 1" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black opacity-25"></div>
              <div className="relative z-10 p-6">
                <h3 className="text-xl font-semibold text-white">Turf 1</h3>
                <p className="mt-2 text-white">Located in your area. Book now!</p>
                <button className="mt-4 px-6 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-400 transition-all">Book Now</button>
              </div>
            </div>
            <div className="relative overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-xl transition-all">
              <img src="https://th.bing.com/th?id=OIP.NAVfn35ndjHq7Fcpa2om5QHaFy&w=282&h=220&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2" alt="Turf 1" className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black opacity-25"></div>
              <div className="relative z-10 p-6">
                <h3 className="text-xl font-semibold text-white">Turf 1</h3>
                <p className="mt-2 text-white">Located in your area. Book now!</p>
                <button className="mt-4 px-6 py-2 bg-orange-500 text-black rounded-lg hover:bg-orange-400 transition-all">Book Now</button>
              </div>
            </div>
            
          </div>
        </div>
        
      </section>
    </div>
  )
}

export default Home1