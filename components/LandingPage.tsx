/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect } from 'react';
// FIX: Import `MotionProps` to correctly type the animation configuration object.
import { motion, AnimatePresence, MotionProps } from 'framer-motion';


// --- NEW: Google Icon SVG ---
const GoogleIcon = () => (
    <svg viewBox="0 0 48 48" className="w-5 h-5 mr-3">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.195,44,30.023,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

// --- REFINED AUTH MODAL COMPONENT ---
interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    initialMode: 'signin' | 'signup';
    setMode: (mode: 'signin' | 'signup') => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess, initialMode, setMode }) => {
    const isSignUp = initialMode === 'signup';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd have validation and an API call here.
        // For this demo, we'll just call the success handler.
        onSuccess();
    };

    // Mock Google sign-in handler
    const handleGoogleSignIn = () => {
         console.log(`Signing ${isSignUp ? 'up' : 'in'} with Google...`);
         onSuccess();
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4"
                    aria-modal="true"
                    role="dialog"
                >
                    <motion.div
                        initial={{ scale: 0.95, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, y: 20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative"
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition" aria-label="Close dialog">
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>
                            <p className="text-gray-500">{isSignUp ? 'Start your journey through time.' : 'Sign in to continue.'}</p>
                        </div>

                        <div className="mt-8 space-y-5">
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg text-sm font-semibold text-gray-800 hover:bg-gray-100/60 transition-all focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
                            >
                                <GoogleIcon />
                                Sign {isSignUp ? 'up' : 'in'} with Google
                            </button>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-white px-2 text-gray-400 font-medium">Or</span>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="sr-only">Email Address</label>
                                    <input type="email" id="email" required className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-gray-900 focus:border-gray-900 transition placeholder-gray-400" placeholder="Email address" />
                                </div>
                                 <div>
                                    <label htmlFor="password" className="sr-only">Password</label>
                                    <input type="password" id="password" required minLength={6} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-gray-900 focus:border-gray-900 transition placeholder-gray-400" placeholder="Password" />
                                </div>
                                <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
                                    {isSignUp ? 'Create Account' : 'Sign In'}
                                </button>
                            </form>
                        </div>
                        
                        <p className="text-center text-sm text-gray-500 mt-8">
                            {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                            <button onClick={() => setMode(isSignUp ? 'signin' : 'signup')} className="font-semibold text-gray-800 hover:underline focus:outline-none">
                                {isSignUp ? 'Sign In' : 'Sign Up'}
                            </button>
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


// --- HEADER COMPONENT ---
const Header = ({ openModal }: { openModal: (mode: 'signin' | 'signup') => void; }) => (
    <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-40 p-4 bg-white/80 backdrop-blur-sm border-b border-gray-200/80"
    >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="font-bold text-2xl tracking-tighter">TimeLens</span>
            <div className="flex items-center gap-2 sm:gap-4">
                <button 
                    onClick={() => openModal('signin')} 
                    className="px-4 py-2 rounded-full font-semibold text-gray-700 text-sm sm:text-base hover:bg-gray-200/60 transition-colors"
                >
                    Sign In
                </button>
                <button 
                    onClick={() => openModal('signup')} 
                    className="bg-gray-900 text-white px-4 py-2 rounded-full font-semibold text-sm sm:text-base hover:bg-gray-700 transition-colors"
                >
                    Sign Up
                </button>
            </div>
        </div>
    </motion.header>
);

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

const FinalCTA = ({ openModal }: { openModal: (mode: 'signup' | 'signin') => void }) => (
    <motion.section {...sectionAnimation} className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter">Ready to See Your Past Selves?</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto mb-8">
                Your journey through time is just a click away. Get started now and create your own personal photo album of the decades.
            </p>
            <button
                onClick={() => openModal('signup')}
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
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'signin' | 'signup'>('signup');

    const openModal = (mode: 'signin' | 'signup') => {
        setModalMode(mode);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

  return (
    <div className="bg-white text-gray-900 min-h-screen w-full">
      <Header openModal={openModal} />
      {/* Hero Section */}
      <div className="relative min-h-screen flex flex-col items-center p-4 overflow-hidden pt-32 md:pt-40">
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
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <button
                onClick={() => openModal('signup')}
                className="bg-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transform hover:scale-105"
            >
              Get Started for Free
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
      <FinalCTA openModal={openModal} />
      <LandingFooter />

      <AuthModal 
        isOpen={modalOpen}
        onClose={closeModal}
        onSuccess={() => {
            closeModal();
            onStart();
        }}
        initialMode={modalMode}
        setMode={setModalMode}
      />
    </div>
  );
};

export default LandingPage;
