
import React from 'react';
import Header from '../components/Header';
import HeroBanner from '../components/HeroBanner';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import WorkingHours from '../components/WorkingHours';
import AppointmentForm from '../components/AppointmentForm';
import PopularProducts from '../components/PopularProducts';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroBanner />
        <AboutSection />
        <ServicesSection />
        <WorkingHours />
        <AppointmentForm />
        <PopularProducts />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
