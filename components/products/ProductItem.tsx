import {
  formatMoney,
  getLeastTicketTierPrice,
  ProductStatus,
} from '@/lib/utils';
import { ProductDetails } from '@/types/product';
import Link from 'next/link';
import React from 'react';

interface ProductItemSchema {
  product: ProductDetails;
}
const ProductItem = ({ product }: ProductItemSchema) => {
  const priceData = product.price ? (
    formatMoney(+product.price, product.currency)
  ) : (
    <>
      {formatMoney(
        +getLeastTicketTierPrice(product.ticket.ticket_tiers),
        product.currency
      )}
      +
    </>
  );

  let statusColor = '';

  if (product.status === ProductStatus.DRAFT) {
    statusColor = `bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300`;
  } else if (product.status === ProductStatus.ARCHIVED) {
    statusColor = `bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300`;
  } else if (product.status === ProductStatus.PUBLISHED) {
    statusColor = `bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300`;
  }

  return (
    <>
      <tr
        key={product.id}
        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
      >
        <td
          scope='row'
          className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold '
        >
          <button
            className='hover:text-primary-400'
            onClick={() => console.log('hello')}
          >
            {product.title}
          </button>
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold '>
          {priceData}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {product.business_info.business_name}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {product.type}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          <span
            className={`${statusColor} text-xs font-medium me-2 px-2.5 py-0.5 rounded`}
          >
            {product.status}
          </span>
        </td>
      </tr>
    </>
  );
};

export default ProductItem;
