// components/SSRImage.tsx
import { useState, useEffect } from 'react';

interface SSRImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  fallbackText?: string;
}

export default function SSRImage({
  src,
  alt,
  className = '',
  fallbackSrc = '/placeholder-product.svg',
  fallbackText = 'Image not available',
}: SSRImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [isClient, setIsClient] = useState(false);

  // Decode HTML entities safely
  const decodeHtmlEntities = (text: string): string => {
    if (typeof document !== 'undefined') {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = text;
      return textarea.value;
    }
    // Fallback for SSR: replace common entities
    return text
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'");
  };

  useEffect(() => {
    setIsClient(true);
    const decodedSrc = decodeHtmlEntities(src);
    setImageSrc(decodedSrc);
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

  // Show placeholder if there's an error and no fallback, or if fallback also fails
  if (imageError && (!fallbackSrc || imageSrc === fallbackSrc)) {
    return (
      <div className={`${className} bg-muted flex items-center justify-center`}>
        <div className="text-center p-4">
          <div className="text-4xl mb-2">📷</div>
          <p className="text-sm text-muted-foreground">{fallbackText}</p>
        </div>
      </div>
    );
  }

  // Render the image. For SSR, we want it to be visible immediately.
  // On the client, we can use opacity for fade-in if needed, but let's keep it simple first.
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
