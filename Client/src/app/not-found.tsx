// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
          🚧 This page is under construction
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We're working hard to bring this page to life. Please check back later.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl text-lg hover:bg-blue-900 transition-colors duration-300"
        >
          Go back home
        </a>
      </div>
    </div>
  );
}
