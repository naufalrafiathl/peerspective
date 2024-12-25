import React, { useState, useEffect } from 'react';

const QuestionCard = ({ question = "", isVisible = false }) => {
  const [isShuffling, setIsShuffling] = useState(false);
  const [displayQuestion, setDisplayQuestion] = useState("");
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    if (isVisible && question) {
      setIsShuffling(true);
      setShowCard(true);
      
      // Simulate shuffling effect
      const duration = 1500; // 1.5 seconds total
      const steps = 8; // Number of random texts to show
      const interval = duration / steps;
      
      let count = 0;
      const shuffleInterval = setInterval(() => {
        if (count < steps - 1) {
          // Generate random text of similar length
          const randomLength = Math.floor(question.length * 0.7);
          const randomText = Array(randomLength).fill('').map(() => 
            'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)]
          ).join('');
          setDisplayQuestion(randomText);
          count++;
        } else {
          clearInterval(shuffleInterval);
          setDisplayQuestion(question);
          setIsShuffling(false);
        }
      }, interval);

      return () => clearInterval(shuffleInterval);
    } else {
      setShowCard(false);
      setDisplayQuestion("");
    }
  }, [question, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="max-w-md mx-auto my-8 perspective-1000">
      <div 
        className={`
          relative w-full aspect-[2.5/3.5] 
          transform transition-all duration-700
          ${showCard ? 'rotate-0 scale-100 opacity-100' : '-rotate-180 scale-50 opacity-0'}
        `}
      >
        {/* Card Container */}
        <div className={`
          absolute inset-0
          bg-white rounded-2xl
          border-2 border-gray-200
          shadow-xl
          transform transition-transform duration-500
          ${isShuffling ? 'hover:rotate-3' : ''}
          flex flex-col
        `}>
          {/* Card Pattern Top */}
          <div className="h-16 m-4 rounded-lg bg-gray-50 flex items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          </div>

          {/* Card Content */}
          <div className="flex-1 px-6 py-4 flex items-center justify-center overflow-hidden">
            <div className="max-h-full overflow-auto">
              <p className={`
                text-xl text-center text-gray-700 font-light
                transition-all duration-300
                ${isShuffling ? 'blur-sm' : 'blur-0'}
                break-words
              `}>
                {displayQuestion}
              </p>
            </div>
          </div>

          {/* Card Pattern Bottom */}
          <div className="h-16 m-4 rounded-lg bg-gray-50 flex items-center justify-center rotate-180">
            <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;