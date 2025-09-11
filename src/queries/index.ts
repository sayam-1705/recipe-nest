import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/utils/api";
import { setAuthData } from "@/utils/auth";
import { AxiosError } from "axios";

// Query Keys
export const queryKeys = {
  recipes: {
    all: ['recipes'] as const,
    byId: (id: string) => ['recipes', 'byId', id] as const,
    byUserId: (userId: string) => ['recipes', 'byUserId', userId] as const,
    byFilter: (filter: RecipeFilter) => ['recipes', 'byFilter', filter] as const,
    byWeather: (lat?: number, lon?: number) => ['recipes', 'byWeather', lat, lon] as const,
  },
  users: {
    all: ['users'] as const,
    byId: (id: string) => ['users', 'byId', id] as const,
  },
  auth: {
    me: ['auth', 'me'] as const,
  },
} as const;

// Types
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

interface RecipeFilter {
  type?: string;
  meal?: string;
  difficulty?: string;
  dietaryType?: string;
  season?: string;
  occasion?: string;
}

interface CreateRecipeData {
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

interface UpdateRecipeData {
  name?: string;
  type?: string;
  meal?: string;
  time?: string;
  difficulty?: string;
  season?: string;
  occasion?: string;
  dietaryType?: string;
  servings?: number;
  ingredients?: Ingredient[];
  instructions?: string[];
  image?: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
  confirmPassword: string;
}

// API Functions
const recipeApi = {
  getAllRecipes: async (): Promise<Recipe[]> => {
    const response = await apiClient.get('/api/getAllRecipes');
    return response.data.recipes;
  },

  getRecipeById: async (recipeId: string): Promise<Recipe> => {
    const response = await apiClient.get(`/api/getRecipeById/${recipeId}`);
    return response.data.recipe;
  },

  getRecipesByUserId: async (userId: string): Promise<Recipe[]> => {
    const response = await apiClient.get(`/api/getRecipeByUserId/${userId}`);
    return response.data.recipes;
  },

  getRecipesByFilter: async (filter: RecipeFilter): Promise<Recipe[]> => {
    const params = new URLSearchParams();
    Object.entries(filter).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    const response = await apiClient.get(`/api/getRecipeByFilter?${params.toString()}`);
    return response.data.recipes;
  },

  getRecipesByWeather: async (lat: number, lon: number): Promise<{ recipes: Recipe[], weather: WeatherInfo }> => {
    const response = await apiClient.post('/api/getRecipeBasedOnWeather', { lat, lon });
    return response.data;
  },

  createRecipe: async (recipeData: CreateRecipeData): Promise<Recipe> => {
    const response = await apiClient.post('/api/createRecipe', recipeData);
    return response.data.recipe;
  },

  updateRecipe: async (recipeId: string, recipeData: UpdateRecipeData): Promise<Recipe> => {
    const response = await apiClient.put(`/api/updateRecipe/${recipeId}`, recipeData);
    return response.data.recipe;
  },

  deleteRecipe: async (recipeId: string): Promise<void> => {
    await apiClient.delete(`/api/deleteRecipe/${recipeId}`);
  },
};

const userApi = {
  getUserById: async (userId: string): Promise<{ name: string; email: string; _id: string }> => {
    const response = await apiClient.get(`/api/getUserById/${userId}`);
    return response.data.user;
  },

  login: async (loginData: LoginData): Promise<{ token: string; user: { name: string; email: string; _id: string } }> => {
    const response = await apiClient.post('/api/login', loginData);
    return response.data;
  },

  signup: async (signupData: SignupData): Promise<{ token: string; user: { name: string; email: string; _id: string } }> => {
    const response = await apiClient.post('/api/signup', signupData);
    return response.data;
  },

  deleteUser: async (email: string): Promise<void> => {
    await apiClient.delete(`/api/delete/${email}`);
  },
};

// Recipe Queries
export const useGetAllRecipes = () => {
  return useQuery({
    queryKey: queryKeys.recipes.all,
    queryFn: recipeApi.getAllRecipes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useGetRecipeById = (recipeId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.recipes.byId(recipeId),
    queryFn: () => recipeApi.getRecipeById(recipeId),
    enabled: enabled && !!recipeId,
  });
};

export const useGetRecipesByUserId = (userId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.recipes.byUserId(userId),
    queryFn: () => recipeApi.getRecipesByUserId(userId),
    enabled: enabled && !!userId,
  });
};

export const useGetRecipesByFilter = (filter: RecipeFilter, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.recipes.byFilter(filter),
    queryFn: () => recipeApi.getRecipesByFilter(filter),
    enabled: enabled && Object.keys(filter).length > 0,
  });
};

export const useGetRecipesByWeather = (lat?: number, lon?: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.recipes.byWeather(lat, lon),
    queryFn: () => recipeApi.getRecipesByWeather(lat!, lon!),
    enabled: enabled && lat !== undefined && lon !== undefined,
    staleTime: 10 * 60 * 1000, // 10 minutes - weather recipes don't change frequently
  });
};

// Recipe Mutations
export const useCreateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recipeApi.createRecipe,
    onSuccess: (newRecipe) => {
      // Invalidate and refetch related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
      if (newRecipe.userId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.recipes.byUserId(newRecipe.userId) 
        });
      }
    },
    onError: (error: AxiosError) => {
      console.error('Failed to create recipe:', error.response?.data || error.message);
    },
  });
};

export const useUpdateRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ recipeId, recipeData }: { recipeId: string; recipeData: UpdateRecipeData }) =>
      recipeApi.updateRecipe(recipeId, recipeData),
    onSuccess: (updatedRecipe, variables) => {
      // Update the specific recipe in cache
      queryClient.setQueryData(
        queryKeys.recipes.byId(variables.recipeId),
        updatedRecipe
      );
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
      if (updatedRecipe.userId) {
        queryClient.invalidateQueries({ 
          queryKey: queryKeys.recipes.byUserId(updatedRecipe.userId) 
        });
      }
    },
    onError: (error: AxiosError) => {
      console.error('Failed to update recipe:', error.response?.data || error.message);
    },
  });
};

export const useDeleteRecipe = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: recipeApi.deleteRecipe,
    onSuccess: (_, recipeId) => {
      // Remove the recipe from cache
      queryClient.removeQueries({ queryKey: queryKeys.recipes.byId(recipeId) });
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.recipes.all });
      queryClient.invalidateQueries({ 
        predicate: (query) => query.queryKey[0] === 'recipes'
      });
    },
    onError: (error: AxiosError) => {
      console.error('Failed to delete recipe:', error.response?.data || error.message);
    },
  });
};

// User Queries
export const useGetUserById = (userId: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: queryKeys.users.byId(userId),
    queryFn: () => userApi.getUserById(userId),
    enabled: enabled && !!userId,
  });
};

// Auth Mutations
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.login,
    onSuccess: (data) => {
      // Store auth data using the new helper function
      setAuthData(data.token, data.user);
      // Invalidate auth queries
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
    onError: (error: AxiosError) => {
      console.error('Login failed:', error.response?.data || error.message);
    },
  });
};

export const useSignup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.signup,
    onSuccess: (data) => {
      // Store auth data using the new helper function
      setAuthData(data.token, data.user);
      // Invalidate auth queries
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
    },
    onError: (error: AxiosError) => {
      console.error('Signup failed:', error.response?.data || error.message);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      // Clear local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
    },
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      // Redirect to home page
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    },
    onError: (error: AxiosError) => {
      console.error('Logout failed:', error);
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      // Clear auth data
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
      }
      // Clear all queries
      queryClient.clear();
    },
    onError: (error: AxiosError) => {
      console.error('Failed to delete user:', error.response?.data || error.message);
    },
  });
};

export const useGetRecipesByWeatherMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ lat, lon }: { lat: number; lon: number }) =>
      recipeApi.getRecipesByWeather(lat, lon),
    onSuccess: (data, variables) => {
      // Cache the weather-based recipes with proper coordinates
      queryClient.setQueryData(queryKeys.recipes.byWeather(variables.lat, variables.lon), data);
    },
    onError: (error: AxiosError) => {
      console.error('Failed to fetch weather-based recipes:', error.response?.data || error.message);
    },
  });
};

// Custom hook for getting current user data from localStorage
export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: () => {
      if (typeof window !== 'undefined') {
        try {
          const userData = localStorage.getItem('user');
          const token = localStorage.getItem('authToken');
          
          // If no token, user is not authenticated
          if (!token) {
            return null;
          }
          
          // If no user data but token exists, clear everything
          if (!userData) {
            localStorage.removeItem('authToken');
            return null;
          }
          
          // Try to parse user data
          return JSON.parse(userData);
        } catch (error) {
          console.error('Error parsing user data from localStorage:', error);
          // Clear corrupted data
          localStorage.removeItem('user');
          localStorage.removeItem('authToken');
          return null;
        }
      }
      return null;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - allow some staleness but refresh periodically
    retry: false, // Don't retry on error, just return null
  });
};
