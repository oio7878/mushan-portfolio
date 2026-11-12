import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export default function Logo({ size = 30 }) {
  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <path d="M24 4 L31 17 L24 26 L17 17 Z" fill="#edf0f3" />
      <path d="M15.5 21 L23 34 L8 34 Z" fill="#edf0f3" />
      <path d="M32.5 21 L40 34 L25 34 Z" fill="#edf0f3" />
    </svg>
  )
}

const LINKS = [
  { n: '01', label: '团队经历', href: '#about' },
  { n: '02', label: '精选作品', href: '#works' },
  { n: '03', label: '标志设计', href: '#logos' },
  { n: '04', label: '团队优势', href: '#strengths' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 500 && y > lastY + 4)
      if (y < lastY - 4) setHidden(false)
      lastY = y
      const max = document.documentElement.scrollHeight - innerHeight
      setProgress(max > 0 ? y / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const go = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView()
  }

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''} ${hidden && !menuOpen ? 'nav-hidden' : ''}`}>
      <div className="progress-bar" style={{ transform: `scaleX(${progress})` }} />
      <div className="container nav-inner">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <Logo />
          <span>
            <span className="brand-name">MUSHAN DESIGN</span>
            <div className="brand-sub">设计与创新工作室</div>
          </span>
        </a>

        <nav className="nav-links">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              <span className="n">{l.n}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <a className="btn-contact nav-cta" href="#contact">
          <span className="dot" />
          联系我们
        </a>

        <button
          className={`nav-toggle ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="菜单"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {createPortal(
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <nav className="mobile-links">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); go(l.href) }}>
                <span className="n mono">{l.n}</span>
                {l.label}
              </a>
            ))}
          </nav>
          <a className="btn-primary" href="#contact" onClick={(e) => { e.preventDefault(); go('#contact') }}>
            开始合作 ↗
          </a>
        </div>,
        document.body,
      )}
    </header>
  )
}
