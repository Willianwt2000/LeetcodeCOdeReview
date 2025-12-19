import React, { useEffect } from "react";

export const PerformanceOptimizer: React.FC = () => {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload hero images
      const heroImages = ["/assets/hero/hero-golden-hour.jpg", "/assets/hero/hero-mobile-optimized.webp"];

      heroImages.forEach((src) => {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = src;
        document.head.appendChild(link);
      });
    };

    // Optimize images with WebP fallback
    const optimizeImages = () => {
      const images = document.querySelectorAll("img[data-src]");

      const imageObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target as HTMLImageElement;
              const src = img.dataset.src;

              if (src) {
                // Check if browser supports WebP
                const supportsWebP = () => {
                  const canvas = document.createElement("canvas");
                  canvas.width = 1;
                  canvas.height = 1;
                  return canvas.toDataURL("image/webp").startsWith("data:image/webp");
                };

                // Use WebP if supported, otherwise fallback
                const optimizedSrc = supportsWebP() && src.includes(".jpg") ? src.replace(".jpg", ".webp") : src;

                img.src = optimizedSrc;
                img.removeAttribute("data-src");
                imageObserver.unobserve(img);
              }
            }
          });
        },
        { threshold: 0.1 },
      );

      images.forEach((img) => imageObserver.observe(img));
    };

    // Minimize main thread blocking
    const optimizeMainThread = () => {
      // Use requestIdleCallback for non-critical tasks
      if ("requestIdleCallback" in window) {
        requestIdleCallback(() => {
          // Defer non-critical JavaScript
          const scripts = document.querySelectorAll("script[data-defer]");
          scripts.forEach((script) => {
            const newScript = document.createElement("script");
            newScript.src = script.getAttribute("src") || "";
            newScript.async = true;
            document.head.appendChild(newScript);
          });
        });
      }
    };

    // Optimize scroll performance
    const optimizeScrolling = () => {
      let ticking = false;

      const updateScrollPosition = () => {
        // Throttle scroll events
        if (!ticking) {
          requestAnimationFrame(() => {
            // Update scroll-based animations or effects here
            ticking = false;
          });
          ticking = true;
        }
      };

      window.addEventListener("scroll", updateScrollPosition, { passive: true });

      return () => window.removeEventListener("scroll", updateScrollPosition);
    };

    // Resource hints for better loading
    const addResourceHints = () => {
      // DNS prefetch for external domains
      const domains = ["js.hsforms.net", "www.googletagmanager.com"];

      domains.forEach((domain) => {
        const link = document.createElement("link");
        link.rel = "dns-prefetch";
        link.href = `//${domain}`;
        document.head.appendChild(link);
      });
    };

    // Initialize optimizations
    preloadCriticalResources();
    optimizeImages();
    optimizeMainThread();
    const cleanupScroll = optimizeScrolling();
    addResourceHints();

    return cleanupScroll;
  }, []);

  return null;
};

export default PerformanceOptimizer;
