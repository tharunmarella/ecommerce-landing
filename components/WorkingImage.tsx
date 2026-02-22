import { useState } from 'react';

interface WorkingImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function WorkingImage({ src, alt, className = '' }: WorkingImageProps) {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (imageError) {
    return (
      <div className={`${className} bg-gray-100 flex items-center justify-center`}>
        <div className="text-center p-4 text-gray-500">
          <div className="text-2xl mb-2">📷</div>
          <p className="text-xs">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="text-center p-4 text-gray-500">
            <div className="text-2xl mb-2">📷</div>
            <p className="text-xs">Loading...</p>
          </div>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover ${!imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
}