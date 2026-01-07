import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const testimonials = [
  { text: "The date was amazing! We connected instantly. Glyff really understands compatibility.", name: "Priya", college: "DU, Junior" },
  { text: "I was skeptical at first, but my match and I have been dating for 2 months now!", name: "Arjun", college: "DTU, Senior" },
  { text: "Finally an app that actually works. No endless swiping, just real connections.", name: "Ananya", college: "JNU, Sophomore" },
  { text: "The AI matching is incredible. We had so much in common right from the start.", name: "Rohan", college: "NSUT, Junior" },
  { text: "Best dating experience ever. The date plan was perfect and stress-free.", name: "Kavya", college: "IP, Freshman" },
  { text: "Glyff made dating feel safe and exciting again. Highly recommend!", name: "Aditya", college: "Jamia, Senior" },
]

export default function Testimonials() {
  const sectionRef = useRef(null)
  const scrollRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.testimonials-title',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: '.testimonials-section', start: 'top 80%' }
        }
      )

      // Horizontal scroll animation for testimonials
      const scrollContainer = scrollRef.current
      if (scrollContainer) {
        gsap.to(scrollContainer, {
          x: () => -(scrollContainer.scrollWidth - window.innerWidth + 100),
          ease: 'none',
          scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 20%',
            end: () => `+=${scrollContainer.scrollWidth}`,
            scrub: 1,
            pin: true,
          }
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="testimonials-section">
      <h2 className="testimonials-title">Hear from Glyff Lovers</h2>
      
      <div className="testimonials-wrapper">
        <div ref={scrollRef} className="testimonials-scroll">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-avatar">😊</div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="testimonial-author">
                <strong>{testimonial.name}</strong>
                <span>{testimonial.college}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
