
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import VideoSection from '@/components/VideoSection';
import HowItWorks from '@/components/HowItWorks';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Disclaimer from '@/components/Disclaimer';
import DreamCatcher from '@/components/DreamCatcher';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-grow relative">
        {/* Decorative Dream Catchers */}
        <DreamCatcher 
          size="lg" 
          color="purple" 
          className="fixed -top-12 -left-12 opacity-30 z-10" 
          position="top-0 left-0"
        />
        <DreamCatcher 
          size="md" 
          color="blue" 
          className="fixed top-1/3 -right-12 opacity-20 z-10" 
          position="top-1/3 right-0"
        />
        <DreamCatcher 
          size="sm" 
          color="pink" 
          className="fixed bottom-1/4 -left-8 opacity-30 z-10" 
          position="bottom-1/4 left-0"
        />
        <DreamCatcher 
          size="lg" 
          color="orange" 
          className="fixed -bottom-16 -right-16 opacity-25 z-10" 
          position="bottom-0 right-0"
        />
        
        <HeroSection />
        <VideoSection />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Disclaimer />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
