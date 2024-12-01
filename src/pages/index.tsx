import Link from "next/link";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Peerspectives - Fun & Meaningful Group Games</title>
        <meta
          name="description"
          content="Play fun and meaningful games to break the ice, spark deep talks, and connect with friends!"
        />
        <meta
          name="keywords"
          content="truth or dare, deep talk, ice breaking games, group activity, perspectives"
        />
        <meta
          property="og:title"
          content="Peerspectives - Break the Ice & Connect"
        />
        <meta
          property="og:description"
          content="Spark meaningful conversations with friends through engaging games like BISIK and DIALOG."
        />
        <meta
          property="twitter:title"
          content="Peerspectives - Interactive Group Games"
        />
        <meta
          property="twitter:description"
          content="Transform group hangouts with engaging games!"
        />
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

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Bisik Card */}
            <Link href="/bisik">
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-6">
                    <Image
                      className="transform group-hover:scale-105 transition-transform duration-300"
                      alt="bisik logo"
                      src="/bisik.png"
                      fill
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </div>
                  <h2 className="text-2xl font-light italic tracking-wide text-gray-700 mb-3">
                    bisik
                  </h2>
                </div>
              </div>
            </Link>

            {/* Dialog Card */}
            <Link href="/dialog">
              <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-gray-200">
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48 mb-6">
                    <Image
                      className="transform group-hover:scale-105 transition-transform duration-300"
                      alt="dialog logo"
                      src="/deeptalk.png"
                      fill
                      style={{ objectFit: "contain" }}
                      priority
                    />
                  </div>
                  <h2 className="text-2xl font-light italic tracking-wide text-gray-700 mb-3">
                    dialog
                  </h2>
                </div>
              </div>
            </Link>
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
