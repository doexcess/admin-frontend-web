'use client';
import Bar from '@/components/bar/Index';
import SidebarNav from '@/components/bar/sidebar/SidebarNav';
import Topbar from '@/components/bar/topbar/Topbar';
import { useRedirect } from '@/hooks/useRedirect';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '@/redux/slices/authSlice';
import { RootState, AppDispatch } from '@/redux/store';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error, token } = useSelector(
    (state: RootState) => state.auth
  );

  if (!token) {
    return router.push('/sign-in');
  }

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
