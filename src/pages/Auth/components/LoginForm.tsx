import { useState } from "react";
import styles from "../styles/Login.module.css";
import { SignUp } from "./SignUp";
import { SignIn } from "./SignIn";
export const LoginForm = () => {
  const [currentView, setCurrentView] = useState("signUp");

  return (
    <div className={styles.body}>
      <div className={styles.bodyLeft}>
        <div className={`${styles.grid} ${styles.gridTop}`}></div>
        <div className={`${styles.grid} ${styles.gridBottom}`}></div>
        <h1 className={styles.logo}>Quizzy</h1>
      </div>
      <div className={styles.bodyRight}>
        {currentView === "signUp" && (
          <SignUp onSwitchSignIn={() => setCurrentView("signIn")}></SignUp>
        )}
        {currentView === "signIn" && (
          <SignIn onSwitchSignUp={() => setCurrentView("signUp")}></SignIn>
        )}
      </div>
    </div>
  );
};
