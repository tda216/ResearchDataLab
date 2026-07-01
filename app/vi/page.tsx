import type { Metadata } from "next";
import { LandingPage } from "../page";

export const metadata: Metadata = {
  title: "Research Data Lab | Dữ liệu sẵn sàng cho nghiên cứu",
  description: "Thu thập, làm sạch, lập tài liệu và bàn giao dữ liệu có thể tái lập cho luận văn và dự án học thuật.",
  alternates: {
    canonical: "/vi",
    languages: { en: "/", vi: "/vi" },
  },
  openGraph: {
    title: "Research Data Lab | Dữ liệu sẵn sàng cho nghiên cứu",
    description: "Biến các nguồn dữ liệu khó sử dụng thành bộ dữ liệu sạch, có tài liệu và có thể tái lập cho nghiên cứu học thuật.",
    type: "website",
  },
};

export default function VietnamesePage() {
  return <LandingPage locale="vi" />;
}
