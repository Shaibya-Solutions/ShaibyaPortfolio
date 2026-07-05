import type React from "react";
import type { Metadata } from "next";
import { DM_Sans, Space_Grotesk } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { LenisProvider } from "@/providers/lenis-provider";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Shaibya Solutions — Engineering Impact",
  description:
    "We build digital systems that eliminate manual work and drive measurable growth. From Nagpur to the world.",
  generator: "Shaibya Solutions",
  openGraph: {
    title: "Shaibya Solutions — Engineering Impact",
    description: "Digital engineering studio building systems that actually work.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-dvh bg-white font-sans text-slate-900">
        <LenisProvider>
          <Suspense fallback={<div className="flex h-screen items-center justify-center text-[#0B4E61]">Loading…</div>}>
            {children}
          </Suspense>
        </LenisProvider>
      </body>
    </html>
  );
}
