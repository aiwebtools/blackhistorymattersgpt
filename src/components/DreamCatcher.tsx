
import React, { useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface DreamCatcherProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'purple' | 'blue' | 'pink' | 'orange';
  className?: string;
  animate?: boolean;
  position?: string;
}

const DreamCatcher: React.FC<DreamCatcherProps> = ({ 
  size = 'md', 
  color = 'purple', 
  className,
  animate = true,
  position
}) => {
  const dreamCatcherRef = useRef<HTMLDivElement>(null);
  
  // Color mapping for the dream catcher
  const colorMap = {
    purple: {
      outer: 'from-primary-purple to-vivid-purple',
      inner: 'from-vivid-purple to-secondary-purple',
      threads: 'from-vivid-purple to-primary-purple'
    },
    blue: {
      outer: 'from-bright-blue to-primary-purple',
      inner: 'from-bright-blue to-vivid-purple',
      threads: 'from-bright-blue to-primary-purple'
    },
    pink: {
      outer: 'from-[#D946EF] to-primary-purple',
      inner: 'from-[#D946EF] to-vivid-purple',
      threads: 'from-[#D946EF] to-primary-purple'
    },
    orange: {
      outer: 'from-[#F97316] to-primary-purple',
      inner: 'from-[#F97316] to-vivid-purple',
      threads: 'from-[#F97316] to-primary-purple'
    }
  };
  
  // Size mapping
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48'
  };

  // Add interactive hover effect
  useEffect(() => {
    if (!dreamCatcherRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!dreamCatcherRef.current) return;
      
      const rect = dreamCatcherRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate the angle based on mouse position
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < rect.width / 2) {
        const intensity = Math.min(10, 20 * (distance / (rect.width / 2)));
        dreamCatcherRef.current.style.filter = `drop-shadow(0 0 ${intensity}px ${getComputedColor(color)})`;
        dreamCatcherRef.current.style.transform = `scale(${1 + distance / rect.width / 10})`;
      } else {
        dreamCatcherRef.current.style.filter = '';
        dreamCatcherRef.current.style.transform = '';
      }
    };
    
    // Get computed color based on the color prop
    const getComputedColor = (color: string) => {
      switch(color) {
        case 'purple': return '#9b87f5';
        case 'blue': return '#0FA0CE';
        case 'pink': return '#D946EF';
        case 'orange': return '#F97316';
        default: return '#9b87f5';
      }
    };
    
    const dreamCatcher = dreamCatcherRef.current;
    dreamCatcher.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      dreamCatcher.removeEventListener('mousemove', handleMouseMove);
    };
  }, [color]);

  return (
    <div 
      ref={dreamCatcherRef}
      className={cn(
        "dreamcatcher relative",
        sizeMap[size],
        position,
        animate ? "animate-float" : "",
        className
      )}
      style={{ animationDelay: `${Math.random() * 5}s` }}
    >
      {/* Outer circle */}
      <div className={`absolute inset-0 rounded-full border-2 bg-gradient-to-r ${colorMap[color].outer} opacity-30 animate-pulse-glow`}></div>
      
      {/* Inner circle */}
      <div className={`absolute inset-4 rounded-full border bg-gradient-to-r ${colorMap[color].inner} opacity-20`}></div>
      
      {/* Dream catcher threads */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className={`w-3/4 h-3/4 bg-gradient-to-tr ${colorMap[color].threads} opacity-40 rounded-full`} style={{ 
          clipPath: "polygon(50% 0%, 50% 100%, 100% 50%, 50% 0%, 0% 50%, 50% 100%)"
        }}></div>
      </div>
      
      {/* Center dot */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gradient-to-r ${colorMap[color].outer} animate-pulse`}></div>
      
      {/* Hanging feathers */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-3/4">
        <div className={`w-0.5 h-8 bg-gradient-to-b ${colorMap[color].outer} animate-float`} style={{ animationDelay: '0.5s' }}></div>
        <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b ${colorMap[color].inner} animate-float`} style={{ animationDelay: '1s', left: 'calc(50% - 5px)' }}></div>
        <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-6 bg-gradient-to-b ${colorMap[color].threads} animate-float`} style={{ animationDelay: '1.5s', left: 'calc(50% + 5px)' }}></div>
      </div>
    </div>
  );
};

export default DreamCatcher;
