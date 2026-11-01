import { useState } from 'react'
import type { MouseEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { HEART_PATH, HeartIcon } from '../components/HeartIcon'
import { useBurst } from '../components/Burst'
import { Btn, Fade, Screen } from '../components/ui'

const PROMISES = [
  'Main tumhari feelings ko aur achhe se samajhne ki koshish karunga.',
  'Tumhari baat ko bina samjhe react nahi karunga.',
  'Apni galti accept karna aur khud ko improve karna seekhunga.',
  'Tumhari smile ki value hamesha samjhunga.',
]

const SIZE = 168

function FillHeart({ p, onTap }: { p: number; onTap: (e: MouseEvent<HTMLButtonElement>) => void }) {
  // the heart path spans y 3 -> 21.35 of a 24 box
  const pct = p === 0 ? 0 : ((2.65 + p * 18.35) / 24) * 100
  return (
    <motion.button
      aria-label="Heart ko tap karo"
      onClick={onTap}
      whileTap={{ scale: 0.9 }}
      animate={{ scale: [1, 1.06, 1] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      className="relative"
      style={{
        width: SIZE,
        height: SIZE,
        background: 'none',
        border: 0,
        padding: 0,
        filter: 'drop-shadow(0 0 20px rgba(255,80,130,.6))',
      }}
    >
      <svg viewBox="0 0 24 24" className="absolute inset-0 w-full h-full">
        <path d={HEART_PATH} fill="rgba(255,255,255,.08)" stroke="#ff9ab8" strokeWidth=".5" />
      </svg>
      <div
        className="absolute left-0 bottom-0 w-full overflow-hidden"
        style={{ height: `${pct}%`, transition: 'height 1.1s cubic-bezier(.3,.8,.3,1)' }}
      >
        <svg
          viewBox="0 0 24 24"
          width={SIZE}
          height={SIZE}
          style={{ position: 'absolute', left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="fill-heart-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ff9ab8" />
              <stop offset=".55" stopColor="#ff3d71" />
              <stop offset="1" stopColor="#c81e5b" />
            </linearGradient>
          </defs>
          <path d={HEART_PATH} fill="url(#fill-heart-grad)" />
        </svg>
      </div>
    </motion.button>
  )
}

export function PromiseScreen({ onNext }: { onNext: () => void }) {
  const [n, setN] = useState(0)
  const { burst } = useBurst()

  const tap = (e: MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    burst(e.clientX || r.left + r.width / 2, e.clientY || r.top + r.height / 2, 14)
    setN((v) => Math.min(PROMISES.length, v + 1))
  }

  const hint =
    n === 0 ? 'Heart ko tap karo ❤️' : n < PROMISES.length ? 'Ek aur tap karo...' : 'Heart poora bhar gaya 💗'

  return (
    <Screen className="!justify-start sm:!justify-center">
      <Fade>
        <h2 className="font-display italic font-bold text-4xl sm:text-5xl grad-text leading-tight pb-1">
          Ek Chhota Sa Promise...
        </h2>
      </Fade>
      <Fade delay={0.4}>
        <FillHeart p={n / PROMISES.length} onTap={tap} />
      </Fade>
      <p className="font-body text-xl text-lavender -mt-2">{hint}</p>

      <div className="w-full flex flex-col gap-3">
        {PROMISES.slice(0, n).map((t, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 110, damping: 15 }}
            className="glass rounded-2xl px-5 py-4 flex gap-3 items-start text-left"
          >
            <HeartIcon size={20} className="shrink-0 mt-1" style={{ color: '#ff6b9a' }} />
            <p className="font-body text-[1.3rem] leading-snug text-blush">{t}</p>
            <span className="sr-only">Promise {i + 1}</span>
          </motion.div>
        ))}
      </div>

      {n === PROMISES.length && (
        <Fade>
          <Btn onClick={onNext}>
            Aage Badho <ArrowRight size={20} />
          </Btn>
        </Fade>
      )}
    </Screen>
  )
}
