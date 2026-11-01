import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { HEART_PATH } from './HeartIcon'
import { useBurst } from './Burst'

export function GlowHeart({
  size = 150,
  calm = false,
  onTap,
}: {
  size?: number
  calm?: boolean
  onTap?: () => void
}) {
  const { burst } = useBurst()

  const tap = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    burst(e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2, 18)
    onTap?.()
  }

  return (
    <div className="relative grid place-items-center" style={{ width: size * 1.8, height: size * 1.8 }}>
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,90,140,.55), rgba(255,90,140,0) 65%)' }}
        animate={{ scale: [1, 1.16, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: calm ? 4 : 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.button
        aria-label="Dil ko tap karo"
        onClick={tap}
        animate={{ scale: calm ? [1, 1.04, 1] : [1, 1.1, 1, 1.14, 1] }}
        transition={{ duration: calm ? 4 : 1.8, repeat: Infinity, ease: 'easeInOut' }}
        whileTap={{ scale: 0.88 }}
        style={{
          width: size,
          height: size,
          filter: 'drop-shadow(0 0 22px rgba(255,80,130,.85))',
          background: 'none',
          border: 0,
          padding: 0,
        }}
      >
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <defs>
            <linearGradient id="glow-heart-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff9ab8" />
              <stop offset=".55" stopColor="#ff3d71" />
              <stop offset="1" stopColor="#c81e5b" />
            </linearGradient>
          </defs>
          <path d={HEART_PATH} fill="url(#glow-heart-grad)" />
          <path
            d="M6.6 5.4C5 5.9 3.9 7.3 3.9 8.9"
            stroke="white"
            strokeOpacity=".55"
            strokeWidth=".9"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </motion.button>
    </div>
  )
}
