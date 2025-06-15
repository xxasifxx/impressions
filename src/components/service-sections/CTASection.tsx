
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  title: string;
  description: string;
  phoneNumber: string;
  backLink: string;
  backLinkText: string;
  theme: string;
  themeText: string;
  additionalInfo?: string;
}

const CTASection = ({ 
  title, 
  description, 
  phoneNumber, 
  backLink, 
  backLinkText, 
  theme, 
  themeText,
  additionalInfo 
}: CTASectionProps) => {
  return (
    <section className={`py-16 ${theme} text-white`}>
      <div className="container mx-auto px-4 text-center">
        <h3 className="text-4xl font-light mb-6" style={{ fontFamily: 'Imperial Script, cursive' }}>
          {title}
        </h3>
        <p className={`text-xl mb-8 ${themeText}`}>
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="outline" className="border-white text-white bg-white/10 hover:bg-white hover:text-stone-800 px-12 py-4 text-lg">
            Call {phoneNumber}
          </Button>
          <Link to={backLink}>
            <Button size="lg" className="bg-white text-stone-800 hover:bg-stone-100 hover:text-stone-900 px-12 py-4 text-lg">
              {backLinkText}
            </Button>
          </Link>
        </div>
        {additionalInfo && (
          <p className={`${themeText} mt-6`}>{additionalInfo}</p>
        )}
      </div>
    </section>
  );
};

export default CTASection;
