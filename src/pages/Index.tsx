
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import VideoSection from '@/components/VideoSection';
import HowItWorks from '@/components/HowItWorks';

import FAQ from '@/components/FAQ';
import Disclaimer from '@/components/Disclaimer';
import AfricanSymbol from '@/components/AfricanSymbol';
import RainbowElement from '@/components/RainbowElement';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex-grow relative pt-16 md:pt-20">
        {/* Decorative African Heritage Symbols */}
        <AfricanSymbol 
          size="lg" 
          color="gold" 
          type="ankh"
          className="fixed -top-12 -left-12 opacity-30 z-10" 
        />
        <AfricanSymbol 
          size="md" 
          color="red" 
          type="mask"
          className="fixed top-1/3 -right-12 opacity-20 z-10" 
        />
        <AfricanSymbol 
          size="sm" 
          color="green" 
          type="adinkra"
          className="fixed bottom-1/4 -left-8 opacity-30 z-10" 
        />
        <AfricanSymbol 
          size="lg" 
          color="orange" 
          type="shield"
          className="fixed -bottom-16 -right-16 opacity-25 z-10" 
        />
        <AfricanSymbol 
          size="md" 
          color="purple" 
          type="drum"
          className="fixed top-1/2 left-1/4 opacity-20 z-10" 
        />
        
        {/* Rainbow Elements */}
        <RainbowElement 
          size="lg"
          speed="slow"
          className="fixed -top-24 -left-24 opacity-40 z-5"
        />
        <RainbowElement 
          size="md"
          speed="medium"
          className="fixed top-1/2 -right-16 opacity-30 z-5"
        />
        <RainbowElement 
          size="lg"
          speed="fast"
          className="fixed -bottom-24 left-1/4 opacity-25 z-5"
        />
        
        <HeroSection />
        <VideoSection />
        <HowItWorks />
        <FAQ />
        <Disclaimer />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
