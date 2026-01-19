import type { Metadata } from "next";
import { Playfair_Display, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import "@fontsource-variable/playfair-display";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Matin Khajehfard | Fullstack Developer | AI Engineer",
  description:
    "Fullstack developer en AI engineer met focus op traceability, betrouwbare delivery en productkwaliteit.",
  metadataBase: new URL("https://portfolio-etercx1n4-bloody-badaims-projects.vercel.app"),
  openGraph: {
    title: "Matin Khajehfard | Fullstack Developer | AI Engineer",
    description:
      "Fullstack developer en AI engineer met focus op traceability, betrouwbare delivery en productkwaliteit.",
    url: "https://portfolio-etercx1n4-bloody-badaims-projects.vercel.app",
    siteName: "Matin Khajehfard",
    images: [
      {
        url: "/images/og.svg",
        width: 1200,
        height: 630,
        alt: "Matin Khajehfard portfolio",
      },
    ],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matin Khajehfard | Fullstack Developer | AI Engineer",
    description:
      "Fullstack developer en AI engineer met focus op traceability, betrouwbare delivery en productkwaliteit.",
    images: ["/images/og.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${playfairDisplay.variable} font-sans`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
