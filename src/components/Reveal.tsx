"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "down" | "left" | "right" | "fade" | "scale";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;          // ms
  duration?: number;       // ms
  direction?: Direction;
  distance?: number;       // px
  threshold?: number;      // 0–1
  style?: React.CSSProperties;
  className?: string;
}

export function Reveal({
  children,
  delay = 0,
  duration = 600,
  direction = "up",
  distance = 36,
  threshold = 0.12,
  style,
  className,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const hidden: React.CSSProperties = {
    opacity: 0,
    transform:
      direction === "up"    ? `translateY(${distance}px)`  :
      direction === "down"  ? `translateY(-${distance}px)` :
      direction === "left"  ? `translateX(${distance}px)`  :
      direction === "right" ? `translateX(-${distance}px)` :
      direction === "scale" ? "scale(0.92)"                :
      "none",
  };

  const shown: React.CSSProperties = {
    opacity: 1,
    transform: "translate(0,0) scale(1)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transition: `opacity ${duration}ms ease, transform ${duration}ms ease`,
        transitionDelay: `${delay}ms`,
        ...(visible ? shown : hidden),
      }}
    >
      {children}
    </div>
  );
}
