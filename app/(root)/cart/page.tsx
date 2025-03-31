'use client';

import PageHeading from '@/components/PageHeading';
import Filter from '@/components/Filter';
import React from 'react';
import CartList from '@/components/cart/CartList';
import useCart from '@/hooks/page/useCart';

const Cart = () => {
  const { carts, count, onClickNext, onClickPrev, currentPage, loading } =
    useCart();
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
            <CartList
              carts={carts}
              count={count}
              onClickNext={onClickNext}
              onClickPrev={onClickPrev}
              currentPage={currentPage}
              loading={loading}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Cart;
