'use client';

import ActionConfirmationModal from '@/components/ActionConfirmationModal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { notificationTemplates } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';

// Dynamically load the CKEditor component
const CkEditor = dynamic(() => import('@/components/CkEditor'), { ssr: false });

const ComposeEmailForm = () => {
  const [template, setTemplate] = useState('custom');
  const [openModal, setOpenModal] = useState(false);

  const handleComposeForm = (e: any) => {
    e.preventDefault();
    setOpenModal(true);
  };

  return (
    <>
      <Suspense fallback={<div>Loading form...</div>}>
        <ComposeEmailFormContent
          template={template}
          setTemplate={setTemplate}
          openModal={openModal}
          setOpenModal={setOpenModal}
          handleComposeForm={handleComposeForm}
        />
      </Suspense>
    </>
  );
};

const ComposeEmailFormContent = ({
  template,
  setTemplate,
  openModal,
  setOpenModal,
  handleComposeForm,
}: any) => {
  const searchParams = useSearchParams();

  return (
    <>
      <form className='space-y-6' onSubmit={handleComposeForm}>
        <h1 className='text-xl font-bold text-gray-900 dark:text-white'>
          Compose email
        </h1>
        <div>
          <label
            htmlFor='subject'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Subject
          </label>
          <Input type='text' name='subject' required={true} />
        </div>
        <div>
          <label
            htmlFor='preheader'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Preheader
          </label>
          <Input type='text' name='preheader' required={true} />
        </div>
        {searchParams.get('type') === 'scheduled' && (
          <div>
            <label
              htmlFor='schedule'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Schedule
            </label>
            <Input type='datetime-local' name='schedule' required={true} />
          </div>
        )}
        <div>
          <label
            htmlFor='template'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Template
          </label>
          <Select
            name='template'
            data={notificationTemplates}
            required={true}
            value={template}
            onChange={(e: any) => setTemplate(e.target.value)}
          />
        </div>

        {template === 'custom' && (
          <div>
            <label
              htmlFor='body'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Body
            </label>

            {/* Suspense with fallback for CKEditor */}
            <Suspense fallback={<div>Loading editor...</div>}>
              <CkEditor />
            </Suspense>
          </div>
        )}

        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Send
        </button>
      </form>

      <ActionConfirmationModal
        body='Are you sure you want to continue'
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
};

export default ComposeEmailForm;
