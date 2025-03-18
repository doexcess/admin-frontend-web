import { dummyProducts, dummyUsers } from '@/constants';
import { emailSplit, formatMoney, maskSensitiveData } from '@/lib/utils';
import React from 'react';
import ActionConfirmation from '../ActionConfirmation';
import DeletionConfirmation from '../ActionConfirmation';

const ProductsList = () => {
  return (
    <div>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Price
            </th>
            <th scope='col' className='px-6 py-3'>
              Organization
            </th>
            <th scope='col' className='px-6 py-3'>
              Type
            </th>
            <th scope='col' className='px-6 py-3'>
              Status
            </th>

            <th scope='col' className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {dummyProducts.map((product) => (
            <tr
              key={product.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
            >
              <td
                scope='row'
                className='px-6 text-gray-900 whitespace-nowrap dark:text-white font-bold '
              >
                {product.name}
              </td>
              <td className='px-6 text-gray-900 whitespace-nowrap dark:text-white font-bold '>
                {formatMoney(product.price, product.currency)}
              </td>
              <td className='px-6 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                {product.organization}
              </td>
              <td className='px-6 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                {product.type}
              </td>
              <td className='px-6 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                <span className='bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>
                  {product.status}
                </span>
              </td>

              <td className='px-6 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                <ActionConfirmation
                  action='Restore'
                  body='Are you sure you want to restore this account?'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsList;
