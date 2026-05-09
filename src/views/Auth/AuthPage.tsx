"use client";

import { useState } from "react";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";

export default function AuthPage({ mode }) {
  const [isLogin, setIsLogin] = useState(mode === "signin");

  return isLogin ? (
      <SignIn onSwitchSignUp={() => setIsLogin(false)} />
  ) : (
      <SignUp onSwitchSignIn={() => setIsLogin(true)} />
  );
}
