"use client";

import { useState } from "react";

interface AdvancedFiltersProps {
  onFilter: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const AdvancedFilters = ({
  onFilter,
  initialFilters,
}: AdvancedFiltersProps) => {
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
          {/* Mobile: Bottom sheet, Desktop: Dropdown */}
          <div className="fixed left-0 right-0 bottom-0 sm:absolute sm:right-0 sm:left-auto sm:top-full sm:bottom-auto sm:mt-2 w-full sm:w-80 md:w-96 bg-white rounded-t-2xl sm:rounded-lg shadow-2xl z-50 border-t sm:border border-gray-200 max-h-[85vh] sm:max-h-[600px] flex flex-col">
            {/* Header - Fixed */}
            <div className="flex-shrink-0 px-4 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                  Advanced Filters
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close filters"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
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
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Dietary Type
                  </label>
                  <select
                    value={filters.dietaryType || ""}
                    onChange={(e) =>
                      handleFilterChange("dietaryType", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Vegan">Vegan</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Meal Type
                  </label>
                  <select
                    value={filters.meal || ""}
                    onChange={(e) => handleFilterChange("meal", e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Difficulty
                  </label>
                  <select
                    value={filters.difficulty || ""}
                    onChange={(e) =>
                      handleFilterChange("difficulty", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  >
                    <option value="">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Season
                  </label>
                  <select
                    value={filters.season || ""}
                    onChange={(e) =>
                      handleFilterChange("season", e.target.value)
                    }
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
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
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Occasion
                  </label>
                  <input
                    type="text"
                    value={filters.occasion || ""}
                    onChange={(e) =>
                      handleFilterChange("occasion", e.target.value)
                    }
                    placeholder="e.g., Party, Holiday, Casual"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Recipe Type
                  </label>
                  <input
                    type="text"
                    value={filters.type || ""}
                    onChange={(e) => handleFilterChange("type", e.target.value)}
                    placeholder="e.g., Italian, Chinese, Indian"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-orange focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Footer - Fixed */}
            <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200 bg-white">
              <div className="flex gap-3">
                <button
                  onClick={clearFilters}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Clear All
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-primary-orange hover:bg-primary-orange-hover rounded-lg transition-colors duration-200"
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
