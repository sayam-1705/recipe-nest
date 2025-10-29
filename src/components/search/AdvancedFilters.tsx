"use client";

import { useState } from "react";

interface AdvancedFiltersProps {
  onFilter: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const AdvancedFilters = ({ onFilter, initialFilters }: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters || {});

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value || undefined,
    }));
  };

  const applyFilters = () => {
    onFilter(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    setFilters({});
    onFilter({});
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="relative w-full xs:w-auto">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full xs:w-auto flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-2 xs:py-2.5 sm:py-3 text-xs xs:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-orange whitespace-nowrap"
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
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <span className="hidden xs:inline">Filters</span>
        <span className="xs:hidden">Filter</span>
        {activeFilterCount > 0 && (
          <span className="px-1.5 xs:px-2 py-0.5 text-xs font-semibold text-white bg-primary-orange rounded-full min-w-[18px] xs:min-w-[20px] text-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-30"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:mt-2 w-full max-w-[98vw] sm:max-w-[400px] md:max-w-[480px] bg-white rounded-t-2xl sm:rounded-lg shadow-2xl z-50 border-t sm:border border-gray-200 max-h-[85vh] overflow-hidden mx-auto">
            <div className="p-3 xs:p-4 sm:p-5 md:p-6">
              <div className="flex items-center justify-between mb-4 xs:mb-5">
                <h3 className="text-base xs:text-lg font-semibold text-gray-900">
                  Advanced Filters
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 xs:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <svg
                    className="w-5 h-5 xs:w-6 xs:h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="space-y-3 xs:space-y-4 max-h-[calc(85vh-180px)] xs:max-h-96 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5">
                    Dietary Type
                  </label>
                  <select
                    value={filters.dietaryType || ""}
                    onChange={(e) => handleFilterChange("dietaryType", e.target.value)}
                    className="w-full px-2.5 xs:px-3 py-2 xs:py-2.5 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5">
                    Meal Type
                  </label>
                  <select
                    value={filters.meal || ""}
                    onChange={(e) => handleFilterChange("meal", e.target.value)}
                    className="w-full px-2.5 xs:px-3 py-2 xs:py-2.5 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="Breakfast">Breakfast</option>
                    <option value="Lunch">Lunch</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Snack">Snack</option>
                    <option value="Dessert">Dessert</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5">
                    Difficulty
                  </label>
                  <select
                    value={filters.difficulty || ""}
                    onChange={(e) => handleFilterChange("difficulty", e.target.value)}
                    className="w-full px-2.5 xs:px-3 py-2 xs:py-2.5 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5">
                    Season
                  </label>
                  <select
                    value={filters.season || ""}
                    onChange={(e) => handleFilterChange("season", e.target.value)}
                    className="w-full px-2.5 xs:px-3 py-2 xs:py-2.5 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="Spring">Spring</option>
                    <option value="Summer">Summer</option>
                    <option value="Fall">Fall</option>
                    <option value="Winter">Winter</option>
                    <option value="All">All Seasons</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5">
                    Occasion
                  </label>
                  <input
                    type="text"
                    value={filters.occasion || ""}
                    onChange={(e) => handleFilterChange("occasion", e.target.value)}
                    placeholder="e.g., Party, Holiday, Casual"
                    className="w-full px-2.5 xs:px-3 py-2 xs:py-2.5 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs xs:text-sm font-medium text-gray-700 mb-1 xs:mb-1.5">
                    Recipe Type
                  </label>
                  <input
                    type="text"
                    value={filters.type || ""}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    placeholder="e.g., Italian, Chinese, Indian"
                    className="w-full px-2.5 xs:px-3 py-2 xs:py-2.5 text-sm xs:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-2 xs:gap-3 mt-4 xs:mt-5 pt-4 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="flex-1 px-3 xs:px-4 py-2 xs:py-2.5 text-xs xs:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Clear All
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-1 px-3 xs:px-4 py-2 xs:py-2.5 text-xs xs:text-sm font-medium text-white bg-primary-orange hover:bg-primary-orange-hover rounded-lg transition-colors duration-200"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdvancedFilters;
