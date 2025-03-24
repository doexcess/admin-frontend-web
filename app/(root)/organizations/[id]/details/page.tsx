'use client';

import PageHeading from '@/components/PageHeading';
import SectionContent from '@/components/SectionContent';
import { Button } from '@/components/ui/Button';
import React, { useState } from 'react';
import { IoIosAdd } from 'react-icons/io';
import { FaPauseCircle, FaBan } from 'react-icons/fa';

const OrganizationDetails = () => {
  const [activeTab, setActiveTab] = useState('contacts');

  const organization = {
    name: 'Weimmersive Ltd.',
    industry: 'Technology & Education',
    location: 'San Francisco, CA',
    founded: 2018,
    employees: 50,
    description:
      'Weimmersive Ltd. is a leading provider of VR and digital art education solutions for institutions and independent creators.',
    contacts: [
      { name: 'John Doe', role: 'CEO', email: 'john.doe@weimmersive.com' },
      { name: 'Jane Smith', role: 'CTO', email: 'jane.smith@weimmersive.com' },
    ],
    walletBalance: 12500.75,
    products: [],
    payments: [],
    coupons: [],
    customers: [],
    subscriptionPlans: [],
    multimedia: [],
    withdrawalAccount: {},
    billingDetails: {},
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className='rounded-xl shadow-lg p-6 text-white'>
            <h2 className='text-3xl font-bold mb-4'>Organization Overview</h2>
            <p className='mb-3'>
              <strong>Industry:</strong> {organization.industry}
            </p>
            <p className='mb-3'>
              <strong>Location:</strong> {organization.location}
            </p>
            <p className='mb-3'>
              <strong>Founded:</strong> {organization.founded}
            </p>
            <p className='mb-3'>
              <strong>Employees:</strong> {organization.employees}
            </p>
            <p>
              <strong>Description:</strong> {organization.description}
            </p>
          </div>
        );
      case 'contacts':
        return (
          <div className='space-y-4'>
            {organization.contacts.map((contact, index) => (
              <div
                key={index}
                className='bg-gray-100 p-4 rounded-lg hover:bg-gray-200 transition-colors duration-300'
              >
                <p className='text-gray-700 font-semibold'>{contact.name}</p>
                <p className='text-gray-600'>{contact.role}</p>
                <a
                  href={`mailto:${contact.email}`}
                  className='text-blue-500 hover:text-blue-600 transition-colors duration-300'
                >
                  {contact.email}
                </a>
              </div>
            ))}
          </div>
        );
      case 'products':
        return <p>Products content goes here.</p>;
      case 'payments':
        return <p>Payments content goes here.</p>;
      case 'coupons':
        return <p>Coupons content goes here.</p>;
      case 'customers':
        return <p>Customers/Members content goes here.</p>;
      case 'subscriptionPlans':
        return <p>Subscription Plans content goes here.</p>;
      case 'multimedia':
        return <p>Multimedia content goes here.</p>;
      case 'withdrawalAccount':
        return <p>Withdrawal Account content goes here.</p>;
      case 'billingDetails':
        return <p>Billing Details content goes here.</p>;
      default:
        return null;
    }
  };

  return (
    <main>
      <header className='section-container'>
        {/* Page heading */}
        <PageHeading
          title={'Hei'}
          enableBreadCrumb={true}
          layer2='Organizations'
          layer3={`wiewie`}
          enableBackButton={true}
          ctaButtons={
            <div className='flex gap-2'>
              <Button className='p-2 px-3 space-x-1'>
                <IoIosAdd /> <span>Compose</span>
              </Button>
              <Button className='p-2 px-3 space-x-1' variant='red'>
                <FaBan /> <span>Suspend</span>
              </Button>
            </div>
          }
        />
      </header>

      <SectionContent>
        <div className='px-4'>
          {/* Stats */}
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
            {[
              {
                label: 'Registered Organizations',
                value: '45,890',
                change: '-0.5%',
              },
              { label: 'Revenue', value: 'NGN 48,575', change: '+3.84%' },
              { label: 'Orders', value: '4,800+', change: '+1.46%' },
              { label: 'Wallet Balance', value: 'NGN 24,351', change: '1.6%' },
            ].map((stat, index) => (
              <div
                key={index}
                className='bg-white dark:bg-gray-800 p-4 rounded-md shadow-md'
              >
                <h3 className='text-gray-600 dark:text-white'>{stat.label}</h3>
                <div className='flex gap-2 items-center'>
                  <p className='text-xl font-bold'>{stat.value}</p>
                  <span
                    className={
                      stat.change.includes('-')
                        ? 'text-red-500'
                        : 'text-green-500'
                    }
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className='shadow-lg p-6'>
          <div className='flex space-x-4 border-b border-gray-200 mb-6'>
            {[
              'overview',
              'contacts',
              'products',
              'payments',
              'coupons',
              'customers',
              'subscriptionPlans',
              'multimedia',
              'withdrawalAccount',
              'billingDetails',
            ].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>{renderTabContent()}</div>
        </div>
      </SectionContent>
    </main>
  );
};

export default OrganizationDetails;
