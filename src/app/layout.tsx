import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "tRPC - End-to-end Type Safety",
  description:
    "Move fast and break nothing with tRPC. Build fully type-safe APIs with ease.",
  openGraph: {
    title: "tRPC - End-to-end Type Safety",
    description:
      "Move fast and break nothing with tRPC. Build fully type-safe APIs with ease.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "tRPC - End-to-end Type Safety",
    description:
      "Move fast and break nothing with tRPC. Build fully type-safe APIs with ease.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
