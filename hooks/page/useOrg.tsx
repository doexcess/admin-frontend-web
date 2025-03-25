import { fetchOrganizationDetails } from '@/redux/slices/organizationSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useOrg = () => {
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();

  let { organization, loading } = useSelector(
    (state: RootState) => state.organization
  );

  useEffect(() => {
    dispatch(fetchOrganizationDetails(params?.id! as string));
  }, [dispatch]);

  return {
    organization,
    loading,
  };
};

export default useOrg;
