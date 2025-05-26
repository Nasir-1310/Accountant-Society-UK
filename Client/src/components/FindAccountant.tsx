"use client";

import { FaPen } from "react-icons/fa"; // Uses react-icons
import React from "react";

const FindAccountant = () => {
  return (
    <div className="bg-teal-500 px-6 py-4 rounded-md flex flex-col md:flex-wrap md:flex-row items-center gap-4 md:gap-6 max-w-screen-xl mx-4 sm:mx-6 lg:mx-[100px] mt-0">
      {/* Icon + Label */}
      <div className="flex items-center gap-2 text-white text-lg font-semibold whitespace-nowrap">
        <FaPen className="text-white" />
        <span>Find an Accountant</span>
      </div>

      {/* Postcode Input */}
      <input
        type="text"
        placeholder="Postcode"
        className="flex-1 min-w-[200px] md:max-w-[200px] w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-700"
      />

      {/* Area of Law Dropdown */}
      <select
        className="flex-1 min-w-[200px] md:max-w-[240px] w-full px-4 py-2 rounded border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-teal-700"
        defaultValue=""
      >
        <option value="" disabled>
          Choose an area of Accountant...
        </option>
        <option value="family">Family </option>
        <option value="criminal">Criminal </option>
        <option value="property">Property </option>
        <option value="corporate">Corporate </option>
      </select>

      {/* Search Button */}
      <button className="w-full md:w-auto px-6 py-2 border border-white text-white rounded hover:bg-white hover:text-teal-600 transition">
        Search for a Accountant
      </button>
    </div>
  );
};

export default FindAccountant;
