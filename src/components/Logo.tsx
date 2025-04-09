
import React from 'react';
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative">
        <div className="dreamcatcher-border p-3">
          <div className="text-xl md:text-3xl font-bold text-glow">
            NATIVE AMERICAN
          </div>
          <div className="text-2xl md:text-4xl font-bold text-glow tracking-wider">
            HISTORY TIME MACHINE
          </div>
          <div className="text-xl md:text-3xl font-bold text-glow">
            OF DESTINY
          </div>
        </div>
        <div className="mt-2 text-xs text-light-gray/70">
          Presented by <a href="https://www.aiwebtools.ai" className="hover:text-primary-purple transition-colors">AiWebTools.Ai</a>
        </div>
      </div>
    </div>
  );
};

export default Logo;
