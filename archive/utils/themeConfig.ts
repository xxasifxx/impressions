
export type ServiceTheme = 'emerald' | 'blue' | 'purple' | 'amber' | 'rose' | 'indigo' | 'teal';

export const getThemeConfig = (theme: ServiceTheme) => {
  const configs = {
    emerald: {
      gradient: 'from-emerald-50 via-white to-teal-50',
      highlight: 'bg-emerald-50 border-emerald-100',
      icon: 'text-emerald-600',
      button: 'bg-emerald-600 hover:bg-emerald-700',
      cta: 'bg-emerald-600',
      ctaText: 'text-emerald-100',
      accent: 'bg-emerald-600'
    },
    blue: {
      gradient: 'from-blue-50 via-white to-indigo-50',
      highlight: 'bg-blue-50 border-blue-100',
      icon: 'text-blue-600',
      button: 'bg-blue-600 hover:bg-blue-700',
      cta: 'bg-blue-600',
      ctaText: 'text-blue-100',
      accent: 'bg-blue-600'
    },
    purple: {
      gradient: 'from-purple-50 via-white to-violet-50',
      highlight: 'bg-purple-50 border-purple-100',
      icon: 'text-purple-600',
      button: 'bg-purple-600 hover:bg-purple-700',
      cta: 'bg-purple-600',
      ctaText: 'text-purple-100',
      accent: 'bg-purple-600'
    },
    amber: {
      gradient: 'from-amber-50 via-white to-yellow-50',
      highlight: 'bg-amber-50 border-amber-100',
      icon: 'text-amber-600',
      button: 'bg-amber-600 hover:bg-amber-700',
      cta: 'bg-amber-600',
      ctaText: 'text-amber-100',
      accent: 'bg-amber-600'
    },
    rose: {
      gradient: 'from-rose-50 via-white to-pink-50',
      highlight: 'bg-rose-50 border-rose-100',
      icon: 'text-rose-600',
      button: 'bg-rose-600 hover:bg-rose-700',
      cta: 'bg-rose-600',
      ctaText: 'text-rose-100',
      accent: 'bg-rose-600'
    },
    indigo: {
      gradient: 'from-indigo-50 via-white to-blue-50',
      highlight: 'bg-indigo-50 border-indigo-100',
      icon: 'text-indigo-600',
      button: 'bg-indigo-600 hover:bg-indigo-700',
      cta: 'bg-indigo-600',
      ctaText: 'text-indigo-100',
      accent: 'bg-indigo-600'
    },
    teal: {
      gradient: 'from-teal-50 via-white to-cyan-50',
      highlight: 'bg-teal-50 border-teal-100',
      icon: 'text-teal-600',
      button: 'bg-teal-600 hover:bg-teal-700',
      cta: 'bg-teal-600',
      ctaText: 'text-teal-100',
      accent: 'bg-teal-600'
    }
  };

  return configs[theme];
};
