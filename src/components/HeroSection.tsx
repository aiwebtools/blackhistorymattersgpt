
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import AfricanSymbol from './AfricanSymbol';
import VideoSection from './VideoSection';
import AfricanSymbolExplosion from './AfricanSymbolExplosion';

const HeroSection: React.FC = () => {
  const [showExplosion, setShowExplosion] = useState(false);
  
  const handleJourneyButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowExplosion(true);
  };
  
  const handleExplosionComplete = () => {
    // Navigate to the URL after the explosion effect completes
    window.open('https://chatgpt.com/g/g-686a172232648191b2fe8d0224e5d997-black-history-matters-time-machine', '_blank', 'noopener,noreferrer');
    setShowExplosion(false);
  };

  return (
    <section className="relative py-16 md:py-24 mt-16 md:mt-20 overflow-hidden">
      {/* African symbol explosion effect */}
      <AfricanSymbolExplosion isActive={showExplosion} onComplete={handleExplosionComplete} />

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-amber-600/20 to-orange-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-br from-red-600/20 to-yellow-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-gradient-to-br from-green-600/20 to-emerald-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* African heritage symbols */}
      <div className="hidden md:block">
        <AfricanSymbol size="sm" color="gold" type="ankh" className="absolute top-10 left-10 z-10" />
        <AfricanSymbol size="md" color="orange" type="adinkra" className="absolute bottom-10 right-10 z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="rainbow-text-glow bg-gradient-to-r from-amber-600 via-red-600 to-orange-500 bg-clip-text">
                AI-Powered Journey Through Black History
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-light-gray mb-6">
              <span className="text-amber-600 font-semibold">Educational exploration of Black history.</span> Experience an AI-powered educational time machine designed for learning about Black history. Join Dr. Martin Luther King Jr. as your educational guide to explore historical events, figures, and cultural heritage. This tool is designed for educational research and learning purposes only.
            </p>
            
            <div className="mb-6 p-4 bg-gradient-to-r from-amber-600/10 to-orange-500/10 rounded-lg border border-amber-600/20">
              <p className="text-sm text-light-gray/90 font-medium">
                🏆 <span className="text-amber-600 font-bold">Best AI Tools 2024</span> • Powered by AiWebTools.Ai • Advanced AI Technology for Education & Research
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <a 
                href="#" 
                className="rainbow-button-glow text-white px-8 py-4 rounded-md font-semibold flex items-center justify-center gap-2 text-lg"
                onClick={handleJourneyButtonClick}
              >
                Journey Through Time Led By DR Martin Luther King jr <ArrowRight size={20} />
              </a>
              
              <a 
                href="https://www.ai-webtools.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border border-amber-600 text-amber-600 hover:bg-amber-600/10 px-8 py-4 rounded-md font-semibold transition-colors text-lg flex items-center justify-center"
              >
                Discover Liberating Ai Tools
              </a>
            </div>

            {/* Educational disclaimer */}
            <div className="mt-6 p-4 bg-black/30 rounded-lg border border-amber-600/20">
              <p className="text-xs text-light-gray/70 text-center mb-2">
                ⚠️ <span className="font-medium">Educational Use Only:</span> This AI tool is designed for educational and informational purposes. AI may produce inaccurate outputs - please verify information independently.
              </p>
              <p className="text-xs text-light-gray/70 text-center">
                🔒 <span className="font-medium">Private & Secure:</span> All conversations are private and exclusively between you and the AI.
              </p>
            </div>
          </div>
          
          {/* Hero image section on the right side */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0">
            <div className="relative w-full aspect-video cyberpunk-card p-2">
              <img
                src="/lovable-uploads/4e17cfa0-fbe7-4cda-abc2-9d4deab16961.png"
                alt="Black History Matters Time Machine of Truth - AI-powered historical exploration"
                className="w-full h-full object-cover rounded"
                loading="eager"
              />
              
              {/* Decorative elements */}
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-amber-600"></div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-amber-600"></div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto mt-12">
          <div className="cyberpunk-card p-6 flex flex-col items-center animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="text-amber-600 font-bold text-lg mb-2">Educational AI Technology</div>
            <p className="text-light-gray/80">Advanced AI designed to help students and researchers explore Black history through interactive learning experiences</p>
          </div>
          
          <div className="cyberpunk-card p-6 flex flex-col items-center animate-float" style={{ animationDelay: '1s' }}>
            <div className="text-amber-600 font-bold text-lg mb-2">Historical Learning Guide</div>
            <p className="text-light-gray/80">Learn alongside Dr. Martin Luther King Jr. as an educational companion to explore historical events and cultural heritage</p>
          </div>
          
          <div className="cyberpunk-card p-6 flex flex-col items-center animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="text-amber-600 font-bold text-lg mb-2">Interactive Visual Learning</div>
            <p className="text-light-gray/80">Engage with Black history through immersive visual experiences designed to enhance educational understanding</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
