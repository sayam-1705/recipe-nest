import React from "react";
import Image from "next/image";

interface RecipePreviewProps {
  formData: RecipeFormData;
}

const RecipePreview: React.FC<RecipePreviewProps> = ({ formData }) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!formData.image) {
      setPreviewUrl(null);
      return;
    }

    if (typeof formData.image === 'string') {
      setPreviewUrl(formData.image);
      return;
    }

    if (formData.image instanceof File) {
      const url = URL.createObjectURL(formData.image);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [formData.image]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700 transition-all duration-500 hover:shadow-glow/20">
      <div className="relative h-64 sm:h-80 overflow-hidden">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt={formData.name || "Recipe Preview"}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
            <span className="material-symbols-outlined text-6xl">image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-3 text-white/90 text-sm mb-3">
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg">
              <span className="material-symbols-outlined text-sm">schedule</span>
              <span className="font-medium">{formData.time || "0"}m</span>
            </div>
            <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg">
              <span className="material-symbols-outlined text-sm">restaurant</span>
              <span className="font-medium">{formData.type || "Main"}</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight drop-shadow-md line-clamp-2">
            {formData.name || "Untitled Masterpiece"}
          </h2>
        </div>
      </div>
      <div className="p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-stitch/20 flex items-center justify-center text-primary-stitch">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div>
              <p className="text-[10px] text-gray-400 dark:text-gray-500 uppercase font-bold tracking-widest">Recipe for</p>
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{formData.servings || "1"} Servings</span>
            </div>
          </div>
          <div className="flex text-yellow-400 gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`material-symbols-outlined text-lg ${star <= 4 ? "fill-current" : "text-gray-200 dark:text-gray-700"}`}>
                star
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap">
          {formData.dietaryType && (
            <span className="px-4 py-2 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-xl text-xs font-bold border border-orange-100 dark:border-orange-800/30">
              {formData.dietaryType}
            </span>
          )}
          {formData.difficulty && (
            <span className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-bold border border-blue-100 dark:border-blue-800/30">
              {formData.difficulty}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipePreview;
