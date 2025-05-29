"use client";

import { FaPen } from "react-icons/fa";

const FindAccountant = () => {
  return (
    <div
      className="
        bg-teal-500 
        sm:max-w-[445px] sm:mx-8
        md:max-w-[788px] md:mx-10 
        lg:max-w-[1044px] lg:mx-20 lg:px-[40px]
        xl:max-w-[1460px] xl:mx-[100px] xl:px-[50px]
        2xl:max-w-[2580px] 2xl:mx-[620px] 2xl:px-[60px]
        py-6
      "
    >
      <div className="w-full px-3 mx-auto">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Title Section */}
          <div className="flex items-center gap-2 text-white font-semibold text-lg sm:text-xl lg:text-2xl whitespace-nowrap">
            <FaPen className="text-white text-base lg:text-lg" />
            <span>Find an Accountant</span>
          </div>

          {/* Input Group */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 lg:gap-5 w-full lg:w-auto">
            {/* Postcode Input */}
            <input
              type="text"
              placeholder="Postcode"
              className="
                flex-1 min-w-[140px] max-w-full 
                px-3 py-2 rounded-md 
                text-sm sm:text-base 
                border border-gray-300 
                focus:outline-none focus:ring-2 focus:ring-white
                transition-all duration-200
              "
            />

            {/* Area of Law Dropdown */}
            <select
              defaultValue=""
              className="
                flex-1 min-w-[160px] max-w-full 
                px-3 py-2 rounded-md 
                text-sm sm:text-base 
                border border-gray-300 
                bg-white text-black
                focus:outline-none focus:ring-2 focus:ring-white
                hover:border-teal-600 hover:ring-teal-700
                transition-all duration-200
              "
            >
              <option value="" disabled>
                Choose an area of Accountant...
              </option>
              <option value="family">Family</option>
              <option value="criminal">Criminal</option>
              <option value="property">Property</option>
              <option value="corporate">Corporate</option>
            </select>

            {/* Search Button */}
            <button
              className="
                px-4 lg:px-6 py-2 
                text-sm sm:text-base 
                bg-transparent border border-white 
                text-white rounded 
                hover:bg-white hover:text-teal-600 
                transition-all duration-200
                whitespace-nowrap
              "
            >
              Search for an Accountant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindAccountant;
