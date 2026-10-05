
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: (e?: React.MouseEvent) => void;  // Updated to accept an optional event parameter
  rainbow?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, onClick, rainbow = false }) => {
  const isExternal = href.startsWith('http');
  
  if (isExternal) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-light-gray hover:text-primary-purple transition-colors duration-300 px-4 py-3 md:py-2 text-sm md:text-base whitespace-normal touch-manipulation w-full md:w-auto text-center",
          rainbow && "rainbow-button-glow text-white rounded-md font-semibold",
          className
        )}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  
  return (
    <a 
      href={href}
      className={cn(
          "text-light-gray hover:text-primary-purple transition-colors duration-300 px-4 py-3 md:py-2 text-sm md:text-base whitespace-normal touch-manipulation w-full md:w-auto text-center",
          rainbow && "rainbow-button-glow text-white rounded-md font-semibold",
          className
      )}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [explosionTarget, setExplosionTarget] = useState<'insite' | 'chatgpt' | 'gemini' | 'timemachine' | 'aitools'>('insite');
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleInsiteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setExplosionTarget('insite');
    setShowExplosion(true);
  };
  
  const handleChatGPTClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setExplosionTarget('chatgpt');
    setShowExplosion(true);
  };
  
  const handleGeminiClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setExplosionTarget('gemini');
    setShowExplosion(true);
  };
  
  const handleTimeMachineClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setExplosionTarget('timemachine');
    setShowExplosion(true);
  };
  
  const handleAIToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setExplosionTarget('aitools');
    setShowExplosion(true);
  };
  
  const handleInsiteComplete = () => {
    window.location.assign('/journey');
    setShowExplosion(false);
  };
  
  const handleChatGPTComplete = () => {
    window.open('https://chatgpt.com/g/g-686a172232648191b2fe8d0224e5d997-black-history-matters-time-machine', '_blank', 'noopener,noreferrer');
    setShowExplosion(false);
  };
  
  const handleGeminiComplete = () => {
    window.open('https://gemini.google.com/gem/4e45b3038f6c', '_blank', 'noopener,noreferrer');
    setShowExplosion(false);
  };
  
  const handleTimeMachineComplete = () => {
    window.open('https://time-machine-gpt.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
    setShowExplosion(false);
  };
  
  const handleAIToolsComplete = () => {
    window.open('https://aiwebtools.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
    setShowExplosion(false);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-primary-purple/20 py-3 md:py-4 shadow-md">
      {/* African symbol explosion effect */}
      <AfricanSymbolExplosion 
        isActive={showExplosion} 
        onComplete={
          explosionTarget === 'insite' ? handleInsiteComplete :
          explosionTarget === 'chatgpt' ? handleChatGPTComplete :
          explosionTarget === 'gemini' ? handleGeminiComplete :
          explosionTarget === 'timemachine' ? handleTimeMachineComplete :
          handleAIToolsComplete
        } 
      />
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-auto flex justify-between items-center">
          <div className="mx-auto md:mx-0 max-w-[250px] sm:max-w-[300px] md:max-w-none">
            <Logo className="transform scale-75 sm:scale-90 md:scale-100" />
          </div>
          {isMobile && (
            <button 
              className="text-light-gray absolute right-4 top-3 p-2 focus:outline-none z-[60] touch-manipulation" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          )}
        </div>
        
        <nav className={cn(
          "flex flex-col md:flex-row w-full md:w-auto justify-center items-center gap-1 md:gap-2",
          isMobile && !isMenuOpen ? "hidden" : "mt-3 md:mt-0"
        )}>
          <NavLink href="/journey" onClick={handleInsiteClick} rainbow>
            Black History Matters AI Time Machine - Led By DR Martin Luther King jr
          </NavLink>
          <NavLink href="https://chatgpt.com/g/g-686a172232648191b2fe8d0224e5d997-black-history-matters-time-machine" onClick={handleChatGPTClick} rainbow>
            ChatGPT Version
          </NavLink>
          <NavLink href="https://gemini.google.com/gem/4e45b3038f6c" onClick={handleGeminiClick} rainbow>
            Gemini Powered Version
          </NavLink>
          <NavLink href="#faq" onClick={closeMenu} rainbow>FAQ</NavLink>
          <NavLink href="#disclaimer" onClick={closeMenu} rainbow>Disclaimer</NavLink>
          <NavLink href="https://time-machine-gpt.lovable.app/?via=aiwebtools" onClick={handleTimeMachineClick} rainbow>
            Time Machine AI Suite
          </NavLink>
          <NavLink href="https://aiwebtools.lovable.app/?via=aiwebtools" onClick={handleAIToolsClick} rainbow>More AI Tools</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
