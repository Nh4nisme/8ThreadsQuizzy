"use client";

import {
  AUTH_API_BASE,
  AUTH_TOKEN_COOKIE,
  AUTH_TOKEN_STORAGE_KEY,
  AUTH_USER_STORAGE_KEY,
} from "./auth-config.js";

const getJson = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Authentication request failed");
  }

  return data;
};

export const setAuthCookie = (token) => {
  const maxAge = 60 * 60;
  document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${maxAge}; samesite=lax`;
};

export const clearAuthCookie = () => {
  document.cookie = `${AUTH_TOKEN_COOKIE}=; path=/; max-age=0; samesite=lax`;
};

export const persistAuthSession = ({ token, user }) => {
  localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
  localStorage.setItem(AUTH_USER_STORAGE_KEY, JSON.stringify(user));
  setAuthCookie(token);
};

export const clearAuthSession = () => {
  localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  localStorage.removeItem(AUTH_USER_STORAGE_KEY);
  clearAuthCookie();
};

export const getStoredUser = () => {
  const rawUser = localStorage.getItem(AUTH_USER_STORAGE_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch {
    return null;
  }
};

export const getStoredToken = () => localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

export const registerRequest = async (payload) => {
  const response = await fetch(`${AUTH_API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return getJson(response);
};

export const loginRequest = async (payload) => {
  const response = await fetch(`${AUTH_API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  return getJson(response);
};

export const getCurrentUserRequest = async (token) => {
  const response = await fetch(`${AUTH_API_BASE}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return getJson(response);
};
