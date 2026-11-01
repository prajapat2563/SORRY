import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

export function Btn({
  children,
  onClick,
  variant = 'primary',
  className = '',
}: {
  children: ReactNode
  onClick: () => void
  variant?: 'primary' | 'ghost'
  className?: string
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 font-body font-bold text-xl tracking-wide select-none'
  const v =
    variant === 'primary'
      ? 'text-white bg-gradient-to-r from-[#ff3d71] via-[#ff5c8a] to-[#d946a8] shadow-[0_8px_30px_rgba(255,61,113,.45)]'
      : 'text-blush glass'
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`${base} ${v} ${className}`}
      style={variant === 'primary' ? { border: 0 } : undefined}
    >
      {children}
    </motion.button>
  )
}

export function Screen({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <section
      className={`min-h-[100dvh] w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-6 px-5 pt-20 pb-12 text-center ${className}`}
    >
      {children}
    </section>
  )
}

export function Fade({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}
