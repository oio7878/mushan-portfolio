import { team, stats, contact } from '../data.js'
import useReveal from '../useReveal.js'
import { CountUp, SplitText } from './SplitText.jsx'

export default function About() {
  const ref = useReveal()

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className="section-label reveal">
          <span className="idx">01</span> TEAM & EXPERIENCE — 团队经历
        </div>
        <h2 className="section-title reveal" style={{ '--d': '.1s' }}>
          <SplitText text="小而美，但每个项目都全力以赴" />
          <span className="en">A Small &amp; Beautiful Team</span>
        </h2>

        <div className="about-grid" style={{ marginTop: 64 }}>
          <div className="reveal" style={{ '--d': '.15s' }}>
            <p className="about-lede">
              设计与创新工作室推行
              <em>「专业、有趣」</em>
              的合作方式 —— 先把设计<em>做对</em>，再把设计<em>做好</em>。
            </p>
            <p className="about-copy">
              我们深耕品牌设计、包装设计、主视觉 KV、电商视觉与文化建设五大板块，
              服务对象覆盖快消、科技、文化机构与零售品牌。从策略沟通到落地跟进，
              主案设计师全程负责，确保创意不折损地抵达消费者眼前。
            </p>
            <div className="about-contact">
              <div className="contact-row">
                <span className="k">Email</span>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </div>
              <div className="contact-row">
                <span className="k">WeChat</span>
                <span>{contact.wechat}</span>
              </div>
              <div className="contact-row">
                <span className="k">Base</span>
                <span>{contact.location}</span>
              </div>
            </div>
          </div>

          <div className="members reveal" style={{ '--d': '.25s' }}>
            {team.map((m) => (
              <div className="member" key={m.name}>
                <div className="member-photo">
                  <img src={m.avatar} alt={`${m.name} ${m.roleCn}`} loading="lazy" />
                </div>
                <div className="member-info">
                  <div className="member-name">
                    {m.name}
                    <span className="en">/ {m.en}</span>
                  </div>
                  <div className="member-role">
                    {m.role}
                    <span className="cn">{m.roleCn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats reveal" style={{ '--d': '.15s' }}>
          {stats.map((s) => (
            <div className="stat" key={s.label}>
              <div className="num">
                <CountUp value={s.num} />
              </div>
              <div className="label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
