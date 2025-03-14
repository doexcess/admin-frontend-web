'use client';

import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { IoIosFunnel } from 'react-icons/io';

import Input from '@/components/ui/Input';
import Filter from '@/components/users/Filter';
import PageHeading from '@/components/PageHeading';
import Pagination from '@/components/Pagination';
import UsersList from '@/components/users/UsersList';

const DeletedOrganizations = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <main>
      <header className='section-container'>
        {/* Page heading */}
        <PageHeading
          title='All Deleted Organizations'
          enableBreadCrumb={true}
          layer2='Organizations'
          layer3='Deleted'
        />
        {/* Filter */}
        <Filter searchPlaceholder='Search by username tag' />
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
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Filter by date</Modal.Header>
        <Modal.Body>
          <form className='grid gap-6'>
            <div>
              <div>
                <label
                  htmlFor='first_name'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Date From
                </label>
                <Input name='from' type='date' placeholder='John' />
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor='date_to'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  To
                </label>
                <Input name='to' type='date' placeholder='John' />
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className='flex justify-end'>
          <button
            onClick={() => setOpenModal(false)}
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex gap-1 items-center'
          >
            <IoIosFunnel />
            Filter
          </button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default DeletedOrganizations;
