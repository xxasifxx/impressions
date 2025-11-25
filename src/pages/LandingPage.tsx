import React from 'react';
import Hero from '@/components/landing/Hero';
import ServicesGrid from '@/components/landing/ServicesGrid';
import TrustStats from '@/components/landing/TrustStats';
import Testimonials from '@/components/landing/Testimonials';
import FAQ from '@/components/landing/FAQ';
import WhatsAppCTA from '@/components/landing/WhatsAppCTA';
import Footer from '@/components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <ServicesGrid />
      <TrustStats />
      <Testimonials />
      <FAQ />
      <WhatsAppCTA />
      <Footer />
    </div>
  );
};

export default LandingPage;
