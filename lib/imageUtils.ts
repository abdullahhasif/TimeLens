/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Resizes an image file to a maximum dimension while maintaining aspect ratio.
 * @param file The image file to resize.
 * @param maxSize The maximum width or height of the resized image.
 * @returns A promise that resolves to a new, resized File object.
 */
export function resizeImage(file: File, maxSize: number): Promise<File> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                let { width, height } = img;

                if (width > height) {
                    if (width > maxSize) {
                        height = Math.round(height * (maxSize / width));
                        width = maxSize;
                    }
                } else {
                    if (height > maxSize) {
                        width = Math.round(width * (maxSize / height));
                        height = maxSize;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');

                if (!ctx) {
                    return reject(new Error("Could not get canvas context for resizing."));
                }

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            const newFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now(),
                            });
                            resolve(newFile);
                        } else {
                            reject(new Error("Canvas toBlob conversion failed during resize."));
                        }
                    },
                    'image/jpeg',
                    0.9 // High quality
                );
            };
            img.onerror = reject;
            if (event.target?.result) {
                 img.src = event.target.result as string;
            } else {
                 reject(new Error("Could not read file for resizing."));
            }
           
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
