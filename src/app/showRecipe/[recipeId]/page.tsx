import { Metadata } from "next";
import RecipeDisplay from "@/components/recipe/RecipeDisplay";
import { dbConnect } from "../../api/mongodb";
import Recipe from "@/models/Recipe";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { recipeId } = await params;

  try {
    await dbConnect();
    const recipe = (await Recipe.findById(recipeId, {
      name: 1,
      type: 1,
      meal: 1,
      difficulty: 1,
      dietaryType: 1,
      image: 1,
    }).lean()) as Pick<
      Recipe,
      "name" | "type" | "meal" | "difficulty" | "dietaryType" | "image"
    > | null;

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
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Recipe Not Found",
    };
  }
}

export async function generateStaticParams() {
  try {
    await dbConnect();
    const recipes = (await Recipe.find({}, { _id: 1 })
      .limit(50)
      .lean()) as Array<{ _id: string }>;
    return recipes.map((recipe) => ({
      recipeId: recipe._id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

const ShowRecipe = async ({ params }: PageProps) => {
  const { recipeId } = await params;

  return <RecipeDisplay recipeId={recipeId} />;
};

export default ShowRecipe;
