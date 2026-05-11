const tabs = [
  "Profile",
  "Account",
  "Notifications",
  "Appearance",
  "Privacy",
  "Billing",
];

export default function TabMenu({ active, setActive }) {
  return (
    <div className="tab-menu">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          className={`tab-btn ${active === tab ? "active" : ""}`}
          onClick={() => setActive(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
