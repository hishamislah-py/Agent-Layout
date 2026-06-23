import { useScroll, useTransform, motion } from 'framer-motion'
import discTop from './assets/disc-top-y.png'
import discRight from './assets/disc-right-y.png'
import discBottom from './assets/disc-bottom-y.png'

const vw = typeof window !== 'undefined' ? window.innerWidth : 1366
const vh = typeof window !== 'undefined' ? window.innerHeight : 800

// geometry of each disc (matches the CSS placement)
const G = {
  top: { left: 0.33, top: 0.05, w: 270, ar: 412 / 535 },
  right: { left: 0.60, top: 0.22, w: 300, ar: 664 / 534 },
  bottom: { left: 0.14, top: 0.30, w: 400, ar: 427 / 570 },
}

export default function ScrollDiscs() {
  const { scrollY } = useScroll()
  const end = vh // the whole sequence plays over the first viewport of scroll

  // background colour of "page 2" fades in as the survivor settles
  const bgOpacity = useTransform(scrollY, [end * 0.18, end * 0.85], [0, 1])

  // --- top disc: spins up and off to the LEFT (dramatic) ---
  const topX = useTransform(scrollY, [0, end], [0, -vw * 0.75])
  const topY = useTransform(scrollY, [0, end], [0, -vh * 0.6])
  const topRot = useTransform(scrollY, [0, end], [0, 460])
  const topScale = useTransform(scrollY, [0, end], [1, 1.25])
  const topOp = useTransform(scrollY, [end * 0.4, end * 0.72], [1, 0])

  // --- right disc: spins up and off to the RIGHT (dramatic) ---
  const rightX = useTransform(scrollY, [0, end], [0, vw * 0.75])
  const rightY = useTransform(scrollY, [0, end], [0, -vh * 0.55])
  const rightRot = useTransform(scrollY, [0, end], [0, -520])
  const rightScale = useTransform(scrollY, [0, end], [1, 1.25])
  const rightOp = useTransform(scrollY, [end * 0.4, end * 0.72], [1, 0])

  // --- bottom disc = the survivor: glides to the centre and grows ---
  const b = G.bottom
  const bCx = b.left * vw + b.w / 2
  const bCy = b.top * vh + (b.w * b.ar) / 2
  const botX = useTransform(scrollY, [0, end], [0, vw * 0.5 - bCx])
  const botY = useTransform(scrollY, [0, end], [0, vh * 0.5 - bCy])
  const botScale = useTransform(scrollY, [0, end * 0.55, end], [1, 1.05, 1.85])

  return (
    <div className="sd-layer">
      <motion.div className="sd-bg" style={{ opacity: bgOpacity }} />

      <motion.div className="sd sd-top" style={{ x: topX, y: topY, rotate: topRot, scale: topScale, opacity: topOp }}>
        <img className="disc-img disc-float-a" src={discTop} alt="" />
      </motion.div>

      <motion.div className="sd sd-right" style={{ x: rightX, y: rightY, rotate: rightRot, scale: rightScale, opacity: rightOp }}>
        <img className="disc-img disc-float-c" src={discRight} alt="" />
      </motion.div>

      {/* survivor — keeps slowly spinning on its own (continuous) */}
      <motion.div className="sd sd-bottom" style={{ x: botX, y: botY, scale: botScale }}>
        <img className="disc-img sd-spin" src={discBottom} alt="" />
      </motion.div>
    </div>
  )
}
