"use client";

import { FaPen } from "react-icons/fa";
import Container from "./Container";

const FindAccountant = () => {
  return (
    <Container>
      <div className="w-full bg-white px-3">
        <div className="bg-green-500 py-4 px-4 sm:px-3 lg:px-3">
          <div className="w-full">
            {/* Title Line - Always on Top in Tablet & Mobile */}
            <div className="flex items-center gap-2 text-gray-700 font-semibold text-2xl  mb-4 lg:mb-0 lg:hidden">
              <FaPen className="text-white text-base sm:text-lg" />
              <span>Find an Accountant</span>
            </div>

            {/* Responsive Layout for Large vs Small Screens */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 w-full">
              {/* Title for Large Screens */}
              <div className="hidden  lg:flex items-center gap-2 text-gray-700 font-semibold text-xl lg:text-2xl whitespace-nowrap">
                <FaPen className="text-white text-lg" />
                <span>Find an Accountant</span>
              </div>

              {/* Inputs Group */}
              <div className="flex flex-col lg:flex-row flex-wrap gap-2 w-full lg:flex-1">
                {/* Postcode Input */}
                <input
                  type="text"
                  placeholder="Postcode"
                  className="w-full sm:w-auto flex-grow min-w-[120px] px-3 py-2 rounded-md 
                    text-sm sm:text-base border border-gray-300 
                    focus:outline-none focus:ring-2 text-gray-100 focus:ring-white transition-all duration-200"
                />

                {/* Area Dropdown */}
                <select
                  defaultValue=""
                  className="w-full sm:w-auto flex-grow min-w-[120px] px-3 py-2 rounded-md 
                    text-sm sm:text-base border border-gray-300 
                    bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-white 
                    hover:border-teal-600 hover:ring-teal-700 transition-all duration-200"
                >
                  <option value="" disabled>
                    Choose an area of Accountant...
                  </option>
                  <option value="option 01">Option 01</option>
                  <option value="option 02">Option 02</option>
                  
                </select>

                {/* Search Button */}
                <button
                  className="px-4 lg:px-6 py-2 text-sm sm:text-base 
                    bg-transparent border border-white text-gray-600 rounded bg-white
                    hover:bg-green-500 hover:text-white transition-all duration-200 whitespace-nowrap"
                >
                  Search for an Accountant
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FindAccountant;
