
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
    delay: string;
    scale: string;
  }>>([]);

  useEffect(() => {
    if (isActive) {
      // Generate random dream catchers for the explosion effect
      const numberOfDreamCatchers = 20;
      const newDreamCatchers = [];
      
      const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
      const colors: Array<'purple' | 'blue' | 'pink' | 'orange'> = ['purple', 'blue', 'pink', 'orange'];
      
      for (let i = 0; i < numberOfDreamCatchers; i++) {
        newDreamCatchers.push({
          id: i,
          size: sizes[Math.floor(Math.random() * sizes.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          x: `${Math.random() * 100 - 50}%`,
          y: `${Math.random() * 100 - 50}%`,
          delay: `${Math.random() * 0.5}s`,
          scale: `${0.5 + Math.random() * 0.5}`
        });
      }
      
      setDreamCatchers(newDreamCatchers);
      
      // Increased timeout to give the animation more time to be visible
      const timer = setTimeout(() => {
        onComplete();
      }, 2000); // Increased from 1000ms to 2000ms
      
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden bg-black/30 backdrop-blur-sm">
      {dreamCatchers.map((dc) => (
        <div
          key={dc.id}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-dream-catcher-explode"
          style={{
            '--explosion-x': dc.x,
            '--explosion-y': dc.y,
            '--explosion-delay': dc.delay,
            '--explosion-scale': dc.scale,
            animationDelay: dc.delay,
          } as React.CSSProperties}
        >
          <DreamCatcher
            size={dc.size}
            color={dc.color}
            className={cn(
              "opacity-0",
              isActive && "animate-fade-in"
            )}
          />
        </div>
      ))}
    </div>
  );
};

export default DreamCatcherExplosion;
