"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  clearAuthSession,
  getCurrentUserRequest,
  getStoredToken,
  getStoredUser,
  loginRequest,
  persistAuthSession,
  registerRequest,
} from "../lib/auth-client.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const syncSession = async () => {
      const token = getStoredToken();
      const storedUser = getStoredUser();

      if (!token) {
        clearAuthSession();
        setUser(null);
        setIsHydrated(true);
        return;
      }

      if (storedUser) {
        setUser(storedUser);
      }

      try {
        const { user: currentUser } = await getCurrentUserRequest(token);
        persistAuthSession({ token, user: currentUser });
        setUser(currentUser);
      } catch {
        clearAuthSession();
        setUser(null);
      } finally {
        setIsHydrated(true);
      }
    };

    syncSession();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isHydrated,
      async login(credentials) {
        const data = await loginRequest(credentials);
        persistAuthSession(data);
        setUser(data.user);
        return data.user;
      },
      async register(payload) {
        const data = await registerRequest(payload);
        persistAuthSession(data);
        setUser(data.user);
        return data.user;
      },
      logout() {
        clearAuthSession();
        setUser(null);
      },
    }),
    [isHydrated, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
