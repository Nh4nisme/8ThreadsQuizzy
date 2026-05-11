"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { useAuth } from "../../context/AuthContext.jsx";
import { getDefaultRouteForRole } from "../../lib/auth-routes.js";

export default function AuthPage({ mode }) {
  const router = useRouter();
  const { isAuthenticated, isHydrated, user } = useAuth();
  const [isLogin, setIsLogin] = useState(mode === "signin");

  useEffect(() => {
    if (isHydrated && isAuthenticated) {
      router.replace(getDefaultRouteForRole(user?.role));
    }
  }, [isAuthenticated, isHydrated, router, user?.role]);

  return isLogin ? (
      <SignIn onSwitchSignUp={() => setIsLogin(false)} />
  ) : (
      <SignUp onSwitchSignIn={() => setIsLogin(true)} />
  );
}
