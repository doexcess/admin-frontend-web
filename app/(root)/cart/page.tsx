import PageHeading from '@/components/PageHeading';
import Pagination from '@/components/Pagination';
import ProductsList from '@/components/products/ProductsList';
import Filter from '@/components/users/Filter';
import UsersList from '@/components/users/UsersList';
import React from 'react';

const Cart = () => {
  return (
    <main>
      <header className='section-container'>
        {/* Page heading */}
        <PageHeading title='Cart' enableBreadCrumb={true} layer2='Cart' />
        {/* Filter */}
        <Filter searchPlaceholder='Search cart' />
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

export default Cart;
