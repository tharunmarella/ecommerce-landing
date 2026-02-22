import { useState } from 'react';

interface WorkingImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function WorkingImage({ src, alt, className = '' }: WorkingImageProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`relative ${className} overflow-hidden bg-gray-50`}>
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${imageError ? 'opacity-50 grayscale' : 'opacity-100'}`}
        onError={() => setImageError(true)}
        loading="lazy"
      />
    </div>
  );
}
