"use client";

import { useState } from "react";
import FindAccountantForm from "./FindAccountantsForm";
import SearchResults from "./SearchResult";

interface Accountant {
  id: number;
  name: string;
  location: string;
  area: string;
}

export default function FindAccountantWrapper() {
  const [results, setResults] = useState<Accountant[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (formData: { name: string; location: string; area: string }) => {
    setHasSearched(true);

    const mockResults: Accountant[] = [
      { id: 1, name: "John Doe", area: "Tax", location: "London" },
      { id: 2, name: "Jane Smith", area: "Audit", location: "Manchester" },
      { id: 3, name: "Alice Johnson", area: "Tax", location: "London" },
    ];

    const filteredResults = mockResults.filter(({ name, area, location }) => {
      const matchesName = formData.name
        ? name.toLowerCase().includes(formData.name.toLowerCase())
        : true;
      const matchesArea = formData.area
        ? area.toLowerCase().includes(formData.area.toLowerCase())
        : true;
      const matchesLocation = formData.location
        ? location.toLowerCase().includes(formData.location.toLowerCase())
        : true;

      return matchesName && matchesArea && matchesLocation;
    });

    setResults(filteredResults);
  };

  return (
    <div data-aos="fade-up">
      <FindAccountantForm onSearch={handleSearch} />
      <SearchResults results={results} hasSearched={hasSearched} />
    </div>
  );
}
