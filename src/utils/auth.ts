interface User {
  _id?: string;
  id?: string;
  email?: string;
  name?: string;
}

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  const token = localStorage.getItem("authToken");
  return !!token;
};

export const getUser = () => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    // Also remove cookies if they exist
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/"; // Redirect to home page
  }
};

// Helper function to set both localStorage and cookies
export const setAuthData = (token: string, user: User | null) => {
  if (typeof window !== "undefined") {
    // Set localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    
    // Set cookies for server-side access
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString(); // 7 days
    document.cookie = `authToken=${token}; expires=${expires}; path=/; secure; sameSite=lax`;
    document.cookie = `user=${encodeURIComponent(JSON.stringify(user))}; expires=${expires}; path=/; secure; sameSite=lax`;
  }
};

// Helper function to get token from cookies (for server-side)
export const getTokenFromCookies = (cookieString: string): string | null => {
  const cookies = cookieString.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'authToken') {
      return value;
    }
  }
  return null;
};

// Helper function to get user from cookies (for server-side)
export const getUserFromCookies = (cookieString: string): User | null => {
  const cookies = cookieString.split(';');
  for (const cookie of cookies) {
    const [name, value] = cookie.trim().split('=');
    if (name === 'user') {
      try {
        return JSON.parse(decodeURIComponent(value));
      } catch (error) {
        console.error('Error parsing user cookie:', error);
        return null;
      }
    }
  }
  return null;
};
