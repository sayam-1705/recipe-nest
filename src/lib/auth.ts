const TOKEN_EXPIRY_MS = 60 * 60 * 1000;

interface TokenData {
  token: string;
  timestamp: number;
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;

  const tokenData = getTokenData();
  if (!tokenData) return false;

  const now = Date.now();
  if (now - tokenData.timestamp > TOKEN_EXPIRY_MS) {
    clearAuth();
    return false;
  }

  return true;
}

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  if (!isAuthenticated()) return null;

  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function setAuth(token: string, user: User): void {
  if (typeof window === "undefined") return;

  const tokenData: TokenData = {
    token,
    timestamp: Date.now(),
  };

  localStorage.setItem("authToken", JSON.stringify(tokenData));
  localStorage.setItem("user", JSON.stringify(user));
  window.dispatchEvent(new Event("authChange"));
}

export function clearAuth(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  window.dispatchEvent(new Event("authChange"));
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;

  const tokenData = getTokenData();
  if (!tokenData) return null;

  const now = Date.now();
  if (now - tokenData.timestamp > TOKEN_EXPIRY_MS) {
    clearAuth();
    return null;
  }

  return tokenData.token;
}

function getTokenData(): TokenData | null {
  const stored = localStorage.getItem("authToken");
  if (!stored) return null;

  try {
    const parsed = JSON.parse(stored);
    if (parsed.token && parsed.timestamp) {
      return parsed as TokenData;
    }
    return {
      token: stored,
      timestamp: Date.now(),
    };
  } catch {
    return {
      token: stored,
      timestamp: Date.now(),
    };
  }
}
