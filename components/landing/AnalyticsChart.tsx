// components/AnalyticsChart.tsx
'use client';

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const data = [
  { month: 'Jan', profit: 400, expenses: 200 },
  { month: 'Feb', profit: 600, expenses: 300 },
  { month: 'Mar', profit: 700, expenses: 400 },
  { month: 'Apr', profit: 800, expenses: 500 },
  { month: 'May', profit: 900, expenses: 600 },
  { month: 'Jun', profit: 500, expenses: 300 },
  { month: 'Jul', profit: 600, expenses: 400 },
  { month: 'Aug', profit: 700, expenses: 500 },
  { month: 'Sep', profit: 800, expenses: 600 },
  { month: 'Oct', profit: 1100, expenses: 700 },
  { month: 'Nov', profit: 1200, expenses: 800 },
  { month: 'Dec', profit: 1300, expenses: 900 },
];

const AnalyticsChart = () => {
  return (
    <div className='rounded-xl'>
      <div className='flex justify-between items-center gap-4'>
        <h3 className='text-lg font-semibold'>Profit / Expenses Analytics</h3>

        <form>
          <select
            id='countries'
            className='w-40 bg-gray-50 border border-gray-300 dark:text-white text-sm rounded-lg 
      focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 
      dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            defaultValue='today'
          >
            {['Yearly'].map((value) => (
              <option key={value} value={value.toLowerCase()}>
                {value}
              </option>
            ))}
          </select>
        </form>
      </div>
      {/* Placeholder for chart */}
      <div className='mt-10'>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
            className='text-gray-800'
          >
            <XAxis dataKey='month' className='text-gr' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='profit' fill='#4F46E5' name='Profit' />
            <Bar dataKey='expenses' fill='#10B981' name='Expenses' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;
