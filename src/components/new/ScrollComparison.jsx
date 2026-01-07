import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    kicker: 'Less',
    headline: 'Swiping.',
    accent: '#ff7f50',
    description: 'No endless swiping through profiles. Glyff understands your preferences.',
    glyffValue: 0,
    othersValue: 100,
    metric: 'swipes/day'
  },
  {
    kicker: 'More',
    headline: 'Real Dates.',
    accent: '#fac92d',
    description: 'Skip the awkward texting phase. Go straight to meeting IRL.',
    glyffValue: 85,
    othersValue: 12,
    metric: '% first dates'
  },
  {
    kicker: 'Better',
    headline: 'Matches.',
    accent: '#87CEEB',
    description: 'AI-powered compatibility means higher quality connections.',
    glyffValue: 94,
    othersValue: 23,
    metric: '% compatibility'
  }
]

export default function ScrollComparison() {
  const wrapperRef = useRef(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const progress = self.progress
          const stepIndex = Math.min(
            Math.floor(progress * steps.length),
            steps.length - 1
          )
          setActiveStep(stepIndex)
        }
      })
    }, wrapper)

    return () => ctx.revert()
  }, [])

  const step = steps[activeStep]

  return (
    <div 
      ref={wrapperRef} 
      className="scroll-comparison-wrapper"
      style={{ height: `${steps.length * 100}vh` }}
    >
      <div className="scroll-comparison-sticky">
        <div className="comparison-container">
          {/* Left side - Text */}
          <div className="comparison-text">
            <span className="comparison-kicker">{step.kicker}</span>
            <h2 
              className="comparison-headline" 
              style={{ color: step.accent }}
              key={step.headline}
            >
              {step.headline}
            </h2>
            <p className="comparison-description">{step.description}</p>
            
            {/* Progress indicators */}
            <div className="comparison-progress">
              {steps.map((s, i) => (
                <div 
                  key={i} 
                  className={`progress-segment ${i <= activeStep ? 'active' : ''}`}
                  style={{ backgroundColor: i <= activeStep ? s.accent : '#e0e0e0' }}
                />
              ))}
            </div>
          </div>

          {/* Right side - Visual comparison */}
          <div className="comparison-visual">
            {/* Glyff card */}
            <div 
              className="app-card glyff-card"
              style={{ borderColor: step.accent }}
            >
              <div className="app-card-header">
                <span className="app-logo glyff-logo">G</span>
                <span className="app-name">Glyff</span>
              </div>
              <div className="app-stat">
                <div 
                  className="stat-bar"
                  style={{ 
                    width: `${step.glyffValue}%`,
                    backgroundColor: step.accent
                  }}
                />
                <span className="stat-value">{step.glyffValue}{step.metric.includes('%') ? '%' : ''}</span>
              </div>
              <span className="stat-label">{step.metric}</span>
            </div>

            {/* Others card */}
            <div className="app-card others-card">
              <div className="app-card-header">
                <div className="other-logos">
                  <img src="/images/5d0c2e79fce25abf8a655ea9e57c5bf3.jpg" alt="Hinge" className="other-logo" />
                  <img src="/images/bumble-1-1.svg" alt="Bumble" className="other-logo" />
                </div>
                <span className="app-name">Others</span>
              </div>
              <div className="app-stat">
                <div 
                  className="stat-bar others-bar"
                  style={{ width: `${step.othersValue}%` }}
                />
                <span className="stat-value">{step.othersValue}{step.metric.includes('%') ? '%' : ''}</span>
              </div>
              <span className="stat-label">{step.metric}</span>
            </div>
          </div>
        </div>

        {/* Background gradient */}
        <div 
          className="comparison-bg-gradient"
          style={{ 
            background: `radial-gradient(ellipse at 60% 40%, ${step.accent}15, transparent 70%)`
          }}
        />
      </div>
    </div>
  )
}
