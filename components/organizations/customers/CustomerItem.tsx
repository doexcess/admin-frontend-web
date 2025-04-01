import Drawer from '@/components/ui/Drawer';
import {
  BusinessState,
  emailSplit,
  maskSensitiveData,
  shortenId,
} from '@/lib/utils';
import { Business, Customer } from '@/types/organization';
import moment from 'moment-timezone';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface CustomerItemProps {
  customer: Customer;
}
const CustomerItem = ({ customer }: CustomerItemProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <tr
        key={customer.id}
        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
      >
        <th
          scope='row'
          className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold relative group'
        >
          <button
            className='hover:text-primary-400'
            onClick={() => setIsDrawerOpen(true)}
          >
            {shortenId(customer.id)}
          </button>

          {/* Show Product Image on Hover */}
          <div className='absolute left-20 mt-2 w-[50] object-contain bg-white border rounded-lg shadow-lg hidden group-hover:block z-20'>
            {customer?.profile?.profile_picture ? (
              <Image
                src={customer?.profile?.profile_picture}
                width={100}
                height={100}
                objectFit='cover'
                className='rounded-lg'
                alt='logo'
              />
            ) : (
              <div
                className={`px-4 py-3 rounded-full`}
                style={{ backgroundColor: 'blue' }}
              >
                <p className='text-white'>{customer.name[0]}</p>
              </div>
            )}
          </div>
        </th>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {customer.name}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {customer.email}
        </td>

        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {customer.phone || 'N/A'}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {customer.role.name}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {customer.profile?.country_code || 'N/A'}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {moment(customer.created_at).format('MMM D, YYYY')}
        </td>
      </tr>

      {/* Product Details Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div
          className='space-y-4 text-gray-900
dark:text-white'
        >
          <h2 className='text-lg font-bold'>{customer.name}</h2>

          {/* Customer Profile Picture */}
          {customer.profile?.profile_picture && (
            <div className='my-4'>
              <Image
                src={customer.profile?.profile_picture}
                alt={customer.profile?.profile_picture}
                width={300}
                height={200}
                className='rounded-lg'
              />
            </div>
          )}

          {/* Customer Details */}
          {/* <div className='mt-4 space-y-2 text-sm'>
            <p>
              <strong>Price:</strong> {priceData}
            </p>
            <p>
              <strong>Category:</strong> {product.category?.name || 'N/A'}
            </p>
            <p>
              <strong>Type:</strong> {product.type}
            </p>
            <p>
              <strong>Business:</strong> {product.business_info.business_name}
            </p>
            <p>
              <strong>Creator:</strong> {product.creator.name}
            </p>
            <p>
              <strong>Status:</strong> {product.status}
            </p>
            <p>
              <strong>Published At:</strong>{' '}
              {moment(product.published_at).format('MMMM D, YYYY')}
            </p>
            <p>
              <strong>Created At:</strong>{' '}
              {moment(product.created_at).format('MMMM D, YYYY')}
            </p>
          </div> */}
        </div>
      </Drawer>
    </>
  );
};
export default CustomerItem;
