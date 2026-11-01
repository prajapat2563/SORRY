import { useEffect, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon } from './HeartIcon'

export function Envelope({
  open,
  onOpen,
  peek,
}: {
  open: boolean
  onOpen: () => void
  peek: ReactNode
}) {
  const [flapBack, setFlapBack] = useState(false)

  useEffect(() => {
    if (!open) {
      setFlapBack(false)
      return
    }
    const t = window.setTimeout(() => setFlapBack(true), 330)
    return () => window.clearTimeout(t)
  }, [open])

  const onKey = (e: KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !open) {
      e.preventDefault()
      onOpen()
    }
  }

  return (
    <motion.div
      animate={open ? { y: 0 } : { y: [0, -8, 0] }}
      transition={open ? { duration: 0.3 } : { duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      className="relative mx-auto select-none"
      style={{
        width: 'min(320px, 82vw)',
        aspectRatio: '3 / 2',
        perspective: 1000,
        filter: 'drop-shadow(0 18px 30px rgba(10,0,30,.45))',
      }}
    >
      {!open && (
        <motion.div
          className="absolute rounded-full pointer-events-none"
          style={{
            inset: '-22%',
            background: 'radial-gradient(circle, rgba(255,120,170,.5), transparent 62%)',
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div
        role="button"
        tabIndex={0}
        aria-label="Envelope kholo"
        onClick={() => !open && onOpen()}
        onKeyDown={onKey}
        className="absolute inset-0"
        style={{ cursor: open ? 'default' : 'pointer', outline: 'none' }}
      >
        {/* back */}
        <div className="absolute inset-0 rounded-lg" style={{ background: '#b92f62' }} />

        {/* letter peeking out */}
        <motion.div
          className="absolute rounded-md grid place-items-center text-center"
          style={{
            left: '6%',
            right: '6%',
            top: '8%',
            height: '86%',
            zIndex: 10,
            background: 'linear-gradient(#fffaf5,#ffe6ee)',
            color: '#8a2155',
          }}
          animate={{ y: open ? '-48%' : '0%' }}
          transition={{ delay: 0.55, duration: 0.9, ease: 'easeInOut' }}
        >
          {peek}
        </motion.div>

        {/* front pocket */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            zIndex: 20,
            clipPath: 'polygon(0 0, 50% 56%, 100% 0, 100% 100%, 0 100%)',
            background: 'linear-gradient(160deg,#ff7aa5,#e8457f)',
          }}
        />

        {/* flap */}
        <motion.div
          className="absolute left-0 right-0 top-0"
          style={{
            height: '56%',
            transformOrigin: 'top',
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
            zIndex: flapBack ? 5 : 30,
            background: 'linear-gradient(#ff9fbd,#f06292)',
          }}
          animate={{ rotateX: open ? -180 : 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        />

        {/* wax seal */}
        <motion.div
          className="absolute grid place-items-center rounded-full"
          style={{
            left: '50%',
            top: '56%',
            width: '15%',
            aspectRatio: '1',
            x: '-50%',
            y: '-50%',
            zIndex: 40,
            background: 'radial-gradient(circle at 35% 30%, #ff5a7e, #b3123f)',
            boxShadow: '0 3px 10px rgba(0,0,0,.4)',
            color: '#ffd9e3',
          }}
          animate={open ? { opacity: 0, scale: 0.4 } : { scale: [1, 1.08, 1] }}
          transition={open ? { duration: 0.3 } : { duration: 1.8, repeat: Infinity }}
        >
          <HeartIcon size={18} />
        </motion.div>
      </div>
    </motion.div>
  )
}
