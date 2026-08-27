import { INQUIRY_STATUS_LABEL } from "@/components/admin/inquiries/inquiries-data";
import type { InquiryStatus } from "@/components/admin/inquiries/inquiries-types";

export type InquiryStatusBadgeProps = Readonly<{
  status: InquiryStatus;
}>;

const pillClassByStatus: Record<InquiryStatus, string> = {
  new: "bg-surface-sunken text-ink-muted",
  contacted: "bg-brand-accent/12 text-brand-accent",
  quoted: "bg-brand-accent/12 text-brand-accent",
  won: "bg-state-positive/12 text-state-positive-ink",
  lost: "bg-state-critical/10 text-state-critical",
};

export function InquiryStatusBadge(props: Readonly<InquiryStatusBadgeProps>) {
  const { status } = props;

  return (
    <span
      className={`inline-flex rounded px-2 py-0.5 text-caption font-medium ${pillClassByStatus[status]}`}
    >
      {INQUIRY_STATUS_LABEL[status]}
    </span>
  );
}
