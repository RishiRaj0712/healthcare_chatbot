import React, { useRef, useEffect } from 'react';

const TypingEffect = ({ text, delay = 20 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    let index = 0;
    const element = elementRef.current;
    if (element) {
      element.innerHTML = ''; // Clear previous content
      const interval = setInterval(() => {
        if (index < text.length) {
          element.innerHTML += text.charAt(index);
          index++;
        } else {
          clearInterval(interval);
        }
      }, delay);
      return () => clearInterval(interval);
    }
  }, [text, delay]);

  return <div ref={elementRef} />;
};

export default TypingEffect;
