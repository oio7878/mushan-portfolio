/**
 * SplitText —— 将文本拆分为逐字 span，父级获得 .chars 类，
 * 进入视口加 .in 后按 --ci 依次上浮入场
 */
export function SplitText({ text, className = '', delay = 0 }) {
  return (
    <span className={`chars ${className}`} style={{ '--cd': `${delay}s` }} aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ '--ci': `${i * 0.028}s` }}
          className={ch === ' ' ? 'ch space' : 'ch'}
        >
          {ch}
        </span>
      ))}
    </span>
  )
}

/**
 * CountUp —— 进入视口后从 0 滚动到目标数字
 */
export function CountUp({ value, className = '' }) {
  const hasPlus = value.includes('+')
  const target = parseInt(value.replace('+', ''), 10)

  const ref = (el) => {
    if (!el || el.__done) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || el.__done) return
        el.__done = true
        io.disconnect()
        const dur = 1600
        const t0 = performance.now()
        const tick = (now) => {
          const p = Math.min((now - t0) / dur, 1)
          const eased = 1 - Math.pow(2, -10 * p) // easeOutExpo
          el.textContent = Math.round(target * eased)
          if (p < 1) requestAnimationFrame(tick)
          else el.textContent = target
        }
        requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    io.observe(el)
  }

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {hasPlus && <sup>+</sup>}
    </span>
  )
}
