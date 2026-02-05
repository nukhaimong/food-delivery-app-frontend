import { Routes } from '@/types/routes.type';

export const userRoutes: Routes[] = [
  {
    title: 'See your Order',
    items: [
      {
        title: 'Track Your Order',
        url: '/user-dashboard/my-order',
      },
    ],
  },
];

export const providerRoutes: Routes[] = [
  {
    title: 'Manage Your Meals and order',
    items: [
      {
        title: 'Post Meal',
        url: '/provider-dashboard/post-meal',
      },
      {
        title: 'See Orders',
        url: '/provider-dashboard/see-orders',
      },
    ],
  },
];

export const adminRoutes: Routes[] = [
  {
    title: 'Manage Users and Providers',
    items: [
      {
        title: 'See all Users',
        url: '/admin-dashboard/all-users',
      },
      {
        title: 'See All Providers',
        url: '/admin-dashboard/all-providers',
      },
      {
        title: 'Create Cuisine Category',
        url: '/admin-dashboard/create-category',
      },
    ],
  },
];
