import { fetchCustomers } from '@/redux/slices/organizationSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useQueryParams from '../useQueryParams';
import { useParams } from 'next/navigation';

const useCustomers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();

  let { customers, loading, totalCustomers } = useSelector(
    (state: RootState) => state.organization
  );

  const {
    currentPage,
    perPage,
    q,
    startDate,
    endDate,
    onClickNext,
    onClickPrev,
    handleSearchSubmit,
    handleFilterByDateSubmit,
    handleRefresh,
  } = useQueryParams(customers);

  useEffect(() => {
    dispatch(
      fetchCustomers({
        page: currentPage,
        limit: perPage,
        ...(q && { q }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(params?.id && { business_id: params?.id as string }),
      })
    );
  }, [dispatch, currentPage, perPage, q, startDate, endDate]);

  return {
    customers,
    loading,
    count: totalCustomers,
    currentPage,
    q,
    startDate,
    endDate,
    onClickNext,
    onClickPrev,
    handleSearchSubmit,
    handleFilterByDateSubmit,
    handleRefresh,
  };
};

export default useCustomers;
