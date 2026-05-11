import { useEffect, useMemo, useState } from "react";
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
  const [avatar, setAvatar] = useState(null);
  const [profile, setProfile] = useState(() => getInitialProfileState(user));

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

  return (
    <div className="privacy-card">
      <h2 className="privacy-title">Profile Information</h2>
      <p className="privacy-sub">
        Review the account details loaded from your current user session.
      </p>

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
            Change Photo
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

          <div className="form-group">
            <label>Role</label>
            <input
              value={profile.role}
              onChange={(event) => handleChange("role", event.target.value)}
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

      <div className="support">
        <span>Loaded from your authenticated user record.</span>
      </div>
    </div>
  );
}
