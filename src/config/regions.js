// Region-specific configuration for Glyff
// IN = India (default), AU = Australia

export const REGIONS = {
  in: {
    code: 'in',
    name: 'India',
    badge: "Exclusive to Delhi's Top Colleges",
    phonePlaceholder: '+91 98765 43210',
    universities: [
      'Delhi University (DU)',
      'Delhi Technological University (DTU)',
      'Jawaharlal Nehru University (JNU)',
      'Netaji Subhas University of Technology (NSUT)',
      'Indraprastha University (IP)',
      'Jamia Millia Islamia',
      'Indian Institute of Technology Delhi (IIT-D)',
      'Ambedkar University Delhi',
      'GGSIPU',
      'Ashoka University',
      'Other'
    ],
    typeOptions: [
      'DU student',
      'JNU scholar',
      'DTU engineer',
      'sports enthusiast',
      'music lover',
      'foodie'
    ],
    loveOptions: [
      'late night chai runs',
      'spontaneous adventures',
      'deep conversations',
      'trying new cafes',
      'watching sunsets',
      'road trips',
      'listening to Lana Del Rey'
    ],
    seo: {
      title: "Glyff AI — Dating for Delhi College Students | Tell me your type, I set up the date",
      description: "Dating for Delhi college students. Tell Glyff your type, music taste, and red flags—then we run AI simulations to find your best match and set up a ready-to-go date plan.",
      ogTitle: "Glyff AI — Dating for Delhi College Students",
      canonical: "https://glyff.ai/in"
    }
  },
  au: {
    code: 'au',
    name: 'Australia',
    badge: "Exclusive to Sydney's Top Universities",
    phonePlaceholder: '+61 412 345 678',
    universities: [
      'University of Sydney',
      'University of New South Wales (UNSW)',
      'University of Technology Sydney (UTS)',
      'Macquarie University',
      'Western Sydney University',
      'Australian Catholic University (Sydney)',
      'Notre Dame University (Sydney)',
      'TAFE NSW',
      'Other'
    ],
    typeOptions: [
      'USYD student',
      'UNSW scholar',
      'UTS creative',
      'sports enthusiast',
      'music lover',
      'foodie'
    ],
    loveOptions: [
      'late night coffee runs',
      'spontaneous adventures',
      'deep conversations',
      'trying new cafes',
      'watching sunsets',
      'beach trips',
      'listening to Lana Del Rey'
    ],
    seo: {
      title: "Glyff AI — Dating for Sydney Uni Students | Tell me your type, I set up the date",
      description: "Dating for Sydney university students. Tell Glyff your type, music taste, and red flags—then we run AI simulations to find your best match and set up a ready-to-go date plan.",
      ogTitle: "Glyff AI — Dating for Sydney Uni Students",
      canonical: "https://glyff.ai/au"
    }
  }
}

// Default region
export const DEFAULT_REGION = 'in'

// Get region from path
export function getRegionFromPath(pathname) {
  if (pathname.startsWith('/au')) return 'au'
  if (pathname.startsWith('/in')) return 'in'
  return DEFAULT_REGION
}

// Get region config
export function getRegionConfig(regionCode) {
  return REGIONS[regionCode] || REGIONS[DEFAULT_REGION]
}

// Cookie helpers
export function getRegionFromCookie() {
  const match = document.cookie.match(/glyff_region=(\w+)/)
  return match ? match[1] : null
}

export function setRegionCookie(region) {
  document.cookie = `glyff_region=${region};path=/;max-age=${60 * 60 * 24 * 365}`
}

// Get base path for region
export function getRegionBasePath(regionCode) {
  return `/${regionCode}`
}
