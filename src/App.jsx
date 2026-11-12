import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { Navbar } from './components/Navbar.jsx'
import SwarmCursor from './components/SwarmCursor.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Works from './components/Works.jsx'
import LogoSection from './components/LogoSection.jsx'
import Strengths from './components/Strengths.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  const [finePointer, setFinePointer] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    setFinePointer(mq.matches)
    const fn = (e) => setFinePointer(e.matches)
    mq.addEventListener?.('change', fn)
    return () => mq.removeEventListener?.('change', fn)
  }, [])

  useEffect(() => {
    // 平滑滚动
    let lenis
    let raf
    try {
      lenis = new Lenis({ lerp: 0.09 })
      const loop = (t) => {
        lenis.raf(t)
        raf = requestAnimationFrame(loop)
      }
      raf = requestAnimationFrame(loop)
    } catch (e) {
      console.error('Lenis init failed', e)
    }

    // 锚点链接交给 lenis，带惯性地滚过去
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const id = a.getAttribute('href')
      if (id.length > 1 && document.querySelector(id)) {
        e.preventDefault()
        if (lenis) lenis.scrollTo(id, { offset: -64, duration: 1.4 })
        else document.querySelector(id).scrollIntoView()
      }
    }
    document.addEventListener('click', onClick)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (lenis) lenis.destroy()
      document.removeEventListener('click', onClick)
    }
  }, [])

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />
      {finePointer && (
        <SwarmCursor
          count={600}
          size={2.2}
          color="#ff4655"
          accentColor="#ffffff"
          spread={78}
          swirl={0.7}
          tail={0.55}
          trail={0.7}
          depth={0.7}
          clickEffect="burst"
          idle="roam"
          hideCursor
          style={{ position: 'fixed', inset: 0, zIndex: 190, pointerEvents: 'none' }}
        />
      )}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Works />
        <LogoSection />
        <Strengths />
      </main>
      <Contact />
    </>
  )
}
