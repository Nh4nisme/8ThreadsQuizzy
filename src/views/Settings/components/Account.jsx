"use client";

import { useState, useEffect } from "react";
import { toast } from "../../../components/ui/Toast.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";
import { updatePasswordRequest, requestDeletionRequest, cancelDeletionRequest } from "../../../lib/quiz-client.js";
import "../styles/setting.css"

function SettingRow({ title, desc, children }) {
  return (
    <div className="setting-row">
      <div className="setting-text">
        <div className="setting-title">
          {title}
        </div>
        <div className="setting-desc">
          {desc}
        </div>
      </div>
      {children}
    </div>
  )
}

export default function Account({ user }) {
  const { refreshUser } = useAuth();
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [isUpdating, setIsUpdating] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [connectedAccounts, setConnectedAccounts] = useState({
    Google: false,
    Facebook: false,
    X: false
  });

  const [deletionTimeLeft, setDeletionTimeLeft] = useState(null);
  const [deletionRequestedAt, setDeletionRequestedAt] = useState(user?.deletionRequestedAt || null);

  useEffect(() => {
    if (!deletionRequestedAt) {
      setDeletionTimeLeft(null);
      return;
    }

    const calculateTimeLeft = () => {
      const requestedDate = new Date(deletionRequestedAt);
      const targetDate = new Date(requestedDate.getTime() + 48 * 60 * 60 * 1000);
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) return "Expired";

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    };

    setDeletionTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setDeletionTimeLeft(calculateTimeLeft());
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [deletionRequestedAt]);

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdatePassword = async () => {
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match!");
      return;
    }
    if (!passwords.current || !passwords.new) {
      toast.error("Please fill all password fields!");
      return;
    }

    setIsUpdating(true);
    try {
      await updatePasswordRequest(passwords.current, passwords.new);
      toast.success("Password updated successfully!");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (error) {
      toast.error("Failed to update password: " + error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleConnect = (account) => {
    setConnectedAccounts(prev => ({ ...prev, [account]: !prev[account] }));
    toast.info(`${account} ${connectedAccounts[account] ? 'disconnected' : 'connected'}!`);
  };

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      const res = await requestDeletionRequest();
      setDeletionRequestedAt(res.deletionRequestedAt);
      await refreshUser();
      setShowDeleteConfirm(false);
      toast.info("Account deletion scheduled for 48 hours from now.");
    } catch (error) {
      toast.error("Failed to request deletion: " + error.message);
    }
  };

  const handleCancelDeletion = async () => {
    try {
      await cancelDeletionRequest();
      setDeletionRequestedAt(null);
      await refreshUser();
      toast.success("Account deletion cancelled.");
    } catch (error) {
      toast.error("Failed to cancel deletion: " + error.message);
    }
  };

  return (
    <div className="privacy-card">
      <h2 className="privacy-title">
        Account Settings
      </h2>
      <p className="privacy-sub">
        Manage your account security and connections
      </p>

      {/* Account Security */}
      <div className="section">
        <h3>Password</h3>
        <div className="form-group">
          <label>Current Password</label>
          <input 
            type="password" 
            value={passwords.current}
            onChange={(e) => handlePasswordChange('current', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>New Password</label>
          <input 
            type="password" 
            value={passwords.new}
            onChange={(e) => handlePasswordChange('new', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password</label>
          <input 
            type="password" 
            value={passwords.confirm}
            onChange={(e) => handlePasswordChange('confirm', e.target.value)}
          />
        </div>
        <button 
          className={`save-btn ${isUpdating ? "opacity-50 cursor-not-allowed" : ""}`} 
          onClick={handleUpdatePassword}
          disabled={isUpdating}
        >
          {isUpdating ? "Updating..." : "Update Password"}
        </button>
      </div>

      <hr />

      {/* Two Factor */}
      <div className="section">
        <h3>Two-Factor Authentication</h3>
        <SettingRow
          title="Enable Two-Factor Authentication"
          desc="Receive a verification code via email or authenticator app"
        >
          <div 
            className={`toggle ${twoFactorEnabled ? "active" : ""}`} 
            onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
          ></div>
        </SettingRow>
      </div>

      <hr />

      {/* Connected Accounts */}
      <div className="section">
        <h3>Connected Accounts</h3>
        <SettingRow
          title="Google"
          desc="Connect your Google account"
        >
          <button 
            className={`connect-btn ${connectedAccounts.Google ? "connected" : ""}`}
            onClick={() => handleConnect('Google')}
          >
            {connectedAccounts.Google ? "Connected" : "Connect"}
          </button>
        </SettingRow>
        <SettingRow
          title="Facebook"
          desc="Connect your Facebook account"
        >
          <button 
            className={`connect-btn ${connectedAccounts.Facebook ? "connected" : ""}`}
            onClick={() => handleConnect('Facebook')}
          >
            {connectedAccounts.Facebook ? "Connected" : "Connect"}
          </button>
        </SettingRow>
        <SettingRow
          title="X"
          desc="Connect your X account"
        >
          <button 
            className={`connect-btn ${connectedAccounts.X ? "connected" : ""}`}
            onClick={() => handleConnect('X')}
          >
            {connectedAccounts.X ? "Connected" : "Connect"}
          </button>
        </SettingRow>
      </div>

      <hr />

      {/* Danger Zone */}
      <div className="section">
        <h3>Danger Zone</h3>
        <div className="danger-box">
          {deletionRequestedAt ? (
            <div className="w-full">
              <div className="flex justify-between items-center bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-4">
                <div>
                  <div className="text-red-400 font-bold">Deletion Scheduled</div>
                  <div className="text-xs text-red-300/70">Your account will be permanently deleted in {deletionTimeLeft}</div>
                </div>
                <button 
                  onClick={handleCancelDeletion}
                  className="px-4 py-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg hover:bg-emerald-500/30 transition-all text-sm font-bold"
                >
                  Undo Deletion
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center w-full">
              <div>
                <div className="setting-title text-red-500">
                  Delete Account
                </div>
                <div className="setting-desc">
                  Once you delete your account, there is no going back.
                  All your data will be permanently removed.
                </div>
              </div>
              <button className="delete-btn" onClick={() => setShowDeleteConfirm(true)}>
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-[#1a1a1f] border border-red-500/20 rounded-3xl p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Confirm Deletion</h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Are you sure you want to schedule your account for deletion? 
                <span className="block mt-2 font-semibold text-red-400">You will have 48 hours to undo this action.</span>
              </p>
              <div className="flex flex-col w-full gap-3">
                <button 
                  onClick={handleDeleteAccount}
                  className="w-full py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95"
                >
                  Yes, Schedule Deletion
                </button>
                <button 
                  onClick={() => setShowDeleteConfirm(false)}
                  className="w-full py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-2xl font-bold transition-all active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}