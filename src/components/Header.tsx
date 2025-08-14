
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import AfricanSymbolExplosion from './AfricanSymbolExplosion';

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
          "text-light-gray hover:text-primary-purple transition-colors duration-300 px-4 py-2 text-sm md:text-base whitespace-normal",
          rainbow && "rainbow-button-glow text-white rounded-md font-semibold text-center",
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
        "text-light-gray hover:text-primary-purple transition-colors duration-300 px-4 py-2 text-sm md:text-base whitespace-normal",
        rainbow && "rainbow-button-glow text-white rounded-md font-semibold text-center",
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
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  const handleExplosionClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowExplosion(true);
  };
  
  const handleTimeMachineClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowExplosion(true);
  };
  
  const handleAIToolsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowExplosion(true);
  };
  
  const handleExplosionComplete = () => {
    window.open('https://chatgpt.com/g/g-686a172232648191b2fe8d0224e5d997-black-history-matters-time-machine', '_blank', 'noopener,noreferrer');
    setShowExplosion(false);
  };
  
  const handleTimeMachineComplete = () => {
    window.open('https://time-machine-gpt.lovable.app/?via=aiwebtools', '_blank', 'noopener,noreferrer');
    setShowExplosion(false);
  };
  
  const handleAIToolsComplete = () => {
    window.open('https://www.aiwebtools.ai', '_blank', 'noopener,noreferrer');
    setShowExplosion(false);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-primary-purple/20 py-4 shadow-md">
      {/* African symbol explosion effect */}
      <AfricanSymbolExplosion 
        isActive={showExplosion} 
        onComplete={
          showExplosion && window.location.href.includes('time-machine-gpt') ? handleTimeMachineComplete :
          showExplosion && window.location.href.includes('aiwebtools') ? handleAIToolsComplete :
          handleExplosionComplete
        } 
      />
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-auto flex justify-between items-center">
          <div className="mx-auto md:mx-0 max-w-[300px] md:max-w-none">
            <Logo className="transform scale-90 md:scale-100" />
          </div>
          {isMobile && (
            <button 
              className="text-light-gray absolute right-4 top-4 p-2 focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
        
        <nav className={cn(
          "flex flex-col md:flex-row w-full md:w-auto justify-center gap-2",
          isMobile && !isMenuOpen ? "hidden" : "mt-4 md:mt-0"
        )}>
          <NavLink 
            href="https://chatgpt.com/g/g-686a172232648191b2fe8d0224e5d997-black-history-matters-time-machine"
            className="rainbow-button-glow rounded-md font-semibold text-center max-w-[320px] md:max-w-none"
            onClick={handleExplosionClick}
          >
            Black History Matters AI Time Machine - Led By DR Martin Luther King jr
          </NavLink>
          <NavLink href="#faq" onClick={closeMenu} rainbow>FAQ</NavLink>
          <NavLink href="#disclaimer" onClick={closeMenu} rainbow>Disclaimer</NavLink>
          <NavLink href="https://time-machine-gpt.lovable.app/?via=aiwebtools" onClick={handleTimeMachineClick} rainbow>
            Time Machine AI Suite
          </NavLink>
          <NavLink href="https://www.aiwebtools.ai" onClick={handleAIToolsClick} rainbow>Liberation AI Tools</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
