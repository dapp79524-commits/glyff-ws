import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function CTA() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.cta-content',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.cta-section', start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="waitlist" className="cta-section">
      <div className="cta-content">
        <h2 className="cta-title">Finding your date is AI's job.<br />Your job is to enjoy them.</h2>
        <p className="cta-subtitle">Join the waitlist and be part of something new.</p>
        <div className="cta-button-wrap">
          <a href="/waitlist" className="btn-primary btn-large">Join Waitlist</a>
        </div>
      </div>
    </section>
  )
}
