'use client';

import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { IoIosFunnel } from 'react-icons/io';

import Input from '@/components/ui/Input';
import Filter from '@/components/Filter';
import PageHeading from '@/components/PageHeading';
import Pagination from '@/components/Pagination';
import UsersList from '@/components/organizations/OrgsList';

const SubscriptionPlans = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <main>
      <header className='section-container'>
        {/* Page heading */}
        <PageHeading
          title='Subscription Plans'
          enableBreadCrumb={true}
          layer2='Subscription'
          layer3='Plans'
        />
        {/* Filter */}
        <Filter searchPlaceholder='Search by subscription plans' />
      </header>
      <section className='section-container-padding-0 mt-2'>
        <div className='overflow-x-auto rounded-none'>
          <div className='relative overflow-x-auto'>
            {/* Users list in a table - deleted */}
            <UsersList type='deleted' />

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </section>
    </main>
  );
};

export default SubscriptionPlans;
