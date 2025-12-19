import React, { useEffect } from "react";

export const TouchOptimizations: React.FC = () => {
  useEffect(() => {
    // Add global touch optimization styles
    const addTouchStyles = () => {
      const styleElement = document.createElement("style");
      styleElement.textContent = `
        /* Enhanced touch interactions */
        .touch-action-manipulation { touch-action: manipulation; }
        .touch-friendly-button {
          min-height: 44px;
          min-width: 44px;
          padding: 12px 16px;
          touch-action: manipulation;
          -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
        }
        
        /* Better visual feedback for touch */
        .touch-feedback {
          transition: all 0.15s ease;
          transform-origin: center;
        }
        
        .touch-feedback:active {
          transform: scale(0.98);
          opacity: 0.9;
        }
        
        /* Improve scrolling on mobile */
        .smooth-scroll {
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
        }
        
        /* Fix iOS button styling */
        button, input[type="submit"], input[type="button"] {
          -webkit-appearance: none;
          appearance: none;
          border-radius: 8px;
        }
        
        /* Prevent zoom on input focus */
        input, select, textarea {
          font-size: 16px;
        }
        
        @media screen and (max-width: 767px) {
          input, select, textarea {
            font-size: 16px !important;
            transform: translateZ(0);
          }
        }
        
        /* Enhanced focus indicators for mobile */
        @media (hover: none) and (pointer: coarse) {
          button:focus,
          [role="button"]:focus,
          input:focus,
          textarea:focus,
          select:focus {
            outline: 2px solid hsl(var(--primary));
            outline-offset: 2px;
          }
        }
        
        /* Improved tap targets */
        .tap-target {
          position: relative;
          min-height: 44px;
          min-width: 44px;
        }
        
        .tap-target::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          min-width: 44px;
          min-height: 44px;
          z-index: -1;
        }
      `;
      document.head.appendChild(styleElement);
    };

    // Add touch event optimizations
    const optimizeTouchEvents = () => {
      // Add passive event listeners for better scroll performance
      const addPassiveListeners = () => {
        const events = ["touchstart", "touchmove", "wheel"];
        events.forEach((event) => {
          document.addEventListener(event, () => {}, { passive: true });
        });
      };

      // Add touch feedback to interactive elements
      const addTouchFeedback = () => {
        const interactiveElements = document.querySelectorAll(
          'button, [role="button"], input[type="submit"], .touch-feedback',
        );

        interactiveElements.forEach((element) => {
          element.classList.add("touch-action-manipulation");

          element.addEventListener(
            "touchstart",
            () => {
              element.classList.add("touching");
            },
            { passive: true },
          );

          element.addEventListener(
            "touchend",
            () => {
              setTimeout(() => {
                element.classList.remove("touching");
              }, 150);
            },
            { passive: true },
          );
        });
      };

      addPassiveListeners();
      addTouchFeedback();
    };

    // Handle safe area insets for iPhone X+ devices
    const handleSafeAreaInsets = () => {
      const addSafeAreaStyles = () => {
        const style = document.createElement("style");
        style.textContent = `
          /* Safe area insets for modern phones */
          .safe-area-inset-top { padding-top: env(safe-area-inset-top); }
          .safe-area-inset-bottom { padding-bottom: env(safe-area-inset-bottom); }
          .safe-area-inset-left { padding-left: env(safe-area-inset-left); }
          .safe-area-inset-right { padding-right: env(safe-area-inset-right); }
          
          /* Adjust fixed elements for safe areas */
          .fixed.bottom-0 {
            bottom: env(safe-area-inset-bottom);
          }
          
          .fixed.top-0 {
            top: env(safe-area-inset-top);
          }
        `;
        document.head.appendChild(style);
      };

      addSafeAreaStyles();
    };

    addTouchStyles();
    optimizeTouchEvents();
    handleSafeAreaInsets();
  }, []);

  return null;
};

export default TouchOptimizations;
