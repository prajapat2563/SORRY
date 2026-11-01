import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Envelope } from '../components/Envelope'
import { HeartIcon } from '../components/HeartIcon'
import { useBurst } from '../components/Burst'
import { Btn, Fade, Screen } from '../components/ui'

const LINES = [
  'Adhya, mujhe pata hai meri kisi baat se tum hurt hui ho...',
  'Shayad main us waqt tumhari feelings ko samajh nahi paaya, aur iska mujhe sach mein afsos hai.',
  'Main apni galti ko justify nahi karna chahta. Bas itna kehna chahta hoon ki tumhari feelings mere liye bahut important hain.',
  'Main tumhe hurt karne ke liye kabhi kuch nahi karna chahta tha.',
]

type Stage = 'sealed' | 'opening' | 'reading' | 'done'

export function Apology({ onNext }: { onNext: () => void }) {
  const [stage, setStage] = useState<Stage>('sealed')
  const [i, setI] = useState(0)
  const { burst } = useBurst()

  useEffect(() => {
    if (stage !== 'opening') return
    const t = window.setTimeout(() => setStage('reading'), 1900)
    return () => window.clearTimeout(t)
  }, [stage])

  const advance = useCallback(() => {
    setI((n) => {
      if (n >= LINES.length - 1) {
        setStage('done')
        return n
      }
      return n + 1
    })
  }, [])

  useEffect(() => {
    if (stage !== 'reading') return
    const t = window.setTimeout(advance, 5600)
    return () => window.clearTimeout(t)
  }, [stage, i, advance])

  useEffect(() => {
    if (stage === 'done') {
      const t = window.setTimeout(() => burst(window.innerWidth / 2, window.innerHeight * 0.4, 22), 500)
      return () => window.clearTimeout(t)
    }
  }, [stage, burst])

  const words = ['I AM REALLY', 'SORRY,', 'ADHYA!']

  return (
    <Screen>
      <AnimatePresence mode="wait">
        {(stage === 'sealed' || stage === 'opening') && (
          <motion.div
            key="env"
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display italic text-3xl sm:text-4xl grad-text leading-tight pb-1">
              Ek chhoti si chitthi, tumhare naam... 💌
            </h2>
            <Envelope
              open={stage === 'opening'}
              onOpen={() => setStage('opening')}
              peek={<HeartIcon size={34} style={{ color: '#e8457f' }} />}
            />
            <motion.p
              animate={{ opacity: stage === 'sealed' ? [0.5, 1, 0.5] : 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              className="font-body text-xl text-lavender"
            >
              Tap karke kholo
            </motion.p>
          </motion.div>
        )}

        {stage === 'reading' && (
          <motion.div
            key="read"
            className="w-full flex flex-col items-center gap-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div
              onClick={advance}
              className="glass rounded-3xl p-7 w-full min-h-[18rem] grid place-items-center cursor-pointer"
            >
              <AnimatePresence mode="wait">
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.7 }}
                  className="font-body text-[1.6rem] sm:text-3xl leading-snug text-blush"
                >
                  {LINES[i]}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="flex gap-2">
              {LINES.map((_, k) => (
                <span
                  key={k}
                  className="block h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: k === i ? 22 : 7,
                    background: k <= i ? '#ff6b9a' : 'rgba(255,255,255,.3)',
                  }}
                />
              ))}
            </div>
            <p className="font-body text-lg text-blush/60">aage badhne ke liye tap karo</p>
          </motion.div>
        )}

        {stage === 'done' && (
          <motion.div
            key="done"
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="font-display italic font-bold text-5xl sm:text-7xl leading-[1.15] text-center"
              style={{ filter: 'drop-shadow(0 0 18px rgba(255,90,140,.6))' }}
            >
              {words.map((w, k) => (
                <motion.span
                  key={w}
                  className="block grad-text pb-1"
                  initial={{ opacity: 0, scale: 0.6, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 120, damping: 12, delay: 0.3 + k * 0.45 }}
                >
                  {w}
                  {k === words.length - 1 && <span> ❤️</span>}
                </motion.span>
              ))}
            </h1>
            <Fade delay={2.2}>
              <Btn onClick={onNext}>
                Aage Badho <ArrowRight size={20} />
              </Btn>
            </Fade>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
