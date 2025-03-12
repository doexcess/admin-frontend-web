'use client';

import PageHeading from '@/components/PageHeading';
import Pagination from '@/components/Pagination';
import Filter from '@/components/users/Filter';
import UsersList from '@/components/users/UsersList';
import { dummyUsers } from '@/constants';

import React from 'react';

const RegisteredUsers = () => {
  return (
    <main>
      <header className='section-container'>
        {/* Page heading */}
        <PageHeading
          title='All Registered Users'
          enableBreadCrumb={true}
          layer2='Users'
          layer3='Registered'
        />
        {/* Filter */}
        <Filter searchPlaceholder='Search by username tag' />
      </header>
      <section className='section-container-padding-0 mt-2'>
        <div className='overflow-x-auto rounded-none'>
          <div className='relative overflow-x-auto'>
            {/* Users list in a table - registered */}
            <UsersList type='registered' />

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisteredUsers;
