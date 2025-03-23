import { BusinessState, emailSplit, maskSensitiveData } from '@/lib/utils';
import { Business } from '@/types/organization';
import React, { useState } from 'react';

interface OrgItemProps {
  type: BusinessState;
  organization: Business;
}
const OrgItem = ({ type, organization }: OrgItemProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <tr
        key={organization.id}
        className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
      >
        <th
          scope='row'
          className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold flex items-center gap-8'
        >
          <div
            className={`px-4 py-3 rounded-full`}
            style={{ backgroundColor: 'blue' }}
          >
            <p className='text-white'>{organization.user.name[0]}</p>
          </div>
          <div>
            {organization.user.name}{' '}
            <span className='text-gray-400'>@{organization.business_name}</span>
            <br />
            <p className='font-normal'>
              {maskSensitiveData(emailSplit(organization.user.email)[0])}@
              {emailSplit(organization.user.email)[1]}
            </p>
          </div>
        </th>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {organization.user.phone &&
            `${organization.user.phone.slice(0, 3)} ${maskSensitiveData(
              organization.user.phone.slice(4)
            )}`}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {organization.country_code}
        </td>
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {''}
        </td>
        {type === BusinessState.registered && (
          <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
            {/* {user.isActive ? (
              <span className='bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300'>
                Active
              </span>
            ) : (
              <span className='bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300'>
                Frozen
              </span>
            )} */}
          </td>
        )}
        <td className='px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white font-bold'>
          {type === BusinessState.registered ? (
            <>
              {/* {organization.user. && (
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
              )} */}
            </>
          ) : (
            <>
              {/* <ActionConfirmation
                action='Restore'
                body='Are you sure you want to restore this account?'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              /> */}
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default OrgItem;
