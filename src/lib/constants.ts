export const RECIPE_FORM_OPTIONS: Record<
  "dietaryTypes" | "types" | "meals" | "difficulties" | "seasons" | "occasions",
  string[]
> = {
  dietaryTypes: [
    "Vegetarian",
    "Non-Vegetarian",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
  ],
  types: [
    "Appetizer",
    "Main Course",
    "Dessert",
    "Snack",
    "Beverage",
    "Salad",
    "Soup",
  ],
  meals: ["Breakfast", "Lunch", "Dinner", "Snack", "Brunch"],
  difficulties: ["Easy", "Medium", "Hard", "Expert"],
  seasons: ["Spring", "Summer", "Fall", "Winter", "All Seasons"],
  occasions: [
    "Everyday",
    "Party",
    "Holiday",
    "Special",
    "Quick Meal",
    "Date Night",
    "Family Gathering",
  ],
};
