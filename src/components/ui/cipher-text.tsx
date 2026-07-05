'use client';
import { useEffect, useState } from 'react';

interface CipherTextProps {
  text: string;
  speed?: number;
  delay?: number;
}

export function CipherText({ text, speed = 25, delay = 0 }: CipherTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let interval: NodeJS.Timeout;
    
    const startAnimation = () => {
      let frame = 0;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*';
      const target = text;
      const length = target.length;

      interval = setInterval(() => {
        frame++;
        const result = target
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < frame / 2) return char; // resolved
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        setDisplayText(result);

        if (frame >= length * 2) {
          clearInterval(interval);
          setDisplayText(target);
        }
      }, speed);
    };

    if (delay > 0) {
      timer = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [text, speed, delay]);

  return <span>{displayText}</span>;
}
