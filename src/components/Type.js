import { useState, useEffect } from 'react';

const TypingText = ({ children, speed = 50, delay = 0 }) => {
  const [content, setContent] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const text = children instanceof Array ? children.join('') : children;
    let typingTimeout;

    // Start typing effect after delay
    const delayTimeout = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    if (isTyping && content.length < text.length) {
      typingTimeout = setTimeout(() => {
        setContent(text.slice(0, content.length + 1));
      }, speed);
    }

    return () => {
      clearTimeout(typingTimeout);
      clearTimeout(delayTimeout);
    };
  }, [children, content, speed, delay, isTyping]);

  return <>{content}</>;
};

export default TypingText;
