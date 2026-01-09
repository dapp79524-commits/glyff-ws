import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Footer() {
  const footerRef = useRef(null)

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
          <p className="footer-misspelling">Glyff is sometimes searched as Gliff or Glif — you're in the right place.</p>
        </div>

        <div className="footer-links">
          <a href="#how-it-works">How it works</a>
          <a href="#safety">Safety</a>
          <a href="#faq">FAQ</a>
          <a href="/manifesto">Manifesto</a>
        </div>
      </div>
    </footer>
  )
}
