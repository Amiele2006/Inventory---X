
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// import { NextNProgress } from 'nextjs-progressbar';

import { headers } from 'next/headers';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const generateMetadata = async (): Promise<Metadata> => {
  const headersList = await headers();
  const host = headersList.get('host') || 'inventory-x.com';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}` as const;

  return {
    title: 'Inventory-X - Supermarket Management System',
    description: 'Inventory-X helps supermarkets manage inventory, track sales, and gain real-time insights. Streamline your supermarket operations with ease.',
    metadataBase: new URL(baseUrl),
    openGraph: {
      images: [
        {
          url: '/images/og.png',
          width: 1200,
          height: 630,
          alt: 'Inventory-X - Supermarket Management System'
        }
      ],
      type: 'website',
      url: baseUrl,
      title: 'Inventory-X - Supermarket Management System',
      description: 'Manage your supermarket inventory, track sales, and gain real-time insights with Inventory-X. Streamline your operations effortlessly.',
      siteName: 'Inventory-X',
      locale: 'en_US'
    },
    keywords: ['Inventory-X', 'supermarket management', 'inventory tracking', 'sales tracking', 'real-time insights', 'supermarket operations'],
    authors: [{ name: 'Inventory-X Team' }],
    robots: 'index, follow'
  };
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      
        {children}
      </body>
    </html>
  );
}
