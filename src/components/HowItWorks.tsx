
import React from 'react';
import { 
  CalendarClock, 
  MapPin, 
  Zap, 
  Image, 
  BookOpen, 
  ChevronRight,
  Shuffle
} from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: <CalendarClock className="w-12 h-12 text-primary-purple" />,
      title: "Choose Your Time",
      description: "Select any year in Native American history you wish to explore."
    },
    {
      icon: <MapPin className="w-12 h-12 text-primary-purple" />,
      title: "Select Your Location",
      description: "Specify which tribal land or region you want to visit."
    },
    {
      icon: <Zap className="w-12 h-12 text-primary-purple" />,
      title: "Time Travel Sequence",
      description: "Experience a sacred teleportation ritual to your chosen time and place."
    },
    {
      icon: <BookOpen className="w-12 h-12 text-primary-purple" />,
      title: "Immersive Storytelling",
      description: "Receive detailed, historically accurate narratives about your surroundings."
    },
    {
      icon: <Image className="w-12 h-12 text-primary-purple" />,
      title: "Visual Experience",
      description: "See photorealistic images of your historical environment."
    },
    {
      icon: <Shuffle className="w-12 h-12 text-primary-purple" />,
      title: "Continue Your Journey",
      description: "Choose from suggestions to further explore the time period."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-glow mb-6">
          How It Works
        </h2>
        
        <p className="text-center text-light-gray max-w-3xl mx-auto mb-16">
          Embark on a spiritual journey through time with our Native American History Time Machine. Follow these steps to begin your adventure.
        </p>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-primary-purple/30 -translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-12 relative`}
              >
                {/* Connector dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-primary-purple animate-pulse-glow"></div>
                
                {/* Step icon */}
                <div className={`flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center cyberpunk-card border-2 border-primary-purple z-10 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  {step.icon}
                </div>
                
                {/* Step content */}
                <div className={`md:w-[calc(50%-3rem)] cyberpunk-card p-6 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                  <h3 className="text-xl font-bold text-primary-purple mb-2 flex items-center gap-2">
                    <span className="inline-block w-6 h-6 rounded-full bg-primary-purple/20 text-primary-purple text-sm flex items-center justify-center">
                      {index + 1}
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-light-gray/80">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://chatgpt.com/g/g-67f5b059be608191a9faa94c7d8dfb81-native-american-history-time-machine-of-destiny" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rainbow-button-glow text-white px-8 py-4 rounded-md font-semibold inline-flex items-center gap-2 relative overflow-hidden"
            style={{
              background: "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)",
              backgroundSize: "400% 100%",
              animation: "rainbow-shift 6s linear infinite"
            }}
          >
            <span className="relative z-10 whitespace-normal">Start Your Native American Time Travel Experience Now</span> <ChevronRight size={20} className="flex-shrink-0" />
          </a>
        </div>
      </div>

      <style jsx>{`
        @keyframes rainbow-shift {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        .rainbow-button-glow {
          position: relative;
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }
        .rainbow-button-glow:hover {
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
          transform: translateY(-2px);
        }
        .rainbow-button-glow::before {
          content: '';
          position: absolute;
          inset: 0;
          background: inherit;
          filter: blur(8px);
          opacity: 0.7;
          z-index: -1;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;
