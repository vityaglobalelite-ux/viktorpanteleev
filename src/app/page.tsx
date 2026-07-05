import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  alternateName: site.latinName,
  jobTitle: site.role,
  url: site.url,
};

const sections = [
  { id: "apps", label: "Приложения" },
  { id: "about", label: "Обо мне" },
  { id: "contact", label: "Контакты" },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className="sticky top-0 z-10 border-b border-black/[.08] bg-background/80 backdrop-blur dark:border-white/[.145]">
        <nav
          aria-label="Основная навигация"
          className="mx-auto flex h-14 w-full max-w-4xl items-center justify-between px-6"
        >
          <a href="#" className="font-semibold tracking-tight">
            {site.name}
          </a>
          <ul className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-6">
        <section className="flex flex-col items-start gap-6 py-24 sm:py-32">
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {site.name}
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {site.description}
          </p>
          <a
            href="#apps"
            className="flex h-12 items-center justify-center rounded-full bg-foreground px-6 font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            Смотреть приложения
          </a>
        </section>

        <section id="apps" className="scroll-mt-14 border-t border-black/[.08] py-16 dark:border-white/[.145]">
          <h2 className="text-2xl font-semibold tracking-tight">Приложения</h2>
          <p className="mt-4 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
            Здесь будут карточки проектов.
          </p>
        </section>

        <section id="about" className="scroll-mt-14 border-t border-black/[.08] py-16 dark:border-white/[.145]">
          <h2 className="text-2xl font-semibold tracking-tight">Обо мне</h2>
          <p className="mt-4 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
            Здесь будет рассказ о себе и опыте.
          </p>
        </section>

        <section id="contact" className="scroll-mt-14 border-t border-black/[.08] py-16 dark:border-white/[.145]">
          <h2 className="text-2xl font-semibold tracking-tight">Контакты</h2>
          <p className="mt-4 max-w-xl leading-7 text-zinc-600 dark:text-zinc-400">
            Здесь будут способы связи.
          </p>
        </section>
      </main>

      <footer className="border-t border-black/[.08] dark:border-white/[.145]">
        <div className="mx-auto w-full max-w-4xl px-6 py-8 text-sm text-zinc-600 dark:text-zinc-400">
          © {new Date().getFullYear()} {site.name}
        </div>
      </footer>
    </>
  );
}
