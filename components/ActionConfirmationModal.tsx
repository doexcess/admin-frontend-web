'use client';

import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

const ActionConfirmationModal = ({
  body = 'Are you sure you want to proceed with this action?',
  openModal,
  setOpenModal,
  allowDelete,
  setAllowDelete,
}: {
  body?: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  allowDelete?: boolean;
  setAllowDelete?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const handleSuspend = (allow: boolean) => {
    setAllowDelete?.(allow);

    setOpenModal?.(false);
  };

  return (
    <>
      <Modal
        show={openModal}
        size='md'
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center p-2'>
            <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
            <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
              {body}
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => handleSuspend(true)}>
                {"Yes, I'm sure"}
              </Button>
              <Button color='gray' onClick={() => handleSuspend(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ActionConfirmationModal;
