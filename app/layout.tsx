import type { Metadata } from "next";
import { Jost, Rubik } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

const rubik = Rubik({ variable: "--font-rubik", subsets: ["latin", "latin-ext"] });
const jost = Jost({ variable: "--font-jost", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: { default: "SAFE.AI — Safer workplaces for healthcare workers", template: "%s · SAFE.AI" },
  description:
    "A privacy-conscious incident reporting platform that helps healthcare workers report violence and helps facilities prevent it.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${rubik.variable} ${jost.variable}`}>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
