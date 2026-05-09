import { useState } from "react";
import "../styles/setting.css"

function ThemeCard({title,active,onClick}){

return(

<div className={`theme-card ${active ? "active":""}`} onClick={onClick}>

<div className="theme-title">

<span className="theme-icon">☾</span>

{title}

{active && <span className="check">✓</span>}

</div>

<div className="theme-preview">

<div className="bar purple"></div>
<div className="bar gray"></div>
<div className="bar gray"></div>

</div>

</div>

)

}

function ColorCircle({color,label,active,onClick}){

return(

<div className="color-item" onClick={onClick}>

<div
className={`color-circle ${active ? "active":""}`}
style={{background:color}}
></div>

<span>{label}</span>

</div>

)

}

export default function Appearance(){
  const [theme, setTheme] = useState("Dark");
  const [accentColor, setAccentColor] = useState("#7c3aed");
  const [notificationFreq, setNotificationFreq] = useState("Immediately");

  const themes = ["Dark", "Light", "System"];
  const colors = [
    { color: "#7c3aed", label: "Purple" },
    { color: "#3b82f6", label: "Blue" },
    { color: "#22c55e", label: "Green" },
    { color: "#ef4444", label: "Red" },
    { color: "#f59e0b", label: "Amber" },
    { color: "#ec4899", label: "Pink" }
  ];

  const handleSave = () => {
    alert(`Settings saved!\nTheme: ${theme}\nAccent Color: ${accentColor}\nNotification: ${notificationFreq}`);
  };

return(

<div className="appearance-card">

<h2 className="appearance-title">
Appearance
</h2>

<p className="appearance-sub">
Customize how StuQuiz looks for you
</p>


{/* THEME */}

<h3 className="section-title">
Theme
</h3>

<div className="theme-row">

{themes.map(t => (
  <ThemeCard 
    key={t} 
    title={t} 
    active={theme === t} 
    onClick={() => setTheme(t)} 
  />
))}

</div>


<hr/>


{/* ACCENT COLOR */}

<h3 className="section-title">
Accent Color
</h3>

<div className="color-row">

{colors.map(c => (
  <ColorCircle 
    key={c.color} 
    color={c.color} 
    label={c.label} 
    active={accentColor === c.color} 
    onClick={() => setAccentColor(c.color)} 
  />
))}

</div>


<hr/>


{/* NOTIFICATION */}

<h3 className="section-title">
Notification Frequency
</h3>

<div className="radio-group">

<label>
<input 
  type="radio" 
  name="notify" 
  checked={notificationFreq === "Immediately"}
  onChange={() => setNotificationFreq("Immediately")}
/>
Immediately
</label>

<label>
<input 
  type="radio" 
  name="notify" 
  checked={notificationFreq === "Daily Digest"}
  onChange={() => setNotificationFreq("Daily Digest")}
/>
Daily Digest
</label>

<label>
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