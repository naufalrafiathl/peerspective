import Link from "next/link";
import Image from "next/image";
import { FC, useState, MouseEvent } from "react";
import { useRouter } from "next/router";

interface GameCardProps {
  href: string;
  imageSrc: string;
  title: string;
  description: string;
  howToPlay: string[];
}

type ToggleEvent = MouseEvent<HTMLButtonElement>;
type LinkClickEvent = MouseEvent<HTMLAnchorElement>;

const GameCard: FC<GameCardProps> = ({ 
  href, 
  imageSrc, 
  title, 
  description, 
  howToPlay 
}) => {
  const router = useRouter();
  const [isOverlayVisible, setIsOverlayVisible] = useState<boolean>(false);

  const toggleOverlay = (e: ToggleEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOverlayVisible(!isOverlayVisible);
  };

  const handleClick = (e: LinkClickEvent): void => {
    if (!isOverlayVisible) {
      e.preventDefault();
      setIsOverlayVisible(true);
    }
  };

  const handlePlayClick = (e: ToggleEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    router.push(href);
  };

  return (
    <Link 
      href={href} 
      onClick={handleClick}
      className="block group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200 overflow-hidden"
    >
      {/* Main Content */}
      <div className={`flex flex-col items-center transition-transform duration-300 ${isOverlayVisible ? 'translate-y-[-8px]' : ''}`}>
        <div className="relative w-48 h-48 mb-6">
          <Image
            className={`transition-transform duration-300 ${isOverlayVisible ? 'scale-105' : ''}`}
            alt={`${title} logo`}
            src={imageSrc}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <h2 className="text-2xl font-light italic tracking-wide text-gray-700 mb-3">
          {title}
        </h2>
      </div>

      {/* Overlay */}
      <div 
        className={`absolute inset-0 bg-gray-700 bg-opacity-95 p-8 transition-all duration-300
          ${isOverlayVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          {/* Close Button */}
          <button 
            onClick={toggleOverlay}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors duration-200"
            aria-label="Close information"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
          
          {/* Play Button */}
          <button 
            onClick={handlePlayClick}
            className="bg-white text-gray-700 px-4 py-2 rounded-lg font-sans 
                     hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
          >
            Play Now!
          </button>
        </div>

        <div className="text-white h-full flex flex-col">
          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-light mb-3">About</h3>
            <p className="text-gray-200 text-sm leading-relaxed font-sans">{description}</p>
          </div>

          {/* How to Play */}
          <div>
            <h3 className="text-xl font-light mb-3">How to Play</h3>
            <ol className="text-gray-200 text-sm space-y-2">
              {howToPlay.map((step, index) => (
                <li key={index} className="flex items-start font-sans">
                  <span className="mr-2 font-sans">{index + 1}.</span>
                  <span className="flex-1">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;