import { useEffect } from 'react';

const useParallaxWithMouse = (divRef : React.RefObject<HTMLDivElement>, xSign: number, ySign: number, strength: number) => {

  useEffect(() => {
    // Don't activate on touch devices
    if (window.matchMedia("(orientation: portrait)").matches) {
      return;
    }

    const handleMouseMove = (event: MouseEvent) => {
      if (divRef.current) {
        const divElement = divRef.current;

        const elemRect = [ divElement.getBoundingClientRect().left, divElement.getBoundingClientRect().top ];
        const elemSize = [ divElement.offsetWidth, divElement.offsetHeight ];
        const elemCenter = [ elemRect[0] + elemSize[0] / 2, elemRect[1] + elemSize[1] / 2];

        const moveX = (elemCenter[0] - event.clientX) * strength * xSign;
        const moveY = (elemCenter[1] - event.clientY) * strength * ySign;

        divElement.style.setProperty('transform', `translateX(${moveX}px) translateY(${moveY}px)`); 
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [divRef]);
};

export default useParallaxWithMouse;
