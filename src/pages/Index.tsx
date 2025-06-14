
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServicePortals from '../components/ServicePortals';
import TransformationShowcase from '../components/TransformationShowcase';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ServicePortals />
        <TransformationShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
