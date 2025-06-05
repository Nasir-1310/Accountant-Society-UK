"use client";

import { useState } from "react";

interface SearchParams {
  name: string;
  location: string;
  area: string;
}

interface FindAccountantFormProps {
  onSearch: (params: SearchParams) => void;
}

export default function FindAccountantForm({ onSearch }: FindAccountantFormProps) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ name, location, area });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl mx-auto mt-10 space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Find an Accountant</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="location" className="block font-medium text-gray-700 mb-1">
            Postcode or City/Town
          </label>
          <input
            id="location"
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="area" className="block font-medium text-gray-700 mb-1">
            Area of Accountants
          </label>
          <input
            id="area"
            type="text"
            placeholder="e.g. Tax, Audit"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-2 rounded font-semibold hover:bg-blue-900 transition duration-300"
        >
          Search
        </button>
      </div>
    </form>
  );
}
