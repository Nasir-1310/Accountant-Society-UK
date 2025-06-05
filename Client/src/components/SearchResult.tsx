interface Accountant {
  id: number;
  name: string;
  location: string;
  area: string;
}

interface SearchResultsProps {
  results: Accountant[];
  hasSearched: boolean;
}

export default function SearchResults({ results, hasSearched }: SearchResultsProps) {
  // Before user searches, show nothing
  if (!hasSearched) return null;

  // If searched but no results, show no results message
  if (results.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-10">
        No accountants found. Try different criteria.
      </div>
    );
  }

  // Otherwise show list of accountants found
  return (
    <div className="mt-10 w-full max-w-4xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Search Results</h3>
      {/* <div className="grid gap-4">
        {results.map((acc) => (
          <div
            key={acc.id}
            className="border rounded-md p-4 shadow-sm bg-white hover:shadow-lg transition"
          >
            <h4 className="text-lg font-bold text-blue-700">{acc.name}</h4>
            <p className="text-sm text-gray-600">{acc.location}</p>
            <p className="text-sm text-gray-600 italic">{acc.area}</p>
          </div>
        ))}
      </div> */}
       <div className="text-center text-gray-500 mt-10">
        No accountants found. Try different criteria.
      </div>
    </div>
  );
}
