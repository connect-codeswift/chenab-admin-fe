export type InquiryStatus = "new" | "contacted" | "quoted" | "won" | "lost";

export type InquiryRow = Readonly<{
  id: string;
  company: string;
  type: string;
  country: string;
  volume: string;
  status: InquiryStatus;
  owner: string;
  receivedOn: string;
  note: string;
}>;
