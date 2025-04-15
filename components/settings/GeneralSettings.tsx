'use client';

import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useTheme } from 'next-themes';
import { ThemeToggle } from '../theme-toggle';
import { AppDispatch } from '@/redux/store';
import { useDispatch } from 'react-redux';
import { UserProfileProps } from '@/lib/schema/auth.schema';
import useProfile from '@/hooks/page/useProfile';

const GeneralSettings = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile } = useProfile();

  const [formData, setFormData] = useState<UserProfileProps>({
    name: profile?.name || '',
    profile_picture: profile?.profile.profile_picture || '',
    address: profile?.profile.address || '',
    bio: profile?.profile.bio || '',
    date_of_birth: profile?.profile.date_of_birth || null,
    gender: profile?.profile.gender || null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Dispatch your update action here
  };

  return (
    <div className='text-black-1 dark:text-white'>
      <form onSubmit={handleSubmit} className='space-y-6'>
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <Label htmlFor='name'>Full Name</Label>
                <Input
                  type='text'
                  id='name'
                  name='name'
                  placeholder='Your name'
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  type='email'
                  name='email'
                  placeholder='your@email.com'
                  readonly={true}
                  value={profile?.email}
                />
              </div>
            </div>
            <div>
              <Label htmlFor='bio'>Bio</Label>
              <Input
                type='text'
                name='bio'
                id='bio'
                placeholder='Tell us about yourself'
                value={formData.bio}
                onChange={handleChange}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex items-center justify-between'>
              <div>
                <Label>Dark Mode</Label>
                <p className='text-sm text-muted-foreground'>
                  Switch between light and dark theme
                </p>
              </div>
              <ThemeToggle />
            </div>
            <Separator />
            <div className='flex items-center justify-between'>
              <div>
                <Label>Language</Label>
                <p className='text-sm text-muted-foreground'>
                  Set your preferred language
                </p>
              </div>
              <div className='w-48'>
                <Input
                  type='text'
                  name='lang'
                  placeholder='Select language'
                  value='English'
                  readonly={true}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className='flex justify-end'>
          <Button size='sm' type='submit'>
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;
