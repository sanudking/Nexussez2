import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Nexus-SEZ Pro India | National Industrial OS',
  description:
    'National Industrial Geospatial Operating System – real-time mapping and analytics for India\'s industrial clusters and special economic zones.',
  keywords: ['India', 'SEZ', 'industrial clusters', 'geospatial', 'logistics', 'manufacturing'],
  themeColor: '#050a0e',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-screen bg-industrial-black text-industrial-text antialiased">
        {children}
      </body>
    </html>
  );
}
