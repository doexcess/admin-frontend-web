'use client';

import ActionConfirmationModal from '@/components/ActionConfirmationModal';
import { Button } from '@/components/ui/Button';
import { ActionKind } from '@/lib/utils';
import {
  suspendOrgAccount,
  unsuspendOrgAccount,
  updateOrganization,
} from '@/redux/slices/organizationSlice';
import { AppDispatch } from '@/redux/store';
import { BusinessDetails } from '@/types/organization';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

interface SuspendUnsuspendOrgAccountProps {
  userId: string;
  isSuspended: boolean;
  organization: BusinessDetails;
}

const SuspendUnsuspendOrgAccount = ({
  userId,
  isSuspended,
  organization,
}: SuspendUnsuspendOrgAccountProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);
  const [allowAction, setAllowAction] = useState(false);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [action, setAction] = useState(
    // Action should be opposite of what the isSupended status is
    organization?.user?.is_suspended
      ? ActionKind.FAVORABLE
      : ActionKind.CRITICAL
  );

  const handleSuspend = async () => {
    try {
      setIsLoading(true);

      const response: any = await dispatch(
        suspendOrgAccount({
          user_id: userId,
          suspension_reason: reason!,
        })
      );

      if (response.requestStatus === 'rejected') {
        throw new Error(response.payload);
      }

      setReason('');
      setAction(ActionKind.FAVORABLE);

      dispatch(
        updateOrganization({
          user: { ...organization.user, is_suspended: true },
        })
      );

      toast.success(response?.payload?.message);
    } catch (error: any) {
      console.error('Suspension failed:', error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnsuspend = async () => {
    try {
      setIsLoading(true);

      const response: any = await dispatch(
        unsuspendOrgAccount({
          user_id: userId,
        })
      );

      if (response.requestStatus === 'rejected') {
        throw new Error(response.payload);
      }

      setAction(ActionKind.CRITICAL);

      dispatch(
        updateOrganization({
          user: { ...organization.user, is_suspended: false },
        })
      );

      toast.success(response?.payload?.message);
    } catch (error: any) {
      console.error('Unsuspension failed:', error);
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (allowAction) {
      if (action === ActionKind.CRITICAL) {
        handleSuspend();
      } else {
        handleUnsuspend();
      }

      setAllowAction(false);
    }
  }, [allowAction, action, handleSuspend, handleUnsuspend]);

  return (
    <>
      {organization?.user?.is_suspended ? (
        <>
          <Button
            className='p-2 px-3 space-x-1'
            onClick={() => setOpenModal(true)}
            variant='green'
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
              </>
            ) : (
              <>
                <FaCheckCircle /> <span>Reactivate</span>
              </>
            )}
          </Button>
          <ActionConfirmationModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            allowAction={allowAction}
            setAllowAction={setAllowAction}
            action={ActionKind.FAVORABLE}
          />
        </>
      ) : (
        <>
          <Button
            className='p-2 px-3 space-x-1'
            variant='red'
            onClick={() => setOpenModal(true)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
              </>
            ) : (
              <>
                <FaBan /> <span>Suspend</span>
              </>
            )}
          </Button>
          <ActionConfirmationModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            allowAction={allowAction}
            setAllowAction={setAllowAction}
            reason={reason}
            setReason={setReason}
            action={ActionKind.CRITICAL}
          />
        </>
      )}
    </>
  );
};

export default SuspendUnsuspendOrgAccount;
