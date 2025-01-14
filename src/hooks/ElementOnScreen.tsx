import { useEffect, useRef, useState } from 'react';

const useElementsOnScreen = (options: IntersectionObserverInit) => {
  const containerRefs = useRef<(HTMLElement | null)[]>([]); 
  const [visibleItems, setVisibleItems] = useState<Record<number, boolean>>({});
  const [animatedItems, setAnimatedItems] = useState<Record<number, boolean>>({});

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const updatedVisibility: Record<number, boolean> = {};
    const updatedAnimationState: Record<number, boolean> = {};

    entries.forEach((entry, index) => {
        if (!animatedItems[index]) {
            updatedVisibility[index] = entry.isIntersecting;
            if (entry.isIntersecting) {
                updatedAnimationState[index] = true;
            }
        }
    });

    setVisibleItems((prev) => ({ ...prev, ...updatedVisibility }));
    setAnimatedItems((prev) => ({ ...prev, ...updatedAnimationState }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);

    containerRefs.current.forEach((ref) => {
        if (ref) {
            observer.observe(ref);
        }
    });

    return () => {
        containerRefs.current.forEach((ref) => {
            if (ref) {
                observer.unobserve(ref);
            }
        });
    };
  }, [options]);

  return [containerRefs, visibleItems] as const;
};

export default useElementsOnScreen;
