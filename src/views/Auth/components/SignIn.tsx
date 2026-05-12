"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Mail, Github, Chrome } from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getDefaultRouteForRole } from "../../../lib/auth-routes.js";
import { motion } from "framer-motion";
import { toast } from "../../../components/ui/Toast.jsx";

export const SignIn = ({ onSwitchSignUp }: { onSwitchSignUp: () => void }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: "email" | "password", value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Credentials required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const user = await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      const redirectPath = searchParams.get("redirect") || getDefaultRouteForRole(user?.role);
      toast.success("Welcome back!");
      router.push(redirectPath);
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Access denied.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-black text-white mb-2">Welcome Back</h3>
        <p className="text-text-secondary font-medium">Enter your credentials to access your terminal.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-3 px-4 py-3 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all font-bold text-sm">
           <Chrome size={18} /> Google
        </button>
        <button className="flex items-center justify-center gap-3 px-4 py-3 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all font-bold text-sm">
           <Github size={18} /> GitHub
        </button>
      </div>

      <div className="relative flex items-center gap-4">
        <div className="h-[1px] flex-1 bg-white/5" />
        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">or continue with</span>
        <div className="h-[1px] flex-1 bg-white/5" />
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Identification</label>
          <div className="relative group">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" />
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:border-accent outline-none transition-all"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Security Key</label>
          <div className="relative group">
            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" />
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold focus:border-accent outline-none transition-all"
              value={formData.password}
              onChange={(e) => handleChange("password", e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            />
          </div>
        </div>
      </div>

      {error && (
        <motion.p 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="text-xs font-bold text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20"
        >
          {error}
        </motion.p>
      )}

      <button
        disabled={isSubmitting}
        onClick={handleSubmit}
        className="w-full py-4 rounded-2xl bg-accent-gradient font-black text-sm text-white shadow-xl shadow-accent/20 hover:shadow-accent/40 transition-all disabled:opacity-50"
      >
        {isSubmitting ? "Verifying..." : "Sign In to Dashboard"}
      </button>

      <p className="text-center text-sm font-medium text-text-secondary">
        New explorer?{" "}
        <button onClick={onSwitchSignUp} className="text-accent font-black hover:underline transition-all">
          Create Account
        </button>
      </p>
    </div>
  );
};
