import { useState, useEffect } from 'react';

interface CoinFlipProps {
  isFlipping: boolean;
  coinResult: boolean | null;
}

const CoinFlip = ({ isFlipping, coinResult }: CoinFlipProps) => {
  const [rotations, setRotations] = useState(0);
  
  useEffect(() => {
    if (isFlipping) {
      setRotations(prev => prev + 1440); // 4 full rotations (360 * 4)
    }
  }, [isFlipping]);

  return (
    <div 
      className="relative w-24 h-24 mx-auto perspective-1000"
      style={{
        transform: `rotateY(${rotations}deg) ${coinResult !== null ? `rotateY(${coinResult ? 180 : 0}deg)` : ''}`,
        transition: isFlipping ? 'transform 2s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Heads Side */}
      <div 
        className="absolute inset-0"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-300 to-gray-100 border-4 border-gray-200 shadow-lg flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-2xl text-gray-600">SILENT</span>
          </div>
        </div>
      </div>
      
      {/* Tails Side */}
      <div 
        className="absolute inset-0"
        style={{
          transform: 'rotateY(180deg)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-400 to-gray-200 border-4 border-gray-300 shadow-lg flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-2xl text-gray-700">WHISPER</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinFlip;