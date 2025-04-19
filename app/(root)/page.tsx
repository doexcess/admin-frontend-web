'use client';

import DoughnutChart from '@/components/DoughnutChart';
import AnalyticsChart from '@/components/landing/AnalyticsChart';
import useMetrics from '@/hooks/page/useMetrics';
import useRevenue from '@/hooks/page/useRevenue';
// import MapChart from '@/components/landing/MapChart';
import { productTypes } from '@/lib/utils';
import React from 'react';

const Home = () => {
  const { metrics, metricsLoading } = useMetrics();
  const { revenue, revenuesLoading } = useRevenue();
  return (
    <main className='section-container'>
      <div className='flex h-screen'>
        {/* Main Content */}
        <main className='flex-1 p-6 text-black-1 dark:text-white'>
          <header className='flex justify-between items-center'>
            <h2 className='text-2xl font-semibold '>Hello, Admin 👋🏼</h2>
            {/* <button className='bg-primary-main text-white px-4 py-2 rounded-md'>
              Export
            </button> */}
          </header>

          {/* Stats */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6'>
            {[
              {
                label: 'Registered Organizations',
                value: metrics?.total_organizations,
                change: '',
              },
              { label: 'Revenue', value: metrics?.total_revenue, change: '' },
              {
                label: 'Orders',
                value: metrics?.total_product_orders,
                change: '',
              },
              {
                label: 'Withdrawals',
                value: metrics?.total_withdrawals,
                change: '',
              },
            ].map((stat, index) => (
              <div
                key={index}
                className='bg-white dark:bg-gray-800 p-4 rounded-md shadow-md'
              >
                <h3 className='text-gray-600 dark:text-white'>{stat.label}</h3>
                <div className='flex gap-2 items-center'>
                  <p className='text-xl font-bold'>{stat.value}</p>
                  <span
                    className={
                      stat.change.includes('-')
                        ? 'text-red-500'
                        : 'text-green-500'
                    }
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Graph & Map */}
          <div className='mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6 '>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-md shadow-md lg:col-span-2'>
              <AnalyticsChart />
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-md shadow-md'>
              <h3 className='text-lg font-semibold'>Products Overview</h3>
              <DoughnutChart title='Products Overview' data={productTypes} />
            </div>
          </div>
        </main>
      </div>
    </main>
  );
};

export default Home;
