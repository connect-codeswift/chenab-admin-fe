import type { Metadata } from "next";
import { AdminHeader } from "@/components/admin/header";
import { InquiriesContent } from "@/components/admin/inquiries/inquiries-content";
import { INQUIRIES } from "@/components/admin/inquiries/inquiries-data";

export const metadata: Metadata = {
  title: "Trade Inquiries | Chenab Valley Rice Admin",
  description: "Trade and export inquiries, their status and owner.",
  robots: { index: false, follow: false },
};

export default function AdminInquiriesPage() {
  const inquiryWord = INQUIRIES.length === 1 ? "inquiry" : "inquiries";

  return (
    <>
      <AdminHeader
        title="Trade Inquiries"
        subtitle={`${INQUIRIES.length} ${inquiryWord}`}
      />
      <InquiriesContent inquiries={INQUIRIES} />
    </>
  );
}
