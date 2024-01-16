import { useState, useEffect } from 'react';

// Custom hook for typing effect with initial delay
export function useTypingEffect(text, speed = 15, delay = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let typingTimeout;

    // Initial delay before typing starts
    const delayTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    // Start typing after the specified delay
    if (isTyping) {
      if (text.length > displayedText.length) {
        typingTimeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, speed);
      }
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(delayTimeout);
    };
  }, [text, displayedText, speed, delay, isTyping]);

  // Reset effect if text changes
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(false);
  }, [text]);

  return displayedText;
}
