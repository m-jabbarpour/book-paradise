"use client";

import { useRef } from "react";

import { useRouter } from "next/navigation";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const SearchBarMd: React.FC = () => {
  const router = useRouter();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const term = searchInputRef?.current?.value;

    if (term) {
      router.push("/search-results?term=" + term);
    }
  };

  return (
    <div className="w-[15rem] rounded p-2 flex gap-4 bg-gray-200 dark:bg-slate-600">
      <input
        ref={searchInputRef}
        className="w-48 bg-transparent focus:outline-0"
        type="text"
      />
      <MagnifyingGlassIcon
        className="w-4 cursor-pointer"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBarMd;
