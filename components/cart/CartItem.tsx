import { formatMoney, ProductType, shortenId } from '@/lib/utils';
import { Cart } from '@/types/cart';
import React, { useState } from 'react';
import Drawer from '@/components/ui/Drawer'; // Import a drawer component

import moment from 'moment'; // Import moment.js

interface CartItemProps {
  cart_item: Cart;
}
const CartItem = ({ cart_item }: CartItemProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const latest_cart_item = cart_item.items[0];

  const currency =
    latest_cart_item.product_type === ProductType.COURSE
      ? latest_cart_item.course?.currency
      : latest_cart_item.ticket_tier?.currency;

  let priceData = 0;
  cart_item.items.forEach((item) => {
    priceData += +item.price_at_time * item.quantity;
  });

  let business_name =
    latest_cart_item.product_type === ProductType.COURSE
      ? latest_cart_item.course?.business_info.business_name
      : latest_cart_item.ticket_tier?.ticket.product.business_info
          .business_name;

  let items = cart_item.items.map((item) =>
    item.product_type === ProductType.COURSE ? (
      <li>
        {item.course?.title} -{' '}
        {formatMoney(+item.price_at_time, item.course?.currency)} (
        {item.quantity})
      </li>
    ) : (
      <li>
        {item.ticket_tier?.name} -{' '}
        {formatMoney(+item.price_at_time, item.ticket_tier?.currency)} (
        {item.quantity})
      </li>
    )
  );

  return (
    <>
      <tr
        key={cart_item.id}
        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
      >
        <td
          scope='row'
          className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold relative group'
        >
          <button
            className='hover:text-primary-400'
            onClick={() => setIsDrawerOpen(true)}
          >
            {shortenId(cart_item.id)}
          </button>
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {items}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {cart_item.user.name}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {formatMoney(priceData, currency)}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {business_name}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'>
          {moment(cart_item.updated_at).format('MMM D, YYYY')}
        </td>
      </tr>

      {/* Product Details Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <div
          className='space-y-4 text-gray-900
dark:text-white'
        >
          <h2 className='text-lg font-bold'>{shortenId(cart_item.id)}</h2>

          {items}

          {/* Product Details */}
          <div className='mt-4 space-y-2 text-sm'>
            <p>
              <strong>Organization:</strong> {business_name}
            </p>
            <p>
              <strong>Cart owner:</strong> {cart_item.user.name}
            </p>
            <p>
              <strong>Cart owner email:</strong> {cart_item.user.email}
            </p>
            <p>
              <strong>Date Added:</strong>{' '}
              {moment(cart_item.updated_at).format('MMMM D, YYYY')}
            </p>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default CartItem;
