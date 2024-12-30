import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import QuestionCard from "@/components/QuestionCard";
import HowToPlaySlider from "@/components/HowToPlaySlider";
import Footer from "@/components/Footer";
import GameCard from "@/components/GameCard";

// Define types for our questions structure
type CategoryType = "love" | "friendship" | "life";

// Theme configuration
const categoryThemes = {
  life: "#5A9CC5",
  love: "#E63946",
  friendship: "#62BE93",
};

type QuestionsType = {
  [K in CategoryType]: string[];
};

const questions: QuestionsType = {
  love: [
    "Do you believe in love at first sight? Why or why not?",
    "What's the most random thing that ever made you fall for someone?",
    "What's the most toxic thing you've done in relationship?",
    "What is your ex's version of that break up?",
    "How do you maintain independence in a relationship?",
    "What's your love language and how does it affect your relationships?",
    "You are on a date - What's the one thing that the other person can do, that can throw you off right away?",
    "How has your family influenced your view of love?",
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
  friendship: [
    "When did you feel closest to me in our friendship, and what made it special?",
    "If you could relive one memory from our time together, which one would it be and why?",
    "What's the one thing about our friendship that you never want to lose?",
    "What was your first impression of me, and did it change?",
    "Is there a moment early on when you knew we'd get along XXX?",
    "What's been your favorite moment with us?",
    "What's one thing you want to do together that we haven't done yet?",
    "What's one thing you've learned about me that you didn't expect?",
    "What is something about me that inspires you?",
    "What's something you admire about me that I should know?",
  ],
};

export default function Dialog() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryType>("life");
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [isQuestionVisible, setIsQuestionVisible] = useState<boolean>(false);
  const [remainingQuestions, setRemainingQuestions] = useState<{
    [K in CategoryType]?: string[];
  }>({});

  useEffect(() => {
    selectCategory("life");
  }, []);

  const selectCategory = (category: CategoryType) => {
    setSelectedCategory(category);
    setIsQuestionVisible(false);

    const newQuestions = [...questions[category]];
    setRemainingQuestions((prev) => ({
      ...prev,
      [category]: newQuestions,
    }));

    const randomIndex = Math.floor(Math.random() * newQuestions.length);
    const selectedQuestion = newQuestions[randomIndex];

    newQuestions.splice(randomIndex, 1);
    setRemainingQuestions((prev) => ({
      ...prev,
      [category]: newQuestions,
    }));

    setCurrentQuestion(selectedQuestion);
    setTimeout(() => setIsQuestionVisible(true), 100);
  };

  const generateQuestion = () => {
    if (!selectedCategory) return;

    let categoryQuestions = remainingQuestions[selectedCategory];

    if (!categoryQuestions || categoryQuestions.length === 0) {
      categoryQuestions = [...questions[selectedCategory]];
      setRemainingQuestions((prev) => ({
        ...prev,
        [selectedCategory]: categoryQuestions,
      }));
    }

    const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
    const selectedQuestion = categoryQuestions[randomIndex];

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

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <HowToPlaySlider />
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 py-12 relative">
            <div className="flex justify-center">
              {/* Main content column */}
              <div className="max-w-4xl w-full">
                <Link href="/">
                  <div className="flex pt-10 align-middle justify-center">
                    <div className="mb-16">
                      <Image
                        className="mx-auto transform hover:scale-105 transition-transform duration-300"
                        alt="logo peerspective"
                        width="64"
                        height="64"
                        src="/logo.png"
                        priority
                      />
                    </div>

                    <div className="text-justify pl-4 mb-2">
                      <h1 className="text-4xl font-light text-[#000000] mb-0">
                        Peerspective
                      </h1>
                      <p className="text-[#000000] max-w-2xl font-sans">
                        Fun & Meaningful Group Games
                      </p>
                    </div>
                  </div>
                </Link>

                
            <div className="text-center mb-16">
              <h1 className="text-3xl font-light tracking-wide text-gray-700">
                DIALOG
              </h1>
            </div>


                {/* Category Selection */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="grid grid-cols-3 gap-4">
                    {(Object.keys(questions) as CategoryType[]).map(
                      (category) => (
                        <button
                          key={category}
                          onClick={() => selectCategory(category)}
                          style={
                            {
                              backgroundColor:
                                selectedCategory === category
                                  ? categoryThemes[category]
                                  : "white",
                              color:
                                selectedCategory === category
                                  ? "white"
                                  : "gray",
                              "--hover-color": `${categoryThemes[category]}1A`,
                            } as React.CSSProperties
                          }
                          className={`
                          py-3 px-4 rounded-xl text-lg font-light
                          transition-all duration-300 
                          border border-gray-200
                          focus:outline-none focus:ring-2 focus:ring-gray-200
                          hover:bg-[var(--hover-color)]
                        `}
                        >
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Question Card */}
                <QuestionCard
                  question={currentQuestion}
                  isVisible={isQuestionVisible}
                  category={selectedCategory}
                />

                {/* Generate Button */}
                {selectedCategory && (
                  <div className="max-w-md mx-auto font-sans">
                    <button
                      onClick={generateQuestion}
                      style={{
                        backgroundColor: categoryThemes[selectedCategory],
                      }}
                      className="w-full text-white py-4 px-6 rounded-xl text-lg 
                           font-light
                           border border-gray-200 hover:border-gray-300 
                           transform hover:translate-y-[-2px] transition-all duration-300
                           shadow-sm hover:shadow-md"
                    >
                      Next Question!
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
        <div className="fixed right-16 top-[10%] w-64 hidden xl:block">
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <h3 className="text-lg font-light mb-3 text-gray-800">
              Play Our Other Game!
            </h3>
            <Link
              href="/bisik"
              className="block group hover:bg-[#F4D35E] rounded-lg p-3 transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 relative mr-3">
                  <Image
                    src="/bisik.png"
                    alt="Bisik game"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-light group-hover:text-white">
                    Bisik
                  </h4>
                  <p className="text-xs text-gray-500 group-hover:text-white">
                    Conversation game on peerspective
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
