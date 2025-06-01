"use client";

import { FaPen } from "react-icons/fa";
import Container from "./Container";

const FindAccountant = () => {
  return (
    <Container>
      <div  className="w-full bg-white px-3">
        <div className="bg-green-500 py-4 px-4 sm:px-3 lg:px-3">
          <div className="w-full">
            {/* Title Line - Always on Top in Tablet & Mobile */}
            <div className="flex items-center gap-2 text-gray-700 font-semibold text-2xl  mb-4 lg:mb-0 lg:hidden">
              <FaPen className="text-white text-base sm:text-lg" />
              <span>Find an Accountant</span>
            </div>

            {/* Responsive Layout for Large vs Small Screens */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2 xl:gap-10 w-full">
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
                  className="w-full sm:w-auto flex-grow min-w-[120px] xl:max-w-[270px]  px-3 py-2 rounded-md 
                    text-sm sm:text-base border border-gray-300 
                    focus:outline-none focus:ring-2 text-gray-100 focus:ring-white transition-all duration-200"
                />

                {/* Area Dropdown */}
                <select
                  defaultValue=""
                  className="w-full sm:w-auto flex-grow min-w-[120px] xl:max-w-[270px] px-3 py-2 rounded-md 
                    text-sm sm:text-base border border-gray-300 
                    bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-white 
                    hover:border-teal-600 hover:ring-teal-700 transition-all duration-200"
                >
                  <option value="" disabled>
                    Choose an area of Accountant...
                  </option>
                  <option value="Personal Tax Return">Bookkeeping & Accounts Preparatio</option>
                  <option value="option 02">Corporation Tax Return</option>
                  <option value="option 02">Capital Gains Tax</option>
                  <option value="option 02">Inheritance Tax</option>
                  <option value="option 02">VAT & Indirect Taxes</option>
                  <option value="option 02">Self-Assessment</option>
                  <option value="option 02">Payroll Services</option>
                  <option value="option 02">Business Start-up & Advisory</option>
                  <option value="option 02">HMRC Investigations & Disputes</option>
                  <option value="option 02">R&D Tax Credits</option>
                  <option value="option 02">Tax Planning & Consultancy</option>
                  <option value="option 02">Trust & Estate Planning</option>
                  <option value="option 02">International Tax</option>
                  <option value="option 02">Transfer Pricing </option>
                  
                </select>

                {/* Search Button */}
                <button
                  className=" w-full sm:w-auto px-4 lg:px-6 py-2 text-sm sm:text-base  xs:text-xs
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
