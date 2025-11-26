import React from 'react'
export default function BottomNav({route,setRoute}){
  const btn = (key, icon, label)=>(<button className={'nav-btn '+(route===key?'active':'')} onClick={()=>setRoute(key)} aria-label={label}><i className={icon}></i><span>{label}</span></button>)
  return (
    <nav className='bottom-nav'>
      {btn('home','fa fa-home','Home')}
      {btn('projects','fa fa-folder-open','Projects')}
      {btn('jasa','fa fa-briefcase','Jasa')}
      {btn('skills','fa fa-code','Skills')}
      {btn('info','fa fa-user','Info')}
      {btn('settings','fa fa-cog','Setelan')}
    </nav>
  )
}
