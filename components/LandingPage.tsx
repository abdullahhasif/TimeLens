/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion } from 'framer-motion';

// Using gradients to represent the images to avoid adding new assets.
// The styles are inspired by the colors in the provided screenshot.
// x, y in rem, r in degrees
const imageStyles = [
    // Left side
    { x: -45, y: 4, r: -40, zIndex: 0, background: 'linear-gradient(135deg, #2d3748, #000)' },
    { x: -36, y: 0.4, r: -32, zIndex: 1, background: 'linear-gradient(135deg, #2d3748, #000)' },
    { x: -27, y: -2.4, r: -24, zIndex: 2, background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)' },
    { x: -18, y: -4.4, r: -16, zIndex: 3, background: 'linear-gradient(135deg, #ec4899, #d946ef)' },
    { x: -9, y: -5.6, r: -8, zIndex: 4, background: 'linear-gradient(135deg, #f97316, #a855f7)' },
    // Center
    { x: 0, y: -6, r: 0, zIndex: 5, background: 'linear-gradient(135deg, #1a202c, #4a5568)' },
    // Right side
    { x: 9, y: -5.6, r: 8, zIndex: 6, background: 'linear-gradient(135deg, #7e22ce, #4c1d95)' },
    { x: 18, y: -4.4, r: 16, zIndex: 7, background: 'linear-gradient(135deg, #7e22ce, #4c1d95)' },
    { x: 27, y: -2.4, r: 24, zIndex: 8, background: 'linear-gradient(135deg, #5b21b6, #312e81)' },
    { x: 36, y: 0.4, r: 32, zIndex: 9, background: 'linear-gradient(135deg, #5b21b6, #000)' },
    { x: 45, y: 4, r: 40, zIndex: 10, background: 'linear-gradient(135deg, #fff, #60a5fa)' },
];


interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="bg-white text-gray-900 min-h-screen w-full flex flex-col items-center justify-center p-4 overflow-hidden relative">
      {/* Container for the image arc */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ top: '30%' }}>
        <div className="relative w-1 h-1">
          {imageStyles.map((style, index) => (
            <motion.div
              key={index}
              className="absolute w-28 h-28 md:w-32 md:h-32 rounded-2xl shadow-xl bg-gray-200"
              style={{
                top: '-3.5rem', left: '-3.5rem', // Center the images
                background: style.background,
                zIndex: style.zIndex
              }}
              initial={{ opacity: 0, scale: 0.5, x: 0, y: 0, rotate: 0 }}
              animate={{ opacity: 1, scale: 1, x: `${style.x}rem`, y: `${style.y}rem`, rotate: style.r }}
              transition={{
                type: 'spring',
                stiffness: 80,
                damping: 15,
                delay: 0.4 + index * 0.04,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content container */}
      <div className="z-10 flex flex-col items-center justify-center text-center" style={{ marginTop: '16rem' }}>
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          Your Life, <br /> Reimagined
        </motion.h1>
        <motion.p
          className="text-lg text-gray-600 mt-4 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          Upload a photo and journey through the eras.
        </motion.p>
        <motion.div
          className="flex items-center justify-center gap-4 mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <button
            onClick={onStart}
            className="bg-gray-900 text-white px-7 py-3 rounded-full font-semibold text-base hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Try TimeLens
          </button>
          <button
            className="bg-white text-gray-900 border border-gray-300 px-7 py-3 rounded-full font-semibold text-base hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Learn more
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default LandingPage;