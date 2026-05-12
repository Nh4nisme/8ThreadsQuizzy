"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Lock,
  Mail,
  Presentation,
  UserRound,
  Github,
  Chrome
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getDefaultRouteForRole } from "../../../lib/auth-routes.js";
import { motion } from "framer-motion";
import { toast } from "../../../components/ui/Toast.jsx";

export const SignUp = ({ onSwitchSignIn }: { onSwitchSignIn: () => void }) => {
  const router = useRouter();
  const { register } = useAuth();
  const [role, setRole] = useState("student");
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: "fullName" | "username" | "email" | "password", value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.fullName.trim() || !formData.username.trim() || !formData.email.trim() || !formData.password.trim()) {
      setError("All fields required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const user = await register({
        ...formData,
        role,
      });
      toast.success("Account forged successfully!");
      router.push(getDefaultRouteForRole(user?.role));
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Access denied.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 pb-8">
      <div>
        <h3 className="text-3xl font-black text-white mb-2">Create Identity</h3>
        <p className="text-text-secondary font-medium">Begin your journey in the 8Threads ecosystem.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { id: "student", label: "Student", icon: GraduationCap, desc: "Solve challenges" },
          { id: "teacher", label: "Teacher", icon: Presentation, desc: "Craft challenges" }
        ].map((opt) => (
          <button
            key={opt.id}
            onClick={() => setRole(opt.id)}
            className={`flex flex-col items-start gap-3 p-5 rounded-3xl border-2 transition-all duration-300 text-left ${
              role === opt.id ? "border-accent bg-accent/10 shadow-lg shadow-accent/5" : "border-white/5 bg-white/5 hover:border-white/10"
            }`}
          >
            <opt.icon size={24} className={role === opt.id ? "text-accent" : "text-text-muted"} />
            <div>
               <p className="font-black text-sm text-white">{opt.label}</p>
               <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest mt-1">{opt.desc}</p>
            </div>
          </button>
        ))}
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
        <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">or manually provide</span>
        <div className="h-[1px] flex-1 bg-white/5" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Full Name</label>
          <div className="relative group">
            <UserRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              placeholder="John Doe"
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-xs font-bold focus:border-accent outline-none transition-all"
              value={formData.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Username</label>
          <div className="relative group">
            <UserRound size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" />
            <input
              type="text"
              placeholder="johndoe8"
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-xs font-bold focus:border-accent outline-none transition-all"
              value={formData.username}
              onChange={(e) => handleChange("username", e.target.value)}
            />
          </div>
        </div>

        <div className="col-span-full space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Email Address</label>
          <div className="relative group">
            <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" />
            <input
              type="email"
              placeholder="name@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-xs font-bold focus:border-accent outline-none transition-all"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
        </div>

        <div className="col-span-full space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Security Key</label>
          <div className="relative group">
            <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors" />
            <input
              type="password"
              placeholder="••••••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-11 pr-4 py-4 text-xs font-bold focus:border-accent outline-none transition-all"
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
        {isSubmitting ? "Forging Identity..." : "Create Account & Enter"}
      </button>

      <p className="text-center text-sm font-medium text-text-secondary">
        Already registered?{" "}
        <button onClick={onSwitchSignIn} className="text-accent font-black hover:underline transition-all">
          Sign In
        </button>
      </p>
    </div>
  );
};
