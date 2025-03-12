import {
  HiBell,
  HiChartPie,
  HiLogout,
  HiOutlineUpload,
  HiUpload,
  HiUsers,
  HiViewBoards,
} from 'react-icons/hi';
import { IoIosPower } from 'react-icons/io';

export enum groups {
  ONE = 1,
  TWO = 2,
}

export const sidebarLinks = [
  {
    icon: HiChartPie,
    route: '/',
    label: 'Dashboard',
    group: groups.ONE,
  },
  {
    icon: HiUsers,
    route: '/users',
    label: 'Users',
    group: groups.ONE,
    items: [
      {
        route: '/users/registered',
        label: 'Registered',
      },
      {
        route: '/users/deleted',
        label: 'Deleted',
      },
    ],
  },
  {
    icon: HiViewBoards,
    route: '/general',
    label: 'General',
    group: groups.ONE,
    items: [
      {
        route: '/general/ratings',
        label: 'Ratings',
      },
      {
        route: '/general/suggestions',
        label: 'Suggestions',
      },
      {
        route: '/general/feedbacks',
        label: 'Feedbacks',
      },
    ],
  },
  {
    icon: HiBell,
    route: '/notifications',
    label: 'Notifications',
    group: groups.ONE,
    items: [
      {
        route: '/notifications/email',
        label: 'Email',
      },
      {
        route: '/notifications/push',
        label: 'Push',
      },
      {
        route: '/notifications/uploads',
        label: 'Uploads',
      },
    ],
  },
  {
    icon: IoIosPower,
    route: '/logout',
    label: 'Logout',
    group: groups.TWO,
  },
];

export const dummyUsers = [
  {
    id: 1,
    firstname: 'Niel',
    lastname: 'Niel',
    username: 'Nielx',
    email: 'neil.sims@flowbite.com',
    phone: '+2348129027941',
    device: 'Android',
    country: 'United States',
    isActive: true,
    color: '#402000',
  },
  {
    id: 2,
    firstname: 'Roberta',
    lastname: 'Casas',
    username: 'Casa',
    email: 'roberta.casas@flowbite.com',
    phone: '+2349129027940',
    device: 'Android',
    country: 'Spain',
    isActive: false,
    color: '#125a0f',
  },
  {
    id: 3,
    firstname: 'Michael',
    lastname: 'Gough',
    username: 'Goug',
    email: 'michael.gough@flowbite.com',
    phone: '+2347089484822',
    device: 'iPhone',
    country: 'United Kingdom',
    isActive: true,
    color: '#0f2e5a',
  },
];

export const dummyUploads = [
  {
    id: 1,
    resourceType: 'image',
    format: 'png',
    folder: 'uploads/notification-svc',
    link: 'https://res.cloudinary.com/image/upload/test1.jpg',
  },
  {
    id: 2,
    resourceType: 'image',
    format: 'png',
    folder: 'uploads/notification-svc',
    link: 'https://res.cloudinary.com/image/upload/test2.jpg',
  },
  {
    id: 3,
    resourceType: 'image',
    format: 'png',
    folder: 'uploads/notification-svc',
    link: 'https://res.cloudinary.com/image/upload/test3.jpg',
  },
  {
    id: 4,
    resourceType: 'image',
    format: 'png',
    folder: 'uploads/notification-svc',
    link: 'https://res.cloudinary.com/image/upload/test4.jpg',
  },
  {
    id: 5,
    resourceType: 'image',
    format: 'png',
    folder: 'uploads/notification-svc',
    link: 'https://res.cloudinary.com/image/upload/test5.jpg',
  },
];

export const filterPeriods = [
  { slug: 'today', name: 'Today' },
  { slug: 'last_week', name: 'Last week' },
  { slug: 'last_month', name: 'Last month' },
  { slug: 'last_year', name: 'Last year' },
];
