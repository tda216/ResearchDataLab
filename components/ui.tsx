import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BookOpenText,
  Braces,
  Check,
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
}: {
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-[var(--section-space)] ${className}`}>
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
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div className={`max-w-[46rem] ${className}`}>
      {eyebrow && <p className="font-[family-name:var(--font-mono)] text-[13px] md:text-[15px] font-semibold tracking-[0.04em] text-[var(--accent-strong)] uppercase mb-6">{eyebrow}</p>}
      <h2 className="text-balance font-[family-name:var(--font-editorial)] text-[clamp(2.25rem,4vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[var(--ink)]">
        {title}
      </h2>
      <p className="mt-5 max-w-[60ch] text-base leading-7 text-[var(--ink-muted)] sm:text-[1.0625rem]">{description}</p>
    </div>
  );
}

type ReportField = { label: string; value: string };
type FeasibilityReportContent = {
  reportLabel: string;
  statusLabel: string;
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
    <div className="relative mx-auto mt-12 max-w-4xl overflow-hidden rounded-[var(--radius-lg)] border border-[var(--accent)]/30 bg-white shadow-[0_34px_80px_-50px_rgba(13,148,136,0.28)] transition-shadow duration-500 hover:shadow-[0_38px_90px_-50px_rgba(13,148,136,0.34)] sm:mt-14">
      <div className="technical-grid absolute inset-0 opacity-[0.15]" />
      <div className="relative bg-[var(--surface-subtle)]/50 border-b border-[var(--line)] px-6 py-4 flex items-center justify-between">
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
      <div className="relative divide-y divide-[var(--line)] p-6 sm:p-10">
        {rows.map((row, index) => (
          <div key={row.label} className="grid sm:grid-cols-[1fr_2.5fr] gap-2 sm:gap-6 py-4 first:pt-0 last:pb-0 group">
            <div className="font-[family-name:var(--font-mono)] text-[12.5px] lg:text-[13px] font-medium uppercase tracking-[0.03em] text-slate-500 group-hover:text-[var(--accent)] transition-colors mt-0.5">
              {row.label}
            </div>
            <div className={`text-[15px] leading-7 ${index === rows.length - 2 ? "font-medium text-[var(--accent-strong)]" : "text-[var(--ink)]"}`}>
              {row.value}
            </div>
          </div>
        ))}
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
    <article className={`group relative border-t border-[var(--line-strong)] py-6 pr-4 transition-colors duration-300 hover:border-[var(--accent)] ${className}`}>
      <div className="mb-8 flex items-center justify-between">
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

const fileIcons = {
  json: FileJson,
  csv: Table2,
  xlsx: FileSpreadsheet,
  pdf: FileText,
  py: Braces,
  md: BookOpenText,
};

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
  const ext = name.split(".").pop() as keyof typeof fileIcons;
  const Icon = fileIcons[ext] ?? ScrollText;

  return (
    <article className={`group relative min-h-[14rem] flex flex-col justify-between overflow-hidden bg-white p-6 border border-transparent transition-all duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:border-[var(--accent)]/30 hover:shadow-lg ${size === "wide" ? "sm:col-span-2" : ""}`}>
      <div>
        <div className="flex items-start justify-between">
          <span className="flex size-9 items-center justify-center rounded-md border bg-[var(--surface-subtle)] text-[var(--accent-strong)] group-hover:bg-[var(--accent-soft)] transition-colors">
            <Icon size={19} strokeWidth={1.75} />
          </span>
          <span className="font-[family-name:var(--font-mono)] text-[13px] font-medium uppercase tracking-[0.05em] text-[var(--ink-muted)]">.{ext}</span>
        </div>
        <div className="mt-8">
          <h3 className="break-all font-[family-name:var(--font-mono)] text-[14px] font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">{name}</h3>
          <p className="mt-2.5 max-w-sm text-[14px] leading-6 text-[var(--ink-muted)]">{description}</p>
        </div>
      </div>
      {fields && (
        <div className="mt-6 flex flex-wrap gap-2 border-t border-[var(--line)] pt-4">
          {fields.map(field => (
            <span key={field} className="inline-flex rounded-full bg-[var(--surface-subtle)] px-3 py-1 text-[12.5px] lg:text-[13px] font-medium tracking-[0.03em] text-slate-500 group-hover:bg-[var(--accent-soft)] group-hover:text-[var(--accent-strong)] transition-colors">
              {field}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

export function StepCard({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <article className="group relative pt-6 md:min-h-[16rem]">
      <div className="relative z-10 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--canvas)] border border-[var(--line-strong)] font-[family-name:var(--font-mono)] text-[13px] font-semibold tracking-[0.03em] text-slate-500 group-hover:border-[var(--accent)] group-hover:text-[var(--accent-strong)] group-hover:bg-[var(--accent-soft)] transition-colors">
          {number}
        </span>
      </div>
      <h3 className="mt-10 max-w-[14ch] text-lg font-semibold tracking-tight text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors">{title}</h3>
      <p className="mt-3 text-[15px] leading-7 text-[var(--ink-muted)]">{description}</p>
    </article>
  );
}

export function PackageCard({
  title,
  label,
  description,
  items,
  cta,
  featured = false,
  projectLabel = "Project-based",
}: {
  title: string;
  label?: string;
  description: string;
  items: string[];
  cta: string;
  featured?: boolean;
  projectLabel?: string;
}) {
  return (
    <article className={`group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border p-6 sm:p-8 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl ${featured ? "border-[var(--accent)] bg-[var(--accent-soft)]/20 shadow-[0_8px_30px_-12px_rgba(13,148,136,0.2)]" : "bg-white hover:border-[var(--accent)]/40"}`}>
      {featured && <div className="absolute inset-y-0 left-0 w-1 bg-[var(--accent)]" />}
      <div className="flex min-h-7 items-start justify-between gap-3">
        <p className="font-[family-name:var(--font-mono)] text-[12.5px] lg:text-[13px] font-semibold tracking-[0.03em] uppercase text-slate-500 group-hover:text-[var(--accent)] transition-colors">{projectLabel}</p>
        {label && <span className={`rounded-full px-3 py-1.5 font-[family-name:var(--font-mono)] text-[13px] lg:text-[14px] font-semibold tracking-[0.03em] ${featured ? "bg-[var(--accent)] text-white shadow-sm" : "bg-[var(--surface-subtle)] text-[var(--accent-strong)]"}`}>{label}</span>}
      </div>
      <h3 className="mt-5 text-xl font-semibold tracking-[-0.035em]">{title}</h3>
      <p className="mt-3 text-[15px] leading-7 text-[var(--ink-muted)] sm:min-h-16">{description}</p>
      <ul className="my-6 space-y-3 border-t border-[var(--line)] pt-5 text-[15px] text-[var(--ink-muted)]">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <Check className="text-[var(--accent)]" size={15} strokeWidth={1.75} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <Button variant={featured ? "primary" : "secondary"} className="mt-auto w-full">{cta}</Button>
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
