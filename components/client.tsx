"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import { getContent, type Locale } from "@/lib/content";
import { BrandLogo } from "./BrandLogo";

type HeaderTheme = "transparent" | "light" | "cream" | "mint" | "dark" | "blue";

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
  const [theme, setTheme] = useState<HeaderTheme>("transparent");
  const [scrolled, setScrolled] = useState(false);
  const copy = getContent(locale).nav;
  const isDark = theme === "dark";

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    const updateScrolled = () => setScrolled(window.scrollY > 32);
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const active = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top - 72) - Math.abs(b.boundingClientRect.top - 72))[0];
        const nextTheme = active?.target.getAttribute("data-header-theme") as HeaderTheme | null;
        if (nextTheme) setTheme(nextTheme);
      },
      { rootMargin: "-72px 0px -74% 0px", threshold: 0 },
    );

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    sections.forEach((section) => observer.observe(section));
    return () => {
      window.removeEventListener("scroll", updateScrolled);
      observer.disconnect();
    };
  }, []);

  const headerThemeClass = {
    transparent: "border-transparent bg-transparent",
    light: "border-slate-900/8 bg-[rgba(248,250,248,0.9)] backdrop-blur-xl",
    cream: "border-slate-900/8 bg-[rgba(250,247,239,0.9)] backdrop-blur-xl",
    mint: "border-[rgba(0,167,142,0.14)] bg-[rgba(230,244,241,0.9)] backdrop-blur-xl",
    dark: "border-white/10 bg-[rgba(7,59,58,0.9)] backdrop-blur-xl [--ink:#F8FAF8] [--ink-muted:#D7E5E0] [--accent:#D5F5EC]",
    blue: "border-blue-900/10 bg-[rgba(239,246,255,0.9)] backdrop-blur-xl [--ink:#172554] [--ink-muted:#475569]",
  }[theme];
  const menuThemeClass = isDark
    ? "border-white/10 bg-[var(--deep-teal)] [--ink:#F8FAF8] [--ink-muted:#D7E5E0] [--accent:#D5F5EC]"
    : theme === "cream"
      ? "border-[var(--line)] bg-[var(--cream)]"
      : theme === "mint"
        ? "border-[var(--line)] bg-[var(--accent-soft)]"
        : theme === "blue"
          ? "border-[var(--line)] bg-[var(--soft-blue)]"
          : "border-[var(--line)] bg-white";

  return (
    <>
      <a href="#content" className="focus-ring fixed left-4 top-3 z-50 -translate-y-20 rounded-[var(--radius-sm)] bg-[var(--ink)] px-4 py-2.5 text-sm font-semibold text-white transition-transform focus:translate-y-0">
        {copy.skip}
      </a>
      <header className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,color,backdrop-filter] duration-300 ease-out ${headerThemeClass} ${scrolled && theme !== "transparent" ? "shadow-[0_12px_30px_-28px_rgba(7,59,58,0.28)]" : "shadow-none"}`}>
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
          <a href="#feasibility-form" className={`focus-ring inline-flex min-h-10 items-center justify-center rounded-[var(--radius-sm)] border px-5 text-sm font-semibold transition duration-300 ease-out hover:-translate-y-0.5 active:translate-y-px ${isDark ? "border-white/60 bg-[var(--accent-soft)] text-[var(--deep-teal)] hover:bg-white" : "border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_2px_8px_rgba(0,121,107,0.18)] hover:bg-[var(--accent-strong)]"}`}>
            {copy.cta}
          </a>
        </div>
        <button type="button" className={`focus-ring flex size-10 items-center justify-center rounded-[var(--radius-sm)] border transition-colors lg:hidden ${isDark ? "border-white/20 bg-white/10 text-white" : "border-[var(--line-strong)] bg-white/85 text-[var(--ink)]"}`} aria-label={open ? copy.close : copy.open} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={19} strokeWidth={1.75} /> : <Menu size={19} strokeWidth={1.75} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className={`overflow-hidden border-t transition-colors duration-300 lg:hidden ${menuThemeClass}`}>
            <nav className="mx-auto flex max-w-[1320px] flex-col px-5 py-4 sm:px-8" aria-label={copy.primaryLabel}>
              {copy.links.map(([label, href], index) => (
                <Link key={href} href={href} onClick={() => setOpen(false)} className="grid grid-cols-[2rem_1fr] items-center border-b py-3.5 text-sm font-semibold text-[var(--ink)] last:border-0">
                  <span className="font-[family-name:var(--font-mono)] text-[13px] font-medium text-[var(--accent-strong)]">0{index + 1}</span>{label}
                </Link>
              ))}
              <a href="#feasibility-form" onClick={() => setOpen(false)} className={`focus-ring mt-4 inline-flex min-h-12 items-center justify-center rounded-[var(--radius-sm)] px-5 text-sm font-semibold ${isDark ? "bg-[var(--accent-soft)] text-[var(--deep-teal)]" : "bg-[var(--accent)] text-white"}`}>{copy.cta}</a>
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
