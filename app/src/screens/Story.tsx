import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Heart, Smile, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'
import { useBurst } from '../components/Burst'
import { Btn, Fade, Screen } from '../components/ui'

const CARDS: { title: string; icon: ReactNode; text: string }[] = [
  {
    title: 'Pehli Jhalak',
    icon: <Heart size={34} />,
    text: 'Jab tum meri life mein aayi thi, tab mujhe nahi pata tha ki koi itna special ban jayega.',
  },
  {
    title: 'Tumhari Smile',
    icon: <Smile size={34} />,
    text: 'Tumhari smile, tumhari baatein aur tumhara saath... mere liye bahut precious hai.',
  },
  {
    title: 'Meri Ek Dua',
    icon: <Sparkles size={34} />,
    text: 'Main nahi chahta ki meri kisi ek galti ki wajah se tumhare chehre ki smile kho jaaye.',
  },
]

const hidden = { backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' } as const

export function Story({ onNext }: { onNext: () => void }) {
  const [flipped, setFlipped] = useState<boolean[]>([false, false, false])
  const { burst } = useBurst()
  const count = flipped.filter(Boolean).length

  const flip = (i: number, e: React.MouseEvent) => {
    if (flipped[i]) return
    const r = e.currentTarget.getBoundingClientRect()
    burst(r.left + r.width / 2, r.top + r.height / 2, 12)
    setFlipped((f) => f.map((v, k) => (k === i ? true : v)))
  }

  return (
    <Screen>
      <Fade>
        <h2 className="font-display italic font-bold text-4xl sm:text-5xl grad-text leading-tight pb-1">
          Our Little Love Story 💗
        </h2>
      </Fade>
      <Fade delay={0.4}>
        <p className="font-body text-xl text-blush/80">Har card ko tap karke padho...</p>
      </Fade>

      <div className="w-full grid gap-4 sm:grid-cols-3 sm:max-w-3xl">
        {CARDS.map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 + i * 0.25 }}
            className="h-56 sm:h-72 cursor-pointer"
            style={{ perspective: 1000 }}
            onClick={(e) => flip(i, e)}
          >
            <motion.div
              className="relative w-full h-full"
              style={{ transformStyle: 'preserve-3d' }}
              animate={{ rotateY: flipped[i] ? 180 : 0 }}
              transition={{ type: 'spring', stiffness: 70, damping: 14 }}
              whileHover={flipped[i] ? undefined : { y: -4 }}
            >
              <div
                className="absolute inset-0 glass rounded-3xl flex flex-col items-center justify-center gap-3"
                style={hidden}
              >
                <motion.div
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  style={{ color: '#ff6b9a' }}
                >
                  {c.icon}
                </motion.div>
                <p className="font-display italic text-2xl text-blush">{c.title}</p>
                <p className="font-body text-lg text-lavender">tap karo</p>
              </div>
              <div
                className="absolute inset-0 rounded-3xl p-6 flex items-center justify-center"
                style={{
                  ...hidden,
                  transform: 'rotateY(180deg)',
                  background: 'linear-gradient(150deg, rgba(255,107,154,.35), rgba(196,181,253,.28))',
                  border: '1px solid rgba(255,255,255,.3)',
                  boxShadow: '0 10px 40px rgba(255,80,130,.25)',
                }}
              >
                <p className="font-body text-[1.35rem] sm:text-xl leading-snug text-blush">{c.text}</p>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <p className="font-body text-lg text-blush/70">{count} / 3 padh liye</p>

      {count === 3 && (
        <Fade>
          <Btn onClick={onNext}>
            Aage Badho <ArrowRight size={20} />
          </Btn>
        </Fade>
      )}
    </Screen>
  )
}
