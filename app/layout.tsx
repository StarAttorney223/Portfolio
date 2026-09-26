import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Divyansh Chandrakar — Computer Science Student & Developer",
    template: "%s | Divyansh Chandrakar",
  },
  description:
    "Personal portfolio of Divyansh Chandrakar, a Computer Science student and full-stack developer building robust web applications, AI systems, and interactive experiences.",
  keywords: [
    "Divyansh Chandrakar",
    "Computer Science",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "Node.js",
    "AI",
    "Machine Learning",
    "Portfolio",
  ],
  authors: [{ name: "Divyansh Chandrakar" }],
  creator: "Divyansh Chandrakar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://divyanshchandrakar.dev",
    title: "Divyansh Chandrakar — Computer Science Student & Developer",
    description:
      "Personal portfolio of Divyansh Chandrakar — Computer Science student and full-stack developer building web applications, AI tools, and interactive experiences.",
    siteName: "Divyansh Chandrakar Portfolio",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans bg-[#0A0A0A] text-[#E5E2DA] antialiased">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
