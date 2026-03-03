import { model, models, Schema } from "mongoose";

const RecipeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    dietaryType: {
      type: String,
      enum: ["Vegetarian", "Non-Vegetarian", "Vegan", "Gluten-Free", "Dairy-Free"],
      required: true,
    },
    type: { type: String, required: true },
    meal: { type: String, required: true },
    time: { type: String, required: true },
    difficulty: { type: String, required: true },
    season: { type: String, required: true },
    occasion: { type: String, required: true },
    servings: { type: Number, required: true },
    ingredients: [
      {
        name: { type: String, required: true },
        quantity: { type: String, required: true },
        nutrition: { type: Schema.Types.Mixed },
      },
    ],
    nutritionPerServing: {
      calories: { type: Number, default: 0 },
      ENERC_KCAL: { type: Number, default: 0 },
      PROCNT_KCAL: { type: Number, default: 0 },
      FAT_KCAL: { type: Number, default: 0 },
      CHOCDF_KCAL: { type: Number, default: 0 },
    },
    instructions: { type: [String], required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

const Recipe = models.Recipe || model("Recipe", RecipeSchema);

export default Recipe;
