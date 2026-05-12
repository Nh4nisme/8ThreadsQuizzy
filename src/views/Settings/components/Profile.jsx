"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "../../../components/ui/Toast.jsx";
import { updateProfileRequest } from "../../../lib/quiz-client.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import "../styles/setting.css";

const getInitialProfileState = (user) => {
  const fullName = user?.fullName?.trim() || "";
  const nameParts = fullName ? fullName.split(/\s+/) : [];
  const firstName = nameParts[0] || user?.username || "";
  const lastName = nameParts.slice(1).join(" ");

  return {
    firstName,
    lastName,
    username: user?.username || "",
    email: user?.email || "",
    role: user?.role ? `${user.role.charAt(0).toUpperCase()}${user.role.slice(1)}` : "",
    bio: user?.role === "teacher"
      ? "Teacher account ready to create quizzes, manage students, and track class performance."
      : "Student account ready to join quizzes, review progress, and stay consistent with learning goals.",
  };
};

export default function Profile({ user }) {
  const { refreshUser } = useAuth();
  const [avatar, setAvatar] = useState(null);
  const [profile, setProfile] = useState(() => getInitialProfileState(user));
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setProfile(getInitialProfileState(user));
  }, [user]);

  const initials = useMemo(() => {
    const source = `${profile.firstName} ${profile.lastName}`.trim() || profile.username || "U";
    return source
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join("");
  }, [profile.firstName, profile.lastName, profile.username]);

  const handleChange = (field, value) => {
    setProfile((current) => ({ ...current, [field]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const payload = {
        fullName: `${profile.firstName} ${profile.lastName}`.trim(),
        username: profile.username,
        email: profile.email,
      };
      await updateProfileRequest(payload);
      await refreshUser();
      toast.success("Profile updated successfully!");
    } catch (error) {
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="privacy-card">
      <div className="mb-6">
        <h2 className="privacy-title">Profile Information</h2>
        <p className="privacy-sub">
          Update your account details and how others see you.
        </p>
      </div>

      <div className="profile-layout">
        <div className="profile-avatar-block">
          <div className="profile-avatar">
            {avatar ? (
              <img
                src={avatar}
                alt="avatar preview"
                className="profile-avatar-image"
              />
            ) : (
              <span>{initials}</span>
            )}
          </div>

          <label className="btn-outline profile-upload-btn">
            <input
              type="file"
              accept="image/*"
              className="profile-file-input"
              onChange={handleFileChange}
            />
          </label>
        </div>

        <div className="profile-form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input
              value={profile.firstName}
              onChange={(event) => handleChange("firstName", event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              value={profile.lastName}
              onChange={(event) => handleChange("lastName", event.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Username</label>
            <input
              value={profile.username}
              onChange={(event) => handleChange("username", event.target.value)}
            />
          </div>

          <div className="form-group opacity-60">
            <label>Role (Read-only)</label>
            <input
              value={profile.role}
              disabled
              className="cursor-not-allowed"
            />
          </div>

          <div className="form-group profile-grid-full">
            <label>Email</label>
            <input
              value={profile.email}
              onChange={(event) => handleChange("email", event.target.value)}
            />
          </div>

          <div className="form-group profile-grid-full">
            <label>Bio</label>
            <textarea
              className="textarea"
              value={profile.bio}
              onChange={(event) => handleChange("bio", event.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSaveProfile}
          disabled={isSaving}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            isSaving
              ? "bg-gray-800 text-gray-500 cursor-not-allowed"
              : "bg-accent-gradient text-white shadow-lg shadow-accent/20 hover:scale-[1.02] active:scale-95"
          }`}
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="support mt-4">
        <span>Updates are synced directly to your account.</span>
      </div>
    </div>
  );
}
