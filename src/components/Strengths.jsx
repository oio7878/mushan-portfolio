import { capabilities, values, process } from '../data.js'
import useReveal from '../useReveal.js'

export default function Strengths() {
  const ref = useReveal()

  return (
    <section className="section strengths" id="strengths" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label reveal">
              <span className="idx">04</span> WHAT WE DO — 团队优势
            </div>
            <h2 className="section-title reveal" style={{ '--d': '.1s' }}>
              五大板块，一条完整链路
              <span className="en">Capabilities</span>
            </h2>
          </div>
          <p className="reveal" style={{ '--d': '.2s' }}>
            从品牌顶层构建到终端陈列与空间视觉，我们提供贯穿「策略 — 创意 — 落地」的完整设计服务。
          </p>
        </div>

        <div className="caps">
          {capabilities.map((c, i) => (
            <div className="cap reveal" key={c.num} style={{ '--d': `${i * 0.08}s` }}>
              <div className="cap-num">{c.num}</div>
              <div className="cap-title">{c.title}</div>
              <div className="cap-en">{c.en}</div>
              <ul className="cap-list">
                {c.items.map((it) => (
                  <li key={it}>{it}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="values">
          {values.map((v, i) => (
            <div className="value reveal" key={v.title} style={{ '--d': `${i * 0.1}s` }}>
              <div className="value-title">
                {v.title}
                <span className="en">{v.en}</span>
              </div>
              <p className="value-desc">{v.desc}</p>
            </div>
          ))}
        </div>

        <div className="process reveal" style={{ '--d': '.1s' }}>
          <p className="process-quote">
            先把设计<span className="accent">「做对」</span>，再把设计<span className="accent">「做好」</span>
            —— 五步共创流程，主案设计师全程负责。
          </p>
          <div className="process-steps">
            {process.map((p) => (
              <div className="pstep" key={p.step}>
                <div className="step mono">STEP {p.step}</div>
                <div className="name">{p.name}</div>
                <div className="note">{p.note}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
