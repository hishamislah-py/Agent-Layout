import { useEffect, useRef } from 'react'
import discTop from './assets/disc-top.png'
import discRight from './assets/disc-right.png'
import discBottom from './assets/disc-bottom.png'

// Scale's own rendered disc images, three of them positioned like the hero
// screenshot. Each drifts gently and shifts slightly with the mouse (parallax).
export default function Discs() {
  const topRef = useRef(null)
  const rightRef = useRef(null)
  const botRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('pointermove', onMove)

    let raf
    const tick = () => {
      current.current.x += (target.current.x - current.current.x) * 0.05
      current.current.y += (target.current.y - current.current.y) * 0.05
      const { x, y } = current.current
      if (topRef.current)
        topRef.current.style.transform = `translate(${x * 22}px, ${y * 22}px)`
      if (rightRef.current)
        rightRef.current.style.transform = `translate(${x * 28}px, ${y * 28}px)`
      if (botRef.current)
        botRef.current.style.transform = `translate(${x * -34}px, ${y * -34}px)`
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div className="disc-wrap disc-wrap-top" ref={topRef}>
        <img src={discTop} alt="" className="disc-img disc-float-a" />
      </div>
      <div className="disc-wrap disc-wrap-right" ref={rightRef}>
        <img src={discRight} alt="" className="disc-img disc-float-c" />
      </div>
      <div className="disc-wrap disc-wrap-bottom" ref={botRef}>
        <img src={discBottom} alt="" className="disc-img disc-float-b" />
      </div>
    </>
  )
}
