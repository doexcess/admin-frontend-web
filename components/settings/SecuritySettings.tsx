'use client';

import React from 'react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const SecuritySettings = () => {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='grid gap-4'>
            <div>
              <Label htmlFor='current-password'>Current Password</Label>
              <Input
                id='current-password'
                type='password'
                name='current-password'
              />
            </div>
            <div>
              <Label htmlFor='new-password'>New Password</Label>
              <Input id='new-password' type='password' name='new-password' />
            </div>
            <div>
              <Label htmlFor='confirm-password'>Confirm Password</Label>
              <Input
                id='confirm-password'
                type='password'
                name='confirm-password'
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex items-center justify-between'>
            <div>
              <Label>Enable 2FA</Label>
              <p className='text-sm text-muted-foreground'>
                Add an extra layer of security to your account
              </p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <div className='flex justify-end'>
        <Button>Update Security</Button>
      </div>
    </div>
  );
};

export default SecuritySettings;
