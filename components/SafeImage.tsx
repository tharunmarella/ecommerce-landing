import { useState, useEffect } from 'react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  fallbackText?: string;
}

export default function SafeImage({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = '/placeholder-product.svg',
  fallbackText = 'Product Image'
}: SafeImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  // Decode HTML entities in the URL
  const decodeHtmlEntities = (text: string): string => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  useEffect(() => {
    // Decode any HTML entities in the URL
    const decodedSrc = decodeHtmlEntities(src);
    setImageSrc(decodedSrc);
  }, [src]);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      // Try fallback source if available
      if (fallbackSrc && fallbackSrc !== src) {
        setImageSrc(fallbackSrc);
      }
    }
  };

  // If both primary and fallback images fail, show placeholder
  if (imageError && (imageSrc === fallbackSrc || !fallbackSrc)) {
    return (
      <div className={`${className} bg-muted flex items-center justify-center`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">📷</div>
          <p className="text-sm text-muted-foreground">{fallbackText}</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleImageError}
      loading="lazy"
    />
  );
}