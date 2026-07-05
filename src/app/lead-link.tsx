"use client";

type LeadLinkProps = {
  className?: string;
  children: React.ReactNode;
};

// Ссылка «Обсудить проект»: сразу открывает модалку заявки (слушатель — в
// contact-modal.tsx), без прокрутки к контактам. Без JS остаётся обычным
// якорем на #contact.
export function LeadLink({ className, children }: LeadLinkProps) {
  return (
    <a
      href="#contact"
      className={className}
      onClick={(e) => {
        e.preventDefault();
        window.dispatchEvent(new Event("open-lead-modal"));
      }}
    >
      {children}
    </a>
  );
}
