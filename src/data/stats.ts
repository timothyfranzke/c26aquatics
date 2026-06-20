/**
 * Headline stats shown in the StatsBand on the homepage.
 * Values are placeholders from the rebrand kit — confirm with Robbie before launch.
 */
export interface Stat {
  value: string;
  label: string;
}

export const homeStats: Stat[] = [
  { value: '≤4', label: 'Swimmers per class' },
  { value: '20+', label: 'Years coaching' },
  { value: '365', label: 'Days indoor pool' },
  { value: '100%', label: 'Certified coaches' },
];
