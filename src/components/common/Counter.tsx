import React, { useEffect } from 'react';
import { motion, useSpring, useTransform, MotionValue } from 'motion/react';

interface NumberProps {
  key?: React.Key;
  mv: MotionValue<number>;
  number: number;
  height: number;
}

function CounterNumber({ mv, number, height }: NumberProps) {
  let y = useTransform(mv, (latest: number) => {
    let placeValue = latest % 10;
    let offset = (10 + number - placeValue) % 10;
    let memo = offset * height;
    if (offset > 5) {
      memo -= 10 * height;
    }
    return memo;
  });
  return (
    <motion.span 
      className="absolute inset-x-0 top-0 flex items-center justify-center leading-none select-none" 
      style={{ height, y }}
    >
      {number}
    </motion.span>
  );
}

function normalizeNearInteger(num: number): number {
  const nearest = Math.round(num);
  const tolerance = 1e-9 * Math.max(1, Math.abs(num));
  return Math.abs(num - nearest) < tolerance ? nearest : num;
}

function getValueRoundedToPlace(value: number, place: number): number {
  const scaled = value / place;
  return Math.floor(normalizeNearInteger(scaled));
}

interface DigitProps {
  key?: React.Key;
  place: number | string;
  value: number;
  height: number;
  digitStyle?: React.CSSProperties;
}

function Digit({ place, value, height, digitStyle }: DigitProps) {
  const isDecimal = place === '.';
  const valueRoundedToPlace = isDecimal ? 0 : getValueRoundedToPlace(value, typeof place === 'number' ? place : parseFloat(String(place)));
  const animatedValue = useSpring(0, { stiffness: 50, damping: 15 });

  useEffect(() => {
    if (!isDecimal) {
      animatedValue.set(valueRoundedToPlace);
    }
  }, [animatedValue, valueRoundedToPlace, isDecimal]);

  if (isDecimal) {
    return (
      <span 
        className="relative inline-flex flex-col overflow-hidden items-center justify-center select-none" 
        style={{ height, ...digitStyle, width: 'fit-content' }}
      >
        .
      </span>
    );
  }

  return (
    <span 
      className="relative inline-flex flex-col overflow-hidden items-center justify-center select-none" 
      style={{ height, width: '1ch', ...digitStyle }}
    >
      {Array.from({ length: 10 }, (_, i) => (
        <CounterNumber key={i} mv={animatedValue} number={i} height={height} />
      ))}
    </span>
  );
}

export interface CounterProps {
  value: number;
  fontSize?: number;
  padding?: number;
  places?: (number | string)[];
  gap?: number;
  borderRadius?: number;
  horizontalPadding?: number;
  textColor?: string;
  fontWeight?: string | number;
  containerStyle?: React.CSSProperties;
  counterStyle?: React.CSSProperties;
  digitStyle?: React.CSSProperties;
  gradientHeight?: number;
  gradientFrom?: string;
  gradientTo?: string;
  topGradientStyle?: React.CSSProperties;
  bottomGradientStyle?: React.CSSProperties;
}

export default function Counter({
  value,
  fontSize = 100,
  padding = 0,
  places = [...value.toString()].map((ch, i, a) => {
    if (ch === '.') {
      return '.';
    } else {
      return (
        10 **
        (a.indexOf('.') === -1 ? a.length - i - 1 : i < a.indexOf('.') ? a.indexOf('.') - i - 1 : -(i - a.indexOf('.')))
      );
    }
  }),
  gap = 8,
  borderRadius = 4,
  horizontalPadding = 8,
  textColor = 'inherit',
  fontWeight = 'inherit',
  containerStyle,
  counterStyle,
  digitStyle,
  gradientHeight = 16,
  gradientFrom = 'black',
  gradientTo = 'transparent',
  topGradientStyle,
  bottomGradientStyle
}: CounterProps) {
  const height = fontSize + padding;
  const defaultCounterStyle: React.CSSProperties = {
    fontSize,
    gap: gap,
    borderRadius: borderRadius,
    paddingLeft: horizontalPadding,
    paddingRight: horizontalPadding,
    color: textColor,
    fontWeight: fontWeight,
    direction: "ltr",
    fontVariantNumeric: "tabular-nums"
  };
  const defaultTopGradientStyle: React.CSSProperties = {
    height: gradientHeight,
    background: `linear-gradient(to bottom, ${gradientFrom}, ${gradientTo})`
  };
  const defaultBottomGradientStyle: React.CSSProperties = {
    height: gradientHeight,
    background: `linear-gradient(to top, ${gradientFrom}, ${gradientTo})`
  };
  return (
    <span className="inline-flex relative overflow-hidden align-middle leading-none select-none" style={containerStyle}>
      <span className="inline-flex items-center tabular-nums" style={{ ...defaultCounterStyle, ...counterStyle }}>
        {places.map((place, idx) => (
          <Digit key={`${place}-${idx}`} place={place} value={value} height={height} digitStyle={digitStyle} />
        ))}
      </span>
      <span className="absolute inset-0 pointer-events-none flex flex-col justify-between z-10">
        <span className="w-full" style={topGradientStyle ? topGradientStyle : defaultTopGradientStyle}></span>
        <span
          className="w-full"
          style={bottomGradientStyle ? bottomGradientStyle : defaultBottomGradientStyle}
        ></span>
      </span>
    </span>
  );
}
