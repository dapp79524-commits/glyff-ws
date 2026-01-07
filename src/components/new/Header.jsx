import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Header() {
  const headerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.header', 
        { y: -100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          ease: 'power3.out',
          duration: 0.8,
          delay: 0.2
        }
      )
    }, headerRef)

    return () => ctx.revert()
  }, [])

  return (
    <header ref={headerRef} className="header">
      <a href="/" className="header-logo">Glyff<span>AI</span></a>
      <nav className="header-nav">
        <a href="#how-it-works">How it works</a>
        <a href="#safety">Safety</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div className="header-actions">
        <a href="/manifesto" className="btn-outline">Read our Manifesto</a>
      </div>
    </header>
  )
}
