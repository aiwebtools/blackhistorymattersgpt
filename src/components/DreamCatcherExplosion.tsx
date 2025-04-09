
import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import DreamCatcher from './DreamCatcher';

interface DreamCatcherExplosionProps {
  isActive: boolean;
  onComplete: () => void;
}

const DreamCatcherExplosion: React.FC<DreamCatcherExplosionProps> = ({
  isActive,
  onComplete
}) => {
  const [dreamCatchers, setDreamCatchers] = useState<Array<{
    id: number;
    size: 'sm' | 'md' | 'lg';
    color: 'purple' | 'blue' | 'pink' | 'orange';
    x: string;
    y: string;
    z: string;
    delay: string;
    scale: string;
    rotation: string;
  }>>([]);

  useEffect(() => {
    if (isActive) {
      // Generate more dream catchers for a more dramatic explosion effect
      const numberOfDreamCatchers = 40; // Increased from 20
      const newDreamCatchers = [];
      
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
      const colors: Array<'purple' | 'blue' | 'pink' | 'orange'> = ['purple', 'blue', 'pink', 'orange'];
      
      for (let i = 0; i < numberOfDreamCatchers; i++) {
        // Create more varied and dynamic positioning with z-axis for 3D effect
        newDreamCatchers.push({
          id: i,
          size: sizes[Math.floor(Math.random() * sizes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          // More extreme x/y values for wider explosion
          x: `${Math.random() * 200 - 100}%`,
          y: `${Math.random() * 200 - 100}%`,
          // Add z movement to create depth
          z: `${Math.random() * 500}px`,
          delay: `${Math.random() * 0.5}s`,
          scale: `${0.5 + Math.random() * 1.5}`, // Larger possible scale
          rotation: `${Math.random() * 720 - 360}deg` // Add rotation for more dynamic movement
        });
      }
      
      setDreamCatchers(newDreamCatchers);
      
      // Increased timeout even more for a longer, more dramatic effect
      const timer = setTimeout(() => {
        onComplete();
      }, 2500); // Increased to 2.5 seconds
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden perspective-1000">
      {/* Dramatic flash of light when explosion starts */}
      <div className={`absolute inset-0 bg-white ${isActive ? 'animate-flash' : ''}`}></div>
      
      {/* Dark overlay that fades in for contrast */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"></div>
      
      {/* Rainbow glow in the center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 blur-xl opacity-70 animate-pulse-rainbow"></div>
      
      {dreamCatchers.map((dc) => (
        <div
          key={dc.id}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-dream-catcher-explode-3d"
          style={{
            '--explosion-x': dc.x,
            '--explosion-y': dc.y,
            '--explosion-z': dc.z,
            '--explosion-delay': dc.delay,
            '--explosion-scale': dc.scale,
            '--explosion-rotation': dc.rotation,
            animationDelay: dc.delay,
          } as React.CSSProperties}
        >
          <DreamCatcher
            size={dc.size}
            color={dc.color}
            className={cn(
              "opacity-0 animate-glow-intense",
              isActive && "animate-fade-in"
            )}
            animate={false} // Disable the default float animation
          />
        </div>
      ))}
    </div>
  );
};

export default DreamCatcherExplosion;
