
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, className }) => {
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
    >
      {children}
    </a>
  );
};

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-dark-purple/80 border-b border-primary-purple/20 py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-auto mb-4 md:mb-0">
          <Logo className="scale-75 md:scale-100" />
        </div>
        
        <nav className="flex flex-wrap justify-center gap-2">
          <NavLink 
            href="https://chatgpt.com/g/g-67f5b059be608191a9faa94c7d8dfb81-native-american-history-time-machine-of-destiny"
            className="button-glow text-white rounded-md font-semibold"
          >
            Speak to Geronimo
          </NavLink>
          <NavLink href="#faq">FAQ</NavLink>
          <NavLink href="#disclaimer">Disclaimer</NavLink>
          <NavLink href="https://www.aiwebtools.ai">More AI Tools</NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
