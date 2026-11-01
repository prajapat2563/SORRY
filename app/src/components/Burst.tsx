import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { HeartIcon } from './HeartIcon'

type Kind = 'heart' | 'rose' | 'confetti'
interface P {
  id: number
  x: number
  y: number
  dx: number
  dy: number
  rot: number
  size: number
  dur: number
  kind: Kind
  color: string
  rain: boolean
}

interface BurstApi {
  burst: (x: number, y: number, n?: number) => void
  celebrate: () => void
}

const Ctx = createContext<BurstApi>({ burst() {}, celebrate() {} })
export const useBurst = () => useContext(Ctx)

const rnd = (a: number, b: number) => a + Math.random() * (b - a)
const HEARTS = ['#ff6b9a', '#ff3d71', '#ffb3c7', '#f43f5e', '#ff8fb1', '#c4b5fd']
const CONFETTI = ['#ff6b9a', '#ffd166', '#c4b5fd', '#ffffff', '#ff3d71', '#7dd3fc']
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)]
let uid = 0

export function BurstProvider({ children }: { children: ReactNode }) {
  const [ps, setPs] = useState<P[]>([])

  const add = useCallback((list: P[]) => {
    setPs((p) => [...p, ...list])
    const ids = new Set(list.map((l) => l.id))
    const maxDur = Math.max(...list.map((l) => l.dur))
    window.setTimeout(() => setPs((p) => p.filter((x) => !ids.has(x.id))), maxDur * 1000 + 300)
  }, [])

  const burst = useCallback(
    (x: number, y: number, n = 14) => {
      const list: P[] = Array.from({ length: n }, () => {
        const a = Math.random() * Math.PI * 2
        const d = rnd(60, 170)
        const r = Math.random()
        return {
          id: uid++,
          x,
          y,
          dx: Math.cos(a) * d,
          dy: Math.sin(a) * d - 30,
          rot: rnd(-60, 60),
          size: rnd(16, 30),
          dur: rnd(1.2, 1.9),
          kind: r < 0.78 ? 'heart' : 'rose',
          color: pick(HEARTS),
          rain: false,
        }
      })
      add(list)
    },
    [add],
  )

  const celebrate = useCallback(() => {
    const w = window.innerWidth
    const h = window.innerHeight
    const list: P[] = Array.from({ length: 70 }, () => {
      const r = Math.random()
      return {
        id: uid++,
        x: rnd(0, w),
        y: -30,
        dx: rnd(-90, 90),
        dy: h + 90,
        rot: rnd(-360, 360),
        size: rnd(16, 30),
        dur: rnd(2.6, 4.8),
        kind: r < 0.4 ? 'heart' : r < 0.65 ? 'rose' : 'confetti',
        color: r < 0.4 ? pick(HEARTS) : pick(CONFETTI),
        rain: true,
      }
    })
    add(list)
    ;[0, 450, 900, 1400].forEach((t, i) =>
      window.setTimeout(() => burst(w * (0.25 + 0.17 * i), h * 0.42, 16), t),
    )
  }, [add, burst])

  const api = useMemo(() => ({ burst, celebrate }), [burst, celebrate])

  return (
    <Ctx.Provider value={api}>
      {children}
      <div className="fixed inset-0 z-[60] pointer-events-none overflow-hidden" aria-hidden="true">
        {ps.map((p) => {
          const ease = (p.rain ? 'linear' : 'easeOut') as 'linear' | 'easeOut'
          return (
            <motion.div
              key={p.id}
              className="absolute"
              style={{ left: p.x, top: p.y, marginLeft: -p.size / 2, marginTop: -p.size / 2 }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
              animate={
                p.rain
                  ? { x: p.dx, y: p.dy, opacity: [1, 1, 0.9], scale: 1, rotate: p.rot }
                  : {
                      x: [0, p.dx, p.dx * 1.1],
                      y: [0, p.dy, p.dy + 90],
                      opacity: [1, 1, 0],
                      scale: [0.4, 1.1, 0.8],
                      rotate: p.rot,
                    }
              }
              transition={{ duration: p.dur, ease, times: p.rain ? undefined : [0, 0.55, 1] }}
            >
              {p.kind === 'heart' && <HeartIcon size={p.size} style={{ color: p.color }} />}
              {p.kind === 'rose' && <span style={{ fontSize: p.size, lineHeight: 1 }}>🌹</span>}
              {p.kind === 'confetti' && (
                <div
                  style={{
                    width: p.size * 0.45,
                    height: p.size * 0.8,
                    background: p.color,
                    borderRadius: 2,
                  }}
                />
              )}
            </motion.div>
          )
        })}
      </div>
    </Ctx.Provider>
  )
}
