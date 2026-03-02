"use client";

// Advanced filters component for recipe search results

import { useState } from "react";

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

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-primary-stitch transition-all group"
        >
          <span className="material-symbols-outlined text-sm text-primary-stitch">tune</span>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Refine Search</span>
          <span className={`material-symbols-outlined text-sm transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>expand_more</span>
        </button>

        {hasActiveFilters && (
          <button 
            onClick={clearFilters}
            className="text-xs font-bold text-primary-stitch hover:underline underline-offset-4"
          >
            Clear All
          </button>
        )}
      </div>

      {isOpen && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 p-6 glass-panel rounded-3xl animate-in fade-in slide-in-from-top-4 duration-500">
          {filterConfig.map((group) => (
            <div key={group.name} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <span className="material-symbols-outlined text-sm text-slate-400">{group.icon}</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{group.label}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleSelect(group.name, option)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
      )}
    </div>
  );
}
