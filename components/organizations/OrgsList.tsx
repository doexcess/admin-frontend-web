'use client';

import React from 'react';
import { Business } from '@/types/organization';
import { useSearchParams } from 'next/navigation';
import LoadingSkeleton from '../ui/LoadingSkeleton';
import OrgItem from './OrgItem';
import TableEndRecord from '../ui/TableEndRecord';
import Pagination from '../Pagination';
import { BusinessState } from '@/lib/utils';

interface OrgsListProps {
  type: BusinessState;
  organizations: Business[];
  count: number;
  onClickNext: () => void;
  onClickPrev: () => void;
  currentPage: number;
  loading: boolean;
}
const OrgsList = ({
  type,
  organizations,
  count,
  onClickNext,
  onClickPrev,
  currentPage,
  loading,
}: OrgsListProps) => {
  const searchParams = useSearchParams();
  if (loading) return <LoadingSkeleton />;

  const noFoundText = searchParams.has('q') ? 'No record found.' : undefined;

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
            {type === BusinessState.registered && (
              <th scope='col' className='px-6 py-3'>
                Status
              </th>
            )}
            <th scope='col' className='px-6 py-3'>
              Date Created
            </th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((organization) => (
            <OrgItem type={type} organization={organization} />
          ))}

          {!organizations.length && (
            <TableEndRecord
              colspan={type === BusinessState.registered ? 6 : 5}
              text={noFoundText}
            />
          )}
        </tbody>
      </table>
      {/* Pagination */}
      <Pagination
        total={count}
        currentPage={currentPage}
        onClickNext={onClickNext}
        onClickPrev={onClickPrev}
        noMoreNextPage={organizations.length === 0}
      />
    </div>
  );
};

export default OrgsList;
