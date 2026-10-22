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
      className="card mx-auto w-full max-w-4xl space-y-6 p-6 sm:p-8"
    >
      <h2 className="text-xl font-bold text-brand-950">Search for an accountant</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div>
          <label htmlFor="location" className="mb-1.5 block text-sm font-semibold text-slate-700">
            Postcode or City/Town
          </label>
          <input
            id="location"
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div>
          <label htmlFor="area" className="mb-1.5 block text-sm font-semibold text-slate-700">
            Area of Accountants
          </label>
          <input
            id="area"
            type="text"
            placeholder="e.g. Tax, Audit"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary px-8"
        >
          Search
        </button>
      </div>
    </form>
  );
}
