import { useState } from "react";
// @ts-ignore

import styles from "../styles/Login.module.css";
import { Lock, Mail, UserRound } from "lucide-react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

export const SignIn = ({ onSwitchSignUp }: { onSwitchSignUp: () => void }) => {
  const [role, setRole] = useState("student");
  return (
    <div className={styles.signUp}>
      <div className={styles.heading}>
        <h3>Welcome back</h3>
        <p>Enter your credentials to access your account</p>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.smallBox}>
          <FaGoogle />
          <p>Google</p>
        </div>
        <div className={styles.smallBox}>
          <FaFacebookF />
          <p>Facebook</p>
        </div>
      </div>
      <div className={styles.divider}>
        <hr />
        <span>OR</span>
        <hr />
      </div>
      <div className={styles.form}>
        <div className={styles.inputCard}>
          <h3>Username</h3>
          <div className={styles.inputWrapper}>
            <UserRound size={18} className={styles.inputIcon} />
            <input
              type="text"
              placeholder="John Doe"
              className={styles.inputBox}
            />
          </div>
        </div>
        <div className={styles.inputCard}>
          <h3>Email</h3>
          <div className={styles.inputWrapper}>
            <Mail size={18} className={styles.inputIcon} />
            <input
              type="text"
              placeholder="Name@example.com"
              className={styles.inputBox}
            />
          </div>
        </div>
        <div className={styles.inputCard}>
          <h3>Password</h3>
          <div className={styles.inputWrapper}>
            <Lock size={18} className={styles.inputIcon} />
            <input
              type="password"
              placeholder="************"
              className={styles.inputBox}
            />
          </div>
        </div>
      </div>
      <button className={`${styles.signUpBtn} ${styles.btn}`}>Sign Up</button>
      <div style={{ display: "flex", gap: 5 }}>
        <span>Dont have an account?</span>
        <span className={styles.switchLink} onClick={onSwitchSignUp}>
          Sign Up
        </span>
      </div>
    </div>
  );
};
