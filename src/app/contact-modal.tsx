"use client";

import { useRef, useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "success" | "error";

const inputCls =
  "h-12 w-full rounded-xl border border-line bg-white/[0.04] px-4 text-foreground outline-none transition-colors placeholder:text-muted/50 focus:border-accent/60 focus:ring-2 focus:ring-accent/20";

// Кнопка «Связаться» + модалка заявки. Запись уходит в Firestore (см.
// src/lib/firebase.ts), SDK подгружается лениво только при отправке.
export function ContactModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const open = () => {
    setStatus("idle");
    setError("");
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();
    if (!name || !contact) return;

    setStatus("sending");
    setError("");
    try {
      const { submitLead } = await import("@/lib/firebase");
      await submitLead({ name, contact });
      form.reset();
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error && err.message === "firebase-not-configured"
          ? "Форма ещё не подключена. Напишите мне на почту — адрес ниже."
          : "Не получилось отправить. Попробуйте ещё раз или напишите на почту.",
      );
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="inline-flex h-12 items-center gap-2.5 rounded-full bg-accent-strong px-6 font-medium text-white shadow-[0_0_28px_rgba(229,35,46,0.35)] transition-colors hover:bg-accent"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
          <path d="M21 11.5a8.5 8.5 0 0 1-8.5 8.5c-1.53 0-2.98-.4-4.23-1.11L3 20l1.11-5.27A8.5 8.5 0 1 1 21 11.5Z" />
        </svg>
        Связаться
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="lead-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="modal m-auto w-[min(92vw,26rem)] rounded-2xl border border-line bg-surface p-0 text-left text-foreground shadow-[0_24px_80px_rgba(0,0,0,0.6)] backdrop:bg-black/70"
      >
        <div className="relative p-6 sm:p-7">
          <button
            type="button"
            onClick={close}
            aria-label="Закрыть окно"
            className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-line text-muted transition-colors hover:border-white/25 hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="size-4" aria-hidden>
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>

          {status === "success" ? (
            <div className="flex flex-col items-center py-6 text-center">
              <div className="mb-5 inline-flex size-14 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-7" aria-hidden>
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </div>
              <h2 id="lead-title" className="font-display text-xl font-semibold tracking-tight">
                Заявка отправлена
              </h2>
              <p className="mt-3 leading-7 text-muted">
                Спасибо! Свяжусь с вами в ближайшее время — обычно отвечаю в
                течение дня.
              </p>
              <button
                type="button"
                onClick={close}
                className="mt-6 inline-flex h-11 items-center rounded-full border border-line bg-white/[0.04] px-6 font-medium transition-colors hover:border-white/25"
              >
                Закрыть
              </button>
            </div>
          ) : (
            <>
              <h2 id="lead-title" className="font-display text-xl font-semibold tracking-tight">
                Оставить заявку
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted">
                Имя и любой удобный контакт — этого достаточно, остальное
                обсудим лично.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-sm text-muted">
                    Ваше имя
                  </span>
                  <input
                    name="name"
                    required
                    maxLength={80}
                    autoComplete="name"
                    placeholder="Как к вам обращаться"
                    className={inputCls}
                  />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm text-muted">
                    Телефон или ник в Telegram / MAX
                  </span>
                  <input
                    name="contact"
                    required
                    maxLength={80}
                    placeholder="+7 900 000-00-00 или @nickname"
                    className={inputCls}
                  />
                </label>

                {status === "error" && (
                  <p role="alert" className="text-sm leading-6 text-accent">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex h-12 w-full items-center justify-center rounded-full bg-accent-strong font-medium text-white transition-colors hover:bg-accent disabled:cursor-default disabled:opacity-60"
                >
                  {status === "sending" ? "Отправляю…" : "Отправить заявку"}
                </button>

                <p className="text-xs leading-5 text-muted/80">
                  Нажимая «Отправить заявку», вы соглашаетесь на обработку
                  персональных данных. Никакого спама — свяжусь один раз по
                  делу.
                </p>
              </form>
            </>
          )}

          <p className="mt-5 border-t border-line pt-4 text-xs leading-5 text-muted">
            Если удобнее почта:{" "}
            <a
              href={`mailto:${site.links.email}`}
              className="text-foreground underline decoration-accent/60 underline-offset-4 hover:decoration-accent"
            >
              {site.links.email}
            </a>
          </p>
        </div>
      </dialog>
    </>
  );
}
