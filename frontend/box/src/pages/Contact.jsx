import React from "react";

const Contact = () => {
  return (
    <div className="mt-16 bg-gray-900 text-gray-200 min-h-screen py-12">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Us</h1>
        <p className="text-lg leading-7 text-center max-w-3xl mx-auto mb-10">
          Have any questions or feedback? We'd love to hear from you!
        </p>
        <div className="max-w-xl mx-auto">
          <form className="bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                className="w-full px-4 py-2 bg-gray-900 text-gray-200 border border-gray-700 rounded focus:outline-none focus:border-blue-600"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-gray-200 py-2 px-4 rounded"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
