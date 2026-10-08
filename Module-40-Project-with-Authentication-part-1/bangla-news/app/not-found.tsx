"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';


//from gemini
const NotFoundPage = () => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-linear-to-br from-gray-950 via-rose-950/40 to-gray-950 overflow-hidden text-white font-sans px-4">
      {/* Background glow effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-rose-700/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main card container */}
      <div className="relative z-10 max-w-xl w-full mx-auto text-center bg-neutral-900/60 backdrop-blur-xl border border-rose-900/30 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-rose-950/50 transition-all duration-500 hover:border-rose-600/50">
        
        {/* Animated glowing 404 Badge / Illustration */}
        <div className="relative mb-8 flex items-center justify-center">
          <div className="absolute w-32 h-32 bg-rose-600/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="relative text-7xl sm:text-9xl font-black tracking-wider bg-linear-to-r from-rose-500 via-red-500 to-rose-300 bg-clip-text text-transparent select-none drop-shadow-[0_10px_20px_rgba(225,29,72,0.4)]">
            404
          </div>
        </div>

        {/* Heading & Description */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-3">
          Oops! Lost in the shadows.
        </h1>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {/* Go Home Button */}
          <button
            onClick={() => router.push('/')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-linear-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-medium shadow-lg shadow-red-600/30 hover:shadow-red-600/50 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 group cursor-pointer"
          >
            <svg 
              className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round"  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Back to Home</span>
          </button>

          {/* Go Back Button */}
          <button
            onClick={() => window.history.back()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-gray-300 hover:text-white font-medium border border-neutral-700/50 hover:border-rose-800/40 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <svg 
              className={`w-5 h-5 transition-transform duration-200 ${isHovered ? '-translate-x-1' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Previous Page</span>
          </button>
        </div>

        {/* Footer help note */}
        <div className="mt-10 pt-6 border-t border-neutral-800/80 text-xs text-gray-500">
          Need assistance? <a href="/support" className="text-rose-400 hover:text-rose-300 underline transition-colors">Contact Support</a>
        </div>

      </div>
    </div>
  );
};

export default NotFoundPage;