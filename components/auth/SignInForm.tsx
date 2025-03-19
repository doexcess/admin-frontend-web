'use client';

import React, { useState } from 'react';

import { environments, timezones } from '@/lib/utils';
import Checkbox from '../ui/Checkbox';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Joi from 'joi';
import { useDispatch } from 'react-redux';
import { signIn } from '@/lib/actions/auth.action';
import { useRouter } from 'next/navigation';
import { LoginFormSchema } from '@/lib/schema/auth.schema';
import { Loader2 } from 'lucide-react';
import { login, logout } from '@/redux/slices/authSlice';
import { AppDispatch } from '@/redux/store';

const defaultValue = {
  email: '',
  password: '',
  environment: environments[0],
  timezone: timezones[0],
};

const SignInForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [body, setBody] = useState(defaultValue);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      console.log(body);

      setIsLoading(true);

      const { error, value } = LoginFormSchema.validate(body);

      // Handle validation results
      if (error) {
        console.log(body);

        console.log(error);

        console.error('Validation Error:', error.details);

        return null; // Or throw an error, or return a custom response
      }

      const { email, password, environment, timezone } = body;

      dispatch(login({ email, password }));

      // router.push('/');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor='email'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Email address
          </label>
          <Input
            type='email'
            name='email'
            placeholder='Email address'
            onChange={(e: any) => setBody({ ...body, email: e.target.value })}
            value={body.email}
            required={true}
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Password
          </label>
          <Input
            type='password'
            name='password'
            placeholder='Password'
            onChange={(e: any) =>
              setBody({ ...body, password: e.target.value })
            }
            value={body.password}
            required={true}
          />
        </div>

        <div className='flex items-start'>
          <div className='flex items-center h-5'>
            <Checkbox type='checkbox' name='remember' />
          </div>

          <div className='ml-3 text-sm'>
            <label
              htmlFor='remember'
              className='font-medium text-gray-900 dark:text-white'
            >
              Remember me
            </label>
          </div>
        </div>
        <button
          type='submit'
          className='w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-main rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-main dark:hover:bg-primary-700 dark:focus:ring-primary-800 flex items-center'
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className='animate-spin' /> &nbsp; Loading...
            </>
          ) : (
            'Login to your account'
          )}
        </button>
      </form>
    </>
  );
};

export default SignInForm;
