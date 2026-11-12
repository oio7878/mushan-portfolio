import { contact } from '../data.js'
import useReveal from '../useReveal.js'
import { SplitText } from './SplitText.jsx'

export default function Contact() {
  const ref = useReveal()

  return (
    <section className="contact" id="contact" ref={ref}>
      <div className="contact-glow" />
      <div className="container contact-inner">
        <div className="contact-label reveal">GET IN TOUCH — 05 / CONTACT</div>
        <h2 className="contact-title">
          <span className="reveal" style={{ '--d': '.1s', display: 'block' }}>
            <SplitText text="下一个项目，" />
          </span>
          <span className="reveal stroke" style={{ '--d': '.3s', display: 'block' }}>
            <SplitText text="从这里开始" delay={0.2} />
          </span>
        </h2>
        <div className="contact-actions reveal" style={{ '--d': '.5s' }}>
          <a className="btn-mail" href={`mailto:${contact.email}`}>
            {contact.email}
            <span aria-hidden="true">↗</span>
          </a>
          <a className="btn-ghost" href="#top">回到顶部 ↑</a>
        </div>
        <div className="contact-info reveal" style={{ '--d': '.6s' }}>
          <div className="ci">
            <div className="k">WeChat</div>
            <div className="v mono">{contact.wechat}</div>
          </div>
          <div className="ci">
            <div className="k">Base</div>
            <div className="v">{contact.location}</div>
          </div>
          <div className="ci">
            <div className="k">Service</div>
            <div className="v">品牌 · 包装 · KV · 电商 · 文化建设</div>
          </div>
        </div>
      </div>

      <div className="footer-bar">
        <div className="container footer-inner">
          <span>© 2026 MUSHAN DESIGN</span>
          <span>设计与创新工作室 · Design &amp; Innovation Studio</span>
          <button className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            BACK TO TOP ↑
          </button>
        </div>
      </div>
    </section>
  )
}
