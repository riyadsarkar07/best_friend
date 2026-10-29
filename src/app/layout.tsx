import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Manrope } from "next/font/google";
import { friendshipConfig } from "@/data/friendship-config";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${friendshipConfig.siteTitle} · A surprise for ${friendshipConfig.friendName}`,
  description: `A handmade digital scrapbook for ${friendshipConfig.friendName}: memories, a letter, scratch cards, a tiny quiz, and one last surprise.`,
  openGraph: {
    title: `${friendshipConfig.siteTitle} · A surprise for ${friendshipConfig.friendName}`,
    description:
      "A handmade digital scrapbook: memories, letters, scratch cards, and a best-friend certificate.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4eee2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${manrope.variable} ${caveat.variable} paper-world antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
