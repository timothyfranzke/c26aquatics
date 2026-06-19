export interface NavItem {
  label: string;
  href: string;
}

export const primaryNav: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'Swim Lessons', href: '/swim-lessons' },
  { label: 'Coaches', href: '/coaches' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
] as const;

export const footerLinks: readonly NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Team', href: '/team' },
  { label: 'Swim Lessons', href: '/swim-lessons' },
  { label: 'Coaches', href: '/coaches' },
  { label: 'About', href: '/about' },
  { label: 'FAQ', href: '/faq' },
] as const;
