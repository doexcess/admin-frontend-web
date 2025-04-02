import { formatMoney, PaymentStatus, shortenId } from '@/lib/utils';
import React, { useState } from 'react';
import Drawer from '@/components/ui/Drawer'; // Import a drawer component

import moment from 'moment'; // Import moment.js
import { Transaction } from '@/types/payment';
import Link from 'next/link';
import { SubscriptionPlan } from '@/types/subscription-plan';
import { capitalize } from 'lodash';

interface SubscriptionPlanItemProps {
  subscription_plan: SubscriptionPlan;
}
const SubscriptionPlanItem = ({
  subscription_plan,
}: SubscriptionPlanItemProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // const priceData = formatMoney(+payment.amount, payment.currency);

  let pricing = subscription_plan.subscription_plan_prices.length
    ? subscription_plan.subscription_plan_prices.map((plan_price) => (
        <li>
          {capitalize(plan_price.period)} -{' '}
          {formatMoney(+plan_price.price, 'NGN')}
        </li>
      ))
    : 'N/A';

  let roles = subscription_plan.subscription_plan_roles.length
    ? subscription_plan.subscription_plan_roles.map((plan_role) => (
        <li>
          {capitalize(plan_role.title)} {plan_role.selected && '✅'}
        </li>
      ))
    : 'N/A';

  // let items = (in_table: boolean) => {
  //   let details = payment.purchase
  //     ? payment.purchase?.items.map((item) => (
  //         <li title={item.purchase_type}>
  //           {item.name} x {item.quantity}
  //           {!in_table && (
  //             <div className='ml-5 mt-2'>
  //               Type: {item.purchase_type}
  //               <br />
  //               Currency: {formatMoney(item.price, payment.currency)}
  //             </div>
  //           )}
  //         </li>
  //       ))
  //     : payment.subscription_plan.name;

  //   return details;
  // };

  return (
    <>
      <tr
        key={subscription_plan.id}
        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
      >
        <td
          scope='row'
          className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold relative group'
        >
          <button
            className='hover:text-primary-400'
            onClick={() => setIsDrawerOpen(true)}
            title={subscription_plan.id}
          >
            {shortenId(subscription_plan.id)}
          </button>
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {subscription_plan.name}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {subscription_plan.creator.name}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {subscription_plan.business.business_name}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {pricing}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {roles}
        </td>

        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'>
          {moment(subscription_plan.created_at).format('MMM D, YYYY')}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white'>
          {moment(subscription_plan.updated_at).format('MMM D, YYYY')}
        </td>
      </tr>

      {/* Payment Details Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <section
          className='space-y-4 text-gray-900
dark:text-white'
        >
          <h2 className='text-lg font-bold'>
            #{shortenId(subscription_plan.id)}
          </h2>

          <p className='text-lg font-bold'>Pricing</p>
          {pricing}

          {/* <p className='text-lg font-bold'>Total</p>
          <span className='text-lg'>{priceData}</span> */}

          {/* Buyer's Details */}
          {/* <div className='space-y-2'>
            <p>
              <strong>Name:</strong> {payment.user.name}
            </p>
            <p>
              <strong>Email Address:</strong> {payment.user.email}
              {payment.user.is_email_verified && '✅'}
            </p>

            <p>
              <strong>Account Creation Date:</strong>{' '}
              {moment(payment.created_at).format('MMMM D, YYYY')}
            </p>
          </div> */}

          <div>
            <Link
              href={`/organizations/${subscription_plan?.business_id}/details`}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              View business
            </Link>
          </div>
        </section>
      </Drawer>
    </>
  );
};

export default SubscriptionPlanItem;
