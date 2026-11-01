// Soft, original ambient loop synthesised with WebAudio (no audio files needed).
// Starts only after a user gesture (see App).

const hz = (m: number) => 440 * Math.pow(2, (m - 69) / 12)
const CHORDS = [
  [57, 60, 64], // Am
  [53, 57, 60], // F
  [60, 64, 67], // C
  [55, 59, 62], // G
]
const BASS = [45, 41, 48, 43]
const PATTERN: (number | null)[] = [0, 1, 2, null, 1, 2, 1, null]
const BEAT = 0.6

export class Music {
  private ctx: AudioContext | null = null
  private master: GainNode | null = null
  private bus: GainNode | null = null
  private timer: number | null = null
  private next = 0
  private n = 0
  private isOn = false

  get on() {
    return this.isOn
  }

  start() {
    if (!this.ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      const ctx = new AC()
      const master = ctx.createGain()
      master.gain.value = 0
      const lp = ctx.createBiquadFilter()
      lp.type = 'lowpass'
      lp.frequency.value = 2200
      const bus = ctx.createGain()
      const delay = ctx.createDelay(1.5)
      delay.delayTime.value = 0.45
      const fb = ctx.createGain()
      fb.gain.value = 0.4
      const wet = ctx.createGain()
      wet.gain.value = 0.45
      bus.connect(lp)
      lp.connect(master)
      lp.connect(delay)
      delay.connect(fb)
      fb.connect(delay)
      delay.connect(wet)
      wet.connect(master)
      master.connect(ctx.destination)
      this.ctx = ctx
      this.master = master
      this.bus = bus
      this.next = ctx.currentTime + 0.1
      this.timer = window.setInterval(() => this.schedule(), 400)
    }
    void this.ctx.resume()
    this.setOn(true)
  }

  setOn(on: boolean) {
    this.isOn = on
    if (!this.ctx || !this.master) return
    this.master.gain.setTargetAtTime(on ? 0.5 : 0, this.ctx.currentTime, 0.5)
  }

  toggle() {
    if (!this.ctx) this.start()
    else this.setOn(!this.isOn)
    return this.isOn
  }

  suspend() {
    void this.ctx?.suspend()
  }

  resume() {
    if (this.isOn) void this.ctx?.resume()
  }

  private schedule() {
    const ctx = this.ctx
    if (!ctx || ctx.state !== 'running') return
    if (this.next < ctx.currentTime) this.next = ctx.currentTime + 0.05
    while (this.next < ctx.currentTime + 2.5) {
      const beat = this.n % 8
      const ci = Math.floor(this.n / 8) % 4
      if (beat === 0) {
        this.pad(CHORDS[ci], this.next, 8 * BEAT)
        this.pluck(BASS[ci], this.next, 0.05, 2.4)
      }
      const idx = PATTERN[beat]
      if (idx !== null) this.pluck(CHORDS[ci][idx] + 12, this.next, 0.055, 1.6)
      this.next += BEAT
      this.n++
    }
  }

  private pad(notes: number[], t: number, dur: number) {
    const ctx = this.ctx!
    notes.forEach((m) => {
      ;(['sine', 'triangle'] as OscillatorType[]).forEach((type, k) => {
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = type
        osc.frequency.value = hz(m) * (k ? 1.004 : 1)
        const peak = k ? 0.012 : 0.03
        g.gain.setValueAtTime(0, t)
        g.gain.linearRampToValueAtTime(peak, t + 1.4)
        g.gain.setValueAtTime(peak, t + dur - 0.6)
        g.gain.linearRampToValueAtTime(0, t + dur + 1.2)
        osc.connect(g)
        g.connect(this.bus!)
        osc.start(t)
        osc.stop(t + dur + 1.3)
      })
    })
  }

  private pluck(m: number, t: number, peak: number, len: number) {
    const ctx = this.ctx!
    const osc = ctx.createOscillator()
    const g = ctx.createGain()
    osc.type = 'triangle'
    osc.frequency.value = hz(m)
    g.gain.setValueAtTime(0.0001, t)
    g.gain.exponentialRampToValueAtTime(peak, t + 0.02)
    g.gain.exponentialRampToValueAtTime(0.0001, t + len)
    osc.connect(g)
    g.connect(this.bus!)
    osc.start(t)
    osc.stop(t + len + 0.1)
  }
}
