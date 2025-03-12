'use client';

import React from 'react';
import { groups, sidebarLinks } from '@/constants';

import { Sidebar } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const SidebarMenu = ({ handleClose }: { handleClose?: () => void }) => {
  const router = useRouter();

  const groupOneSidebarLinks = sidebarLinks.filter(
    (sidebarLink) => sidebarLink.group === groups.ONE
  );
  const groupTwoSidebarLinks = sidebarLinks.filter(
    (sidebarLink) => sidebarLink.group === groups.TWO
  );

  const handleNavigation = (route: string) => {
    router.push(route);
    if (typeof handleClose === 'function') handleClose();
  };

  return (
    <>
      <Sidebar
        className='mt-6 md:mt-0'
        aria-label='Sidebar menu for core features'
      >
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            {groupOneSidebarLinks.map((sidebarLink) =>
              sidebarLink.items ? (
                <Sidebar.Collapse
                  key={sidebarLink.route}
                  icon={sidebarLink.icon}
                  label={sidebarLink.label}
                >
                  {sidebarLink.items.map((item) => (
                    <Sidebar.Item
                      key={item.route}
                      onClick={() => handleNavigation(item.route)}
                      className='cursor-pointer'
                    >
                      {item.label}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              ) : (
                <Sidebar.Item
                  key={sidebarLink.route}
                  onClick={() => handleNavigation(sidebarLink.route)}
                  icon={sidebarLink.icon}
                  className='cursor-pointer'
                >
                  {sidebarLink.label}
                </Sidebar.Item>
              )
            )}
          </Sidebar.ItemGroup>
          <Sidebar.ItemGroup>
            {groupTwoSidebarLinks.map((sidebarLink) =>
              sidebarLink.items ? (
                <Sidebar.Collapse
                  key={sidebarLink.route}
                  icon={sidebarLink.icon}
                  label={sidebarLink.label}
                >
                  {sidebarLink.items.map((item) => (
                    <Sidebar.Item
                      key={item.route}
                      onClick={() => handleNavigation(sidebarLink.route)}
                      className='cursor-pointer'
                    >
                      {item.label}
                    </Sidebar.Item>
                  ))}
                </Sidebar.Collapse>
              ) : (
                <Sidebar.Item
                  key={sidebarLink.route}
                  onClick={() => handleNavigation(sidebarLink.route)}
                  icon={sidebarLink.icon}
                  className='cursor-pointer'
                >
                  {sidebarLink.label}
                </Sidebar.Item>
              )
            )}
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </>
  );
};

export default SidebarMenu;
