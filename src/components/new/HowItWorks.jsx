import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  {
    title: 'Share Your Vibe',
    subtitle: 'Tell Glyff what you\'re looking for',
    color: '#1a1a2e',
    image: '/images/prompts.png',
    bgColor: '#fff'
  },
  {
    title: 'AI Finds Your Match',
    subtitle: 'We simulate compatibility with everyone',
    color: '#1a1a2e',
    image: '/images/datenotif.png',
    bgColor: '#fff'
  },
  {
    title: 'Get a Date Plan',
    subtitle: 'Ready-to-go date, no texting needed',
    color: '#1a1a2e',
    image: '/images/coffee.jpeg',
    bgColor: '#fff'
  }
]

export default function HowItWorks() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.how-title',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.how-section',
            start: 'top 80%',
          }
        }
      )

      gsap.fromTo('.how-card',
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.how-cards',
            start: 'top 80%',
          }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="how-section">
      <h2 className="how-title">How It Works</h2>
      
      <div className="how-cards">
        {steps.map((step, index) => (
          <div key={index} className="how-card-new">
            <div className="card-number">{index + 1}</div>
            <div className="card-image-container">
              <img src={step.image} alt={step.title} className="card-img" />
            </div>
            <div className="card-text">
              <h3 className="card-title">{step.title}</h3>
              <p className="card-subtitle">{step.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
