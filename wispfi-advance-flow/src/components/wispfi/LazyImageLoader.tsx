import React, { useState, useRef, useEffect } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  loading?: 'eager' | 'lazy';
  placeholder?: string;
}

export const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  loading = 'lazy',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjRjNGNEY2Ii8+Cjwvc3ZnPgo='
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && loading === 'lazy') {
          img.src = src;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (loading === 'lazy') {
      observer.observe(img);
    } else {
      img.src = src;
    }

    return () => observer.disconnect();
  }, [src, loading]);

  return (
    <img
      ref={imgRef}
      src={loading === 'eager' ? src : placeholder}
      alt={alt}
      className={`${className} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
      width={width}
      height={height}
      onLoad={() => setIsLoaded(true)}
      onError={() => setHasError(true)}
      style={{
        backgroundColor: hasError ? '#f3f4f6' : 'transparent'
      }}
    />
  );
};

export default LazyImage;