import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { Envelope } from '../components/Envelope'
import { GlowHeart } from '../components/GlowHeart'
import { useBurst } from '../components/Burst'
import { Btn, Screen } from '../components/ui'

type Stage = 'sealed' | 'opening' | 'open'

function Line({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.p>
  )
}

export function Letter({ onReplay }: { onReplay: () => void }) {
  const [stage, setStage] = useState<Stage>('sealed')
  const { burst } = useBurst()

  useEffect(() => {
    if (stage !== 'opening') return
    const t = window.setTimeout(() => {
      setStage('open')
      burst(window.innerWidth / 2, 160, 18)
    }, 2000)
    return () => window.clearTimeout(t)
  }, [stage, burst])

  const body = 'font-body text-[1.3rem] sm:text-2xl leading-relaxed text-[#4a1d3f]'

  return (
    <Screen className={stage === 'open' ? '!justify-start' : ''}>
      <AnimatePresence mode="wait">
        {stage !== 'open' && (
          <motion.div
            key="env"
            className="flex flex-col items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display italic font-bold text-4xl sm:text-5xl grad-text leading-tight pb-1">
              Ek Aakhri Chitthi 💌
            </h2>
            <Envelope
              open={stage === 'opening'}
              onOpen={() => setStage('opening')}
              peek={<span className="font-script text-3xl px-2">Adhya ke liye ❤️</span>}
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

        {stage === 'open' && (
          <motion.div
            key="letter"
            className="w-full flex flex-col items-center gap-8"
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div
              className="w-full rounded-2xl p-7 sm:p-10 text-left flex flex-col gap-5"
              style={{
                background: 'linear-gradient(180deg,#fff8f2,#ffe9ef)',
                boxShadow: '0 25px 70px rgba(10,0,30,.55), inset 0 0 60px rgba(255,150,180,.18)',
              }}
            >
              <Line className="font-script text-5xl text-[#c2185b]">Dear Adhya,</Line>
              <Line className={body}>
                Kabhi-kabhi humse galtiyan ho jaati hain, aur kabhi unhi galtiyon se apne sabse special
                insaan ko hurt kar dete hain.
              </Line>
              <Line className={body}>
                Mujhe sach mein bura lag raha hai ki meri wajah se tum hurt hui.
              </Line>
              <Line className={body}>
                Main ye nahi kehunga ki main perfect hoon, lekin main itna zaroor kehna chahta hoon ki
                tumhare liye better banne ki koshish hamesha karunga.
              </Line>
              <Line className={body}>
                Tum mere liye sirf ek person nahi, balki meri life ka ek bahut special part ho.
              </Line>
              <Line className={`${body} italic`}>Bas itna yaad rakhna...</Line>

              <motion.p
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ type: 'spring', stiffness: 100, damping: 12 }}
                className="font-display italic font-bold text-3xl sm:text-4xl text-center text-[#d81b60] py-2"
              >
                I LOVE YOU, ADHYA. ❤️
              </motion.p>

              <Line className={`${body} italic text-center`}>And Once Again...</Line>

              <motion.p
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ type: 'spring', stiffness: 100, damping: 12 }}
                className="font-display italic font-bold text-3xl sm:text-4xl text-center text-[#a8185a] py-2"
              >
                I AM REALLY SORRY. 🥺
              </motion.p>

              <Line className={`${body} italic pt-3`}>With Lots Of Love,</Line>
              <Line className="font-script text-5xl text-[#c2185b]">Tumhara...</Line>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center gap-4"
            >
              <GlowHeart size={80} calm />
              <p className="font-body text-lg text-lavender -mt-4">Tap the heart ❤️</p>
              <Btn variant="ghost" onClick={onReplay}>
                <RotateCcw size={18} /> Ek Baar Phir Se Dekho ❤️
              </Btn>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Screen>
  )
}
