import { useEffect, useRef } from 'react'

/**
 * 自定义光标：小圆点 + 延迟跟随的外圈
 * 悬停在链接 / 按钮上时外圈放大并泛青色
 */
export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.body.classList.add('has-cursor')

    let mx = innerWidth / 2, my = innerHeight / 2
    let rx = mx, ry = my
    let hovering = false
    let raf

    const onMove = (e) => {
      mx = e.clientX
      my = e.clientY
      const t = e.target
      hovering = !!t.closest('a, button, .work-card, .member, .cap, .value')
      dot.style.opacity = 1
      ring.style.opacity = 1
    }

    const loop = () => {
      rx += (mx - rx) * 0.16
      ry += (my - ry) * 0.16
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${hovering ? 2.1 : 1})`
      ring.style.borderColor = hovering ? 'rgba(110, 231, 255, 0.9)' : 'rgba(237, 240, 243, 0.35)'
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.body.classList.remove('has-cursor')
    }
  }, [])

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div className="cursor-dot" ref={dotRef} />
      <div className="cursor-ring" ref={ringRef} />
    </div>
  )
}
