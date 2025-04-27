// src/components/Avatar.tsx
import { useEffect, useState } from "react";

interface AvatarProps {
  animal: string;
  position: { x: number; y: number };
  direction?: 'left' | 'right';
  isWalking?: boolean;
}

export default function Avatar({ animal, position, direction = 'right', isWalking = false }: AvatarProps) {
  const [animationFrame, setAnimationFrame] = useState(0);
  
  // Animação de caminhada
  useEffect(() => {
    if (isWalking) {
      const interval = setInterval(() => {
        setAnimationFrame(prev => (prev + 1) % 4);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isWalking]);

  const getAnimalEmoji = () => {
    switch(animal) {
      case 'Águia': return '🦅';
      case 'Urso': return '🐻';
      case 'Tigre': return '🐅';
      case 'Lobo': return '🐺';
      case 'Coelho': return '🐇';
      case 'Raposa': return '🦊';
      case 'Gato': return '🐎';
      case 'Panda': return '🐼';
      default: return '🦊';
    }
  };

  const getAnimalColor = () => {
    switch(animal) {
      case 'Águia': return 'text-yellow-600';
      case 'Urso': return 'text-brown-600';
      case 'Tigre': return 'text-orange-500';
      case 'Lobo': return 'text-gray-600';
      default: return 'text-orange-400';
    }
  };

  return (
    <div 
      className={`absolute text-4xl ${getAnimalColor()} transition-transform duration-100 ${direction === 'left' ? 'scale-x-[-1]' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: `translate(-50%, -50%) ${direction === 'left' ? 'scaleX(-1)' : ''}`,
      }}
    >
      {getAnimalEmoji()}
      {isWalking && (
        <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2">
          {['.', '..', '...', '..'][animationFrame]}
        </div>
      )}
    </div>
  );
}