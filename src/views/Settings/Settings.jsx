"use client";

import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Account from "./components/Account.jsx";
import Appearance from "./components/Appearance.jsx";
import Billing from "./components/Billing.jsx";
import Notifications from "./components/Notifications.jsx";
import Privacy from "./components/Privacy.jsx";
import Profile from "./components/Profile.jsx";
import TabMenu from "./components/TabMenu.jsx";
import "./styles/setting.css";

const tabComponents = {
  Profile,
  Account,
  Notifications,
  Appearance,
  Privacy,
  Billing,
};

export default function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("Profile");
  const ActiveTabComponent = tabComponents[activeTab] || Profile;

  return (
    <div className="settings-container text-white">
      <div className="mb-6">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-desc">
          Manage your account settings and preferences
        </p>
      </div>

      <TabMenu active={activeTab} setActive={setActiveTab} />

      <ActiveTabComponent user={user} />
    </div>
  );
}
