import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Mail } from 'lucide-react'
import { GlowHeart } from '../components/GlowHeart'
import { useBurst } from '../components/Burst'
import { Btn, Fade, Screen } from '../components/ui'

type Answer = null | 'yes' | 'time'

export function Question({ onNext }: { onNext: () => void }) {
  const [ans, setAns] = useState<Answer>(null)
  const { celebrate } = useBurst()

  const yes = () => {
    setAns('yes')
    celebrate()
  }

  return (
    <Screen>
      <AnimatePresence mode="wait">
        {ans === null && (
          <motion.div
            key="ask"
            className="flex flex-col items-center gap-5"
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <Fade>
              <GlowHeart size={120} />
            </Fade>
            <Fade delay={0.4}>
              <h2 className="font-display italic font-bold text-4xl sm:text-5xl grad-text leading-tight pb-1">
                Adhya, ek baat poochun?
              </h2>
            </Fade>
            <Fade delay={1.8}>
              <p className="font-body text-[1.6rem] sm:text-3xl text-blush leading-snug">
                Jo hua uske liye main dil se sorry hoon...
              </p>
            </Fade>
            <Fade delay={3.3}>
              <p className="font-body text-xl sm:text-2xl text-blush/85 leading-snug max-w-md">
                Main tumhe force nahi karunga, bas ek chance chahta hoon khud ko better prove karne ka.
              </p>
            </Fade>
            <Fade delay={4.8} className="flex flex-col sm:flex-row gap-4 pt-2 w-full sm:w-auto">
              <Btn onClick={yes}>Maaf Kiya ❤️</Btn>
              <Btn variant="ghost" onClick={() => setAns('time')}>
                Abhi Thoda Time Chahiye 🥺
              </Btn>
            </Fade>
          </motion.div>
        )}

        {ans === 'yes' && (
          <motion.div
            key="yes"
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
          >
            <GlowHeart size={110} />
            <h2
              className="font-display italic font-bold text-5xl sm:text-6xl grad-text leading-tight pb-1"
              style={{ filter: 'drop-shadow(0 0 16px rgba(255,90,140,.55))' }}
            >
              Thank You, Adhya! ❤️
            </h2>
            <p className="font-body text-[1.45rem] sm:text-2xl text-blush leading-snug max-w-md">
              Tumhara ye ek chance mere liye bahut special hai. I promise, main apni taraf se better
              banne ki poori koshish karunga.
            </p>
            <Fade delay={1.2}>
              <Btn onClick={onNext}>
                <Mail size={20} /> Chitthi Kholo 💌
              </Btn>
            </Fade>
          </motion.div>
        )}

        {ans === 'time' && (
          <motion.div
            key="time"
            className="flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <GlowHeart size={100} calm />
            <h2 className="font-display italic font-bold text-4xl sm:text-5xl grad-text leading-tight pb-1">
              Koi baat nahi Adhya... ❤️
            </h2>
            <p className="font-body text-[1.45rem] sm:text-2xl text-blush leading-snug max-w-md">
              Main samajh sakta hoon. Tum jitna time lena chahti ho, le sakti ho. Tumhari feelings aur
              comfort mere liye important hain.
            </p>
            <Fade delay={1.5}>
              <Btn variant="ghost" onClick={onNext}>
                <Mail size={20} /> Ye chitthi tumhare liye hai 💌
              </Btn>
            </Fade>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
