
import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import AfricanSymbolExplosion from './AfricanSymbolExplosion';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
  rainbow?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, children, className, external = false, rainbow = false, onClick }) => {
  return (
    <a 
      href={href}
      className={cn(
        "transition-all duration-300 flex items-center gap-1 text-sm md:text-base whitespace-normal",
        rainbow 
          ? "rainbow-button-glow px-4 py-2 rounded-full font-semibold text-white hover:scale-105" 
          : "text-light-gray hover:text-primary-purple",
        className
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      onClick={onClick}
    >
      {children}
      {external && <ExternalLink size={14} />}
    </a>
  );
};

const Footer: React.FC = () => {
  const [showExplosion, setShowExplosion] = useState(false);
  const [currentAction, setCurrentAction] = useState<'main' | 'timemachine' | 'aitools' | 'nativeamerican'>('main');
  
  const handleExplosionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentAction('main');
    setShowExplosion(true);
  };
  
  const handleTimeMachineClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentAction('timemachine');
    setShowExplosion(true);
  };
  
  const handleAIToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentAction('aitools');
    setShowExplosion(true);
  };
  
  const handleNativeAmericanClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentAction('nativeamerican');
    setShowExplosion(true);
  };
  
  const handleExplosionComplete = () => {
    if (currentAction === 'main') {
      window.open('https://chatgpt.com/g/g-686a172232648191b2fe8d0224e5d997-black-history-matters-time-machine', '_blank', 'noopener,noreferrer');
    } else if (currentAction === 'timemachine') {
      window.open('https://time-machine-gpt.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
    } else if (currentAction === 'aitools') {
      window.open('https://aiwebtools.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
    } else if (currentAction === 'nativeamerican') {
      window.open('https://nativeamerican-timemachine.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
    }
    setShowExplosion(false);
  };
  
  return (
    <footer className="bg-black border-t border-primary-purple/20 py-12 mt-16">
      {/* African symbol explosion effect */}
      <AfricanSymbolExplosion isActive={showExplosion} onComplete={handleExplosionComplete} />
      
      <div className="container mx-auto px-4">
        <div className="w-full flex justify-center mb-6">
          <FooterLink 
            href="https://time-machine-gpt.lovable.app/?via=aiwebtools"
            className="button-glow text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 max-w-[300px] md:max-w-none text-center justify-center"
            external
            rainbow
            onClick={handleTimeMachineClick}
          >
            TIME MACHINE AI SUITE
          </FooterLink>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-primary-purple mb-4">Navigation</h3>
            <ul className="space-y-2">
               <li>
                 <FooterLink 
                   href="https://chatgpt.com/g/g-686a172232648191b2fe8d0224e5d997-black-history-matters-time-machine"
                   external
                   rainbow
                   className="max-w-[300px] md:max-w-none"
                   onClick={handleExplosionClick}
                 >
                   Black History Matters AI Time Machine - Led By DR Martin Luther King jr
                 </FooterLink>
               </li>
              <li>
                <FooterLink href="#disclaimer" rainbow>
                  Disclaimer
                </FooterLink>
              </li>
               <li>
                 <FooterLink 
                   href="https://time-machine-gpt.lovable.app/?via=aiwebtools" 
                   external
                   rainbow
                   onClick={handleTimeMachineClick}
                 >
                   Time Machine AI Suite
                 </FooterLink>
               </li>
               <li>
                 <FooterLink 
                   href="https://nativeamerican-timemachine.lovable.app/?via=aiwebtools" 
                   external
                   rainbow
                   onClick={handleNativeAmericanClick}
                 >
                   Native American AI Time Machine
                 </FooterLink>
               </li>
               <li>
                 <FooterLink 
                    href="https://aiwebtools.lovable.app/?via=aiwebtools" 
                    external
                    rainbow
                    onClick={handleAIToolsClick}
                  >
                    More AI Tools
                 </FooterLink>
               </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-primary-purple mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink 
                  href="https://openai.com/policies/privacy-policy/" 
                  external
                >
                  Privacy Policy
                </FooterLink>
              </li>
              <li>
                <FooterLink 
                  href="https://aiwebtools.lovable.app/disclaimers" 
                  external
                >
                  Terms of Service
                </FooterLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-primary-purple mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink href="tel:+14758008096">
                  (475) 800-8096
                </FooterLink>
              </li>
              <li>
                <FooterLink href="mailto:Contact@ai-webtools.com">
                  Contact@ai-webtools.com
                </FooterLink>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-10 pt-6 border-t border-primary-purple/20 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-light-gray/50 text-sm">
              © {new Date().getFullYear()} Black History Matters Time Machine of Truth. All rights reserved.
            </p>
            <p className="text-light-gray/40 text-xs mt-1">
              Powered by ChatGPT
            </p>
          </div>
          
          <FooterLink
            href="https://aiwebtools.lovable.app/?via=aiwebtools"
            external
            rainbow
            className="mt-4 md:mt-0"
            onClick={handleAIToolsClick}
          >
            More AI Tools
          </FooterLink>
        </div>
        
        {/* Educational disclaimer */}
        <div className="mt-6 pt-4 border-t border-primary-purple/10 text-center">
          <p className="text-light-gray/60 text-xs">
            For informational, educational, and research purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
