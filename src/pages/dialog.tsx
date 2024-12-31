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
    "What’s the most unforgivable thing a partner could do to you?",
    "If your ex confessed their love to you, would you take them back?",
    "What’s your biggest regret from a past relationship?",
    "What’s the most random thing that ever made you fall for someone?",
    "What’s the most ridiculous thing you’ve ever done for love?",
    "Have you ever had a crush on someone unexpected? Who was it?",
    "What’s your definition of love, and how has it changed over time?",
    "Have you ever fallen for someone who didn’t feel the same way? How did it affect you?",
    "Do you believe in love at first sight? Why or why not?",
    "If you could ask your crush only one question, what would it be?",
    "Do you believe people have just one soulmate, or can love happen more than once?",
    "What’s your biggest 'what if' when it comes to love?",
    "What’s the biggest sacrifice you’ve made for love?",
    "Have you ever loved someone but felt the timing wasn’t right?",
    "What’s the best advice about love you’ve ever received?",
    "Can you truly love someone without expecting anything in return?",
    "How has your perspective on love evolved with life experience?",
    "Is it better to love or to be loved?",
    "What is your deepest fear about love?",
    "Who is your greatest love, and why did you fall for them?",
    "What’s something you would never have done if not for love?",
    "Do you believe 'love never truly dies'? Is there someone who never left your heart?",
    "What’s your ex’s perspective of 'that' breakup?",
    "What’s the one thing someone could do on a date that would turn you off immediately?",
    "How has your family shaped your views on love?"
  ],
  life: [
    "When was the last time you told someone how you truly felt?",
    "What song breaks your heart every time you hear it?",
    "What’s a secret you hold that would deeply hurt your parents if they knew?",
    "What’s the greatest emotional pain you’ve ever experienced?",
    "Have you ever let go of something you truly wanted?",
    "Do you believe everything happens for a reason?",
    "Is it easier to forgive or to accept?",
    "Are you becoming the person you always wanted to be?",
    "If you could relive one moment in your life, which would it be and why?",
    "What has shaped you into the person you are today?",
    "What is your greatest motivation in life?",
    "If you could see yourself through someone else’s eyes, whose would you choose and why?",
    "What’s your definition of winning in life?",
    "What’s one question you wish someone would ask you but never had?",
    "What’s a simple question you’ve been trying to answer your whole life?",
    "What’s a question you’ve always wanted to ask but never had the chance?",
    "What’s a turning point in your life you didn’t realize at the time?",
    "What’s a hard lesson you’ve learned but are now grateful for?",
    "If you could meet the person you were five years ago, what would you tell them?",
    "What’s a decision you’ve made that completely changed your life?",
    "What’s the hardest truth you’ve had to accept?",
    "If you could undo one thing you’ve done, what would it be?",
    "How do you hope people will remember you when you’re gone?",
    "Is there a feeling you miss from earlier in your life?",
    "What do you feel is missing from your life right now?",
    "What’s a dream you’ve given up on?",
    "What is your biggest regret in life?",
    "What’s the one 'what if' that keeps you wondering?",
    "How are you really doing?",
    "What’s something you’ve always wanted to do but haven’t?",
    "If you could change one decision in your life, what would it be and why?"
  ],
  friendship: [
    "When did you feel closest to me in our friendship, and what made it special?",
    "If you could relive one memory from our time together, which would it be and why?",
    "What’s one thing about our friendship you never want to lose?",
    "What was your first impression of me, and how has it changed?",
    "How do you envision our friendship in the future?",
    "What’s been your favorite moment with us so far?",
    "What’s one thing you’d like us to do together that we haven’t yet?",
    "What’s something you’ve learned about me that surprised you?",
    "What’s something about me that inspires you?",
    "What’s something you admire about me that I might not know?",
    "If this were our last conversation, what would you want to tell me?",
    "What do you hope I’ll always remember about our friendship?",
    "Are there ways I could be a better friend to you?",
    "Is there a wish you’ve always had for me?",
    "What would you do if we both fell for the same person?",
    "What’s the thing you value most in our friendship?",
    "If we never met again, what would you miss most about me?",
    "What about me is the hardest for you to understand?",
    "How do you think we’ve influenced each other?",
    "What’s one thing I’ve done for you that you’ll never forget?",
    "What made you want to be friends with me in the first place?",
    "What’s the best way for us to spend time together?",
    "What’s something you’re curious about me but haven’t asked yet?",
    "What’s one thing about me that surprised you?",
    "Is there anything about me that reminds you of someone?"
  ]
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
                        Peerspectives
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
                <div className="max-w-sm mx-auto mb-8">
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
                  <div className="max-w-sm mx-auto">
                    <button
                      onClick={generateQuestion}
                      style={{
                        backgroundColor: categoryThemes[selectedCategory],
                      }}
                      className="w-full text-white py-4 px-6 rounded-xl text-md 
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
        <div className="fixed right-16 top-[10%] w-80 hidden xl:block">
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
        <h3 className="text-xl font-light mb-4 text-gray-800">
          Play Our Other Game!
        </h3>
        <Link
          href="/bisik"
          className="block group hover:bg-[#F4D35E] rounded-lg p-4 transition-all duration-300"
        >
          <div className="flex items-center">
            <div className="w-16 h-16 relative mr-4">
              <Image
                src="/bisik.png"
                alt="Bisik game"
                fill
                className="object-contain"
              />
            </div>
            <div>
              <h4 className="text-xl font-light group-hover:text-white">
                Bisik
              </h4>
              <p className="text-sm text-gray-500 group-hover:text-white">
                Secret question game with a twist
              </p>
            </div>
          </div>
        </Link>
      </div>

      <div className="xl:hidden px-4 py-8 bg-gray-50">
          <div className="max-w-sm mx-auto">
            <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <h3 className="text-xl font-light mb-4 text-gray-800">
                Play Our Other Game!
              </h3>
              <Link
                href="/bisik"
                className="block group hover:bg-[#F4D35E] rounded-lg p-4 transition-all duration-300"
              >
                <div className="flex items-center">
                  <div className="w-16 h-16 relative mr-4">
                    <Image
                      src="/bisik.png"
                      alt="Bisik game"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-light group-hover:text-white">
                      Bisik
                    </h4>
                    <p className="text-sm text-gray-500 group-hover:text-white whitespace-nowrap">
                      Secret question game with a twist
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
    </div>
        <Footer />
      </div>
    </>
  );
}
