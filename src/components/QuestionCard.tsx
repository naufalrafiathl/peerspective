import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";

type CategoryType = "life" | "love" | "friendship";

const categoryThemes: Record<CategoryType, string> = {
  life: "#5A9CC5",
  love: "#E63946",
  friendship: "#62BE93"
};

// Sample questions for shuffling effect
const sampleQuestions = [
  "What brings you genuine joy?",
  "How do you want to be remembered?",
  "What's your biggest dream?",
  "What inspires you the most?",
  "What makes you unique?",
  "What's your life philosophy?",
  "What drives you forward?",
  "What matters most to you?",
  "What's your greatest passion?",
  "What defines success for you?",
  "What makes life meaningful?",
  "What's your purpose?",
];

interface QuestionCardProps {
  question: string;
  isVisible: boolean;
  category: CategoryType;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question = "", 
  isVisible = false, 
  category = "life" 
}) => {
  const [displayQuestion, setDisplayQuestion] = useState("");
  const [isShuffling, setIsShuffling] = useState(false);
  const [cardPosition, setCardPosition] = useState(0);

  const themeColor = categoryThemes[category];

  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * sampleQuestions.length);
    return sampleQuestions[randomIndex];
  };

  const shuffleCards = useCallback(async () => {
    if (!question) return;
    
    setIsShuffling(true);
    setDisplayQuestion(question);
    
    // Reduced to 6 movements with smaller distance
    for (let i = 0; i < 6; i++) {
      setDisplayQuestion(getRandomQuestion());
      // Reduced movement to just 15 pixels
      setCardPosition(i % 2 === 0 ? 15 : -15);
      await new Promise(resolve => setTimeout(resolve, 100));
      setCardPosition(0);
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setDisplayQuestion(question);
    setIsShuffling(false);
  }, [question]);

  useEffect(() => {
    if (isVisible && question) {
      shuffleCards();
    }
  }, [isVisible, question, shuffleCards]);

  return (
    <div className="max-w-sm mx-auto my-2 mb-10 h-48">
      <div className="relative w-full h-full">
        <div 
          className="absolute inset-0 transition-transform duration-100 ease-in-out"
          style={{ 
            transform: `translateX(${cardPosition}px)`,
          }}
        >
          <div className="w-full h-full">
            <div 
              className={`
                w-full h-full 
                bg-white rounded-lg 
                border border-gray-200 
                shadow-sm 
                flex flex-col 
                overflow-hidden
                ${isShuffling ? 'blur-sm' : ''} 
                transition-all duration-200
              `}
            >
              {/* Card Top */}
              <div 
                className="h-8 flex items-center justify-center px-10 rounded-t-lg"
                style={{ backgroundColor: themeColor + '1A' }}
              >
                <Image
                  className="mx-auto transform hover:scale-105 transition-transform duration-300"
                  alt="logo peerspective"
                  width="24"
                  height="24"
                  src="/logo.png"
                  priority
                />
              </div>

              {/* Card Content */}
              <div className="flex-1 px-6 py-2 flex items-center justify-center overflow-hidden">
                <div className="max-h-full overflow-auto">
                  <p className={`
                    text-md text-center text-gray-700 font-sans break-words
                    transition-opacity duration-200
                  `}>
                    {displayQuestion}
                  </p>
                </div>
              </div>

              {/* Card Bottom */}
              <div 
                className="h-8 flex items-center justify-center rounded-b-lg text-xs text-gray-600"
                style={{ backgroundColor: themeColor + '1A' }}
              >
                Peerspectives
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;