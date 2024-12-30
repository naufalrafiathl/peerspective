// components/BisikCard.tsx
import Image from "next/image";
import React from "react";

interface BisikCardProps {
  question: string;
  isFlipped: boolean;
}

const BisikCard: React.FC<BisikCardProps> = ({ 
    question = "", 
    isFlipped = false,
  }) => {
    return (
      <div className="max-w-sm mx-auto my-2 mb-10 h-48">
        <div 
          className="relative w-full h-full transition-transform duration-700 perspective-1000"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Back of card */}
          <div 
            className="absolute w-full h-full"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
            }}
          >
            <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col">
              <div className="h-8 flex items-center justify-center px-10 rounded-t-lg" style={{ backgroundColor: '#F4D35E1A' }}>
                <Image
                  className="mx-auto transform hover:scale-105 transition-transform duration-300"
                  alt="logo peerspective"
                  width="24"
                  height="24"
                  src="/logo.png"
                  priority
                />
              </div>
              <div className="flex-1 flex items-center justify-center">
                <Image
                  alt="bisik logo"
                  width="48"
                  height="48"
                  src="/bisik.png"
                  priority
                />
              </div>
              <div className="h-8 flex items-center justify-center rounded-b-lg text-xs text-gray-600" style={{ backgroundColor: '#F4D35E1A' }}>
                Peerspectives
              </div>
            </div>
          </div>
  
          {/* Front of card */}
          <div 
            className="absolute w-full h-full"
            style={{ 
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="w-full h-full bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col">
              <div className="h-8 flex items-center justify-center px-10 rounded-t-lg" style={{ backgroundColor: '#F4D35E1A' }}>
                <Image
                  className="mx-auto transform hover:scale-105 transition-transform duration-300"
                  alt="logo peerspective"
                  width="24"
                  height="24"
                  src="/logo.png"
                  priority
                />
              </div>
              <div className="flex-1 flex items-center justify-center px-6">
                <p className="text-md text-center text-gray-700 font-sans break-words">
                  {question}
                </p>
              </div>
              <div className="h-8 flex items-center justify-center rounded-b-lg text-xs text-gray-600" style={{ backgroundColor: '#F4D35E1A' }}>
                Peerspectives
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default BisikCard;