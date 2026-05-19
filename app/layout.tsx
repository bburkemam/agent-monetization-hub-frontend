import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout } from "@/components";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agent Monetization Hub | Monetization Frameworks & Tools",
  description: "Discover 10+ revenue streams, learn from case studies, and scale your agent business. API-first platform for agent monetization.",
  openGraph: {
    title: "Agent Monetization Hub",
    description: "Discover 10+ revenue streams and monetize your agent business",
    url: "https://agentmonetization.io",
    siteName: "Agent Monetization Hub",
    locale: "en_US",
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
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
