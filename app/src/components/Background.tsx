import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import { HeartIcon } from './HeartIcon'

const rnd = (a: number, b: number) => a + Math.random() * (b - a)
const COLORS = ['#ff6b9a', '#ff3d71', '#ffb3c7', '#c4b5fd', '#f43f5e', '#ff8fb1']
const pick = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]

export function Background() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: rnd(2, 96),
        size: rnd(12, 28),
        dur: rnd(14, 26),
        delay: -rnd(0, 26),
        drift: rnd(-60, 60),
        rot: rnd(-40, 40),
        color: pick(COLORS),
      })),
    [],
  )
  const petals = useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: rnd(0, 100),
        size: rnd(10, 18),
        dur: rnd(11, 22),
        delay: -rnd(0, 22),
        drift: rnd(-130, 130),
        rot: rnd(200, 560),
        hue: pick(['#ff7aa5', '#ff4d7e', '#ffb0c8', '#e8457f']),
      })),
    [],
  )
  const sparks = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: rnd(0, 100),
        top: rnd(0, 100),
        size: rnd(2, 5),
        dur: rnd(2.5, 5.5),
        delay: rnd(0, 5),
      })),
    [],
  )

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background:
          'radial-gradient(60% 45% at 50% 0%, rgba(196,181,253,.28), transparent 70%), radial-gradient(70% 50% at 50% 100%, rgba(255,80,130,.30), transparent 70%), linear-gradient(165deg,#22103f 0%,#3a1457 48%,#5a1a50 100%)',
      }}
    >
      <div
        className="fx-orb absolute -left-1/4 -top-1/4 rounded-full"
        style={{
          width: '70vmax',
          height: '70vmax',
          background: 'radial-gradient(circle, rgba(255,107,154,.20), transparent 62%)',
        }}
      />
      <div
        className="fx-orb absolute -right-1/4 bottom-[-20%] rounded-full"
        style={{
          width: '65vmax',
          height: '65vmax',
          animationDelay: '-9s',
          background: 'radial-gradient(circle, rgba(196,181,253,.20), transparent 62%)',
        }}
      />

      {sparks.map((s) => (
        <span
          key={s.id}
          className="fx-spark absolute rounded-full bg-white"
          style={
            {
              left: `${s.left}%`,
              top: `${s.top}%`,
              width: s.size,
              height: s.size,
              boxShadow: '0 0 10px 2px rgba(255,200,225,.9)',
              '--dur': `${s.dur}s`,
              '--delay': `${s.delay}s`,
            } as CSSProperties
          }
        />
      ))}

      {petals.map((p) => (
        <span
          key={p.id}
          className="fx-petal absolute"
          style={
            {
              left: `${p.left}%`,
              top: 0,
              width: p.size,
              height: p.size * 1.2,
              borderRadius: '70% 0 70% 0',
              background: `linear-gradient(135deg, ${p.hue}, #b3235f)`,
              '--dur': `${p.dur}s`,
              '--delay': `${p.delay}s`,
              '--drift': `${p.drift}px`,
              '--rot': `${p.rot}deg`,
            } as CSSProperties
          }
        />
      ))}

      {hearts.map((h) => (
        <span
          key={h.id}
          className="fx-heart absolute"
          style={
            {
              left: `${h.left}%`,
              bottom: -40,
              color: h.color,
              '--dur': `${h.dur}s`,
              '--delay': `${h.delay}s`,
              '--drift': `${h.drift}px`,
              '--rot': `${h.rot}deg`,
            } as CSSProperties
          }
        >
          <HeartIcon size={h.size} />
        </span>
      ))}
    </div>
  )
}
