import { useState, useEffect } from 'react';

interface FixedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

const preDecode = (text: string): string => {
  return text.replace(/&amp;/g, '&');
};

export default function FixedImage({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/placeholder-product.svg' 
}: FixedImageProps) {
  const [currentSrc, setCurrentSrc] = useState(preDecode(src));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const decoded = preDecode(src);
    if (decoded !== currentSrc) {
      setCurrentSrc(decoded);
      setHasError(false);
    }
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      if (fallbackSrc && currentSrc !== fallbackSrc) {
        setCurrentSrc(fallbackSrc);
      }
    }
  };

  return (
    <div className={`relative ${className} overflow-hidden bg-muted`}>
      <img
        src={currentSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${hasError && currentSrc === fallbackSrc ? 'opacity-50 grayscale' : 'opacity-100'}`}
        onError={handleError}
        loading="lazy"
      />
    </div>
  );
}
