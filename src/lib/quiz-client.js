"use client";

import { AUTH_TOKEN_STORAGE_KEY, AUTH_API_BASE } from "./auth-config.js";

const QUIZ_API_BASE = AUTH_API_BASE.replace(/\/auth$/, "/quizzes");

const getJson = async (response) => {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Quiz request failed");
  }

  return data;
};

const getAuthHeaders = () => {
  const token = localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
};

export const fetchStudentQuizzes = async () => {
  const response = await fetch(`${QUIZ_API_BASE}/student`, {
    cache: "no-store",
  });

  return getJson(response);
};

export const fetchStudentQuizBySlug = async (slug) => {
  const response = await fetch(`${QUIZ_API_BASE}/student/slug/${slug}`, {
    cache: "no-store",
  });

  return getJson(response);
};

export const fetchTeacherQuizzes = async () => {
  const response = await fetch(`${QUIZ_API_BASE}`, {
    headers: {
      ...getAuthHeaders(),
    },
    cache: "no-store",
  });

  return getJson(response);
};

export const fetchQuizDetail = async (quizId) => {
  const response = await fetch(`${QUIZ_API_BASE}/${quizId}`, {
    headers: {
      ...getAuthHeaders(),
    },
    cache: "no-store",
  });

  return getJson(response);
};

export const createQuizRequest = async (payload) => {
  const response = await fetch(`${QUIZ_API_BASE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  return getJson(response);
};

export const updateQuizRequest = async (quizId, payload) => {
  const response = await fetch(`${QUIZ_API_BASE}/${quizId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  return getJson(response);
};

export const duplicateQuizRequest = async (quizId) => {
  const response = await fetch(`${QUIZ_API_BASE}/${quizId}/duplicate`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return getJson(response);
};

export const deleteQuizRequest = async (quizId) => {
  const response = await fetch(`${QUIZ_API_BASE}/${quizId}`, {
    method: "DELETE",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return getJson(response);
};

export const createQuizAttemptRequest = async (quizId) => {
  const response = await fetch(`${QUIZ_API_BASE}/${quizId}/attempts`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
    },
  });

  return getJson(response);
};

export const submitQuizAttemptRequest = async (quizId, attemptId, responses) => {
  const response = await fetch(`${QUIZ_API_BASE}/${quizId}/attempts/${attemptId}/submit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify({ responses }),
  });

  return getJson(response);
};
