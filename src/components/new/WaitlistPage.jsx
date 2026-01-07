import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import WaitlistForm from './WaitlistForm'

export default function WaitlistPage() {
  const pageRef = useRef(null)

  useEffect(() => {
    // Page enter animation
    const ctx = gsap.context(() => {
      gsap.fromTo(pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      )

      gsap.fromTo('.waitlist-page-header',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' }
      )

      gsap.fromTo('.waitlist-page-message',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.35, ease: 'power2.out' }
      )

      gsap.fromTo('.waitlist-form',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.5, ease: 'power2.out' }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="waitlist-page">
      <header className="waitlist-page-nav">
        <a href="/" className="header-logo">Glyff<span>AI</span></a>
      </header>

      <main className="waitlist-page-content">
        <div className="waitlist-page-header">
          <h1>Join the Waitlist</h1>
          <p className="waitlist-page-subtitle">
            You're not just joining a waitlist,<br />
            you're helping shape the future of dating.
          </p>
        </div>

        <div className="waitlist-page-message">
          <p>Right now, <strong>Glyff's waitlist</strong> is live.</p>
          <p>
            Glyff is coming soon, but your journey starts here—at the beginning of something new, meaningful, and uniquely designed for you.
          </p>
          <p className="thanks">Thanks for being part of this with us.</p>
        </div>

        <WaitlistForm />
      </main>

      <footer className="waitlist-page-footer">
        <a href="/">← Back to Home</a>
      </footer>
    </div>
  )
}
