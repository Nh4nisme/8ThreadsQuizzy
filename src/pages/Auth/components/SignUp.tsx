import { useState } from "react";
// @ts-ignore

import styles from "../styles/Login.module.css";
import {
  GraduationCap,
  Lock,
  Mail,
  Presentation,
  UserRound,
} from "lucide-react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

export const SignUp = ({ onSwitchSignIn }: { onSwitchSignIn: () => void }) => {
  const [role, setRole] = useState("student");
  return (
    <div className={styles.signUp}>
      <div className={styles.heading}>
        <h3>Create Account</h3>
        <p>Choose your account type and start your journey with us</p>
      </div>
      <div className={styles.wrapper}>
        <div
          className={`${styles.bigBox} ${role === "student" ? styles.activeBox : ""}`}
          onClick={() => setRole("student")}
        >
          <GraduationCap size={32}></GraduationCap>
          <h3>Student</h3>
          <p>Take quizzes and track your progress</p>
        </div>
        <div
          className={`${styles.bigBox} ${role === "teacher" ? styles.activeBox : ""}`}
          onClick={() => setRole("teacher")}
        >
          <Presentation size={32}></Presentation>
          <h3>Teacher</h3>
          <p>Create quizzes and manage students</p>
        </div>
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
        <div className={styles.inputSmallCard}>
          <h3>Full Name</h3>
          <div className={styles.inputWrapper}>
            <UserRound size={18} className={styles.inputIcon} />
            <input
              type="text"
              placeholder="John Doe"
              className={styles.inputBox}
            />
          </div>
        </div>
        <div className={styles.inputSmallCard}>
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
              placeholder="Name@example.come"
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
        <span>Already have an account?</span>
        <span className={styles.switchLink} onClick={onSwitchSignIn}>
          Sign In
        </span>
      </div>
    </div>
  );
};
