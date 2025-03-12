'use client';

import { filterPeriods } from '@/constants';
import { Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { HiDotsVertical } from 'react-icons/hi';
import { IoIosFunnel } from 'react-icons/io';
import Input from '../ui/Input';

const Filter = ({
  pageTitle,
  extra,
  showSearch = true,
  searchPlaceholder = 'Search',
}: {
  pageTitle?: string;
  extra?: JSX.Element;
  showSearch?: boolean;
  searchPlaceholder?: string;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const startDate = new Date().toISOString().slice(0, 16);
  const endDate = new Date().toISOString().slice(0, 16);

  const [modalPlacement, setModalPlacement] = useState('center');

  return (
    <div>
      <div
        className={`flex flex-col ${
          !showSearch && 'justify-end mt-5'
        }  lg:flex-row gap-3 lg:gap-0`}
      >
        <div className='flex items-center gap-2 flex-[4]'>
          {showSearch ? (
            <Input
              type='text'
              name='search'
              placeholder={searchPlaceholder}
              className='w-full lg:w-[50%] xl:w-[35%] bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
            />
          ) : (
            <h1 className='text-2xl font-bold'>{pageTitle!}</h1>
          )}
        </div>
        <div className={`flex flex-row-reverse lg:flex-row gap-2`}>
          <button
            title='Search with date filter'
            onClick={() => setOpenModal(true)}
          >
            <HiDotsVertical className={'text-2xl'} />
          </button>
          <form className='w-full'>
            <select
              id='countries'
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 flex p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full'
              defaultValue='today'
            >
              {filterPeriods.map((period) => (
                <option key={period.slug} value={period.slug}>
                  {period.name}
                </option>
              ))}
            </select>
          </form>

          {/* Extra component */}
          {extra}
        </div>
      </div>
      <Modal
        show={openModal}
        position={modalPlacement}
        onClose={() => setOpenModal(false)}
      >
        <Modal.Header>Filter by date</Modal.Header>
        <Modal.Body>
          <form className='grid gap-6'>
            <div>
              <div>
                <label
                  htmlFor='start_date'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Start date
                </label>
                <Input
                  name='from'
                  type='datetime-local'
                  defaultValue={startDate}
                />
              </div>
            </div>
            <div>
              <div>
                <label
                  htmlFor='end_date'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  End date
                </label>
                <Input name='to' type='datetime-local' defaultValue={endDate} />
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
    </div>
  );
};

export default Filter;
