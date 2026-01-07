import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

// Glyff AI app URL (Expo web)
const APP_URL = 'http://localhost:8081'

const typeOptions = ['DU students', 'JNU scholars', 'DTU engineers', 'sports enthusiasts', 'music lovers', 'foodies']
const loveOptions = ['late night chai runs', 'spontaneous adventures', 'deep conversations', 'trying new cafes', 'watching sunsets', 'road trips']
const andOptions = ['shares my taste in music', 'makes me laugh', 'loves dogs', 'enjoys quiet evenings', 'is passionate about life', 'believes in real connections']

export default function Hero() {
  const heroRef = useRef(null)
  const [typeIndex, setTypeIndex] = useState(0)
  const [loveIndex, setLoveIndex] = useState(0)
  const [andIndex, setAndIndex] = useState(0)

  useEffect(() => {
    // Auto-rotate options
    const typeInterval = setInterval(() => {
      setTypeIndex(i => (i + 1) % typeOptions.length)
    }, 2500)
    const loveInterval = setInterval(() => {
      setLoveIndex(i => (i + 1) % loveOptions.length)
    }, 3000)
    const andInterval = setInterval(() => {
      setAndIndex(i => (i + 1) % andOptions.length)
    }, 3500)

    return () => {
      clearInterval(typeInterval)
      clearInterval(loveInterval)
      clearInterval(andInterval)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate hero content
      gsap.fromTo('.hero-title-line', 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: 'power3.out', delay: 0.3 }
      )
      
      gsap.fromTo('.hero-subtitle-badge', 
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.7)', delay: 0.8 }
      )

      gsap.fromTo('.hero-selector', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 1 }
      )

      gsap.fromTo('.hero-buttons', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.2 }
      )

      // Floating photos animation
      gsap.to('.floating-photo', {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        rotation: 'random(-5, 5)',
        duration: 'random(3, 5)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: { each: 0.5, from: 'random' }
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-bg"></div>
      
      {/* Floating notification cards */}
      <div className="floating-photos">
        <div className="floating-photo photo-1">
          <div className="notification-card">
            <img src="/images/mini-hero-messages.png" alt="Messages" className="notif-icon" />
            <div className="notif-content">
              <span className="notif-app">Glyff</span>
              <span className="notif-text">1 Ready-to-go Date Invite</span>
            </div>
          </div>
        </div>
        <div className="floating-photo photo-2">
          <div className="notification-card">
            <img src="/images/unnamed.webp" alt="Email" className="notif-icon" />
            <div className="notif-content">
              <span className="notif-app">Glyff</span>
              <span className="notif-text">Your match is ready! ☕</span>
            </div>
          </div>
        </div>
        <div className="floating-photo photo-3">
          <img src="/images/prompts.png" alt="Prompts" className="photo-image" />
        </div>
        <div className="floating-photo photo-4">
          <img src="/images/spotify-match.png" alt="71% Music Taste Match" className="photo-image" />
        </div>
      </div>

      <div className="hero-content">
        <h1 className="hero-title">
          <span className="hero-title-line">Tell me your type,</span>
          <span className="hero-title-line">I set up the date</span>
        </h1>
        
        <div className="hero-subtitle-badge">
          Exclusive to Delhi's Top Colleges
        </div>

        <div className="hero-selector">
          <div className="selector-row">
            <span>Find me a</span>
            <div className="selector-pill">
              <span className="pill-text">{typeOptions[typeIndex]}</span>
            </div>
          </div>
          <div className="selector-row">
            <span>who loves</span>
            <div className="selector-pill highlight">
              <span className="pill-text">{loveOptions[loveIndex]}</span>
            </div>
          </div>
          <div className="selector-row">
            <span>and</span>
            <div className="selector-pill">
              <span className="pill-text">{andOptions[andIndex]}</span>
            </div>
          </div>
        </div>

        <div className="hero-buttons">
          <a href="/waitlist" className="btn-outline-dark">Join waitlist</a>
        </div>
      </div>
    </section>
  )
}
