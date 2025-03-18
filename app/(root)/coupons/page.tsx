import PageHeading from '@/components/PageHeading';
import Pagination from '@/components/Pagination';
import ProductsList from '@/components/products/ProductsList';
import Filter from '@/components/users/Filter';
import UsersList from '@/components/users/UsersList';
import React from 'react';

const Coupons = () => {
  return (
    <main>
      <header className='section-container'>
        {/* Page heading */}
        <PageHeading title='Coupons' enableBreadCrumb={true} layer2='Coupons' />
        {/* Filter */}
        <Filter searchPlaceholder='Search coupons' />
      </header>
      <section className='section-container-padding-0 mt-2'>
        <div className='overflow-x-auto rounded-none'>
          <div className='relative overflow-x-auto'>
            {/* Users list in a table - registered */}
            <ProductsList />

            {/* Pagination */}
            <Pagination />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Coupons;
