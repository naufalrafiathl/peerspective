import { useState, useEffect } from 'react';

interface CoinFlipProps {
  isFlipping: boolean;
  coinResult: boolean | null;
}

const BisikCoinFlip = ({ isFlipping, coinResult }: CoinFlipProps) => {
  const [rotations, setRotations] = useState(0);
  
  useEffect(() => {
    if (isFlipping && coinResult !== null) {
      // Adjusted base rotations
      const baseRotations = 2880; // 8 full rotations (360 * 8)
      const finalRotation = coinResult 
        ? baseRotations + 180  // End at WHISPER side for true (reveal)
        : baseRotations + 360;   // End at SILENT side for false (no reveal)
      
      setRotations(finalRotation);
    } else if (!isFlipping) {
      // When not flipping, set to the correct side immediately
      setRotations(coinResult ? 180 : 0);
    }
  }, [isFlipping, coinResult]);

  return (
    <div 
      className="relative w-24 h-24 mx-auto perspective-1000"
      style={{
        transform: `rotateY(${rotations}deg)`,
        // Adjusted timing function for slower deceleration
        transition: isFlipping ? 'transform 6s cubic-bezier(0.2, 0.4, 0.1, 1)' : 'none',
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Silent Side (Front, 0 degrees) */}
      <div 
        className="absolute inset-0"
        style={{
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F4D35E] to-[#F4D35E]/70 border-4 border-[#F4D35E]/30 shadow-lg flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-lg text-black font-medium">SILENT</span>
          </div>
        </div>
      </div>
      
      {/* Whisper Side (Back, 180 degrees) */}
      <div 
        className="absolute inset-0"
        style={{
          transform: 'rotateY(180deg)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden'
        }}
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#F4D35E]/90 to-[#F4D35E]/60 border-4 border-[#F4D35E]/40 shadow-lg flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-lg text-black font-medium">WHISPER</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BisikCoinFlip;