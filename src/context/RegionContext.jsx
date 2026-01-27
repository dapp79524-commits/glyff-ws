import { createContext, useContext, useState, useEffect } from 'react'
import { getRegionFromPath, getRegionConfig, getRegionFromCookie, setRegionCookie, DEFAULT_REGION } from '../config/regions'

const RegionContext = createContext(null)

export function RegionProvider({ children }) {
  const [region, setRegion] = useState(() => {
    // First check cookie, then path, then default
    const cookieRegion = getRegionFromCookie()
    if (cookieRegion) return cookieRegion
    return getRegionFromPath(window.location.pathname)
  })

  const config = getRegionConfig(region)

  // Update region when path changes
  useEffect(() => {
    const pathRegion = getRegionFromPath(window.location.pathname)
    if (pathRegion !== region) {
      setRegion(pathRegion)
    }
  }, [window.location.pathname])

  // Function to manually switch region
  const switchRegion = (newRegion) => {
    setRegionCookie(newRegion)
    setRegion(newRegion)
    // Navigate to the new region's base path
    const currentPath = window.location.pathname
    const pathWithoutRegion = currentPath.replace(/^\/(au|in)/, '') || '/'
    const newPath = `/${newRegion}${pathWithoutRegion === '/' ? '' : pathWithoutRegion}`
    window.history.pushState({}, '', newPath)
    window.location.reload() // Refresh to update all content
  }

  return (
    <RegionContext.Provider value={{ region, config, switchRegion }}>
      {children}
    </RegionContext.Provider>
  )
}

export function useRegion() {
  const context = useContext(RegionContext)
  if (!context) {
    throw new Error('useRegion must be used within a RegionProvider')
  }
  return context
}
