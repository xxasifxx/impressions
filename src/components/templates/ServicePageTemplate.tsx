
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AppointmentBookingModal from '@/components/AppointmentBookingModal';

interface ServicePageTemplateProps {
  backLink: string;
  backText: string;
  title: string;
  subtitle: string;
  ctaText: string;
  prefilledService: {
    name: string;
    price: string;
    duration: string;
  };
  theme: 'emerald' | 'blue' | 'purple' | 'amber' | 'rose';
  children: React.ReactNode;
}

const themeConfig = {
  emerald: {
    gradient: 'from-emerald-50 via-white to-teal-50',
    accent: 'emerald',
    highlight: 'bg-emerald-50 border-emerald-100',
    icon: 'text-emerald-600',
    button: 'bg-emerald-600 hover:bg-emerald-700',
    cta: 'bg-emerald-600',
    ctaText: 'text-emerald-100'
  },
  blue: {
    gradient: 'from-blue-50 via-white to-indigo-50',
    accent: 'blue',
    highlight: 'bg-blue-50 border-blue-100',
    icon: 'text-blue-600',
    button: 'bg-blue-600 hover:bg-blue-700',
    cta: 'bg-blue-600',
    ctaText: 'text-blue-100'
  },
  purple: {
    gradient: 'from-purple-50 via-white to-violet-50',
    accent: 'purple',
    highlight: 'bg-purple-50 border-purple-100',
    icon: 'text-purple-600',
    button: 'bg-purple-600 hover:bg-purple-700',
    cta: 'bg-purple-600',
    ctaText: 'text-purple-100'
  },
  amber: {
    gradient: 'from-amber-50 via-white to-yellow-50',
    accent: 'amber',
    highlight: 'bg-amber-50 border-amber-100',
    icon: 'text-amber-600',
    button: 'bg-amber-600 hover:bg-amber-700',
    cta: 'bg-amber-600',
    ctaText: 'text-amber-100'
  },
  rose: {
    gradient: 'from-rose-50 via-white to-pink-50',
    accent: 'rose',
    highlight: 'bg-rose-50 border-rose-100',
    icon: 'text-rose-600',
    button: 'bg-rose-600 hover:bg-rose-700',
    cta: 'bg-rose-600',
    ctaText: 'text-rose-100'
  }
};

const ServicePageTemplate = ({
  backLink,
  backText,
  title,
  subtitle,
  ctaText,
  prefilledService,
  theme,
  children
}: ServicePageTemplateProps) => {
  const themeStyles = themeConfig[theme];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-stone-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link to={backLink} className="flex items-center gap-3 text-stone-600 hover:text-stone-800 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">{backText}</span>
            </Link>
            
            <div className="text-center">
              <div className="text-4xl font-light text-stone-800" style={{ fontFamily: 'Imperial Script, cursive', letterSpacing: '0.05em' }}>
                {title}
              </div>
              <div className="text-xs text-stone-500 tracking-wide">{subtitle}</div>
            </div>
            
            <AppointmentBookingModal
              trigger={
                <Button size="sm" className="bg-red-700 hover:bg-red-800">
                  {ctaText}
                </Button>
              }
              prefilledService={prefilledService}
              sourcePage={`${title.toLowerCase().replace(/\s+/g, '-')}-header`}
            />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className={`py-20 bg-gradient-to-br ${themeStyles.gradient}`}>
        {children}
      </section>
    </div>
  );
};

export default ServicePageTemplate;
