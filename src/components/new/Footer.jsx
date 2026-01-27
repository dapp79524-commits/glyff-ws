import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRegion } from '../../context/RegionContext'

export default function Footer() {
  const footerRef = useRef(null)
  const { region, switchRegion } = useRegion()
  const otherRegion = region === 'au' ? 'in' : 'au'
  const otherRegionName = region === 'au' ? 'India' : 'Australia'

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-content',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          duration: 0.6,
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          }
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer ref={footerRef} className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="footer-logo">Glyff<span style={{ fontStyle: 'italic', fontWeight: 400 }}>AI</span></div>
          <p className="footer-tagline">A friend that texts you ready-to-go dates</p>
        </div>

        <div className="footer-links">
          <a href="#how-it-works">How it works</a>
          <a href="#safety">Safety</a>
          <a href="#faq">FAQ</a>
          <a href="/manifesto">Manifesto</a>
        </div>
        
        <div className="footer-region">
          <span className="region-label">Wrong region?</span>
          <button 
            className="region-switch-btn"
            onClick={() => switchRegion(otherRegion)}
          >
            Switch to {otherRegionName}
          </button>
        </div>
      </div>
    </footer>
  )
}
