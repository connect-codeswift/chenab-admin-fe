import type {
  InquiryRow,
  InquiryStatus,
} from "@/components/admin/inquiries/inquiries-types";

/* Placeholder rows from Figma node 212:4151 — no admin API yet. */

export const INQUIRY_STATUS_LABEL: Record<InquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  quoted: "Quoted",
  won: "Won",
  lost: "Lost",
};

export const INQUIRY_STATUSES: readonly InquiryStatus[] = [
  "new",
  "contacted",
  "quoted",
  "won",
  "lost",
];

/* An unassigned inquiry shows an em dash rather than an empty cell. */
export const UNASSIGNED_OWNER = "—";

export const INQUIRIES: readonly InquiryRow[] = [
  {
    id: "tariq-traders",
    company: "Tariq Traders",
    type: "Distributor",
    country: "Pakistan",
    volume: "5,000 kg/month",
    status: "new",
    owner: UNASSIGNED_OWNER,
    receivedOn: "04 Aug 2026",
    note: "",
  },
  {
    id: "gulf-foods-llc",
    company: "Gulf Foods LLC",
    type: "Export",
    country: "UAE",
    volume: "20 tonnes/year",
    status: "quoted",
    owner: "Rauf",
    receivedOn: "02 Aug 2026",
    note: "",
  },
  {
    id: "crescent-mart",
    company: "Crescent Mart",
    type: "Retailer",
    country: "Pakistan",
    volume: "500 kg/month",
    status: "contacted",
    owner: "Saima",
    receivedOn: "01 Aug 2026",
    note: "",
  },
  {
    id: "uk-asian-foods",
    company: "UK Asian Foods",
    type: "Export",
    country: "UK",
    volume: "10 tonnes/year",
    status: "won",
    owner: "Rauf",
    receivedOn: "28 Jul 2026",
    note: "",
  },
];
