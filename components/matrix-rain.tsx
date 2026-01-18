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

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
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

      if (width <= 0 || height <= 0) return;

      canvas.width = Math.floor(width * scale);
      canvas.height = Math.floor(height * scale);

      ctx.setTransform(scale, 0, 0, scale, 0, 0);

      density = width < 640 ? 18 : 14;
      const columnCount = Math.max(1, Math.floor(width / density));
      columns = new Array<number>(columnCount).fill(1);

      ctx.font = "12px monospace";
      ctx.textBaseline = "top";
    };

    const draw = () => {
      if (!isRunning) return;

      // Trail fade
      ctx.fillStyle = "rgba(10, 15, 20, 0.08)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "rgba(45, 212, 191, 0.35)";

      for (let i = 0; i < columns.length; i++) {
        const y = columns[i];
        const x = i * density;
        const ch = chars.charAt((Math.random() * chars.length) | 0);

        ctx.fillText(ch, x, y * density);

        if (y * density > height && Math.random() > 0.975) columns[i] = 0;
        columns[i] = columns[i] + 1;
      }

      raf = requestAnimationFrame(draw);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        isRunning = false;
        cancelAnimationFrame(raf);
        return;
      }
      if (!isRunning) {
        isRunning = true;
        raf = requestAnimationFrame(draw);
      }
    };

    // Defer setup to avoid ResizeObserver loop edge cases
    const scheduleSetup = () => requestAnimationFrame(setup);

    scheduleSetup();
    const ro = new ResizeObserver(scheduleSetup);
    ro.observe(canvas);

    raf = requestAnimationFrame(draw);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("resize", scheduleSetup);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", scheduleSetup);
    };
  }, [shouldReduceMotion]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
