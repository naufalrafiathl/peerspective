import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import QuestionCard from "@/components/QuestionCard";

// Define types for our questions structure
type CategoryType = "love" | "friendship" | "life";

type QuestionsType = {
  [K in CategoryType]: string[];
};

const questions: QuestionsType = {
  love: [
    "Do you believe in love at first sight? Why or why not?",
    "What's the most random thing that ever made you fall for someone?",
    "What's the most toxic thing you've done in love?",
    "What is your ex's version of that break up?",
    "How do you maintain independence in a relationship?",
    "What's your love language and how does it affect your relationships?",
    "You are on a date - What's the one thing that the other person can do, that can throw you off right away?",
    "How has your family influenced your view of love?",
  ],
  friendship: [
    "When did you feel closest to me in our friendship, and what made it special?",
    "If you could relive one memory from our time together, which one would it be and why?",
    "What's the one thing about our friendship that you never want to lose?",
    "What was your first impression of me, and did it change?",
    "Is there a moment early on when you knew we'd get along?",
    "What's been your favorite moment with us?",
    "What's one thing you want to do together that we haven't done yet?",
    "What's one thing you've learned about me that you didn't expect?",
    "What is something about me that inspires you?",
    "What's something you admire about me that I should know?",
  ],
  life: [
    "If I point a gun to your head, what would be your last words?",
    "What's the hardest truth you've ever had to accept?",
    "What's the most challenging thing you've had to let go of in your life?",
    "What's a simple question you've been trying to answer your whole life - But failed to do so?",
    "What's one question you wish someone would ask you but never has?",
    "If you could see yourself through someone else's eyes, who would you choose and why?",
    "What pain are you carrying that no one knows about?",
    "What dream did you give up on and why?",
    "Why is you, you?",
    "What do you love most about yourself?",
    "If you could teach the entire world just one concept, what would it be?",
    "What are you looking forward to this week?",
    "What is your idea of happiness?",
    "What's a belief you held strongly and later changed?",
    "What does success mean to you?",
    "How do you handle uncertainty in life?",
    "What's a fear you'd like to overcome?",
    "How do you stay true to yourself in difficult situations?",
    "What's a dream you've never told anyone about?",
  ],
};

export default function Dialog() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [isQuestionVisible, setIsQuestionVisible] = useState<boolean>(false);
  const [remainingQuestions, setRemainingQuestions] = useState<{
    [K in CategoryType]?: string[];
  }>({});

  const selectCategory = (category: CategoryType) => {
    setSelectedCategory(category);
    setIsQuestionVisible(false);
    // Initialize or reset the remaining questions for the selected category
    setRemainingQuestions((prev) => ({
      ...prev,
      [category]: [...questions[category]],
    }));
  };

  const generateQuestion = () => {
    if (!selectedCategory) return;

    let categoryQuestions = remainingQuestions[selectedCategory];

    // If we've used all questions, reset the pool
    if (!categoryQuestions || categoryQuestions.length === 0) {
      categoryQuestions = [...questions[selectedCategory]];
      setRemainingQuestions((prev) => ({
        ...prev,
        [selectedCategory]: categoryQuestions,
      }));
    }

    // Get a random question from remaining ones
    const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
    const selectedQuestion = categoryQuestions[randomIndex];

    // Remove the selected question from the remaining pool
    const updatedQuestions = [...categoryQuestions];
    updatedQuestions.splice(randomIndex, 1);
    setRemainingQuestions((prev) => ({
      ...prev,
      [selectedCategory]: updatedQuestions,
    }));

    setCurrentQuestion(selectedQuestion);
    setIsQuestionVisible(true);
  };

  return (
    <>
      <Head>
        <title>DIALOG - Conversation Starter Game | Peerspectives</title>
        <meta
          name="description"
          content="Generate ice-breaking questions for meaningful conversations about Love, Friendship, and more!"
        />
        <meta
          name="keywords"
          content="ice breaking questions, conversation starters, deep talks, love questions, friendship questions, life questions"
        />
        <meta
          property="og:title"
          content="DIALOG - Conversation Starter Game | Peerspectives"
        />
        <meta
          property="og:description"
          content="Start meaningful conversations with friends through engaging questions!"
        />
        <meta
          property="twitter:title"
          content="DIALOG - Conversation Starter Game | Peerspectives"
        />
        <meta
          property="twitter:description"
          content="Start meaningful conversations with friends through engaging questions!"
        />
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-12">
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

          <div className="max-w-md mx-auto mb-8">
            <div className="grid grid-cols-3 gap-4">
              {(Object.keys(questions) as CategoryType[]).map((category) => (
                <button
                  key={category}
                  onClick={() => selectCategory(category)}
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

          {/* {isQuestionVisible && (
            <div className="max-w-md mx-auto my-8 font-sans">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <p className="text-xl text-gray-700 text-center font-light">
                  {currentQuestion}
                </p>
              </div>
            </div>
          )} */}

          <QuestionCard
            question={currentQuestion}
            isVisible={isQuestionVisible}
          />

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
                Question
              </button>
            </div>
          )}
        </div>
        <div className="text-center mt-16 space-y-3">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfvtaDePJi5Tx6xL4oaqwQ7HR21HtEmasxDfD-RipVnqILwaA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white px-4 py-2 rounded-lg text-gray-600 hover:text-gray-800 text-sm font-sans inline-block transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
          >
            Share your feedback
          </a>
        </div>
      </div>
    </>
  );
}
