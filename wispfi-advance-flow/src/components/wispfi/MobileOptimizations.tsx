import React from "react";

// Mobile-specific optimizations component
export const MobileOptimizations: React.FC = () => {
  React.useEffect(() => {
    // Prevent iOS zoom on input focus
    const addViewportMeta = () => {
      const viewport = document.querySelector("meta[name=viewport]");
      if (viewport) {
        viewport.setAttribute("content", "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no");
      }
    };

    // Enhance touch interactions
    const addTouchStyles = () => {
      const style = document.createElement("style");
      style.textContent = `
        /* Enhanced touch interactions */
        button, [role="button"], input[type="submit"] {
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          user-select: none;
        }
        
        /* Smooth scrolling for mobile */
        html {
          scroll-behavior: smooth;
          -webkit-overflow-scrolling: touch;
        }
        
        /* Fix mobile viewport issues */
        body {
          overscroll-behavior-y: contain;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
        
        /* Enhanced focus states for mobile accessibility */
        @media (max-width: 767px) {
          button:focus-visible,
          [role="button"]:focus-visible,
          input:focus-visible,
          textarea:focus-visible {
            outline: 2px solid hsl(var(--primary));
            outline-offset: 2px;
            border-radius: 4px;
          }
        }
        
        /* Prevent zoom on orientation change iOS */
        @media screen and (orientation: landscape) {
          html {
            -webkit-text-size-adjust: 100%;
          }
        }
      `;
      document.head.appendChild(style);
    };

    addViewportMeta();
    addTouchStyles();
  }, []);

  return null;
};

export default MobileOptimizations;
