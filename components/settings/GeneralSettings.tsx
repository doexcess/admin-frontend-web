'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';

const GeneralSettings = () => {
  return (
    <div className='space-y-6'>
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
              />
            </div>
            <div>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                name='email'
                placeholder='your@email.com'
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
            <Switch onClick={() => alert(123)} />
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
                readonly={false}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className='flex justify-end'>
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default GeneralSettings;
