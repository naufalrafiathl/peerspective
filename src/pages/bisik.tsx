// pages/bisik.tsx
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import BisikCoinFlip from "@/components/BisikCoinFlip";
import BisikHowToPlaySlider from "@/components/BisikHowToPlaySlider";
import Footer from "@/components/Footer";
import BisikCard from "@/components/BisikCard";
import ReactConfetti from "react-confetti";

// Combined questions array
const questions = [
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
  "Who's got the most tea about everyone's relationship histories?",
  "Who here knows about that one wild night you pretend never happened?",
  "Who's most likely to have dated one of our ex but never mentioned it?",
  "Who would be the first to sell everyone's secrets for a good deal?",
  // ... rest of your combined questions
];

function Bisik() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [coinResult, setCoinResult] = useState<boolean | null>(null);
  const [gamePhase, setGamePhase] = useState<
    "initial" | "question" | "coin" | "result"
  >("initial");
  const [remainingQuestions, setRemainingQuestions] = useState<string[]>([]);
  const [showSilentMessage, setShowSilentMessage] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  const initializeQuestions = useCallback(() => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    setRemainingQuestions(shuffledQuestions);
  }, []);

  const drawQuestion = () => {
    if (remainingQuestions.length === 0) {
      initializeQuestions();
      return; // Wait for next render if questions were empty
    }

    // Get the next question
    const nextQuestion = remainingQuestions[remainingQuestions.length - 1];
    const updatedQuestions = remainingQuestions.slice(0, -1);

    // Set question first
    setCurrentQuestion(nextQuestion);

    // Then update other states
    setTimeout(() => {
      setIsCardFlipped(true);
      setGamePhase("question");
    }, 100);

    setRemainingQuestions(updatedQuestions);
  };

  // Add window size listener
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Initial setup
  useEffect(() => {
    if (remainingQuestions.length === 0) {
      initializeQuestions();
    }
  }, [initializeQuestions]);

  console.log("Current Question:", currentQuestion); // Debug log

  const handleCardClose = () => {
    setIsCardFlipped(false);
    setShowCoinModal(true);
    setGamePhase("coin");
  };

  const startCoinFlip = () => {
    const result = Math.random() < 0.5;
    setCoinResult(result);
    setIsFlipping(true);

    setTimeout(() => {
      setIsFlipping(false);
      if (result) {
        setShowConfetti(true);
        setTimeout(() => {
          setShowCoinModal(false);
          setIsCardFlipped(true);
          setGamePhase("result");
          setTimeout(() => setShowConfetti(false), 4000);
        }, 3000);
      } else {
        setShowSilentMessage(true);
        setTimeout(() => {
          setShowSilentMessage(false);
          resetGame();
        }, 3000);
      }
    }, 6000); // Matched to animation duration
  };

  const resetGame = () => {
    setIsCardFlipped(false);
    setShowCoinModal(false);
    setCoinResult(null);
    setGamePhase("initial");
    setCurrentQuestion("");
  };

  const getInstruction = () => {
    switch (gamePhase) {
      case "initial":
        return "Press the button and start pointing";
      case "question":
        return "Point to someone and press close when ready";
      case "result":
        return "The whispers have been revealed!";
      default:
        return "";
    }
  };

  const preFlipMessages = [
    "Okay ... what's your luck today?",
    "Hmm... feeling lucky?",
    "Your secret might not be safe...",
    "To know or not to know...",
    "Let's see what destiny has in store...",
    "The coin knows all...",
    "Ready for the truth?",
    "This could be interesting...",
    "No turning back now...",
    "Oh, this should be fun...",
    "Time to test your stars..."
  ];
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
      </Head>

      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.2}
          colors={["#FFD700", "#FFA500", "#FF69B4", "#87CEEB", "#98FB98"]}
          // For a more dramatic effect:
          tweenDuration={4000}
          initialVelocityY={20}
        />
      )}

      <div className="min-h-screen bg-gray-50 flex flex-col">
        <BisikHowToPlaySlider />
        <main className="flex-grow">
          <div className="max-w-4xl mx-auto px-4 py-12">
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
                BISIK
              </h1>
            </div>

            <div className="max-w-sm mx-auto">
              <BisikCard question={currentQuestion} isFlipped={isCardFlipped} />

              {/* Instruction Box */}
              <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200 text-center">
                <p className="text-gray-700 font-sans">{getInstruction()}</p>
              </div>

              {/* Action Button */}
              {gamePhase !== "coin" && (
                <button
                  onClick={
                    gamePhase === "initial"
                      ? drawQuestion
                      : gamePhase === "question"
                      ? handleCardClose
                      : resetGame
                  }
                  className="mt-4 w-full bg-[#F4D35E] text-gray-700 py-4 px-6 rounded-xl
                         font-light border border-gray-200 hover:border-gray-300
                         transform hover:translate-y-[-2px] transition-all duration-300"
                >
                  {gamePhase === "initial"
                    ? "Next"
                    : gamePhase === "question"
                    ? "Close"
                    : "Play Again"}
                </button>
              )}
            </div>

            {/* Coin Flip Modal */}
            {/* Coin Flip Modal */}
            {showCoinModal && (
              <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-xl text-center">
                  <div className="mb-6">
                    <BisikCoinFlip
                      isFlipping={isFlipping}
                      coinResult={coinResult}
                    />
                  </div>
                  <h3 className="text-2xl font-sans text-gray-900 mb-6">
                    {isFlipping
                      ? "Fortune spins, destiny unfolds..."
                      : coinResult === null
                      ? preFlipMessages[Math.floor(Math.random() * preFlipMessages.length)]
                      : coinResult
                      ? "The stars align! The whispers shall be revealed!"
                      : showSilentMessage
                      ? "The question was... nevermind, you will never know."
                      : "Sealed in silence forever..."}
                  </h3>
                  {!isFlipping && coinResult === null && (
                    <button
                      onClick={startCoinFlip}
                      className="mt-6 w-full bg-[#F4D35E] text-gray-700 py-4 px-6 rounded-xl
                       font-sans border border-gray-200 hover:border-gray-300
                       transform hover:translate-y-[-2px] transition-all duration-300"
                    >
                      Flip Coin
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
        <div className="fixed right-16 top-[10%] w-64 hidden xl:block">
          <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <h3 className="text-lg font-light mb-3 text-gray-800">
              Play Our Other Game!
            </h3>
            <Link
              href="/dialog"
              className="block group hover:bg-[#C8A2D1] rounded-lg p-3 transition-all duration-300"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 relative mr-3">
                  <Image
                    src="/deeptalk.png"
                    alt="Bisik game"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-light group-hover:text-white">
                    DIALOG
                  </h4>
                  <p className="text-xs text-gray-500 group-hover:text-white">
                    Secret question game with a twist
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

export default Bisik;
