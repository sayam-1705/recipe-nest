import RecipeDisplay from "@/components/recipe/RecipeDisplay";

const ShowRecipe = async ({
  params,
}: {
  params: Promise<{ recipeId: string }>;
}) => {
  const { recipeId } = await params;
  return <RecipeDisplay recipeId={recipeId} />;
};

export default ShowRecipe;
