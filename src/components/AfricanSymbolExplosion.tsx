import React, { useState, useEffect } from 'react';
import AfricanSymbol from './AfricanSymbol';

interface AfricanSymbolExplosionProps {
  isActive: boolean;
  onComplete: () => void;
}

const AfricanSymbolExplosion: React.FC<AfricanSymbolExplosionProps> = ({
  isActive,
  onComplete
}) => {
  const [symbols, setSymbols] = useState<Array<{
    id: number;
    x: string;
    y: string;
    scale: string;
    rotation: string;
    color: string;
    type: string;
    size: string;
  }>>([]);

  useEffect(() => {
    if (isActive) {
      // Generate African symbols for explosion effect
      const numberOfSymbols = 40;
      const newSymbols = [];
      const colors = ['gold', 'red', 'green', 'orange', 'purple'];
      const types = ['ankh', 'adinkra', 'mask', 'drum', 'shield'];
      const sizes = ['sm', 'md'];

      for (let i = 0; i < numberOfSymbols; i++) {
        const angle = (i / numberOfSymbols) * 2 * Math.PI;
        const distance = 200 + Math.random() * 400;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;

        newSymbols.push({
          id: i,
          x: `${x}px`,
          y: `${y}px`,
          scale: (0.3 + Math.random() * 0.8).toString(),
          rotation: `${Math.random() * 720}deg`,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: types[Math.floor(Math.random() * types.length)],
          size: sizes[Math.floor(Math.random() * sizes.length)]
        });
      }

      setSymbols(newSymbols);

      // Complete the explosion after animation
      const timer = setTimeout(() => {
        setSymbols([]);
        onComplete();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black/20 animate-fade-in"
        style={{
          animation: 'fade-in 0.3s ease-out forwards'
        }}
      />
      
      {/* African symbols explosion */}
      {symbols.map((symbol) => (
        <div
          key={symbol.id}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-african-symbol-explode"
          style={{
            '--explosion-x': symbol.x,
            '--explosion-y': symbol.y,
            '--explosion-scale': symbol.scale,
            '--explosion-rotation': symbol.rotation,
            filter: 'brightness(1.2) saturate(1.3)',
            zIndex: 55
          } as React.CSSProperties}
        >
          <AfricanSymbol
            size={symbol.size as 'sm' | 'md'}
            color={symbol.color as any}
            type={symbol.type as any}
            className="animate-spin"
          />
        </div>
      ))}
    </div>
  );
};

export default AfricanSymbolExplosion;