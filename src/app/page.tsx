import type { Metadata } from "next";
import Image from "next/image";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { ContactModal } from "./contact-modal";
import { Gallery } from "./gallery";
import { GlowCard } from "./glow-card";
import { LeadLink } from "./lead-link";
import { Reveal } from "./reveal";

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
  description: site.description,
  url: site.url,
  email: `mailto:${site.links.email}`,
  knowsAbout: [
    "Разработка мобильных приложений",
    "Telegram Mini Apps",
    "MAX мини-аппы",
    "Разработка сайтов и лендингов",
    "Интеграция ИИ",
  ],
};

const sections = [
  { id: "services", label: "Услуги" },
  { id: "projects", label: "Проекты" },
  { id: "about", label: "Обо мне" },
  { id: "contact", label: "Контакты" },
];

const services = [
  {
    title: "Мобильные приложения",
    text: "iOS и Android — от прототипа до публикации в сторах. Интерфейс, пуши, платежи, аналитика.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden>
        <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
        <path d="M11 18.5h2" />
      </svg>
    ),
  },
  {
    title: "Telegram и MAX мини-аппы",
    text: "Сервисы внутри мессенджеров — запуск там, где уже есть аудитория. Каталоги, записи, оплаты, боты.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden>
        <path d="M21 4 3.6 10.8c-.8.3-.75 1.45.07 1.7l4.53 1.4 1.55 4.83c.25.78 1.3.87 1.68.15l2.02-3.83 4.6 3.28c.6.43 1.45.1 1.6-.63L21.9 5.1c.15-.75-.55-1.38-1.27-1.1Z" />
      </svg>
    ),
  },
  {
    title: "Сайты и лендинги",
    text: "Быстрые адаптивные сайты, которые хорошо читаются поисковиками и не разваливаются на телефоне.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3.5 9h17M3.5 15h17M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
      </svg>
    ),
  },
  {
    title: "Интеграция ИИ",
    text: "Чат-боты, умный поиск, генерация контента и автоматизация рутины на базе современных LLM.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-6" aria-hidden>
        <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
        <circle cx="12" cy="12" r="3.5" />
      </svg>
    ),
  },
];

const steps = [
  {
    title: "Знакомство",
    text: "Обсуждаем задачу и цели. Бесплатно и без обязательств — иногда честный ответ звучит как «вам это пока не нужно».",
  },
  {
    title: "План и оценка",
    text: "Фиксируем объём, сроки и стоимость письменно. Никаких скрытых пунктов и внезапных доплат в середине работы.",
  },
  {
    title: "Разработка",
    text: "Работаю итерациями и регулярно показываю прогресс — вы всегда видите, куда движется проект.",
  },
  {
    title: "Релиз и поддержка",
    text: "Публикация в сторах, передача исходников и доступов. После запуска не пропадаю — помогаю развивать продукт.",
  },
];

const values = [
  {
    title: "Сроки",
    text: "Называю реалистичные и держу их — лучше честная дата, чем красивая.",
  },
  {
    title: "Связь",
    text: "На связи в мессенджерах, отвечаю быстро и рассказываю о прогрессе сам, без напоминаний.",
  },
  {
    title: "Прозрачность",
    text: "Исходники, доступы и права — всегда у вас. Проект не «привязан» ко мне.",
  },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-4 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-accent">
      <span className="red-hairline inline-block h-px w-8" aria-hidden />
      {children}
    </p>
  );
}

export default function Home() {
  const years = new Date().getFullYear() - site.since;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="sticky top-0 z-20 border-b border-line bg-background/70 backdrop-blur-md">
        <nav
          aria-label="Основная навигация"
          className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6"
        >
          <a href="#" className="font-display text-sm font-bold tracking-tight">
            ВП<span className="text-accent">.</span>
          </a>
          <ul className="hidden items-center gap-7 text-sm text-muted sm:flex">
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
          <LeadLink className="inline-flex h-9 items-center rounded-full bg-accent-strong px-4 text-sm font-medium text-white transition-colors hover:bg-accent">
            Обсудить проект
          </LeadLink>
        </nav>
      </header>

      <main className="flex-1">
        {/* ------------------------------------------------ Hero */}
        <section className="relative overflow-hidden">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="bg-grid absolute inset-0" />
            <div className="red-beam absolute -top-1/4 right-[-20%] h-[150%] w-[80%] rotate-6 opacity-50 sm:right-[-5%] sm:w-[60%]" />
          </div>

          <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6 lg:pb-20">
            <div className="flex max-w-xl flex-col items-start">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.03] px-3.5 py-1.5 text-xs text-muted">
                <span className="relative flex size-2" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                Открыт к новым проектам
              </span>

              <h1 className="font-display text-3xl font-semibold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.6rem]">
                Приложения и сайты, которые{" "}
                <span className="bg-gradient-to-r from-accent to-[#ff7a81] bg-clip-text text-transparent">
                  доходят до релиза
                </span>
              </h1>

              {/* Фото на мобилке — сразу на первом экране, между заголовком
                  и текстом; текст мягко наезжает на затухающий низ фото. */}
              <div className="relative mx-auto mt-8 w-full max-w-56 lg:hidden">
                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 top-8 rounded-full bg-[radial-gradient(closest-side,rgba(229,35,46,0.32),transparent)] blur-2xl"
                />
                <Image
                  src="/images/viktor.png"
                  alt="Виктор Пантелеев — разработчик мобильных приложений и сайтов"
                  width={639}
                  height={934}
                  loading="eager"
                  fetchPriority="high"
                  className="relative w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)] [mask-image:linear-gradient(to_bottom,black_58%,transparent_94%)]"
                  sizes="(min-width: 1024px) 384px, 224px"
                />
              </div>

              <p className="relative z-[1] -mt-10 text-base leading-7 text-muted sm:text-lg sm:leading-8 lg:mt-6">
                Меня зовут Виктор Пантелеев. С {site.since} года разрабатываю
                мобильные приложения, Telegram и MAX мини-аппы, сайты и
                лендинги, подключаю ИИ. Берусь за проект целиком: от идеи и
                прототипа до публикации и поддержки.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <LeadLink className="inline-flex h-12 items-center rounded-full bg-accent-strong px-6 font-medium text-white shadow-[0_0_28px_rgba(229,35,46,0.35)] transition-colors hover:bg-accent">
                  Обсудить проект
                </LeadLink>
                <a
                  href="#projects"
                  className="inline-flex h-12 items-center rounded-full border border-line bg-white/[0.03] px-6 font-medium transition-colors hover:border-white/25"
                >
                  Смотреть работы
                </a>
              </div>

              <dl className="mt-12 grid w-full grid-cols-3 gap-4 border-t border-line pt-8">
                <div className="flex flex-col items-center text-center">
                  <dt className="order-last mt-1 text-xs leading-5 text-muted sm:text-sm">
                    сданных проектов
                  </dt>
                  <dd className="font-display text-2xl font-semibold sm:text-3xl">
                    {site.projectsDone}
                  </dd>
                </div>
                <div className="flex flex-col items-center text-center">
                  <dt className="order-last mt-1 text-xs leading-5 text-muted sm:text-sm">
                    лет в разработке
                  </dt>
                  <dd className="font-display text-2xl font-semibold sm:text-3xl">
                    {years}
                  </dd>
                </div>
                <div className="flex flex-col items-center text-center">
                  <dt className="order-last mt-1 text-xs leading-5 text-muted sm:text-sm">
                    проектов под ключ
                  </dt>
                  <dd className="font-display text-2xl font-semibold text-accent sm:text-3xl">
                    100%
                  </dd>
                </div>
              </dl>
            </div>

            <div className="relative mx-auto hidden w-full max-w-sm lg:-mb-20 lg:block lg:self-end">
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 top-12 rounded-full bg-[radial-gradient(closest-side,rgba(229,35,46,0.32),transparent)] blur-2xl"
              />
              <Image
                src="/images/viktor.png"
                alt="Виктор Пантелеев — разработчик мобильных приложений и сайтов"
                width={639}
                height={934}
                loading="eager"
                fetchPriority="high"
                className="relative w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.5)] [mask-image:linear-gradient(to_bottom,black_72%,transparent_98%)]"
                sizes="(min-width: 1024px) 384px, 224px"
              />
              <div className="absolute left-0 top-24 hidden rounded-xl border border-line bg-surface/85 px-4 py-2.5 shadow-lg backdrop-blur sm:-left-6 sm:block">
                <p className="font-display text-lg font-semibold leading-none">
                  {site.projectsDone}
                </p>
                <p className="mt-1 text-xs text-muted">сданных проектов</p>
              </div>
              <div className="absolute bottom-16 right-0 hidden rounded-xl border border-line bg-surface/85 px-4 py-2.5 shadow-lg backdrop-blur sm:-right-4 sm:block">
                <p className="font-display text-lg font-semibold leading-none">
                  с {site.since}
                </p>
                <p className="mt-1 text-xs text-muted">года в разработке</p>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ Услуги */}
        <section
          id="services"
          aria-labelledby="services-title"
          className="scroll-mt-16 border-t border-line"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <SectionLabel>Чем могу помочь</SectionLabel>
              <h2
                id="services-title"
                className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Услуги
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted">
                Один человек на всех этапах: обсуждаете задачу с тем же, кто
                пишет код. Без испорченного телефона между менеджером и
                разработчиком.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {services.map((s, i) => (
                <Reveal key={s.title} delay={i * 80}>
                  <GlowCard className="group h-full rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/40 sm:p-7">
                    <div className="mb-5 inline-flex rounded-xl border border-line bg-white/[0.03] p-3 text-accent transition-colors group-hover:border-accent/40">
                      {s.icon}
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 leading-7 text-muted">{s.text}</p>
                  </GlowCard>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ Проекты */}
        <section
          id="projects"
          aria-labelledby="projects-title"
          className="scroll-mt-16 border-t border-line"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <SectionLabel>Портфолио</SectionLabel>
              <h2
                id="projects-title"
                className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Проекты
              </h2>
              <p className="mt-4 max-w-2xl leading-7 text-muted">
                Часть работ под NDA, поэтому здесь — то, что можно показать.
                Скрины листаются, а по клику открываются в полном размере.
              </p>
            </Reveal>

            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {projects.map((p, i) => (
                <Reveal
                  key={p.slug}
                  delay={(i % 2) * 80}
                  className={p.wide ? "sm:col-span-2" : ""}
                >
                  <article className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-4 transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_0_40px_rgba(229,35,46,0.12)] sm:p-5">
                    <Gallery project={p} />

                    <div className="flex flex-1 flex-col p-2 pt-5">
                      <h3 className="font-display text-lg font-semibold tracking-tight">
                        {p.name}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-accent">
                        {p.tagline}
                      </p>
                      <p className="mt-3 leading-7 text-muted">{p.description}</p>
                      <ul className="mt-auto flex flex-wrap gap-2 pt-5">
                        {p.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-line bg-white/[0.03] px-3 py-1 text-xs text-muted"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}

              <Reveal delay={80}>
                <article className="flex h-full min-h-72 flex-col items-start justify-center rounded-2xl border border-accent/30 bg-gradient-to-br from-accent-deep/40 via-surface to-surface p-8">
                  <h3 className="font-display text-xl font-semibold tracking-tight">
                    Здесь может быть ваш проект
                  </h3>
                  <p className="mt-3 max-w-md leading-7 text-muted">
                    Расскажите об идее в паре предложений — предложу решение,
                    реалистичные сроки и оценку. Это бесплатно и ни к чему не
                    обязывает.
                  </p>
                  <LeadLink className="mt-6 inline-flex h-11 items-center rounded-full bg-accent-strong px-5 font-medium text-white transition-colors hover:bg-accent">
                    Обсудить идею
                  </LeadLink>
                </article>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ Как я работаю */}
        <section
          id="process"
          aria-labelledby="process-title"
          className="scroll-mt-16 border-t border-line"
        >
          <div className="mx-auto w-full max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <SectionLabel>Просто и предсказуемо</SectionLabel>
              <h2
                id="process-title"
                className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Как проходит работа
              </h2>
            </Reveal>

            <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <Reveal key={s.title} delay={i * 80} className="h-full">
                  <li className="h-full rounded-2xl border border-line bg-surface p-6">
                    <p
                      className="font-display text-3xl font-semibold text-accent/90"
                      aria-hidden
                    >
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-4 font-semibold tracking-tight">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{s.text}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ------------------------------------------------ Обо мне */}
        <section
          id="about"
          aria-labelledby="about-title"
          className="scroll-mt-16 border-t border-line"
        >
          <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_0.9fr]">
            <Reveal>
              <SectionLabel>Кто делает</SectionLabel>
              <h2
                id="about-title"
                className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                Обо мне
              </h2>
              <div className="mt-6 space-y-4 leading-8 text-muted">
                <p>
                  Разрабатываю с {site.since} года: начинал с сайтов и
                  лендингов, сейчас основной фокус — мобильные приложения и
                  мини-аппы для Telegram и MAX. За это время сдал больше
                  30 проектов: бронирование, маркетплейсы, фудшеринг, такси,
                  сервисы онлайн-записи.
                </p>
                <p>
                  Мне важно, чтобы продукт решал задачу бизнеса, а не просто
                  красиво выглядел. Поэтому вникаю в то, как вы зарабатываете,
                  предлагаю варианты проще и дешевле, если они есть, и честно
                  говорю о рисках и сроках до старта, а не после.
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <ul className="grid h-full content-center gap-4">
                {values.map((v) => (
                  <li
                    key={v.title}
                    className="rounded-2xl border border-line bg-surface p-6"
                  >
                    <h3 className="flex items-center gap-3 font-semibold tracking-tight">
                      <span
                        className="inline-block size-1.5 rounded-full bg-accent"
                        aria-hidden
                      />
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">{v.text}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------ Контакты */}
        <section
          id="contact"
          aria-labelledby="contact-title"
          className="relative scroll-mt-16 overflow-hidden border-t border-line"
        >
          <div
            aria-hidden
            className="red-beam pointer-events-none absolute -bottom-1/2 left-[-20%] h-[160%] w-[70%] -rotate-12 opacity-40"
          />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center sm:py-32">
            <Reveal className="flex flex-col items-center">
              <SectionLabel>Контакты</SectionLabel>
              <h2
                id="contact-title"
                className="max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
              >
                Есть идея? Давайте обсудим
              </h2>
              <p className="mt-5 max-w-xl leading-8 text-muted">
                Расскажите о задаче в паре предложений — предложу подход,
                реалистичные сроки и оценку. Бесплатно и ни к чему не обязывает.
              </p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <ContactModal />
                {site.links.telegram && (
                  <a
                    href={site.links.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center gap-2.5 rounded-full border border-line bg-white/[0.03] px-6 font-medium transition-colors hover:border-white/25"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="size-5" aria-hidden>
                      <path d="M21 4 3.6 10.8c-.8.3-.75 1.45.07 1.7l4.53 1.4 1.55 4.83c.25.78 1.3.87 1.68.15l2.02-3.83 4.6 3.28c.6.43 1.45.1 1.6-.63L21.9 5.1c.15-.75-.55-1.38-1.27-1.1Z" />
                    </svg>
                    Telegram
                  </a>
                )}
              </div>
              <p className="mt-6 text-sm text-muted">
                или напрямую:{" "}
                <a
                  href={`mailto:${site.links.email}`}
                  className="text-foreground underline decoration-accent/60 underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {site.links.email}
                </a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {site.name} · {site.role}
          </p>
          <ul className="flex items-center gap-5">
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
        </div>
      </footer>
    </>
  );
}
