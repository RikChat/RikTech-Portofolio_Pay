import React, {useState} from 'react'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Jasa from './pages/Jasa'
import Skills from './pages/Skills'
import Info from './pages/Info'
import Settings from './pages/Settings'
import { BottomNav, Container } from './components/ui'

export default function App(){
  const [route, setRoute] = useState('home')
  return (
    <div className="app-root">
      <Container>
        {route === 'home' && <Home />}
        {route === 'projects' && <Projects />}
        {route === 'jasa' && <Jasa />}
        {route === 'skills' && <Skills />}
        {route === 'info' && <Info />}
        {route === 'settings' && <Settings />}
      </Container>
      <BottomNav route={route} setRoute={setRoute} />
    </div>
  )
}
