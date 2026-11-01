import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { GlowHeart } from '../components/GlowHeart'
import { Btn, Fade, Screen } from '../components/ui'

const SECRETS = [
  'Tum bahut khaas ho... ❤️',
  'Ek smile please? 🥺',
  'Ye dil sirf tumhara hai 💗',
  'Tumhari smile meri favourite hai ✨',
]

export function Opening({ onNext }: { onNext: () => void }) {
  const [taps, setTaps] = useState(0)
  const msg = taps > 0 ? SECRETS[(taps - 1) % SECRETS.length] : null

  return (
    <Screen>
      <Fade>
        <GlowHeart size={140} onTap={() => setTaps((t) => t + 1)} />
      </Fade>

      <div className="h-9 -mt-6">
        <AnimatePresence mode="wait">
          <motion.p
            key={msg ?? 'hint'}
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="font-body text-lg text-lavender"
          >
            {msg ?? 'Tap the heart ❤️'}
          </motion.p>
        </AnimatePresence>
      </div>

      <Fade delay={0.5}>
        <h1 className="font-display italic font-bold text-5xl sm:text-6xl grad-text leading-tight pb-1">
          Hey Adhya... ❤️
        </h1>
      </Fade>
      <Fade delay={1.5}>
        <p className="font-body text-[1.6rem] sm:text-3xl text-blush leading-snug">
          Ye website sirf tumhare liye hai...
        </p>
      </Fade>
      <Fade delay={2.6}>
        <p className="font-body text-xl sm:text-2xl text-blush/80 leading-snug max-w-md">
          Ek chhoti si koshish hai tumhare chehre par smile laane ki.
        </p>
      </Fade>
      <Fade delay={3.6}>
        <Btn onClick={onNext}>
          <Heart size={20} fill="currentColor" /> Open My Heart ❤️
        </Btn>
      </Fade>
    </Screen>
  )
}
