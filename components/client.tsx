"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { getContent, type Locale } from "@/lib/content";
import { BrandLogo } from "./BrandLogo";

export function RevealOnScroll({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const copy = getContent(locale).nav;

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <a href="#content" className="focus-ring fixed left-4 top-3 z-50 -translate-y-20 rounded-[var(--radius-sm)] bg-[var(--ink)] px-4 py-2.5 text-sm font-semibold text-white transition-transform focus:translate-y-0">
        {copy.skip}
      </a>
      <header className="sticky top-0 z-40 border-b border-[var(--line)]/80 bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[4.5rem] w-full max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-10">
        <a href="#top" className="focus-ring flex items-center rounded-md lg:justify-self-start" onClick={() => setOpen(false)}>
          <BrandLogo variant="full" size="sm" />
        </a>
        <nav className="hidden items-center gap-8 lg:flex" aria-label={copy.primaryLabel}>
          {copy.links.map(([label, href]) => (
            <Link key={href} href={href} className="focus-ring rounded-sm text-[15px] font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)]">{label}</Link>
          ))}
        </nav>
        <div className="hidden lg:block lg:justify-self-end">
          <a href="#feasibility-form" className="focus-ring inline-flex min-h-10 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--accent)] bg-[var(--accent)] px-5 text-sm font-semibold text-white shadow-[0_2px_8px_rgba(13,148,136,0.18)] transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-[var(--accent-strong)] active:translate-y-px">
            {copy.cta}
          </a>
        </div>
        <button type="button" className="focus-ring flex size-10 items-center justify-center rounded-[var(--radius-sm)] border bg-white text-[var(--ink)] lg:hidden" aria-label={open ? copy.close : copy.open} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={19} strokeWidth={1.75} /> : <Menu size={19} strokeWidth={1.75} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden border-t bg-white lg:hidden">
            <nav className="mx-auto flex max-w-[1320px] flex-col px-5 py-4 sm:px-8" aria-label={copy.primaryLabel}>
              {copy.links.map(([label, href], index) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="grid grid-cols-[2rem_1fr] items-center border-b py-3.5 text-sm font-semibold text-[var(--ink)] last:border-0">
                  <span className="font-[family-name:var(--font-mono)] text-[13px] font-medium text-[var(--accent-strong)]">0{index + 1}</span>{label}
                </Link>
              ))}
              <a href="#feasibility-form" onClick={() => setOpen(false)} className="focus-ring mt-4 inline-flex min-h-12 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent)] px-5 text-sm font-semibold text-white">{copy.cta}</a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </>
  );
}

export function FloatingVisual({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

export function FAQItem({ index, question, answer }: { index: string; question: string; answer: string }) {
  const [open, setOpen] = useState(index === "01" || index === "02");
  return (
    <div className={`border-t border-[var(--line-strong)] transition-colors last:border-b ${open ? "bg-white" : ""}`}>
      <button
        type="button"
        className="focus-ring grid w-full grid-cols-[2rem_1fr_auto] items-center gap-3 py-6 pr-1 text-left sm:grid-cols-[3rem_1fr_auto] sm:gap-5"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="font-[family-name:var(--font-mono)] text-[13px] font-medium text-[var(--accent-strong)]">{index}</span>
        <span className="text-base font-semibold tracking-[-0.02em] sm:text-lg">{question}</span>
        <ChevronDown className={`shrink-0 text-[var(--ink-faint)] transition-transform duration-300 ${open ? "rotate-180 text-[var(--accent)]" : ""}`} size={18} strokeWidth={1.75} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
            <p className="max-w-3xl pb-7 pl-11 pr-8 text-[15px] leading-7 text-[var(--ink-muted)] sm:pl-[4.25rem] sm:pr-10">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
