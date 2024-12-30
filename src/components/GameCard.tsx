import Link from "next/link";
import Image from "next/image";
import { FC } from "react";

interface GameCardProps {
  href: string;
  imageSrc: string;
  bgColor: string;
  title: string;
  description: string;
}

const GameCard: FC<GameCardProps> = ({
  href,
  bgColor,
  imageSrc,
  title,
  description
}) => {
  return (
    <Link
      href={href}
      style={{ 
        '--hover-bg': bgColor,
        '--text-color': bgColor 
      } as any}
      className="block group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200 hover:bg-[var(--hover-bg)]"
    >
      <div className="flex flex-col items-center">
        <div className="relative w-48 h-48 mb-6">
          <Image
            className="transform group-hover:scale-105 transition-transform duration-300"
            alt={`${title} logo`}
            src={imageSrc}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        <h2 
          className="text-4xl font-light italic tracking-wide mb-2 transition-colors duration-300 text-[var(--text-color)] group-hover:text-white"
        >
          {title}
        </h2>
        <p 
          className="text-sm text-center font-sans text-gray-500 max-w-xs transition-colors duration-300 group-hover:text-white"
        >
          {description}
        </p>
      </div>
    </Link>
  );
};

export default GameCard;