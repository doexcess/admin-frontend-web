'use client';

import ActionConfirmationModal from '@/components/ActionConfirmationModal';
import { Button } from '@/components/ui/Button';
import {
  suspendOrgAccount,
  unsuspendOrgAccount,
} from '@/redux/slices/organizationSlice';
import { AppDispatch } from '@/redux/store';
import { Loader2 } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaBan, FaCheckCircle } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

interface SuspendUnsuspendOrgAccountProps {
  userId: string;
  isSuspended: boolean;
}

const SuspendUnsuspendOrgAccount = ({
  userId,
  isSuspended,
}: SuspendUnsuspendOrgAccountProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [openModal, setOpenModal] = useState(false);
  const [allowAction, setAllowAction] = useState(false);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (allowAction) {
      if (reason) {
        handleSuspend();
      } else {
        handleUnsuspend();
      }
    }
  }, [allowAction]);

  const handleSuspend = async () => {
    try {
      setIsLoading(true);

      const response: any = await dispatch(
        suspendOrgAccount({
          user_id: userId,
          suspension_reason: reason!,
        })
      );

      if (response.type === 'onboard/suspend-business-owner/:id/rejected') {
        throw new Error(response.payload);
      }

      setReason('');

      toast.success(response.data.message);
    } catch (error: any) {
      console.error('Suspension failed:', error);
      toast.error(error.message);
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

      if (response.type === 'onboard/unsuspend-business-owner/:id/rejected') {
        throw new Error(response.payload);
      }

      toast.success(response.data.message);
    } catch (error: any) {
      console.error('Unsuspension failed:', error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isSuspended ? (
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
          />
        </>
      )}
    </>
  );
};

export default SuspendUnsuspendOrgAccount;
