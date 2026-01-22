"use client";

import { motion, useInView, useAnimation, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type Props = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  fullWidth?: boolean;
  once?: boolean;
};

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.8,
  className = "",
  direction = "up",
  fullWidth = false,
  once = true,
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px -10% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      x: direction === "left" ? 40 : direction === "right" ? -40 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.22, 1, 0.36, 1], // Custom easing for premium feel
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={cn(fullWidth ? "w-full" : "w-auto", className)}
    >
      {children}
    </motion.div>
  );
}
