import { useState, useEffect } from 'react';

interface FixedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export default function FixedImage({ src, alt, className = '', fallbackSrc = '/placeholder-product.svg' }: FixedImageProps) {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    // Decode any HTML-encoded URLs
    const decodedSrc = src.replace(/&amp;/g, '&');
    console.log('FixedImage - Original src:', src);
    console.log('FixedImage - Decoded src:', decodedSrc);
    
    setCurrentSrc(decodedSrc);
    
    // Test if the image is accessible
    const testImage = new Image();
    testImage.onload = () => {
      console.log('FixedImage - Image loaded successfully:', decodedSrc);
      setImageStatus('loaded');
    };
    testImage.onerror = () => {
      console.log('FixedImage - Image failed to load:', decodedSrc);
      setImageStatus('error');
      // Try fallback
      if (fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        setImageStatus('loading');
        const fallbackTest = new Image();
        fallbackTest.onload = () => {
          console.log('FixedImage - Fallback loaded successfully');
          setImageStatus('loaded');
        };
        fallbackTest.onerror = () => {
          console.log('FixedImage - Fallback also failed');
          setImageStatus('error');
        };
        fallbackTest.src = fallbackSrc;
      }
    };
    testImage.src = decodedSrc;
  }, [src, fallbackSrc]);

  if (imageStatus === 'error') {
    return (
      <div className={`${className} bg-muted border border-border rounded-lg flex items-center justify-center`}>
        <div className="text-center p-4 text-muted-foreground">
          <div className="text-4xl mb-2">📷</div>
          <p className="text-xs">Image not available</p>
        </div>
      </div>
    );
  }

  if (imageStatus === 'loading') {
    return (
      <div className={`${className} bg-muted animate-pulse flex items-center justify-center`}>
        <div className="text-center p-4 text-muted-foreground">
          <div className="text-2xl mb-2">⏳</div>
          <p className="text-xs">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
}