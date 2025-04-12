'use client';

import React, { useState } from 'react';
import PageHeading from '@/components/PageHeading';
import Filter from '@/components/Filter';
import Pagination from '@/components/Pagination';
import NotificationStatus from '@/components/notifications/Status';
import Link from 'next/link';
import { HiPlus } from 'react-icons/hi';
import {
  NotificationType,
  emails,
  getColor,
  NOTIFICATION_STATUS,
} from '@/lib/utils';
import Badge from '@/components/ui/SystemBadge';
import { capitalize } from 'lodash';
import ActionDropdown from '@/components/notifications/ActionDropdown';

const EmailNotification = () => {
  const [notificationType, setNotificationType] = useState(
    NotificationType.IMMEDIATE
  );

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
          extra={
            <>
              <NotificationStatus
                setNotificationType={setNotificationType}
                notificationType={notificationType}
              />
              <Link
                href={`/notifications/email/compose?type=${notificationType}`}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex items-center gap-1'
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
        <div className='overflow-x-auto rounded-none'>
          <div className='relative overflow-x-auto'>
            <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
              <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 min-w-full divide-y '>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    Subject
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Preheader
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Template
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Status
                  </th>

                  <th scope='col' className='px-6 py-3'></th>
                </tr>
              </thead>
              <tbody>
                {emails.map((email) => (
                  <tr
                    key={email.id}
                    className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                  >
                    <td className='px-6 py-4 max-w-sm whitespace-nowrap overflow-hidden text-ellipsis text-gray-900 dark:text-white font-bold'>
                      {email.subject}
                    </td>
                    <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                      {email.preheader}
                    </td>
                    <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                      {capitalize(email.template)}
                    </td>
                    <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                      <Badge
                        color={getColor(email.status)!}
                        text={capitalize(email.status)}
                      />
                    </td>

                    <td className='flex px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                      <ActionDropdown
                        id={email.id}
                        status={email.status as NOTIFICATION_STATUS}
                        notificationType={notificationType}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <Pagination total={emails.length} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default EmailNotification;
