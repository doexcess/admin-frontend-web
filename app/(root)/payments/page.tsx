import PageHeading from '@/components/PageHeading';
import Pagination from '@/components/Pagination';
import Filter from '@/components/Filter';
import React from 'react';

const Payments = () => {
  return (
    <main>
      <header className='section-container'>
        {/* Page heading */}
        <PageHeading
          title='Payments'
          enableBreadCrumb={true}
          layer2='Payments'
        />
        {/* Filter */}
        <Filter searchPlaceholder='Search payments' />
      </header>
      <section className='section-container-padding-0 mt-2'>
        <div className='overflow-x-auto rounded-none'>
          <div className='relative overflow-x-auto'>
            {/* Users list in a table - registered */}
            {/* <ProductsList /> */}

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Payments;
