declare global {
  // User & Auth Types
  interface User {
    _id?: string;
    id?: string;
    email?: string;
    name?: string;
    picture?: string;
    authProvider?: 'email' | 'google';
    googleId?: string;
  }

  interface AuthData {
    userId: string;
    email: string;
  }

  // Recipe Related Types
  interface Ingredient {
    name: string;
    quantity: string;
    nutrition?: {
      calories?: number;
      protein?: number;
      carbs?: number;
      fat?: number;
      [key: string]: unknown;
    };
  }

  interface Recipe {
    _id: string;
    userId: string;
    name: string;
    type: string;
    meal: string;
    time: string;
    difficulty: string;
    season: string;
    occasion: string;
    dietaryType: string;
    servings: number;
    ingredients: Ingredient[];
    nutritionPerServing?: {
      calories?: number;
      ENERC_KCAL?: number;
      PROCNT_KCAL?: number;
      FAT_KCAL?: number;
      CHOCDF_KCAL?: number;
      [key: string]: unknown;
    };
    instructions: string[];
    image: string;
  }

  interface NutritionData {
    calories: number;
    ENERC_KCAL: number;
    PROCNT_KCAL: number;
    FAT_KCAL: number;
    CHOCDF_KCAL: number;
  }

  // Form Data Types
  interface LoginData {
    email: string;
    password: string;
  }

  interface SignupData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  interface RecipeBaseData {
    name: string;
    type: string;
    meal: string;
    time: string;
    difficulty: string;
    season: string;
    occasion: string;
    dietaryType: string;
    servings: number;
    ingredients: Ingredient[];
    instructions: string[];
    image: string;
  }

  type CreateRecipeData = RecipeBaseData;
  type UpdateRecipeData = Partial<RecipeBaseData>;

  interface RecipeFilter {
    type?: string;
    meal?: string;
    difficulty?: string;
    dietaryType?: string;
    season?: string;
    occasion?: string;
  }

  interface FilterOptions {
    name?: string;
    dietaryType?: string;
    type?: string;
    meal?: string;
    difficulty?: string;
    season?: string;
    occasion?: string;
  }

  interface RecipeFormData extends Omit<RecipeBaseData, "image"> {
    image: File | string | null;
  }

  // Component Props Types
  interface RecipeFormProps {
    initialData?: Partial<RecipeFormData> & { _id?: string };
    onFormDataChange?: (data: RecipeFormData) => void;
    onSubmit?: (data: RecipeFormData) => void;
    submitButtonText?: string;
    isSubmitting?: boolean;
    staticData?: Record<
      | "dietaryTypes"
      | "types"
      | "meals"
      | "difficulties"
      | "seasons"
      | "occasions",
      string[]
    >;
  }

  interface WeatherInfo {
    temperature: number;
    place: string;
    description: string;
    details: string;
    humidity: number;
    windSpeed: number;
    cloudCover: number;
    recommendedType: string;
    recommendedMeal: string;
    recommendedDifficulty: string;
    season: string;
  }

  interface SelectOption {
    value: string;
    label: string;
  }

  interface SelectProps {
    label: string;
    placeholder?: string;
    className?: string;
    containerClassName?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[] | string[];
  }

  interface InputProps {
    label: string;
    placeholder?: string;
    className?: string;
    containerClassName?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value: string | number;
    onChange: (value: string | number) => void;
    type?: "text" | "number" | "email" | "password" | "url" | "tel";
    min?: number;
    max?: number;
  }

  interface ErrorMessageProps {
    title?: string;
    message: string;
    actionLabel?: string;
    variant?: "error" | "warning" | "info";
    className?: string;
    onAction?: () => void;
  }

  interface NotFoundProps {
    title?: string;
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
    showHome?: boolean;
  }

  interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
  }

  interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
  }

  interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    color?: string;
    className?: string;
  }

  interface LoadingSectionProps {
    message?: string;
    fullPage?: boolean;
    children?: React.ReactNode;
  }

  interface SkeletonProps {
    className?: string;
    variant?: "text" | "rectangular" | "circular";
    width?: string | number;
    height?: string | number;
    animation?: "pulse" | "wave" | "none";
  }

  interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
    requireAuth?: boolean;
  }

  interface MenuCarouselProps {
    totalCards?: number;
    cardWidth?: number;
    recipes: Recipe[];
  }

  interface MenuProps {
    initialRecipes?: Recipe[];
  }

  interface NutritionChartProps {
    nutritionData: NutritionData;
  }

  interface RecipePageProps {
    params: Promise<{ recipeId: string }>;
  }

  type PageProps = RecipePageProps;
}

export {};
