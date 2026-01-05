import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Chat Novel Maker',
    default: 'Chat Novel Maker - チャット小説を作ってシェアしよう',
  },
  description: 'チャット形式の小説を誰でも簡単に作成・公開できるサービスです。タップで進む物語を作って、友達にシェアしよう！',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'Chat Novel Maker',
    description: 'チャット形式の小説を誰でも簡単に作成・公開できるサービスです。',
    url: '/',
    siteName: 'Chat Novel Maker',
    locale: 'ja_JP',
    type: 'website',
    images: ['/api/og?title=Chat%20Novel%20Maker&author=Official'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chat Novel Maker',
    description: 'チャット形式の小説を誰でも簡単に作成・公開できるサービスです。',
    images: ['/api/og?title=Chat%20Novel%20Maker&author=Official'],
  },
  keywords: ['チャット小説', '創作', '小説メーカー', 'SS', '二次創作'],
  verification: {
    google: "Q1NCcjpd6tazY4ONqhcn1tKsKTNdtCOK7i9QYyPEALM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
