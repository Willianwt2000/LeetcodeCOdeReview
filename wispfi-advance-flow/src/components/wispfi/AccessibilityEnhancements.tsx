import React, { useEffect } from 'react';

export const AccessibilityEnhancements: React.FC = () => {
  useEffect(() => {
    // Enhanced WCAG AA compliance
    const enhanceAccessibility = () => {
      // Add skip navigation link
      const addSkipNavigation = () => {
        const skipNav = document.createElement('a');
        skipNav.href = '#main-content';
        skipNav.textContent = 'Skip to main content';
        skipNav.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded z-50';
        skipNav.style.cssText = `
          position: absolute;
          left: -10000px;
          top: auto;
          width: 1px;
          height: 1px;
          overflow: hidden;
        `;
        
        skipNav.addEventListener('focus', () => {
          skipNav.style.cssText = `
            position: absolute;
            top: 1rem;
            left: 1rem;
            width: auto;
            height: auto;
            overflow: visible;
            background: hsl(var(--primary));
            color: hsl(var(--primary-foreground));
            padding: 0.5rem 1rem;
            border-radius: 0.375rem;
            z-index: 50;
          `;
        });
        
        skipNav.addEventListener('blur', () => {
          skipNav.style.cssText = `
            position: absolute;
            left: -10000px;
            top: auto;
            width: 1px;
            height: 1px;
            overflow: hidden;
          `;
        });
        
        document.body.insertBefore(skipNav, document.body.firstChild);
      };

      // Enhance focus management
      const enhanceFocusManagement = () => {
        // Ensure all interactive elements are focusable
        const interactiveElements = document.querySelectorAll(
          'button, [role="button"], input, textarea, select, a[href]'
        );
        
        interactiveElements.forEach(element => {
          if (!element.getAttribute('tabindex') && element.getAttribute('tabindex') !== '0') {
            element.setAttribute('tabindex', '0');
          }
          
          // Ensure proper ARIA labels
          if (!element.getAttribute('aria-label') && !element.getAttribute('aria-labelledby')) {
            const text = element.textContent?.trim();
            if (text && text.length > 0) {
              element.setAttribute('aria-label', text);
            }
          }
        });
      };

      // Add ARIA landmarks if missing
      const addAriaLandmarks = () => {
        const main = document.querySelector('main');
        if (main && !main.getAttribute('id')) {
          main.setAttribute('id', 'main-content');
        }
        
        // Add role attributes where missing
        const header = document.querySelector('header');
        if (header && !header.getAttribute('role')) {
          header.setAttribute('role', 'banner');
        }
        
        const footer = document.querySelector('footer');
        if (footer && !footer.getAttribute('role')) {
          footer.setAttribute('role', 'contentinfo');
        }
        
        const nav = document.querySelectorAll('nav');
        nav.forEach((navElement, index) => {
          if (!navElement.getAttribute('role')) {
            navElement.setAttribute('role', 'navigation');
          }
          if (!navElement.getAttribute('aria-label')) {
            navElement.setAttribute('aria-label', index === 0 ? 'Main navigation' : `Navigation ${index + 1}`);
          }
        });
      };

      // Enhance keyboard navigation
      const enhanceKeyboardNavigation = () => {
        document.addEventListener('keydown', (e) => {
          // Escape key handling for modals
          if (e.key === 'Escape') {
            const modal = document.querySelector('[role="dialog"]:not([hidden])');
            if (modal) {
              const closeButton = modal.querySelector('[aria-label*="close"], [aria-label*="Close"]');
              if (closeButton) {
                (closeButton as HTMLElement).click();
              }
            }
          }
          
          // Tab trap for modals
          if (e.key === 'Tab') {
            const modal = document.querySelector('[role="dialog"]:not([hidden])');
            if (modal) {
              const focusableElements = modal.querySelectorAll(
                'button, [role="button"], input, textarea, select, a[href], [tabindex]:not([tabindex="-1"])'
              );
              
              if (focusableElements.length === 0) return;
              
              const firstElement = focusableElements[0] as HTMLElement;
              const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
              
              if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                  e.preventDefault();
                  lastElement.focus();
                }
              } else {
                if (document.activeElement === lastElement) {
                  e.preventDefault();
                  firstElement.focus();
                }
              }
            }
          }
        });
      };

      // Enhance color contrast checking
      const enhanceColorContrast = () => {
        const style = document.createElement('style');
        style.textContent = `
          /* Ensure high contrast mode compatibility */
          @media (prefers-contrast: high) {
            button, [role="button"] {
              border: 2px solid currentColor !important;
            }
            
            a {
              text-decoration: underline !important;
            }
            
            .bg-primary {
              background-color: ButtonFace !important;
              color: ButtonText !important;
            }
          }
          
          /* Ensure reduced motion compatibility */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
              scroll-behavior: auto !important;
            }
          }
          
          /* Focus visible for better accessibility */
          .focus-visible:focus:not(:focus-visible) {
            outline: none;
          }
          
          .focus-visible:focus-visible {
            outline: 2px solid hsl(var(--primary));
            outline-offset: 2px;
          }
        `;
        document.head.appendChild(style);
      };

      addSkipNavigation();
      enhanceFocusManagement();
      addAriaLandmarks();
      enhanceKeyboardNavigation();
      enhanceColorContrast();
    };

    // Add live region for dynamic content announcements
    const addLiveRegion = () => {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', 'polite');
      liveRegion.setAttribute('aria-atomic', 'true');
      liveRegion.setAttribute('id', 'live-region');
      liveRegion.style.cssText = `
        position: absolute;
        left: -10000px;
        width: 1px;
        height: 1px;
        overflow: hidden;
      `;
      document.body.appendChild(liveRegion);
    };

    enhanceAccessibility();
    addLiveRegion();
  }, []);

  return null;
};

export default AccessibilityEnhancements;