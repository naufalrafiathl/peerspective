import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import GameCard from "@/components/GameCard";
import Footer from "@/components/Footer";

export default function Home() {
  const games = [
    {
      href: "/bisik",
      bgColor: "#F4D35E",
      imageSrc: "/bisik.png",
      title: "bisik",
      description: "A thrilling secret question game with a twist of mystery!",
      howToPlay: [
        "Take turns with the device, see the secret question, and point to someone.",
        "Hide the question and flip the virtual coin.",
        "The coin decides if the question is revealed or stays a mystery.",
      ],
    },
    {
      href: "/dialog",
      bgColor: "#C8A2D1",
      imageSrc: "/deeptalk.png",
      title: "dialog",
      description: "A Conversation game that brings peerspectives, together.",
      howToPlay: [
        "Pick a category (Love, Friendship, etc.).",
        "Everyone answers honestly or playfully.",
        "Spark meaningful conversations together.",
      ],
    },
  ];

  return (
    <>
      <Head>
        <title>Peerspectives - Fun & Meaningful Group Games</title>
        <meta
          name="description"
          content="Play fun and meaningful games to break the ice, spark deep talks, and connect with friends!"
        />
        {/* Keep your existing meta tags */}
      </Head>
      <div className="min-h-screen bg-gray-50">
        <div className="flex pt-10 align-middle justify-center ">
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

          {/* Title Section */}
          <div className="text-justify pl-4 mb-2">
            <h1 className="text-4xl font-light text-[#000000] mb-0">
              Peerspectives
            </h1>
            <p className="text-[#000000] max-w-2xl font-sans">
              Fun & Meaningful Group Games
            </p>
          </div>
        </div>
        <p className="text-[#000000] text-md px-7 md:px-0 md:text-xl text-center font-sans ">
          Where masks fall, stories rise. Let’s choose your game mode!
        </p>
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Logo Section */}

          {/* Cards Container - Replace the existing cards with the new GameCard component */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {games.map((game) => (
              <GameCard key={game.href} {...game} />
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
