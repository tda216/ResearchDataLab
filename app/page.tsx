import Link from "next/link";
import Image from "next/image";
import {
  BookOpenCheck,
  Check,
  DatabaseZap,
  ExternalLink,
  FileCheck2,
  FileSearch,
  Files,
  Fingerprint,
  Lock,
  Mail,
  MessageCircle,
  Network,
  ScanSearch,
  Server,
  ShieldCheck,
  Sparkles,
  FileKey2,
} from "lucide-react";
import { Header, RevealOnScroll } from "@/components/client";
import { BrandLogo } from "@/components/BrandLogo";
import { FeasibilityForm } from "@/components/FeasibilityForm";
import {
  Badge,
  Button,
  Container,
  FeasibilityReportCard,
  FeatureCard,
  FileCard,
  Section,
  SectionHeader,
  StepCard,
} from "@/components/ui";
import { getContent, type Locale } from "@/lib/content";

const problemIcons = [Files, ScanSearch, Sparkles, BookOpenCheck];
const useCaseIcons = [FileSearch, Network, DatabaseZap];
const safeguardIcons = [ShieldCheck, Lock, Server, FileKey2, Check];
const institutionLogos: Record<string, string> = {
  HUST: "/logos/hust.png",
  LEEDS: "/logos/leeds.png",
  LBU: "/logos/lbu.png",
  CHESTER: "/logos/chester.png",
};


const networkNodes = [[3, 56], [10, 16], [21, 62], [34, 30], [45, 74], [57, 42], [70, 80], [83, 55], [96, 88]];

function ResearchConstellation({ side, locale }: { side: "left" | "right"; locale: Locale }) {
  const isLeft = side === "left";
  const isVi = locale === "vi";
  const tags = isLeft
    ? isVi
      ? ["OpenAlex + Crossref", "4.247 bản ghi", "CSV · schema v1.3"]
      : ["OpenAlex + Crossref", "4,247 records", "CSV · schema v1.3"]
    : isVi
      ? ["Đã đánh giá nguồn", "Dữ liệu thiếu · 0,8%", "Giấy phép mở"]
      : ["Source review complete", "Missing values · 0.8%", "Open license"];

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute bottom-0 z-0 hidden h-[54%] w-[43%] overflow-hidden opacity-30 md:block lg:opacity-50 ${isLeft ? "left-0" : "right-0"}`}>
      <div className={`absolute bottom-[-4%] h-[84%] w-[82%] border border-[rgba(13,148,136,0.06)] bg-[var(--accent-soft)]/20 ${isLeft ? "-left-14 -rotate-3" : "-right-14 rotate-3"}`} />
      <div className={`absolute top-[43%] h-[31%] w-[31%] border border-[var(--line)]/70 bg-white/30 ${isLeft ? "left-[40%] rotate-6" : "right-[40%] -rotate-6"}`} />
      <svg viewBox="0 0 600 300" preserveAspectRatio="none" className={`absolute inset-0 h-full w-full opacity-75 ${isLeft ? "" : "-scale-x-100"}`}>
        <path d="M-20 118 C80 18 145 110 220 70 S360 26 440 112 S540 175 630 82" fill="none" stroke="rgba(13,148,136,0.12)" strokeWidth="0.8" />
        <path d="M-10 204 C90 138 164 238 260 166 S420 96 620 220" fill="none" stroke="rgba(127,140,135,0.14)" strokeWidth="0.8" />
        {networkNodes.slice(0, -1).map(([x, y], index) => {
          const [nextX, nextY] = networkNodes[index + 1];
          return <line key={`${x}-${y}`} x1={`${x}%`} y1={`${y}%`} x2={`${nextX}%`} y2={`${nextY}%`} stroke="rgba(13,148,136,0.15)" strokeWidth="0.8" />;
        })}
        {networkNodes.slice(0, -2).map(([x, y], index) => {
          const [nextX, nextY] = networkNodes[index + 2];
          return <line key={`cross-${x}-${y}`} x1={`${x}%`} y1={`${y}%`} x2={`${nextX}%`} y2={`${nextY}%`} stroke="rgba(127,140,135,0.13)" strokeWidth="0.7" />;
        })}
        {networkNodes.map(([x, y], index) => <circle key={`node-${x}-${y}`} cx={`${x}%`} cy={`${y}%`} r={index % 3 === 0 ? 4 : 2.5} fill={index % 3 === 0 ? "#0D9488" : "#F8FAF8"} fillOpacity={index % 3 === 0 ? 0.55 : 0.85} stroke={index % 3 === 0 ? "#0D9488" : "#C6D6D0"} strokeOpacity="0.5" strokeWidth="0.8" />)}
        {[44, 166, 312, 478, 548].map((x, index) => <rect key={x} x={x} y={[85, 210, 116, 248, 154][index]} width="3" height="3" fill="none" stroke="rgba(13,148,136,0.25)" strokeWidth="0.7" />)}
      </svg>

      <div className={`absolute grid grid-cols-6 gap-2 opacity-30 ${isLeft ? "bottom-10 left-7" : "right-7 bottom-12"}`}>
        {Array.from({ length: 30 }, (_, index) => <span key={index} className={`size-[3px] ${index % 4 === 0 ? "bg-[var(--ink-faint)]" : "bg-[var(--accent)]"}`} />)}
      </div>

      <div className={`absolute bottom-[5%] w-44 rounded-xl border border-[var(--line)]/80 bg-white/88 p-3.5 shadow-[0_18px_45px_-32px_rgba(13,148,136,0.15)] backdrop-blur-[2px] lg:w-52 ${isLeft ? "left-5 -rotate-3 lg:left-12" : "right-5 rotate-3 lg:right-12"}`}>
        <p className="text-[13px] font-semibold text-[var(--ink)]">{isLeft ? (isVi ? "Nguồn" : "Source") : (isVi ? "Phương pháp" : "Methodology")}</p>
        <p className="mt-2 whitespace-pre-line text-[12px] leading-5 text-[var(--ink-muted)]">
          {isLeft
            ? isVi ? "Truy cập qua API mở\nCập nhật 2026-06-24" : "Open API access\nUpdated 2026-06-24"
            : isVi ? "khử trùng · chuẩn hóa\nlập tài liệu · kiểm tra" : "deduplicate · normalize\ndocument · validate"}
        </p>
      </div>

      <div className={`absolute top-[30%] w-40 rounded-xl border border-[var(--line)]/80 bg-white/88 p-3.5 shadow-[0_18px_45px_-32px_rgba(13,148,136,0.15)] backdrop-blur-[2px] lg:w-48 ${isLeft ? "left-[4%] rotate-2 lg:left-[10%]" : "right-[4%] -rotate-2 lg:right-[10%]"}`}>
        <span className="font-[family-name:var(--font-editorial)] text-2xl leading-none text-[var(--accent)]">“</span>
        <p className="mt-1 whitespace-pre-line text-[12px] leading-5 text-[var(--ink-muted)]">
          {isLeft
            ? isVi ? "Siêu dữ liệu tài liệu\nDOI · tóm tắt · năm" : "Literature metadata\nDOI · abstract · year"
            : isVi ? "Đánh giá mẫu\n8.742 bản ghi · 2000–2023" : "Sample review\n8,742 records · 2000–2023"}
        </p>
      </div>

      {tags.map((tag, index) => (
        <span key={tag} className={`absolute inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-[var(--accent)]/15 bg-white/95 px-3 py-1.5 font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[var(--accent-strong)] shadow-[0_12px_30px_-20px_rgba(13,148,136,0.38)] backdrop-blur-sm ${isLeft ? ["left-2 top-[8%]", "left-[30%] top-[48%]", "left-[44%] top-[70%]"][index] : ["right-2 top-[10%]", "right-[30%] top-[50%]", "right-[43%] top-[72%]"][index]}`}>
          <span className={`size-1.5 rounded-full ${index === 1 ? "bg-[var(--ink-faint)]" : "bg-[var(--accent)]"}`} />
          {tag}
        </span>
      ))}
    </div>
  );
}

function MobileResearchLine() {
  return (
    <svg aria-hidden="true" viewBox="0 0 390 90" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full opacity-45 md:hidden">
      <path d="M0 72 C55 26 92 84 142 53 S233 23 278 63 S345 76 390 34" fill="none" stroke="rgba(13,148,136,0.35)" strokeWidth="1" />
      {[18, 82, 142, 224, 278, 352].map((x, index) => <circle key={x} cx={x} cy={[58, 52, 53, 42, 63, 52][index]} r={index % 2 === 0 ? 4 : 2.5} fill={index % 2 === 0 ? "#0D9488" : "#F8FAF8"} stroke="#0D9488" strokeOpacity="0.6" />)}
    </svg>
  );
}

export function LandingPage({ locale }: { locale: Locale }) {
  const copy = getContent(locale);

  return (
    <div lang={locale}>
      <Header locale={locale} />
      <main id="content">
        <section id="top" data-header-theme="transparent" aria-labelledby="hero-title" className="theme-hero relative isolate flex min-h-[100dvh] scroll-mt-[4.5rem] overflow-hidden border-b">
          <ResearchConstellation side="left" locale={locale} />
          <ResearchConstellation side="right" locale={locale} />
          <MobileResearchLine />
          <Container className="relative z-10 flex items-center justify-center pt-28 pb-24 sm:pt-32 sm:pb-28 lg:pb-32">
            <RevealOnScroll className="mx-auto w-full text-center">
              <h1 id="hero-title" className="text-balance mx-auto max-w-[74rem] font-[family-name:var(--font-editorial)] text-[clamp(2.6rem,11vw,5.4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[var(--ink)] sm:text-[clamp(3.4rem,7vw,5.4rem)] sm:leading-[0.94]">
                <span className="block">{copy.hero.titleLead}</span>
                <span className="mt-1 block font-normal italic">{copy.hero.titleAccent}</span>
              </h1>
              <p className="mx-auto mt-7 max-w-[44rem] text-base leading-7 text-[var(--ink-muted)] sm:mt-8 sm:text-lg sm:leading-8">
                {copy.hero.description}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-9 sm:flex-row">
                <Button className="min-h-14 w-full rounded-[var(--radius-sm)] px-8 text-base shadow-[var(--shadow-card)] sm:w-auto">{copy.hero.primary}</Button>
                <Button href="#sample-review" variant="secondary" className="min-h-14 w-full px-8 text-base sm:w-auto">{copy.hero.secondary}</Button>
              </div>
            </RevealOnScroll>
          </Container>
        </section>

        <section data-header-theme="light" aria-labelledby="research-community" className="border-b bg-white/75 py-8 sm:py-10">
          <Container>
            <RevealOnScroll>
              <p id="research-community" className="text-center text-[13px] font-semibold tracking-[0.04em] text-[var(--ink-faint)] sm:text-[14px]">
                {copy.socialProof.heading}
              </p>
              <div className="mx-auto mt-8 grid max-w-4xl grid-cols-2 place-items-center gap-x-8 gap-y-6 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-16">
                {copy.socialProof.institutions.map(([shortName, fullName]) => {
                  const logoSrc = institutionLogos[shortName];
                  return (
                    <div key={fullName} className="group flex min-h-12 items-center justify-center" title={fullName}>
                      {logoSrc ? (
                        <div className="relative flex h-8 sm:h-9 w-auto items-center justify-center">
                          <Image
                            src={logoSrc}
                            alt={fullName}
                            width={200}
                            height={40}
                            className="h-full w-auto object-contain grayscale opacity-45 mix-blend-multiply transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-[1.05]"
                          />
                        </div>
                      ) : (
                        <span className="font-[family-name:var(--font-mono)] text-[15px] font-bold tracking-[0.06em] text-[var(--ink-faint)] uppercase transition-colors duration-300 group-hover:text-[var(--accent-strong)] sm:text-base">
                          {shortName}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </RevealOnScroll>
          </Container>
        </section>

        <Section headerTheme="light" className="bg-white">
          <Container>
            <RevealOnScroll><SectionHeader eyebrow={copy.problem.eyebrow} title={copy.problem.title} description={copy.problem.description} /></RevealOnScroll>
            <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {copy.problem.items.map(([title, description], index) => <RevealOnScroll key={title} delay={index * 0.06}><FeatureCard icon={problemIcons[index]} title={title} description={description} index={`0${index + 1}`} /></RevealOnScroll>)}
            </div>
          </Container>
        </Section>

        <Section id="process" headerTheme="mint" className="theme-mint border-y">
          <Container>
            <div className="flex flex-col gap-12">
              <RevealOnScroll>
                <SectionHeader eyebrow={copy.workflow.eyebrow} title={copy.workflow.title} className="max-w-4xl" />
              </RevealOnScroll>
              
              <div className="relative mt-4 flex flex-col md:flex-row">
                {/* Mobile vertical connecting line */}
                <div className="absolute left-[1.1875rem] top-6 bottom-6 w-[2px] bg-[var(--line-strong)] md:hidden" />
                
                {copy.workflow.steps.map(([number, title, description], index, arr) => (
                  <RevealOnScroll key={number} delay={index * 0.08} className="flex-1">
                    <StepCard number={number} title={title} description={description} isLast={index === arr.length - 1} />
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        <Section id="sample-review" headerTheme="dark" className="theme-dark border-y border-white/10 pb-20 [--ink:#F8FAF8] [--ink-muted:#D2E2DD] [--accent-strong:#99F6E4]">
          <Container>
            <RevealOnScroll>
              <SectionHeader className="mx-auto flex flex-col items-center text-center" eyebrow={copy.sampleReport.eyebrow} title={copy.sampleReport.title} description={copy.sampleReport.description} />
            </RevealOnScroll>
            <RevealOnScroll delay={0.1}>
              <FeasibilityReportCard content={copy.sampleReport} />
              <div className="mt-8 flex justify-center">
                <Button variant="light">{copy.sampleReport.cta}</Button>
              </div>
            </RevealOnScroll>
          </Container>
        </Section>

        <Section id="services" headerTheme="light" className="bg-white">
          <Container>
            <RevealOnScroll><SectionHeader eyebrow={copy.useCases.eyebrow} title={copy.useCases.title} description={copy.useCases.description} /></RevealOnScroll>
            <div className="mt-14 grid overflow-hidden rounded-[var(--radius-lg)] border bg-[var(--line)] gap-px lg:grid-cols-3">
              {copy.useCases.items.map((item, index) => {
                const Icon = useCaseIcons[index];
                return (
                  <RevealOnScroll key={item.title} delay={index * 0.05} className="h-full">
                    <article className="group flex h-full flex-col bg-white p-6 transition duration-300 hover:bg-[var(--surface-subtle)]/45 sm:p-8">
                      <div className="flex items-start justify-between">
                        <Icon size={20} className="text-[var(--accent)]" strokeWidth={1.75} />
                        <span className="text-[13px] font-semibold tracking-[-0.01em] text-[var(--accent-strong)]">{item.label}</span>
                      </div>
                      <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em] group-hover:text-[var(--accent)] transition-colors">{item.title}</h3>
                      <p className="mt-3 max-w-xl text-[15px] leading-7 text-[var(--ink-muted)]">{item.description}</p>
                      
                      <div className="mt-auto pt-8">
                        <div className="flex flex-wrap gap-x-2 gap-y-2 border-t pt-5">
                          {item.fields.map((field) => <span key={field} className="inline-flex rounded-full bg-[var(--surface-subtle)] px-3 py-1.5 text-[13px] font-medium text-[var(--ink-muted)] transition-colors group-hover:bg-[var(--accent-soft)] group-hover:text-[var(--accent-strong)]">{field}</span>)}
                        </div>
                        <p className="mt-5 text-[13px] leading-5 text-[var(--ink-muted)]"><span className="font-semibold text-[var(--ink)]">{locale === "vi" ? "Phù hợp cho:" : "Best for:"}</span> {item.bestFor}</p>
                      </div>
                    </article>
                  </RevealOnScroll>
                );
              })}
            </div>
          </Container>
        </Section>

        <Section id="deliverables" headerTheme="blue" className="theme-blue border-y">
          <Container>
            <RevealOnScroll>
              <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                <SectionHeader eyebrow={copy.deliverables.eyebrow} title={copy.deliverables.title} description={copy.deliverables.description} />
                <Badge className="w-fit bg-[var(--surface-subtle)] border-[var(--line-strong)] px-4 py-2 rounded-full"><FileCheck2 size={16} className="text-[var(--accent)] mr-2" /> <span className="font-[family-name:var(--font-mono)] text-[13px] font-semibold tracking-[0.03em] text-[var(--accent-strong)] uppercase">{copy.deliverables.badge}</span></Badge>
              </div>
            </RevealOnScroll>
            <RevealOnScroll>
              <div className="mt-8 flex flex-col gap-2 border-y border-[var(--line-strong)] py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-[family-name:var(--font-mono)] text-[13px] font-semibold uppercase tracking-[0.04em] text-[var(--accent-strong)]">{copy.deliverables.packageLabel}</span>
                <span className="text-sm font-medium text-[var(--ink-muted)]">{copy.deliverables.packageSummary}</span>
              </div>
            </RevealOnScroll>
            <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-4">
              {copy.deliverables.items.slice(0, 4).map(([name, description], index) => (
                <RevealOnScroll key={name} delay={(index % 4) * 0.05}>
                  <FileCard name={name} description={description} size="standard" />
                </RevealOnScroll>
              ))}
              
              {copy.deliverables.items.slice(4).map(([name, description], index) => (
                <RevealOnScroll key={name} delay={(index % 4) * 0.05} className={`hidden lg:block ${index === 2 ? "lg:col-span-2" : ""}`}>
                  <FileCard name={name} description={description} size={index === 2 ? "wide" : "standard"} />
                </RevealOnScroll>
              ))}
            </div>

            <details className="mt-6 lg:hidden group">
              <summary className="focus-ring cursor-pointer list-none flex items-center justify-center gap-2 py-3 text-[14px] font-semibold text-[var(--accent-strong)] bg-white rounded-lg border border-[var(--line-strong)] shadow-sm transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-soft)]">
                {locale === "vi" ? "Xem thêm tệp bàn giao" : "More deliverables"}
                <span className="group-open:rotate-180 transition-transform duration-300">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </span>
              </summary>
              <div className="mt-4 grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-md)] border bg-[var(--line)] sm:grid-cols-2">
                {copy.deliverables.items.slice(4).map(([name, description], index) => (
                  <FileCard key={name} name={name} description={description} size={index === 2 ? "wide" : "standard"} />
                ))}
              </div>
            </details>

          </Container>
        </Section>

        <Section id="ethics" headerTheme="light" className="bg-white">
          <Container>
            <RevealOnScroll>
              <div className="relative overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line-strong)] bg-white">
                <div className="grid lg:grid-cols-[0.86fr_1.14fr]">
                  <div className="relative border-b bg-[var(--surface-subtle)] p-6 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
                    <div className="technical-grid absolute inset-0 opacity-45" />
                    <div className="relative">
                      <div className="flex flex-col items-start gap-3 border-b border-[var(--line)] pb-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <Fingerprint size={22} className="text-[var(--accent)]" strokeWidth={1.75} />
                          <span className="font-[family-name:var(--font-mono)] text-[13px] font-semibold tracking-[0.03em] text-slate-500 uppercase">{copy.ethics.accessLabel}</span>
                        </div>
                        <span className="font-[family-name:var(--font-mono)] text-[13px] font-semibold tracking-[0.03em] text-[var(--accent-strong)] uppercase">{copy.ethics.protocol}</span>
                      </div>
                      <p className="eyebrow mt-10 sm:mt-16">{copy.ethics.eyebrow}</p>
                      <h2 className="text-balance mt-5 font-[family-name:var(--font-editorial)] text-[clamp(2.25rem,4vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em]">{copy.ethics.title}</h2>
                      <p className="mt-6 max-w-[55ch] text-base leading-7 text-[var(--ink-muted)]">{copy.ethics.description}</p>
                      <p className="mt-6 border-l-2 border-[var(--accent)] pl-4 text-sm leading-6 text-[var(--ink-muted)]">{copy.ethics.note}</p>
                      <p className="mt-4 pl-[1.125rem] text-sm leading-6 text-[var(--ink-muted)]">{copy.ethics.methodologyNote}</p>
                    </div>
                  </div>
                  <div className="p-6 sm:p-10 lg:p-12">
                    <div className="flex flex-col items-start gap-3 border-b border-[var(--line-strong)] pb-6 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="text-xl font-semibold tracking-tight text-[var(--ink)]">{copy.ethics.safeguards}</h3>
                      <span className="font-[family-name:var(--font-mono)] text-[13px] font-semibold text-[var(--accent-strong)] bg-[var(--accent-soft)] px-3 py-1.5 rounded-full">{copy.ethics.reviewed}</span>
                    </div>
                    <ul className="divide-y divide-[var(--line)]">
                      {copy.ethics.items.map((item, index) => {
                        const Icon = safeguardIcons[index] || Check;
                        return (
                          <li key={item} className="group grid grid-cols-[2.25rem_1fr] sm:grid-cols-[3rem_1fr] items-center gap-3 sm:gap-4 py-3 sm:py-5 transition-colors hover:bg-slate-50/50">
                            <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg border border-[var(--line-strong)] bg-white shadow-sm transition-colors group-hover:border-[var(--accent)]/30 group-hover:bg-[var(--accent-soft)]">
                              <Icon size={18} className="text-[var(--ink-muted)] group-hover:text-[var(--accent-strong)] transition-colors" strokeWidth={2} />
                            </div>
                            <span className="text-[14px] sm:text-[14.5px] font-medium leading-6 text-[var(--ink)]">{item}</span>
                          </li>
                        );
                      })}
                    </ul>
                    <div className="mt-6 grid grid-cols-1 divide-y divide-[var(--line)] border-y border-[var(--line)] sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-5">
                      {copy.ethics.logs.map(([value, label]) => <div key={label} className="py-4 sm:px-5 sm:py-0 sm:first:pl-0"><p className="text-[15px] font-semibold text-[var(--ink)]">{value}</p><p className="mt-1 font-[family-name:var(--font-mono)] text-[13px] font-medium tracking-[0.03em] text-slate-500 uppercase">{label}</p></div>)}
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </Container>
        </Section>

        <Section id="feasibility-form" headerTheme="mint" className="theme-form">
          <Container>
            <RevealOnScroll>
              <SectionHeader className="mx-auto flex flex-col items-center text-center" eyebrow={copy.finalCta.eyebrow} title={copy.finalCta.title} description={copy.finalCta.description} />
              <div className="mt-12"><FeasibilityForm locale={locale} /></div>
            </RevealOnScroll>
          </Container>
        </Section>
      </main>

      <footer data-header-theme="light" className="border-t border-[var(--line-strong)] bg-white py-12 sm:py-14">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_auto_1fr] lg:items-start lg:gap-16 xl:gap-20">
            <div>
              <Link href="#top" className="focus-ring inline-flex items-center rounded-md">
                <BrandLogo variant="full" size="md" />
              </Link>
              <p className="mt-4 max-w-xs text-sm leading-6 text-[var(--ink-muted)]">{copy.footer.tagline}</p>
            </div>
            <nav aria-label={copy.nav.footerLabel} className="flex flex-col items-start gap-3.5">
              <a href="https://fb.com/trhndan" target="_blank" rel="noreferrer" className="focus-ring group inline-flex items-center gap-2.5 rounded-sm text-sm font-medium text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent-strong)]">
                <ExternalLink aria-hidden="true" size={16} strokeWidth={1.75} className="shrink-0 text-[var(--ink-faint)] transition-colors duration-200 group-hover:text-[var(--accent)]" />
                <span>Facebook</span>
              </a>
              <a href="https://zalo.me/84961636906" target="_blank" rel="noreferrer" className="focus-ring group inline-flex items-center gap-2.5 rounded-sm text-sm font-medium text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent-strong)]">
                <MessageCircle aria-hidden="true" size={16} strokeWidth={1.75} className="shrink-0 text-[var(--ink-faint)] transition-colors duration-200 group-hover:text-[var(--accent)]" />
                <span>Zalo</span>
              </a>
              <a href="mailto:tda@researchdatalab.xyz" className="focus-ring group inline-flex items-center gap-2.5 rounded-sm text-sm font-medium text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent-strong)]">
                <Mail aria-hidden="true" size={16} strokeWidth={1.75} className="shrink-0 text-[var(--ink-faint)] transition-colors duration-200 group-hover:text-[var(--accent)]" />
                <span>tda@researchdatalab.xyz</span>
              </a>
            </nav>
            <p className="text-sm leading-6 text-[var(--ink-faint)] lg:self-end lg:justify-self-end lg:text-right">{copy.footer.rights}</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default function Home() {
  return <LandingPage locale="en" />;
}
