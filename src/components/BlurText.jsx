import React, { useEffect, useRef, useState } from "react";

export default function BlurText({
  text = "",
  delay = 70,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete,
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  const elements = animateBy === "words" ? text.split(" ") : [...text];

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.disconnect();
      }
    }, { threshold, rootMargin });

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!inView || !onAnimationComplete) return;
    const timer = window.setTimeout(
      onAnimationComplete,
      elements.length * delay + 500
    );
    return () => window.clearTimeout(timer);
  }, [inView, delay, elements.length, onAnimationComplete]);

  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {elements.map((segment, index) => (
        <span
          key={index}
          className={`northstar-blur-word ${inView ? "is-visible" : ""} ${direction === "bottom" ? "from-bottom" : ""}`}
          style={{ transitionDelay: `${index * delay}ms` }}
        >
          {segment}{animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
