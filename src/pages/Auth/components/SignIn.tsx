import { useState } from "react";
import styles from "../styles/Login.module.css";
import { GraduationCap, Presentation } from "lucide-react";

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
          <p>Google</p>
        </div>
        <div className={styles.smallBox}>
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
          <input
            type="text"
            placeholder="John Doe"
            className={styles.inputBox}
          />
        </div>
        <div className={styles.inputSmallCard}>
          <h3>Username</h3>
          <input
            type="text"
            placeholder="John Doe"
            className={styles.inputBox}
          />
        </div>
        <div className={styles.inputCard}>
          <h3>Email</h3>
          <input
            type="text"
            placeholder="John Doe"
            className={styles.inputBox}
          />
        </div>
        <div className={styles.inputCard}>
          <h3>Password</h3>
          <input
            type="password"
            placeholder="John Doe"
            className={styles.inputBox}
          />
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
