import React from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../../../context/AuthContext.jsx";
import { useRouter } from "next/navigation";

export default function HeroActions({ onExplore, onGetStarted }) {
    const { isAuthenticated, user } = useAuth();
    const router = useRouter();

    const handleGetStarted = () => {
        if (isAuthenticated) {
            router.push(user.role === "teacher" ? "/dashboard" : "/quizzes");
        } else {
            onGetStarted?.();
        }
    };

    return (
        <div className="mt-8 flex gap-4">
            <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-orange-500 text-white font-medium text-lg shadow-md hover:opacity-90 transition"
            >
                Get Started
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={onExplore}
                className="px-6 py-3 rounded-lg bg-white text-black font-medium text-lg shadow-md transition"
            >
                Explore Quizzes
            </motion.button>
        </div>
    );
}
