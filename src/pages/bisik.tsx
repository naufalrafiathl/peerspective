import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import CoinFlip from "@/components/CoinFlip";

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
];

function Bisik() {
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showHandoverModal, setShowHandoverModal] = useState(false);
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [showResultModal, setShowResultModal] = useState(false);
  const [coinResult, setCoinResult] = useState<boolean | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const drawQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setShowQuestionModal(true);
  };

  const handlePointPerson = () => {
    setShowQuestionModal(false);
    setShowHandoverModal(true);
  };

  const startCoinFlip = () => {
    setShowHandoverModal(false);
    setShowCoinModal(true);
    setIsFlipping(true);

    setTimeout(() => {
      const result = Math.random() < 0.5;
      setCoinResult(result);
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

  const CoinIcon = () => (
    <svg
      className="w-16 h-16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );

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

          <div className="max-w-md mx-auto">
            <button
              onClick={drawQuestion}
              className="w-full bg-white text-gray-700 py-4 px-6 rounded-xl text-lg 
                     font-sans font-normal
                     border border-gray-200 hover:border-gray-300 
                     transform hover:translate-y-[-2px] transition-all duration-300
                     focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-50
                     shadow-sm hover:shadow-md"
            >
              Begin the Whispers{" "}
            </button>
          </div>

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
                         font-sans
                         border border-gray-200 hover:border-gray-300
                         transform hover:translate-y-[-2px] transition-all duration-300"
                >
                  Okay.
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
                 font-sans
                 border border-gray-200 hover:border-gray-300
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
                           font-sans
                           border border-gray-200 hover:border-gray-300
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
                         font-sans
                         border border-gray-200 hover:border-gray-300
                         transform hover:translate-y-[-2px] transition-all duration-300"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Bisik;
