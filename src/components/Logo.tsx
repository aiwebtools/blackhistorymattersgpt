
import React from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      <div className="relative">
        <div className="rainbow-dreamcatcher-border p-4 bg-black/40 shadow-lg">
          <div className="font-bold tracking-wider text-center">
            <div className="text-lg md:text-2xl rainbow-text mb-1">
              BLACK HISTORY
            </div>
            <div className="text-xl md:text-3xl rainbow-text-glow bg-gradient-to-r from-primary-purple via-vivid-purple to-bright-blue bg-clip-text">
              TIME MACHINE
            </div>
            <div className="text-lg md:text-2xl rainbow-text mt-1">
              OF TRUTH
            </div>
          </div>
        </div>
        <div className="mt-2 text-center text-xs text-light-gray/70">
          Presented by <a href="https://aiwebtools.lovable.app/?via=aiwebtools" className="hover:text-primary-purple transition-colors" target="_blank" rel="noopener noreferrer">AiWebTools.Ai</a>
        </div>
      </div>
    </div>
  );
};

export default Logo;
