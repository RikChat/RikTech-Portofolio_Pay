import React, {useEffect, useState} from 'react'
import Card from '@/components/ui/card'

export default function Home(){
  const [blogs,setBlogs] = useState([])
  useEffect(()=>{
    fetch('/blogs.json')
      .then(r=>r.json())
      .then(setBlogs)
      .catch(()=>{})
  },[])
  return (
    <div>
      <header><h1>RikPOS — Home</h1><p>Blog & update proyek</p></header>
      <section>
        {blogs.length===0 && <p>Tidak ada blog (atau file blogs.json tidak ditemukan).</p>}
        {blogs.map(b=>(
          <Card key={b.id}><h3>{b.title}</h3><p>{b.summary}</p><small>{b.date}</small></Card>
        ))}
      </section>
    </div>
  )
}
