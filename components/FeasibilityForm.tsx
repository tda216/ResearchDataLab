"use client";

import { useState } from "react";
import { ArrowRight, Check, Mail, Phone } from "lucide-react";
import type { Locale } from "@/lib/content";

type FormStatus = "idle" | "submitting" | "success";
type FormErrors = Record<string, string>;

export function FeasibilityForm({ locale }: { locale: Locale }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const isVi = locale === "vi";

  const copy = isVi ? {
    name: "Họ và tên",
    email: "Email",
    role: "Vai trò nghiên cứu",
    topic: "Chủ đề nghiên cứu",
    data: "Loại dữ liệu cần thu thập",
    sources: "Nguồn mục tiêu",
    output: "Đầu ra dự kiến / thời hạn",
    sensitive: "Dự án có liên quan đến dữ liệu nhạy cảm?",
    optional: "Không bắt buộc",
    selectRole: "Chọn vai trò",
    selectData: "Chọn loại dữ liệu",
    selectSensitive: "Chọn câu trả lời",
    submit: "Gửi yêu cầu đánh giá",
    submitting: "Đang gửi yêu cầu...",
    successTitle: "Đã nhận yêu cầu",
    successBody: "Cảm ơn — yêu cầu đánh giá khả thi của bạn đã được ghi nhận. Chúng tôi sẽ xem xét chủ đề, nguồn và đầu ra dự kiến trước khi thu thập.",
    another: "Gửi yêu cầu khác",
    required: "Vui lòng hoàn thành trường này.",
    invalidEmail: "Vui lòng nhập địa chỉ email hợp lệ.",
    direct: "hoặc liên hệ trực tiếp",
    privacy: "Không gửi dữ liệu mật hoặc dữ liệu cá nhân có thể định danh trong biểu mẫu này.",
    responseNote: "Đánh giá miễn phí · Phản hồi trong 24–48 giờ · Không ràng buộc",
    openContact: "Mở kênh liên hệ",
  } : {
    name: "Full name",
    email: "Email",
    role: "Research role",
    topic: "Research topic",
    data: "Type of data needed",
    sources: "Target sources",
    output: "Expected output / deadline",
    sensitive: "Does the project involve sensitive data?",
    optional: "Optional",
    selectRole: "Select your role",
    selectData: "Select a data type",
    selectSensitive: "Select an answer",
    submit: "Submit feasibility request",
    submitting: "Submitting request...",
    successTitle: "Request received",
    successBody: "Thanks — your feasibility request has been received. We’ll review your topic, sources, and expected outputs before collection.",
    another: "Submit another request",
    required: "Please complete this field.",
    invalidEmail: "Enter a valid email address.",
    direct: "or contact us directly",
    privacy: "Do not include confidential or identifiable personal data in this form.",
    responseNote: "Free review · Response within 24–48 hours · No commitment",
    openContact: "Open contact option",
  };

  const roleOptions = isVi
    ? ["Học viên cao học", "Nghiên cứu sinh", "Giảng viên", "Trợ lý nghiên cứu", "Nhóm nghiên cứu", "Doanh nghiệp / tổ chức", "Khác"]
    : ["Master’s student", "PhD candidate", "Faculty member", "Research assistant", "Research team", "Company / organization", "Other"];
  const dataOptions = isVi
    ? ["Dữ liệu tổng quan tài liệu", "Dữ liệu trắc lượng thư mục", "Dữ liệu web công khai", "Làm sạch bộ dữ liệu hiện có", "Khác / chưa chắc"]
    : ["Literature review dataset", "Bibliometric dataset", "Public web dataset", "Existing dataset cleaning", "Other / not sure yet"];
  const sensitiveOptions = isVi ? ["Không", "Chưa chắc", "Có"] : ["No", "Not sure", "Yes"];
  const contacts = [
    { label: "Email", detail: "hello@researchdatalab.xyz", href: "mailto:hello@researchdatalab.xyz", icon: Mail, external: false },
    { label: "Zalo", detail: "+84 961636906", href: "https://zalo.me/84961636906", icon: Phone, external: true },
  ];

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: FormErrors = {};
    const requiredFields = ["name", "email", "role", "topic", "dataNeeded", "sensitiveData"];

    for (const field of requiredFields) {
      if (!String(data.get(field) ?? "").trim()) nextErrors[field] = copy.required;
    }

    const email = String(data.get("email") ?? "").trim();
    if (email && !/^\S+@\S+\.\S+$/.test(email)) nextErrors.email = copy.invalidEmail;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      requestAnimationFrame(() => (form.elements.namedItem(Object.keys(nextErrors)[0]) as HTMLElement | null)?.focus());
      return;
    }

    setStatus("submitting");
    // TODO: Replace this simulated request with the production form endpoint.
    await new Promise((resolve) => setTimeout(resolve, 900));
    form.reset();
    setStatus("success");
  };

  const inputClass = "w-full rounded-[var(--radius-sm)] border border-[var(--line-strong)] bg-white px-4 py-3.5 text-[15px] text-[var(--ink)] placeholder:text-[#6B7A75] transition duration-200 focus:border-[var(--accent)] focus:ring-4 focus:ring-[var(--accent)]/10 focus:outline-none";
  const labelClass = "block text-sm font-semibold text-[var(--ink)]";
  const fieldClass = "space-y-2";
  const optionalLabel = <span className="ml-1 font-normal text-[var(--ink-muted)]">({copy.optional})</span>;

  const fieldError = (name: string) => errors[name] ? <p id={`${name}-error`} className="text-[13px] font-medium text-red-700">{errors[name]}</p> : null;
  const errorProps = (name: string) => ({ "aria-invalid": Boolean(errors[name]), "aria-describedby": errors[name] ? `${name}-error` : undefined });

  return (
    <div className="mx-auto max-w-[900px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line-strong)] bg-white shadow-[0_24px_70px_-58px_rgba(13,148,136,0.2)]">
      <div className="p-6 sm:p-8 lg:p-10">
        {status === "success" ? (
          <div className="flex min-h-72 flex-col items-center justify-center py-8 text-center" aria-live="polite">
            <span className="flex size-14 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent-strong)]">
              <Check size={26} strokeWidth={2} />
            </span>
            <h3 className="mt-6 font-[family-name:var(--font-editorial)] text-3xl font-medium tracking-[-0.03em] text-[var(--ink)]">{copy.successTitle}</h3>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[var(--ink-muted)]">{copy.successBody}</p>
            <button type="button" onClick={() => setStatus("idle")} className="focus-ring mt-7 rounded-[var(--radius-sm)] border border-[var(--line-strong)] bg-white px-5 py-3 text-sm font-semibold text-[var(--ink)] transition hover:border-[var(--accent)] hover:text-[var(--accent-strong)] active:translate-y-px">
              {copy.another}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate aria-busy={status === "submitting"}>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className={fieldClass}>
                <label htmlFor="name" className={labelClass}>{copy.name} *</label>
                <input id="name" name="name" type="text" autoComplete="name" className={inputClass} placeholder={isVi ? "Tên của bạn" : "Your name"} {...errorProps("name")} />
                {fieldError("name")}
              </div>
              <div className={fieldClass}>
                <label htmlFor="email" className={labelClass}>{copy.email} *</label>
                <input id="email" name="email" type="email" autoComplete="email" className={inputClass} placeholder="you@example.com" {...errorProps("email")} />
                {fieldError("email")}
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className={fieldClass}>
                <label htmlFor="role" className={labelClass}>{copy.role} *</label>
                <select id="role" name="role" defaultValue="" className={inputClass} {...errorProps("role")}>
                  <option value="" disabled>{copy.selectRole}</option>
                  {roleOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
                {fieldError("role")}
              </div>
              <div className={fieldClass}>
                <label htmlFor="dataNeeded" className={labelClass}>{copy.data} *</label>
                <select id="dataNeeded" name="dataNeeded" defaultValue="" className={inputClass} {...errorProps("dataNeeded")}>
                  <option value="" disabled>{copy.selectData}</option>
                  {dataOptions.map((option) => <option key={option}>{option}</option>)}
                </select>
                {fieldError("dataNeeded")}
              </div>
            </div>

            <div className={`${fieldClass} mt-6`}>
              <label htmlFor="topic" className={labelClass}>{copy.topic} *</label>
              <textarea id="topic" name="topic" rows={3} className={`${inputClass} resize-y leading-6`} placeholder={isVi ? "Mô tả ngắn luận văn, bài báo hoặc chủ đề nghiên cứu của bạn." : "Briefly describe your thesis, paper, or research topic."} {...errorProps("topic")} />
              {fieldError("topic")}
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className={fieldClass}>
                <label htmlFor="sources" className={labelClass}>{copy.sources}{optionalLabel}</label>
                <textarea id="sources" name="sources" rows={3} className={`${inputClass} resize-y leading-6`} placeholder={isVi ? "Website, API, cơ sở dữ liệu, kho lưu trữ hoặc tạp chí..." : "Websites, APIs, databases, repositories, or journals..."} />
              </div>
              <div className={fieldClass}>
                <label htmlFor="expectedOutput" className={labelClass}>{copy.output}{optionalLabel}</label>
                <textarea id="expectedOutput" name="expectedOutput" rows={3} className={`${inputClass} resize-y leading-6`} placeholder={isVi ? "Ví dụ: CSV đã làm sạch, từ điển dữ liệu, trước ngày..." : "For example: cleaned CSV, data dictionary, needed by..."} />
              </div>
            </div>

            <div className={`${fieldClass} mt-6`}>
              <label htmlFor="sensitiveData" className={labelClass}>{copy.sensitive} *</label>
              <select id="sensitiveData" name="sensitiveData" defaultValue="" className={inputClass} {...errorProps("sensitiveData")}>
                <option value="" disabled>{copy.selectSensitive}</option>
                {sensitiveOptions.map((option) => <option key={option}>{option}</option>)}
              </select>
              {fieldError("sensitiveData")}
            </div>

            <div className="mt-7 border-t border-[var(--line)] pt-6">
              <p className="mb-4 text-center text-[13px] font-medium text-[var(--ink-muted)]">{copy.responseNote}</p>
              <button type="submit" disabled={status === "submitting"} className="focus-ring group inline-flex min-h-14 w-full items-center justify-center rounded-[var(--radius-sm)] border border-[var(--accent)] bg-[var(--accent)] px-8 text-base font-semibold text-white shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--accent-strong)] active:translate-y-px disabled:pointer-events-none disabled:opacity-70">
                {status === "submitting" ? copy.submitting : copy.submit}
                {status !== "submitting" && <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />}
              </button>
              <p className="mt-3 text-[13px] leading-5 text-[var(--ink-muted)]">{copy.privacy}</p>
            </div>
          </form>
        )}
      </div>

      <div className="border-t border-[var(--line)] bg-[var(--surface-subtle)]/35 px-6 py-7 sm:px-8 sm:py-8 lg:px-10">
        <div className="flex items-center gap-4">
          <span aria-hidden="true" className="h-px flex-1 bg-[var(--line-strong)]" />
          <span className="text-[13px] font-medium text-[var(--ink-muted)]">{copy.direct}</span>
          <span aria-hidden="true" className="h-px flex-1 bg-[var(--line-strong)]" />
        </div>
        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {contacts.map(({ label, detail, href, icon: Icon, external }) => (
            <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noreferrer" : undefined} aria-label={`${copy.openContact}: ${label}`} className="focus-ring group flex min-w-0 items-center gap-3 rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-white p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-card)] active:translate-y-px">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--accent-soft)] text-[var(--accent-strong)] transition-colors group-hover:bg-[var(--accent)] group-hover:text-white">
                <Icon aria-hidden="true" size={18} strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[var(--ink)]">{label}</span>
                <span className="mt-0.5 block truncate text-[13px] text-[var(--ink-muted)]">{detail}</span>
              </span>
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} className="shrink-0 text-[var(--ink-faint)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--accent-strong)]" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
