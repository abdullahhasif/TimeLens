/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
// FIX: Import `MotionProps` to correctly type the animation configuration object.
import { motion, AnimatePresence, MotionProps } from 'framer-motion';

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

// FIX: Explicitly type `sectionAnimation` with `MotionProps` to ensure TypeScript
// correctly validates its properties, particularly `transition.ease`, against
// framer-motion's expected types.
const sectionAnimation: MotionProps = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: "easeOut" }
};


const HowItWorks = () => {
    const steps = [
        {
            icon: <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" /></svg>,
            title: '1. Upload Your Photo',
            description: 'Choose a clear, front-facing photo to begin your transformation.'
        },
        {
            icon: <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.573L16.5 21.75l-.398-1.177a3.375 3.375 0 00-2.456-2.456L12.5 17.25l1.177-.398a3.375 3.375 0 002.456-2.456L16.5 13.5l.398 1.177a3.375 3.375 0 002.456 2.456l1.177.398-1.177.398a3.375 3.375 0 00-2.456 2.456z" /></svg>,
            title: '2. Witness the Magic',
            description: 'Our AI reimagines you in the style of six different decades, from the 50s to the 2000s.'
        },
        {
            icon: <svg className="w-12 h-12 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" /></svg>,
            title: '3. Share Your Album',
            description: 'Download your unique photo album and share your journey through time.'
        }
    ];

    return (
        <motion.section {...sectionAnimation} className="py-20 sm:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center tracking-tighter mb-4">A Journey in 3 Simple Steps</h2>
                <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-16">
                    From upload to album, see how TimeLens brings your history to life.
                </p>
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="bg-gray-100 rounded-full p-6 mb-6">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

const Gallery = () => {
    const galleryImages = [
        { src: "https://picsum.photos/seed/g1/600/800", alt: "1950s Style Portrait", decade: "1950s" },
        { src: "https://picsum.photos/seed/g2/600/800", alt: "1960s Style Portrait", decade: "1960s" },
        { src: "https://picsum.photos/seed/g3/600/800", alt: "1970s Style Portrait", decade: "1970s" },
        { src: "https://picsum.photos/seed/g4/600/800", alt: "1980s Style Portrait", decade: "1980s" },
        { src: "https://picsum.photos/seed/g5/600/800", alt: "1990s Style Portrait", decade: "1990s" },
        { src: "https://picsum.photos/seed/g6/600/800", alt: "2000s Style Portrait", decade: "2000s" },
    ];
    return (
        <motion.section {...sectionAnimation} className="py-20 sm:py-32 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center tracking-tighter mb-16">Travel Through The Decades</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
                    {galleryImages.map((image, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg">
                            <img src={image.src} alt={image.alt} className="w-full h-full object-cover aspect-[3/4] transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-4 md:p-6">
                                <h3 className="text-white text-xl md:text-2xl font-bold">{image.decade}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqs = [
        {
            question: "What kind of photos work best?",
            answer: "For best results, use a clear, well-lit, front-facing portrait photo of a single person. Avoid photos with sunglasses, hats, or extreme angles. The higher the quality of the original photo, the better the results will be."
        },
        {
            question: "Is my data private?",
            answer: "Your privacy is important to us. Uploaded images are processed securely and are only used to generate your decade photos. We do not store your images after your session ends."
        },
        {
            question: "How long does generation take?",
            answer: "Generation typically takes about 1-2 minutes, depending on server load. We generate images for all decades sequentially to ensure the best quality and to manage resources effectively, especially on mobile devices."
        }
    ];

    return (
        <motion.section {...sectionAnimation} className="py-20 sm:py-32">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center tracking-tighter mb-12">Frequently Asked Questions</h2>
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex justify-between items-center text-left p-5 focus:outline-none focus:bg-gray-50 transition"
                            >
                                <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                                <motion.div animate={{ rotate: openIndex === index ? 180 : 0 }}>
                                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                </motion.div>
                            </button>
                            <AnimatePresence initial={false}>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    >
                                        <p className="px-5 pb-5 text-gray-600 leading-relaxed">{faq.answer}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
};

const FinalCTA = ({ onStart }: { onStart: () => void }) => (
    <motion.section {...sectionAnimation} className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Ready to See Your Past Selves?</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto mb-8">
                Your journey through time is just a click away. Get started now and create your own personal photo album of the decades.
            </p>
            <button
                onClick={onStart}
                className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transform hover:scale-105"
            >
                Try TimeLens Now
            </button>
        </div>
    </motion.section>
);

const LandingFooter = () => (
    <footer className="py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} TimeLens. All rights reserved.</p>
            <p className="mt-2 text-sm">
                Created by{' '}
                <a
                    href="https://www.linkedin.com/in/abdullah-asif/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                    abdullah
                </a>
                {' '} with Google AI Studio.
            </p>
        </div>
    </footer>
);


interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="bg-white text-gray-900 min-h-screen w-full">
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center p-4 overflow-hidden">
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
        <div className="relative z-10 flex flex-col items-center justify-center text-center flex-grow" style={{ marginTop: '12rem' }}>
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
        
        {/* Scroll Down Indicator */}
        <motion.div 
            className="absolute bottom-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2, repeat: Infinity, repeatType: 'reverse' }}
        >
             <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </motion.div>
      </div>
      
      {/* Expanded Page Content */}
      <HowItWorks />
      <Gallery />
      <FAQ />
      <FinalCTA onStart={onStart} />
      <LandingFooter />

    </div>
  );
};

export default LandingPage;