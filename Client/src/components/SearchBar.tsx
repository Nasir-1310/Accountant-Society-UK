"use client";
import Image from "next/image";
import Link from "next/link";

const SearchBar = () => {
  return (
    <Link href="/search" className="flex items-center gap-2 bg-gray-100 p-2 rounded-md hover:bg-gray-300 transition">
      <Image src="/search.png" alt="Search Icon" width={16} height={16} />
      <p className="text-sm font-medium">Search</p>
    </Link>
  );
};

export default SearchBar;
