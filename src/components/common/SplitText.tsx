import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: 'chars' | 'words' | 'lines';
  from?: Record<string, number | string>;
  to?: Record<string, number | string>;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 50,
  duration = 1.25,
  ease = 'power3.out',
  splitType = 'chars',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  tag: Tag = 'p',
  onLetterAnimationComplete
}) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const animationCompletedRef = useRef(false);
  const onCompleteRef = useRef(onLetterAnimationComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onLetterAnimationComplete;
  }, [onLetterAnimationComplete]);

  useEffect(() => {
    if (typeof document !== 'undefined' && document.fonts) {
      if (document.fonts.status === 'loaded') {
        setFontsLoaded(true);
      } else {
        document.fonts.ready.then(() => setFontsLoaded(true));
      }
    } else {
      setFontsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current || !text || !fontsLoaded) return;
    if (animationCompletedRef.current) return;

    const el = containerRef.current;
    let targets: Element[] = [];

    if (splitType === 'chars') {
      targets = Array.from(el.querySelectorAll('.split-char'));
    } else if (splitType === 'words') {
      targets = Array.from(el.querySelectorAll('.split-word'));
    } else {
      targets = Array.from(el.querySelectorAll('.split-line, .split-word, .split-char'));
    }

    if (targets.length === 0) {
      targets = [el];
    }

    const startPct = (1 - threshold) * 100;
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(rootMargin);
    const marginValue = marginMatch ? parseFloat(marginMatch[1]) : 0;
    const marginUnit = marginMatch ? marginMatch[2] || 'px' : 'px';
    const sign =
      marginValue === 0
        ? ''
        : marginValue < 0
          ? `-=${Math.abs(marginValue)}${marginUnit}`
          : `+=${marginValue}${marginUnit}`;
    const start = `top ${startPct}%${sign}`;

    const tween = gsap.fromTo(
      targets,
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        scrollTrigger: {
          trigger: el,
          start,
          once: true,
          fastScrollEnd: true,
          anticipatePin: 0.4
        },
        onComplete: () => {
          animationCompletedRef.current = true;
          onCompleteRef.current?.();
        },
        willChange: 'transform, opacity',
        force3D: true
      }
    );

    return () => {
      tween.kill();
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
    };
  }, [text, delay, duration, ease, splitType, JSON.stringify(from), JSON.stringify(to), threshold, rootMargin, fontsLoaded]);

  // Render elements DOM structure based on splitType
  const words = text.split(' ');

  const style: React.CSSProperties = {
    textAlign,
    overflow: 'hidden',
    display: 'inline-block',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    willChange: 'transform, opacity'
  };

  return (
    <Tag
      ref={containerRef as any}
      style={style}
      className={`split-parent ${className}`}
    >
      {words.map((word, wordIdx) => {
        if (splitType === 'chars') {
          return (
            <span
              key={wordIdx}
              className="split-word"
              style={{ display: 'inline-block', whiteSpace: 'nowrap' }}
            >
              {Array.from(word).map((char, charIdx) => (
                <span
                  key={charIdx}
                  className="split-char"
                  style={{ display: 'inline-block', willChange: 'transform, opacity' }}
                >
                  {char}
                </span>
              ))}
              {wordIdx < words.length - 1 && (
                <span style={{ display: 'inline-block' }}>&nbsp;</span>
              )}
            </span>
          );
        } else if (splitType === 'words') {
          return (
            <React.Fragment key={wordIdx}>
              <span
                className="split-word"
                style={{ display: 'inline-block', willChange: 'transform, opacity' }}
              >
                {word}
              </span>
              {wordIdx < words.length - 1 && (
                <span style={{ display: 'inline-block' }}>&nbsp;</span>
              )}
            </React.Fragment>
          );
        } else {
          return (
            <React.Fragment key={wordIdx}>
              <span className="split-line" style={{ display: 'inline-block' }}>
                {word}
              </span>
              {wordIdx < words.length - 1 && ' '}
            </React.Fragment>
          );
        }
      })}
    </Tag>
  );
};

export default SplitText;
