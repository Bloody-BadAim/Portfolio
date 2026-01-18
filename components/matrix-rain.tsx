"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

type MatrixRainProps = {
  className?: string;
};

export function MatrixRain({ className }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let columns: number[] = [];
    let width = 0;
    let height = 0;
    let density = 14;
    let isRunning = true;
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789";

    const setup = () => {
      const scale = window.devicePixelRatio || 1;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * scale);
      canvas.height = Math.floor(height * scale);
      context.setTransform(scale, 0, 0, scale, 0, 0);
      density = width < 640 ? 18 : 14;
      const columnCount = Math.floor(width / density);
      columns = new Array<number>(columnCount).fill(1);
    };

    const draw = () => {
      if (!isRunning) return;
      context.fillStyle = "rgba(10, 15, 20, 0.08)";
      context.fillRect(0, 0, width, height);
      context.fillStyle = "rgba(45, 212, 191, 0.35)";
      context.font = "12px monospace";

      columns.forEach((y, index) => {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        const x = index * density;
        context.fillText(text, x, y * density);
        if (y * density > height && Math.random() > 0.975) {
          columns[index] = 0;
        }
        columns[index] += 1;
      });
      animationFrame = requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      if (document.visibilityState === "hidden") {
        isRunning = false;
        cancelAnimationFrame(animationFrame);
      } else if (!isRunning) {
        isRunning = true;
        animationFrame = requestAnimationFrame(draw);
      }
    };

    setup();
    const resizeObserver = new ResizeObserver(setup);
    resizeObserver.observe(canvas);
    animationFrame = requestAnimationFrame(draw);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [shouldReduceMotion]);

  return <canvas ref={canvasRef} className={className} />;
}
