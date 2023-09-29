"use client";

import { useRef, useState } from "react";

import { useRouter } from "next/navigation";

import {
  ChevronLeftIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";

const SearchBarSm: React.FC = () => {
  const [isSearchActive, setIsSearchActive] = useState<boolean>(false);

  const router = useRouter();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = () => {
    const term = searchInputRef?.current?.value;

    if (term) {
      router.push("/search-results?term=" + term);
    }
  };

  return (
    <>
      {isSearchActive ? (
        <div className="w-screen h-[5rem] z-20 fixed top-0 right-0 flex justify-between p-3 bg-1 dark:text-slate-300">
          <MagnifyingGlassIcon
            className="w-8 cursor-pointer"
            onClick={handleSearch}
          />
          <input
            ref={searchInputRef}
            className="w-4/5 bg-transparent focus:outline-0"
            type="text"
          />
          <ChevronLeftIcon
            className="w-8 cursor-pointer"
            onClick={() => setIsSearchActive(false)}
          />
        </div>
      ) : (
        <div
          className="p-2 bg-3 rounded-full cursor-pointer"
          onClick={() => setIsSearchActive(true)}
        >
          <MagnifyingGlassIcon className="w-4" />
        </div>
      )}
    </>
  );
};

export default SearchBarSm;
