'use client';

import React, { useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: "slowDown" | "speedUp" | "pause" | "goBonkers";
  className?: string;
}

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = "speedUp",
  className = "",
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const [currentRotation, setCurrentRotation] = useState(0);

  const handleHoverStart = () => {
    if (!onHover) return;

    let duration = spinDuration;

    switch (onHover) {
      case "slowDown":
        duration = spinDuration * 2;
        break;
      case "speedUp":
        duration = spinDuration / 4;
        break;
      case "pause":
        controls.stop();
        return;
      case "goBonkers":
        duration = spinDuration / 20;
        break;
      default:
        break;
    }

    controls.start({
      rotate: currentRotation + 360,
      scale: onHover === "goBonkers" ? 0.8 : 1,
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  const handleHoverEnd = () => {
    controls.start({
      rotate: currentRotation + 360,
      scale: 1,
      transition: {
        duration: spinDuration,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  return (
    <motion.div
      initial={{ rotate: 0 }}
      animate={controls}
      onUpdate={(latest) => {
        if (latest.rotate !== undefined) {
          setCurrentRotation(Number(latest.rotate));
        }
      }}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      className={`mx-auto rounded-full w-[200px] h-[200px] text-white font-black text-center cursor-pointer relative ${className}`}
    >
      {letters.map((letter, i) => {
        const rotation = (360 / letters.length) * i;
        const radians = (Math.PI * 2 * i) / letters.length;
        const radius = 80; // Jarak antar huruf
        const x = radius * Math.cos(radians);
        const y = radius * Math.sin(radians);
        const transform = `rotateZ(${rotation}deg) translate(${x}px, ${y}px)`;

        return (
          <span
            key={i}
            className="absolute inline-block text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
