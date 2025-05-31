import { model, models, Schema } from "mongoose";

const RecipeSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
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
          type: Schema.Types.Mixed,
          required: false,
        },
      },
    ],
    nutritionPerServing: {
      calories: {
        type: Number,
        required: true,
      },
      ENERC_KCAL: {
        type: Number,
        required: true,
      },
      PROCNT_KCAL: {
        type: Number,
        required: true,
      },
      FAT_KCAL: {
        type: Number,
        required: true,
      },
      CHOCDF_KCAL: {
        type: Number,
        required: true,
      },
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
