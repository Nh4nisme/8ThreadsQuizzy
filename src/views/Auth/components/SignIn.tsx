// @ts-ignore

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "../styles/Login.module.css";
import { Lock, Mail } from "lucide-react";
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import { useAuth } from "../../../context/AuthContext.jsx";
import { getDefaultRouteForRole } from "../../../lib/auth-routes.js";

export const SignIn = ({ onSwitchSignUp }: { onSwitchSignUp: () => void }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: "email" | "password", value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.email.trim() || !formData.password.trim()) {
      setError("Email and password are required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const user = await login({
        email: formData.email.trim(),
        password: formData.password,
      });

      const redirectPath =
        searchParams.get("redirect") || getDefaultRouteForRole(user?.role);
      router.push(redirectPath);
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Unable to sign in.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className={styles.formSingle}>
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
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
        <div style={{ display: "flex", gap: 5 }}>
          <span>Dont have an account?</span>
          <span className={styles.switchLink} onClick={onSwitchSignUp}>
          Sign Up
        </span>
        </div>
      </div>
  );
};
