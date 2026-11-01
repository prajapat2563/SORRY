import { Component, StrictMode } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

class Boundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  render() {
    if (!this.state.failed) return this.props.children
    return (
      <div
        style={{
          minHeight: '100dvh',
          display: 'grid',
          placeItems: 'center',
          gap: 16,
          textAlign: 'center',
          padding: 24,
          background: '#22103f',
          color: '#ffe9f0',
          fontFamily: 'Georgia, serif',
          fontSize: 22,
        }}
      >
        <div>
          <p>Kuch gadbad ho gayi ❤️</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              marginTop: 12,
              padding: '12px 28px',
              borderRadius: 999,
              border: 0,
              background: '#ff3d71',
              color: '#fff',
              fontSize: 18,
            }}
          >
            Dobara kholo
          </button>
        </div>
      </div>
    )
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Boundary>
      <App />
    </Boundary>
  </StrictMode>,
)
