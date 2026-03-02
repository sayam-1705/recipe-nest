import React from "react";

interface StepProgressProps {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  { id: 1, label: "Basics", icon: "check" },
  { id: 2, label: "Details", icon: "description" },
  { id: 3, label: "Ingredients", icon: "grocery" },
  { id: 4, label: "Instructions", icon: "menu_book" },
];

const StepProgress: React.FC<StepProgressProps> = ({ currentStep, totalSteps }) => {
  return (
    <div className="mb-10 px-4 max-w-4xl mx-auto w-full">
      <div className="flex justify-between items-center relative">
        {/* Progress Line Background */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-700 -z-10 rounded-full"></div>
        
        {/* Dynamic Progress Line */}
        <div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-primary-stitch to-orange-400 -z-10 rounded-full shadow-[0_0_10px_rgba(255,145,77,0.5)] transition-all duration-500"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>

        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          
          return (
            <div key={step.id} className={`flex flex-col items-center gap-2 ${!isActive && !isCompleted ? 'opacity-60' : ''}`}>
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-4 z-10 ${
                  isCompleted 
                    ? "bg-primary-stitch text-white shadow-glow border-white dark:border-gray-900" 
                    : isActive 
                      ? "bg-white dark:bg-gray-800 border-primary-stitch text-primary-stitch" 
                      : "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-400"
                }`}
              >
                <span className="material-symbols-outlined text-xl">
                  {isCompleted ? "check" : step.icon}
                </span>
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-primary-stitch' : 'text-gray-500 dark:text-gray-400'}`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StepProgress;
