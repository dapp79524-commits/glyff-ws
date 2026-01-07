import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Comparison() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.comparison-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: '.comparison-section', start: 'top 80%' }
        }
      )

      gsap.fromTo('.comparison-card',
        { opacity: 0, x: (i) => i === 0 ? -50 : 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: { trigger: '.comparison-cards', start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="comparison-section">
      <h2 className="comparison-title section-title-italic">Just Enjoy the Fun Part</h2>
      
      <div className="comparison-cards">
        <div className="comparison-card other-apps">
          <div className="card-visual">
            <div className="app-icons">
              <div className="app-icon tinder">
                <span className="notification">3,373</span>
                🔥
              </div>
              <div className="app-icon hinge">
                <span className="notification">1,645</span>
                H
              </div>
              <div className="app-icon bumble">❌</div>
            </div>
          </div>
          <h3>Other Dating Apps</h3>
          <p>Endless Swiping & Small Talks</p>
        </div>

        <div className="comparison-card glyff-card">
          <div className="card-visual glyff-visual">
            <div className="message-icon">💬<span className="badge">1</span></div>
            <div className="smiley">😊</div>
          </div>
          <h3>Glyff</h3>
          <p>1 Ready-to-go Date Invite</p>
        </div>
      </div>
    </section>
  )
}
