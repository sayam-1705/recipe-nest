// Conditional import for server-side only
const getMongoose = async () => {
  if (typeof window === "undefined") {
    const { default: mongoose } = await import("mongoose");
    return mongoose;
  }
  return null;
};

const isBrowser = () => typeof window !== "undefined";

export const isAuthenticated = (): boolean => 
  isBrowser() && !!localStorage.getItem("authToken");

export const getUser = (): User | null => {
  if (!isBrowser()) return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logout = (): void => {
  if (isBrowser()) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/";
  }
};

export const setAuthData = (token: string, user: User | null): void => {
  if (isBrowser()) {
    localStorage.setItem("authToken", token);
    if (user) localStorage.setItem("user", JSON.stringify(user));
  }
};

export const validate = {
  objectId: async (id: string) => {
    if (isBrowser()) return true; // Skip validation on client-side
    const mongoose = await getMongoose();
    if (!mongoose) return true;
    return mongoose.Types.ObjectId.isValid(id);
  },
  email: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  password: (password: string) => 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(password),
  required: (value: unknown) => value != null && value !== "",
  positiveNumber: (value: unknown) => !isNaN(Number(value)) && Number(value) > 0,
  arrayNotEmpty: (arr: unknown[]) => Array.isArray(arr) && arr.length > 0
};

export const dbHelpers = {
  regexFilter: (field: string, value: string) => ({ [field]: { $regex: value, $options: "i" } }),
  buildQuery: (filters: Record<string, unknown>) => {
    return Object.entries(filters).reduce((query, [key, value]) => {
      if (value) {
        query[key] = { $regex: value, $options: "i" };
      }
      return query;
    }, {} as Record<string, unknown>);
  }
};
