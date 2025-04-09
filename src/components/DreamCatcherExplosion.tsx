
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
      const numberOfDreamCatchers = 60; // Increased from 40 to 60 for more density
      const newDreamCatchers = [];
      
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
      const colors: Array<'purple' | 'blue' | 'pink' | 'orange'> = ['purple', 'blue', 'pink', 'orange'];
      
      for (let i = 0; i < numberOfDreamCatchers; i++) {
        // Create more varied and dynamic positioning with z-axis for 3D effect
        newDreamCatchers.push({
          id: i,
          size: sizes[Math.floor(Math.random() * sizes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          // Even more extreme x/y values for wider explosion
          x: `${Math.random() * 300 - 150}%`, // Increased range from 200 to 300
          y: `${Math.random() * 300 - 150}%`, // Increased range from 200 to 300
          // Add even deeper z movement
          z: `${Math.random() * 1000}px`, // Increased from 500 to 1000 for more depth
          delay: `${Math.random() * 0.4}s`, // Slightly faster to start
          scale: `${1 + Math.random() * 2}`, // Larger scale for more visibility
          rotation: `${Math.random() * 1080 - 540}deg` // More rotation for dynamic effect (3 full rotations)
        });
      }
      
      setDreamCatchers(newDreamCatchers);
      
      // Increased timeout for a longer effect
      const timer = setTimeout(() => {
        onComplete();
      }, 2800); // Increased from 2500ms to 2800ms
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden perspective-1000">
      {/* Initial bright flash when explosion starts */}
      <div className={`absolute inset-0 bg-white ${isActive ? 'animate-flash' : ''}`}></div>
      
      {/* Dark overlay with more transparency for better visibility of dream catchers */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md animate-fade-in"></div>
      
      {/* Much larger, brighter rainbow glow in the center */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500 blur-2xl opacity-90 animate-pulse-rainbow"></div>
      
      {/* Additional pulsing light source */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-white blur-xl opacity-80 animate-pulse"></div>
      
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
            // Add a filter to make each dream catcher more visible
            filter: 'brightness(1.5) contrast(1.2)',
          } as React.CSSProperties}
        >
          <DreamCatcher
            size={dc.size}
            color={dc.color}
            className={cn(
              "opacity-0 animate-glow-extreme",
              isActive && "animate-fade-in"
            )}
            animate={false} // Disable the default float animation
          />
        </div>
      ))}
      
      {/* Light rays emanating from center */}
      <div className="absolute inset-0 bg-rays opacity-70"></div>
    </div>
  );
};

export default DreamCatcherExplosion;
