export {};

declare global {
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
}
