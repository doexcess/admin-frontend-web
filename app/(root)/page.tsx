'use client';
import AnalyticsChart from '@/components/landing/AnalyticsChart';
import MapChart from '@/components/landing/MapChart';
import React from 'react';

const Home = () => {
  return (
    <main className='section-container'>
      <div className='flex h-screen'>
        {/* Main Content */}
        <main className='flex-1 p-6'>
          <header className='flex justify-between items-center'>
            <h2 className='text-2xl font-semibold'>Hello, Admin 👋🏼</h2>
            <button className='bg-primary-main text-white px-4 py-2 rounded-md'>
              Export
            </button>
          </header>

          {/* Stats */}
          <div className='grid grid-cols-4 gap-4 mt-6'>
            {[
              { label: 'Total Visitors', value: '45,890', change: '-0.5%' },
              { label: 'Revenue', value: '$48,575', change: '+3.84%' },
              { label: 'Orders', value: '4,800+', change: '+1.46%' },
              { label: 'Expenses', value: '$24,351', change: '1.6%' },
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
          <div className='mt-8 grid grid-cols-3 gap-6 '>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-md shadow-md col-span-2'>
              <AnalyticsChart />
            </div>
            <div className='bg-white dark:bg-gray-800 p-6 rounded-md shadow-md'>
              <MapChart />
            </div>
          </div>
        </main>
      </div>
    </main>
  );
};

export default Home;
