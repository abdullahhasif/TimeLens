/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateDecadeImage } from './services/geminiService';
import PolaroidCard from './components/PolaroidCard';
import { createAlbumPage } from './lib/albumUtils';
import Footer from './components/Footer';
import heic2any from 'heic2any';
import { resizeImage } from './lib/imageUtils';

const DECADES = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s'];

const GHOST_POLAROIDS_CONFIG = [
  { initial: { x: "-150%", y: "-100%", rotate: -30 }, transition: { delay: 0.2 } },
  { initial: { x: "150%", y: "-80%", rotate: 25 }, transition: { delay: 0.4 } },
  { initial: { x: "-120%", y: "120%", rotate: 45 }, transition: { delay: 0.6 } },
  { initial: { x: "180%", y: "90%", rotate: -20 }, transition: { delay: 0.8 } },
  { initial: { x: "0%", y: "-200%", rotate: 0 }, transition: { delay: 0.5 } },
  { initial: { x: "100%", y: "150%", rotate: 10 }, transition: { delay: 0.3 } },
];


type ImageStatus = 'pending' | 'done' | 'error';
interface GeneratedImage {
    status: ImageStatus;
    url?: string;
    error?: string;
}

const primaryButtonClasses = "font-semibold tracking-wide text-xl text-center text-black bg-yellow-400 py-3 px-8 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:-rotate-2 hover:bg-yellow-300 shadow-[2px_2px_0px_2px_rgba(0,0,0,0.2)]";
const secondaryButtonClasses = "font-semibold tracking-wide text-xl text-center text-white bg-white/10 backdrop-blur-sm border-2 border-white/80 py-3 px-8 rounded-sm transform transition-transform duration-200 hover:scale-105 hover:rotate-2 hover:bg-white hover:text-black";


const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-full">
        <svg className="animate-spin h-6 w-6 text-neutral-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
    </div>
);

const ErrorDisplay = () => (
    <div className="flex items-center justify-center h-full">
         <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    </div>
);

/**
 * Converts a HEIC file to a JPEG File object. It first tries a native,
 * canvas-based approach which is fast and works in browsers like Safari.
 * If that fails, it falls back to the heic2any library.
 * @param file The HEIC file to convert.
 * @returns A promise that resolves to a JPEG File object.
 */
const convertHeicToJpeg = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
        // Native canvas-based approach (works in Safari)
        const imageUrl = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            console.log("Successfully loaded HEIC via native browser support.");
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                URL.revokeObjectURL(imageUrl);
                return reject(new Error("Could not get canvas context for conversion."));
            }
            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(imageUrl);
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(new File([blob], "image.jpeg", { type: "image/jpeg" }));
                    } else {
                        reject(new Error("Canvas toBlob conversion failed."));
                    }
                },
                'image/jpeg',
                0.92
            );
        };

        img.onerror = async () => {
            // Fallback for browsers that don't support HEIC natively (e.g., Chrome, Firefox)
            URL.revokeObjectURL(imageUrl);
            console.warn("Native HEIC loading failed. Falling back to heic2any library.");
            try {
                const conversionResult = await heic2any({
                    blob: file,
                    toType: "image/jpeg",
                    quality: 0.92,
                });
                const convertedBlob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
                resolve(new File([convertedBlob as Blob], "image.jpeg", { type: "image/jpeg" }));
            } catch (error) {
                console.error("heic2any conversion failed:", error);
                reject(error);
            }
        };

        img.src = imageUrl;
    });
};

function App() {
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
    const [generatedImages, setGeneratedImages] = useState<Record<string, GeneratedImage>>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isDownloading, setIsDownloading] = useState<boolean>(false);
    const [appState, setAppState] = useState<'idle' | 'image-uploaded' | 'generating' | 'results-shown'>('idle');
    const [selectedDecade, setSelectedDecade] = useState<string>(DECADES[0]);
    const [processingMessage, setProcessingMessage] = useState<string | null>(null);

    // Create a ref to hold the latest generatedImages state for cleanup on unmount.
    const generatedImagesRef = useRef(generatedImages);
    useEffect(() => {
        generatedImagesRef.current = generatedImages;
    });

    // Effect to manage the object URL for the uploaded image
    useEffect(() => {
        let objectUrl: string | null = null;
        if (uploadedImage) {
            objectUrl = URL.createObjectURL(uploadedImage);
            setUploadedImageUrl(objectUrl);
        } else {
            setUploadedImageUrl(null);
        }

        return () => {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        };
    }, [uploadedImage]);

    // This effect runs only on unmount to clean up all generated image URLs.
    useEffect(() => {
        return () => {
            const images = generatedImagesRef.current;
            Object.values(images).forEach(image => {
                if (image.url && image.url.startsWith('blob:')) {
                    URL.revokeObjectURL(image.url);
                }
            });
        };
    }, []); // Empty dependency array ensures this runs only on unmount.


    const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            let file = e.target.files[0];
            const fileName = file.name.toLowerCase();
            const fileType = file.type.toLowerCase();

            // Reset state for the new upload
            setUploadedImage(null);
            setGeneratedImages({});
            setProcessingMessage('Processing photo...');

            try {
                // Check if it's an HEIC/HEIF file and convert if needed
                if (fileType.includes('heic') || fileType.includes('heif') || fileName.endsWith('.heic') || fileName.endsWith('.heif')) {
                    setProcessingMessage('Converting iPhone photo...');
                    file = await convertHeicToJpeg(file);
                }

                // Resize the image for performance and stability
                setProcessingMessage('Optimizing photo...');
                const resizedFile = await resizeImage(file, 1024);
                setUploadedImage(resizedFile);
                setAppState('image-uploaded');

            } catch (error) {
                console.error("Error handling image processing:", error);
                alert("Sorry, there was an error processing your photo. Please try another one.");
                e.target.value = ''; // Reset file input to allow re-selection
            } finally {
                setProcessingMessage(null);
            }
        }
    };

    const handleGenerateClick = async () => {
        if (!uploadedImage) return;

        setIsLoading(true);
        setAppState('generating');
        setSelectedDecade(DECADES[0]);
        
        const initialImages: Record<string, GeneratedImage> = {};
        DECADES.forEach(decade => {
            initialImages[decade] = { status: 'pending' };
        });
        setGeneratedImages(initialImages);
        
        // Generate images sequentially to conserve memory on mobile devices
        for (const decade of DECADES) {
             try {
                const prompt = `Reimagine the person in this photo in the style of the ${decade}. This includes clothing, hairstyle, photo quality, and the overall aesthetic of that decade. The output must be a photorealistic image showing the person clearly.`;
                const resultBlob = await generateDecadeImage(uploadedImage, prompt);
                const objectUrl = URL.createObjectURL(resultBlob);

                setGeneratedImages(prev => ({
                    ...prev,
                    [decade]: { status: 'done', url: objectUrl },
                }));
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
                setGeneratedImages(prev => ({
                    ...prev,
                    [decade]: { status: 'error', error: errorMessage },
                }));
                console.error(`Failed to generate image for ${decade}:`, err);
            }
        }

        setIsLoading(false);
        setAppState('results-shown');
    };

    const handleRegenerateDecade = async (decade: string) => {
        if (!uploadedImage) return;

        if (generatedImages[decade]?.status === 'pending') {
            return;
        }
        
        console.log(`Regenerating image for ${decade}...`);
        
        // Revoke the old URL before fetching a new one to prevent memory leaks.
        const oldUrl = generatedImages[decade]?.url;
        if (oldUrl && oldUrl.startsWith('blob:')) {
            URL.revokeObjectURL(oldUrl);
        }

        setGeneratedImages(prev => ({
            ...prev,
            [decade]: { status: 'pending' },
        }));

        try {
            const prompt = `Reimagine the person in this photo in the style of the ${decade}. This includes clothing, hairstyle, photo quality, and the overall aesthetic of that decade. The output must be a photorealistic image showing the person clearly.`;
            const resultBlob = await generateDecadeImage(uploadedImage, prompt);
            const objectUrl = URL.createObjectURL(resultBlob);

            setGeneratedImages(prev => ({
                ...prev,
                [decade]: { status: 'done', url: objectUrl },
            }));
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "An unknown error occurred.";
            setGeneratedImages(prev => ({
                ...prev,
                [decade]: { status: 'error', error: errorMessage },
            }));
            console.error(`Failed to regenerate image for ${decade}:`, err);
        }
    };
    
    const handleReset = () => {
        // Explicitly revoke all generated image URLs to free up memory.
        Object.values(generatedImages).forEach(image => {
            if (image.url && image.url.startsWith('blob:')) {
                URL.revokeObjectURL(image.url);
            }
        });
        setUploadedImage(null);
        setGeneratedImages({});
        setAppState('idle');
    };

    const handleDownloadIndividualImage = (decade: string) => {
        const image = generatedImages[decade];
        if (image?.status === 'done' && image.url) {
            const link = document.createElement('a');
            link.href = image.url;
            link.download = `timelens-${decade}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const handleDownloadAlbum = async () => {
        setIsDownloading(true);
        try {
            const imageData = Object.entries(generatedImages)
                .filter(([, image]) => image.status === 'done' && image.url)
                .reduce((acc, [decade, image]) => {
                    acc[decade] = image!.url!;
                    return acc;
                }, {} as Record<string, string>);

            if (Object.keys(imageData).length < DECADES.length) {
                alert("Please wait for all images to finish generating before downloading the album.");
                return;
            }

            const albumDataUrl = await createAlbumPage(imageData);

            const link = document.createElement('a');
            link.href = albumDataUrl;
            link.download = 'timelens-album.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error) {
            console.error("Failed to create or download album:", error);
            alert("Sorry, there was an error creating your album. Please try again.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <main className="bg-black text-neutral-200 min-h-screen w-full flex flex-col items-center justify-center p-4 pb-24 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05]"></div>
            
            <div className="z-10 flex flex-col items-center justify-center w-full h-full flex-1 min-h-0">
                <div className="text-center mb-10">
                    <h1 className="text-6xl md:text-8xl font-bold text-neutral-100">TimeLens</h1>
                    <p className="text-neutral-300 mt-2 text-xl tracking-wide">Look through the lens of time.</p>
                </div>

                {appState === 'idle' && (
                     <div className="relative flex flex-col items-center justify-center w-full">
                        {GHOST_POLAROIDS_CONFIG.map((config, index) => (
                             <motion.div
                                key={index}
                                className="absolute w-80 h-[26rem] rounded-md p-4 bg-neutral-100/10 blur-sm"
                                initial={config.initial}
                                animate={{
                                    x: "0%", y: "0%", rotate: (Math.random() - 0.5) * 20,
                                    scale: 0,
                                    opacity: 0,
                                }}
                                transition={{
                                    ...config.transition,
                                    ease: "circOut",
                                    duration: 2,
                                }}
                            />
                        ))}
                        <motion.div
                             initial={{ opacity: 0, scale: 0.8 }}
                             animate={{ opacity: 1, scale: 1 }}
                             transition={{ delay: 2, duration: 0.8, type: 'spring' }}
                             className="flex flex-col items-center"
                        >
                            <label htmlFor="file-upload" className="cursor-pointer group">
                                 <PolaroidCard 
                                     caption={processingMessage || "Click to begin"}
                                     status={processingMessage ? 'pending' : 'done'}
                                 />
                            </label>
                            <input id="file-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp, image/heic, image/heif" onChange={handleImageUpload} disabled={!!processingMessage}/>
                            <p className="mt-8 text-neutral-500 text-center max-w-xs text-lg">
                                Click the polaroid to upload your photo and start your journey through time.
                            </p>
                        </motion.div>
                    </div>
                )}

                {appState === 'image-uploaded' && uploadedImageUrl && (
                    <div className="flex flex-col items-center gap-6">
                         <PolaroidCard 
                            imageUrl={uploadedImageUrl} 
                            caption="Your Photo" 
                            status="done"
                         />
                         <div className="flex items-center gap-4 mt-4">
                            <button onClick={handleReset} className={secondaryButtonClasses}>
                                Different Photo
                            </button>
                            <button onClick={handleGenerateClick} className={primaryButtonClasses}>
                                Generate
                            </button>
                         </div>
                    </div>
                )}

                {(appState === 'generating' || appState === 'results-shown') && (
                     <div className="w-full h-full flex flex-col items-center justify-center flex-1 min-h-0">
                        {/* Main Display Area */}
                        <div className="flex-1 flex items-center justify-center w-full py-4">
                             <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedDecade}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <PolaroidCard
                                        caption={selectedDecade}
                                        status={generatedImages[selectedDecade]?.status || 'pending'}
                                        imageUrl={generatedImages[selectedDecade]?.url}
                                        error={generatedImages[selectedDecade]?.error}
                                        onRegenerate={handleRegenerateDecade}
                                        onDownload={handleDownloadIndividualImage}
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        
                        {/* Film Strip Area */}
                        <div className="w-full flex-shrink-0 py-4">
                             <div className="flex items-center justify-start sm:justify-center gap-3 sm:gap-4 overflow-x-auto p-4 bg-black/20 backdrop-blur-sm rounded-md ring-1 ring-white/10">
                                {DECADES.map(decade => {
                                    const image = generatedImages[decade];
                                    const isSelected = decade === selectedDecade;
                                    return (
                                        <button 
                                            key={decade} 
                                            onClick={() => setSelectedDecade(decade)}
                                            className={`relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-md overflow-hidden bg-neutral-900/50 transition-all duration-300 ease-in-out focus:outline-none ${isSelected ? 'ring-4 ring-yellow-400 scale-105' : 'ring-2 ring-transparent hover:ring-white/50'}`}
                                            aria-label={`View ${decade} image`}
                                        >
                                            {image?.status === 'pending' && <LoadingSpinner />}
                                            {image?.status === 'error' && <ErrorDisplay />}
                                            {image?.status === 'done' && image.url && (
                                                <img src={image.url} alt={decade} className="w-full h-full object-cover" />
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 p-1 text-center bg-black/50">
                                                <p className="text-xs sm:text-sm font-semibold text-white truncate">{decade}</p>
                                            </div>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                         <div className="h-20 mt-4 flex items-center justify-center">
                            {appState === 'results-shown' && (
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <button 
                                        onClick={handleDownloadAlbum} 
                                        disabled={isDownloading} 
                                        className={`${primaryButtonClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
                                    >
                                        {isDownloading ? 'Creating Album...' : 'Download Album'}
                                    </button>
                                    <button onClick={handleReset} className={secondaryButtonClasses}>
                                        Start Over
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}

export default App;