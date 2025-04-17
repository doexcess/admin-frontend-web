import Badge from '@/components/ui/SystemBadge';
import {
  getColor,
  NOTIFICATION_STATUS,
  NotificationKind,
  shortenId,
} from '@/lib/utils';
import { Notification } from '@/types/notification';
import { capitalize } from 'lodash';
import React from 'react';
import ActionDropdown from '../ActionDropdown';
import moment from 'moment-timezone';

interface NotificationItemProps {
  notification: Notification;
}
const NotificationItem = ({ notification }: NotificationItemProps) => {
  const sender = notification.owner
    ? `${notification.owner?.name} (${shortenId(notification.owner?.id!)})`
    : notification.business
    ? `${notification.business?.business_name} (${shortenId(
        notification.business?.id!
      )})`
    : 'N/A';

  const status = notification.status
    ? NOTIFICATION_STATUS.DELIVERED
    : NOTIFICATION_STATUS.FAILED;

  return (
    <tr
      key={notification.id}
      className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
    >
      <td className='px-6 py-4 max-w-sm whitespace-nowrap overflow-hidden text-ellipsis text-gray-900 dark:text-white font-bold'>
        {notification.title}
      </td>
      <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
        {sender}
      </td>
      <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
        {notification.is_scheduled
          ? capitalize(NotificationKind.SCHEDULED)
          : capitalize(NotificationKind.IMMEDIATE)}
      </td>
      <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
        <Badge color={getColor(status)!} text={capitalize(status)} />
      </td>
      <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
        {moment(notification.created_at).format('MMMM D, YYYY')}
      </td>

      <td className='flex px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
        <ActionDropdown
          id={notification.id}
          status={status}
          notificationType={notification.type}
        />
      </td>
    </tr>
  );
};

export default NotificationItem;
