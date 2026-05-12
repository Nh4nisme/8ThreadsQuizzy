import React from "react";
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
            <button 
                onClick={handleGetStarted}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-orange-500 text-white font-medium text-lg shadow-md hover:opacity-90 transition active:scale-95"
            >
                Get Started
            </button>
            <button
                type="button"
                onClick={onExplore}
                className="px-6 py-3 rounded-lg bg-white text-black font-medium text-lg shadow-md hover:bg-gray-200 transition active:scale-95"
            >
                Explore Quizzes
            </button>
        </div>
    );
}
