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
    template: '%s | ノベトーク',
    default: 'ノベトーク | LINEみたいな会話小説を無料で作成',
  },
  description: 'LINEのようなチャット形式の小説を無料で作成・共有できるサービス。タップで進む物語を簡単に作って、友達にシェアしよう！登録不要ですぐに始められます。',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: {
    title: 'ノベトーク | 会話小説を無料で作成・共有',
    description: 'LINEのようなチャット形式の小説を無料で作成・共有できるサービス。タップで進む物語を簡単に作って、友達にシェアしよう！',
    url: '/',
    siteName: 'ノベトーク',
    locale: 'ja_JP',
    type: 'website',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'ノベトーク',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ノベトーク | 会話小説を無料で作成・共有',
    description: 'LINEのようなチャット形式の小説を無料で作成・共有できるサービス。タップで進む物語を簡単に作って、友達にシェアしよう！',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'ノベトーク',
      },
    ],
  },
  keywords: ['ノベトーク', 'チャット小説', 'LINE風小説', '会話小説', 'SS', '創作', '二次創作', '無料'],
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
    <html lang="ja" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full`}
      >
        <ToastProvider />
        {children}
      </body>
    </html>
  );
}
