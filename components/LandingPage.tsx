/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import { motion } from 'framer-motion';

// The positions (x, y in rem) and rotations (r in degrees) are mathematically
// calculated to create a deep, smooth arc with even spacing between each image,
// closely matching the reference design.
// Images are loaded from a CDN to provide dynamic, random visuals.
const imageStyles = [
    // Left side.
    { x: -32.5, y: 14, r: -70, zIndex: 0, imageUrl: 'https://picsum.photos/seed/a1/200' },
    { x: -26, y: 6, r: -56, zIndex: 1, imageUrl: 'https://picsum.photos/seed/b2/200' },
    { x: -19.5, y: 0, r: -42, zIndex: 2, imageUrl: 'https://picsum.photos/seed/c3/200' },
    { x: -13, y: -4, r: -28, zIndex: 3, imageUrl: 'https://picsum.photos/seed/d4/200' },
    { x: -6.5, y: -7, r: -14, zIndex: 4, imageUrl: 'https://picsum.photos/seed/e5/200' },
    // Center
    { x: 0, y: -8, r: 0, zIndex: 5, imageUrl: 'https://picsum.photos/seed/f6/200' },
    // Right side
    { x: 6.5, y: -7, r: 14, zIndex: 6, imageUrl: 'https://picsum.photos/seed/g7/200' },
    { x: 13, y: -4, r: 28, zIndex: 7, imageUrl: 'https://picsum.photos/seed/h8/200' },
    { x: 19.5, y: 0, r: 42, zIndex: 8, imageUrl: 'https://picsum.photos/seed/i9/200' },
    { x: 26, y: 6, r: 56, zIndex: 9, imageUrl: 'https://picsum.photos/seed/j10/200' },
    { x: 32.5, y: 14, r: 70, zIndex: 10, imageUrl: 'https://picsum.photos/seed/k11/200' },
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
                backgroundImage: `url(${style.imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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
      <div className="z-10 flex flex-col items-center justify-center text-center" style={{ marginTop: '12rem' }}>
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
