'use client';

import React, { useState } from 'react';
import PageHeading from '@/components/PageHeading';
import Filter from '@/components/Filter';
import NotificationStatus from '@/components/notifications/Status';
import Link from 'next/link';
import { HiPlus } from 'react-icons/hi';
import { NotificationKind } from '@/lib/utils';
import NotificationsList from '@/components/notifications/email/NotificationsList';
import useNotification from '@/hooks/page/useNotification';
import { useSearchParams } from 'next/navigation';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';

const EmailNotification = () => {
  const [notificationType, setNotificationType] = useState(
    NotificationKind.IMMEDIATE
  );

  const {
    notifications,
    notificationLoading,
    totalNotifications,
    onClickNext,
    onClickPrev,
    currentPage,
    q,
    startDate,
    endDate,
    handleSearchSubmit,
    handleFilterByDateSubmit,
    handleRefresh,
  } = useNotification();

  return (
    <main>
      <header className='section-container'>
        {/* Page Heading */}
        <PageHeading
          title='Email Notifications'
          enableBreadCrumb={true}
          layer2='Notifications'
          layer3='Email'
        />

        {/* Filter */}
        <Filter
          showPeriod={false}
          handleSearchSubmit={handleSearchSubmit}
          handleFilterByDateSubmit={handleFilterByDateSubmit}
          handleRefresh={handleRefresh}
          extra={
            <>
              <NotificationStatus
                setNotificationType={setNotificationType}
                notificationType={notificationType}
              />
              <Link
                href={`/notifications/email/compose?type=${notificationType}`}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-1'
              >
                {' '}
                <HiPlus />
                Compose
              </Link>
            </>
          }
        />
      </header>
      <section className='section-container-padding-0'>
        <NotificationsList
          notifications={notifications}
          count={totalNotifications}
          onClickNext={onClickNext}
          onClickPrev={onClickPrev}
          currentPage={currentPage}
          loading={notificationLoading}
        />
      </section>
    </main>
  );
};

export default EmailNotification;
