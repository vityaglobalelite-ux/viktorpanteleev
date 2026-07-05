"use client";

import { useRef } from "react";

type GlowCardProps = {
  children: React.ReactNode;
  className?: string;
};

// Карточка услуги: за курсором следует «линза» из точек и мягкое красное
// свечение. Позиция курсора уходит в CSS-переменные, отрисовка — .glow-card
// в globals.css. На тач-устройствах эффект выключен через @media (hover).
export function GlowCard({ children, className = "" }: GlowCardProps) {
  const ref = useRef<HTMLElement>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <article
      ref={ref}
      onPointerMove={onPointerMove}
      className={`glow-card ${className}`}
    >
      <div className="relative z-[1]">{children}</div>
    </article>
  );
}
