import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { name: 'First Impression', score: 9.8 },
  { name: 'Conversation Flow', score: 9.5 },
  { name: 'Humor Alignment', score: 9.3 },
  { name: 'Shared Values', score: 9.0 },
  { name: 'Scene Simulation', score: 8.7 },
  { name: 'Etc...', score: 7.7 },
]

export default function Simulation() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const [activeMetric, setActiveMetric] = useState(0)
  const [score, setScore] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Trigger simulation when scrolled into view
      ScrollTrigger.create({
        trigger: '.simulation-section',
        start: 'top 60%',
        onEnter: () => {
          if (!isRunning) {
            setIsRunning(true)
            runSimulation()
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isRunning])

  const runSimulation = () => {
    const grid = gridRef.current
    if (!grid) return

    const cells = grid.querySelectorAll('.grid-cell')
    
    // Reset all cells
    cells.forEach(cell => {
      cell.classList.remove('active', 'checking')
    })
    setScore(0)

    // Animate cells one by one like a simulation running
    let cellIndex = 0
    let successCount = 0
    const totalCells = cells.length

    const animateCell = () => {
      if (cellIndex >= totalCells) {
        // Simulation complete - show final score
        gsap.to('.score-value', {
          innerHTML: (successCount / totalCells * 10).toFixed(2),
          duration: 0.5,
          snap: { innerHTML: 0.01 }
        })
        
        // Restart after delay
        setTimeout(() => {
          setIsRunning(false)
        }, 3000)
        return
      }

      const cell = cells[cellIndex]
      const isSuccess = Math.random() > 0.25

      // Quick flash effect
      cell.classList.add('checking')
      
      gsap.to(cell, {
        scale: 1.2,
        duration: 0.1,
        onComplete: () => {
          cell.classList.remove('checking')
          if (isSuccess) {
            cell.classList.add('active')
            successCount++
            // Update live score
            setScore((successCount / (cellIndex + 1) * 10).toFixed(2))
          }
          gsap.to(cell, { scale: 1, duration: 0.1 })
        }
      })

      cellIndex++
      setTimeout(animateCell, 30) // Speed of simulation
    }

    // Start with staggered metric highlights
    let metricIndex = 0
    const metricInterval = setInterval(() => {
      setActiveMetric(metricIndex)
      metricIndex++
      if (metricIndex >= metrics.length) {
        clearInterval(metricInterval)
      }
    }, 600)

    // Start cell animation
    setTimeout(animateCell, 500)
  }

  return (
    <section ref={sectionRef} className="simulation-section">
      <h2 className="simulation-title section-title-mono">
        1000 date simulations<br />
        so the IRL one is perfect
      </h2>

      <div className="simulation-box">
        <div className="simulation-left">
          <div className="profile-connection">
            <div className="profile-avatars">
              <div className="avatar avatar-1">
                <img src="/images/6cc43dfe-c5a2-4f89-9f05-0b26736b1044.png" alt="Profile 1" className="avatar-img" />
              </div>
              <div className="connection-line">
                <svg viewBox="0 0 60 100" className="connection-svg">
                  <path d="M30,0 L30,40" fill="none" stroke="var(--yellow)" strokeWidth="2" />
                  <path d="M30,40 L30,100" fill="none" stroke="var(--yellow)" strokeWidth="2" strokeDasharray="4,4">
                    <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                  </path>
                </svg>
              </div>
              <div className="avatar avatar-2">
                <img src="/images/3cf79faa-4009-427c-96cd-2a4c7ebaa432.png" alt="Profile 2" className="avatar-img" />
              </div>
            </div>
          </div>
          
          <div className="metrics-list">
            {metrics.map((metric, index) => (
              <div 
                key={index} 
                className={`metric-item ${index <= activeMetric ? 'active' : ''} ${index === activeMetric ? 'current' : ''}`}
              >
                <span className="metric-name">{metric.name}</span>
                <span className="metric-score">{metric.score}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="simulation-right">
          <div className="simulation-header">
            <h3>Simulation x 1000</h3>
            <p className="score-display">Score: <span className="score-value">{score}</span></p>
          </div>
          <div ref={gridRef} className="simulation-grid">
            {Array.from({ length: 100 }).map((_, index) => (
              <div key={index} className="grid-cell" />
            ))}
          </div>
          <div className="simulation-status">
            {isRunning ? '⚡ Running simulations...' : '✓ Simulation complete'}
          </div>
        </div>
      </div>
    </section>
  )
}
