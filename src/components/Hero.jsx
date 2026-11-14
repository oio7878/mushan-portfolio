import { useEffect } from 'react'
import { clients } from '../data.js'
import { SplitText } from './SplitText.jsx'

export default function Hero() {
  // 页面加载后触发标题逐字入场
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
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-aura" />
      </div>

      <div className="container hero-content">
        <div className="hero-badge" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="30" height="30" fill="none">
            <path d="M24 5 L32 19 L24 28 L16 19 Z" fill="currentColor" />
            <path d="M14.5 23 L23 37 L7 37 Z" fill="currentColor" opacity="0.55" />
            <path d="M33.5 23 L41 37 L26 37 Z" fill="currentColor" opacity="0.55" />
          </svg>
        </div>

        <h1 className="hero-title">
          <span className="ht-line"><SplitText text="设计驱动，" /></span>
          <span className="ht-line"><SplitText text="构建品牌想象" className="soft" delay={0.18} /></span>
        </h1>

        <p className="hero-lede">
          一个小而美的设计与创新工作室，把商业问题变成被看见的现场。
        </p>

        <div className="hero-actions">
          <a className="btn-primary" href="#works">
            查看精选作品 <span aria-hidden="true">↗</span>
          </a>
          <a className="btn-ghost" href="#contact">开始合作</a>
        </div>

        <div className="hero-trust">
          <div className="hero-trust-label">深受顶尖团队信赖</div>
          <div className="hero-clients">
            {clients.slice(0, 6).map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
