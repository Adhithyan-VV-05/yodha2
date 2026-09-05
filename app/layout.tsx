import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YODHA 2.0 — WARRIORS OF AI",
  description: "RISE AS WARRIORS, THINK AS INNOVATORS, BUILD FOR HUMANITY. The premier AI Hackathon organized by AIDA & JECC.",
  keywords: ["YODHA", "YODHA 2.0", "AI Hackathon", "AIDA", "JECC", "Warriors of AI", "Healthcare AI", "Hackathon 2026"],
  authors: [{ name: "AIDA JECC", url: "https://aidajecc.in/" }],
  openGraph: {
    title: "YODHA 2.0 — WARRIORS OF AI",
    description: "RISE AS WARRIORS, THINK AS INNOVATORS, BUILD FOR HUMANITY.",
    url: "https://aidajecc.in/",
    siteName: "YODHA 2.0",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "YODHA 2.0 Hackathon",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-[#03060d] text-white selection:bg-blue-600 selection:text-white font-sans antialiased overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
