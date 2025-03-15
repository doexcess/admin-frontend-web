import PageHeading from '@/components/PageHeading';
import Filter from '@/components/users/Filter';
import React from 'react';

const MediaLibrary = () => {
  return (
    <main className='section-container'>
      <header>
        {/* Page Heading */}
        <PageHeading
          // title='Ratings'
          enableBreadCrumb={true}
          layer2='Media Library'
        />

        {/* Filter */}
        <Filter pageTitle='Media Library' showSearch={false} />
      </header>
      <section className='py-5'></section>
    </main>
  );
};

export default MediaLibrary;
