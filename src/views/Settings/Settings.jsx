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
import { FadeIn, StaggerContainer, StaggerItem } from "../../components/ui/Motion.jsx";
import { Settings as SettingsIcon } from "lucide-react";

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
      <div className="max-w-6xl mx-auto py-4">
         <StaggerContainer className="space-y-10">
            <FadeIn className="flex flex-col gap-2">
               <h1 className="text-4xl font-black tracking-tight text-white">System Settings</h1>
               <p className="text-text-secondary font-medium">Manage your identity, preferences, and security protocols.</p>
            </FadeIn>

            <StaggerItem>
               <TabMenu active={activeTab} setActive={setActiveTab} />
            </StaggerItem>

            <FadeIn delay={0.2} key={activeTab}>
               <div className="bg-[#0f0f12] border border-white/5 rounded-[40px] p-8 md:p-12 shadow-2xl backdrop-blur-xl relative overflow-hidden">
                  <ActiveTabComponent user={user} />

                  {/* Subtle background glow */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-[100px] pointer-events-none" />
               </div>
            </FadeIn>
         </StaggerContainer>
      </div>
   );
}
