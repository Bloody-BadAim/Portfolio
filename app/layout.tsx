import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Matin Khajehfard | Fullstack Developer | AI Engineer",
  description:
    "Fullstack developer en AI engineer met focus op traceability, betrouwbare delivery en productkwaliteit.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Matin Khajehfard | Fullstack Developer | AI Engineer",
    description:
      "Fullstack developer en AI engineer met focus op traceability, betrouwbare delivery en productkwaliteit.",
    url: "https://example.com",
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
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
