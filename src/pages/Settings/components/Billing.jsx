import { useState } from "react";
import "../styles/setting.css"

export default function Billing(){
  const [currentPlan, setCurrentPlan] = useState("Pro Plan");

  const handleUpgrade = () => {
    alert("Redirecting to upgrade page...");
  };

  const handleChangePayment = () => {
    alert("Opening payment method change dialog...");
  };

  const handleDownloadInvoice = (date) => {
    alert(`Downloading invoice for ${date}...`);
  };

return(

<div className="privacy-card">

<h2 className="privacy-title">
Billing & Subscription
</h2>

<p className="privacy-sub">
Manage your subscription, payment methods and invoices
</p>


{/* Current Plan */}

<div className="section">

<h3>Current Plan</h3>

<div className="billing-row">
<span>Plan</span>
<span className="plan">Pro Plan</span>
</div>

<div className="billing-row">
<span>Price</span>
<span>$19 / month</span>
</div>

<div className="billing-row">
<span>Status</span>
<span className="status active">Active</span>
</div>

<div className="billing-row">
<span>Next Billing Date</span>
<span>June 12, 2026</span>
</div>

<button className="btn-primary" onClick={handleUpgrade}>
Upgrade Plan
</button>

</div>

<hr/>


{/* Payment Method */}

<div className="section">

<h3>Payment Method</h3>

<div className="billing-row">

<div className="payment-info">

<span className="card-icon">💳</span>
<span>Visa ending in 4821</span>

</div>

<button className="btn-outline" onClick={handleChangePayment}>
Change
</button>

</div>

</div>

<hr/>


{/* Billing History */}

<div className="section">

<h3>Billing History</h3>

<div className="invoice-row">

<span>May 12, 2026</span>
<span>$19.00</span>
<button className="invoice-btn" onClick={() => handleDownloadInvoice("May 12, 2026")}>
Download
</button>

</div>

<div className="invoice-row">

<span>Apr 12, 2026</span>
<span>$19.00</span>
<button className="invoice-btn" onClick={() => handleDownloadInvoice("Apr 12, 2026")}>
Download
</button>

</div>

<div className="invoice-row">

<span>Mar 12, 2026</span>
<span>$19.00</span>
<button className="invoice-btn" onClick={() => handleDownloadInvoice("Mar 12, 2026")}>
Download
</button>

</div>

</div>


</div>

)

}