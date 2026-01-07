import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const safetyFeatures = [
  { title: 'Verified Students Only', desc: 'College ID verification required for all users' },
  { title: 'Smart Safety Tips', desc: 'AI-powered tips before every date' },
  { title: 'Curated Venues', desc: 'Safe, public spots vetted by our team' },
  { title: 'Easy Exit', desc: 'Leave anytime, no pressure ever' },
  { title: 'No Ghosting Zone', desc: 'Ghosters get permanently banned' },
  { title: '24/7 Support', desc: 'Real humans ready to help' },
]

export default function Safety() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.safety-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: '.safety-section', start: 'top 80%' }
        }
      )

      gsap.fromTo('.safety-item',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.safety-list', start: 'top 85%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="safety" className="safety-section-new">
      <div className="safety-container">
        <div className="safety-left">
          <h2 className="safety-title">Your safety,<br />our priority.</h2>
          <p className="safety-desc">
            Every feature is designed with your comfort and security in mind. 
            We take safety seriously so you can focus on making real connections.
          </p>
        </div>
        
        <div className="safety-right">
          <div className="safety-list">
            {safetyFeatures.map((feature, index) => (
              <div key={index} className="safety-item">
                <div className="safety-check">✓</div>
                <div className="safety-text">
                  <strong>{feature.title}</strong>
                  <span>{feature.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
