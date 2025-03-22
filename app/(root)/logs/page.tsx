'use client';

import LogsList from '@/components/logs/LogsList';
import PageHeading from '@/components/PageHeading';
import Filter from '@/components/users/Filter';
import { fetchLogs } from '@/redux/slices/logSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Logs = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const queryParams = new URLSearchParams(searchParams.toString());

  // Get page from URL or default to 1
  const currentPage = Number(searchParams.get('page')) || 1;
  const perPage = Number(searchParams.get('limit')) || 10;
  const [q, setQ] = useState(searchParams.get('q'));
  const [startDate, setStartDate] = useState(searchParams.get('startDate'));
  const [endDate, setEndDate] = useState(searchParams.get('endDate'));

  let { logs, loading, count } = useSelector((state: RootState) => state.log);

  useEffect(() => {
    dispatch(
      fetchLogs({
        page: currentPage,
        limit: perPage,
        ...(q && { q }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
      })
    );
  }, [dispatch, currentPage, perPage, q, startDate, endDate]);

  const onClickNext = async () => {
    if (logs.length > 0) {
      queryParams.set('page', encodeURIComponent(currentPage + 1));
      router.push(`?${queryParams}`);
    }
  };

  const onClickPrev = async () => {
    if (currentPage - 1 > 0) {
      queryParams.set('page', encodeURIComponent(currentPage - 1));
      router.push(`?${queryParams}`);
    }
  };

  // Handle search submission
  const handleSearchSubmit = (input: string) => {
    setQ(input);

    if (input!.trim()) {
      queryParams.set('q', encodeURIComponent(input!));
    } else {
      queryParams.delete('q'); // Remove 'q' if input is empty
    }

    router.push(`?${queryParams.toString()}`);
  };

  // Handle filter by date submission
  const handleFilterByDateSubmit = (
    startDate: string,
    endDate: string,
    setOpenModal: (value: React.SetStateAction<boolean>) => void
  ) => {
    setStartDate(startDate);
    setEndDate(endDate);

    setOpenModal(false);
  };

  return (
    <main>
      <header className='section-container'>
        {/* Page heading */}
        <PageHeading title='Logs' enableBreadCrumb={true} layer2='Logs' />
        {/* Filter */}
        <Filter
          searchPlaceholder='Search logs by IP, User agent and Entity'
          showPeriod={false}
          handleSearchSubmit={handleSearchSubmit}
          handleFilterByDateSubmit={handleFilterByDateSubmit}
        />
      </header>
      <section className='section-container-padding-0 mt-2'>
        <div className='overflow-x-auto rounded-none'>
          <div className='relative overflow-x-auto'>
            <LogsList
              logs={logs}
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

export default Logs;
