
import { useEffect } from 'react';

export const useScrollToTop = (enabled: boolean = true) => {
  useEffect(() => {
    if (enabled) {
      // Use requestAnimationFrame to ensure the scroll happens after the page has rendered
      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto' // Changed from 'smooth' to 'auto' for faster navigation
        });
      });
    }
  }, [enabled]);
};

export default useScrollToTop;
