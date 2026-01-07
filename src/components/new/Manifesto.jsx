import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Manifesto() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.manifesto-title',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: '.manifesto-section', start: 'top 70%' }
        }
      )

      gsap.fromTo('.manifesto-line',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.manifesto-content', start: 'top 75%' }
        }
      )

      gsap.fromTo('.manifesto-highlight',
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: { trigger: '.manifesto-highlight', start: 'top 80%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="manifesto-section">
      <div className="manifesto-container">
        <h2 className="manifesto-title">The Future is Agentic</h2>
        
        <div className="manifesto-content">
          <p className="manifesto-line manifesto-intro">
            For 20 years, we've connected in primitive ways.
          </p>
          
          <div className="manifesto-old">
            <p className="manifesto-line">We manually scroll.</p>
            <p className="manifesto-line">We manually search.</p>
            <p className="manifesto-line">We manually swipe.</p>
          </div>
          
          <p className="manifesto-line manifesto-problem">
            Spending hours trying to find the right people—because all we have are static, dead profiles.
          </p>
          
          <div className="manifesto-highlight">
            <p className="highlight-text">But now, everything changes.</p>
          </div>
          
          <div className="manifesto-new">
            <p className="manifesto-line">AI brings your profile to life as an agent.</p>
            <p className="manifesto-line">It can interact, learn, and evolve.</p>
            <p className="manifesto-line">It simulates conversations.</p>
            <p className="manifesto-line accent">It knows when something clicks—before you do.</p>
          </div>
          
          <div className="manifesto-action">
            <p className="manifesto-line">Just tell your AI who you're looking for:</p>
            <p className="manifesto-line types">A collaborator. A co-founder. A soulmate.</p>
            <p className="manifesto-line">It will simulate interactions with everyone in your campus.</p>
            <p className="manifesto-line accent">Until it finds the ones that feel right.</p>
          </div>
          
          <div className="manifesto-promise">
            <p className="manifesto-line strike">No more wasted hours.</p>
            <p className="manifesto-line strike">No more missed connections.</p>
            <p className="manifesto-line strike">No more "what ifs."</p>
          </div>
          
          <div className="manifesto-finale">
            <p className="manifesto-line">The people you're meant to meet are out there.</p>
            <p className="manifesto-line large">You'll just connect—with the right people.</p>
            <p className="manifesto-line accent large">Through the shortest possible path.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
