declare global {
  interface User {
    _id?: string;
    id?: string;
    email?: string;
    name?: string;
  }

  interface AuthData {
    userId: string;
    email: string;
  }

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

  interface LoginData extends Record<string, string> {
    email: string;
    password: string;
  }

  interface SignupData extends Record<string, string> {
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

  interface RecipeFormData extends Omit<RecipeBaseData, 'image'> {
    image: File | string | null;
  }

  interface RecipeFormProps {
    initialData?: Partial<RecipeFormData> & { _id?: string };
    onFormDataChange?: (data: RecipeFormData) => void;
    onSubmit?: (data: RecipeFormData) => void;
    submitButtonText?: string;
    isSubmitting?: boolean;
    staticData?: Record<'dietaryTypes' | 'types' | 'meals' | 'difficulties' | 'seasons' | 'occasions', string[]>;
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

  type WeatherResponseProps = (
    lat: number,
    lon: number
  ) => Promise<{
    temperature: number;
    place: string;
    weatherDescription: string;
    weatherDetails: string;
    humidity: number;
    windSpeed: number;
    clouds: number;
  }>;

  interface SelectOption {
    value: string;
    label: string;
  }

  interface SelectProps extends BaseInputProps {
    value: string;
    onChange: (value: string) => void;
    options: SelectOption[] | string[];
  }

  interface BaseInputProps extends BaseComponentProps {
    label: string;
    placeholder?: string;
    containerClassName?: string;
    disabled?: boolean;
    required?: boolean;
    name?: string;
  }

  interface InputProps extends BaseInputProps {
    value: string | number;
    onChange: (value: string | number) => void;
    type?: "text" | "number" | "email" | "password" | "url" | "tel";
    min?: number;
    max?: number;
  }

  interface BaseComponentProps {
    className?: string;
  }

  interface LoadingSpinnerProps extends BaseComponentProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: string;
  }

  interface LoadingSectionProps {
    message?: string;
    fullPage?: boolean;
    children?: React.ReactNode;
  }

  interface SkeletonProps extends BaseComponentProps {
    variant?: 'text' | 'rectangular' | 'circular';
    width?: string | number;
    height?: string | number;
    animation?: 'pulse' | 'wave';
  }

  interface BaseErrorProps {
    title?: string;
    message?: string;
    actionLabel?: string;
    onAction?: () => void;
  }

  interface ErrorMessageProps extends BaseErrorProps {
    message: string;
    variant?: 'error' | 'warning' | 'info';
    className?: string;
  }

  interface NotFoundProps extends BaseErrorProps {
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

  interface ProtectedRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
    showFallback?: boolean;
  }

  interface AuthGuardProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
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

  interface QueryProviderProps {
    children: React.ReactNode;
  }

  interface UseProtectedRouteOptions {
    redirectTo?: string;
    redirectDelay?: number;
  }

  interface AuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    user: User | null;
  }

  interface RecipePageProps {
    params: Promise<{ recipeId: string }>;
  }

  type PageProps = RecipePageProps;
  type UpdateRecipeProps = RecipePageProps;
}

export {};
