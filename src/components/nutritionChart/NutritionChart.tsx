"use client";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, ChartEvent, ActiveElement } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface NutritionData {
  calories: number;
  ENERC_KCAL: number;
  PROCNT_KCAL: number;
  FAT_KCAL: number;
  CHOCDF_KCAL: number;
}

interface NutritionChartProps {
  nutritionData: NutritionData;
}

const NutritionChart: React.FC<NutritionChartProps> = ({ nutritionData }) => {
  // Ensure all values are numbers and provide fallbacks
  const safeNutritionData = {
    calories: nutritionData?.calories || 0,
    ENERC_KCAL: nutritionData?.ENERC_KCAL || 0,
    PROCNT_KCAL: nutritionData?.PROCNT_KCAL || 0,
    FAT_KCAL: nutritionData?.FAT_KCAL || 0,
    CHOCDF_KCAL: nutritionData?.CHOCDF_KCAL || 0,
  };

  // Check if we have any actual nutrition data
  const hasNutritionData = safeNutritionData.PROCNT_KCAL > 0 || 
                          safeNutritionData.FAT_KCAL > 0 || 
                          safeNutritionData.CHOCDF_KCAL > 0;
  const data = {
    labels: ["Protein", "Fat", "Carbohydrates"],
    datasets: [
      {
        data: [
          safeNutritionData.PROCNT_KCAL,
          safeNutritionData.FAT_KCAL,
          safeNutritionData.CHOCDF_KCAL,
        ],
        backgroundColor: [
          "rgba(34, 197, 94, 0.8)", // Green for protein
          "rgba(251, 146, 60, 0.8)", // Orange for fat
          "rgba(139, 92, 246, 0.8)", // Violet for carbs
        ],
        borderColor: [
          "rgb(34, 197, 94)",
          "rgb(251, 146, 60)",
          "rgb(139, 92, 246)",
        ],
        borderWidth: 2,
        hoverBackgroundColor: [
          "rgba(34, 197, 94, 0.95)",
          "rgba(251, 146, 60, 0.95)",
          "rgba(139, 92, 246, 0.95)",
        ],
        hoverBorderColor: [
          "rgb(34, 197, 94)",
          "rgb(251, 146, 60)",
          "rgb(139, 92, 246)",
        ],
        hoverBorderWidth: 3,
        hoverOffset: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1200,
      easing: "easeOutQuart" as const,
    },
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 15,
          font: {
            size: 14,
            family: "Poppins, sans-serif",
            weight: "normal" as const,
          },
          usePointStyle: true,
          pointStyle: "circle",
          color: "#4B5563",
        },
      },
      title: {
        display: true,
        text: `Total: ${safeNutritionData.calories} calories`,
        font: {
          size: 18,
          weight: "normal" as const,
          family: "Poppins, sans-serif",
        },
        padding: {
          top: 15,
          bottom: 25,
        },
        color: "#374151",
      },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        titleColor: "#F3F4F6",
        bodyColor: "#F3F4F6",
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        cornerRadius: 12,
        padding: 16,
        titleFont: {
          size: 14,
          weight: "normal" as const,
        },
        bodyFont: {
          size: 13,
          weight: "normal" as const,
        },
        callbacks: {
          label: function (context: { label: string; parsed: number }) {
            const label = context.label || "";
            const value = context.parsed || 0;
            const total =
              safeNutritionData.PROCNT_KCAL +
              safeNutritionData.FAT_KCAL +
              safeNutritionData.CHOCDF_KCAL;
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : "0";
            return `${label}: ${value}g (${percentage}%)`;
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
        borderRadius: 4,
      },
    },
    onHover: (event: ChartEvent, elements: ActiveElement[]) => {
      const target = event.native?.target as HTMLElement;
      if (target) {
        target.style.cursor = elements.length > 0 ? "pointer" : "default";
      }
    },
  };

  return (
    <div className="w-full space-y-8">
      <div className="grid grid-cols-2 gap-6">
        <div
          className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border border-orange-200 hover:shadow-lg hover:border-orange-300 transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up cursor-pointer group"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="text-xs text-orange-600 font-medium uppercase tracking-wider mb-2 group-hover:text-orange-700 transition-colors duration-300">
            Calories
          </div>
          <div className="text-3xl font-light text-orange-800 group-hover:text-orange-900 transition-colors duration-300">
            {safeNutritionData.calories}
          </div>
        </div>
        <div
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-2xl border border-emerald-200 hover:shadow-lg hover:border-emerald-300 transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up cursor-pointer group"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="text-xs text-emerald-600 font-medium uppercase tracking-wider mb-2 group-hover:text-emerald-700 transition-colors duration-300">
            Protein
          </div>
          <div className="text-3xl font-light text-emerald-800 group-hover:text-emerald-900 transition-colors duration-300">
            {safeNutritionData.PROCNT_KCAL}g
          </div>
        </div>
        <div
          className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-2xl border border-amber-200 hover:shadow-lg hover:border-amber-300 transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up cursor-pointer group"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="text-xs text-amber-600 font-medium uppercase tracking-wider mb-2 group-hover:text-amber-700 transition-colors duration-300">
            Fat
          </div>
          <div className="text-3xl font-light text-amber-800 group-hover:text-amber-900 transition-colors duration-300">
            {safeNutritionData.FAT_KCAL}g
          </div>
        </div>
        <div
          className="bg-gradient-to-br from-violet-50 to-violet-100 p-6 rounded-2xl border border-violet-200 hover:shadow-lg hover:border-violet-300 transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up cursor-pointer group"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="text-xs text-violet-600 font-medium uppercase tracking-wider mb-2 group-hover:text-violet-700 transition-colors duration-300">
            Carbs
          </div>
          <div className="text-3xl font-light text-violet-800 group-hover:text-violet-900 transition-colors duration-300">
            {safeNutritionData.CHOCDF_KCAL}g
          </div>
        </div>
      </div>

      <div
        className="h-96 flex justify-center items-center animate-fade-in-up"
        style={{ animationDelay: "0.5s" }}
      >
        {hasNutritionData ? (
          <div className="w-80 h-80 transition-all duration-500 hover:scale-105 relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100/20 to-violet-100/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
            <div className="relative z-10 w-full h-full p-4 bg-white/50 backdrop-blur-sm rounded-full transition-all duration-500">
              <Pie data={data} options={options} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 w-full">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-gray-500 text-lg font-medium">
                No nutrition breakdown available
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Only total calories are shown
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionChart;
