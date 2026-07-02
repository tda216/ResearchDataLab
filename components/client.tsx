"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const [showStickyCta, setShowStickyCta] = useState(false);
  const copy = getContent(locale).nav;
  const isDark = theme === "dark";

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 32);
      const formEl = document.getElementById("feasibility-form");
      const isFormVisible = formEl ? formEl.getBoundingClientRect().top < window.innerHeight + 100 : false;
      setShowStickyCta(window.scrollY > 600 && !isFormVisible);
    };
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
        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex" aria-label={copy.primaryLabel}>
          {copy.links.map(([label, href]) => (
            <Link key={href} href={href} className="focus-ring rounded-sm text-sm font-medium text-[var(--ink-muted)] transition-colors hover:text-[var(--ink)] xl:text-[15px]">{label}</Link>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-5 lg:justify-self-end">
          <Link href={locale === "vi" ? "/" : "/vi"} className={`text-sm font-bold tracking-wide transition-colors ${isDark ? "text-white/80 hover:text-white" : "text-[var(--ink-muted)] hover:text-[var(--ink)]"}`}>
            {locale === "vi" ? "EN" : "VI"}
          </Link>
          <a href="#feasibility-form" className={`focus-ring inline-flex min-h-10 items-center justify-center rounded-[var(--radius-sm)] border px-5 text-sm font-semibold transition duration-300 ease-out hover:-translate-y-0.5 active:translate-y-px ${isDark ? "border-white/60 bg-[var(--accent-soft)] text-[var(--deep-teal)] hover:bg-white" : "border-[var(--accent)] bg-[var(--accent)] text-white shadow-[0_2px_8px_rgba(0,121,107,0.18)] hover:bg-[var(--accent-strong)]"}`}>
            {copy.cta}
          </a>
        </div>
        <div className="flex items-center gap-4 lg:hidden">
          <Link href={locale === "vi" ? "/" : "/vi"} className={`text-[13px] font-bold tracking-wide transition-colors ${isDark ? "text-white/80 hover:text-white" : "text-[var(--ink-muted)] hover:text-[var(--ink)]"}`}>
            {locale === "vi" ? "EN" : "VI"}
          </Link>
          <button type="button" className={`focus-ring flex size-10 items-center justify-center rounded-[var(--radius-sm)] border transition-colors ${isDark ? "border-white/20 bg-white/10 text-white" : "border-[var(--line-strong)] bg-white/85 text-[var(--ink)]"}`} aria-label={open ? copy.close : copy.open} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
            {open ? <X size={19} strokeWidth={1.75} /> : <Menu size={19} strokeWidth={1.75} />}
          </button>
        </div>
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
      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-900/10 bg-white/95 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="font-[family-name:var(--font-editorial)] text-[18px] font-medium text-[var(--ink)]">
                {locale === "vi" ? "Kiểm tra tính khả thi" : "Free feasibility check"}
              </span>
              <a
                href="#feasibility-form"
                className="flex h-11 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent)] px-6 text-sm font-bold text-white shadow-sm transition-all duration-300 active:scale-[0.98]"
              >
                {locale === "vi" ? "Bắt đầu" : "Start"}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
