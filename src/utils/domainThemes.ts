
export type DomainType = 'hair-salon' | 'makeup-studio' | 'med-spa';

export interface DomainTheme {
  id: DomainType;
  name: string;
  tagline: string;
  fonts: {
    heading: string;
    body: string;
    accent: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    muted: string;
  };
  gradients: {
    hero: string;
    card: string;
    cta: string;
  };
  backgroundImage: string;
  buttonStyles: string;
  cardStyles: string;
}

export const domainThemes: Record<DomainType, DomainTheme> = {
  'hair-salon': {
    id: 'hair-salon',
    name: 'Hair Salon',
    tagline: 'Professional cuts, color & styling since 2010',
    fonts: {
      heading: 'Playfair Display, serif',
      body: 'Inter, system-ui, sans-serif',
      accent: 'Crimson Text, serif'
    },
    colors: {
      primary: '#dc2626', // red-600
      secondary: '#57534e', // stone-600
      accent: '#991b1b', // red-800
      background: '#fafaf9', // stone-50
      text: '#1c1917', // stone-900
      muted: '#78716c' // stone-500
    },
    gradients: {
      hero: 'from-red-50 via-stone-50 to-red-50/30',
      card: 'from-red-50/30 to-stone-50',
      cta: 'from-red-600 to-red-700'
    },
    backgroundImage: `
      linear-gradient(rgba(250,245,245,0.9), rgba(255,251,251,0.85)),
      url("https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=1200&q=20&blur=2") center/cover no-repeat
    `,
    buttonStyles: 'bg-red-600 hover:bg-red-700 text-white',
    cardStyles: 'border-red-100 hover:border-red-200 shadow-red-50'
  },
  'makeup-studio': {
    id: 'makeup-studio',
    name: 'Makeup Studio',
    tagline: 'Prom, events & everyday glam',
    fonts: {
      heading: 'Dancing Script, cursive',
      body: 'Poppins, system-ui, sans-serif',
      accent: 'Great Vibes, cursive'
    },
    colors: {
      primary: '#ec4899', // pink-500
      secondary: '#a855f7', // purple-500
      accent: '#be185d', // pink-700
      background: '#fdf2f8', // pink-50
      text: '#581c87', // purple-900
      muted: '#a78bfa' // purple-400
    },
    gradients: {
      hero: 'from-rose-50 via-pink-50 to-purple-50/40',
      card: 'from-pink-50/40 to-purple-50/30',
      cta: 'from-pink-500 to-purple-600'
    },
    backgroundImage: `
      linear-gradient(rgba(253,242,248,0.9), rgba(250,245,255,0.85)),
      url("https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&q=20&blur=1") center/cover no-repeat
    `,
    buttonStyles: 'bg-pink-500 hover:bg-pink-600 text-white',
    cardStyles: 'border-pink-100 hover:border-pink-200 shadow-pink-50'
  },
  'med-spa': {
    id: 'med-spa',
    name: 'Med Spa',
    tagline: 'Advanced analysis & natural healing',
    fonts: {
      heading: 'Cormorant Garamond, serif',
      body: 'Source Sans Pro, system-ui, sans-serif',
      accent: 'Libre Baskerville, serif'
    },
    colors: {
      primary: '#059669', // emerald-600
      secondary: '#0d9488', // teal-600
      accent: '#065f46', // emerald-800
      background: '#ecfdf5', // emerald-50
      text: '#064e3b', // emerald-900
      muted: '#6b7280' // gray-500
    },
    gradients: {
      hero: 'from-emerald-50 via-green-50 to-teal-50/40',
      card: 'from-emerald-50/40 to-teal-50/30',
      cta: 'from-emerald-600 to-teal-600'
    },
    backgroundImage: `
      linear-gradient(rgba(236,253,245,0.85), rgba(240,253,250,0.85)),
      url("https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=25&blur=1") center/cover no-repeat
    `,
    buttonStyles: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    cardStyles: 'border-emerald-100 hover:border-emerald-200 shadow-emerald-50'
  }
};

export const getDomainTheme = (domain: DomainType): DomainTheme => {
  return domainThemes[domain];
};
