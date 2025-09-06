import type { Metadata } from 'next';
import { Ma_Shan_Zheng } from 'next/font/google';
import './globals.css';

const maShanZheng = Ma_Shan_Zheng({
  variable: '--font-ma-shan-zheng',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: '今天吃点啥',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${maShanZheng.variable} antialiased`}>{children}</body>
    </html>
  );
}
