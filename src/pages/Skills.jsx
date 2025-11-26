import React from 'react'
import Card from '@/components/ui/card'
export default function Skills(){
  const skills = [
    'React (front-end)','TypeScript (opsional)','Firebase (Realtime DB, Storage)','Node.js','Express','SQL/NoSQL','HTML/CSS','Tailwind'
  ]
  return <Card><h2>Skills</h2><ul>{skills.map(s=> <li key={s}>{s}</li>)}</ul></Card>
}
