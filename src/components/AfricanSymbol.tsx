import React, { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AfricanSymbolProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'gold' | 'red' | 'green' | 'orange' | 'purple' | 'blue';
  className?: string;
  position?: string;
  type?: 'ankh' | 'adinkra' | 'mask' | 'drum' | 'shield';
}

const AfricanSymbol: React.FC<AfricanSymbolProps> = ({ 
  size = 'md', 
  color = 'gold',
  className,
  type = 'ankh'
}) => {
  const symbolRef = useRef<HTMLDivElement>(null);
  
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24', 
    lg: 'w-32 h-32'
  };

  const getColorStyle = (color: string) => {
    const colors = {
      gold: '#FFD700',
      red: '#DC143C',
      green: '#228B22',
      orange: '#FF8C00',
      purple: '#8A2BE2',
      blue: '#4169E1'
    };
    return colors[color as keyof typeof colors] || colors.gold;
  };

  // Enhanced hover effects for African symbols
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!symbolRef.current) return;
      
      const rect = symbolRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
      );
      
      if (distance < 100) {
        const intensity = Math.max(0, 20 - distance / 5);
        symbolRef.current.style.filter = `drop-shadow(0 0 ${intensity}px ${getColorStyle(color)})`;
        symbolRef.current.style.transform = `scale(${1 + distance / rect.width / 10})`;
      } else {
        symbolRef.current.style.filter = '';
        symbolRef.current.style.transform = '';
      }
    };

    const symbol = symbolRef.current;
    if (symbol) {
      symbol.addEventListener('mousemove', handleMouseMove);
      return () => symbol.removeEventListener('mousemove', handleMouseMove);
    }
  }, [color]);

  const renderSymbol = () => {
    const symbolColor = getColorStyle(color);
    
    switch (type) {
      case 'ankh':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`ankh-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={symbolColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={symbolColor} stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M50 20 C40 20 35 25 35 35 C35 45 40 50 50 50 C60 50 65 45 65 35 C65 25 60 20 50 20 Z M45 50 L45 85 L55 85 L55 50 M35 65 L65 65"
              stroke={symbolColor}
              strokeWidth="3"
              fill={`url(#ankh-gradient-${color})`}
              className="animate-pulse"
            />
          </svg>
        );
        
      case 'adinkra':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`adinkra-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={symbolColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={symbolColor} stopOpacity="0.4" />
              </linearGradient>
            </defs>
            {/* Gye Nyame - Adinkra symbol meaning "except for God" */}
            <circle cx="50" cy="50" r="35" stroke={symbolColor} strokeWidth="3" fill="none" />
            <path
              d="M50 25 L50 75 M35 40 L65 40 M40 60 L60 60"
              stroke={symbolColor}
              strokeWidth="2"
              fill="none"
            />
            <circle cx="50" cy="35" r="8" fill={`url(#adinkra-gradient-${color})`} />
          </svg>
        );
        
      case 'mask':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`mask-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={symbolColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={symbolColor} stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <ellipse cx="50" cy="50" rx="25" ry="35" fill={`url(#mask-gradient-${color})`} stroke={symbolColor} strokeWidth="2" />
            <circle cx="42" cy="40" r="3" fill={symbolColor} />
            <circle cx="58" cy="40" r="3" fill={symbolColor} />
            <path d="M45 55 Q50 60 55 55" stroke={symbolColor} strokeWidth="2" fill="none" />
            <path d="M35 30 Q25 25 30 20" stroke={symbolColor} strokeWidth="2" fill="none" />
            <path d="M65 30 Q75 25 70 20" stroke={symbolColor} strokeWidth="2" fill="none" />
          </svg>
        );
        
      case 'drum':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`drum-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={symbolColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={symbolColor} stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <ellipse cx="50" cy="25" rx="20" ry="8" fill={symbolColor} />
            <rect x="30" y="25" width="40" height="40" fill={`url(#drum-gradient-${color})`} stroke={symbolColor} strokeWidth="2" />
            <ellipse cx="50" cy="65" rx="20" ry="8" fill={symbolColor} />
            <path d="M35 30 L35 60 M65 30 L65 60" stroke={symbolColor} strokeWidth="1" />
          </svg>
        );
        
      case 'shield':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <linearGradient id={`shield-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={symbolColor} stopOpacity="0.8" />
                <stop offset="100%" stopColor={symbolColor} stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M50 15 L30 25 L30 55 Q30 75 50 85 Q70 75 70 55 L70 25 Z"
              fill={`url(#shield-gradient-${color})`}
              stroke={symbolColor}
              strokeWidth="2"
            />
            <path d="M40 35 L50 45 L60 30" stroke={symbolColor} strokeWidth="2" fill="none" />
            <circle cx="50" cy="55" r="8" stroke={symbolColor} strokeWidth="2" fill="none" />
          </svg>
        );
        
      default:
        return null;
    }
  };

  return (
    <div
      ref={symbolRef}
      className={cn(
        "african-symbol relative transition-all duration-300",
        sizeClasses[size],
        className
      )}
      style={{
        filter: `drop-shadow(0 0 10px ${getColorStyle(color)}30)`,
      }}
    >
      {renderSymbol()}
    </div>
  );
};

export default AfricanSymbol;