import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

const questions = {
  love: [
    "What's your definition of true love?",
    "How has your idea of love evolved over time?",
    "What's the most meaningful romantic gesture you've experienced?",
    "What role does vulnerability play in love?",
    "How do you maintain independence in a relationship?",
    "What's your love language and how does it affect your relationships?",
    "What's a relationship deal-breaker for you?",
    "How has your family influenced your view of love?",
    "What's the hardest lesson you've learned about love?",
    "How do you balance personal growth with romantic commitment?",
  ],
  friendship: [
    "What qualities do you value most in a friend?",
    "How do you maintain long-term friendships?",
    "What's the most meaningful thing a friend has done for you?",
    "How do you handle conflicts with close friends?",
    "What role does trust play in your friendships?",
    "How do you balance giving and receiving in friendships?",
    "What makes someone a best friend versus a casual friend?",
    "How do your friendships help you grow as a person?",
    "What's the hardest part about making new friends as an adult?",
    "How do you show up for friends during difficult times?",
  ],
  general: [
    "What's a belief you held strongly and later changed?",
    "How do you want to be remembered?",
    "What's the most important lesson life has taught you?",
    "What does success mean to you?",
    "How do you handle uncertainty in life?",
    "What's a fear you'd like to overcome?",
    "What brings you genuine joy?",
    "How do you stay true to yourself in difficult situations?",
    "What's a dream you've never told anyone about?",
    "How do you define purpose in life?",
  ],
};

export default function Dialog() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [isQuestionVisible, setIsQuestionVisible] = useState(false);

  const selectCategory = (category: keyof typeof questions) => {
    setSelectedCategory(category);
    setIsQuestionVisible(false);
  };

  const generateQuestion = () => {
    if (selectedCategory) {
      const categoryQuestions =
        questions[selectedCategory as keyof typeof questions];
      const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
      setCurrentQuestion(categoryQuestions[randomIndex]);
      setIsQuestionVisible(true);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <Link href="/">
          <div className="mb-12 w-16 mx-auto cursor-pointer">
            <Image
              className="transform hover:scale-105 transition-transform duration-300"
              alt="logo peerspective"
              width="64"
              height="64"
              src="/logo.png"
              priority
            />
          </div>
        </Link>

        {/* Title Section */}
        <div className="text-center mb-16">
          <Image
            className="mx-auto mb-6"
            alt="dialog logo"
            width="200"
            height="200"
            src="/deeptalk.png"
            priority
          />
          <h1 className="text-3xl font-light tracking-wide text-gray-700">
            DIALOG
          </h1>
        </div>

        {/* Category Selection */}
        <div className="max-w-md mx-auto mb-8">
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(questions).map((category) => (
              <button
                key={category}
                onClick={() =>
                  selectCategory(category as keyof typeof questions)
                }
                className={`py-3 px-4 rounded-xl text-lg font-light
                          transition-all duration-300 
                          ${
                            selectedCategory === category
                              ? "bg-gray-700 text-white"
                              : "bg-white text-gray-700 hover:bg-gray-100"
                          }
                          border border-gray-200
                          focus:outline-none focus:ring-2 focus:ring-gray-200`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Question Display */}
        {isQuestionVisible && (
          <div className="max-w-md mx-auto my-8 font-sans">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <p className="text-xl text-gray-700 text-center font-light">
                {currentQuestion}
              </p>
            </div>
          </div>
        )}

        {/* Generate Button */}
        {selectedCategory && (
          <div className="max-w-md mx-auto font-sans">
            <button
              onClick={generateQuestion}
              className="w-full bg-white text-gray-700 py-4 px-6 rounded-xl text-lg 
                       font-light
                       border border-gray-200 hover:border-gray-300 
                       transform hover:translate-y-[-2px] transition-all duration-300
                       shadow-sm hover:shadow-md"
            >
              Generate Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
