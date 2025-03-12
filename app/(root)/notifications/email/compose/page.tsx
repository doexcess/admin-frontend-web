'use client';

import ComposeEmailForm from '@/components/notifications/email/ComposeEmailForm';
import PageHeading from '@/components/PageHeading';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiOutlineChevronLeft } from 'react-icons/hi';

const ComposeEmail = () => {
  const router = useRouter();

  const heading = (
    <div className='flex gap-1 items-center'>
      <HiOutlineChevronLeft
        className='cursor-pointer'
        onClick={() => router.back()}
      />
      New Email
    </div>
  );
  return (
    <main className='section-container'>
      <header>
        {/* Page Heading */}
        <PageHeading
          title={heading}
          enableBreadCrumb={true}
          layer2='Notifications'
          layer3='Email'
          layer4='Compose'
        />
      </header>

      <div className='p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700'>
        <ComposeEmailForm />
      </div>
    </main>
  );
};

export default ComposeEmail;
