import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Chenab Valley Rice",
  description:
    "Premium basmati grown in the Chenab river basin of southern Punjab.",
  icons: {
    icon: "/images/admin/crest.png",
    apple: "/images/admin/crest.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-surface-base font-sans text-ink-primary">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
