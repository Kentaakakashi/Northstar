import { motion } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(step => Object.keys(step))]);
  return Object.fromEntries([...keys].map(key => [key, [from[key], ...steps.map(step => step[key])]]));
};

export default function BlurText({
  text = "",
  delay = 70,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35
}) {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(ref.current);
      }
    }, { threshold, rootMargin });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(() => (
    direction === "top"
      ? { filter: "blur(10px)", opacity: 0, y: -28 }
      : { filter: "blur(10px)", opacity: 0, y: 28 }
  ), [direction]);

  const defaultTo = useMemo(() => [
    { filter: "blur(4px)", opacity: 0.55, y: direction === "top" ? 3 : -3 },
    { filter: "blur(0px)", opacity: 1, y: 0 }
  ], [direction]);

  const from = animationFrom ?? defaultFrom;
  const to = animationTo ?? defaultTo;
  const stepCount = to.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => stepCount === 1 ? 0 : i / (stepCount - 1));

  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {elements.map((segment, index) => {
        const keyframes = buildKeyframes(from, to);
        return (
          <motion.span
            key={index}
            className="northstar-blur-word"
            initial={from}
            animate={inView ? keyframes : from}
            transition={{ duration: totalDuration, times, delay: (index * delay) / 1000, ease: easing }}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment}{animateBy === "words" && index < elements.length - 1 ? "\u00A0" : ""}
          </motion.span>
        );
      })}
    </span>
  );
}
