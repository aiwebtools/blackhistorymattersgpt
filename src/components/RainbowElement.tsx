
import React, { useState, useEffect, useRef } from 'react';
import { cn } from "@/lib/utils";

interface RainbowElementProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  speed?: 'slow' | 'medium' | 'fast';
  interactive?: boolean;
}

const RainbowElement: React.FC<RainbowElementProps> = ({ 
  className,
  size = 'md',
  speed = 'medium',
  interactive = true
}) => {
  const [rotation, setRotation] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const rainbowRef = useRef<HTMLDivElement>(null);
  
  // Size mapping
  const sizeMap = {
    sm: 'w-24 h-24',
    md: 'w-36 h-36',
    lg: 'w-48 h-48'
  };
  
  // Speed mapping for animation duration in seconds
  const speedMap = {
    slow: 20,
    medium: 12,
    fast: 6
  };

  useEffect(() => {
    let animationFrame: number;
    const rotate = () => {
      setRotation(prev => (prev + 0.05) % 360);
      animationFrame = requestAnimationFrame(rotate);
    };
    
    animationFrame = requestAnimationFrame(rotate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  // Rainbow colors for the prophecy
  const rainbowColors = [
    'rgb(255, 0, 0)',     // Red
    'rgb(255, 127, 0)',   // Orange
    'rgb(255, 255, 0)',   // Yellow
    'rgb(0, 255, 0)',     // Green
    'rgb(0, 0, 255)',     // Blue
    'rgb(75, 0, 130)',    // Indigo
    'rgb(148, 0, 211)'    // Violet
  ];

  // Interactive effect
  useEffect(() => {
    if (!interactive || !rainbowRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!rainbowRef.current) return;
      
      const rect = rainbowRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const dx = x - centerX;
      const dy = y - centerY;
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      setRotation(angle);
    };
    
    const handleMouseEnter = () => {
      setIsHovering(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
    };
    
    const element = rainbowRef.current;
    
    if (interactive) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
    }
    
    return () => {
      if (interactive) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [interactive]);

  return (
    <div 
      ref={rainbowRef}
      className={cn(
        "relative rainbow-element",
        sizeMap[size],
        isHovering ? "scale-110" : "",
        "transition-transform duration-300",
        className
      )}
    >
      {/* Rainbow Circle */}
      <div 
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: isHovering ? "transform 0.2s ease-out" : `transform ${speedMap[speed]}s linear infinite`
        }}
      >
        <div className="absolute inset-0">
          {rainbowColors.map((color, index) => (
            <div 
              key={index}
              className="absolute"
              style={{
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundColor: 'transparent',
                borderWidth: '6px',
                borderStyle: 'solid',
                borderColor: color,
                borderRadius: '50%',
                transform: `scale(${0.5 + (index * 0.08)})`,
                opacity: 0.8 - (index * 0.1),
                zIndex: rainbowColors.length - index,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Center element */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-1/3 h-1/3 bg-white/10 rounded-full backdrop-blur-sm border border-white/30 animate-pulse"></div>
      </div>
      
      {/* Light rays */}
      {rainbowColors.map((color, index) => (
        <div
          key={`ray-${index}`}
          className="absolute top-1/2 left-1/2 w-full h-0.5 opacity-50"
          style={{
            backgroundColor: color,
            transform: `translate(-50%, -50%) rotate(${(index * 25) + rotation}deg)`,
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  );
};

export default RainbowElement;
