import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Header from './components/new/Header'
import Hero from './components/new/Hero'
import HowItWorks from './components/new/HowItWorks'
import ScrollComparison from './components/new/ScrollComparison'
import Simulation from './components/new/Simulation'
import Safety from './components/new/Safety'
import FAQ from './components/new/FAQ'
import CTA from './components/new/CTA'
import Footer from './components/new/Footer'
import ManifestoPage from './components/new/ManifestoPage'
import WaitlistPage from './components/new/WaitlistPage'
import { RegionProvider } from './context/RegionContext'
import SEOHead from './components/SEOHead'
import './styles/new-main.css'

gsap.registerPlugin(ScrollTrigger)

function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const appRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!isLoaded || !appRef.current) return

    // Smooth background color transition
    gsap.to(appRef.current, {
      scrollTrigger: {
        trigger: appRef.current,
        start: 'top top',
        end: '50% top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = Math.min(self.progress * 2, 1)
          // Sky blue gradient: #87CEEB at top -> #f0efdb (beige)
          const r = Math.round(135 + progress * (240 - 135))
          const g = Math.round(206 + progress * (239 - 206))
          const b = Math.round(235 - progress * (235 - 219))
          document.body.style.backgroundColor = `rgb(${r}, ${g}, ${b})`
        }
      }
    })

    ScrollTrigger.refresh()

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      document.body.style.backgroundColor = '#f0efdb'
    }
  }, [isLoaded])

  return (
    <div ref={appRef} className={`app ${isLoaded ? 'loaded' : ''}`}>
      <Header />
      <main className="main-content">
        <Hero />
        <HowItWorks />
        <ScrollComparison />
        <Simulation />
        <Safety />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

// Helper to get path without region prefix
function getPathWithoutRegion(path) {
  return path.replace(/^\/(au|in)/, '') || '/'
}

// Helper to get region from path
function getRegionPrefix(path) {
  const match = path.match(/^\/(au|in)/)
  return match ? match[1] : 'in'
}

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)
  const regionPrefix = getRegionPrefix(currentPath)
  const pathWithoutRegion = getPathWithoutRegion(currentPath)

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname)
    }

    const handleClick = (e) => {
      const link = e.target.closest('a')
      if (link && link.href.startsWith(window.location.origin)) {
        const path = new URL(link.href).pathname
        const cleanPath = getPathWithoutRegion(path)
        const currentRegion = getRegionPrefix(window.location.pathname)
        
        // Handle internal navigation
        if (cleanPath === '/manifesto' || cleanPath === '/waitlist' || cleanPath === '/') {
          e.preventDefault()
          // Preserve region prefix in URL
          const newPath = cleanPath === '/' ? `/${currentRegion}` : `/${currentRegion}${cleanPath}`
          window.history.pushState({}, '', newPath)
          setCurrentPath(newPath)
          window.scrollTo(0, 0)
        }
      }
    }

    window.addEventListener('popstate', handlePopState)
    document.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('popstate', handlePopState)
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // Route based on path without region prefix
  let content
  if (pathWithoutRegion === '/manifesto') {
    content = <ManifestoPage />
  } else if (pathWithoutRegion === '/waitlist') {
    content = <WaitlistPage />
  } else {
    content = <HomePage />
  }

  return (
    <RegionProvider>
      <SEOHead />
      {content}
    </RegionProvider>
  )
}
