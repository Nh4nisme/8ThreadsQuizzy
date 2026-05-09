import { useState } from "react";
import "../styles/setting.css"


function SettingRow({title,desc,children}){

  return(

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


export default function Account(){
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [connectedAccounts, setConnectedAccounts] = useState({
    Google: false,
    Facebook: false,
    X: false
  });

  const handlePasswordChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdatePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!");
      return;
    }
    if (!passwords.current || !passwords.new) {
      alert("Please fill all password fields!");
      return;
    }
    alert("Password updated successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleConnect = (account) => {
    setConnectedAccounts(prev => ({ ...prev, [account]: !prev[account] }));
    alert(`${account} ${connectedAccounts[account] ? 'disconnected' : 'connected'}!`);
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      alert("Account deletion initiated. You will receive a confirmation email.");
    }
  };

  return(

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

        <button className="save-btn" onClick={handleUpdatePassword}>
          Update Password
        </button>

      </div>


      <hr/>


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


      <hr/>


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


      <hr/>


      {/* Danger Zone */}

      <div className="section">

        <h3>Danger Zone</h3>

        <div className="danger-box">

          <div>

            <div className="setting-title">
              Delete Account
            </div>

            <div className="setting-desc">
              Once you delete your account, there is no going back.
              All your data will be permanently removed.
            </div>

          </div>

          <button className="delete-btn" onClick={handleDeleteAccount}>
            Delete Account
          </button>

        </div>

      </div>

    </div>

  )

}