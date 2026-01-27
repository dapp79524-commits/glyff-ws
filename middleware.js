// Vercel Edge Middleware for geo-based routing
// This runs on Vercel's edge network before requests reach your app

export const config = {
  matcher: ['/']
}

export default function middleware(request) {
  const url = new URL(request.url)
  const pathname = url.pathname

  // Check if user has a region preference cookie
  const regionCookie = request.cookies.get('glyff_region')?.value
  
  if (regionCookie) {
    // User has manually selected a region, redirect to that
    if (regionCookie === 'au' && pathname === '/') {
      url.pathname = '/au'
      return Response.redirect(url, 307)
    }
    if (regionCookie === 'in' && pathname === '/') {
      url.pathname = '/in'
      return Response.redirect(url, 307)
    }
    // If cookie matches current path or is set, don't redirect
    return
  }

  // Get country from Vercel geo headers
  const country = request.headers.get('x-vercel-ip-country') || ''

  // Redirect based on geo location (only from homepage)
  if (pathname === '/') {
    if (country === 'AU') {
      url.pathname = '/au'
      return Response.redirect(url, 307)
    }
    if (country === 'IN') {
      url.pathname = '/in'
      return Response.redirect(url, 307)
    }
    // Default: redirect to India version
    url.pathname = '/in'
    return Response.redirect(url, 307)
  }
}
