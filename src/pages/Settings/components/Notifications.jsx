import { useState } from "react";
import "../styles/setting.css"

function SettingRow({title, desc, active, onToggle}){

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

      <div className={`toggle ${active ? "active":""}`} onClick={onToggle}></div>

    </div>

  )

}

export default function Notifications(){
  const [emailNotifications, setEmailNotifications] = useState({
    "Quiz Completions": true,
    "Event Reminders": true,
    "New Student Joins": true,
    "Marketing & Updates": false
  });

  const [inAppNotifications, setInAppNotifications] = useState({
    "Quiz Completions": true,
    "Event Reminders": true,
    "New Student Joins": true
  });

  const [frequency, setFrequency] = useState("Immediately");

  const handleEmailToggle = (key) => {
    setEmailNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInAppToggle = (key) => {
    setInAppNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    alert("Notification preferences saved!");
  };

  return(

    <div className="privacy-card">

      <h2 className="privacy-title">
        Notification Preferences
      </h2>

      <p className="privacy-sub">
        Choose how and when you want to be notified
      </p>


      {/* Email Notifications */}

      <div className="section">

        <h3>Email Notifications</h3>

        <SettingRow
          title="Quiz Completions"
          desc="Receive notifications when students complete your quizzes"
          active={emailNotifications["Quiz Completions"]}
          onToggle={() => handleEmailToggle("Quiz Completions")}
        />

        <SettingRow
          title="Event Reminders"
          desc="Get reminders before your scheduled quiz events"
          active={emailNotifications["Event Reminders"]}
          onToggle={() => handleEmailToggle("Event Reminders")}
        />

        <SettingRow
          title="New Student Joins"
          desc="Be notified when new students join your classes"
          active={emailNotifications["New Student Joins"]}
          onToggle={() => handleEmailToggle("New Student Joins")}
        />

        <SettingRow
          title="Marketing & Updates"
          desc="Receive news, updates, and promotional emails"
          active={emailNotifications["Marketing & Updates"]}
          onToggle={() => handleEmailToggle("Marketing & Updates")}
        />

      </div>


      <hr/>


      {/* In App Notifications */}

      <div className="section">

        <h3>In-App Notifications</h3>

        <SettingRow
          title="Quiz Completions"
          desc="Receive notifications when students complete your quizzes"
          active={inAppNotifications["Quiz Completions"]}
          onToggle={() => handleInAppToggle("Quiz Completions")}
        />

        <SettingRow
          title="Event Reminders"
          desc="Get reminders before your scheduled quiz events"
          active={inAppNotifications["Event Reminders"]}
          onToggle={() => handleInAppToggle("Event Reminders")}
        />

        <SettingRow
          title="New Student Joins"
          desc="Be notified when new students join your classes"
          active={inAppNotifications["New Student Joins"]}
          onToggle={() => handleInAppToggle("New Student Joins")}
        />

      </div>


      <hr/>


      {/* Frequency */}

      <div className="section">

        <h3>Notification Frequency</h3>

        <div className="radio-group">

          <label>
            <input 
              type="radio" 
              name="freq" 
              checked={frequency === "Immediately"}
              onChange={() => setFrequency("Immediately")}
            />
            Immediately
          </label>

          <label>
            <input 
              type="radio" 
              name="freq" 
              checked={frequency === "Daily Digest"}
              onChange={() => setFrequency("Daily Digest")}
            />
            Daily Digest
          </label>

          <label>
            <input 
              type="radio" 
              name="freq" 
              checked={frequency === "Weekly Digest"}
              onChange={() => setFrequency("Weekly Digest")}
            />
            Weekly Digest
          </label>

        </div>

      </div>


      <button className="save-btn" onClick={handleSave}>
        Save Preferences
      </button>

    </div>

  )

}