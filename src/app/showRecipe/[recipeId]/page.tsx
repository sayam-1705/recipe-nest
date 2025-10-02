import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import NutritionChart from "@/components/nutritionChart/NutritionChart";

const API_BASE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const fetchWithErrorHandling = async (
  url: string,
  options: RequestInit = {},
  fallbackValue: Recipe[] | Recipe | null = []
) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, options);

    if (!response.ok) {
      if (response.status === 404 && fallbackValue === null) return null;
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.recipes || data.recipe || fallbackValue;
  } catch (error) {
    console.error(`API Error for ${url}:`, error);
    return fallbackValue;
  }
};

const serverApi = {
  getAllRecipes: (): Promise<Recipe[]> =>
    fetchWithErrorHandling("/api/getAllRecipes", {
      cache: "force-cache",
      next: { revalidate: 300 },
    }),

  getRecipeById: (recipeId: string): Promise<Recipe | null> =>
    fetchWithErrorHandling(
      `/api/getRecipeById/${recipeId}`,
      {
        cache: "force-cache",
        next: { revalidate: 300 },
      },
      null
    ),
};

const generateRecipeJsonLd = (recipe: Recipe) => ({
  "@context": "https://schema.org/",
  "@type": "Recipe",
  name: recipe.name,
  image: recipe.image,
  description: `A delicious ${recipe.type} recipe perfect for ${recipe.meal}`,
  recipeCategory: recipe.type,
  recipeCuisine: recipe.dietaryType,
  prepTime: recipe.time,
  recipeYield: `${recipe.servings} servings`,
  difficulty: recipe.difficulty,
  recipeIngredient: recipe.ingredients.map(
    (ing) => `${ing.quantity} ${ing.name}`
  ),
  recipeInstructions: recipe.instructions.map((instruction, index) => ({
    "@type": "HowToStep",
    name: `Step ${index + 1}`,
    text: instruction,
  })),
  ...(recipe.nutritionPerServing && {
    nutrition: {
      "@type": "NutritionInformation",
      calories:
        recipe.nutritionPerServing.calories ||
        recipe.nutritionPerServing.ENERC_KCAL,
      proteinContent: recipe.nutritionPerServing.PROCNT_KCAL,
      fatContent: recipe.nutritionPerServing.FAT_KCAL,
      carbohydrateContent: recipe.nutritionPerServing.CHOCDF_KCAL,
    },
  }),
});

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { recipeId } = await params;
  const recipe = await serverApi.getRecipeById(recipeId);

  if (!recipe) {
    return {
      title: "Recipe Not Found",
    };
  }

  return {
    title: `${recipe.name} - RecipeNest`,
    description: `Learn how to make ${recipe.name}. A delicious ${recipe.type} recipe perfect for ${recipe.meal}. Difficulty: ${recipe.difficulty}`,
    keywords: [
      recipe.name,
      recipe.type,
      recipe.meal,
      recipe.dietaryType,
      "recipe",
      "cooking",
    ],
    openGraph: {
      title: recipe.name,
      description: `A delicious ${recipe.type} recipe perfect for ${recipe.meal}`,
      images: [
        {
          url: recipe.image,
          width: 1200,
          height: 630,
          alt: recipe.name,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: recipe.name,
      description: `A delicious ${recipe.type} recipe perfect for ${recipe.meal}`,
      images: [recipe.image],
    },
  };
}

export async function generateStaticParams() {
  const recipes = await serverApi.getAllRecipes();
  return recipes.slice(0, 50).map((recipe) => ({
    recipeId: recipe._id,
  }));
}

const ShowRecipe = async ({ params }: PageProps) => {
  const { recipeId } = await params;

  try {
    const recipe = await serverApi.getRecipeById(recipeId);

    if (!recipe) {
      notFound();
    }

    const userData = { name: "Recipe Creator" };

    const jsonLd = generateRecipeJsonLd(recipe);

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <article className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <header className="grid lg:grid-cols-2 gap-12 mb-16">
              <div className="flex justify-center items-center animate-fade-in-up">
                <div className="relative group overflow-hidden rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 ease-out">
                  <Image
                    className="transition-all duration-700 group-hover:scale-110 filter brightness-100 group-hover:brightness-110"
                    src={recipe.image}
                    alt={recipe.name}
                    width={600}
                    height={600}
                    priority
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-8 p-8 animate-fade-in-up delay-200">
                <div className="space-y-6">
                  <h1 className="text-3xl md:text-5xl font-medium text-gray-900 leading-tight animate-fade-in-up delay-300 tracking-tight">
                    {recipe.name}
                  </h1>

                  <div className="flex items-center justify-between animate-fade-in-up delay-400">
                    <div className="flex items-center space-x-4 group cursor-pointer hover:scale-105 transition-transform duration-300">
                      <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-medium text-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                        {userData.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-gray-800 font-medium text-lg group-hover:text-orange-600 transition-colors duration-300">
                          By {userData.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date().toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <RecipeTags recipe={recipe} />
              </div>
            </header>

            <IngredientsSection recipe={recipe} />

            <div className="grid lg:grid-cols-2 gap-10">
              <NutritionSection recipe={recipe} />
              <InstructionsSection recipe={recipe} />
            </div>
          </div>
        </article>
      </>
    );
  } catch (error) {
    console.error("Error loading recipe:", error);
    notFound();
  }
};

const RecipeTags = ({ recipe }: { recipe: Recipe }) => (
  <div className="space-y-6 animate-fade-in-up delay-500">
    <div className="flex flex-wrap gap-3">
      <TagBadge icon="🏆" label={recipe.type} color="slate" />
      <TagBadge icon="🍽️" label={recipe.meal} color="emerald" />
      <TagBadge icon="⏰" label={recipe.time} color="amber" />
      <TagBadge icon="📊" label={recipe.difficulty} color="red" />
      <TagBadge icon="☀️" label={recipe.season} color="teal" />
      <TagBadge icon="🌟" label={recipe.occasion} color="purple" />
      <TagBadge icon="🥗" label={recipe.dietaryType} color="green" />
    </div>
  </div>
);

const TagBadge = ({
  icon,
  label,
  color,
}: {
  icon: string;
  label: string;
  color: string;
}) => (
  <span
    className={`px-4 py-2 bg-${color}-50 text-${color}-700 rounded-full text-sm font-medium border border-${color}-200 hover:bg-${color}-100 hover:scale-105 transform transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md flex items-center gap-2`}
  >
    <span>{icon}</span>
    {label}
  </span>
);

const IngredientsSection = ({ recipe }: { recipe: Recipe }) => (
  <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-10 mb-12 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up delay-600 border border-gray-100">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
      <h2 className="text-2xl md:text-4xl font-light text-gray-800 flex items-center gap-4 tracking-wide">
        <span className="text-2xl">🥘</span>
        Ingredients
      </h2>
      <div className="text-lg md:text-xl font-medium text-gray-600 bg-gray-50 px-4 md:px-6 py-2 md:py-3 rounded-full border border-gray-200 shadow-sm">
        Servings: {recipe.servings}
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      {recipe.ingredients.map((ingredient, idx) => (
        <div
          className="group bg-gradient-to-br from-white to-gray-50 p-4 md:p-6 rounded-2xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition-all duration-500 cursor-pointer hover:-translate-y-1 animate-fade-in-up"
          key={idx}
          style={{ animationDelay: `${0.7 + idx * 0.05}s` }}
        >
          <div className="text-center space-y-3">
            <div className="text-base md:text-lg font-semibold text-orange-600 group-hover:text-orange-700 transition-colors duration-300">
              {ingredient.quantity}
            </div>
            <div className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors duration-300 font-medium">
              {ingredient.name}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

const NutritionSection = ({ recipe }: { recipe: Recipe }) => {
  const nutritionData = recipe.nutritionPerServing
    ? {
        calories:
          recipe.nutritionPerServing.calories ||
          recipe.nutritionPerServing.ENERC_KCAL ||
          0,
        ENERC_KCAL:
          recipe.nutritionPerServing.ENERC_KCAL ||
          recipe.nutritionPerServing.calories ||
          0,
        PROCNT_KCAL: recipe.nutritionPerServing.PROCNT_KCAL || 0,
        FAT_KCAL: recipe.nutritionPerServing.FAT_KCAL || 0,
        CHOCDF_KCAL: recipe.nutritionPerServing.CHOCDF_KCAL || 0,
      }
    : {
        calories: 0,
        ENERC_KCAL: 0,
        PROCNT_KCAL: 0,
        FAT_KCAL: 0,
        CHOCDF_KCAL: 0,
      };

  return (
    <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-10 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up delay-800 border border-gray-100">
      <h2 className="text-2xl md:text-4xl font-light text-gray-800 mb-6 md:mb-10 flex items-center gap-4 tracking-wide">
        <span className="text-2xl">📊</span>
        Nutrition Info
      </h2>
      <div className="transform transition-transform duration-500">
        {recipe.nutritionPerServing ? (
          <NutritionChart nutritionData={nutritionData} />
        ) : (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <p className="text-gray-500 text-lg font-medium">
                Nutrition information not available
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Nutrition data will be calculated when available
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

const InstructionsSection = ({ recipe }: { recipe: Recipe }) => (
  <section className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-10 hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 animate-fade-in-up delay-900 border border-gray-100">
    <h2 className="text-2xl md:text-4xl font-light text-gray-800 mb-6 md:mb-10 flex items-center gap-4 tracking-wide">
      <span className="text-2xl">📝</span>
      Instructions
    </h2>
    <div className="space-y-6">
      {recipe.instructions.map((instruction, idx) => (
        <div
          key={idx}
          className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all duration-300 animate-fade-in-up"
          style={{ animationDelay: `${1 + idx * 0.05}s` }}
        >
          <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-medium">
            {idx + 1}
          </div>
          <p className="text-gray-700 leading-relaxed hover:text-gray-900 transition-colors duration-300 font-medium">
            {instruction}
          </p>
        </div>
      ))}
    </div>
  </section>
);

export default ShowRecipe;
