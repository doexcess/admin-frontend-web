import PageHeading from '@/components/PageHeading';
import React from 'react';

const OrganizationDetails = () => {
  return (
    <main>
      <header className='section-container'>
        {/* Page heading */}
        <PageHeading
          title={'Hei'}
          enableBreadCrumb={true}
          layer2='Organizations'
          layer3={`wiewie`}
        />
      </header>
      <section className='section-container-padding-0 mt-2'>
        <div className='overflow-x-auto rounded-none'>
          <div className='relative overflow-x-auto'></div>
        </div>
      </section>
    </main>
  );
};

export default OrganizationDetails;
