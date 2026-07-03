"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: "start" | "end" | "center";
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: "hover" | "view" | "click";
}

export default function DecryptedText({
  text,
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = "start",
  useOriginalCharsOnly = false,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+",
  className = "",
  parentClassName = "",
  encryptedClassName = "",
  animateOn = "view",
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const [revealedIndices, setRevealedIndices] = useState<Set<number>>(new Set());
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(animateOn !== "click");

  const containerRef = useRef<HTMLSpanElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const availableChars = useMemo(() => {
    return useOriginalCharsOnly
      ? Array.from(new Set(text.split(""))).filter((char) => char !== " ")
      : characters.split("");
  }, [useOriginalCharsOnly, text, characters]);

  const shuffleText = useCallback(
    (originalText: string, currentRevealed: Set<number>) => {
      return originalText
        .split("")
        .map((char, i) => {
          if (char === " ") return " ";
          if (currentRevealed.has(i)) return originalText[i];
          return availableChars[Math.floor(Math.random() * availableChars.length)];
        })
        .join("");
    },
    [availableChars]
  );

  const triggerDecrypt = useCallback(() => {
    if (sequential) {
      setRevealedIndices(new Set());
    } else {
      setRevealedIndices(new Set());
    }
    setIsAnimating(true);
  }, [sequential]);

  useEffect(() => {
    if (!isAnimating) return;

    let currentIteration = 0;

    const getNextIndex = (revealedSet: Set<number>) => {
      const textLength = text.length;
      switch (revealDirection) {
        case "start":
          return revealedSet.size;
        case "end":
          return textLength - 1 - revealedSet.size;
        case "center": {
          const middle = Math.floor(textLength / 2);
          const offset = Math.floor(revealedSet.size / 2);
          const nextIndex =
            revealedSet.size % 2 === 0 ? middle + offset : middle - offset - 1;
          if (nextIndex >= 0 && nextIndex < textLength && !revealedSet.has(nextIndex)) {
            return nextIndex;
          }
          for (let i = 0; i < textLength; i++) {
            if (!revealedSet.has(i)) return i;
          }
          return 0;
        }
        default:
          return revealedSet.size;
      }
    };

    intervalRef.current = setInterval(() => {
      setRevealedIndices((prevRevealed) => {
        if (sequential) {
          if (prevRevealed.size < text.length) {
            const nextIndex = getNextIndex(prevRevealed);
            const newRevealed = new Set(prevRevealed);
            newRevealed.add(nextIndex);
            setDisplayText(shuffleText(text, newRevealed));
            return newRevealed;
          } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsAnimating(false);
            setIsDecrypted(true);
            return prevRevealed;
          }
        } else {
          setDisplayText(shuffleText(text, prevRevealed));
          currentIteration++;
          if (currentIteration >= maxIterations) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            setIsAnimating(false);
            setDisplayText(text);
            setIsDecrypted(true);
          }
          return prevRevealed;
        }
      });
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isAnimating, text, speed, maxIterations, sequential, revealDirection, shuffleText]);

  // View Observer
  useEffect(() => {
    if (animateOn !== "view") return;

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          triggerDecrypt();
          setHasAnimated(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    });

    const currentRef = containerRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [animateOn, hasAnimated, triggerDecrypt]);

  useEffect(() => {
    if (animateOn === "click") {
      const emptySet = new Set<number>();
      setRevealedIndices(emptySet);
      setDisplayText(shuffleText(text, emptySet));
      setIsDecrypted(false);
    } else {
      setDisplayText(text);
      setIsDecrypted(true);
    }
    setRevealedIndices(new Set());
  }, [animateOn, text, shuffleText]);

  const triggerHoverDecrypt = useCallback(() => {
    if (isAnimating) return;
    setRevealedIndices(new Set());
    setIsDecrypted(false);
    setDisplayText(text);
    setIsAnimating(true);
  }, [isAnimating, text]);

  const resetToPlainText = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsAnimating(false);
    setRevealedIndices(new Set());
    setDisplayText(text);
    setIsDecrypted(true);
  }, [text]);

  const animateProps =
    animateOn === "hover"
      ? { onMouseEnter: triggerHoverDecrypt, onMouseLeave: resetToPlainText }
      : {};

  return (
    <span
      className={parentClassName}
      ref={containerRef}
      style={{ display: "inline-block", whiteSpace: "pre-wrap" }}
      {...animateProps}
    >
      <span className="sr-only">{displayText}</span>
      <span aria-hidden="true">
        {displayText.split("").map((char, index) => {
          const isRevealedOrDone =
            revealedIndices.has(index) || (!isAnimating && isDecrypted);
          return (
            <span key={index} className={isRevealedOrDone ? className : encryptedClassName}>
              {char}
            </span>
          );
        })}
      </span>
    </span>
  );
}
