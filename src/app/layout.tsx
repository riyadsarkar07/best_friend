import type { Metadata } from "next";
import { Caveat, Nunito, Playfair_Display } from "next/font/google";
import { friendshipConfig } from "@/data/friendship-config";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${friendshipConfig.siteTitle} for ${friendshipConfig.friendName}`,
  description:
    "A handmade digital scrapbook surprise: memories, letters, scratch cards, and a best-friend certificate.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${nunito.variable} ${caveat.variable} paper-world antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
