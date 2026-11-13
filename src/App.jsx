import { useEffect, useRef, useState } from 'react'
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
  const lenisRef = useRef(null)

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
      lenisRef.current = lenis
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
      lenisRef.current = null
      document.removeEventListener('click', onClick)
    }
  }, [])

  // 详情弹窗打开时冻结平滑滚动，关闭后恢复
  useEffect(() => {
    const onModal = (e) => {
      const l = lenisRef.current
      if (!l) return
      if (e.detail?.open) l.stop()
      else l.start()
    }
    window.addEventListener('mushan:modal', onModal)
    return () => window.removeEventListener('mushan:modal', onModal)
  }, [])

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="bg-glow" aria-hidden="true" />
      {finePointer && (
        <SwarmCursor
          count={220}
          size={1.6}
          color="#a05a52"
          accentColor="#d8c9c2"
          spread={58}
          swirl={0.3}
          tail={0.28}
          trail={0.3}
          depth={0.35}
          clickEffect="none"
          idle="gather"
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
