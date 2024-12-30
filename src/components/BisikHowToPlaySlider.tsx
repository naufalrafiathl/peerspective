// components/BisikHowToPlaySlider.tsx
import React, { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";

// components/BisikHowToPlaySlider.tsx

const BisikHowToPlaySlider = () => {
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
          title: "Take Your Turn",
          description: "Get the device when it's your turn. You'll see a face-down card.",
        },
        {
          title: "Read Question",
          description: "Tap to see question. Think about who in the group matches it.",
        },
        {
          title: "Point & Hide",
          description: "Point at that person, then close the card to keep question secret.",
        },
        {
          title: "Their Move",
          description: "The person you pointed at must flip the coin!",
        },
        {
          title: "Final Reveal",
          description: "WHISPER = They see what you picked | SILENT = Mystery remains",
        },
      ];

    return (
      <div className="fixed left-0 top-4 md:top-16 z-50 flex">
        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`bg-[#F4D35E] text-black p-2.5 rounded-r-lg shadow-lg 
                     flex items-center justify-center
                     hover:bg-[#E5C44F] transition-all duration-300 
                     ${isOpen ? "translate-x-[320px]" : "translate-x-0"}`}
        >
          <BookOpen size={20} />
          <span className="pl-2 text-sm font-medium whitespace-nowrap">How To Play</span>
        </button>
  
        {/* Background Overlay (mobile only) */}
        <div
          className={`md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm 
                      transition-opacity duration-300
                      ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsOpen(false)}
        />
  
        {/* Slider Content */}
        <div
          className={`fixed left-0 top-0 h-screen bg-[#F4D35E] shadow-lg 
                      transition-transform duration-300 ease-in-out transform 
                      ${isOpen ? "translate-x-0" : "-translate-x-full"}
                      w-80`}
        >
          <div className="p-6 h-full overflow-y-auto">
            <h2 className="text-2xl font-semibold text-black mb-6">How to Play</h2>
  
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="bg-white/30 rounded-lg p-3 border border-white/40"
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center 
                                   rounded-full bg-white/50 text-black font-medium text-sm">
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
  
            <div className="mt-6 p-3 bg-white/30 rounded-lg border border-white/40">
              <p className="text-sm text-black/80">
                Tip: Choose wisely! Your target may or may not discover your question.
              </p>
            </div>
  
            {/* Close button (mobile only) */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden mt-6 w-full py-2 px-4 rounded-lg
                        bg-white/30 text-black text-sm font-medium
                        hover:bg-white/40 transition-colors duration-200
                        border border-white/40"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default BisikHowToPlaySlider;