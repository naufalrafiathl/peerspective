import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <>
      {/* Feedback button section */}
      <div className="w-full z-51 bg-white py-4 text-center border-t border-gray-200">
        <p className="text-gray-600 text-sm font-sans px-4 md:px-0">
          We always want to hear from you. Share your thoughts through our{" "}
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSfvtaDePJi5Tx6xL4oaqwQ7HR21HtEmasxDfD-RipVnqILwaA/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-gray-600 underline transition-all duration-200"
          >
            Feedback Form
          </a>
          !
        </p>
      </div>

      {/* Main footer */}
      <div className="w-full bg-[#2A2A2A] font-sans text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row justify-center items-center mb-8 gap-6">
            <Image
              className="transform hover:scale-105 transition-transform duration-300"
              alt="logo peerspective"
              width="64"
              height="64"
              src="/logo-white.png"
              priority
            />
            <p className="max-w-xl text-sm text-center px-2 md:px-0 md:text-left">
              Peerspectives is a one-stop platform to generate conversation
              starters. <br></br> We aim to make fun & meaningful group games accessible
              for everyone.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center md:space-x-8 space-y-4 md:space-y-0 text-sm">
            <a
              href="#"
              className="hover:text-gray-300 transition-colors underline duration-200"
            >
              About Us
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors underline duration-200"
            >
              Contact Us
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors underline duration-200"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors underline duration-200"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
