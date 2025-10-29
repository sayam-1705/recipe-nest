"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchBarProps {
  isMobile?: boolean;
  onSearch?: () => void;
}

const SearchBar = ({ isMobile = false, onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      if (!isMobile) {
        setIsExpanded(false);
      }
      // Call the onSearch callback to close mobile menu or dropdown
      onSearch?.();
    }
  };

  if (isMobile) {
    return (
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes..."
            className="w-full px-3 xs:px-4 py-2 pl-9 xs:pl-10 pr-3 xs:pr-4 text-sm xs:text-base text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent transition-all duration-200"
          />
          <svg
            className="absolute left-2.5 xs:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 xs:w-5 xs:h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <div className="flex items-center">
        {isExpanded ? (
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => {
                if (!searchQuery) {
                  setTimeout(() => setIsExpanded(false), 200);
                }
              }}
              placeholder="Search recipes..."
              className="w-40 xs:w-48 sm:w-56 md:w-64 lg:w-72 px-3 xs:px-4 py-1.5 xs:py-2 pl-8 xs:pl-10 pr-3 xs:pr-4 text-xs xs:text-sm text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange focus:border-transparent transition-all duration-200"
            />
            <svg
              className="absolute left-2.5 xs:left-3 top-1/2 transform -translate-y-1/2 w-3.5 h-3.5 xs:w-4 xs:h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="p-1.5 xs:p-2 text-gray-600 hover:text-primary-orange hover:bg-orange-50 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-orange"
            aria-label="Search recipes"
          >
            <svg
              className="w-4 h-4 xs:w-5 xs:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
