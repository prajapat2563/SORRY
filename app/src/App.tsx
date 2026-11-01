import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { Background } from './components/Background'
import { BurstProvider } from './components/Burst'
import { HeartIcon } from './components/HeartIcon'
import { Music } from './lib/music'
import { Opening } from './screens/Opening'
import { Apology } from './screens/Apology'
import { Story } from './screens/Story'
import { PromiseScreen } from './screens/Promise'
import { Question } from './screens/Question'
import { Letter } from './screens/Letter'

const STEPS = 6

export default function App() {
  const [step, setStep] = useState(0)
  const [run, setRun] = useState(0)
  const [musicOn, setMusicOn] = useState(false)
  const music = useRef<Music | null>(null)
  if (!music.current) music.current = new Music()

  const go = (n: number) => {
    setStep(n)
    window.scrollTo({ top: 0 })
  }

  // music begins only after the first tap (Open My Heart)
  const openHeart = () => {
    try {
      music.current!.start()
      setMusicOn(music.current!.on)
    } catch {
      // music is optional, the story must continue without it
    }
    go(1)
  }

  const toggleMusic = () => {
    try {
      setMusicOn(music.current!.toggle())
    } catch {
      setMusicOn(false)
    }
  }

  const replay = () => {
    setRun((r) => r + 1)
    go(0)
  }

  useEffect(() => {
    const m = music.current!
    const onVis = () => (document.hidden ? m.suspend() : m.resume())
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const screen = [
    <Opening onNext={openHeart} />,
    <Apology onNext={() => go(2)} />,
    <Story onNext={() => go(3)} />,
    <PromiseScreen onNext={() => go(4)} />,
    <Question onNext={() => go(5)} />,
    <Letter onReplay={replay} />,
  ][step]

  return (
    <BurstProvider>
      <Background />

      <div
        className="fixed top-3 left-3 z-50 glass rounded-full px-3 py-2 flex items-center gap-2"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={STEPS}
        aria-valuenow={step + 1}
        aria-label="Progress"
      >
        <HeartIcon size={14} style={{ color: '#ff6b9a' }} />
        <div className="flex items-center gap-1.5">
          {Array.from({ length: STEPS }, (_, i) => (
            <motion.span
              key={i}
              className="block h-1.5 rounded-full"
              animate={{
                width: i === step ? 18 : 6,
                backgroundColor: i <= step ? '#ff6b9a' : 'rgba(255,255,255,0.3)',
              }}
              transition={{ duration: 0.4 }}
            />
          ))}
        </div>
      </div>

      <button
        onClick={toggleMusic}
        aria-label={musicOn ? 'Music mute karo' : 'Music chalao'}
        className="fixed top-3 right-3 z-50 glass rounded-full w-10 h-10 grid place-items-center text-blush"
      >
        {musicOn ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${run}-${step}`}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 1.02 }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
          >
            {screen}
          </motion.div>
        </AnimatePresence>
      </main>
    </BurstProvider>
  )
}
