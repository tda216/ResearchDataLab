import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  Braces,
  Database,
  FileJson,
  FileSearch,
  FileSpreadsheet,
  FileText,
  ScrollText,
  Table2,
} from "lucide-react";
import type { Locale } from "@/lib/content";

export const CTA_URL = "#feasibility-form";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10 ${className}`}>{children}</div>;
}

export function Section({
  children,
  id,
  className = "",
  headerTheme,
}: {
  children: ReactNode;
  id?: string;
  className?: string;
  headerTheme?: "light" | "cream" | "mint" | "dark" | "blue";
}) {
  return (
    <section id={id} data-header-theme={headerTheme} className={`scroll-mt-24 py-[var(--section-space)] ${className}`}>
      {children}
    </section>
  );
}

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-md border bg-white/70 px-3 py-1.5 text-[13px] font-semibold text-[var(--ink-muted)] ${className}`}>
      {children}
    </span>
  );
}

export function Button({
  children,
  href = CTA_URL,
  variant = "primary",
  className = "",
  showIcon = true,
}: {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "light" | "text";
  className?: string;
  showIcon?: boolean;
}) {
  const styles = {
    primary: "border-[var(--accent)] bg-[var(--accent)] text-white hover:bg-[var(--accent-strong)]",
    secondary: "border-[var(--line-strong)] bg-white text-[var(--ink)] hover:border-[var(--ink-faint)] hover:bg-[var(--surface-subtle)]",
    light: "border-white/15 bg-white text-[var(--dark)] hover:bg-[var(--accent-soft)]",
    text: "border-transparent bg-transparent px-1 text-[var(--ink)] hover:text-[var(--accent-strong)]",
  };

  return (
    <Link
      href={href}
      className={`focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-[var(--radius-sm)] border px-5 text-sm font-semibold transition duration-300 ease-out hover:-translate-y-0.5 active:translate-y-px ${styles[variant]} ${className}`}
    >
      {children}
      {showIcon && <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.75} />}
    </Link>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-[46rem] ${className}`}>
      {eyebrow && <p className="font-[family-name:var(--font-mono)] text-[13px] md:text-[15px] font-semibold tracking-[0.04em] text-[var(--accent-strong)] uppercase mb-6">{eyebrow}</p>}
      <h2 className="text-balance whitespace-pre-line font-[family-name:var(--font-editorial)] text-[clamp(2.25rem,4vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[var(--ink)]">
        {title}
      </h2>
      {description && <p className="mt-5 max-w-none text-base leading-7 text-[var(--ink-muted)] sm:text-[1.0625rem]">{description}</p>}
    </div>
  );
}

type ReportField = { label: string; value: string | string[] };
type FeasibilityReportContent = {
  reportLabel: string;
  statusLabel: string;
  badges: string[];
  topic: ReportField;
  sources: ReportField;
  fields: ReportField;
  notes: ReportField;
  risks: ReportField;
  output: ReportField;
};

export function FeasibilityReportCard({ content }: { content: FeasibilityReportContent }) {
  const rows = [
    content.topic,
    content.sources,
    content.fields,
    content.notes,
    content.risks,
    content.output,
  ];

  return (
    <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-[var(--radius-lg)] border border-white/20 bg-white shadow-[0_36px_90px_-48px_rgba(0,0,0,0.34)] [--ink:#1F2937] [--ink-muted:#64748B] [--accent:#00A78E] [--accent-strong:#00796B] sm:mt-14">
      <div className="technical-grid absolute inset-0 opacity-[0.15]" />
      <div className="relative flex flex-col items-start gap-3 border-b border-[var(--line)] bg-[var(--surface-subtle)]/50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <FileSearch size={16} className="text-[var(--accent)]" />
          <span className="font-[family-name:var(--font-mono)] text-[13px] font-semibold tracking-[0.03em] text-slate-500 uppercase">
            {content.reportLabel}
          </span>
        </div>
        <Badge className="bg-[var(--accent-soft)] border-[var(--accent)]/20 text-[var(--accent-strong)] px-3 py-1.5 font-semibold text-[13px] rounded-full">
          {content.statusLabel}
        </Badge>
      </div>
      <div className="relative p-4 sm:p-10">
        <div className="mb-4 sm:mb-5 flex flex-wrap gap-2 border-b border-[var(--line)] pb-4 sm:pb-5">
          {content.badges.map((badge) => (
            <span key={badge} className="rounded-md bg-[var(--accent-soft)] px-2.5 py-1.5 font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[var(--accent-strong)]">{badge}</span>
          ))}
        </div>
        <div className="divide-y divide-[var(--line)]">
        {rows.map((row, index) => (
          <div key={row.label} className="grid sm:grid-cols-[1fr_2.5fr] gap-1 sm:gap-6 py-3 sm:py-4 first:pt-0 last:pb-0 group">
            <div className="font-[family-name:var(--font-mono)] text-[12.5px] lg:text-[13px] font-medium uppercase tracking-[0.03em] text-slate-500 group-hover:text-[var(--accent)] transition-colors mt-0.5">
              {row.label}
            </div>
            <div className={`text-[14.5px] sm:text-[15px] leading-[1.65] sm:leading-7 ${index === rows.length - 2 ? "font-medium text-[var(--accent-strong)]" : "text-[var(--ink)]"}`}>
              {Array.isArray(row.value) ? (
                <div className="flex flex-col gap-1.5 mt-1 sm:mt-0">
                  {row.value.map(val => (
                    <span key={val} className="inline-flex w-fit items-center gap-2 font-medium text-amber-700 bg-amber-50 border border-amber-200/60 rounded-md px-2.5 py-1 text-[13px] leading-snug">
                      <span className="shrink-0 size-1.5 rounded-full bg-amber-500" />
                      {val}
                    </span>
                  ))}
                </div>
              ) : row.value}
            </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
}

export function FeatureCard({
  icon: Icon,
  index,
  title,
  description,
  className = "",
}: {
  icon: ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  index?: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <article className={`group relative border-t border-[var(--line-strong)] py-5 sm:py-6 pr-4 transition-colors duration-300 hover:border-[var(--accent)] ${className}`}>
      <div className="mb-5 sm:mb-8 flex items-center justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--line)] bg-white text-[var(--accent)] transition-colors duration-300 group-hover:border-[var(--accent)]/40 group-hover:bg-[var(--accent-soft)]">
          <Icon size={18} strokeWidth={2} />
        </div>
        {index && <span className="font-[family-name:var(--font-mono)] text-[13px] font-medium tracking-[0.03em] text-slate-500 group-hover:text-[var(--accent)] transition-colors">{index}</span>}
      </div>
      <h3 className="text-lg font-semibold tracking-[-0.02em] text-[var(--ink)]">{title}</h3>
      <p className="mt-3 text-[15px] leading-7 text-[var(--ink-muted)]">{description}</p>
    </article>
  );
}

type FileType = "json" | "csv" | "xlsx" | "pdf" | "py" | "md";

const fileConfig: Record<FileType, { icon: any; color: string; bg: string; border: string; shadow: string; badgeBg: string; badgeText: string }> = {
  json: { icon: FileJson, color: "text-amber-600", bg: "bg-amber-50", border: "hover:border-amber-500/40", shadow: "hover:shadow-[0_16px_32px_-12px_rgba(217,119,6,0.15)]", badgeBg: "group-hover:bg-amber-100/60", badgeText: "group-hover:text-amber-700" },
  csv: { icon: Table2, color: "text-emerald-600", bg: "bg-emerald-50", border: "hover:border-emerald-500/40", shadow: "hover:shadow-[0_16px_32px_-12px_rgba(5,150,105,0.15)]", badgeBg: "group-hover:bg-emerald-100/60", badgeText: "group-hover:text-emerald-700" },
  xlsx: { icon: FileSpreadsheet, color: "text-emerald-600", bg: "bg-emerald-50", border: "hover:border-emerald-500/40", shadow: "hover:shadow-[0_16px_32px_-12px_rgba(5,150,105,0.15)]", badgeBg: "group-hover:bg-emerald-100/60", badgeText: "group-hover:text-emerald-700" },
  pdf: { icon: FileText, color: "text-rose-600", bg: "bg-rose-50", border: "hover:border-rose-500/40", shadow: "hover:shadow-[0_16px_32px_-12px_rgba(225,29,72,0.15)]", badgeBg: "group-hover:bg-rose-100/60", badgeText: "group-hover:text-rose-700" },
  py: { icon: Braces, color: "text-blue-600", bg: "bg-blue-50", border: "hover:border-blue-500/40", shadow: "hover:shadow-[0_16px_32px_-12px_rgba(37,99,235,0.15)]", badgeBg: "group-hover:bg-blue-100/60", badgeText: "group-hover:text-blue-700" },
  md: { icon: BookOpenText, color: "text-slate-600", bg: "bg-slate-50", border: "hover:border-slate-400/50", shadow: "hover:shadow-[0_16px_32px_-12px_rgba(71,85,105,0.12)]", badgeBg: "group-hover:bg-slate-200/60", badgeText: "group-hover:text-slate-700" },
};

const defaultFileConfig = { icon: ScrollText, color: "text-[var(--accent-strong)]", bg: "bg-[var(--surface-subtle)]", border: "hover:border-[var(--accent)]/30", shadow: "hover:shadow-[0_16px_32px_-12px_rgba(0,167,142,0.15)]", badgeBg: "group-hover:bg-[var(--accent-soft)]", badgeText: "group-hover:text-[var(--accent-strong)]" };

export function FileCard({
  name,
  description,
  fields,
  size = "standard",
}: {
  name: string;
  description: string;
  fields?: string[];
  size?: "standard" | "wide";
}) {
  const ext = name.split(".").pop() as FileType;
  const config = fileConfig[ext] ?? defaultFileConfig;
  const Icon = config.icon;

  return (
    <article className={`group relative min-h-fit sm:min-h-[14rem] flex flex-col justify-between overflow-hidden bg-white p-5 sm:p-6 border border-transparent transition-all duration-400 ease-out hover:z-10 hover:-translate-y-1.5 ${config.border} ${config.shadow} ${size === "wide" ? "sm:col-span-2" : ""}`}>
      <div>
        <div className="flex items-start justify-between">
          <span className={`flex size-9 items-center justify-center rounded-md border border-[var(--line-strong)] ${config.color} ${config.bg} shadow-sm transition-colors`}>
            <Icon size={18} strokeWidth={2.25} />
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[12.5px] font-bold uppercase tracking-[0.06em] text-[var(--ink-faint)]">.{ext}</span>
        </div>
        <div className="mt-7">
          <h3 className="break-all font-[family-name:var(--font-mono)] text-[14.5px] font-bold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--ink)]">{name}</h3>
          <p className="mt-2.5 max-w-sm text-[14px] leading-[1.65] text-[var(--ink-muted)] line-clamp-2 sm:line-clamp-none">{description}</p>
        </div>
      </div>
      {fields && (
        <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--line)] pt-4">
          {fields.map(field => (
            <span key={field} className={`inline-flex rounded-full bg-[var(--surface-subtle)] px-3 py-1 text-[12.5px] lg:text-[13px] font-semibold tracking-[0.02em] text-[var(--ink-faint)] transition-colors ${config.badgeBg} ${config.badgeText}`}>
              {field}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export function StepCard({ number, title, description, isLast = false }: { number: string; title: string; description: string; isLast?: boolean }) {
  return (
    <article className="group relative flex flex-1 flex-col gap-4 sm:gap-6 pl-10 pt-5 sm:pl-12 sm:pt-8 md:gap-8 md:px-4 md:pt-0">
      {/* Connecting line (Desktop) */}
      {!isLast && (
        <div className="absolute left-[calc(50%+2rem)] right-[calc(-50%+2rem)] top-[1.125rem] hidden h-[2px] bg-[var(--line-strong)] md:block" />
      )}
      
      {/* Node Badge */}
      <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[var(--line-strong)] bg-white shadow-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-[var(--accent)] group-hover:shadow-[0_8px_16px_-6px_rgba(0,167,142,0.3)] md:mx-auto">
        <span className="font-[family-name:var(--font-mono)] text-[13px] font-bold tracking-[0.05em] text-[var(--ink-muted)] transition-colors group-hover:text-[var(--accent-strong)]">{number}</span>
      </div>

      {/* Content */}
      <div className="md:text-center px-6 md:px-0 pb-6 md:pb-0">
        <h3 className="text-[16px] font-bold tracking-tight text-[var(--ink)] transition-colors group-hover:text-[var(--accent)]">{title}</h3>
        <p className="mt-3 text-[14.5px] leading-[1.65] text-[var(--ink-muted)]">{description}</p>
      </div>
    </article>
  );
}

export function DatasetPreview({ locale }: { locale: Locale }) {
  const isVi = locale === "vi";
  const rows = isVi
    ? [["OpenAlex", "2,420", "DOI, tóm tắt, năm", "Đã làm sạch"], ["Crossref", "1,180", "tiêu đề, tác giả, tạp chí", "Đã khử trùng"], ["Web công khai", "650", "URL, phân loại, ngày", "Đã kiểm tra"]]
    : [["OpenAlex", "2,420", "DOI, abstract, year", "Cleaned"], ["Crossref", "1,180", "title, authors, journal", "Deduplicated"], ["Public Web", "650", "URL, category, date", "Verified"]];
  const headers = isVi ? ["Nguồn", "Bản ghi", "Trường", "Trạng thái"] : ["Source", "Records", "Fields", "Status"];

  return (
    <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--line-strong)] bg-white">
      <div className="flex items-center justify-between border-b bg-[var(--surface-subtle)]/70 px-4 py-3">
        <div className="flex items-center gap-2 font-[family-name:var(--font-mono)] text-[12.5px] lg:text-[13px] font-semibold tracking-[0.03em] text-slate-500 uppercase">
          <Database size={16} strokeWidth={1.75} className="text-[var(--accent)]" />
          {isVi ? "Dữ liệu mẫu · 3 nguồn" : "Sample dataset · 3 sources"}
        </div>
        <span className="font-[family-name:var(--font-mono)] text-[12.5px] lg:text-[13px] tracking-[0.03em] font-semibold text-[var(--accent-strong)] uppercase">{isVi ? "Trạng thái: Sẵn sàng" : "Status: Ready"}</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-[13px]">
          <thead className="text-[13px] font-semibold uppercase tracking-[0.04em] text-[var(--ink-muted)]">
            <tr>{headers.map((cell, index) => <th key={cell} className={`border-b px-3 py-3 font-medium sm:px-4 ${index === 1 || index === 2 ? "hidden sm:table-cell" : ""}`}>{cell}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row[0]} className="border-b last:border-0">
                {row.map((cell, index) => <td key={cell} className={`px-3 py-3.5 sm:px-4 ${index === 1 || index === 2 ? "hidden sm:table-cell" : ""} ${index === 0 ? "font-semibold text-[var(--ink)]" : "text-[var(--ink-muted)]"}`}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
