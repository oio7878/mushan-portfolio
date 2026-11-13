import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import galleryMap from '../gallery.json'

const WHEEL_THRESHOLD = 24  // 累积多少 deltaY 触发一次切换
const GESTURE_GAP = 300     // 间隔超过这个毫秒数视为新手势
const COOLDOWN = 280        // 冷却，抑制触控板惯性连切

export default function ProjectModal({ project, onClose }) {
  const gallery = galleryMap[project.id] || []
  const images = [project.img, ...gallery]
  const [active, setActive] = useState(0)
  const wheelRef = useRef({ acc: 0, last: 0, locked: false, timer: null })

  useEffect(() => {
    const total = images.length
    const go = (dir) => setActive((a) => (a + dir + total) % total)

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (total < 2) return
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(-1)
    }

    const onWheel = (e) => {
      // 弹窗打开期间接管滚轮：向下 → 下一张，向上 → 上一张
      // 同时阻止背景（Lenis / 页面）跟着滚动
      e.preventDefault()
      e.stopPropagation()
      if (total < 2) return

      const s = wheelRef.current
      const now = performance.now()
      if (now - s.last > GESTURE_GAP) {
        s.acc = 0
        s.locked = false
      }
      s.last = now

      if (s.locked) {
        // 惯性滚动持续时不断延后解锁，保证「一次滚轮手势只切一张」
        clearTimeout(s.timer)
        s.timer = setTimeout(() => { s.locked = false; s.acc = 0 }, COOLDOWN)
        return
      }

      s.acc += e.deltaY
      if (Math.abs(s.acc) < WHEEL_THRESHOLD) return
      const dir = s.acc > 0 ? 1 : -1
      s.acc = 0
      s.locked = true
      go(dir)
      s.timer = setTimeout(() => { s.locked = false; s.acc = 0 }, COOLDOWN)
    }

    // 手机端：上下滑动切图
    let touchY = null
    const onTouchStart = (e) => { touchY = e.touches[0]?.clientY ?? null }
    const onTouchEnd = (e) => {
      const start = touchY
      touchY = null
      if (start === null || total < 2) return
      const y = e.changedTouches[0]?.clientY
      if (y == null) return
      const d = start - y // 上滑为正 → 下一张
      if (Math.abs(d) > 40) go(d > 0 ? 1 : -1)
    }

    document.addEventListener('keydown', onKey)
    document.addEventListener('wheel', onWheel, { passive: false, capture: true })
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchend', onTouchEnd, { passive: true })
    document.body.style.overflow = 'hidden'
    window.dispatchEvent(new CustomEvent('mushan:modal', { detail: { open: true } }))

    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('wheel', onWheel, { capture: true })
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchend', onTouchEnd)
      clearTimeout(wheelRef.current.timer)
      document.body.style.overflow = ''
      window.dispatchEvent(new CustomEvent('mushan:modal', { detail: { open: false } }))
    }
  }, [images.length, onClose])

  return createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="关闭">✕</button>

        <div className="modal-media">
          <img key={active} className="modal-main" src={images[active]} alt={project.title} />
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
            <span className="mono hint-desktop" style={{ fontSize: 12, color: 'var(--accent)', letterSpacing: '.2em' }}>
              滚轮 / ← → 切换 · ESC 关闭
            </span>
            <span className="mono hint-mobile" style={{ fontSize: 12, color: 'var(--accent)', letterSpacing: '.2em' }}>
              上下滑动切换 · 点击关闭
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
