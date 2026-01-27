import { useEffect } from 'react'
import { useRegion } from '../context/RegionContext'

export default function SEOHead() {
  const { config } = useRegion()
  const { seo } = config

  useEffect(() => {
    // Update document title
    document.title = seo.title

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) {
      metaDescription.setAttribute('content', seo.description)
    }

    // Update canonical
    const canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', seo.canonical)
    }

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', seo.ogTitle)
    }

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) {
      ogDescription.setAttribute('content', seo.description)
    }

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) {
      ogUrl.setAttribute('content', seo.canonical)
    }

    // Update Twitter Card tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) {
      twitterTitle.setAttribute('content', seo.ogTitle)
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) {
      twitterDescription.setAttribute('content', seo.description)
    }

    const twitterUrl = document.querySelector('meta[name="twitter:url"]')
    if (twitterUrl) {
      twitterUrl.setAttribute('content', seo.canonical)
    }
  }, [seo])

  return null
}
