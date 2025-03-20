import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ToastProvider } from '@/components/providers/toaster-provider';
import { ConfettiProvider } from '@/components/providers/confetti-provider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

import ReduxProvider from '@/redux/redux-provider';

export const metadata: Metadata = {
  title: 'Doexcess Admin',
  description: 'Streamline and automate essential processes.',
  icons: {
    icon: '/icons/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <html lang='en'>
        <ConfettiProvider />
        <ToastProvider />
        <body className={inter.className}>{children}</body>
      </html>
    </ReduxProvider>
  );
}
