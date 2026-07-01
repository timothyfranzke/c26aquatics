export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'Our Approach', href: '/our-approach' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Coaches', href: '/coaches' },
  { label: 'FAQ', href: '/faq' },
] as const;

export const footerLinks: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'Our Approach', href: '/our-approach' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Coaches', href: '/coaches' },
  { label: 'FAQ', href: '/faq' },
] as const;
