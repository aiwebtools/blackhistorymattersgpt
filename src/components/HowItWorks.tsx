
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
      icon: <CalendarClock className="w-12 h-12 text-amber-600" />,
      title: "Choose Your Destination",
      description: "Tell Dr. King what date in Black history and which community or moment in the struggle for freedom you wish to explore."
    },
    {
      icon: <MapPin className="w-12 h-12 text-amber-600" />,
      title: "Truth Liberation Sequence",
      description: "Experience the righteous liberation of hidden truth as Dr. King breaks the chains of historical deception and initiates your awakening journey."
    },
    {
      icon: <Zap className="w-12 h-12 text-amber-600" />,
      title: "Experience Liberation Through Truth",
      description: "Receive a 5000-word immersive narrative that liberates your mind from lies. You don't just learn history—you experience the truth that sets you free, guided by Dr. King's voice of justice."
    },
    {
      icon: <BookOpen className="w-12 h-12 text-amber-600" />,
      title: "Walk with Freedom Fighters",
      description: "Meet the voices of liberation—engage with revolutionaries, freedom fighters, truth-tellers, and unsung heroes who broke the chains of oppression."
    },
    {
      icon: <Image className="w-12 h-12 text-amber-600" />,
      title: "Witness Truth in 4K Glory",
      description: "See the hidden truth revealed in stunning 4K photorealistic images that show you what they tried to erase from history."
    },
    {
      icon: <Shuffle className="w-12 h-12 text-amber-600" />,
      title: "Continue Your Awakening",
      description: "Choose from 10 powerful paths to deepen your liberation journey and uncover more hidden truths that will transform your understanding."
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-glow mb-6">
          How It Works
        </h2>
        
        <p className="text-center text-light-gray max-w-3xl mx-auto mb-16">
          Embark on a truth-liberating journey that breaks the chains of historical deception. Dr. Martin Luther King Jr., Voice of the Dream, will guide you through the awakening process that reveals the hidden truth and sets your mind free.
        </p>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-0.5 bg-amber-600/30 -translate-x-1/2"></div>
          
          <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 md:gap-12 relative`}
              >
                {/* Connector dot */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-amber-600 animate-pulse-glow"></div>
                
                {/* Step icon */}
                <div className={`flex-shrink-0 w-24 h-24 rounded-full flex items-center justify-center cyberpunk-card border-2 border-amber-600 z-10 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}>
                  {step.icon}
                </div>
                
                {/* Step content */}
                <div className={`md:w-[calc(50%-3rem)] cyberpunk-card p-6 ${index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'}`}>
                  <h3 className="text-xl font-bold text-amber-600 mb-2 flex items-center gap-2">
                    <span className="inline-block w-6 h-6 rounded-full bg-amber-600/20 text-amber-600 text-sm flex items-center justify-center">
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
              background: "linear-gradient(90deg, #FFD700, #DC143C, #FF4500, #32CD32, #8A2BE2, #FF8C00, #228B22)",
              backgroundSize: "400% 100%",
              animation: "rainbow-shift 6s linear infinite"
            }}
          >
            <span className="relative z-10 whitespace-normal">Break Free Through Truth - Journey with Dr. King</span> <ChevronRight size={20} className="flex-shrink-0" />
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
