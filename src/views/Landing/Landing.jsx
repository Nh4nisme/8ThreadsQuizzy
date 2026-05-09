"use client";

import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/ui/Header.jsx";
import LandingHero from "./components/LandingHero.jsx";
import LandingSections from "./components/LandingSections.jsx";
import AuthModal from "../Auth/AuthModal.jsx";

export default function Landing() {
    const [authMode, setAuthMode] = useState(null);
    const [isExploreUnlocked, setIsExploreUnlocked] = useState(false);
    const exploreSectionRef = useRef(null);

    // null | "signin" | "signup"
    useEffect(() => {
        document.body.style.overflow = isExploreUnlocked ? "" : "hidden";

        if (isExploreUnlocked) {
            // Đảm bảo section đã render xong mới scroll
            setTimeout(() => {
                exploreSectionRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }, 0);
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isExploreUnlocked]);

    const handleExplore = () => {
        setIsExploreUnlocked(true);
    };

    return (
        <>
            <Header
                onSignIn={() => setAuthMode("signin")}
                onSignUp={() => setAuthMode("signup")}
            />
            <LandingHero onExplore={handleExplore} />
            <LandingSections ref={exploreSectionRef} />

            {authMode && (
                <AuthModal
                    mode={authMode}
                    onClose={() => setAuthMode(null)}
                />
            )}
        </>
    );
}
