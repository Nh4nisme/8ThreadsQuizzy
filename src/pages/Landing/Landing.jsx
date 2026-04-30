import React, {useState} from "react";
import Header from "../../components/ui/Header.jsx";
import LandingHero from "./components/LandingHero.jsx";
import AuthModal from "../Auth/AuthModal.jsx";

export default function Landing() {

    const [authMode, setAuthMode] = useState(null);
    // null | "signin" | "signup"
    return (
        <>
            <Header
                onSignIn={() => setAuthMode("signin")}
                onSignUp={() => setAuthMode("signup")}
            />
            <LandingHero/>

            {authMode && (
                <AuthModal
                    mode={authMode}
                    onClose={() => setAuthMode(null)}
                />
            )}
        </>
    );
}
