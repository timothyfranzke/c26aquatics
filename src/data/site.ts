/**
 * Site-wide singletons. Single source of truth for contact info, social links,
 * booking URLs, and the address used in SportsOrganization JSON-LD.
 *
 * Items marked `TODO` need real values before launch.
 */
export const site = {
  name: 'C26 Aquatics',
  shortName: 'C26',
  tagline: 'Become a stronger swimmer.',
  description:
    'C26 Aquatics is a Kansas City–area competitive swim team and learn-to-swim program. Train with certified coaches across the KC metro.',
  url: 'https://c26aquatics.com',

  contact: {
    // TODO: confirm real values before launch
    email: 'info@c26aquatics.com',
    phone: '+1-913-555-0100',
    phoneDisplay: '(913) 555-0100',
  },

  // TODO: confirm physical address for PostalAddress schema
  address: {
    streetAddress: '',
    addressLocality: 'Overland Park',
    addressRegion: 'KS',
    postalCode: '66210',
    addressCountry: 'US',
  },

  // TODO: confirm real social handles
  social: {
    instagram: 'https://www.instagram.com/c26aquatics',
    facebook: 'https://www.facebook.com/c26aquatics',
  },

  /**
   * External booking URLs. CTAs across the site link to these.
   * Update once the booking system / public URLs are confirmed.
   */
  booking: {
    // TODO: real URL for team tryouts / interest form
    team: 'https://example.com/c26-team-tryout',
    // TODO: real URL for lesson scheduling
    lessons: 'https://example.com/c26-lessons',
  },

  // Compliance / governance link
  safeSportUrl: 'https://uscenterforsafesport.org',

  // GA4 — set via env var or hardcode once provisioned
  // TODO: replace with real measurement ID
  ga4MeasurementId: 'G-XXXXXXXXXX',
} as const;

export type Site = typeof site;
