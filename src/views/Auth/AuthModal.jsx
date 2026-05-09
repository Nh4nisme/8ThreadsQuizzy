"use client";

import { useState } from "react";
import { SignUp } from "./components/SignUp.tsx";
import { SignIn } from "./components/SignIn.tsx";

export default function AuthModal({ mode, onClose }) {
  const [isLogin, setIsLogin] = useState(mode === "signin");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-white/2 backdrop-blur-md"
        onClick={onClose}
      />

      <div className="relative z-10 w-[1100px] max-w-[95vw] min-h-[600px] max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl flex">
        <div className="w-1/2 bg-black flex items-center justify-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#5813C1] to-[#C45037] bg-clip-text text-transparent">
            Quizzy
          </h1>
        </div>

        <div className="w-1/2 p-10 overflow-y-auto flex flex-col justify-center">
          <button onClick={onClose} className="absolute top-3 right-4 text-lg">
            ×
          </button>

          <div className="w-full max-w-[420px] mx-auto">
            {isLogin ? (
              <SignIn onSwitchSignUp={() => setIsLogin(false)} />
            ) : (
              <SignUp onSwitchSignIn={() => setIsLogin(true)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
