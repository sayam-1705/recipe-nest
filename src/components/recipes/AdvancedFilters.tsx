"use client";

// Advanced filters component for recipe search results

import { useState, useRef, useEffect } from "react";

interface AdvancedFiltersProps {
  onFilter: (filters: FilterOptions) => void;
  initialFilters?: FilterOptions;
}

const filterConfig = [
  {
    name: "dietaryType",
    label: "Dietary",
    options: ["Vegetarian", "Non-Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
    icon: "spa",
  },
  {
    name: "meal",
    label: "Meal Time",
    options: ["Breakfast", "Lunch", "Dinner", "Snack", "Brunch"],
    icon: "restaurant_menu",
  },
  {
    name: "difficulty",
    label: "Level",
    options: ["Easy", "Medium", "Hard", "Expert"],
    icon: "signal_cellular_alt",
  },
];

export default function AdvancedFilters({ onFilter, initialFilters }: AdvancedFiltersProps) {
  const [activeFilters, setActiveFilters] = useState<FilterOptions>(initialFilters || {});
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSelect = (name: string, value: string) => {
    const newFilters = { ...activeFilters };
    if (newFilters[name as keyof FilterOptions] === value) {
      delete newFilters[name as keyof FilterOptions];
    } else {
      newFilters[name as keyof FilterOptions] = value;
    }
    setActiveFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({});
    onFilter({});
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0;
  const activeCount = Object.keys(activeFilters).length;

  return (
    <div ref={containerRef} className="relative">
      {/* Compact Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-3 rounded-2xl border transition-all font-bold text-xs sm:text-sm whitespace-nowrap ${
          isOpen || hasActiveFilters
            ? "bg-primary-stitch/10 border-primary-stitch/30 text-primary-stitch"
            : "bg-white/50 dark:bg-slate-800/40 border-white/60 dark:border-white/5 text-slate-600 dark:text-slate-300 hover:border-primary-stitch/30 hover:text-primary-stitch"
        }`}
      >
        <span className="material-symbols-outlined text-base sm:text-lg">tune</span>
        <span className="hidden xs:inline">Filters</span>
        {activeCount > 0 && (
          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-stitch text-white text-[10px] font-black">
            {activeCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel - positioned below the search bar */}
      {isOpen && (
        <div className="absolute top-full right-0 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 mt-3 w-[calc(100vw-1.5rem)] xs:w-[calc(100vw-2rem)] sm:w-[560px] md:w-[680px] max-w-[90vw] z-[9999] glass-panel rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl shadow-black/10 dark:shadow-black/30 border border-white/30 dark:border-white/10 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-stitch text-lg">filter_list</span>
              <span className="text-sm sm:text-base font-black text-slate-900 dark:text-white">Refine Search</span>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-[10px] sm:text-xs font-bold text-primary-stitch hover:underline underline-offset-4 flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">close</span>
                Clear All
              </button>
            )}
          </div>

          {/* Filter Groups */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
            {filterConfig.map((group) => (
              <div key={group.name} className="space-y-2.5">
                <div className="flex items-center gap-2 px-1">
                  <span className="material-symbols-outlined text-sm text-slate-400">{group.icon}</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{group.label}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {group.options.map((option) => (
                    <button
                      type="button"
                      key={option}
                      onClick={() => handleSelect(group.name, option)}
                      className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold transition-all ${
                        activeFilters[group.name as keyof FilterOptions] === option
                          ? "bg-primary-stitch text-white shadow-glow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
