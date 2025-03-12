'use client';
import Bar from '@/components/bar/Index';
import SidebarNav from '@/components/bar/sidebar/SidebarNav';
import Topbar from '@/components/bar/topbar/Topbar';
import { useRedirect } from '@/hooks/useRedirect';
import { useAppSelector } from '@/redux/store';
import React from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authState = useAppSelector((state) => state.auth);

  const { isLoggedIn, redirectUrl } = useRedirect(authState);

  // if (!isLoggedIn) {
  //   if (typeof window !== 'undefined') {
  //     // @ts-ignore
  //     window.location = redirectUrl;
  //   }
  // }

  return (
    <main className='flex h-screen w-full font-inter'>
      <div className='flex size-full flex-col'>
        <div className='main-container'>
          <Bar />
          {children}
        </div>
      </div>
    </main>
  );
}
