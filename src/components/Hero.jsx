import { useEffect, useState } from 'react'
import { clients } from '../data.js'
import { SplitText } from './SplitText.jsx'
import FaultyTerminal from './FaultyTerminal.jsx'

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)')
    setIsMobile(mq.matches)
    const fn = (e) => setIsMobile(e.matches)
    mq.addEventListener?.('change', fn)
    return () => mq.removeEventListener?.('change', fn)
  }, [])

  // 页面加载后触发 Hero 逐字入场（无需滚动观察）
  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const id = requestAnimationFrame(() => {
      hero.querySelectorAll('.chars').forEach((c) => c.classList.add('in'))
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero-bg">
        <FaultyTerminal
          tint="#a8504a"
          glyphs="blocks"
          scale={isMobile ? 1.6 : 2.0}
          digitSize={1.5}
          timeScale={0.12}
          brightness={0.24}
          glow={0.16}
          persistence={0.72}
          curvature={0.05}
          vignette={0.72}
          scanlineIntensity={0.08}
          glitchAmount={0.12}
          flickerAmount={0.08}
          noiseAmp={0.6}
          chromaticAberration={0}
          dither={0.4}
          mouseStrength={0.14}
          mouseGlow={0.22}
          clickEffect="none"
        />
      </div>
      <div className="hero-overlay" />

      <div className="container hero-content">
        <div className="hero-tag">
          <span className="line" />
          MUSHAN DESIGN // 设计与创新工作室
        </div>

        <h1 className="hero-title">
          <span className="ht-line">
            <SplitText text="设计驱动" />
          </span>
          <span className="row2 ht-line">
            <SplitText text="品牌想象" className="soft" delay={0.28} />
            <span className="outline mono">EST. 2026</span>
          </span>
        </h1>

        <div className="hero-sub">
          <p>
            我们是一个小而美的团队，每位成员都充满创造力、经验丰富且踏实负责。
            我们推行「专业、有趣」的合作方式，许多客户将我们视为长期的伙伴和朋友。
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="#works">
              查看精选作品
              <span aria-hidden="true">↓</span>
            </a>
            <a className="btn-ghost" href="#contact">开始合作 ↗</a>
          </div>
        </div>

        <div className="hero-meta">
          <span>BRANDING / PACKAGING / KEY VISUAL</span>
          <span>E-COMMERCE / CULTURE</span>
          <span>SCROLL ↓</span>
        </div>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...clients, ...clients].map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
