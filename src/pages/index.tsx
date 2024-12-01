import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import GameCard from "@/components/GameCard";

export default function Home() {
  const games = [
    {
      href: "/bisik",
      imageSrc: "/bisik.png",
      title: "bisik",
      description: "Thrilling secret question game with a twist of mystery.",
      howToPlay: [
        "Take turns with the device, see the secret question, and point to someone.",
        "Hide the question and flip the virtual coin.",
        "The coin decides if the question is revealed or stays a mystery."
      ]
    },
    {
      href: "/dialog",
      imageSrc: "/deeptalk.png",
      title: "dialog",
      description: "Generate meaningful conversation starters for your group.",
      howToPlay: [
        "Pick a category (Love, Friendship, etc.).",
        "Everyone answers honestly or playfully.",
        "Spark meaningful conversations together."
      ]
    }
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
        <div className="max-w-6xl mx-auto px-4 py-16">
          {/* Logo Section */}
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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-700 mb-4">
              Peerspective
            </h1>
            <p className="text-gray-500 max-w-2xl mx-auto font-sans">
              Where masks fall, stories rise{" "}
            </p>
          </div>

          {/* Cards Container - Replace the existing cards with the new GameCard component */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {games.map((game) => (
              <GameCard key={game.href} {...game} />
            ))}
          </div>

          {/* Footer Section */}
          <div className="text-center mt-16 text-gray-400 font-sans">
            <p className="text-sm">RXLABS. 2024</p>
          </div>
        </div>
      </div>
    </>
  );
}