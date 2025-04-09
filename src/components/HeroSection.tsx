
import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import DreamCatcher from './DreamCatcher';
import VideoSection from './VideoSection';
import DreamCatcherExplosion from './DreamCatcherExplosion';

const HeroSection: React.FC = () => {
  const [showExplosion, setShowExplosion] = useState(false);
  
  const handleJourneyButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowExplosion(true);
  };
  
  const handleExplosionComplete = () => {
    // Navigate to the URL after the explosion effect completes
    window.open('https://chatgpt.com/g/g-67f5b059be608191a9faa94c7d8dfb81-native-american-history-time-machine-of-destiny', '_blank', 'noopener,noreferrer');
    setShowExplosion(false);
  };

  return (
    <section className="relative py-16 md:py-24 mt-16 md:mt-20 overflow-hidden">
      {/* Dream catcher explosion effect */}
      <DreamCatcherExplosion isActive={showExplosion} onComplete={handleExplosionComplete} />

      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary-purple/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-vivid-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-bright-blue/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* Dream catchers */}
      <div className="hidden md:block">
        <DreamCatcher size="sm" color="purple" className="absolute top-10 left-10 z-10" />
        <DreamCatcher size="md" color="blue" className="absolute bottom-10 right-10 z-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="rainbow-text-glow bg-gradient-to-r from-primary-purple via-vivid-purple to-bright-blue bg-clip-text">
                Journey Through Native American History
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-light-gray mb-10">
              Experience immersive time travel to any era of Native American history with Geronimo, Chief of Rainbow Apache Destiny as your guide. Discover authentic stories, cultures, and wisdom from the past—or explore possible futures shaped by your choices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 mb-12">
              <a 
                href="#" 
                className="rainbow-button-glow text-white px-8 py-4 rounded-md font-semibold flex items-center justify-center gap-2 text-lg"
                onClick={handleJourneyButtonClick}
              >
                Begin Your Journey Through Native American History <ArrowRight size={20} />
              </a>
              
              <a 
                href="#how-it-works" 
                className="bg-transparent border border-primary-purple text-primary-purple hover:bg-primary-purple/10 px-8 py-4 rounded-md font-semibold transition-colors text-lg flex items-center justify-center"
              >
                Learn How It Works
              </a>
            </div>

            {/* Privacy notice */}
            <p className="text-sm text-light-gray/70 mt-4 italic">
              AiWebTools.ai does not hold any rights to user-generated content. All conversations are private and exclusively between the user and the AI.
            </p>
          </div>
          
          {/* Embedded video section on the right side */}
          <div className="w-full md:w-1/2 mt-10 md:mt-0">
            <div className="relative w-full aspect-video cyberpunk-card p-2">
              <iframe
                src="https://www.youtube.com/embed/jVFTGCeuNSM?autoplay=1&mute=0&vq=hd1080&rel=0"
                className="w-full h-full"
                title="Native American History Time Machine Of Destiny"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              
              {/* Decorative elements */}
              <div className="absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 border-primary-purple"></div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 border-primary-purple"></div>
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl mx-auto mt-12">
          <div className="cyberpunk-card p-6 flex flex-col items-center animate-float" style={{ animationDelay: '0.5s' }}>
            <div className="text-primary-purple font-bold text-lg mb-2">Time Travel</div>
            <p className="text-light-gray/80">Visit any year in Native American history with vivid detail</p>
          </div>
          
          <div className="cyberpunk-card p-6 flex flex-col items-center animate-float" style={{ animationDelay: '1s' }}>
            <div className="text-primary-purple font-bold text-lg mb-2">Sacred Wisdom</div>
            <p className="text-light-gray/80">Experience authentic cultural knowledge and traditions</p>
          </div>
          
          <div className="cyberpunk-card p-6 flex flex-col items-center animate-float" style={{ animationDelay: '1.5s' }}>
            <div className="text-primary-purple font-bold text-lg mb-2">Visual Journey</div>
            <p className="text-light-gray/80">See photorealistic images of your historical surroundings</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
