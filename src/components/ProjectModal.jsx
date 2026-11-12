import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import galleryMap from '../gallery.json'

export default function ProjectModal({ project, onClose }) {
  const gallery = galleryMap[project.id] || []
  const images = [project.img, ...gallery]
  const [active, setActive] = useState(0)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') setActive((a) => (a + 1) % images.length)
      if (e.key === 'ArrowLeft') setActive((a) => (a - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [images.length, onClose])

  return createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="关闭">✕</button>

        <div className="modal-media">
          <img className="modal-main" src={images[active]} alt={project.title} />
          {images.length > 1 && (
            <>
              <button className="modal-nav prev" onClick={() => setActive((a) => (a - 1 + images.length) % images.length)} aria-label="上一张">←</button>
              <button className="modal-nav next" onClick={() => setActive((a) => (a + 1) % images.length)} aria-label="下一张">→</button>
            </>
          )}
          <div className="modal-thumbs">
            {images.map((img, i) => (
              <button
                key={i}
                className={`thumb ${i === active ? 'active' : ''}`}
                onClick={() => setActive(i)}
                aria-label={`第 ${i + 1} 张`}
              >
                <img src={img} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>

        <div className="modal-info">
          <div className="modal-meta">
            <span className="mtag">{project.tagEn}</span>
            <span className="mono" style={{ color: 'var(--dim)', letterSpacing: '.2em' }}>CASE {project.index}</span>
          </div>
          <h3 className="modal-title">{project.title}</h3>
          <p className="modal-desc">{project.desc}</p>

          <div className="modal-tags">
            <span className="mtag">{project.tag}</span>
            <span className="mtag">设计与创新工作室</span>
          </div>

          <div className="modal-foot">
            <span className="mono" style={{ fontSize: 12, color: 'var(--dim)', letterSpacing: '.2em' }}>
              {active + 1} / {images.length}
            </span>
            <span className="mono" style={{ fontSize: 12, color: 'var(--accent)', letterSpacing: '.2em' }}>
              ← → 切换 · ESC 关闭
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
