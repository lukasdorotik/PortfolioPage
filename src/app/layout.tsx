import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Providers } from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Studio Lumen — Real Estate Photography, Video & FPV",
  description:
    "Architectural real estate photography, cinematic video and FPV drone fly-throughs, colour-graded in DaVinci Resolve.",
};

export const viewport: Viewport = {
  themeColor: "#f8f7f4",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full overflow-x-clip">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
