import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useRegion } from '../../context/RegionContext'

gsap.registerPlugin(ScrollTrigger)

// Region-specific manifesto content
const manifestoContent = {
  in: {
    locationTag: 'Delhi colleges.',
    networkText: "It will simulate interactions across Delhi's college network—",
    transitText: 'probably a metro ride away.'
  },
  au: {
    locationTag: 'Sydney universities.',
    networkText: "It will simulate interactions across Sydney's university network—",
    transitText: 'probably a train ride away.'
  }
}

export default function ManifestoPage() {
  const pageRef = useRef(null)
  const { region } = useRegion()
  const content = manifestoContent[region] || manifestoContent.in

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.manifesto-hero-title',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      )

      gsap.fromTo('.manifesto-block',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.manifesto-body', start: 'top 80%' }
        }
      )
    }, pageRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={pageRef} className="manifesto-page">
      {/* Header */}
      <header className="manifesto-header">
        <a href="/" className="header-logo">Glyff<span>AI</span></a>
      </header>

      {/* Hero */}
      <section className="manifesto-hero">
        <h1 className="manifesto-hero-title">
          The future is an<br />
          <span className="highlight">agentic social network.</span>
        </h1>
      </section>

      {/* Body */}
      <section className="manifesto-body">
        <div className="manifesto-block old-ways">
          <p className="block-intro">For the past 20 years, we've connected in primitive ways.</p>
          <div className="strikethrough-list">
            <p>We manually scroll.</p>
            <p>We manually search.</p>
            <p>We manually swipe.</p>
          </div>
          <p className="block-problem">
            We spend hours trying to find the right people—<br />
            because all we have are static, dead profiles.
          </p>
        </div>

        <div className="manifesto-block change">
          <p className="block-highlight">But now, everything changes.</p>
        </div>

        <div className="manifesto-block new-way">
          <p>AI brings profiles to life as agents.</p>
          <p>They can interact, learn, and evolve.</p>
          <p>They simulate conversations.</p>
          <p className="accent">They recognize chemistry—sometimes before you do.</p>
        </div>

        <div className="manifesto-block local">
          <p className="block-intro">And for the first time, this isn't global noise.</p>
          <p className="block-highlight">It's your world.</p>
          <div className="location-tags">
            <span>{content.locationTag}</span>
            <span>Your campus.</span>
            <span>Your crowd.</span>
            <span>Your city.</span>
          </div>
        </div>

        <div className="manifesto-block action">
          <p>Just tell your AI who you're looking for:</p>
          <p className="types">A collaborator. A co-founder. A best friend. A soulmate.</p>
          <p>{content.networkText}</p>
          <p className="accent">until it finds the people that actually feel right.</p>
        </div>

        <div className="manifesto-block music">
          <p className="block-intro">And we go deeper than bios and pictures.</p>
          <div className="music-match">
            <p>We match you by <strong>taste</strong>.</p>
            <p>By <strong>vibe</strong>.</p>
            <p>By what you play at 2am when you don't want to talk to anyone.</p>
          </div>
          <p className="spotify-note">
            With Spotify matching, Glyff understands your rhythm—<br />
            <span className="accent">the overlap that says "you'll get me."</span>
          </p>
        </div>

        <div className="manifesto-block promise">
          <div className="no-more">
            <p>No more wasted hours.</p>
            <p>No more missed connections.</p>
            <p>No more "what ifs."</p>
          </div>
        </div>

        <div className="manifesto-block finale">
          <p>The people you're meant to meet are out there—</p>
          <p className="metro">{content.transitText}</p>
          <div className="final-words">
            <p>You won't have to settle.</p>
            <p>You won't have to chase.</p>
            <p className="big">You'll just connect—</p>
            <p className="big">with the right people—</p>
            <p className="big accent">through the shortest possible path.</p>
          </div>
        </div>

        <div className="manifesto-block cta-block">
          <p className="cta-text">Start finding who you deserve to meet.</p>
          <p className="brand">Only on <span>Glyff</span></p>
          <a href="/waitlist" className="btn-primary btn-large">Join the Waitlist</a>
        </div>
      </section>

      {/* Footer */}
      <footer className="manifesto-footer">
        <a href="/">← Back to Home</a>
      </footer>
    </div>
  )
}
