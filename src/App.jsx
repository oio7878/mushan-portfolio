import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { Navbar } from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Works from './components/Works.jsx'
import LogoSection from './components/LogoSection.jsx'
import Strengths from './components/Strengths.jsx'
import Contact from './components/Contact.jsx'

export default function App() {
  const lenisRef = useRef(null)

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
