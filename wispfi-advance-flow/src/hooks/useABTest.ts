import { useState, useEffect } from 'react';

interface ABTestConfig {
  testName: string;
  variants: string[];
  defaultVariant?: string;
}

interface ABTestResult {
  variant: string;
  isReady: boolean;
}

export const useABTest = ({ testName, variants, defaultVariant }: ABTestConfig): ABTestResult => {
  const [variant, setVariant] = useState<string>(defaultVariant || variants[0]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if variant is already stored in localStorage
    const storageKey = `ab_test_${testName}`;
    const storedVariant = localStorage.getItem(storageKey);
    
    if (storedVariant && variants.includes(storedVariant)) {
      setVariant(storedVariant);
    } else {
      // Randomly assign variant
      const randomVariant = variants[Math.floor(Math.random() * variants.length)];
      setVariant(randomVariant);
      localStorage.setItem(storageKey, randomVariant);
      
      // Track variant assignment
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'ab_test_assignment', {
          test_name: testName,
          variant: randomVariant,
        });
      }
    }
    
    setIsReady(true);
  }, [testName, variants]);

  return { variant, isReady };
};

export const ABTestProvider = ({ children }: { children: React.ReactNode }) => {
  return children;
};