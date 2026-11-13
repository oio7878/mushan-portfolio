import { logos, srcSetOf } from '../data.js'
import useReveal from '../useReveal.js'

export default function LogoSection() {
  const ref = useReveal()

  return (
    <section className="section logo-section" id="logos" ref={ref}>
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-label reveal">
              <span className="idx">03</span> LOGO — 标志设计
            </div>
            <h2 className="section-title reveal" style={{ '--d': '.1s' }}>
              品牌标志合集
              <span className="en">Logo &amp; Brand Marks</span>
            </h2>
          </div>
          <p className="reveal" style={{ '--d': '.2s' }}>
            一个符号，浓缩一个品牌。从图形、色彩到字体，每一个标志都经过系统化的推导与规范。
          </p>
        </div>

        <div className="logo-grid">
          {logos.map((l, i) => (
            <div className="logo-card reveal" key={l.en} style={{ '--d': `${(i % 4) * 0.08}s` }}>
              <div className="logo-img">
                <img
                  src={l.img}
                  srcSet={srcSetOf(l.img)}
                  sizes="(max-width: 768px) 50vw, 400px"
                  alt={l.name}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="logo-name">
                <span className="cn">{l.name}</span>
                <span className="en mono">{l.en}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
