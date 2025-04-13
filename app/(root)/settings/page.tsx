import PageHeading from '@/components/PageHeading';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/separator';

const Settings = () => {
  return (
    <main className='bg-muted/40 min-h-screen'>
      <header className='section-container pt-6 pb-4'>
        <PageHeading
          title='Settings'
          enableBreadCrumb={true}
          layer2='Settings'
        />
      </header>

      <section className='section-container-padding-0'>
        <Tabs defaultValue='general' className='w-full'>
          <div className='flex flex-col md:flex-row gap-6'>
            {/* Sidebar Navigation */}
            <div className='w-full md:w-64 shrink-0'>
              <TabsList className='flex flex-col h-auto p-2 bg-background'>
                <TabsTrigger
                  value='general'
                  className='w-full justify-start px-4 py-3 data-[state=active]:bg-muted'
                >
                  <i className='ri-settings-2-line mr-3'></i>
                  General
                </TabsTrigger>
                <TabsTrigger
                  value='security'
                  className='w-full justify-start px-4 py-3 data-[state=active]:bg-muted'
                >
                  <i className='ri-shield-keyhole-line mr-3'></i>
                  Security
                </TabsTrigger>
                <TabsTrigger
                  value='notifications'
                  className='w-full justify-start px-4 py-3 data-[state=active]:bg-muted'
                >
                  <i className='ri-notification-3-line mr-3'></i>
                  Notifications
                </TabsTrigger>
                <TabsTrigger
                  value='team'
                  className='w-full justify-start px-4 py-3 data-[state=active]:bg-muted'
                >
                  <i className='ri-team-line mr-3'></i>
                  Team
                </TabsTrigger>
                <TabsTrigger
                  value='billing'
                  className='w-full justify-start px-4 py-3 data-[state=active]:bg-muted'
                >
                  <i className='ri-bank-card-line mr-3'></i>
                  Billing
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Main Content Area */}
            <div className='flex-1'>
              <TabsContent value='general'>
                <GeneralSettings />
              </TabsContent>
              <TabsContent value='security'>
                <SecuritySettings />
              </TabsContent>
              <TabsContent value='notifications'>
                {/* <NotificationSettings /> */}
              </TabsContent>
              <TabsContent value='team'>{/* <TeamSettings /> */}</TabsContent>
              <TabsContent value='billing'>
                {/* <BillingSettings /> */}
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </section>
    </main>
  );
};

// Modular Components for each settings section
const GeneralSettings = () => (
  <div className='space-y-6'>
    <Card>
      <CardHeader>
        <CardTitle>Profile Information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <div>
            <Label htmlFor='name'>Full Name</Label>
            <Input type='text' id='name' name='name' placeholder='Your name' />
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
          <Switch />
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
            <Input type='text' name='lang' placeholder='Select language' />
          </div>
        </div>
      </CardContent>
    </Card>

    <div className='flex justify-end'>
      <Button>Save Changes</Button>
    </div>
  </div>
);

const SecuritySettings = () => (
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

// Add similar components for NotificationSettings, TeamSettings, BillingSettings
// ...

export default Settings;
