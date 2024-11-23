import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-16">
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

        {/* Cards Container */}
        <div className="max-w-lg mx-auto">
          <Link href="/bisik">
            <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="flex flex-col items-center">
                <Image
                  className="transform group-hover:scale-105 transition-transform duration-300"
                  alt="bisik logo"
                  width="200"
                  height="200"
                  src="/bisik.png"
                  priority
                />
                <p className="mt-6 text-2xl font-light italic tracking-wide text-gray-700">
                  bisik
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}