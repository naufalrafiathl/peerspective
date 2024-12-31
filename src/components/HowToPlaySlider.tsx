import React, { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";

const HowToPlaySlider = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    {
      title: "Step 1: Pick Your Mood",
      description:
        "Love, friendship, or life's big questions - choose what speaks to you right now. No pressure! ",
    },
    {
      title: "Step 2: Get Inspired",
      description:
        "Hit the button for a question that might make you laugh, think, or both! ",
    },
    {
      title: "Step 3: Share Your Story",
      description:
        "Open up, get real, and listen. The best convos happen when we're just being ourselves. ",
    },
    {
      title: "Step 4: Go With The Flow",
      description:
        "When it feels right, grab another question. Some of the best talks start with a simple question! ",
    },
  ];

  return (
    <div className="fixed left-0 top-4 md:top-16 z-50 flex">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`bg-[#C8A2D1] text-white p-2.5 rounded-r-lg shadow-lg 
                   flex items-center justify-center
                   hover:bg-[#B48BC0] transition-all duration-300 focus:outline-none
                   focus:ring-2 focus:ring-[#C8A2D1] focus:ring-opacity-50
                   ${isOpen ? "translate-x-[320px]" : "translate-x-0"}`}
      >
        <BookOpen size={20} />
        <span className="pl-2 text-sm whitespace-nowrap">How To Play</span>
      </button>

      {/* Background Overlay (mobile only) */}
      <div
        className={`md:hidden fixed inset-0 bg-[#C8A2D1]/20 backdrop-blur-sm 
                    transition-opacity duration-300
                    ${
                      isOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                    }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Slider Content */}
      <div
        className={`fixed left-0 top-0 h-screen bg-[#C8A2D1] shadow-lg 
                    transition-transform duration-300 ease-in-out transform 
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}
                    w-80`}
      >
        <div className="p-6 h-full overflow-y-auto">
          <h2 className="text-2xl font-light text-black mb-8">How to Play</h2>

          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={index}
                className="bg-white/30 rounded-lg p-3 border border-white/40"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="flex h-6 w-6 shrink-0 items-center justify-center 
                         rounded-full bg-white/50 text-black font-medium text-sm"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-medium text-black text-sm">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-black/80">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-white/10 rounded-lg border border-white/20">
            <p className="text-sm text-black ">
              Remember: This is your space to be real. Whether you're going deep
              or keeping it light, every{" "}
              <span className="text-white font-medium">peerspectives</span>{" "}
              matters! The best conversations happen when we all feel free to be
              ourselves.
            </p>
          </div>

          {/* Close button (mobile only) */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden mt-6 w-full py-2 px-4 rounded-lg
                     bg-white/10 text-white text-sm
                     hover:bg-white/20 transition-colors duration-200
                     border border-white/20"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowToPlaySlider;
