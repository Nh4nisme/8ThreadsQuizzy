import { useState } from "react";
import "../styles/setting.css"

function SettingRow({title,desc,active,onToggle}){

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

export default function Privacy(){
  const [profileVisibility, setProfileVisibility] = useState({
    "Public Profile": true,
    "Show Online Status": true,
    "Activity History": true
  });

  const [dataUsage, setDataUsage] = useState({
    "Analytics & Improvements": true,
    "Personalization": true,
    "Cookies": true
  });

  const [dataActions, setDataActions] = useState({
    "Export Your Data": false,
    "Delete Your Data": false
  });

  const handleProfileToggle = (key) => {
    setProfileVisibility(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleDataToggle = (key) => {
    setDataUsage(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleActionToggle = (key) => {
    setDataActions(prev => ({ ...prev, [key]: !prev[key] }));
    if (key === "Export Your Data" && !dataActions[key]) {
      alert("Data export request submitted. You will receive an email when ready.");
    } else if (key === "Delete Your Data" && !dataActions[key]) {
      alert("Data deletion request submitted. This action cannot be undone.");
    }
  };

  const handleSave = () => {
    alert("Privacy preferences saved!");
  };

return(

<div className="privacy-card">

<h2 className="privacy-title">
Privacy Settings
</h2>

<p className="privacy-sub">
Control your privacy and data settings
</p>


{/* Profile Visibility */}

<div className="section">

<h3>Profile Visibility</h3>

<SettingRow
title="Public Profile"
desc="Allow others to view your profile and statistics"
active={profileVisibility["Public Profile"]}
onToggle={() => handleProfileToggle("Public Profile")}
/>

<SettingRow
title="Show Online Status"
desc="Display when you are active on the platform"
active={profileVisibility["Show Online Status"]}
onToggle={() => handleProfileToggle("Show Online Status")}
/>

<SettingRow
title="Activity History"
desc="Show your quiz creation and participation history"
active={profileVisibility["Activity History"]}
onToggle={() => handleProfileToggle("Activity History")}
/>

</div>


<hr/>


{/* Data Usage */}

<div className="section">

<h3>Data Usage</h3>

<SettingRow
title="Analytics & Improvements"
desc="Allow us to collect anonymous usage data to improve the platform"
active={dataUsage["Analytics & Improvements"]}
onToggle={() => handleDataToggle("Analytics & Improvements")}
/>

<SettingRow
title="Personalization"
desc="Use your activity to personalize your experience"
active={dataUsage["Personalization"]}
onToggle={() => handleDataToggle("Personalization")}
/>

<SettingRow
title="Cookies"
desc="Manage cookie preferences and tracking"
active={dataUsage["Cookies"]}
onToggle={() => handleDataToggle("Cookies")}
/>

</div>


<hr/>


{/* Export */}

<div className="section">

<h3>Data Export & Deletion</h3>

<SettingRow
title="Export Your Data"
desc="Download a copy of your personal data"
active={dataActions["Export Your Data"]}
onToggle={() => handleActionToggle("Export Your Data")}
/>

<SettingRow
title="Delete Your Data"
desc="Request deletion of your personal data"
active={dataActions["Delete Your Data"]}
onToggle={() => handleActionToggle("Delete Your Data")}
/>

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