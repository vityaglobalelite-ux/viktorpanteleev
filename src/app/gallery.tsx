"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { screenSrc, type Project } from "@/lib/projects";

// Галерея карточки проекта: лента скринов скроллится перетаскиванием мышью
// (тач скроллит нативно), клик по скрину открывает лайтбокс со стрелками.
export function Gallery({ project: p }: { project: Project }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const drag = useRef({ active: false, moved: false, startX: 0, startLeft: 0 });
  const [shot, setShot] = useState<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (shot !== null && dialog && !dialog.open) dialog.showModal();
  }, [shot]);

  const show = (n: number) => setShot(((n % p.screens) + p.screens) % p.screens);
  const close = () => dialogRef.current?.close();

  const alt = (n: number) =>
    p.screens > 1
      ? `${p.name} — ${p.tagline}. Экран ${n + 1} из ${p.screens}`
      : `${p.name} — ${p.tagline}`;

  // Перетаскивание мышью. Порог в 6px отделяет клик от драга; на время драга
  // выключается scroll-snap (класс .dragging, см. globals.css).
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    drag.current = {
      active: true,
      moved: false,
      startX: e.clientX,
      startLeft: e.currentTarget.scrollLeft,
    };
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = scrollerRef.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      el.classList.add("dragging");
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.startLeft - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (el) {
      el.classList.remove("dragging");
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    }
    drag.current.active = false;
  };

  // Клик, которым завершился драг, не должен открывать лайтбокс.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      drag.current.moved = false;
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const navBtnCls =
    "absolute top-1/2 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-black/55 text-white backdrop-blur transition-colors hover:border-white/35";

  return (
    <>
      {p.wide ? (
        <button
          type="button"
          onClick={() => show(0)}
          className="block w-full"
        >
          <Image
            src={screenSrc(p, 1)}
            alt={alt(0)}
            width={p.width}
            height={p.height}
            draggable={false}
            className="pointer-events-none w-full select-none rounded-xl border border-line"
            sizes="(max-width: 1152px) 100vw, 1104px"
            loading="lazy"
          />
        </button>
      ) : (
        <div
          ref={scrollerRef}
          className="shots -mx-1 flex snap-x snap-mandatory gap-3 overflow-x-auto px-1 pb-2"
          aria-label={`Скриншоты приложения ${p.name}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onClickCapture}
        >
          {Array.from({ length: p.screens }, (_, n) => (
            <button
              key={n}
              type="button"
              onClick={() => show(n)}
              className="shrink-0 snap-start"
            >
              <Image
                src={screenSrc(p, n + 1)}
                alt={alt(n)}
                width={p.width}
                height={p.height}
                draggable={false}
                className="pointer-events-none h-[360px] w-auto select-none rounded-xl border border-line sm:h-[400px]"
                sizes="240px"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      <dialog
        ref={dialogRef}
        aria-label={`Скриншоты ${p.name}`}
        onClose={() => setShot(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        onKeyDown={(e) => {
          if (shot === null || p.screens < 2) return;
          if (e.key === "ArrowLeft") show(shot - 1);
          if (e.key === "ArrowRight") show(shot + 1);
        }}
        className="lightbox m-auto bg-transparent p-0 backdrop:bg-black/85"
      >
        {shot !== null && (
          <div className="relative">
            <Image
              key={shot}
              src={screenSrc(p, shot + 1)}
              alt={alt(shot)}
              width={p.width}
              height={p.height}
              draggable={false}
              className="h-auto max-h-[85vh] w-auto max-w-[min(92vw,69rem)] select-none rounded-xl border border-line bg-surface"
              sizes={p.wide ? "92vw" : "400px"}
            />

            <button
              type="button"
              onClick={close}
              aria-label="Закрыть просмотр"
              className="absolute right-3 top-3 inline-flex size-10 items-center justify-center rounded-full border border-line bg-black/55 text-white backdrop-blur transition-colors hover:border-white/35"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-4" aria-hidden>
                <path d="m6 6 12 12M18 6 6 18" />
              </svg>
            </button>

            {p.screens > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => show(shot - 1)}
                  aria-label="Предыдущий экран"
                  className={`${navBtnCls} left-3`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
                    <path d="m14 6-6 6 6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => show(shot + 1)}
                  aria-label="Следующий экран"
                  className={`${navBtnCls} right-3`}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
                    <path d="m10 6 6 6-6 6" />
                  </svg>
                </button>
                <p className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-line bg-black/55 px-3 py-1 text-xs text-white backdrop-blur">
                  {shot + 1} / {p.screens}
                </p>
              </>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
