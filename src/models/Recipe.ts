import { model, models, Schema } from "mongoose";
import { ST } from "next/dist/shared/lib/utils";

const RecipeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    meal: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    season: {
      type: String,
      required: true,
    },
    occasion: {
      type: String,
      required: true,
    },
    servings: {
      type: Number,
      required: true,
    },
    ingredients: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
        nutrition: {
          type: [String],
          required: true,
        },
      },
    ],
    nutritionPerServing: {
      type: String,
    },
    instructions: {
      type: [String],
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Recipe = models.Recipe || model("Recipe", RecipeSchema);

export default Recipe;
