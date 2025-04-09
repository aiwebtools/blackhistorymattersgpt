
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
  onClick?: () => void;
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
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-primary-purple/20 py-4 shadow-md">
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
            href="https://chatgpt.com/g/g-67f5b059be608191a9faa94c7d8dfb81-native-american-history-time-machine-of-destiny"
            className="rainbow-button-glow rounded-md font-semibold text-center max-w-[320px] md:max-w-none"
            onClick={closeMenu}
          >
            Speak to Geronimo
          </NavLink>
          <NavLink href="#disclaimer" onClick={closeMenu} rainbow>Disclaimer</NavLink>
          <NavLink href="https://time-machine-gpt.lovable.app/?via=aiwebtools" onClick={closeMenu} rainbow>
            Time Machine GPT
          </NavLink>
          <NavLink href="https://www.aiwebtools.ai" onClick={closeMenu} rainbow>More AI Tools</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
