import { useState } from 'react'
import { projects, extraProjects, srcSetOf } from '../data.js'
import useReveal from '../useReveal.js'
import ProjectModal from './ProjectModal.jsx'

const allProjects = [...projects, ...extraProjects]

function WorkCard({ p, delay, onOpen }) {
  return (
    <article
      className={`work-card reveal-clip ${p.wide ? 'wide' : ''}`}
      style={{ '--d': `${delay}s` }}
      onClick={() => onOpen(p)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onOpen(p)}
    >
      <div className="work-media">
        <span className="work-index">{p.index}</span>
        <span className="work-tag">{p.tagEn}</span>
        <img
          src={p.img}
          srcSet={srcSetOf(p.img)}
          sizes="(max-width: 768px) 100vw, 1200px"
          alt={p.title}
          loading="lazy"
          decoding="async"
        />
        <span className="work-hint">查看案例 ↗</span>
      </div>
      <div className="work-body">
        <div>
          <div className="mono" style={{ fontSize: 11, color: 'var(--dim)', letterSpacing: '.2em' }}>
            {p.tag}
          </div>
          <h3 className="work-title" style={{ marginTop: 10 }}>{p.title}</h3>
          <p className="work-desc">{p.desc}</p>
        </div>
        <div className="work-arrow" aria-hidden="true">↗</div>
      </div>
    </article>
  )
}

export default function Works() {
  const ref = useReveal()
  const [active, setActive] = useState(null)

  return (
    <section className="section" id="works" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label reveal">
              <span className="idx">02</span> SELECTED WORKS — 精选作品
            </div>
            <h2 className="section-title reveal" style={{ '--d': '.1s' }}>
              从品牌符号到货架现场
              <span className="en">Selected Projects</span>
            </h2>
          </div>
          <p className="reveal" style={{ '--d': '.2s' }}>
            每一个案例都始于对商业问题的理解，终于被消费者看见的现场。
            点击任意卡片，查看完整案例细节。
          </p>
        </div>

        <div className="works-grid">
          {allProjects.map((p, i) => (
            <WorkCard key={p.id} p={p} delay={(i % 2) * 0.12} onOpen={setActive} />
          ))}
        </div>

        <div className="works-foot reveal">
          <span className="mono" style={{ fontSize: 12, color: 'var(--dim)', letterSpacing: '.22em' }}>
            {allProjects.length} CASES → 完整案例集持续更新中
          </span>
        </div>
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  )
}
