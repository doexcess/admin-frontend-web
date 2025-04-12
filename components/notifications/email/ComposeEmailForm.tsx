'use client';

import ActionConfirmationModal from '@/components/ActionConfirmationModal';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import { notificationTemplates, NotificationType } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useOrg from '@/hooks/page/useOrg';
import { ComposeEmailSchema } from '@/lib/schema/notification.schema';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { composeEmail } from '@/redux/slices/notificationSlice';
import toast from 'react-hot-toast';
import { MultiSelect } from '@/components/ui/MultiSelect';

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

const defaultValue: {
  title: string;
  message: string;
  type: NotificationType;
  is_scheduled: boolean;
  recipients: string[];
} = {
  title: '',
  message: '',
  type: NotificationType.EMAIL,
  is_scheduled: false,
  recipients: [],
};

const ComposeEmailFormContent = ({
  template,
  setTemplate,
  openModal,
  setOpenModal,
  handleComposeForm,
}: any) => {
  const searchParams = useSearchParams();

  const dispatch = useDispatch<AppDispatch>();

  const { organization, loading } = useOrg();

  const [isLoading, setIsLoading] = useState(false);

  const [body, setBody] = useState(defaultValue);

  const [editorData, setEditorData] = useState('');

  const organizationList = [
    {
      value: loading ? '' : organization?.user_id!,
      label: loading
        ? ''
        : `${organization?.business_name!} - (${organization?.user.email})`,
    },
  ];

  const [selectedOrgUser, setSelectedOrgUser] = useState<string[]>([
    loading ? '' : organization?.user_id!,
  ]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      setBody({ ...body, message: editorData, recipients: selectedOrgUser });

      console.log(body);

      const { error, value } = ComposeEmailSchema.validate({
        ...body,
      });

      // Handle validation results
      if (error) {
        throw new Error(error.details[0].message);
      }

      const response: any = await dispatch(composeEmail(body));

      if (response.requestStatus === 'rejected') {
        throw new Error(response.payload);
      }

      // Clear form
      setBody({
        ...body,
        title: '',
        message: '',
      });

      toast.success(response?.payload?.message);
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      handleComposeForm(e);
    }
  };

  return (
    <>
      <form className='space-y-6' onSubmit={handleSubmit}>
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
          <Input
            type='text'
            name='subject'
            required={true}
            onChange={(e: any) => setBody({ ...body, title: e.target.value })}
            value={body.title}
          />
        </div>
        <div>
          <label
            htmlFor='preheader'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Preheader
          </label>
          <Input type='text' name='preheader' />
        </div>
        {searchParams.get('type') === 'scheduled' && (
          <div>
            <label
              htmlFor='schedule'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Schedule
            </label>
            <Input type='datetime-local' name='schedule' />
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
        {searchParams.has('orgId') && (
          <div>
            {/* <label
              htmlFor='organization'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Organization
            </label>
            <Select
              name='organization'
              data={[
                loading
                  ? 'loading'
                  : `${organization?.business_name!} (${
                      organization?.user.email
                    })`,
              ]}
              required={true}
              value={body.recipients!}
              onChange={(e: any) =>
                setBody({ ...body, recipients: [e.target.value] })
              }
              multiple={true}
            /> */}
            <MultiSelect
              options={organizationList}
              onValueChange={setSelectedOrgUser}
              defaultValue={selectedOrgUser}
              placeholder='Select organization'
              variant='inverted'
              animation={2}
              maxCount={3}
            />
          </div>
        )}

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
              <CkEditor editorData={editorData} setEditorData={setEditorData} />
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
