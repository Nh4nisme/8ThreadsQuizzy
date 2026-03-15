import {useState} from "react"

import TabMenu from "../components/TabMenu"
import Account from "../components/Account"
import Profile from "../components/Profile"
import Notifications from "../components/Notifications"
import Appearance from "../components/Appearance"
import Privacy from "../components/Privacy"
import Billing from "../components/Billing"

import "../styles/setting.css"

export default function Settings(){

const [active,setActive]=useState("Account")

const renderTab=()=>{

switch(active){

case "Profile":
return (
  <div className="card">
    <h2 className="card-title">Profile</h2>
    <p className="card-sub">Profile is not available yet. Please choose another tab.</p>
  </div>
)

case "Account":
return <Account/>

case "Notifications":
return <Notifications/>

case "Appearance":
return <Appearance/>

case "Privacy":
return <Privacy/>

case "Billing":
return <Billing/>

default:
return <Account/>

}

}

return(

<div className="settings-container">

<div className="settings-title">
Settings
</div>

<div className="settings-desc">
Manage your account settings and preferences
</div>

<TabMenu active={active} setActive={setActive}/>

{renderTab()}

</div>

)

}