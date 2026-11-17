import { projects, extraProjects, srcSetOf } from '../data.js'
import galleryMap from '../gallery.json'
import useReveal from '../useReveal.js'
import { SplitText } from './SplitText.jsx'

const allProjects = [...projects, ...extraProjects]

function WorkStory({ p, delay }) {
  const gallery = galleryMap[p.id] || []
  // 主图 + 详情图，全部直接铺在页面上，不再有点击弹窗
  const images = [p.img, ...gallery]

  return (
    <article className={`work-story reveal ${p.wide ? 'wide' : ''}`} style={{ '--d': `${delay}s` }}>
      <div className="story-head">
        <div className="story-meta">
          <span className="story-index">({p.index})</span>
          <span className="story-tag">{p.tagEn} / {p.tag}</span>
        </div>
        <h3 className="story-title"><SplitText text={p.title} /></h3>
        <p className="story-desc">{p.desc}</p>
      </div>

      <div className="story-gallery">
        {images.map((img, i) => (
          <figure className="story-shot" key={`${img}-${i}`}>
            <img
              src={img}
              srcSet={srcSetOf(img)}
              sizes="(max-width: 768px) 100vw, 1200px"
              alt={`${p.title} ${i === 0 ? '' : i}`}
              loading="lazy"
              decoding="async"
            />
            <figcaption className="story-num">({String(i + 1).padStart(2, '0')})</figcaption>
          </figure>
        ))}
      </div>
    </article>
  )
}

export default function Works() {
  const ref = useReveal()

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
          </p>
        </div>

        <div className="works-stories">
          {allProjects.map((p, i) => (
            <WorkStory key={p.id} p={p} delay={(i % 3) * 0.1} />
          ))}
        </div>

        <div className="works-foot reveal">
          <span className="mono" style={{ fontSize: 12, color: 'var(--dim)', letterSpacing: '.22em' }}>
            {allProjects.length} CASES → 完整案例集持续更新中
          </span>
        </div>
      </div>
    </section>
  )
}
