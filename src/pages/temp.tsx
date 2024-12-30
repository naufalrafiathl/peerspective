import Image from "next/image";
import { useState, useCallback } from "react";
import Link from "next/link";
import Head from "next/head";
import CoinFlip from "@/components/CoinFlip";
 
type CategoryType = "general" | "friendship";



function Bisik() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showHandoverModal, setShowHandoverModal] = useState(false);
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [coinResult, setCoinResult] = useState<boolean | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(
    null
  );

  // Add state for tracking remaining questions
  const [remainingQuestions, setRemainingQuestions] = useState<
    Record<CategoryType, string[]>
  >({
    general: [],
    friendship: [],
  });

  // Initialize or reset questions for a category
  const initializeCategoryQuestions = useCallback((category: CategoryType) => {
    // Fisher-Yates shuffle algorithm
    const shuffleArray = (array: string[]) => {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    };

    setRemainingQuestions((prev) => ({
      ...prev,
      [category]: shuffleArray(questions[category]),
    }));
  }, []);

  // Handle category selection
  const handleCategorySelect = (category: CategoryType) => {
    setSelectedCategory(category);
    if (remainingQuestions[category].length === 0) {
      initializeCategoryQuestions(category);
    }
  };

  const drawQuestion = () => {
    if (!selectedCategory) return;

    let currentRemaining = remainingQuestions[selectedCategory];

    // If we've used all questions, reshuffle
    if (currentRemaining.length === 0) {
      initializeCategoryQuestions(selectedCategory);
      currentRemaining = remainingQuestions[selectedCategory];
    }

    // Take the next question from the shuffled array
    const nextQuestion = currentRemaining[currentRemaining.length - 1];
    const updatedRemaining = currentRemaining.slice(0, -1);

    setRemainingQuestions((prev) => ({
      ...prev,
      [selectedCategory]: updatedRemaining,
    }));

    setCurrentQuestion(nextQuestion);
    setShowQuestionModal(true);
  };

  const handlePointPerson = () => {
    setShowQuestionModal(false);
    setShowHandoverModal(true);
  };

  const startCoinFlip = () => {
    const result = Math.random() < 0.5;
    setCoinResult(result);
    setShowHandoverModal(false);
    setShowCoinModal(true);
    setIsFlipping(true);

    setTimeout(() => {
      setIsFlipping(false);
    }, 2000);
  };

  const handleCoinResult = () => {
    if (coinResult) {
      setShowCoinModal(false);
      setShowResultModal(true);
    } else {
      resetGame();
    }
  };

  const resetGame = () => {
    setCurrentQuestion("");
    setShowQuestionModal(false);
    setShowHandoverModal(false);
    setShowCoinModal(false);
    setShowResultModal(false);
    setCoinResult(null);
    setIsFlipping(false);
  };

  return (
    <>
      <Head>
        <title>BISIK - Secret Question Game | Peerspectives</title>
        <meta
          name="description"
          content="Thrilling secret question game with a twist of mystery. Perfect for fun group interactions!"
        />
        <meta
          name="keywords"
          content="whispering game, secret question, fun with friends, plot twist game, ice-breaking ideas"
        />
        <meta
          property="og:title"
          content="BISIK - Secret Question Game | Peerspectives"
        />
        <meta
          property="og:description"
          content="Play this thrilling secret question game with your friends!"
        />
        <meta
          property="twitter:title"
          content="BISIK - Secret Question Game | Peerspectives"
        />
        <meta
          property="twitter:description"
          content="Play this thrilling secret question game with your friends!"
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
              alt="bisik logo"
              width="200"
              height="200"
              src="/bisik.png"
              priority
            />
            <h1 className="text-3xl font-light tracking-wide text-gray-700">
              BISIK
            </h1>
          </div>

          {/* Category Selection */}
          <div className="max-w-md mx-auto mb-8">
            <div className="grid grid-cols-2 gap-4">
              {(Object.keys(questions) as CategoryType[]).map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
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

          {/* Start Button */}
          {selectedCategory && (
            <div className="max-w-md mx-auto">
              <button
                onClick={drawQuestion}
                className="w-full bg-white text-gray-700 py-4 px-6 rounded-xl text-lg 
                       font-light border border-gray-200 hover:border-gray-300 
                       transform hover:translate-y-[-2px] transition-all duration-300
                       shadow-sm hover:shadow-md"
              >
                Begin the Whispers
              </button>
            </div>
          )}

          {/* Modals */}
          {showQuestionModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl transform transition-all">
                <h3 className="text-xl font-sans text-gray-900 mb-6">
                  A secret whisper lingers in the air...{" "}
                </h3>
                <div className="p-6 bg-gray-50 rounded-xl">
                  <p className="text-gray-600 font-sans mb-3">
                    Choose to the person!
                  </p>
                  <p className="text-xl font-sans text-gray-900">
                    {currentQuestion}
                  </p>
                </div>
                <p className="font-sans mt-3 text-center">
                  Now, press next and hand over the device to that person!
                </p>
                <button
                  onClick={handlePointPerson}
                  className="mt-3 w-full bg-white text-gray-700 py-4 px-6 rounded-xl
                         font-sans border border-gray-200 hover:border-gray-300
                         transform hover:translate-y-[-2px] transition-all duration-300"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {showHandoverModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl text-center">
                <h3 className="text-2xl font-sans text-gray-900 mb-6">
                  Someone has chosen you...
                </h3>
                <div className="p-6 bg-gray-50 rounded-xl mb-6">
                  <p className="text-gray-600 font-sans">
                    A secret question awaits. Will you dare to discover what
                    they think about you?
                  </p>
                </div>
                <button
                  onClick={startCoinFlip}
                  className="w-full bg-white text-gray-700 py-4 px-6 rounded-xl
                         font-sans border border-gray-200 hover:border-gray-300
                         transform hover:translate-y-[-2px] transition-all duration-300"
                >
                  Unravel it
                </button>
              </div>
            </div>
          )}

          {showCoinModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl text-center">
                <div className="mb-6">
                  <CoinFlip isFlipping={isFlipping} coinResult={coinResult} />
                </div>
                <h3 className="text-2xl font-sans text-gray-900 mb-6">
                  {isFlipping
                    ? "Fortune spins, destiny unfolds..."
                    : coinResult === null
                    ? "Ready to flip!"
                    : coinResult
                    ? "The stars align!"
                    : "You will never know.."}
                </h3>
                {!isFlipping && coinResult !== null && (
                  <button
                    onClick={handleCoinResult}
                    className="mt-6 w-full bg-white text-gray-700 py-4 px-6 rounded-xl
                           font-sans border border-gray-200 hover:border-gray-300
                           transform hover:translate-y-[-2px] transition-all duration-300"
                  >
                    {coinResult ? "Show Question" : "Play Again"}
                  </button>
                )}
              </div>
            </div>
          )}

          {showResultModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl">
                <h3 className="text-xl font-sans text-gray-900 mb-6">
                  The stars aligned..
                </h3>
                <div className="p-6 bg-gray-50 rounded-xl">
                  <p className="text-gray-600 font-sans mb-3">
                    The Question Was:
                  </p>
                  <p className="text-xl font-sans text-gray-900">
                    {currentQuestion}
                  </p>
                </div>
                <button
                  onClick={resetGame}
                  className="mt-8 w-full bg-white text-gray-700 py-4 px-6 rounded-xl
                         font-sans border border-gray-200 hover:border-gray-300
                         transform hover:translate-y-[-2px] transition-all duration-300"
                >
                  Play Again
                </button>
              </div>
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

export default Bisik;


const questions: Record<CategoryType, string[]> = {
  general: [
    "Who is the most beautiful person in the circle?",
    "Who are you most attracted to in this group?",
    "Who would you want to go on a date with?",
    "Who would you trust with your secrets?",
    "Who would you want as your best friend?",
    "Who has the most captivating smile?",
    "Who has a mysterious aura about them?",
    "Who would you want to switch lives with for a day?",
    "Who would you call at 3 AM in a crisis?",
    "Who seems to hold the deepest secrets?",
    "Who do you think has the most interesting life story?",
    "Who radiates the most positive energy?",
    "Who would you want as your travel companion?",
    "Who seems like they give the best advice?",
    "Who has the most intriguing personality?",
    "Who would you trust to keep your biggest secret?",
    "Who would you want to be stranded on an island with?",
    "Who has the most enchanting eyes?",
    "Who seems like they have the most exciting future ahead?",
    "Who would you want to share your happiest moments with?",
    "Who has a presence that lights up the room?",
    "Who would you trust with your phone unlocked?",
    "Who seems like they understand you the most?",
    "Who would you want to know all your thoughts?",
    "Who has the most contagious laugh?",
  ],
  friendship: [
    "Who's got the most tea about everyone's relationship histories?",
    "Who here knows about that one wild night you pretend never happened?",
    "Who's most likely to have dated one of our ex but never mentioned it?",
    "Who would be the first to sell everyone's secrets for a good deal?",
    "Who would accidentally leak the group chat screenshots to the worst possible person?",
    "Who's most likely to have a secret dating app profile while in a relationship?",
    "Who here would be the worst at keeping their relationship drama private?",
    "Who probably still remembers that super embarrassing thing you did?",
    "Who do you think has the spiciest screenshots in their hidden folder?",
    "Who's most likely to have a hidden folder of cringy old social media posts of everyone?",
    "Who do you think has changed the most since you first met them?",
    "Who would you trust to keep your darkest secret?",
    "Which friend here do you think secretly judges your life choices?",
    "Who would you pick to help you hide a body? (Hypothetically!)",
    "Which friend here knows your most embarrassing story?",
    "Who here would you trust with your phone unlocked for a whole day?",
    "Which friend's search history would probably shock you the most?",
    "Who here would you nominate as the group's chaos bringer?",
    "Which friend do you think talks about you the most behind your back?",
    "Who would you trust to write your dating app bio?",
    "Which friend here would you NOT want to be roommates with?",
    "Who do you think would be the first to snitch on the group?",
    "Which friend here has the most tea about everyone else?",
    "Who here would most likely have a secret OnlyFans account?",
    "Who would you trust to plan your bachelor/bachelorette party?",
    "Which friend here would you want as your lawyer in court?",
    "Who here has enough dirt on you to absolutely destroy your dating life?",
  ],
};