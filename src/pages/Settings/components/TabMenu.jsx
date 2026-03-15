export default function TabMenu({active,setActive}){

const tabs=[
"Profile",
"Account",
"Notifications",
"Appearance",
"Privacy",
"Billing"
]

return(

<div className="tab-menu">

{tabs.map(tab=>(
<div
key={tab}
className={`tab-btn ${active===tab ? "active":""}`}
onClick={()=>setActive(tab)}
>
{tab}
</div>
))}

</div>

)

}