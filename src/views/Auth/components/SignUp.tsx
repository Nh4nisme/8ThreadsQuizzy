import { useState } from "react";
// @ts-ignore

import { useRouter } from "next/navigation";
import styles from "../styles/Login.module.css";
import {
  GraduationCap,
  Lock,
  Mail,
  Presentation,
  UserRound,
} from "lucide-react";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getDefaultRouteForRole } from "../../../lib/auth-routes.js";

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

  const handleChange = (
    field: "fullName" | "username" | "email" | "password",
    value: string,
  ) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !formData.fullName.trim() ||
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const user = await register({
        ...formData,
        fullName: formData.fullName.trim(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        role,
      });
      router.push(getDefaultRouteForRole(user?.role));
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to create account.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
                  value={formData.fullName}
                  onChange={(event) => handleChange("fullName", event.target.value)}
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
                  value={formData.username}
                  onChange={(event) => handleChange("username", event.target.value)}
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
                  value={formData.email}
                  onChange={(event) => handleChange("email", event.target.value)}
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
                  value={formData.password}
                  onChange={(event) => handleChange("password", event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSubmit();
                    }
                  }}
              />
            </div>
          </div>
        </div>
        {error ? <p className={styles.errorText}>{error}</p> : null}
        <button
          type="button"
          disabled={isSubmitting}
          onClick={handleSubmit}
          className={`${styles.signUpBtn} ${styles.btn}`}
        >
          {isSubmitting ? "Creating Account..." : "Sign Up"}
        </button>
        <div style={{ display: "flex", gap: 5 }}>
          <span>Already have an account?</span>
          <span className={styles.switchLink} onClick={onSwitchSignIn}>
          Sign In
        </span>
        </div>
      </div>
  );
};
