
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
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className, onClick }) => {
  const isExternal = href.startsWith('http');
  
  if (isExternal) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "text-light-gray hover:text-primary-purple transition-colors duration-300 px-4 py-2",
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
        "text-light-gray hover:text-primary-purple transition-colors duration-300 px-4 py-2",
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-dark-purple/80 border-b border-primary-purple/20 py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-auto mb-4 md:mb-0 flex justify-between items-center">
          <Logo className="scale-75 md:scale-100" />
          {isMobile && (
            <button 
              className="text-light-gray p-2 focus:outline-none" 
              onClick={toggleMenu}
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
            className="button-glow text-white rounded-md font-semibold"
            onClick={closeMenu}
          >
            Speak to Geronimo and Experience Native American History like Never Before
          </NavLink>
          <NavLink href="#disclaimer" onClick={closeMenu}>Disclaimer</NavLink>
          <NavLink href="https://time-machine-gpt.lovable.app/?via=aiwebtools" onClick={closeMenu}>
            Try Standard Time Machine GPT
          </NavLink>
          <NavLink href="https://www.aiwebtools.ai" onClick={closeMenu}>More AI Tools</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
