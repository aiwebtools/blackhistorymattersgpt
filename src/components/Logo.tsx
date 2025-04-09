
import React from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center w-full", className)}>
      <div className="relative">
        <div className="dreamcatcher-border p-4 bg-dark-purple/40 shadow-lg">
          <div className="font-bold tracking-wider text-center">
            <div className="text-lg md:text-2xl text-primary-purple animate-pulse-glow mb-1">
              NATIVE AMERICAN
            </div>
            <div className="text-xl md:text-3xl text-glow bg-gradient-to-r from-primary-purple via-vivid-purple to-bright-blue bg-clip-text text-transparent">
              HISTORY TIME MACHINE
            </div>
            <div className="text-lg md:text-2xl text-primary-purple animate-pulse-glow mt-1">
              OF DESTINY
            </div>
          </div>
        </div>
        <div className="mt-2 text-center text-xs text-light-gray/70">
          Presented by <a href="https://www.aiwebtools.ai" className="hover:text-primary-purple transition-colors">AiWebTools.Ai</a>
        </div>
      </div>
    </div>
  );
};

export default Logo;
