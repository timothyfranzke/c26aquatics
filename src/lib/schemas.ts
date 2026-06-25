/**
 * Schema.org JSON-LD builders. Each function returns a plain object that
 * gets stringified into a <script type="application/ld+json"> tag.
 *
 * Pages compose these into the `<slot name="head">` of Base.astro.
 */
import { site } from '@data/site';
import { serviceArea } from '@data/serviceArea';

const SITE_URL = site.url;

function absUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function postalAddress() {
  const { streetAddress, addressLocality, addressRegion, postalCode, addressCountry } = site.address;
  return {
    '@type': 'PostalAddress',
    ...(streetAddress ? { streetAddress } : {}),
    addressLocality,
    addressRegion,
    postalCode,
    addressCountry,
  };
}

function areaServed() {
  return serviceArea.map((city) => ({
    '@type': 'City',
    name: city.name,
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: `${city.state === 'KS' ? 'Kansas' : 'Missouri'}, USA`,
    },
  }));
}

function sameAs(): string[] {
  return Object.values(site.social).filter(Boolean);
}

/** Sitewide SportsOrganization — emitted on home. */
export function sportsOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsOrganization',
    '@id': `${SITE_URL}/#organization`,
    name: site.name,
    url: SITE_URL,
    logo: absUrl('/og-default.png'),
    description: site.description,
    sport: 'Swimming',
    address: postalAddress(),
    ...(site.place.mapsUrl ? { hasMap: site.place.mapsUrl } : {}),
    areaServed: areaServed(),
    sameAs: sameAs(),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: site.contact.email,
      telephone: site.contact.phone,
      areaServed: 'US',
    },
  };
}

/** SportsTeam for /team */
export function sportsTeamSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsTeam',
    name: `${site.name} Competitive Team`,
    url: absUrl('/team'),
    sport: 'Swimming',
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
    areaServed: areaServed(),
  };
}

/** Service for /swim-lessons */
export function lessonsServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Swim Lessons',
    name: `${site.name} Swim Lessons`,
    url: absUrl('/swim-lessons'),
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: areaServed(),
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: 0.5,
    },
  };
}

interface CoachInput {
  slug: string;
  name: string;
  role: string;
  headshot: string;
  credentials: string[];
}

/** ItemList of Person for /coaches */
export function coachesListSchema(coaches: CoachInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: coaches.map((coach, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Person',
        '@id': `${SITE_URL}/coaches#${coach.slug}`,
        name: coach.name,
        jobTitle: coach.role,
        worksFor: { '@id': `${SITE_URL}/#organization` },
        image: absUrl(coach.headshot),
        knowsAbout: coach.credentials,
      },
    })),
  };
}

/** AboutPage for /about */
export function aboutPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About ${site.name}`,
    url: absUrl('/about'),
    about: { '@id': `${SITE_URL}/#organization` },
  };
}

interface FaqInput {
  question: string;
  answerPlainText: string;
}

/** FAQPage scoped to FAQs visible on a given page. Used by FAQAccordion. */
export function faqPageSchema(faqs: FaqInput[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answerPlainText,
      },
    })),
  };
}

/** Serialize a schema object for embedding in a script tag. */
export function jsonLd(schema: object): string {
  return JSON.stringify(schema);
}
