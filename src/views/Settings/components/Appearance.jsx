import { useState } from "react";
import "../styles/setting.css"
import { useTheme } from "../../../context/ThemeContext";

function ThemeCard({title, active, onClick, icon}){
  return(
    <div className={`theme-card ${active ? "active":""}`} onClick={onClick}>
      <div className="theme-title">
        <span className="theme-icon">{icon}</span>
        {title}
        {active && <span className="check">✓</span>}
      </div>
      <div className="theme-preview">
        <div className="bar accent-bar"></div>
        <div className="bar gray"></div>
        <div className="bar gray"></div>
      </div>
    </div>
  )
}

function ColorCircle({color, label, active, onClick, gradient}){
  return(
    <div className="color-item" onClick={onClick}>
      <div
        className={`color-circle ${active ? "active":""}`}
        style={{background: gradient || color}}
      ></div>
      <span>{label}</span>
    </div>
  )
}

export default function Appearance(){
  const { theme, setTheme, accentColor, setAccentColor } = useTheme();
  const [notificationFreq, setNotificationFreq] = useState("Immediately");

  const themes = [
    { name: "light", label: "Light", icon: "☀" },
    { name: "dark", label: "Dark", icon: "☾" },
    { name: "system", label: "System", icon: "🌗" }
  ];

  const colors = [
    { id: "purple", color: "#7c3aed", gradient: "linear-gradient(135deg, #7c3aed, #a855f7)", label: "Purple" },
    { id: "blue", color: "#3b82f6", gradient: "linear-gradient(135deg, #3b82f6, #60a5fa)", label: "Blue" },
    { id: "green", color: "#10b981", gradient: "linear-gradient(135deg, #10b981, #34d399)", label: "Green" },
    { id: "red", color: "#ef4444", gradient: "linear-gradient(135deg, #ef4444, #f87171)", label: "Red" },
    { id: "amber", color: "#f59e0b", gradient: "linear-gradient(135deg, #f59e0b, #fbbf24)", label: "Amber" },
    { id: "pink", color: "#ec4899", gradient: "linear-gradient(135deg, #ec4899, #f472b6)", label: "Pink" }
  ];

  const handleSave = () => {
    // Context already saves to localStorage via useEffect
    alert("Appearance preferences saved successfully!");
  };

  return(
    <div className="appearance-card reveal-item reveal-visible">
      <h2 className="appearance-title">Appearance</h2>
      <p className="appearance-sub">Customize how 8Threads Quizzy looks for you</p>

      {/* THEME */}
      <h3 className="section-title">Theme</h3>
      <div className="theme-row">
        {themes.map(t => (
          <ThemeCard 
            key={t.name} 
            title={t.label} 
            icon={t.icon}
            active={theme === t.name} 
            onClick={() => setTheme(t.name)} 
          />
        ))}
      </div>

      <hr/>

      {/* ACCENT COLOR */}
      <h3 className="section-title">Accent Color</h3>
      <div className="color-row">
        {colors.map(c => (
          <ColorCircle 
            key={c.id} 
            color={c.color} 
            gradient={c.gradient}
            label={c.label} 
            active={accentColor === c.id} 
            onClick={() => setAccentColor(c.id)} 
          />
        ))}
      </div>

      <hr/>

      {/* NOTIFICATION */}
      <h3 className="section-title">Notification Frequency</h3>
      <div className="radio-group">
        <label className={notificationFreq === "Immediately" ? "active" : ""}>
          <input 
            type="radio" 
            name="notify" 
            checked={notificationFreq === "Immediately"}
            onChange={() => setNotificationFreq("Immediately")}
          />
          Immediately
        </label>

        <label className={notificationFreq === "Daily Digest" ? "active" : ""}>
          <input 
            type="radio" 
            name="notify" 
            checked={notificationFreq === "Daily Digest"}
            onChange={() => setNotificationFreq("Daily Digest")}
          />
          Daily Digest
        </label>

        <label className={notificationFreq === "Weekly Digest" ? "active" : ""}>
          <input 
            type="radio" 
            name="notify" 
            checked={notificationFreq === "Weekly Digest"}
            onChange={() => setNotificationFreq("Weekly Digest")}
          />
          Weekly Digest
        </label>
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save Preferences
      </button>

      <div className="support">
        <span>ⓘ Need help with your account settings?</span>
        <a href="#">Contact Support</a>
      </div>
    </div>
  )
}