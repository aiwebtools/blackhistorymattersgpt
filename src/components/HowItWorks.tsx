
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
      title: "Choose Your Destination",
      description: "Tell Dr. King what date in Black history and which community or moment in the struggle for freedom you wish to explore."
    },
    {
      icon: <MapPin className="w-12 h-12 text-primary-purple" />,
      title: "Sacred Time Transition",
      description: "Experience the righteous time transition ritual as Dr. King initiates your journey to the past."
    },
    {
      icon: <Zap className="w-12 h-12 text-primary-purple" />,
      title: "Live the History",
      description: "Receive a 5000-word immersive narrative where you don't just learn history—you live it with Dr. King as your guide."
    },
    {
      icon: <BookOpen className="w-12 h-12 text-primary-purple" />,
      title: "Meet Historical Figures",
      description: "Engage in conversations with revolutionaries, elders, healers, inventors, and leaders from that era."
    },
    {
      icon: <Image className="w-12 h-12 text-primary-purple" />,
      title: "4K Photorealistic Images",
      description: "See two stunning 4K photorealistic images of your surroundings after every journey."
    },
    {
      icon: <Shuffle className="w-12 h-12 text-primary-purple" />,
      title: "Explore Further",
      description: "Choose from 10 suggested exploration options to continue your journey through time."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-glow mb-6">
          How It Works
        </h2>
        
        <p className="text-center text-light-gray max-w-3xl mx-auto mb-16">
          Embark on a truth-revealing journey through time with Dr. Martin Luther King Jr., Voice of the Dream. Follow these steps to begin your transformative adventure through Black history.
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
            href="https://chatgpt.com/g/g-686a172232648191b2fe8d0224e5d997-black-history-matters-time-machine" 
            target="_blank" 
            rel="noopener noreferrer"
            className="rainbow-button-glow text-black font-semibold inline-flex items-center gap-2 relative overflow-hidden px-8 py-4 rounded-md"
            style={{
              background: "linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8b00ff)",
              backgroundSize: "400% 100%",
              animation: "rainbow-shift 6s linear infinite"
            }}
          >
            <span className="relative z-10 whitespace-normal">Begin Your Time Travel Journey with Dr. King</span> <ChevronRight size={20} className="flex-shrink-0" />
          </a>
        </div>
      </div>

      <style>{`
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
