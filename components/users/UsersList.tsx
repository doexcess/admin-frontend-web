import { dummyUsers } from '@/constants';
import { emailSplit, maskSensitiveData } from '@/lib/utils';
import React from 'react';
import ActionConfirmation from '../ActionConfirmation';
import DeletionConfirmation from '../ActionConfirmation';

const UsersList = ({ type }: { type: 'registered' | 'deleted' }) => {
  return (
    <div>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Phone
            </th>
            <th scope='col' className='px-6 py-3'>
              Country
            </th>
            <th scope='col' className='px-6 py-3'>
              Device
            </th>
            {type === 'registered' && (
              <th scope='col' className='px-6 py-3'>
                Status
              </th>
            )}
            <th scope='col' className='px-6 py-3'></th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user) => (
            <tr
              key={user.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
            >
              <th
                scope='row'
                className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold flex items-center gap-8'
              >
                <div
                  className={`p-4 rounded-full`}
                  style={{ backgroundColor: user.color }}
                >
                  <p className='text-white'>
                    {user.firstname[0]}
                    {user.lastname[0]}
                  </p>
                </div>
                <div>
                  {user.firstname} {user.lastname}{' '}
                  <span className='text-gray-400'>@{user.username}</span>
                  <br />
                  <p className='font-normal'>
                    {maskSensitiveData(emailSplit(user.email)[0])}@
                    {emailSplit(user.email)[1]}
                  </p>
                </div>
              </th>
              <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                {user.phone.slice(0, 3)}
                {maskSensitiveData(user.phone.slice(4))}
              </td>
              <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                {user.country}
              </td>
              <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                {user.device}
              </td>
              {type === 'registered' && (
                <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                  {user.isActive ? (
                    <span className='bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>
                      Active
                    </span>
                  ) : (
                    <span className='bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>
                      Frozen
                    </span>
                  )}
                </td>
              )}
              <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
                {type === 'registered' ? (
                  <>
                    {user.isActive && (
                      <ActionConfirmation
                        action='Freeze'
                        body='Are you sure you want to freeze this account?'
                        className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                      />
                    )}
                    {!user.isActive && (
                      <ActionConfirmation
                        action='Unfreeze'
                        body='Are you sure you want to unfreeze this account?'
                        className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                      />
                    )}
                  </>
                ) : (
                  <>
                    <ActionConfirmation
                      action='Restore'
                      body='Are you sure you want to restore this account?'
                      className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                    />
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
