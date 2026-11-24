import type React from "react";
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import { LenisProvider } from "@/providers/lenis-provider";
import { rootMetadata } from "@/lib/seo/metadata";
import { businessGraph } from "@/lib/seo/schema";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = rootMetadata;
// The nonce in the site-wide CSP is generated per request. Every page that
// uses this layout must therefore render on demand so Next can attach it to
// its bootstrap scripts.
export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="antialiased"
    >
      <head>
        <link rel="preload" href="/fonts/proxima-regular.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/proxima-bold.woff" as="font" type="font/woff" crossOrigin="anonymous" />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="LLM Information" />
      </head>
      <body className="min-h-dvh bg-white font-sans text-slate-900">
        <JsonLd id="business-structured-data" data={businessGraph()} />
        <LenisProvider>
          <Suspense fallback={<div className="flex h-screen items-center justify-center text-[#0B4E61]">Loading…</div>}>
            {children}
          </Suspense>
        </LenisProvider>
      </body>
    </html>
  );
}
