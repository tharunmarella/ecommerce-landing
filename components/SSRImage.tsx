// components/SSRImage.tsx
import { useState, useEffect } from 'react';

interface SSRImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  fallbackText?: string;
}

// Simple pre-decoder for SSR that doesn't need DOM
const preDecode = (text: string): string => {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};

export default function SSRImage({
  src,
  alt,
  className = '',
  fallbackSrc = '/placeholder-product.svg',
}: SSRImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(preDecode(src));

  // Still use useEffect for more robust decoding on client if needed
  useEffect(() => {
    const decoded = preDecode(src);
    if (decoded !== imageSrc) {
      setImageSrc(decoded);
    }
  }, [src]);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      // Try fallback source if available
      if (fallbackSrc && fallbackSrc !== imageSrc) {
        setImageSrc(fallbackSrc);
      }
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={`${className} ${imageError && !fallbackSrc ? 'opacity-50 grayscale' : ''}`}
      onError={handleImageError}
      loading="lazy"
    />
  );
}
