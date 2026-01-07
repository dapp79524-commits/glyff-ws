import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const faqs = [
  { q: "How does Glyff work?", a: "Glyff uses AI to understand your preferences and find compatible matches from verified students. Once matched, we send you a ready-to-go date plan with time, place, and conversation starters!" },
  { q: "What will I know about my match before the date?", a: "You'll receive your match's first name, verified college, and a brief compatibility summary. This keeps things exciting while ensuring safety." },
  { q: "What if I can't make it last minute?", a: "Life happens! Just let us know at least 4 hours before, and we'll reschedule. Repeated no-shows may lead to a ban or fine." },
  { q: "Where do the dates happen?", a: "In decent, safe restaurants and cafes that are in proximity of both parties and at their own convenience of time." },
  { q: "How often can I go on a Glyff date?", a: "Whenever your previously assigned match date is done!" },
]

export default function FAQ() {
  const sectionRef = useRef(null)
  const [openIndex, setOpenIndex] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.faq-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: '.faq-section', start: 'top 80%' }
        }
      )

      gsap.fromTo('.faq-item',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: { trigger: '.faq-list', start: 'top 85%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section ref={sectionRef} id="faq" className="faq-section">
      <h2 className="faq-title">FAQ</h2>
      
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`faq-item ${openIndex === index ? 'open' : ''}`}
            onClick={() => toggleFaq(index)}
          >
            <div className="faq-question">
              <span>{faq.q}</span>
              <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
            </div>
            <div className="faq-answer">
              <p>{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
