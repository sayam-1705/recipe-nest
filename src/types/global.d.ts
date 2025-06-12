export {};

declare global {
  interface AuthData {
    userId: string;
    email: string;
  }

  interface Ingredient {
    name: string;
    quantity: string;
    nutrition?: any;
  }
}
