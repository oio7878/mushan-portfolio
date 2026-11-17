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
        <div className="hero-horizon" />
      </div>

      <div className="container hero-content">
        <div className="hero-eyebrow"><span>[ 01 / STUDIO ]</span><span>DESIGN & INNOVATION</span></div>

        <h1 className="hero-title">
          <span className="ht-line"><SplitText text="设计驱动，" className="mute" /></span>
          <span className="ht-line"><SplitText text="构建" className="mute" delay={0.14} /><SplitText text="品牌想象" className="strong" delay={0.24} /></span>
        </h1>

        <p className="hero-lede">
          一个小而美的设计与创新工作室，<br className="desktop-br" />把商业问题变成被看见的现场。
        </p>

        <div className="hero-actions">
          <a className="btn-primary" href="#works">
            查看精选作品 <span aria-hidden="true">↗</span>
          </a>
          <a className="btn-ghost" href="#contact">开始合作</a>
        </div>

        <div className="hero-trust">
          <div className="hero-trust-label">SELECTED CLIENTS — 深受顶尖团队信赖</div>
          <div className="hero-clients">
            {clients.slice(0, 6).map((c, i) => <span key={i}>{c}</span>)}
          </div>
        </div>
      </div>

      <div className="hero-bleed" aria-hidden="true">MUSHAN</div>
    </section>
  )
}
