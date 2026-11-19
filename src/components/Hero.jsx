import { useEffect, useRef } from 'react'
import { clients } from '../data.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from './SplitText.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const root = useRef(null)

  useEffect(() => {
    const el = root.current
    if (!el) return

    // 逐字入场
    const id = requestAnimationFrame(() => {
      el.querySelectorAll('.chars').forEach((c) => c.classList.add('in'))
    })

    // 一个标志性动作：首屏作品图随滚动轻微视差位移
    const ctx = gsap.context(() => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (window.matchMedia('(max-width: 900px)').matches) return
      gsap.to('.hero-photo img', {
        yPercent: 14,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    }, el)

    return () => {
      cancelAnimationFrame(id)
      ctx.revert()
    }
  }, [])

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero-photo" aria-hidden="true">
        <img src="assets/proj-tiangong.webp" alt="" />
      </div>
      <div className="hero-shade" aria-hidden="true" />

      <div className="container hero-content">
        <div>
          <h1 className="hero-title">
            <span className="ht-line"><SplitText text="设计驱动，" /></span>
            <span className="ht-line"><SplitText text="构建品牌想象" className="mute" delay={0.16} /></span>
          </h1>
          <p className="hero-lede">
            一个小而美的设计与创新工作室，把商业问题变成被看见的现场。
          </p>
          <div className="hero-actions">
            <a className="btn-primary" href="#works">查看精选作品 <span aria-hidden="true">↗</span></a>
            <a className="btn-ghost" href="#contact">开始合作</a>
          </div>
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
